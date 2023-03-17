import { BaseObject, StreamData } from '../structs'
import * as structs from '../structs'

/** This struct should be in sync with struct rtnl_link_stats64 */
export interface LinkStats {
    /** total packets received */
    rxPackets?: number
    
    /** total packets transmitted */
    txPackets?: number
    
    /** total bytes received */
    rxBytes?: number
    
    /** total bytes transmitted */
    txBytes?: number
    
    /** bad packets received */
    rxErrors?: number
    
    /** packet transmit problems */
    txErrors?: number
    
    /** no space in linux buffers */
    rxDropped?: number
    
    /** no space available in linux */
    txDropped?: number
    
    /** multicast packets received */
    multicast?: number
    
    collisions?: number
    
    /** detailed rx_errors: */
    rxLengthErrors?: number
    
    /** receiver ring buff overflow */
    rxOverErrors?: number
    
    /** recved pkt with crc error */
    rxCrcErrors?: number
    
    /** recv'd frame alignment error */
    rxFrameErrors?: number
    
    /** recv'r fifo overrun */
    rxFifoErrors?: number
    
    /** receiver missed packet */
    rxMissedErrors?: number
    
    /** detailed tx_errors */
    txAbortedErrors?: number
    
    txCarrierErrors?: number
    
    txFifoErrors?: number
    
    txHeartbeatErrors?: number
    
    txWindowErrors?: number
    
    /** for cslip etc */
    rxCompressed?: number
    
    txCompressed?: number
    
    /** dropped, no handler found */
    rxNohandler?: number
}

/** Parses the attributes of a {@link LinkStats} object */
export function parseLinkStats(r: Buffer): LinkStats {
    if (r.length !== __LENGTH_LinkStats) throw Error('Unexpected length for LinkStats')
    const x: LinkStats = {}
    x.rxPackets = structs.readU32.call(r, 0)
    x.txPackets = structs.readU32.call(r, 4)
    x.rxBytes = structs.readU32.call(r, 8)
    x.txBytes = structs.readU32.call(r, 12)
    x.rxErrors = structs.readU32.call(r, 16)
    x.txErrors = structs.readU32.call(r, 20)
    x.rxDropped = structs.readU32.call(r, 24)
    x.txDropped = structs.readU32.call(r, 28)
    x.multicast = structs.readU32.call(r, 32)
    x.collisions = structs.readU32.call(r, 36)
    x.rxLengthErrors = structs.readU32.call(r, 40)
    x.rxOverErrors = structs.readU32.call(r, 44)
    x.rxCrcErrors = structs.readU32.call(r, 48)
    x.rxFrameErrors = structs.readU32.call(r, 52)
    x.rxFifoErrors = structs.readU32.call(r, 56)
    x.rxMissedErrors = structs.readU32.call(r, 60)
    x.txAbortedErrors = structs.readU32.call(r, 64)
    x.txCarrierErrors = structs.readU32.call(r, 68)
    x.txFifoErrors = structs.readU32.call(r, 72)
    x.txHeartbeatErrors = structs.readU32.call(r, 76)
    x.txWindowErrors = structs.readU32.call(r, 80)
    x.rxCompressed = structs.readU32.call(r, 84)
    x.txCompressed = structs.readU32.call(r, 88)
    x.rxNohandler = structs.readU32.call(r, 92)
    return x
}

/** Encodes a {@link LinkStats} object into a stream of attributes */
export function formatLinkStats(x: LinkStats, r: Buffer = Buffer.alloc(__LENGTH_LinkStats)): Buffer {
    if (r.length !== __LENGTH_LinkStats) throw Error('Unexpected length for LinkStats')
    x.rxPackets && structs.writeU32.call(r, x.rxPackets, 0)
    x.txPackets && structs.writeU32.call(r, x.txPackets, 4)
    x.rxBytes && structs.writeU32.call(r, x.rxBytes, 8)
    x.txBytes && structs.writeU32.call(r, x.txBytes, 12)
    x.rxErrors && structs.writeU32.call(r, x.rxErrors, 16)
    x.txErrors && structs.writeU32.call(r, x.txErrors, 20)
    x.rxDropped && structs.writeU32.call(r, x.rxDropped, 24)
    x.txDropped && structs.writeU32.call(r, x.txDropped, 28)
    x.multicast && structs.writeU32.call(r, x.multicast, 32)
    x.collisions && structs.writeU32.call(r, x.collisions, 36)
    x.rxLengthErrors && structs.writeU32.call(r, x.rxLengthErrors, 40)
    x.rxOverErrors && structs.writeU32.call(r, x.rxOverErrors, 44)
    x.rxCrcErrors && structs.writeU32.call(r, x.rxCrcErrors, 48)
    x.rxFrameErrors && structs.writeU32.call(r, x.rxFrameErrors, 52)
    x.rxFifoErrors && structs.writeU32.call(r, x.rxFifoErrors, 56)
    x.rxMissedErrors && structs.writeU32.call(r, x.rxMissedErrors, 60)
    x.txAbortedErrors && structs.writeU32.call(r, x.txAbortedErrors, 64)
    x.txCarrierErrors && structs.writeU32.call(r, x.txCarrierErrors, 68)
    x.txFifoErrors && structs.writeU32.call(r, x.txFifoErrors, 72)
    x.txHeartbeatErrors && structs.writeU32.call(r, x.txHeartbeatErrors, 76)
    x.txWindowErrors && structs.writeU32.call(r, x.txWindowErrors, 80)
    x.rxCompressed && structs.writeU32.call(r, x.rxCompressed, 84)
    x.txCompressed && structs.writeU32.call(r, x.txCompressed, 88)
    x.rxNohandler && structs.writeU32.call(r, x.rxNohandler, 92)
    return r
}

export const __LENGTH_LinkStats = 96

/** The main device statistics structure */
export interface LinkStats64 {
    /** total packets received */
    rxPackets?: bigint
    
    /** total packets transmitted */
    txPackets?: bigint
    
    /** total bytes received */
    rxBytes?: bigint
    
    /** total bytes transmitted */
    txBytes?: bigint
    
    /** bad packets received */
    rxErrors?: bigint
    
    /** packet transmit problems */
    txErrors?: bigint
    
    /** no space in linux buffers */
    rxDropped?: bigint
    
    /** no space available in linux */
    txDropped?: bigint
    
    /** multicast packets received */
    multicast?: bigint
    
    collisions?: bigint
    
    /** detailed rx_errors: */
    rxLengthErrors?: bigint
    
    /** receiver ring buff overflow */
    rxOverErrors?: bigint
    
    /** recved pkt with crc error */
    rxCrcErrors?: bigint
    
    /** recv'd frame alignment error */
    rxFrameErrors?: bigint
    
    /** recv'r fifo overrun */
    rxFifoErrors?: bigint
    
    /** receiver missed packet */
    rxMissedErrors?: bigint
    
    /** detailed tx_errors */
    txAbortedErrors?: bigint
    
    txCarrierErrors?: bigint
    
    txFifoErrors?: bigint
    
    txHeartbeatErrors?: bigint
    
    txWindowErrors?: bigint
    
    /** for cslip etc */
    rxCompressed?: bigint
    
    txCompressed?: bigint
    
    /** dropped, no handler found */
    rxNohandler?: bigint
}

/** Parses the attributes of a {@link LinkStats64} object */
export function parseLinkStats64(r: Buffer): LinkStats64 {
    if (r.length !== __LENGTH_LinkStats64) throw Error('Unexpected length for LinkStats64')
    const x: LinkStats64 = {}
    x.rxPackets = structs.readU64.call(r, 0)
    x.txPackets = structs.readU64.call(r, 8)
    x.rxBytes = structs.readU64.call(r, 16)
    x.txBytes = structs.readU64.call(r, 24)
    x.rxErrors = structs.readU64.call(r, 32)
    x.txErrors = structs.readU64.call(r, 40)
    x.rxDropped = structs.readU64.call(r, 48)
    x.txDropped = structs.readU64.call(r, 56)
    x.multicast = structs.readU64.call(r, 64)
    x.collisions = structs.readU64.call(r, 72)
    x.rxLengthErrors = structs.readU64.call(r, 80)
    x.rxOverErrors = structs.readU64.call(r, 88)
    x.rxCrcErrors = structs.readU64.call(r, 96)
    x.rxFrameErrors = structs.readU64.call(r, 104)
    x.rxFifoErrors = structs.readU64.call(r, 112)
    x.rxMissedErrors = structs.readU64.call(r, 120)
    x.txAbortedErrors = structs.readU64.call(r, 128)
    x.txCarrierErrors = structs.readU64.call(r, 136)
    x.txFifoErrors = structs.readU64.call(r, 144)
    x.txHeartbeatErrors = structs.readU64.call(r, 152)
    x.txWindowErrors = structs.readU64.call(r, 160)
    x.rxCompressed = structs.readU64.call(r, 168)
    x.txCompressed = structs.readU64.call(r, 176)
    x.rxNohandler = structs.readU64.call(r, 184)
    return x
}

/** Encodes a {@link LinkStats64} object into a stream of attributes */
export function formatLinkStats64(x: LinkStats64, r: Buffer = Buffer.alloc(__LENGTH_LinkStats64)): Buffer {
    if (r.length !== __LENGTH_LinkStats64) throw Error('Unexpected length for LinkStats64')
    x.rxPackets && structs.writeU64.call(r, x.rxPackets, 0)
    x.txPackets && structs.writeU64.call(r, x.txPackets, 8)
    x.rxBytes && structs.writeU64.call(r, x.rxBytes, 16)
    x.txBytes && structs.writeU64.call(r, x.txBytes, 24)
    x.rxErrors && structs.writeU64.call(r, x.rxErrors, 32)
    x.txErrors && structs.writeU64.call(r, x.txErrors, 40)
    x.rxDropped && structs.writeU64.call(r, x.rxDropped, 48)
    x.txDropped && structs.writeU64.call(r, x.txDropped, 56)
    x.multicast && structs.writeU64.call(r, x.multicast, 64)
    x.collisions && structs.writeU64.call(r, x.collisions, 72)
    x.rxLengthErrors && structs.writeU64.call(r, x.rxLengthErrors, 80)
    x.rxOverErrors && structs.writeU64.call(r, x.rxOverErrors, 88)
    x.rxCrcErrors && structs.writeU64.call(r, x.rxCrcErrors, 96)
    x.rxFrameErrors && structs.writeU64.call(r, x.rxFrameErrors, 104)
    x.rxFifoErrors && structs.writeU64.call(r, x.rxFifoErrors, 112)
    x.rxMissedErrors && structs.writeU64.call(r, x.rxMissedErrors, 120)
    x.txAbortedErrors && structs.writeU64.call(r, x.txAbortedErrors, 128)
    x.txCarrierErrors && structs.writeU64.call(r, x.txCarrierErrors, 136)
    x.txFifoErrors && structs.writeU64.call(r, x.txFifoErrors, 144)
    x.txHeartbeatErrors && structs.writeU64.call(r, x.txHeartbeatErrors, 152)
    x.txWindowErrors && structs.writeU64.call(r, x.txWindowErrors, 160)
    x.rxCompressed && structs.writeU64.call(r, x.rxCompressed, 168)
    x.txCompressed && structs.writeU64.call(r, x.txCompressed, 176)
    x.rxNohandler && structs.writeU64.call(r, x.rxNohandler, 184)
    return r
}

export const __LENGTH_LinkStats64 = 192

/** The struct should be in sync with struct ifmap */
export interface LinkInterfaceMap {
    memStart?: bigint
    
    memEnd?: bigint
    
    baseAddr?: bigint
    
    irq?: number
    
    dma?: number
    
    port?: number
}

/** Parses the attributes of a {@link LinkInterfaceMap} object */
export function parseLinkInterfaceMap(r: Buffer): LinkInterfaceMap {
    if (r.length !== __LENGTH_LinkInterfaceMap) throw Error('Unexpected length for LinkInterfaceMap')
    const x: LinkInterfaceMap = {}
    x.memStart = structs.readU64.call(r, 0)
    x.memEnd = structs.readU64.call(r, 8)
    x.baseAddr = structs.readU64.call(r, 16)
    x.irq = structs.readU16.call(r, 24)
    x.dma = structs.readU8.call(r, 26)
    x.port = structs.readU8.call(r, 27)
    return x
}

/** Encodes a {@link LinkInterfaceMap} object into a stream of attributes */
export function formatLinkInterfaceMap(x: LinkInterfaceMap, r: Buffer = Buffer.alloc(__LENGTH_LinkInterfaceMap)): Buffer {
    if (r.length !== __LENGTH_LinkInterfaceMap) throw Error('Unexpected length for LinkInterfaceMap')
    x.memStart && structs.writeU64.call(r, x.memStart, 0)
    x.memEnd && structs.writeU64.call(r, x.memEnd, 8)
    x.baseAddr && structs.writeU64.call(r, x.baseAddr, 16)
    x.irq && structs.writeU16.call(r, x.irq, 24)
    x.dma && structs.writeU8.call(r, x.dma, 26)
    x.port && structs.writeU8.call(r, x.port, 27)
    return r
}

export const __LENGTH_LinkInterfaceMap = 28

export interface LinkAttrs extends BaseObject {
    address?: Buffer
    
    broadcast?: Buffer
    
    ifname?: string
    
    mtu?: number
    
    link?: Buffer
    
    qdisc?: string
    
    stats?: LinkStats
    
    cost?: Buffer
    
    priority?: Buffer
    
    master?: number
    
    /** Wireless Extension event - see wireless.h */
    wireless?: Buffer
    
    /** Protocol specific information for a link */
    protinfo?: Map<number, Buffer>
    
    txqlen?: number
    
    map?: Buffer
    
    weight?: number
    
    operstate?: number
    
    linkmode?: number
    
    linkinfo?: Buffer
    
    netNsPid?: number
    
    ifalias?: string
    
    /** Number of VFs if device is SR-IOV PF */
    numVf?: number
    
    vfinfoList?: VirtualFunctionList
    
    stats64?: LinkStats64
    
    vfPorts?: PortList
    
    portSelf?: Port
    
    afSpec?: Map<number, Buffer>
    
    /** Group the device belongs to */
    group?: number
    
    netNsFd?: number
    
    /** Extended info mask, VFs, etc */
    extMask?: Buffer
    
    /** Promiscuity count: > 0 means acts PROMISC */
    promiscuity?: number
    
    numTxQueues?: number
    
    numRxQueues?: number
    
    carrier?: number
    
    physPortId?: Buffer
    
    carrierChanges?: number
    
    physSwitchId?: Buffer
    
    linkNetnsid?: number
    
    physPortName?: string
    
    protoDown?: Buffer
    
    gsoMaxSegs?: number
    
    gsoMaxSize?: number
    
    __pad?: Buffer
    
    xdp?: Xdp
    
    event?: Buffer
    
    newNetnsid?: Buffer
    
    /** new alias for IFLA_IF_NETNSID */
    targetNetnsid?: number
    
    carrierUpCount?: number
    
    carrierDownCount?: number
    
    newIfindex?: number
    
    minMtu?: number
    
    maxMtu?: number
    
    propList?: Buffer
    
    /** Alternative ifname */
    altIfname?: string
    
    permAddress?: Buffer
}

/** Parses the attributes of a {@link LinkAttrs} object */
export function parseLinkAttrs(r: Buffer): LinkAttrs {
    return structs.getObject(r, {
        1: (data, obj) => obj.address = data,
        2: (data, obj) => obj.broadcast = data,
        3: (data, obj) => obj.ifname = structs.getString(data),
        4: (data, obj) => obj.mtu = structs.getU32(data),
        5: (data, obj) => obj.link = data,
        6: (data, obj) => obj.qdisc = structs.getString(data),
        7: (data, obj) => obj.stats = parseLinkStats(data),
        8: (data, obj) => obj.cost = data,
        9: (data, obj) => obj.priority = data,
        10: (data, obj) => obj.master = structs.getU32(data),
        11: (data, obj) => obj.wireless = data,
        12: (data, obj) => obj.protinfo = structs.getMap(data, x => x),
        13: (data, obj) => obj.txqlen = structs.getU32(data),
        14: (data, obj) => obj.map = data,
        15: (data, obj) => obj.weight = structs.getU32(data),
        16: (data, obj) => obj.operstate = structs.getU8(data),
        17: (data, obj) => obj.linkmode = structs.getU8(data),
        18: (data, obj) => obj.linkinfo = data,
        19: (data, obj) => obj.netNsPid = structs.getU32(data),
        20: (data, obj) => obj.ifalias = structs.getString(data),
        21: (data, obj) => obj.numVf = structs.getU32(data),
        22: (data, obj) => obj.vfinfoList = parseVirtualFunctionList(data),
        23: (data, obj) => obj.stats64 = parseLinkStats64(data),
        24: (data, obj) => obj.vfPorts = parsePortList(data),
        25: (data, obj) => obj.portSelf = parsePort(data),
        26: (data, obj) => obj.afSpec = structs.getMap(data, x => x),
        27: (data, obj) => obj.group = structs.getU32(data),
        28: (data, obj) => obj.netNsFd = structs.getU32(data),
        29: (data, obj) => obj.extMask = data,
        30: (data, obj) => obj.promiscuity = structs.getU32(data),
        31: (data, obj) => obj.numTxQueues = structs.getU32(data),
        32: (data, obj) => obj.numRxQueues = structs.getU32(data),
        33: (data, obj) => obj.carrier = structs.getU8(data),
        34: (data, obj) => obj.physPortId = data,
        35: (data, obj) => obj.carrierChanges = structs.getU32(data),
        36: (data, obj) => obj.physSwitchId = data,
        37: (data, obj) => obj.linkNetnsid = structs.getS32(data),
        38: (data, obj) => obj.physPortName = structs.getString(data),
        39: (data, obj) => obj.protoDown = data,
        40: (data, obj) => obj.gsoMaxSegs = structs.getU32(data),
        41: (data, obj) => obj.gsoMaxSize = structs.getU32(data),
        42: (data, obj) => obj.__pad = data,
        43: (data, obj) => obj.xdp = parseXdp(data),
        44: (data, obj) => obj.event = data,
        45: (data, obj) => obj.newNetnsid = data,
        46: (data, obj) => obj.targetNetnsid = structs.getU32(data),
        47: (data, obj) => obj.carrierUpCount = structs.getU32(data),
        48: (data, obj) => obj.carrierDownCount = structs.getU32(data),
        49: (data, obj) => obj.newIfindex = structs.getU32(data),
        50: (data, obj) => obj.minMtu = structs.getU32(data),
        51: (data, obj) => obj.maxMtu = structs.getU32(data),
        52: (data, obj) => obj.propList = data,
        53: (data, obj) => obj.altIfname = structs.getString(data),
        54: (data, obj) => obj.permAddress = data,
    })
}

/** Encodes a {@link LinkAttrs} object into a stream of attributes */
export function formatLinkAttrs(x: LinkAttrs): StreamData {
    return structs.putObject(x, {
        address: (data, obj) => data.push(1, obj.address!),
        broadcast: (data, obj) => data.push(2, obj.broadcast!),
        ifname: (data, obj) => data.push(3, structs.putString(obj.ifname!)),
        mtu: (data, obj) => data.push(4, structs.putU32(obj.mtu!)),
        link: (data, obj) => data.push(5, obj.link!),
        qdisc: (data, obj) => data.push(6, structs.putString(obj.qdisc!)),
        stats: (data, obj) => data.push(7, formatLinkStats(obj.stats!)),
        cost: (data, obj) => data.push(8, obj.cost!),
        priority: (data, obj) => data.push(9, obj.priority!),
        master: (data, obj) => data.push(10, structs.putU32(obj.master!)),
        wireless: (data, obj) => data.push(11, obj.wireless!),
        protinfo: (data, obj) => data.push(12, structs.putMap(obj.protinfo!, x => x)),
        txqlen: (data, obj) => data.push(13, structs.putU32(obj.txqlen!)),
        map: (data, obj) => data.push(14, obj.map!),
        weight: (data, obj) => data.push(15, structs.putU32(obj.weight!)),
        operstate: (data, obj) => data.push(16, structs.putU8(obj.operstate!)),
        linkmode: (data, obj) => data.push(17, structs.putU8(obj.linkmode!)),
        linkinfo: (data, obj) => data.push(18, obj.linkinfo!),
        netNsPid: (data, obj) => data.push(19, structs.putU32(obj.netNsPid!)),
        ifalias: (data, obj) => data.push(20, structs.putString(obj.ifalias!)),
        numVf: (data, obj) => data.push(21, structs.putU32(obj.numVf!)),
        vfinfoList: (data, obj) => data.push(22, formatVirtualFunctionList(obj.vfinfoList!)),
        stats64: (data, obj) => data.push(23, formatLinkStats64(obj.stats64!)),
        vfPorts: (data, obj) => data.push(24, formatPortList(obj.vfPorts!)),
        portSelf: (data, obj) => data.push(25, formatPort(obj.portSelf!)),
        afSpec: (data, obj) => data.push(26, structs.putMap(obj.afSpec!, x => x)),
        group: (data, obj) => data.push(27, structs.putU32(obj.group!)),
        netNsFd: (data, obj) => data.push(28, structs.putU32(obj.netNsFd!)),
        extMask: (data, obj) => data.push(29, obj.extMask!),
        promiscuity: (data, obj) => data.push(30, structs.putU32(obj.promiscuity!)),
        numTxQueues: (data, obj) => data.push(31, structs.putU32(obj.numTxQueues!)),
        numRxQueues: (data, obj) => data.push(32, structs.putU32(obj.numRxQueues!)),
        carrier: (data, obj) => data.push(33, structs.putU8(obj.carrier!)),
        physPortId: (data, obj) => data.push(34, obj.physPortId!),
        carrierChanges: (data, obj) => data.push(35, structs.putU32(obj.carrierChanges!)),
        physSwitchId: (data, obj) => data.push(36, obj.physSwitchId!),
        linkNetnsid: (data, obj) => data.push(37, structs.putS32(obj.linkNetnsid!)),
        physPortName: (data, obj) => data.push(38, structs.putString(obj.physPortName!)),
        protoDown: (data, obj) => data.push(39, obj.protoDown!),
        gsoMaxSegs: (data, obj) => data.push(40, structs.putU32(obj.gsoMaxSegs!)),
        gsoMaxSize: (data, obj) => data.push(41, structs.putU32(obj.gsoMaxSize!)),
        __pad: (data, obj) => data.push(42, obj.__pad!),
        xdp: (data, obj) => data.push(43, formatXdp(obj.xdp!)),
        event: (data, obj) => data.push(44, obj.event!),
        newNetnsid: (data, obj) => data.push(45, obj.newNetnsid!),
        targetNetnsid: (data, obj) => data.push(46, structs.putU32(obj.targetNetnsid!)),
        carrierUpCount: (data, obj) => data.push(47, structs.putU32(obj.carrierUpCount!)),
        carrierDownCount: (data, obj) => data.push(48, structs.putU32(obj.carrierDownCount!)),
        newIfindex: (data, obj) => data.push(49, structs.putU32(obj.newIfindex!)),
        minMtu: (data, obj) => data.push(50, structs.putU32(obj.minMtu!)),
        maxMtu: (data, obj) => data.push(51, structs.putU32(obj.maxMtu!)),
        propList: (data, obj) => data.push(52, obj.propList!),
        altIfname: (data, obj) => data.push(53, structs.putString(obj.altIfname!)),
        permAddress: (data, obj) => data.push(54, obj.permAddress!),
    })
}

