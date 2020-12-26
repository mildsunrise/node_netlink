#include <sys/socket.h>
#include <linux/netlink.h>
#include <unistd.h>
#include <errno.h>
#include <queue>
#include <memory>
#include <sstream>
#include <assert.h>

#include <napi.h>
#include <uv.h>

#ifndef SOL_NETLINK
#define SOL_NETLINK	270
#endif

using Napi::CallbackInfo;

Napi::Error ErrnoException(Napi::Env env, int errnum, const char* syscall, std::string message) {
    char tmpbuf [128];
    char* errcode = uv_err_name_r(-errnum, tmpbuf, sizeof(tmpbuf));
    char tmpbuf2 [128];
    char* errmsg = uv_strerror_r(-errnum, tmpbuf2, sizeof(tmpbuf2));

    std::ostringstream msg;
    msg << message << ": " << errmsg;
    auto error = Napi::Error::New(env, msg.str());
    error.Set("errno", Napi::Number::New(env, errnum));
    error.Set("code", Napi::String::New(env, errcode));
    error.Set("syscall", Napi::String::New(env, syscall));
    return error;
}

Napi::Error ErrnoException(Napi::Env env, int errnum, const char* syscall) {
    std::ostringstream msg;
    msg << syscall << " failed";
    return ErrnoException(env, errnum, syscall, msg.str());
}


template <class T> class UvHandle {
  public:
    ~UvHandle() {
        if (init) uv_close((uv_handle_t*) &handle, NULL);
    }
    inline bool isActive() {
        return uv_is_active((uv_handle_t*) &handle);
    }
    inline void ref() {
        uv_ref((uv_handle_t*) &handle);
    }
    inline void unref() {
        uv_unref((uv_handle_t*) &handle);
    }
    inline void setData(void* data) {
        handle.data = data;
    }
    UvHandle(const UvHandle&) = delete;
    UvHandle& operator=(const UvHandle&) = delete;
  protected:
    UvHandle(): init(false) {};
    bool init;
    T handle;
};

class UvTimer : public UvHandle<uv_timer_t> {
  public:
    UvTimer(Napi::Env env, uv_loop_t* loop) {
        if (auto err = uv_timer_init(loop, &handle))
            throw ErrnoException(env, -err, "uv_timer_init");
        init = true;
    }
    void start(Napi::Env env, uv_timer_cb cb, uint64_t timeout, uint64_t repeat) {
        if (auto err = uv_timer_start(&handle, cb, timeout, repeat))
            throw ErrnoException(env, -err, "uv_timer_start");
    }
};

class UvPoll : public UvHandle<uv_poll_t> {
  public:
    UvPoll(Napi::Env env, uv_loop_t* loop, int fd) {
        if (auto err = uv_poll_init(loop, &handle, fd))
            throw ErrnoException(env, -err, "uv_poll_init");
        init = true;
    }
    void start(Napi::Env env, int events, uv_poll_cb cb) {
        if (auto err = uv_poll_start(&handle, events, cb))
            throw ErrnoException(env, -err, "uv_poll_start");
    }
};

class FileDescriptor {
  public:
    FileDescriptor(int fd): fd(fd) {}
    FileDescriptor(): fd(-1) {}
    ~FileDescriptor() {
        reset();
    }
    void reset() {
        if (fd != -1) {
            close(fd);
            fd = -1;
        }
    }
    inline operator int() {
        return fd;
    }
    inline FileDescriptor& operator=(int fd) {
        reset();
        this->fd = fd;
        return *this;
    }
    FileDescriptor(const FileDescriptor&) = delete;
    FileDescriptor& operator=(const FileDescriptor&) = delete;
  private:
    int fd;
};


Napi::Object nlsockaddrToObject(Napi::Env env, const struct sockaddr_nl& addr, size_t len) {
    assert(addr.nl_family == AF_NETLINK && len == sizeof(addr));
    auto res = Napi::Object::New(env);
    res["port"] = Napi::Number::New(env, addr.nl_pid);
    res["groups"] = Napi::Number::New(env, addr.nl_groups);
    return res;
}

void deleteFinalizer(Napi::Env env, char* obj) {
    delete[] obj;
}

