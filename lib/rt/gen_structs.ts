import { BaseObject, StreamData } from '../structs'
import * as structs from '../structs'

export enum MessageType {
    NEWLINK = 16,
    
    DELLINK = 17,
    
    GETLINK = 18,
    
    SETLINK = 19,
    
    NEWADDR = 20,
    
    DELADDR = 21,
    
    GETADDR = 22,
    
    NEWROUTE = 24,
    
    DELROUTE = 25,
    
    GETROUTE = 26,
    
    NEWNEIGH = 28,
    
    DELNEIGH = 29,
    
    GETNEIGH = 30,
    
    NEWRULE = 32,
    
    DELRULE = 33,
    
    GETRULE = 34,
    
    NEWQDISC = 36,
    
    DELQDISC = 37,
    
    GETQDISC = 38,
    
    NEWTCLASS = 40,
    
    DELTCLASS = 41,
    
    GETTCLASS = 42,
    
    NEWTFILTER = 44,
    
    DELTFILTER = 45,
    
    GETTFILTER = 46,
    
    NEWACTION = 48,
    
    DELACTION = 49,
    
    GETACTION = 50,
    
    NEWPREFIX = 52,
    
    GETMULTICAST = 58,
    
    GETANYCAST = 62,
    
    NEWNEIGHTBL = 64,
    
    GETNEIGHTBL = 66,
    
    SETNEIGHTBL = 67,
    
    NEWNDUSEROPT = 68,
    
    NEWADDRLABEL = 72,
    
    DELADDRLABEL = 73,
    
    GETADDRLABEL = 74,
    
    GETDCB = 78,
    
    SETDCB = 79,
    
    NEWNETCONF = 80,
    
    DELNETCONF = 81,
    
    GETNETCONF = 82,
    
    NEWMDB = 84,
    
    DELMDB = 85,
    
    GETMDB = 86,
    
    NEWNSID = 88,
    
    DELNSID = 89,
    
    GETNSID = 90,
    
    NEWSTATS = 92,
    
    GETSTATS = 94,
    
    NEWCACHEREPORT = 96,
    
    NEWCHAIN = 100,
    
    DELCHAIN = 101,
    
    GETCHAIN = 102,
    
    NEWNEXTHOP = 104,
    
    DELNEXTHOP = 105,
    
    GETNEXTHOP = 106,
    
    NEWLINKPROP = 108,
    
    DELLINKPROP = 109,
    
    GETLINKPROP = 110,
    
    NEWVLAN = 112,
    
    DELVLAN = 113,
    
    GETVLAN = 114,
}

/** RTnetlink multicast groups */
export enum MulticastGroups {
    NONE,
    
    LINK = 1,
    
    NOTIFY = 2,
    
    NEIGH = 3,
    
    TC = 4,
    
    IPV4_IFADDR = 5,
    
    IPV4_MROUTE = 6,
    
    IPV4_ROUTE = 7,
    
    IPV4_RULE = 8,
    
    IPV6_IFADDR = 9,
    
    IPV6_MROUTE = 10,
    
    IPV6_ROUTE = 11,
    
    IPV6_IFINFO = 12,
    
    DECnet_IFADDR = 13,
    
    NOP2 = 14,
    
    DECnet_ROUTE = 15,
    
    DECnet_RULE = 16,
    
    NOP4 = 17,
    
    IPV6_PREFIX = 18,
    
    IPV6_RULE = 19,
    
    ND_USEROPT = 20,
    
    PHONET_IFADDR = 21,
    
    PHONET_ROUTE = 22,
    
    DCB = 23,
    
    IPV4_NETCONF = 24,
    
    IPV6_NETCONF = 25,
    
    MDB = 26,
    
    MPLS_ROUTE = 27,
    
    NSID = 28,
    
    MPLS_NETCONF = 29,
    
    IPV4_MROUTE_R = 30,
    
    IPV6_MROUTE_R = 31,
    
    NEXTHOP = 32,
    
    BRVLAN = 33,
}

/** Definitions used in routing table administration. */
export interface Route {
    family?: number
    
    dstLen?: number
    
    srcLen?: number
    
    tos?: number
    
    /** Routing table id */
    table?: number
    
    /** Routing protocol */
    protocol?: RouteProtocol | keyof typeof RouteProtocol
    
    scope?: RouteScope | keyof typeof RouteScope
    
    type?: RouteType | keyof typeof RouteType
    
    flags?: RouteFlags
}

/** Parses the attributes of a [[Route]] object */
export function parseRoute(r: Buffer): Route {
    if (r.length !== __LENGTH_Route) throw Error('Unexpected length for Route')
    const x: Route = {}
    x.family = structs.readU8.call(r, 0)
    x.dstLen = structs.readU8.call(r, 1)
    x.srcLen = structs.readU8.call(r, 2)
    x.tos = structs.readU8.call(r, 3)
    x.table = structs.readU8.call(r, 4)
    x.protocol = structs.getEnum(RouteProtocol, structs.readU8.call(r, 5))
    x.scope = structs.getEnum(RouteScope, structs.readU8.call(r, 6))
    x.type = structs.getEnum(RouteType, structs.readU8.call(r, 7))
    x.flags = parseRouteFlags(structs.readU32.call(r, 8))
    return x
}

/** Encodes a [[Route]] object into a stream of attributes */
export function formatRoute(x: Route, r: Buffer = Buffer.alloc(__LENGTH_Route)): Buffer {
    if (r.length !== __LENGTH_Route) throw Error('Unexpected length for Route')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.dstLen && structs.writeU8.call(r, x.dstLen, 1)
    x.srcLen && structs.writeU8.call(r, x.srcLen, 2)
    x.tos && structs.writeU8.call(r, x.tos, 3)
    x.table && structs.writeU8.call(r, x.table, 4)
    x.protocol && structs.writeU8.call(r, structs.putEnum(RouteProtocol, x.protocol), 5)
    x.scope && structs.writeU8.call(r, structs.putEnum(RouteScope, x.scope), 6)
    x.type && structs.writeU8.call(r, structs.putEnum(RouteType, x.type), 7)
    x.flags && structs.writeU32.call(r, formatRouteFlags(x.flags), 8)
    return r
}

export const __LENGTH_Route = 12

export enum RouteType {
    UNSPEC,
    
    /** Gateway or direct route */
    UNICAST = 1,
    
    /** Accept locally */
    LOCAL = 2,
    
    BROADCAST = 3,
    
    ANYCAST = 4,
    
    /** Multicast route */
    MULTICAST = 5,
    
    /** Drop */
    BLACKHOLE = 6,
    
    /** Destination is unreachable */
    UNREACHABLE = 7,
    
    /** Administratively prohibited */
    PROHIBIT = 8,
    
    /** Not in this table */
    THROW = 9,
    
    /** Translate this address */
    NAT = 10,
    
    /** Use external resolver */
    XRESOLVE = 11,
}

/**
 * Values of protocol >= RTPROT_STATIC are not interpreted by kernel;
 * they are just passed from user and back as is.
 * It will be used by hypothetical multiple routing daemons.
 * Note that protocol values should be standardized in order to
 * avoid conflicts.
 */
export enum RouteProtocol {
    /**
     * Route installed by ICMP redirects;
     *  * not used by current IPv4
     */
    REDIRECT = 1,
    
    /** Route installed by kernel */
    KERNEL = 2,
    
    /** Route installed during boot */
    BOOT = 3,
    
    /** Route installed by administrator */
    STATIC = 4,
    
    /** Apparently, GateD */
    GATED = 8,
    
    /** RDISC/ND router advertisements */
    RA = 9,
    
    /** Merit MRT */
    MRT = 10,
    
    /** Zebra */
    ZEBRA = 11,
    
    /** BIRD */
    BIRD = 12,
    
    /** DECnet routing daemon */
    DNROUTED = 13,
    
    /** XORP */
    XORP = 14,
    
    /** Netsukuku */
    NTK = 15,
    
    /** DHCP client */
    DHCP = 16,
    
    /** Multicast daemon */
    MROUTED = 17,
    
    /** Babel daemon */
    BABEL = 42,
    
    /** BGP Routes */
    BGP = 186,
    
    /** ISIS Routes */
    ISIS = 187,
    
    /** OSPF Routes */
    OSPF = 188,
    
    /** RIP Routes */
    RIP = 189,
    
    /** EIGRP Routes */
    EIGRP = 192,
}

/**
 * Really it is not scope, but sort of distance to the destination.
 * NOWHERE are reserved for not existing destinations, HOST is our
 * local addresses, LINK are destinations, located on directly attached
 * link and UNIVERSE is everywhere in the Universe.
 * Intermediate values are also possible f.e. interior routes
 * could be assigned a value between UNIVERSE and LINK.
 */
export enum RouteScope {
    UNIVERSE,
    
    /** User defined values */
    SITE = 200,
    
    LINK = 253,
    
    HOST = 254,
    
    NOWHERE = 255,
}

export interface RouteFlags {
    /** Notify user of route change */
    notify?: true
    
    /** This route is cloned */
    cloned?: true
    
    /** Multipath equalizer: NI */
    equalize?: true
    
    /** Prefix addresses */
    prefix?: true
    
    /** set rtm_table to FIB lookup result */
    lookupTable?: true
    
    /** return full fib lookup match */
    fibMatch?: true
    
    /** route is offloaded */
    offload?: true
    
    /** route is trapping packets */
    trap?: true
    
    __unknown?: number
}

/** Parses the flags in a [[RouteFlags]] bitmask */
export function parseRouteFlags(r: number): RouteFlags {
    const x: RouteFlags = {}
    if (r & (256)) (x.notify = true, r &= ~(256))
    if (r & (512)) (x.cloned = true, r &= ~(512))
    if (r & (1024)) (x.equalize = true, r &= ~(1024))
    if (r & (2048)) (x.prefix = true, r &= ~(2048))
    if (r & (4096)) (x.lookupTable = true, r &= ~(4096))
    if (r & (8192)) (x.fibMatch = true, r &= ~(8192))
    if (r & (16384)) (x.offload = true, r &= ~(16384))
    if (r & (32768)) (x.trap = true, r &= ~(32768))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[RouteFlags]] bitmask */