export interface LinkProtocolInfoInet extends BaseObject {
    conf?: Buffer
}

/** Parses the attributes of a {@link LinkProtocolInfoInet} object */
export function parseLinkProtocolInfoInet(r: Buffer): LinkProtocolInfoInet {
    return structs.getObject(r, {
        1: (data, obj) => obj.conf = data,
    })
}

/** Encodes a {@link LinkProtocolInfoInet} object into a stream of attributes */
export function formatLinkProtocolInfoInet(x: LinkProtocolInfoInet): StreamData {
    return structs.putObject(x, {
        conf: (data, obj) => data.push(1, obj.conf!),
    })
}

/** Subtype attributes for IFLA_PROTINFO */
export interface LinkProtocolInfoInet6 extends BaseObject {
    /** link flags */
    flags?: number
    
    /** sysctl parameters */
    conf?: Buffer
    
    /** statistics */
    stats?: Buffer
    
    /** MC things. What of them? */
    mcast?: Buffer
    
    /** time values and max reasm size */
    cacheinfo?: Buffer
    
    /** statistics (icmpv6) */
    icmp6stats?: Buffer
    
    /** device token */
    token?: Buffer
    
    /** implicit address generator mode */
    addrGenMode?: number
}

/** Parses the attributes of a {@link LinkProtocolInfoInet6} object */
export function parseLinkProtocolInfoInet6(r: Buffer): LinkProtocolInfoInet6 {
    return structs.getObject(r, {
        1: (data, obj) => obj.flags = structs.getU32(data),
        2: (data, obj) => obj.conf = data,
        3: (data, obj) => obj.stats = data,
        4: (data, obj) => obj.mcast = data,
        5: (data, obj) => obj.cacheinfo = data,
        6: (data, obj) => obj.icmp6stats = data,
        7: (data, obj) => obj.token = data,
        8: (data, obj) => obj.addrGenMode = structs.getU8(data),
    })
}

/** Encodes a {@link LinkProtocolInfoInet6} object into a stream of attributes */
export function formatLinkProtocolInfoInet6(x: LinkProtocolInfoInet6): StreamData {
    return structs.putObject(x, {
        flags: (data, obj) => data.push(1, structs.putU32(obj.flags!)),
        conf: (data, obj) => data.push(2, obj.conf!),
        stats: (data, obj) => data.push(3, obj.stats!),
        mcast: (data, obj) => data.push(4, obj.mcast!),
        cacheinfo: (data, obj) => data.push(5, obj.cacheinfo!),
        icmp6stats: (data, obj) => data.push(6, obj.icmp6stats!),
        token: (data, obj) => data.push(7, obj.token!),
        addrGenMode: (data, obj) => data.push(8, structs.putU8(obj.addrGenMode!)),
    })
}

export enum In6AddrGenMode {
    EUI64,
    
    NONE = 1,
    
    STABLE_PRIVACY = 2,
    
    RANDOM = 3,
}

/** Bridge section */
export interface Bridge extends BaseObject {
    forwardDelay?: Buffer
    
    helloTime?: Buffer
    
    maxAge?: Buffer
    
    ageingTime?: Buffer
    
    stpState?: Buffer
    
    priority?: Buffer
    
    vlanFiltering?: Buffer
    
    vlanProtocol?: Buffer
    
    groupFwdMask?: Buffer
    
    rootId?: Buffer
    
    bridgeId?: Buffer
    
    rootPort?: Buffer
    
    rootPathCost?: Buffer
    
    topologyChange?: Buffer
    
    topologyChangeDetected?: Buffer
    
    helloTimer?: Buffer
    
    tcnTimer?: Buffer
    
    topologyChangeTimer?: Buffer
    
    gcTimer?: Buffer
    
    groupAddr?: Buffer
    
    fdbFlush?: Buffer
    
    mcastRouter?: Buffer
    
    mcastSnooping?: Buffer
    
    mcastQueryUseIfaddr?: Buffer
    
    mcastQuerier?: Buffer
    
    mcastHashElasticity?: Buffer
    
    mcastHashMax?: Buffer
    
    mcastLastMemberCnt?: Buffer
    
    mcastStartupQueryCnt?: Buffer
    
    mcastLastMemberIntvl?: Buffer
    
    mcastMembershipIntvl?: Buffer
    
    mcastQuerierIntvl?: Buffer
    
    mcastQueryIntvl?: Buffer
    
    mcastQueryResponseIntvl?: Buffer
    
    mcastStartupQueryIntvl?: Buffer
    
    nfCallIptables?: Buffer
    
    nfCallIp6tables?: Buffer
    
    nfCallArptables?: Buffer
    
    vlanDefaultPvid?: Buffer
    
    __pad?: Buffer
    
    vlanStatsEnabled?: Buffer
    
    mcastStatsEnabled?: Buffer
    
    mcastIgmpVersion?: Buffer
    
    mcastMldVersion?: Buffer
    
    vlanStatsPerPort?: Buffer
    
    multiBoolopt?: Buffer
}

/** Parses the attributes of a {@link Bridge} object */
export function parseBridge(r: Buffer): Bridge {
    return structs.getObject(r, {
        1: (data, obj) => obj.forwardDelay = data,
        2: (data, obj) => obj.helloTime = data,
        3: (data, obj) => obj.maxAge = data,
        4: (data, obj) => obj.ageingTime = data,
        5: (data, obj) => obj.stpState = data,
        6: (data, obj) => obj.priority = data,
        7: (data, obj) => obj.vlanFiltering = data,
        8: (data, obj) => obj.vlanProtocol = data,
        9: (data, obj) => obj.groupFwdMask = data,
        10: (data, obj) => obj.rootId = data,
        11: (data, obj) => obj.bridgeId = data,
        12: (data, obj) => obj.rootPort = data,
        13: (data, obj) => obj.rootPathCost = data,
        14: (data, obj) => obj.topologyChange = data,
        15: (data, obj) => obj.topologyChangeDetected = data,
        16: (data, obj) => obj.helloTimer = data,
        17: (data, obj) => obj.tcnTimer = data,
        18: (data, obj) => obj.topologyChangeTimer = data,
        19: (data, obj) => obj.gcTimer = data,
        20: (data, obj) => obj.groupAddr = data,
        21: (data, obj) => obj.fdbFlush = data,
        22: (data, obj) => obj.mcastRouter = data,
        23: (data, obj) => obj.mcastSnooping = data,
        24: (data, obj) => obj.mcastQueryUseIfaddr = data,
        25: (data, obj) => obj.mcastQuerier = data,
        26: (data, obj) => obj.mcastHashElasticity = data,
        27: (data, obj) => obj.mcastHashMax = data,
        28: (data, obj) => obj.mcastLastMemberCnt = data,
        29: (data, obj) => obj.mcastStartupQueryCnt = data,
        30: (data, obj) => obj.mcastLastMemberIntvl = data,
        31: (data, obj) => obj.mcastMembershipIntvl = data,
        32: (data, obj) => obj.mcastQuerierIntvl = data,
        33: (data, obj) => obj.mcastQueryIntvl = data,
        34: (data, obj) => obj.mcastQueryResponseIntvl = data,
        35: (data, obj) => obj.mcastStartupQueryIntvl = data,
        36: (data, obj) => obj.nfCallIptables = data,
        37: (data, obj) => obj.nfCallIp6tables = data,
        38: (data, obj) => obj.nfCallArptables = data,
        39: (data, obj) => obj.vlanDefaultPvid = data,
        40: (data, obj) => obj.__pad = data,
        41: (data, obj) => obj.vlanStatsEnabled = data,
        42: (data, obj) => obj.mcastStatsEnabled = data,
        43: (data, obj) => obj.mcastIgmpVersion = data,
        44: (data, obj) => obj.mcastMldVersion = data,
        45: (data, obj) => obj.vlanStatsPerPort = data,
        46: (data, obj) => obj.multiBoolopt = data,
    })
}

/** Encodes a {@link Bridge} object into a stream of attributes */
export function formatBridge(x: Bridge): StreamData {
    return structs.putObject(x, {
        forwardDelay: (data, obj) => data.push(1, obj.forwardDelay!),
        helloTime: (data, obj) => data.push(2, obj.helloTime!),
        maxAge: (data, obj) => data.push(3, obj.maxAge!),
        ageingTime: (data, obj) => data.push(4, obj.ageingTime!),
        stpState: (data, obj) => data.push(5, obj.stpState!),
        priority: (data, obj) => data.push(6, obj.priority!),
        vlanFiltering: (data, obj) => data.push(7, obj.vlanFiltering!),
        vlanProtocol: (data, obj) => data.push(8, obj.vlanProtocol!),
        groupFwdMask: (data, obj) => data.push(9, obj.groupFwdMask!),
        rootId: (data, obj) => data.push(10, obj.rootId!),
        bridgeId: (data, obj) => data.push(11, obj.bridgeId!),
        rootPort: (data, obj) => data.push(12, obj.rootPort!),
        rootPathCost: (data, obj) => data.push(13, obj.rootPathCost!),
        topologyChange: (data, obj) => data.push(14, obj.topologyChange!),
        topologyChangeDetected: (data, obj) => data.push(15, obj.topologyChangeDetected!),
        helloTimer: (data, obj) => data.push(16, obj.helloTimer!),
        tcnTimer: (data, obj) => data.push(17, obj.tcnTimer!),
        topologyChangeTimer: (data, obj) => data.push(18, obj.topologyChangeTimer!),
        gcTimer: (data, obj) => data.push(19, obj.gcTimer!),
        groupAddr: (data, obj) => data.push(20, obj.groupAddr!),
        fdbFlush: (data, obj) => data.push(21, obj.fdbFlush!),
        mcastRouter: (data, obj) => data.push(22, obj.mcastRouter!),
        mcastSnooping: (data, obj) => data.push(23, obj.mcastSnooping!),
        mcastQueryUseIfaddr: (data, obj) => data.push(24, obj.mcastQueryUseIfaddr!),
        mcastQuerier: (data, obj) => data.push(25, obj.mcastQuerier!),
        mcastHashElasticity: (data, obj) => data.push(26, obj.mcastHashElasticity!),
        mcastHashMax: (data, obj) => data.push(27, obj.mcastHashMax!),
        mcastLastMemberCnt: (data, obj) => data.push(28, obj.mcastLastMemberCnt!),
        mcastStartupQueryCnt: (data, obj) => data.push(29, obj.mcastStartupQueryCnt!),
        mcastLastMemberIntvl: (data, obj) => data.push(30, obj.mcastLastMemberIntvl!),
        mcastMembershipIntvl: (data, obj) => data.push(31, obj.mcastMembershipIntvl!),
        mcastQuerierIntvl: (data, obj) => data.push(32, obj.mcastQuerierIntvl!),
        mcastQueryIntvl: (data, obj) => data.push(33, obj.mcastQueryIntvl!),
        mcastQueryResponseIntvl: (data, obj) => data.push(34, obj.mcastQueryResponseIntvl!),
        mcastStartupQueryIntvl: (data, obj) => data.push(35, obj.mcastStartupQueryIntvl!),
        nfCallIptables: (data, obj) => data.push(36, obj.nfCallIptables!),
        nfCallIp6tables: (data, obj) => data.push(37, obj.nfCallIp6tables!),
        nfCallArptables: (data, obj) => data.push(38, obj.nfCallArptables!),
        vlanDefaultPvid: (data, obj) => data.push(39, obj.vlanDefaultPvid!),
        __pad: (data, obj) => data.push(40, obj.__pad!),
        vlanStatsEnabled: (data, obj) => data.push(41, obj.vlanStatsEnabled!),
        mcastStatsEnabled: (data, obj) => data.push(42, obj.mcastStatsEnabled!),
        mcastIgmpVersion: (data, obj) => data.push(43, obj.mcastIgmpVersion!),
        mcastMldVersion: (data, obj) => data.push(44, obj.mcastMldVersion!),
        vlanStatsPerPort: (data, obj) => data.push(45, obj.vlanStatsPerPort!),
        multiBoolopt: (data, obj) => data.push(46, obj.multiBoolopt!),
    })
}

export interface BridgeId {
    prio?: number[]
    
    /** ETH_ALEN */
    addr?: number[]
}

/** Parses the attributes of a {@link BridgeId} object */
export function parseBridgeId(r: Buffer): BridgeId {
    if (r.length !== __LENGTH_BridgeId) throw Error('Unexpected length for BridgeId')
    const x: BridgeId = {}
    x.prio = [...Array(2).keys()].map(i => structs.readU8.call(r, 0 + 1 * i))
    x.addr = [...Array(6).keys()].map(i => structs.readU8.call(r, 2 + 1 * i))
    return x
}

/** Encodes a {@link BridgeId} object into a stream of attributes */
export function formatBridgeId(x: BridgeId, r: Buffer = Buffer.alloc(__LENGTH_BridgeId)): Buffer {
    if (r.length !== __LENGTH_BridgeId) throw Error('Unexpected length for BridgeId')
    if (x.prio && x.prio.length !== 2)
        throw Error('prio: Unexpected array length')
        x.prio && x.prio.forEach((x, i) => structs.writeU8.call(r, x, 0 + 1 * i))
    if (x.addr && x.addr.length !== 6)
        throw Error('addr: Unexpected array length')
        x.addr && x.addr.forEach((x, i) => structs.writeU8.call(r, x, 2 + 1 * i))
    return r
}

export const __LENGTH_BridgeId = 8

export enum BridgePortMode {
    UNSPEC,
    
    HAIRPIN = 1,
}

export interface BridgePort extends BaseObject {
    /** Spanning tree state */
    state?: number
    
    /** Spanning tree priority */
    priority?: number
    
    /** Spanning tree cost */
    cost?: number
    
    /** mode (hairpin) */
    mode?: number
    
    /** bpdu guard */
    guard?: number
    
    /** root port protection */
    protect?: number
    
    /** multicast fast leave */
    fastLeave?: number
    
    /** mac learning */
    learning?: number
    
    /** flood unicast traffic */
    unicastFlood?: number
    
    /** proxy ARP */
    proxyarp?: Buffer
    
    /** mac learning sync from device */
    learningSync?: number
    
    /** proxy ARP for Wi-Fi */
    proxyarpWifi?: Buffer
    
    /** designated root */
    rootId?: Buffer
    
    /** designated bridge */
    bridgeId?: Buffer
    
    designatedPort?: Buffer
    
    designatedCost?: Buffer
    
    id?: Buffer
    
    no?: Buffer
    
    topologyChangeAck?: Buffer
    
    configPending?: Buffer
    
    messageAgeTimer?: Buffer
    
    forwardDelayTimer?: Buffer
    
    holdTimer?: Buffer
    
    flush?: Buffer
    
    multicastRouter?: Buffer
    
    __pad?: Buffer
    
    mcastFlood?: Buffer
    
    mcastToUcast?: Buffer
    
    vlanTunnel?: Buffer
    
    bcastFlood?: Buffer
    
    groupFwdMask?: Buffer
    
    neighSuppress?: Buffer
    
    isolated?: Buffer
    
    backupPort?: Buffer
}

/** Parses the attributes of a {@link BridgePort} object */
export function parseBridgePort(r: Buffer): BridgePort {
    return structs.getObject(r, {
        1: (data, obj) => obj.state = structs.getU8(data),
        2: (data, obj) => obj.priority = structs.getU16(data),
        3: (data, obj) => obj.cost = structs.getU32(data),
        4: (data, obj) => obj.mode = structs.getU8(data),
        5: (data, obj) => obj.guard = structs.getU8(data),
        6: (data, obj) => obj.protect = structs.getU8(data),
        7: (data, obj) => obj.fastLeave = structs.getU8(data),
        8: (data, obj) => obj.learning = structs.getU8(data),
        9: (data, obj) => obj.unicastFlood = structs.getU8(data),
        10: (data, obj) => obj.proxyarp = data,
        11: (data, obj) => obj.learningSync = structs.getU8(data),
        12: (data, obj) => obj.proxyarpWifi = data,
        13: (data, obj) => obj.rootId = data,
        14: (data, obj) => obj.bridgeId = data,
        15: (data, obj) => obj.designatedPort = data,
        16: (data, obj) => obj.designatedCost = data,
        17: (data, obj) => obj.id = data,
        18: (data, obj) => obj.no = data,
        19: (data, obj) => obj.topologyChangeAck = data,
        20: (data, obj) => obj.configPending = data,
        21: (data, obj) => obj.messageAgeTimer = data,
        22: (data, obj) => obj.forwardDelayTimer = data,
        23: (data, obj) => obj.holdTimer = data,
        24: (data, obj) => obj.flush = data,
        25: (data, obj) => obj.multicastRouter = data,
        26: (data, obj) => obj.__pad = data,
        27: (data, obj) => obj.mcastFlood = data,
        28: (data, obj) => obj.mcastToUcast = data,
        29: (data, obj) => obj.vlanTunnel = data,
        30: (data, obj) => obj.bcastFlood = data,
        31: (data, obj) => obj.groupFwdMask = data,
        32: (data, obj) => obj.neighSuppress = data,
        33: (data, obj) => obj.isolated = data,
        34: (data, obj) => obj.backupPort = data,
    })
}

/** Encodes a {@link BridgePort} object into a stream of attributes */
export function formatBridgePort(x: BridgePort): StreamData {
    return structs.putObject(x, {
        state: (data, obj) => data.push(1, structs.putU8(obj.state!)),
        priority: (data, obj) => data.push(2, structs.putU16(obj.priority!)),
        cost: (data, obj) => data.push(3, structs.putU32(obj.cost!)),
        mode: (data, obj) => data.push(4, structs.putU8(obj.mode!)),
        guard: (data, obj) => data.push(5, structs.putU8(obj.guard!)),
        protect: (data, obj) => data.push(6, structs.putU8(obj.protect!)),
        fastLeave: (data, obj) => data.push(7, structs.putU8(obj.fastLeave!)),
        learning: (data, obj) => data.push(8, structs.putU8(obj.learning!)),
        unicastFlood: (data, obj) => data.push(9, structs.putU8(obj.unicastFlood!)),
        proxyarp: (data, obj) => data.push(10, obj.proxyarp!),
        learningSync: (data, obj) => data.push(11, structs.putU8(obj.learningSync!)),
        proxyarpWifi: (data, obj) => data.push(12, obj.proxyarpWifi!),
        rootId: (data, obj) => data.push(13, obj.rootId!),
        bridgeId: (data, obj) => data.push(14, obj.bridgeId!),
        designatedPort: (data, obj) => data.push(15, obj.designatedPort!),
        designatedCost: (data, obj) => data.push(16, obj.designatedCost!),
        id: (data, obj) => data.push(17, obj.id!),
        no: (data, obj) => data.push(18, obj.no!),
        topologyChangeAck: (data, obj) => data.push(19, obj.topologyChangeAck!),
        configPending: (data, obj) => data.push(20, obj.configPending!),
        messageAgeTimer: (data, obj) => data.push(21, obj.messageAgeTimer!),
        forwardDelayTimer: (data, obj) => data.push(22, obj.forwardDelayTimer!),
        holdTimer: (data, obj) => data.push(23, obj.holdTimer!),
        flush: (data, obj) => data.push(24, obj.flush!),
        multicastRouter: (data, obj) => data.push(25, obj.multicastRouter!),
        __pad: (data, obj) => data.push(26, obj.__pad!),
        mcastFlood: (data, obj) => data.push(27, obj.mcastFlood!),
        mcastToUcast: (data, obj) => data.push(28, obj.mcastToUcast!),
        vlanTunnel: (data, obj) => data.push(29, obj.vlanTunnel!),
        bcastFlood: (data, obj) => data.push(30, obj.bcastFlood!),
        groupFwdMask: (data, obj) => data.push(31, obj.groupFwdMask!),
        neighSuppress: (data, obj) => data.push(32, obj.neighSuppress!),
        isolated: (data, obj) => data.push(33, obj.isolated!),
        backupPort: (data, obj) => data.push(34, obj.backupPort!),
    })
}

export interface CacheInfo {
    maxReasmLen?: number
    
    /** ipv6InterfaceTable updated timestamp */
    tstamp?: number
    
    reachableTime?: number
    
    retransTime?: number
}

/** Parses the attributes of a {@link CacheInfo} object */
export function parseCacheInfo(r: Buffer): CacheInfo {
    if (r.length !== __LENGTH_CacheInfo) throw Error('Unexpected length for CacheInfo')
    const x: CacheInfo = {}
    x.maxReasmLen = structs.readU32.call(r, 0)
    x.tstamp = structs.readU32.call(r, 4)
    x.reachableTime = structs.readU32.call(r, 8)
    x.retransTime = structs.readU32.call(r, 12)
    return x
}

/** Encodes a {@link CacheInfo} object into a stream of attributes */
export function formatCacheInfo(x: CacheInfo, r: Buffer = Buffer.alloc(__LENGTH_CacheInfo)): Buffer {
    if (r.length !== __LENGTH_CacheInfo) throw Error('Unexpected length for CacheInfo')
    x.maxReasmLen && structs.writeU32.call(r, x.maxReasmLen, 0)
    x.tstamp && structs.writeU32.call(r, x.tstamp, 4)
    x.reachableTime && structs.writeU32.call(r, x.reachableTime, 8)
    x.retransTime && structs.writeU32.call(r, x.retransTime, 12)
    return r
}

export const __LENGTH_CacheInfo = 16

