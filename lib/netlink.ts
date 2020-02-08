/**
 * This module implements the higher layer, which wraps [[RawNetlinkSocket]]
 * and lets the user send / receive parsed Netlink messages, rather than
 * raw data. It can also take care of things like requests & ACKs,
 * sequence numbers, multipart message handling, attribute parsing.
 */
/** */

import { EventEmitter } from 'events'
import * as util from 'util'
const { getSystemErrorName } = (util as any) // FIXME?

import { RawNetlinkSocket,
         RawNetlinkSocketOptions,
         RawNetlinkSendOptions, 
         MessageInfo } from './raw'
import { FLAGS, FLAGS_ACK, TYPES } from './constants'
import { parseMessages, formatMessage, NetlinkMessage, parseError } from './structs'

export interface NetlinkSocketOptions {
}

export interface NetlinkSendOptions extends RawNetlinkSendOptions {
    /**
     * Message flags (default: 0, i.e. no flags)
     */
    flags?: number
    /**
     * Sequence number (default: generated with [[generateSeq]])
     */
    seq?: number
    /**
     * Local port included in message header (default: socket address)
     */
    localPort?: number
}

export interface SendRequestOptions {
    /** Timeout in ms (default: no timeout) */
    timeout?: number
    /** Whether to reject the promise on ERROR message (default: true) */
    checkError?: boolean
}

/**
 * TODO
 * 
 * This socket silently discards invalid messages (see `invalid` event).
 */
export class NetlinkSocket extends EventEmitter {
    readonly socket: RawNetlinkSocket
    seq: number = 1

    constructor(socket: RawNetlinkSocket, options?: NetlinkSocketOptions) {
        super()
        this.socket = socket
        this.socket.on('message', this._receive.bind(this))
    }

    private _receive(msg: Buffer, rinfo: MessageInfo) {
        let msgs
        try {
            msgs = parseMessages(msg)
        } catch (e) {
            return this.emit('invalid', e, msg, rinfo)
        }
        msgs.forEach(x => this.emit('message', x, rinfo))
    }

    generateSeq() {
        // FIXME: how does libnl generate / check seq?
        const r = this.seq
        this.seq = this.seq % 0xFFFFFFFF + 1
        return r
    }

    send(
        type: number,
        data: Uint8Array | Uint8Array[],
        options?: NetlinkSendOptions,
        callback?: (error?: Error) => any,
    ): number {
        let seq = options && options.seq
        if (typeof seq === 'undefined')
            seq = this.generateSeq()
        const flags = Number(options && options.flags)
        let port = options && options.localPort
        if (typeof port === 'undefined')
            port = this.socket.address().port

        data = formatMessage({ type, flags, seq, port, data })
        this.socket.send(data, options, callback)
        return seq
    }

    /**
     * Sends a message with the REQUEST and ACK flags set,
     * and waits for a reply for the same sequence number.
     * 
     * Note that this method doesn't check the origin of
     * the reply, you should do that yourself.
     * 
     * @param type Message type
     * @param data Message payload
     * @param options Options
     * @returns Promise that resolves with `[msg, rinfo]` of
     * the received message. The promise rejects if the message
     * coudln't be sent or if the timeout expires.
     */
    sendRequest(
        type: number,
        data: Uint8Array | Uint8Array[],
        options?: NetlinkSendOptions & SendRequestOptions
    ): Promise<[NetlinkMessage, MessageInfo]> {
        const x: Promise<[NetlinkMessage, MessageInfo]> = new Promise((resolve, reject) => {
            const timeoutFn = () => {
                reject(Error('Timeout has been reached'))
                this.removeListener('message', msgListener)
            }
            const msgListener = (msg: NetlinkMessage, rinfo: MessageInfo) => {
                if (msg.flags & FLAGS.REQUEST) return
                if (msg.seq !== seq) return
                resolve([msg, rinfo])
                this.removeListener('message', msgListener)
            }
            const flags = Number(options && options.flags) | FLAGS.REQUEST | FLAGS.ACK
            const seq = this.send(type, data, { ...options, flags }, error => {
                if (error) {
                    reject(error)
                    this.removeListener('message', msgListener)
                } else if (options && options.timeout) {
                    setTimeout(timeoutFn, options && options.timeout)
                }
            })
            this.on('message', msgListener)
        })
        return (options && options.checkError === false) ? x :
            x.then(x => (checkError(x[0]), x))
    }

    // FIXME: reexpose rest of API
}

export function checkError(x: NetlinkMessage) {
    if (x.type !== TYPES.ERROR) return
    const { errno } = parseError(x.data, x.flags)
    if (errno === 0) return true

    let code = errno.toString()
    try {
        code = getSystemErrorName(errno)
    } catch (e) {}
    throw Error(`Request rejected: ${code}`) // FIXME: do this correctly
}

export function createNetlink(
    protocol: number,
    options?: NetlinkSocketOptions & RawNetlinkSocketOptions
): NetlinkSocket {
    const socket = new RawNetlinkSocket(protocol, options)
    return new NetlinkSocket(socket, options)
}