export function formatRouteFlags(x: RouteFlags): number {
    let r = x.__unknown || 0
    if (x.notify) r |= 256
    if (x.cloned) r |= 512
    if (x.equalize) r |= 1024
    if (x.prefix) r |= 2048
    if (x.lookupTable) r |= 4096
    if (x.fibMatch) r |= 8192
    if (x.offload) r |= 16384
    if (x.trap) r |= 32768
    return r
}

/** Reserved table identifiers */
export enum RoutingTableClass {
    /** User defined values */
    COMPAT = 252,
    
    DEFAULT = 253,
    
    MAIN = 254,
    
    LOCAL = 255,
}

/** Routing message attributes */
export interface RouteAttrs extends BaseObject {
    dst?: Buffer
    
    src?: Buffer
    
    iif?: number
    
    oif?: number
    
    gateway?: Buffer
    
    priority?: number
    
    prefsrc?: Buffer
    
    /** array of struct rtattr with types of RTAX_* */
    metrics?: RouteMetrics
    
    /** array of struct rtnexthop */
    multipath?: Buffer
    
    /** no longer used */
    protoinfo?: Buffer
    
    flow?: number
    
    cacheInfo?: RouteCacheInfo
    
    session?: RouteSession
    
    mpAlgo?: Buffer
    
    table?: number
    
    mark?: Buffer
    
    mfcStats?: RouteMfcStats
    
    via?: RouteVia
    
    newdst?: Buffer
    
    pref?: Buffer
    
    encapType?: number
    
    encap?: Buffer
    
    expires?: Buffer
    
    pad?: Buffer
    
    uid?: Buffer
    
    ttlPropagate?: number
    
    ipProto?: Buffer
    
    sport?: Buffer
    
    dport?: Buffer
    
    nhId?: Buffer
}

/** Parses the attributes of a [[RouteAttrs]] object */
export function parseRouteAttrs(r: Buffer): RouteAttrs {
    return structs.getObject(r, {
        1: (data, obj) => obj.dst = data,
        2: (data, obj) => obj.src = data,
        3: (data, obj) => obj.iif = structs.getU32(data),
        4: (data, obj) => obj.oif = structs.getU32(data),
        5: (data, obj) => obj.gateway = data,
        6: (data, obj) => obj.priority = structs.getU32(data),
        7: (data, obj) => obj.prefsrc = data,
        8: (data, obj) => obj.metrics = parseRouteMetrics(data),
        9: (data, obj) => obj.multipath = data,
        10: (data, obj) => obj.protoinfo = data,
        11: (data, obj) => obj.flow = structs.getU32(data),
        12: (data, obj) => obj.cacheInfo = parseRouteCacheInfo(data),
        13: (data, obj) => obj.session = parseRouteSession(data),
        14: (data, obj) => obj.mpAlgo = data,
        15: (data, obj) => obj.table = structs.getU32(data),
        16: (data, obj) => obj.mark = data,
        17: (data, obj) => obj.mfcStats = parseRouteMfcStats(data),
        18: (data, obj) => obj.via = parseRouteVia(data),
        19: (data, obj) => obj.newdst = data,
        20: (data, obj) => obj.pref = data,
        21: (data, obj) => obj.encapType = structs.getU16(data),
        22: (data, obj) => obj.encap = data,
        23: (data, obj) => obj.expires = data,
        24: (data, obj) => obj.pad = data,
        25: (data, obj) => obj.uid = data,
        26: (data, obj) => obj.ttlPropagate = structs.getU8(data),
        27: (data, obj) => obj.ipProto = data,
        28: (data, obj) => obj.sport = data,
        29: (data, obj) => obj.dport = data,
        30: (data, obj) => obj.nhId = data,
    })
}

/** Encodes a [[RouteAttrs]] object into a stream of attributes */
export function formatRouteAttrs(x: RouteAttrs): StreamData {
    return structs.putObject(x, {
        dst: (data, obj) => data.push(1, obj.dst!),
        src: (data, obj) => data.push(2, obj.src!),
        iif: (data, obj) => data.push(3, structs.putU32(obj.iif!)),
        oif: (data, obj) => data.push(4, structs.putU32(obj.oif!)),
        gateway: (data, obj) => data.push(5, obj.gateway!),
        priority: (data, obj) => data.push(6, structs.putU32(obj.priority!)),
        prefsrc: (data, obj) => data.push(7, obj.prefsrc!),
        metrics: (data, obj) => data.push(8, formatRouteMetrics(obj.metrics!)),
        multipath: (data, obj) => data.push(9, obj.multipath!),
        protoinfo: (data, obj) => data.push(10, obj.protoinfo!),
        flow: (data, obj) => data.push(11, structs.putU32(obj.flow!)),
        cacheInfo: (data, obj) => data.push(12, formatRouteCacheInfo(obj.cacheInfo!)),
        session: (data, obj) => data.push(13, formatRouteSession(obj.session!)),
        mpAlgo: (data, obj) => data.push(14, obj.mpAlgo!),
        table: (data, obj) => data.push(15, structs.putU32(obj.table!)),
        mark: (data, obj) => data.push(16, obj.mark!),
        mfcStats: (data, obj) => data.push(17, formatRouteMfcStats(obj.mfcStats!)),
        via: (data, obj) => data.push(18, formatRouteVia(obj.via!)),
        newdst: (data, obj) => data.push(19, obj.newdst!),
        pref: (data, obj) => data.push(20, obj.pref!),
        encapType: (data, obj) => data.push(21, structs.putU16(obj.encapType!)),
        encap: (data, obj) => data.push(22, obj.encap!),
        expires: (data, obj) => data.push(23, obj.expires!),
        pad: (data, obj) => data.push(24, obj.pad!),
        uid: (data, obj) => data.push(25, obj.uid!),
        ttlPropagate: (data, obj) => data.push(26, structs.putU8(obj.ttlPropagate!)),
        ipProto: (data, obj) => data.push(27, obj.ipProto!),
        sport: (data, obj) => data.push(28, obj.sport!),
        dport: (data, obj) => data.push(29, obj.dport!),
        nhId: (data, obj) => data.push(30, obj.nhId!),
    })
}

/**
 * "struct rtnexthop" describes all necessary nexthop information,
 * i.e. parameters of path to a destination via this nexthop.
 *
 * At the moment it is impossible to set different prefsrc, mtu, window
 * and rtt for different paths from multipath.
 */
export interface RouteNextHop {
    len?: number
    
    flags?: RouteNextHopFlags
    
    hops?: number
    
    ifindex?: number
}

/** Parses the attributes of a [[RouteNextHop]] object */
export function parseRouteNextHop(r: Buffer): RouteNextHop {
    if (r.length !== __LENGTH_RouteNextHop) throw Error('Unexpected length for RouteNextHop')
    const x: RouteNextHop = {}
    x.len = structs.readU16.call(r, 0)
    x.flags = parseRouteNextHopFlags(structs.readU8.call(r, 2))
    x.hops = structs.readU8.call(r, 3)
    x.ifindex = structs.readS32.call(r, 4)
    return x
}

/** Encodes a [[RouteNextHop]] object into a stream of attributes */
export function formatRouteNextHop(x: RouteNextHop, r: Buffer = Buffer.alloc(__LENGTH_RouteNextHop)): Buffer {
    if (r.length !== __LENGTH_RouteNextHop) throw Error('Unexpected length for RouteNextHop')
    x.len && structs.writeU16.call(r, x.len, 0)
    x.flags && structs.writeU8.call(r, formatRouteNextHopFlags(x.flags), 2)
    x.hops && structs.writeU8.call(r, x.hops, 3)
    x.ifindex && structs.writeS32.call(r, x.ifindex, 4)
    return r
}

export const __LENGTH_RouteNextHop = 8

export interface RouteNextHopFlags {
    /** Nexthop is dead (used by multipath) */
    dead?: true
    
    /** Do recursive gateway lookup */
    pervasive?: true
    
    /** Gateway is forced on link */
    onlink?: true
    
    /** offloaded route */
    offload?: true
    
    /** carrier-down on nexthop */
    linkdown?: true
    
    /** The entry is unresolved (ipmr) */
    unresolved?: true
    
    __unknown?: number
}

/** Parses the flags in a [[RouteNextHopFlags]] bitmask */
export function parseRouteNextHopFlags(r: number): RouteNextHopFlags {
    const x: RouteNextHopFlags = {}
    if (r & (1)) (x.dead = true, r &= ~(1))
    if (r & (2)) (x.pervasive = true, r &= ~(2))
    if (r & (4)) (x.onlink = true, r &= ~(4))
    if (r & (8)) (x.offload = true, r &= ~(8))
    if (r & (16)) (x.linkdown = true, r &= ~(16))
    if (r & (32)) (x.unresolved = true, r &= ~(32))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[RouteNextHopFlags]] bitmask */
export function formatRouteNextHopFlags(x: RouteNextHopFlags): number {
    let r = x.__unknown || 0
    if (x.dead) r |= 1
    if (x.pervasive) r |= 2
    if (x.onlink) r |= 4
    if (x.offload) r |= 8
    if (x.linkdown) r |= 16
    if (x.unresolved) r |= 32
    return r
}

export interface RouteVia {
    family?: number
    
    addr?: number
}

/** Parses the attributes of a [[RouteVia]] object */
export function parseRouteVia(r: Buffer): RouteVia {
    if (r.length !== __LENGTH_RouteVia) throw Error('Unexpected length for RouteVia')
    const x: RouteVia = {}
    x.family = structs.readU16.call(r, 0)
    x.addr = structs.readU8.call(r, 2)
    return x
}

