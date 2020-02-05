# netlink

This provides a Node.JS interface to Netlink, a websockets-like
communication protocol available on Linux. Netlink is usually used
to perform administrative operations (manage firewall, network, etc.)
and listen for related notifications from the kernel, but also serves
as a generic IPC mechanism.

It also implements the Generic Netlink protocol, and includes a few
common messages / operations.


## Usage

Make sure that compiler and associated tools are installed, and then
install the module, i.e.:

~~~ bash
sudo apt install build-essential
npm install netlink
~~~

Example usage:

~~~ js
const { createNetlink, PROTOCOLS } = require('netlink')

const socket = createNetlink(PROTOCOLS.ROUTE)

socket.on('message', (msg, rinfo) => {
  console.log(`Received message from ${rinfo.port}:`, msg)
})

// Send a Netlink message over the socket, to port 1
const data = Buffer.from('...')
socket.send(type, data, { flags: ..., port: 1 })

// Send message with REQUEST and ACK flags set, wait for a reply
const data = Buffer.from('...')
socket.sendRequest(type, data, { timeout: 1000 })
    .then(([ reply, rinfo ]) => {
        console.log('Received a reply:', reply)
    }, error => {
        console.error('Request failed:', error)
    })
~~~


## Design

For Netlink applications, it's recommended to use libnl.
However it's a very small library and its API is very C oriented;
exposing it properly would be too much work for the benefits, as well
as introduce a native dependency. Instead it has been reimplemented
in Javascript, which gives the user much more flexibility.

This makes the native code very thin (read: 500 lines), the rest
is done in JavaScript. This introduces a performance penalty, but
allows for little need to ever touch the native code.

The module is composed of several layers:

  - `raw`: the lowest layer, which exposes the native
    interface (`RawNetlinkSocket`) to create Netlink sockets and
    send / receive raw data over them. Its API is intended to
    mirror [`dgram.Socket`](https://nodejs.org/api/dgram.html).
    This is the only layer that interacts with the native code.

    This layer manages creation of unique port numbers, credential
    passing, addressing, message peeking, truncated messages, etc.

    In general, you shouldn't need to use this interface directly.

  - `netlink`: this wraps `RawNetlinkSocket` and lets the user
    send / receive parsed Netlink messages, rather than raw data. It
    can also take care of things like requests & ACKs, sequence numbers,
    multipart message handling, attribute parsing.
  
  - `generic_netlink`: this implements the Generic Netlink protocol
    on top of `netlink`.


