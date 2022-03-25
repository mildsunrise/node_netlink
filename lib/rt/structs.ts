import { AttrStream } from '../structs'
import { MessageType } from './gen_structs'
import * as rt from './gen_structs'
import * as ifla from './ifla'

export type Message = AddressMessage | LinkMessage | NdUserOptionMessage | NeighborMessage | NeighborTableMessage | PrefixMessage | RouteMessage | TcMessage | TcActionMessage

export interface AddressMessage {
    kind: 'address'
    data: rt.Address
    attrs: rt.AddressAttrs
}

export function parseAddressMessage(r: Buffer): AddressMessage {
    if (r.length < rt.__LENGTH_Address)
        throw Error(`Unexpected Address message length (${r.length})`)
    const data = rt.parseAddress(r.slice(0, rt.__LENGTH_Address))
    const attrs = rt.parseAddressAttrs(r.slice(rt.__LENGTH_Address))
    return { kind: 'address', data, attrs }
}

export function formatAddressMessage(x: AddressMessage, out: AttrStream) {
    out.emit(rt.formatAddress(x.data))
    out.emit(rt.formatAddressAttrs(x.attrs))
}

export interface LinkMessage {
    kind: 'link'
    data: rt.Link
    attrs: ifla.LinkAttrs
}

export function parseLinkMessage(r: Buffer): LinkMessage {
    if (r.length < rt.__LENGTH_Link)
        throw Error(`Unexpected Link message length (${r.length})`)
    const data = rt.parseLink(r.slice(0, rt.__LENGTH_Link))
    const attrs = ifla.parseLinkAttrs(r.slice(rt.__LENGTH_Link))
    return { kind: 'link', data, attrs }
}

export function formatLinkMessage(x: LinkMessage, out: AttrStream) {
    out.emit(rt.formatLink(x.data))
    out.emit(ifla.formatLinkAttrs(x.attrs))
}

export interface NdUserOptionMessage {
    kind: 'ndUserOption'
    data: rt.NdUserOption
    attrs: rt.NdUserOptionAttrs
}

export function parseNdUserOptionMessage(r: Buffer): NdUserOptionMessage {
    if (r.length < rt.__LENGTH_NdUserOption)
        throw Error(`Unexpected NdUserOption message length (${r.length})`)
    const data = rt.parseNdUserOption(r.slice(0, rt.__LENGTH_NdUserOption))
    const attrs = rt.parseNdUserOptionAttrs(r.slice(rt.__LENGTH_NdUserOption))
    return { kind: 'ndUserOption', data, attrs }
}

export function formatNdUserOptionMessage(x: NdUserOptionMessage, out: AttrStream) {
    out.emit(rt.formatNdUserOption(x.data))
    out.emit(rt.formatNdUserOptionAttrs(x.attrs))
}

export interface NeighborMessage {
    kind: 'neighbor'
    data: rt.Neighbor
    attrs: rt.NeighborAttrs
}

export function parseNeighborMessage(r: Buffer): NeighborMessage {
    if (r.length < rt.__LENGTH_Neighbor)
        throw Error(`Unexpected Neighbor message length (${r.length})`)
    const data = rt.parseNeighbor(r.slice(0, rt.__LENGTH_Neighbor))
    const attrs = rt.parseNeighborAttrs(r.slice(rt.__LENGTH_Neighbor))
    return { kind: 'neighbor', data, attrs }
}

export function formatNeighborMessage(x: NeighborMessage, out: AttrStream) {
    out.emit(rt.formatNeighbor(x.data))
    out.emit(rt.formatNeighborAttrs(x.attrs))
}

export interface NeighborTableMessage {
    kind: 'neighborTable'
    data: rt.NeighborTable
    attrs: rt.NeighborTableAttrs
}

export function parseNeighborTableMessage(r: Buffer): NeighborTableMessage {
    if (r.length < rt.__LENGTH_NeighborTable)
        throw Error(`Unexpected NeighborTable message length (${r.length})`)
    const data = rt.parseNeighborTable(r.slice(0, rt.__LENGTH_NeighborTable))
    const attrs = rt.parseNeighborTableAttrs(r.slice(rt.__LENGTH_NeighborTable))
    return { kind: 'neighborTable', data, attrs }
}

export function formatNeighborTableMessage(x: NeighborTableMessage, out: AttrStream) {
    out.emit(rt.formatNeighborTable(x.data))
    out.emit(rt.formatNeighborTableAttrs(x.attrs))
}

export interface PrefixMessage {
    kind: 'prefix'
    data: rt.Prefix
    attrs: rt.PrefixAttrs
}

export function parsePrefixMessage(r: Buffer): PrefixMessage {
    if (r.length < rt.__LENGTH_Prefix)
        throw Error(`Unexpected Prefix message length (${r.length})`)
    const data = rt.parsePrefix(r.slice(0, rt.__LENGTH_Prefix))
    const attrs = rt.parsePrefixAttrs(r.slice(rt.__LENGTH_Prefix))
    return { kind: 'prefix', data, attrs }
}

