/**
 * iproute link interface
 * 
 * Based on
 *   <linux/if_link.h>
 *   <linux/if_vlan.h>
 *   <linux/veth.h>
 *   <linux/if_bridge.h>
 *   <linux/if_tunnel.h>
 *   <linux/can/netlink.h>
 * at d1ea35f
 */

import { TypeStore, data, bool, flag, u8, u16, u32, u64, s8, s16, s32, s64, f32, f64, string, array, map, asflags } from './_base'

const types: TypeStore = {
    LinkStats: { kind: 'struct', orig: 'rtnl_link_stats', docs: [
        'This struct should be in sync with struct rtnl_link_stats64',
    ], attrs: [
        ['rxPackets', u32, { orig: 'rx_packets', docs: [
            'total packets received',
        ] }],
        ['txPackets', u32, { orig: 'tx_packets', docs: [
            'total packets transmitted',
        ] }],
        ['rxBytes', u32, { orig: 'rx_bytes', docs: [
            'total bytes received',
        ] }],
        ['txBytes', u32, { orig: 'tx_bytes', docs: [
            'total bytes transmitted',
        ] }],
        ['rxErrors', u32, { orig: 'rx_errors', docs: [
            'bad packets received',
        ] }],
        ['txErrors', u32, { orig: 'tx_errors', docs: [
            'packet transmit problems',
        ] }],
        ['rxDropped', u32, { orig: 'rx_dropped', docs: [
            'no space in linux buffers',
        ] }],
        ['txDropped', u32, { orig: 'tx_dropped', docs: [
            'no space available in linux',
        ] }],
        ['multicast', u32, { orig: 'multicast', docs: [
            'multicast packets received',
        ] }],
        ['collisions', u32, { orig: 'collisions' }],
        ['rxLengthErrors', u32, { orig: 'rx_length_errors', docs: [
            'detailed rx_errors:',
        ] }],
        ['rxOverErrors', u32, { orig: 'rx_over_errors', docs: [
            'receiver ring buff overflow',
        ] }],
        ['rxCrcErrors', u32, { orig: 'rx_crc_errors', docs: [
            'recved pkt with crc error',
        ] }],
        ['rxFrameErrors', u32, { orig: 'rx_frame_errors', docs: [
            "recv'd frame alignment error",
        ] }],
        ['rxFifoErrors', u32, { orig: 'rx_fifo_errors', docs: [
            "recv'r fifo overrun",
        ] }],
        ['rxMissedErrors', u32, { orig: 'rx_missed_errors', docs: [
            'receiver missed packet',
        ] }],
        ['txAbortedErrors', u32, { orig: 'tx_aborted_errors', docs: [
            'detailed tx_errors',
        ] }],
        ['txCarrierErrors', u32, { orig: 'tx_carrier_errors' }],
        ['txFifoErrors', u32, { orig: 'tx_fifo_errors' }],
        ['txHeartbeatErrors', u32, { orig: 'tx_heartbeat_errors' }],
        ['txWindowErrors', u32, { orig: 'tx_window_errors' }],
        ['rxCompressed', u32, { orig: 'rx_compressed', docs: [
            'for cslip etc',
        ] }],
        ['txCompressed', u32, { orig: 'tx_compressed' }],
        ['rxNohandler', u32, { orig: 'rx_nohandler', docs: [
            'dropped, no handler found',
        ] }],
    ]},

    LinkStats64: { kind: 'struct', orig: 'rtnl_link_stats64', docs: [
        'The main device statistics structure',
    ], attrs: [
        ['rxPackets', u64, { orig: 'rx_packets', docs: [
            'total packets received',
        ] }],
        ['txPackets', u64, { orig: 'tx_packets', docs: [
            'total packets transmitted',
        ] }],
        ['rxBytes', u64, { orig: 'rx_bytes', docs: [
            'total bytes received',
        ] }],
        ['txBytes', u64, { orig: 'tx_bytes', docs: [
            'total bytes transmitted',
        ] }],
        ['rxErrors', u64, { orig: 'rx_errors', docs: [
            'bad packets received',
        ] }],
        ['txErrors', u64, { orig: 'tx_errors', docs: [
            'packet transmit problems',
        ] }],
        ['rxDropped', u64, { orig: 'rx_dropped', docs: [
            'no space in linux buffers',
        ] }],
        ['txDropped', u64, { orig: 'tx_dropped', docs: [
            'no space available in linux',
        ] }],
        ['multicast', u64, { orig: 'multicast', docs: [
            'multicast packets received',
        ] }],
        ['collisions', u64, { orig: 'collisions' }],
        ['rxLengthErrors', u64, { orig: 'rx_length_errors', docs: [
            'detailed rx_errors:',
        ] }],
        ['rxOverErrors', u64, { orig: 'rx_over_errors', docs: [
            'receiver ring buff overflow',
        ] }],
        ['rxCrcErrors', u64, { orig: 'rx_crc_errors', docs: [
            'recved pkt with crc error',
        ] }],
        ['rxFrameErrors', u64, { orig: 'rx_frame_errors', docs: [
            "recv'd frame alignment error",
        ] }],
        ['rxFifoErrors', u64, { orig: 'rx_fifo_errors', docs: [
            "recv'r fifo overrun",
        ] }],
        ['rxMissedErrors', u64, { orig: 'rx_missed_errors', docs: [
            'receiver missed packet',
        ] }],
        ['txAbortedErrors', u64, { orig: 'tx_aborted_errors', docs: [
            'detailed tx_errors',
        ] }],
        ['txCarrierErrors', u64, { orig: 'tx_carrier_errors' }],
        ['txFifoErrors', u64, { orig: 'tx_fifo_errors' }],
        ['txHeartbeatErrors', u64, { orig: 'tx_heartbeat_errors' }],
        ['txWindowErrors', u64, { orig: 'tx_window_errors' }],
        ['rxCompressed', u64, { orig: 'rx_compressed', docs: [
            'for cslip etc',
        ] }],
        ['txCompressed', u64, { orig: 'tx_compressed' }],
        ['rxNohandler', u64, { orig: 'rx_nohandler', docs: [
            'dropped, no handler found',
        ] }],
    ]},

    LinkInterfaceMap: { kind: 'struct', orig: 'rtnl_link_ifmap', docs: [
        'The struct should be in sync with struct ifmap',
    ], attrs: [
        ['memStart', u64, { orig: 'mem_start' }],
        ['memEnd', u64, { orig: 'mem_end' }],
        ['baseAddr', u64, { orig: 'base_addr' }],
        ['irq', u16, { orig: 'irq' }],
        ['dma', u8, { orig: 'dma' }],
        ['port', u8, { orig: 'port' }],
    ]},

    Message: { root: true, attrs: [
        ['address', data, { orig: 'IFLA_ADDRESS' }],
        ['broadcast', data, { orig: 'IFLA_BROADCAST' }],
        ['ifname', string, { orig: 'IFLA_IFNAME' }],
        ['mtu', u32, { orig: 'IFLA_MTU' }],
        ['link', data, { orig: 'IFLA_LINK' }],
        ['qdisc', string, { orig: 'IFLA_QDISC' }],
        ['stats', 'LinkStats', { orig: 'IFLA_STATS' }],
        ['cost', data, { orig: 'IFLA_COST' }],
        ['priority', data, { orig: 'IFLA_PRIORITY' }],
        ['master', u32, { orig: 'IFLA_MASTER' }],
        ['wireless', data, { orig: 'IFLA_WIRELESS', docs: [
            'Wireless Extension event - see wireless.h',
        ] }],
        ['protinfo', data, { orig: 'IFLA_PROTINFO', docs: [
            'Protocol specific information for a link',
        ] }],
        ['txqlen', u32, { orig: 'IFLA_TXQLEN' }],
        ['map', data, { orig: 'IFLA_MAP' }],
        ['weight', u32, { orig: 'IFLA_WEIGHT' }],
        ['operstate', u8, { orig: 'IFLA_OPERSTATE' }],
        ['linkmode', u8, { orig: 'IFLA_LINKMODE' }],
        ['linkinfo', data, { orig: 'IFLA_LINKINFO' }],
        ['netNsPid', u32, { orig: 'IFLA_NET_NS_PID' }],
        ['ifalias', string, { orig: 'IFLA_IFALIAS' }],
        ['numVf', u32, { orig: 'IFLA_NUM_VF', docs: [
            'Number of VFs if device is SR-IOV PF',
        ] }],
        ['vfinfoList', 'VirtualFunctionList', { orig: 'IFLA_VFINFO_LIST' }],
        ['stats64', 'LinkStats64', { orig: 'IFLA_STATS64' }],
        ['vfPorts', 'PortList', { orig: 'IFLA_VF_PORTS' }],
        ['portSelf', 'Port', { orig: 'IFLA_PORT_SELF' }],
        ['afSpec', map(data), { orig: 'IFLA_AF_SPEC' }],
        ['group', u32, { orig: 'IFLA_GROUP', docs: [
            'Group the device belongs to',
        ] }],
        ['netNsFd', u32, { orig: 'IFLA_NET_NS_FD' }],
        ['extMask', data, { orig: 'IFLA_EXT_MASK', docs: [
            'Extended info mask, VFs, etc',
        ] }],
        ['promiscuity', u32, { orig: 'IFLA_PROMISCUITY', docs: [
            'Promiscuity count: > 0 means acts PROMISC',
        ] }],
        ['numTxQueues', u32, { orig: 'IFLA_NUM_TX_QUEUES' }],
        ['numRxQueues', u32, { orig: 'IFLA_NUM_RX_QUEUES' }],
        ['carrier', u8, { orig: 'IFLA_CARRIER' }],
        ['physPortId', data, { orig: 'IFLA_PHYS_PORT_ID' }],
        ['carrierChanges', u32, { orig: 'IFLA_CARRIER_CHANGES' }],
        ['physSwitchId', data, { orig: 'IFLA_PHYS_SWITCH_ID' }],
        ['linkNetnsid', s32, { orig: 'IFLA_LINK_NETNSID' }],
        ['physPortName', string, { orig: 'IFLA_PHYS_PORT_NAME' }],
        ['protoDown', data, { orig: 'IFLA_PROTO_DOWN' }],
        ['gsoMaxSegs', u32, { orig: 'IFLA_GSO_MAX_SEGS' }],
        ['gsoMaxSize', u32, { orig: 'IFLA_GSO_MAX_SIZE' }],
        ['pad', data, { orig: 'IFLA_PAD' }],
        ['xdp', 'Xdp', { orig: 'IFLA_XDP' }],
        ['event', data, { type: 'Event', orig: 'IFLA_EVENT' }],
        ['newNetnsid', data, { orig: 'IFLA_NEW_NETNSID' }],
        ['ifNetnsid', data, { orig: 'IFLA_IF_NETNSID' }],
        ['targetNetnsid', data, { orig: 'IFLA_TARGET_NETNSID', docs: [
            'new alias',
        ] }],
        ['carrierUpCount', data, { orig: 'IFLA_CARRIER_UP_COUNT' }],
        ['carrierDownCount', data, { orig: 'IFLA_CARRIER_DOWN_COUNT' }],
        ['newIfindex', data, { orig: 'IFLA_NEW_IFINDEX' }],
        ['minMtu', data, { orig: 'IFLA_MIN_MTU' }],
        ['maxMtu', data, { orig: 'IFLA_MAX_MTU' }],
        ['propList', data, { orig: 'IFLA_PROP_LIST' }],
        ['altIfname', string, { orig: 'IFLA_ALT_IFNAME', docs: [
            'Alternative ifname',
        ] }],
        ['permAddress', data, { orig: 'IFLA_PERM_ADDRESS' }],
    ]},

    Inet: { attrs: [
        ['conf', data, { orig: 'IFLA_INET_CONF' }],
    ]},

    Inet6: { docs: [
        'Subtype attributes for IFLA_PROTINFO',
    ], attrs: [
        ['flags', u32, { orig: 'IFLA_INET6_FLAGS', docs: [
            'link flags',
        ] }],
        ['conf', data, { orig: 'IFLA_INET6_CONF', docs: [
            'sysctl parameters',
        ] }],
        ['stats', data, { orig: 'IFLA_INET6_STATS', docs: [
            'statistics',
        ] }],
        ['mcast', data, { orig: 'IFLA_INET6_MCAST', docs: [
            'MC things. What of them?',
        ] }],
        ['cacheinfo', data, { orig: 'IFLA_INET6_CACHEINFO', docs: [
            'time values and max reasm size',
        ] }],
        ['icmp6stats', data, { orig: 'IFLA_INET6_ICMP6STATS', docs: [
            'statistics (icmpv6)',
        ] }],
        ['token', data, { orig: 'IFLA_INET6_TOKEN', docs: [
            'device token',
        ] }],
        ['addrGenMode', u8, { orig: 'IFLA_INET6_ADDR_GEN_MODE', docs: [
            'implicit address generator mode',
        ] }],
    ]},

    In6AddrGenMode: { kind: 'enum', orig: 'in6_addr_gen_mode', values: [
        { value: 0, name: 'EUI64', orig: 'IN6_ADDR_GEN_MODE_EUI64' },
        { value: 1, name: 'NONE', orig: 'IN6_ADDR_GEN_MODE_NONE' },
        { value: 2, name: 'STABLE_PRIVACY', orig: 'IN6_ADDR_GEN_MODE_STABLE_PRIVACY' },
        { value: 3, name: 'RANDOM', orig: 'IN6_ADDR_GEN_MODE_RANDOM' },
    ]},

    Bridge: { docs: [
        'Bridge section',
    ], attrs: [
        ['forwardDelay', data, { orig: 'IFLA_BR_FORWARD_DELAY' }],
        ['helloTime', data, { orig: 'IFLA_BR_HELLO_TIME' }],
        ['maxAge', data, { orig: 'IFLA_BR_MAX_AGE' }],
        ['ageingTime', data, { orig: 'IFLA_BR_AGEING_TIME' }],
        ['stpState', data, { orig: 'IFLA_BR_STP_STATE' }],
        ['priority', data, { orig: 'IFLA_BR_PRIORITY' }],
        ['vlanFiltering', data, { orig: 'IFLA_BR_VLAN_FILTERING' }],
        ['vlanProtocol', data, { orig: 'IFLA_BR_VLAN_PROTOCOL' }],
        ['groupFwdMask', data, { orig: 'IFLA_BR_GROUP_FWD_MASK' }],
        ['rootId', data, { orig: 'IFLA_BR_ROOT_ID' }],
        ['bridgeId', data, { orig: 'IFLA_BR_BRIDGE_ID' }],
        ['rootPort', data, { orig: 'IFLA_BR_ROOT_PORT' }],
        ['rootPathCost', data, { orig: 'IFLA_BR_ROOT_PATH_COST' }],
        ['topologyChange', data, { orig: 'IFLA_BR_TOPOLOGY_CHANGE' }],
        ['topologyChangeDetected', data, { orig: 'IFLA_BR_TOPOLOGY_CHANGE_DETECTED' }],
        ['helloTimer', data, { orig: 'IFLA_BR_HELLO_TIMER' }],
        ['tcnTimer', data, { orig: 'IFLA_BR_TCN_TIMER' }],
        ['topologyChangeTimer', data, { orig: 'IFLA_BR_TOPOLOGY_CHANGE_TIMER' }],
        ['gcTimer', data, { orig: 'IFLA_BR_GC_TIMER' }],
        ['groupAddr', data, { orig: 'IFLA_BR_GROUP_ADDR' }],
        ['fdbFlush', data, { orig: 'IFLA_BR_FDB_FLUSH' }],
        ['mcastRouter', data, { orig: 'IFLA_BR_MCAST_ROUTER' }],
        ['mcastSnooping', data, { orig: 'IFLA_BR_MCAST_SNOOPING' }],
        ['mcastQueryUseIfaddr', data, { orig: 'IFLA_BR_MCAST_QUERY_USE_IFADDR' }],
        ['mcastQuerier', data, { orig: 'IFLA_BR_MCAST_QUERIER' }],
        ['mcastHashElasticity', data, { orig: 'IFLA_BR_MCAST_HASH_ELASTICITY' }],
        ['mcastHashMax', data, { orig: 'IFLA_BR_MCAST_HASH_MAX' }],
        ['mcastLastMemberCnt', data, { orig: 'IFLA_BR_MCAST_LAST_MEMBER_CNT' }],
        ['mcastStartupQueryCnt', data, { orig: 'IFLA_BR_MCAST_STARTUP_QUERY_CNT' }],
        ['mcastLastMemberIntvl', data, { orig: 'IFLA_BR_MCAST_LAST_MEMBER_INTVL' }],
        ['mcastMembershipIntvl', data, { orig: 'IFLA_BR_MCAST_MEMBERSHIP_INTVL' }],
        ['mcastQuerierIntvl', data, { orig: 'IFLA_BR_MCAST_QUERIER_INTVL' }],
        ['mcastQueryIntvl', data, { orig: 'IFLA_BR_MCAST_QUERY_INTVL' }],
        ['mcastQueryResponseIntvl', data, { orig: 'IFLA_BR_MCAST_QUERY_RESPONSE_INTVL' }],
        ['mcastStartupQueryIntvl', data, { orig: 'IFLA_BR_MCAST_STARTUP_QUERY_INTVL' }],
        ['nfCallIptables', data, { orig: 'IFLA_BR_NF_CALL_IPTABLES' }],
        ['nfCallIp6tables', data, { orig: 'IFLA_BR_NF_CALL_IP6TABLES' }],
        ['nfCallArptables', data, { orig: 'IFLA_BR_NF_CALL_ARPTABLES' }],
        ['vlanDefaultPvid', data, { orig: 'IFLA_BR_VLAN_DEFAULT_PVID' }],
        ['pad', data, { orig: 'IFLA_BR_PAD' }],
        ['vlanStatsEnabled', data, { orig: 'IFLA_BR_VLAN_STATS_ENABLED' }],
        ['mcastStatsEnabled', data, { orig: 'IFLA_BR_MCAST_STATS_ENABLED' }],
        ['mcastIgmpVersion', data, { orig: 'IFLA_BR_MCAST_IGMP_VERSION' }],
        ['mcastMldVersion', data, { orig: 'IFLA_BR_MCAST_MLD_VERSION' }],
        ['vlanStatsPerPort', data, { orig: 'IFLA_BR_VLAN_STATS_PER_PORT' }],
        ['multiBoolopt', data, { orig: 'IFLA_BR_MULTI_BOOLOPT' }],
    ]},

    BridgeId: { kind: 'struct', orig: 'ifla_bridge_id', attrs: [
        ['prio', u8, { count: 2, orig: 'prio' }],
        ['addr', u8, { count: 6, orig: 'addr', docs: [
            'ETH_ALEN',
        ] }],
    ]},

    BridgePortMode: { kind: 'enum', orig: 'bridge_port_mode', values: [
        { value: 0, name: 'UNSPEC', orig: 'BRIDGE_MODE_UNSPEC' },
        { value: 1, name: 'HAIRPIN', orig: 'BRIDGE_MODE_HAIRPIN' },
    ]},

    BridgePort: { attrs: [
        ['state', u8, { orig: 'IFLA_BRPORT_STATE', docs: [
            'Spanning tree state',
        ] }],
        ['priority', u16, { orig: 'IFLA_BRPORT_PRIORITY', docs: [
            'Spanning tree priority',
        ] }],
        ['cost', u32, { orig: 'IFLA_BRPORT_COST', docs: [
            'Spanning tree cost',
        ] }],
        ['mode', u8, { orig: 'IFLA_BRPORT_MODE', docs: [
            'mode (hairpin)',
        ] }],
        ['guard', u8, { orig: 'IFLA_BRPORT_GUARD', docs: [
            'bpdu guard',
        ] }],
        ['protect', u8, { orig: 'IFLA_BRPORT_PROTECT', docs: [
            'root port protection',
        ] }],
        ['fastLeave', u8, { orig: 'IFLA_BRPORT_FAST_LEAVE', docs: [
            'multicast fast leave',
        ] }],
        ['learning', u8, { orig: 'IFLA_BRPORT_LEARNING', docs: [
            'mac learning',
        ] }],
        ['unicastFlood', u8, { orig: 'IFLA_BRPORT_UNICAST_FLOOD', docs: [
            'flood unicast traffic',
        ] }],
        ['proxyarp', data, { orig: 'IFLA_BRPORT_PROXYARP', docs: [
            'proxy ARP',
        ] }],
        ['learningSync', u8, { orig: 'IFLA_BRPORT_LEARNING_SYNC', docs: [
            'mac learning sync from device',
        ] }],
        ['proxyarpWifi', data, { orig: 'IFLA_BRPORT_PROXYARP_WIFI', docs: [
            'proxy ARP for Wi-Fi',
        ] }],
        ['rootId', data, { orig: 'IFLA_BRPORT_ROOT_ID', docs: [
            'designated root',
        ] }],
        ['bridgeId', data, { orig: 'IFLA_BRPORT_BRIDGE_ID', docs: [
            'designated bridge',
        ] }],
        ['designatedPort', data, { orig: 'IFLA_BRPORT_DESIGNATED_PORT' }],
        ['designatedCost', data, { orig: 'IFLA_BRPORT_DESIGNATED_COST' }],
        ['id', data, { orig: 'IFLA_BRPORT_ID' }],
        ['no', data, { orig: 'IFLA_BRPORT_NO' }],
        ['topologyChangeAck', data, { orig: 'IFLA_BRPORT_TOPOLOGY_CHANGE_ACK' }],
        ['configPending', data, { orig: 'IFLA_BRPORT_CONFIG_PENDING' }],
        ['messageAgeTimer', data, { orig: 'IFLA_BRPORT_MESSAGE_AGE_TIMER' }],
        ['forwardDelayTimer', data, { orig: 'IFLA_BRPORT_FORWARD_DELAY_TIMER' }],
        ['holdTimer', data, { orig: 'IFLA_BRPORT_HOLD_TIMER' }],
        ['flush', data, { orig: 'IFLA_BRPORT_FLUSH' }],
        ['multicastRouter', data, { orig: 'IFLA_BRPORT_MULTICAST_ROUTER' }],
        ['pad', data, { orig: 'IFLA_BRPORT_PAD' }],
        ['mcastFlood', data, { orig: 'IFLA_BRPORT_MCAST_FLOOD' }],
        ['mcastToUcast', data, { orig: 'IFLA_BRPORT_MCAST_TO_UCAST' }],
        ['vlanTunnel', data, { orig: 'IFLA_BRPORT_VLAN_TUNNEL' }],
        ['bcastFlood', data, { orig: 'IFLA_BRPORT_BCAST_FLOOD' }],
        ['groupFwdMask', data, { orig: 'IFLA_BRPORT_GROUP_FWD_MASK' }],
        ['neighSuppress', data, { orig: 'IFLA_BRPORT_NEIGH_SUPPRESS' }],
        ['isolated', data, { orig: 'IFLA_BRPORT_ISOLATED' }],
        ['backupPort', data, { orig: 'IFLA_BRPORT_BACKUP_PORT' }],
    ]},

    CacheInfo: { kind: 'struct', orig: 'ifla_cacheinfo', attrs: [
        ['maxReasmLen', u32, { orig: 'max_reasm_len' }],
        ['tstamp', u32, { orig: 'tstamp', docs: [
            'ipv6InterfaceTable updated timestamp',
        ] }],
        ['reachableTime', u32, { orig: 'reachable_time' }],
        ['retransTime', u32, { orig: 'retrans_time' }],
    ]},

    Info: { attrs: [
        ['kind', string, { orig: 'IFLA_INFO_KIND' }],
        ['data', data, { orig: 'IFLA_INFO_DATA' }],
        ['xstats', data, { orig: 'IFLA_INFO_XSTATS' }],
        ['slaveKind', string, { orig: 'IFLA_INFO_SLAVE_KIND' }],
        ['slaveData', data, { orig: 'IFLA_INFO_SLAVE_DATA' }],
    ]},

    Vlan: { docs: [
        'VLAN section',
    ], attrs: [
        ['id', u16, { orig: 'IFLA_VLAN_ID' }],
        ['flags', data, { orig: 'IFLA_VLAN_FLAGS' }],
        ['egressQos', data, { orig: 'IFLA_VLAN_EGRESS_QOS' }],
        ['ingressQos', data, { orig: 'IFLA_VLAN_INGRESS_QOS' }],
        ['protocol', u16, { orig: 'IFLA_VLAN_PROTOCOL' }],
    ]},

    VlanFlagsMask: { kind: 'struct', orig: 'ifla_vlan_flags', attrs: [
        ['flags', u32, { orig: 'flags' }],
        ['mask', u32, { orig: 'mask' }],
    ]},

    VlanQos: { attrs: [
        ['mapping', data, { orig: 'IFLA_VLAN_QOS_MAPPING' }],
    ]},

    VlanQosMapping: { kind: 'struct', orig: 'ifla_vlan_qos_mapping', attrs: [
        ['from', u32, { orig: 'from' }],
        ['to', u32, { orig: 'to' }],
    ]},

    Macvlan: { docs: [
        'MACVLAN section',
    ], attrs: [
        ['mode', u32, { orig: 'IFLA_MACVLAN_MODE' }],
        ['flags', u16, { orig: 'IFLA_MACVLAN_FLAGS' }],
        ['macaddrMode', u32, { orig: 'IFLA_MACVLAN_MACADDR_MODE' }],
        ['macaddr', data, { orig: 'IFLA_MACVLAN_MACADDR' }],
        ['macaddrData', data, { orig: 'IFLA_MACVLAN_MACADDR_DATA' }],
        ['macaddrCount', u32, { orig: 'IFLA_MACVLAN_MACADDR_COUNT' }],
    ]},

    MacvlanMode: { kind: 'flags', orig: 'macvlan_mode', values: [
        { value: 1, name: 'private', orig: 'MACVLAN_MODE_PRIVATE', docs: [
            "don't talk to other macvlans",
        ] },
        { value: 2, name: 'vepa', orig: 'MACVLAN_MODE_VEPA', docs: [
            'talk to other ports through ext bridge',
        ] },
        { value: 4, name: 'bridge', orig: 'MACVLAN_MODE_BRIDGE', docs: [
            'talk to bridge ports directly',
        ] },
        { value: 8, name: 'passthru', orig: 'MACVLAN_MODE_PASSTHRU', docs: [
            'take over the underlying device',
        ] },
        { value: 16, name: 'source', orig: 'MACVLAN_MODE_SOURCE', docs: [
            'use source MAC address list to assign',
        ] },
    ]},

    MacvlanMacaddrMode: { kind: 'enum', orig: 'macvlan_macaddr_mode', values: [
        { value: 0, name: 'ADD', orig: 'MACVLAN_MACADDR_ADD' },
        { value: 1, name: 'DEL', orig: 'MACVLAN_MACADDR_DEL' },
        { value: 2, name: 'FLUSH', orig: 'MACVLAN_MACADDR_FLUSH' },
        { value: 3, name: 'SET', orig: 'MACVLAN_MACADDR_SET' },
    ]},

    Vrf: { docs: [
        'VRF section',
    ], attrs: [
        ['table', u32, { orig: 'IFLA_VRF_TABLE' }],
    ]},

    VrfPort: { attrs: [
        ['table', data, { orig: 'IFLA_VRF_PORT_TABLE' }],
    ]},

    Macsec: { docs: [
        'MACSEC section',
    ], attrs: [
        ['sci', u64, { orig: 'IFLA_MACSEC_SCI' }],
        ['port', u16, { orig: 'IFLA_MACSEC_PORT' }],
        ['icvLen', u8, { orig: 'IFLA_MACSEC_ICV_LEN' }],
        ['cipherSuite', u64, { orig: 'IFLA_MACSEC_CIPHER_SUITE' }],
        ['window', u32, { orig: 'IFLA_MACSEC_WINDOW' }],
        ['encodingSa', u8, { orig: 'IFLA_MACSEC_ENCODING_SA' }],
        ['encrypt', u8, { orig: 'IFLA_MACSEC_ENCRYPT' }],
        ['protect', u8, { orig: 'IFLA_MACSEC_PROTECT' }],
        ['incSci', u8, { orig: 'IFLA_MACSEC_INC_SCI' }],
        ['es', u8, { orig: 'IFLA_MACSEC_ES' }],
        ['scb', u8, { orig: 'IFLA_MACSEC_SCB' }],
        ['replayProtect', u8, { orig: 'IFLA_MACSEC_REPLAY_PROTECT' }],
        ['validation', u8, { orig: 'IFLA_MACSEC_VALIDATION' }],
        ['pad', data, { orig: 'IFLA_MACSEC_PAD' }],
    ]},

    Xfrm: { docs: [
        'XFRM section',
    ], attrs: [
        ['link', u32, { orig: 'IFLA_XFRM_LINK' }],
        ['ifId', u32, { orig: 'IFLA_XFRM_IF_ID' }],
    ]},

    MacsecValidationType: { kind: 'enum', orig: 'macsec_validation_type', values: [
        { value: 0, name: 'DISABLED', orig: 'MACSEC_VALIDATE_DISABLED' },
        { value: 1, name: 'CHECK', orig: 'MACSEC_VALIDATE_CHECK' },
        { value: 2, name: 'STRICT', orig: 'MACSEC_VALIDATE_STRICT' },
    ]},

    MacsecOffload: { kind: 'enum', orig: 'macsec_offload', values: [
        { value: 0, name: 'OFF', orig: 'MACSEC_OFFLOAD_OFF' },
        { value: 1, name: 'PHY', orig: 'MACSEC_OFFLOAD_PHY' },
    ]},

    Ipvlan: { docs: [
        'IPVLAN section',
    ], attrs: [
        ['mode', u16, { orig: 'IFLA_IPVLAN_MODE' }],
        ['flags', data, { orig: 'IFLA_IPVLAN_FLAGS' }],
    ]},

    IpvlanMode: { kind: 'enum', orig: 'ipvlan_mode', values: [
        { value: 0, name: 'L2', orig: 'IPVLAN_MODE_L2' },
        { value: 1, name: 'L3', orig: 'IPVLAN_MODE_L3' },
        { value: 2, name: 'L3S', orig: 'IPVLAN_MODE_L3S' },
    ]},

    Vxlan: { docs: [
        'VXLAN section',
    ], attrs: [
        ['id', u32, { orig: 'IFLA_VXLAN_ID' }],
        ['group', data, { orig: 'IFLA_VXLAN_GROUP', docs: [
            'group or remote address',
        ] }],
        ['link', u32, { orig: 'IFLA_VXLAN_LINK' }],
        ['local', data, { orig: 'IFLA_VXLAN_LOCAL' }],
        ['ttl', u8, { orig: 'IFLA_VXLAN_TTL' }],
        ['tos', u8, { orig: 'IFLA_VXLAN_TOS' }],
        ['learning', u8, { orig: 'IFLA_VXLAN_LEARNING' }],
        ['ageing', u32, { orig: 'IFLA_VXLAN_AGEING' }],
        ['limit', u32, { orig: 'IFLA_VXLAN_LIMIT' }],
        ['portRange', data, { orig: 'IFLA_VXLAN_PORT_RANGE', docs: [
            'source port',
        ] }],
        ['proxy', u8, { orig: 'IFLA_VXLAN_PROXY' }],
        ['rsc', u8, { orig: 'IFLA_VXLAN_RSC' }],
        ['l2miss', u8, { orig: 'IFLA_VXLAN_L2MISS' }],
        ['l3miss', u8, { orig: 'IFLA_VXLAN_L3MISS' }],
        ['port', data, { orig: 'IFLA_VXLAN_PORT', docs: [
            'destination port',
        ] }],
        ['group6', data, { orig: 'IFLA_VXLAN_GROUP6' }],
        ['local6', data, { orig: 'IFLA_VXLAN_LOCAL6' }],
        ['udpCsum', u8, { orig: 'IFLA_VXLAN_UDP_CSUM' }],
        ['udpZeroCsum6Tx', u8, { orig: 'IFLA_VXLAN_UDP_ZERO_CSUM6_TX' }],
        ['udpZeroCsum6Rx', u8, { orig: 'IFLA_VXLAN_UDP_ZERO_CSUM6_RX' }],
        ['remcsumTx', u8, { orig: 'IFLA_VXLAN_REMCSUM_TX' }],
        ['remcsumRx', u8, { orig: 'IFLA_VXLAN_REMCSUM_RX' }],
        ['gbp', flag, { orig: 'IFLA_VXLAN_GBP' }],
        ['remcsumNopartial', data, { orig: 'IFLA_VXLAN_REMCSUM_NOPARTIAL' }],
        ['collectMetadata', u8, { orig: 'IFLA_VXLAN_COLLECT_METADATA' }],
        ['label', u32, { orig: 'IFLA_VXLAN_LABEL' }],
        ['gpe', flag, { orig: 'IFLA_VXLAN_GPE' }],
        ['ttlInherit', data, { orig: 'IFLA_VXLAN_TTL_INHERIT' }],
        ['df', data, { orig: 'IFLA_VXLAN_DF' }],
    ]},

    VxlanPortRange: { kind: 'struct', orig: 'ifla_vxlan_port_range', attrs: [
        ['low', 'u16be', { orig: 'low' }],
        ['high', 'u16be', { orig: 'high' }],
    ]},

    VxlanDf: { kind: 'enum', orig: 'ifla_vxlan_df', values: [
        { value: 0, name: 'UNSET', orig: 'VXLAN_DF_UNSET' },
        { value: 1, name: 'SET', orig: 'VXLAN_DF_SET' },
        { value: 2, name: 'INHERIT', orig: 'VXLAN_DF_INHERIT' },
    ]},

    Geneve: { docs: [
        'GENEVE section',
    ], attrs: [
        ['id', u32, { orig: 'IFLA_GENEVE_ID' }],
        ['remote', data, { orig: 'IFLA_GENEVE_REMOTE' }],
        ['ttl', u8, { orig: 'IFLA_GENEVE_TTL' }],
        ['tos', u8, { orig: 'IFLA_GENEVE_TOS' }],
        ['port', data, { orig: 'IFLA_GENEVE_PORT', docs: [
            'destination port',
        ] }],
        ['collectMetadata', data, { orig: 'IFLA_GENEVE_COLLECT_METADATA' }],
        ['remote6', data, { orig: 'IFLA_GENEVE_REMOTE6' }],
        ['udpCsum', u8, { orig: 'IFLA_GENEVE_UDP_CSUM' }],
        ['udpZeroCsum6Tx', u8, { orig: 'IFLA_GENEVE_UDP_ZERO_CSUM6_TX' }],
        ['udpZeroCsum6Rx', u8, { orig: 'IFLA_GENEVE_UDP_ZERO_CSUM6_RX' }],
        ['label', u32, { orig: 'IFLA_GENEVE_LABEL' }],
        ['ttlInherit', data, { orig: 'IFLA_GENEVE_TTL_INHERIT' }],
        ['df', data, { orig: 'IFLA_GENEVE_DF' }],
    ]},

    GeneveDf: { kind: 'enum', orig: 'ifla_geneve_df', values: [
        { value: 0, name: 'UNSET', orig: 'GENEVE_DF_UNSET' },
        { value: 1, name: 'SET', orig: 'GENEVE_DF_SET' },
        { value: 2, name: 'INHERIT', orig: 'GENEVE_DF_INHERIT' },
    ]},

    Ppp: { docs: [
        'PPP section',
    ], attrs: [
        ['devFd', s32, { orig: 'IFLA_PPP_DEV_FD' }],
    ]},

    GtpRole: { kind: 'enum', orig: 'ifla_gtp_role', docs: [
        'GTP section',
    ], values: [
        { value: 0, name: 'GGSN', orig: 'GTP_ROLE_GGSN' },
        { value: 1, name: 'SGSN', orig: 'GTP_ROLE_SGSN' },
    ]},

    Gtp: { attrs: [
        ['fd0', data, { orig: 'IFLA_GTP_FD0' }],
        ['fd1', data, { orig: 'IFLA_GTP_FD1' }],
        ['pdpHashsize', data, { orig: 'IFLA_GTP_PDP_HASHSIZE' }],
        ['role', data, { orig: 'IFLA_GTP_ROLE' }],
    ]},

    Bond: { docs: [
        'Bonding section',
    ], attrs: [
        ['mode', data, { orig: 'IFLA_BOND_MODE' }],
        ['activeSlave', data, { orig: 'IFLA_BOND_ACTIVE_SLAVE' }],
        ['miimon', data, { orig: 'IFLA_BOND_MIIMON' }],
        ['updelay', data, { orig: 'IFLA_BOND_UPDELAY' }],
        ['downdelay', data, { orig: 'IFLA_BOND_DOWNDELAY' }],
        ['useCarrier', data, { orig: 'IFLA_BOND_USE_CARRIER' }],
        ['arpInterval', data, { orig: 'IFLA_BOND_ARP_INTERVAL' }],
        ['arpIpTarget', data, { orig: 'IFLA_BOND_ARP_IP_TARGET' }],
        ['arpValidate', data, { orig: 'IFLA_BOND_ARP_VALIDATE' }],
        ['arpAllTargets', data, { orig: 'IFLA_BOND_ARP_ALL_TARGETS' }],
        ['primary', data, { orig: 'IFLA_BOND_PRIMARY' }],
        ['primaryReselect', data, { orig: 'IFLA_BOND_PRIMARY_RESELECT' }],
        ['failOverMac', data, { orig: 'IFLA_BOND_FAIL_OVER_MAC' }],
        ['xmitHashPolicy', data, { orig: 'IFLA_BOND_XMIT_HASH_POLICY' }],
        ['resendIgmp', data, { orig: 'IFLA_BOND_RESEND_IGMP' }],
        ['numPeerNotif', data, { orig: 'IFLA_BOND_NUM_PEER_NOTIF' }],
        ['allSlavesActive', data, { orig: 'IFLA_BOND_ALL_SLAVES_ACTIVE' }],
        ['minLinks', data, { orig: 'IFLA_BOND_MIN_LINKS' }],
        ['lpInterval', data, { orig: 'IFLA_BOND_LP_INTERVAL' }],
        ['packetsPerSlave', data, { orig: 'IFLA_BOND_PACKETS_PER_SLAVE' }],
        ['adLacpRate', data, { orig: 'IFLA_BOND_AD_LACP_RATE' }],
        ['adSelect', data, { orig: 'IFLA_BOND_AD_SELECT' }],
        ['adInfo', 'BondAdInfo', { orig: 'IFLA_BOND_AD_INFO' }],
        ['adActorSysPrio', data, { orig: 'IFLA_BOND_AD_ACTOR_SYS_PRIO' }],
        ['adUserPortKey', data, { orig: 'IFLA_BOND_AD_USER_PORT_KEY' }],
        ['adActorSystem', data, { orig: 'IFLA_BOND_AD_ACTOR_SYSTEM' }],
        ['tlbDynamicLb', data, { orig: 'IFLA_BOND_TLB_DYNAMIC_LB' }],
        ['peerNotifDelay', data, { orig: 'IFLA_BOND_PEER_NOTIF_DELAY' }],
    ]},

    BondAdInfo: { attrs: [
        ['aggregator', data, { orig: 'IFLA_BOND_AD_INFO_AGGREGATOR' }],
        ['numPorts', data, { orig: 'IFLA_BOND_AD_INFO_NUM_PORTS' }],
        ['actorKey', data, { orig: 'IFLA_BOND_AD_INFO_ACTOR_KEY' }],
        ['partnerKey', data, { orig: 'IFLA_BOND_AD_INFO_PARTNER_KEY' }],
        ['partnerMac', data, { orig: 'IFLA_BOND_AD_INFO_PARTNER_MAC' }],
    ]},

    BondSlave: { attrs: [
        ['state', data, { orig: 'IFLA_BOND_SLAVE_STATE' }],
        ['miiStatus', data, { orig: 'IFLA_BOND_SLAVE_MII_STATUS' }],
        ['linkFailureCount', data, { orig: 'IFLA_BOND_SLAVE_LINK_FAILURE_COUNT' }],
        ['permHwaddr', data, { orig: 'IFLA_BOND_SLAVE_PERM_HWADDR' }],
        ['queueId', data, { orig: 'IFLA_BOND_SLAVE_QUEUE_ID' }],
        ['adAggregatorId', data, { orig: 'IFLA_BOND_SLAVE_AD_AGGREGATOR_ID' }],
        ['adActorOperPortState', data, { orig: 'IFLA_BOND_SLAVE_AD_ACTOR_OPER_PORT_STATE' }],
        ['adPartnerOperPortState', data, { orig: 'IFLA_BOND_SLAVE_AD_PARTNER_OPER_PORT_STATE' }],
    ]},

    VirtualFunctionList: { attrs: [
        ['x', 'VirtualFunction', { repeated: true, orig: 'IFLA_VF_INFO' }],
    ]},

    VirtualFunction: { docs: [
        '* SR-IOV virtual function management section',
    ], attrs: [
        ['mac', data, { orig: 'IFLA_VF_MAC', docs: [
            'Hardware queue specific attributes',
        ] }],
        ['vlan', data, { orig: 'IFLA_VF_VLAN', docs: [
            'VLAN ID and QoS',
        ] }],
        ['txRate', data, { orig: 'IFLA_VF_TX_RATE', docs: [
            'Max TX Bandwidth Allocation',
        ] }],
        ['spoofchk', data, { orig: 'IFLA_VF_SPOOFCHK', docs: [
            'Spoof Checking on/off switch',
        ] }],
        ['linkState', data, { type: 'VirtualFunctionLinkStateId', orig: 'IFLA_VF_LINK_STATE', docs: [
            'link state enable/disable/auto switch',
        ] }],
        ['rate', data, { orig: 'IFLA_VF_RATE', docs: [
            'Min and Max TX Bandwidth Allocation',
        ] }],
        ['rssQueryEn', data, { orig: 'IFLA_VF_RSS_QUERY_EN' }],
        ['stats', 'VirtualFunctionStats', { orig: 'IFLA_VF_STATS', docs: [
            'network device statistics',
        ] }],
        ['trust', data, { orig: 'IFLA_VF_TRUST', docs: [
            'Trust VF',
        ] }],
        ['ibNodeGuid', data, { orig: 'IFLA_VF_IB_NODE_GUID', docs: [
            'VF Infiniband node GUID',
        ] }],
        ['ibPortGuid', data, { orig: 'IFLA_VF_IB_PORT_GUID', docs: [
            'VF Infiniband port GUID',
        ] }],
        ['vlanList', data, { orig: 'IFLA_VF_VLAN_LIST', docs: [
            'nested list of vlans, option for QinQ',
        ] }],
        ['broadcast', data, { orig: 'IFLA_VF_BROADCAST', docs: [
            'VF broadcast',
        ] }],
    ]},

    VirtualFunctionMac: { kind: 'struct', orig: 'ifla_vf_mac', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['mac', u8, { count: 32, orig: 'mac', docs: [
            'MAX_ADDR_LEN',
        ] }],
    ]},

    VirtualFunctionBroadcast: { kind: 'struct', orig: 'ifla_vf_broadcast', attrs: [
        ['broadcast', u8, { count: 32, orig: 'broadcast' }],
    ]},

    VirtualFunctionVlan: { kind: 'struct', orig: 'ifla_vf_vlan', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['vlan', u32, { orig: 'vlan', docs: [
            '0 - 4095, 0 disables VLAN filter',
        ] }],
        ['qos', u32, { orig: 'qos' }],
    ]},

    VlanList: { attrs: [
        ['x', 'Vlan', { repeated: true, orig: 'IFLA_VF_VLAN_INFO', docs: [
            'VLAN ID, QoS and VLAN protocol',
        ] }],
    ]},

    VirtualFunctionVlanInfo: { kind: 'struct', orig: 'ifla_vf_vlan_info', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['vlan', u32, { orig: 'vlan', docs: [
            '0 - 4095, 0 disables VLAN filter',
        ] }],
        ['qos', u32, { orig: 'qos' }],
        ['vlanProto', 'u16be', { orig: 'vlan_proto', docs: [
            'VLAN protocol either 802.1Q or 802.1ad',
        ] }],
    ]},

    VirtualFunctionTxRate: { kind: 'struct', orig: 'ifla_vf_tx_rate', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['rate', u32, { orig: 'rate', docs: [
            'Max TX bandwidth in Mbps, 0 disables throttling',
        ] }],
    ]},

    VirtualFunctionRate: { kind: 'struct', orig: 'ifla_vf_rate', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['minTxRate', u32, { orig: 'min_tx_rate', docs: [
            'Min Bandwidth in Mbps',
        ] }],
        ['maxTxRate', u32, { orig: 'max_tx_rate', docs: [
            'Max Bandwidth in Mbps',
        ] }],
    ]},

    VirtualFunctionSpoofchk: { kind: 'struct', orig: 'ifla_vf_spoofchk', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['setting', u32, { orig: 'setting' }],
    ]},

    VirtualFunctionGuid: { kind: 'struct', orig: 'ifla_vf_guid', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['guid', u64, { orig: 'guid' }],
    ]},

    VirtualFunctionLinkStateId: { kind: 'enum', values: [
        { value: 0, name: 'AUTO', orig: 'IFLA_VF_LINK_STATE_AUTO', docs: [
            'link state of the uplink',
        ] },
        { value: 1, name: 'ENABLE', orig: 'IFLA_VF_LINK_STATE_ENABLE', docs: [
            'link always up',
        ] },
        { value: 2, name: 'DISABLE', orig: 'IFLA_VF_LINK_STATE_DISABLE', docs: [
            'link always down',
        ] },
    ]},

    VirtualFunctionLinkState: { kind: 'struct', orig: 'ifla_vf_link_state', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['linkState', u32, { type: 'VirtualFunctionLinkStateId', orig: 'link_state' }],
    ]},

    VirtualFunctionRssQueryEn: { kind: 'struct', orig: 'ifla_vf_rss_query_en', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['setting', u32, { orig: 'setting' }],
    ]},

    VirtualFunctionStats: { zero: true, attrs: [
        ['rxPackets', data, { orig: 'IFLA_VF_STATS_RX_PACKETS' }],
        ['txPackets', data, { orig: 'IFLA_VF_STATS_TX_PACKETS' }],
        ['rxBytes', data, { orig: 'IFLA_VF_STATS_RX_BYTES' }],
        ['txBytes', data, { orig: 'IFLA_VF_STATS_TX_BYTES' }],
        ['broadcast', data, { orig: 'IFLA_VF_STATS_BROADCAST' }],
        ['multicast', data, { orig: 'IFLA_VF_STATS_MULTICAST' }],
        ['pad', data, { orig: 'IFLA_VF_STATS_PAD' }],
        ['rxDropped', data, { orig: 'IFLA_VF_STATS_RX_DROPPED' }],
        ['txDropped', data, { orig: 'IFLA_VF_STATS_TX_DROPPED' }],
    ]},

    VirtualFunctionTrust: { kind: 'struct', orig: 'ifla_vf_trust', attrs: [
        ['vf', u32, { orig: 'vf' }],
        ['setting', u32, { orig: 'setting' }],
    ]},

    PortList: { attrs: [
        ['x', 'Port', { repeated: true, orig: 'IFLA_VF_PORT', docs: [
            'nest',
        ] }],
    ]},

    Port: { attrs: [
        ['vf', data, { orig: 'IFLA_PORT_VF', docs: [
            '__u32',
        ] }],
        ['profile', data, { orig: 'IFLA_PORT_PROFILE', docs: [
            'string',
        ] }],
        ['vsiType', data, { orig: 'IFLA_PORT_VSI_TYPE', docs: [
            '802.1Qbg (pre-)standard VDP',
        ] }],
        ['instanceUuid', data, { orig: 'IFLA_PORT_INSTANCE_UUID', docs: [
            'binary UUID',
        ] }],
        ['hostUuid', data, { orig: 'IFLA_PORT_HOST_UUID' }],
        ['request', data, { orig: 'IFLA_PORT_REQUEST', docs: [
            '__u8',
        ] }],
        ['response', data, { orig: 'IFLA_PORT_RESPONSE', docs: [
            '__u16, output only',
        ] }],
    ]},

    PortRequest: { kind: 'enum', values: [
        { value: 0, name: 'PREASSOCIATE', orig: 'PORT_REQUEST_PREASSOCIATE' },
        { value: 1, name: 'PREASSOCIATE_RR', orig: 'PORT_REQUEST_PREASSOCIATE_RR' },
        { value: 2, name: 'ASSOCIATE', orig: 'PORT_REQUEST_ASSOCIATE' },
        { value: 3, name: 'DISASSOCIATE', orig: 'PORT_REQUEST_DISASSOCIATE' },
    ]},

    PortVdpResponse: { kind: 'enum', values: [
        { value: 0, name: 'SUCCESS', orig: 'PORT_VDP_RESPONSE_SUCCESS' },
        { value: 1, name: 'INVALID_FORMAT', orig: 'PORT_VDP_RESPONSE_INVALID_FORMAT' },
        { value: 2, name: 'INSUFFICIENT_RESOURCES', orig: 'PORT_VDP_RESPONSE_INSUFFICIENT_RESOURCES' },
        { value: 3, name: 'UNUSED_VTID', orig: 'PORT_VDP_RESPONSE_UNUSED_VTID' },
        { value: 4, name: 'VTID_VIOLATION', orig: 'PORT_VDP_RESPONSE_VTID_VIOLATION' },
        { value: 5, name: 'VTID_VERSION_VIOALTION', orig: 'PORT_VDP_RESPONSE_VTID_VERSION_VIOALTION' },
        { value: 6, name: 'OUT_OF_SYNC', orig: 'PORT_VDP_RESPONSE_OUT_OF_SYNC' },
    ]},

    PortProfileResponse: { kind: 'enum', values: [
        { value: 0x100, name: 'SUCCESS', orig: 'PORT_PROFILE_RESPONSE_SUCCESS', docs: [
            '0x08-0xFF reserved for future VDP use',
        ] },
        { value: 257, name: 'INPROGRESS', orig: 'PORT_PROFILE_RESPONSE_INPROGRESS' },
        { value: 258, name: 'INVALID', orig: 'PORT_PROFILE_RESPONSE_INVALID' },
        { value: 259, name: 'BADSTATE', orig: 'PORT_PROFILE_RESPONSE_BADSTATE' },
        { value: 260, name: 'INSUFFICIENT_RESOURCES', orig: 'PORT_PROFILE_RESPONSE_INSUFFICIENT_RESOURCES' },
        { value: 261, name: 'ERROR', orig: 'PORT_PROFILE_RESPONSE_ERROR' },
    ]},

    PortVsi: { kind: 'struct', orig: 'ifla_port_vsi', attrs: [
        ['vsiMgrId', u8, { orig: 'vsi_mgr_id' }],
        ['vsiTypeId', u8, { count: 3, orig: 'vsi_type_id' }],
        ['vsiTypeVersion', u8, { orig: 'vsi_type_version' }],
        ['pad', u8, { count: 3, orig: 'pad' }],
    ]},

    Ipoib: { docs: [
        'IPoIB section',
    ], attrs: [
        ['pkey', data, { orig: 'IFLA_IPOIB_PKEY' }],
        ['mode', data, { type: 'IpoibMode', orig: 'IFLA_IPOIB_MODE' }],
        ['umcast', data, { orig: 'IFLA_IPOIB_UMCAST' }],
    ]},

    IpoibMode: { kind: 'enum', values: [
        { value: 0, name: 'DATAGRAM', orig: 'IPOIB_MODE_DATAGRAM', docs: [
            'using unreliable datagram QPs',
        ] },
        { value: 1, name: 'CONNECTED', orig: 'IPOIB_MODE_CONNECTED', docs: [
            'using connected QPs',
        ] },
    ]},

    Hsr: { docs: [
        'HSR section',
    ], attrs: [
        ['slave1', data, { orig: 'IFLA_HSR_SLAVE1' }],
        ['slave2', data, { orig: 'IFLA_HSR_SLAVE2' }],
        ['multicastSpec', data, { orig: 'IFLA_HSR_MULTICAST_SPEC', docs: [
            'Last byte of supervision addr',
        ] }],
        ['supervisionAddr', data, { orig: 'IFLA_HSR_SUPERVISION_ADDR', docs: [
            'Supervision frame multicast addr',
        ] }],
        ['seqNr', data, { orig: 'IFLA_HSR_SEQ_NR' }],
        ['version', data, { orig: 'IFLA_HSR_VERSION', docs: [
            'HSR version',
        ] }],
    ]},

    IfStatsMsg: { kind: 'struct', orig: 'if_stats_msg', docs: [
        'STATS section',
    ], attrs: [
        ['family', u8, { orig: 'family' }],
        ['pad1', u8, { orig: 'pad1' }],
        ['pad2', u16, { orig: 'pad2' }],
        ['ifindex', u32, { orig: 'ifindex' }],
        ['filterMask', u32, { orig: 'filter_mask' }],
    ]},

    Stats: { attrs: [
        ['link64', data, { orig: 'IFLA_STATS_LINK_64' }],
        ['linkXstats', 'Xstats', { orig: 'IFLA_STATS_LINK_XSTATS' }],
        ['linkXstatsSlave', 'Xstats', { orig: 'IFLA_STATS_LINK_XSTATS_SLAVE' }],
        ['linkOffloadXstats', 'OffloadXstats', { orig: 'IFLA_STATS_LINK_OFFLOAD_XSTATS' }],
        ['afSpec', map(data), { orig: 'IFLA_STATS_AF_SPEC' }],
    ]},

    Xstats: { attrs: [
        ['bridge', 'BridgeXstats', { orig: 'LINK_XSTATS_TYPE_BRIDGE' }],
        ['bond', data, { orig: 'LINK_XSTATS_TYPE_BOND' }],
    ]},

    OffloadXstats: { docs: [
        'These are stats embedded into IFLA_STATS_LINK_OFFLOAD_XSTATS',
    ], attrs: [
        ['cpuHit', 'LinkStats64', { orig: 'IFLA_OFFLOAD_XSTATS_CPU_HIT', docs: [
            'struct rtnl_link_stats64',
        ] }],
    ]},

    XdpFlags: { kind: 'flags', docs: [
        'XDP section',
    ], values: [
        { value: 1 << 0, name: 'updateIfNoexist', orig: 'XDP_FLAGS_UPDATE_IF_NOEXIST' },
        { value: 1 << 1, name: 'skbMode', orig: 'XDP_FLAGS_SKB_MODE' },
        { value: 1 << 2, name: 'drvMode', orig: 'XDP_FLAGS_DRV_MODE' },
        { value: 1 << 3, name: 'hwMode', orig: 'XDP_FLAGS_HW_MODE' },
    ]},

    XdpAttached: { kind: 'enum', docs: [
        'These are stored into IFLA_XDP_ATTACHED on dump.',
    ], values: [
        { value: 0, name: 'NONE', orig: 'XDP_ATTACHED_NONE' },
        { value: 1, name: 'DRV', orig: 'XDP_ATTACHED_DRV' },
        { value: 2, name: 'SKB', orig: 'XDP_ATTACHED_SKB' },
        { value: 3, name: 'HW', orig: 'XDP_ATTACHED_HW' },
        { value: 4, name: 'MULTI', orig: 'XDP_ATTACHED_MULTI' },
    ]},

    Xdp: { attrs: [
        ['fd', data, { orig: 'IFLA_XDP_FD' }],
        ['attached', data, { orig: 'IFLA_XDP_ATTACHED' }],
        ['flags', data, { orig: 'IFLA_XDP_FLAGS' }],
        ['progId', data, { orig: 'IFLA_XDP_PROG_ID' }],
        ['drvProgId', data, { orig: 'IFLA_XDP_DRV_PROG_ID' }],
        ['skbProgId', data, { orig: 'IFLA_XDP_SKB_PROG_ID' }],
        ['hwProgId', data, { orig: 'IFLA_XDP_HW_PROG_ID' }],
    ]},

    Event: { kind: 'enum', values: [
        { value: 0, name: 'NONE', orig: 'IFLA_EVENT_NONE' },
        { value: 1, name: 'REBOOT', orig: 'IFLA_EVENT_REBOOT', docs: [
            'internal reset / reboot',
        ] },
        { value: 2, name: 'FEATURES', orig: 'IFLA_EVENT_FEATURES', docs: [
            'change in offload features',
        ] },
        { value: 3, name: 'BONDING_FAILOVER', orig: 'IFLA_EVENT_BONDING_FAILOVER', docs: [
            'change in active slave',
        ] },
        { value: 4, name: 'NOTIFY_PEERS', orig: 'IFLA_EVENT_NOTIFY_PEERS', docs: [
            're-sent grat. arp/ndisc',
        ] },
        { value: 5, name: 'IGMP_RESEND', orig: 'IFLA_EVENT_IGMP_RESEND', docs: [
            're-sent IGMP JOIN',
        ] },
        { value: 6, name: 'BONDING_OPTIONS', orig: 'IFLA_EVENT_BONDING_OPTIONS', docs: [
            'change in bonding options',
        ] },
    ]},

    Tun: { docs: [
        'tun section',
    ], attrs: [
        ['owner', data, { orig: 'IFLA_TUN_OWNER' }],
        ['group', data, { orig: 'IFLA_TUN_GROUP' }],
        ['type', data, { orig: 'IFLA_TUN_TYPE' }],
        ['pi', data, { orig: 'IFLA_TUN_PI' }],
        ['vnetHdr', data, { orig: 'IFLA_TUN_VNET_HDR' }],
        ['persist', data, { orig: 'IFLA_TUN_PERSIST' }],
        ['multiQueue', data, { orig: 'IFLA_TUN_MULTI_QUEUE' }],
        ['numQueues', data, { orig: 'IFLA_TUN_NUM_QUEUES' }],
        ['numDisabledQueues', data, { orig: 'IFLA_TUN_NUM_DISABLED_QUEUES' }],
    ]},

    RmnetFlags: { kind: 'flags', docs: [
        'rmnet section',
    ], values: [
        { value: (1 << 0), name: 'ingressDeaggregation', orig: 'RMNET_FLAGS_INGRESS_DEAGGREGATION' },
        { value: (1 << 1), name: 'ingressMapCommands', orig: 'RMNET_FLAGS_INGRESS_MAP_COMMANDS' },
        { value: (1 << 2), name: 'ingressMapCksumv4', orig: 'RMNET_FLAGS_INGRESS_MAP_CKSUMV4' },
        { value: (1 << 3), name: 'egressMapCksumv4', orig: 'RMNET_FLAGS_EGRESS_MAP_CKSUMV4' },
    ]},

    Rmnet: { attrs: [
        ['muxId', data, { orig: 'IFLA_RMNET_MUX_ID' }],
        ['flags', data, { type: 'RmnetFlagsMask', orig: 'IFLA_RMNET_FLAGS' }],
    ]},

    RmnetFlagsMask: { kind: 'struct', orig: 'ifla_rmnet_flags', attrs: [
        ['flags', u32, { type: 'RmnetFlags', orig: 'flags' }],
        ['mask', u32, { type: 'RmnetFlags', orig: 'mask' }],
    ]},

    VethInfo: { attrs: [
        ['peer', data, { orig: 'VETH_INFO_PEER' }],
    ]},

    VlanFlags: { kind: 'flags', orig: 'vlan_flags', values: [
        { value: 0x1, name: 'reorderHdr', orig: 'VLAN_FLAG_REORDER_HDR' },
        { value: 0x2, name: 'gvrp', orig: 'VLAN_FLAG_GVRP' },
        { value: 0x4, name: 'looseBinding', orig: 'VLAN_FLAG_LOOSE_BINDING' },
        { value: 0x8, name: 'mvrp', orig: 'VLAN_FLAG_MVRP' },
        { value: 0x10, name: 'bridgeBinding', orig: 'VLAN_FLAG_BRIDGE_BINDING' },
    ]},

    VlanNameType: { kind: 'enum', orig: 'vlan_name_type', values: [
        { value: 0, name: 'PLUS_VID', orig: 'VLAN_NAME_TYPE_PLUS_VID', docs: [
            'Name will look like:  vlan0005',
        ] },
        { value: 1, name: 'RAW_PLUS_VID', orig: 'VLAN_NAME_TYPE_RAW_PLUS_VID', docs: [
            'name will look like:  eth1.0005',
        ] },
        { value: 2, name: 'PLUS_VID_NO_PAD', orig: 'VLAN_NAME_TYPE_PLUS_VID_NO_PAD', docs: [
            'Name will look like:  vlan5',
        ] },
        { value: 3, name: 'RAW_PLUS_VID_NO_PAD', orig: 'VLAN_NAME_TYPE_RAW_PLUS_VID_NO_PAD', docs: [
            'Name will look like:  eth0.5',
        ] },
    ]},

    BridgeState: { kind: 'enum', values: [
        { value: 0, name: 'DISABLED', orig: 'BR_STATE_DISABLED' },
        { value: 1, name: 'LISTENING', orig: 'BR_STATE_LISTENING' },
        { value: 2, name: 'LEARNING', orig: 'BR_STATE_LEARNING' },
        { value: 3, name: 'FORWARDING', orig: 'BR_STATE_FORWARDING' },
        { value: 4, name: 'BLOCKING', orig: 'BR_STATE_BLOCKING' },
    ]},

    BridgeFlags: { kind: 'flags', docs: [
        'Bridge Flags',
    ], values: [
        { value: 1, name: 'master', orig: 'BRIDGE_FLAGS_MASTER', docs: [
            'Bridge command to/from master',
        ] },
        { value: 2, name: 'self', orig: 'BRIDGE_FLAGS_SELF', docs: [
            'Bridge command to/from lowerdev',
        ] },
    ]},

    BridgeMode: { kind: 'enum', values: [
        { value: 0, name: 'VEB', orig: 'BRIDGE_MODE_VEB', docs: [
            'Default loopback mode',
        ] },
        { value: 1, name: 'VEPA', orig: 'BRIDGE_MODE_VEPA', docs: [
            '802.1Qbg defined VEPA mode',
        ] },
        { value: 0xFFFF, name: 'UNDEF', orig: 'BRIDGE_MODE_UNDEF', docs: [
            'mode undefined',
        ] },
    ]},

    BridgeSpec: { zero: true, attrs: [
        ['flags', u16, { orig: 'IFLA_BRIDGE_FLAGS' }],
        ['mode', u16, { orig: 'IFLA_BRIDGE_MODE' }],
        ['vlanInfo', data, { orig: 'IFLA_BRIDGE_VLAN_INFO' }],
        ['vlanTunnelInfo', data, { orig: 'IFLA_BRIDGE_VLAN_TUNNEL_INFO' }],
    ]},

    BridgeVlanFlags: { kind: 'flags', orig: 'bridge_vlan_flags', values: [
        { value: (1<<0), name: 'master', orig: 'BRIDGE_VLAN_INFO_MASTER', docs: [
            'Operate on Bridge device as well',
        ] },
        { value: (1<<1), name: 'pvid', orig: 'BRIDGE_VLAN_INFO_PVID', docs: [
            'VLAN is PVID, ingress untagged',
        ] },
        { value: (1<<2), name: 'untagged', orig: 'BRIDGE_VLAN_INFO_UNTAGGED', docs: [
            'VLAN egresses untagged',
        ] },
        { value: (1<<3), name: 'rangeBegin', orig: 'BRIDGE_VLAN_INFO_RANGE_BEGIN', docs: [
            'VLAN is start of vlan range',
        ] },
        { value: (1<<4), name: 'rangeEnd', orig: 'BRIDGE_VLAN_INFO_RANGE_END', docs: [
            'VLAN is end of vlan range',
        ] },
        { value: (1<<5), name: 'brentry', orig: 'BRIDGE_VLAN_INFO_BRENTRY', docs: [
            'Global bridge VLAN entry',
        ] },
        { value: (1<<6), name: 'onlyOpts', orig: 'BRIDGE_VLAN_INFO_ONLY_OPTS', docs: [
            'Skip create/delete/flags',
        ] },
    ]},

    BridgeVlanInfo: { kind: 'struct', orig: 'bridge_vlan_info', attrs: [
        ['flags', u16, { orig: 'flags' }],
        ['vid', u16, { orig: 'vid' }],
    ]},

    BridgeVlanTunnel: { attrs: [
        ['id', data, { orig: 'IFLA_BRIDGE_VLAN_TUNNEL_ID' }],
        ['vid', data, { orig: 'IFLA_BRIDGE_VLAN_TUNNEL_VID' }],
        ['flags', data, { orig: 'IFLA_BRIDGE_VLAN_TUNNEL_FLAGS' }],
    ]},

    BridgeVlanXstats: { kind: 'struct', orig: 'bridge_vlan_xstats', attrs: [
        ['rxBytes', u64, { orig: 'rx_bytes' }],
        ['rxPackets', u64, { orig: 'rx_packets' }],
        ['txBytes', u64, { orig: 'tx_bytes' }],
        ['txPackets', u64, { orig: 'tx_packets' }],
        ['vid', u16, { orig: 'vid' }],
        ['flags', u16, { orig: 'flags' }],
        ['pad2', u32, { orig: 'pad2' }],
    ]},

    BridgeStpXstats: { kind: 'struct', orig: 'bridge_stp_xstats', attrs: [
        ['transitionBlk', u64, { orig: 'transition_blk' }],
        ['transitionFwd', u64, { orig: 'transition_fwd' }],
        ['rxBpdu', u64, { orig: 'rx_bpdu' }],
        ['txBpdu', u64, { orig: 'tx_bpdu' }],
        ['rxTcn', u64, { orig: 'rx_tcn' }],
        ['txTcn', u64, { orig: 'tx_tcn' }],
    ]},

    BridgeVlanMsg: { kind: 'struct', orig: 'br_vlan_msg', docs: [
        'Bridge vlan RTM header',
    ], attrs: [
        ['family', u8, { orig: 'family' }],
        ['__reserved1', u8, { orig: '__reserved1' }],
        ['__reserved2', u16, { orig: '__reserved2' }],
        ['ifindex', u32, { orig: 'ifindex' }],
    ]},

    BridgeVlanDb: { attrs: [
        ['entry', 'BridgeVlanDbEntry', { orig: 'BRIDGE_VLANDB_ENTRY' }],
    ]},

    BridgeVlanDbEntry: { attrs: [
        ['info', data, { orig: 'BRIDGE_VLANDB_ENTRY_INFO' }],
        ['range', data, { orig: 'BRIDGE_VLANDB_ENTRY_RANGE' }],
        ['state', data, { orig: 'BRIDGE_VLANDB_ENTRY_STATE' }],
    ]},

    Mdba: { attrs: [
        ['mdb', 'MdbaMdb', { orig: 'MDBA_MDB' }],
        ['router', 'MdbaRouter', { orig: 'MDBA_ROUTER' }],
    ]},

    MdbaMdb: { attrs: [
        ['entry', 'MdbaMdbEntry', { orig: 'MDBA_MDB_ENTRY' }],
    ]},

    MdbaMdbEntry: { attrs: [
        ['info', data, { orig: 'MDBA_MDB_ENTRY_INFO' }],
    ]},

    MdbaMdbEattr: { docs: [
        'per mdb entry additional attributes',
    ], attrs: [
        ['timer', data, { orig: 'MDBA_MDB_EATTR_TIMER' }],
    ]},

    MdbRtrType: { kind: 'enum', docs: [
        'multicast router types',
    ], values: [
        { value: 0, name: 'DISABLED', orig: 'MDB_RTR_TYPE_DISABLED' },
        { value: 1, name: 'TEMP_QUERY', orig: 'MDB_RTR_TYPE_TEMP_QUERY' },
        { value: 2, name: 'PERM', orig: 'MDB_RTR_TYPE_PERM' },
        { value: 3, name: 'TEMP', orig: 'MDB_RTR_TYPE_TEMP' },
    ]},

    MdbaRouter: { attrs: [
        ['port', data, { orig: 'MDBA_ROUTER_PORT' }],
    ]},

    MdbaRouterPattr: { docs: [
        'router port attributes',
    ], attrs: [
        ['timer', data, { orig: 'MDBA_ROUTER_PATTR_TIMER' }],
        ['type', data, { orig: 'MDBA_ROUTER_PATTR_TYPE' }],
    ]},

    BridgePortMsg: { kind: 'struct', orig: 'br_port_msg', attrs: [
        ['family', u8, { orig: 'family' }],
        ['ifindex', u32, { orig: 'ifindex' }],
    ]},

    _IpWithProto: { kind: 'struct', attrs: [
        ['ip', 'data', { count: 16, docs: ['IPv6 or IPv4 in network order'] }],
        ['proto', 'u16be'],
    ]},

    BridgeMdbEntry: { kind: 'struct', orig: 'br_mdb_entry', attrs: [
        ['ifindex', u32, { orig: 'ifindex' }],
        ['state', u8, { orig: 'state' }],
        ['flags', u8, { orig: 'flags' }],
        ['vid', u16, { orig: 'vid' }],
        ['addr', '_IpWithProto', { orig: 'addr' }],
    ]},

    BridgeMdbState: { kind: 'enum', orig: 'br_mdb_state', values: [
        { value: 0, name: 'TEMPORARY', orig: 'MDB_TEMPORARY' },
        { value: 1, name: 'PERMANENT', orig: 'MDB_PERMANENT' },
    ]},

    MdbFlags: { kind: 'flags', values: [
        { value: 1 << 0, name: 'offload', orig: 'MDB_FLAGS_OFFLOAD' },
        { value: 1 << 1, name: 'fastLeave', orig: 'MDB_FLAGS_FAST_LEAVE' },
    ]},

    MdbaSetEntry: { attrs: [
        ['x', 'MdbaSetEntry', { repeated: true, orig: 'MDBA_SET_ENTRY' }],
    ]},

    BridgeXstats: { docs: [
        'Embedded inside LINK_XSTATS_TYPE_BRIDGE',
    ], attrs: [
        ['vlan', data, { orig: 'BRIDGE_XSTATS_VLAN' }],
        ['mcast', data, { orig: 'BRIDGE_XSTATS_MCAST' }],
        ['pad', data, { orig: 'BRIDGE_XSTATS_PAD' }],
        ['stp', data, { orig: 'BRIDGE_XSTATS_STP' }],
    ]},

    BridgeMcastDir: { kind: 'enum', values: [
        { value: 0, name: 'RX', orig: 'BR_MCAST_DIR_RX' },
        { value: 1, name: 'TX', orig: 'BR_MCAST_DIR_TX' },
    ]},

    BridgeMcastStats: { kind: 'struct', orig: 'br_mcast_stats', docs: [
        'IGMP/MLD statistics',
    ], attrs: [
        ['igmpV1queries', u64, { count: 2, orig: 'igmp_v1queries', docs: [
            'BR_MCAST_DIR_SIZE',
        ] }],
        ['igmpV2queries', u64, { count: 2, orig: 'igmp_v2queries' }],
        ['igmpV3queries', u64, { count: 2, orig: 'igmp_v3queries' }],
        ['igmpLeaves', u64, { count: 2, orig: 'igmp_leaves' }],
        ['igmpV1reports', u64, { count: 2, orig: 'igmp_v1reports' }],
        ['igmpV2reports', u64, { count: 2, orig: 'igmp_v2reports' }],
        ['igmpV3reports', u64, { count: 2, orig: 'igmp_v3reports' }],
        ['igmpParseErrors', u64, { orig: 'igmp_parse_errors' }],
        ['mldV1queries', u64, { count: 2, orig: 'mld_v1queries' }],
        ['mldV2queries', u64, { count: 2, orig: 'mld_v2queries' }],
        ['mldLeaves', u64, { count: 2, orig: 'mld_leaves' }],
        ['mldV1reports', u64, { count: 2, orig: 'mld_v1reports' }],
        ['mldV2reports', u64, { count: 2, orig: 'mld_v2reports' }],
        ['mldParseErrors', u64, { orig: 'mld_parse_errors' }],
        ['mcastBytes', u64, { count: 2, orig: 'mcast_bytes' }],
        ['mcastPackets', u64, { count: 2, orig: 'mcast_packets' }],
    ]},

    BridgeBooloptId: { kind: 'enum', orig: 'br_boolopt_id', values: [
        { value: 0, name: 'NO_LL_LEARN', orig: 'BR_BOOLOPT_NO_LL_LEARN' },
    ]},

    BridgeBooloptMask: { kind: 'struct', orig: 'br_boolopt_multi', attrs: [
        ['flags', u32, { orig: 'flags' }],
        ['mask', u32, { orig: 'mask' }],
    ]},

    Iptun: { attrs: [
        ['link', u32, { orig: 'IFLA_IPTUN_LINK' }],
        ['local', u32, { orig: 'IFLA_IPTUN_LOCAL' }],
        ['remote', u32, { orig: 'IFLA_IPTUN_REMOTE' }],
        ['ttl', u8, { orig: 'IFLA_IPTUN_TTL' }],
        ['tos', u8, { orig: 'IFLA_IPTUN_TOS' }],
        ['encapLimit', u8, { orig: 'IFLA_IPTUN_ENCAP_LIMIT' }],
        ['flowinfo', u32, { orig: 'IFLA_IPTUN_FLOWINFO' }],
        ['flags', data, { orig: 'IFLA_IPTUN_FLAGS' }],
        ['proto', u8, { orig: 'IFLA_IPTUN_PROTO' }],
        ['pmtudisc', u8, { orig: 'IFLA_IPTUN_PMTUDISC' }],
        ['_6rdPrefix', data, { orig: 'IFLA_IPTUN_6RD_PREFIX' }],
        ['_6rdRelayPrefix', u32, { orig: 'IFLA_IPTUN_6RD_RELAY_PREFIX' }],
        ['_6rdPrefixlen', u16, { orig: 'IFLA_IPTUN_6RD_PREFIXLEN' }],
        ['_6rdRelayPrefixlen', u16, { orig: 'IFLA_IPTUN_6RD_RELAY_PREFIXLEN' }],
        ['encapType', data, { orig: 'IFLA_IPTUN_ENCAP_TYPE' }],
        ['encapFlags', data, { orig: 'IFLA_IPTUN_ENCAP_FLAGS' }],
        ['encapSport', data, { orig: 'IFLA_IPTUN_ENCAP_SPORT' }],
        ['encapDport', data, { orig: 'IFLA_IPTUN_ENCAP_DPORT' }],
        ['collectMetadata', data, { orig: 'IFLA_IPTUN_COLLECT_METADATA' }],
        ['fwmark', data, { orig: 'IFLA_IPTUN_FWMARK' }],
    ]},

    TunnelEncapTypes: { kind: 'enum', orig: 'tunnel_encap_types', values: [
        { value: 0, name: 'NONE', orig: 'TUNNEL_ENCAP_NONE' },
        { value: 1, name: 'FOU', orig: 'TUNNEL_ENCAP_FOU' },
        { value: 2, name: 'GUE', orig: 'TUNNEL_ENCAP_GUE' },
        { value: 3, name: 'MPLS', orig: 'TUNNEL_ENCAP_MPLS' },
    ]},

    TunnelEncapFlag: { kind: 'flags', values: [
        { value: 1<<0, name: 'csum', orig: 'TUNNEL_ENCAP_FLAG_CSUM' },
        { value: 1<<1, name: 'csum6', orig: 'TUNNEL_ENCAP_FLAG_CSUM6' },
        { value: 1<<2, name: 'remcsum', orig: 'TUNNEL_ENCAP_FLAG_REMCSUM' },
    ]},

    IpTunnelPrl: { kind: 'struct', orig: 'ip_tunnel_prl', attrs: [
        ['addr', 'u32be', { orig: 'addr' }],
        ['flags', u16, { orig: 'flags' }],
        ['__reserved', u16, { orig: '__reserved' }],
        ['datalen', u32, { orig: 'datalen' }],
        ['__reserved2', u32, { orig: '__reserved2' }],
    ]},

    IpTunnel6rd: { kind: 'struct', orig: 'ip_tunnel_6rd', attrs: [
        ['prefix', data, { count: 16, orig: 'prefix', docs: ['IPv6 address, network order'] }],
        ['relayPrefix', 'u32be', { orig: 'relay_prefix' }],
        ['prefixlen', u16, { orig: 'prefixlen' }],
        ['relayPrefixlen', u16, { orig: 'relay_prefixlen' }],
    ]},

    Gre: { attrs: [
        ['link', u32, { orig: 'IFLA_GRE_LINK' }],
        ['iflags', u16, { orig: 'IFLA_GRE_IFLAGS' }],
        ['oflags', u16, { orig: 'IFLA_GRE_OFLAGS' }],
        ['ikey', u32, { orig: 'IFLA_GRE_IKEY' }],
        ['okey', u32, { orig: 'IFLA_GRE_OKEY' }],
        ['local', u32, { orig: 'IFLA_GRE_LOCAL' }],
        ['remote', u32, { orig: 'IFLA_GRE_REMOTE' }],
        ['ttl', u8, { orig: 'IFLA_GRE_TTL' }],
        ['tos', u8, { orig: 'IFLA_GRE_TOS' }],
        ['pmtudisc', u8, { orig: 'IFLA_GRE_PMTUDISC' }],
        ['encapLimit', data, { orig: 'IFLA_GRE_ENCAP_LIMIT' }],
        ['flowinfo', data, { orig: 'IFLA_GRE_FLOWINFO' }],
        ['flags', data, { orig: 'IFLA_GRE_FLAGS' }],
        ['encapType', data, { orig: 'IFLA_GRE_ENCAP_TYPE' }],
        ['encapFlags', data, { orig: 'IFLA_GRE_ENCAP_FLAGS' }],
        ['encapSport', data, { orig: 'IFLA_GRE_ENCAP_SPORT' }],
        ['encapDport', data, { orig: 'IFLA_GRE_ENCAP_DPORT' }],
        ['collectMetadata', data, { orig: 'IFLA_GRE_COLLECT_METADATA' }],
        ['ignoreDf', data, { orig: 'IFLA_GRE_IGNORE_DF' }],
        ['fwmark', data, { orig: 'IFLA_GRE_FWMARK' }],
        ['erspanIndex', data, { orig: 'IFLA_GRE_ERSPAN_INDEX' }],
        ['erspanVer', data, { orig: 'IFLA_GRE_ERSPAN_VER' }],
        ['erspanDir', data, { orig: 'IFLA_GRE_ERSPAN_DIR' }],
        ['erspanHwid', data, { orig: 'IFLA_GRE_ERSPAN_HWID' }],
    ]},

    Vti: { attrs: [
        ['link', u32, { orig: 'IFLA_VTI_LINK' }],
        ['ikey', u32, { orig: 'IFLA_VTI_IKEY' }],
        ['okey', u32, { orig: 'IFLA_VTI_OKEY' }],
        ['local', u32, { orig: 'IFLA_VTI_LOCAL' }],
        ['remote', u32, { orig: 'IFLA_VTI_REMOTE' }],
        ['fwmark', data, { orig: 'IFLA_VTI_FWMARK' }],
    ]},

    Tunnel: { kind: 'flags', docs: [
        'WARNING: These flags should be interpreted in big endian',
    ], values: [
        { value: 0x01, name: 'csum', orig: 'TUNNEL_CSUM' },
        { value: 0x02, name: 'routing', orig: 'TUNNEL_ROUTING' },
        { value: 0x04, name: 'key', orig: 'TUNNEL_KEY' },
        { value: 0x08, name: 'seq', orig: 'TUNNEL_SEQ' },
        { value: 0x10, name: 'strict', orig: 'TUNNEL_STRICT' },
        { value: 0x20, name: 'rec', orig: 'TUNNEL_REC' },
        { value: 0x40, name: 'version', orig: 'TUNNEL_VERSION' },
        { value: 0x80, name: 'noKey', orig: 'TUNNEL_NO_KEY' },
        { value: 0x0100, name: 'dontFragment', orig: 'TUNNEL_DONT_FRAGMENT' },
        { value: 0x0200, name: 'oam', orig: 'TUNNEL_OAM' },
        { value: 0x0400, name: 'critOpt', orig: 'TUNNEL_CRIT_OPT' },
        { value: 0x0800, name: 'geneveOpt', orig: 'TUNNEL_GENEVE_OPT' },
        { value: 0x1000, name: 'vxlanOpt', orig: 'TUNNEL_VXLAN_OPT' },
        { value: 0x2000, name: 'nocache', orig: 'TUNNEL_NOCACHE' },
        { value: 0x4000, name: 'erspanOpt', orig: 'TUNNEL_ERSPAN_OPT' },
    ]},

    CanBittiming: { kind: 'struct', orig: 'can_bittiming', docs: [
        'CAN bit-timing parameters',
        ' *',
        ' * For further information, please read chapter "8 BIT TIMING',
        ' * REQUIREMENTS" of the "Bosch CAN Specification version 2.0"',
        ' * at http://www.semiconductors.bosch.de/pdf/can2spec.pdf.',
    ], attrs: [
        ['bitrate', u32, { orig: 'bitrate', docs: [
            'Bit-rate in bits/second',
        ] }],
        ['samplePoint', u32, { orig: 'sample_point', docs: [
            'Sample point in one-tenth of a percent',
        ] }],
        ['tq', u32, { orig: 'tq', docs: [
            'Time quanta (TQ) in nanoseconds',
        ] }],
        ['propSeg', u32, { orig: 'prop_seg', docs: [
            'Propagation segment in TQs',
        ] }],
        ['phaseSeg1', u32, { orig: 'phase_seg1', docs: [
            'Phase buffer segment 1 in TQs',
        ] }],
        ['phaseSeg2', u32, { orig: 'phase_seg2', docs: [
            'Phase buffer segment 2 in TQs',
        ] }],
        ['sjw', u32, { orig: 'sjw', docs: [
            'Synchronisation jump width in TQs',
        ] }],
        ['brp', u32, { orig: 'brp', docs: [
            'Bit-rate prescaler',
        ] }],
    ]},

    CanBittimingConst: { kind: 'struct', orig: 'can_bittiming_const', docs: [
        'CAN hardware-dependent bit-timing constant',
        ' *',
        ' * Used for calculating and checking bit-timing parameters',
    ], attrs: [
        ['name', u8, { count: 16, orig: 'name', docs: [
            'Name of the CAN controller hardware',
        ] }],
        ['tseg1Min', u32, { orig: 'tseg1_min', docs: [
            'Time segment 1 = prop_seg + phase_seg1',
        ] }],
        ['tseg1Max', u32, { orig: 'tseg1_max' }],
        ['tseg2Min', u32, { orig: 'tseg2_min', docs: [
            'Time segment 2 = phase_seg2',
        ] }],
        ['tseg2Max', u32, { orig: 'tseg2_max' }],
        ['sjwMax', u32, { orig: 'sjw_max', docs: [
            'Synchronisation jump width',
        ] }],
        ['brpMin', u32, { orig: 'brp_min', docs: [
            'Bit-rate prescaler',
        ] }],
        ['brpMax', u32, { orig: 'brp_max' }],
        ['brpInc', u32, { orig: 'brp_inc' }],
    ]},

    CanClock: { kind: 'struct', orig: 'can_clock', docs: [
        'CAN clock parameters',
    ], attrs: [
        ['freq', u32, { orig: 'freq', docs: [
            'CAN system clock frequency in Hz',
        ] }],
    ]},

    CanState: { kind: 'enum', orig: 'can_state', docs: [
        'CAN operational and error states',
    ], values: [
        { value: 0, name: 'ERROR_ACTIVE', orig: 'CAN_STATE_ERROR_ACTIVE', docs: [
            'RX/TX error count < 96',
        ] },
        { value: 1, name: 'ERROR_WARNING', orig: 'CAN_STATE_ERROR_WARNING', docs: [
            'RX/TX error count < 128',
        ] },
        { value: 2, name: 'ERROR_PASSIVE', orig: 'CAN_STATE_ERROR_PASSIVE', docs: [
            'RX/TX error count < 256',
        ] },
        { value: 3, name: 'BUS_OFF', orig: 'CAN_STATE_BUS_OFF', docs: [
            'RX/TX error count >= 256',
        ] },
        { value: 4, name: 'STOPPED', orig: 'CAN_STATE_STOPPED', docs: [
            'Device is stopped',
        ] },
        { value: 5, name: 'SLEEPING', orig: 'CAN_STATE_SLEEPING', docs: [
            'Device is sleeping',
        ] },
    ]},

    CanBerrCounter: { kind: 'struct', orig: 'can_berr_counter', docs: [
        'CAN bus error counters',
    ], attrs: [
        ['txerr', u16, { orig: 'txerr' }],
        ['rxerr', u16, { orig: 'rxerr' }],
    ]},

    CanCtrlModeMask: { kind: 'struct', orig: 'can_ctrlmode', docs: [
        'CAN controller mode',
    ], attrs: [
        ['mask', u32, { type: 'CanCtrlMode', orig: 'mask' }],
        ['flags', u32, { type: 'CanCtrlMode', orig: 'flags' }],
    ]},

    CanCtrlMode: { kind: 'flags', values: [
        { value: 0x01, name: 'loopback', orig: 'CAN_CTRLMODE_LOOPBACK', docs: [
            'Loopback mode',
        ] },
        { value: 0x02, name: 'listenonly', orig: 'CAN_CTRLMODE_LISTENONLY', docs: [
            'Listen-only mode',
        ] },
        { value: 0x04, name: '_3Samples', orig: 'CAN_CTRLMODE_3_SAMPLES', docs: [
            'Triple sampling mode',
        ] },
        { value: 0x08, name: 'oneShot', orig: 'CAN_CTRLMODE_ONE_SHOT', docs: [
            'One-Shot mode',
        ] },
        { value: 0x10, name: 'berrReporting', orig: 'CAN_CTRLMODE_BERR_REPORTING', docs: [
            'Bus-error reporting',
        ] },
        { value: 0x20, name: 'fd', orig: 'CAN_CTRLMODE_FD', docs: [
            'CAN FD mode',
        ] },
        { value: 0x40, name: 'presumeAck', orig: 'CAN_CTRLMODE_PRESUME_ACK', docs: [
            'Ignore missing CAN ACKs',
        ] },
        { value: 0x80, name: 'fdNonIso', orig: 'CAN_CTRLMODE_FD_NON_ISO', docs: [
            'CAN FD in non-ISO mode',
        ] },
    ]},

    CanDeviceStats: { kind: 'struct', orig: 'can_device_stats', docs: [
        'CAN device statistics',
    ], attrs: [
        ['busError', u32, { orig: 'bus_error', docs: [
            'Bus errors',
        ] }],
        ['errorWarning', u32, { orig: 'error_warning', docs: [
            'Changes to error warning state',
        ] }],
        ['errorPassive', u32, { orig: 'error_passive', docs: [
            'Changes to error passive state',
        ] }],
        ['busOff', u32, { orig: 'bus_off', docs: [
            'Changes to bus off state',
        ] }],
        ['arbitrationLost', u32, { orig: 'arbitration_lost', docs: [
            'Arbitration lost errors',
        ] }],
        ['restarts', u32, { orig: 'restarts', docs: [
            'CAN controller re-starts',
        ] }],
    ]},

    Can: { docs: [
        'CAN netlink interface',
    ], attrs: [
        ['bittiming', data, { orig: 'IFLA_CAN_BITTIMING' }],
        ['bittimingConst', data, { orig: 'IFLA_CAN_BITTIMING_CONST' }],
        ['clock', data, { orig: 'IFLA_CAN_CLOCK' }],
        ['state', u32, { orig: 'IFLA_CAN_STATE' }],
        ['ctrlmode', data, { orig: 'IFLA_CAN_CTRLMODE' }],
        ['restartMs', u32, { orig: 'IFLA_CAN_RESTART_MS' }],
        ['restart', u32, { orig: 'IFLA_CAN_RESTART' }],
        ['berrCounter', data, { orig: 'IFLA_CAN_BERR_COUNTER' }],
        ['dataBittiming', data, { orig: 'IFLA_CAN_DATA_BITTIMING' }],
        ['dataBittimingConst', data, { orig: 'IFLA_CAN_DATA_BITTIMING_CONST' }],
        ['termination', data, { orig: 'IFLA_CAN_TERMINATION' }],
        ['terminationConst', data, { orig: 'IFLA_CAN_TERMINATION_CONST' }],
        ['bitrateConst', data, { orig: 'IFLA_CAN_BITRATE_CONST' }],
        ['dataBitrateConst', data, { orig: 'IFLA_CAN_DATA_BITRATE_CONST' }],
        ['bitrateMax', data, { orig: 'IFLA_CAN_BITRATE_MAX' }],
    ]},
}

types
