/**
 * generic netlink controller types
 * 
 * Based on <linux/genetlink.h> at 6f52b16
 */

import { TypeStore, u16, u32, string, array } from './_base'
const GENL_NAMSIZ = 16 /* length of family name */

const types: TypeStore = {
    Commands: { kind: 'enum', values: [
        { name: 'NEW_FAMILY', value: 1 },
        { name: 'DEL_FAMILY', value: 2 },
        { name: 'GET_FAMILY', value: 3 },
        { name: 'NEW_OPS', value: 4 },
        { name: 'DEL_OPS', value: 5 },
        { name: 'GET_OPS', value: 6 },
        { name: 'NEW_MCAST_GROUP', value: 7 },
        { name: 'DEL_MCAST_GROUP', value: 8 },
        { name: 'GET_MCAST_GROUP', value: 9 },
    ]},

    Message: { root: true, attrs: [
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
