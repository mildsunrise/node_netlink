#include <sys/socket.h>
#include <unistd.h>

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

class Socket : public Nan::ObjectWrap {
  public:
    static NAN_MODULE_INIT(Init) {
        v8::Local<v8::FunctionTemplate> tpl = Nan::New<v8::FunctionTemplate>(New);
        tpl->SetClassName(Nan::New("NativeNetlink").ToLocalChecked());
        tpl->InstanceTemplate()->SetInternalFieldCount(1);

        Nan::SetPrototypeMethod(tpl, "close", Close);

        constructor.Reset(Nan::GetFunction(tpl).ToLocalChecked());
        Nan::Set(target, Nan::New("NativeNetlink").ToLocalChecked(), Nan::GetFunction(tpl).ToLocalChecked());
    }

  private:
    explicit Socket(int fd): fd(fd) {}
    ~Socket() {
        Close();
    }
    void Close() {
        if (this->fd == -1) return;
        uv_poll_stop(&watcher);
        close(fd);
        fd = -1;
    }
    static void PollHandler(uv_poll_t* handle, int status, int events) {
        Socket* obj = reinterpret_cast<Socket*>(handle->data);
    }

    static NAN_METHOD(New) {
        if (!info.IsConstructCall())
            abort();
        int protocol = Nan::To<int>(info[0]).FromJust();

        Socket *obj = new Socket(-1);
        uv_poll_init_socket(Nan::GetCurrentEventLoop(), &obj->watcher, obj->fd);
        obj->watcher.data = obj;
        uv_poll_start(&obj->watcher, UV_READABLE | UV_WRITABLE, PollHandler);

        obj->Wrap(info.This());
        info.GetReturnValue().Set(info.This());
    }
    static NAN_METHOD(Close) {
        Socket* obj = Nan::ObjectWrap::Unwrap<Socket>(info.This());
        obj->Close();
    }
    static Nan::Persistent<v8::Function> constructor;

    int fd;
    uv_poll_t watcher;
};

NAN_MODULE_INIT(Init) {
    Socket::Init(target);
}

DISABLE_WCAST_FUNCTION_TYPE
NODE_MODULE(netlink_binding, Init)
DISABLE_WCAST_FUNCTION_TYPE_END
