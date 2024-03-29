/**
 * This module implements the higher layer, which wraps {@link RawNetlinkSocket}
 * and lets the user send / receive parsed Netlink messages, rather than
 * raw data. It can also take care of things like requests & ACKs,
 * sequence numbers, multipart message handling, attribute parsing.
 * @module
 */

import { EventEmitter } from 'events'
import * as util from 'util'
const { getSystemErrorName } = (util as any) // FIXME?

import { RawNetlinkSocket,
         RawNetlinkSocketOptions,
         RawNetlinkSendOptions,
         MessageInfo,
         ErrnoException } from './raw'
import { Flags, FlagsAck, MessageType } from './constants'
import { parseMessages, formatMessage, NetlinkMessage, parseError, NetlinkMessage_ } from './structs'

export interface NetlinkSocketOptions {
    /**
     * If true, the event loop will not exit while the socket is
     * is open (default: false). You should set this to true if
     * you need to listen for notifications. See the {@link NetlinkSocket.ref} method.
     */
    ref?: boolean
}

export interface NetlinkSendOptions extends RawNetlinkSendOptions {
    /**
     * Message flags (default: 0, i.e. no flags)
     */
    flags?: number
    /**
     * Sequence number (default: generated with {@link NetlinkSocket.generateSeq})
     */
    seq?: number
    /**
     * Local port included in message header (default: socket address)
     */
    localPort?: number
}

export interface RequestOptions {
    /** Timeout in ms (default: no timeout) */
    timeout?: number
    /** Whether to reject the promise on ERROR message (default: true) */
    checkError?: boolean
}

interface EventMap {
    invalid(err: any, msg: Buffer | NetlinkMessage[], rinfo: MessageInfo): void
    message(msg: NetlinkMessage[], rinfo: MessageInfo): void
    // re-exposed from RawNetlinkSocket
    truncatedMessage(msg: Buffer, rinfo: MessageInfo): void
    error(err: ErrnoException): void
    close(): void
}

/**
 * TODO
 *
 * This socket silently discards invalid messages (see `invalid` event).
 * FIXME: cork / uncork api
 * FIXME: debug option, common for all sockets
 */
export class NetlinkSocket extends EventEmitter {
    // copy-pasted code for type-safe events
    emit<E extends keyof EventMap>(event: E, ...args: Parameters<EventMap[E]>) { return super.emit(event, ...args) }
    on<E extends keyof EventMap>(event: E, listener: EventMap[E]) { return super.on(event, listener) }
    once<E extends keyof EventMap>(event: E, listener: EventMap[E]) { return super.once(event, listener) }
    off<E extends keyof EventMap>(event: E, listener: EventMap[E]) { return super.off(event, listener) }
    addListener<E extends keyof EventMap>(event: E, listener: EventMap[E]) { return super.addListener(event, listener) }
    removeListener<E extends keyof EventMap>(event: E, listener: EventMap[E]) { return super.removeListener(event, listener) }

    readonly socket: RawNetlinkSocket
    seq: number = 1
    protected referenced: boolean = false
    protected requests: Map<number, (err: Error|null, msg?: NetlinkMessage[], rinfo?: MessageInfo) => any> = new Map()
    protected multipartMessage?: NetlinkMessage[]

    constructor(socket: RawNetlinkSocket, options?: NetlinkSocketOptions) {
        super()
        this.socket = socket
        this.socket.on('message', this._receive.bind(this))
        this.ref(!!(options && options.ref))
        // re-emit events
        this.socket.on('close', (...args) => this.emit('close', ...args))
        this.socket.on('error', (...args) => this.emit('error', ...args))
        this.socket.on('truncatedMessage', (...args) => this.emit('truncatedMessage', ...args))
    }

    private _receive(msg: Buffer, rinfo: MessageInfo) {
        let msgs
        try {
            msgs = parseMessages(msg)
        } catch (e) {
            return this.emit('invalid', e, msg, rinfo)
        }
        this.handleMessages(msgs, rinfo)
    }