export interface Info extends BaseObject {
    kind?: string
    
    data?: Buffer
    
    xstats?: Buffer
    
    slaveKind?: string
    
    slaveData?: Buffer
}

/** Parses the attributes of a {@link Info} object */
export function parseInfo(r: Buffer): Info {
    return structs.getObject(r, {
        1: (data, obj) => obj.kind = structs.getString(data),
        2: (data, obj) => obj.data = data,
        3: (data, obj) => obj.xstats = data,
        4: (data, obj) => obj.slaveKind = structs.getString(data),
        5: (data, obj) => obj.slaveData = data,
    })
}

/** Encodes a {@link Info} object into a stream of attributes */
export function formatInfo(x: Info): StreamData {
    return structs.putObject(x, {
        kind: (data, obj) => data.push(1, structs.putString(obj.kind!)),
        data: (data, obj) => data.push(2, obj.data!),
        xstats: (data, obj) => data.push(3, obj.xstats!),
        slaveKind: (data, obj) => data.push(4, structs.putString(obj.slaveKind!)),
        slaveData: (data, obj) => data.push(5, obj.slaveData!),
    })
}

/** VLAN section */
export interface Vlan extends BaseObject {
    id?: number
    
    flags?: Buffer
    
    egressQos?: Buffer
    
    ingressQos?: Buffer
    
    protocol?: number
}

/** Parses the attributes of a {@link Vlan} object */
export function parseVlan(r: Buffer): Vlan {
    return structs.getObject(r, {
        1: (data, obj) => obj.id = structs.getU16(data),
        2: (data, obj) => obj.flags = data,
        3: (data, obj) => obj.egressQos = data,
        4: (data, obj) => obj.ingressQos = data,
        5: (data, obj) => obj.protocol = structs.getU16(data),
    })
}

/** Encodes a {@link Vlan} object into a stream of attributes */
export function formatVlan(x: Vlan): StreamData {
    return structs.putObject(x, {
        id: (data, obj) => data.push(1, structs.putU16(obj.id!)),
        flags: (data, obj) => data.push(2, obj.flags!),
        egressQos: (data, obj) => data.push(3, obj.egressQos!),
        ingressQos: (data, obj) => data.push(4, obj.ingressQos!),
        protocol: (data, obj) => data.push(5, structs.putU16(obj.protocol!)),
    })
}

export interface VlanFlagsMask {
    flags?: number
    
    mask?: number
}

/** Parses the attributes of a {@link VlanFlagsMask} object */
export function parseVlanFlagsMask(r: Buffer): VlanFlagsMask {
    if (r.length !== __LENGTH_VlanFlagsMask) throw Error('Unexpected length for VlanFlagsMask')
    const x: VlanFlagsMask = {}
    x.flags = structs.readU32.call(r, 0)
    x.mask = structs.readU32.call(r, 4)
    return x
}

/** Encodes a {@link VlanFlagsMask} object into a stream of attributes */
export function formatVlanFlagsMask(x: VlanFlagsMask, r: Buffer = Buffer.alloc(__LENGTH_VlanFlagsMask)): Buffer {
    if (r.length !== __LENGTH_VlanFlagsMask) throw Error('Unexpected length for VlanFlagsMask')
    x.flags && structs.writeU32.call(r, x.flags, 0)
    x.mask && structs.writeU32.call(r, x.mask, 4)
    return r
}

export const __LENGTH_VlanFlagsMask = 8

export interface VlanQos extends BaseObject {
    mapping?: Buffer
}

/** Parses the attributes of a {@link VlanQos} object */
export function parseVlanQos(r: Buffer): VlanQos {
    return structs.getObject(r, {
        1: (data, obj) => obj.mapping = data,
    })
}

/** Encodes a {@link VlanQos} object into a stream of attributes */
export function formatVlanQos(x: VlanQos): StreamData {
    return structs.putObject(x, {
        mapping: (data, obj) => data.push(1, obj.mapping!),
    })
}

export interface VlanQosMapping {
    from?: number
    
    to?: number
}

/** Parses the attributes of a {@link VlanQosMapping} object */
export function parseVlanQosMapping(r: Buffer): VlanQosMapping {
    if (r.length !== __LENGTH_VlanQosMapping) throw Error('Unexpected length for VlanQosMapping')
    const x: VlanQosMapping = {}
    x.from = structs.readU32.call(r, 0)
    x.to = structs.readU32.call(r, 4)
    return x
}

/** Encodes a {@link VlanQosMapping} object into a stream of attributes */
export function formatVlanQosMapping(x: VlanQosMapping, r: Buffer = Buffer.alloc(__LENGTH_VlanQosMapping)): Buffer {
    if (r.length !== __LENGTH_VlanQosMapping) throw Error('Unexpected length for VlanQosMapping')
    x.from && structs.writeU32.call(r, x.from, 0)
    x.to && structs.writeU32.call(r, x.to, 4)
    return r
}

export const __LENGTH_VlanQosMapping = 8

/** MACVLAN section */
export interface Macvlan extends BaseObject {
    mode?: number
    
    flags?: number
    
    macaddrMode?: number
    
    macaddr?: Buffer
    
    macaddrData?: Buffer
    
    macaddrCount?: number
}

/** Parses the attributes of a {@link Macvlan} object */
export function parseMacvlan(r: Buffer): Macvlan {
    return structs.getObject(r, {
        1: (data, obj) => obj.mode = structs.getU32(data),
        2: (data, obj) => obj.flags = structs.getU16(data),
        3: (data, obj) => obj.macaddrMode = structs.getU32(data),
        4: (data, obj) => obj.macaddr = data,
        5: (data, obj) => obj.macaddrData = data,
        6: (data, obj) => obj.macaddrCount = structs.getU32(data),
    })
}

/** Encodes a {@link Macvlan} object into a stream of attributes */
export function formatMacvlan(x: Macvlan): StreamData {
    return structs.putObject(x, {
        mode: (data, obj) => data.push(1, structs.putU32(obj.mode!)),
        flags: (data, obj) => data.push(2, structs.putU16(obj.flags!)),
        macaddrMode: (data, obj) => data.push(3, structs.putU32(obj.macaddrMode!)),
        macaddr: (data, obj) => data.push(4, obj.macaddr!),
        macaddrData: (data, obj) => data.push(5, obj.macaddrData!),
        macaddrCount: (data, obj) => data.push(6, structs.putU32(obj.macaddrCount!)),
    })
}

export interface MacvlanMode {
    /** don't talk to other macvlans */
    private?: true
    
    /** talk to other ports through ext bridge */
    vepa?: true
    
    /** talk to bridge ports directly */
    bridge?: true
    
    /** take over the underlying device */
    passthru?: true
    
    /** use source MAC address list to assign */
    source?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link MacvlanMode} bitmask */
export function parseMacvlanMode(r: number): MacvlanMode {
    const x: MacvlanMode = {}
    if (r & (1)) (x.private = true, r &= ~(1))
    if (r & (2)) (x.vepa = true, r &= ~(2))
    if (r & (4)) (x.bridge = true, r &= ~(4))
    if (r & (8)) (x.passthru = true, r &= ~(8))
    if (r & (16)) (x.source = true, r &= ~(16))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link MacvlanMode} bitmask */
export function formatMacvlanMode(x: MacvlanMode): number {
    let r = x.__unknown || 0
    if (x.private) r |= 1
    if (x.vepa) r |= 2
    if (x.bridge) r |= 4
    if (x.passthru) r |= 8
    if (x.source) r |= 16
    return r
}

export enum MacvlanMacaddrMode {
    ADD,
    
    DEL = 1,
    
    FLUSH = 2,
    
    SET = 3,
}

/** VRF section */
export interface Vrf extends BaseObject {
    table?: number
}

/** Parses the attributes of a {@link Vrf} object */
export function parseVrf(r: Buffer): Vrf {
    return structs.getObject(r, {
        1: (data, obj) => obj.table = structs.getU32(data),
    })
}

/** Encodes a {@link Vrf} object into a stream of attributes */
export function formatVrf(x: Vrf): StreamData {
    return structs.putObject(x, {
        table: (data, obj) => data.push(1, structs.putU32(obj.table!)),
    })
}

export interface VrfPort extends BaseObject {
    table?: Buffer
}

/** Parses the attributes of a {@link VrfPort} object */
export function parseVrfPort(r: Buffer): VrfPort {
    return structs.getObject(r, {
        1: (data, obj) => obj.table = data,
    })
}

/** Encodes a {@link VrfPort} object into a stream of attributes */
export function formatVrfPort(x: VrfPort): StreamData {
    return structs.putObject(x, {
        table: (data, obj) => data.push(1, obj.table!),
    })
}

/** MACSEC section */
export interface Macsec extends BaseObject {
    sci?: bigint
    
    port?: number
    
    icvLen?: number
    
    cipherSuite?: bigint
    
    window?: number
    
    encodingSa?: number
    
    encrypt?: number
    
    protect?: number
    
    incSci?: number
    
    es?: number
    
    scb?: number
    
    replayProtect?: number
    
    validation?: number
    
    __pad?: Buffer
}

/** Parses the attributes of a {@link Macsec} object */
export function parseMacsec(r: Buffer): Macsec {
    return structs.getObject(r, {
        1: (data, obj) => obj.sci = structs.getU64(data),
        2: (data, obj) => obj.port = structs.getU16(data),
        3: (data, obj) => obj.icvLen = structs.getU8(data),
        4: (data, obj) => obj.cipherSuite = structs.getU64(data),
        5: (data, obj) => obj.window = structs.getU32(data),
        6: (data, obj) => obj.encodingSa = structs.getU8(data),
        7: (data, obj) => obj.encrypt = structs.getU8(data),
        8: (data, obj) => obj.protect = structs.getU8(data),
        9: (data, obj) => obj.incSci = structs.getU8(data),
        10: (data, obj) => obj.es = structs.getU8(data),
        11: (data, obj) => obj.scb = structs.getU8(data),
        12: (data, obj) => obj.replayProtect = structs.getU8(data),
        13: (data, obj) => obj.validation = structs.getU8(data),
        14: (data, obj) => obj.__pad = data,
    })
}

/** Encodes a {@link Macsec} object into a stream of attributes */
export function formatMacsec(x: Macsec): StreamData {
    return structs.putObject(x, {
        sci: (data, obj) => data.push(1, structs.putU64(obj.sci!)),
        port: (data, obj) => data.push(2, structs.putU16(obj.port!)),
        icvLen: (data, obj) => data.push(3, structs.putU8(obj.icvLen!)),
        cipherSuite: (data, obj) => data.push(4, structs.putU64(obj.cipherSuite!)),
        window: (data, obj) => data.push(5, structs.putU32(obj.window!)),
        encodingSa: (data, obj) => data.push(6, structs.putU8(obj.encodingSa!)),
        encrypt: (data, obj) => data.push(7, structs.putU8(obj.encrypt!)),
        protect: (data, obj) => data.push(8, structs.putU8(obj.protect!)),
        incSci: (data, obj) => data.push(9, structs.putU8(obj.incSci!)),
        es: (data, obj) => data.push(10, structs.putU8(obj.es!)),
        scb: (data, obj) => data.push(11, structs.putU8(obj.scb!)),
        replayProtect: (data, obj) => data.push(12, structs.putU8(obj.replayProtect!)),
        validation: (data, obj) => data.push(13, structs.putU8(obj.validation!)),
        __pad: (data, obj) => data.push(14, obj.__pad!),
    })
}

/** XFRM section */
export interface Xfrm extends BaseObject {
    link?: number
    
    ifId?: number
}

/** Parses the attributes of a {@link Xfrm} object */
export function parseXfrm(r: Buffer): Xfrm {
    return structs.getObject(r, {
        1: (data, obj) => obj.link = structs.getU32(data),
        2: (data, obj) => obj.ifId = structs.getU32(data),
    })
}

/** Encodes a {@link Xfrm} object into a stream of attributes */
export function formatXfrm(x: Xfrm): StreamData {
    return structs.putObject(x, {
        link: (data, obj) => data.push(1, structs.putU32(obj.link!)),
        ifId: (data, obj) => data.push(2, structs.putU32(obj.ifId!)),
    })
}

export enum MacsecValidationType {
    DISABLED,
    
    CHECK = 1,
    
    STRICT = 2,
}

export enum MacsecOffload {
    OFF,
    
    PHY = 1,
}

/** IPVLAN section */
export interface Ipvlan extends BaseObject {
    mode?: number
    
    flags?: Buffer
}

/** Parses the attributes of a {@link Ipvlan} object */
export function parseIpvlan(r: Buffer): Ipvlan {
    return structs.getObject(r, {
        1: (data, obj) => obj.mode = structs.getU16(data),
        2: (data, obj) => obj.flags = data,
    })
}

/** Encodes a {@link Ipvlan} object into a stream of attributes */
export function formatIpvlan(x: Ipvlan): StreamData {
    return structs.putObject(x, {
        mode: (data, obj) => data.push(1, structs.putU16(obj.mode!)),
        flags: (data, obj) => data.push(2, obj.flags!),
    })
}

export enum IpvlanMode {
    L2,
    
    L3 = 1,
    
    L3S = 2,
}

/** VXLAN section */
export interface Vxlan extends BaseObject {
    id?: number
    
    /** group or remote address */
    group?: Buffer
    
    link?: number
    
    local?: Buffer
    
    ttl?: number
    
    tos?: number
    
    learning?: number
    
    ageing?: number
    
    limit?: number
    
    /** source port */
    portRange?: Buffer
    
    proxy?: number
    
    rsc?: number
    
    l2miss?: number
    
    l3miss?: number
    
    /** destination port */
    port?: Buffer
    
    group6?: Buffer
    
    local6?: Buffer
    
    udpCsum?: number
    
    udpZeroCsum6Tx?: number
    
    udpZeroCsum6Rx?: number
    
    remcsumTx?: number
    
    remcsumRx?: number
    
    gbp?: true
    
    remcsumNopartial?: Buffer
    
    collectMetadata?: number
    
    label?: number
    
    gpe?: true
    
    ttlInherit?: Buffer
    
    df?: Buffer
}

/** Parses the attributes of a {@link Vxlan} object */
export function parseVxlan(r: Buffer): Vxlan {
    return structs.getObject(r, {
        1: (data, obj) => obj.id = structs.getU32(data),
        2: (data, obj) => obj.group = data,
        3: (data, obj) => obj.link = structs.getU32(data),
        4: (data, obj) => obj.local = data,
        5: (data, obj) => obj.ttl = structs.getU8(data),
        6: (data, obj) => obj.tos = structs.getU8(data),
        7: (data, obj) => obj.learning = structs.getU8(data),
        8: (data, obj) => obj.ageing = structs.getU32(data),
        9: (data, obj) => obj.limit = structs.getU32(data),
        10: (data, obj) => obj.portRange = data,
        11: (data, obj) => obj.proxy = structs.getU8(data),
        12: (data, obj) => obj.rsc = structs.getU8(data),
        13: (data, obj) => obj.l2miss = structs.getU8(data),
        14: (data, obj) => obj.l3miss = structs.getU8(data),
        15: (data, obj) => obj.port = data,
        16: (data, obj) => obj.group6 = data,
        17: (data, obj) => obj.local6 = data,
        18: (data, obj) => obj.udpCsum = structs.getU8(data),
        19: (data, obj) => obj.udpZeroCsum6Tx = structs.getU8(data),
        20: (data, obj) => obj.udpZeroCsum6Rx = structs.getU8(data),
        21: (data, obj) => obj.remcsumTx = structs.getU8(data),
        22: (data, obj) => obj.remcsumRx = structs.getU8(data),
        23: (data, obj) => obj.gbp = structs.getFlag(data),
        24: (data, obj) => obj.remcsumNopartial = data,
        25: (data, obj) => obj.collectMetadata = structs.getU8(data),
        26: (data, obj) => obj.label = structs.getU32(data),
        27: (data, obj) => obj.gpe = structs.getFlag(data),
        28: (data, obj) => obj.ttlInherit = data,
        29: (data, obj) => obj.df = data,
    })
}

/** Encodes a {@link Vxlan} object into a stream of attributes */
export function formatVxlan(x: Vxlan): StreamData {
    return structs.putObject(x, {
        id: (data, obj) => data.push(1, structs.putU32(obj.id!)),
        group: (data, obj) => data.push(2, obj.group!),
        link: (data, obj) => data.push(3, structs.putU32(obj.link!)),
        local: (data, obj) => data.push(4, obj.local!),
        ttl: (data, obj) => data.push(5, structs.putU8(obj.ttl!)),
        tos: (data, obj) => data.push(6, structs.putU8(obj.tos!)),
        learning: (data, obj) => data.push(7, structs.putU8(obj.learning!)),
        ageing: (data, obj) => data.push(8, structs.putU32(obj.ageing!)),
        limit: (data, obj) => data.push(9, structs.putU32(obj.limit!)),
        portRange: (data, obj) => data.push(10, obj.portRange!),
        proxy: (data, obj) => data.push(11, structs.putU8(obj.proxy!)),
        rsc: (data, obj) => data.push(12, structs.putU8(obj.rsc!)),
        l2miss: (data, obj) => data.push(13, structs.putU8(obj.l2miss!)),
        l3miss: (data, obj) => data.push(14, structs.putU8(obj.l3miss!)),
        port: (data, obj) => data.push(15, obj.port!),
        group6: (data, obj) => data.push(16, obj.group6!),
        local6: (data, obj) => data.push(17, obj.local6!),
        udpCsum: (data, obj) => data.push(18, structs.putU8(obj.udpCsum!)),
        udpZeroCsum6Tx: (data, obj) => data.push(19, structs.putU8(obj.udpZeroCsum6Tx!)),
        udpZeroCsum6Rx: (data, obj) => data.push(20, structs.putU8(obj.udpZeroCsum6Rx!)),
        remcsumTx: (data, obj) => data.push(21, structs.putU8(obj.remcsumTx!)),
        remcsumRx: (data, obj) => data.push(22, structs.putU8(obj.remcsumRx!)),
        gbp: (data, obj) => data.push(23, structs.putFlag(obj.gbp!)),
        remcsumNopartial: (data, obj) => data.push(24, obj.remcsumNopartial!),
        collectMetadata: (data, obj) => data.push(25, structs.putU8(obj.collectMetadata!)),
        label: (data, obj) => data.push(26, structs.putU32(obj.label!)),
        gpe: (data, obj) => data.push(27, structs.putFlag(obj.gpe!)),
        ttlInherit: (data, obj) => data.push(28, obj.ttlInherit!),
        df: (data, obj) => data.push(29, obj.df!),
    })
}

export interface VxlanPortRange {
    low?: number
    
    high?: number
}

/** Parses the attributes of a {@link VxlanPortRange} object */
export function parseVxlanPortRange(r: Buffer): VxlanPortRange {
    if (r.length !== __LENGTH_VxlanPortRange) throw Error('Unexpected length for VxlanPortRange')
    const x: VxlanPortRange = {}
    x.low = structs.readU16be.call(r, 0)
    x.high = structs.readU16be.call(r, 2)
    return x
}

/** Encodes a {@link VxlanPortRange} object into a stream of attributes */
export function formatVxlanPortRange(x: VxlanPortRange, r: Buffer = Buffer.alloc(__LENGTH_VxlanPortRange)): Buffer {
    if (r.length !== __LENGTH_VxlanPortRange) throw Error('Unexpected length for VxlanPortRange')
    x.low && structs.writeU16be.call(r, x.low, 0)
    x.high && structs.writeU16be.call(r, x.high, 2)
    return r
}

export const __LENGTH_VxlanPortRange = 4

export enum VxlanDf {
    UNSET,
    
    SET = 1,
    
    INHERIT = 2,
}

/** GENEVE section */
export interface Geneve extends BaseObject {
    id?: number
    
    remote?: Buffer
    
    ttl?: number
    
    tos?: number
    
    /** destination port */
    port?: Buffer
    
    collectMetadata?: Buffer
    
    remote6?: Buffer
    
    udpCsum?: number
    
    udpZeroCsum6Tx?: number
    
    udpZeroCsum6Rx?: number
    
    label?: number
    
    ttlInherit?: Buffer
    
    df?: Buffer
}

/** Parses the attributes of a {@link Geneve} object */
export function parseGeneve(r: Buffer): Geneve {
    return structs.getObject(r, {
        1: (data, obj) => obj.id = structs.getU32(data),
        2: (data, obj) => obj.remote = data,
        3: (data, obj) => obj.ttl = structs.getU8(data),
        4: (data, obj) => obj.tos = structs.getU8(data),
        5: (data, obj) => obj.port = data,
        6: (data, obj) => obj.collectMetadata = data,
        7: (data, obj) => obj.remote6 = data,
        8: (data, obj) => obj.udpCsum = structs.getU8(data),
        9: (data, obj) => obj.udpZeroCsum6Tx = structs.getU8(data),
        10: (data, obj) => obj.udpZeroCsum6Rx = structs.getU8(data),
        11: (data, obj) => obj.label = structs.getU32(data),
        12: (data, obj) => obj.ttlInherit = data,
        13: (data, obj) => obj.df = data,
    })
}

/** Encodes a {@link Geneve} object into a stream of attributes */
export function formatGeneve(x: Geneve): StreamData {
    return structs.putObject(x, {
        id: (data, obj) => data.push(1, structs.putU32(obj.id!)),
        remote: (data, obj) => data.push(2, obj.remote!),
        ttl: (data, obj) => data.push(3, structs.putU8(obj.ttl!)),
        tos: (data, obj) => data.push(4, structs.putU8(obj.tos!)),
        port: (data, obj) => data.push(5, obj.port!),
        collectMetadata: (data, obj) => data.push(6, obj.collectMetadata!),
        remote6: (data, obj) => data.push(7, obj.remote6!),
        udpCsum: (data, obj) => data.push(8, structs.putU8(obj.udpCsum!)),
        udpZeroCsum6Tx: (data, obj) => data.push(9, structs.putU8(obj.udpZeroCsum6Tx!)),
        udpZeroCsum6Rx: (data, obj) => data.push(10, structs.putU8(obj.udpZeroCsum6Rx!)),
        label: (data, obj) => data.push(11, structs.putU32(obj.label!)),
        ttlInherit: (data, obj) => data.push(12, obj.ttlInherit!),
        df: (data, obj) => data.push(13, obj.df!),
    })
}

export enum GeneveDf {
    UNSET,
    
    SET = 1,
    