/** Encodes a [[RouteVia]] object into a stream of attributes */
export function formatRouteVia(x: RouteVia, r: Buffer = Buffer.alloc(__LENGTH_RouteVia)): Buffer {
    if (r.length !== __LENGTH_RouteVia) throw Error('Unexpected length for RouteVia')
    x.family && structs.writeU16.call(r, x.family, 0)
    x.addr && structs.writeU8.call(r, x.addr, 2)
    return r
}

export const __LENGTH_RouteVia = 3

export interface RouteCacheInfo {
    clntref?: number
    
    lastuse?: number
    
    expires?: number
    
    error?: number
    
    used?: number
    
    id?: number
    
    ts?: number
    
    tsage?: number
}

/** Parses the attributes of a [[RouteCacheInfo]] object */
export function parseRouteCacheInfo(r: Buffer): RouteCacheInfo {
    if (r.length !== __LENGTH_RouteCacheInfo) throw Error('Unexpected length for RouteCacheInfo')
    const x: RouteCacheInfo = {}
    x.clntref = structs.readU32.call(r, 0)
    x.lastuse = structs.readU32.call(r, 4)
    x.expires = structs.readS32.call(r, 8)
    x.error = structs.readU32.call(r, 12)
    x.used = structs.readU32.call(r, 16)
    x.id = structs.readU32.call(r, 20)
    x.ts = structs.readU32.call(r, 24)
    x.tsage = structs.readU32.call(r, 28)
    return x
}

/** Encodes a [[RouteCacheInfo]] object into a stream of attributes */
export function formatRouteCacheInfo(x: RouteCacheInfo, r: Buffer = Buffer.alloc(__LENGTH_RouteCacheInfo)): Buffer {
    if (r.length !== __LENGTH_RouteCacheInfo) throw Error('Unexpected length for RouteCacheInfo')
    x.clntref && structs.writeU32.call(r, x.clntref, 0)
    x.lastuse && structs.writeU32.call(r, x.lastuse, 4)
    x.expires && structs.writeS32.call(r, x.expires, 8)
    x.error && structs.writeU32.call(r, x.error, 12)
    x.used && structs.writeU32.call(r, x.used, 16)
    x.id && structs.writeU32.call(r, x.id, 20)
    x.ts && structs.writeU32.call(r, x.ts, 24)
    x.tsage && structs.writeU32.call(r, x.tsage, 28)
    return r
}

export const __LENGTH_RouteCacheInfo = 32

export interface RouteMetrics extends BaseObject {
    lock?: Buffer
    
    mtu?: Buffer
    
    window?: Buffer
    
    rtt?: Buffer
    
    rttvar?: Buffer
    
    ssthresh?: Buffer
    
    cwnd?: Buffer
    
    advmss?: Buffer
    
    reordering?: Buffer
    
    hoplimit?: Buffer
    
    initcwnd?: Buffer
    
    features?: Buffer
    
    rtoMin?: Buffer
    
    initrwnd?: Buffer
    
    quickack?: Buffer
    
    ccAlgo?: Buffer
    
    fastopenNoCookie?: Buffer
}

/** Parses the attributes of a [[RouteMetrics]] object */
export function parseRouteMetrics(r: Buffer): RouteMetrics {
    return structs.getObject(r, {
        1: (data, obj) => obj.lock = data,
        2: (data, obj) => obj.mtu = data,
        3: (data, obj) => obj.window = data,
        4: (data, obj) => obj.rtt = data,
        5: (data, obj) => obj.rttvar = data,
        6: (data, obj) => obj.ssthresh = data,
        7: (data, obj) => obj.cwnd = data,
        8: (data, obj) => obj.advmss = data,
        9: (data, obj) => obj.reordering = data,
        10: (data, obj) => obj.hoplimit = data,
        11: (data, obj) => obj.initcwnd = data,
        12: (data, obj) => obj.features = data,
        13: (data, obj) => obj.rtoMin = data,
        14: (data, obj) => obj.initrwnd = data,
        15: (data, obj) => obj.quickack = data,
        16: (data, obj) => obj.ccAlgo = data,
        17: (data, obj) => obj.fastopenNoCookie = data,
    })
}

/** Encodes a [[RouteMetrics]] object into a stream of attributes */
export function formatRouteMetrics(x: RouteMetrics): StreamData {
    return structs.putObject(x, {
        lock: (data, obj) => data.push(1, obj.lock!),
        mtu: (data, obj) => data.push(2, obj.mtu!),
        window: (data, obj) => data.push(3, obj.window!),
        rtt: (data, obj) => data.push(4, obj.rtt!),
        rttvar: (data, obj) => data.push(5, obj.rttvar!),
        ssthresh: (data, obj) => data.push(6, obj.ssthresh!),
        cwnd: (data, obj) => data.push(7, obj.cwnd!),
        advmss: (data, obj) => data.push(8, obj.advmss!),
        reordering: (data, obj) => data.push(9, obj.reordering!),
        hoplimit: (data, obj) => data.push(10, obj.hoplimit!),
        initcwnd: (data, obj) => data.push(11, obj.initcwnd!),
        features: (data, obj) => data.push(12, obj.features!),
        rtoMin: (data, obj) => data.push(13, obj.rtoMin!),
        initrwnd: (data, obj) => data.push(14, obj.initrwnd!),
        quickack: (data, obj) => data.push(15, obj.quickack!),
        ccAlgo: (data, obj) => data.push(16, obj.ccAlgo!),
        fastopenNoCookie: (data, obj) => data.push(17, obj.fastopenNoCookie!),
    })
}

export interface RouteMetricsFeatures {
    ecn?: true
    
    sack?: true
    
    timestamp?: true
    
    allfrag?: true
    
    __unknown?: number
}

/** Parses the flags in a [[RouteMetricsFeatures]] bitmask */
export function parseRouteMetricsFeatures(r: number): RouteMetricsFeatures {
    const x: RouteMetricsFeatures = {}
    if (r & (1)) (x.ecn = true, r &= ~(1))
    if (r & (2)) (x.sack = true, r &= ~(2))
    if (r & (4)) (x.timestamp = true, r &= ~(4))
    if (r & (8)) (x.allfrag = true, r &= ~(8))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[RouteMetricsFeatures]] bitmask */
export function formatRouteMetricsFeatures(x: RouteMetricsFeatures): number {
    let r = x.__unknown || 0
    if (x.ecn) r |= 1
    if (x.sack) r |= 2
    if (x.timestamp) r |= 4
    if (x.allfrag) r |= 8
    return r
}

export interface RouteSession {
    proto?: number
    
    __pad1?: number
    
    __pad2?: number
    
    u?: number[]
}

/** Parses the attributes of a [[RouteSession]] object */
export function parseRouteSession(r: Buffer): RouteSession {
    if (r.length !== __LENGTH_RouteSession) throw Error('Unexpected length for RouteSession')
    const x: RouteSession = {}
    x.proto = structs.readU8.call(r, 0)
    x.__pad1 = structs.readU8.call(r, 1)
    x.__pad2 = structs.readU16.call(r, 2)
    x.u = [...Array(4).keys()].map(i => structs.readU8.call(r, 4 + 1 * i))
    return x
}

/** Encodes a [[RouteSession]] object into a stream of attributes */
export function formatRouteSession(x: RouteSession, r: Buffer = Buffer.alloc(__LENGTH_RouteSession)): Buffer {
    if (r.length !== __LENGTH_RouteSession) throw Error('Unexpected length for RouteSession')
    x.proto && structs.writeU8.call(r, x.proto, 0)
    x.__pad1 && structs.writeU8.call(r, x.__pad1, 1)
    x.__pad2 && structs.writeU16.call(r, x.__pad2, 2)
    if (x.u && x.u.length !== 4)
        throw Error('u: Unexpected array length')
        x.u && x.u.forEach((x, i) => structs.writeU8.call(r, x, 4 + 1 * i))
    return r
}

export const __LENGTH_RouteSession = 8

export interface RouteMfcStats {
    packets?: bigint
    
    bytes?: bigint
    
    wrongIf?: bigint
}

/** Parses the attributes of a [[RouteMfcStats]] object */
export function parseRouteMfcStats(r: Buffer): RouteMfcStats {
    if (r.length !== __LENGTH_RouteMfcStats) throw Error('Unexpected length for RouteMfcStats')
    const x: RouteMfcStats = {}
    x.packets = structs.readU64.call(r, 0)
    x.bytes = structs.readU64.call(r, 8)
    x.wrongIf = structs.readU64.call(r, 16)
    return x
}

/** Encodes a [[RouteMfcStats]] object into a stream of attributes */
export function formatRouteMfcStats(x: RouteMfcStats, r: Buffer = Buffer.alloc(__LENGTH_RouteMfcStats)): Buffer {
    if (r.length !== __LENGTH_RouteMfcStats) throw Error('Unexpected length for RouteMfcStats')
    x.packets && structs.writeU64.call(r, x.packets, 0)
    x.bytes && structs.writeU64.call(r, x.bytes, 8)
    x.wrongIf && structs.writeU64.call(r, x.wrongIf, 16)
    return r
}

export const __LENGTH_RouteMfcStats = 24

export interface Address {
    family?: number
    
    /** The prefix length */
    prefixlen?: number
    
    /** Flags */
    flags?: AddressFlags
    
    /** Address scope */
    scope?: number
    
    /** Link index */
    index?: number
}

/** Parses the attributes of a [[Address]] object */
export function parseAddress(r: Buffer): Address {
    if (r.length !== __LENGTH_Address) throw Error('Unexpected length for Address')
    const x: Address = {}
    x.family = structs.readU8.call(r, 0)
    x.prefixlen = structs.readU8.call(r, 1)
    x.flags = parseAddressFlags(structs.readU8.call(r, 2))
    x.scope = structs.readU8.call(r, 3)
    x.index = structs.readU32.call(r, 4)
    return x
}

