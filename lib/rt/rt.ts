/**
 * This module implements the Rtnetlink interface on top of `netlink`.
 */
/** */

import { EventEmitter } from 'events'

import { MessageInfo, RawNetlinkSocketOptions } from '../raw'
import { createNetlink, NetlinkSocket, NetlinkSocketOptions, NetlinkSendOptions, RequestOptions } from '../netlink'
import { Protocol, FlagsGet } from '../constants'
import { NetlinkMessage, AttrStream } from '../structs'
import { parseMessage, Message, MessageType } from './structs'
import * as rt from './structs'
import * as ifla from './ifla'

/**
 * rtnetlink families. Values up to 127 are reserved for real address
 * families, values above 128 may be used arbitrarily.
 */
export const RTNL_FAMILY_IPMR = 128
export const RTNL_FAMILY_IP6MR = 129
export const RTNL_FAMILY_MAX = 129

/**
 * For manipulation of filters in shared block, tcm_ifindex is set to
 * TCM_IFINDEX_MAGIC_BLOCK, and tcm_parent is aliased to tcm_block_index
 * which is the block index.
 */
export const TCM_IFINDEX_MAGIC_BLOCK = 0xFFFFFFFF


export interface RtNetlinkSocketOptions {
}

export interface RtNetlinkSendOptions extends NetlinkSendOptions {
}

// FIXME: is it true that rtnetlink attributes can only be managed with RTA_ macros? does anything really change?

/**
 * TODO
 * 
 * This socket silently discards invalid messages (see `invalid` event).
 */
export class RtNetlinkSocket extends EventEmitter {
    readonly socket: NetlinkSocket

    constructor(socket: NetlinkSocket, options?: RtNetlinkSocketOptions) {
        super()
        this.socket = socket
        this.socket.on('message', this._receive.bind(this))
    }

    private _receive(omsg: NetlinkMessage[], rinfo: MessageInfo) {
        try {
            this.emit('message', omsg.map(x => parseMessage(x.type, x.data)))
        } catch (e) {
            this.emit('invalid', e, omsg, rinfo)
        }
    }

    send(
        type: MessageType,
        data: Uint8Array | Uint8Array[],
        options?: RtNetlinkSendOptions & RequestOptions,
        callback?: (error?: Error) => any,
    ) {
        return this.socket.send(type, data, options, callback)
    }

    async request(
        type: MessageType,
        data: Uint8Array | Uint8Array[],
        options?: RtNetlinkSendOptions & RequestOptions
    ): Promise<Message[]> {
        const [msg, rinfo] = await this.socket.request(type, data, options)
        return msg.map(x => parseMessage(x.type, x.data))
    }

