import { BaseObject, StreamData } from '../structs'
import * as structs from '../structs'

export enum Commands {
    NEW_FAMILY = 1,
    DEL_FAMILY = 2,
    GET_FAMILY = 3,
    NEW_OPS = 4,
    DEL_OPS = 5,
    GET_OPS = 6,
    NEW_MCAST_GROUP = 7,
    DEL_MCAST_GROUP = 8,
    GET_MCAST_GROUP = 9,
}

export interface Message extends BaseObject {
    familyId?: number
    familyName?: string
    version?: number
    hdrsize?: number
    maxattr?: number
    ops?: Operation[]
    mcastGroups?: MulticastGroup[]
}

/** Parses the attributes of a [[Message]] object */
export function parseMessage(r: Buffer): Message {
    return structs.getObject(r, {
        1: (data, obj) => obj.familyId = structs.getU16(data),
        2: (data, obj) => obj.familyName = structs.getString(data),
        3: (data, obj) => obj.version = structs.getU32(data),
        4: (data, obj) => obj.hdrsize = structs.getU32(data),
        5: (data, obj) => obj.maxattr = structs.getU32(data),
        6: (data, obj) => obj.ops = structs.getArray(data, x => parseOperation(x)),
        7: (data, obj) => obj.mcastGroups = structs.getArray(data, x => parseMulticastGroup(x)),
    })
}

/** Encodes a [[Message]] object into a stream of attributes */
export function formatMessage(x: Message): StreamData {
    return structs.putObject(x, {
        familyId: (data, obj) => data.push(1, structs.putU16(obj.familyId!)),
        familyName: (data, obj) => data.push(2, structs.putString(obj.familyName!)),
        version: (data, obj) => data.push(3, structs.putU32(obj.version!)),
        hdrsize: (data, obj) => data.push(4, structs.putU32(obj.hdrsize!)),
        maxattr: (data, obj) => data.push(5, structs.putU32(obj.maxattr!)),
        ops: (data, obj) => data.push(6, structs.putArray(obj.ops!, x => formatOperation(x))),
        mcastGroups: (data, obj) => data.push(7, structs.putArray(obj.mcastGroups!, x => formatMulticastGroup(x))),
    })
}

export interface Operation extends BaseObject {
    id?: number
    flags?: OperationFlags
}

/** Parses the attributes of a [[Operation]] object */
export function parseOperation(r: Buffer): Operation {
    return structs.getObject(r, {
        1: (data, obj) => obj.id = structs.getU32(data),
        2: (data, obj) => obj.flags = parseOperationFlags(structs.getU32(data)),
    })
}

/** Encodes a [[Operation]] object into a stream of attributes */
export function formatOperation(x: Operation): StreamData {
    return structs.putObject(x, {
        id: (data, obj) => data.push(1, structs.putU32(obj.id!)),
        flags: (data, obj) => data.push(2, structs.putU32(formatOperationFlags(obj.flags!))),
    })
}

export interface MulticastGroup extends BaseObject {
    name?: string
    id?: number
}

/** Parses the attributes of a [[MulticastGroup]] object */
export function parseMulticastGroup(r: Buffer): MulticastGroup {
    return structs.getObject(r, {
        1: (data, obj) => obj.name = structs.getString(data),
        2: (data, obj) => obj.id = structs.getU32(data),
    })
}

/** Encodes a [[MulticastGroup]] object into a stream of attributes */
export function formatMulticastGroup(x: MulticastGroup): StreamData {
    return structs.putObject(x, {
        name: (data, obj) => data.push(1, structs.putString(obj.name!)),
        id: (data, obj) => data.push(2, structs.putU32(obj.id!)),
    })
}

export interface OperationFlags {
    adminPerm?: true
    cmdCapDo?: true
    cmdCapDump?: true
    cmdCapHaspol?: true
    unsAdminPerm?: true
}

/** Parses the flags in a [[OperationFlags]] bitmask */
export function parseOperationFlags(r: number): OperationFlags {
    const x: OperationFlags = {}
    if (r & (1)) x.adminPerm = true
    if (r & (2)) x.cmdCapDo = true
    if (r & (4)) x.cmdCapDump = true
    if (r & (8)) x.cmdCapHaspol = true
    if (r & (16)) x.unsAdminPerm = true
    return x
}

/** Encodes a [[OperationFlags]] bitmask */
export function formatOperationFlags(x: OperationFlags): number {
    let r = 0
    if (x.adminPerm) r |= 1
    if (x.cmdCapDo) r |= 2
    if (x.cmdCapDump) r |= 4
    if (x.cmdCapHaspol) r |= 8
    if (x.unsAdminPerm) r |= 16
    return r
}
