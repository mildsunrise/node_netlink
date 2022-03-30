# netlink

Node.js interface to Netlink, a Linux-specific socket
protocol. Many management kernel APIs (firewall, network, etc.)
are accessed through Netlink; as well as listening for related
notifications from the kernel, but it also serves as a generic
IPC mechanism.

It also implements the Generic Netlink protocol.

**Note:** This is early stage; API compatibility is not maintained.
If you are going to use this, pin to a specific version.

**[💡 Examples](#examples)** &nbsp;•&nbsp; **[📚 API reference](https://netlink.alba.sh/docs/modules.html)**


## System APIs

In addition to plain Netlink and Generic Netlink, the following
APIs are implemented:

 - `rtnetlink`: manages network configuration (routes, addresses, links,
   neighbors, traffic control, etc.)

 - `nl80211`: 802.11 aka wifi interface (used by `iw`, `hostapd`, `wpa_supplicant`, etc.)

The point is to wrap these interfaces in a high-level way, complete
with TypeScript typings. However some fields will be set to
`Buffer` (i.e. unparsed) because its type is not yet known. You can
help by [improving the type definitions](./types).


## Usage

There's prebuilds for x86, x64, arm32v7 and arm64v8, so you don't need anything in those cases.

For other archs, you only need a compiler:

~~~ bash
sudo apt install build-essential
~~~

Then, install this module:

~~~ bash
npm install netlink
~~~

Netlink APIs are backwards-compatible, but the running kernel may
have an older version of the APIs implemented. Thus, not all
attributes, fields and commands listed in the typings are necessarily
supported. For input, unknown attributes will be collected
at the `__unparsed` field. For output, attempting to use
unimplemented features will generally result in `EINVAL`.


## Examples

### Sending messages over a Netlink socket

~~~ js
const { createNetlink, Protocol } = require('netlink')
const socket = createNetlink(Protocol.ROUTE)

socket.on('message', (msg, rinfo) => {
  console.log(`Received message from ${rinfo.port}:`, msg)
})

// Send a Netlink message over the socket, to port 1
const data = Buffer.from('...')
socket.send(type, data, { flags: ..., port: 1 })

// Send message with REQUEST and ACK flags set, wait for a reply
const data = Buffer.from('...')
socket.request(type, data, { timeout: 1000 })
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

### Subscribing to multicast groups (rtnetlink)

~~~ js
const { rt, createRtNetlink } = require('netlink')

// ref: true causes this socket to keep the event loop alive
const socket = createRtNetlink({ ref: true })

socket.socket.addMembership(rt.MulticastGroups.IPV4_IFADDR)

socket.on('message', message => {
  for (const part of message) {
    if (part.kind === 'address') {
      const { data, attrs } = part
      const ifaceDesc = `${data.index} (${attrs.label})`
      // we're only subscribed to IPv4, no need to check `data.family`
      const addressDesc = `${attrs.address.join('.')}/${data.prefixlen}`
      console.log(`change in address ${addressDesc} of interface ${ifaceDesc}:`, part)
    }
  }
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
const { createGenericNetlink, FlagsGet, genl } = require('netlink')
const socket = createGenericNetlink()

const families = await socket.ctrlRequest(
    genl.Commands.GET_FAMILY, {}, { flags: FlagsGet.DUMP })

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
const { createNetlink, Protocol } = require('netlink')

const socket1 = createNetlink(Protocol.ROUTE)
const socket2 = createNetlink(Protocol.ROUTE)
// module automatically generates unique IDs, but
// you can also pass a specific address to bind to
const socket3 = createNetlink(Protocol.ROUTE, { localPort: 5000 })

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
const { createNetlink, RawNetlinkSocket, Protocol } = require('netlink')
const socket = new RawNetlinkSocket(Protocol.ROUTE)

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