    async newTrafficAction(data: rt.TcAction, attrs?: {}, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcActionMessage[]> {
        const msg = new AttrStream()
        rt.formatTcActionMessage({ kind: 'tcAction', data }, msg)
        const omsg = await this.request(MessageType.NEWACTION, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tcAction')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async delTrafficAction(data: rt.TcAction, attrs?: {}, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcActionMessage[]> {
        const msg = new AttrStream()
        rt.formatTcActionMessage({ kind: 'tcAction', data }, msg)
        const omsg = await this.request(MessageType.DELACTION, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tcAction')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async getTrafficAction(data: rt.TcAction, attrs?: {}, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcActionMessage[]> {
        const msg = new AttrStream()
        rt.formatTcActionMessage({ kind: 'tcAction', data }, msg)
        const omsg = await this.request(MessageType.GETACTION, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tcAction')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    getTrafficActions(data?: rt.TcAction, attrs?: {}, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcActionMessage[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.getTrafficAction(data || {}, attrs, options)
    }

    async newAddress(data: rt.Address, attrs?: rt.AddressAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.AddressMessage[]> {
        const msg = new AttrStream()
        rt.formatAddressMessage({ kind: 'address', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWADDR, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'address')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async delAddress(data: rt.Address, attrs?: rt.AddressAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.AddressMessage[]> {
        const msg = new AttrStream()
        rt.formatAddressMessage({ kind: 'address', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.DELADDR, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'address')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async getAddress(data: rt.Address, attrs?: rt.AddressAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.AddressMessage[]> {
        const msg = new AttrStream()
        rt.formatAddressMessage({ kind: 'address', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.GETADDR, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'address')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    getAddresses(data?: rt.Address, attrs?: rt.AddressAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.AddressMessage[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.getAddress(data || {}, attrs, options)
    }

    async newLink(data: rt.Link, attrs?: ifla.LinkAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.LinkMessage[]> {
        const msg = new AttrStream()
        rt.formatLinkMessage({ kind: 'link', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWLINK, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'link')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async delLink(data: rt.Link, attrs?: ifla.LinkAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.LinkMessage[]> {
        const msg = new AttrStream()
        rt.formatLinkMessage({ kind: 'link', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.DELLINK, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'link')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async getLink(data: rt.Link, attrs?: ifla.LinkAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.LinkMessage[]> {
        const msg = new AttrStream()
        rt.formatLinkMessage({ kind: 'link', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.GETLINK, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'link')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async setLink(data: rt.Link, attrs?: ifla.LinkAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.LinkMessage[]> {
        const msg = new AttrStream()
        rt.formatLinkMessage({ kind: 'link', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.SETLINK, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'link')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    getLinks(data?: rt.Link, attrs?: ifla.LinkAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.LinkMessage[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.getLink(data || {}, attrs, options)
    }

    async newNdUserOption(data: rt.NdUserOption, attrs?: rt.NdUserOptionAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.NdUserOptionMessage[]> {
        const msg = new AttrStream()
        rt.formatNdUserOptionMessage({ kind: 'ndUserOption', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWNDUSEROPT, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'ndUserOption')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async newNeighbor(data: rt.Neighbor, attrs?: rt.NeighborAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.NeighborMessage[]> {
        const msg = new AttrStream()
        rt.formatNeighborMessage({ kind: 'neighbor', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWNEIGH, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'neighbor')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async delNeighbor(data: rt.Neighbor, attrs?: rt.NeighborAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.NeighborMessage[]> {
        const msg = new AttrStream()
        rt.formatNeighborMessage({ kind: 'neighbor', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.DELNEIGH, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'neighbor')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async getNeighbor(data: rt.Neighbor, attrs?: rt.NeighborAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.NeighborMessage[]> {
        const msg = new AttrStream()
        rt.formatNeighborMessage({ kind: 'neighbor', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.GETNEIGH, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'neighbor')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    getNeighbors(data?: rt.Neighbor, attrs?: rt.NeighborAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.NeighborMessage[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.getNeighbor(data || {}, attrs, options)
    }

    async newNeighborTable(data: rt.NeighborTable, attrs?: rt.NeighborTableAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.NeighborTableMessage[]> {
        const msg = new AttrStream()
        rt.formatNeighborTableMessage({ kind: 'neighborTable', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWNEIGHTBL, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'neighborTable')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async getNeighborTable(data: rt.NeighborTable, attrs?: rt.NeighborTableAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.NeighborTableMessage[]> {
        const msg = new AttrStream()
        rt.formatNeighborTableMessage({ kind: 'neighborTable', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.GETNEIGHTBL, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'neighborTable')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async setNeighborTable(data: rt.NeighborTable, attrs?: rt.NeighborTableAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.NeighborTableMessage[]> {
        const msg = new AttrStream()
        rt.formatNeighborTableMessage({ kind: 'neighborTable', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.SETNEIGHTBL, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'neighborTable')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    getNeighborTables(data?: rt.NeighborTable, attrs?: rt.NeighborTableAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.NeighborTableMessage[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.getNeighborTable(data || {}, attrs, options)
    }

    async newPrefix(data: rt.Prefix, attrs?: rt.PrefixAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.PrefixMessage[]> {
        const msg = new AttrStream()
        rt.formatPrefixMessage({ kind: 'prefix', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWPREFIX, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'prefix')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async newQdisc(data: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        const msg = new AttrStream()
        rt.formatTcMessage({ kind: 'tc', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWQDISC, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tc')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async delQdisc(data: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        const msg = new AttrStream()
        rt.formatTcMessage({ kind: 'tc', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.DELQDISC, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tc')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async getQdisc(data: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        const msg = new AttrStream()
        rt.formatTcMessage({ kind: 'tc', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.GETQDISC, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tc')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    getQdiscs(data?: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.getQdisc(data || {}, attrs, options)
    }

    async newRoute(data: rt.Route, attrs?: rt.RouteAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.RouteMessage[]> {
        const msg = new AttrStream()
        rt.formatRouteMessage({ kind: 'route', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWROUTE, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'route')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async delRoute(data: rt.Route, attrs?: rt.RouteAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.RouteMessage[]> {
        const msg = new AttrStream()
        rt.formatRouteMessage({ kind: 'route', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.DELROUTE, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'route')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async getRoute(data: rt.Route, attrs?: rt.RouteAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.RouteMessage[]> {
        const msg = new AttrStream()
        rt.formatRouteMessage({ kind: 'route', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.GETROUTE, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'route')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    getRoutes(data?: rt.Route, attrs?: rt.RouteAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.RouteMessage[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.getRoute(data || {}, attrs, options)
    }

    async newTrafficClass(data: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        const msg = new AttrStream()
        rt.formatTcMessage({ kind: 'tc', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWTCLASS, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tc')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async delTrafficClass(data: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        const msg = new AttrStream()
        rt.formatTcMessage({ kind: 'tc', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.DELTCLASS, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tc')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async getTrafficClass(data: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        const msg = new AttrStream()
        rt.formatTcMessage({ kind: 'tc', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.GETTCLASS, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tc')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    getTrafficClasses(data?: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.getTrafficClass(data || {}, attrs, options)
    }

    async newTrafficFilter(data: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        const msg = new AttrStream()
        rt.formatTcMessage({ kind: 'tc', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.NEWTFILTER, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tc')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async delTrafficFilter(data: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        const msg = new AttrStream()
        rt.formatTcMessage({ kind: 'tc', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.DELTFILTER, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tc')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    async getTrafficFilter(data: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        const msg = new AttrStream()
        rt.formatTcMessage({ kind: 'tc', data, attrs: attrs || {} }, msg)
        const omsg = await this.request(MessageType.GETTFILTER, msg.bufs, options)
        return omsg.map(x => {
            if (x.kind !== 'tc')
                throw Error(`Unexpected ${x.kind} message received`)
            return x
        })
    }

    getTrafficFilters(data?: rt.Tc, attrs?: rt.TcAttrs, options?: RtNetlinkSendOptions & RequestOptions): Promise<rt.TcMessage[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.getTrafficFilter(data || {}, attrs, options)
    }
}

export function createRtNetlink(
    options?: RtNetlinkSocketOptions & NetlinkSocketOptions & RawNetlinkSocketOptions
): RtNetlinkSocket {
    const socket = createNetlink(Protocol.ROUTE, options)
    return new RtNetlinkSocket(socket, options)
}