/** Encodes a [[Address]] object into a stream of attributes */
export function formatAddress(x: Address, r: Buffer = Buffer.alloc(__LENGTH_Address)): Buffer {
    if (r.length !== __LENGTH_Address) throw Error('Unexpected length for Address')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.prefixlen && structs.writeU8.call(r, x.prefixlen, 1)
    x.flags && structs.writeU8.call(r, formatAddressFlags(x.flags), 2)
    x.scope && structs.writeU8.call(r, x.scope, 3)
    x.index && structs.writeU32.call(r, x.index, 4)
    return r
}

export const __LENGTH_Address = 8

export interface AddressAttrs extends BaseObject {
    /**
     * Important comment:
     * this is prefix address, rather than local interface address.
     * It makes no difference for normally configured broadcast interfaces,
     * but for point-to-point this is DESTINATION address,
     * local address is supplied in IFA_LOCAL attribute.
     */
    address?: Buffer
    
    local?: Buffer
    
    label?: string
    
    broadcast?: Buffer
    
    anycast?: Buffer
    
    cacheInfo?: AddressCacheInfo
    
    multicast?: Buffer
    
    /**
     * u32 attribute that extends the u8 field ifa_flags.
     * If present, the value from struct ifaddrmsg will be ignored.
     */
    flags?: AddressFlags
    
    /** u32, priority/metric for prefix route */
    rtPriority?: number
    
    targetNetnsid?: Buffer
}

/** Parses the attributes of a [[AddressAttrs]] object */
export function parseAddressAttrs(r: Buffer): AddressAttrs {
    return structs.getObject(r, {
        1: (data, obj) => obj.address = data,
        2: (data, obj) => obj.local = data,
        3: (data, obj) => obj.label = structs.getString(data),
        4: (data, obj) => obj.broadcast = data,
        5: (data, obj) => obj.anycast = data,
        6: (data, obj) => obj.cacheInfo = parseAddressCacheInfo(data),
        7: (data, obj) => obj.multicast = data,
        8: (data, obj) => obj.flags = parseAddressFlags(structs.getU32(data)),
        9: (data, obj) => obj.rtPriority = structs.getU32(data),
        10: (data, obj) => obj.targetNetnsid = data,
    })
}

/** Encodes a [[AddressAttrs]] object into a stream of attributes */
export function formatAddressAttrs(x: AddressAttrs): StreamData {
    return structs.putObject(x, {
        address: (data, obj) => data.push(1, obj.address!),
        local: (data, obj) => data.push(2, obj.local!),
        label: (data, obj) => data.push(3, structs.putString(obj.label!)),
        broadcast: (data, obj) => data.push(4, obj.broadcast!),
        anycast: (data, obj) => data.push(5, obj.anycast!),
        cacheInfo: (data, obj) => data.push(6, formatAddressCacheInfo(obj.cacheInfo!)),
        multicast: (data, obj) => data.push(7, obj.multicast!),
        flags: (data, obj) => data.push(8, structs.putU32(formatAddressFlags(obj.flags!))),
        rtPriority: (data, obj) => data.push(9, structs.putU32(obj.rtPriority!)),
        targetNetnsid: (data, obj) => data.push(10, obj.targetNetnsid!),
    })
}

export interface AddressFlags {
    secondary?: true
    
    nodad?: true
    
    optimistic?: true
    
    dadfailed?: true
    
    homeaddress?: true
    
    deprecated?: true
    
    tentative?: true
    
    permanent?: true
    
    managetempaddr?: true
    
    noprefixroute?: true
    
    mcautojoin?: true
    
    stablePrivacy?: true
    
    __unknown?: number
}

/** Parses the flags in a [[AddressFlags]] bitmask */
export function parseAddressFlags(r: number): AddressFlags {
    const x: AddressFlags = {}
    if (r & (1)) (x.secondary = true, r &= ~(1))
    if (r & (2)) (x.nodad = true, r &= ~(2))
    if (r & (4)) (x.optimistic = true, r &= ~(4))
    if (r & (8)) (x.dadfailed = true, r &= ~(8))
    if (r & (16)) (x.homeaddress = true, r &= ~(16))
    if (r & (32)) (x.deprecated = true, r &= ~(32))
    if (r & (64)) (x.tentative = true, r &= ~(64))
    if (r & (128)) (x.permanent = true, r &= ~(128))
    if (r & (256)) (x.managetempaddr = true, r &= ~(256))
    if (r & (512)) (x.noprefixroute = true, r &= ~(512))
    if (r & (1024)) (x.mcautojoin = true, r &= ~(1024))
    if (r & (2048)) (x.stablePrivacy = true, r &= ~(2048))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[AddressFlags]] bitmask */
export function formatAddressFlags(x: AddressFlags): number {
    let r = x.__unknown || 0
    if (x.secondary) r |= 1
    if (x.nodad) r |= 2
    if (x.optimistic) r |= 4
    if (x.dadfailed) r |= 8
    if (x.homeaddress) r |= 16
    if (x.deprecated) r |= 32
    if (x.tentative) r |= 64
    if (x.permanent) r |= 128
    if (x.managetempaddr) r |= 256
    if (x.noprefixroute) r |= 512
    if (x.mcautojoin) r |= 1024
    if (x.stablePrivacy) r |= 2048
    return r
}

export interface AddressCacheInfo {
    ifaPrefered?: number
    
    ifaValid?: number
    
    /** created timestamp, hundredths of seconds */
    cstamp?: number
    
    /** updated timestamp, hundredths of seconds */
    tstamp?: number
}

/** Parses the attributes of a [[AddressCacheInfo]] object */
export function parseAddressCacheInfo(r: Buffer): AddressCacheInfo {
    if (r.length !== __LENGTH_AddressCacheInfo) throw Error('Unexpected length for AddressCacheInfo')
    const x: AddressCacheInfo = {}
    x.ifaPrefered = structs.readU32.call(r, 0)
    x.ifaValid = structs.readU32.call(r, 4)
    x.cstamp = structs.readU32.call(r, 8)
    x.tstamp = structs.readU32.call(r, 12)
    return x
}

/** Encodes a [[AddressCacheInfo]] object into a stream of attributes */
export function formatAddressCacheInfo(x: AddressCacheInfo, r: Buffer = Buffer.alloc(__LENGTH_AddressCacheInfo)): Buffer {
    if (r.length !== __LENGTH_AddressCacheInfo) throw Error('Unexpected length for AddressCacheInfo')
    x.ifaPrefered && structs.writeU32.call(r, x.ifaPrefered, 0)
    x.ifaValid && structs.writeU32.call(r, x.ifaValid, 4)
    x.cstamp && structs.writeU32.call(r, x.cstamp, 8)
    x.tstamp && structs.writeU32.call(r, x.tstamp, 12)
    return r
}

export const __LENGTH_AddressCacheInfo = 16

export interface Link {
    family?: number
    
    __pad?: number
    
    /** ARPHRD_* */
    type?: number
    
    /** Link index */
    index?: number
    
    /** IFF_* flags */
    flags?: number
    
    /** IFF_* change mask */
    change?: number
}

/** Parses the attributes of a [[Link]] object */
export function parseLink(r: Buffer): Link {
    if (r.length !== __LENGTH_Link) throw Error('Unexpected length for Link')
    const x: Link = {}
    x.family = structs.readU8.call(r, 0)
    x.__pad = structs.readU8.call(r, 1)
    x.type = structs.readU16.call(r, 2)
    x.index = structs.readS32.call(r, 4)
    x.flags = structs.readU32.call(r, 8)
    x.change = structs.readU32.call(r, 12)
    return x
}

/** Encodes a [[Link]] object into a stream of attributes */
export function formatLink(x: Link, r: Buffer = Buffer.alloc(__LENGTH_Link)): Buffer {
    if (r.length !== __LENGTH_Link) throw Error('Unexpected length for Link')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.__pad && structs.writeU8.call(r, x.__pad, 1)
    x.type && structs.writeU16.call(r, x.type, 2)
    x.index && structs.writeS32.call(r, x.index, 4)
    x.flags && structs.writeU32.call(r, x.flags, 8)
    x.change && structs.writeU32.call(r, x.change, 12)
    return r
}

export const __LENGTH_Link = 16

/** New extended info filters for IFLA_EXT_MASK */
export interface RtExtFilter {
    vf?: true
    
    brvlan?: true
    
    brvlanCompressed?: true
    
    skipStats?: true
    
    __unknown?: number
}

/** Parses the flags in a [[RtExtFilter]] bitmask */
export function parseRtExtFilter(r: number): RtExtFilter {
    const x: RtExtFilter = {}
    if (r & (1)) (x.vf = true, r &= ~(1))
    if (r & (2)) (x.brvlan = true, r &= ~(2))
    if (r & (4)) (x.brvlanCompressed = true, r &= ~(4))
    if (r & (8)) (x.skipStats = true, r &= ~(8))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[RtExtFilter]] bitmask */
export function formatRtExtFilter(x: RtExtFilter): number {
    let r = x.__unknown || 0
    if (x.vf) r |= 1
    if (x.brvlan) r |= 2
    if (x.brvlanCompressed) r |= 4
    if (x.skipStats) r |= 8
    return r
}

/**
 * These are the &struct net_device flags, they can be set by drivers, the
 * kernel and some can be triggered by userspace. Userspace can query and
 * set these flags using userspace utilities but there is also a sysfs
 * entry available for all dev flags which can be queried and set. These flags
 * are shared for all types of net_devices. The sysfs entries are available
 * via /sys/class/net/<dev>/flags. Flags which can be toggled through sysfs
 * are annotated below, note that only a few flags can be toggled and some
 * other flags are always preserved from the original net_device flags
 * even if you try to set them via sysfs. Flags which are always preserved
 * are kept under the flag grouping @IFF_VOLATILE. Flags which are volatile
 * are annotated below as such.
 *
 * You should have a pretty good reason to be extending these flags.
 */
export interface DeviceFlags {
    /** interface is up. Can be toggled through sysfs. */
    up?: true
    
