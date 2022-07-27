/**
 * Exposes the WireGuard interface on top of the Generic Protocol layer
 * @module
 */

import { EventEmitter } from 'events'

import { MessageInfo, RawNetlinkSocketOptions } from '../raw'
import { NetlinkSocket, NetlinkSocketOptions, NetlinkSendOptions, RequestOptions } from '../netlink'
import { Flags, FlagsGet } from '../constants'
import { NetlinkMessage, AttrStream } from '../structs'
import { Commands, Device, formatDevice, parseDevice } from './structs'
import { GenericNetlinkSocketOptions, GenericNetlinkSocket, GenericNetlinkSendOptions, createGenericNetlink } from '../genl/genl'
import { genl } from '..'

// Based on <linux/wireguard.h> at a2ec8b5

export const WG_GENL_NAME = "wireguard"
export const WG_GENL_VERSION = 1

export const WG_KEY_LEN = 32


export interface WireGuardSocketOptions {
}

export interface WireGuardSendOptions extends GenericNetlinkSendOptions {
}

function setIface(device: Device, iface: number | string): Device {
    device = { ...device }
    delete device.ifname
    delete device.ifindex
    if (typeof iface === 'number')
        device.ifindex = iface
    else if (typeof iface === 'string')
        device.ifname = iface
    else
        throw Error('interface must be ifindex (number) or name (string)')
    return device
}

export class WireGuardSocket extends EventEmitter {
    readonly socket: GenericNetlinkSocket
    private readonly familyId: number

    constructor(socket: GenericNetlinkSocket, familyData: genl.Message, options?: WireGuardSocketOptions) {
        super()
        if (typeof familyData.familyId === 'undefined' || typeof familyData.version === 'undefined')
            throw Error('Invalid family data')
        this.familyId = familyData.familyId
        this.socket = socket
        this.socket.on('message', this._receive.bind(this))
    }

    private _receive(omsg: NetlinkMessage[], rinfo: MessageInfo) {
        // TODO
    }

    send(
        cmd: Commands,
        msg: Device,
        options?: WireGuardSendOptions
    ) {
        const attrs = new AttrStream()
        attrs.emit(formatDevice(msg))
        return this.socket.send(this.familyId, cmd, WG_GENL_VERSION, attrs.bufs, options)
    }

    async request(
        cmd: Commands,
        msg?: Device,
        options?: WireGuardSendOptions & RequestOptions
    ): Promise<Device[]> {
        const attrs = new AttrStream()
        attrs.emit(formatDevice(msg || {}))
        // rinfo isn't very useful here; this is a kernel interface
        const [omsg, _] = await this.socket.request(
            this.familyId, cmd, WG_GENL_VERSION, attrs.bufs, options)
        return omsg.map(x => parseDevice(x.data))
    }

    /** gets a wireguard interface */
    getDevice(
        iface: number | string,
        options?: WireGuardSendOptions & RequestOptions
    ): Promise<Device[]> {
        options = { ...options, flags: Number(options?.flags) | FlagsGet.DUMP }
        return this.request(Commands.GET_DEVICE, setIface({}, iface), options)
    }

    /** sets a wireguard interface */
    async setDevice(
        iface: number | string,
        msg: Device,
        options?: WireGuardSendOptions & RequestOptions
    ): Promise<Device[]> {
        return this.request(Commands.SET_DEVICE, setIface(msg, iface), options)
    }
}

export async function createWireGuard(
    options?: WireGuardSocketOptions & GenericNetlinkSocketOptions & NetlinkSocketOptions & RawNetlinkSocketOptions
): Promise<WireGuardSocket> {
    const socket = createGenericNetlink(options)
    // FIXME: do this correctly, check version, etc.
    const families = await socket.ctrlRequest(genl.Commands.GET_FAMILY, {}, { flags: FlagsGet.DUMP })
    const family = families.filter(x => x.familyName === WG_GENL_NAME)[0]
    if (typeof family === 'undefined')
        throw Error('wireguard genl family not available')
    return new WireGuardSocket(socket, family, options)
}
