/**
 * This tool generates typings and parser / formatter functions
 * from a definitions file.
 */

import { TypeStore, TypeDef, TypeExpr, AttributeOptions } from '../types/_base'
import { dirname } from 'path'
import { runInNewContext } from 'vm'
import * as ts from "typescript"
import { readFileSync, writeFileSync } from 'fs'

function loadTypesFile(filename: string): TypeStore {
    const source = readFileSync(filename, 'utf8')
    const compiled = ts.transpileModule(source, { compilerOptions: {
        module: ts.ModuleKind.CommonJS, strict: true, strictNullChecks: true, noImplicitAny: true }})

    // FIXME: do this properly
    const sandbox: any = {}
    for (let k in global) sandbox[k] = (global as any)[k]
    sandbox.require = (x: any) => {
        if (x === './_base') return require('../types/_base')
        return require(x)
    }
    sandbox.exports = module.exports
    sandbox.__filename = filename
    sandbox.__dirname = dirname(filename)
    sandbox.module = module
    sandbox.global = sandbox
    //sandbox.root = root

    return runInNewContext(compiled.outputText, sandbox, { filename })
}


// Code-generation utilities

const indent = (x: string): string => x.split('\n').map(l => '    ' + l).join('\n')

/** Block of statements returning something */
interface TSBlock { kind: 'function', body(x: string): string }
/** Expression over another expression */
interface TSExpression { kind: 'expr', body(expr: string): string }
/** Expression over a variable name */
interface TSVarExpression { kind: 'varexpr', body(name: string): string }
/** Function call */
interface TSFunctionCall { kind: 'call', expr: string }

/** Produces code for a single-parameter (untyped) arrow function that does expr */
function genArrowFunction(expr: TSBlock | TSExpression | TSVarExpression | TSFunctionCall, x: string) {
    if (expr.kind === 'call') return expr.expr
    if (expr.kind === 'expr' || expr.kind === 'varexpr') return x + ' => ' + expr.body(x)
    if (expr.kind === 'function') return x + ' => {\n' + indent(expr.body(x)) + '\n}'
}
/** Produces code that performs expr inline over a variable / expression */
function genVarInlineCode(expr: TSExpression | TSVarExpression | TSFunctionCall, x: string) {
    if (expr.kind === 'call') return expr.expr + '(' + x + ')'
    if (expr.kind === 'expr' || expr.kind === 'varexpr') return expr.body(x)
}
function genInlineCode(expr: TSExpression | TSFunctionCall, x: string) {
    if (expr.kind === 'call') return expr.expr + '(' + x + ')'
    if (expr.kind === 'expr') return expr.body(x)
}

const genDocstring = (content: string, block?: boolean) => {
    const lines = content.split('\n')
    if (lines.length == 1 && !block) return `/** ${lines[0]} */`
    return '/**\n' + lines.map(x => (' * ' + x).trimRight()).join('\n') + '\n */'
}
const withDocstring = (docs: string | undefined, x: string) => (docs ? genDocstring(docs) + '\n' : '') + x
const genFunction = (name: string, args: string, ret: string, body: string, docs?: string) =>
    withDocstring(docs, `export function ${name}(${args})${ret ? ': ' + ret : ''} {\n${indent(body)}\n}`)
interface TSField { name: string, type: string, docs?: string }
const genField = (x: TSField) => withDocstring(x.docs, `${x.name}?: ${x.type}`)
const genInterface = (name: string, fields: TSField[], docs?: string) =>
    withDocstring(docs, `export interface ${name} {\n${indent(fields.map(genField).join('\n\n'))}\n}`)


// Main code

const args = process.argv.slice(2)
if (args.length !== 2) {
    console.error(`Usage: ${process.argv[1]} <types.ts> <output.ts>`)
    process.exit(1)
}
const filename = args[0]
const outFilename = args[1]
const types = loadTypesFile(filename)
initialValidation(types)
const blocks: { [key:string]: string } = {}
const enumFlagsNeeded: Set<string> = new Set()
const enumAttrFlagsNeeded: Set<string> = new Set()
for (const name of Object.keys(types)) {
    const type = types[name]
    if (type.kind === 'flags')
        blocks[name] = processFlags(name, type)
    if (!type.kind || type.kind === 'attrs')
        blocks[name] = processAttr(name, type)
}
// Enums have no dependencies, so we can process them the last
for (const name of Object.keys(types)) {
    const type = types[name]
    if (type.kind === 'enum')
        blocks[name] = processEnum(name, type, enumFlagsNeeded.has(name), enumAttrFlagsNeeded.has(name))
}
const pre = [
    "import { BaseObject, StreamData } from '../structs'",
    "import * as structs from '../structs'",
].join('\n') + '\n\n'
const output = pre + Object.keys(types).map(k => blocks[k]).join('\n\n') + '\n'
writeFileSync(outFilename, output)

// FIXME: warn if 64-bit on flags (enum should be safe)
// FIXME: remember to set bigint on 64-bit
// FIXME: missing things on types: replace refs in docs & convert types to array & unknown type -> null