class SendRequest : public Napi::AsyncContext {
  public:
    SendRequest(Napi::Env env, Napi::Object& res, int port, int groups, Napi::Value& data, Napi::Function& callback,
                std::unique_ptr<struct iovec[]> buffers_, size_t nbufs):
            Napi::AsyncContext(env, "netlink::NativeNetlinkSend", res),
            data(Napi::Persistent(data)), callback(Napi::Persistent(callback)),
            buffers(std::move(buffers_)) {
        addr.nl_family = AF_NETLINK;
        addr.nl_pid = port;
        addr.nl_groups = groups;
        msg.msg_name = &addr;
        msg.msg_namelen = sizeof(addr);
        msg.msg_iovlen = nbufs;
        msg.msg_iov = buffers.get();
    }
    Napi::Reference<Napi::Value> data; // Not really used, just to keep the buffers memory alive
    Napi::FunctionReference callback;
    std::unique_ptr<struct iovec[]> buffers;
    struct msghdr msg {};
    struct sockaddr_nl addr {};
    int status;
};

// FIXME: do we need to try/catch when calling callbacks?

class Socket : public Napi::ObjectWrap<Socket> {
  public:
    static Napi::Object Init(Napi::Env env, Napi::Object exports) {
        Napi::Function func = DefineClass(env, "NativeNetlink", {
            InstanceMethod<&Socket::Bind>("bind"),
            InstanceMethod<&Socket::Send>("send"),
            InstanceMethod<&Socket::Close>("close"),
            InstanceMethod<&Socket::Ref_>("ref"),
            InstanceMethod<&Socket::Unref_>("unref"),
            InstanceMethod<&Socket::Address>("address"),
            InstanceMethod<&Socket::AddMembership>("addMembership"),
            InstanceMethod<&Socket::DropMembership>("dropMembership"),
            InstanceMethod<&Socket::GetRecvBufferSize>("getRecvBufferSize"),
            InstanceMethod<&Socket::SetRecvBufferSize>("setRecvBufferSize"),
            InstanceMethod<&Socket::GetSendBufferSize>("getSendBufferSize"),
            InstanceMethod<&Socket::SetSendBufferSize>("setSendBufferSize"),
        });

        Napi::FunctionReference* constructor = new Napi::FunctionReference();
        *constructor = Napi::Persistent(func);
        exports.Set("NativeNetlink", func);

        env.SetInstanceData<Napi::FunctionReference>(constructor);

        return exports;
    }

    Socket(const CallbackInfo& info): Napi::ObjectWrap<Socket>(info) {
        Napi::Env env = info.Env();
        uv_loop_t* loop = nullptr;
        NAPI_THROW_IF_FAILED_VOID(env, napi_get_uv_event_loop(env, &loop));

        int protocol = Napi::Number(env, info[0]);
        msg_buffer = (unsigned int) Napi::Number(env, info[1]);
        read_callback = Napi::Persistent(Napi::Function(env, info[2]));
        error_callback = Napi::Persistent(Napi::Function(env, info[3]));

        // Create the socket
        int flags = 0;
#ifdef SOCK_CLOEXEC
	    flags |= SOCK_CLOEXEC;
#endif
        fd = socket(AF_NETLINK, SOCK_RAW | flags, protocol);
        if (fd == -1)
            throw ErrnoException(env, errno, "socket", "Couldn't create netlink socket");

        watcher = std::make_unique<UvPoll>(env, loop, fd);
        watcher->setData(this);

        timer = std::make_unique<UvTimer>(env, loop);
        timer->setData(this);

        async_res = std::make_unique<Napi::AsyncContext>(env, "netlink:NativeNetlink", Value());

        open = true;
    }

  private:
    void DoClose() {
        open = false;

        timer.reset();
        // watcher has to be closed before its fd
        // closing should stop & unref it
        watcher.reset();
        fd.reset();
        async_res.reset();

        std::queue<std::unique_ptr<SendRequest>>().swap(write_queue);
        std::queue<std::unique_ptr<SendRequest>>().swap(completed_queue);
    }
    inline void CheckOpen(Napi::Env env) {
        if (!open)
            throw Napi::Error::New(env, "Netlink socket is closed");
    }
    inline void Feed() {
        if (!timer->isActive())
            timer->start(Env(), TimerHandler, 0, 0);
    }