    /**
     * Handles zero or more messages received over the socket,
     * doing multipart grouping and calling {@link emitMessage} as
     * appropriate.
     */
    protected handleMessages(msgs: NetlinkMessage[], rinfo: MessageInfo) {
        // FIXME: do actual sequence checking, etc
        msgs.forEach(msg => {
            // We do NOT check for the MULTI flag, since
            // apparently some broken kernels don't set it on DONE
            if (msg.type === MessageType.DONE) {
                // DONE can be the only message in a multipart message
                const parts = this.multipartMessage || []
                delete this.multipartMessage
                parts.push(msg)
                this.emitMessage(parts, rinfo)
                return
            }
            if (this.multipartMessage) {
                if (msg.flags & Flags.MULTI && msg.seq === this.multipartMessage[0].seq)
                    return this.multipartMessage.push(msg)
                const parts = this.multipartMessage
                delete this.multipartMessage
                this.emitMessage(parts, rinfo)
            }
            if (msg.flags & Flags.MULTI) {
                this.multipartMessage = [msg]
                return
            }
            this.emitMessage(msg, rinfo)
        })
    }

    /**
     * Close the Netlink socket. After this, all other methods
     * can no longer be called. Messages pending to be sent
     * will be discarded, and its completion callback won't be
     * called.
     */
    close() {
        return this.socket.close()
    }

    /**
     * Return the address this socket is currently bound at.
     *
     * @returns Local address
     */
    address() {
        return this.socket.address()
    }

    /**
     * Generate a unique sequence number to use in a message
     */
    generateSeq() {
        // FIXME: how does libnl generate / check seq?
        //while (this.requests.has(this.seq))
        //    this.seq = this.seq % 0xFFFFFFFF + 1
        const r = this.seq
        this.seq = this.seq % 0xFFFFFFFF + 1
        return r
    }