    INHERIT = 2,
}

/** PPP section */
export interface Ppp extends BaseObject {
    devFd?: number
}

/** Parses the attributes of a {@link Ppp} object */
export function parsePpp(r: Buffer): Ppp {
    return structs.getObject(r, {
        1: (data, obj) => obj.devFd = structs.getS32(data),
    })
}

/** Encodes a {@link Ppp} object into a stream of attributes */
export function formatPpp(x: Ppp): StreamData {
    return structs.putObject(x, {
        devFd: (data, obj) => data.push(1, structs.putS32(obj.devFd!)),
    })
}

/** GTP section */
export enum GtpRole {
    GGSN,
    
    SGSN = 1,
}

export interface Gtp extends BaseObject {
    fd0?: Buffer
    
    fd1?: Buffer
    
    pdpHashsize?: Buffer
    
    role?: Buffer
}

/** Parses the attributes of a {@link Gtp} object */
export function parseGtp(r: Buffer): Gtp {
    return structs.getObject(r, {
        1: (data, obj) => obj.fd0 = data,
        2: (data, obj) => obj.fd1 = data,
        3: (data, obj) => obj.pdpHashsize = data,
        4: (data, obj) => obj.role = data,
    })
}

/** Encodes a {@link Gtp} object into a stream of attributes */
export function formatGtp(x: Gtp): StreamData {
    return structs.putObject(x, {
        fd0: (data, obj) => data.push(1, obj.fd0!),
        fd1: (data, obj) => data.push(2, obj.fd1!),
        pdpHashsize: (data, obj) => data.push(3, obj.pdpHashsize!),
        role: (data, obj) => data.push(4, obj.role!),
    })
}

/** Bonding section */
export interface Bond extends BaseObject {
    mode?: Buffer
    
    activeSlave?: Buffer
    
    miimon?: Buffer
    
    updelay?: Buffer
    
    downdelay?: Buffer
    
    useCarrier?: Buffer
    
    arpInterval?: Buffer
    
    arpIpTarget?: Buffer
    
    arpValidate?: Buffer
    
    arpAllTargets?: Buffer
    
    primary?: Buffer
    
    primaryReselect?: Buffer
    
    failOverMac?: Buffer
    
    xmitHashPolicy?: Buffer
    
    resendIgmp?: Buffer
    
    numPeerNotif?: Buffer
    
    allSlavesActive?: Buffer
    
    minLinks?: Buffer
    
    lpInterval?: Buffer
    
    packetsPerSlave?: Buffer
    
    adLacpRate?: Buffer
    
    adSelect?: Buffer
    
    adInfo?: BondAdInfo
    
    adActorSysPrio?: Buffer
    
    adUserPortKey?: Buffer
    
    adActorSystem?: Buffer
    
    tlbDynamicLb?: Buffer
    
    peerNotifDelay?: Buffer
}

/** Parses the attributes of a {@link Bond} object */
export function parseBond(r: Buffer): Bond {
    return structs.getObject(r, {
        1: (data, obj) => obj.mode = data,
        2: (data, obj) => obj.activeSlave = data,
        3: (data, obj) => obj.miimon = data,
        4: (data, obj) => obj.updelay = data,
        5: (data, obj) => obj.downdelay = data,
        6: (data, obj) => obj.useCarrier = data,
        7: (data, obj) => obj.arpInterval = data,
        8: (data, obj) => obj.arpIpTarget = data,
        9: (data, obj) => obj.arpValidate = data,
        10: (data, obj) => obj.arpAllTargets = data,
        11: (data, obj) => obj.primary = data,
        12: (data, obj) => obj.primaryReselect = data,
        13: (data, obj) => obj.failOverMac = data,
        14: (data, obj) => obj.xmitHashPolicy = data,
        15: (data, obj) => obj.resendIgmp = data,
        16: (data, obj) => obj.numPeerNotif = data,
        17: (data, obj) => obj.allSlavesActive = data,
        18: (data, obj) => obj.minLinks = data,
        19: (data, obj) => obj.lpInterval = data,
        20: (data, obj) => obj.packetsPerSlave = data,
        21: (data, obj) => obj.adLacpRate = data,
        22: (data, obj) => obj.adSelect = data,
        23: (data, obj) => obj.adInfo = parseBondAdInfo(data),
        24: (data, obj) => obj.adActorSysPrio = data,
        25: (data, obj) => obj.adUserPortKey = data,
        26: (data, obj) => obj.adActorSystem = data,
        27: (data, obj) => obj.tlbDynamicLb = data,
        28: (data, obj) => obj.peerNotifDelay = data,
    })
}

/** Encodes a {@link Bond} object into a stream of attributes */
export function formatBond(x: Bond): StreamData {
    return structs.putObject(x, {
        mode: (data, obj) => data.push(1, obj.mode!),
        activeSlave: (data, obj) => data.push(2, obj.activeSlave!),
        miimon: (data, obj) => data.push(3, obj.miimon!),
        updelay: (data, obj) => data.push(4, obj.updelay!),
        downdelay: (data, obj) => data.push(5, obj.downdelay!),
        useCarrier: (data, obj) => data.push(6, obj.useCarrier!),
        arpInterval: (data, obj) => data.push(7, obj.arpInterval!),
        arpIpTarget: (data, obj) => data.push(8, obj.arpIpTarget!),
        arpValidate: (data, obj) => data.push(9, obj.arpValidate!),
        arpAllTargets: (data, obj) => data.push(10, obj.arpAllTargets!),
        primary: (data, obj) => data.push(11, obj.primary!),
        primaryReselect: (data, obj) => data.push(12, obj.primaryReselect!),
        failOverMac: (data, obj) => data.push(13, obj.failOverMac!),
        xmitHashPolicy: (data, obj) => data.push(14, obj.xmitHashPolicy!),
        resendIgmp: (data, obj) => data.push(15, obj.resendIgmp!),
        numPeerNotif: (data, obj) => data.push(16, obj.numPeerNotif!),
        allSlavesActive: (data, obj) => data.push(17, obj.allSlavesActive!),
        minLinks: (data, obj) => data.push(18, obj.minLinks!),
        lpInterval: (data, obj) => data.push(19, obj.lpInterval!),
        packetsPerSlave: (data, obj) => data.push(20, obj.packetsPerSlave!),
        adLacpRate: (data, obj) => data.push(21, obj.adLacpRate!),
        adSelect: (data, obj) => data.push(22, obj.adSelect!),
        adInfo: (data, obj) => data.push(23, formatBondAdInfo(obj.adInfo!)),
        adActorSysPrio: (data, obj) => data.push(24, obj.adActorSysPrio!),
        adUserPortKey: (data, obj) => data.push(25, obj.adUserPortKey!),
        adActorSystem: (data, obj) => data.push(26, obj.adActorSystem!),
        tlbDynamicLb: (data, obj) => data.push(27, obj.tlbDynamicLb!),
        peerNotifDelay: (data, obj) => data.push(28, obj.peerNotifDelay!),
    })
}

export interface BondAdInfo extends BaseObject {
    aggregator?: Buffer
    
    numPorts?: Buffer
    
    actorKey?: Buffer
    
    partnerKey?: Buffer
    
    partnerMac?: Buffer
}

/** Parses the attributes of a {@link BondAdInfo} object */
export function parseBondAdInfo(r: Buffer): BondAdInfo {
    return structs.getObject(r, {
        1: (data, obj) => obj.aggregator = data,
        2: (data, obj) => obj.numPorts = data,
        3: (data, obj) => obj.actorKey = data,
        4: (data, obj) => obj.partnerKey = data,
        5: (data, obj) => obj.partnerMac = data,
    })
}

/** Encodes a {@link BondAdInfo} object into a stream of attributes */
export function formatBondAdInfo(x: BondAdInfo): StreamData {
    return structs.putObject(x, {
        aggregator: (data, obj) => data.push(1, obj.aggregator!),
        numPorts: (data, obj) => data.push(2, obj.numPorts!),
        actorKey: (data, obj) => data.push(3, obj.actorKey!),
        partnerKey: (data, obj) => data.push(4, obj.partnerKey!),
        partnerMac: (data, obj) => data.push(5, obj.partnerMac!),
    })
}

export interface BondSlave extends BaseObject {
    state?: Buffer
    
    miiStatus?: Buffer
    
    linkFailureCount?: Buffer
    
    permHwaddr?: Buffer
    
    queueId?: Buffer
    
    adAggregatorId?: Buffer
    
    adActorOperPortState?: Buffer
    
    adPartnerOperPortState?: Buffer
}

/** Parses the attributes of a {@link BondSlave} object */
export function parseBondSlave(r: Buffer): BondSlave {
    return structs.getObject(r, {
        1: (data, obj) => obj.state = data,
        2: (data, obj) => obj.miiStatus = data,
        3: (data, obj) => obj.linkFailureCount = data,
        4: (data, obj) => obj.permHwaddr = data,
        5: (data, obj) => obj.queueId = data,
        6: (data, obj) => obj.adAggregatorId = data,
        7: (data, obj) => obj.adActorOperPortState = data,
        8: (data, obj) => obj.adPartnerOperPortState = data,
    })
}

/** Encodes a {@link BondSlave} object into a stream of attributes */
export function formatBondSlave(x: BondSlave): StreamData {
    return structs.putObject(x, {
        state: (data, obj) => data.push(1, obj.state!),
        miiStatus: (data, obj) => data.push(2, obj.miiStatus!),
        linkFailureCount: (data, obj) => data.push(3, obj.linkFailureCount!),
        permHwaddr: (data, obj) => data.push(4, obj.permHwaddr!),
        queueId: (data, obj) => data.push(5, obj.queueId!),
        adAggregatorId: (data, obj) => data.push(6, obj.adAggregatorId!),
        adActorOperPortState: (data, obj) => data.push(7, obj.adActorOperPortState!),
        adPartnerOperPortState: (data, obj) => data.push(8, obj.adPartnerOperPortState!),
    })
}

export interface VirtualFunctionList extends BaseObject {
    x?: VirtualFunction[]
}

/** Parses the attributes of a {@link VirtualFunctionList} object */
export function parseVirtualFunctionList(r: Buffer): VirtualFunctionList {
    return structs.getObject(r, {
        1: (data, obj) => (obj.x = obj.x || []).push(parseVirtualFunction(data)),
    })
}

/** Encodes a {@link VirtualFunctionList} object into a stream of attributes */
export function formatVirtualFunctionList(x: VirtualFunctionList): StreamData {
    return structs.putObject(x, {
        x: (data, obj) => obj.x!.forEach(x => data.push(1, formatVirtualFunction(x))),
    })
}

/** SR-IOV virtual function management section */
export interface VirtualFunction extends BaseObject {
    /** Hardware queue specific attributes */
    mac?: Buffer
    
    /** VLAN ID and QoS */
    vlan?: Buffer
    
    /** Max TX Bandwidth Allocation */
    txRate?: Buffer
    
    /** Spoof Checking on/off switch */
    spoofchk?: Buffer
    
    /** link state enable/disable/auto switch */
    linkState?: Buffer
    
    /** Min and Max TX Bandwidth Allocation */
    rate?: Buffer
    
    rssQueryEn?: Buffer
    
    /** network device statistics */
    stats?: VirtualFunctionStats
    
    /** Trust VF */
    trust?: Buffer
    
    /** VF Infiniband node GUID */
    ibNodeGuid?: Buffer
    
    /** VF Infiniband port GUID */
    ibPortGuid?: Buffer
    
    /** nested list of vlans, option for QinQ */
    vlanList?: Buffer
    
    /** VF broadcast */
    broadcast?: Buffer
}

/** Parses the attributes of a {@link VirtualFunction} object */
export function parseVirtualFunction(r: Buffer): VirtualFunction {
    return structs.getObject(r, {
        1: (data, obj) => obj.mac = data,
        2: (data, obj) => obj.vlan = data,
        3: (data, obj) => obj.txRate = data,
        4: (data, obj) => obj.spoofchk = data,
        5: (data, obj) => obj.linkState = data,
        6: (data, obj) => obj.rate = data,
        7: (data, obj) => obj.rssQueryEn = data,
        8: (data, obj) => obj.stats = parseVirtualFunctionStats(data),
        9: (data, obj) => obj.trust = data,
        10: (data, obj) => obj.ibNodeGuid = data,
        11: (data, obj) => obj.ibPortGuid = data,
        12: (data, obj) => obj.vlanList = data,
        13: (data, obj) => obj.broadcast = data,
    })
}

/** Encodes a {@link VirtualFunction} object into a stream of attributes */
export function formatVirtualFunction(x: VirtualFunction): StreamData {
    return structs.putObject(x, {
        mac: (data, obj) => data.push(1, obj.mac!),
        vlan: (data, obj) => data.push(2, obj.vlan!),
        txRate: (data, obj) => data.push(3, obj.txRate!),
        spoofchk: (data, obj) => data.push(4, obj.spoofchk!),
        linkState: (data, obj) => data.push(5, obj.linkState!),
        rate: (data, obj) => data.push(6, obj.rate!),
        rssQueryEn: (data, obj) => data.push(7, obj.rssQueryEn!),
        stats: (data, obj) => data.push(8, formatVirtualFunctionStats(obj.stats!)),
        trust: (data, obj) => data.push(9, obj.trust!),
        ibNodeGuid: (data, obj) => data.push(10, obj.ibNodeGuid!),
        ibPortGuid: (data, obj) => data.push(11, obj.ibPortGuid!),
        vlanList: (data, obj) => data.push(12, obj.vlanList!),
        broadcast: (data, obj) => data.push(13, obj.broadcast!),
    })
}

export interface VirtualFunctionMac {
    vf?: number
    
    /** MAX_ADDR_LEN */
    mac?: number[]
}

/** Parses the attributes of a {@link VirtualFunctionMac} object */
export function parseVirtualFunctionMac(r: Buffer): VirtualFunctionMac {
    if (r.length !== __LENGTH_VirtualFunctionMac) throw Error('Unexpected length for VirtualFunctionMac')
    const x: VirtualFunctionMac = {}
    x.vf = structs.readU32.call(r, 0)
    x.mac = [...Array(32).keys()].map(i => structs.readU8.call(r, 4 + 1 * i))
    return x
}

/** Encodes a {@link VirtualFunctionMac} object into a stream of attributes */
export function formatVirtualFunctionMac(x: VirtualFunctionMac, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionMac)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionMac) throw Error('Unexpected length for VirtualFunctionMac')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    if (x.mac && x.mac.length !== 32)
        throw Error('mac: Unexpected array length')
        x.mac && x.mac.forEach((x, i) => structs.writeU8.call(r, x, 4 + 1 * i))
    return r
}

export const __LENGTH_VirtualFunctionMac = 36

export interface VirtualFunctionBroadcast {
    broadcast?: number[]
}

/** Parses the attributes of a {@link VirtualFunctionBroadcast} object */
export function parseVirtualFunctionBroadcast(r: Buffer): VirtualFunctionBroadcast {
    if (r.length !== __LENGTH_VirtualFunctionBroadcast) throw Error('Unexpected length for VirtualFunctionBroadcast')
    const x: VirtualFunctionBroadcast = {}
    x.broadcast = [...Array(32).keys()].map(i => structs.readU8.call(r, 0 + 1 * i))
    return x
}

/** Encodes a {@link VirtualFunctionBroadcast} object into a stream of attributes */
export function formatVirtualFunctionBroadcast(x: VirtualFunctionBroadcast, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionBroadcast)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionBroadcast) throw Error('Unexpected length for VirtualFunctionBroadcast')
    if (x.broadcast && x.broadcast.length !== 32)
        throw Error('broadcast: Unexpected array length')
        x.broadcast && x.broadcast.forEach((x, i) => structs.writeU8.call(r, x, 0 + 1 * i))
    return r
}

export const __LENGTH_VirtualFunctionBroadcast = 32

export interface VirtualFunctionVlan {
    vf?: number
    
    /** 0 - 4095, 0 disables VLAN filter */
    vlan?: number
    
    qos?: number
}

/** Parses the attributes of a {@link VirtualFunctionVlan} object */
export function parseVirtualFunctionVlan(r: Buffer): VirtualFunctionVlan {
    if (r.length !== __LENGTH_VirtualFunctionVlan) throw Error('Unexpected length for VirtualFunctionVlan')
    const x: VirtualFunctionVlan = {}
    x.vf = structs.readU32.call(r, 0)
    x.vlan = structs.readU32.call(r, 4)
    x.qos = structs.readU32.call(r, 8)
    return x
}

/** Encodes a {@link VirtualFunctionVlan} object into a stream of attributes */
export function formatVirtualFunctionVlan(x: VirtualFunctionVlan, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionVlan)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionVlan) throw Error('Unexpected length for VirtualFunctionVlan')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    x.vlan && structs.writeU32.call(r, x.vlan, 4)
    x.qos && structs.writeU32.call(r, x.qos, 8)
    return r
}

export const __LENGTH_VirtualFunctionVlan = 12

export interface VlanList extends BaseObject {
    /** VLAN ID, QoS and VLAN protocol */
    x?: Vlan[]
}

/** Parses the attributes of a {@link VlanList} object */
export function parseVlanList(r: Buffer): VlanList {
    return structs.getObject(r, {
        1: (data, obj) => (obj.x = obj.x || []).push(parseVlan(data)),
    })
}

/** Encodes a {@link VlanList} object into a stream of attributes */
export function formatVlanList(x: VlanList): StreamData {
    return structs.putObject(x, {
        x: (data, obj) => obj.x!.forEach(x => data.push(1, formatVlan(x))),
    })
}

export interface VirtualFunctionVlanInfo {
    vf?: number
    
    /** 0 - 4095, 0 disables VLAN filter */
    vlan?: number
    
    qos?: number
    
    /** VLAN protocol either 802.1Q or 802.1ad */
    vlanProto?: number
}

/** Parses the attributes of a {@link VirtualFunctionVlanInfo} object */
export function parseVirtualFunctionVlanInfo(r: Buffer): VirtualFunctionVlanInfo {
    if (r.length !== __LENGTH_VirtualFunctionVlanInfo) throw Error('Unexpected length for VirtualFunctionVlanInfo')
    const x: VirtualFunctionVlanInfo = {}
    x.vf = structs.readU32.call(r, 0)
    x.vlan = structs.readU32.call(r, 4)
    x.qos = structs.readU32.call(r, 8)
    x.vlanProto = structs.readU16be.call(r, 12)
    return x
}

/** Encodes a {@link VirtualFunctionVlanInfo} object into a stream of attributes */
export function formatVirtualFunctionVlanInfo(x: VirtualFunctionVlanInfo, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionVlanInfo)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionVlanInfo) throw Error('Unexpected length for VirtualFunctionVlanInfo')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    x.vlan && structs.writeU32.call(r, x.vlan, 4)
    x.qos && structs.writeU32.call(r, x.qos, 8)
    x.vlanProto && structs.writeU16be.call(r, x.vlanProto, 12)
    return r
}

export const __LENGTH_VirtualFunctionVlanInfo = 14

export interface VirtualFunctionTxRate {
    vf?: number
    
    /** Max TX bandwidth in Mbps, 0 disables throttling */
    rate?: number
}

/** Parses the attributes of a {@link VirtualFunctionTxRate} object */
export function parseVirtualFunctionTxRate(r: Buffer): VirtualFunctionTxRate {
    if (r.length !== __LENGTH_VirtualFunctionTxRate) throw Error('Unexpected length for VirtualFunctionTxRate')
    const x: VirtualFunctionTxRate = {}
    x.vf = structs.readU32.call(r, 0)
    x.rate = structs.readU32.call(r, 4)
    return x
}

/** Encodes a {@link VirtualFunctionTxRate} object into a stream of attributes */
export function formatVirtualFunctionTxRate(x: VirtualFunctionTxRate, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionTxRate)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionTxRate) throw Error('Unexpected length for VirtualFunctionTxRate')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    x.rate && structs.writeU32.call(r, x.rate, 4)
    return r
}

export const __LENGTH_VirtualFunctionTxRate = 8

export interface VirtualFunctionRate {
    vf?: number
    
    /** Min Bandwidth in Mbps */
    minTxRate?: number
    
    /** Max Bandwidth in Mbps */
    maxTxRate?: number
}

/** Parses the attributes of a {@link VirtualFunctionRate} object */
export function parseVirtualFunctionRate(r: Buffer): VirtualFunctionRate {
    if (r.length !== __LENGTH_VirtualFunctionRate) throw Error('Unexpected length for VirtualFunctionRate')
    const x: VirtualFunctionRate = {}
    x.vf = structs.readU32.call(r, 0)
    x.minTxRate = structs.readU32.call(r, 4)
    x.maxTxRate = structs.readU32.call(r, 8)
    return x
}

/** Encodes a {@link VirtualFunctionRate} object into a stream of attributes */
export function formatVirtualFunctionRate(x: VirtualFunctionRate, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionRate)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionRate) throw Error('Unexpected length for VirtualFunctionRate')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    x.minTxRate && structs.writeU32.call(r, x.minTxRate, 4)
    x.maxTxRate && structs.writeU32.call(r, x.maxTxRate, 8)
    return r
}

export const __LENGTH_VirtualFunctionRate = 12

export interface VirtualFunctionSpoofchk {
    vf?: number
    
    setting?: number
}

/** Parses the attributes of a {@link VirtualFunctionSpoofchk} object */
export function parseVirtualFunctionSpoofchk(r: Buffer): VirtualFunctionSpoofchk {
    if (r.length !== __LENGTH_VirtualFunctionSpoofchk) throw Error('Unexpected length for VirtualFunctionSpoofchk')
    const x: VirtualFunctionSpoofchk = {}
    x.vf = structs.readU32.call(r, 0)
    x.setting = structs.readU32.call(r, 4)
    return x
}

/** Encodes a {@link VirtualFunctionSpoofchk} object into a stream of attributes */
export function formatVirtualFunctionSpoofchk(x: VirtualFunctionSpoofchk, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionSpoofchk)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionSpoofchk) throw Error('Unexpected length for VirtualFunctionSpoofchk')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    x.setting && structs.writeU32.call(r, x.setting, 4)
    return r
}

export const __LENGTH_VirtualFunctionSpoofchk = 8

export interface VirtualFunctionGuid {
    vf?: number
    
    guid?: bigint
}

