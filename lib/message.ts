/**
 * This module implements parsing / formatting routines for
 * Netlink messages and attributes.
 * 
 * **Important:** Netlink messages use the host endianness.
 * This module will serialize messages differently depending
 * on that.
 */
/** */

import { readU16, readU32, writeU16, writeU32 } from './util/buffer'

// Conventions for parsing:
//  - Methods accept exclusively Buffer named r
//  - Throw on error
//  - Return this type:
type ParseResult<T> = { x: T, consumed: number }

// Conventions for formatting:
//  - Methods that accept data:
//    accept Uint8Array | Uint8Array[] and return Uint8Array[]
//  - Methods that don't accept data, just return Buffer

/** Get the amount of padding (in bytes) to add after length */
export const padding = (x: number) => ((-x) & 3)
/** Like [[padding]] but returns a zero-filled buffer of that length */
export const getPadding = (x: number) => Buffer.alloc(padding(x))
/** Round the passed length up to align it */
export const align = (x: number) => x + padding(x)


// NETLINK HEADER
// --------------

/** Length of netlink headers */
export const HEADER_LENGTH = 16

/** Header for Netlink messages */
export interface NetlinkHeader {
    /** Message length, including header */
    length: number
    /** Message type */
    type: number
    /** Message flags */
    flags: number
    /** Sequence number */
    seq: number
    /** Port number (i.e. pid) that sends the message */
    port: number
}

/**
 * Parses a Netlink header
 * @param x Header data
 * @returns Parsed header
 * @throws If `x` doesn't match `HEADER_LENGTH`
 */
export function parseHeader(r: Buffer): ParseResult<NetlinkHeader> {
    if (r.length < HEADER_LENGTH)
        throw Error(`Invalid header length (${r.length})`)
    return { x: {
        length: readU32.call(r, 0),
        type: readU16.call(r, 4),
        flags: readU16.call(r, 6),
        seq: readU32.call(r, 8),
        port: readU32.call(r, 12),
    }, consumed: HEADER_LENGTH }
}

/**
 * Encodes a Netlink header
 * @param x Header data
 * @returns Serialized header
 */
export function formatHeader(x: NetlinkHeader): Buffer {
    const r = Buffer.alloc(HEADER_LENGTH)
    writeU32.call(r, x.length, 0)
    writeU16.call(r, x.type, 4)
    writeU16.call(r, x.flags, 6)
    writeU32.call(r, x.seq, 8)
    writeU32.call(r, x.port, 12)
    return r
}


// NETLINK MESSAGE
// ---------------

/** Combination of a valid [[NetlinkHeader]] with payload */
export interface NetlinkMessage {
    /** Message type */
    type: number
    /** Message flags */
    flags: number
    /** Sequence number */
    seq: number
    /** Port number (i.e. pid) that sends the message */
    port: number
    /** Message payload */
    data: Uint8Array | Uint8Array[]
}

export interface NetlinkMessage_Parsed extends NetlinkMessage {
    data: Buffer
}

export function formatMessage(x: NetlinkMessage): Uint8Array[] {
    let { data } = x
    data = (data instanceof Uint8Array) ? [data] : data.slice()

    let length = HEADER_LENGTH
    for (const x of data) length += x.length

    const header = formatHeader({ length, ...x })
    data.unshift(header)
    return data
}

export function parseMessage(r: Buffer): ParseResult<NetlinkMessage_Parsed> {
    console.log(r)
    const { length, type, flags, seq, port } = parseHeader(r).x
    if (r.length < length)
        throw Error(`Message too short (header length = ${length})`)
    const data = r.slice(HEADER_LENGTH)
    return {
        x: { type, flags, seq, port, data },
        consumed: length,
    }
}

/**
 * Calls [[parseMessage]] repeatedly, ignoring padding
 * between messages, until there's no data left (other than padding).
 *
 * @param x Message data
 * @retrns Array of parsed messages
 */
export function parseMessages(r: Buffer): NetlinkMessage_Parsed[] {
    const x: NetlinkMessage_Parsed[] = []
    while (r.length) {
        const { x: msg, consumed } = parseMessage(r)
        x.push(msg)
        r = r.slice(align(consumed))
    }
    return x
}


// ERROR MESSAGE
// -------------

interface NetlinkErrorMessage {
    errno: number
    code?: string
    header: NetlinkHeader
    tlvData?: Buffer
}

export function parseError(r: Buffer, flags: number): NetlinkErrorMessage {
    if (r.length < 4 + 16)
        throw Error('Invalid ERROR message length')
    let x: NetlinkErrorMessage = {
        errno: readU32.call(r, 0),
        header: parseHeader(r.slice(4)).x,
    }
    // FIXME: TLV?
    return x
}
