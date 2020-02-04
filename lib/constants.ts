/**
 * This module exports Netlink constants.
 */
/** */

// Based on <linux/netlink.h> at d3e8869

/** Netlink protocol numbers */
export const PROTOCOLS = {
    /** Routing/device hook				*/
    NETLINK_ROUTE: 0,
    /** Unused number				*/
    NETLINK_UNUSED: 1,
    /** Reserved for user mode socket protocols 	*/
    NETLINK_USERSOCK: 2,
    /** Unused number, formerly ip_queue		*/
    NETLINK_FIREWALL: 3,
    /** socket monitoring				*/
    NETLINK_SOCK_DIAG: 4,
    /** netfilter/iptables ULOG */
    NETLINK_NFLOG: 5,
    /** ipsec */
    NETLINK_XFRM: 6,
    /** SELinux event notifications */
    NETLINK_SELINUX: 7,
    /** Open-iSCSI */
    NETLINK_ISCSI: 8,
    /** auditing */
    NETLINK_AUDIT: 9,
    NETLINK_FIB_LOOKUP: 10,
    NETLINK_CONNECTOR: 11,
    /** netfilter subsystem */
    NETLINK_NETFILTER: 12,
    NETLINK_IP6_FW: 13,
    /** DECnet routing messages */
    NETLINK_DNRTMSG: 14,
    /** Kernel messages to userspace */
    NETLINK_KOBJECT_UEVENT: 15,
    NETLINK_GENERIC: 16,
    // leave room for NETLINK_DM (DM Events)
    /** SCSI Transports */
    NETLINK_SCSITRANSPORT: 18,
    NETLINK_ECRYPTFS: 19,
    NETLINK_RDMA: 20,
    /** Crypto layer */
    NETLINK_CRYPTO: 21,
    /** SMC monitoring */
    NETLINK_SMC: 22,

    //NETLINK_INET_DIAG: 4, // NETLINK_SOCK_DIAG
}

export const MAX_LINKS = 32


// FLAGS
// -----

/** General Netlink message flags */
export const FLAGS = {
    /** It is request message. 	*/
    NLM_F_REQUEST: 0x01,
    /** Multipart message, terminated by NLMSG_DONE */
    NLM_F_MULTI: 0x02,
    /** Reply with ack, with zero or error code */
    NLM_F_ACK: 0x04,
    /** Echo this request 		*/
    NLM_F_ECHO: 0x08,
    /** Dump was inconsistent due to sequence change */
    NLM_F_DUMP_INTR: 0x10,
    /** Dump was filtered as requested */
    NLM_F_DUMP_FILTERED: 0x20,

}

/** Modifiers to GET request */
export const FLAGS_GET = {
    /** specify tree root */
    NLM_F_ROOT: 0x100,
    /** return all matching */
    NLM_F_MATCH: 0x200,
    /** atomic GET */
    NLM_F_ATOMIC: 0x400,
    NLM_F_DUMP:	0x100|0x200, // (NLM_F_ROOT|NLM_F_MATCH)
}

/** Modifiers to NEW request */
export const FLAGS_NEW = {
    /** Override existing */
    NLM_F_REPLACE: 0x100,
    /** Do not touch, if it exists */
    NLM_F_EXCL: 0x200,
    /** Create, if it does not exist */
    NLM_F_CREATE: 0x400,
    /** Add to end of list */
    NLM_F_APPEND: 0x800,
}

/** Modifiers to DELETE request */
export const FLAGS_DELETE = {
    /* Do not delete recursively */
    NLM_F_NONREC: 0x100,
}

/** Flags for ACK message */
export const FLAGS_ACK = {
    /** request was capped */
    NLM_F_CAPPED: 0x100,
    /** extended ACK TVLs were included */
    NLM_F_ACK_TLVS: 0x200,
}

export const ALL_FLAGS = {
    ...FLAGS, ...FLAGS_GET, ...FLAGS_NEW, ...FLAGS_DELETE, ...FLAGS_ACK,
}

/*
4.4BSD ADD		NLM_F_CREATE|NLM_F_EXCL
4.4BSD CHANGE	NLM_F_REPLACE
True CHANGE		NLM_F_CREATE|NLM_F_REPLACE
Append		NLM_F_CREATE
Check		NLM_F_EXCL
*/


// TYPES
// -----

/** Standard control message types */
export const TYPES = {
    /** Nothing. */
    NLMSG_NOOP: 0x1,
    /** Error */
    NLMSG_ERROR: 0x2,
    /** End of a dump */
    NLMSG_DONE: 0x3,
    /** Data lost */
    NLMSG_OVERRUN: 0x4,
}

/** < 0x10: reserved control messages */
export const NLMSG_MIN_TYPE = 0x10


// ATTRIBUTES
// ----------

export const ATTRIBUTES = {
    NETLINK_ADD_MEMBERSHIP: 1,
    NETLINK_DROP_MEMBERSHIP: 2,
    NETLINK_PKTINFO: 3,
    NETLINK_BROADCAST_ERROR: 4,
    NETLINK_NO_ENOBUFS: 5,
    // NETLINK_RX_RING: 6,
    // NETLINK_TX_RING: 7,
    NETLINK_LISTEN_ALL_NSID: 8,
    NETLINK_LIST_MEMBERSHIPS: 9,
    NETLINK_CAP_ACK: 10,
    NETLINK_EXT_ACK: 11,
    NETLINK_GET_STRICT_CHK: 12,
}


// OTHER
// -----

/** Major 36 is reserved for networking */
export const NET_MAJOR = 36