/** Parses the attributes of a {@link VirtualFunctionGuid} object */
export function parseVirtualFunctionGuid(r: Buffer): VirtualFunctionGuid {
    if (r.length !== __LENGTH_VirtualFunctionGuid) throw Error('Unexpected length for VirtualFunctionGuid')
    const x: VirtualFunctionGuid = {}
    x.vf = structs.readU32.call(r, 0)
    x.guid = structs.readU64.call(r, 4)
    return x
}

/** Encodes a {@link VirtualFunctionGuid} object into a stream of attributes */
export function formatVirtualFunctionGuid(x: VirtualFunctionGuid, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionGuid)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionGuid) throw Error('Unexpected length for VirtualFunctionGuid')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    x.guid && structs.writeU64.call(r, x.guid, 4)
    return r
}

export const __LENGTH_VirtualFunctionGuid = 12

export enum VirtualFunctionLinkStateId {
    /** link state of the uplink */
    AUTO,
    
    /** link always up */
    ENABLE = 1,
    
    /** link always down */
    DISABLE = 2,
}

export interface VirtualFunctionLinkState {
    vf?: number
    
    linkState?: VirtualFunctionLinkStateId | keyof typeof VirtualFunctionLinkStateId
}

/** Parses the attributes of a {@link VirtualFunctionLinkState} object */
export function parseVirtualFunctionLinkState(r: Buffer): VirtualFunctionLinkState {
    if (r.length !== __LENGTH_VirtualFunctionLinkState) throw Error('Unexpected length for VirtualFunctionLinkState')
    const x: VirtualFunctionLinkState = {}
    x.vf = structs.readU32.call(r, 0)
    x.linkState = structs.getEnum(VirtualFunctionLinkStateId, structs.readU32.call(r, 4))
    return x
}

/** Encodes a {@link VirtualFunctionLinkState} object into a stream of attributes */
export function formatVirtualFunctionLinkState(x: VirtualFunctionLinkState, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionLinkState)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionLinkState) throw Error('Unexpected length for VirtualFunctionLinkState')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    x.linkState && structs.writeU32.call(r, structs.putEnum(VirtualFunctionLinkStateId, x.linkState), 4)
    return r
}

export const __LENGTH_VirtualFunctionLinkState = 8

export interface VirtualFunctionRssQueryEn {
    vf?: number
    
    setting?: number
}

/** Parses the attributes of a {@link VirtualFunctionRssQueryEn} object */
export function parseVirtualFunctionRssQueryEn(r: Buffer): VirtualFunctionRssQueryEn {
    if (r.length !== __LENGTH_VirtualFunctionRssQueryEn) throw Error('Unexpected length for VirtualFunctionRssQueryEn')
    const x: VirtualFunctionRssQueryEn = {}
    x.vf = structs.readU32.call(r, 0)
    x.setting = structs.readU32.call(r, 4)
    return x
}

/** Encodes a {@link VirtualFunctionRssQueryEn} object into a stream of attributes */
export function formatVirtualFunctionRssQueryEn(x: VirtualFunctionRssQueryEn, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionRssQueryEn)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionRssQueryEn) throw Error('Unexpected length for VirtualFunctionRssQueryEn')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    x.setting && structs.writeU32.call(r, x.setting, 4)
    return r
}

export const __LENGTH_VirtualFunctionRssQueryEn = 8

export interface VirtualFunctionStats extends BaseObject {
    rxPackets?: Buffer
    
    txPackets?: Buffer
    
    rxBytes?: Buffer
    
    txBytes?: Buffer
    
    broadcast?: Buffer
    
    multicast?: Buffer
    
    __pad?: Buffer
    
    rxDropped?: Buffer
    
    txDropped?: Buffer
}

/** Parses the attributes of a {@link VirtualFunctionStats} object */
export function parseVirtualFunctionStats(r: Buffer): VirtualFunctionStats {
    return structs.getObject(r, {
        0: (data, obj) => obj.rxPackets = data,
        1: (data, obj) => obj.txPackets = data,
        2: (data, obj) => obj.rxBytes = data,
        3: (data, obj) => obj.txBytes = data,
        4: (data, obj) => obj.broadcast = data,
        5: (data, obj) => obj.multicast = data,
        6: (data, obj) => obj.__pad = data,
        7: (data, obj) => obj.rxDropped = data,
        8: (data, obj) => obj.txDropped = data,
    })
}

/** Encodes a {@link VirtualFunctionStats} object into a stream of attributes */
export function formatVirtualFunctionStats(x: VirtualFunctionStats): StreamData {
    return structs.putObject(x, {
        rxPackets: (data, obj) => data.push(0, obj.rxPackets!),
        txPackets: (data, obj) => data.push(1, obj.txPackets!),
        rxBytes: (data, obj) => data.push(2, obj.rxBytes!),
        txBytes: (data, obj) => data.push(3, obj.txBytes!),
        broadcast: (data, obj) => data.push(4, obj.broadcast!),
        multicast: (data, obj) => data.push(5, obj.multicast!),
        __pad: (data, obj) => data.push(6, obj.__pad!),
        rxDropped: (data, obj) => data.push(7, obj.rxDropped!),
        txDropped: (data, obj) => data.push(8, obj.txDropped!),
    })
}

export interface VirtualFunctionTrust {
    vf?: number
    
    setting?: number
}

/** Parses the attributes of a {@link VirtualFunctionTrust} object */
export function parseVirtualFunctionTrust(r: Buffer): VirtualFunctionTrust {
    if (r.length !== __LENGTH_VirtualFunctionTrust) throw Error('Unexpected length for VirtualFunctionTrust')
    const x: VirtualFunctionTrust = {}
    x.vf = structs.readU32.call(r, 0)
    x.setting = structs.readU32.call(r, 4)
    return x
}

/** Encodes a {@link VirtualFunctionTrust} object into a stream of attributes */
export function formatVirtualFunctionTrust(x: VirtualFunctionTrust, r: Buffer = Buffer.alloc(__LENGTH_VirtualFunctionTrust)): Buffer {
    if (r.length !== __LENGTH_VirtualFunctionTrust) throw Error('Unexpected length for VirtualFunctionTrust')
    x.vf && structs.writeU32.call(r, x.vf, 0)
    x.setting && structs.writeU32.call(r, x.setting, 4)
    return r
}

export const __LENGTH_VirtualFunctionTrust = 8

export interface PortList extends BaseObject {
    /** nest */
    x?: Port[]
}

/** Parses the attributes of a {@link PortList} object */
export function parsePortList(r: Buffer): PortList {
    return structs.getObject(r, {
        1: (data, obj) => (obj.x = obj.x || []).push(parsePort(data)),
    })
}

/** Encodes a {@link PortList} object into a stream of attributes */
export function formatPortList(x: PortList): StreamData {
    return structs.putObject(x, {
        x: (data, obj) => obj.x!.forEach(x => data.push(1, formatPort(x))),
    })
}

export interface Port extends BaseObject {
    /** __u32 */
    vf?: Buffer
    
    /** string */
    profile?: Buffer
    
    /** 802.1Qbg (pre-)standard VDP */
    vsiType?: Buffer
    
    /** binary UUID */
    instanceUuid?: Buffer
    
    hostUuid?: Buffer
    
    /** __u8 */
    request?: Buffer
    
    /** __u16, output only */
    response?: Buffer
}

/** Parses the attributes of a {@link Port} object */
export function parsePort(r: Buffer): Port {
    return structs.getObject(r, {
        1: (data, obj) => obj.vf = data,
        2: (data, obj) => obj.profile = data,
        3: (data, obj) => obj.vsiType = data,
        4: (data, obj) => obj.instanceUuid = data,
        5: (data, obj) => obj.hostUuid = data,
        6: (data, obj) => obj.request = data,
        7: (data, obj) => obj.response = data,
    })
}

/** Encodes a {@link Port} object into a stream of attributes */
export function formatPort(x: Port): StreamData {
    return structs.putObject(x, {
        vf: (data, obj) => data.push(1, obj.vf!),
        profile: (data, obj) => data.push(2, obj.profile!),
        vsiType: (data, obj) => data.push(3, obj.vsiType!),
        instanceUuid: (data, obj) => data.push(4, obj.instanceUuid!),
        hostUuid: (data, obj) => data.push(5, obj.hostUuid!),
        request: (data, obj) => data.push(6, obj.request!),
        response: (data, obj) => data.push(7, obj.response!),
    })
}

export enum PortRequest {
    PREASSOCIATE,
    
    PREASSOCIATE_RR = 1,
    
    ASSOCIATE = 2,
    
    DISASSOCIATE = 3,
}

export enum PortVdpResponse {
    SUCCESS,
    
    INVALID_FORMAT = 1,
    
    INSUFFICIENT_RESOURCES = 2,
    
    UNUSED_VTID = 3,
    
    VTID_VIOLATION = 4,
    
    VTID_VERSION_VIOALTION = 5,
    
    OUT_OF_SYNC = 6,
}

export enum PortProfileResponse {
    /** 0x08-0xFF reserved for future VDP use */
    SUCCESS = 256,
    
    INPROGRESS = 257,
    
    INVALID = 258,
    
    BADSTATE = 259,
    
    INSUFFICIENT_RESOURCES = 260,
    
    ERROR = 261,
}

export interface PortVsi {
    vsiMgrId?: number
    
    vsiTypeId?: number[]
    
    vsiTypeVersion?: number
    
    __pad?: number[]
}

/** Parses the attributes of a {@link PortVsi} object */
export function parsePortVsi(r: Buffer): PortVsi {
    if (r.length !== __LENGTH_PortVsi) throw Error('Unexpected length for PortVsi')
    const x: PortVsi = {}
    x.vsiMgrId = structs.readU8.call(r, 0)
    x.vsiTypeId = [...Array(3).keys()].map(i => structs.readU8.call(r, 1 + 1 * i))
    x.vsiTypeVersion = structs.readU8.call(r, 4)
    x.__pad = [...Array(3).keys()].map(i => structs.readU8.call(r, 5 + 1 * i))
    return x
}

/** Encodes a {@link PortVsi} object into a stream of attributes */
export function formatPortVsi(x: PortVsi, r: Buffer = Buffer.alloc(__LENGTH_PortVsi)): Buffer {
    if (r.length !== __LENGTH_PortVsi) throw Error('Unexpected length for PortVsi')
    x.vsiMgrId && structs.writeU8.call(r, x.vsiMgrId, 0)
    if (x.vsiTypeId && x.vsiTypeId.length !== 3)
        throw Error('vsiTypeId: Unexpected array length')
        x.vsiTypeId && x.vsiTypeId.forEach((x, i) => structs.writeU8.call(r, x, 1 + 1 * i))
    x.vsiTypeVersion && structs.writeU8.call(r, x.vsiTypeVersion, 4)
    if (x.__pad && x.__pad.length !== 3)
        throw Error('__pad: Unexpected array length')
        x.__pad && x.__pad.forEach((x, i) => structs.writeU8.call(r, x, 5 + 1 * i))
    return r
}

export const __LENGTH_PortVsi = 8

/** IPoIB section */
export interface Ipoib extends BaseObject {
    pkey?: Buffer
    
    mode?: Buffer
    
    umcast?: Buffer
}

/** Parses the attributes of a {@link Ipoib} object */
export function parseIpoib(r: Buffer): Ipoib {
    return structs.getObject(r, {
        1: (data, obj) => obj.pkey = data,
        2: (data, obj) => obj.mode = data,
        3: (data, obj) => obj.umcast = data,
    })
}

/** Encodes a {@link Ipoib} object into a stream of attributes */
export function formatIpoib(x: Ipoib): StreamData {
    return structs.putObject(x, {
        pkey: (data, obj) => data.push(1, obj.pkey!),
        mode: (data, obj) => data.push(2, obj.mode!),
        umcast: (data, obj) => data.push(3, obj.umcast!),
    })
}

export enum IpoibMode {
    /** using unreliable datagram QPs */
    DATAGRAM,
    
    /** using connected QPs */
    CONNECTED = 1,
}

/** HSR section */
export interface Hsr extends BaseObject {
    slave1?: Buffer
    
    slave2?: Buffer
    
    /** Last byte of supervision addr */
    multicastSpec?: Buffer
    
    /** Supervision frame multicast addr */
    supervisionAddr?: Buffer
    
    seqNr?: Buffer
    
    /** HSR version */
    version?: Buffer
}

/** Parses the attributes of a {@link Hsr} object */
export function parseHsr(r: Buffer): Hsr {
    return structs.getObject(r, {
        1: (data, obj) => obj.slave1 = data,
        2: (data, obj) => obj.slave2 = data,
        3: (data, obj) => obj.multicastSpec = data,
        4: (data, obj) => obj.supervisionAddr = data,
        5: (data, obj) => obj.seqNr = data,
        6: (data, obj) => obj.version = data,
    })
}

/** Encodes a {@link Hsr} object into a stream of attributes */
export function formatHsr(x: Hsr): StreamData {
    return structs.putObject(x, {
        slave1: (data, obj) => data.push(1, obj.slave1!),
        slave2: (data, obj) => data.push(2, obj.slave2!),
        multicastSpec: (data, obj) => data.push(3, obj.multicastSpec!),
        supervisionAddr: (data, obj) => data.push(4, obj.supervisionAddr!),
        seqNr: (data, obj) => data.push(5, obj.seqNr!),
        version: (data, obj) => data.push(6, obj.version!),
    })
}

/** STATS section */
export interface IfStatsMsg {
    family?: number
    
    __pad1?: number
    
    __pad2?: number
    
    ifindex?: number
    
    filterMask?: number
}

/** Parses the attributes of a {@link IfStatsMsg} object */
export function parseIfStatsMsg(r: Buffer): IfStatsMsg {
    if (r.length !== __LENGTH_IfStatsMsg) throw Error('Unexpected length for IfStatsMsg')
    const x: IfStatsMsg = {}
    x.family = structs.readU8.call(r, 0)
    x.__pad1 = structs.readU8.call(r, 1)
    x.__pad2 = structs.readU16.call(r, 2)
    x.ifindex = structs.readU32.call(r, 4)
    x.filterMask = structs.readU32.call(r, 8)
    return x
}

/** Encodes a {@link IfStatsMsg} object into a stream of attributes */
export function formatIfStatsMsg(x: IfStatsMsg, r: Buffer = Buffer.alloc(__LENGTH_IfStatsMsg)): Buffer {
    if (r.length !== __LENGTH_IfStatsMsg) throw Error('Unexpected length for IfStatsMsg')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.__pad1 && structs.writeU8.call(r, x.__pad1, 1)
    x.__pad2 && structs.writeU16.call(r, x.__pad2, 2)
    x.ifindex && structs.writeU32.call(r, x.ifindex, 4)
    x.filterMask && structs.writeU32.call(r, x.filterMask, 8)
    return r
}

export const __LENGTH_IfStatsMsg = 12

export interface Stats extends BaseObject {
    link64?: Buffer
    
    linkXstats?: Xstats
    
    linkXstatsSlave?: Xstats
    
    linkOffloadXstats?: OffloadXstats
    
    afSpec?: Map<number, Buffer>
}

/** Parses the attributes of a {@link Stats} object */
export function parseStats(r: Buffer): Stats {
    return structs.getObject(r, {
        1: (data, obj) => obj.link64 = data,
        2: (data, obj) => obj.linkXstats = parseXstats(data),
        3: (data, obj) => obj.linkXstatsSlave = parseXstats(data),
        4: (data, obj) => obj.linkOffloadXstats = parseOffloadXstats(data),
        5: (data, obj) => obj.afSpec = structs.getMap(data, x => x),
    })
}

/** Encodes a {@link Stats} object into a stream of attributes */
export function formatStats(x: Stats): StreamData {
    return structs.putObject(x, {
        link64: (data, obj) => data.push(1, obj.link64!),
        linkXstats: (data, obj) => data.push(2, formatXstats(obj.linkXstats!)),
        linkXstatsSlave: (data, obj) => data.push(3, formatXstats(obj.linkXstatsSlave!)),
        linkOffloadXstats: (data, obj) => data.push(4, formatOffloadXstats(obj.linkOffloadXstats!)),
        afSpec: (data, obj) => data.push(5, structs.putMap(obj.afSpec!, x => x)),
    })
}

export interface Xstats extends BaseObject {
    bridge?: BridgeXstats
    
    bond?: Buffer
}

/** Parses the attributes of a {@link Xstats} object */
export function parseXstats(r: Buffer): Xstats {
    return structs.getObject(r, {
        1: (data, obj) => obj.bridge = parseBridgeXstats(data),
        2: (data, obj) => obj.bond = data,
    })
}

/** Encodes a {@link Xstats} object into a stream of attributes */
export function formatXstats(x: Xstats): StreamData {
    return structs.putObject(x, {
        bridge: (data, obj) => data.push(1, formatBridgeXstats(obj.bridge!)),
        bond: (data, obj) => data.push(2, obj.bond!),
    })
}

/** These are stats embedded into IFLA_STATS_LINK_OFFLOAD_XSTATS */
export interface OffloadXstats extends BaseObject {
    /** struct rtnl_link_stats64 */
    cpuHit?: LinkStats64
}

/** Parses the attributes of a {@link OffloadXstats} object */
export function parseOffloadXstats(r: Buffer): OffloadXstats {
    return structs.getObject(r, {
        1: (data, obj) => obj.cpuHit = parseLinkStats64(data),
    })
}

/** Encodes a {@link OffloadXstats} object into a stream of attributes */
export function formatOffloadXstats(x: OffloadXstats): StreamData {
    return structs.putObject(x, {
        cpuHit: (data, obj) => data.push(1, formatLinkStats64(obj.cpuHit!)),
    })
}

/** XDP section */
export interface XdpFlags {
    updateIfNoexist?: true
    
    skbMode?: true
    
    drvMode?: true
    
    hwMode?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link XdpFlags} bitmask */
export function parseXdpFlags(r: number): XdpFlags {
    const x: XdpFlags = {}
    if (r & (1)) (x.updateIfNoexist = true, r &= ~(1))
    if (r & (2)) (x.skbMode = true, r &= ~(2))
    if (r & (4)) (x.drvMode = true, r &= ~(4))
    if (r & (8)) (x.hwMode = true, r &= ~(8))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link XdpFlags} bitmask */
export function formatXdpFlags(x: XdpFlags): number {
    let r = x.__unknown || 0
    if (x.updateIfNoexist) r |= 1
    if (x.skbMode) r |= 2
    if (x.drvMode) r |= 4
    if (x.hwMode) r |= 8
    return r
}

/** These are stored into IFLA_XDP_ATTACHED on dump. */
export enum XdpAttached {
    NONE,
    
    DRV = 1,
    
    SKB = 2,
    
    HW = 3,
    
    MULTI = 4,
}

export interface Xdp extends BaseObject {
    fd?: Buffer
    
    attached?: XdpAttached | keyof typeof XdpAttached
    
    flags?: Buffer
    
    progId?: Buffer
    
    drvProgId?: Buffer
    
    skbProgId?: Buffer
    
    hwProgId?: Buffer
}

/** Parses the attributes of a {@link Xdp} object */
export function parseXdp(r: Buffer): Xdp {
    return structs.getObject(r, {
        1: (data, obj) => obj.fd = data,
        2: (data, obj) => obj.attached = structs.getEnum(XdpAttached, structs.getU8(data)),
        3: (data, obj) => obj.flags = data,
        4: (data, obj) => obj.progId = data,
        5: (data, obj) => obj.drvProgId = data,
        6: (data, obj) => obj.skbProgId = data,
        7: (data, obj) => obj.hwProgId = data,
    })
}

/** Encodes a {@link Xdp} object into a stream of attributes */
export function formatXdp(x: Xdp): StreamData {
    return structs.putObject(x, {
        fd: (data, obj) => data.push(1, obj.fd!),
        attached: (data, obj) => data.push(2, structs.putU8(structs.putEnum(XdpAttached, obj.attached!))),
        flags: (data, obj) => data.push(3, obj.flags!),
        progId: (data, obj) => data.push(4, obj.progId!),
        drvProgId: (data, obj) => data.push(5, obj.drvProgId!),
        skbProgId: (data, obj) => data.push(6, obj.skbProgId!),
        hwProgId: (data, obj) => data.push(7, obj.hwProgId!),
    })
}

export enum Event {
    NONE,
    
    /** internal reset / reboot */
    REBOOT = 1,
    
    /** change in offload features */
    FEATURES = 2,
    
    /** change in active slave */
    BONDING_FAILOVER = 3,
    
    /** re-sent grat. arp/ndisc */
    NOTIFY_PEERS = 4,
    
    /** re-sent IGMP JOIN */
    IGMP_RESEND = 5,
    
    /** change in bonding options */
    BONDING_OPTIONS = 6,
}

/** tun section */
export interface Tun extends BaseObject {
    owner?: Buffer
    
    group?: Buffer
    
    type?: Buffer
    
    pi?: Buffer
    
    vnetHdr?: Buffer
    
    persist?: Buffer
    
    multiQueue?: Buffer
    
    numQueues?: Buffer
    
    numDisabledQueues?: Buffer
}

/** Parses the attributes of a {@link Tun} object */
export function parseTun(r: Buffer): Tun {
    return structs.getObject(r, {
        1: (data, obj) => obj.owner = data,
        2: (data, obj) => obj.group = data,
        3: (data, obj) => obj.type = data,
        4: (data, obj) => obj.pi = data,
        5: (data, obj) => obj.vnetHdr = data,
        6: (data, obj) => obj.persist = data,
        7: (data, obj) => obj.multiQueue = data,
        8: (data, obj) => obj.numQueues = data,
        9: (data, obj) => obj.numDisabledQueues = data,
    })
}

/** Encodes a {@link Tun} object into a stream of attributes */
export function formatTun(x: Tun): StreamData {
    return structs.putObject(x, {
        owner: (data, obj) => data.push(1, obj.owner!),
        group: (data, obj) => data.push(2, obj.group!),
        type: (data, obj) => data.push(3, obj.type!),
        pi: (data, obj) => data.push(4, obj.pi!),
        vnetHdr: (data, obj) => data.push(5, obj.vnetHdr!),
        persist: (data, obj) => data.push(6, obj.persist!),
        multiQueue: (data, obj) => data.push(7, obj.multiQueue!),
        numQueues: (data, obj) => data.push(8, obj.numQueues!),
        numDisabledQueues: (data, obj) => data.push(9, obj.numDisabledQueues!),
    })
}

/** rmnet section */
export interface RmnetFlags {
    ingressDeaggregation?: true
    
