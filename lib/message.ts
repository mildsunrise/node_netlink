/**
 * This module implements parsing / formatting routines for
 * Netlink and Generic Netlink structures.
 * 
 * **Important:** These structures use the host endianness.
 * This module will serialize messages differently depending
 * on that.
 */
/** */

import { readU16, readU32, writeU16, writeU32, readU8, writeU8 } from './util/buffer'

export const ensureArray = (x: Uint8Array | Uint8Array[]): Uint8Array[] =>
    (x instanceof Array) ? x : [x]
export function countLength(x: Uint8Array | Uint8Array[]): number {
    if (!(x instanceof Array)) return x.length
    let length = 0
    for (const r of x) length += r.length
    return length
}

/** Get the amount of padding (in bytes) to add after length */
export const padding = (x: number) => ((-x) & 3)
/** Like [[padding]] but returns a zero-filled buffer of that length */
export const getPadding = (x: number) => Buffer.alloc(padding(x))
/** Append necessary padding to data. THIS MODIFIES THE ORIGINAL ARRAY */
export function pad(x: Uint8Array[]) {
    const p = padding(countLength(x))
    if (p) x.push(Buffer.alloc(p))
    return x
}
/** Round the passed length up to align it */
export const align = (x: number) => x + padding(x)

// Conventions for parsing:
//  - Methods accept exclusively Buffer named r
//  - Throw on error
//  - Return this type:
type ParseResult<T> = { x: T, consumed: number }