    /** broadcast address valid. Volatile. */
    broadcast?: true
    
    /** turn on debugging. Can be toggled through sysfs. */
    debug?: true
    
    /** is a loopback net. Volatile. */
    loopback?: true
    
    /** interface is has p-p link. Volatile. */
    pointopoint?: true
    
    /**
     * avoid use of trailers. Can be toggled through sysfs.
     * Volatile.
     */
    notrailers?: true
    
    /** interface RFC2863 OPER_UP. Volatile. */
    running?: true
    
    /** no ARP protocol. Can be toggled through sysfs. Volatile. */
    noarp?: true
    
    /** receive all packets. Can be toggled through sysfs. */
    promisc?: true
    
    /**
     * receive all multicast packets. Can be toggled through
     * sysfs.
     */
    allmulti?: true
    
    /** master of a load balancer. Volatile. */
    master?: true
    
    /** slave of a load balancer. Volatile. */
    slave?: true
    
    /** Supports multicast. Can be toggled through sysfs. */
    multicast?: true
    
    /** can set media type. Can be toggled through sysfs. */
    portsel?: true
    
    /** auto media select active. Can be toggled through sysfs. */
    automedia?: true
    
    /**
     * dialup device with changing addresses. Can be toggled
     * through sysfs.
     */
    dynamic?: true
    
    /** driver signals L1 up. Volatile. */
    lowerUp?: true
    
    /** driver signals dormant. Volatile. */
    dormant?: true
    
    /** echo sent packets. Volatile. */
    echo?: true
    
    __unknown?: number
}

/** Parses the flags in a [[DeviceFlags]] bitmask */
export function parseDeviceFlags(r: number): DeviceFlags {
    const x: DeviceFlags = {}
    if (r & (1)) (x.up = true, r &= ~(1))
    if (r & (2)) (x.broadcast = true, r &= ~(2))
    if (r & (4)) (x.debug = true, r &= ~(4))
    if (r & (8)) (x.loopback = true, r &= ~(8))
    if (r & (16)) (x.pointopoint = true, r &= ~(16))
    if (r & (32)) (x.notrailers = true, r &= ~(32))
    if (r & (64)) (x.running = true, r &= ~(64))
    if (r & (128)) (x.noarp = true, r &= ~(128))
    if (r & (256)) (x.promisc = true, r &= ~(256))
    if (r & (512)) (x.allmulti = true, r &= ~(512))
    if (r & (1024)) (x.master = true, r &= ~(1024))
    if (r & (2048)) (x.slave = true, r &= ~(2048))
    if (r & (4096)) (x.multicast = true, r &= ~(4096))
    if (r & (8192)) (x.portsel = true, r &= ~(8192))
    if (r & (16384)) (x.automedia = true, r &= ~(16384))
    if (r & (32768)) (x.dynamic = true, r &= ~(32768))
    if (r & (65536)) (x.lowerUp = true, r &= ~(65536))
    if (r & (131072)) (x.dormant = true, r &= ~(131072))
    if (r & (262144)) (x.echo = true, r &= ~(262144))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[DeviceFlags]] bitmask */
export function formatDeviceFlags(x: DeviceFlags): number {
    let r = x.__unknown || 0
    if (x.up) r |= 1
    if (x.broadcast) r |= 2
    if (x.debug) r |= 4
    if (x.loopback) r |= 8
    if (x.pointopoint) r |= 16
    if (x.notrailers) r |= 32
    if (x.running) r |= 64
    if (x.noarp) r |= 128
    if (x.promisc) r |= 256
    if (x.allmulti) r |= 512
    if (x.master) r |= 1024
    if (x.slave) r |= 2048
    if (x.multicast) r |= 4096
    if (x.portsel) r |= 8192
    if (x.automedia) r |= 16384
    if (x.dynamic) r |= 32768
    if (x.lowerUp) r |= 65536
    if (x.dormant) r |= 131072
    if (x.echo) r |= 262144
    return r
}

/** prefix information */
export interface Prefix {
    family?: number
    
    __pad1?: number
    
    __pad2?: number
    
    ifindex?: number
    
    type?: number
    
    len?: number
    
    flags?: number
    
    __pad3?: number
}

/** Parses the attributes of a [[Prefix]] object */
export function parsePrefix(r: Buffer): Prefix {
    if (r.length !== __LENGTH_Prefix) throw Error('Unexpected length for Prefix')
    const x: Prefix = {}
    x.family = structs.readU8.call(r, 0)
    x.__pad1 = structs.readU8.call(r, 1)
    x.__pad2 = structs.readU16.call(r, 2)
    x.ifindex = structs.readS32.call(r, 4)
    x.type = structs.readU8.call(r, 8)
    x.len = structs.readU8.call(r, 9)
    x.flags = structs.readU8.call(r, 10)
    x.__pad3 = structs.readU8.call(r, 11)
    return x
}

/** Encodes a [[Prefix]] object into a stream of attributes */
export function formatPrefix(x: Prefix, r: Buffer = Buffer.alloc(__LENGTH_Prefix)): Buffer {
    if (r.length !== __LENGTH_Prefix) throw Error('Unexpected length for Prefix')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.__pad1 && structs.writeU8.call(r, x.__pad1, 1)
    x.__pad2 && structs.writeU16.call(r, x.__pad2, 2)
    x.ifindex && structs.writeS32.call(r, x.ifindex, 4)
    x.type && structs.writeU8.call(r, x.type, 8)
    x.len && structs.writeU8.call(r, x.len, 9)
    x.flags && structs.writeU8.call(r, x.flags, 10)
    x.__pad3 && structs.writeU8.call(r, x.__pad3, 11)
    return r
}

export const __LENGTH_Prefix = 12

export interface PrefixAttrs extends BaseObject {
    address?: Buffer
    
    cacheInfo?: PrefixCacheInfo
}

/** Parses the attributes of a [[PrefixAttrs]] object */
export function parsePrefixAttrs(r: Buffer): PrefixAttrs {
    return structs.getObject(r, {
        1: (data, obj) => obj.address = data,
        2: (data, obj) => obj.cacheInfo = parsePrefixCacheInfo(data),
    })
}

/** Encodes a [[PrefixAttrs]] object into a stream of attributes */
export function formatPrefixAttrs(x: PrefixAttrs): StreamData {
    return structs.putObject(x, {
        address: (data, obj) => data.push(1, obj.address!),
        cacheInfo: (data, obj) => data.push(2, formatPrefixCacheInfo(obj.cacheInfo!)),
    })
}

export interface PrefixCacheInfo {
    preferredTime?: number
    
    validTime?: number
}

/** Parses the attributes of a [[PrefixCacheInfo]] object */
export function parsePrefixCacheInfo(r: Buffer): PrefixCacheInfo {
    if (r.length !== __LENGTH_PrefixCacheInfo) throw Error('Unexpected length for PrefixCacheInfo')
    const x: PrefixCacheInfo = {}
    x.preferredTime = structs.readU32.call(r, 0)
    x.validTime = structs.readU32.call(r, 4)
    return x
}

/** Encodes a [[PrefixCacheInfo]] object into a stream of attributes */
export function formatPrefixCacheInfo(x: PrefixCacheInfo, r: Buffer = Buffer.alloc(__LENGTH_PrefixCacheInfo)): Buffer {
    if (r.length !== __LENGTH_PrefixCacheInfo) throw Error('Unexpected length for PrefixCacheInfo')
    x.preferredTime && structs.writeU32.call(r, x.preferredTime, 0)
    x.validTime && structs.writeU32.call(r, x.validTime, 4)
    return r
}

export const __LENGTH_PrefixCacheInfo = 8

/** Queueing discipline, class or filter */
export interface Tc {
    family?: number
    
    __pad1?: number
    
    __pad2?: number
    
    ifindex?: number
    
    /** Qdisc handle */
    handle?: number
    
    /** Parent qdisc */
    parent?: number
    
    info?: number
}

/** Parses the attributes of a [[Tc]] object */
export function parseTc(r: Buffer): Tc {
    if (r.length !== __LENGTH_Tc) throw Error('Unexpected length for Tc')
    const x: Tc = {}
    x.family = structs.readU8.call(r, 0)
    x.__pad1 = structs.readU8.call(r, 1)
    x.__pad2 = structs.readU16.call(r, 2)
    x.ifindex = structs.readS32.call(r, 4)
    x.handle = structs.readU32.call(r, 8)
    x.parent = structs.readU32.call(r, 12)
    x.info = structs.readU32.call(r, 16)
    return x
}

/** Encodes a [[Tc]] object into a stream of attributes */
export function formatTc(x: Tc, r: Buffer = Buffer.alloc(__LENGTH_Tc)): Buffer {
    if (r.length !== __LENGTH_Tc) throw Error('Unexpected length for Tc')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.__pad1 && structs.writeU8.call(r, x.__pad1, 1)
    x.__pad2 && structs.writeU16.call(r, x.__pad2, 2)
    x.ifindex && structs.writeS32.call(r, x.ifindex, 4)
    x.handle && structs.writeU32.call(r, x.handle, 8)
    x.parent && structs.writeU32.call(r, x.parent, 12)
    x.info && structs.writeU32.call(r, x.info, 16)
    return r
}

export const __LENGTH_Tc = 20

export interface TcAttrs extends BaseObject {
    kind?: string
    
    options?: Buffer
    
    stats?: Buffer
    
    xstats?: Buffer
    
    rate?: Buffer
    
    fcnt?: Buffer
    
    stats2?: Buffer
    
    stab?: Buffer
    
    pad?: Buffer
    
    dumpInvisible?: Buffer
    
    chain?: number
    
    hwOffload?: Buffer
    
    ingressBlock?: Buffer
    
    egressBlock?: Buffer
}

