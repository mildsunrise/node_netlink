import { BaseObject, StreamData } from '../structs'
import * as structs from '../structs'

export enum Commands {
    GET_DEVICE = 1,
    
    SET_DEVICE = 2,
}

export interface DeviceFlags {
    /** all current peers should be removed prior to adding the list below */
    replacePeers?: true
    
    __unknown?: number
}

/** Parses the flags in a [[DeviceFlags]] bitmask */
export function parseDeviceFlags(r: number): DeviceFlags {
    const x: DeviceFlags = {}
    if (r & (1)) (x.replacePeers = true, r &= ~(1))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[DeviceFlags]] bitmask */
export function formatDeviceFlags(x: DeviceFlags): number {
    let r = x.__unknown || 0
    if (x.replacePeers) r |= 1
    return r
}

/** exactly one of `ifindex` and `ifname` must be specified */
export interface Device extends BaseObject {
    ifindex?: number
    
    ifname?: string
    
    /**
     * exact length WG_KEY_LEN.
     * for SET_DEVICE, pass all zeros to remove.
     */
    privateKey?: Buffer
    
    /** [GET_DEVICE only] exact length WG_KEY_LEN. */
    publicKey?: Buffer
    
    /** [SET_DEVICE only] */
    flags?: DeviceFlags
    
    /** pass 0 to choose randomly. */
    listenPort?: number
    
    /** pass 0 to disable. */
    fwmark?: number
    
    peers?: Peer[]
}

/** Parses the attributes of a [[Device]] object */
export function parseDevice(r: Buffer): Device {
    return structs.getObject(r, {
        1: (data, obj) => obj.ifindex = structs.getU32(data),
        2: (data, obj) => obj.ifname = structs.getString(data),
        3: (data, obj) => obj.privateKey = data,
        4: (data, obj) => obj.publicKey = data,
        5: (data, obj) => obj.flags = parseDeviceFlags(structs.getU32(data)),
        6: (data, obj) => obj.listenPort = structs.getU16(data),
        7: (data, obj) => obj.fwmark = structs.getU32(data),
        8: (data, obj) => obj.peers = structs.getArray(data, x => parsePeer(x)),
    })
}

/** Encodes a [[Device]] object into a stream of attributes */
export function formatDevice(x: Device): StreamData {
    return structs.putObject(x, {
        ifindex: (data, obj) => data.push(1, structs.putU32(obj.ifindex!)),
        ifname: (data, obj) => data.push(2, structs.putString(obj.ifname!)),
        privateKey: (data, obj) => data.push(3, obj.privateKey!),
        publicKey: (data, obj) => data.push(4, obj.publicKey!),
        flags: (data, obj) => data.push(5, structs.putU32(formatDeviceFlags(obj.flags!))),
        listenPort: (data, obj) => data.push(6, structs.putU16(obj.listenPort!)),
        fwmark: (data, obj) => data.push(7, structs.putU32(obj.fwmark!)),
        peers: (data, obj) => data.push(8, structs.putArray(obj.peers!, x => formatPeer(x))),
    })
}

export interface PeerFlags {
    /**
     * the specified peer should not exist at the end of the operation,
     * rather than added/updated
     */
    removeMe?: true
    
    /** all current allowed IPs of this peer should be removed prior to adding `allowedIps` */
    replaceAllowedIps?: true
    
    /** the peer should only be set if it already exists */
    updateOnly?: true
    
    __unknown?: number
}

/** Parses the flags in a [[PeerFlags]] bitmask */
export function parsePeerFlags(r: number): PeerFlags {
    const x: PeerFlags = {}
    if (r & (1)) (x.removeMe = true, r &= ~(1))
    if (r & (2)) (x.replaceAllowedIps = true, r &= ~(2))
    if (r & (4)) (x.updateOnly = true, r &= ~(4))
    if (r) x.__unknown = r
    return x
}

/** Encodes a [[PeerFlags]] bitmask */
export function formatPeerFlags(x: PeerFlags): number {
    let r = x.__unknown || 0
    if (x.removeMe) r |= 1
    if (x.replaceAllowedIps) r |= 2
    if (x.updateOnly) r |= 4
    return r
}