    ingressMapCommands?: true
    
    ingressMapCksumv4?: true
    
    egressMapCksumv4?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link RmnetFlags} bitmask */
export function parseRmnetFlags(r: number): RmnetFlags {
    const x: RmnetFlags = {}
    if (r & (1)) (x.ingressDeaggregation = true, r &= ~(1))
    if (r & (2)) (x.ingressMapCommands = true, r &= ~(2))
    if (r & (4)) (x.ingressMapCksumv4 = true, r &= ~(4))
    if (r & (8)) (x.egressMapCksumv4 = true, r &= ~(8))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link RmnetFlags} bitmask */
export function formatRmnetFlags(x: RmnetFlags): number {
    let r = x.__unknown || 0
    if (x.ingressDeaggregation) r |= 1
    if (x.ingressMapCommands) r |= 2
    if (x.ingressMapCksumv4) r |= 4
    if (x.egressMapCksumv4) r |= 8
    return r
}

export interface Rmnet extends BaseObject {
    muxId?: Buffer
    
    flags?: Buffer
}

/** Parses the attributes of a {@link Rmnet} object */
export function parseRmnet(r: Buffer): Rmnet {
    return structs.getObject(r, {
        1: (data, obj) => obj.muxId = data,
        2: (data, obj) => obj.flags = data,
    })
}

/** Encodes a {@link Rmnet} object into a stream of attributes */
export function formatRmnet(x: Rmnet): StreamData {
    return structs.putObject(x, {
        muxId: (data, obj) => data.push(1, obj.muxId!),
        flags: (data, obj) => data.push(2, obj.flags!),
    })
}

export interface RmnetFlagsMask {
    flags?: RmnetFlags
    
    mask?: RmnetFlags
}

/** Parses the attributes of a {@link RmnetFlagsMask} object */
export function parseRmnetFlagsMask(r: Buffer): RmnetFlagsMask {
    if (r.length !== __LENGTH_RmnetFlagsMask) throw Error('Unexpected length for RmnetFlagsMask')
    const x: RmnetFlagsMask = {}
    x.flags = parseRmnetFlags(structs.readU32.call(r, 0))
    x.mask = parseRmnetFlags(structs.readU32.call(r, 4))
    return x
}

/** Encodes a {@link RmnetFlagsMask} object into a stream of attributes */
export function formatRmnetFlagsMask(x: RmnetFlagsMask, r: Buffer = Buffer.alloc(__LENGTH_RmnetFlagsMask)): Buffer {
    if (r.length !== __LENGTH_RmnetFlagsMask) throw Error('Unexpected length for RmnetFlagsMask')
    x.flags && structs.writeU32.call(r, formatRmnetFlags(x.flags), 0)
    x.mask && structs.writeU32.call(r, formatRmnetFlags(x.mask), 4)
    return r
}

export const __LENGTH_RmnetFlagsMask = 8

export interface VethInfo extends BaseObject {
    peer?: Buffer
}

/** Parses the attributes of a {@link VethInfo} object */
export function parseVethInfo(r: Buffer): VethInfo {
    return structs.getObject(r, {
        1: (data, obj) => obj.peer = data,
    })
}

/** Encodes a {@link VethInfo} object into a stream of attributes */
export function formatVethInfo(x: VethInfo): StreamData {
    return structs.putObject(x, {
        peer: (data, obj) => data.push(1, obj.peer!),
    })
}

export interface VlanFlags {
    reorderHdr?: true
    
    gvrp?: true
    
    looseBinding?: true
    
    mvrp?: true
    
    bridgeBinding?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link VlanFlags} bitmask */
export function parseVlanFlags(r: number): VlanFlags {
    const x: VlanFlags = {}
    if (r & (1)) (x.reorderHdr = true, r &= ~(1))
    if (r & (2)) (x.gvrp = true, r &= ~(2))
    if (r & (4)) (x.looseBinding = true, r &= ~(4))
    if (r & (8)) (x.mvrp = true, r &= ~(8))
    if (r & (16)) (x.bridgeBinding = true, r &= ~(16))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link VlanFlags} bitmask */
export function formatVlanFlags(x: VlanFlags): number {
    let r = x.__unknown || 0
    if (x.reorderHdr) r |= 1
    if (x.gvrp) r |= 2
    if (x.looseBinding) r |= 4
    if (x.mvrp) r |= 8
    if (x.bridgeBinding) r |= 16
    return r
}

export enum VlanNameType {
    /** Name will look like:  vlan0005 */
    PLUS_VID,
    
    /** name will look like:  eth1.0005 */
    RAW_PLUS_VID = 1,
    
    /** Name will look like:  vlan5 */
    PLUS_VID_NO_PAD = 2,
    
    /** Name will look like:  eth0.5 */
    RAW_PLUS_VID_NO_PAD = 3,
}

export enum BridgeState {
    DISABLED,
    
    LISTENING = 1,
    
    LEARNING = 2,
    
    FORWARDING = 3,
    
    BLOCKING = 4,
}

/** Bridge Flags */
export interface BridgeFlags {
    /** Bridge command to/from master */
    master?: true
    
    /** Bridge command to/from lowerdev */
    self?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link BridgeFlags} bitmask */
export function parseBridgeFlags(r: number): BridgeFlags {
    const x: BridgeFlags = {}
    if (r & (1)) (x.master = true, r &= ~(1))
    if (r & (2)) (x.self = true, r &= ~(2))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link BridgeFlags} bitmask */
export function formatBridgeFlags(x: BridgeFlags): number {
    let r = x.__unknown || 0
    if (x.master) r |= 1
    if (x.self) r |= 2
    return r
}

export enum BridgeMode {
    /** Default loopback mode */
    VEB,
    
    /** 802.1Qbg defined VEPA mode */
    VEPA = 1,
    
    /** mode undefined */
    UNDEF = 65535,
}

export interface BridgeSpec extends BaseObject {
    flags?: number
    
    mode?: number
    
    vlanInfo?: Buffer
    
    vlanTunnelInfo?: Buffer
}

/** Parses the attributes of a {@link BridgeSpec} object */
export function parseBridgeSpec(r: Buffer): BridgeSpec {
    return structs.getObject(r, {
        0: (data, obj) => obj.flags = structs.getU16(data),
        1: (data, obj) => obj.mode = structs.getU16(data),
        2: (data, obj) => obj.vlanInfo = data,
        3: (data, obj) => obj.vlanTunnelInfo = data,
    })
}

/** Encodes a {@link BridgeSpec} object into a stream of attributes */
export function formatBridgeSpec(x: BridgeSpec): StreamData {
    return structs.putObject(x, {
        flags: (data, obj) => data.push(0, structs.putU16(obj.flags!)),
        mode: (data, obj) => data.push(1, structs.putU16(obj.mode!)),
        vlanInfo: (data, obj) => data.push(2, obj.vlanInfo!),
        vlanTunnelInfo: (data, obj) => data.push(3, obj.vlanTunnelInfo!),
    })
}

export interface BridgeVlanFlags {
    /** Operate on Bridge device as well */
    master?: true
    
    /** VLAN is PVID, ingress untagged */
    pvid?: true
    
    /** VLAN egresses untagged */
    untagged?: true
    
    /** VLAN is start of vlan range */
    rangeBegin?: true
    
    /** VLAN is end of vlan range */
    rangeEnd?: true
    
    /** Global bridge VLAN entry */
    brentry?: true
    
    /** Skip create/delete/flags */
    onlyOpts?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link BridgeVlanFlags} bitmask */
export function parseBridgeVlanFlags(r: number): BridgeVlanFlags {
    const x: BridgeVlanFlags = {}
    if (r & (1)) (x.master = true, r &= ~(1))
    if (r & (2)) (x.pvid = true, r &= ~(2))
    if (r & (4)) (x.untagged = true, r &= ~(4))
    if (r & (8)) (x.rangeBegin = true, r &= ~(8))
    if (r & (16)) (x.rangeEnd = true, r &= ~(16))
    if (r & (32)) (x.brentry = true, r &= ~(32))
    if (r & (64)) (x.onlyOpts = true, r &= ~(64))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link BridgeVlanFlags} bitmask */
export function formatBridgeVlanFlags(x: BridgeVlanFlags): number {
    let r = x.__unknown || 0
    if (x.master) r |= 1
    if (x.pvid) r |= 2
    if (x.untagged) r |= 4
    if (x.rangeBegin) r |= 8
    if (x.rangeEnd) r |= 16
    if (x.brentry) r |= 32
    if (x.onlyOpts) r |= 64
    return r
}

export interface BridgeVlanInfo {
    flags?: number
    
    vid?: number
}

/** Parses the attributes of a {@link BridgeVlanInfo} object */
export function parseBridgeVlanInfo(r: Buffer): BridgeVlanInfo {
    if (r.length !== __LENGTH_BridgeVlanInfo) throw Error('Unexpected length for BridgeVlanInfo')
    const x: BridgeVlanInfo = {}
    x.flags = structs.readU16.call(r, 0)
    x.vid = structs.readU16.call(r, 2)
    return x
}

/** Encodes a {@link BridgeVlanInfo} object into a stream of attributes */
export function formatBridgeVlanInfo(x: BridgeVlanInfo, r: Buffer = Buffer.alloc(__LENGTH_BridgeVlanInfo)): Buffer {
    if (r.length !== __LENGTH_BridgeVlanInfo) throw Error('Unexpected length for BridgeVlanInfo')
    x.flags && structs.writeU16.call(r, x.flags, 0)
    x.vid && structs.writeU16.call(r, x.vid, 2)
    return r
}

export const __LENGTH_BridgeVlanInfo = 4

export interface BridgeVlanTunnel extends BaseObject {
    id?: Buffer
    
    vid?: Buffer
    
    flags?: Buffer
}

/** Parses the attributes of a {@link BridgeVlanTunnel} object */
export function parseBridgeVlanTunnel(r: Buffer): BridgeVlanTunnel {
    return structs.getObject(r, {
        1: (data, obj) => obj.id = data,
        2: (data, obj) => obj.vid = data,
        3: (data, obj) => obj.flags = data,
    })
}

/** Encodes a {@link BridgeVlanTunnel} object into a stream of attributes */
export function formatBridgeVlanTunnel(x: BridgeVlanTunnel): StreamData {
    return structs.putObject(x, {
        id: (data, obj) => data.push(1, obj.id!),
        vid: (data, obj) => data.push(2, obj.vid!),
        flags: (data, obj) => data.push(3, obj.flags!),
    })
}

export interface BridgeVlanXstats {
    rxBytes?: bigint
    
    rxPackets?: bigint
    
    txBytes?: bigint
    
    txPackets?: bigint
    
    vid?: number
    
    flags?: number
    
    __pad2?: number
}

/** Parses the attributes of a {@link BridgeVlanXstats} object */
export function parseBridgeVlanXstats(r: Buffer): BridgeVlanXstats {
    if (r.length !== __LENGTH_BridgeVlanXstats) throw Error('Unexpected length for BridgeVlanXstats')
    const x: BridgeVlanXstats = {}
    x.rxBytes = structs.readU64.call(r, 0)
    x.rxPackets = structs.readU64.call(r, 8)
    x.txBytes = structs.readU64.call(r, 16)
    x.txPackets = structs.readU64.call(r, 24)
    x.vid = structs.readU16.call(r, 32)
    x.flags = structs.readU16.call(r, 34)
    x.__pad2 = structs.readU32.call(r, 36)
    return x
}

/** Encodes a {@link BridgeVlanXstats} object into a stream of attributes */
export function formatBridgeVlanXstats(x: BridgeVlanXstats, r: Buffer = Buffer.alloc(__LENGTH_BridgeVlanXstats)): Buffer {
    if (r.length !== __LENGTH_BridgeVlanXstats) throw Error('Unexpected length for BridgeVlanXstats')
    x.rxBytes && structs.writeU64.call(r, x.rxBytes, 0)
    x.rxPackets && structs.writeU64.call(r, x.rxPackets, 8)
    x.txBytes && structs.writeU64.call(r, x.txBytes, 16)
    x.txPackets && structs.writeU64.call(r, x.txPackets, 24)
    x.vid && structs.writeU16.call(r, x.vid, 32)
    x.flags && structs.writeU16.call(r, x.flags, 34)
    x.__pad2 && structs.writeU32.call(r, x.__pad2, 36)
    return r
}

export const __LENGTH_BridgeVlanXstats = 40

export interface BridgeStpXstats {
    transitionBlk?: bigint
    
    transitionFwd?: bigint
    
    rxBpdu?: bigint
    
    txBpdu?: bigint
    
    rxTcn?: bigint
    
    txTcn?: bigint
}

/** Parses the attributes of a {@link BridgeStpXstats} object */
export function parseBridgeStpXstats(r: Buffer): BridgeStpXstats {
    if (r.length !== __LENGTH_BridgeStpXstats) throw Error('Unexpected length for BridgeStpXstats')
    const x: BridgeStpXstats = {}
    x.transitionBlk = structs.readU64.call(r, 0)
    x.transitionFwd = structs.readU64.call(r, 8)
    x.rxBpdu = structs.readU64.call(r, 16)
    x.txBpdu = structs.readU64.call(r, 24)
    x.rxTcn = structs.readU64.call(r, 32)
    x.txTcn = structs.readU64.call(r, 40)
    return x
}

/** Encodes a {@link BridgeStpXstats} object into a stream of attributes */
export function formatBridgeStpXstats(x: BridgeStpXstats, r: Buffer = Buffer.alloc(__LENGTH_BridgeStpXstats)): Buffer {
    if (r.length !== __LENGTH_BridgeStpXstats) throw Error('Unexpected length for BridgeStpXstats')
    x.transitionBlk && structs.writeU64.call(r, x.transitionBlk, 0)
    x.transitionFwd && structs.writeU64.call(r, x.transitionFwd, 8)
    x.rxBpdu && structs.writeU64.call(r, x.rxBpdu, 16)
    x.txBpdu && structs.writeU64.call(r, x.txBpdu, 24)
    x.rxTcn && structs.writeU64.call(r, x.rxTcn, 32)
    x.txTcn && structs.writeU64.call(r, x.txTcn, 40)
    return r
}

export const __LENGTH_BridgeStpXstats = 48

/** Bridge vlan RTM header */
export interface BridgeVlanMsg {
    family?: number
    
    __reserved1?: number
    
    __reserved2?: number
    
    ifindex?: number
}

/** Parses the attributes of a {@link BridgeVlanMsg} object */
export function parseBridgeVlanMsg(r: Buffer): BridgeVlanMsg {
    if (r.length !== __LENGTH_BridgeVlanMsg) throw Error('Unexpected length for BridgeVlanMsg')
    const x: BridgeVlanMsg = {}
    x.family = structs.readU8.call(r, 0)
    x.__reserved1 = structs.readU8.call(r, 1)
    x.__reserved2 = structs.readU16.call(r, 2)
    x.ifindex = structs.readU32.call(r, 4)
    return x
}

/** Encodes a {@link BridgeVlanMsg} object into a stream of attributes */
export function formatBridgeVlanMsg(x: BridgeVlanMsg, r: Buffer = Buffer.alloc(__LENGTH_BridgeVlanMsg)): Buffer {
    if (r.length !== __LENGTH_BridgeVlanMsg) throw Error('Unexpected length for BridgeVlanMsg')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.__reserved1 && structs.writeU8.call(r, x.__reserved1, 1)
    x.__reserved2 && structs.writeU16.call(r, x.__reserved2, 2)
    x.ifindex && structs.writeU32.call(r, x.ifindex, 4)
    return r
}

export const __LENGTH_BridgeVlanMsg = 8

export interface BridgeVlanDb extends BaseObject {
    entry?: BridgeVlanDbEntry
}

/** Parses the attributes of a {@link BridgeVlanDb} object */
export function parseBridgeVlanDb(r: Buffer): BridgeVlanDb {
    return structs.getObject(r, {
        1: (data, obj) => obj.entry = parseBridgeVlanDbEntry(data),
    })
}

/** Encodes a {@link BridgeVlanDb} object into a stream of attributes */
export function formatBridgeVlanDb(x: BridgeVlanDb): StreamData {
    return structs.putObject(x, {
        entry: (data, obj) => data.push(1, formatBridgeVlanDbEntry(obj.entry!)),
    })
}

export interface BridgeVlanDbEntry extends BaseObject {
    info?: Buffer
    
    range?: Buffer
    
    state?: Buffer
}

/** Parses the attributes of a {@link BridgeVlanDbEntry} object */
export function parseBridgeVlanDbEntry(r: Buffer): BridgeVlanDbEntry {
    return structs.getObject(r, {
        1: (data, obj) => obj.info = data,
        2: (data, obj) => obj.range = data,
        3: (data, obj) => obj.state = data,
    })
}

/** Encodes a {@link BridgeVlanDbEntry} object into a stream of attributes */
export function formatBridgeVlanDbEntry(x: BridgeVlanDbEntry): StreamData {
    return structs.putObject(x, {
        info: (data, obj) => data.push(1, obj.info!),
        range: (data, obj) => data.push(2, obj.range!),
        state: (data, obj) => data.push(3, obj.state!),
    })
}

export interface Mdba extends BaseObject {
    mdb?: MdbaMdb
    
    router?: MdbaRouter
}

/** Parses the attributes of a {@link Mdba} object */
export function parseMdba(r: Buffer): Mdba {
    return structs.getObject(r, {
        1: (data, obj) => obj.mdb = parseMdbaMdb(data),
        2: (data, obj) => obj.router = parseMdbaRouter(data),
    })
}

/** Encodes a {@link Mdba} object into a stream of attributes */
export function formatMdba(x: Mdba): StreamData {
    return structs.putObject(x, {
        mdb: (data, obj) => data.push(1, formatMdbaMdb(obj.mdb!)),
        router: (data, obj) => data.push(2, formatMdbaRouter(obj.router!)),
    })
}

export interface MdbaMdb extends BaseObject {
    entry?: MdbaMdbEntry
}

/** Parses the attributes of a {@link MdbaMdb} object */
export function parseMdbaMdb(r: Buffer): MdbaMdb {
    return structs.getObject(r, {
        1: (data, obj) => obj.entry = parseMdbaMdbEntry(data),
    })
}

/** Encodes a {@link MdbaMdb} object into a stream of attributes */
export function formatMdbaMdb(x: MdbaMdb): StreamData {
    return structs.putObject(x, {
        entry: (data, obj) => data.push(1, formatMdbaMdbEntry(obj.entry!)),
    })
}

export interface MdbaMdbEntry extends BaseObject {
    info?: Buffer
}

/** Parses the attributes of a {@link MdbaMdbEntry} object */
export function parseMdbaMdbEntry(r: Buffer): MdbaMdbEntry {
    return structs.getObject(r, {
        1: (data, obj) => obj.info = data,
    })
}

/** Encodes a {@link MdbaMdbEntry} object into a stream of attributes */
export function formatMdbaMdbEntry(x: MdbaMdbEntry): StreamData {
    return structs.putObject(x, {
        info: (data, obj) => data.push(1, obj.info!),
    })
}

/** per mdb entry additional attributes */
export interface MdbaMdbEattr extends BaseObject {
    timer?: Buffer
}

/** Parses the attributes of a {@link MdbaMdbEattr} object */
export function parseMdbaMdbEattr(r: Buffer): MdbaMdbEattr {
    return structs.getObject(r, {
        1: (data, obj) => obj.timer = data,
    })
}

/** Encodes a {@link MdbaMdbEattr} object into a stream of attributes */
export function formatMdbaMdbEattr(x: MdbaMdbEattr): StreamData {
    return structs.putObject(x, {
        timer: (data, obj) => data.push(1, obj.timer!),
    })
}

/** multicast router types */
export enum MdbRtrType {
    DISABLED,
    
    TEMP_QUERY = 1,
    
    PERM = 2,
    
    TEMP = 3,
}

export interface MdbaRouter extends BaseObject {
    port?: Buffer
}

/** Parses the attributes of a {@link MdbaRouter} object */
export function parseMdbaRouter(r: Buffer): MdbaRouter {
    return structs.getObject(r, {
        1: (data, obj) => obj.port = data,
    })
}

/** Encodes a {@link MdbaRouter} object into a stream of attributes */
export function formatMdbaRouter(x: MdbaRouter): StreamData {
    return structs.putObject(x, {
        port: (data, obj) => data.push(1, obj.port!),
    })
}

/** router port attributes */
export interface MdbaRouterPattr extends BaseObject {
    timer?: Buffer
    
    type?: Buffer
}

/** Parses the attributes of a {@link MdbaRouterPattr} object */
export function parseMdbaRouterPattr(r: Buffer): MdbaRouterPattr {
    return structs.getObject(r, {
        1: (data, obj) => obj.timer = data,
        2: (data, obj) => obj.type = data,
    })
}

/** Encodes a {@link MdbaRouterPattr} object into a stream of attributes */
export function formatMdbaRouterPattr(x: MdbaRouterPattr): StreamData {
    return structs.putObject(x, {
        timer: (data, obj) => data.push(1, obj.timer!),
        type: (data, obj) => data.push(2, obj.type!),
    })
}

export interface BridgePortMsg {
    family?: number
    
    ifindex?: number
}

/** Parses the attributes of a {@link BridgePortMsg} object */
export function parseBridgePortMsg(r: Buffer): BridgePortMsg {
    if (r.length !== __LENGTH_BridgePortMsg) throw Error('Unexpected length for BridgePortMsg')
    const x: BridgePortMsg = {}
    x.family = structs.readU8.call(r, 0)
    x.ifindex = structs.readU32.call(r, 1)
    return x
}

/** Encodes a {@link BridgePortMsg} object into a stream of attributes */
export function formatBridgePortMsg(x: BridgePortMsg, r: Buffer = Buffer.alloc(__LENGTH_BridgePortMsg)): Buffer {
    if (r.length !== __LENGTH_BridgePortMsg) throw Error('Unexpected length for BridgePortMsg')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.ifindex && structs.writeU32.call(r, x.ifindex, 1)
    return r
}

export const __LENGTH_BridgePortMsg = 5

export interface _IpWithProto {
    /** IPv6 or IPv4 in network order */
    ip?: Buffer
    
    proto?: number
}

/** Parses the attributes of a {@link _IpWithProto} object */
export function parse_IpWithProto(r: Buffer): _IpWithProto {
    if (r.length !== __LENGTH__IpWithProto) throw Error('Unexpected length for _IpWithProto')
    const x: _IpWithProto = {}
    x.ip = r.subarray(0, 0 + 16)
    x.proto = structs.readU16be.call(r, 16)
    return x
}