/** Parses the attributes of a [[TcAttrs]] object */
export function parseTcAttrs(r: Buffer): TcAttrs {
    return structs.getObject(r, {
        1: (data, obj) => obj.kind = structs.getString(data),
        2: (data, obj) => obj.options = data,
        3: (data, obj) => obj.stats = data,
        4: (data, obj) => obj.xstats = data,
        5: (data, obj) => obj.rate = data,
        6: (data, obj) => obj.fcnt = data,
        7: (data, obj) => obj.stats2 = data,
        8: (data, obj) => obj.stab = data,
        9: (data, obj) => obj.pad = data,
        10: (data, obj) => obj.dumpInvisible = data,
        11: (data, obj) => obj.chain = structs.getU32(data),
        12: (data, obj) => obj.hwOffload = data,
        13: (data, obj) => obj.ingressBlock = data,
        14: (data, obj) => obj.egressBlock = data,
    })
}

/** Encodes a [[TcAttrs]] object into a stream of attributes */
export function formatTcAttrs(x: TcAttrs): StreamData {
    return structs.putObject(x, {
        kind: (data, obj) => data.push(1, structs.putString(obj.kind!)),
        options: (data, obj) => data.push(2, obj.options!),
        stats: (data, obj) => data.push(3, obj.stats!),
        xstats: (data, obj) => data.push(4, obj.xstats!),
        rate: (data, obj) => data.push(5, obj.rate!),
        fcnt: (data, obj) => data.push(6, obj.fcnt!),
        stats2: (data, obj) => data.push(7, obj.stats2!),
        stab: (data, obj) => data.push(8, obj.stab!),
        pad: (data, obj) => data.push(9, obj.pad!),
        dumpInvisible: (data, obj) => data.push(10, obj.dumpInvisible!),
        chain: (data, obj) => data.push(11, structs.putU32(obj.chain!)),
        hwOffload: (data, obj) => data.push(12, obj.hwOffload!),
        ingressBlock: (data, obj) => data.push(13, obj.ingressBlock!),
        egressBlock: (data, obj) => data.push(14, obj.egressBlock!),
    })
}

/** TC action piece */
export interface TcAction {
    family?: number
    
    __pad1?: number
    
    __pad2?: number
}

/** Parses the attributes of a [[TcAction]] object */
export function parseTcAction(r: Buffer): TcAction {
    if (r.length !== __LENGTH_TcAction) throw Error('Unexpected length for TcAction')
    const x: TcAction = {}
    x.family = structs.readU8.call(r, 0)
    x.__pad1 = structs.readU8.call(r, 1)
    x.__pad2 = structs.readU16.call(r, 2)
    return x
}

/** Encodes a [[TcAction]] object into a stream of attributes */
export function formatTcAction(x: TcAction, r: Buffer = Buffer.alloc(__LENGTH_TcAction)): Buffer {
    if (r.length !== __LENGTH_TcAction) throw Error('Unexpected length for TcAction')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.__pad1 && structs.writeU8.call(r, x.__pad1, 1)
    x.__pad2 && structs.writeU16.call(r, x.__pad2, 2)
    return r
}

export const __LENGTH_TcAction = 4

export interface TcActionRoot extends BaseObject {
    tab?: Buffer
    
    flags?: Buffer
    
    count?: Buffer
    
    /** in msecs */
    timeDelta?: Buffer
}

/** Parses the attributes of a [[TcActionRoot]] object */
export function parseTcActionRoot(r: Buffer): TcActionRoot {
    return structs.getObject(r, {
        1: (data, obj) => obj.tab = data,
        2: (data, obj) => obj.flags = data,
        3: (data, obj) => obj.count = data,
        4: (data, obj) => obj.timeDelta = data,
    })
}

/** Encodes a [[TcActionRoot]] object into a stream of attributes */
export function formatTcActionRoot(x: TcActionRoot): StreamData {
    return structs.putObject(x, {
        tab: (data, obj) => data.push(1, obj.tab!),
        flags: (data, obj) => data.push(2, obj.flags!),
        count: (data, obj) => data.push(3, obj.count!),
        timeDelta: (data, obj) => data.push(4, obj.timeDelta!),
    })
}

/**
 * TCA_FLAG_LARGE_DUMP_ON user->kernel to request for larger than TCA_ACT_MAX_PRIO
 * actions in a dump. All dump responses will contain the number of actions
 * being dumped stored in for user app's consumption in TCA_ROOT_COUNT
 */
export interface TcActionFlags {
    largeDumpOn?: true
    
    __unknown?: number
}

/** Parses the flags in a [[TcActionFlags]] bitmask */
export function parseTcActionFlags(r: number): TcActionFlags {
    const x: TcActionFlags = {}
    if (r & (1)) (x.largeDumpOn = true, r &= ~(1))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[TcActionFlags]] bitmask */
export function formatTcActionFlags(x: TcActionFlags): number {
    let r = x.__unknown || 0
    if (x.largeDumpOn) r |= 1
    return r
}

/** Neighbor Discovery userland options */
export interface NdUserOption {
    family?: number
    
    __pad1?: number
    
    /** Total length of options */
    optsLen?: number
    
    ifindex?: number
    
    icmpType?: number
    
    icmpCode?: number
    
    __pad2?: number
    
    __pad3?: number
}

/** Parses the attributes of a [[NdUserOption]] object */
export function parseNdUserOption(r: Buffer): NdUserOption {
    if (r.length !== __LENGTH_NdUserOption) throw Error('Unexpected length for NdUserOption')
    const x: NdUserOption = {}
    x.family = structs.readU8.call(r, 0)
    x.__pad1 = structs.readU8.call(r, 1)
    x.optsLen = structs.readU16.call(r, 2)
    x.ifindex = structs.readS32.call(r, 4)
    x.icmpType = structs.readU8.call(r, 8)
    x.icmpCode = structs.readU8.call(r, 9)
    x.__pad2 = structs.readU16.call(r, 10)
    x.__pad3 = structs.readU32.call(r, 12)
    return x
}

/** Encodes a [[NdUserOption]] object into a stream of attributes */
export function formatNdUserOption(x: NdUserOption, r: Buffer = Buffer.alloc(__LENGTH_NdUserOption)): Buffer {
    if (r.length !== __LENGTH_NdUserOption) throw Error('Unexpected length for NdUserOption')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.__pad1 && structs.writeU8.call(r, x.__pad1, 1)
    x.optsLen && structs.writeU16.call(r, x.optsLen, 2)
    x.ifindex && structs.writeS32.call(r, x.ifindex, 4)
    x.icmpType && structs.writeU8.call(r, x.icmpType, 8)
    x.icmpCode && structs.writeU8.call(r, x.icmpCode, 9)
    x.__pad2 && structs.writeU16.call(r, x.__pad2, 10)
    x.__pad3 && structs.writeU32.call(r, x.__pad3, 12)
    return r
}

export const __LENGTH_NdUserOption = 16

export interface NdUserOptionAttrs extends BaseObject {
    srcaddr?: Buffer
}

/** Parses the attributes of a [[NdUserOptionAttrs]] object */
export function parseNdUserOptionAttrs(r: Buffer): NdUserOptionAttrs {
    return structs.getObject(r, {
        1: (data, obj) => obj.srcaddr = data,
    })
}

/** Encodes a [[NdUserOptionAttrs]] object into a stream of attributes */
export function formatNdUserOptionAttrs(x: NdUserOptionAttrs): StreamData {
    return structs.putObject(x, {
        srcaddr: (data, obj) => data.push(1, obj.srcaddr!),
    })
}

export interface Neighbor {
    family?: number
    
    pad1?: number
    
    pad2?: number
    
    ifindex?: number
    
    state?: NeighborState
    
    flags?: NeighborFlags
    
    type?: number
}

/** Parses the attributes of a [[Neighbor]] object */
export function parseNeighbor(r: Buffer): Neighbor {
    if (r.length !== __LENGTH_Neighbor) throw Error('Unexpected length for Neighbor')
    const x: Neighbor = {}
    x.family = structs.readU8.call(r, 0)
    x.pad1 = structs.readU8.call(r, 1)
    x.pad2 = structs.readU16.call(r, 2)
    x.ifindex = structs.readS32.call(r, 4)
    x.state = parseNeighborState(structs.readU16.call(r, 8))
    x.flags = parseNeighborFlags(structs.readU8.call(r, 10))
    x.type = structs.readU8.call(r, 11)
    return x
}

/** Encodes a [[Neighbor]] object into a stream of attributes */
export function formatNeighbor(x: Neighbor, r: Buffer = Buffer.alloc(__LENGTH_Neighbor)): Buffer {
    if (r.length !== __LENGTH_Neighbor) throw Error('Unexpected length for Neighbor')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.pad1 && structs.writeU8.call(r, x.pad1, 1)
    x.pad2 && structs.writeU16.call(r, x.pad2, 2)
    x.ifindex && structs.writeS32.call(r, x.ifindex, 4)
    x.state && structs.writeU16.call(r, formatNeighborState(x.state), 8)
    x.flags && structs.writeU8.call(r, formatNeighborFlags(x.flags), 10)
    x.type && structs.writeU8.call(r, x.type, 11)
    return r
}

export const __LENGTH_Neighbor = 12

export interface NeighborAttrs extends BaseObject {
    dst?: Buffer
    
    lladdr?: Buffer
    
    cacheInfo?: NeighborCacheInfo
    
    probes?: number
    
    vlan?: number
    
    port?: Buffer
    
    vni?: Buffer
    
    ifindex?: Buffer
    
    master?: number
    
    linkNetnsid?: Buffer
    
    srcVni?: Buffer
    
    /** Originator of entry */
    protocol?: Buffer
}