    void Bind(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        unsigned int port = Napi::Number(env, info[0]);
        unsigned int groups = Napi::Number(env, info[1]);
        CheckOpen(env);

        struct sockaddr_nl addr {};
        addr.nl_family = AF_NETLINK;
        addr.nl_pid = port;
        addr.nl_groups = groups;
        if (bind(fd, (sockaddr*) &addr, sizeof(addr)))
            throw ErrnoException(env, errno, "bind", "Couldn't bind netlink socket");
        watcher->ref();
    }

    void Send(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        unsigned int port = Napi::Number(env, info[0]);
        unsigned int groups = Napi::Number(env, info[1]);
        auto data = info[2];
        auto callback = Napi::Function(env, info[3]);
        CheckOpen(env);

        size_t nbufs;
        std::unique_ptr<struct iovec[]> buffers;
        if (data.IsBuffer()) {
            auto item = Napi::Buffer<char>(env, data);
            buffers = std::make_unique<struct iovec[]>(nbufs = 1);
            buffers[0].iov_base = item.Data();
            buffers[0].iov_len = item.Length();
        } else if (data.IsArray()) {
            auto array = Napi::Array(env, data);
            nbufs = array.Length();
            buffers = std::make_unique<struct iovec[]>(nbufs);
            for (size_t i = 0; i < nbufs; i++) {
                auto item = Napi::Buffer<char>(env, Napi::Value(array[i]));
                buffers[i].iov_base = item.Data();
                buffers[i].iov_len = item.Length();
            }
        } else {
            throw Napi::TypeError::New(env, "Invalid data -- must be Buffer or Array of Buffers");
        }

        bool empty_queue = write_queue.empty() && completed_queue.empty();
        Napi::Object res = Value();
        write_queue.push(std::make_unique<SendRequest>(
            env, res, port, groups, data, callback, std::move(buffers), nbufs));

        if (empty_queue && !processing) {
            Sendmsg();
            if (write_queue.empty())
                return;
        }

        watcher->start(env, UV_READABLE | UV_WRITABLE, PollHandler);
    }

    static void TimerHandler(uv_timer_t* handle) {
        Socket* obj = static_cast<Socket*>(handle->data);
        Napi::HandleScope scope (obj->Env());
        assert(obj->async_res);
        obj->Sendmsg();
        obj->RunCompleted();
        // FIXME: is this correct?
    }

