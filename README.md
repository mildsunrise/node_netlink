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

### Sending messages over a Netlink socket

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

### Managing 802.11 (aka wifi) interfaces

~~~ js
const { createGenericNetlink, AttrStream, FLAGS_GET, genl, nl80211 } = require('netlink')
const socket = createGenericNetlink()

// Get family ID
const families = await socket.sendCtrlRequest(
    genl.Commands.GET_FAMILY, {}, { flags: FLAGS_GET.DUMP })
const { familyId, version } = families.filter(x => x.familyName === 'nl80211')[0]

// Function to send 802.11 requests easily
async function nl80211_req(cmd, msg, options) {
  const data = new AttrStream()
  data.emit(nl80211.formatMessage(msg))
  const [omsg, rinfo] = await socket.sendRequest(familyId, cmd, version, data.bufs, options)
  return omsg.map(x => nl80211.parseMessage(x.data))
}

// Get interfaces info
const ifaces = await nl80211_req(nl80211.Commands.GET_INTERFACE, {}, { flags: FLAGS_GET.DUMP })
for (const iface of ifaces)
  console.log(`Found inferface ${iface.ifindex}: ${iface.ifname} type ${iface.iftype}`)
~~~

### Communication between sockets

~~~ js
const { createNetlink, PROTOCOLS } = require('netlink')

const socket1 = createNetlink(PROTOCOLS.ROUTE)
const socket2 = createNetlink(PROTOCOLS.ROUTE)
// module automatically generates unique IDs, but
// you can also pass a specific address to bind to
const socket3 = createNetlink(PROTOCOLS.ROUTE, { localPort: 5000 })

const port1 = socket1.address().port
const port2 = socket2.address().port
const port3 = socket3.address().port
console.log('Sockets bound to addresses:', port1, port2, port3)

socket1.on('message', (msg, rinfo) => {
  console.log(`${rinfo.port} says: ${msg[0].data}`)
})

// Send message from socket3 to socket1
socket3.send(100, Buffer.from('Hello!'), { port: port1 })
~~~

### Sending raw data over a Netlink socket

~~~ js
const { createNetlink, RawNetlinkSocket, PROTOCOLS } = require('netlink')
const socket = new RawNetlinkSocket(PROTOCOLS.ROUTE)

// TODO
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



FIXME: cache layer
