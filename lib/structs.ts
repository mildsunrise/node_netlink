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
import * as buf from './util/buffer'

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

/**
 * Object allowing efficient construction of an attribute stream.
 */
export class AttrStream {
    readonly bufs: Uint8Array[] = []
    private offset: number = 0
    private emit = (data: Uint8Array) =>
        (this.bufs.push(data), this.offset += data.length)
    push(type: number, data: Uint8Array | Uint8Array[] | ((out: this) => any)) {
        // Emit padding (make sure to start on aligned offset)
        const p = padding(this.offset)
        if (p) this.emit(Buffer.alloc(p))

        // Emit header
        const start = this.offset
        const header = Buffer.alloc(4)
        writeU16.call(header, (type & ((1 << 14) - 1)), 2)
        this.emit(header)

        // Emit data
        if (data instanceof Uint8Array || data instanceof Array) {
            (data instanceof Array) ? data.forEach(x => this.emit(x)) : this.emit(data)
        } else {
            data(this)
        }

        // Patch length in header
        const length = this.offset - start
        if (length <= 0x10000)
            throw Error(`Maximum attribute length exceeded (${length})`)
        writeU16.call(header, length, 0)
    }
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
 * Calls [[parseMessage]] repeatedly, supplying each result to
 * the passed callback and ignoring padding, until there's no
 * data left (other than padding).
 *
 * @param x Attributes stream data
 * @retrns Array of parsed messages
 */
export function parseAttributes(r: Buffer, fn: (item: NetlinkAttribute) => any) {
    while (r.length) {
        const { x: msg, consumed } = parseAttribute(r)
        fn(msg)
        r = r.slice(align(consumed))
    }
}

// Convenience value parsers / formatters

function checkLength(x: Buffer, n: number): Buffer {
    if (x.length === n) return x
    throw Error(`Unexpected length (got ${x.length}, expected ${n})`)
}
function callAt<T>(x: T, fn: (this: T, ...args: any[]) => any, ...args: any[]): T {
    fn.call(x, ...args)
    return x
}

export const getU8 = (x: Buffer): number => buf.readU8.call(checkLength(x, 1), 0)
export const putU8 = (x: number): Buffer => callAt(Buffer.alloc(1), buf.writeU8, x, 0)
export const getU16 = (x: Buffer): number => buf.readU16.call(checkLength(x, 2), 0)
export const putU16 = (x: number): Buffer => callAt(Buffer.alloc(2), buf.writeU16, x, 0)
export const getU32 = (x: Buffer): number => buf.readU32.call(checkLength(x, 4), 0)
export const putU32 = (x: number): Buffer => callAt(Buffer.alloc(4), buf.writeU32, x, 0)
export const getU64 = (x: Buffer): bigint => buf.readU64.call(checkLength(x, 8), 0)
export const putU64 = (x: bigint): Buffer => callAt(Buffer.alloc(8), buf.writeU64, x, 0)
export const getS8 = (x: Buffer): number => buf.readS8.call(checkLength(x, 1), 0)
export const putS8 = (x: number): Buffer => callAt(Buffer.alloc(1), buf.writeS8, x, 0)
export const getS16 = (x: Buffer): number => buf.readS16.call(checkLength(x, 2), 0)
export const putS16 = (x: number): Buffer => callAt(Buffer.alloc(2), buf.writeS16, x, 0)
export const getS32 = (x: Buffer): number => buf.readS32.call(checkLength(x, 4), 0)
export const putS32 = (x: number): Buffer => callAt(Buffer.alloc(4), buf.writeS32, x, 0)
export const getS64 = (x: Buffer): bigint => buf.readS64.call(checkLength(x, 8), 0)
export const putS64 = (x: bigint): Buffer => callAt(Buffer.alloc(8), buf.writeS64, x, 0)

export const getF32 = (x: Buffer): number => buf.readF32.call(checkLength(x, 4), 0)
export const putF32 = (x: number): Buffer => callAt(Buffer.alloc(4), buf.writeF32, x, 0)
export const getF64 = (x: Buffer): number => buf.readF64.call(checkLength(x, 8), 0)
export const putF64 = (x: number): Buffer => callAt(Buffer.alloc(8), buf.writeF64, x, 0)

export const getFlag = (x: Buffer): true => (checkLength(x, 0), true)
export const putFlag = (x: true): Buffer => Buffer.alloc(0)
export function getBool(x: Buffer): boolean {
    const b = getU8(x)
    if (b === 1 || b === 0) return Boolean(b)
    throw Error(`Expected 0 or 1, got ${b}`)
}
export const putBool = (x: boolean): Buffer => putU8(Number(x))

export function getString(x: Buffer, options?: { encoding?: BufferEncoding, maxLength: number }): string {
    if (options && options.maxLength && x.length > options.maxLength)
        throw Error(`Maximum length exceeded (max ${options.maxLength}, got ${x.length})`)
    if (x[x.length - 1] !== 0)
        throw Error('Not null terminated')
    return x.toString(options && options.encoding, 0, x.length - 1)
}
export function putString(x: string, options?: { encoding?: BufferEncoding, maxLength: number }): Buffer {
    const b = Buffer.alloc(Buffer.byteLength(x, options && options.encoding) + 1)
    if (options && options.maxLength && b.length > options.maxLength)
        throw Error(`Maximum length exceeded (max ${options.maxLength}, got ${b.length})`)
    b.write(x, options && options.encoding)
    return b
}

// Nested attribute parsers / formatters

function checkNO(x: NetlinkAttribute): NetlinkAttribute {
    if (!x.no) return x
    throw Error('Unexpected attribute with NO set')
}
export function getMap<T>(x: Buffer, fn: (item: Buffer) => T): Map<number, T> {
    const res: Map<number, T> = new Map()
    parseAttributes(x, item => res.set(item.type, fn(checkNO(item).data)))
    return res
}
export function getArray<T>(x: Buffer, fn: (item: Buffer) => T): T[] {
    const res: T[] = []
    parseAttributes(x, item => {
        if (item.type !== res.length + 1)
            throw Error(`Non-sequential array types (expected ${res.length + 1}, got ${item.type})`)
        res.push(fn(checkNO(item).data))
    })
    return res
}
export type AttributeResult = ArgsType<AttrStream['push']>[1]
export function putArray<T>(x: T[], fn: (item: T) => AttributeResult): AttributeResult {
    return out => x.forEach((item, n) => out.push(n + 1, fn(item)))
}
export function putMap<T>(x: Map<number, T>, fn: (item: T) => AttributeResult): AttributeResult {
    return out => x.forEach((item, n) => out.push(n, fn(item)))
}

// Object parsing

export interface BaseObject {
    __unparsed?: [number, Buffer][],
}
export function getObject<T extends BaseObject>(
    x: Buffer, fns: { [key: number]: (data: Buffer, obj: T) => any }
): T {
    let obj: T = {} as T
    let unparsed: BaseObject['__unparsed'] = []
    parseAttributes(x, item => {
        if ({}.hasOwnProperty.call(fns, item.type)) {
            fns[item.type](checkNO(item).data, obj)
        } else {
            obj.__unparsed?.push([ item.type, checkNO(item).data ])
        }
    })
    if (unparsed.length)
        obj.__unparsed = unparsed
    return obj
}
export function putObject<T extends BaseObject>(
    x: T, fns: { [key: string]: (data: AttrStream, obj: T) => any }
): AttributeResult {
    return out => {
        Object.keys(fns).forEach(key => {
            if ({}.hasOwnProperty.call(fns, key)) {
                fns[key](out, x)
            } else {
                throw Error(`Unknown key "${key}"`)
            }
        })
        if (x.__unparsed)
            x.__unparsed.forEach(([n, data]) => out.push(n, data))
    }
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