    static void PollHandler(uv_poll_t* handle, int status, int events) {
        Socket* obj = static_cast<Socket*>(handle->data);
        Napi::HandleScope scope (obj->Env());
        assert(obj->async_res);

        if (status != 0) {
            auto error = ErrnoException(obj->Env(), -status, NULL, "error when polling socket");
            obj->error_callback.MakeCallback(obj->Value(), { error.Value() }, *obj->async_res);
            obj->DoClose();
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
            std::unique_ptr<char[]> data;
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
                data = std::make_unique<char[]>(iov.iov_len);
                iov.iov_base = data.get();
                if (iov.iov_len > 0 && iov.iov_base == NULL) break;

                do {
                    size = recvmsg(fd, &hdr, flags | MSG_TRUNC);
                } while (size == -1 && errno == EINTR);
            }

            // break on error (calling error_callback if needed)
            if (size == -1) {
                if (!(errno == EAGAIN || errno == EWOULDBLOCK)) {
                    Napi::Env env = Env();
                    Napi::HandleScope scope (env);
                    auto error = ErrnoException(env, errno, "recvmsg", "Error when receiving Netlink message");
                    error_callback.MakeCallback(Value(), { error.Value() }, *async_res);
                }
                break;
            }

            Napi::Env env = Env();
            Napi::HandleScope scope (env);

            // wrap result into Buffer (transferring ownership), call read_callback
            auto buf = Napi::Buffer<char>::New(env, data.release(), std::min((size_t)size, iov.iov_len), deleteFinalizer);

            auto rinfo = nlsockaddrToObject(env, addr, hdr.msg_namelen);
            if (hdr.msg_flags & MSG_TRUNC)
                rinfo["truncated"] = Napi::Number::New(env, size);

            read_callback.MakeCallback(Value(), { buf, rinfo }, *async_res);

            // callback may decide to close the socket
            if (fd == -1) break;
        }
    }

    void Sendmsg() {
        while (!write_queue.empty()) {
            SendRequest* req = write_queue.front().get();

            int size;
            do {
                size = sendmsg(fd, &req->msg, 0);
            } while (size == -1 && errno == EINTR);

            if (size == -1) {
                if (errno == EAGAIN || errno == EWOULDBLOCK || errno == ENOBUFS)
                    break;
            }

            req->status = (size == -1 ? -errno : size);
            completed_queue.push(std::move(write_queue.front()));
            write_queue.pop();
            Feed();
        }
    }

    void RunCompleted() {
        Napi::HandleScope scope (Env());
        assert(!processing);
        processing = true;

        while (!completed_queue.empty()) {
            std::unique_ptr<SendRequest> req = std::move(completed_queue.front());
            completed_queue.pop();
            Napi::Value error = (req->status >= 0) ? Env().Undefined() :
                ErrnoException(Env(), -req->status, "sendmsg", "Error when sending Netlink message").Value();
            req->callback.MakeCallback(Value(), { error }, *req);
        }

        if (write_queue.empty())
            // Pending queue and completion queue empty, stop watching for write
            watcher->start(Env(), UV_READABLE, PollHandler);
            // XXX: catch exceptions in PollHandler / TimerHandler, call error

        processing = false;
    }

    void Close(const CallbackInfo& info) {
        DoClose();
    }

    void Ref_(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        CheckOpen(env);
        watcher->ref();
    }

    void Unref_(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        CheckOpen(env);
        watcher->unref();
    }

    Napi::Value Address(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        CheckOpen(env);
        sockaddr_nl addr;
        unsigned int len = sizeof(addr);
        if (getsockname(fd, (sockaddr*) &addr, &len))
            throw ErrnoException(env, errno, "getsockname");
        return nlsockaddrToObject(env, addr, len);
    }

    void AddMembership(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        unsigned int group = Napi::Number(env, info[0]);
        CheckOpen(env);
        if (setsockopt(fd, SOL_NETLINK, NETLINK_ADD_MEMBERSHIP, &group, sizeof(group)))
            throw ErrnoException(env, errno, "setsockopt", "Couldn't add membership");
    }

    void DropMembership(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        unsigned int group = Napi::Number(env, info[0]);
        CheckOpen(env);
        if (setsockopt(fd, SOL_NETLINK, NETLINK_DROP_MEMBERSHIP, &group, sizeof(group)))
            throw ErrnoException(env, errno, "setsockopt", "Couldn't drop membership");
    }

    void SetRecvBufferSize(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        int size = Napi::Number(env, info[0]);
        CheckOpen(env);
        if (size <= 0) size = 32768;
        if (setsockopt(fd, SOL_SOCKET, SO_RCVBUF, &size, sizeof(size)))
            throw ErrnoException(env, errno, "setsockopt", "Couldn't set receive buffer size");
    }

    Napi::Value GetRecvBufferSize(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        CheckOpen(env);
        int size;
        socklen_t len = sizeof(size);
        if (getsockopt(fd, SOL_SOCKET, SO_RCVBUF, &size, &len))
            throw ErrnoException(env, errno, "getsockopt", "Couldn't get receive buffer size");
        assert(len == sizeof(size));
        return Napi::Number::New(env, size);
    }

    void SetSendBufferSize(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        int size = Napi::Number(env, info[0]);
        CheckOpen(env);
        if (size <= 0) size = 32768;
        if (setsockopt(fd, SOL_SOCKET, SO_SNDBUF, &size, sizeof(size)))
            throw ErrnoException(env, errno, "setsockopt", "Couldn't set send buffer size");
    }

    Napi::Value GetSendBufferSize(const CallbackInfo& info) {
        Napi::Env env = info.Env();
        CheckOpen(env);
        int size;
        socklen_t len = sizeof(size);
        if (getsockopt(fd, SOL_SOCKET, SO_SNDBUF, &size, &len))
            throw ErrnoException(env, errno, "getsockopt", "Couldn't get send buffer size");
        assert(len == sizeof(size));
        return Napi::Number::New(env, size);
    }

    bool open;
    size_t msg_buffer;
    Napi::FunctionReference read_callback;
    Napi::FunctionReference error_callback;
    FileDescriptor fd;
    std::unique_ptr<UvTimer> timer;
    std::unique_ptr<UvPoll> watcher;
    std::unique_ptr<Napi::AsyncContext> async_res;
    std::queue<std::unique_ptr<SendRequest>> write_queue;
    std::queue<std::unique_ptr<SendRequest>> completed_queue;
    bool processing = false;
};

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    Socket::Init(env, exports);
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init)
