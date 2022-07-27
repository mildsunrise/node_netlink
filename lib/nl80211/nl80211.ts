/**
 * Exposes the nl80211 interface on top of the Generic Protocol layer
 * @module
 */

import { EventEmitter } from 'events'

import { MessageInfo, RawNetlinkSocketOptions } from '../raw'
import { NetlinkSocket, NetlinkSocketOptions, NetlinkSendOptions, RequestOptions } from '../netlink'
import { Flags, FlagsGet } from '../constants'
import { NetlinkMessage, AttrStream } from '../structs'
import { Commands, Message, formatMessage, parseMessage } from './structs'
import { GenericNetlinkSocketOptions, GenericNetlinkSocket, GenericNetlinkSendOptions, createGenericNetlink } from '../genl/genl'
import { genl } from '..'

// Based on <linux/nl80211.h> at 14f34e3

export const NL80211_GENL_NAME = "nl80211"

export enum Nl80211MulticastGroups {
    CONFIG = "config",
    SCAN = "scan",
    REG = "regulatory",
    MLME = "mlme",
    VENDOR = "vendor",
    NAN = "nan",
    TESTMODE = "testmode",
}

export const NL80211_EDMG_BW_CONFIG_MIN = 4
export const NL80211_EDMG_BW_CONFIG_MAX = 15
export const NL80211_EDMG_CHANNELS_MIN = 1
export const NL80211_EDMG_CHANNELS_MAX = 0x3c /* 0b00111100 */

export const NL80211_WIPHY_NAME_MAXLEN = 64

export const NL80211_MAX_SUPP_RATES = 32
export const NL80211_MAX_SUPP_HT_RATES = 77
export const NL80211_MAX_SUPP_REG_RULES = 128
export const NL80211_TKIP_DATA_OFFSET_ENCR_KEY = 0
export const NL80211_TKIP_DATA_OFFSET_TX_MIC_KEY = 16
export const NL80211_TKIP_DATA_OFFSET_RX_MIC_KEY = 24
export const NL80211_HT_CAPABILITY_LEN = 26
export const NL80211_VHT_CAPABILITY_LEN = 12
export const NL80211_HE_MIN_CAPABILITY_LEN = 16
export const NL80211_HE_MAX_CAPABILITY_LEN = 54
export const NL80211_MAX_NR_CIPHER_SUITES = 5
export const NL80211_MAX_NR_AKM_SUITES = 2

export const NL80211_MIN_REMAIN_ON_CHANNEL_TIME = 10

/** default RSSI threshold for scan results if none specified. */
export const NL80211_SCAN_RSSI_THOLD_OFF = -300

export const NL80211_CQM_TXE_MAX_INTVL = 1800


export interface Nl80211SocketOptions {
}

export interface Nl80211SendOptions extends GenericNetlinkSendOptions {
}

export class Nl80211Socket extends EventEmitter {
    readonly socket: GenericNetlinkSocket
    private readonly familyId: number
    private readonly version: number

    constructor(socket: GenericNetlinkSocket, familyData: genl.Message, options?: Nl80211SocketOptions) {
        super()
        if (typeof familyData.familyId === 'undefined' || typeof familyData.version === 'undefined')
            throw Error('Invalid family data')
        this.familyId = familyData.familyId
        this.version = familyData.version
        this.socket = socket
        this.socket.on('message', this._receive.bind(this))
    }

    private _receive(omsg: NetlinkMessage[], rinfo: MessageInfo) {
        // TODO
    }

    send(
        cmd: Commands,
        msg: Message,
        options?: Nl80211SendOptions
    ) {
        const attrs = new AttrStream()
        attrs.emit(formatMessage(msg))
        return this.socket.send(this.familyId, cmd, this.version, attrs.bufs, options)
    }

    async request(
        cmd: Commands,
        msg?: Message,
        options?: Nl80211SendOptions & RequestOptions
    ): Promise<Message[]> {
        const attrs = new AttrStream()
        attrs.emit(formatMessage(msg || {}))
        // rinfo isn't very useful here; this is a kernel interface
        const [omsg, _] = await this.socket.request(
            this.familyId, cmd, this.version, attrs.bufs, options)
        return omsg.map(x => parseMessage(x.data))
    }

    async getPhys() {
        const parts = await this.request(
            Commands.GET_WIPHY, {}, { flags: FlagsGet.DUMP })
        const objs: Map<number, Message> = new Map()
        parts.forEach(part => {
            const key = part.wiphy
            if (typeof key === 'undefined')
                throw Error('Invalid message part -- no wiphy')
            if (!objs.has(key))
                return objs.set(key, part)
            const obj = objs.get(key)!
            Object.keys(part).forEach(field => {
                // FIXME: perform some consistency check?
                (obj as any)[field] = (part as any)[field]
            })
        })
        return objs
    }

    async getInterfaces() {
        const parts = await this.request(
            Commands.GET_INTERFACE, {}, { flags: FlagsGet.DUMP })
        const objs: Map<bigint, Message> = new Map()
        parts.forEach(part => {
            const key = part.wdev
            if (typeof key === 'undefined')
                throw Error('Invalid message part -- no wdev')
            if (!objs.has(key))
                return objs.set(key, part)
            const obj = objs.get(key)!
            Object.keys(part).forEach(field => {
                // FIXME: perform some consistency check?
                (obj as any)[field] = (part as any)[field]
            })
        })
        return objs
    }

    async newInterface(
        wiphy: Message['wiphy'],
        ifname: Message['ifname'],
        iftype: Message['iftype'],
        attrs?: Message,
        options?: Nl80211SendOptions & RequestOptions,
    ): Promise<Message & { ifindex: Message['ifindex'] }> {
        const parts = await this.request(
            Commands.NEW_INTERFACE, { ...attrs, wiphy, ifname, iftype })
        if (typeof parts[0]?.ifindex === 'undefined')
            throw Error('Invalid message -- no ifindex')
        return parts[0] as any
    }

    async delInterface(
        ifindex: Message['ifindex'],
        attrs?: Message,
        options?: Nl80211SendOptions & RequestOptions,
    ): Promise<void> {
        const parts = await this.request(
            Commands.DEL_INTERFACE, { ...attrs, ifindex })
    }
}

export async function createNl80211(
    options?: Nl80211SocketOptions & GenericNetlinkSocketOptions & NetlinkSocketOptions & RawNetlinkSocketOptions
): Promise<Nl80211Socket> {
    const socket = createGenericNetlink(options)
    // FIXME: do this correctly, check version, etc.
    const families = await socket.ctrlRequest(genl.Commands.GET_FAMILY, {}, { flags: FlagsGet.DUMP })
    const family = families.filter(x => x.familyName === NL80211_GENL_NAME)[0]
    if (typeof family === 'undefined')
        throw Error('nl80211 genl family not available')
    return new Nl80211Socket(socket, family, options)
}
