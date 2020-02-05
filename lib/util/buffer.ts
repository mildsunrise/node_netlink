/**
 * Reexports functions of Buffer.prototype that operate
 * in host endianness. Use them like this: `readU8.call(buffer, ...)`
 */
/** */

import { endianness } from 'os'

const isLE = endianness() === 'LE'
const __BP = Buffer.prototype

export const readF64 = isLE ? __BP.readDoubleLE : __BP.readDoubleBE
export const readF32 = isLE ? __BP.readFloatLE : __BP.readFloatBE
export const readU64 = isLE ? __BP.readBigUInt64LE : __BP.readBigUInt64BE
export const readS64 = isLE ? __BP.readBigInt64LE : __BP.readBigInt64BE
export const readU32 = isLE ? __BP.readUInt32LE : __BP.readUInt32BE
export const readS32 = isLE ? __BP.readInt32LE : __BP.readInt32BE
export const readU16 = isLE ? __BP.readUInt16LE : __BP.readUInt16BE
export const readS16 = isLE ? __BP.readInt16LE : __BP.readInt16BE
export const readU8 = __BP.readUInt8
export const readS8 = __BP.readInt8

export const writeF64 = isLE ? __BP.writeDoubleLE : __BP.writeDoubleBE
export const writeF32 = isLE ? __BP.writeFloatLE : __BP.writeFloatBE
export const writeU64 = isLE ? __BP.writeBigUInt64LE : __BP.writeBigUInt64BE
export const writeS64 = isLE ? __BP.writeBigInt64LE : __BP.writeBigInt64BE
export const writeU32 = isLE ? __BP.writeUInt32LE : __BP.writeUInt32BE
export const writeS32 = isLE ? __BP.writeInt32LE : __BP.writeInt32BE
export const writeU16 = isLE ? __BP.writeUInt16LE : __BP.writeUInt16BE
export const writeS16 = isLE ? __BP.writeInt16LE : __BP.writeInt16BE
export const writeU8 = __BP.writeUInt8
export const writeS8 = __BP.writeInt8