/** Parses the attributes of a [[NeighborAttrs]] object */
export function parseNeighborAttrs(r: Buffer): NeighborAttrs {
    return structs.getObject(r, {
        1: (data, obj) => obj.dst = data,
        2: (data, obj) => obj.lladdr = data,
        3: (data, obj) => obj.cacheInfo = parseNeighborCacheInfo(data),
        4: (data, obj) => obj.probes = structs.getU32(data),
        5: (data, obj) => obj.vlan = structs.getU16(data),
        6: (data, obj) => obj.port = data,
        7: (data, obj) => obj.vni = data,
        8: (data, obj) => obj.ifindex = data,
        9: (data, obj) => obj.master = structs.getU32(data),
        10: (data, obj) => obj.linkNetnsid = data,
        11: (data, obj) => obj.srcVni = data,
        12: (data, obj) => obj.protocol = data,
    })
}

/** Encodes a [[NeighborAttrs]] object into a stream of attributes */
export function formatNeighborAttrs(x: NeighborAttrs): StreamData {
    return structs.putObject(x, {
        dst: (data, obj) => data.push(1, obj.dst!),
        lladdr: (data, obj) => data.push(2, obj.lladdr!),
        cacheInfo: (data, obj) => data.push(3, formatNeighborCacheInfo(obj.cacheInfo!)),
        probes: (data, obj) => data.push(4, structs.putU32(obj.probes!)),
        vlan: (data, obj) => data.push(5, structs.putU16(obj.vlan!)),
        port: (data, obj) => data.push(6, obj.port!),
        vni: (data, obj) => data.push(7, obj.vni!),
        ifindex: (data, obj) => data.push(8, obj.ifindex!),
        master: (data, obj) => data.push(9, structs.putU32(obj.master!)),
        linkNetnsid: (data, obj) => data.push(10, obj.linkNetnsid!),
        srcVni: (data, obj) => data.push(11, obj.srcVni!),
        protocol: (data, obj) => data.push(12, obj.protocol!),
    })
}

/** Neighbor Cache Entry Flags */
export interface NeighborFlags {
    use?: true
    
    self?: true
    
    master?: true
    
    /** == ATF_PUBL */
    proxy?: true
    
    extLearned?: true
    
    offloaded?: true
    
    sticky?: true
    
    router?: true
    
    __unknown?: number
}

/** Parses the flags in a [[NeighborFlags]] bitmask */
export function parseNeighborFlags(r: number): NeighborFlags {
    const x: NeighborFlags = {}
    if (r & (1)) (x.use = true, r &= ~(1))
    if (r & (2)) (x.self = true, r &= ~(2))
    if (r & (4)) (x.master = true, r &= ~(4))
    if (r & (8)) (x.proxy = true, r &= ~(8))
    if (r & (16)) (x.extLearned = true, r &= ~(16))
    if (r & (32)) (x.offloaded = true, r &= ~(32))
    if (r & (64)) (x.sticky = true, r &= ~(64))
    if (r & (128)) (x.router = true, r &= ~(128))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[NeighborFlags]] bitmask */
export function formatNeighborFlags(x: NeighborFlags): number {
    let r = x.__unknown || 0
    if (x.use) r |= 1
    if (x.self) r |= 2
    if (x.master) r |= 4
    if (x.proxy) r |= 8
    if (x.extLearned) r |= 16
    if (x.offloaded) r |= 32
    if (x.sticky) r |= 64
    if (x.router) r |= 128
    return r
}

/**
 * Neighbor Cache Entry States.
 *
 * NUD_NOARP & NUD_PERMANENT are pseudostates, they never change
 * and make no address resolution or NUD.
 * NUD_PERMANENT also cannot be deleted by garbage collectors.
 */
export interface NeighborState {
    incomplete?: true
    
    reachable?: true
    
    stale?: true
    
    delay?: true
    
    probe?: true
    
    failed?: true
    
    /** Dummy states */
    noarp?: true
    
    permanent?: true
    
    __unknown?: number
}

/** Parses the flags in a [[NeighborState]] bitmask */
export function parseNeighborState(r: number): NeighborState {
    const x: NeighborState = {}
    if (r & (1)) (x.incomplete = true, r &= ~(1))
    if (r & (2)) (x.reachable = true, r &= ~(2))
    if (r & (4)) (x.stale = true, r &= ~(4))
    if (r & (8)) (x.delay = true, r &= ~(8))
    if (r & (16)) (x.probe = true, r &= ~(16))
    if (r & (32)) (x.failed = true, r &= ~(32))
    if (r & (64)) (x.noarp = true, r &= ~(64))
    if (r & (128)) (x.permanent = true, r &= ~(128))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[NeighborState]] bitmask */
export function formatNeighborState(x: NeighborState): number {
    let r = x.__unknown || 0
    if (x.incomplete) r |= 1
    if (x.reachable) r |= 2
    if (x.stale) r |= 4
    if (x.delay) r |= 8
    if (x.probe) r |= 16
    if (x.failed) r |= 32
    if (x.noarp) r |= 64
    if (x.permanent) r |= 128
    return r
}

export interface NeighborCacheInfo {
    confirmed?: number
    
    used?: number
    
    updated?: number
    
    refcnt?: number
}

/** Parses the attributes of a [[NeighborCacheInfo]] object */
export function parseNeighborCacheInfo(r: Buffer): NeighborCacheInfo {
    if (r.length !== __LENGTH_NeighborCacheInfo) throw Error('Unexpected length for NeighborCacheInfo')
    const x: NeighborCacheInfo = {}
    x.confirmed = structs.readU32.call(r, 0)
    x.used = structs.readU32.call(r, 4)
    x.updated = structs.readU32.call(r, 8)
    x.refcnt = structs.readU32.call(r, 12)
    return x
}

/** Encodes a [[NeighborCacheInfo]] object into a stream of attributes */
export function formatNeighborCacheInfo(x: NeighborCacheInfo, r: Buffer = Buffer.alloc(__LENGTH_NeighborCacheInfo)): Buffer {
    if (r.length !== __LENGTH_NeighborCacheInfo) throw Error('Unexpected length for NeighborCacheInfo')
    x.confirmed && structs.writeU32.call(r, x.confirmed, 0)
    x.used && structs.writeU32.call(r, x.used, 4)
    x.updated && structs.writeU32.call(r, x.updated, 8)
    x.refcnt && structs.writeU32.call(r, x.refcnt, 12)
    return r
}

export const __LENGTH_NeighborCacheInfo = 16

/**
 * Neighbour tables specific messages.
 *
 * To retrieve the neighbour tables send RTM_GETNEIGHTBL with the
 * NLM_F_DUMP flag set. Every neighbour table configuration is
 * spread over multiple messages to avoid running into message
 * size limits on systems with many interfaces. The first message
 * in the sequence transports all not device specific data such as
 * statistics, configuration, and the default parameter set.
 * This message is followed by 0..n messages carrying device
 * specific parameter sets.
 * Although the ordering should be sufficient, NDTA_NAME can be
 * used to identify sequences. The initial message can be identified
 * by checking for NDTA_CONFIG. The device specific messages do
 * not contain this TLV but have NDTPA_IFINDEX set to the
 * corresponding interface index.
 *
 * To change neighbour table attributes, send RTM_SETNEIGHTBL
 * with NDTA_NAME set. Changeable attribute include NDTA_THRESH[1-3],
 * NDTA_GC_INTERVAL, and all TLVs in NDTA_PARMS unless marked
 * otherwise. Device specific parameter sets can be changed by
 * setting NDTPA_IFINDEX to the interface index of the corresponding
 * device.
 */
export interface NeighborTable {
    family?: number
    
    __pad1?: number
    
    __pad2?: number
}

/** Parses the attributes of a [[NeighborTable]] object */
export function parseNeighborTable(r: Buffer): NeighborTable {
    if (r.length !== __LENGTH_NeighborTable) throw Error('Unexpected length for NeighborTable')
    const x: NeighborTable = {}
    x.family = structs.readU8.call(r, 0)
    x.__pad1 = structs.readU8.call(r, 1)
    x.__pad2 = structs.readU16.call(r, 2)
    return x
}

/** Encodes a [[NeighborTable]] object into a stream of attributes */
export function formatNeighborTable(x: NeighborTable, r: Buffer = Buffer.alloc(__LENGTH_NeighborTable)): Buffer {
    if (r.length !== __LENGTH_NeighborTable) throw Error('Unexpected length for NeighborTable')
    x.family && structs.writeU8.call(r, x.family, 0)
    x.__pad1 && structs.writeU8.call(r, x.__pad1, 1)
    x.__pad2 && structs.writeU16.call(r, x.__pad2, 2)
    return r
}

export const __LENGTH_NeighborTable = 4

export interface NeighborTableAttrs extends BaseObject {
    /** char *, unchangeable */
    name?: string
    
    /** u32 */
    thresh1?: number
    
    thresh2?: number
    
    thresh3?: number
    
    /** struct ndt_config, read-only */
    config?: NeighborTableConfig
    
    /** nested TLV NDTPA_* */
    parms?: NeighborTableParams
    
    /** struct ndt_stats, read-only */
    stats?: NeighborTableStats
    
    /** u64, msecs */
    gcInterval?: bigint
    
    pad?: Buffer
}

/** Parses the attributes of a [[NeighborTableAttrs]] object */
export function parseNeighborTableAttrs(r: Buffer): NeighborTableAttrs {
    return structs.getObject(r, {
        1: (data, obj) => obj.name = structs.getString(data),
        2: (data, obj) => obj.thresh1 = structs.getU32(data),
        3: (data, obj) => obj.thresh2 = structs.getU32(data),
        4: (data, obj) => obj.thresh3 = structs.getU32(data),
        5: (data, obj) => obj.config = parseNeighborTableConfig(data),
        6: (data, obj) => obj.parms = parseNeighborTableParams(data),
        7: (data, obj) => obj.stats = parseNeighborTableStats(data),
        8: (data, obj) => obj.gcInterval = structs.getU64(data),
        9: (data, obj) => obj.pad = data,
    })
}

