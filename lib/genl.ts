/**
 * This module implements the Generic Netlink protocol on top of `netlink`.
 */
/** */

import { EventEmitter } from 'events'

import { MessageInfo, RawNetlinkSocketOptions } from './raw'
import { createNetlink, NetlinkSocket, NetlinkSocketOptions, NetlinkSendOptions, SendRequestOptions } from './netlink'
import { PROTOCOLS, MIN_TYPE } from './constants'
import { formatGenlHeader, ensureArray, NetlinkMessage, parseGenlHeader } from './message'
import * as message from './message'

const nestedAttr = (info: any) => ( (x: message.NetlinkAttribute, recurse: any) => recurse(info, x.data) )
const arrayAttr = (info: any) => ( (x: message.NetlinkAttribute, recurse: any) =>
    message.parseAttributes(x.data).map(a => recurse(info, a.data)) )
const stringAttr = (encoding?: BufferEncoding) => ( (x: message.NetlinkAttribute) => message.getAttrStr(x, encoding) )

// Based on <linux/genetlink.h> at 6f52b16

export const GENL_NAMSIZ = 16 /* length of family name */

export const GENL_MIN_ID = MIN_TYPE
export const GENL_MAX_ID = 1023

/* List of reserved static generic netlink identifiers: */
export const GENL_ID_CTRL = MIN_TYPE
export const GENL_ID_VFS_DQUOT = MIN_TYPE + 1
export const GENL_ID_PMCRAID = MIN_TYPE + 2
/* must be last reserved + 1 */
export const GENL_START_ALLOC = MIN_TYPE + 3

export enum CTRL_COMMANDS {
    UNSPEC,
    NEWFAMILY,
    DELFAMILY,
    GETFAMILY,
    NEWOPS,
    DELOPS,
    GETOPS,
    NEWMCAST_GRP,
    DELMCAST_GRP,
    GETMCAST_GRP, /* unused */
}

export enum CTRL_OP_ATTRS {
    UNSPEC,
    ID,
    FLAGS,
}

export const FAMILY_OP__INFO = { ids: CTRL_OP_ATTRS, types: {
    [CTRL_OP_ATTRS.ID]: message.getAttrU32,
    [CTRL_OP_ATTRS.FLAGS]: message.getAttrU32,
} }

export enum CTRL_MCAST_GRP_ATTRS {
    UNSPEC,
    NAME,
    ID,
}

export const FAMILY_GROUP__INFO = { ids: CTRL_MCAST_GRP_ATTRS, types: {
    [CTRL_MCAST_GRP_ATTRS.NAME]: stringAttr(),
    [CTRL_MCAST_GRP_ATTRS.ID]: message.getAttrU32,
} }

export enum CTRL_ATTRS {
    UNSPEC,
    FAMILY_ID,
    FAMILY_NAME,
    VERSION,
    HDRSIZE,
    MAXATTR,
    OPS,
    MCAST_GROUPS,
}

export const FAMILY__INFO = { ids: CTRL_ATTRS, types: {
	[CTRL_ATTRS.FAMILY_ID]: message.getAttrU16,
	[CTRL_ATTRS.FAMILY_NAME]: stringAttr(),
	[CTRL_ATTRS.VERSION]: message.getAttrU32,
	[CTRL_ATTRS.HDRSIZE]: message.getAttrU32,
	[CTRL_ATTRS.MAXATTR]: message.getAttrU32,
	[CTRL_ATTRS.OPS]: arrayAttr(FAMILY_OP__INFO),
	[CTRL_ATTRS.MCAST_GROUPS]: arrayAttr(FAMILY_GROUP__INFO),
} }


export interface GenericNetlinkSocketOptions {
}

export interface GenericNetlinkSendOptions extends NetlinkSendOptions {
}

export interface GenericNetlinkMessage {
    flags: number
    seq: number
    port: number

    family: number
    cmd: number
    version: number
    data: Buffer
}

export const CTRL_VERSION = 1

/**
 * TODO
 * 
 * This socket silently discards invalid messages (see `invalid` event).
 */
export class GenericNetlinkSocket extends EventEmitter {
    readonly socket: NetlinkSocket

    constructor(socket: NetlinkSocket, options?: GenericNetlinkSocketOptions) {
        super()
        this.socket = socket
        this.socket.on('message', this._receive.bind(this))
    }

    private _receive(omsg: NetlinkMessage, rinfo: MessageInfo) {
        // FIXME: send to invalid on error
        const { type: family, flags, seq, port } = omsg
        let { data } = omsg
        const { x: { cmd, version }, consumed } = parseGenlHeader(data)
        data = data.slice(consumed)
        const msg: GenericNetlinkMessage = { family, flags, seq, port, cmd, version, data }
        this.emit('message', msg, rinfo)
    }

    send(
        family: number,
        cmd: number,
        version: number,
        data: Uint8Array | Uint8Array[],
        options?: GenericNetlinkSendOptions
    ) {
        const header = formatGenlHeader({ cmd, version })
        data = [header as Uint8Array].concat(ensureArray(data))
        return this.socket.send(family, data, options)
    }

    sendRequest(
        family: number,
        cmd: number,
        version: number,
        data: Uint8Array | Uint8Array[],
        options?: GenericNetlinkSendOptions & SendRequestOptions
    ) {
        const header = formatGenlHeader({ cmd, version })
        data = [header as Uint8Array].concat(ensureArray(data))
        return this.socket.sendRequest(family, data, options)
    }
}

export function createGenericNetlink(
    options?: GenericNetlinkSocketOptions & NetlinkSocketOptions & RawNetlinkSocketOptions
): GenericNetlinkSocket {
    const socket = createNetlink(PROTOCOLS.GENERIC)
    return new GenericNetlinkSocket(socket, options)
}
