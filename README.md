# netlink

This provides a Node.JS interface to Netlink, a websockets-like
communication protocol available on Linux. Netlink is usually used
to perform administrative operations (manage firewall, network, etc.)
and listen for related notifications from the kernel, but also serves
as a generic IPC mechanism.


## Usage

Make sure that compiler and associated tools are installed, and then
install the module, i.e.:

~~~ bash
sudo apt install build-essential
npm install netlink
~~~

<!-- TODO: explain api -->

### Port numbers

This module doesn't use libnl (see [Use of libnl](#use-of-libnl)). Unique port numbers
are generated from the PID (lowest 16 bits) and an offset which
is different for each created socket (highest 16 bits).

If you use a native addon that creates Netlink sockets, you may
experience conflicts. In this case, you can manually specify port
numbers when creating sockets or overwrite the algorithm that
allocates port numbers (see documentation of`RawNetlinkSocket`).


## Design

The module is composed of several layers:

  - `raw`: the lowest layer, which exposes the native
    interface (`RawNetlinkSocket`) to create Netlink sockets and
    send / receive raw data over them. Its API is intended to
    mirror [`dgram.Socket`](https://nodejs.org/api/dgram.html).

    This layer manages creation of unique port numbers, credential
    passing, addressing, message peeking, truncated messages, etc.

    In general, you shouldn't need to use this interface directly.

  - `netlink`: this wraps `RawNetlinkSocket` and lets the user
    send / receive parsed Netlink messages, rather than raw data. It
    can also take care of things like requests & ACKs, sequence numbers,
    multipart message handling, attribute parsing.
  
  - `generic_netlink`: this implements the Generic Netlink protocol
    on top of `netlink`.

These layers are implemented in Javascript, but there's also a tiny
native binding that exposes the system calls. `raw` is the only layer
that interacts with this native binding.

### Use of libnl

libnl is recommended, however it's a very small library and
its API is very C oriented, and exposing it properly would be
too much work for the benefits, as well as introducing a native
dependency. Instead it has been implemented in Javascript, which
gives the user much more flexibility.
