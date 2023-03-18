export interface TypeStore {
    [key: string]: TypeDef
}

export interface TypeDef {
    /** Kind of type being declared (default: "attrs") */
    kind?: "attrs" | "struct" | "enum" | "flags"
    /** Original declaration name in headers */
    orig?: string
    /** Optional docs */
    docs?: string[]
    /** True if this is the type included in the message payload */
    root?: boolean
    /** For attrs and structs, the attributes */
    attrs?: AttributeDef[]
    /** For flags and enums, the list of values (for flags, specify bitmask as value) */
    values?: ValueDef[]
    /** For attrs, true if attribute indexes start at zero */
    zero?: boolean
}

export type AttributeDef = [ string, TypeExpr, AttributeOptions? ]

export interface AttributeOptions {
    /** Optional docs */
    docs?: string[]
    /** Type of enum / additional transform to do */
    type?: string | { kind: 'flags', type: string }
    /** For 'string' type, maximum payload length including null terminator */
    maxLength?: number
    /** Original constant name in headers */
    orig?: string
    /** The attribute may appear multiple times; save array instead of item */
    repeated?: boolean
    /** Struct fields only: if field is an array, its size */
    count?: number

    /**
     * Struct fields only. Specifying this for a field marks the struct as
     * an "expandable" struct, meaning that it can see new fields appended to
     * it in newer versions of the kernel. Because of this, the struct will
     * only be directly allowed inside length-delimited contexts, such as an
     * attribute, but not inside i.e. other structs.
     *
     * In particular, if a field has `abi` set to X, this means X is the first
     * kernel release for which this field was the last one in the struct.
     * If some release Y adds fields to the struct, those fields will be
     * incorporated to the type definition, and the lsat of them will be tagged
     * with `abi`. An expandable struct must always have `abi` on its last field.
     *
     * It must be a version in `A.B.C` format.
     */
    abi?: string
}

export interface ValueDef {
    value: number
    name: string
    docs?: string[]
    orig?: string
}

export type TypeExpr = string | { kind: 'array' | 'map' | 'flags', type: TypeExpr, zero?: boolean }

// Standard types
export const u8 = 'u8'
export const u16 = 'u16'
export const u32 = 'u32'
export const u64 = 'u64'
export const s8 = 's8'
export const s16 = 's16'
export const s32 = 's32'
export const s64 = 's64'
export const f32 = 'f32'
export const f64 = 'f64'
/** null-terminated string */
export const string = 'string'
/** boolean types */
export const bool = 'bool'
export const flag = 'flag'
/** binary data */
export const data = 'data'
/** derivate types */
export const array = (x: TypeExpr, opts?: { zero?: boolean }): TypeExpr => ({ kind: 'array', type: x, zero: opts?.zero })
export const map = (x: TypeExpr): TypeExpr => ({ kind: 'map', type: x })
export const asflags = (x: string): TypeExpr & { kind: 'flags', type: string } => ({ kind: 'flags', type: x })

// FIXME: support for restricting attributes
