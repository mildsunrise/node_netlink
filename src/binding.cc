#include <sys/socket.h>
#include <linux/netlink.h>
#include <unistd.h>
#include <errno.h>
#include <queue>
#include <memory>

#if defined(__GNUC__) && __GNUC__ >= 8
#define DISABLE_WCAST_FUNCTION_TYPE _Pragma("GCC diagnostic push") _Pragma("GCC diagnostic ignored \"-Wcast-function-type\"")
#define DISABLE_WCAST_FUNCTION_TYPE_END _Pragma("GCC diagnostic pop")
#else
#define DISABLE_WCAST_FUNCTION_TYPE
#define DISABLE_WCAST_FUNCTION_TYPE_END
#endif

DISABLE_WCAST_FUNCTION_TYPE
#include <nan.h>
DISABLE_WCAST_FUNCTION_TYPE_END
#include <uv.h>

class SendRequest : public Nan::AsyncResource {
  public:
    SendRequest(int port, int groups, v8::Local<v8::Value> data, v8::Local<v8::Function>& callback,
                std::unique_ptr<struct iovec[]> buffers_, size_t nbufs):
            Nan::AsyncResource("netlink::NativeNetlinkSend"), buffers(std::move(buffers_)), data(data), callback(callback) {
        addr.nl_family = AF_NETLINK;
        addr.nl_pid = port;
        addr.nl_groups = groups;
        msg.msg_name = &addr;
        msg.msg_namelen = sizeof(addr);
        msg.msg_iovlen = nbufs;
        msg.msg_iov = buffers.get();
    }
    struct msghdr msg {};
    struct sockaddr_nl addr {};
    std::unique_ptr<struct iovec[]> buffers;
    Nan::Global<v8::Value> data; // Not really used, just to keep the buffers memory alive
    Nan::Callback callback;
    int status;
};

// FIXME: do we need to try/catch when calling callbacks?
// FIXME: handle allocation errors [better]