export interface Peer extends BaseObject {
    /** exact len WG_KEY_LEN. */
    publicKey?: Buffer
    
    /** exact len WG_KEY_LEN, pass all zeros to remove. */
    presharedKey?: Buffer
    
    /** [SET_DEVICE only] */
    flags?: PeerFlags
    
    /** struct sockaddr_in or struct sockaddr_in6 */
    endpoint?: Buffer
    
    /** pass 0 to disable. */
    persistentKeepaliveInterval?: number
    
    /** [GET_DEVICE only] struct __kernel_timespec */
    lastHandshakeTime?: Buffer
    
    /** [GET_DEVICE only] */
    rxBytes?: bigint
    
    /** [GET_DEVICE only] */
    txBytes?: bigint
    
    allowedIps?: AllowedIp[]
    
    /**
     * should not be set or used at all by most users of this API, as the
     * most recent protocol will be used when this is unset. Otherwise,
     * must be set to 1.
     */
    protocolVersion?: number
}

/** Parses the attributes of a [[Peer]] object */
export function parsePeer(r: Buffer): Peer {
    return structs.getObject(r, {
        1: (data, obj) => obj.publicKey = data,
        2: (data, obj) => obj.presharedKey = data,
        3: (data, obj) => obj.flags = parsePeerFlags(structs.getU32(data)),
        4: (data, obj) => obj.endpoint = data,
        5: (data, obj) => obj.persistentKeepaliveInterval = structs.getU16(data),
        6: (data, obj) => obj.lastHandshakeTime = data,
        7: (data, obj) => obj.rxBytes = structs.getU64(data),
        8: (data, obj) => obj.txBytes = structs.getU64(data),
        9: (data, obj) => obj.allowedIps = structs.getArray(data, x => parseAllowedIp(x)),
        10: (data, obj) => obj.protocolVersion = structs.getU32(data),
    })
}

/** Encodes a [[Peer]] object into a stream of attributes */
export function formatPeer(x: Peer): StreamData {
    return structs.putObject(x, {
        publicKey: (data, obj) => data.push(1, obj.publicKey!),
        presharedKey: (data, obj) => data.push(2, obj.presharedKey!),
        flags: (data, obj) => data.push(3, structs.putU32(formatPeerFlags(obj.flags!))),
        endpoint: (data, obj) => data.push(4, obj.endpoint!),
        persistentKeepaliveInterval: (data, obj) => data.push(5, structs.putU16(obj.persistentKeepaliveInterval!)),
        lastHandshakeTime: (data, obj) => data.push(6, obj.lastHandshakeTime!),
        rxBytes: (data, obj) => data.push(7, structs.putU64(obj.rxBytes!)),
        txBytes: (data, obj) => data.push(8, structs.putU64(obj.txBytes!)),
        allowedIps: (data, obj) => data.push(9, structs.putArray(obj.allowedIps!, x => formatAllowedIp(x))),
        protocolVersion: (data, obj) => data.push(10, structs.putU32(obj.protocolVersion!)),
    })
}

export interface AllowedIp extends BaseObject {
    family?: number
    
    /** struct in_addr or struct in6_addr */
    ipaddr?: Buffer
    
    cidrMask?: number
}

/** Parses the attributes of a [[AllowedIp]] object */
export function parseAllowedIp(r: Buffer): AllowedIp {
    return structs.getObject(r, {
        1: (data, obj) => obj.family = structs.getU16(data),
        2: (data, obj) => obj.ipaddr = data,
        3: (data, obj) => obj.cidrMask = structs.getU8(data),
    })
}

/** Encodes a [[AllowedIp]] object into a stream of attributes */
export function formatAllowedIp(x: AllowedIp): StreamData {
    return structs.putObject(x, {
        family: (data, obj) => data.push(1, structs.putU16(obj.family!)),
        ipaddr: (data, obj) => data.push(2, obj.ipaddr!),
        cidrMask: (data, obj) => data.push(3, structs.putU8(obj.cidrMask!)),
    })
}
