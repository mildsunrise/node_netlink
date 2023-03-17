/**
 * rtnetlink interface
 *
 * This excludes if_link.h and its associated headers,
 * these types have been placed in ifla.ts. Therefore
 * {@link Link} is defined here, but {@link LinkAttrs} is not.
 *
 * Based on
 *   <linux/rtnetlink.h>
 *   <linux/neighbour.h>
 *   <linux/fib_rules.h>
 *   <linux/if.h>
 *   <linux/if_addr.h>
 *   <linux/if_arp.h>
 * at d1ea35f
 *   <linux/nexthop.h>
 * at 710ec56
 *
 * @module
 */

import { TypeStore, data, bool, flag, u8, u16, u32, u64, s8, s16, s32, s64, f32, f64, string, array, map, asflags } from './_base'

const types: TypeStore = {
    // GENERIC //

    MessageType: { kind: 'enum', orig: 'message_type', values: [
        { value: 16, name: 'NEWLINK', orig: 'RTM_NEWLINK' },
        { value: 17, name: 'DELLINK', orig: 'RTM_DELLINK' },
        { value: 18, name: 'GETLINK', orig: 'RTM_GETLINK' },
        { value: 19, name: 'SETLINK', orig: 'RTM_SETLINK' },
        { value: 20, name: 'NEWADDR', orig: 'RTM_NEWADDR' },
        { value: 21, name: 'DELADDR', orig: 'RTM_DELADDR' },
        { value: 22, name: 'GETADDR', orig: 'RTM_GETADDR' },
        { value: 24, name: 'NEWROUTE', orig: 'RTM_NEWROUTE' },
        { value: 25, name: 'DELROUTE', orig: 'RTM_DELROUTE' },
        { value: 26, name: 'GETROUTE', orig: 'RTM_GETROUTE' },
        { value: 28, name: 'NEWNEIGH', orig: 'RTM_NEWNEIGH' },
        { value: 29, name: 'DELNEIGH', orig: 'RTM_DELNEIGH' },
        { value: 30, name: 'GETNEIGH', orig: 'RTM_GETNEIGH' },
        { value: 32, name: 'NEWRULE', orig: 'RTM_NEWRULE' },
        { value: 33, name: 'DELRULE', orig: 'RTM_DELRULE' },
        { value: 34, name: 'GETRULE', orig: 'RTM_GETRULE' },
        { value: 36, name: 'NEWQDISC', orig: 'RTM_NEWQDISC' },
        { value: 37, name: 'DELQDISC', orig: 'RTM_DELQDISC' },
        { value: 38, name: 'GETQDISC', orig: 'RTM_GETQDISC' },
        { value: 40, name: 'NEWTCLASS', orig: 'RTM_NEWTCLASS' },
        { value: 41, name: 'DELTCLASS', orig: 'RTM_DELTCLASS' },
        { value: 42, name: 'GETTCLASS', orig: 'RTM_GETTCLASS' },
        { value: 44, name: 'NEWTFILTER', orig: 'RTM_NEWTFILTER' },
        { value: 45, name: 'DELTFILTER', orig: 'RTM_DELTFILTER' },
        { value: 46, name: 'GETTFILTER', orig: 'RTM_GETTFILTER' },
        { value: 48, name: 'NEWACTION', orig: 'RTM_NEWACTION' },
        { value: 49, name: 'DELACTION', orig: 'RTM_DELACTION' },
        { value: 50, name: 'GETACTION', orig: 'RTM_GETACTION' },
        { value: 52, name: 'NEWPREFIX', orig: 'RTM_NEWPREFIX' },
        { value: 58, name: 'GETMULTICAST', orig: 'RTM_GETMULTICAST' },
        { value: 62, name: 'GETANYCAST', orig: 'RTM_GETANYCAST' },
        { value: 64, name: 'NEWNEIGHTBL', orig: 'RTM_NEWNEIGHTBL' },
        { value: 66, name: 'GETNEIGHTBL', orig: 'RTM_GETNEIGHTBL' },
        { value: 67, name: 'SETNEIGHTBL', orig: 'RTM_SETNEIGHTBL' },
        { value: 68, name: 'NEWNDUSEROPT', orig: 'RTM_NEWNDUSEROPT' },
        { value: 72, name: 'NEWADDRLABEL', orig: 'RTM_NEWADDRLABEL' },
        { value: 73, name: 'DELADDRLABEL', orig: 'RTM_DELADDRLABEL' },
        { value: 74, name: 'GETADDRLABEL', orig: 'RTM_GETADDRLABEL' },
        { value: 78, name: 'GETDCB', orig: 'RTM_GETDCB' },
        { value: 79, name: 'SETDCB', orig: 'RTM_SETDCB' },
        { value: 80, name: 'NEWNETCONF', orig: 'RTM_NEWNETCONF' },
        { value: 81, name: 'DELNETCONF', orig: 'RTM_DELNETCONF' },
        { value: 82, name: 'GETNETCONF', orig: 'RTM_GETNETCONF' },
        { value: 84, name: 'NEWMDB', orig: 'RTM_NEWMDB' },
        { value: 85, name: 'DELMDB', orig: 'RTM_DELMDB' },
        { value: 86, name: 'GETMDB', orig: 'RTM_GETMDB' },
        { value: 88, name: 'NEWNSID', orig: 'RTM_NEWNSID' },
        { value: 89, name: 'DELNSID', orig: 'RTM_DELNSID' },
        { value: 90, name: 'GETNSID', orig: 'RTM_GETNSID' },
        { value: 92, name: 'NEWSTATS', orig: 'RTM_NEWSTATS' },
        { value: 94, name: 'GETSTATS', orig: 'RTM_GETSTATS' },
        { value: 96, name: 'NEWCACHEREPORT', orig: 'RTM_NEWCACHEREPORT' },
        { value: 100, name: 'NEWCHAIN', orig: 'RTM_NEWCHAIN' },
        { value: 101, name: 'DELCHAIN', orig: 'RTM_DELCHAIN' },
        { value: 102, name: 'GETCHAIN', orig: 'RTM_GETCHAIN' },
        { value: 104, name: 'NEWNEXTHOP', orig: 'RTM_NEWNEXTHOP' },
        { value: 105, name: 'DELNEXTHOP', orig: 'RTM_DELNEXTHOP' },
        { value: 106, name: 'GETNEXTHOP', orig: 'RTM_GETNEXTHOP' },
        { value: 108, name: 'NEWLINKPROP', orig: 'RTM_NEWLINKPROP' },
        { value: 109, name: 'DELLINKPROP', orig: 'RTM_DELLINKPROP' },
        { value: 110, name: 'GETLINKPROP', orig: 'RTM_GETLINKPROP' },
        { value: 112, name: 'NEWVLAN', orig: 'RTM_NEWVLAN' },
        { value: 113, name: 'DELVLAN', orig: 'RTM_DELVLAN' },
        { value: 114, name: 'GETVLAN', orig: 'RTM_GETVLAN' },
        { value: 116, name: 'NEWNEXTHOPBUCKET', orig: 'RTM_NEWNEXTHOPBUCKET' },
        { value: 117, name: 'DELNEXTHOPBUCKET', orig: 'RTM_DELNEXTHOPBUCKET' },
        { value: 118, name: 'GETNEXTHOPBUCKET', orig: 'RTM_GETNEXTHOPBUCKET' },
    ]},

    MulticastGroups: { kind: 'enum', orig: 'rtnetlink_groups', docs: [
        'RTnetlink multicast groups',
    ], values: [
        { value: 0, name: 'NONE', orig: 'RTNLGRP_NONE' },
        { value: 1, name: 'LINK', orig: 'RTNLGRP_LINK' },
        { value: 2, name: 'NOTIFY', orig: 'RTNLGRP_NOTIFY' },
        { value: 3, name: 'NEIGH', orig: 'RTNLGRP_NEIGH' },
        { value: 4, name: 'TC', orig: 'RTNLGRP_TC' },
        { value: 5, name: 'IPV4_IFADDR', orig: 'RTNLGRP_IPV4_IFADDR' },
        { value: 6, name: 'IPV4_MROUTE', orig: 'RTNLGRP_IPV4_MROUTE' },
        { value: 7, name: 'IPV4_ROUTE', orig: 'RTNLGRP_IPV4_ROUTE' },
        { value: 8, name: 'IPV4_RULE', orig: 'RTNLGRP_IPV4_RULE' },
        { value: 9, name: 'IPV6_IFADDR', orig: 'RTNLGRP_IPV6_IFADDR' },
        { value: 10, name: 'IPV6_MROUTE', orig: 'RTNLGRP_IPV6_MROUTE' },
        { value: 11, name: 'IPV6_ROUTE', orig: 'RTNLGRP_IPV6_ROUTE' },
        { value: 12, name: 'IPV6_IFINFO', orig: 'RTNLGRP_IPV6_IFINFO' },
        { value: 13, name: 'DECnet_IFADDR', orig: 'RTNLGRP_DECnet_IFADDR' },
        { value: 14, name: 'NOP2', orig: 'RTNLGRP_NOP2' },
        { value: 15, name: 'DECnet_ROUTE', orig: 'RTNLGRP_DECnet_ROUTE' },
        { value: 16, name: 'DECnet_RULE', orig: 'RTNLGRP_DECnet_RULE' },
        { value: 17, name: 'NOP4', orig: 'RTNLGRP_NOP4' },
        { value: 18, name: 'IPV6_PREFIX', orig: 'RTNLGRP_IPV6_PREFIX' },
        { value: 19, name: 'IPV6_RULE', orig: 'RTNLGRP_IPV6_RULE' },
        { value: 20, name: 'ND_USEROPT', orig: 'RTNLGRP_ND_USEROPT' },
        { value: 21, name: 'PHONET_IFADDR', orig: 'RTNLGRP_PHONET_IFADDR' },
        { value: 22, name: 'PHONET_ROUTE', orig: 'RTNLGRP_PHONET_ROUTE' },
        { value: 23, name: 'DCB', orig: 'RTNLGRP_DCB' },
        { value: 24, name: 'IPV4_NETCONF', orig: 'RTNLGRP_IPV4_NETCONF' },
        { value: 25, name: 'IPV6_NETCONF', orig: 'RTNLGRP_IPV6_NETCONF' },
        { value: 26, name: 'MDB', orig: 'RTNLGRP_MDB' },
        { value: 27, name: 'MPLS_ROUTE', orig: 'RTNLGRP_MPLS_ROUTE' },
        { value: 28, name: 'NSID', orig: 'RTNLGRP_NSID' },
        { value: 29, name: 'MPLS_NETCONF', orig: 'RTNLGRP_MPLS_NETCONF' },
        { value: 30, name: 'IPV4_MROUTE_R', orig: 'RTNLGRP_IPV4_MROUTE_R' },
        { value: 31, name: 'IPV6_MROUTE_R', orig: 'RTNLGRP_IPV6_MROUTE_R' },
        { value: 32, name: 'NEXTHOP', orig: 'RTNLGRP_NEXTHOP' },
        { value: 33, name: 'BRVLAN', orig: 'RTNLGRP_BRVLAN' },
    ]},

    // ROUTES //

    Route: { root: true, kind: 'struct', orig: 'rtmsg', docs: [
        'Definitions used in routing table administration.',
    ], attrs: [
        ['family', u8, { orig: 'rtm_family' }],
        ['dstLen', u8, { orig: 'rtm_dst_len' }],
        ['srcLen', u8, { orig: 'rtm_src_len' }],
        ['tos', u8, { orig: 'rtm_tos' }],
        ['table', u8, { orig: 'rtm_table', docs: [
            'Routing table id',
        ] }],
        ['protocol', u8, { type: 'RouteProtocol', orig: 'rtm_protocol', docs: [
            'Routing protocol',
        ] }],
        ['scope', u8, { type: 'RouteScope', orig: 'rtm_scope' }],
        ['type', u8, { type: 'RouteType', orig: 'rtm_type' }],
        ['flags', u32, { type: 'RouteFlags', orig: 'rtm_flags' }],
    ]},

    RouteType: { kind: 'enum', orig: 'rtm_type', values: [
        { value: 0, name: 'UNSPEC', orig: 'RTN_UNSPEC' },
        { value: 1, name: 'UNICAST', orig: 'RTN_UNICAST', docs: [
            'Gateway or direct route',
        ] },
        { value: 2, name: 'LOCAL', orig: 'RTN_LOCAL', docs: [
            'Accept locally',
        ] },
        { value: 3, name: 'BROADCAST', orig: 'RTN_BROADCAST' },
        { value: 4, name: 'ANYCAST', orig: 'RTN_ANYCAST' },
        { value: 5, name: 'MULTICAST', orig: 'RTN_MULTICAST', docs: [
            'Multicast route',
        ] },
        { value: 6, name: 'BLACKHOLE', orig: 'RTN_BLACKHOLE', docs: [
            'Drop',
        ] },
        { value: 7, name: 'UNREACHABLE', orig: 'RTN_UNREACHABLE', docs: [
            'Destination is unreachable',
        ] },
        { value: 8, name: 'PROHIBIT', orig: 'RTN_PROHIBIT', docs: [
            'Administratively prohibited',
        ] },
        { value: 9, name: 'THROW', orig: 'RTN_THROW', docs: [
            'Not in this table',
        ] },
        { value: 10, name: 'NAT', orig: 'RTN_NAT', docs: [
            'Translate this address',
        ] },
        { value: 11, name: 'XRESOLVE', orig: 'RTN_XRESOLVE', docs: [
            'Use external resolver',
        ] },
    ]},

    RouteProtocol: { kind: 'enum', orig: 'rtm_protocol', docs: [
        'Values of protocol >= RTPROT_STATIC are not interpreted by kernel;',
        'they are just passed from user and back as is.',
        'It will be used by hypothetical multiple routing daemons.',
        'Note that protocol values should be standardized in order to',
        'avoid conflicts.',
    ], values: [
        { value: 1, name: 'REDIRECT', orig: 'RTPROT_REDIRECT', docs: [
            'Route installed by ICMP redirects;',
            'not used by current IPv4',
        ] },
        { value: 2, name: 'KERNEL', orig: 'RTPROT_KERNEL', docs: [
            'Route installed by kernel',
        ] },
        { value: 3, name: 'BOOT', orig: 'RTPROT_BOOT', docs: [
            'Route installed during boot',
        ] },
        { value: 4, name: 'STATIC', orig: 'RTPROT_STATIC', docs: [
            'Route installed by administrator',
        ] },
        { value: 8, name: 'GATED', orig: 'RTPROT_GATED', docs: [
            'Apparently, GateD',
        ] },
        { value: 9, name: 'RA', orig: 'RTPROT_RA', docs: [
            'RDISC/ND router advertisements',
        ] },
        { value: 10, name: 'MRT', orig: 'RTPROT_MRT', docs: [
            'Merit MRT',
        ] },
        { value: 11, name: 'ZEBRA', orig: 'RTPROT_ZEBRA', docs: [
            'Zebra',
        ] },
        { value: 12, name: 'BIRD', orig: 'RTPROT_BIRD', docs: [
            'BIRD',
        ] },
        { value: 13, name: 'DNROUTED', orig: 'RTPROT_DNROUTED', docs: [
            'DECnet routing daemon',
        ] },
        { value: 14, name: 'XORP', orig: 'RTPROT_XORP', docs: [
            'XORP',
        ] },
        { value: 15, name: 'NTK', orig: 'RTPROT_NTK', docs: [
            'Netsukuku',
        ] },
        { value: 16, name: 'DHCP', orig: 'RTPROT_DHCP', docs: [
            'DHCP client',
        ] },
        { value: 17, name: 'MROUTED', orig: 'RTPROT_MROUTED', docs: [
            'Multicast daemon',
        ] },
        { value: 42, name: 'BABEL', orig: 'RTPROT_BABEL', docs: [
            'Babel daemon',
        ] },
        { value: 186, name: 'BGP', orig: 'RTPROT_BGP', docs: [
            'BGP Routes',
        ] },
        { value: 187, name: 'ISIS', orig: 'RTPROT_ISIS', docs: [
            'ISIS Routes',
        ] },
        { value: 188, name: 'OSPF', orig: 'RTPROT_OSPF', docs: [
            'OSPF Routes',
        ] },
        { value: 189, name: 'RIP', orig: 'RTPROT_RIP', docs: [
            'RIP Routes',
        ] },
        { value: 192, name: 'EIGRP', orig: 'RTPROT_EIGRP', docs: [
            'EIGRP Routes',
        ] },
    ]},

    RouteScope: { kind: 'enum', orig: 'rt_scope_t', docs: [
        'Really it is not scope, but sort of distance to the destination.',
        'NOWHERE are reserved for not existing destinations, HOST is our',
        'local addresses, LINK are destinations, located on directly attached',
        'link and UNIVERSE is everywhere in the Universe.',
        'Intermediate values are also possible f.e. interior routes',
        'could be assigned a value between UNIVERSE and LINK.',
    ], values: [
        { value: 0, name: 'UNIVERSE', orig: 'RT_SCOPE_UNIVERSE' },
        { value: 200, name: 'SITE', orig: 'RT_SCOPE_SITE', docs: [
            'User defined values',
        ] },
        { value: 253, name: 'LINK', orig: 'RT_SCOPE_LINK' },
        { value: 254, name: 'HOST', orig: 'RT_SCOPE_HOST' },
        { value: 255, name: 'NOWHERE', orig: 'RT_SCOPE_NOWHERE' },
    ]},

    RouteFlags: { kind: 'flags', orig: 'rtm_flags', values: [
        { value: 0x100, name: 'notify', orig: 'RTM_F_NOTIFY', docs: [
            'Notify user of route change',
        ] },
        { value: 0x200, name: 'cloned', orig: 'RTM_F_CLONED', docs: [
            'This route is cloned',
        ] },
        { value: 0x400, name: 'equalize', orig: 'RTM_F_EQUALIZE', docs: [
            'Multipath equalizer: NI',
        ] },
        { value: 0x800, name: 'prefix', orig: 'RTM_F_PREFIX', docs: [
            'Prefix addresses',
        ] },
        { value: 0x1000, name: 'lookupTable', orig: 'RTM_F_LOOKUP_TABLE', docs: [
            'set rtm_table to FIB lookup result',
        ] },
        { value: 0x2000, name: 'fibMatch', orig: 'RTM_F_FIB_MATCH', docs: [
            'return full fib lookup match',
        ] },
        { value: 0x4000, name: 'offload', orig: 'RTM_F_OFFLOAD', docs: [
            'route is offloaded',
        ] },
        { value: 0x8000, name: 'trap', orig: 'RTM_F_TRAP', docs: [
            'route is trapping packets',
        ] },
    ]},

    RoutingTableClass: { kind: 'enum', orig: 'rt_class_t', docs: [
        'Reserved table identifiers',
    ], values: [
        { value: 252, name: 'COMPAT', orig: 'RT_TABLE_COMPAT', docs: [
            'User defined values',
        ] },
        { value: 253, name: 'DEFAULT', orig: 'RT_TABLE_DEFAULT' },
        { value: 254, name: 'MAIN', orig: 'RT_TABLE_MAIN' },
        { value: 255, name: 'LOCAL', orig: 'RT_TABLE_LOCAL' },
    ]},

    RouteAttrs: { orig: 'rtattr_type_t', docs: [
        'Routing message attributes',
    ], attrs: [
        ['dst', data, { orig: 'RTA_DST' }],
        ['src', data, { orig: 'RTA_SRC' }],
        ['iif', u32, { orig: 'RTA_IIF' }],
        ['oif', u32, { orig: 'RTA_OIF' }],
        ['gateway', data, { orig: 'RTA_GATEWAY' }],
        ['priority', u32, { orig: 'RTA_PRIORITY' }],
        ['prefsrc', data, { orig: 'RTA_PREFSRC' }],
        ['metrics', 'RouteMetrics', { orig: 'RTA_METRICS' }],
        ['multipath', data, { orig: 'RTA_MULTIPATH', docs: [
            'array of struct rtnexthop',
        ] }],
        ['protoinfo', data, { orig: 'RTA_PROTOINFO', docs: [
            'no longer used',
        ] }],
        ['flow', u32, { orig: 'RTA_FLOW' }],
        ['cacheInfo', 'RouteCacheInfo', { orig: 'RTA_CACHEINFO' }],
        ['session', 'RouteSession', { orig: 'RTA_SESSION' }],
        ['mpAlgo', data, { orig: 'RTA_MP_ALGO' }],
        ['table', u32, { orig: 'RTA_TABLE' }],
        ['mark', data, { orig: 'RTA_MARK' }],
        ['mfcStats', 'RouteMfcStats', { orig: 'RTA_MFC_STATS' }],
        ['via', 'RouteVia', { orig: 'RTA_VIA' }],
        ['newdst', data, { orig: 'RTA_NEWDST' }],
        ['pref', data, { orig: 'RTA_PREF' }],
        ['encapType', u16, { orig: 'RTA_ENCAP_TYPE' }],
        ['encap', data, { orig: 'RTA_ENCAP' }],
        ['expires', data, { orig: 'RTA_EXPIRES' }],
        ['__pad', data, { orig: 'RTA_PAD' }],
        ['uid', data, { orig: 'RTA_UID' }],
        ['ttlPropagate', u8, { orig: 'RTA_TTL_PROPAGATE' }],
        ['ipProto', data, { orig: 'RTA_IP_PROTO' }],
        ['sport', data, { orig: 'RTA_SPORT' }],
        ['dport', data, { orig: 'RTA_DPORT' }],
        ['nhId', data, { orig: 'RTA_NH_ID' }],
    ]},

    RouteNextHop: { kind: 'struct', orig: 'rtnexthop', docs: [
        '"struct rtnexthop" describes all necessary nexthop information,',
        'i.e. parameters of path to a destination via this nexthop.',
        '',
        'At the moment it is impossible to set different prefsrc, mtu, window',
        'and rtt for different paths from multipath.',
    ], attrs: [
        ['len', u16, { orig: 'rtnh_len' }],
        ['flags', u8, { type: 'RouteNextHopFlags', orig: 'rtnh_flags' }],
        ['hops', u8, { orig: 'rtnh_hops' }],
        ['ifindex', s32, { orig: 'rtnh_ifindex' }],
    ]},

    RouteNextHopFlags: { kind: 'flags', orig: 'rtnh_flags', values: [
        { value: 1, name: 'dead', orig: 'RTNH_F_DEAD', docs: [
            'Nexthop is dead (used by multipath)',
        ] },
        { value: 2, name: 'pervasive', orig: 'RTNH_F_PERVASIVE', docs: [
            'Do recursive gateway lookup',
        ] },
        { value: 4, name: 'onlink', orig: 'RTNH_F_ONLINK', docs: [
            'Gateway is forced on link',
        ] },
        { value: 8, name: 'offload', orig: 'RTNH_F_OFFLOAD', docs: [
            'offloaded route',
        ] },
        { value: 16, name: 'linkdown', orig: 'RTNH_F_LINKDOWN', docs: [
            'carrier-down on nexthop',
        ] },
        { value: 32, name: 'unresolved', orig: 'RTNH_F_UNRESOLVED', docs: [
            'The entry is unresolved (ipmr)',
        ] },
    ]},

    RouteVia: { kind: 'struct', orig: 'rtvia', attrs: [
        ['family', u16, { orig: 'rtvia_family' }],
        ['addr', u8, { orig: 'rtvia_addr' }],
    ]},

    RouteCacheInfo: { kind: 'struct', orig: 'rta_cacheinfo', attrs: [
        ['clntref', u32, { orig: 'rta_clntref' }],
        ['lastuse', u32, { orig: 'rta_lastuse' }],
        ['expires', s32, { orig: 'rta_expires' }],
        ['error', u32, { orig: 'rta_error' }],
        ['used', u32, { orig: 'rta_used' }],
        ['id', u32, { orig: 'rta_id' }],
        ['ts', u32, { orig: 'rta_ts' }],
        ['tsage', u32, { orig: 'rta_tsage' }],
    ]},

    RouteMetrics: { attrs: [
        ['lock', data, { orig: 'RTAX_LOCK' }],
        ['mtu', data, { orig: 'RTAX_MTU' }],
        ['window', data, { orig: 'RTAX_WINDOW' }],
        ['rtt', data, { orig: 'RTAX_RTT' }],
        ['rttvar', data, { orig: 'RTAX_RTTVAR' }],
        ['ssthresh', data, { orig: 'RTAX_SSTHRESH' }],
        ['cwnd', data, { orig: 'RTAX_CWND' }],
        ['advmss', data, { orig: 'RTAX_ADVMSS' }],
        ['reordering', data, { orig: 'RTAX_REORDERING' }],
        ['hoplimit', data, { orig: 'RTAX_HOPLIMIT' }],
        ['initcwnd', data, { orig: 'RTAX_INITCWND' }],
        ['features', data, { type: 'RouteMetricsFeatures', orig: 'RTAX_FEATURES' }],
        ['rtoMin', data, { orig: 'RTAX_RTO_MIN' }],
        ['initrwnd', data, { orig: 'RTAX_INITRWND' }],
        ['quickack', data, { orig: 'RTAX_QUICKACK' }],
        ['ccAlgo', data, { orig: 'RTAX_CC_ALGO' }],
        ['fastopenNoCookie', data, { orig: 'RTAX_FASTOPEN_NO_COOKIE' }],
    ]},

    RouteMetricsFeatures: { kind: 'flags', orig: 'rtax_features', values: [
        { value: (1 << 0), name: 'ecn', orig: 'RTAX_FEATURE_ECN' },
        { value: (1 << 1), name: 'sack', orig: 'RTAX_FEATURE_SACK' },
        { value: (1 << 2), name: 'timestamp', orig: 'RTAX_FEATURE_TIMESTAMP' },
        { value: (1 << 3), name: 'allfrag', orig: 'RTAX_FEATURE_ALLFRAG' },
    ]},

    RouteSession: { kind: 'struct', orig: 'rta_session', attrs: [
        ['proto', u8, { orig: 'proto' }],
        ['__pad1', u8, { orig: 'pad1' }],
        ['__pad2', u16, { orig: 'pad2' }],
        ['u', u8, { count: 4, orig: 'u' }],
    ]},

    RouteMfcStats: { kind: 'struct', orig: 'rta_mfc_stats', attrs: [
        ['packets', u64, { orig: 'mfcs_packets' }],
        ['bytes', u64, { orig: 'mfcs_bytes' }],
        ['wrongIf', u64, { orig: 'mfcs_wrong_if' }],
    ]},

    // ADDRESSES //

    Address: { root: true, kind: 'struct', orig: 'ifaddrmsg', attrs: [
        ['family', u8, { orig: 'ifa_family' }],
        ['prefixlen', u8, { orig: 'ifa_prefixlen', docs: [
            'The prefix length',
        ] }],
        ['flags', u8, { type: 'AddressFlags', orig: 'ifa_flags', docs: [
            'Flags',
        ] }],
        ['scope', u8, { orig: 'ifa_scope', docs: [
            'Address scope',
        ] }],
        ['index', u32, { orig: 'ifa_index', docs: [
            'Link index',
        ] }],
    ]},

    AddressAttrs: { attrs: [
        ['address', data, { orig: 'IFA_ADDRESS', docs: [
            'Important comment:',
            'this is prefix address, rather than local interface address.',
            'It makes no difference for normally configured broadcast interfaces,',
            'but for point-to-point this is DESTINATION address,',
            'local address is supplied in IFA_LOCAL attribute.',
        ] }],
        ['local', data, { orig: 'IFA_LOCAL' }],
        ['label', string, { orig: 'IFA_LABEL' }],
        ['broadcast', data, { orig: 'IFA_BROADCAST' }],
        ['anycast', data, { orig: 'IFA_ANYCAST' }],
        ['cacheInfo', 'AddressCacheInfo', { orig: 'IFA_CACHEINFO' }],
        ['multicast', data, { orig: 'IFA_MULTICAST' }],
        ['flags', u32, { type: 'AddressFlags', orig: 'IFA_FLAGS', docs: [
            'u32 attribute that extends the u8 field ifa_flags.',
            'If present, the value from struct ifaddrmsg will be ignored.',
        ] }],
        ['rtPriority', u32, { orig: 'IFA_RT_PRIORITY', docs: [
            'u32, priority/metric for prefix route',
        ] }],
        ['targetNetnsid', data, { orig: 'IFA_TARGET_NETNSID' }],
    ]},

    AddressFlags: { kind: 'flags', orig: 'ifa_flags', values: [
        { value: 0x01, name: 'secondary', orig: 'IFA_F_SECONDARY' },
        { value: 0x02, name: 'nodad', orig: 'IFA_F_NODAD' },
        { value: 0x04, name: 'optimistic', orig: 'IFA_F_OPTIMISTIC' },
        { value: 0x08, name: 'dadfailed', orig: 'IFA_F_DADFAILED' },
        { value: 0x10, name: 'homeaddress', orig: 'IFA_F_HOMEADDRESS' },
        { value: 0x20, name: 'deprecated', orig: 'IFA_F_DEPRECATED' },
        { value: 0x40, name: 'tentative', orig: 'IFA_F_TENTATIVE' },
        { value: 0x80, name: 'permanent', orig: 'IFA_F_PERMANENT' },
        { value: 0x100, name: 'managetempaddr', orig: 'IFA_F_MANAGETEMPADDR' },
        { value: 0x200, name: 'noprefixroute', orig: 'IFA_F_NOPREFIXROUTE' },
        { value: 0x400, name: 'mcautojoin', orig: 'IFA_F_MCAUTOJOIN' },
        { value: 0x800, name: 'stablePrivacy', orig: 'IFA_F_STABLE_PRIVACY' },
    ]},

    AddressCacheInfo: { kind: 'struct', orig: 'ifa_cacheinfo', attrs: [
        ['ifaPrefered', u32, { orig: 'ifa_prefered' }],
        ['ifaValid', u32, { orig: 'ifa_valid' }],
        ['cstamp', u32, { orig: 'cstamp', docs: [
            'created timestamp, hundredths of seconds',
        ] }],
        ['tstamp', u32, { orig: 'tstamp', docs: [
            'updated timestamp, hundredths of seconds',
        ] }],
    ]},

    // LINKS / INTERFACES //

    Link: { root: true, kind: 'struct', orig: 'ifinfomsg', attrs: [
        ['family', u8, { orig: 'ifi_family' }],
        ['__pad', u8, { orig: '__ifi_pad' }],
        ['type', u16, { type: 'LinkType', orig: 'ifi_type', docs: [
            'ARPHRD_*',
        ] }],
        ['index', s32, { orig: 'ifi_index', docs: [
            'Link index',
        ] }],
        ['flags', u32, { type: 'DeviceFlags', orig: 'ifi_flags', docs: [
            'IFF_* flags',
        ] }],
        ['change', u32, { type: 'DeviceFlags', orig: 'ifi_change', docs: [
            'IFF_* change mask',
        ] }],
    ]},
    // -> LinkAttrs defined in ifla

    RtExtFilter: { kind: 'flags', orig: 'rtext_filter', docs: [ // FIXME
        'New extended info filters for IFLA_EXT_MASK',
    ], values: [
        { value: (1 << 0), name: 'vf', orig: 'RTEXT_FILTER_VF' },
        { value: (1 << 1), name: 'brvlan', orig: 'RTEXT_FILTER_BRVLAN' },
        { value: (1 << 2), name: 'brvlanCompressed', orig: 'RTEXT_FILTER_BRVLAN_COMPRESSED' },
        { value: (1 << 3), name: 'skipStats', orig: 'RTEXT_FILTER_SKIP_STATS' },
    ]},

    DeviceFlags: { kind: 'flags', orig: 'net_device_flags', docs: [
        'These are the &struct net_device flags, they can be set by drivers, the',
        'kernel and some can be triggered by userspace. Userspace can query and',
        'set these flags using userspace utilities but there is also a sysfs',
        'entry available for all dev flags which can be queried and set. These flags',
        'are shared for all types of net_devices. The sysfs entries are available',
        'via /sys/class/net/<dev>/flags. Flags which can be toggled through sysfs',
        'are annotated below, note that only a few flags can be toggled and some',
        'other flags are always preserved from the original net_device flags',
        'even if you try to set them via sysfs. Flags which are always preserved',
        'are kept under the flag grouping @IFF_VOLATILE. Flags which are volatile',
        'are annotated below as such.',
        '',
        'You should have a pretty good reason to be extending these flags.',
    ], values: [
        { value: 1<<0, name: 'up', orig: 'IFF_UP', docs: [
            'interface is up. Can be toggled through sysfs.',
        ] },
        { value: 1<<1, name: 'broadcast', orig: 'IFF_BROADCAST', docs: [
            'broadcast address valid. Volatile.',
        ] },
        { value: 1<<2, name: 'debug', orig: 'IFF_DEBUG', docs: [
            'turn on debugging. Can be toggled through sysfs.',
        ] },
        { value: 1<<3, name: 'loopback', orig: 'IFF_LOOPBACK', docs: [
            'is a loopback net. Volatile.',
        ] },
        { value: 1<<4, name: 'pointopoint', orig: 'IFF_POINTOPOINT', docs: [
            'interface is has p-p link. Volatile.',
        ] },
        { value: 1<<5, name: 'notrailers', orig: 'IFF_NOTRAILERS', docs: [
            'avoid use of trailers. Can be toggled through sysfs.',
            'Volatile.',
        ] },
        { value: 1<<6, name: 'running', orig: 'IFF_RUNNING', docs: [
            'interface RFC2863 OPER_UP. Volatile.',
        ] },
        { value: 1<<7, name: 'noarp', orig: 'IFF_NOARP', docs: [
            'no ARP protocol. Can be toggled through sysfs. Volatile.',
        ] },
        { value: 1<<8, name: 'promisc', orig: 'IFF_PROMISC', docs: [
            'receive all packets. Can be toggled through sysfs.',
        ] },
        { value: 1<<9, name: 'allmulti', orig: 'IFF_ALLMULTI', docs: [
            'receive all multicast packets. Can be toggled through',
            'sysfs.',
        ] },
        { value: 1<<10, name: 'master', orig: 'IFF_MASTER', docs: [
            'master of a load balancer. Volatile.',
        ] },
        { value: 1<<11, name: 'slave', orig: 'IFF_SLAVE', docs: [
            'slave of a load balancer. Volatile.',
        ] },
        { value: 1<<12, name: 'multicast', orig: 'IFF_MULTICAST', docs: [
            'Supports multicast. Can be toggled through sysfs.',
        ] },
        { value: 1<<13, name: 'portsel', orig: 'IFF_PORTSEL', docs: [
            'can set media type. Can be toggled through sysfs.',
        ] },
        { value: 1<<14, name: 'automedia', orig: 'IFF_AUTOMEDIA', docs: [
            'auto media select active. Can be toggled through sysfs.',
        ] },
        { value: 1<<15, name: 'dynamic', orig: 'IFF_DYNAMIC', docs: [
            'dialup device with changing addresses. Can be toggled',
            'through sysfs.',
        ] },
        { value: 1<<16, name: 'lowerUp', orig: 'IFF_LOWER_UP', docs: [
            'driver signals L1 up. Volatile.',
        ] },
        { value: 1<<17, name: 'dormant', orig: 'IFF_DORMANT', docs: [
            'driver signals dormant. Volatile.',
        ] },
        { value: 1<<18, name: 'echo', orig: 'IFF_ECHO', docs: [
            'echo sent packets. Volatile.',
        ] },
    ]},

    LinkType: { kind: 'enum', docs: [
        'ARP protocol HARDWARE identifiers.',
        'for >= 256: Dummy types for non ARP hardware',
    ], values: [
        { value: 0, name: 'NETROM', orig: 'ARPHRD_NETROM', docs: [
            'from KA9Q: NET/ROM pseudo',
        ] },
        { value: 1, name: 'ETHER', orig: 'ARPHRD_ETHER', docs: [
            'Ethernet 10Mbps',
        ] },
        { value: 2, name: 'EETHER', orig: 'ARPHRD_EETHER', docs: [
            'Experimental Ethernet',
        ] },
        { value: 3, name: 'AX25', orig: 'ARPHRD_AX25', docs: [
            'AX.25 Level 2',
        ] },
        { value: 4, name: 'PRONET', orig: 'ARPHRD_PRONET', docs: [
            'PROnet token ring',
        ] },
        { value: 5, name: 'CHAOS', orig: 'ARPHRD_CHAOS', docs: [
            'Chaosnet',
        ] },
        { value: 6, name: 'IEEE802', orig: 'ARPHRD_IEEE802', docs: [
            'IEEE 802.2 Ethernet/TR/TB',
        ] },
        { value: 7, name: 'ARCNET', orig: 'ARPHRD_ARCNET', docs: [
            'ARCnet',
        ] },
        { value: 8, name: 'APPLETLK', orig: 'ARPHRD_APPLETLK', docs: [
            'APPLEtalk',
        ] },
        { value: 15, name: 'DLCI', orig: 'ARPHRD_DLCI', docs: [
            'Frame Relay DLCI',
        ] },
        { value: 19, name: 'ATM', orig: 'ARPHRD_ATM', docs: [
            'ATM',
        ] },
        { value: 23, name: 'METRICOM', orig: 'ARPHRD_METRICOM', docs: [
            'Metricom STRIP (new IANA id)',
        ] },
        { value: 24, name: 'IEEE1394', orig: 'ARPHRD_IEEE1394', docs: [
            'IEEE 1394 IPv4 - RFC 2734',
        ] },
        { value: 27, name: 'EUI64', orig: 'ARPHRD_EUI64', docs: [
            'EUI-64',
        ] },
        { value: 32, name: 'INFINIBAND', orig: 'ARPHRD_INFINIBAND', docs: [
            'InfiniBand',
        ] },
        { value: 256, name: 'SLIP', orig: 'ARPHRD_SLIP' },
        { value: 257, name: 'CSLIP', orig: 'ARPHRD_CSLIP' },
        { value: 258, name: 'SLIP6', orig: 'ARPHRD_SLIP6' },
        { value: 259, name: 'CSLIP6', orig: 'ARPHRD_CSLIP6' },
        { value: 260, name: 'RSRVD', orig: 'ARPHRD_RSRVD', docs: [
            'Notional KISS type',
        ] },
        { value: 264, name: 'ADAPT', orig: 'ARPHRD_ADAPT' },
        { value: 270, name: 'ROSE', orig: 'ARPHRD_ROSE' },
        { value: 271, name: 'X25', orig: 'ARPHRD_X25', docs: [
            'CCITT X.25',
        ] },
        { value: 272, name: 'HWX25', orig: 'ARPHRD_HWX25', docs: [
            'Boards with X.25 in firmware',
        ] },
        { value: 280, name: 'CAN', orig: 'ARPHRD_CAN', docs: [
            'Controller Area Network',
        ] },
        { value: 512, name: 'PPP', orig: 'ARPHRD_PPP' },
        { value: 513, name: 'CISCO', orig: 'ARPHRD_CISCO', docs: [
            'Cisco HDLC',
        ] },
        { value: 516, name: 'LAPB', orig: 'ARPHRD_LAPB', docs: [
            'LAPB',
        ] },
        { value: 517, name: 'DDCMP', orig: 'ARPHRD_DDCMP', docs: [
            "Digital's DDCMP protocol",
        ] },
        { value: 518, name: 'RAWHDLC', orig: 'ARPHRD_RAWHDLC', docs: [
            'Raw HDLC',
        ] },
        { value: 519, name: 'RAWIP', orig: 'ARPHRD_RAWIP', docs: [
            'Raw IP',
        ] },
        { value: 768, name: 'TUNNEL', orig: 'ARPHRD_TUNNEL', docs: [
            'IPIP tunnel',
        ] },
        { value: 769, name: 'TUNNEL6', orig: 'ARPHRD_TUNNEL6', docs: [
            'IP6IP6 tunnel',
        ] },
        { value: 770, name: 'FRAD', orig: 'ARPHRD_FRAD', docs: [
            'Frame Relay Access Device',
        ] },
        { value: 771, name: 'SKIP', orig: 'ARPHRD_SKIP', docs: [
            'SKIP vif',
        ] },
        { value: 772, name: 'LOOPBACK', orig: 'ARPHRD_LOOPBACK', docs: [
            'Loopback device',
        ] },
        { value: 773, name: 'LOCALTLK', orig: 'ARPHRD_LOCALTLK', docs: [
            'Localtalk device',
        ] },
        { value: 774, name: 'FDDI', orig: 'ARPHRD_FDDI', docs: [
            'Fiber Distributed Data Interface',
        ] },
        { value: 775, name: 'BIF', orig: 'ARPHRD_BIF', docs: [
            'AP1000 BIF',
        ] },
        { value: 776, name: 'SIT', orig: 'ARPHRD_SIT', docs: [
            'sit0 device - IPv6-in-IPv4',
        ] },
        { value: 777, name: 'IPDDP', orig: 'ARPHRD_IPDDP', docs: [
            'IP over DDP tunneller',
        ] },
        { value: 778, name: 'IPGRE', orig: 'ARPHRD_IPGRE', docs: [
            'GRE over IP',
        ] },
        { value: 779, name: 'PIMREG', orig: 'ARPHRD_PIMREG', docs: [
            'PIMSM register interface',
        ] },
        { value: 780, name: 'HIPPI', orig: 'ARPHRD_HIPPI', docs: [
            'High Performance Parallel Interface',
        ] },
        { value: 781, name: 'ASH', orig: 'ARPHRD_ASH', docs: [
            'Nexus 64Mbps Ash',
        ] },
        { value: 782, name: 'ECONET', orig: 'ARPHRD_ECONET', docs: [
            'Acorn Econet',
        ] },
        { value: 783, name: 'IRDA', orig: 'ARPHRD_IRDA', docs: [
            'Linux-IrDA',
        ] },
        { value: 784, name: 'FCPP', orig: 'ARPHRD_FCPP', docs: [
            'Point to point fibrechannel',
        ] },
        { value: 785, name: 'FCAL', orig: 'ARPHRD_FCAL', docs: [
            'Fibrechannel arbitrated loop',
        ] },
        { value: 786, name: 'FCPL', orig: 'ARPHRD_FCPL', docs: [
            'Fibrechannel public loop',
        ] },
        { value: 787, name: 'FCFABRIC', orig: 'ARPHRD_FCFABRIC', docs: [
            'Fibrechannel fabric',
        ] },
        { value: 800, name: 'IEEE802_TR', orig: 'ARPHRD_IEEE802_TR', docs: [
            'Magic type ident for TR',
        ] },
        { value: 801, name: 'IEEE80211', orig: 'ARPHRD_IEEE80211', docs: [
            'IEEE 802.11',
        ] },
        { value: 802, name: 'IEEE80211_PRISM', orig: 'ARPHRD_IEEE80211_PRISM', docs: [
            'IEEE 802.11 + Prism2 header',
        ] },
        { value: 803, name: 'IEEE80211_RADIOTAP', orig: 'ARPHRD_IEEE80211_RADIOTAP', docs: [
            'IEEE 802.11 + radiotap header',
        ] },
        { value: 804, name: 'IEEE802154', orig: 'ARPHRD_IEEE802154' },
        { value: 805, name: 'IEEE802154_MONITOR', orig: 'ARPHRD_IEEE802154_MONITOR', docs: [
            'IEEE 802.15.4 network monitor',
        ] },
        { value: 820, name: 'PHONET', orig: 'ARPHRD_PHONET', docs: [
            'PhoNet media type',
        ] },
        { value: 821, name: 'PHONET_PIPE', orig: 'ARPHRD_PHONET_PIPE', docs: [
            'PhoNet pipe header',
        ] },
        { value: 822, name: 'CAIF', orig: 'ARPHRD_CAIF', docs: [
            'CAIF media type',
        ] },
        { value: 823, name: 'IP6GRE', orig: 'ARPHRD_IP6GRE', docs: [
            'GRE over IPv6',
        ] },
        { value: 824, name: 'NETLINK', orig: 'ARPHRD_NETLINK', docs: [
            'Netlink header',
        ] },
        { value: 825, name: '_6LOWPAN', orig: 'ARPHRD_6LOWPAN', docs: [
            'IPv6 over LoWPAN',
        ] },
        { value: 826, name: 'VSOCKMON', orig: 'ARPHRD_VSOCKMON', docs: [
            'Vsock monitor header',
        ] },
        { value: 0xFFFF, name: 'VOID', orig: 'ARPHRD_VOID', docs: [
            'Void type, nothing is known',
        ] },
        { value: 0xFFFE, name: 'NONE', orig: 'ARPHRD_NONE', docs: [
            'zero header length',
        ] },
    ]},

    // PREFIXES //

    Prefix: { root: true, kind: 'struct', orig: 'prefixmsg', docs: [
        'prefix information',
    ], attrs: [
        ['family', u8, { orig: 'prefix_family' }],
        ['__pad1', u8, { orig: 'prefix_pad1' }],
        ['__pad2', u16, { orig: 'prefix_pad2' }],
        ['ifindex', s32, { orig: 'prefix_ifindex' }],
        ['type', u8, { orig: 'prefix_type' }],
        ['len', u8, { orig: 'prefix_len' }],
        ['flags', u8, { orig: 'prefix_flags' }],
        ['__pad3', u8, { orig: 'prefix_pad3' }],
    ]},

    PrefixAttrs: { attrs: [
        ['address', data, { orig: 'PREFIX_ADDRESS' }],
        ['cacheInfo', 'PrefixCacheInfo', { orig: 'PREFIX_CACHEINFO' }],
    ]},

    PrefixCacheInfo: { kind: 'struct', orig: 'prefix_cacheinfo', attrs: [
        ['preferredTime', u32, { orig: 'preferred_time' }],
        ['validTime', u32, { orig: 'valid_time' }],
    ]},

    // TRAFFIC CONTROL NODES //

    Tc: { root: true, kind: 'struct', orig: 'tcmsg', docs: [
        'Queueing discipline, class or filter',
    ], attrs: [
        ['family', u8, { orig: 'tcm_family' }],
        ['__pad1', u8, { orig: 'tcm__pad1' }],
        ['__pad2', u16, { orig: 'tcm__pad2' }],
        ['ifindex', s32, { orig: 'tcm_ifindex' }],
        ['handle', u32, { orig: 'tcm_handle', docs: ['Qdisc handle'] }],
        ['parent', u32, { orig: 'tcm_parent', docs: ['Parent qdisc'] }],
        ['info', u32, { orig: 'tcm_info' }],
    ]},

    TcAttrs: { attrs: [
        ['kind', string, { orig: 'TCA_KIND' }],
        ['options', data, { orig: 'TCA_OPTIONS' }],
        ['stats', data, { orig: 'TCA_STATS' }],
        ['xstats', data, { orig: 'TCA_XSTATS' }],
        ['rate', data, { orig: 'TCA_RATE' }],
        ['fcnt', data, { orig: 'TCA_FCNT' }],
        ['stats2', data, { orig: 'TCA_STATS2' }],
        ['stab', data, { orig: 'TCA_STAB' }],
        ['__pad', data, { orig: 'TCA_PAD' }],
        ['dumpInvisible', data, { orig: 'TCA_DUMP_INVISIBLE' }],
        ['chain', u32, { orig: 'TCA_CHAIN' }],
        ['hwOffload', data, { orig: 'TCA_HW_OFFLOAD' }],
        ['ingressBlock', data, { orig: 'TCA_INGRESS_BLOCK' }],
        ['egressBlock', data, { orig: 'TCA_EGRESS_BLOCK' }],
    ]},

    // TRAFFIC CONTROL ACTIONS //

    TcAction: { root: true, kind: 'struct', orig: 'tcamsg', docs: [
        'TC action piece',
    ], attrs: [
        ['family', u8, { orig: 'tca_family' }],
        ['__pad1', u8, { orig: 'tca__pad1' }],
        ['__pad2', u16, { orig: 'tca__pad2' }],
    ]},

    TcActionRoot: { attrs: [
        ['tab', data, { orig: 'TCA_ROOT_TAB' }],
        ['flags', data, { type: 'TcActionFlags', orig: 'TCA_ROOT_FLAGS' }],
        ['count', data, { orig: 'TCA_ROOT_COUNT' }],
        ['timeDelta', data, { orig: 'TCA_ROOT_TIME_DELTA', docs: [
            'in msecs',
        ] }],
    ]},

    TcActionFlags: { kind: 'flags', orig: 'tca_flags', docs: [
        'TCA_FLAG_LARGE_DUMP_ON user->kernel to request for larger than TCA_ACT_MAX_PRIO',
        'actions in a dump. All dump responses will contain the number of actions',
        "being dumped stored in for user app's consumption in TCA_ROOT_COUNT",
    ], values: [
        { value: (1 << 0), name: 'largeDumpOn', orig: 'TCA_FLAG_LARGE_DUMP_ON' },
    ]},

    // NEIGHBOR DISCOVERY //

    NdUserOption: { root: true, kind: 'struct', orig: 'nduseroptmsg', docs: [ // FIXME
        'Neighbor Discovery userland options',
    ], attrs: [
        ['family', u8, { orig: 'nduseropt_family' }],
        ['__pad1', u8, { orig: 'nduseropt_pad1' }],
        ['optsLen', u16, { orig: 'nduseropt_opts_len', docs: [
            'Total length of options',
        ] }],
        ['ifindex', s32, { orig: 'nduseropt_ifindex' }],
        ['icmpType', u8, { orig: 'nduseropt_icmp_type' }],
        ['icmpCode', u8, { orig: 'nduseropt_icmp_code' }],
        ['__pad2', u16, { orig: 'nduseropt_pad2' }],
        ['__pad3', u32, { orig: 'nduseropt_pad3' }],
    ]},

    NdUserOptionAttrs: { attrs: [
        ['srcaddr', data, { orig: 'NDUSEROPT_SRCADDR' }],
    ]},

    // NEIGHBORS //

    Neighbor: { root: true, kind: 'struct', orig: 'ndmsg', attrs: [
        ['family', u8, { orig: 'ndm_family' }],
        ['__pad1', u8, { orig: 'ndm_pad1' }],
        ['__pad2', u16, { orig: 'ndm_pad2' }],
        ['ifindex', s32, { orig: 'ndm_ifindex' }],
        ['state', u16, { type: 'NeighborState', orig: 'ndm_state' }],
        ['flags', u8, { type: 'NeighborFlags', orig: 'ndm_flags' }],
        ['type', u8, { orig: 'ndm_type' }],
    ]},

    NeighborAttrs: { attrs: [
        ['dst', data, { orig: 'NDA_DST' }],
        ['lladdr', data, { orig: 'NDA_LLADDR' }],
        ['cacheInfo', 'NeighborCacheInfo', { orig: 'NDA_CACHEINFO' }],
        ['probes', u32, { orig: 'NDA_PROBES' }],
        ['vlan', u16, { orig: 'NDA_VLAN' }],
        ['port', data, { orig: 'NDA_PORT' }],
        ['vni', data, { orig: 'NDA_VNI' }],
        ['ifindex', data, { orig: 'NDA_IFINDEX' }],
        ['master', u32, { orig: 'NDA_MASTER' }],
        ['linkNetnsid', data, { orig: 'NDA_LINK_NETNSID' }],
        ['srcVni', data, { orig: 'NDA_SRC_VNI' }],
        ['protocol', data, { orig: 'NDA_PROTOCOL', docs: [
            'Originator of entry',
        ] }],
    ]},

    NeighborFlags: { kind: 'flags', docs: [
        'Neighbor Cache Entry Flags',
    ], values: [
        { value: 0x01, name: 'use', orig: 'NTF_USE' },
        { value: 0x02, name: 'self', orig: 'NTF_SELF' },
        { value: 0x04, name: 'master', orig: 'NTF_MASTER' },
        { value: 0x08, name: 'proxy', orig: 'NTF_PROXY', docs: [
            '== ATF_PUBL',
        ] },
        { value: 0x10, name: 'extLearned', orig: 'NTF_EXT_LEARNED' },
        { value: 0x20, name: 'offloaded', orig: 'NTF_OFFLOADED' },
        { value: 0x40, name: 'sticky', orig: 'NTF_STICKY' },
        { value: 0x80, name: 'router', orig: 'NTF_ROUTER' },
    ]},

    NeighborState: { kind: 'flags', docs: [
        'Neighbor Cache Entry States.',
        '',
        'NUD_NOARP & NUD_PERMANENT are pseudostates, they never change',
        'and make no address resolution or NUD.',
        'NUD_PERMANENT also cannot be deleted by garbage collectors.',
    ], values: [
        { value: 0x01, name: 'incomplete', orig: 'NUD_INCOMPLETE' },
        { value: 0x02, name: 'reachable', orig: 'NUD_REACHABLE' },
        { value: 0x04, name: 'stale', orig: 'NUD_STALE' },
        { value: 0x08, name: 'delay', orig: 'NUD_DELAY' },
        { value: 0x10, name: 'probe', orig: 'NUD_PROBE' },
        { value: 0x20, name: 'failed', orig: 'NUD_FAILED' },
        { value: 0x40, name: 'noarp', orig: 'NUD_NOARP', docs: [
            'Dummy states',
        ] },
        { value: 0x80, name: 'permanent', orig: 'NUD_PERMANENT' },
    ]},

    NeighborCacheInfo: { kind: 'struct', orig: 'nda_cacheinfo', attrs: [
        ['confirmed', u32, { orig: 'ndm_confirmed' }],
        ['used', u32, { orig: 'ndm_used' }],
        ['updated', u32, { orig: 'ndm_updated' }],
        ['refcnt', u32, { orig: 'ndm_refcnt' }],
    ]},

    // NEIGHBOR TABLES //

    NeighborTable: { root: true, kind: 'struct', orig: 'ndtmsg', docs: [
        'Neighbour tables specific messages.',
        '',
        'To retrieve the neighbour tables send RTM_GETNEIGHTBL with the',
        'NLM_F_DUMP flag set. Every neighbour table configuration is',
        'spread over multiple messages to avoid running into message',
        'size limits on systems with many interfaces. The first message',
        'in the sequence transports all not device specific data such as',
        'statistics, configuration, and the default parameter set.',
        'This message is followed by 0..n messages carrying device',
        'specific parameter sets.',
        'Although the ordering should be sufficient, NDTA_NAME can be',
        'used to identify sequences. The initial message can be identified',
        'by checking for NDTA_CONFIG. The device specific messages do',
        'not contain this TLV but have NDTPA_IFINDEX set to the',
        'corresponding interface index.',
        '',
        'To change neighbour table attributes, send RTM_SETNEIGHTBL',
        'with NDTA_NAME set. Changeable attribute include NDTA_THRESH[1-3],',
        'NDTA_GC_INTERVAL, and all TLVs in NDTA_PARMS unless marked',
        'otherwise. Device specific parameter sets can be changed by',
        'setting NDTPA_IFINDEX to the interface index of the corresponding',
        'device.',
    ], attrs: [
        ['family', u8, { orig: 'ndtm_family' }],
        ['__pad1', u8, { orig: 'ndtm_pad1' }],
        ['__pad2', u16, { orig: 'ndtm_pad2' }],
    ]},

    NeighborTableAttrs: { attrs: [
        ['name', string, { orig: 'NDTA_NAME', docs: [
            'char *, unchangeable',
        ] }],
        ['thresh1', u32, { orig: 'NDTA_THRESH1', docs: [
            'u32',
        ] }],
        ['thresh2', u32, { orig: 'NDTA_THRESH2' }],
        ['thresh3', u32, { orig: 'NDTA_THRESH3' }],
        ['config', 'NeighborTableConfig', { orig: 'NDTA_CONFIG', docs: [
            'struct ndt_config, read-only',
        ] }],
        ['parms', 'NeighborTableParams', { orig: 'NDTA_PARMS', docs: [
            'nested TLV NDTPA_*',
        ] }],
        ['stats', 'NeighborTableStats', { orig: 'NDTA_STATS', docs: [
            'struct ndt_stats, read-only',
        ] }],
        ['gcInterval', u64, { orig: 'NDTA_GC_INTERVAL', docs: [
            'u64, msecs',
        ] }],
        ['__pad', data, { orig: 'NDTA_PAD' }],
    ]},

    NeighborTableConfig: { kind: 'struct', orig: 'ndt_config', attrs: [
        ['keyLen', u16, { orig: 'ndtc_key_len' }],
        ['entrySize', u16, { orig: 'ndtc_entry_size' }],
        ['entries', u32, { orig: 'ndtc_entries' }],
        ['lastFlush', u32, { orig: 'ndtc_last_flush', docs: [
            'delta to now in msecs',
        ] }],
        ['lastRand', u32, { orig: 'ndtc_last_rand' }],
        ['hashRnd', u32, { orig: 'ndtc_hash_rnd' }],
        ['hashMask', u32, { orig: 'ndtc_hash_mask' }],
        ['hashChainGc', u32, { orig: 'ndtc_hash_chain_gc' }],
        ['proxyQlen', u32, { orig: 'ndtc_proxy_qlen' }],
    ]},

    NeighborTableStats: { kind: 'struct', orig: 'ndt_stats', attrs: [
        ['allocs', u64, { orig: 'ndts_allocs' }],
        ['destroys', u64, { orig: 'ndts_destroys' }],
        ['hashGrows', u64, { orig: 'ndts_hash_grows' }],
        ['resFailed', u64, { orig: 'ndts_res_failed' }],
        ['lookups', u64, { orig: 'ndts_lookups' }],
        ['hits', u64, { orig: 'ndts_hits' }],
        ['rcvProbesMcast', u64, { orig: 'ndts_rcv_probes_mcast' }],
        ['rcvProbesUcast', u64, { orig: 'ndts_rcv_probes_ucast' }],
        ['periodicGcRuns', u64, { orig: 'ndts_periodic_gc_runs' }],
        ['forcedGcRuns', u64, { orig: 'ndts_forced_gc_runs' }],
        ['tableFulls', u64, { orig: 'ndts_table_fulls' }],
    ]},

    NeighborTableParams: { attrs: [
        ['ifindex', u32, { orig: 'NDTPA_IFINDEX', docs: [
            'u32, unchangeable',
        ] }],
        ['refcnt', u32, { orig: 'NDTPA_REFCNT', docs: [
            'u32, read-only',
        ] }],
        ['reachableTime', u64, { orig: 'NDTPA_REACHABLE_TIME', docs: [
            'u64, read-only, msecs',
        ] }],
        ['baseReachableTime', u64, { orig: 'NDTPA_BASE_REACHABLE_TIME', docs: [
            'u64, msecs',
        ] }],
        ['retransTime', u64, { orig: 'NDTPA_RETRANS_TIME' }],
        ['gcStaletime', u64, { orig: 'NDTPA_GC_STALETIME' }],
        ['delayProbeTime', u64, { orig: 'NDTPA_DELAY_PROBE_TIME' }],
        ['queueLen', u32, { orig: 'NDTPA_QUEUE_LEN', docs: [
            'u32',
        ] }],
        ['appProbes', u32, { orig: 'NDTPA_APP_PROBES' }],
        ['ucastProbes', u32, { orig: 'NDTPA_UCAST_PROBES' }],
        ['mcastProbes', u32, { orig: 'NDTPA_MCAST_PROBES' }],
        ['anycastDelay', u64, { orig: 'NDTPA_ANYCAST_DELAY', docs: [
            'u64, msecs',
        ] }],
        ['proxyDelay', u64, { orig: 'NDTPA_PROXY_DELAY' }],
        ['proxyQlen', u32, { orig: 'NDTPA_PROXY_QLEN', docs: [
            'u32',
        ] }],
        ['locktime', u64, { orig: 'NDTPA_LOCKTIME', docs: [
            'u64, msecs',
        ] }],
        ['queueLenbytes', u32, { orig: 'NDTPA_QUEUE_LENBYTES', docs: [
            'u32',
        ] }],
        ['mcastReprobes', u32, { orig: 'NDTPA_MCAST_REPROBES' }],
        ['__pad', data, { orig: 'NDTPA_PAD' }],
    ]},

    // FORWARDING RULES //
    // ("FIB" removed from identifiers)

    Rule: { root: true, kind: 'struct', orig: 'fib_rule_hdr', attrs: [
        ['family', u8, { orig: 'family' }],
        ['dstLen', u8, { orig: 'dst_len' }],
        ['srcLen', u8, { orig: 'src_len' }],
        ['tos', u8, { orig: 'tos' }],

        ['table', u8, { orig: 'table' }],
        ['__reserved1', u8, { orig: 'res1', docs: [
            'reserved',
        ] }],
        ['__reserved2', u8, { orig: 'res2', docs: [
            'reserved',
        ] }],
        ['action', u8, { type: 'RuleAction', orig: 'action' }],

        ['flags', u32, { type: 'RuleFlags', orig: 'flags' }],
    ]},

    RuleAttrs: { attrs: [
        ['dst', data, { orig: 'FRA_DST', docs: [
            'destination address',
        ] }],
        ['src', data, { orig: 'FRA_SRC', docs: [
            'source address',
        ] }],
        ['iifname', string, { orig: 'FRA_IIFNAME', docs: [
            'input interface name (deprecated alias FRA_IFNAME)',
        ] }],
        ['goto', u32, { orig: 'FRA_GOTO', docs: [
            'target to jump to (RuleAction.GOTO)',
        ] }],
        ['unused2', data, { orig: 'FRA_UNUSED2' }],
        ['priority', u32, { orig: 'FRA_PRIORITY', docs: [
            'priority/preference',
        ] }],
        ['unused3', data, { orig: 'FRA_UNUSED3' }],
        ['unused4', data, { orig: 'FRA_UNUSED4' }],
        ['unused5', data, { orig: 'FRA_UNUSED5' }],
        ['fwmark', u32, { orig: 'FRA_FWMARK', docs: [
            'netfilter mark',
        ] }],
        ['flow', u32, { orig: 'FRA_FLOW', docs: [
            'flow/class id',
        ] }],
        ['tunId', data, { orig: 'FRA_TUN_ID' }],
        ['suppressIfgroup', data, { orig: 'FRA_SUPPRESS_IFGROUP' }],
        ['suppressPrefixlen', data, { orig: 'FRA_SUPPRESS_PREFIXLEN' }],
        ['table', u32, { orig: 'FRA_TABLE', docs: [
            'Extended table id',
        ] }],
        ['fwmask', u32, { orig: 'FRA_FWMASK', docs: [
            'mask for {@link fwmark}',
        ] }],
        ['oifname', string, { orig: 'FRA_OIFNAME', docs: [
            'output interface name',
        ] }],
        ['__pad', data, { orig: 'FRA_PAD' }],
        ['l3Mdev', u8, { orig: 'FRA_L3MDEV', docs: [
            'iif or oif is l3mdev goto its table',
        ] }],
        ['uidRange', 'RuleUidRange', { orig: 'FRA_UID_RANGE' }],
        ['protocol', u8, { orig: 'FRA_PROTOCOL', docs: [
            'Originator of the rule',
        ] }],
        ['ipProto', u8, { orig: 'FRA_IP_PROTO' }],
        ['sportRange', 'RulePortRange', { orig: 'FRA_SPORT_RANGE' }],
        ['dportRange', 'RulePortRange', { orig: 'FRA_DPORT_RANGE' }],
    ]},

    RuleFlags: { kind: 'flags', values: [
        { value: 1 << 0, name: 'permanent', orig: 'FIB_RULE_PERMANENT', docs: [
            'rule is permanent, and cannot be deleted',
        ] },
        { value: 1 << 1, name: 'invert', orig: 'FIB_RULE_INVERT' },
        { value: 1 << 2, name: 'unresolved', orig: 'FIB_RULE_UNRESOLVED' },
        { value: 1 << 3, name: 'iifDetached', orig: 'FIB_RULE_IIF_DETACHED', docs: [
            'input interface detached (deprecated alias FIB_RULE_DEV_DETACHED)',
        ] },
        { value: 1 << 4, name: 'oifDetached', orig: 'FIB_RULE_OIF_DETACHED', docs: [
            'output interface detached',
        ] },

        { value: 1 << 16, name: 'findSaddr', orig: 'FIB_RULE_FIND_SADDR', docs: [
            'try to find source address in routing lookups',
        ] },
    ]},

    RuleUidRange: { kind: 'struct', orig: 'fib_rule_uid_range', attrs: [
        ['start', u32, { orig: 'start' }],
        ['end', u32, { orig: 'end' }],
    ]},

    RulePortRange: { kind: 'struct', orig: 'fib_rule_port_range', attrs: [
        ['start', u16, { orig: 'start' }],
        ['end', u16, { orig: 'end' }],
    ]},

    RuleAction: { kind: 'enum', values: [
        { value: 0, name: 'unspec', orig: 'FR_ACT_UNSPEC' },
        { value: 1, name: 'toTbl', orig: 'FR_ACT_TO_TBL', docs: [
            'Pass to fixed table',
        ] },
        { value: 2, name: 'goto', orig: 'FR_ACT_GOTO', docs: [
            'Jump to another rule',
        ] },
        { value: 3, name: 'nop', orig: 'FR_ACT_NOP', docs: [
            'No operation',
        ] },
        { value: 4, name: 'res3', orig: 'FR_ACT_RES3' },
        { value: 5, name: 'res4', orig: 'FR_ACT_RES4' },
        { value: 6, name: 'blackhole', orig: 'FR_ACT_BLACKHOLE', docs: [
            'Drop without notification',
        ] },
        { value: 7, name: 'unreachable', orig: 'FR_ACT_UNREACHABLE', docs: [
            'Drop with ENETUNREACH',
        ] },
        { value: 8, name: 'prohibit', orig: 'FR_ACT_PROHIBIT', docs: [
            'Drop with EACCES',
        ] },
    ]},

    // NEXT HOP //

    NextHop: { root: true, kind: 'struct', orig: 'nhmsg', attrs: [
        ['family', u8, { orig: 'nh_family' }],
        ['scope', u8, { orig: 'nh_scope', docs: [
            'return only',
        ] }],
        ['protocol', u8, { orig: 'nh_protocol', docs: [
            'Routing protocol that installed nexthop',
        ] }],
        ['__reserved', u8, { orig: 'resvd' }],
        ['flags', u32, { type: 'RouteNextHopFlags', orig: 'nh_flags' }],
    ]},

    NextHopAttrs: { attrs: [
        ['id', u32, { orig: 'NHA_ID', docs: [
            'id for nexthop. id == 0 means auto-assign',
        ] }],

        ['group', data /* FIXME: array('NextHopGroup') */, { orig: 'NHA_GROUP', docs: [
            '[if this attribute is present: no other attributes can be set (other than `id` and `groupType`)]',
        ] }],
        ['groupType', u16, { type: 'NextHopGroupType', orig: 'NHA_GROUP_TYPE' }],

        ['blackhole', flag, { orig: 'NHA_BLACKHOLE', docs: [
            'nexthop used to blackhole packets',
            '[if this attribute is present: OIF, GATEWAY, ENCAP can not be set]',
        ] }],

        ['oif', u32, { orig: 'NHA_OIF', docs: [
            'nexthop device',
            '[can be appended to dump request to return only nexthops using given device]',
        ] }],
        ['gateway', data, { orig: 'NHA_GATEWAY', docs: [
            'be32 (IPv4) or in6_addr (IPv6) gw address',
        ] }],
        ['encapType', u16, { orig: 'NHA_ENCAP_TYPE', docs: [
            'lwt encap type',
        ] }],
        ['encap', data, { orig: 'NHA_ENCAP', docs: [
            'lwt encap data',
        ] }],

        ['groups', flag, { orig: 'NHA_GROUPS', docs: [
            'only return nexthop groups in dump',
        ] }],
        ['master', u32, { orig: 'NHA_MASTER', docs: [
            'only return nexthops with given master dev',
        ] }],

        ['fdb', flag, { orig: 'NHA_FDB', docs: [
            'nexthop belongs to a bridge fdb',
            '[if this attribute is present: OIF, BLACKHOLE, ENCAP cannot be set]',
        ] }],

        ['resGroup', 'NextHopResGroup', { orig: 'NHA_RES_GROUP', docs: [
            'resilient nexthop group attributes',
        ] }],
        ['resBucket', 'NextHopResBucket', { orig: 'NHA_RES_BUCKET', docs: [
            'nexthop bucket attributes',
        ] }],
    ]},

    NextHopGroup: { kind: 'struct', orig: 'nexthop_grp', docs: [
        'entry in a nexthop group',
    ], attrs: [
        ['id', u32, { orig: 'id', docs: [
            'nexthop id - must exist',
        ] }],
        ['weight', u8, { orig: 'weight', docs: [
            'weight of this nexthop',
        ] }],
        ['__reserved1', u8, { orig: 'resvd1' }],
        ['__reserved2', u16, { orig: 'resvd2' }],
    ]},

    NextHopGroupType: { kind: 'enum', values: [
        { value: 0, name: 'multipath', orig: 'NEXTHOP_GRP_TYPE_MPATH', docs: [
            'hash-threshold nexthop group',
            '(default type if not specified)',
        ] },
        { value: 1, name: 'resilient', orig: 'NEXTHOP_GRP_TYPE_RES', docs: [
            'resilient nexthop group',
        ] },
    ]},

    'NextHopResGroup': { kind: 'attrs', zero: true, attrs: [
        ['__pad', data, { orig: 'NHA_RES_GROUP_PAD', docs: [
            'Pad attribute for 64-bit alignment.',
        ] }],

        ['buckets', u16, { orig: 'NHA_RES_GROUP_BUCKETS', docs: [
            'number of nexthop buckets in a resilient nexthop group',
        ] }],
        ['idleTimer', u32, { orig: 'NHA_RES_GROUP_IDLE_TIMER', docs: [
            'clock_t; nexthop bucket idle timer (per-group)',
        ] }],
        ['unbalancedTimer', u32, { orig: 'NHA_RES_GROUP_UNBALANCED_TIMER', docs: [
            'clock_t; nexthop unbalanced timer',
        ] }],
        ['unbalancedTime', u64, { orig: 'NHA_RES_GROUP_UNBALANCED_TIME', docs: [
            'clock_t; nexthop unbalanced time',
        ] }],
    ]},

    'NextHopResBucket': { kind: 'attrs', zero: true, attrs: [
        ['__pad', data, { orig: 'NHA_RES_BUCKET_PAD', docs: [
            'Pad attribute for 64-bit alignment.',
        ] }],

        ['index', u16, { orig: 'NHA_RES_BUCKET_INDEX', docs: [
            'u16; nexthop bucket index',
        ] }],
        ['idleTime', u64, { orig: 'NHA_RES_BUCKET_IDLE_TIME', docs: [
            'clock_t; nexthop bucket idle time',
        ] }],
        ['nexthopId', u32, { orig: 'NHA_RES_BUCKET_NH_ID', docs: [
            'nexthop id assigned to the nexthop bucket',
        ] }],
    ]},
}

types
