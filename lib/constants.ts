/**
 * This module exports Netlink constants.
 * @module
 */

// Based on <linux/netlink.h> at d3e8869

/** Netlink protocol numbers */
export enum Protocol {
    /** Routing/device hook */
    ROUTE = 0,
    /** Unused number */
    UNUSED = 1,
    /** Reserved for user mode socket protocols */
    USERSOCK = 2,
    /** Unused number, formerly ip_queue */
    FIREWALL = 3,
    /** socket monitoring */
    SOCK_DIAG = 4,
    /** netfilter/iptables ULOG */
    NFLOG = 5,
    /** ipsec */
    XFRM = 6,
    /** SELinux event notifications */
    SELINUX = 7,
    /** Open-iSCSI */
    ISCSI = 8,
    /** auditing */
    AUDIT = 9,
    FIB_LOOKUP = 10,
    CONNECTOR = 11,
    /** netfilter subsystem */
    NETFILTER = 12,
    IP6_FW = 13,
    /** DECnet routing messages */
    DNRTMSG = 14,
    /** Kernel messages to userspace */
    KOBJECT_UEVENT = 15,
    GENERIC = 16,
    // leave room for DM (DM Events)
    /** SCSI Transports */
    SCSITRANSPORT = 18,
    ECRYPTFS = 19,
    RDMA = 20,
    /** Crypto layer */
    CRYPTO = 21,
    /** SMC monitoring */
    SMC = 22,

    //INET_DIAG = 4, // SOCK_DIAG
}

export const MAX_LINKS = 32


// FLAGS
// -----

/** General Netlink message flags */
export enum Flags {
    /** It is request message. */
    REQUEST = 0x01,
    /** Multipart message, terminated by NLMSG_DONE */
    MULTI = 0x02,
    /** Reply with ack, with zero or error code */
    ACK = 0x04,
    /** Echo this request */
    ECHO = 0x08,
    /** Dump was inconsistent due to sequence change */
    DUMP_INTR = 0x10,
    /** Dump was filtered as requested */
    DUMP_FILTERED = 0x20,
}

/** Modifiers to GET request */
export enum FlagsGet {
    /** specify tree root */
    ROOT = 0x100,
    /** return all matching */
    MATCH = 0x200,
    /** atomic GET */
    ATOMIC = 0x400,
    DUMP = 0x100|0x200, // (ROOT|MATCH)
}

/** Modifiers to NEW request */
export enum FlagsNew {
    /** Override existing */
    REPLACE = 0x100,
    /** Do not touch, if it exists */
    EXCL = 0x200,
    /** Create, if it does not exist */
    CREATE = 0x400,
    /** Add to end of list */
    APPEND = 0x800,
}

/** Modifiers to DELETE request */
export enum FlagsDelete {
    /* Do not delete recursively */
    NONREC = 0x100,
}

/** Flags for ACK message */
export enum FlagsAck {
    /** request was capped */
    CAPPED = 0x100,
    /** extended ACK TVLs were included */
    ACK_TLVS = 0x200,
}

export const AllFlags = {
    ...Flags, ...FlagsGet, ...FlagsNew, ...FlagsDelete, ...FlagsAck,
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
export enum MessageType {
    /** Nothing. */
    NOOP = 0x1,
    /** Error */
    ERROR = 0x2,
    /** End of a dump */
    DONE = 0x3,
    /** Data lost */
    OVERRUN = 0x4,
}

/** < 0x10: reserved control messages */
export const MIN_TYPE = 0x10


// ATTRIBUTES
// ----------

export enum Attributes {
    ADD_MEMBERSHIP = 1,
    DROP_MEMBERSHIP = 2,
    PKTINFO = 3,
    BROADCAST_ERROR = 4,
    NO_ENOBUFS = 5,
    // RX_RING = 6,
    // TX_RING = 7,
    LISTEN_ALL_NSID = 8,
    LIST_MEMBERSHIPS = 9,
    CAP_ACK = 10,
    EXT_ACK = 11,
    GET_STRICT_CHK = 12,
}


// OTHER
// -----

/** Major 36 is reserved for networking */
export const NET_MAJOR = 36
