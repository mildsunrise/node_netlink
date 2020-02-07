/**
 * generic netlink controller types
 * 
 * Based on <linux/genetlink.h> at 6f52b16
 */

import { TypeStore, u16, u32, string, array } from './_base'
const GENL_NAMSIZ = 16 /* length of family name */

const types: TypeStore = {
    Family: { root: true, attrs: [
        [ 'familyId', u16 ],
        [ 'familyName', string, { maxLength: GENL_NAMSIZ } ],
        [ 'version', u32 ],
        [ 'hdrsize', u32 ],
        [ 'maxattr', u32 ],
        [ 'ops', array('Operation') ],
        [ 'mcastGroups', array('MulticastGroup') ],
    ]},

    Operation: { attrs: [
        [ 'id', u32 ],
        [ 'flags', u32, { type: 'OperationFlags' } ],
    ]},

    MulticastGroup: { attrs: [
        [ 'name', 'string' ],
        [ 'id', u32 ],
    ]},

    OperationFlags: { kind: 'flags', values: [
        { value: 0x01, name: 'adminPerm' },
        { value: 0x02, name: 'cmdCapDo' },
        { value: 0x04, name: 'cmdCapDump' },
        { value: 0x08, name: 'cmdCapHaspol' },
        { value: 0x10, name: 'unsAdminPerm' },
    ]},
}

types