class Socket : public Nan::ObjectWrap {
  public:
    static NAN_MODULE_INIT(Init) {
        v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
        tpl->SetClassName(Nan::New("NativeNetlink").ToLocalChecked());
        tpl->InstanceTemplate()->SetInternalFieldCount(1);

        Nan::SetPrototypeMethod(tpl, "bind", Bind);
        Nan::SetPrototypeMethod(tpl, "send", Send);
        Nan::SetPrototypeMethod(tpl, "close", Close);
        Nan::SetPrototypeMethod(tpl, "ref", Ref_);
        Nan::SetPrototypeMethod(tpl, "unref", Unref_);
        Nan::SetPrototypeMethod(tpl, "address", Address);
        Nan::SetPrototypeMethod(tpl, "addMembership", AddMembership);
        Nan::SetPrototypeMethod(tpl, "dropMembership", DropMembership);
        Nan::SetPrototypeMethod(tpl, "getRecvBufferSize", GetRecvBufferSize);
        Nan::SetPrototypeMethod(tpl, "setRecvBufferSize", SetRecvBufferSize);
        Nan::SetPrototypeMethod(tpl, "getSendBufferSize", GetSendBufferSize);
        Nan::SetPrototypeMethod(tpl, "setSendBufferSize", SetSendBufferSize);

        constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
        Nan::Set(target, Nan::New("NativeNetlink").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
    }

  private:
    explicit Socket(
        int fd,
        size_t msg_buffer,
        v8::Local<v8::Function>& read_callback,
        v8::Local<v8::Function>& error_callback
    ): fd(fd), msg_buffer(msg_buffer), read_callback(read_callback), error_callback(error_callback) {}
    ~Socket() {
        DoClose();
    }
    void DoClose() {
        if (fd == -1) return;
        uv_close((uv_handle_t*) &timer, NULL);
        // watcher has to be closed before its fd
        // closing should stop & unref it
        uv_close((uv_handle_t*) &watcher, NULL);
        close(fd);
        fd = -1;
        async_res.reset();
    }
    inline bool CheckOpen() {
        if (fd != -1) return false;
        Nan::ThrowError("Netlink socket is closed");
        return true;
    }
    inline void Feed() {
        if (!uv_is_active((uv_handle_t*) &timer))
            uv_timer_start(&timer, TimerHandler, 0, 0); // FIXME: check
    }

    static NAN_METHOD(New) {
        if (!info.IsConstructCall()) return;
        int protocol = Nan::To<int>(info[0]).FromJust();
        size_t msg_buffer = Nan::To<unsigned int>(info[1]).FromJust();
        v8::Local<v8::Function> read_callback = info[2].As<v8::Function>();
        v8::Local<v8::Function> error_callback = info[3].As<v8::Function>();

        // Create the socket
        int flags = 0;
#ifdef SOCK_CLOEXEC
	    flags |= SOCK_CLOEXEC;
#endif
        int fd = socket(AF_NETLINK, SOCK_RAW | flags, protocol);
        if (fd == -1) {
            Nan::ThrowError(Nan::ErrnoException(errno, "socket", "Couldn't create netlink socket"));
            return;
        }

        // Initialize wrapper & watcher
        Socket *obj = new Socket(fd, msg_buffer, read_callback, error_callback);
        int err = uv_poll_init(Nan::GetCurrentEventLoop(), &obj->watcher, obj->fd);
        if (err != 0) {
            delete obj;
            Nan::ThrowError(Nan::ErrnoException(-err, "uv_poll_init", "Couldn't initialize uv_poll"));
            return;
        }
        obj->watcher.data = obj;
        err = uv_poll_start(&obj->watcher, UV_READABLE, PollHandler);
        if (err != 0) {
            delete obj;
            Nan::ThrowError(Nan::ErrnoException(-err, "uv_poll_start", "Couldn't start uv_poll"));
            return;
        }

        err = uv_timer_init(Nan::GetCurrentEventLoop(), &obj->timer);
        if (err != 0) {
            delete obj;
            Nan::ThrowError(Nan::ErrnoException(-err, "uv_timer_init", "Couldn't initialize uv_timer"));
            return;
        }
        obj->timer.data = obj;

        obj->async_res = std::make_unique<Nan::AsyncResource>("netlink:NativeNetlink", info.This());
        obj->Wrap(info.This());
        info.GetReturnValue().Set(info.This());
    }

    static NAN_METHOD(Bind) {
        unsigned int port = Nan::To<unsigned int>(info[0]).FromJust();
        unsigned int groups = Nan::To<unsigned int>(info[1]).FromJust();
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;

        struct sockaddr_nl addr {};
        addr.nl_family = AF_NETLINK;
        addr.nl_pid = port;
        addr.nl_groups = groups;
        int err = bind(obj->fd, (sockaddr*) &addr, sizeof(addr));
        if (err) {
            Nan::ThrowError(Nan::ErrnoException(errno, "bind", "Couldn't bind netlink socket"));
            return;
        }
        uv_ref((uv_handle_t*) &obj->watcher);
    }

    static NAN_METHOD(Send) {
        unsigned int port = Nan::To<unsigned int>(info[0]).FromJust();
        unsigned int groups = Nan::To<unsigned int>(info[1]).FromJust();
        v8::Local<v8::Value> data = info[2];
        v8::Local<v8::Function> callback = info[3].As<v8::Function>();
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        bool empty_queue = obj->write_queue.empty() && obj->completed_queue.empty();

        size_t nbufs;
        std::unique_ptr<struct iovec[]> buffers;
        if (node::Buffer::HasInstance(data)) {
            buffers = std::make_unique<struct iovec[]>(nbufs = 1);
            buffers[0].iov_base = node::Buffer::Data(data);
            buffers[0].iov_len = node::Buffer::Length(data);
        } else if (data->IsArray()) {
            v8::Local<v8::Array> array = data.As<v8::Array>();
            nbufs = array->Length();
            buffers = std::make_unique<struct iovec[]>(nbufs);
            for (size_t i = 0; i < nbufs; i++) {
                v8::Local<v8::Value> item;
                if (!Nan::Get(array, i).ToLocal(&item) || !node::Buffer::HasInstance(item)) {
                    Nan::ThrowTypeError("Items must be buffer");
                    return;
                }
                buffers[i].iov_base = node::Buffer::Data(item);
                buffers[i].iov_len = node::Buffer::Length(item);
            }
        } else {
            Nan::ThrowTypeError("Invalid data -- must be Buffer or Array of Buffers");
            return;
        }

        SendRequest* req = new SendRequest(port, groups, data, callback, std::move(buffers), nbufs);
        obj->write_queue.push(req);

        if (empty_queue && !obj->processing) {
            obj->Sendmsg();
            if (obj->write_queue.empty())
                return;
        }

        int err = uv_poll_start(&obj->watcher, UV_READABLE | UV_WRITABLE, PollHandler);
        if (err != 0) {
            Nan::ThrowError(Nan::ErrnoException(errno, "uv_poll_start"));
            return;
        }
    }

    static void TimerHandler(uv_timer_t* handle) {
        Nan::HandleScope scope;
        Socket* obj = static_cast<Socket*>(handle->data);
        assert(obj->async_res);
        obj->Sendmsg();
        obj->RunCompleted();
        // FIXME: is this correct?
    }

    static void PollHandler(uv_poll_t* handle, int status, int events) {
        Nan::HandleScope scope;
        Socket* obj = static_cast<Socket*>(handle->data);
        assert(obj->async_res);

        if (status != 0) {
            obj->DoClose();
            v8::Local<v8::Value> error = Nan::ErrnoException(-status, NULL, "error when polling socket");
            obj->error_callback(obj->async_res.get(), 1, &error);
            return;
        }
        
        if (events & UV_READABLE)
            obj->Recvmsg();

        if (events & UV_WRITABLE) {
            obj->Sendmsg();
            obj->RunCompleted();
        }
    }

    void Recvmsg() {
        // Prevent loop starvation when the data comes in as fast as (or faster than)
        // we can read it.
        int count = 32;

        while (count-- > 0) {
            struct sockaddr_nl addr {};
            struct iovec iov {};
            struct msghdr hdr {};
            hdr.msg_name = &addr;
            hdr.msg_namelen = sizeof(addr);
            hdr.msg_iov = &iov;
            hdr.msg_iovlen = 1;
            int flags = 0;
            int size = 0;

            // if msg_buffer == 0, then peek first to determine buffer size
            iov.iov_len = msg_buffer;
            if (msg_buffer == 0) {
                char tmpBuf [1];
                iov.iov_base = tmpBuf;
                iov.iov_len = sizeof(tmpBuf);

                do {
                    size = recvmsg(fd, &hdr, flags | MSG_PEEK | MSG_TRUNC);
                } while (size == -1 && errno == EINTR);
                iov.iov_base = NULL;
                iov.iov_len = size;
            }

            // allocate buffer, perform actual read
            if (size >= 0) {
                iov.iov_base = malloc(iov.iov_len);
                if (iov.iov_len > 0 && iov.iov_base == NULL) break;

                do {
                    size = recvmsg(fd, &hdr, flags | MSG_TRUNC);
                } while (size == -1 && errno == EINTR);
            }

            // shrink allocated buffer if message is smaller
            if (size >= 0 && size < iov.iov_len) {
                iov.iov_base = realloc(iov.iov_base, size);
                iov.iov_len = size;
                if (size > 0 && iov.iov_base == NULL) break;
            }

            // break on error (calling error_callback if needed)
            if (size == -1) {
                free(iov.iov_base);
                if (!(errno == EAGAIN || errno == EWOULDBLOCK)) {
                    Nan::HandleScope scope;
                    v8::Local<v8::Value> error = Nan::ErrnoException(errno, "recvmsg", "Error when receiving Netlink message");
                    error_callback(async_res.get(), 1, &error);
                }
                break;
            }

            // wrap result into Buffer, call read_callback
            Nan::HandleScope scope;

            v8::Local<v8::Value> buf;
            if (!Nan::NewBuffer((char*) iov.iov_base, iov.iov_len).ToLocal(&buf)) {
                free(iov.iov_base);
                v8::Local<v8::Value> error = Nan::Error("Couldn't wrap buffer");
                error_callback(async_res.get(), 1, &error);
                return;
            }

            assert(addr.nl_family == AF_NETLINK && hdr.msg_namelen == sizeof(addr));
            v8::Local<v8::Object> rinfo = Nan::New<v8::Object>();
            Nan::Set(rinfo, Nan::New("port").ToLocalChecked(), Nan::New(addr.nl_pid));
            Nan::Set(rinfo, Nan::New("groups").ToLocalChecked(), Nan::New(addr.nl_groups));
            if (hdr.msg_flags & MSG_TRUNC)
                Nan::Set(rinfo, Nan::New("truncated").ToLocalChecked(), Nan::New(size));
            
            v8::Local<v8::Value> argv [] = { buf, rinfo };
            read_callback(async_res.get(), 2, argv);

            // callback may decide to close the socket
            if (fd == -1) break;
        }
    }

    void Sendmsg() {
        while (!write_queue.empty()) {
            SendRequest* req = write_queue.front();

            int size;
            do {
                size = sendmsg(fd, &req->msg, 0);
            } while (size == -1 && errno == EINTR);

            if (size == -1) {
                if (errno == EAGAIN || errno == EWOULDBLOCK || errno == ENOBUFS)
                    break;
            }

            req->status = (size == -1 ? -errno : size);
            write_queue.pop();
            completed_queue.push(req);
            Feed();
        }
    }

    void RunCompleted() {
        Nan::HandleScope scope;
        assert(!processing);
        processing = true;

        while (!completed_queue.empty()) {
            std::unique_ptr<SendRequest> req (completed_queue.front());
            completed_queue.pop();
            v8::Local<v8::Value> error = (req->status >= 0) ? Nan::Undefined().As<v8::Value>() :
                Nan::ErrnoException(-req->status, "sendmsg", "Error when sending Netlink message");
            req->callback(req.get(), 1, &error);
        }

        if (write_queue.empty()) {
            // Pending queue and completion queue empty, stop watching for write
            int err = uv_poll_start(&watcher, UV_READABLE, PollHandler);
            if (err != 0) {
                v8::Local<v8::Value> error = Nan::ErrnoException(-err, "uv_poll_start");
                error_callback(async_res.get(), 1, &error);
            }
        }

        processing = false;
    }

    static NAN_METHOD(Close) {
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        obj->DoClose();
    }

    static NAN_METHOD(Ref_) {
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        uv_ref((uv_handle_t*) &obj->watcher);
    }

    static NAN_METHOD(Unref_) {
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        uv_unref((uv_handle_t*) &obj->watcher);
    }

    static NAN_METHOD(Address) {
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        sockaddr_nl addr;
        unsigned int len = sizeof(addr);
        int err = getsockname(obj->fd, (sockaddr*) &addr, &len);
        if (err != 0) {
            Nan::ThrowError(Nan::ErrnoException(errno, "getsockname"));
            return;
        }
        assert(addr.nl_family == AF_NETLINK && len == sizeof(addr));
        v8::Local<v8::Object> res = Nan::New<v8::Object>();
        Nan::Set(res, Nan::New("port").ToLocalChecked(), Nan::New(addr.nl_pid));
        Nan::Set(res, Nan::New("groups").ToLocalChecked(), Nan::New(addr.nl_groups));
        info.GetReturnValue().Set(res);
    }

    static NAN_METHOD(AddMembership) {
        unsigned int group = Nan::To<unsigned int>(info[0]).FromJust();
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        int err = setsockopt(obj->fd, SOL_NETLINK, NETLINK_ADD_MEMBERSHIP, &group, sizeof(group));
        if (err != 0) {
            Nan::ThrowError(Nan::ErrnoException(errno, "setsockopt", "Couldn't add membership"));
            return;
        }
    }

    static NAN_METHOD(DropMembership) {
        unsigned int group = Nan::To<unsigned int>(info[0]).FromJust();
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        int err = setsockopt(obj->fd, SOL_NETLINK, NETLINK_DROP_MEMBERSHIP, &group, sizeof(group));
        if (err != 0) {
            Nan::ThrowError(Nan::ErrnoException(errno, "setsockopt", "Couldn't drop membership"));
            return;
        }
    }

    static NAN_METHOD(SetRecvBufferSize) {
        int size = Nan::To<int>(info[0]).FromJust();
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        if (size <= 0) size = 32768;
        int err = setsockopt(obj->fd, SOL_SOCKET, SO_RCVBUF, &size, sizeof(size));
        if (err != 0) {
            Nan::ThrowError(Nan::ErrnoException(errno, "setsockopt", "Couldn't set receive buffer size"));
            return;
        }
    }

    static NAN_METHOD(GetRecvBufferSize) {
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        int size;
        socklen_t len = sizeof(size);
        int err = getsockopt(obj->fd, SOL_SOCKET, SO_RCVBUF, &size, &len);
        if (err != 0) {
            Nan::ThrowError(Nan::ErrnoException(errno, "getsockopt", "Couldn't get receive buffer size"));
            return;
        }
        assert(len == sizeof(size));
        info.GetReturnValue().Set(Nan::New(size));
    }

    static NAN_METHOD(SetSendBufferSize) {
        int size = Nan::To<int>(info[0]).FromJust();
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        if (size <= 0) size = 32768;
        int err = setsockopt(obj->fd, SOL_SOCKET, SO_SNDBUF, &size, sizeof(size));
        if (err != 0) {
            Nan::ThrowError(Nan::ErrnoException(errno, "setsockopt", "Couldn't set send buffer size"));
            return;
        }
    }

    static NAN_METHOD(GetSendBufferSize) {
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        if (obj->CheckOpen()) return;
        int size;
        socklen_t len = sizeof(size);
        int err = getsockopt(obj->fd, SOL_SOCKET, SO_SNDBUF, &size, &len);
        if (err != 0) {
            Nan::ThrowError(Nan::ErrnoException(errno, "getsockopt", "Couldn't get send buffer size"));
            return;
        }
        assert(len == sizeof(size));
        info.GetReturnValue().Set(Nan::New(size));
    }

    static Nan::Persistent<v8::Function> constructor;

    int fd;
    size_t msg_buffer;
    uv_timer_t timer;
    uv_poll_t watcher;
    Nan::Callback read_callback;
    Nan::Callback error_callback;
    std::unique_ptr<Nan::AsyncResource> async_res;
    std::queue<SendRequest*> write_queue;
    std::queue<SendRequest*> completed_queue;
    bool processing = false;
};
Nan::Persistent<v8::Function> Socket::constructor;

NAN_MODULE_INIT(Init) {
    Socket::Init(target);
}

DISABLE_WCAST_FUNCTION_TYPE
NODE_MODULE(netlink_binding, Init)
DISABLE_WCAST_FUNCTION_TYPE_END