// Conventions for formatting:
//  - Methods that accept data:
//    accept Uint8Array | Uint8Array[] and return Uint8Array[]
//  - Methods that don't accept data, just return Buffer


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
 * @throws If `x` contains less than `HEADER_LENGTH`
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
export interface NetlinkMessage_ {
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

/** Combination of a valid [[NetlinkHeader]] with payload */
export interface NetlinkMessage extends NetlinkMessage_ {
    data: Buffer
}

export function formatMessage(x: NetlinkMessage_): Uint8Array[] {
    const data = ensureArray(x.data)
    const length = HEADER_LENGTH + countLength(x.data)

    const header = formatHeader({ length, ...x })
    return [header as Uint8Array].concat(data)
}

export function parseMessage(r: Buffer): ParseResult<NetlinkMessage> {
    const { length, type, flags, seq, port } = parseHeader(r).x
    if (length < HEADER_LENGTH || r.length < length)
        throw Error(`Invalid header length (${length})`)
    const data = r.slice(HEADER_LENGTH, length)
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
export function parseMessages(r: Buffer): NetlinkMessage[] {
    const x: NetlinkMessage[] = []
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


// ATTRIBUTE
// ---------

/** Netlink attribute (TLV) */
export interface NetlinkAttribute_ {
    /** True if the payload carries nested attributes */
    nested?: boolean
    /** True if the payload is stored in network byte order */
    no?: boolean
    /** Attribute type (14 bits) */
    type: number
    /** Message payload */
    data: Uint8Array | Uint8Array[]
}

/** Netlink attribute (TLV) */
export interface NetlinkAttribute extends NetlinkAttribute_ {
    data: Buffer
}

export function formatAttribute(x: NetlinkAttribute_): Uint8Array[] {
    const data = ensureArray(x.data)
    const header = Buffer.alloc(4)
    let length = header.length + countLength(x.data)
    if (length <= 0x10000)
        throw Error('Maximum attribute length exceeded')

    const type = (x.type & ((1 << 14) - 1)) | (Number(!!x.nested) << 15) | (Number(!!x.no) << 14)
    writeU16.call(header, length, 0)
    writeU16.call(header, type, 2)
    return [header as Uint8Array].concat(data)
}

export function parseAttribute(r: Buffer): ParseResult<NetlinkAttribute> {
    if (r.length < 4)
        throw Error('Not enough data')
    const length = readU16.call(r, 0)
    const typeAndFlags = readU16.call(r, 2)
    const nested = Boolean(typeAndFlags & (1 << 15))
    const no = Boolean(typeAndFlags & (1 << 14))
    const type = typeAndFlags & ((1 << 14) - 1)
    if (length < 4 || r.length < length)
        throw Error(`Invalid attribute length (${length})`)
    const data = r.slice(4, length)
    return { x: { nested, no, type, data }, consumed: length }
}

/**
 * Calls [[parseMessage]] repeatedly, ignoring padding
 * between attributes, until there's no data left (other than padding).
 *
 * @param x Attributes stream data
 * @retrns Array of parsed messages
 */
export function parseAttributes(r: Buffer): NetlinkAttribute[] {
    const x: NetlinkAttribute[] = []
    while (r.length) {
        const { x: msg, consumed } = parseAttribute(r)
        x.push(msg)
        r = r.slice(align(consumed))
    }
    return x
}

/**
 * Like [[parseMessages]], but returns a map indexed by attribute
 * type. If there are many attributes of a certain type, the last
 * one will be returned.
 */
export const parseAttributeMap = (r: Buffer): Map<number, NetlinkAttribute> =>
    new Map(parseAttributes(r).map(x => [ x.type, x ]))

// Convenience attribute parsers / formatters
// (formatters return padded result for convenience)

function checkLength(x: NetlinkAttribute, n: number) {
    if (x.nested || x.no) throw Error('Not implemented yet')
    if (x.data.length !== n) throw Error('Unexpected length')
    return x.data
}
export const getAttrU8 = (x: NetlinkAttribute) => readU8.call(checkLength(x, 1), 0)
export const getAttrU16 = (x: NetlinkAttribute) => readU16.call(checkLength(x, 2), 0)
export const getAttrU32 = (x: NetlinkAttribute) => readU32.call(checkLength(x, 4), 0)
export function getAttrStr(x: NetlinkAttribute, encoding?: BufferEncoding): string {
    if (x.nested || x.no) throw Error('Not implemented yet')
    if (x.data[x.data.length-1] !== 0)
        throw Error('Not a null-terminated string')
    return x.data.toString(encoding, 0, x.data.length-1)
}

function applyBuffer(type: number, n: number, f: (r: Buffer) => any): Buffer {
    const data = Buffer.alloc(n)
    f(data)
    return Buffer.concat(pad(formatAttribute({ type, data })))
}
export const putAttrU8 = (type: number, x: number) => applyBuffer(type, 1, r => writeU8.call(r, x, 0))
export const putAttrU16 = (type: number, x: number) => applyBuffer(type, 1, r => writeU16.call(r, x, 0))
export const putAttrU32 = (type: number, x: number) => applyBuffer(type, 1, r => writeU32.call(r, x, 0))
export const putAttrStr = (type: number, x: string, encoding?: BufferEncoding) =>
    Buffer.concat(pad(formatAttribute({
        type, data: [ Buffer.from(x, encoding), Buffer.alloc(1) ]
    })))

function getAttrNested(x: NetlinkAttribute): Buffer {
    //if (!x.nested) throw Error('Expected nested data') // nested is not set in practice
    if (x.no) throw Error('Not implemented') 
    return x.data
}
const putAttrNested = (type: number, data: Uint8Array | Uint8Array[]) =>
    pad(formatAttribute({ type, data, nested: true }))

export const getAttrArray = (x: NetlinkAttribute): Buffer[] => parseAttributes(getAttrNested(x)).map((t, n) => {
    if (t.type !== n + 1)
        throw Error(`Item ${n} has unexpected type ${t.type}`)
    return getAttrNested(t)
})
export function putAttrArray(type: number, x: (Uint8Array|Uint8Array[])[]): Uint8Array[] {
    if (x.length >= (1 << 14))
        throw Error(`Maximum array length exceeded (${x.length})`)
    const data = x.map((t, n) => putAttrNested(n + 1, t))
    return putAttrNested(type, ([] as Uint8Array[]).concat(...data))
}


// NETLINK HEADER
// --------------

/** Length of generic netlink headers */
export const GENL_HEADER_LENGTH = 4

/** Header for Generic Netlink message payload */
export interface GenericNetlinkHeader {
    cmd: number
    version: number
    reserved?: number
}

/**
 * Parses a Generic Netlink header
 * @param x Header data
 * @returns Parsed header
 * @throws If `x` contains less than `GENL_HEADER_LENGTH`
 */
export function parseGenlHeader(r: Buffer): ParseResult<GenericNetlinkHeader> {
    if (r.length < GENL_HEADER_LENGTH)
        throw Error(`Invalid header length (${r.length})`)
    return { x: {
        cmd: readU8.call(r, 0),
        version: readU8.call(r, 1),
        reserved: readU16.call(r, 2),
    }, consumed: GENL_HEADER_LENGTH }
}

/**
 * Encodes a Generic Netlink header
 * @param x Header data
 * @returns Serialized header
 */
export function formatGenlHeader(x: GenericNetlinkHeader): Buffer {
    const r = Buffer.alloc(HEADER_LENGTH)
    writeU8.call(r, x.cmd, 0)
    writeU8.call(r, x.version, 1)
    writeU16.call(r, x.reserved || 0, 2)
    return r
}