/** Encodes a {@link _IpWithProto} object into a stream of attributes */
export function format_IpWithProto(x: _IpWithProto, r: Buffer = Buffer.alloc(__LENGTH__IpWithProto)): Buffer {
    if (r.length !== __LENGTH__IpWithProto) throw Error('Unexpected length for _IpWithProto')
    if (x.ip && x.ip.length !== 16)
        throw Error('ip: Unexpected buffer length')
        x.ip && x.ip.copy(r, 0)
    x.proto && structs.writeU16be.call(r, x.proto, 16)
    return r
}

export const __LENGTH__IpWithProto = 18

export interface BridgeMdbEntry {
    ifindex?: number
    
    state?: number
    
    flags?: number
    
    vid?: number
    
    addr?: _IpWithProto
}

/** Parses the attributes of a {@link BridgeMdbEntry} object */
export function parseBridgeMdbEntry(r: Buffer): BridgeMdbEntry {
    if (r.length !== __LENGTH_BridgeMdbEntry) throw Error('Unexpected length for BridgeMdbEntry')
    const x: BridgeMdbEntry = {}
    let pos = 0
    x.ifindex = structs.readU32.call(r, pos); pos += 4
    x.state = structs.readU8.call(r, pos); pos += 1
    x.flags = structs.readU8.call(r, pos); pos += 1
    x.vid = structs.readU16.call(r, pos); pos += 2
    x.addr = parse_IpWithProto(r.subarray(pos, pos + __LENGTH__IpWithProto)); pos += __LENGTH__IpWithProto
    return x
}

/** Encodes a {@link BridgeMdbEntry} object into a stream of attributes */
export function formatBridgeMdbEntry(x: BridgeMdbEntry, r: Buffer = Buffer.alloc(__LENGTH_BridgeMdbEntry)): Buffer {
    if (r.length !== __LENGTH_BridgeMdbEntry) throw Error('Unexpected length for BridgeMdbEntry')
    let pos = 0
    x.ifindex && structs.writeU32.call(r, x.ifindex, pos); pos += 4
    x.state && structs.writeU8.call(r, x.state, pos); pos += 1
    x.flags && structs.writeU8.call(r, x.flags, pos); pos += 1
    x.vid && structs.writeU16.call(r, x.vid, pos); pos += 2
    x.addr && format_IpWithProto(x.addr, r.subarray(pos, pos + __LENGTH__IpWithProto)); pos += __LENGTH__IpWithProto
    return r
}

export const __LENGTH_BridgeMdbEntry = 8 + __LENGTH__IpWithProto

export enum BridgeMdbState {
    TEMPORARY,
    
    PERMANENT = 1,
}

export interface MdbFlags {
    offload?: true
    
    fastLeave?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link MdbFlags} bitmask */
export function parseMdbFlags(r: number): MdbFlags {
    const x: MdbFlags = {}
    if (r & (1)) (x.offload = true, r &= ~(1))
    if (r & (2)) (x.fastLeave = true, r &= ~(2))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link MdbFlags} bitmask */
export function formatMdbFlags(x: MdbFlags): number {
    let r = x.__unknown || 0
    if (x.offload) r |= 1
    if (x.fastLeave) r |= 2
    return r
}

export interface MdbaSetEntry extends BaseObject {
    x?: MdbaSetEntry[]
}

/** Parses the attributes of a {@link MdbaSetEntry} object */
export function parseMdbaSetEntry(r: Buffer): MdbaSetEntry {
    return structs.getObject(r, {
        1: (data, obj) => (obj.x = obj.x || []).push(parseMdbaSetEntry(data)),
    })
}

/** Encodes a {@link MdbaSetEntry} object into a stream of attributes */
export function formatMdbaSetEntry(x: MdbaSetEntry): StreamData {
    return structs.putObject(x, {
        x: (data, obj) => obj.x!.forEach(x => data.push(1, formatMdbaSetEntry(x))),
    })
}

/** Embedded inside LINK_XSTATS_TYPE_BRIDGE */
export interface BridgeXstats extends BaseObject {
    vlan?: Buffer
    
    mcast?: Buffer
    
    __pad?: Buffer
    
    stp?: Buffer
}

/** Parses the attributes of a {@link BridgeXstats} object */
export function parseBridgeXstats(r: Buffer): BridgeXstats {
    return structs.getObject(r, {
        1: (data, obj) => obj.vlan = data,
        2: (data, obj) => obj.mcast = data,
        3: (data, obj) => obj.__pad = data,
        4: (data, obj) => obj.stp = data,
    })
}

/** Encodes a {@link BridgeXstats} object into a stream of attributes */
export function formatBridgeXstats(x: BridgeXstats): StreamData {
    return structs.putObject(x, {
        vlan: (data, obj) => data.push(1, obj.vlan!),
        mcast: (data, obj) => data.push(2, obj.mcast!),
        __pad: (data, obj) => data.push(3, obj.__pad!),
        stp: (data, obj) => data.push(4, obj.stp!),
    })
}

export enum BridgeMcastDir {
    RX,
    
    TX = 1,
}

/** IGMP/MLD statistics */
export interface BridgeMcastStats {
    /** BR_MCAST_DIR_SIZE */
    igmpV1queries?: bigint[]
    
    igmpV2queries?: bigint[]
    
    igmpV3queries?: bigint[]
    
    igmpLeaves?: bigint[]
    
    igmpV1reports?: bigint[]
    
    igmpV2reports?: bigint[]
    
    igmpV3reports?: bigint[]
    
    igmpParseErrors?: bigint
    
    mldV1queries?: bigint[]
    
    mldV2queries?: bigint[]
    
    mldLeaves?: bigint[]
    
    mldV1reports?: bigint[]
    
    mldV2reports?: bigint[]
    
    mldParseErrors?: bigint
    
    mcastBytes?: bigint[]
    
    mcastPackets?: bigint[]
}

/** Parses the attributes of a {@link BridgeMcastStats} object */
export function parseBridgeMcastStats(r: Buffer): BridgeMcastStats {
    if (r.length !== __LENGTH_BridgeMcastStats) throw Error('Unexpected length for BridgeMcastStats')
    const x: BridgeMcastStats = {}
    x.igmpV1queries = [...Array(2).keys()].map(i => structs.readU64.call(r, 0 + 8 * i))
    x.igmpV2queries = [...Array(2).keys()].map(i => structs.readU64.call(r, 16 + 8 * i))
    x.igmpV3queries = [...Array(2).keys()].map(i => structs.readU64.call(r, 32 + 8 * i))
    x.igmpLeaves = [...Array(2).keys()].map(i => structs.readU64.call(r, 48 + 8 * i))
    x.igmpV1reports = [...Array(2).keys()].map(i => structs.readU64.call(r, 64 + 8 * i))
    x.igmpV2reports = [...Array(2).keys()].map(i => structs.readU64.call(r, 80 + 8 * i))
    x.igmpV3reports = [...Array(2).keys()].map(i => structs.readU64.call(r, 96 + 8 * i))
    x.igmpParseErrors = structs.readU64.call(r, 112)
    x.mldV1queries = [...Array(2).keys()].map(i => structs.readU64.call(r, 120 + 8 * i))
    x.mldV2queries = [...Array(2).keys()].map(i => structs.readU64.call(r, 136 + 8 * i))
    x.mldLeaves = [...Array(2).keys()].map(i => structs.readU64.call(r, 152 + 8 * i))
    x.mldV1reports = [...Array(2).keys()].map(i => structs.readU64.call(r, 168 + 8 * i))
    x.mldV2reports = [...Array(2).keys()].map(i => structs.readU64.call(r, 184 + 8 * i))
    x.mldParseErrors = structs.readU64.call(r, 200)
    x.mcastBytes = [...Array(2).keys()].map(i => structs.readU64.call(r, 208 + 8 * i))
    x.mcastPackets = [...Array(2).keys()].map(i => structs.readU64.call(r, 224 + 8 * i))
    return x
}

/** Encodes a {@link BridgeMcastStats} object into a stream of attributes */
export function formatBridgeMcastStats(x: BridgeMcastStats, r: Buffer = Buffer.alloc(__LENGTH_BridgeMcastStats)): Buffer {
    if (r.length !== __LENGTH_BridgeMcastStats) throw Error('Unexpected length for BridgeMcastStats')
    if (x.igmpV1queries && x.igmpV1queries.length !== 2)
        throw Error('igmpV1queries: Unexpected array length')
        x.igmpV1queries && x.igmpV1queries.forEach((x, i) => structs.writeU64.call(r, x, 0 + 8 * i))
    if (x.igmpV2queries && x.igmpV2queries.length !== 2)
        throw Error('igmpV2queries: Unexpected array length')
        x.igmpV2queries && x.igmpV2queries.forEach((x, i) => structs.writeU64.call(r, x, 16 + 8 * i))
    if (x.igmpV3queries && x.igmpV3queries.length !== 2)
        throw Error('igmpV3queries: Unexpected array length')
        x.igmpV3queries && x.igmpV3queries.forEach((x, i) => structs.writeU64.call(r, x, 32 + 8 * i))
    if (x.igmpLeaves && x.igmpLeaves.length !== 2)
        throw Error('igmpLeaves: Unexpected array length')
        x.igmpLeaves && x.igmpLeaves.forEach((x, i) => structs.writeU64.call(r, x, 48 + 8 * i))
    if (x.igmpV1reports && x.igmpV1reports.length !== 2)
        throw Error('igmpV1reports: Unexpected array length')
        x.igmpV1reports && x.igmpV1reports.forEach((x, i) => structs.writeU64.call(r, x, 64 + 8 * i))
    if (x.igmpV2reports && x.igmpV2reports.length !== 2)
        throw Error('igmpV2reports: Unexpected array length')
        x.igmpV2reports && x.igmpV2reports.forEach((x, i) => structs.writeU64.call(r, x, 80 + 8 * i))
    if (x.igmpV3reports && x.igmpV3reports.length !== 2)
        throw Error('igmpV3reports: Unexpected array length')
        x.igmpV3reports && x.igmpV3reports.forEach((x, i) => structs.writeU64.call(r, x, 96 + 8 * i))
    x.igmpParseErrors && structs.writeU64.call(r, x.igmpParseErrors, 112)
    if (x.mldV1queries && x.mldV1queries.length !== 2)
        throw Error('mldV1queries: Unexpected array length')
        x.mldV1queries && x.mldV1queries.forEach((x, i) => structs.writeU64.call(r, x, 120 + 8 * i))
    if (x.mldV2queries && x.mldV2queries.length !== 2)
        throw Error('mldV2queries: Unexpected array length')
        x.mldV2queries && x.mldV2queries.forEach((x, i) => structs.writeU64.call(r, x, 136 + 8 * i))
    if (x.mldLeaves && x.mldLeaves.length !== 2)
        throw Error('mldLeaves: Unexpected array length')
        x.mldLeaves && x.mldLeaves.forEach((x, i) => structs.writeU64.call(r, x, 152 + 8 * i))
    if (x.mldV1reports && x.mldV1reports.length !== 2)
        throw Error('mldV1reports: Unexpected array length')
        x.mldV1reports && x.mldV1reports.forEach((x, i) => structs.writeU64.call(r, x, 168 + 8 * i))
    if (x.mldV2reports && x.mldV2reports.length !== 2)
        throw Error('mldV2reports: Unexpected array length')
        x.mldV2reports && x.mldV2reports.forEach((x, i) => structs.writeU64.call(r, x, 184 + 8 * i))
    x.mldParseErrors && structs.writeU64.call(r, x.mldParseErrors, 200)
    if (x.mcastBytes && x.mcastBytes.length !== 2)
        throw Error('mcastBytes: Unexpected array length')
        x.mcastBytes && x.mcastBytes.forEach((x, i) => structs.writeU64.call(r, x, 208 + 8 * i))
    if (x.mcastPackets && x.mcastPackets.length !== 2)
        throw Error('mcastPackets: Unexpected array length')
        x.mcastPackets && x.mcastPackets.forEach((x, i) => structs.writeU64.call(r, x, 224 + 8 * i))
    return r
}

export const __LENGTH_BridgeMcastStats = 240

export enum BridgeBooloptId {
    NO_LL_LEARN,
}

export interface BridgeBooloptMask {
    flags?: number
    
    mask?: number
}

/** Parses the attributes of a {@link BridgeBooloptMask} object */
export function parseBridgeBooloptMask(r: Buffer): BridgeBooloptMask {
    if (r.length !== __LENGTH_BridgeBooloptMask) throw Error('Unexpected length for BridgeBooloptMask')
    const x: BridgeBooloptMask = {}
    x.flags = structs.readU32.call(r, 0)
    x.mask = structs.readU32.call(r, 4)
    return x
}

/** Encodes a {@link BridgeBooloptMask} object into a stream of attributes */
export function formatBridgeBooloptMask(x: BridgeBooloptMask, r: Buffer = Buffer.alloc(__LENGTH_BridgeBooloptMask)): Buffer {
    if (r.length !== __LENGTH_BridgeBooloptMask) throw Error('Unexpected length for BridgeBooloptMask')
    x.flags && structs.writeU32.call(r, x.flags, 0)
    x.mask && structs.writeU32.call(r, x.mask, 4)
    return r
}

export const __LENGTH_BridgeBooloptMask = 8

export interface Iptun extends BaseObject {
    link?: number
    
    local?: number
    
    remote?: number
    
    ttl?: number
    
    tos?: number
    
    encapLimit?: number
    
    flowinfo?: number
    
    flags?: Buffer
    
    proto?: number
    
    pmtudisc?: number
    
    _6rdPrefix?: Buffer
    
    _6rdRelayPrefix?: number
    
    _6rdPrefixlen?: number
    
    _6rdRelayPrefixlen?: number
    
    encapType?: Buffer
    
    encapFlags?: Buffer
    
    encapSport?: Buffer
    
    encapDport?: Buffer
    
    collectMetadata?: Buffer
    
    fwmark?: Buffer
}

/** Parses the attributes of a {@link Iptun} object */
export function parseIptun(r: Buffer): Iptun {
    return structs.getObject(r, {
        1: (data, obj) => obj.link = structs.getU32(data),
        2: (data, obj) => obj.local = structs.getU32(data),
        3: (data, obj) => obj.remote = structs.getU32(data),
        4: (data, obj) => obj.ttl = structs.getU8(data),
        5: (data, obj) => obj.tos = structs.getU8(data),
        6: (data, obj) => obj.encapLimit = structs.getU8(data),
        7: (data, obj) => obj.flowinfo = structs.getU32(data),
        8: (data, obj) => obj.flags = data,
        9: (data, obj) => obj.proto = structs.getU8(data),
        10: (data, obj) => obj.pmtudisc = structs.getU8(data),
        11: (data, obj) => obj._6rdPrefix = data,
        12: (data, obj) => obj._6rdRelayPrefix = structs.getU32(data),
        13: (data, obj) => obj._6rdPrefixlen = structs.getU16(data),
        14: (data, obj) => obj._6rdRelayPrefixlen = structs.getU16(data),
        15: (data, obj) => obj.encapType = data,
        16: (data, obj) => obj.encapFlags = data,
        17: (data, obj) => obj.encapSport = data,
        18: (data, obj) => obj.encapDport = data,
        19: (data, obj) => obj.collectMetadata = data,
        20: (data, obj) => obj.fwmark = data,
    })
}

/** Encodes a {@link Iptun} object into a stream of attributes */
export function formatIptun(x: Iptun): StreamData {
    return structs.putObject(x, {
        link: (data, obj) => data.push(1, structs.putU32(obj.link!)),
        local: (data, obj) => data.push(2, structs.putU32(obj.local!)),
        remote: (data, obj) => data.push(3, structs.putU32(obj.remote!)),
        ttl: (data, obj) => data.push(4, structs.putU8(obj.ttl!)),
        tos: (data, obj) => data.push(5, structs.putU8(obj.tos!)),
        encapLimit: (data, obj) => data.push(6, structs.putU8(obj.encapLimit!)),
        flowinfo: (data, obj) => data.push(7, structs.putU32(obj.flowinfo!)),
        flags: (data, obj) => data.push(8, obj.flags!),
        proto: (data, obj) => data.push(9, structs.putU8(obj.proto!)),
        pmtudisc: (data, obj) => data.push(10, structs.putU8(obj.pmtudisc!)),
        _6rdPrefix: (data, obj) => data.push(11, obj._6rdPrefix!),
        _6rdRelayPrefix: (data, obj) => data.push(12, structs.putU32(obj._6rdRelayPrefix!)),
        _6rdPrefixlen: (data, obj) => data.push(13, structs.putU16(obj._6rdPrefixlen!)),
        _6rdRelayPrefixlen: (data, obj) => data.push(14, structs.putU16(obj._6rdRelayPrefixlen!)),
        encapType: (data, obj) => data.push(15, obj.encapType!),
        encapFlags: (data, obj) => data.push(16, obj.encapFlags!),
        encapSport: (data, obj) => data.push(17, obj.encapSport!),
        encapDport: (data, obj) => data.push(18, obj.encapDport!),
        collectMetadata: (data, obj) => data.push(19, obj.collectMetadata!),
        fwmark: (data, obj) => data.push(20, obj.fwmark!),
    })
}

export enum TunnelEncapTypes {
    NONE,
    
    FOU = 1,
    
    GUE = 2,
    
    MPLS = 3,
}

export interface TunnelEncapFlag {
    csum?: true
    
    csum6?: true
    
    remcsum?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link TunnelEncapFlag} bitmask */
export function parseTunnelEncapFlag(r: number): TunnelEncapFlag {
    const x: TunnelEncapFlag = {}
    if (r & (1)) (x.csum = true, r &= ~(1))
    if (r & (2)) (x.csum6 = true, r &= ~(2))
    if (r & (4)) (x.remcsum = true, r &= ~(4))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link TunnelEncapFlag} bitmask */
export function formatTunnelEncapFlag(x: TunnelEncapFlag): number {
    let r = x.__unknown || 0
    if (x.csum) r |= 1
    if (x.csum6) r |= 2
    if (x.remcsum) r |= 4
    return r
}

export interface IpTunnelPrl {
    addr?: number
    
    flags?: number
    
    __reserved?: number
    
    datalen?: number
    
    __reserved2?: number
}

/** Parses the attributes of a {@link IpTunnelPrl} object */
export function parseIpTunnelPrl(r: Buffer): IpTunnelPrl {
    if (r.length !== __LENGTH_IpTunnelPrl) throw Error('Unexpected length for IpTunnelPrl')
    const x: IpTunnelPrl = {}
    x.addr = structs.readU32be.call(r, 0)
    x.flags = structs.readU16.call(r, 4)
    x.__reserved = structs.readU16.call(r, 6)
    x.datalen = structs.readU32.call(r, 8)
    x.__reserved2 = structs.readU32.call(r, 12)
    return x
}

/** Encodes a {@link IpTunnelPrl} object into a stream of attributes */
export function formatIpTunnelPrl(x: IpTunnelPrl, r: Buffer = Buffer.alloc(__LENGTH_IpTunnelPrl)): Buffer {
    if (r.length !== __LENGTH_IpTunnelPrl) throw Error('Unexpected length for IpTunnelPrl')
    x.addr && structs.writeU32be.call(r, x.addr, 0)
    x.flags && structs.writeU16.call(r, x.flags, 4)
    x.__reserved && structs.writeU16.call(r, x.__reserved, 6)
    x.datalen && structs.writeU32.call(r, x.datalen, 8)
    x.__reserved2 && structs.writeU32.call(r, x.__reserved2, 12)
    return r
}

export const __LENGTH_IpTunnelPrl = 16

export interface IpTunnel6rd {
    /** IPv6 address, network order */
    prefix?: Buffer
    
    relayPrefix?: number
    
    prefixlen?: number
    
    relayPrefixlen?: number
}

/** Parses the attributes of a {@link IpTunnel6rd} object */
export function parseIpTunnel6rd(r: Buffer): IpTunnel6rd {
    if (r.length !== __LENGTH_IpTunnel6rd) throw Error('Unexpected length for IpTunnel6rd')
    const x: IpTunnel6rd = {}
    x.prefix = r.subarray(0, 0 + 16)
    x.relayPrefix = structs.readU32be.call(r, 16)
    x.prefixlen = structs.readU16.call(r, 20)
    x.relayPrefixlen = structs.readU16.call(r, 22)
    return x
}

/** Encodes a {@link IpTunnel6rd} object into a stream of attributes */
export function formatIpTunnel6rd(x: IpTunnel6rd, r: Buffer = Buffer.alloc(__LENGTH_IpTunnel6rd)): Buffer {
    if (r.length !== __LENGTH_IpTunnel6rd) throw Error('Unexpected length for IpTunnel6rd')
    if (x.prefix && x.prefix.length !== 16)
        throw Error('prefix: Unexpected buffer length')
        x.prefix && x.prefix.copy(r, 0)
    x.relayPrefix && structs.writeU32be.call(r, x.relayPrefix, 16)
    x.prefixlen && structs.writeU16.call(r, x.prefixlen, 20)
    x.relayPrefixlen && structs.writeU16.call(r, x.relayPrefixlen, 22)
    return r
}

export const __LENGTH_IpTunnel6rd = 24

export interface Gre extends BaseObject {
    link?: number
    
    iflags?: number
    
    oflags?: number
    
    ikey?: number
    
    okey?: number
    
    local?: number
    
    remote?: number
    
    ttl?: number
    
    tos?: number
    
    pmtudisc?: number
    
    encapLimit?: Buffer
    
    flowinfo?: Buffer
    
    flags?: Buffer
    
    encapType?: Buffer
    
    encapFlags?: Buffer
    
    encapSport?: Buffer
    
    encapDport?: Buffer
    
    collectMetadata?: Buffer
    
    ignoreDf?: Buffer
    
    fwmark?: Buffer
    
    erspanIndex?: Buffer
    
    erspanVer?: Buffer
    
    erspanDir?: Buffer
    
    erspanHwid?: Buffer
}

