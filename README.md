# netlink

This provides a Node.JS interface to Netlink, a websockets-like
communication protocol available on Linux. Netlink is usually used
to perform administrative operations (manage firewall, network, etc.)
and listen for related notifications from the kernel, but also serves
as a generic IPC mechanism.

It also implements the Generic Netlink protocol.

**Note:** This is early stage; API compatibility is not maintained.
If you are going to use this, pin to a specific version.


## System APIs

In addition to plain Netlink and Generic Netlink, the following
APIs are implemented:

 - `rtnetlink`: manages network configuration (routes, addresses, links,
   neighbors, traffic control, etc.)

 - `nl80211`: 802.11 aka wifi interface (`iw`, `hostapd`, `wpa_supplicant`, etc.)

The point is to wrap these interface in a high-level way, complete
with TypeScript typings. However some fields will be set to
`Buffer` (i.e. unparsed) because its type is not yet known. You can
help by [improving the type definitions](./types).


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

### Managing network configuration (rtnetlink)

~~~ js
const { rt, ifla, createRtNetlink } = require('netlink')
const socket = createRtNetlink()

// List addresses
const addrs = await socket.getAddresses()
console.log('Addresses:', addrs)

// List routes
const routes = await socket.getRoutes()
console.log('Routes:', routes)

// Set eth0 up
const links = await socket.getLinks()
const eth0 = links.filter(x => x.attrs.ifname === 'eth0')[0]
await socket.setLink({
  index: eth0.index,
  change: { up: true },
  flags: { up: true },
})
~~~

### Managing 802.11 (aka wifi) interfaces

~~~ js
const { nl80211: iw, createNl80211 } = require('netlink')

// Prepare a socket (a promise is returned)
const socket = await createNl80211()

// List interfaces
const ifaces = await socket.getInterfaces()
for (const iface of ifaces.values())
  console.log(`Found inferface ${iface.ifindex}: ${iface.ifname} type ${iface.iftype}`)

// Operate on the first interface we find
const ifindex = [...ifaces.values()][0].ifindex

// Switch to a different frequency
await socket.request(iw.Commands.SET_CHANNEL, {
  ifindex,
  wiphyFreq: 5520,
  wiphyChannelType: 'HT40MINUS',
})

// Trigger a scan
await socket.request(iw.Commands.TRIGGER_SCAN, { ifindex })
~~~

### Listing Generic Netlink families

~~~ js
const { createGenericNetlink, AttrStream, FLAGS_GET, genl, nl80211 } = require('netlink')
const socket = createGenericNetlink()

const families = await socket.sendCtrlRequest(
    genl.Commands.GET_FAMILY, {}, { flags: FLAGS_GET.DUMP })

console.log(`Listing ${families.length} families:`)
for (const family of families) {
    console.log(` - ${family.familyId}: ${JSON.stringify(family.familyName)}`)
    console.log(`   ${(family.ops || []).length} operations`)
    console.log(`   multicast groups:`)
    for (const mg of family.mcastGroups || []) {
        console.log(`    - ${mg.id}: ${JSON.stringify(mg.name)}`)
    }
}
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

