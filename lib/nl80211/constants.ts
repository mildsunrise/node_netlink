/** 802.11 netlink interface */

// Based on <linux/nl80211.h> at 14f34e3

export const NL80211_GENL_NAME = "nl80211"

export enum Nl80211MulticastGroups {
    CONFIG = "config",
    SCAN = "scan",
    REG = "regulatory",
    MLME = "mlme",
    VENDOR = "vendor",
    NAN = "nan",
    TESTMODE = "testmode",
}

export const NL80211_EDMG_BW_CONFIG_MIN = 4
export const NL80211_EDMG_BW_CONFIG_MAX = 15
export const NL80211_EDMG_CHANNELS_MIN = 1
export const NL80211_EDMG_CHANNELS_MAX = 0x3c /* 0b00111100 */

export const NL80211_WIPHY_NAME_MAXLEN = 64

export const NL80211_MAX_SUPP_RATES = 32
export const NL80211_MAX_SUPP_HT_RATES = 77
export const NL80211_MAX_SUPP_REG_RULES = 128
export const NL80211_TKIP_DATA_OFFSET_ENCR_KEY = 0
export const NL80211_TKIP_DATA_OFFSET_TX_MIC_KEY = 16
export const NL80211_TKIP_DATA_OFFSET_RX_MIC_KEY = 24
export const NL80211_HT_CAPABILITY_LEN = 26
export const NL80211_VHT_CAPABILITY_LEN = 12
export const NL80211_HE_MIN_CAPABILITY_LEN = 16
export const NL80211_HE_MAX_CAPABILITY_LEN = 54
export const NL80211_MAX_NR_CIPHER_SUITES = 5
export const NL80211_MAX_NR_AKM_SUITES = 2

export const NL80211_MIN_REMAIN_ON_CHANNEL_TIME = 10

/** default RSSI threshold for scan results if none specified. */
export const NL80211_SCAN_RSSI_THOLD_OFF = -300

export const NL80211_CQM_TXE_MAX_INTVL = 1800