    /**
     * Send a Netlink message over the socket, addressed as
     * the options indicate. By default, the sequence number
     * and port will be filled automatically.
     *
     * @param type Message type
     * @param data Message payload
     * @param options Message send options
     * @param callback Callback will be called after
     * the message has been sent (or failed to be sent)
     *
     * @returns The sequence number of the sent message
     */
    send(
        type: number,
        data: Uint8Array | Uint8Array[],
        options?: NetlinkSendOptions,
        callback?: (error?: ErrnoException) => void,
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
     * An array of mesages is returned. This will contain
     * many items for multipart messages, zero if an ACK
     * is received (and `checkError` isn't disabled) and
     * one for other messages.
     *
     * @param type Message type
     * @param data Message payload
     * @param options Options
     * @returns Promise that resolves with `[msg, rinfo]` of
     * the received message. The promise rejects if the message
     * coudln't be sent or if the timeout expires. If
     * `checkError` isn't disabled, the promise will also
     * reject if an ERROR message is received.
     */
    request(
        type: number,
        data: Uint8Array | Uint8Array[],
        options?: NetlinkSendOptions & RequestOptions
    ): Promise<[NetlinkMessage[], MessageInfo]> {
        const flags = Number(options && options.flags) | Flags.REQUEST | Flags.ACK
        let seq: number
        let timeout: NodeJS.Timeout
        let x: Promise<[NetlinkMessage[], MessageInfo]> = new Promise((resolve, reject) => {
            seq = this.makeRef(this.send(type, data, { ...options, flags }, error => {
                error && reject(error)
            }), (err, msg, rinfo) => {
                err ? reject(err) : resolve([msg!, rinfo!])
            })
            if (options && options.timeout) {
                timeout = setTimeout(() => reject(Error('Timeout has been reached')), options.timeout)
            }
        })
        x = x.finally(() => (typeof timeout !== 'undefined') && clearTimeout(timeout))
        x = x.finally(() => (typeof seq !== 'undefined') && this.dropRef(seq))
        return (options && options.checkError === false) ? x :
            x.then(x => (x[0].length && !checkError(x[0][0])) ? x : [[], x[1]])
    }

    /**
     * If true is passed, the socket will be kept referenced
     * (preventing the event loop from exiting) even when there
     * are no pending messages. Otherwise, the socket will be
     * dereferenced when there are no pending messages.
     *
     * @param ref Socket ref state
     */
    ref(ref?: boolean) {
        this.referenced = ref !== false
        if (!this.requests.size) {
            this.referenced ? this.socket.ref() : this.socket.unref()
        }
    }

    protected makeRef(seq: number, callback: (err: Error|null, msg?: NetlinkMessage[], rinfo?: MessageInfo) => void) {
        if (!this.referenced && !this.requests.size)
            this.socket.ref()
        if (this.requests.has(seq))
            throw Error('Sequence number is already being waited for')
        this.requests.set(seq, callback)
        return seq
    }

    /**
     * This method must, if the message is multipart, separate the
     * last DONE message from the rest (if there's no DONE message
     * this is considered an error).
     *
     * Then, if the message is a reply and its sequence number has an
     * associated (i.e. request) callback, call it.
     * Otherwise, a 'message' or 'invalid' event is emitted.
     *
     * @param msg Single message object, or array of messages for
     * multipart messages.
     */
    protected emitMessage(msg: NetlinkMessage | NetlinkMessage[], rinfo: MessageInfo) {
        const first = (msg instanceof Array) ? msg[0] : msg
        // If message is multipart, check and remove last DONE message, otherwise turn into array
        let err = null
        if (msg instanceof Array) {
            if (msg[msg.length - 1].type !== MessageType.DONE) {
                err = Error('Multipart message not terminated properly')
            } else {
                msg = msg.slice(0, msg.length - 1)
            }
        } else {
            msg = [msg]
        }

        // Lookup & call appropriate callback
        const cb = this.requests.get(first.seq)
        if (!(first.flags & Flags.REQUEST) && cb) {
            return cb(err, msg, rinfo)
        }

        // No associated callback, emit event
        if (err) {
            this.emit('invalid', err, msg, rinfo)
        } else {
            this.emit('message', msg, rinfo)
        }
    }

    protected dropRef(seq: number) {
        if (!this.requests.has(seq))
            throw Error('Should never happen')
        this.requests.delete(seq)
        if (!this.referenced && !this.requests.size)
            this.socket.unref()
    }

    /** Equivalent to `socket.ref(false)`, see {@link ref} */
    unref() {
        return this.ref(false)
    }


    // RE-EXPOSED API

    /** Joins the specified multicast group */
    addMembership(group: number) {
        return this.socket.addMembership(group)
    }

    /** Leaves the specified multicast group */
    dropMembership(group: number) {
        return this.socket.dropMembership(group)
    }

    /** Returns the `SO_RCVBUF` socket receive buffer size in bytes */
    getRecvBufferSize(): number {
        return this.socket.getRecvBufferSize()
    }

    /** Returns the `SO_SNDBUF` socket send buffer size in bytes */
    getSendBufferSize(): number {
        return this.socket.getSendBufferSize()
    }

    /** Sets the `SO_RCVBUF` socket option. Sets the maximum socket receive buffer in bytes. */
    setRecvBufferSize(size: number) {
        return this.socket.setRecvBufferSize(size)
    }

    /** Sets the `SO_SNDBUF` socket option. Sets the maximum socket send buffer in bytes. */
    setSendBufferSize(size: number) {
        return this.socket.setSendBufferSize(size)
    }
}

/**
 * Checks if the passed message is an ERROR message.
 * If it is, an error will be thrown. If it's an ACK
 * (aka error = 0) then `true` is returned. Otherwise
 * nothing is returned.
 *
 * @param x Message to check
 */
export function checkError(x: NetlinkMessage) {
    if (x.type !== MessageType.ERROR) return
    const { errno } = parseError(x.data, x.flags)
    if (errno === 0) return true

    let code = errno.toString()
    try {
        code = getSystemErrorName(errno)
    } catch (e) {}
    // FIXME: do this correctly
    throw Error(`Request rejected: ${code}`)
}

export function createNetlink(
    protocol: number,
    options?: NetlinkSocketOptions & RawNetlinkSocketOptions
): NetlinkSocket {
    const socket = new RawNetlinkSocket(protocol, options)
    return new NetlinkSocket(socket, options)
}