export function formatPrefixMessage(x: PrefixMessage, out: AttrStream) {
    out.emit(rt.formatPrefix(x.data))
    out.emit(rt.formatPrefixAttrs(x.attrs))
}

export interface RouteMessage {
    kind: 'route'
    data: rt.Route
    attrs: rt.RouteAttrs
}

export function parseRouteMessage(r: Buffer): RouteMessage {
    if (r.length < rt.__LENGTH_Route)
        throw Error(`Unexpected Route message length (${r.length})`)
    const data = rt.parseRoute(r.slice(0, rt.__LENGTH_Route))
    const attrs = rt.parseRouteAttrs(r.slice(rt.__LENGTH_Route))
    return { kind: 'route', data, attrs }
}

export function formatRouteMessage(x: RouteMessage, out: AttrStream) {
    out.emit(rt.formatRoute(x.data))
    out.emit(rt.formatRouteAttrs(x.attrs))
}

export interface TcMessage {
    kind: 'tc'
    data: rt.Tc
    attrs: rt.TcAttrs
}

export function parseTcMessage(r: Buffer): TcMessage {
    if (r.length < rt.__LENGTH_Tc)
        throw Error(`Unexpected Tc message length (${r.length})`)
    const data = rt.parseTc(r.slice(0, rt.__LENGTH_Tc))
    const attrs = rt.parseTcAttrs(r.slice(rt.__LENGTH_Tc))
    return { kind: 'tc', data, attrs }
}

export function formatTcMessage(x: TcMessage, out: AttrStream) {
    out.emit(rt.formatTc(x.data))
    out.emit(rt.formatTcAttrs(x.attrs))
}

export interface TcActionMessage {
    kind: 'tcAction'
    data: rt.TcAction
}

export function parseTcActionMessage(r: Buffer): TcActionMessage {
    if (r.length !== rt.__LENGTH_TcAction)
        throw Error(`Unexpected TcAction message length (${r.length})`)
    const data = rt.parseTcAction(r.slice(0, rt.__LENGTH_TcAction))
    return { kind: 'tcAction', data }
}

export function formatTcActionMessage(x: TcActionMessage, out: AttrStream) {
    out.emit(rt.formatTcAction(x.data))
}

const parseFns: { [t in MessageType]?: (r: Buffer) => Message } = {
    [MessageType.NEWLINK]: parseLinkMessage,
    [MessageType.DELLINK]: parseLinkMessage,
    [MessageType.GETLINK]: parseLinkMessage,
    [MessageType.SETLINK]: parseLinkMessage,
    [MessageType.NEWADDR]: parseAddressMessage,
    [MessageType.DELADDR]: parseAddressMessage,
    [MessageType.GETADDR]: parseAddressMessage,
    [MessageType.NEWROUTE]: parseRouteMessage,
    [MessageType.DELROUTE]: parseRouteMessage,
    [MessageType.GETROUTE]: parseRouteMessage,
    [MessageType.NEWRULE]: parseRouteMessage,
    [MessageType.DELRULE]: parseRouteMessage,
    [MessageType.GETRULE]: parseRouteMessage,
    [MessageType.NEWNEIGH]: parseNeighborMessage,
    [MessageType.DELNEIGH]: parseNeighborMessage,
    [MessageType.GETNEIGH]: parseNeighborMessage,
    [MessageType.NEWQDISC]: parseTcMessage,
    [MessageType.DELQDISC]: parseTcMessage,
    [MessageType.GETQDISC]: parseTcMessage,
    [MessageType.NEWTCLASS]: parseTcMessage,
    [MessageType.DELTCLASS]: parseTcMessage,
    [MessageType.GETTCLASS]: parseTcMessage,
    [MessageType.NEWTFILTER]: parseTcMessage,
    [MessageType.DELTFILTER]: parseTcMessage,
    [MessageType.GETTFILTER]: parseTcMessage,
    [MessageType.NEWACTION]: parseTcActionMessage,
    [MessageType.DELACTION]: parseTcActionMessage,
    [MessageType.GETACTION]: parseTcActionMessage,
    [MessageType.NEWPREFIX]: parsePrefixMessage,
    [MessageType.NEWNEIGHTBL]: parseNeighborTableMessage,
    [MessageType.GETNEIGHTBL]: parseNeighborTableMessage,
    [MessageType.SETNEIGHTBL]: parseNeighborTableMessage,
    [MessageType.NEWNDUSEROPT]: parseNdUserOptionMessage,
}

export function parseMessage(t: MessageType, r: Buffer): Message {
    if (!{}.hasOwnProperty.call(parseFns, t))
        throw Error(`Unsupported message type ${t}`)
    return parseFns[t]!(r)
}

// Export rest of types
export * from './gen_structs'