/** Encodes a [[NeighborTableAttrs]] object into a stream of attributes */
export function formatNeighborTableAttrs(x: NeighborTableAttrs): StreamData {
    return structs.putObject(x, {
        name: (data, obj) => data.push(1, structs.putString(obj.name!)),
        thresh1: (data, obj) => data.push(2, structs.putU32(obj.thresh1!)),
        thresh2: (data, obj) => data.push(3, structs.putU32(obj.thresh2!)),
        thresh3: (data, obj) => data.push(4, structs.putU32(obj.thresh3!)),
        config: (data, obj) => data.push(5, formatNeighborTableConfig(obj.config!)),
        parms: (data, obj) => data.push(6, formatNeighborTableParams(obj.parms!)),
        stats: (data, obj) => data.push(7, formatNeighborTableStats(obj.stats!)),
        gcInterval: (data, obj) => data.push(8, structs.putU64(obj.gcInterval!)),
        pad: (data, obj) => data.push(9, obj.pad!),
    })
}

export interface NeighborTableConfig {
    keyLen?: number
    
    entrySize?: number
    
    entries?: number
    
    /** delta to now in msecs */
    lastFlush?: number
    
    lastRand?: number
    
    hashRnd?: number
    
    hashMask?: number
    
    hashChainGc?: number
    
    proxyQlen?: number
}

/** Parses the attributes of a [[NeighborTableConfig]] object */
export function parseNeighborTableConfig(r: Buffer): NeighborTableConfig {
    if (r.length !== __LENGTH_NeighborTableConfig) throw Error('Unexpected length for NeighborTableConfig')
    const x: NeighborTableConfig = {}
    x.keyLen = structs.readU16.call(r, 0)
    x.entrySize = structs.readU16.call(r, 2)
    x.entries = structs.readU32.call(r, 4)
    x.lastFlush = structs.readU32.call(r, 8)
    x.lastRand = structs.readU32.call(r, 12)
    x.hashRnd = structs.readU32.call(r, 16)
    x.hashMask = structs.readU32.call(r, 20)
    x.hashChainGc = structs.readU32.call(r, 24)
    x.proxyQlen = structs.readU32.call(r, 28)
    return x
}

/** Encodes a [[NeighborTableConfig]] object into a stream of attributes */
export function formatNeighborTableConfig(x: NeighborTableConfig, r: Buffer = Buffer.alloc(__LENGTH_NeighborTableConfig)): Buffer {
    if (r.length !== __LENGTH_NeighborTableConfig) throw Error('Unexpected length for NeighborTableConfig')
    x.keyLen && structs.writeU16.call(r, x.keyLen, 0)
    x.entrySize && structs.writeU16.call(r, x.entrySize, 2)
    x.entries && structs.writeU32.call(r, x.entries, 4)
    x.lastFlush && structs.writeU32.call(r, x.lastFlush, 8)
    x.lastRand && structs.writeU32.call(r, x.lastRand, 12)
    x.hashRnd && structs.writeU32.call(r, x.hashRnd, 16)
    x.hashMask && structs.writeU32.call(r, x.hashMask, 20)
    x.hashChainGc && structs.writeU32.call(r, x.hashChainGc, 24)
    x.proxyQlen && structs.writeU32.call(r, x.proxyQlen, 28)
    return r
}

export const __LENGTH_NeighborTableConfig = 32

export interface NeighborTableStats {
    allocs?: bigint
    
    destroys?: bigint
    
    hashGrows?: bigint
    
    resFailed?: bigint
    
    lookups?: bigint
    
    hits?: bigint
    
    rcvProbesMcast?: bigint
    
    rcvProbesUcast?: bigint
    
    periodicGcRuns?: bigint
    
    forcedGcRuns?: bigint
    
    tableFulls?: bigint
}

/** Parses the attributes of a [[NeighborTableStats]] object */
export function parseNeighborTableStats(r: Buffer): NeighborTableStats {
    if (r.length !== __LENGTH_NeighborTableStats) throw Error('Unexpected length for NeighborTableStats')
    const x: NeighborTableStats = {}
    x.allocs = structs.readU64.call(r, 0)
    x.destroys = structs.readU64.call(r, 8)
    x.hashGrows = structs.readU64.call(r, 16)
    x.resFailed = structs.readU64.call(r, 24)
    x.lookups = structs.readU64.call(r, 32)
    x.hits = structs.readU64.call(r, 40)
    x.rcvProbesMcast = structs.readU64.call(r, 48)
    x.rcvProbesUcast = structs.readU64.call(r, 56)
    x.periodicGcRuns = structs.readU64.call(r, 64)
    x.forcedGcRuns = structs.readU64.call(r, 72)
    x.tableFulls = structs.readU64.call(r, 80)
    return x
}

/** Encodes a [[NeighborTableStats]] object into a stream of attributes */
export function formatNeighborTableStats(x: NeighborTableStats, r: Buffer = Buffer.alloc(__LENGTH_NeighborTableStats)): Buffer {
    if (r.length !== __LENGTH_NeighborTableStats) throw Error('Unexpected length for NeighborTableStats')
    x.allocs && structs.writeU64.call(r, x.allocs, 0)
    x.destroys && structs.writeU64.call(r, x.destroys, 8)
    x.hashGrows && structs.writeU64.call(r, x.hashGrows, 16)
    x.resFailed && structs.writeU64.call(r, x.resFailed, 24)
    x.lookups && structs.writeU64.call(r, x.lookups, 32)
    x.hits && structs.writeU64.call(r, x.hits, 40)
    x.rcvProbesMcast && structs.writeU64.call(r, x.rcvProbesMcast, 48)
    x.rcvProbesUcast && structs.writeU64.call(r, x.rcvProbesUcast, 56)
    x.periodicGcRuns && structs.writeU64.call(r, x.periodicGcRuns, 64)
    x.forcedGcRuns && structs.writeU64.call(r, x.forcedGcRuns, 72)
    x.tableFulls && structs.writeU64.call(r, x.tableFulls, 80)
    return r
}

export const __LENGTH_NeighborTableStats = 88

export interface NeighborTableParams extends BaseObject {
    /** u32, unchangeable */
    ifindex?: number
    
    /** u32, read-only */
    refcnt?: Buffer
    
    /** u64, read-only, msecs */
    reachableTime?: Buffer
    
    /** u64, msecs */
    baseReachableTime?: bigint
    
    retransTime?: bigint
    
    gcStaletime?: bigint
    
    delayProbeTime?: bigint
    
    /** u32 */
    queueLen?: number
    
    appProbes?: number
    
    ucastProbes?: number
    
    mcastProbes?: number
    
    /** u64, msecs */
    anycastDelay?: bigint
    
    proxyDelay?: bigint
    
    /** u32 */
    proxyQlen?: number
    
    /** u64, msecs */
    locktime?: bigint
    
    /** u32 */
    queueLenbytes?: Buffer
    
    mcastReprobes?: Buffer
    
    pad?: Buffer
}

/** Parses the attributes of a [[NeighborTableParams]] object */
export function parseNeighborTableParams(r: Buffer): NeighborTableParams {
    return structs.getObject(r, {
        1: (data, obj) => obj.ifindex = structs.getU32(data),
        2: (data, obj) => obj.refcnt = data,
        3: (data, obj) => obj.reachableTime = data,
        4: (data, obj) => obj.baseReachableTime = structs.getU64(data),
        5: (data, obj) => obj.retransTime = structs.getU64(data),
        6: (data, obj) => obj.gcStaletime = structs.getU64(data),
        7: (data, obj) => obj.delayProbeTime = structs.getU64(data),
        8: (data, obj) => obj.queueLen = structs.getU32(data),
        9: (data, obj) => obj.appProbes = structs.getU32(data),
        10: (data, obj) => obj.ucastProbes = structs.getU32(data),
        11: (data, obj) => obj.mcastProbes = structs.getU32(data),
        12: (data, obj) => obj.anycastDelay = structs.getU64(data),
        13: (data, obj) => obj.proxyDelay = structs.getU64(data),
        14: (data, obj) => obj.proxyQlen = structs.getU32(data),
        15: (data, obj) => obj.locktime = structs.getU64(data),
        16: (data, obj) => obj.queueLenbytes = data,
        17: (data, obj) => obj.mcastReprobes = data,
        18: (data, obj) => obj.pad = data,
    })
}

/** Encodes a [[NeighborTableParams]] object into a stream of attributes */
export function formatNeighborTableParams(x: NeighborTableParams): StreamData {
    return structs.putObject(x, {
        ifindex: (data, obj) => data.push(1, structs.putU32(obj.ifindex!)),
        refcnt: (data, obj) => data.push(2, obj.refcnt!),
        reachableTime: (data, obj) => data.push(3, obj.reachableTime!),
        baseReachableTime: (data, obj) => data.push(4, structs.putU64(obj.baseReachableTime!)),
        retransTime: (data, obj) => data.push(5, structs.putU64(obj.retransTime!)),
        gcStaletime: (data, obj) => data.push(6, structs.putU64(obj.gcStaletime!)),
        delayProbeTime: (data, obj) => data.push(7, structs.putU64(obj.delayProbeTime!)),
        queueLen: (data, obj) => data.push(8, structs.putU32(obj.queueLen!)),
        appProbes: (data, obj) => data.push(9, structs.putU32(obj.appProbes!)),
        ucastProbes: (data, obj) => data.push(10, structs.putU32(obj.ucastProbes!)),
        mcastProbes: (data, obj) => data.push(11, structs.putU32(obj.mcastProbes!)),
        anycastDelay: (data, obj) => data.push(12, structs.putU64(obj.anycastDelay!)),
        proxyDelay: (data, obj) => data.push(13, structs.putU64(obj.proxyDelay!)),
        proxyQlen: (data, obj) => data.push(14, structs.putU32(obj.proxyQlen!)),
        locktime: (data, obj) => data.push(15, structs.putU64(obj.locktime!)),
        queueLenbytes: (data, obj) => data.push(16, obj.queueLenbytes!),
        mcastReprobes: (data, obj) => data.push(17, obj.mcastReprobes!),
        pad: (data, obj) => data.push(18, obj.pad!),
    })
}