// Actual processing

function toCamelCase(x: string) {
    const m = /^(_*)(.+)$/.exec(x)!
    const words = m[2].toLowerCase().split('_')
    return m[1] + words[0] + words.slice(1).map(x => x[0].toUpperCase() + x.substr(1)).join('')
}
function getFlagName(x: string) {
    return `${x}Set`
}

type TypeResult = { type: null | string, parse: (x: string) => string, format: (x: string) => string }

function processLower(lower?: AttributeOptions['type']): TypeResult {
    if (!lower) return { type: null, parse: x => x, format: x => x }
    if (typeof lower === 'string') {
        const type = types[lower]
        if (!{}.hasOwnProperty.call(types, lower) || (type.kind !== 'enum' && type.kind !== 'flags'))
            throw Error(`Incorrect type ${lower} specified as lower type`)
        if (type.kind === 'flags')
            return { type: lower, parse: x => `parse${lower}(${x})`, format: x => `format${lower}(${x})` }
        return { type: `${lower} | keyof typeof ${lower}`, parse: x => `structs.getEnum(${lower}, ${x})`, format: x => `structs.putEnum(${lower}, ${x})` }
    }
    if (lower.kind === 'flags') {
        const type = types[lower.type]
        if (!{}.hasOwnProperty.call(types, lower.type) || (type.kind !== 'enum'))
            throw Error(`Incorrect type ${lower} specified as lower type`)
        enumFlagsNeeded.add(lower.type)
        const name = getFlagName(lower.type)
        return { type: name, parse: x => `parse${name}(${x})`, format: x => `format${name}(${x})` }
    }
    throw Error(`Unknown lower type: ${lower}`)
}

function processType(t: TypeExpr, lower?: AttributeOptions['type']): TypeResult {
    if (typeof t === 'string') {
        if (/^[su](8|16|32|64)$/.test(t)) {
            const { type, parse, format } = processLower(lower)
            const tname = t[0].toUpperCase() + t.substr(1)
            return { type: type || (/^[su]64$/.test(t) ? 'bigint' : 'number'),
                parse: x => parse(`structs.get${tname}(${x})`),
                format: x => `structs.put${tname}(${format(x)})` }
        } else if (t === 'data') {
            if (lower) console.warn(`Warning: Ignoring ${lower} since it's over data`)
            return { type: 'Buffer', parse: x => x, format: x => x }
        } else if (t === 'string' || t === 'flag' || t === 'bool') {
            const tname = t[0].toUpperCase() + t.substr(1)
            if (lower) throw Error(`Lower type ${lower} specified over ${t}`)
            return { type: { string: 'string', flag: 'true', bool: 'boolean' }[t],
                parse: x => `structs.get${tname}(${x})`,
                format: x => `structs.put${tname}(${x})` }
        } else if ({}.hasOwnProperty.call(types, t)) {
            const type = types[t]
            if (lower) throw Error(`Lower type ${lower} specified over attr type`)
            if (type.kind && type.kind !== 'attrs')
                throw Error(`Invalid type ${t} specified as attr type`)
            return { type: t, parse: x => `parse${t}(${x})`, format: x => `format${t}(${x})` }
        }
    } else {
        if (t.kind === 'flags') {
            if (lower) throw Error(`Lower type ${lower} specified over flag attrs`)
            if (typeof t.type !== 'string')
                throw Error(`toflags() must be passed an enum type, not ${t.type}`)
            const type = types[t.type]
            if (!{}.hasOwnProperty.call(types, t.type) || (type.kind !== 'enum'))
                throw Error(`toflags() must be passed an enum type, not ${t.type}`)
            enumAttrFlagsNeeded.add(t.type)
            const name = getFlagName(t.type)
            return { type: name, parse: x => `parse${name}Attr(${x})`, format: x => `format${name}Attr(${x})` }
        } else if (t.kind === 'array') {
            const { type, parse, format } = processType(t.type, lower)
            const opts = t.zero ? `, { zero: true }` : ''
            return { type: `${type}[]`,
                parse: x => `structs.getArray(${x}, x => ${parse('x')}${opts})`,
                format: x => `structs.putArray(${x}, x => ${format('x')}${opts})` }
        } else if (t.kind === 'map') {
            const { type, parse, format } = processType(t.type, lower)
            return { type: `Map<number, ${type}>`,
                parse: x => `structs.getMap(${x}, x => ${parse('x')})`,
                format: x => `structs.putMap(${x}, x => ${format('x')})` }
        }
    }
    throw Error(`Unknown type: ${t}`)
}

function initialValidation(types: TypeStore) {
    // FIXME: check that type names don't conflict with native ones, and they're unique
    // check field names / ids are unique
    // check flag names are unique
    // check enum names / ids are unique
}

