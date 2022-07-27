/**
 * WireGuard tunnels
 *
 * Based on <linux/wireguard.h> at a2ec8b5
 *
 * @module
 */

import { TypeStore, data, bool, flag, u8, u16, u32, u64, s8, s16, s32, s64, f32, f64, string, array, map, asflags } from './_base'

const types: TypeStore = {
    Commands: { kind: 'enum', orig: 'wg_cmd', values: [
        { value: 1, name: 'GET_DEVICE', orig: 'WG_CMD_GET_DEVICE' },
        { value: 2, name: 'SET_DEVICE', orig: 'WG_CMD_SET_DEVICE' },
    ]},

    DeviceFlags: { kind: 'flags', orig: 'wgdevice_flag', values: [
        { value: (1 << 0), name: 'replacePeers', orig: 'WGDEVICE_F_REPLACE_PEERS', docs: [
            'all current peers should be removed prior to adding the list below',
        ] },
    ]},

    Device: { root: true, orig: 'wgdevice_attribute', docs: [
        'exactly one of `ifindex` and `ifname` must be specified',
    ], attrs: [
        ['ifindex', u32, { orig: 'WGDEVICE_A_IFINDEX' }],
        ['ifname', string, { orig: 'WGDEVICE_A_IFNAME' }],
        ['privateKey', data, { orig: 'WGDEVICE_A_PRIVATE_KEY', docs: [
            'exact length WG_KEY_LEN.',
            'for SET_DEVICE, pass all zeros to remove.',
        ] }],
        ['publicKey', data, { orig: 'WGDEVICE_A_PUBLIC_KEY', docs: [
            '[GET_DEVICE only] exact length WG_KEY_LEN.',
        ] }],
        ['flags', u32, { type: 'DeviceFlags', orig: 'WGDEVICE_A_FLAGS', docs: [
            '[SET_DEVICE only]',
        ] }],
        ['listenPort', u16, { orig: 'WGDEVICE_A_LISTEN_PORT', docs: [
            'pass 0 to choose randomly.',
        ] }],
        ['fwmark', u32, { orig: 'WGDEVICE_A_FWMARK', docs: [
            'pass 0 to disable.',
        ] }],
        ['peers', array('Peer'), { orig: 'WGDEVICE_A_PEERS' }],
    ]},

    PeerFlags: { kind: 'flags', orig: 'wgpeer_flag', values: [
        { value: (1 << 0), name: 'removeMe', orig: 'WGPEER_F_REMOVE_ME', docs: [
            'the specified peer should not exist at the end of the operation,',
            'rather than added/updated',
        ] },
        { value: (1 << 1), name: 'replaceAllowedIps', orig: 'WGPEER_F_REPLACE_ALLOWEDIPS', docs: [
            'all current allowed IPs of this peer should be removed prior to adding `allowedIps`',
        ] },
        { value: (1 << 2), name: 'updateOnly', orig: 'WGPEER_F_UPDATE_ONLY', docs: [
            'the peer should only be set if it already exists',
        ] },
    ]},

    Peer: { orig: 'wgpeer_attribute', attrs: [
        ['publicKey', data, { orig: 'WGPEER_A_PUBLIC_KEY', docs: [
            'exact len WG_KEY_LEN.',
        ] }],
        ['presharedKey', data, { orig: 'WGPEER_A_PRESHARED_KEY', docs: [
            'exact len WG_KEY_LEN, pass all zeros to remove.',
        ] }],
        ['flags', u32, { type: 'PeerFlags', orig: 'WGPEER_A_FLAGS', docs: [
            '[SET_DEVICE only]',
        ] }],
        ['endpoint', data, { orig: 'WGPEER_A_ENDPOINT', docs: [
            'struct sockaddr_in or struct sockaddr_in6',
        ] }],
        ['persistentKeepaliveInterval', u16, { orig: 'WGPEER_A_PERSISTENT_KEEPALIVE_INTERVAL', docs: [
            'pass 0 to disable.',
        ] }],
        ['lastHandshakeTime', data, { orig: 'WGPEER_A_LAST_HANDSHAKE_TIME', docs: [
            '[GET_DEVICE only] struct __kernel_timespec',
        ] }],
        ['rxBytes', u64, { orig: 'WGPEER_A_RX_BYTES', docs: [
            '[GET_DEVICE only]',
        ] }],
        ['txBytes', u64, { orig: 'WGPEER_A_TX_BYTES', docs: [
            '[GET_DEVICE only]',
        ] }],
        ['allowedIps', array('AllowedIp'), { orig: 'WGPEER_A_ALLOWEDIPS' }],
        ['protocolVersion', u32, { orig: 'WGPEER_A_PROTOCOL_VERSION', docs: [
            'should not be set or used at all by most users of this API, as the',
            'most recent protocol will be used when this is unset. Otherwise,',
            'must be set to 1.'
        ] }],
    ]},

    AllowedIp: { orig: 'wgallowedip_attribute', attrs: [
        ['family', u16, { orig: 'WGALLOWEDIP_A_FAMILY' }],
        ['ipaddr', data, { orig: 'WGALLOWEDIP_A_IPADDR', docs: [
            'struct in_addr or struct in6_addr',
        ] }],
        ['cidrMask', u8, { orig: 'WGALLOWEDIP_A_CIDR_MASK' }],
    ]},
}

types