/** Parses the attributes of a {@link Gre} object */
export function parseGre(r: Buffer): Gre {
    return structs.getObject(r, {
        1: (data, obj) => obj.link = structs.getU32(data),
        2: (data, obj) => obj.iflags = structs.getU16(data),
        3: (data, obj) => obj.oflags = structs.getU16(data),
        4: (data, obj) => obj.ikey = structs.getU32(data),
        5: (data, obj) => obj.okey = structs.getU32(data),
        6: (data, obj) => obj.local = structs.getU32(data),
        7: (data, obj) => obj.remote = structs.getU32(data),
        8: (data, obj) => obj.ttl = structs.getU8(data),
        9: (data, obj) => obj.tos = structs.getU8(data),
        10: (data, obj) => obj.pmtudisc = structs.getU8(data),
        11: (data, obj) => obj.encapLimit = data,
        12: (data, obj) => obj.flowinfo = data,
        13: (data, obj) => obj.flags = data,
        14: (data, obj) => obj.encapType = data,
        15: (data, obj) => obj.encapFlags = data,
        16: (data, obj) => obj.encapSport = data,
        17: (data, obj) => obj.encapDport = data,
        18: (data, obj) => obj.collectMetadata = data,
        19: (data, obj) => obj.ignoreDf = data,
        20: (data, obj) => obj.fwmark = data,
        21: (data, obj) => obj.erspanIndex = data,
        22: (data, obj) => obj.erspanVer = data,
        23: (data, obj) => obj.erspanDir = data,
        24: (data, obj) => obj.erspanHwid = data,
    })
}

/** Encodes a {@link Gre} object into a stream of attributes */
export function formatGre(x: Gre): StreamData {
    return structs.putObject(x, {
        link: (data, obj) => data.push(1, structs.putU32(obj.link!)),
        iflags: (data, obj) => data.push(2, structs.putU16(obj.iflags!)),
        oflags: (data, obj) => data.push(3, structs.putU16(obj.oflags!)),
        ikey: (data, obj) => data.push(4, structs.putU32(obj.ikey!)),
        okey: (data, obj) => data.push(5, structs.putU32(obj.okey!)),
        local: (data, obj) => data.push(6, structs.putU32(obj.local!)),
        remote: (data, obj) => data.push(7, structs.putU32(obj.remote!)),
        ttl: (data, obj) => data.push(8, structs.putU8(obj.ttl!)),
        tos: (data, obj) => data.push(9, structs.putU8(obj.tos!)),
        pmtudisc: (data, obj) => data.push(10, structs.putU8(obj.pmtudisc!)),
        encapLimit: (data, obj) => data.push(11, obj.encapLimit!),
        flowinfo: (data, obj) => data.push(12, obj.flowinfo!),
        flags: (data, obj) => data.push(13, obj.flags!),
        encapType: (data, obj) => data.push(14, obj.encapType!),
        encapFlags: (data, obj) => data.push(15, obj.encapFlags!),
        encapSport: (data, obj) => data.push(16, obj.encapSport!),
        encapDport: (data, obj) => data.push(17, obj.encapDport!),
        collectMetadata: (data, obj) => data.push(18, obj.collectMetadata!),
        ignoreDf: (data, obj) => data.push(19, obj.ignoreDf!),
        fwmark: (data, obj) => data.push(20, obj.fwmark!),
        erspanIndex: (data, obj) => data.push(21, obj.erspanIndex!),
        erspanVer: (data, obj) => data.push(22, obj.erspanVer!),
        erspanDir: (data, obj) => data.push(23, obj.erspanDir!),
        erspanHwid: (data, obj) => data.push(24, obj.erspanHwid!),
    })
}

export interface Vti extends BaseObject {
    link?: number
    
    ikey?: number
    
    okey?: number
    
    local?: number
    
    remote?: number
    
    fwmark?: Buffer
}

/** Parses the attributes of a {@link Vti} object */
export function parseVti(r: Buffer): Vti {
    return structs.getObject(r, {
        1: (data, obj) => obj.link = structs.getU32(data),
        2: (data, obj) => obj.ikey = structs.getU32(data),
        3: (data, obj) => obj.okey = structs.getU32(data),
        4: (data, obj) => obj.local = structs.getU32(data),
        5: (data, obj) => obj.remote = structs.getU32(data),
        6: (data, obj) => obj.fwmark = data,
    })
}

/** Encodes a {@link Vti} object into a stream of attributes */
export function formatVti(x: Vti): StreamData {
    return structs.putObject(x, {
        link: (data, obj) => data.push(1, structs.putU32(obj.link!)),
        ikey: (data, obj) => data.push(2, structs.putU32(obj.ikey!)),
        okey: (data, obj) => data.push(3, structs.putU32(obj.okey!)),
        local: (data, obj) => data.push(4, structs.putU32(obj.local!)),
        remote: (data, obj) => data.push(5, structs.putU32(obj.remote!)),
        fwmark: (data, obj) => data.push(6, obj.fwmark!),
    })
}

/** WARNING: These flags should be interpreted in big endian */
export interface Tunnel {
    csum?: true
    
    routing?: true
    
    key?: true
    
    seq?: true
    
    strict?: true
    
    rec?: true
    
    version?: true
    
    noKey?: true
    
    dontFragment?: true
    
    oam?: true
    
    critOpt?: true
    
    geneveOpt?: true
    
    vxlanOpt?: true
    
    nocache?: true
    
    erspanOpt?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link Tunnel} bitmask */
export function parseTunnel(r: number): Tunnel {
    const x: Tunnel = {}
    if (r & (1)) (x.csum = true, r &= ~(1))
    if (r & (2)) (x.routing = true, r &= ~(2))
    if (r & (4)) (x.key = true, r &= ~(4))
    if (r & (8)) (x.seq = true, r &= ~(8))
    if (r & (16)) (x.strict = true, r &= ~(16))
    if (r & (32)) (x.rec = true, r &= ~(32))
    if (r & (64)) (x.version = true, r &= ~(64))
    if (r & (128)) (x.noKey = true, r &= ~(128))
    if (r & (256)) (x.dontFragment = true, r &= ~(256))
    if (r & (512)) (x.oam = true, r &= ~(512))
    if (r & (1024)) (x.critOpt = true, r &= ~(1024))
    if (r & (2048)) (x.geneveOpt = true, r &= ~(2048))
    if (r & (4096)) (x.vxlanOpt = true, r &= ~(4096))
    if (r & (8192)) (x.nocache = true, r &= ~(8192))
    if (r & (16384)) (x.erspanOpt = true, r &= ~(16384))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link Tunnel} bitmask */
export function formatTunnel(x: Tunnel): number {
    let r = x.__unknown || 0
    if (x.csum) r |= 1
    if (x.routing) r |= 2
    if (x.key) r |= 4
    if (x.seq) r |= 8
    if (x.strict) r |= 16
    if (x.rec) r |= 32
    if (x.version) r |= 64
    if (x.noKey) r |= 128
    if (x.dontFragment) r |= 256
    if (x.oam) r |= 512
    if (x.critOpt) r |= 1024
    if (x.geneveOpt) r |= 2048
    if (x.vxlanOpt) r |= 4096
    if (x.nocache) r |= 8192
    if (x.erspanOpt) r |= 16384
    return r
}

/**
 * CAN bit-timing parameters
 *
 * For further information, please read chapter "8 BIT TIMING
 * REQUIREMENTS" of the "Bosch CAN Specification version 2.0"
 * at http://www.semiconductors.bosch.de/pdf/can2spec.pdf.
 */
export interface CanBittiming {
    /** Bit-rate in bits/second */
    bitrate?: number
    
    /** Sample point in one-tenth of a percent */
    samplePoint?: number
    
    /** Time quanta (TQ) in nanoseconds */
    tq?: number
    
    /** Propagation segment in TQs */
    propSeg?: number
    
    /** Phase buffer segment 1 in TQs */
    phaseSeg1?: number
    
    /** Phase buffer segment 2 in TQs */
    phaseSeg2?: number
    
    /** Synchronisation jump width in TQs */
    sjw?: number
    
    /** Bit-rate prescaler */
    brp?: number
}

/** Parses the attributes of a {@link CanBittiming} object */
export function parseCanBittiming(r: Buffer): CanBittiming {
    if (r.length !== __LENGTH_CanBittiming) throw Error('Unexpected length for CanBittiming')
    const x: CanBittiming = {}
    x.bitrate = structs.readU32.call(r, 0)
    x.samplePoint = structs.readU32.call(r, 4)
    x.tq = structs.readU32.call(r, 8)
    x.propSeg = structs.readU32.call(r, 12)
    x.phaseSeg1 = structs.readU32.call(r, 16)
    x.phaseSeg2 = structs.readU32.call(r, 20)
    x.sjw = structs.readU32.call(r, 24)
    x.brp = structs.readU32.call(r, 28)
    return x
}

/** Encodes a {@link CanBittiming} object into a stream of attributes */
export function formatCanBittiming(x: CanBittiming, r: Buffer = Buffer.alloc(__LENGTH_CanBittiming)): Buffer {
    if (r.length !== __LENGTH_CanBittiming) throw Error('Unexpected length for CanBittiming')
    x.bitrate && structs.writeU32.call(r, x.bitrate, 0)
    x.samplePoint && structs.writeU32.call(r, x.samplePoint, 4)
    x.tq && structs.writeU32.call(r, x.tq, 8)
    x.propSeg && structs.writeU32.call(r, x.propSeg, 12)
    x.phaseSeg1 && structs.writeU32.call(r, x.phaseSeg1, 16)
    x.phaseSeg2 && structs.writeU32.call(r, x.phaseSeg2, 20)
    x.sjw && structs.writeU32.call(r, x.sjw, 24)
    x.brp && structs.writeU32.call(r, x.brp, 28)
    return r
}

export const __LENGTH_CanBittiming = 32

/**
 * CAN hardware-dependent bit-timing constant
 *
 * Used for calculating and checking bit-timing parameters
 */
export interface CanBittimingConst {
    /** Name of the CAN controller hardware */
    name?: number[]
    
    /** Time segment 1 = prop_seg + phase_seg1 */
    tseg1Min?: number
    
    tseg1Max?: number
    
    /** Time segment 2 = phase_seg2 */
    tseg2Min?: number
    
    tseg2Max?: number
    
    /** Synchronisation jump width */
    sjwMax?: number
    
    /** Bit-rate prescaler */
    brpMin?: number
    
    brpMax?: number
    
    brpInc?: number
}

/** Parses the attributes of a {@link CanBittimingConst} object */
export function parseCanBittimingConst(r: Buffer): CanBittimingConst {
    if (r.length !== __LENGTH_CanBittimingConst) throw Error('Unexpected length for CanBittimingConst')
    const x: CanBittimingConst = {}
    x.name = [...Array(16).keys()].map(i => structs.readU8.call(r, 0 + 1 * i))
    x.tseg1Min = structs.readU32.call(r, 16)
    x.tseg1Max = structs.readU32.call(r, 20)
    x.tseg2Min = structs.readU32.call(r, 24)
    x.tseg2Max = structs.readU32.call(r, 28)
    x.sjwMax = structs.readU32.call(r, 32)
    x.brpMin = structs.readU32.call(r, 36)
    x.brpMax = structs.readU32.call(r, 40)
    x.brpInc = structs.readU32.call(r, 44)
    return x
}

/** Encodes a {@link CanBittimingConst} object into a stream of attributes */
export function formatCanBittimingConst(x: CanBittimingConst, r: Buffer = Buffer.alloc(__LENGTH_CanBittimingConst)): Buffer {
    if (r.length !== __LENGTH_CanBittimingConst) throw Error('Unexpected length for CanBittimingConst')
    if (x.name && x.name.length !== 16)
        throw Error('name: Unexpected array length')
        x.name && x.name.forEach((x, i) => structs.writeU8.call(r, x, 0 + 1 * i))
    x.tseg1Min && structs.writeU32.call(r, x.tseg1Min, 16)
    x.tseg1Max && structs.writeU32.call(r, x.tseg1Max, 20)
    x.tseg2Min && structs.writeU32.call(r, x.tseg2Min, 24)
    x.tseg2Max && structs.writeU32.call(r, x.tseg2Max, 28)
    x.sjwMax && structs.writeU32.call(r, x.sjwMax, 32)
    x.brpMin && structs.writeU32.call(r, x.brpMin, 36)
    x.brpMax && structs.writeU32.call(r, x.brpMax, 40)
    x.brpInc && structs.writeU32.call(r, x.brpInc, 44)
    return r
}

export const __LENGTH_CanBittimingConst = 48

/** CAN clock parameters */
export interface CanClock {
    /** CAN system clock frequency in Hz */
    freq?: number
}

/** Parses the attributes of a {@link CanClock} object */
export function parseCanClock(r: Buffer): CanClock {
    if (r.length !== __LENGTH_CanClock) throw Error('Unexpected length for CanClock')
    const x: CanClock = {}
    x.freq = structs.readU32.call(r, 0)
    return x
}

/** Encodes a {@link CanClock} object into a stream of attributes */
export function formatCanClock(x: CanClock, r: Buffer = Buffer.alloc(__LENGTH_CanClock)): Buffer {
    if (r.length !== __LENGTH_CanClock) throw Error('Unexpected length for CanClock')
    x.freq && structs.writeU32.call(r, x.freq, 0)
    return r
}

export const __LENGTH_CanClock = 4

/** CAN operational and error states */
export enum CanState {
    /** RX/TX error count < 96 */
    ERROR_ACTIVE,
    
    /** RX/TX error count < 128 */
    ERROR_WARNING = 1,
    
    /** RX/TX error count < 256 */
    ERROR_PASSIVE = 2,
    
    /** RX/TX error count >= 256 */
    BUS_OFF = 3,
    
    /** Device is stopped */
    STOPPED = 4,
    
    /** Device is sleeping */
    SLEEPING = 5,
}

/** CAN bus error counters */
export interface CanBerrCounter {
    txerr?: number
    
    rxerr?: number
}

/** Parses the attributes of a {@link CanBerrCounter} object */
export function parseCanBerrCounter(r: Buffer): CanBerrCounter {
    if (r.length !== __LENGTH_CanBerrCounter) throw Error('Unexpected length for CanBerrCounter')
    const x: CanBerrCounter = {}
    x.txerr = structs.readU16.call(r, 0)
    x.rxerr = structs.readU16.call(r, 2)
    return x
}

/** Encodes a {@link CanBerrCounter} object into a stream of attributes */
export function formatCanBerrCounter(x: CanBerrCounter, r: Buffer = Buffer.alloc(__LENGTH_CanBerrCounter)): Buffer {
    if (r.length !== __LENGTH_CanBerrCounter) throw Error('Unexpected length for CanBerrCounter')
    x.txerr && structs.writeU16.call(r, x.txerr, 0)
    x.rxerr && structs.writeU16.call(r, x.rxerr, 2)
    return r
}

export const __LENGTH_CanBerrCounter = 4

/** CAN controller mode */
export interface CanCtrlModeMask {
    mask?: CanCtrlMode
    
    flags?: CanCtrlMode
}

/** Parses the attributes of a {@link CanCtrlModeMask} object */
export function parseCanCtrlModeMask(r: Buffer): CanCtrlModeMask {
    if (r.length !== __LENGTH_CanCtrlModeMask) throw Error('Unexpected length for CanCtrlModeMask')
    const x: CanCtrlModeMask = {}
    x.mask = parseCanCtrlMode(structs.readU32.call(r, 0))
    x.flags = parseCanCtrlMode(structs.readU32.call(r, 4))
    return x
}

/** Encodes a {@link CanCtrlModeMask} object into a stream of attributes */
export function formatCanCtrlModeMask(x: CanCtrlModeMask, r: Buffer = Buffer.alloc(__LENGTH_CanCtrlModeMask)): Buffer {
    if (r.length !== __LENGTH_CanCtrlModeMask) throw Error('Unexpected length for CanCtrlModeMask')
    x.mask && structs.writeU32.call(r, formatCanCtrlMode(x.mask), 0)
    x.flags && structs.writeU32.call(r, formatCanCtrlMode(x.flags), 4)
    return r
}

export const __LENGTH_CanCtrlModeMask = 8

export interface CanCtrlMode {
    /** Loopback mode */
    loopback?: true
    
    /** Listen-only mode */
    listenonly?: true
    
    /** Triple sampling mode */
    _3Samples?: true
    
    /** One-Shot mode */
    oneShot?: true
    
    /** Bus-error reporting */
    berrReporting?: true
    
    /** CAN FD mode */
    fd?: true
    
    /** Ignore missing CAN ACKs */
    presumeAck?: true
    
    /** CAN FD in non-ISO mode */
    fdNonIso?: true
    
    __unknown?: number
}

/** Parses the flags in a {@link CanCtrlMode} bitmask */
export function parseCanCtrlMode(r: number): CanCtrlMode {
    const x: CanCtrlMode = {}
    if (r & (1)) (x.loopback = true, r &= ~(1))
    if (r & (2)) (x.listenonly = true, r &= ~(2))
    if (r & (4)) (x._3Samples = true, r &= ~(4))
    if (r & (8)) (x.oneShot = true, r &= ~(8))
    if (r & (16)) (x.berrReporting = true, r &= ~(16))
    if (r & (32)) (x.fd = true, r &= ~(32))
    if (r & (64)) (x.presumeAck = true, r &= ~(64))
    if (r & (128)) (x.fdNonIso = true, r &= ~(128))
    if (r) x.__unknown = r
    return x
}

/** Encodes a {@link CanCtrlMode} bitmask */
export function formatCanCtrlMode(x: CanCtrlMode): number {
    let r = x.__unknown || 0
    if (x.loopback) r |= 1
    if (x.listenonly) r |= 2
    if (x._3Samples) r |= 4
    if (x.oneShot) r |= 8
    if (x.berrReporting) r |= 16
    if (x.fd) r |= 32
    if (x.presumeAck) r |= 64
    if (x.fdNonIso) r |= 128
    return r
}

/** CAN device statistics */
export interface CanDeviceStats {
    /** Bus errors */
    busError?: number
    
    /** Changes to error warning state */
    errorWarning?: number
    
    /** Changes to error passive state */
    errorPassive?: number
    
    /** Changes to bus off state */
    busOff?: number
    
    /** Arbitration lost errors */
    arbitrationLost?: number
    
    /** CAN controller re-starts */
    restarts?: number
}

/** Parses the attributes of a {@link CanDeviceStats} object */
export function parseCanDeviceStats(r: Buffer): CanDeviceStats {
    if (r.length !== __LENGTH_CanDeviceStats) throw Error('Unexpected length for CanDeviceStats')
    const x: CanDeviceStats = {}
    x.busError = structs.readU32.call(r, 0)
    x.errorWarning = structs.readU32.call(r, 4)
    x.errorPassive = structs.readU32.call(r, 8)
    x.busOff = structs.readU32.call(r, 12)
    x.arbitrationLost = structs.readU32.call(r, 16)
    x.restarts = structs.readU32.call(r, 20)
    return x
}

/** Encodes a {@link CanDeviceStats} object into a stream of attributes */
export function formatCanDeviceStats(x: CanDeviceStats, r: Buffer = Buffer.alloc(__LENGTH_CanDeviceStats)): Buffer {
    if (r.length !== __LENGTH_CanDeviceStats) throw Error('Unexpected length for CanDeviceStats')
    x.busError && structs.writeU32.call(r, x.busError, 0)
    x.errorWarning && structs.writeU32.call(r, x.errorWarning, 4)
    x.errorPassive && structs.writeU32.call(r, x.errorPassive, 8)
    x.busOff && structs.writeU32.call(r, x.busOff, 12)
    x.arbitrationLost && structs.writeU32.call(r, x.arbitrationLost, 16)
    x.restarts && structs.writeU32.call(r, x.restarts, 20)
    return r
}

export const __LENGTH_CanDeviceStats = 24

/** CAN netlink interface */
export interface Can extends BaseObject {
    bittiming?: Buffer
    
    bittimingConst?: Buffer
    
    clock?: Buffer
    
    state?: number
    
    ctrlmode?: Buffer
    
    restartMs?: number
    
    restart?: number
    
    berrCounter?: Buffer
    
    dataBittiming?: Buffer
    
    dataBittimingConst?: Buffer
    
    termination?: Buffer
    
    terminationConst?: Buffer
    
    bitrateConst?: Buffer
    
    dataBitrateConst?: Buffer
    
    bitrateMax?: Buffer
}

/** Parses the attributes of a {@link Can} object */
export function parseCan(r: Buffer): Can {
    return structs.getObject(r, {
        1: (data, obj) => obj.bittiming = data,
        2: (data, obj) => obj.bittimingConst = data,
        3: (data, obj) => obj.clock = data,
        4: (data, obj) => obj.state = structs.getU32(data),
        5: (data, obj) => obj.ctrlmode = data,
        6: (data, obj) => obj.restartMs = structs.getU32(data),
        7: (data, obj) => obj.restart = structs.getU32(data),
        8: (data, obj) => obj.berrCounter = data,
        9: (data, obj) => obj.dataBittiming = data,
        10: (data, obj) => obj.dataBittimingConst = data,
        11: (data, obj) => obj.termination = data,
        12: (data, obj) => obj.terminationConst = data,
        13: (data, obj) => obj.bitrateConst = data,
        14: (data, obj) => obj.dataBitrateConst = data,
        15: (data, obj) => obj.bitrateMax = data,
    })
}

/** Encodes a {@link Can} object into a stream of attributes */
export function formatCan(x: Can): StreamData {
    return structs.putObject(x, {
        bittiming: (data, obj) => data.push(1, obj.bittiming!),
        bittimingConst: (data, obj) => data.push(2, obj.bittimingConst!),
        clock: (data, obj) => data.push(3, obj.clock!),
        state: (data, obj) => data.push(4, structs.putU32(obj.state!)),
        ctrlmode: (data, obj) => data.push(5, obj.ctrlmode!),
        restartMs: (data, obj) => data.push(6, structs.putU32(obj.restartMs!)),
        restart: (data, obj) => data.push(7, structs.putU32(obj.restart!)),
        berrCounter: (data, obj) => data.push(8, obj.berrCounter!),
        dataBittiming: (data, obj) => data.push(9, obj.dataBittiming!),
        dataBittimingConst: (data, obj) => data.push(10, obj.dataBittimingConst!),
        termination: (data, obj) => data.push(11, obj.termination!),
        terminationConst: (data, obj) => data.push(12, obj.terminationConst!),
        bitrateConst: (data, obj) => data.push(13, obj.bitrateConst!),
        dataBitrateConst: (data, obj) => data.push(14, obj.dataBitrateConst!),
        bitrateMax: (data, obj) => data.push(15, obj.bitrateMax!),
    })
}