function processFlags(name: string, type: TypeDef) {
    const fields: TSField[] = [], parseCode: string[] = [], formatCode: string[] = []
    parseCode.push(`const x: ${name} = {}`)
    formatCode.push(`let r = 0`)
    for (const { value, name: fname, docs } of type.values!) {
        if (!value) throw Error(`Flag has no value: ${name}.${fname}`)
        fields.push({ name: fname, type: 'true', docs: docs && docs.join('\n') })
        parseCode.push(`if (r & (${value})) x.${fname} = true`)
        formatCode.push(`if (x.${fname}) r |= ${value}`)
    }
    parseCode.push('return x')
    formatCode.push('return r')

    const iface = genInterface(name, fields, type.docs && type.docs.join('\n'))
    const parse = genFunction(`parse${name}`, `r: number`, name, parseCode.join('\n'),
        `Parses the flags in a [[${name}]] bitmask`)
    const format = genFunction(`format${name}`, `x: ${name}`, 'number', formatCode.join('\n'),
        `Encodes a [[${name}]] bitmask`)
    return iface + '\n\n' + parse + '\n\n' + format
}

function processEnum(name: string, type: TypeDef, emitFlags: boolean, emitAttrFlags: boolean) {
    const sname = getFlagName(name)
    const values: string[] = []
    const fields: TSField[] = [], parseCode: string[] = [], formatCode: string[] = []
    const parseAttrCode: string[] = [], formatAttrCode: string[] = []
    parseCode.push(`const x: ${sname} = {}`)
    formatCode.push(`let r = 0`)
    for (const { value, name: ename, docs } of type.values!) {
        values.push( withDocstring(docs && docs.join('\n'), `${ename}${value ? (' = ' + value) : ''},`) )
        const fname = toCamelCase(ename)
        fields.push({ name: fname, type: 'true', docs: docs && docs.join('\n') })
        parseCode.push(`if (r & (1 << ${name}.${ename})) x.${fname} = true`)
        formatCode.push(`if (x.${fname}) r |= 1 << ${name}.${ename}`)
        parseAttrCode.push(`[${name}.${ename}]: (data, obj) => obj.${fname} = structs.getFlag(data),`)
        formatAttrCode.push(`${fname}: (data, obj) => data.push(${name}.${ename}, structs.putFlag(obj.${fname}!)),`)
    }
    parseCode.push('return x')
    formatCode.push('return r')

    const enumDef = withDocstring(type.docs && type.docs.join('\n'),
        'export enum ' + name + ' {\n' + indent(values.join('\n\n')) + '\n}')
    const iface = genInterface(sname + ' extends BaseObject', fields, `Set of flags from [[${name}]] bits`)
    const parse = genFunction(`parse${sname}`, `r: number`, sname, parseCode.join('\n'),
        `Parses the flags in a bitmask with [[${name}]] bits`)
    const format = genFunction(`format${sname}`, `x: ${sname}`, 'number', formatCode.join('\n'),
        `Encodes a [[${name}]] bitmask`)
    const fullParseCode = `return structs.getObject(r, {\n${indent(parseAttrCode.join('\n'))}\n})`
    const fullFormatCode = `return structs.putObject(x, {\n${indent(formatAttrCode.join('\n'))}\n})`
    const parseAttr = genFunction(`parse${sname}Attr`, `r: Buffer`, sname, fullParseCode,
        `Parses flags attributes with [[${name}]] types`)
    const formatAttr = genFunction(`format${sname}Attr`, `x: ${sname}`, 'StreamData', fullFormatCode,
        `Encodes a set of [[${name}]] flags into a stream of attributes`)
    return enumDef + ((emitFlags || emitAttrFlags) ? ('\n\n' + iface) : '')
        + (emitFlags ? ('\n\n' + parse + '\n\n' + format) : '')
        + (emitAttrFlags ? ('\n\n' + parseAttr + '\n\n' + formatAttr) : '')
}

function processAttr(name: string, type: TypeDef) {
    const fields: TSField[] = [], parseCode: string[] = [], formatCode: string[] = []
    let index = 1
    for (const [ name, ftype, opts ] of type.attrs!) {
        const built = processType(ftype, opts && opts.type)
        fields.push({ name, type: built.type!, docs: opts &&  opts.docs && opts.docs.join('\n') })
        parseCode.push(`${index}: (data, obj) => obj.${name} = ${built.parse('data')},`)
        formatCode.push(`${name}: (data, obj) => data.push(${index}, ${built.format(`obj.${name}!`)}),`)
        index++
    }
    const fullParseCode = `return structs.getObject(r, {\n${indent(parseCode.join('\n'))}\n})`
    const fullFormatCode = `return structs.putObject(x, {\n${indent(formatCode.join('\n'))}\n})`
    const iface = genInterface(name + ' extends BaseObject', fields, type.docs && type.docs.join('\n'))
    const parse = genFunction(`parse${name}`, `r: Buffer`, name, fullParseCode,
        `Parses the attributes of a [[${name}]] object`)
    const format = genFunction(`format${name}`, `x: ${name}`, 'StreamData', fullFormatCode,
        `Encodes a [[${name}]] object into a stream of attributes`)
    return iface + '\n\n' + parse + '\n\n' + format
}
