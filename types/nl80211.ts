/**
 * 802.11 netlink interface
 * 
 * Based on <linux/nl80211.h> at 14f34e3
 */

import { TypeStore, data, bool, u8, u16, u32, u64, s8, s16, s32, s64, flag, string, array, map, asflags } from './_base'

const types: TypeStore = {
    Commands: { kind: 'enum', docs: [
        'supported nl80211 commands',
    ], values: [
        { value: 0, name: 'GET_WIPHY', docs: [
            'request information about a wiphy or dump request',
            'to get a list of all present wiphys.',
        ] },
        { value: 1, name: 'SET_WIPHY', docs: [
            'set wiphy parameters, needs %NL80211_ATTR_WIPHY or',
            '%NL80211_ATTR_IFINDEX; can be used to set %NL80211_ATTR_WIPHY_NAME,',
            '%NL80211_ATTR_WIPHY_TXQ_PARAMS, %NL80211_ATTR_WIPHY_FREQ (and the',
            'attributes determining the channel width; this is used for setting',
            'monitor mode channel),  %NL80211_ATTR_WIPHY_RETRY_SHORT,',
            '%NL80211_ATTR_WIPHY_RETRY_LONG, %NL80211_ATTR_WIPHY_FRAG_THRESHOLD,',
            'and/or %NL80211_ATTR_WIPHY_RTS_THRESHOLD.',
            'However, for setting the channel, see %NL80211_CMD_SET_CHANNEL',
            'instead, the support here is for backward compatibility only.',
        ] },
        { value: 2, name: 'NEW_WIPHY', docs: [
            'Newly created wiphy, response to get request',
            'or rename notification. Has attributes %NL80211_ATTR_WIPHY and',
            '%NL80211_ATTR_WIPHY_NAME.',
        ] },
        { value: 3, name: 'DEL_WIPHY', docs: [
            'Wiphy deleted. Has attributes',
            '%NL80211_ATTR_WIPHY and %NL80211_ATTR_WIPHY_NAME.',
        ] },
        { value: 4, name: 'GET_INTERFACE', docs: [
            "Request an interface's configuration;",
            'either a dump request for all interfaces or a specific get with a',
            'single %NL80211_ATTR_IFINDEX is supported.',
        ] },
        { value: 5, name: 'SET_INTERFACE', docs: [
            'Set type of a virtual interface, requires',
            '%NL80211_ATTR_IFINDEX and %NL80211_ATTR_IFTYPE.',
        ] },
        { value: 6, name: 'NEW_INTERFACE', docs: [
            'Newly created virtual interface or response',
            'to %NL80211_CMD_GET_INTERFACE. Has %NL80211_ATTR_IFINDEX,',
            '%NL80211_ATTR_WIPHY and %NL80211_ATTR_IFTYPE attributes. Can also',
            'be sent from userspace to request creation of a new virtual interface,',
            'then requires attributes %NL80211_ATTR_WIPHY, %NL80211_ATTR_IFTYPE and',
            '%NL80211_ATTR_IFNAME.',
        ] },
        { value: 7, name: 'DEL_INTERFACE', docs: [
            'Virtual interface was deleted, has attributes',
            '%NL80211_ATTR_IFINDEX and %NL80211_ATTR_WIPHY. Can also be sent from',
            'userspace to request deletion of a virtual interface, then requires',
            'attribute %NL80211_ATTR_IFINDEX.',
        ] },
        { value: 8, name: 'GET_KEY', docs: [
            'Get sequence counter information for a key specified',
            'by %NL80211_ATTR_KEY_IDX and/or %NL80211_ATTR_MAC.',
        ] },
        { value: 9, name: 'SET_KEY', docs: [
            'Set key attributes %NL80211_ATTR_KEY_DEFAULT,',
            '%NL80211_ATTR_KEY_DEFAULT_MGMT, or %NL80211_ATTR_KEY_THRESHOLD.',
        ] },
        { value: 10, name: 'NEW_KEY', docs: [
            'add a key with given %NL80211_ATTR_KEY_DATA,',
            '%NL80211_ATTR_KEY_IDX, %NL80211_ATTR_MAC, %NL80211_ATTR_KEY_CIPHER,',
            'and %NL80211_ATTR_KEY_SEQ attributes.',
        ] },
        { value: 11, name: 'DEL_KEY', docs: [
            'delete a key identified by %NL80211_ATTR_KEY_IDX',
            'or %NL80211_ATTR_MAC.',
        ] },
        { value: 12, name: 'GET_BEACON', docs: [
            '(not used)',
        ] },
        { value: 13, name: 'SET_BEACON', docs: [
            'change the beacon on an access point interface',
            'using the %NL80211_ATTR_BEACON_HEAD and %NL80211_ATTR_BEACON_TAIL',
            'attributes. For drivers that generate the beacon and probe responses',
            'internally, the following attributes must be provided: %NL80211_ATTR_IE,',
            '%NL80211_ATTR_IE_PROBE_RESP and %NL80211_ATTR_IE_ASSOC_RESP.',
        ] },
        { value: 14, name: 'START_AP', docs: [
            'Start AP operation on an AP interface, parameters',
            'are like for %NL80211_CMD_SET_BEACON, and additionally parameters that',
            'do not change are used, these include %NL80211_ATTR_BEACON_INTERVAL,',
            '%NL80211_ATTR_DTIM_PERIOD, %NL80211_ATTR_SSID,',
            '%NL80211_ATTR_HIDDEN_SSID, %NL80211_ATTR_CIPHERS_PAIRWISE,',
            '%NL80211_ATTR_CIPHER_GROUP, %NL80211_ATTR_WPA_VERSIONS,',
            '%NL80211_ATTR_AKM_SUITES, %NL80211_ATTR_PRIVACY,',
            '%NL80211_ATTR_AUTH_TYPE, %NL80211_ATTR_INACTIVITY_TIMEOUT,',
            '%NL80211_ATTR_ACL_POLICY and %NL80211_ATTR_MAC_ADDRS.',
            'The channel to use can be set on the interface or be given using the',
            '%NL80211_ATTR_WIPHY_FREQ and the attributes determining channel width.',
        ] },
        { value: 15, name: 'STOP_AP', docs: [
            'Stop AP operation on the given interface',
        ] },
        { value: 16, name: 'GET_STATION', docs: [
            'Get station attributes for station identified by',
            '%NL80211_ATTR_MAC on the interface identified by %NL80211_ATTR_IFINDEX.',
        ] },
        { value: 17, name: 'SET_STATION', docs: [
            'Set station attributes for station identified by',
            '%NL80211_ATTR_MAC on the interface identified by %NL80211_ATTR_IFINDEX.',
        ] },
        { value: 18, name: 'NEW_STATION', docs: [
            'Add a station with given attributes to the',
            'the interface identified by %NL80211_ATTR_IFINDEX.',
        ] },
        { value: 19, name: 'DEL_STATION', docs: [
            'Remove a station identified by %NL80211_ATTR_MAC',
            'or, if no MAC address given, all stations, on the interface identified',
            'by %NL80211_ATTR_IFINDEX. %NL80211_ATTR_MGMT_SUBTYPE and',
            '%NL80211_ATTR_REASON_CODE can optionally be used to specify which type',
            'of disconnection indication should be sent to the station',
            '(Deauthentication or Disassociation frame and reason code for that',
            'frame).',
        ] },
        { value: 20, name: 'GET_MPATH', docs: [
            'Get mesh path attributes for mesh path to',
            'destination %NL80211_ATTR_MAC on the interface identified by',
            '%NL80211_ATTR_IFINDEX.',
        ] },
        { value: 21, name: 'SET_MPATH', docs: [
            'Set mesh path attributes for mesh path to',
            'destination %NL80211_ATTR_MAC on the interface identified by',
            '%NL80211_ATTR_IFINDEX.',
        ] },
        { value: 22, name: 'NEW_MPATH', docs: [
            'Create a new mesh path for the destination given by',
            '%NL80211_ATTR_MAC via %NL80211_ATTR_MPATH_NEXT_HOP.',
        ] },
        { value: 23, name: 'DEL_MPATH', docs: [
            'Delete a mesh path to the destination given by',
            '%NL80211_ATTR_MAC.',
        ] },
        { value: 24, name: 'SET_BSS', docs: [
            'Set BSS attributes for BSS identified by',
            '%NL80211_ATTR_IFINDEX.',
        ] },
        { value: 25, name: 'SET_REG', docs: [
            'Set current regulatory domain. CRDA sends this command',
            'after being queried by the kernel. CRDA replies by sending a regulatory',
            'domain structure which consists of %NL80211_ATTR_REG_ALPHA set to our',
            'current alpha2 if it found a match. It also provides',
            'NL80211_ATTR_REG_RULE_FLAGS, and a set of regulatory rules. Each',
            'regulatory rule is a nested set of attributes  given by',
            '%NL80211_ATTR_REG_RULE_FREQ_[START|END] and',
            '%NL80211_ATTR_FREQ_RANGE_MAX_BW with an attached power rule given by',
            '%NL80211_ATTR_REG_RULE_POWER_MAX_ANT_GAIN and',
            '%NL80211_ATTR_REG_RULE_POWER_MAX_EIRP.',
        ] },
        { value: 26, name: 'REQ_SET_REG', docs: [
            'ask the wireless core to set the regulatory domain',
            'to the specified ISO/IEC 3166-1 alpha2 country code. The core will',
            'store this as a valid request and then query userspace for it.',
        ] },
        { value: 27, name: 'GET_MESH_CONFIG', docs: [
            'Get mesh networking properties for the',
            'interface identified by %NL80211_ATTR_IFINDEX',
        ] },
        { value: 28, name: 'SET_MESH_CONFIG', docs: [
            'Set mesh networking properties for the',
            'interface identified by %NL80211_ATTR_IFINDEX',
        ] },
        { value: 29, name: 'SET_MGMT_EXTRA_IE', docs: [
            'Set extra IEs for management frames. The',
            'interface is identified with %NL80211_ATTR_IFINDEX and the management',
            'frame subtype with %NL80211_ATTR_MGMT_SUBTYPE. The extra IE data to be',
            'added to the end of the specified management frame is specified with',
            '%NL80211_ATTR_IE. If the command succeeds, the requested data will be',
            'added to all specified management frames generated by',
            'kernel/firmware/driver.',
            'Note: This command has been removed and it is only reserved at this',
            'point to avoid re-using existing command number. The functionality this',
            'command was planned for has been provided with cleaner design with the',
            'option to specify additional IEs in NL80211_CMD_TRIGGER_SCAN,',
            'NL80211_CMD_AUTHENTICATE, NL80211_CMD_ASSOCIATE,',
            'NL80211_CMD_DEAUTHENTICATE, and NL80211_CMD_DISASSOCIATE.',
        ] },
        { value: 30, name: 'GET_REG', docs: [
            'ask the wireless core to send us its currently set',
            'regulatory domain. If %NL80211_ATTR_WIPHY is specified and the device',
            'has a private regulatory domain, it will be returned. Otherwise, the',
            'global regdomain will be returned.',
            'A device will have a private regulatory domain if it uses the',
            'regulatory_hint() API. Even when a private regdomain is used the channel',
            'information will still be mended according to further hints from',
            'the regulatory core to help with compliance. A dump version of this API',
            'is now available which will returns the global regdomain as well as',
            'all private regdomains of present wiphys (for those that have it).',
            'If a wiphy is self-managed (%NL80211_ATTR_WIPHY_SELF_MANAGED_REG), then',
            'its private regdomain is the only valid one for it. The regulatory',
            'core is not used to help with compliance in this case.',
        ] },
        { value: 31, name: 'GET_SCAN', docs: [
            'get scan results',
        ] },
        { value: 32, name: 'TRIGGER_SCAN', docs: [
            'trigger a new scan with the given parameters',
            '%NL80211_ATTR_TX_NO_CCK_RATE is used to decide whether to send the',
            'probe requests at CCK rate or not. %NL80211_ATTR_BSSID can be used to',
            'specify a BSSID to scan for; if not included, the wildcard BSSID will',
            'be used.',
        ] },
        { value: 33, name: 'NEW_SCAN_RESULTS', docs: [
            'scan notification (as a reply to',
            'NL80211_CMD_GET_SCAN and on the "scan" multicast group)',
        ] },
        { value: 34, name: 'SCAN_ABORTED', docs: [
            'scan was aborted, for unspecified reasons,',
            'partial scan results may be available',
        ] },
        { value: 35, name: 'REG_CHANGE', docs: [
            'indicates to userspace the regulatory domain',
            'has been changed and provides details of the request information',
            'that caused the change such as who initiated the regulatory request',
            '(%NL80211_ATTR_REG_INITIATOR), the wiphy_idx',
            '(%NL80211_ATTR_REG_ALPHA2) on which the request was made from if',
            'the initiator was %NL80211_REGDOM_SET_BY_COUNTRY_IE or',
            '%NL80211_REGDOM_SET_BY_DRIVER, the type of regulatory domain',
            'set (%NL80211_ATTR_REG_TYPE), if the type of regulatory domain is',
            '%NL80211_REG_TYPE_COUNTRY the alpha2 to which we have moved on',
            'to (%NL80211_ATTR_REG_ALPHA2).',
        ] },
        { value: 36, name: 'AUTHENTICATE', docs: [
            'authentication request and notification.',
            'This command is used both as a command (request to authenticate) and',
            'as an event on the "mlme" multicast group indicating completion of the',
            'authentication process.',
            'When used as a command, %NL80211_ATTR_IFINDEX is used to identify the',
            'interface. %NL80211_ATTR_MAC is used to specify PeerSTAAddress (and',
            'BSSID in case of station mode). %NL80211_ATTR_SSID is used to specify',
            'the SSID (mainly for association, but is included in authentication',
            'request, too, to help BSS selection. %NL80211_ATTR_WIPHY_FREQ is used',
            'to specify the frequence of the channel in MHz. %NL80211_ATTR_AUTH_TYPE',
            'is used to specify the authentication type. %NL80211_ATTR_IE is used to',
            'define IEs (VendorSpecificInfo, but also including RSN IE and FT IEs)',
            'to be added to the frame.',
            'When used as an event, this reports reception of an Authentication',
            'frame in station and IBSS modes when the local MLME processed the',
            'frame, i.e., it was for the local STA and was received in correct',
            'state. This is similar to MLME-AUTHENTICATE.confirm primitive in the',
            'MLME SAP interface (kernel providing MLME, userspace SME). The',
            'included %NL80211_ATTR_FRAME attribute contains the management frame',
            '(including both the header and frame body, but not FCS). This event is',
            'also used to indicate if the authentication attempt timed out. In that',
            'case the %NL80211_ATTR_FRAME attribute is replaced with a',
            '%NL80211_ATTR_TIMED_OUT flag (and %NL80211_ATTR_MAC to indicate which',
            'pending authentication timed out).',
        ] },
        { value: 37, name: 'ASSOCIATE', docs: [
            'association request and notification; like',
            'NL80211_CMD_AUTHENTICATE but for Association and Reassociation',
            '(similar to MLME-ASSOCIATE.request, MLME-REASSOCIATE.request,',
            'MLME-ASSOCIATE.confirm or MLME-REASSOCIATE.confirm primitives). The',
            '%NL80211_ATTR_PREV_BSSID attribute is used to specify whether the',
            'request is for the initial association to an ESS (that attribute not',
            'included) or for reassociation within the ESS (that attribute is',
            'included).',
        ] },
        { value: 38, name: 'DEAUTHENTICATE', docs: [
            'deauthentication request and notification; like',
            'NL80211_CMD_AUTHENTICATE but for Deauthentication frames (similar to',
            'MLME-DEAUTHENTICATION.request and MLME-DEAUTHENTICATE.indication',
            'primitives).',
        ] },
        { value: 39, name: 'DISASSOCIATE', docs: [
            'disassociation request and notification; like',
            'NL80211_CMD_AUTHENTICATE but for Disassociation frames (similar to',
            'MLME-DISASSOCIATE.request and MLME-DISASSOCIATE.indication primitives).',
        ] },
        { value: 40, name: 'MICHAEL_MIC_FAILURE', docs: [
            'notification of a locally detected Michael',
            'MIC (part of TKIP) failure; sent on the "mlme" multicast group; the',
            'event includes %NL80211_ATTR_MAC to describe the source MAC address of',
            'the frame with invalid MIC, %NL80211_ATTR_KEY_TYPE to show the key',
            'type, %NL80211_ATTR_KEY_IDX to indicate the key identifier, and',
            '%NL80211_ATTR_KEY_SEQ to indicate the TSC value of the frame; this',
            'event matches with MLME-MICHAELMICFAILURE.indication() primitive',
        ] },
        { value: 41, name: 'REG_BEACON_HINT', docs: [
            'indicates to userspace that an AP beacon',
            'has been found while world roaming thus enabling active scan or',
            'any mode of operation that initiates TX (beacons) on a channel',
            'where we would not have been able to do either before. As an example',
            'if you are world roaming (regulatory domain set to world or if your',
            'driver is using a custom world roaming regulatory domain) and while',
            'doing a passive scan on the 5 GHz band you find an AP there (if not',
            'on a DFS channel) you will now be able to actively scan for that AP',
            'or use AP mode on your card on that same channel. Note that this will',
            'never be used for channels 1-11 on the 2 GHz band as they are always',
            'enabled world wide. This beacon hint is only sent if your device had',
            'either disabled active scanning or beaconing on a channel. We send to',
            'userspace the wiphy on which we removed a restriction from',
            '(%NL80211_ATTR_WIPHY) and the channel on which this occurred',
            'before (%NL80211_ATTR_FREQ_BEFORE) and after (%NL80211_ATTR_FREQ_AFTER)',
            'the beacon hint was processed.',
        ] },
        { value: 42, name: 'JOIN_IBSS', docs: [
            'Join a new IBSS -- given at least an SSID and a',
            'FREQ attribute (for the initial frequency if no peer can be found)',
            'and optionally a MAC (as BSSID) and FREQ_FIXED attribute if those',
            'should be fixed rather than automatically determined. Can only be',
            'executed on a network interface that is UP, and fixed BSSID/FREQ',
            'may be rejected. Another optional parameter is the beacon interval,',
            'given in the %NL80211_ATTR_BEACON_INTERVAL attribute, which if not',
            'given defaults to 100 TU (102.4ms).',
        ] },
        { value: 43, name: 'LEAVE_IBSS', docs: [
            'Leave the IBSS -- no special arguments, the IBSS is',
            'determined by the network interface.',
        ] },
        { value: 44, name: 'TESTMODE', docs: [
            'testmode command, takes a wiphy (or ifindex) attribute',
            'to identify the device, and the TESTDATA blob attribute to pass through',
            'to the driver.',
        ] },
        { value: 45, name: 'CONNECT', docs: [
            'connection request and notification; this command',
            'requests to connect to a specified network but without separating',
            'auth and assoc steps. For this, you need to specify the SSID in a',
            '%NL80211_ATTR_SSID attribute, and can optionally specify the association',
            'IEs in %NL80211_ATTR_IE, %NL80211_ATTR_AUTH_TYPE, %NL80211_ATTR_USE_MFP,',
            '%NL80211_ATTR_MAC, %NL80211_ATTR_WIPHY_FREQ, %NL80211_ATTR_CONTROL_PORT,',
            '%NL80211_ATTR_CONTROL_PORT_ETHERTYPE,',
            '%NL80211_ATTR_CONTROL_PORT_NO_ENCRYPT,',
            '%NL80211_ATTR_CONTROL_PORT_OVER_NL80211, %NL80211_ATTR_MAC_HINT, and',
            '%NL80211_ATTR_WIPHY_FREQ_HINT.',
            'If included, %NL80211_ATTR_MAC and %NL80211_ATTR_WIPHY_FREQ are',
            'restrictions on BSS selection, i.e., they effectively prevent roaming',
            'within the ESS. %NL80211_ATTR_MAC_HINT and %NL80211_ATTR_WIPHY_FREQ_HINT',
            'can be included to provide a recommendation of the initial BSS while',
            'allowing the driver to roam to other BSSes within the ESS and also to',
            'ignore this recommendation if the indicated BSS is not ideal. Only one',
            'set of BSSID,frequency parameters is used (i.e., either the enforcing',
            '%NL80211_ATTR_MAC,%NL80211_ATTR_WIPHY_FREQ or the less strict',
            '%NL80211_ATTR_MAC_HINT and %NL80211_ATTR_WIPHY_FREQ_HINT).',
            'Driver shall not modify the IEs specified through %NL80211_ATTR_IE if',
            '%NL80211_ATTR_MAC is included. However, if %NL80211_ATTR_MAC_HINT is',
            'included, these IEs through %NL80211_ATTR_IE are specified by the user',
            'space based on the best possible BSS selected. Thus, if the driver ends',
            'up selecting a different BSS, it can modify these IEs accordingly (e.g.',
            'userspace asks the driver to perform PMKSA caching with BSS1 and the',
            'driver ends up selecting BSS2 with different PMKSA cache entry; RSNIE',
            'has to get updated with the apt PMKID).',
            '%NL80211_ATTR_PREV_BSSID can be used to request a reassociation within',
            'the ESS in case the device is already associated and an association with',
            'a different BSS is desired.',
            'Background scan period can optionally be',
            'specified in %NL80211_ATTR_BG_SCAN_PERIOD,',
            'if not specified default background scan configuration',
            'in driver is used and if period value is 0, bg scan will be disabled.',
            'This attribute is ignored if driver does not support roam scan.',
            'It is also sent as an event, with the BSSID and response IEs when the',
            'connection is established or failed to be established. This can be',
            'determined by the %NL80211_ATTR_STATUS_CODE attribute (0 = success,',
            'non-zero = failure). If %NL80211_ATTR_TIMED_OUT is included in the',
            'event, the connection attempt failed due to not being able to initiate',
            'authentication/association or not receiving a response from the AP.',
            'Non-zero %NL80211_ATTR_STATUS_CODE value is indicated in that case as',
            'well to remain backwards compatible.',
            'When establishing a security association, drivers that support 4 way',
            'handshake offload should send %NL80211_CMD_PORT_AUTHORIZED event when',
            'the 4 way handshake is completed successfully.',
        ] },
        { value: 46, name: 'ROAM', docs: [
            'Notification indicating the card/driver roamed by itself.',
            'When a security association was established with the new AP (e.g. if',
            'the FT protocol was used for roaming or the driver completed the 4 way',
            'handshake), this event should be followed by an',
            '%NL80211_CMD_PORT_AUTHORIZED event.',
        ] },
        { value: 47, name: 'DISCONNECT', docs: [
            'drop a given connection; also used to notify',
            'userspace that a connection was dropped by the AP or due to other',
            'reasons, for this the %NL80211_ATTR_DISCONNECTED_BY_AP and',
            '%NL80211_ATTR_REASON_CODE attributes are used.',
        ] },
        { value: 48, name: 'SET_WIPHY_NETNS', docs: [
            "Set a wiphy's netns. Note that all devices",
            'associated with this wiphy must be down and will follow.',
        ] },
        { value: 49, name: 'GET_SURVEY', docs: [
            'get survey resuls, e.g. channel occupation',
            'or noise level',
        ] },
        { value: 50, name: 'NEW_SURVEY_RESULTS', docs: [
            'survey data notification (as a reply to',
            'NL80211_CMD_GET_SURVEY and on the "scan" multicast group)',
        ] },
        { value: 51, name: 'SET_PMKSA', docs: [
            'Add a PMKSA cache entry using %NL80211_ATTR_MAC',
            '(for the BSSID), %NL80211_ATTR_PMKID, and optionally %NL80211_ATTR_PMK',
            '(PMK is used for PTKSA derivation in case of FILS shared key offload) or',
            'using %NL80211_ATTR_SSID, %NL80211_ATTR_FILS_CACHE_ID,',
            '%NL80211_ATTR_PMKID, and %NL80211_ATTR_PMK in case of FILS',
            'authentication where %NL80211_ATTR_FILS_CACHE_ID is the identifier',
            'advertized by a FILS capable AP identifying the scope of PMKSA in an',
            'ESS.',
        ] },
        { value: 52, name: 'DEL_PMKSA', docs: [
            'Delete a PMKSA cache entry, using %NL80211_ATTR_MAC',
            '(for the BSSID) and %NL80211_ATTR_PMKID or using %NL80211_ATTR_SSID,',
            '%NL80211_ATTR_FILS_CACHE_ID, and %NL80211_ATTR_PMKID in case of FILS',
            'authentication.',
        ] },
        { value: 53, name: 'FLUSH_PMKSA', docs: [
            'Flush all PMKSA cache entries.',
        ] },
        { value: 54, name: 'REMAIN_ON_CHANNEL', docs: [
            'Request to remain awake on the specified',
            'channel for the specified amount of time. This can be used to do',
            'off-channel operations like transmit a Public Action frame and wait for',
            'a response while being associated to an AP on another channel.',
            '%NL80211_ATTR_IFINDEX is used to specify which interface (and thus',
            'radio) is used. %NL80211_ATTR_WIPHY_FREQ is used to specify the',
            'frequency for the operation.',
            '%NL80211_ATTR_DURATION is used to specify the duration in milliseconds',
            'to remain on the channel. This command is also used as an event to',
            'notify when the requested duration starts (it may take a while for the',
            'driver to schedule this time due to other concurrent needs for the',
            'radio).',
            'When called, this operation returns a cookie (%NL80211_ATTR_COOKIE)',
            'that will be included with any events pertaining to this request;',
            'the cookie is also used to cancel the request.',
        ] },
        { value: 55, name: 'CANCEL_REMAIN_ON_CHANNEL', docs: [
            'This command can be used to cancel a',
            'pending remain-on-channel duration if the desired operation has been',
            'completed prior to expiration of the originally requested duration.',
            '%NL80211_ATTR_WIPHY or %NL80211_ATTR_IFINDEX is used to specify the',
            'radio. The %NL80211_ATTR_COOKIE attribute must be given as well to',
            'uniquely identify the request.',
            'This command is also used as an event to notify when a requested',
            'remain-on-channel duration has expired.',
        ] },
        { value: 56, name: 'SET_TX_BITRATE_MASK', docs: [
            'Set the mask of rates to be used in TX',
            'rate selection. %NL80211_ATTR_IFINDEX is used to specify the interface',
            'and @NL80211_ATTR_TX_RATES the set of allowed rates.',
        ] },
        { value: 57, name: 'REGISTER_FRAME', docs: [
            'Register for receiving certain mgmt frames',
            '(via @NL80211_CMD_FRAME) for processing in userspace. This command',
            'requires an interface index, a frame type attribute (optional for',
            'backward compatibility reasons, if not given assumes action frames)',
            'and a match attribute containing the first few bytes of the frame',
            'that should match, e.g. a single byte for only a category match or',
            'four bytes for vendor frames including the OUI. The registration',
            'cannot be dropped, but is removed automatically when the netlink',
            'socket is closed. Multiple registrations can be made.',
        ] },
        { value: 58, name: 'FRAME', docs: [
            'Management frame TX request and RX notification. This',
            'command is used both as a request to transmit a management frame and',
            'as an event indicating reception of a frame that was not processed in',
            'kernel code, but is for us (i.e., which may need to be processed in a',
            'user space application). %NL80211_ATTR_FRAME is used to specify the',
            'frame contents (including header). %NL80211_ATTR_WIPHY_FREQ is used',
            'to indicate on which channel the frame is to be transmitted or was',
            'received. If this channel is not the current channel (remain-on-channel',
            'or the operational channel) the device will switch to the given channel',
            'and transmit the frame, optionally waiting for a response for the time',
            'specified using %NL80211_ATTR_DURATION. When called, this operation',
            'returns a cookie (%NL80211_ATTR_COOKIE) that will be included with the',
            'TX status event pertaining to the TX request.',
            '%NL80211_ATTR_TX_NO_CCK_RATE is used to decide whether to send the',
            'management frames at CCK rate or not in 2GHz band.',
            '%NL80211_ATTR_CSA_C_OFFSETS_TX is an array of offsets to CSA',
            'counters which will be updated to the current value. This attribute',
            'is used during CSA period.',
        ] },
        { value: 59, name: 'FRAME_TX_STATUS', docs: [
            'Report TX status of a management frame',
            'transmitted with %NL80211_CMD_FRAME. %NL80211_ATTR_COOKIE identifies',
            'the TX command and %NL80211_ATTR_FRAME includes the contents of the',
            'frame. %NL80211_ATTR_ACK flag is included if the recipient acknowledged',
            'the frame.',
        ] },
        { value: 60, name: 'SET_POWER_SAVE', docs: [
            'Set powersave, using %NL80211_ATTR_PS_STATE',
        ] },
        { value: 61, name: 'GET_POWER_SAVE', docs: [
            'Get powersave status in %NL80211_ATTR_PS_STATE',
        ] },
        { value: 62, name: 'SET_CQM', docs: [
            'Connection quality monitor configuration. This command',
            'is used to configure connection quality monitoring notification trigger',
            'levels.',
        ] },
        { value: 63, name: 'NOTIFY_CQM', docs: [
            'Connection quality monitor notification. This',
            'command is used as an event to indicate the that a trigger level was',
            'reached.',
        ] },
        { value: 64, name: 'SET_CHANNEL', docs: [
            'Set the channel (using %NL80211_ATTR_WIPHY_FREQ',
            'and the attributes determining channel width) the given interface',
            '(identifed by %NL80211_ATTR_IFINDEX) shall operate on.',
            'In case multiple channels are supported by the device, the mechanism',
            'with which it switches channels is implementation-defined.',
            'When a monitor interface is given, it can only switch channel while',
            'no other interfaces are operating to avoid disturbing the operation',
            'of any other interfaces, and other interfaces will again take',
            'precedence when they are used.',
        ] },
        { value: 65, name: 'SET_WDS_PEER', docs: [
            'Set the MAC address of the peer on a WDS interface.',
        ] },
        { value: 66, name: 'FRAME_WAIT_CANCEL', docs: [
            'When an off-channel TX was requested, this',
            'command may be used with the corresponding cookie to cancel the wait',
            'time if it is known that it is no longer necessary.  This command is',
            'also sent as an event whenever the driver has completed the off-channel',
            'wait time.',
        ] },
        { value: 67, name: 'JOIN_MESH', docs: [
            'Join a mesh. The mesh ID must be given, and initial',
            'mesh config parameters may be given.',
        ] },
        { value: 68, name: 'LEAVE_MESH', docs: [
            'Leave the mesh network -- no special arguments, the',
            'network is determined by the network interface.',
        ] },
        { value: 69, name: 'UNPROT_DEAUTHENTICATE', docs: [
            'Unprotected deauthentication frame',
            'notification. This event is used to indicate that an unprotected',
            'deauthentication frame was dropped when MFP is in use.',
        ] },
        { value: 70, name: 'UNPROT_DISASSOCIATE', docs: [
            'Unprotected disassociation frame',
            'notification. This event is used to indicate that an unprotected',
            'disassociation frame was dropped when MFP is in use.',
        ] },
        { value: 71, name: 'NEW_PEER_CANDIDATE', docs: [
            'Notification on the reception of a',
            'beacon or probe response from a compatible mesh peer.  This is only',
            'sent while no station information (sta_info) exists for the new peer',
            'candidate and when @NL80211_MESH_SETUP_USERSPACE_AUTH,',
            '@NL80211_MESH_SETUP_USERSPACE_AMPE, or',
            '@NL80211_MESH_SETUP_USERSPACE_MPM is set.  On reception of this',
            'notification, userspace may decide to create a new station',
            '(@NL80211_CMD_NEW_STATION).  To stop this notification from',
            'reoccurring, the userspace authentication daemon may want to create the',
            'new station with the AUTHENTICATED flag unset and maybe change it later',
            'depending on the authentication result.',
        ] },
        { value: 72, name: 'GET_WOWLAN', docs: [
            'get Wake-on-Wireless-LAN (WoWLAN) settings.',
        ] },
        { value: 73, name: 'SET_WOWLAN', docs: [
            'set Wake-on-Wireless-LAN (WoWLAN) settings.',
            'Since wireless is more complex than wired ethernet, it supports',
            'various triggers. These triggers can be configured through this',
            'command with the %NL80211_ATTR_WOWLAN_TRIGGERS attribute. For',
            'more background information, see',
            'http://wireless.kernel.org/en/users/Documentation/WoWLAN.',
            'The @NL80211_CMD_SET_WOWLAN command can also be used as a notification',
            'from the driver reporting the wakeup reason. In this case, the',
            '@NL80211_ATTR_WOWLAN_TRIGGERS attribute will contain the reason',
            'for the wakeup, if it was caused by wireless. If it is not present',
            "in the wakeup notification, the wireless device didn't cause the",
            'wakeup but reports that it was woken up.',
        ] },
        { value: 74, name: 'START_SCHED_SCAN', docs: [
            'start a scheduled scan at certain',
            'intervals and certain number of cycles, as specified by',
            '%NL80211_ATTR_SCHED_SCAN_PLANS. If %NL80211_ATTR_SCHED_SCAN_PLANS is',
            'not specified and only %NL80211_ATTR_SCHED_SCAN_INTERVAL is specified,',
            'scheduled scan will run in an infinite loop with the specified interval.',
            'These attributes are mutually exculsive,',
            'i.e. NL80211_ATTR_SCHED_SCAN_INTERVAL must not be passed if',
            'NL80211_ATTR_SCHED_SCAN_PLANS is defined.',
            'If for some reason scheduled scan is aborted by the driver, all scan',
            'plans are canceled (including scan plans that did not start yet).',
            'Like with normal scans, if SSIDs (%NL80211_ATTR_SCAN_SSIDS)',
            'are passed, they are used in the probe requests.  For',
            'broadcast, a broadcast SSID must be passed (ie. an empty',
            'string).  If no SSID is passed, no probe requests are sent and',
            'a passive scan is performed.  %NL80211_ATTR_SCAN_FREQUENCIES,',
            'if passed, define which channels should be scanned; if not',
            'passed, all channels allowed for the current regulatory domain',
            'are used.  Extra IEs can also be passed from the userspace by',
            'using the %NL80211_ATTR_IE attribute.  The first cycle of the',
            'scheduled scan can be delayed by %NL80211_ATTR_SCHED_SCAN_DELAY',
            'is supplied. If the device supports multiple concurrent scheduled',
            'scans, it will allow such when the caller provides the flag attribute',
            '%NL80211_ATTR_SCHED_SCAN_MULTI to indicate user-space support for it.',
        ] },
        { value: 75, name: 'STOP_SCHED_SCAN', docs: [
            'stop a scheduled scan. Returns -ENOENT if',
            'scheduled scan is not running. The caller may assume that as soon',
            'as the call returns, it is safe to start a new scheduled scan again.',
        ] },
        { value: 76, name: 'SCHED_SCAN_RESULTS', docs: [
            'indicates that there are scheduled scan',
            'results available.',
        ] },
        { value: 77, name: 'SCHED_SCAN_STOPPED', docs: [
            'indicates that the scheduled scan has',
            'stopped.  The driver may issue this event at any time during a',
            'scheduled scan.  One reason for stopping the scan is if the hardware',
            'does not support starting an association or a normal scan while running',
            'a scheduled scan.  This event is also sent when the',
            '%NL80211_CMD_STOP_SCHED_SCAN command is received or when the interface',
            'is brought down while a scheduled scan was running.',
        ] },
        { value: 78, name: 'SET_REKEY_OFFLOAD', docs: [
            'This command is used give the driver',
            'the necessary information for supporting GTK rekey offload. This',
            'feature is typically used during WoWLAN. The configuration data',
            'is contained in %NL80211_ATTR_REKEY_DATA (which is nested and',
            'contains the data in sub-attributes). After rekeying happened,',
            'this command may also be sent by the driver as an MLME event to',
            'inform userspace of the new replay counter.',
        ] },
        { value: 79, name: 'PMKSA_CANDIDATE', docs: [
            'This is used as an event to inform userspace',
            'of PMKSA caching dandidates.',
        ] },
        { value: 80, name: 'TDLS_OPER', docs: [
            'Perform a high-level TDLS command (e.g. link setup).',
            'In addition, this can be used as an event to request userspace to take',
            'actions on TDLS links (set up a new link or tear down an existing one).',
            'In such events, %NL80211_ATTR_TDLS_OPERATION indicates the requested',
            'operation, %NL80211_ATTR_MAC contains the peer MAC address, and',
            '%NL80211_ATTR_REASON_CODE the reason code to be used (only with',
            '%NL80211_TDLS_TEARDOWN).',
        ] },
        { value: 81, name: 'TDLS_MGMT', docs: [
            'Send a TDLS management frame. The',
            '%NL80211_ATTR_TDLS_ACTION attribute determines the type of frame to be',
            'sent. Public Action codes (802.11-2012 8.1.5.1) will be sent as',
            '802.11 management frames, while TDLS action codes (802.11-2012',
            '8.5.13.1) will be encapsulated and sent as data frames. The currently',
            'supported Public Action code is %WLAN_PUB_ACTION_TDLS_DISCOVER_RES',
            'and the currently supported TDLS actions codes are given in',
            '&enum ieee80211_tdls_actioncode.',
        ] },
        { value: 82, name: 'UNEXPECTED_FRAME', docs: [
            'Used by an application controlling an AP',
            '(or GO) interface (i.e. hostapd) to ask for unexpected frames to',
            'implement sending deauth to stations that send unexpected class 3',
            'frames. Also used as the event sent by the kernel when such a frame',
            'is received.',
            'For the event, the %NL80211_ATTR_MAC attribute carries the TA and',
            'other attributes like the interface index are present.',
            'If used as the command it must have an interface index and you can',
            'only unsubscribe from the event by closing the socket. Subscription',
            'is also for %NL80211_CMD_UNEXPECTED_4ADDR_FRAME events.',
        ] },
        { value: 83, name: 'PROBE_CLIENT', docs: [
            'Probe an associated station on an AP interface',
            'by sending a null data frame to it and reporting when the frame is',
            'acknowleged. This is used to allow timing out inactive clients. Uses',
            '%NL80211_ATTR_IFINDEX and %NL80211_ATTR_MAC. The command returns a',
            'direct reply with an %NL80211_ATTR_COOKIE that is later used to match',
            'up the event with the request. The event includes the same data and',
            'has %NL80211_ATTR_ACK set if the frame was ACKed.',
        ] },
        { value: 84, name: 'REGISTER_BEACONS', docs: [
            'Register this socket to receive beacons from',
            'other BSSes when any interfaces are in AP mode. This helps implement',
            'OLBC handling in hostapd. Beacons are reported in %NL80211_CMD_FRAME',
            'messages. Note that per PHY only one application may register.',
        ] },
        { value: 85, name: 'UNEXPECTED_4ADDR_FRAME', docs: [
            'Sent as an event indicating that the',
            'associated station identified by %NL80211_ATTR_MAC sent a 4addr frame',
            "and wasn't already in a 4-addr VLAN. The event will be sent similarly",
            'to the %NL80211_CMD_UNEXPECTED_FRAME event, to the same listener.',
        ] },
        { value: 86, name: 'SET_NOACK_MAP', docs: [
            'sets a bitmap for the individual TIDs whether',
            'No Acknowledgement Policy should be applied.',
        ] },
        { value: 87, name: 'CH_SWITCH_NOTIFY', docs: [
            'An AP or GO may decide to switch channels',
            'independently of the userspace SME, send this event indicating',
            '%NL80211_ATTR_IFINDEX is now on %NL80211_ATTR_WIPHY_FREQ and the',
            'attributes determining channel width.  This indication may also be',
            'sent when a remotely-initiated switch (e.g., when a STA receives a CSA',
            'from the remote AP) is completed;',
        ] },
        { value: 88, name: 'START_P2P_DEVICE', docs: [
            'Start the given P2P Device, identified by',
            'its %NL80211_ATTR_WDEV identifier. It must have been created with',
            '%NL80211_CMD_NEW_INTERFACE previously. After it has been started, the',
            'P2P Device can be used for P2P operations, e.g. remain-on-channel and',
            'public action frame TX.',
        ] },
        { value: 89, name: 'STOP_P2P_DEVICE', docs: [
            'Stop the given P2P Device, identified by',
            'its %NL80211_ATTR_WDEV identifier.',
        ] },
        { value: 90, name: 'CONN_FAILED', docs: [
            'connection request to an AP failed; used to',
            'notify userspace that AP has rejected the connection request from a',
            'station, due to particular reason. %NL80211_ATTR_CONN_FAILED_REASON',
            'is used for this.',
        ] },
        { value: 91, name: 'SET_MCAST_RATE', docs: [
            'Change the rate used to send multicast frames',
            'for IBSS or MESH vif.',
        ] },
        { value: 92, name: 'SET_MAC_ACL', docs: [
            'sets ACL for MAC address based access control.',
            'This is to be used with the drivers advertising the support of MAC',
            'address based access control. List of MAC addresses is passed in',
            '%NL80211_ATTR_MAC_ADDRS and ACL policy is passed in',
            '%NL80211_ATTR_ACL_POLICY. Driver will enable ACL with this list, if it',
            'is not already done. The new list will replace any existing list. Driver',
            'will clear its ACL when the list of MAC addresses passed is empty. This',
            'command is used in AP/P2P GO mode. Driver has to make sure to clear its',
            'ACL list during %NL80211_CMD_STOP_AP.',
        ] },
        { value: 93, name: 'RADAR_DETECT', docs: [
            'Start a Channel availability check (CAC). Once',
            'a radar is detected or the channel availability scan (CAC) has finished',
            'or was aborted, or a radar was detected, usermode will be notified with',
            'this event. This command is also used to notify userspace about radars',
            'while operating on this channel.',
            '%NL80211_ATTR_RADAR_EVENT is used to inform about the type of the',
            'event.',
        ] },
        { value: 94, name: 'GET_PROTOCOL_FEATURES', docs: [
            'Get global nl80211 protocol features,',
            'i.e. features for the nl80211 protocol rather than device features.',
            'Returns the features in the %NL80211_ATTR_PROTOCOL_FEATURES bitmap.',
        ] },
        { value: 95, name: 'UPDATE_FT_IES', docs: [
            'Pass down the most up-to-date Fast Transition',
            'Information Element to the WLAN driver',
        ] },
        { value: 96, name: 'FT_EVENT', docs: [
            'Send a Fast transition event from the WLAN driver',
            "to the supplicant. This will carry the target AP's MAC address along",
            'with the relevant Information Elements. This event is used to report',
            'received FT IEs (MDIE, FTIE, RSN IE, TIE, RICIE).',
        ] },
        { value: 97, name: 'CRIT_PROTOCOL_START', docs: [
            'Indicates user-space will start running',
            'a critical protocol that needs more reliability in the connection to',
            'complete.',
        ] },
        { value: 98, name: 'CRIT_PROTOCOL_STOP', docs: [
            'Indicates the connection reliability can',
            'return back to normal.',
        ] },
        { value: 99, name: 'GET_COALESCE', docs: [
            'Get currently supported coalesce rules.',
        ] },
        { value: 100, name: 'SET_COALESCE', docs: [
            'Configure coalesce rules or clear existing rules.',
        ] },
        { value: 101, name: 'CHANNEL_SWITCH', docs: [
            'Perform a channel switch by announcing the',
            'the new channel information (Channel Switch Announcement - CSA)',
            'in the beacon for some time (as defined in the',
            '%NL80211_ATTR_CH_SWITCH_COUNT parameter) and then change to the',
            'new channel. Userspace provides the new channel information (using',
            '%NL80211_ATTR_WIPHY_FREQ and the attributes determining channel',
            'width). %NL80211_ATTR_CH_SWITCH_BLOCK_TX may be supplied to inform',
            'other station that transmission must be blocked until the channel',
            'switch is complete.',
        ] },
        { value: 102, name: 'VENDOR', docs: [
            'Vendor-specified command/event. The command is specified',
            'by the %NL80211_ATTR_VENDOR_ID attribute and a sub-command in',
            '%NL80211_ATTR_VENDOR_SUBCMD. Parameter(s) can be transported in',
            '%NL80211_ATTR_VENDOR_DATA.',
            'For feature advertisement, the %NL80211_ATTR_VENDOR_DATA attribute is',
            'used in the wiphy data as a nested attribute containing descriptions',
            '(&struct nl80211_vendor_cmd_info) of the supported vendor commands.',
            'This may also be sent as an event with the same attributes.',
        ] },
        { value: 103, name: 'SET_QOS_MAP', docs: [
            'Set Interworking QoS mapping for IP DSCP values.',
            'The QoS mapping information is included in %NL80211_ATTR_QOS_MAP. If',
            'that attribute is not included, QoS mapping is disabled. Since this',
            'QoS mapping is relevant for IP packets, it is only valid during an',
            'association. This is cleared on disassociation and AP restart.',
        ] },
        { value: 104, name: 'ADD_TX_TS', docs: [
            'Ask the kernel to add a traffic stream for the given',
            '%NL80211_ATTR_TSID and %NL80211_ATTR_MAC with %NL80211_ATTR_USER_PRIO',
            'and %NL80211_ATTR_ADMITTED_TIME parameters.',
            'Note that the action frame handshake with the AP shall be handled by',
            'userspace via the normal management RX/TX framework, this only sets',
            'up the TX TS in the driver/device.',
            'If the admitted time attribute is not added then the request just checks',
            'if a subsequent setup could be successful, the intent is to use this to',
            'avoid setting up a session with the AP when local restrictions would',
            'make that impossible. However, the subsequent "real" setup may still',
            'fail even if the check was successful.',
        ] },
        { value: 105, name: 'DEL_TX_TS', docs: [
            'Remove an existing TS with the %NL80211_ATTR_TSID',
            "and %NL80211_ATTR_MAC parameters. It isn't necessary to call this",
            'before removing a station entry entirely, or before disassociating',
            'or similar, cleanup will happen in the driver/device in this case.',
        ] },
        { value: 106, name: 'GET_MPP', docs: [
            'Get mesh path attributes for mesh proxy path to',
            'destination %NL80211_ATTR_MAC on the interface identified by',
            '%NL80211_ATTR_IFINDEX.',
        ] },
        { value: 107, name: 'JOIN_OCB', docs: [
            'Join the OCB network. The center frequency and',
            'bandwidth of a channel must be given.',
        ] },
        { value: 108, name: 'LEAVE_OCB', docs: [
            'Leave the OCB network -- no special arguments, the',
            'network is determined by the network interface.',
        ] },
        { value: 109, name: 'CH_SWITCH_STARTED_NOTIFY', docs: [
            'Notify that a channel switch',
            'has been started on an interface, regardless of the initiator',
            '(ie. whether it was requested from a remote device or',
            'initiated on our own).  It indicates that',
            '%NL80211_ATTR_IFINDEX will be on %NL80211_ATTR_WIPHY_FREQ',
            "after %NL80211_ATTR_CH_SWITCH_COUNT TBTT's.  The userspace may",
            'decide to react to this indication by requesting other',
            'interfaces to change channel as well.',
        ] },
        { value: 110, name: 'TDLS_CHANNEL_SWITCH', docs: [
            'Start channel-switching with a TDLS peer,',
            'identified by the %NL80211_ATTR_MAC parameter. A target channel is',
            'provided via %NL80211_ATTR_WIPHY_FREQ and other attributes determining',
            'channel width/type. The target operating class is given via',
            '%NL80211_ATTR_OPER_CLASS.',
            'The driver is responsible for continually initiating channel-switching',
            'operations and returning to the base channel for communication with the',
            'AP.',
        ] },
        { value: 111, name: 'TDLS_CANCEL_CHANNEL_SWITCH', docs: [
            'Stop channel-switching with a TDLS',
            'peer given by %NL80211_ATTR_MAC. Both peers must be on the base channel',
            'when this command completes.',
        ] },
        { value: 112, name: 'WIPHY_REG_CHANGE', docs: [
            'Similar to %NL80211_CMD_REG_CHANGE, but used',
            'as an event to indicate changes for devices with wiphy-specific regdom',
            'management.',
        ] },
        { value: 113, name: 'ABORT_SCAN', docs: [
            'Stop an ongoing scan. Returns -ENOENT if a scan is',
            'not running. The driver indicates the status of the scan through',
            'cfg80211_scan_done().',
        ] },
        { value: 114, name: 'START_NAN', docs: [
            'Start NAN operation, identified by its',
            '%NL80211_ATTR_WDEV interface. This interface must have been',
            'previously created with %NL80211_CMD_NEW_INTERFACE. After it',
            'has been started, the NAN interface will create or join a',
            'cluster. This command must have a valid',
            '%NL80211_ATTR_NAN_MASTER_PREF attribute and optional',
            '%NL80211_ATTR_BANDS attributes.  If %NL80211_ATTR_BANDS is',
            "omitted or set to 0, it means don't-care and the device will",
            'decide what to use.  After this command NAN functions can be',
            'added.',
        ] },
        { value: 115, name: 'STOP_NAN', docs: [
            'Stop the NAN operation, identified by',
            'its %NL80211_ATTR_WDEV interface.',
        ] },
        { value: 116, name: 'ADD_NAN_FUNCTION', docs: [
            'Add a NAN function. The function is defined',
            'with %NL80211_ATTR_NAN_FUNC nested attribute. When called, this',
            'operation returns the strictly positive and unique instance id',
            '(%NL80211_ATTR_NAN_FUNC_INST_ID) and a cookie (%NL80211_ATTR_COOKIE)',
            'of the function upon success.',
            "Since instance ID's can be re-used, this cookie is the right",
            'way to identify the function. This will avoid races when a termination',
            'event is handled by the user space after it has already added a new',
            'function that got the same instance id from the kernel as the one',
            'which just terminated.',
            'This cookie may be used in NAN events even before the command',
            "returns, so userspace shouldn't process NAN events until it processes",
            'the response to this command.',
            'Look at %NL80211_ATTR_SOCKET_OWNER as well.',
        ] },
        { value: 117, name: 'DEL_NAN_FUNCTION', docs: [
            'Delete a NAN function by cookie.',
            'This command is also used as a notification sent when a NAN function is',
            'terminated. This will contain a %NL80211_ATTR_NAN_FUNC_INST_ID',
            'and %NL80211_ATTR_COOKIE attributes.',
        ] },
        { value: 118, name: 'CHANGE_NAN_CONFIG', docs: [
            'Change current NAN',
            'configuration. NAN must be operational (%NL80211_CMD_START_NAN',
            'was executed).  It must contain at least one of the following',
            'attributes: %NL80211_ATTR_NAN_MASTER_PREF,',
            '%NL80211_ATTR_BANDS.  If %NL80211_ATTR_BANDS is omitted, the',
            'current configuration is not changed.  If it is present but',
            "set to zero, the configuration is changed to don't-care",
            '(i.e. the device can decide what to do).',
        ] },
        { value: 119, name: 'NAN_MATCH', docs: [
            'Notification sent when a match is reported.',
            'This will contain a %NL80211_ATTR_NAN_MATCH nested attribute and',
            '%NL80211_ATTR_COOKIE.',
        ] },
        { value: 120, name: 'SET_MULTICAST_TO_UNICAST', docs: [
            'Configure if this AP should perform',
            'multicast to unicast conversion. When enabled, all multicast packets',
            'with ethertype ARP, IPv4 or IPv6 (possibly within an 802.1Q header)',
            'will be sent out to each station once with the destination (multicast)',
            "MAC address replaced by the station's MAC address. Note that this may",
            'break certain expectations of the receiver, e.g. the ability to drop',
            'unicast IP packets encapsulated in multicast L2 frames, or the ability',
            'to not send destination unreachable messages in such cases.',
            'This can only be toggled per BSS. Configure this on an interface of',
            'type %NL80211_IFTYPE_AP. It applies to all its VLAN interfaces',
            '(%NL80211_IFTYPE_AP_VLAN), except for those in 4addr (WDS) mode.',
            'If %NL80211_ATTR_MULTICAST_TO_UNICAST_ENABLED is not present with this',
            'command, the feature is disabled.',
        ] },
        { value: 121, name: 'UPDATE_CONNECT_PARAMS', docs: [
            'Update one or more connect parameters',
            'for subsequent roaming cases if the driver or firmware uses internal',
            'BSS selection. This command can be issued only while connected and it',
            'does not result in a change for the current association. Currently,',
            'only the %NL80211_ATTR_IE data is used and updated with this command.',
        ] },
        { value: 122, name: 'SET_PMK', docs: [
            'For offloaded 4-Way handshake, set the PMK or PMK-R0',
            'for the given authenticator address (specified with %NL80211_ATTR_MAC).',
            'When %NL80211_ATTR_PMKR0_NAME is set, %NL80211_ATTR_PMK specifies the',
            'PMK-R0, otherwise it specifies the PMK.',
        ] },
        { value: 123, name: 'DEL_PMK', docs: [
            'For offloaded 4-Way handshake, delete the previously',
            'configured PMK for the authenticator address identified by',
            '%NL80211_ATTR_MAC.',
        ] },
        { value: 124, name: 'PORT_AUTHORIZED', docs: [
            'An event that indicates that the 4 way',
            'handshake was completed successfully by the driver. The BSSID is',
            'specified with %NL80211_ATTR_MAC. Drivers that support 4 way handshake',
            'offload should send this event after indicating 802.11 association with',
            '%NL80211_CMD_CONNECT or %NL80211_CMD_ROAM. If the 4 way handshake failed',
            '%NL80211_CMD_DISCONNECT should be indicated instead.',
        ] },
        { value: 125, name: 'RELOAD_REGDB', docs: [
            'Request that the regdb firmware file is reloaded.',
        ] },
        { value: 126, name: 'EXTERNAL_AUTH', docs: [
            'This interface is exclusively defined for host',
            'drivers that do not define separate commands for authentication and',
            'association, but rely on user space for the authentication to happen.',
            'This interface acts both as the event request (driver to user space)',
            'to trigger the authentication and command response (userspace to',
            'driver) to indicate the authentication status.',
            '',
            'User space uses the %NL80211_CMD_CONNECT command to the host driver to',
            'trigger a connection. The host driver selects a BSS and further uses',
            'this interface to offload only the authentication part to the user',
            'space. Authentication frames are passed between the driver and user',
            'space through the %NL80211_CMD_FRAME interface. Host driver proceeds',
            'further with the association after getting successful authentication',
            'status. User space indicates the authentication status through',
            '%NL80211_ATTR_STATUS_CODE attribute in %NL80211_CMD_EXTERNAL_AUTH',
            'command interface.',
            '',
            'Host driver reports this status on an authentication failure to the',
            'user space through the connect result as the user space would have',
            'initiated the connection through the connect request.',
        ] },
        { value: 127, name: 'STA_OPMODE_CHANGED', docs: [
            "An event that notify station's",
            'ht opmode or vht opmode changes using any of %NL80211_ATTR_SMPS_MODE,',
            '%NL80211_ATTR_CHANNEL_WIDTH,%NL80211_ATTR_NSS attributes with its',
            'address(specified in %NL80211_ATTR_MAC).',
        ] },
        { value: 128, name: 'CONTROL_PORT_FRAME', docs: [
            'Control Port (e.g. PAE) frame TX request',
            'and RX notification.  This command is used both as a request to transmit',
            'a control port frame and as a notification that a control port frame',
            'has been received. %NL80211_ATTR_FRAME is used to specify the',
            'frame contents.  The frame is the raw EAPoL data, without ethernet or',
            '802.11 headers.',
            'When used as an event indication %NL80211_ATTR_CONTROL_PORT_ETHERTYPE,',
            '%NL80211_ATTR_CONTROL_PORT_NO_ENCRYPT and %NL80211_ATTR_MAC are added',
            'indicating the protocol type of the received frame; whether the frame',
            'was received unencrypted and the MAC address of the peer respectively.',
        ] },
        { value: 129, name: 'GET_FTM_RESPONDER_STATS', docs: [
            'Retrieve FTM responder statistics, in',
            'the %NL80211_ATTR_FTM_RESPONDER_STATS attribute.',
        ] },
        { value: 130, name: 'PEER_MEASUREMENT_START', docs: [
            'start a (set of) peer measurement(s)',
            'with the given parameters, which are encapsulated in the nested',
            '%NL80211_ATTR_PEER_MEASUREMENTS attribute. Optionally, MAC address',
            'randomization may be enabled and configured by specifying the',
            '%NL80211_ATTR_MAC and %NL80211_ATTR_MAC_MASK attributes.',
            'If a timeout is requested, use the %NL80211_ATTR_TIMEOUT attribute.',
            'A u64 cookie for further %NL80211_ATTR_COOKIE use is is returned in',
            'the netlink extended ack message.',
            '',
            'To cancel a measurement, close the socket that requested it.',
            '',
            'Measurement results are reported to the socket that requested the',
            'measurement using @NL80211_CMD_PEER_MEASUREMENT_RESULT when they',
            'become available, so applications must ensure a large enough socket',
            'buffer size.',
            '',
            'Depending on driver support it may or may not be possible to start',
            'multiple concurrent measurements.',
        ] },
        { value: 131, name: 'PEER_MEASUREMENT_RESULT', docs: [
            'This command number is used for the',
            'result notification from the driver to the requesting socket.',
        ] },
        { value: 132, name: 'PEER_MEASUREMENT_COMPLETE', docs: [
            'Notification only, indicating that',
            'the measurement completed, using the measurement cookie',
            '(%NL80211_ATTR_COOKIE).',
        ] },
        { value: 133, name: 'NOTIFY_RADAR', docs: [
            'Notify the kernel that a radar signal was',
            'detected and reported by a neighboring device on the channel',
            'indicated by %NL80211_ATTR_WIPHY_FREQ and other attributes',
            'determining the width and type.',
        ] },
        { value: 134, name: 'UPDATE_OWE_INFO', docs: [
            'This interface allows the host driver to',
            'offload OWE processing to user space. This intends to support',
            'OWE AKM by the host drivers that implement SME but rely',
            'on the user space for the cryptographic/DH IE processing in AP mode.',
        ] },
        { value: 135, name: 'PROBE_MESH_LINK', docs: [
            'The requirement for mesh link metric',
            'refreshing, is that from one mesh point we be able to send some data',
            'frames to other mesh points which are not currently selected as a',
            'primary traffic path, but which are only 1 hop away. The absence of',
            'the primary path to the chosen node makes it necessary to apply some',
            'form of marking on a chosen packet stream so that the packets can be',
            'properly steered to the selected node for testing, and not by the',
            'regular mesh path lookup. Further, the packets must be of type data',
            'so that the rate control (often embedded in firmware) is used for',
            'rate selection.',
            '',
            'Here attribute %NL80211_ATTR_MAC is used to specify connected mesh',
            'peer MAC address and %NL80211_ATTR_FRAME is used to specify the frame',
            'content. The frame is ethernet data.',
        ] },
    ]},

    Message: { root: true, docs: [
        'nl80211 netlink attributes',
    ], attrs: [
        ['wiphy', u32, { docs: [
            'index of wiphy to operate on, cf.',
            '/sys/class/ieee80211/<phyname>/index',
        ] }],
        ['wiphyName', string, { docs: [
            'wiphy name (used for renaming)',
        ] }],
        ['ifindex', u32, { docs: [
            'network interface index of the device to operate on',
        ] }],
        ['ifname', string, { docs: [
            'network interface name',
        ] }],
        ['iftype', u32, { type: 'InterfaceType', docs: [
            'type of virtual interface, see &enum nl80211_iftype',
        ] }],
        ['mac', data, { docs: [
            'MAC address (various uses)',
        ] }],
        ['keyData', data, { docs: [
            '(temporal) key data; for TKIP this consists of',
            '16 bytes encryption key followed by 8 bytes each for TX and RX MIC',
            'keys',
        ] }],
        ['keyIdx', u8, { docs: [
            'key ID (u8, 0-3)',
        ] }],
        ['keyCipher', u32, { docs: [
            'key cipher suite (u32, as defined by IEEE 802.11',
            'section 7.3.2.25.1, e.g. 0x000FAC04)',
        ] }],
        ['keySeq', data, { docs: [
            'transmit key sequence number (IV/PN) for TKIP and',
            'CCMP keys, each six bytes in little endian',
        ] }],
        ['keyDefault', flag, { docs: [
            'Flag attribute indicating the key is default key',
        ] }],
        ['beaconInterval', u32, { docs: [
            'beacon interval in TU',
        ] }],
        ['dtimPeriod', u32, { docs: [
            'DTIM period for beaconing',
        ] }],
        ['beaconHead', data, { docs: [
            'portion of the beacon before the TIM IE',
        ] }],
        ['beaconTail', data, { docs: [
            'portion of the beacon after the TIM IE',
        ] }],
        ['staAid', u16, { docs: [
            'Association ID for the station (u16)',
        ] }],
        ['staFlags', 'StationFlags', { docs: [
            'flags, nested element with NLA_FLAG attributes of',
            '&enum nl80211_sta_flags (deprecated, use %NL80211_ATTR_STA_FLAGS2)',
        ] }],
        ['staListenInterval', u16, { docs: [
            'listen interval as defined by',
            'IEEE 802.11 7.3.1.6 (u16).',
        ] }],
        ['staSupportedRates', data, { docs: [
            'supported rates, array of supported',
            'rates as defined by IEEE 802.11 7.3.2.2 but without the length',
            'restriction (at most %NL80211_MAX_SUPP_RATES).',
        ] }],
        ['staVlan', u32, { docs: [
            'interface index of VLAN interface to move station',
            'to, or the AP interface the station was originally added to to.',
        ] }],
        ['staInfo', 'StationInfo', { docs: [
            'information about a station, part of station info',
            'given for %NL80211_CMD_GET_STATION, nested attribute containing',
            'info as possible, see &enum nl80211_sta_info.',
        ] }],
        ['wiphyBands', array('Band', { zero: true }), { docs: [
            'Information about an operating bands,',
            'consisting of a nested array.',
        ] }],
        ['mntrFlags', 'MonitorFlags', { docs: [
            'flags, nested element with NLA_FLAG attributes of',
            '&enum nl80211_mntr_flags.',
        ] }],
        ['meshId', data, { docs: [
            'mesh id (1-32 bytes).',
        ] }],
        ['staPlinkAction', u8, { type: 'PlinkAction', docs: [
            'action to perform on the mesh peer link',
            '(see &enum nl80211_plink_action).',
        ] }],
        ['mpathNextHop', data, { docs: [
            'MAC address of the next hop for a mesh path.',
        ] }],
        ['mpathInfo', 'MpathInfo', { docs: [
            'information about a mesh_path, part of mesh path',
            'info given for %NL80211_CMD_GET_MPATH, nested attribute described at',
            '&enum nl80211_mpath_info.',
        ] }],
        ['bssCtsProt', bool, { docs: [
            'whether CTS protection is enabled (u8, 0 or 1)',
        ] }],
        ['bssShortPreamble', bool, { docs: [
            'whether short preamble is enabled',
            '(u8, 0 or 1)',
        ] }],
        ['bssShortSlotTime', bool, { docs: [
            'whether short slot time enabled',
            '(u8, 0 or 1)',
        ] }],
        ['htCapability', data, { docs: [
            'HT Capability information element (from',
            'association request when used with NL80211_CMD_NEW_STATION)',
        ] }],
        ['supportedIftypes', asflags('InterfaceType'), { docs: [
            'nested attribute containing all',
            'supported interface types, each a flag attribute with the number',
            'of the interface mode.',
        ] }],
        ['regAlpha2', string, { docs: [
            'an ISO-3166-alpha2 country code for which the',
            'current regulatory domain should be set to or is already set to.',
            "For example, 'CR', for Costa Rica. This attribute is used by the kernel",
            'to query the CRDA to retrieve one regulatory domain. This attribute can',
            'also be used by userspace to query the kernel for the currently set',
            'regulatory domain. We chose an alpha2 as that is also used by the',
            'IEEE-802.11 country information element to identify a country.',
            'Users can also simply ask the wireless core to set regulatory domain',
            'to a specific alpha2.',
        ] }],
        ['regRules', array('RegulatoryRule'), { docs: [
            'a nested array of regulatory domain regulatory',
            'rules.',
        ] }],
        ['meshConfig', 'MeshconfParams', { docs: [
            'Mesh configuration parameters, a nested attribute',
            'containing attributes from &enum nl80211_meshconf_params.',
        ] }],
        ['bssBasicRates', data, { docs: [
            'basic rates, array of basic',
            'rates in format defined by IEEE 802.11 7.3.2.2 but without the length',
            'restriction (at most %NL80211_MAX_SUPP_RATES).',
        ] }],
        ['wiphyTxqParams', array('Txq'), { docs: [
            'a nested array of TX queue parameters',
        ] }],
        ['wiphyFreq', u32, { docs: [
            'frequency of the selected channel in MHz,',
            'defines the channel together with the (deprecated)',
            '%NL80211_ATTR_WIPHY_CHANNEL_TYPE attribute or the attributes',
            '%NL80211_ATTR_CHANNEL_WIDTH and if needed %NL80211_ATTR_CENTER_FREQ1',
            'and %NL80211_ATTR_CENTER_FREQ2',
        ] }],
        ['wiphyChannelType', u32, { docs: [
            'included with NL80211_ATTR_WIPHY_FREQ',
            'if HT20 or HT40 are to be used (i.e., HT disabled if not included):',
            'NL80211_CHAN_NO_HT = HT not allowed (i.e., same as not including',
            'this attribute)',
            'NL80211_CHAN_HT20 = HT20 only',
            'NL80211_CHAN_HT40MINUS = secondary channel is below the primary channel',
            'NL80211_CHAN_HT40PLUS = secondary channel is above the primary channel',
            'This attribute is now deprecated.',
        ] }],
        ['keyDefaultMgmt', flag, { docs: [
            'Flag attribute indicating the key is the',
            'default management key',
        ] }],
        ['mgmtSubtype', u8, { docs: [
            'Management frame subtype for',
            '%NL80211_CMD_SET_MGMT_EXTRA_IE.',
        ] }],
        ['ie', data, { docs: [
            'Information element(s) data (used, e.g., with',
            '%NL80211_CMD_SET_MGMT_EXTRA_IE).',
        ] }],
        ['maxNumScanSsids', u8, { docs: [
            'number of SSIDs you can scan with',
            'a single scan request, a wiphy attribute.',
        ] }],
        ['scanFrequencies', data, { docs: [
            'nested attribute with frequencies (in MHz)',
        ] }],
        ['scanSsids', data, { docs: [
            'nested attribute with SSIDs, leave out for passive',
            'scanning and include a zero-length SSID (wildcard) for wildcard scan',
        ] }],
        ['generation', u32, { docs: [
            'Used to indicate consistent snapshots for',
            'dumps. This number increases whenever the object list being',
            'dumped changes, and as such userspace can verify that it has',
            'obtained a complete and consistent snapshot by verifying that',
            'all dump messages contain the same generation number. If it',
            'changed then the list changed and the dump should be repeated',
            'completely from scratch.',
        ] }],
        ['bss', data, { docs: [
            'scan result BSS',
        ] }],
        ['regInitiator', data, { docs: [
            'indicates who requested the regulatory domain',
            'currently in effect. This could be any of the %NL80211_REGDOM_SET_BY_*',
        ] }],
        ['regType', u8, { type: 'RegulatoryType', docs: [
            'indicates the type of the regulatory domain currently',
            'set. This can be one of the nl80211_reg_type (%NL80211_REGDOM_TYPE_*)',
        ] }],
        ['supportedCommands', array(u32), { docs: [
            'wiphy attribute that specifies',
            'an array of command numbers (i.e. a mapping index to command number)',
            'that the driver for the given wiphy supports.',
        ] }],
        ['frame', data, { docs: [
            'frame data (binary attribute), including frame header',
            'and body, but not FCS; used, e.g., with NL80211_CMD_AUTHENTICATE and',
            'NL80211_CMD_ASSOCIATE events',
        ] }],
        ['ssid', data, { docs: [
            'SSID (binary attribute, 0..32 octets)',
        ] }],
        ['authType', u32, { type: 'AuthType', docs: [
            'AuthenticationType, see &enum nl80211_auth_type,',
            'represented as a u32',
        ] }],
        ['reasonCode', u16, { docs: [
            'ReasonCode for %NL80211_CMD_DEAUTHENTICATE and',
            '%NL80211_CMD_DISASSOCIATE, u16',
        ] }],
        ['keyType', u32, { type: 'KeyType', docs: [
            'Key Type, see &enum nl80211_key_type, represented as',
            'a u32',
        ] }],
        ['maxScanIeLen', u16, { docs: [
            'maximum length of information elements',
            'that can be added to a scan request',
        ] }],
        ['cipherSuites', data, { docs: [
            'a set of u32 values indicating the supported',
            'cipher suites',
        ] }],
        ['freqBefore', data, { docs: [
            'A channel which has suffered a regulatory change',
            'due to considerations from a beacon hint. This attribute reflects',
            'the state of the channel _before_ the beacon hint processing. This',
            'attributes consists of a nested attribute containing',
            'NL80211_FREQUENCY_ATTR_*',
        ] }],
        ['freqAfter', data, { docs: [
            'A channel which has suffered a regulatory change',
            'due to considerations from a beacon hint. This attribute reflects',
            'the state of the channel _after_ the beacon hint processing. This',
            'attributes consists of a nested attribute containing',
            'NL80211_FREQUENCY_ATTR_*',
        ] }],
        ['freqFixed', flag, { docs: [
            'a flag indicating the IBSS should not try to look',
            'for other networks on different channels',
        ] }],
        ['wiphyRetryShort', u8, { docs: [
            'TX retry limit for frames whose length is',
            'less than or equal to the RTS threshold; allowed range: 1..255;',
            'dot11ShortRetryLimit; u8',
        ] }],
        ['wiphyRetryLong', u8, { docs: [
            'TX retry limit for frames whose length is',
            'greater than the RTS threshold; allowed range: 1..255;',
            'dot11ShortLongLimit; u8',
        ] }],
        ['wiphyFragThreshold', u32, { docs: [
            'fragmentation threshold, i.e., maximum',
            'length in octets for frames; allowed range: 256..8000, disable',
            'fragmentation with (u32)-1; dot11FragmentationThreshold; u32',
        ] }],
        ['wiphyRtsThreshold', u32, { docs: [
            'RTS threshold (TX frames with length',
            'larger than or equal to this use RTS/CTS handshake); allowed range:',
            '0..65536, disable with (u32)-1; dot11RTSThreshold; u32',
        ] }],
        ['timedOut', flag, { docs: [
            'a flag indicating than an operation timed out; this',
            'is used, e.g., with %NL80211_CMD_AUTHENTICATE event',
        ] }],
        ['useMfp', u32, { type: 'Mfp', docs: [
            'Whether management frame protection (IEEE 802.11w) is',
            'used for the association (&enum nl80211_mfp, represented as a u32);',
            'this attribute can be used with %NL80211_CMD_ASSOCIATE and',
            '%NL80211_CMD_CONNECT requests. %NL80211_MFP_OPTIONAL is not allowed for',
            '%NL80211_CMD_ASSOCIATE since user space SME is expected and hence, it',
            'must have decided whether to use management frame protection or not.',
            'Setting %NL80211_MFP_OPTIONAL with a %NL80211_CMD_CONNECT request will',
            'let the driver (or the firmware) decide whether to use MFP or not.',
        ] }],
        ['staFlags2', data, { docs: [
            'Attribute containing a',
            '&struct nl80211_sta_flag_update.',
        ] }],
        ['controlPort', flag, { docs: [
            'A flag indicating whether user space controls',
            'IEEE 802.1X port, i.e., sets/clears %NL80211_STA_FLAG_AUTHORIZED, in',
            'station mode. If the flag is included in %NL80211_CMD_ASSOCIATE',
            'request, the driver will assume that the port is unauthorized until',
            'authorized by user space. Otherwise, port is marked authorized by',
            'default in station mode.',
        ] }],
        ['testdata', data, { docs: [
            'Testmode data blob, passed through to the driver.',
            'We recommend using nested, driver-specific attributes within this.',
        ] }],
        ['privacy', flag, { docs: [
            'Flag attribute, used with connect(), indicating',
            'that protected APs should be used. This is also used with NEW_BEACON to',
            'indicate that the BSS is to use protection.',
        ] }],
        ['disconnectedByAp', flag, { docs: [
            'A flag indicating that the DISCONNECT',
            'event was due to the AP disconnecting the station, and not due to',
            'a local disconnect request.',
        ] }],
        ['statusCode', u16, { docs: [
            'StatusCode for the %NL80211_CMD_CONNECT',
            'event (u16)',
        ] }],
        ['cipherSuitesPairwise', u32, { docs: [
            'For crypto settings for connect or',
            'other commands, indicates which pairwise cipher suites are used',
        ] }],
        ['cipherSuiteGroup', u32, { docs: [
            'For crypto settings for connect or',
            'other commands, indicates which group cipher suite is used',
        ] }],
        ['wpaVersions', u32, { type: 'WpaVersions', docs: [
            'Used with CONNECT, ASSOCIATE, and NEW_BEACON to',
            'indicate which WPA version(s) the AP we want to associate with is using',
            '(a u32 with flags from &enum nl80211_wpa_versions).',
        ] }],
        ['akmSuites', u32, { docs: [
            'Used with CONNECT, ASSOCIATE, and NEW_BEACON to',
            'indicate which key management algorithm(s) to use (an array of u32).',
            'This attribute is also sent in response to @NL80211_CMD_GET_WIPHY,',
            'indicating the supported AKM suites, intended for specific drivers which',
            'implement SME and have constraints on which AKMs are supported and also',
            'the cases where an AKM support is offloaded to the driver/firmware.',
            'If there is no such notification from the driver, user space should',
            'assume the driver supports all the AKM suites.',
        ] }],
        ['reqIe', data, { docs: [
            '(Re)association request information elements as',
            'sent out by the card, for ROAM and successful CONNECT events.',
        ] }],
        ['respIe', data, { docs: [
            '(Re)association response information elements as',
            'sent by peer, for ROAM and successful CONNECT events.',
        ] }],
        ['prevBssid', data, { docs: [
            'previous BSSID, to be used in ASSOCIATE and CONNECT',
            'commands to specify a request to reassociate within an ESS, i.e., to use',
            'Reassociate Request frame (with the value of this attribute in the',
            'Current AP address field) instead of Association Request frame which is',
            'used for the initial association to an ESS.',
        ] }],
        ['key', data, { docs: [
            'key information in a nested attribute with',
            '%NL80211_KEY_* sub-attributes',
        ] }],
        ['keys', data, { docs: [
            'array of keys for static WEP keys for connect()',
            'and join_ibss(), key information is in a nested attribute each',
            'with %NL80211_KEY_* sub-attributes',
        ] }],
        ['pid', u32, { docs: [
            'Process ID of a network namespace.',
        ] }],
        ['_4addr', u8, { docs: [
            'Use 4-address frames on a virtual interface',
        ] }],
        ['surveyInfo', 'SurveyInfo', { docs: [
            'survey information about a channel, part of',
            'the survey response for %NL80211_CMD_GET_SURVEY, nested attribute',
            'containing info as possible, see &enum survey_info.',
        ] }],
        ['pmkid', data, { docs: [
            'PMK material for PMKSA caching.',
        ] }],
        ['maxNumPmkids', u8, { docs: [
            'maximum number of PMKIDs a firmware can',
            'cache, a wiphy attribute.',
        ] }],
        ['duration', u32, { docs: [
            'Duration of an operation in milliseconds, u32.',
        ] }],
        ['cookie', u64, { docs: [
            'Generic 64-bit cookie to identify objects.',
        ] }],
        ['wiphyCoverageClass', u8, { docs: [
            'Coverage Class as defined by IEEE 802.11',
            'section 7.3.2.9; dot11CoverageClass; u8',
        ] }],
        ['txRates', map('TxRate'), { docs: [
            'Nested set of attributes',
            '(enum nl80211_tx_rate_attributes) describing TX rates per band. The',
            'enum nl80211_band value is used as the index (nla_type() of the nested',
            'data. If a band is not included, it will be configured to allow all',
            'rates based on negotiated supported rates information. This attribute',
            'is used with %NL80211_CMD_SET_TX_BITRATE_MASK and with starting AP,',
            'and joining mesh networks (not IBSS yet). In the later case, it must',
            'specify just a single bitrate, which is to be used for the beacon.',
            'The driver must also specify support for this with the extended',
            'features NL80211_EXT_FEATURE_BEACON_RATE_LEGACY,',
            'NL80211_EXT_FEATURE_BEACON_RATE_HT and',
            'NL80211_EXT_FEATURE_BEACON_RATE_VHT.',
        ] }],
        ['frameMatch', data, { docs: [
            'A binary attribute which typically must contain',
            'at least one byte, currently used with @NL80211_CMD_REGISTER_FRAME.',
        ] }],
        ['ack', flag, { docs: [
            'Flag attribute indicating that the frame was',
            'acknowledged by the recipient.',
        ] }],
        ['psState', u32, { type: 'PsState', docs: [
            'powersave state, using &enum nl80211_ps_state values.',
        ] }],
        ['cqm', 'Cqm', { docs: [
            'connection quality monitor configuration in a',
            'nested attribute with %NL80211_ATTR_CQM_* sub-attributes.',
        ] }],
        ['localStateChange', flag, { docs: [
            'Flag attribute to indicate that a command',
            'is requesting a local authentication/association state change without',
            'invoking actual management frame exchange. This can be used with',
            'NL80211_CMD_AUTHENTICATE, NL80211_CMD_DEAUTHENTICATE,',
            'NL80211_CMD_DISASSOCIATE.',
        ] }],
        ['apIsolate', flag, { docs: [
            '(AP mode) Do not forward traffic between stations',
            'connected to this BSS.',
        ] }],
        ['wiphyTxPowerSetting', u32, { type: 'TxPowerSetting', docs: [
            'Transmit power setting type. See',
            '&enum nl80211_tx_power_setting for possible values.',
        ] }],
        ['wiphyTxPowerLevel', s32, { docs: [
            'Transmit power level in signed mBm units.',
            'This is used in association with @NL80211_ATTR_WIPHY_TX_POWER_SETTING',
            'for non-automatic settings.',
        ] }],
        ['txFrameTypes', array(data, { zero: true }), { docs: [
            'wiphy capability attribute, which is a',
            'nested attribute of %NL80211_ATTR_FRAME_TYPE attributes, containing',
            'information about which frame types can be transmitted with',
            '%NL80211_CMD_FRAME.',
        ] }],
        ['rxFrameTypes', array(data, { zero: true }), { docs: [
            'wiphy capability attribute, which is a',
            'nested attribute of %NL80211_ATTR_FRAME_TYPE attributes, containing',
            'information about which frame types can be registered for RX.',
        ] }],
        ['frameType', u16, { docs: [
            'A u16 indicating the frame type/subtype for the',
            '@NL80211_CMD_REGISTER_FRAME command.',
        ] }],
        ['controlPortEthertype', data, { docs: [
            'A 16-bit value indicating the',
            'ethertype that will be used for key negotiation. It can be',
            'specified with the associate and connect commands. If it is not',
            'specified, the value defaults to 0x888E (PAE, 802.1X). This',
            'attribute is also used as a flag in the wiphy information to',
            'indicate that protocols other than PAE are supported.',
        ] }],
        ['controlPortNoEncrypt', flag, { docs: [
            'When included along with',
            '%NL80211_ATTR_CONTROL_PORT_ETHERTYPE, indicates that the custom',
            'ethertype frames used for key negotiation must not be encrypted.',
        ] }],
        ['supportIbssRsn', flag, { docs: [
            'The device supports IBSS RSN, which mostly',
            'means support for per-station GTKs.',
        ] }],
        ['wiphyAntennaTx', u32, { docs: [
            'Bitmap of allowed antennas for transmitting.',
            'This can be used to mask out antennas which are not attached or should',
            'not be used for transmitting. If an antenna is not selected in this',
            'bitmap the hardware is not allowed to transmit on this antenna.',
            '',
            'Each bit represents one antenna, starting with antenna 1 at the first',
            'bit. Depending on which antennas are selected in the bitmap, 802.11n',
            'drivers can derive which chainmasks to use (if all antennas belonging to',
            'a particular chain are disabled this chain should be disabled) and if',
            'a chain has diversity antennas wether diversity should be used or not.',
            'HT capabilities (STBC, TX Beamforming, Antenna selection) can be',
            'derived from the available chains after applying the antenna mask.',
            'Non-802.11n drivers can derive wether to use diversity or not.',
            'Drivers may reject configurations or RX/TX mask combinations they cannot',
            'support by returning -EINVAL.',
        ] }],
        ['wiphyAntennaRx', u32, { docs: [
            'Bitmap of allowed antennas for receiving.',
            'This can be used to mask out antennas which are not attached or should',
            'not be used for receiving. If an antenna is not selected in this bitmap',
            'the hardware should not be configured to receive on this antenna.',
            'For a more detailed description see @NL80211_ATTR_WIPHY_ANTENNA_TX.',
        ] }],
        ['mcastRate', u32, { docs: [
            'Multicast tx rate (in 100 kbps) for IBSS',
        ] }],
        ['offchannelTxOk', flag, { docs: [
            'For management frame TX, the frame may be',
            "transmitted on another channel when the channel given doesn't match",
            "the current channel. If the current channel doesn't match and this",
            "flag isn't set, the frame will be rejected. This is also used as an",
            'nl80211 capability flag.',
        ] }],
        ['bssHtOpmode', u16, { docs: [
            'HT operation mode (u16)',
        ] }],
        ['keyDefaultTypes', 'KeyDefaultTypes', { docs: [
            'A nested attribute containing flags',
            'attributes, specifying what a key should be set as default as.',
            'See &enum nl80211_key_default_types.',
        ] }],
        ['maxRemainOnChannelDuration', u32, { docs: [
            'Device attribute that',
            'specifies the maximum duration that can be requested with the',
            'remain-on-channel operation, in milliseconds, u32.',
        ] }],
        ['meshSetup', data, { docs: [
            'Optional mesh setup parameters.  These cannot be',
            'changed once the mesh is active.',
        ] }],
        ['wiphyAntennaAvailTx', u32, { docs: [
            'Bitmap of antennas which are available',
            'for configuration as TX antennas via the above parameters.',
        ] }],
        ['wiphyAntennaAvailRx', u32, { docs: [
            'Bitmap of antennas which are available',
            'for configuration as RX antennas via the above parameters.',
        ] }],
        ['supportMeshAuth', flag, { docs: [
            'Currently, this means the underlying driver',
            'allows auth frames in a mesh to be passed to userspace for processing via',
            'the @NL80211_MESH_SETUP_USERSPACE_AUTH flag.',
        ] }],
        ['staPlinkState', data, { type: 'PlinkState', docs: [
            'The state of a mesh peer link as defined in',
            '&enum nl80211_plink_state. Used when userspace is driving the peer link',
            'management state machine.  @NL80211_MESH_SETUP_USERSPACE_AMPE or',
            '@NL80211_MESH_SETUP_USERSPACE_MPM must be enabled.',
        ] }],
        ['wowlanTriggers', 'WowlanTriggers', { docs: [
            'used by %NL80211_CMD_SET_WOWLAN to',
            'indicate which WoW triggers should be enabled. This is also',
            'used by %NL80211_CMD_GET_WOWLAN to get the currently enabled WoWLAN',
            'triggers.',
        ] }],
        ['wowlanTriggersSupported', 'WowlanTriggers', { docs: [
            'indicates, as part of the wiphy',
            'capabilities, the supported WoWLAN triggers',
        ] }],
        ['schedScanInterval', u32, { docs: [
            'Interval between scheduled scan',
            'cycles, in msecs.',
        ] }],
        ['interfaceCombinations', array('InterfaceCombination'), { docs: [
            'Nested attribute listing the supported',
            'interface combinations. In each nested item, it contains attributes',
            'defined in &enum nl80211_if_combination_attrs.',
        ] }],
        ['softwareIftypes', asflags('InterfaceType'), { docs: [
            'Nested attribute (just like',
            '%NL80211_ATTR_SUPPORTED_IFTYPES) containing the interface types that',
            "are managed in software: interfaces of these types aren't subject to",
            'any restrictions in their number or combinations.',
        ] }],
        ['rekeyData', 'RekeyData', { docs: [
            'nested attribute containing the information',
            'necessary for GTK rekeying in the device, see &enum nl80211_rekey_data.',
        ] }],
        ['maxNumSchedScanSsids', u8, { docs: [
            'number of SSIDs you can',
            'scan with a single scheduled scan request, a wiphy attribute.',
        ] }],
        ['maxSchedScanIeLen', u16, { docs: [
            'maximum length of information',
            'elements that can be added to a scheduled scan request',
        ] }],
        ['scanSuppRates', array(data), { docs: [
            'rates per to be advertised as supported in scan,',
            'nested array attribute containing an entry for each band, with the entry',
            'being a list of supported rates as defined by IEEE 802.11 7.3.2.2 but',
            'without the length restriction (at most %NL80211_MAX_SUPP_RATES).',
        ] }],
        ['hiddenSsid', u32, { type: 'HiddenSsid', docs: [
            'indicates whether SSID is to be hidden from Beacon',
            'and Probe Response (when response to wildcard Probe Request); see',
            '&enum nl80211_hidden_ssid, represented as a u32',
        ] }],
        ['ieProbeResp', data, { docs: [
            'Information element(s) for Probe Response frame.',
            'This is used with %NL80211_CMD_NEW_BEACON and %NL80211_CMD_SET_BEACON to',
            'provide extra IEs (e.g., WPS/P2P IE) into Probe Response frames when the',
            'driver (or firmware) replies to Probe Request frames.',
        ] }],
        ['ieAssocResp', data, { docs: [
            'Information element(s) for (Re)Association',
            'Response frames. This is used with %NL80211_CMD_NEW_BEACON and',
            '%NL80211_CMD_SET_BEACON to provide extra IEs (e.g., WPS/P2P IE) into',
            '(Re)Association Response frames when the driver (or firmware) replies to',
            '(Re)Association Request frames.',
        ] }],
        ['staWme', 'StationWme', { docs: [
            'Nested attribute containing the wme configuration',
            'of the station, see &enum nl80211_sta_wme_attr.',
        ] }],
        ['supportApUapsd', flag, { docs: [
            'the device supports uapsd when working',
            'as AP.',
        ] }],
        ['roamSupport', flag, { docs: [
            'Indicates whether the firmware is capable of',
            'roaming to another AP in the same ESS if the signal lever is low.',
        ] }],
        ['schedScanMatch', array(data), { docs: [
            'Nested attribute with one or more',
            'sets of attributes to match during scheduled scans.  Only BSSs',
            'that match any of the sets will be reported.  These are',
            'pass-thru filter rules.',
            'For a match to succeed, the BSS must match all attributes of a',
            'set.  Since not every hardware supports matching all types of',
            'attributes, there is no guarantee that the reported BSSs are',
            'fully complying with the match sets and userspace needs to be',
            'able to ignore them by itself.',
            'Thus, the implementation is somewhat hardware-dependent, but',
            'this is only an optimization and the userspace application',
            'needs to handle all the non-filtered results anyway.',
            "If the match attributes don't make sense when combined with",
            'the values passed in @NL80211_ATTR_SCAN_SSIDS (eg. if an SSID',
            'is included in the probe request, but the match attributes',
            'will never let it go through), -EINVAL may be returned.',
            'If omitted, no filtering is done.',
        ] }],
        ['maxMatchSets', u8, { docs: [
            'maximum number of sets that can be',
            'used with @NL80211_ATTR_SCHED_SCAN_MATCH, a wiphy attribute.',
        ] }],
        ['pmksaCandidate', 'PmksaCandidate', { docs: [
            'Nested attribute containing the PMKSA caching',
            'candidate information, see &enum nl80211_pmksa_candidate_attr.',
        ] }],
        ['txNoCckRate', data, { docs: [
            'Indicates whether to use CCK rate or not',
            'for management frames transmission. In order to avoid p2p probe/action',
            'frames are being transmitted at CCK rate in 2GHz band, the user space',
            'applications use this attribute.',
            'This attribute is used with %NL80211_CMD_TRIGGER_SCAN and',
            '%NL80211_CMD_FRAME commands.',
        ] }],
        ['tdlsAction', data, { docs: [
            'Low level TDLS action code (e.g. link setup',
            'request, link setup confirm, link teardown, etc.). Values are',
            'described in the TDLS (802.11z) specification.',
        ] }],
        ['tdlsDialogToken', data, { docs: [
            'Non-zero token for uniquely identifying a',
            'TDLS conversation between two devices.',
        ] }],
        ['tdlsOperation', u8, { type: 'TdlsOperation', docs: [
            'High level TDLS operation; see',
            '&enum nl80211_tdls_operation, represented as a u8.',
        ] }],
        ['tdlsSupport', flag, { docs: [
            'A flag indicating the device can operate',
            'as a TDLS peer sta.',
        ] }],
        ['tdlsExternalSetup', data, { docs: [
            'The TDLS discovery/setup and teardown',
            'procedures should be performed by sending TDLS packets via',
            '%NL80211_CMD_TDLS_MGMT. Otherwise %NL80211_CMD_TDLS_OPER should be',
            'used for asking the driver to perform a TDLS operation.',
        ] }],
        ['deviceApSme', u32, { docs: [
            'This u32 attribute may be listed for devices',
            'that have AP support to indicate that they have the AP SME integrated',
            'with support for the features listed in this attribute, see',
            '&enum nl80211_ap_sme_features.',
        ] }],
        ['dontWaitForAck', flag, { docs: [
            'Used with %NL80211_CMD_FRAME, this tells',
            'the driver to not wait for an acknowledgement. Note that due to this,',
            'it will also not give a status callback nor return a cookie. This is',
            'mostly useful for probe responses to save airtime.',
        ] }],
        ['featureFlags', u32, { type: 'FeatureFlags', docs: [
            'This u32 attribute contains flags from',
            '&enum nl80211_feature_flags and is advertised in wiphy information.',
        ] }],
        ['probeRespOffload', data, { type: 'ProbeResponseOffloadSupport', docs: [
            'Indicates that the HW responds to probe',
            'requests while operating in AP-mode.',
            'This attribute holds a bitmap of the supported protocols for',
            'offloading (see &enum nl80211_probe_resp_offload_support_attr).',
        ] }],
        ['probeResp', data, { docs: [
            'Probe Response template data. Contains the entire',
            'probe-response frame. The DA field in the 802.11 header is zero-ed out,',
            'to be filled by the FW.',
        ] }],
        ['dfsRegion', u8, { docs: [
            'region for regulatory rules which this country',
            'abides to when initiating radiation on DFS channels. A country maps',
            'to one DFS region.',
        ] }],
        ['disableHt', flag, { docs: [
            'Force HT capable interfaces to disable',
            'this feature.  Currently, only supported in mac80211 drivers.',
        ] }],
        ['htCapabilityMask', data, { docs: [
            'Specify which bits of the',
            'ATTR_HT_CAPABILITY to which attention should be paid.',
            'Currently, only mac80211 NICs support this feature.',
            'The values that may be configured are:',
            'MCS rates, MAX-AMSDU, HT-20-40 and HT_CAP_SGI_40',
            'AMPDU density and AMPDU factor.',
            'All values are treated as suggestions and may be ignored',
            'by the driver as required.  The actual values may be seen in',
            'the station debugfs ht_caps file.',
        ] }],
        ['noackMap', u16, { docs: [
            'This u16 bitmap contains the No Ack Policy of',
            'up to 16 TIDs.',
        ] }],
        ['inactivityTimeout', u16, { docs: [
            'timeout value in seconds, this can be',
            'used by the drivers which has MLME in firmware and does not have support',
            'to report per station tx/rx activity to free up the station entry from',
            'the list. This needs to be used when the driver advertises the',
            'capability to timeout the stations.',
        ] }],
        ['rxSignalDbm', u32, { docs: [
            'signal strength in dBm (as a 32-bit int);',
            'this attribute is (depending on the driver capabilities) added to',
            'received frames indicated with %NL80211_CMD_FRAME.',
        ] }],
        ['bgScanPeriod', data, { docs: [
            'Background scan period in seconds',
            'or 0 to disable background scan.',
        ] }],
        ['wdev', u64, { docs: [
            'wireless device identifier, used for pseudo-devices',
            "that don't have a netdev (u64)",
        ] }],
        ['userRegHintType', data, { type: 'UserRegulatoryHintType', docs: [
            'type of regulatory hint passed from',
            'userspace. If unset it is assumed the hint comes directly from',
            'a user. If set code could specify exactly what type of source',
            'was used to provide the hint. For the different types of',
            'allowed user regulatory hints see nl80211_user_reg_hint_type.',
        ] }],
        ['connFailedReason', data, { type: 'ConnectFailedReason', docs: [
            'The reason for which AP has rejected',
            'the connection request from a station. nl80211_connect_failed_reason',
            'enum has different reasons of connection failure.',
        ] }],
        ['authData', data, { docs: [
            'Fields and elements in Authentication frames.',
            'This contains the authentication frame body (non-IE and IE data),',
            'excluding the Authentication algorithm number, i.e., starting at the',
            'Authentication transaction sequence number field. It is used with',
            'authentication algorithms that need special fields to be added into',
            'the frames (SAE and FILS). Currently, only the SAE cases use the',
            'initial two fields (Authentication transaction sequence number and',
            'Status code). However, those fields are included in the attribute data',
            'for all authentication algorithms to keep the attribute definition',
            'consistent.',
        ] }],
        ['vhtCapability', data, { docs: [
            'VHT Capability information element (from',
            'association request when used with NL80211_CMD_NEW_STATION)',
        ] }],
        ['scanFlags', u32, { docs: [
            'scan request control flags (u32)',
        ] }],
        ['channelWidth', u32, { type: 'ChannelWidth', docs: [
            'u32 attribute containing one of the values',
            'of &enum nl80211_chan_width, describing the channel width. See the',
            'documentation of the enum for more information.',
        ] }],
        ['centerFreq1', u32, { docs: [
            'Center frequency of the first part of the',
            'channel, used for anything but 20 MHz bandwidth',
        ] }],
        ['centerFreq2', u32, { docs: [
            'Center frequency of the second part of the',
            'channel, used only for 80+80 MHz bandwidth',
        ] }],
        ['p2pCtwindow', u8, { docs: [
            'P2P GO Client Traffic Window (u8), used with',
            'the START_AP and SET_BSS commands',
        ] }],
        ['p2pOppps', u8, { docs: [
            'P2P GO opportunistic PS (u8), used with the',
            'START_AP and SET_BSS commands. This can have the values 0 or 1;',
            'if not given in START_AP 0 is assumed, if not given in SET_BSS',
            'no change is made.',
        ] }],
        ['localMeshPowerMode', u32, { type: 'MeshPowerMode', docs: [
            'local mesh STA link-specific power mode',
            'defined in &enum nl80211_mesh_power_mode.',
        ] }],
        ['aclPolicy', u32, { type: 'AclPolicy', docs: [
            'ACL policy, see &enum nl80211_acl_policy,',
            'carried in a u32 attribute',
        ] }],
        ['macAddrs', array(data), { docs: [
            'Array of nested MAC addresses, used for',
            'MAC ACL.',
        ] }],
        ['macAclMax', u32, { docs: [
            'u32 attribute to advertise the maximum',
            'number of MAC addresses that a device can support for MAC',
            'ACL.',
        ] }],
        ['radarEvent', u32, { type: 'RadarEvent', docs: [
            'Type of radar event for notification to userspace,',
            'contains a value of enum nl80211_radar_event (u32).',
        ] }],
        ['extCapa', data, { docs: [
            '802.11 extended capabilities that the kernel driver',
            'has and handles. The format is the same as the IE contents. See',
            '802.11-2012 8.4.2.29 for more information.',
        ] }],
        ['extCapaMask', data, { docs: [
            'Extended capabilities that the kernel driver',
            'has set in the %NL80211_ATTR_EXT_CAPA value, for multibit fields.',
        ] }],
        ['staCapability', u16, { docs: [
            'Station capabilities (u16) are advertised to',
            'the driver, e.g., to enable TDLS power save (PU-APSD).',
        ] }],
        ['staExtCapability', data, { docs: [
            'Station extended capabilities are',
            'advertised to the driver, e.g., to enable TDLS off channel operations',
            'and PU-APSD.',
        ] }],
        ['protocolFeatures', u32, { type: 'ProtocolFeatures', docs: [
            'global nl80211 feature flags, see',
            '&enum nl80211_protocol_features, the attribute is a u32.',
        ] }],
        ['splitWiphyDump', flag, { docs: [
            'flag attribute, userspace supports',
            'receiving the data for a single wiphy split across multiple',
            'messages, given with wiphy dump message',
        ] }],
        ['disableVht', flag],
        ['vhtCapabilityMask', data],
        ['mdid', data, { docs: [
            'Mobility Domain Identifier',
        ] }],
        ['ieRic', data, { docs: [
            'Resource Information Container Information',
            'Element',
        ] }],
        ['critProtId', u16, { type: 'CritProtoId', docs: [
            'critical protocol identifier requiring increased',
            'reliability, see &enum nl80211_crit_proto_id (u16).',
        ] }],
        ['maxCritProtDuration', u16, { docs: [
            'duration in milliseconds in which',
            'the connection should have increased reliability (u16).',
        ] }],
        ['peerAid', u16, { docs: [
            'Association ID for the peer TDLS station (u16).',
            'This is similar to @NL80211_ATTR_STA_AID but with a difference of being',
            'allowed to be used with the first @NL80211_CMD_SET_STATION command to',
            'update a TDLS peer STA entry.',
        ] }],
        ['coalesceRule', data, { docs: [
            'Coalesce rule information.',
        ] }],
        ['chSwitchCount', u32, { docs: [
            "u32 attribute specifying the number of TBTT's",
            'until the channel switch event.',
        ] }],
        ['chSwitchBlockTx', flag, { docs: [
            'flag attribute specifying that transmission',
            'must be blocked on the current channel (before the channel switch',
            'operation).',
        ] }],
        ['csaIes', data, { docs: [
            'Nested set of attributes containing the IE information',
            'for the time while performing a channel switch.',
        ] }],
        ['csaCOffBeacon', u16, { docs: [
            'An array of offsets (u16) to the channel',
            'switch counters in the beacons tail (%NL80211_ATTR_BEACON_TAIL).',
        ] }],
        ['csaCOffPresp', u16, { docs: [
            'An array of offsets (u16) to the channel',
            'switch counters in the probe response (%NL80211_ATTR_PROBE_RESP).',
        ] }],
        ['rxmgmtFlags', u32, { type: 'RxmgmtFlags', docs: [
            'flags for nl80211_send_mgmt(), u32.',
            'As specified in the &enum nl80211_rxmgmt_flags.',
        ] }],
        ['staSupportedChannels', data, { docs: [
            'array of supported channels.',
        ] }],
        ['staSupportedOperClasses', data, { docs: [
            'array of supported',
            'supported operating classes.',
        ] }],
        ['handleDfs', flag, { docs: [
            'A flag indicating whether user space',
            'controls DFS operation in IBSS mode. If the flag is included in',
            '%NL80211_CMD_JOIN_IBSS request, the driver will allow use of DFS',
            'channels and reports radar events to userspace. Userspace is required',
            'to react to radar events, e.g. initiate a channel switch or leave the',
            'IBSS network.',
        ] }],
        ['support5Mhz', flag, { docs: [
            'A flag indicating that the device supports',
            '5 MHz channel bandwidth.',
        ] }],
        ['support10Mhz', flag, { docs: [
            'A flag indicating that the device supports',
            '10 MHz channel bandwidth.',
        ] }],
        ['opmodeNotif', u8, { docs: [
            'Operating mode field from Operating Mode',
            'Notification Element based on association request when used with',
            '%NL80211_CMD_NEW_STATION or %NL80211_CMD_SET_STATION (only when',
            '%NL80211_FEATURE_FULL_AP_CLIENT_STATE is supported, or with TDLS);',
            'u8 attribute.',
        ] }],
        ['vendorId', u32, { docs: [
            'The vendor ID, either a 24-bit OUI or, if',
            '%NL80211_VENDOR_ID_IS_LINUX is set, a special Linux ID (not used yet)',
        ] }],
        ['vendorSubcmd', u32, { docs: [
            'vendor sub-command',
        ] }],
        ['vendorData', data, { docs: [
            'data for the vendor command, if any; this',
            'attribute is also used for vendor command feature advertisement',
        ] }],
        ['vendorEvents', data, { docs: [
            'used for event list advertising in the wiphy',
            'info, containing a nested array of possible events',
        ] }],
        ['qosMap', data, { docs: [
            'IP DSCP mapping for Interworking QoS mapping. This',
            'data is in the format defined for the payload of the QoS Map Set element',
            'in IEEE Std 802.11-2012, 8.4.2.97.',
        ] }],
        ['macHint', data, { docs: [
            'MAC address recommendation as initial BSS',
        ] }],
        ['wiphyFreqHint', data, { docs: [
            'frequency of the recommended initial BSS',
        ] }],
        ['maxApAssocSta', u32, { docs: [
            'Device attribute that indicates how many',
            'associated stations are supported in AP mode (including P2P GO); u32.',
            'Since drivers may not have a fixed limit on the maximum number (e.g.,',
            'other concurrent operations may affect this), drivers are allowed to',
            'advertise values that cannot always be met. In such cases, an attempt',
            'to add a new station entry with @NL80211_CMD_NEW_STATION may fail.',
        ] }],
        ['tdlsPeerCapability', u32, { type: 'TdlsPeerCapability', docs: [
            'flags for TDLS peer capabilities, u32.',
            'As specified in the &enum nl80211_tdls_peer_capability.',
        ] }],
        ['socketOwner', flag, { docs: [
            'Flag attribute, if set during interface',
            'creation then the new interface will be owned by the netlink socket',
            'that created it and will be destroyed when the socket is closed.',
            'If set during scheduled scan start then the new scan req will be',
            'owned by the netlink socket that created it and the scheduled scan will',
            'be stopped when the socket is closed.',
            'If set during configuration of regulatory indoor operation then the',
            'regulatory indoor configuration would be owned by the netlink socket',
            'that configured the indoor setting, and the indoor operation would be',
            'cleared when the socket is closed.',
            'If set during NAN interface creation, the interface will be destroyed',
            'if the socket is closed just like any other interface. Moreover, NAN',
            'notifications will be sent in unicast to that socket. Without this',
            'attribute, the notifications will be sent to the %NL80211_MCGRP_NAN',
            'multicast group.',
            'If set during %NL80211_CMD_ASSOCIATE or %NL80211_CMD_CONNECT the',
            'station will deauthenticate when the socket is closed.',
            'If set during %NL80211_CMD_JOIN_IBSS the IBSS will be automatically',
            'torn down when the socket is closed.',
            'If set during %NL80211_CMD_JOIN_MESH the mesh setup will be',
            'automatically torn down when the socket is closed.',
            'If set during %NL80211_CMD_START_AP the AP will be automatically',
            'disabled when the socket is closed.',
        ] }],
        ['csaCOffsetsTx', u16, { docs: [
            'An array of csa counter offsets (u16) which',
            'should be updated when the frame is transmitted.',
        ] }],
        ['maxCsaCounters', u8, { docs: [
            'U8 attribute used to advertise the maximum',
            'supported number of csa counters.',
        ] }],
        ['tdlsInitiator', flag, { docs: [
            'flag attribute indicating the current end is',
            'the TDLS link initiator.',
        ] }],
        ['useRrm', flag, { docs: [
            'flag for indicating whether the current connection',
            'shall support Radio Resource Measurements (11k). This attribute can be',
            'used with %NL80211_CMD_ASSOCIATE and %NL80211_CMD_CONNECT requests.',
            'User space applications are expected to use this flag only if the',
            'underlying device supports these minimal RRM features:',
            '%NL80211_FEATURE_DS_PARAM_SET_IE_IN_PROBES,',
            '%NL80211_FEATURE_QUIET,',
            'Or, if global RRM is supported, see:',
            '%NL80211_EXT_FEATURE_RRM',
            'If this flag is used, driver must add the Power Capabilities IE to the',
            'association request. In addition, it must also set the RRM capability',
            "flag in the association request's Capability Info field.",
        ] }],
        ['wiphyDynAck', flag, { docs: [
            'flag attribute used to enable ACK timeout',
            'estimation algorithm (dynack). In order to activate dynack',
            '%NL80211_FEATURE_ACKTO_ESTIMATION feature flag must be set by lower',
            'drivers to indicate dynack capability. Dynack is automatically disabled',
            'setting valid value for coverage class.',
        ] }],
        ['tsid', u8, { docs: [
            'a TSID value (u8 attribute)',
        ] }],
        ['userPrio', u8, { docs: [
            'user priority value (u8 attribute)',
        ] }],
        ['admittedTime', u16, { docs: [
            'admitted time in units of 32 microseconds',
            '(per second) (u16 attribute)',
        ] }],
        ['smpsMode', data, { type: 'SmpsMode', docs: [
            'SMPS mode to use (ap mode). see',
            '&enum nl80211_smps_mode.',
        ] }],
        ['operClass', data, { docs: [
            'operating class',
        ] }],
        ['macMask', data, { docs: [
            'MAC address mask',
        ] }],
        ['wiphySelfManagedReg', flag, { docs: [
            'flag attribute indicating this device',
            'is self-managing its regulatory information and any regulatory domain',
            "obtained from it is coming from the device's wiphy and not the global",
            'cfg80211 regdomain.',
        ] }],
        ['extFeatures', data, { docs: [
            'extended feature flags contained in a byte',
            'array. The feature flags are identified by their bit index (see &enum',
            'nl80211_ext_feature_index). The bit index is ordered starting at the',
            'least-significant bit of the first byte in the array, ie. bit index 0',
            'is located at bit 0 of byte 0. bit index 25 would be located at bit 1',
            'of byte 3 (u8 array).',
        ] }],
        ['surveyRadioStats', data, { docs: [
            'Request overall radio statistics to be',
            'returned along with other survey data. If set, @NL80211_CMD_GET_SURVEY',
            'may return a survey entry without a channel indicating global radio',
            'statistics (only some values are valid and make sense.)',
            "For devices that don't return such an entry even then, the information",
            'should be contained in the result as the sum of the respective counters',
            'over all channels.',
        ] }],
        ['netnsFd', u32],
        ['schedScanDelay', u32, { docs: [
            'delay before the first cycle of a',
            'scheduled scan is started.  Or the delay before a WoWLAN',
            'net-detect scan is started, counting from the moment the',
            'system is suspended.  This value is a u32, in seconds.',
        ] }],
        ['regIndoor', flag, { docs: [
            'flag attribute, if set indicates that the device',
            'is operating in an indoor environment.',
        ] }],
        ['maxNumSchedScanPlans', u32, { docs: [
            'maximum number of scan plans for',
            'scheduled scan supported by the device (u32), a wiphy attribute.',
        ] }],
        ['maxScanPlanInterval', u32, { docs: [
            'maximum interval (in seconds) for',
            'a scan plan (u32), a wiphy attribute.',
        ] }],
        ['maxScanPlanIterations', u32, { docs: [
            'maximum number of iterations in',
            'a scan plan (u32), a wiphy attribute.',
        ] }],
        ['schedScanPlans', 'ScheduledScanPlan', { docs: [
            'a list of scan plans for scheduled scan.',
            'Each scan plan defines the number of scan iterations and the interval',
            'between scans. The last scan plan will always run infinitely,',
            'thus it must not specify the number of iterations, only the interval',
            'between scans. The scan plans are executed sequentially.',
            'Each scan plan is a nested attribute of &enum nl80211_sched_scan_plan.',
        ] }],
        ['pbss', flag, { docs: [
            'flag attribute. If set it means operate',
            'in a PBSS. Specified in %NL80211_CMD_CONNECT to request',
            'connecting to a PCP, and in %NL80211_CMD_START_AP to start',
            'a PCP instead of AP. Relevant for DMG networks only.',
        ] }],
        ['bssSelect', 'BssSelect', { docs: [
            'nested attribute for driver supporting the',
            'BSS selection feature. When used with %NL80211_CMD_GET_WIPHY it contains',
            'attributes according &enum nl80211_bss_select_attr to indicate what',
            'BSS selection behaviours are supported. When used with %NL80211_CMD_CONNECT',
            'it contains the behaviour-specific attribute containing the parameters for',
            'BSS selection to be done by driver and/or firmware.',
        ] }],
        ['staSupportP2pPs', u8, { type: 'StationP2pPsStatus', docs: [
            'whether P2P PS mechanism supported',
            'or not. u8, one of the values of &enum nl80211_sta_p2p_ps_status',
        ] }],
        ['pad', data, { docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['iftypeExtCapa', data, { docs: [
            'Nested attribute of the following attributes:',
            '%NL80211_ATTR_IFTYPE, %NL80211_ATTR_EXT_CAPA,',
            '%NL80211_ATTR_EXT_CAPA_MASK, to specify the extended capabilities per',
            'interface type.',
        ] }],
        ['muMimoGroupData', data, { docs: [
            'array of 24 bytes that defines a MU-MIMO',
            'groupID for monitor mode.',
            'The first 8 bytes are a mask that defines the membership in each',
            'group (there are 64 groups, group 0 and 63 are reserved),',
            'each bit represents a group and set to 1 for being a member in',
            'that group and 0 for not being a member.',
            'The remaining 16 bytes define the position in each group: 2 bits for',
            'each group.',
            '(smaller group numbers represented on most significant bits and bigger',
            'group numbers on least significant bits.)',
            'This attribute is used only if all interfaces are in monitor mode.',
            'Set this attribute in order to monitor packets using the given MU-MIMO',
            'groupID data.',
            'to turn off that feature set all the bits of the groupID to zero.',
        ] }],
        ['muMimoFollowMacAddr', data, { docs: [
            'mac address for the sniffer to follow',
            'when using MU-MIMO air sniffer.',
            'to turn that feature off set an invalid mac address',
            '(e.g. FF:FF:FF:FF:FF:FF)',
        ] }],
        ['scanStartTimeTsf', u64, { docs: [
            'The time at which the scan was actually',
            'started (u64). The time is the TSF of the BSS the interface that',
            'requested the scan is connected to (if available, otherwise this',
            'attribute must not be included).',
        ] }],
        ['scanStartTimeTsfBssid', data, { docs: [
            'The BSS according to which',
            '%NL80211_ATTR_SCAN_START_TIME_TSF is set.',
        ] }],
        ['measurementDuration', u16, { docs: [
            'measurement duration in TUs (u16). If',
            '%NL80211_ATTR_MEASUREMENT_DURATION_MANDATORY is not set, this is the',
            'maximum measurement duration allowed. This attribute is used with',
            'measurement requests. It can also be used with %NL80211_CMD_TRIGGER_SCAN',
            'if the scan is used for beacon report radio measurement.',
        ] }],
        ['measurementDurationMandatory', flag, { docs: [
            'flag attribute that indicates',
            'that the duration specified with %NL80211_ATTR_MEASUREMENT_DURATION is',
            'mandatory. If this flag is not set, the duration is the maximum duration',
            'and the actual measurement duration may be shorter.',
        ] }],
        ['meshPeerAid', u16, { docs: [
            'Association ID for the mesh peer (u16). This is',
            'used to pull the stored data for mesh peer in power save state.',
        ] }],
        ['nanMasterPref', u8, { docs: [
            'the master preference to be used by',
            '%NL80211_CMD_START_NAN and optionally with',
            "%NL80211_CMD_CHANGE_NAN_CONFIG. Its type is u8 and it can't be 0.",
            'Also, values 1 and 255 are reserved for certification purposes and',
            'should not be used during a normal device operation.',
        ] }],
        ['bands', u32, { type: asflags('BandId'), docs: [
            'operating bands configuration.  This is a u32',
            'bitmask of BIT(NL80211_BAND_*) as described in %enum',
            'nl80211_band.  For instance, for NL80211_BAND_2GHZ, bit 0',
            'would be set.  This attribute is used with',
            '%NL80211_CMD_START_NAN and %NL80211_CMD_CHANGE_NAN_CONFIG, and',
            "it is optional.  If no bands are set, it means don't-care and",
            'the device will decide what to use.',
        ] }],
        ['nanFunc', 'NanFunction', { docs: [
            'a function that can be added to NAN. See',
            '&enum nl80211_nan_func_attributes for description of this nested',
            'attribute.',
        ] }],
        ['nanMatch', 'NanMatch', { docs: [
            'used to report a match. This is a nested attribute.',
            'See &enum nl80211_nan_match_attributes.',
        ] }],
        ['filsKek', data, { docs: [
            'KEK for FILS (Re)Association Request/Response frame',
            'protection.',
        ] }],
        ['filsNonces', data, { docs: [
            'Nonces (part of AAD) for FILS (Re)Association',
            'Request/Response frame protection. This attribute contains the 16 octet',
            'STA Nonce followed by 16 octets of AP Nonce.',
        ] }],
        ['multicastToUnicastEnabled', flag, { docs: [
            'Indicates whether or not multicast',
            'packets should be send out as unicast to all stations (flag attribute).',
        ] }],
        ['bssid', data, { docs: [
            'The BSSID of the AP. Note that %NL80211_ATTR_MAC is also',
            'used in various commands/events for specifying the BSSID.',
        ] }],
        ['schedScanRelativeRssi', data, { docs: [
            'Relative RSSI threshold by which',
            'other BSSs has to be better or slightly worse than the current',
            'connected BSS so that they get reported to user space.',
            'This will give an opportunity to userspace to consider connecting to',
            'other matching BSSs which have better or slightly worse RSSI than',
            'the current connected BSS by using an offloaded operation to avoid',
            'unnecessary wakeups.',
        ] }],
        ['schedScanRssiAdjust', data, { docs: [
            'When present the RSSI level for BSSs in',
            'the specified band is to be adjusted before doing',
            '%NL80211_ATTR_SCHED_SCAN_RELATIVE_RSSI based comparison to figure out',
            'better BSSs. The attribute value is a packed structure',
            'value as specified by &struct nl80211_bss_select_rssi_adjust.',
        ] }],
        ['timeoutReason', u32, { type: 'TimeoutReason', docs: [
            'The reason for which an operation timed out.',
            'u32 attribute with an &enum nl80211_timeout_reason value. This is used,',
            'e.g., with %NL80211_CMD_CONNECT event.',
        ] }],
        ['filsErpUsername', data, { docs: [
            'EAP Re-authentication Protocol (ERP)',
            'username part of NAI used to refer keys rRK and rIK. This is used with',
            '%NL80211_CMD_CONNECT.',
        ] }],
        ['filsErpRealm', data, { docs: [
            'EAP Re-authentication Protocol (ERP) realm part',
            'of NAI specifying the domain name of the ER server. This is used with',
            '%NL80211_CMD_CONNECT.',
        ] }],
        ['filsErpNextSeqNum', data, { docs: [
            'Unsigned 16-bit ERP next sequence number',
            'to use in ERP messages. This is used in generating the FILS wrapped data',
            'for FILS authentication and is used with %NL80211_CMD_CONNECT.',
        ] }],
        ['filsErpRrk', data, { docs: [
            'ERP re-authentication Root Key (rRK) for the',
            'NAI specified by %NL80211_ATTR_FILS_ERP_USERNAME and',
            '%NL80211_ATTR_FILS_ERP_REALM. This is used for generating rIK and rMSK',
            'from successful FILS authentication and is used with',
            '%NL80211_CMD_CONNECT.',
        ] }],
        ['filsCacheId', data, { docs: [
            'A 2-octet identifier advertized by a FILS AP',
            'identifying the scope of PMKSAs. This is used with',
            '@NL80211_CMD_SET_PMKSA and @NL80211_CMD_DEL_PMKSA.',
        ] }],
        ['pmk', data, { docs: [
            'attribute for passing PMK key material. Used with',
            '%NL80211_CMD_SET_PMKSA for the PMKSA identified by %NL80211_ATTR_PMKID.',
            'For %NL80211_CMD_CONNECT it is used to provide PSK for offloading 4-way',
            'handshake for WPA/WPA2-PSK networks. For 802.1X authentication it is',
            'used with %NL80211_CMD_SET_PMK. For offloaded FT support this attribute',
            'specifies the PMK-R0 if NL80211_ATTR_PMKR0_NAME is included as well.',
        ] }],
        ['schedScanMulti', flag, { docs: [
            'flag attribute which user-space shall use to',
            'indicate that it supports multiple active scheduled scan requests.',
        ] }],
        ['schedScanMaxReqs', u32, { docs: [
            'indicates maximum number of scheduled',
            'scan request that may be active for the device (u32).',
        ] }],
        ['want1x4wayHs', flag, { docs: [
            'flag attribute which user-space can include',
            'in %NL80211_CMD_CONNECT to indicate that for 802.1X authentication it',
            'wants to use the supported offload of the 4-way handshake.',
        ] }],
        ['pmkr0Name', data, { docs: [
            'PMK-R0 Name for offloaded FT.',
        ] }],
        ['portAuthorized', data, { docs: [
            '(reserved)',
        ] }],
        ['externalAuthAction', u32, { type: 'ExternalAuthAction', docs: [
            'Identify the requested external',
            'authentication operation (u32 attribute with an',
            '&enum nl80211_external_auth_action value). This is used with the',
            '%NL80211_CMD_EXTERNAL_AUTH request event.',
        ] }],
        ['externalAuthSupport', flag, { docs: [
            'Flag attribute indicating that the user',
            'space supports external authentication. This attribute shall be used',
            'with %NL80211_CMD_CONNECT and %NL80211_CMD_START_AP request. The driver',
            'may offload authentication processing to user space if this capability',
            'is indicated in the respective requests from the user space.',
        ] }],
        ['nss', u8, { docs: [
            "Station's New/updated  RX_NSS value notified using this",
            'u8 attribute. This is used with %NL80211_CMD_STA_OPMODE_CHANGED.',
        ] }],
        ['ackSignal', data],
        ['controlPortOverNl80211', flag, { docs: [
            'A flag indicating whether control',
            'port frames (e.g. of type given in %NL80211_ATTR_CONTROL_PORT_ETHERTYPE)',
            'will be sent directly to the network interface or sent via the NL80211',
            'socket.  If this attribute is missing, then legacy behavior of sending',
            'control port frames directly to the network interface is used.  If the',
            'flag is included, then control port frames are sent over NL80211 instead',
            'using %CMD_CONTROL_PORT_FRAME.  If control port routing over NL80211 is',
            'to be used then userspace must also use the %NL80211_ATTR_SOCKET_OWNER',
            'flag.',
        ] }],
        ['txqStats', 'TxqStats', { docs: [
            'TXQ statistics (nested attribute, see &enum',
            'nl80211_txq_stats)',
        ] }],
        ['txqLimit', u32, { docs: [
            'Total packet limit for the TXQ queues for this phy.',
            'The smaller of this and the memory limit is enforced.',
        ] }],
        ['txqMemoryLimit', u32, { docs: [
            'Total memory memory limit (in bytes) for the',
            'TXQ queues for this phy. The smaller of this and the packet limit is',
            'enforced.',
        ] }],
        ['txqQuantum', u32, { docs: [
            'TXQ scheduler quantum (bytes). Number of bytes',
            'a flow is assigned on each round of the DRR scheduler.',
        ] }],
        ['heCapability', data, { docs: [
            'HE Capability information element (from',
            'association request when used with NL80211_CMD_NEW_STATION). Can be set',
            'only if %NL80211_STA_FLAG_WME is set.',
        ] }],
        ['ftmResponder', data, { docs: [
            'nested attribute which user-space can include',
            'in %NL80211_CMD_START_AP or %NL80211_CMD_SET_BEACON for fine timing',
            'measurement (FTM) responder functionality and containing parameters as',
            'possible, see &enum nl80211_ftm_responder_attr',
        ] }],
        ['ftmResponderStats', 'FtmResponderStats', { docs: [
            'Nested attribute with FTM responder',
            'statistics, see &enum nl80211_ftm_responder_stats.',
        ] }],
        ['timeout', u32, { docs: [
            'Timeout for the given operation in milliseconds (u32),',
            'if the attribute is not given no timeout is requested. Note that 0 is an',
            'invalid value.',
        ] }],
        ['peerMeasurements', 'PeerMeasurement', { docs: [
            'peer measurements request (and result)',
            'data, uses nested attributes specified in',
            '&enum nl80211_peer_measurement_attrs.',
            'This is also used for capability advertisement in the wiphy information,',
            'with the appropriate sub-attributes.',
        ] }],
        ['airtimeWeight', u16, { docs: [
            "Station's weight when scheduled by the airtime",
            'scheduler.',
        ] }],
        ['staTxPowerSetting', u8, { type: 'TxPowerSetting', docs: [
            'Transmit power setting type (u8) for',
            'station associated with the AP. See &enum nl80211_tx_power_setting for',
            'possible values.',
        ] }],
        ['staTxPower', s16, { docs: [
            'Transmit power level (s16) in dBm units. This',
            'allows to set Tx power for a station. If this attribute is not included,',
            'the default per-interface tx power setting will be overriding. Driver',
            'should be picking up the lowest tx power, either tx power per-interface',
            'or per-station.',
        ] }],
        ['saePassword', data, { docs: [
            'attribute for passing SAE password material. It',
            'is used with %NL80211_CMD_CONNECT to provide password for offloading',
            'SAE authentication for WPA3-Personal networks.',
        ] }],
        ['twtResponder', data, { docs: [
            'Enable target wait time responder support.',
        ] }],
        ['heObssPd', data, { docs: [
            'nested attribute for OBSS Packet Detection',
            'functionality.',
        ] }],
        ['wiphyEdmgChannels', u8, { docs: [
            'bitmap that indicates the 2.16 GHz',
            'channel(s) that are allowed to be used for EDMG transmissions.',
            'Defined by IEEE P802.11ay/D4.0 section 9.4.2.251. (u8 attribute)',
        ] }],
        ['wiphyEdmgBwConfig', u8, { docs: [
            'Channel BW Configuration subfield encodes',
            'the allowed channel bandwidth configurations. (u8 attribute)',
            'Defined by IEEE P802.11ay/D4.0 section 9.4.2.251, Table 13.',
        ] }],
        ['vlanId', u16, { docs: [
            'VLAN ID (1..4094) for the station and VLAN group key',
            '(u16).',
        ] }],
    ]},

    InterfaceType: { kind: 'enum', docs: [
        '(virtual) interface types',
        '',
        'These values are used with the %NL80211_ATTR_IFTYPE',
        'to set the type of an interface.',
        '',
        '/',
    ], values: [
        { value: 0, name: 'UNSPECIFIED', docs: [
            'unspecified type, driver decides',
        ] },
        { value: 1, name: 'ADHOC', docs: [
            'independent BSS member',
        ] },
        { value: 2, name: 'STATION', docs: [
            'managed BSS member',
        ] },
        { value: 3, name: 'AP', docs: [
            'access point',
        ] },
        { value: 4, name: 'AP_VLAN', docs: [
            'VLAN interface for access points; VLAN interfaces',
            'are a bit special in that they must always be tied to a pre-existing',
            'AP type interface.',
        ] },
        { value: 5, name: 'WDS', docs: [
            'wireless distribution interface',
        ] },
        { value: 6, name: 'MONITOR', docs: [
            'monitor interface receiving all frames',
        ] },
        { value: 7, name: 'MESH_POINT', docs: [
            'mesh point',
        ] },
        { value: 8, name: 'P2P_CLIENT', docs: [
            'P2P client',
        ] },
        { value: 9, name: 'P2P_GO', docs: [
            'P2P group owner',
        ] },
        { value: 10, name: 'P2P_DEVICE', docs: [
            'P2P device interface type, this is not a netdev',
            "and therefore can't be created in the normal ways, use the",
            '%NL80211_CMD_START_P2P_DEVICE and %NL80211_CMD_STOP_P2P_DEVICE',
            'commands to create and destroy one',
        ] },
        { value: 11, name: 'OCB', docs: [
            'Outside Context of a BSS',
            'This mode corresponds to the MIB variable dot11OCBActivated=true',
        ] },
        { value: 12, name: 'NAN', docs: [
            'NAN device interface type (not a netdev)',
        ] },
    ]},

    StationFlags: { docs: [
        'station flags',
        '',
        'Station flags. When a station is added to an AP interface, it is',
        'assumed to be already associated (and hence authenticated.)',
    ], attrs: [
        ['authorized', flag, { docs: [
            'station is authorized (802.1X)',
        ] }],
        ['shortPreamble', flag, { docs: [
            'station is capable of receiving frames',
            'with short barker preamble',
        ] }],
        ['wme', flag, { docs: [
            'station is WME/QoS capable',
        ] }],
        ['mfp', flag, { docs: [
            'station uses management frame protection',
        ] }],
        ['authenticated', flag, { docs: [
            'station is authenticated',
        ] }],
        ['tdlsPeer', flag, { docs: [
            'station is a TDLS peer -- this flag should',
            'only be used in managed mode (even in the flags mask). Note that the',
            "flag can't be changed, it is only valid while adding a station, and",
            'attempts to change it will silently be ignored (rather than rejected',
            'as errors.)',
        ] }],
        ['associated', flag, { docs: [
            'station is associated; used with drivers',
            'that support %NL80211_FEATURE_FULL_AP_CLIENT_STATE to transition a',
            'previously added station into associated state',
        ] }],
    ]},

    StationP2pPsStatus: { kind: 'enum', docs: [
        'station support of P2P PS',
    ], values: [
        { value: 0, name: 'UNSUPPORTED', docs: [
            "station doesn't support P2P PS mechanism",
        ] },
        { value: 1, name: 'SUPPORTED', docs: [
            'station supports P2P PS mechanism',
        ] },
    ]},

    HeGuardInterval: { kind: 'enum', docs: [
        'HE guard interval',
    ], values: [
        { value: 0, name: '_0_8', docs: [
            '0.8 usec',
        ] },
        { value: 1, name: '_1_6', docs: [
            '1.6 usec',
        ] },
        { value: 2, name: '_3_2', docs: [
            '3.2 usec',
        ] },
    ]},

    HeRuAllocation: { kind: 'enum', docs: [
        'HE RU allocation values',
        '',
        '@NL80211_RATE_INFO_HE_RU_ALLOC_2x996: 2x996-tone RU allocation',
    ], values: [
        { value: 0, name: '_26', docs: [
            '26-tone RU allocation',
        ] },
        { value: 1, name: '_52', docs: [
            '52-tone RU allocation',
        ] },
        { value: 2, name: '_106', docs: [
            '106-tone RU allocation',
        ] },
        { value: 3, name: '_242', docs: [
            '242-tone RU allocation',
        ] },
        { value: 4, name: '_484', docs: [
            '484-tone RU allocation',
        ] },
        { value: 5, name: '_996', docs: [
            '996-tone RU allocation',
        ] },
        { value: 6, name: '_2x996' },
    ]},

    RateInfo: { docs: [
        'bitrate information',
        '',
        'These attribute types are used with %NL80211_STA_INFO_TXRATE',
        'when getting information about the bitrate of a station.',
        'There are 2 attributes for bitrate, a legacy one that represents',
        'a 16-bit value, and new one that represents a 32-bit value.',
        'If the rate value fits into 16 bit, both attributes are reported',
        'with the same value. If the rate is too high to fit into 16 bits',
        '(>6.5535Gbps) only 32-bit attribute is included.',
        'User space tools encouraged to use the 32-bit attribute and fall',
        'back to the 16-bit one for compatibility with older kernels.',
    ], attrs: [
        ['bitrate', u16, { docs: [
            'total bitrate (u16, 100kbit/s)',
        ] }],
        ['mcs', u8, { docs: [
            'mcs index for 802.11n (u8)',
        ] }],
        ['_40MhzWidth', data, { docs: [
            '40 MHz dualchannel bitrate',
        ] }],
        ['shortGi', data, { docs: [
            '400ns guard interval',
        ] }],
        ['bitrate32', u32, { docs: [
            'total bitrate (u32, 100kbit/s)',
        ] }],
        ['vhtMcs', u8, { docs: [
            'MCS index for VHT (u8)',
        ] }],
        ['vhtNss', u8, { docs: [
            'number of streams in VHT (u8)',
        ] }],
        ['_80MhzWidth', data, { docs: [
            '80 MHz VHT rate',
        ] }],
        ['_80p80MhzWidth', data, { docs: [
            'unused - 80+80 is treated the',
            'same as 160 for purposes of the bitrates',
        ] }],
        ['_160MhzWidth', data, { docs: [
            '160 MHz VHT rate',
        ] }],
        ['_10MhzWidth', data, { docs: [
            '10 MHz width - note that this is',
            'a legacy rate and will be reported as the actual bitrate, i.e.',
            'half the base (20 MHz) rate',
        ] }],
        ['_5MhzWidth', data, { docs: [
            '5 MHz width - note that this is',
            'a legacy rate and will be reported as the actual bitrate, i.e.',
            'a quarter of the base (20 MHz) rate',
        ] }],
        ['heMcs', u8, { docs: [
            'HE MCS index (u8, 0-11)',
        ] }],
        ['heNss', u8, { docs: [
            'HE NSS value (u8, 1-8)',
        ] }],
        ['heGi', u8, { type: 'HeGuardInterval', docs: [
            'HE guard interval identifier',
            '(u8, see &enum nl80211_he_gi)',
        ] }],
        ['heDcm', u8, { docs: [
            'HE DCM value (u8, 0/1)',
        ] }],
        ['heRuAlloc', u8, { type: 'HeRuAllocation', docs: [
            'HE RU allocation, if not present then',
            'non-OFDMA was used (u8, see &enum nl80211_he_ru_alloc)',
        ] }],
    ]},

    StationBssParam: { docs: [
        'BSS information collected by STA',
        '',
        'These attribute types are used with %NL80211_STA_INFO_BSS_PARAM',
        'when getting information about the bitrate of a station.',
    ], attrs: [
        ['ctsProt', flag, { docs: [
            'whether CTS protection is enabled (flag)',
        ] }],
        ['shortPreamble', flag, { docs: [
            'whether short preamble is enabled',
            '(flag)',
        ] }],
        ['shortSlotTime', flag, { docs: [
            'whether short slot time is enabled',
            '(flag)',
        ] }],
        ['dtimPeriod', u8, { docs: [
            'DTIM period for beaconing (u8)',
        ] }],
        ['beaconInterval', u16, { docs: [
            'Beacon interval (u16)',
        ] }],
    ]},

    StationInfo: { docs: [
        'station information',
        '',
        'These attribute types are used with %NL80211_ATTR_STA_INFO',
        'when getting information about a station.',
    ], attrs: [
        ['inactiveTime', u32, { docs: [
            'time since last activity (u32, msecs)',
        ] }],
        ['rxBytes', u32, { docs: [
            'total received bytes (MPDU length)',
            '(u32, from this station)',
        ] }],
        ['txBytes', u32, { docs: [
            'total transmitted bytes (MPDU length)',
            '(u32, to this station)',
        ] }],
        ['llid', u16, { docs: [
            "the station's mesh LLID",
        ] }],
        ['plid', u16, { docs: [
            "the station's mesh PLID",
        ] }],
        ['plinkState', u8, { type: 'PlinkState', docs: [
            'peer link state for the station',
            '(see %enum nl80211_plink_state)',
        ] }],
        ['signal', u8, { docs: [
            'signal strength of last received PPDU (u8, dBm)',
        ] }],
        ['txBitrate', 'RateInfo', { docs: [
            'current unicast tx rate, nested attribute',
            'containing info as possible, see &enum nl80211_rate_info',
        ] }],
        ['rxPackets', u32, { docs: [
            'total received packet (MSDUs and MMPDUs)',
            '(u32, from this station)',
        ] }],
        ['txPackets', u32, { docs: [
            'total transmitted packets (MSDUs and MMPDUs)',
            '(u32, to this station)',
        ] }],
        ['txRetries', u32, { docs: [
            'total retries (MPDUs) (u32, to this station)',
        ] }],
        ['txFailed', u32, { docs: [
            'total failed packets (MPDUs)',
            '(u32, to this station)',
        ] }],
        ['signalAvg', u8, { docs: [
            'signal strength average (u8, dBm)',
        ] }],
        ['rxBitrate', data, { docs: [
            'last unicast data frame rx rate, nested',
            'attribute, like NL80211_STA_INFO_TX_BITRATE.',
        ] }],
        ['bssParam', 'StationBssParam', { docs: [
            "current station's view of BSS, nested attribute",
            'containing info as possible, see &enum nl80211_sta_bss_param',
        ] }],
        ['connectedTime', u32, { docs: [
            'time since the station is last connected',
        ] }],
        ['staFlags', data, { docs: [
            'Contains a struct nl80211_sta_flag_update.',
        ] }],
        ['beaconLoss', u32, { docs: [
            'count of times beacon loss was detected (u32)',
        ] }],
        ['tOffset', s64, { docs: [
            'timing offset with respect to this STA (s64)',
        ] }],
        ['localPm', data, { docs: [
            'local mesh STA link-specific power mode',
        ] }],
        ['peerPm', data, { docs: [
            'peer mesh STA link-specific power mode',
        ] }],
        ['nonpeerPm', data, { docs: [
            'neighbor mesh STA power save mode towards',
            'non-peer STA',
        ] }],
        ['rxBytes64', u64, { docs: [
            'total received bytes (MPDU length)',
            '(u64, from this station)',
        ] }],
        ['txBytes64', u64, { docs: [
            'total transmitted bytes (MPDU length)',
            '(u64, to this station)',
        ] }],
        ['chainSignal', u8, { docs: [
            'per-chain signal strength of last PPDU',
            'Contains a nested array of signal strength attributes (u8, dBm)',
        ] }],
        ['chainSignalAvg', data, { docs: [
            'per-chain signal strength average',
            'Same format as NL80211_STA_INFO_CHAIN_SIGNAL.',
        ] }],
        ['expectedThroughput', u32, { docs: [
            'expected throughput considering also the',
            '802.11 header (u32, kbps)',
        ] }],
        ['rxDropMisc', u64, { docs: [
            'RX packets dropped for unspecified reasons',
            '(u64)',
        ] }],
        ['beaconRx', u64, { docs: [
            'number of beacons received from this peer (u64)',
        ] }],
        ['beaconSignalAvg', u8, { docs: [
            'signal strength average',
            'for beacons only (u8, dBm)',
        ] }],
        ['tidStats', map('TidStats'), { docs: [
            'per-TID statistics (see &enum nl80211_tid_stats)',
            'This is a nested attribute where each the inner attribute number is the',
            'TID+1 and the special TID 16 (i.e. value 17) is used for non-QoS frames;',
            'each one of those is again nested with &enum nl80211_tid_stats',
            'attributes carrying the actual values.',
        ] }],
        ['rxDuration', u64, { docs: [
            'aggregate PPDU duration for all frames',
            'received from the station (u64, usec)',
        ] }],
        ['pad', data, { docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['ackSignal', u8, { docs: [
            'signal strength of the last ACK frame(u8, dBm)',
        ] }],
        ['ackSignalAvg', s8, { docs: [
            'avg signal strength of ACK frames (s8, dBm)',
        ] }],
        ['rxMpdus', u32, { docs: [
            'total number of received packets (MPDUs)',
            '(u32, from this station)',
        ] }],
        ['fcsErrorCount', u32, { docs: [
            'total number of packets (MPDUs) received',
            'with an FCS error (u32, from this station). This count may not include',
            'some packets with an FCS error due to TA corruption. Hence this counter',
            'might not be fully accurate.',
        ] }],
        ['connectedToGate', u8, { docs: [
            'set to true if STA has a path to a',
            'mesh gate (u8, 0 or 1)',
        ] }],
        ['txDuration', u64, { docs: [
            'aggregate PPDU duration for all frames',
            'sent to the station (u64, usec)',
        ] }],
        ['airtimeWeight', u16, { docs: [
            'current airtime weight for station (u16)',
        ] }],
        ['airtimeLinkMetric', data, { docs: [
            'airtime link metric for mesh station',
        ] }],
        ['assocAtBoottime', u64, { docs: [
            'Timestamp (CLOCK_BOOTTIME, nanoseconds)',
            "of STA's association",
        ] }],
    ]},

    TidStats: { docs: [
        'per TID statistics attributes',
    ], attrs: [
        ['rxMsdu', u64, { docs: [
            'number of MSDUs received (u64)',
        ] }],
        ['txMsdu', u64, { docs: [
            'number of MSDUs transmitted (or',
            'attempted to transmit; u64)',
        ] }],
        ['txMsduRetries', u64, { docs: [
            'number of retries for',
            'transmitted MSDUs (not counting the first attempt; u64)',
        ] }],
        ['txMsduFailed', u64, { docs: [
            'number of failed transmitted',
            'MSDUs (u64)',
        ] }],
        ['pad', data, { docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['txqStats', 'TxqStats', { docs: [
            'TXQ stats (nested attribute)',
        ] }],
    ]},

    TxqStats: { docs: [
        'per TXQ statistics attributes',
    ], attrs: [
        ['backlogBytes', data, { docs: [
            'number of bytes currently backlogged',
        ] }],
        ['backlogPackets', data, { docs: [
            'number of packets currently',
            'backlogged',
        ] }],
        ['flows', data, { docs: [
            'total number of new flows seen',
        ] }],
        ['drops', data, { docs: [
            'total number of packet drops',
        ] }],
        ['ecnMarks', data, { docs: [
            'total number of packet ECN marks',
        ] }],
        ['overlimit', data, { docs: [
            'number of drops due to queue space overflow',
        ] }],
        ['overmemory', data, { docs: [
            'number of drops due to memory limit overflow',
            '(only for per-phy stats)',
        ] }],
        ['collisions', data, { docs: [
            'number of hash collisions',
        ] }],
        ['txBytes', data, { docs: [
            'total number of bytes dequeued from TXQ',
        ] }],
        ['txPackets', data, { docs: [
            'total number of packets dequeued from TXQ',
        ] }],
        ['maxFlows', data, { docs: [
            'number of flow buckets for PHY',
        ] }],
    ]},

    MpathFlags: { kind: 'flags', docs: [
        'nl80211 mesh path flags',
    ], values: [
        { value: 1<<0, name: 'active', docs: [
            'the mesh path is active',
        ] },
        { value: 1<<1, name: 'resolving', docs: [
            'the mesh path discovery process is running',
        ] },
        { value: 1<<2, name: 'snValid', docs: [
            'the mesh path contains a valid SN',
        ] },
        { value: 1<<3, name: 'fixed', docs: [
            'the mesh path has been manually set',
        ] },
        { value: 1<<4, name: 'resolved', docs: [
            'the mesh path discovery process succeeded',
        ] },
    ]},

    MpathInfo: { docs: [
        'mesh path information',
        '',
        'These attribute types are used with %NL80211_ATTR_MPATH_INFO when getting',
        'information about a mesh path.',
    ], attrs: [
        ['frameQlen', u32, { docs: [
            'number of queued frames for this destination',
        ] }],
        ['sn', u32, { docs: [
            'destination sequence number',
        ] }],
        ['metric', u32, { docs: [
            'metric (cost) of this mesh path',
        ] }],
        ['exptime', u32, { docs: [
            'expiration time for the path, in msec from now',
        ] }],
        ['flags', u8, { type: 'MpathFlags', docs: [
            'mesh path flags, enumerated in',
            '&enum nl80211_mpath_flags;',
        ] }],
        ['discoveryTimeout', u32, { docs: [
            'total path discovery timeout, in msec',
        ] }],
        ['discoveryRetries', u8, { docs: [
            'mesh path discovery retries',
        ] }],
        ['hopCount', data, { docs: [
            'hop count to destination',
        ] }],
        ['pathChange', data, { docs: [
            'total number of path changes to destination',
        ] }],
    ]},

    BandInterfaceType: { docs: [
        'Interface type data attributes',
    ], attrs: [
        ['iftypes', asflags('InterfaceType'), { docs: [
            'nested attribute containing a flag attribute',
            'for each interface type that supports the band data',
        ] }],
        ['heCapMac', data, { docs: [
            'HE MAC capabilities as in HE',
            'capabilities IE',
        ] }],
        ['heCapPhy', data, { docs: [
            'HE PHY capabilities as in HE',
            'capabilities IE',
        ] }],
        ['heCapMcsSet', data, { docs: [
            'HE supported NSS/MCS as in HE',
            'capabilities IE',
        ] }],
        ['heCapPpe', data, { docs: [
            'HE PPE thresholds information as',
            'defined in HE capabilities IE',
        ] }],
    ]},

    Band: { docs: [
        'band attributes',
    ], attrs: [
        ['freqs', array('Frequency', { zero: true }), { docs: [
            'supported frequencies in this band,',
            'an array of nested frequency attributes',
        ] }],
        ['rates', array('Bitrate', { zero: true }), { docs: [
            'supported bitrates in this band,',
            'an array of nested bitrate attributes',
        ] }],
        ['htMcsSet', data, { docs: [
            '16-byte attribute containing the MCS set as',
            'defined in 802.11n',
        ] }],
        ['htCapa', u16, { docs: [
            'HT capabilities, as in the HT information IE',
        ] }],
        ['htAmpduFactor', u8, { docs: [
            'A-MPDU factor, as in 11n',
        ] }],
        ['htAmpduDensity', u8, { docs: [
            'A-MPDU density, as in 11n',
        ] }],
        ['vhtMcsSet', data, { docs: [
            '32-byte attribute containing the MCS set as',
            'defined in 802.11ac',
        ] }],
        ['vhtCapa', u32, { docs: [
            'VHT capabilities, as in the HT information IE',
        ] }],
        ['iftypeData', array('BandInterfaceType'), { docs: [
            'nested array attribute, with each entry using',
            'attributes from &enum nl80211_band_iftype_attr',
        ] }],
        ['edmgChannels', data, { docs: [
            'bitmap that indicates the 2.16 GHz',
            'channel(s) that are allowed to be used for EDMG transmissions.',
            'Defined by IEEE P802.11ay/D4.0 section 9.4.2.251.',
        ] }],
        ['edmgBwConfig', data, { docs: [
            'Channel BW Configuration subfield encodes',
            'the allowed channel bandwidth configurations.',
            'Defined by IEEE P802.11ay/D4.0 section 9.4.2.251, Table 13.',
        ] }],
    ]},

    WmmRule: { docs: [
        'regulatory wmm rule',
    ], attrs: [
        ['cwMin', data, { docs: [
            'Minimum contention window slot.',
        ] }],
        ['cwMax', data, { docs: [
            'Maximum contention window slot.',
        ] }],
        ['aifsn', data, { docs: [
            'Arbitration Inter Frame Space.',
        ] }],
        ['txop', data, { docs: [
            'Maximum allowed tx operation time.',
        ] }],
    ]},

    Frequency: { docs: [
        'frequency attributes',
        '',
        'See https://apps.fcc.gov/eas/comments/GetPublishedDocument.html?id=327&tn=528122',
        'for more information on the FCC description of the relaxations allowed',
        'by NL80211_FREQUENCY_ATTR_INDOOR_ONLY and',
        'NL80211_FREQUENCY_ATTR_IR_CONCURRENT.',
    ], attrs: [
        ['freq', u32, { docs: [
            'Frequency in MHz',
        ] }],
        ['disabled', flag, { docs: [
            'Channel is disabled in current',
            'regulatory domain.',
        ] }],
        ['noIr', flag, { docs: [
            'no mechanisms that initiate radiation',
            'are permitted on this channel, this includes sending probe',
            'requests, or modes of operation that require beaconing.',
        ] }],
        ['__noIbss', flag],
        ['radar', flag, { docs: [
            'Radar detection is mandatory',
            'on this channel in current regulatory domain.',
        ] }],
        ['maxTxPower', u32, { docs: [
            'Maximum transmission power in mBm',
            '(100 * dBm).',
        ] }],
        ['dfsState', u32, { type: 'DfsState', docs: [
            'current state for DFS',
            '(enum nl80211_dfs_state)',
        ] }],
        ['dfsTime', u32, { docs: [
            'time in miliseconds for how long',
            'this channel is in this DFS state.',
        ] }],
        ['noHt40Minus', flag, { docs: [
            "HT40- isn't possible with this",
            'channel as the control channel',
        ] }],
        ['noHt40Plus', flag, { docs: [
            "HT40+ isn't possible with this",
            'channel as the control channel',
        ] }],
        ['no80mhz', flag, { docs: [
            'any 80 MHz channel using this channel',
            "as the primary or any of the secondary channels isn't possible,",
            'this includes 80+80 channels',
        ] }],
        ['no160mhz', flag, { docs: [
            'any 160 MHz (but not 80+80) channel',
            'using this channel as the primary or any of the secondary channels',
            "isn't possible",
        ] }],
        ['dfsCacTime', u32, { docs: [
            'DFS CAC time in milliseconds.',
        ] }],
        ['indoorOnly', flag, { docs: [
            'Only indoor use is permitted on this',
            'channel. A channel that has the INDOOR_ONLY attribute can only be',
            'used when there is a clear assessment that the device is operating in',
            'an indoor surroundings, i.e., it is connected to AC power (and not',
            'through portable DC inverters) or is under the control of a master',
            'that is acting as an AP and is connected to AC power.',
        ] }],
        ['irConcurrent', flag, { docs: [
            'IR operation is allowed on this',
            "channel if it's connected concurrently to a BSS on the same channel on",
            'the 2 GHz band or to a channel in the same UNII band (on the 5 GHz',
            'band), and IEEE80211_CHAN_RADAR is not set. Instantiating a GO or TDLS',
            'off-channel on a channel that has the IR_CONCURRENT attribute set can be',
            'done when there is a clear assessment that the device is operating under',
            'the guidance of an authorized master, i.e., setting up a GO or TDLS',
            'off-channel while the device is also connected to an AP with DFS and',
            'radar detection on the UNII band (it is up to user-space, i.e.,',
            'wpa_supplicant to perform the required verifications). Using this',
            'attribute for IR is disallowed for master interfaces (IBSS, AP).',
        ] }],
        ['no20mhz', flag, { docs: [
            '20 MHz operation is not allowed',
            'on this channel in current regulatory domain.',
        ] }],
        ['no10mhz', flag, { docs: [
            '10 MHz operation is not allowed',
            'on this channel in current regulatory domain.',
        ] }],
        ['wmm', 'WmmRule', { docs: [
            'this channel has wmm limitations.',
            'This is a nested attribute that contains the wmm limitation per AC.',
            '(see &enum nl80211_wmm_rule)',
        ] }],
    ]},

    Bitrate: { docs: [
        'bitrate attributes',
    ], attrs: [
        ['rate', u32, { docs: [
            'Bitrate in units of 100 kbps',
        ] }],
        ['_2ghzShortpreamble', flag, { docs: [
            'Short preamble supported',
            'in 2.4 GHz band.',
        ] }],
    ]},

    RegulatoryInitiator: { kind: 'enum', docs: [
        'Indicates the initiator of a reg domain request',
    ], values: [
        { value: 0, name: 'CORE', docs: [
            'Core queried CRDA for a dynamic world',
            'regulatory domain.',
        ] },
        { value: 1, name: 'USER', docs: [
            'User asked the wireless core to set the',
            'regulatory domain.',
        ] },
        { value: 2, name: 'DRIVER', docs: [
            'a wireless drivers has hinted to the',
            'wireless core it thinks its knows the regulatory domain we should be in.',
        ] },
        { value: 3, name: 'COUNTRY_IE', docs: [
            'the wireless core has received an',
            '802.11 country information element with regulatory information it',
            'thinks we should consider. cfg80211 only processes the country',
            'code from the IE, and relies on the regulatory domain information',
            'structure passed by userspace (CRDA) from our wireless-regdb.',
            'If a channel is enabled but the country code indicates it should',
            'be disabled we disable the channel and re-enable it upon disassociation.',
        ] },
    ]},

    RegulatoryType: { kind: 'enum', docs: [
        'specifies the type of regulatory domain',
    ], values: [
        { value: 0, name: 'COUNTRY', docs: [
            'the regulatory domain set is one that pertains',
            'to a specific country. When this is set you can count on the',
            'ISO / IEC 3166 alpha2 country code being valid.',
        ] },
        { value: 1, name: 'WORLD', docs: [
            'the regulatory set domain is the world regulatory',
            'domain.',
        ] },
        { value: 2, name: 'CUSTOM_WORLD', docs: [
            'the regulatory domain set is a custom',
            'driver specific world regulatory domain. These do not apply system-wide',
            'and are only applicable to the individual devices which have requested',
            'them to be applied.',
        ] },
        { value: 3, name: 'INTERSECTION', docs: [
            'the regulatory domain set is the product',
            'of an intersection between two regulatory domains -- the previously',
            'set regulatory domain on the system and the last accepted regulatory',
            'domain request to be processed.',
        ] },
    ]},

    RegulatoryRule: { docs: [
        'regulatory rule attributes',
    ], attrs: [
        ['regRuleFlags', u32, { type: 'RegulatoryRuleFlags', docs: [
            'a set of flags which specify additional',
            'considerations for a given frequency range. These are the',
            '&enum nl80211_reg_rule_flags.',
        ] }],
        ['freqRangeStart', u32, { docs: [
            'starting frequencry for the regulatory',
            'rule in KHz. This is not a center of frequency but an actual regulatory',
            'band edge.',
        ] }],
        ['freqRangeEnd', u32, { docs: [
            'ending frequency for the regulatory rule',
            'in KHz. This is not a center a frequency but an actual regulatory',
            'band edge.',
        ] }],
        ['freqRangeMaxBw', u32, { docs: [
            'maximum allowed bandwidth for this',
            'frequency range, in KHz.',
        ] }],
        ['powerRuleMaxAntGain', u32, { docs: [
            'the maximum allowed antenna gain',
            'for a given frequency range. The value is in mBi (100 * dBi).',
            "If you don't have one then don't send this.",
        ] }],
        ['powerRuleMaxEirp', u32, { docs: [
            'the maximum allowed EIRP for',
            'a given frequency range. The value is in mBm (100 * dBm).',
        ] }],
        ['dfsCacTime', u32, { docs: [
            'DFS CAC time in milliseconds.',
            'If not present or 0 default CAC time will be used.',
        ] }],
    ]},

    ScheduledScanMatch: { docs: [
        'scheduled scan match attributes',
    ], attrs: [
        ['attrSsid', data, { docs: [
            'SSID to be used for matching,',
            'only report BSS with matching SSID.',
            '(This cannot be used together with BSSID.)',
        ] }],
        ['attrRssi', data, { docs: [
            'RSSI threshold (in dBm) for reporting a',
            'BSS in scan results. Filtering is turned off if not specified. Note that',
            'if this attribute is in a match set of its own, then it is treated as',
            'the default value for all matchsets with an SSID, rather than being a',
            'matchset of its own without an RSSI filter. This is due to problems with',
            'how this API was implemented in the past. Also, due to the same problem,',
            'the only way to create a matchset with only an RSSI filter (with this',
            "attribute) is if there's only a single matchset with the RSSI attribute.",
        ] }],
        ['attrRelativeRssi', flag, { docs: [
            'Flag indicating whether',
            '%NL80211_SCHED_SCAN_MATCH_ATTR_RSSI to be used as absolute RSSI or',
            "relative to current bss's RSSI.",
        ] }],
        ['attrRssiAdjust', data, { docs: [
            'When present the RSSI level for',
            'BSS-es in the specified band is to be adjusted before doing',
            'RSSI-based BSS selection. The attribute value is a packed structure',
            'value as specified by &struct nl80211_bss_select_rssi_adjust.',
        ] }],
        ['attrBssid', data, { docs: [
            'BSSID to be used for matching',
            '(this cannot be used together with SSID).',
        ] }],
        ['perBandRssi', s32, { type: 'BandId', docs: [
            'Nested attribute that carries the',
            'band specific minimum rssi thresholds for the bands defined in',
            'enum nl80211_band. The minimum rssi threshold value(s32) specific to a',
            'band shall be encapsulated in attribute with type value equals to one',
            'of the NL80211_BAND_* defined in enum nl80211_band. For example, the',
            'minimum rssi threshold value for 2.4GHZ band shall be encapsulated',
            'within an attribute of type NL80211_BAND_2GHZ. And one or more of such',
            'attributes will be nested within this attribute.',
        ] }],
    ]},

    RegulatoryRuleFlags: { kind: 'flags', docs: [
        'regulatory rule flags',
    ], values: [
        { value: 1<<0, name: 'noOfdm', docs: [
            'OFDM modulation not allowed',
        ] },
        { value: 1<<1, name: 'noCck', docs: [
            'CCK modulation not allowed',
        ] },
        { value: 1<<2, name: 'noIndoor', docs: [
            'indoor operation not allowed',
        ] },
        { value: 1<<3, name: 'noOutdoor', docs: [
            'outdoor operation not allowed',
        ] },
        { value: 1<<4, name: 'dfs', docs: [
            'DFS support is required to be used',
        ] },
        { value: 1<<5, name: 'ptpOnly', docs: [
            'this is only for Point To Point links',
        ] },
        { value: 1<<6, name: 'ptmpOnly', docs: [
            'this is only for Point To Multi Point links',
        ] },
        { value: 1<<7, name: 'noIr', docs: [
            'no mechanisms that initiate radiation are allowed,',
            'this includes probe requests or modes of operation that require',
            'beaconing.',
        ] },
        { value: 1<<8, name: '__noIbss' },
        { value: 1<<11, name: 'autoBw', docs: [
            'maximum available bandwidth should be calculated',
            'base on contiguous rules and wider channels will be allowed to cross',
            'multiple contiguous/overlapping frequency ranges.',
        ] },
        { value: 1<<12, name: 'irConcurrent', docs: [
            'See %NL80211_FREQUENCY_ATTR_IR_CONCURRENT',
        ] },
        { value: 1<<13, name: 'noHt40minus', docs: [
            "channels can't be used in HT40- operation",
        ] },
        { value: 1<<14, name: 'noHt40plus', docs: [
            "channels can't be used in HT40+ operation",
        ] },
        { value: 1<<15, name: 'no80mhz', docs: [
            '80MHz operation not allowed',
        ] },
        { value: 1<<16, name: 'no160mhz', docs: [
            '160MHz operation not allowed',
        ] },
    ]},

    DfsRegions: { kind: 'enum', docs: [
        'regulatory DFS regions',
    ], values: [
        { value: 0, name: 'UNSET', docs: [
            'Country has no DFS master region specified',
        ] },
        { value: 1, name: 'FCC', docs: [
            'Country follows DFS master rules from FCC',
        ] },
        { value: 2, name: 'ETSI', docs: [
            'Country follows DFS master rules from ETSI',
        ] },
        { value: 3, name: 'JP', docs: [
            'Country follows DFS master rules from JP/MKK/Telec',
        ] },
    ]},

    UserRegulatoryHintType: { kind: 'enum', docs: [
        'type of user regulatory hint',
    ], values: [
        { value: 0, name: 'USER', docs: [
            'a user sent the hint. This is always',
            'assumed if the attribute is not set.',
        ] },
        { value: 1, name: 'CELL_BASE', docs: [
            'the hint comes from a cellular',
            'base station. Device drivers that have been tested to work',
            'properly to support this type of hint can enable these hints',
            'by setting the NL80211_FEATURE_CELL_BASE_REG_HINTS feature',
            'capability on the struct wiphy. The wireless core will',
            'ignore all cell base station hints until at least one device',
            'present has been registered with the wireless core that',
            'has listed NL80211_FEATURE_CELL_BASE_REG_HINTS as a',
            'supported feature.',
        ] },
        { value: 2, name: 'INDOOR', docs: [
            'a user sent an hint indicating that the',
            'platform is operating in an indoor environment.',
        ] },
    ]},

    SurveyInfo: { docs: [
        'survey information',
        '',
        'These attribute types are used with %NL80211_ATTR_SURVEY_INFO',
        'when getting information about a survey.',
    ], attrs: [
        ['frequency', u32, { docs: [
            'center frequency of channel',
        ] }],
        ['noise', u8, { docs: [
            'noise level of channel (u8, dBm)',
        ] }],
        ['inUse', data, { docs: [
            'channel is currently being used',
        ] }],
        ['time', u64, { docs: [
            'amount of time (in ms) that the radio',
            'was turned on (on channel or globally)',
        ] }],
        ['timeBusy', u64, { docs: [
            'amount of the time the primary',
            'channel was sensed busy (either due to activity or energy detect)',
        ] }],
        ['timeExtBusy', u64, { docs: [
            'amount of time the extension',
            'channel was sensed busy',
        ] }],
        ['timeRx', u64, { docs: [
            'amount of time the radio spent',
            'receiving data (on channel or globally)',
        ] }],
        ['timeTx', u64, { docs: [
            'amount of time the radio spent',
            'transmitting data (on channel or globally)',
        ] }],
        ['timeScan', data, { docs: [
            'time the radio spent for scan',
            '(on this channel or globally)',
        ] }],
        ['pad', data, { docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['timeBssRx', data, { docs: [
            'amount of time the radio spent',
            'receiving frames destined to the local BSS',
        ] }],
    ]},

    MonitorFlags: { docs: [
        'monitor configuration flags',
        '',
        'Monitor configuration flags.',
    ], attrs: [
        ['fcsfail', flag, { docs: [
            'pass frames with bad FCS',
        ] }],
        ['plcpfail', flag, { docs: [
            'pass frames with bad PLCP',
        ] }],
        ['control', flag, { docs: [
            'pass control frames',
        ] }],
        ['otherBss', flag, { docs: [
            'disable BSSID filtering',
        ] }],
        ['cookFrames', flag, { docs: [
            'report frames after processing.',
            'overrides all other flags.',
        ] }],
        ['active', flag, { docs: [
            'use the configured MAC address',
            'and ACK incoming unicast packets.',
        ] }],
    ]},

    MeshPowerMode: { kind: 'enum', docs: [
        'mesh power save modes',
        '',
        '@__NL80211_MESH_POWER_AFTER_LAST - internal use',
        '@NL80211_MESH_POWER_MAX - highest possible power save level',
    ], values: [
        { value: 0, name: 'UNKNOWN', docs: [
            'The mesh power mode of the mesh STA is',
            'not known or has not been set yet.',
        ] },
        { value: 1, name: 'ACTIVE', docs: [
            'Active mesh power mode. The mesh STA is',
            'in Awake state all the time.',
        ] },
        { value: 2, name: 'LIGHT_SLEEP', docs: [
            'Light sleep mode. The mesh STA will',
            'alternate between Active and Doze states, but will wake up for',
            "neighbor's beacons.",
        ] },
        { value: 3, name: 'DEEP_SLEEP', docs: [
            'Deep sleep mode. The mesh STA will',
            'alternate between Active and Doze states, but may not wake up',
            "for neighbor's beacons.",
        ] },
    ]},

    MeshconfParams: { docs: [
        'mesh configuration parameters',
        '',
        'Mesh configuration parameters. These can be changed while the mesh is',
        'active.',
    ], attrs: [
        ['retryTimeout', data, { docs: [
            'specifies the initial retry timeout in',
            'millisecond units, used by the Peer Link Open message',
        ] }],
        ['confirmTimeout', data, { docs: [
            'specifies the initial confirm timeout, in',
            'millisecond units, used by the peer link management to close a peer link',
        ] }],
        ['holdingTimeout', data, { docs: [
            'specifies the holding timeout, in',
            'millisecond units',
        ] }],
        ['maxPeerLinks', data, { docs: [
            'maximum number of peer links allowed',
            'on this mesh interface',
        ] }],
        ['maxRetries', data, { docs: [
            'specifies the maximum number of peer link',
            'open retries that can be sent to establish a new peer link instance in a',
            'mesh',
        ] }],
        ['ttl', data, { docs: [
            'specifies the value of TTL field set at a source mesh',
            'point.',
        ] }],
        ['autoOpenPlinks', data, { docs: [
            'whether we should automatically open',
            'peer links when we detect compatible mesh peers. Disabled if',
            '@NL80211_MESH_SETUP_USERSPACE_MPM or @NL80211_MESH_SETUP_USERSPACE_AMPE are',
            'set.',
        ] }],
        ['hwmpMaxPreqRetries', data, { docs: [
            'the number of action frames',
            'containing a PREQ that an MP can send to a particular destination (path',
            'target)',
        ] }],
        ['pathRefreshTime', data, { docs: [
            'how frequently to refresh mesh paths',
            '(in milliseconds)',
        ] }],
        ['minDiscoveryTimeout', data, { docs: [
            'minimum length of time to wait',
            'until giving up on a path discovery (in milliseconds)',
        ] }],
        ['hwmpActivePathTimeout', data, { docs: [
            'The time (in TUs) for which mesh',
            'points receiving a PREQ shall consider the forwarding information from',
            'the root to be valid. (TU = time unit)',
        ] }],
        ['hwmpPreqMinInterval', data, { docs: [
            'The minimum interval of time (in',
            'TUs) during which an MP can send only one action frame containing a PREQ',
            'reference element',
        ] }],
        ['hwmpNetDiamTrvsTime', data, { docs: [
            'The interval of time (in TUs)',
            'that it takes for an HWMP information element to propagate across the',
            'mesh',
        ] }],
        ['hwmpRootmode', data, { docs: [
            'whether root mode is enabled or not',
        ] }],
        ['elementTtl', data, { docs: [
            'specifies the value of TTL field set at a',
            'source mesh point for path selection elements.',
        ] }],
        ['hwmpRannInterval', data, { docs: [
            'The interval of time (in TUs) between',
            'root announcements are transmitted.',
        ] }],
        ['gateAnnouncements', data, { docs: [
            'Advertise that this mesh station has',
            'access to a broader network beyond the MBSS.  This is done via Root',
            'Announcement frames.',
        ] }],
        ['hwmpPerrMinInterval', data, { docs: [
            'The minimum interval of time (in',
            'TUs) during which a mesh STA can send only one Action frame containing a',
            'PERR element.',
        ] }],
        ['forwarding', data, { docs: [
            'set Mesh STA as forwarding or non-forwarding',
            'or forwarding entity (default is TRUE - forwarding entity)',
        ] }],
        ['rssiThreshold', data, { docs: [
            'RSSI threshold in dBm. This specifies the',
            'threshold for average signal strength of candidate station to establish',
            'a peer link.',
        ] }],
        ['syncOffsetMaxNeighbor', data, { docs: [
            'maximum number of neighbors',
            'to synchronize to for 11s default synchronization method',
            '(see 11C.12.2.2)',
        ] }],
        ['htOpmode', data, { docs: [
            'set mesh HT protection mode.',
        ] }],
        ['hwmpPathToRootTimeout', data, { docs: [
            'The time (in TUs) for',
            'which mesh STAs receiving a proactive PREQ shall consider the forwarding',
            'information to the root mesh STA to be valid.',
        ] }],
        ['hwmpRootInterval', data, { docs: [
            'The interval of time (in TUs) between',
            'proactive PREQs are transmitted.',
        ] }],
        ['hwmpConfirmationInterval', data, { docs: [
            'The minimum interval of time',
            '(in TUs) during which a mesh STA can send only one Action frame',
            'containing a PREQ element for root path confirmation.',
        ] }],
        ['powerMode', u32, { type: 'MeshPowerMode', docs: [
            'Default mesh power mode for new peer links.',
            'type &enum nl80211_mesh_power_mode (u32)',
        ] }],
        ['awakeWindow', data, { docs: [
            'awake window duration (in TUs)',
        ] }],
        ['plinkTimeout', bool, { docs: [
            "If no tx activity is seen from a STA we've",
            'established peering with for longer than this time (in seconds), then',
            "remove it from the STA's list of peers. You may set this to 0 to disable",
            'the removal of the STA. Default is 30 minutes.',
        ] }],
        ['connectedToGate', flag, { docs: [
            'If set to true then this mesh STA',
            'will advertise that it is connected to a gate in the mesh formation',
            'field.  If left unset then the mesh formation field will only',
            'advertise such if there is an active root mesh path.',
        ] }],
    ]},

    MeshSetupParams: { docs: [
        'mesh setup parameters',
        '',
        'Mesh setup parameters.  These are used to start/join a mesh and cannot be',
        'changed while the mesh is active.',
    ], attrs: [
        ['enableVendorPathSel', flag, { docs: [
            'Enable this option to use a',
            'vendor specific path selection algorithm or disable it to use the',
            'default HWMP.',
        ] }],
        ['enableVendorMetric', flag, { docs: [
            'Enable this option to use a',
            'vendor specific path metric or disable it to use the default Airtime',
            'metric.',
        ] }],
        ['ie', data, { docs: [
            'Information elements for this mesh, for instance, a',
            'robust security network ie, or a vendor specific information element',
            'that vendors will use to identify the path selection methods and',
            'metrics in use.',
        ] }],
        ['userspaceAuth', flag, { docs: [
            'Enable this option if an authentication',
            'daemon will be authenticating mesh candidates.',
        ] }],
        ['userspaceAmpe', flag, { docs: [
            'Enable this option if an authentication',
            'daemon will be securing peer link frames.  AMPE is a secured version of',
            'Mesh Peering Management (MPM) and is implemented with the assistance of',
            'a userspace daemon.  When this flag is set, the kernel will send peer',
            'management frames to a userspace daemon that will implement AMPE',
            'functionality (security capabilities selection, key confirmation, and',
            'key management).  When the flag is unset (default), the kernel can',
            'autonomously complete (unsecured) mesh peering without the need of a',
            'userspace daemon.',
        ] }],
        ['enableVendorSync', u8, { docs: [
            'Enable this option to use a',
            'vendor specific synchronization method or disable it to use the default',
            'neighbor offset synchronization',
        ] }],
        ['userspaceMpm', data, { docs: [
            'Enable this option if userspace will',
            'implement an MPM which handles peer allocation and state.',
        ] }],
        ['authProtocol', u8, { docs: [
            'Inform the kernel of the authentication',
            'method (u8, as defined in IEEE 8.4.2.100.6, e.g. 0x1 for SAE).',
            'Default is no authentication method required.',
        ] }],
    ]},

    Txq: { docs: [
        'TX queue parameter attributes',
    ], attrs: [
        ['ac', data, { type: 'Ac', docs: [
            'AC identifier (NL80211_AC_*)',
        ] }],
        ['txop', data, { docs: [
            'Maximum burst time in units of 32 usecs, 0 meaning',
            'disabled',
        ] }],
        ['cwmin', s16, { docs: [
            'Minimum contention window [a value of the form',
            '2^n-1 in the range 1..32767]',
        ] }],
        ['cwmax', s16, { docs: [
            'Maximum contention window [a value of the form',
            '2^n-1 in the range 1..32767]',
        ] }],
        ['aifs', u8, { docs: [
            'Arbitration interframe space [0..255]',
        ] }],
    ]},

    Ac: { kind: 'enum', values: [
        { value: 0, name: 'VO' },
        { value: 1, name: 'VI' },
        { value: 2, name: 'BE' },
        { value: 3, name: 'BK' },
    ]},

    ChannelType: { kind: 'enum', docs: [
        'channel type',
    ], values: [
        { value: 0, name: 'NO_HT', docs: [
            '20 MHz, non-HT channel',
        ] },
        { value: 1, name: 'HT20', docs: [
            '20 MHz HT channel',
        ] },
        { value: 2, name: 'HT40MINUS', docs: [
            'HT40 channel, secondary channel',
            'below the control channel',
        ] },
        { value: 3, name: 'HT40PLUS', docs: [
            'HT40 channel, secondary channel',
            'above the control channel',
        ] },
    ]},

    KeyMode: { kind: 'enum', docs: [
        'Key mode',
        '',
        'Modes NO_TX and SET_TX can only be selected for unicast keys and when the',
        'driver supports @NL80211_EXT_FEATURE_EXT_KEY_ID:',
    ], values: [
        { value: 0, name: 'RX_TX', docs: [
            '(Default)',
            'Key can be used for Rx and Tx immediately',
        ] },
        { value: 1, name: 'NO_TX', docs: [
            'Only allowed in combination with @NL80211_CMD_NEW_KEY:',
            'Unicast key can only be used for Rx, Tx not allowed, yet',
        ] },
        { value: 2, name: 'SET_TX', docs: [
            'Only allowed in combination with @NL80211_CMD_SET_KEY:',
            'The unicast key identified by idx and mac is cleared for Tx and becomes',
            'the preferred Tx key for the station.',
        ] },
    ]},

    ChannelWidth: { kind: 'enum', docs: [
        'channel width definitions',
        '',
        'These values are used with the %NL80211_ATTR_CHANNEL_WIDTH',
        'attribute.',
    ], values: [
        { value: 0, name: '_20_NOHT', docs: [
            '20 MHz, non-HT channel',
        ] },
        { value: 1, name: '_20', docs: [
            '20 MHz HT channel',
        ] },
        { value: 2, name: '_40', docs: [
            '40 MHz channel, the %NL80211_ATTR_CENTER_FREQ1',
            'attribute must be provided as well',
        ] },
        { value: 3, name: '_80', docs: [
            '80 MHz channel, the %NL80211_ATTR_CENTER_FREQ1',
            'attribute must be provided as well',
        ] },
        { value: 4, name: '_80P80', docs: [
            '80+80 MHz channel, the %NL80211_ATTR_CENTER_FREQ1',
            'and %NL80211_ATTR_CENTER_FREQ2 attributes must be provided as well',
        ] },
        { value: 5, name: '_160', docs: [
            '160 MHz channel, the %NL80211_ATTR_CENTER_FREQ1',
            'attribute must be provided as well',
        ] },
        { value: 6, name: '_5', docs: [
            '5 MHz OFDM channel',
        ] },
        { value: 7, name: '_10', docs: [
            '10 MHz OFDM channel',
        ] },
    ]},

    BssScanWidth: { kind: 'enum', docs: [
        'control channel width for a BSS',
        '',
        'These values are used with the %NL80211_BSS_CHAN_WIDTH attribute.',
    ], values: [
        { value: 0, name: '_20', docs: [
            'control channel is 20 MHz wide or compatible',
        ] },
        { value: 1, name: '_10', docs: [
            'control channel is 10 MHz wide',
        ] },
        { value: 2, name: '_5', docs: [
            'control channel is 5 MHz wide',
        ] },
    ]},

    Bss: { docs: [
        'netlink attributes for a BSS',
    ], attrs: [
        ['bssid', data, { docs: [
            'BSSID of the BSS (6 octets)',
        ] }],
        ['frequency', u32, { docs: [
            'frequency in MHz (u32)',
        ] }],
        ['tsf', u64, { docs: [
            'TSF of the received probe response/beacon (u64)',
            '(if @NL80211_BSS_PRESP_DATA is present then this is known to be',
            'from a probe response, otherwise it may be from the same beacon',
            'that the NL80211_BSS_BEACON_TSF will be from)',
        ] }],
        ['beaconInterval', u16, { docs: [
            'beacon interval of the (I)BSS (u16)',
        ] }],
        ['capability', u16, { docs: [
            'capability field (CPU order, u16)',
        ] }],
        ['informationElements', data, { docs: [
            'binary attribute containing the',
            'raw information elements from the probe response/beacon (bin);',
            'if the %NL80211_BSS_BEACON_IES attribute is present and the data is',
            'different then the IEs here are from a Probe Response frame; otherwise',
            'they are from a Beacon frame.',
            'However, if the driver does not indicate the source of the IEs, these',
            'IEs may be from either frame subtype.',
            'If present, the @NL80211_BSS_PRESP_DATA attribute indicates that the',
            'data here is known to be from a probe response, without any heuristics.',
        ] }],
        ['signalMbm', s32, { docs: [
            'signal strength of probe response/beacon',
            'in mBm (100 * dBm) (s32)',
        ] }],
        ['signalUnspec', u8, { docs: [
            'signal strength of the probe response/beacon',
            'in unspecified units, scaled to 0..100 (u8)',
        ] }],
        ['status', u32, { docs: [
            'status, if this BSS is "used"',
        ] }],
        ['seenMsAgo', u32, { docs: [
            'age of this BSS entry in ms',
        ] }],
        ['beaconIes', data, { docs: [
            'binary attribute containing the raw information',
            'elements from a Beacon frame (bin); not present if no Beacon frame has',
            'yet been received',
        ] }],
        ['chanWidth', u32, { type: 'BssScanWidth', docs: [
            'channel width of the control channel',
            '(u32, enum nl80211_bss_scan_width)',
        ] }],
        ['beaconTsf', u64, { docs: [
            'TSF of the last received beacon (u64)',
            '(not present if no beacon frame has been received yet)',
        ] }],
        ['prespData', flag, { docs: [
            'the data in @NL80211_BSS_INFORMATION_ELEMENTS and',
            '@NL80211_BSS_TSF is known to be from a probe response (flag attribute)',
        ] }],
        ['lastSeenBoottime', u64, { docs: [
            'CLOCK_BOOTTIME timestamp when this entry',
            'was last updated by a received frame. The value is expected to be',
            'accurate to about 10ms. (u64, nanoseconds)',
        ] }],
        ['pad', data, { docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['parentTsf', u64, { docs: [
            'the time at the start of reception of the first',
            'octet of the timestamp field of the last beacon/probe received for',
            'this BSS. The time is the TSF of the BSS specified by',
            '@NL80211_BSS_PARENT_BSSID. (u64).',
        ] }],
        ['parentBssid', data, { docs: [
            'the BSS according to which @NL80211_BSS_PARENT_TSF',
            'is set.',
        ] }],
        ['chainSignal', u8, { docs: [
            'per-chain signal strength of last BSS update.',
            'Contains a nested array of signal strength attributes (u8, dBm),',
            'using the nesting index as the antenna number.',
        ] }],
    ]},

    BssStatus: { kind: 'enum', docs: [
        'BSS "status"',
        '',
        'The BSS status is a BSS attribute in scan dumps, which',
        'indicates the status the interface has wrt. this BSS.',
    ], values: [
        { value: 0, name: 'AUTHENTICATED', docs: [
            'Authenticated with this BSS.',
            'Note that this is no longer used since cfg80211 no longer',
            'keeps track of whether or not authentication was done with',
            'a given BSS.',
        ] },
        { value: 1, name: 'ASSOCIATED', docs: [
            'Associated with this BSS.',
        ] },
        { value: 2, name: 'IBSS_JOINED', docs: [
            'Joined to this IBSS.',
        ] },
    ]},

    AuthType: { kind: 'enum', docs: [
        'AuthenticationType',
    ], values: [
        { value: 0, name: 'OPEN_SYSTEM', docs: [
            'Open System authentication',
        ] },
        { value: 1, name: 'SHARED_KEY', docs: [
            'Shared Key authentication (WEP only)',
        ] },
        { value: 2, name: 'FT', docs: [
            'Fast BSS Transition (IEEE 802.11r)',
        ] },
        { value: 3, name: 'NETWORK_EAP', docs: [
            'Network EAP (some Cisco APs and mainly LEAP)',
        ] },
        { value: 4, name: 'SAE', docs: [
            'Simultaneous authentication of equals',
        ] },
        { value: 5, name: 'FILS_SK', docs: [
            'Fast Initial Link Setup shared key',
        ] },
        { value: 6, name: 'FILS_SK_PFS', docs: [
            'Fast Initial Link Setup shared key with PFS',
        ] },
        { value: 7, name: 'FILS_PK', docs: [
            'Fast Initial Link Setup public key',
        ] },
        { value: 8, name: 'AUTOMATIC', docs: [
            'determine automatically (if necessary by',
            'trying multiple times); this is invalid in netlink -- leave out',
            'the attribute for this on CONNECT commands.',
        ] },
    ]},

    KeyType: { kind: 'enum', docs: [
        'Key Type',
    ], values: [
        { value: 0, name: 'GROUP', docs: [
            'Group (broadcast/multicast) key',
        ] },
        { value: 1, name: 'PAIRWISE', docs: [
            'Pairwise (unicast/individual) key',
        ] },
        { value: 2, name: 'PEERKEY', docs: [
            'PeerKey (DLS)',
        ] },
    ]},

    Mfp: { kind: 'enum', docs: [
        'Management frame protection state',
    ], values: [
        { value: 0, name: 'NO', docs: [
            'Management frame protection not used',
        ] },
        { value: 1, name: 'REQUIRED', docs: [
            'Management frame protection required',
        ] },
        { value: 2, name: 'OPTIONAL', docs: [
            'Management frame protection is optional',
        ] },
    ]},

    WpaVersions: { kind: 'flags', values: [
        { value: 1 << 0, name: '_1' },
        { value: 1 << 1, name: '_2' },
        { value: 1 << 2, name: '_3' },
    ]},

    KeyDefaultTypes: { docs: [
        'key default types',
    ], attrs: [
        ['unicast', flag, { docs: [
            'key should be used as default',
            'unicast key',
        ] }],
        ['multicast', flag, { docs: [
            'key should be used as default',
            'multicast key',
        ] }],
    ]},

    Key: { docs: [
        'key attributes',
    ], attrs: [
        ['data', data, { docs: [
            '(temporal) key data; for TKIP this consists of',
            '16 bytes encryption key followed by 8 bytes each for TX and RX MIC',
            'keys',
        ] }],
        ['idx', u8, { docs: [
            'key ID (u8, 0-3)',
        ] }],
        ['cipher', u32, { docs: [
            'key cipher suite (u32, as defined by IEEE 802.11',
            'section 7.3.2.25.1, e.g. 0x000FAC04)',
        ] }],
        ['seq', data, { docs: [
            'transmit key sequence number (IV/PN) for TKIP and',
            'CCMP keys, each six bytes in little endian',
        ] }],
        ['default', flag, { docs: [
            'flag indicating default key',
        ] }],
        ['defaultMgmt', flag, { docs: [
            'flag indicating default management key',
        ] }],
        ['type', u32, { type: 'KeyType', docs: [
            'the key type from enum nl80211_key_type, if not',
            'specified the default depends on whether a MAC address was',
            'given with the command using the key or not (u32)',
        ] }],
        ['defaultTypes', 'KeyDefaultTypes', { docs: [
            'A nested attribute containing flags',
            'attributes, specifying what a key should be set as default as.',
            'See &enum nl80211_key_default_types.',
        ] }],
        ['mode', data, { type: 'KeyMode', docs: [
            'the mode from enum nl80211_key_mode.',
            'Defaults to @NL80211_KEY_RX_TX.',
        ] }],
    ]},

    TxRate: { docs: [
        'TX rate set attributes',
    ], attrs: [
        ['legacy', data, { docs: [
            'Legacy (non-MCS) rates allowed for TX rate selection',
            'in an array of rates as defined in IEEE 802.11 7.3.2.2 (u8 values with',
            '1 = 500 kbps) but without the IE length restriction (at most',
            '%NL80211_MAX_SUPP_RATES in a single array).',
        ] }],
        ['ht', data, { docs: [
            'HT (MCS) rates allowed for TX rate selection',
            'in an array of MCS numbers.',
        ] }],
        ['vht', data, { docs: [
            'VHT rates allowed for TX rate selection,',
            'see &struct nl80211_txrate_vht',
        ] }],
        ['gi', data, { type: 'TxrateGuardInterval', docs: [
            'configure GI, see &enum nl80211_txrate_gi',
        ] }],
    ]},

    TxrateGuardInterval: { kind: 'enum', values: [
        { value: 0, name: 'DEFAULT_GI' },
        { value: 1, name: 'FORCE_SGI' },
        { value: 2, name: 'FORCE_LGI' },
    ]},

    BandId: { kind: 'enum', docs: [
        'Frequency band',
    ], values: [
        { value: 0, name: '_2GHZ', docs: [
            '2.4 GHz ISM band',
        ] },
        { value: 1, name: '_5GHZ', docs: [
            'around 5 GHz band (4.9 - 5.7 GHz)',
        ] },
        { value: 2, name: '_60GHZ', docs: [
            'around 60 GHz band (58.32 - 69.12 GHz)',
        ] },
        { value: 3, name: '_6GHZ', docs: [
            'around 6 GHz band (5.9 - 7.2 GHz)',
        ] },
    ]},

    PsState: { kind: 'enum', docs: [
        'powersave state',
    ], values: [
        { value: 0, name: 'DISABLED', docs: [
            'powersave is disabled',
        ] },
        { value: 1, name: 'ENABLED', docs: [
            'powersave is enabled',
        ] },
    ]},

    Cqm: { docs: [
        'connection quality monitor attributes',
    ], attrs: [
        ['rssiThold', u32, { docs: [
            'RSSI threshold in dBm. This value specifies',
            'the threshold for the RSSI level at which an event will be sent. Zero',
            'to disable.  Alternatively, if %NL80211_EXT_FEATURE_CQM_RSSI_LIST is',
            'set, multiple values can be supplied as a low-to-high sorted array of',
            'threshold values in dBm.  Events will be sent when the RSSI value',
            'crosses any of the thresholds.',
        ] }],
        ['rssiHyst', u32, { docs: [
            'RSSI hysteresis in dBm. This value specifies',
            'the minimum amount the RSSI level must change after an event before a',
            'new event may be issued (to reduce effects of RSSI oscillation).',
        ] }],
        ['rssiThresholdEvent', u32, { docs: [
            'RSSI threshold event',
        ] }],
        ['pktLossEvent', u32, { docs: [
            'a u32 value indicating that this many',
            'consecutive packets were not acknowledged by the peer',
        ] }],
        ['txeRate', data, { docs: [
            'TX error rate in %. Minimum % of TX failures',
            'during the given %NL80211_ATTR_CQM_TXE_INTVL before an',
            '%NL80211_CMD_NOTIFY_CQM with reported %NL80211_ATTR_CQM_TXE_RATE and',
            '%NL80211_ATTR_CQM_TXE_PKTS is generated.',
        ] }],
        ['txePkts', data, { docs: [
            'number of attempted packets in a given',
            '%NL80211_ATTR_CQM_TXE_INTVL before %NL80211_ATTR_CQM_TXE_RATE is',
            'checked.',
        ] }],
        ['txeIntvl', data, { docs: [
            'interval in seconds. Specifies the periodic',
            'interval in which %NL80211_ATTR_CQM_TXE_PKTS and',
            '%NL80211_ATTR_CQM_TXE_RATE must be satisfied before generating an',
            '%NL80211_CMD_NOTIFY_CQM. Set to 0 to turn off TX error reporting.',
        ] }],
        ['beaconLossEvent', flag, { docs: [
            "flag attribute that's set in a beacon",
            'loss event',
        ] }],
        ['rssiLevel', data, { docs: [
            'the RSSI value in dBm that triggered the',
            'RSSI threshold event.',
        ] }],
    ]},

    CqmRssiThresholdEvent: { kind: 'enum', docs: [
        'RSSI threshold event',
    ], values: [
        { value: 0, name: 'THRESHOLD_EVENT_LOW', docs: [
            'The RSSI level is lower than the',
            'configured threshold',
        ] },
        { value: 1, name: 'THRESHOLD_EVENT_HIGH', docs: [
            'The RSSI is higher than the',
            'configured threshold',
        ] },
        { value: 2, name: 'BEACON_LOSS_EVENT', docs: [
            '(reserved, never sent)',
        ] },
    ]},

    TxPowerSetting: { kind: 'enum', docs: [
        'TX power adjustment',
    ], values: [
        { value: 0, name: 'AUTOMATIC', docs: [
            'automatically determine transmit power',
        ] },
        { value: 1, name: 'LIMITED', docs: [
            'limit TX power by the mBm parameter',
        ] },
        { value: 2, name: 'FIXED', docs: [
            'fix TX power to the mBm parameter',
        ] },
    ]},

    PacketPattern: { docs: [
        'packet pattern attribute',
    ], attrs: [
        ['mask', data, { docs: [
            'pattern mask, must be long enough to have',
            'a bit for each byte in the pattern. The lowest-order bit corresponds',
            'to the first byte of the pattern, but the bytes of the pattern are',
            'in a little-endian-like format, i.e. the 9th byte of the pattern',
            'corresponds to the lowest-order bit in the second byte of the mask.',
            'For example: The match 00:xx:00:00:xx:00:00:00:00:xx:xx:xx (where',
            'xx indicates "don\'t care") would be represented by a pattern of',
            'twelve zero bytes, and a mask of "0xed,0x01".',
            'Note that the pattern matching is done as though frames were not',
            '802.11 frames but 802.3 frames, i.e. the frame is fully unpacked',
            'first (including SNAP header unpacking) and then matched.',
        ] }],
        ['pattern', data, { docs: [
            'the pattern, values where the mask has',
            'a zero bit are ignored',
        ] }],
        ['offset', u32, { docs: [
            'packet offset, pattern is matched after',
            'these fixed number of bytes of received packet',
        ] }],
    ]},

    WowlanTriggers: { docs: [
        'WoWLAN trigger definitions',
        '',
        'These nested attributes are used to configure the wakeup triggers and',
        'to report the wakeup reason(s).',
    ], attrs: [
        ['any', flag, { docs: [
            'wake up on any activity, do not really put',
            'the chip into a special state -- works best with chips that have',
            'support for low-power operation already (flag)',
            'Note that this mode is incompatible with all of the others, if',
            'any others are even supported by the device.',
        ] }],
        ['disconnect', flag, { docs: [
            'wake up on disconnect, the way disconnect',
            'is detected is implementation-specific (flag)',
        ] }],
        ['magicPkt', flag, { docs: [
            'wake up on magic packet (6x 0xff, followed',
            'by 16 repetitions of MAC addr, anywhere in payload) (flag)',
        ] }],
        ['pktPattern', data, { docs: [
            'wake up on the specified packet patterns',
            'which are passed in an array of nested attributes, each nested attribute',
            'defining a with attributes from &struct nl80211_wowlan_trig_pkt_pattern.',
            'Each pattern defines a wakeup packet. Packet offset is associated with',
            'each pattern which is used while matching the pattern. The matching is',
            'done on the MSDU, i.e. as though the packet was an 802.3 packet, so the',
            'pattern matching is done after the packet is converted to the MSDU.',
            '',
            'In %NL80211_ATTR_WOWLAN_TRIGGERS_SUPPORTED, it is a binary attribute',
            'carrying a &struct nl80211_pattern_support.',
            '',
            'When reporting wakeup. it is a u32 attribute containing the 0-based',
            'index of the pattern that caused the wakeup, in the patterns passed',
            'to the kernel when configuring.',
        ] }],
        ['gtkRekeySupported', flag, { docs: [
            'Not a real trigger, and cannot be',
            'used when setting, used only to indicate that GTK rekeying is supported',
            'by the device (flag)',
        ] }],
        ['gtkRekeyFailure', flag, { docs: [
            'wake up on GTK rekey failure (if',
            'done by the device) (flag)',
        ] }],
        ['eapIdentRequest', flag, { docs: [
            'wake up on EAP Identity Request',
            'packet (flag)',
        ] }],
        ['_4wayHandshake', flag, { docs: [
            'wake up on 4-way handshake (flag)',
        ] }],
        ['rfkillRelease', flag, { docs: [
            'wake up when rfkill is released',
            '(on devices that have rfkill in the device) (flag)',
        ] }],
        ['wakeupPkt80211', data, { docs: [
            'For wakeup reporting only, contains',
            'the 802.11 packet that caused the wakeup, e.g. a deauth frame. The frame',
            'may be truncated, the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_80211_LEN',
            'attribute contains the original length.',
        ] }],
        ['wakeupPkt80211Len', data, { docs: [
            'Original length of the 802.11',
            'packet, may be bigger than the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_80211',
            'attribute if the packet was truncated somewhere.',
        ] }],
        ['wakeupPkt8023', data, { docs: [
            'For wakeup reporting only, contains the',
            '802.11 packet that caused the wakeup, e.g. a magic packet. The frame may',
            'be truncated, the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_8023_LEN attribute',
            'contains the original length.',
        ] }],
        ['wakeupPkt8023Len', data, { docs: [
            'Original length of the 802.3',
            'packet, may be bigger than the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_8023',
            'attribute if the packet was truncated somewhere.',
        ] }],
        ['tcpConnection', data, { docs: [
            'TCP connection wake, see DOC section',
            '"TCP connection wakeup" for more details. This is a nested attribute',
            'containing the exact information for establishing and keeping alive',
            'the TCP connection.',
        ] }],
        ['wakeupTcpMatch', flag, { docs: [
            'For wakeup reporting only, the',
            'wakeup packet was received on the TCP connection',
        ] }],
        ['wakeupTcpConnlost', flag, { docs: [
            'For wakeup reporting only, the',
            'TCP connection was lost or failed to be established',
        ] }],
        ['wakeupTcpNomoretokens', flag, { docs: [
            'For wakeup reporting only,',
            'the TCP connection ran out of tokens to use for data to send to the',
            'service',
        ] }],
        ['netDetect', data, { docs: [
            'wake up when a configured network',
            'is detected.  This is a nested attribute that contains the',
            'same attributes used with @NL80211_CMD_START_SCHED_SCAN.  It',
            'specifies how the scan is performed (e.g. the interval, the',
            'channels to scan and the initial delay) as well as the scan',
            'results that will trigger a wake (i.e. the matchsets).  This',
            'attribute is also sent in a response to',
            '@NL80211_CMD_GET_WIPHY, indicating the number of match sets',
            'supported by the driver (u32).',
        ] }],
        ['netDetectResults', array('Message'), { docs: [
            'nested attribute',
            'containing an array with information about what triggered the',
            'wake up.  If no elements are present in the array, it means',
            'that the information is not available.  If more than one',
            'element is present, it means that more than one match',
            'occurred.',
            'Each element in the array is a nested attribute that contains',
            'one optional %NL80211_ATTR_SSID attribute and one optional',
            '%NL80211_ATTR_SCAN_FREQUENCIES attribute.  At least one of',
            'these attributes must be present.  If',
            '%NL80211_ATTR_SCAN_FREQUENCIES contains more than one',
            'frequency, it means that the match occurred in more than one',
            'channel.',
        ] }],
    ]},

    WowlanTcp: { docs: [
        'WoWLAN TCP connection parameters',
    ], attrs: [
        ['srcIpv4', u32, { docs: [
            'source IPv4 address (in network byte order)',
        ] }],
        ['dstIpv4', u32, { docs: [
            'destination IPv4 address',
            '(in network byte order)',
        ] }],
        ['dstMac', data, { docs: [
            'destination MAC address, this is given because',
            'route lookup when configured might be invalid by the time we suspend,',
            'and doing a route lookup when suspending is no longer possible as it',
            'might require ARP querying.',
        ] }],
        ['srcPort', u16, { docs: [
            'source port (u16); optional, if not given a',
            'socket and port will be allocated',
        ] }],
        ['dstPort', u16, { docs: [
            'destination port (u16)',
        ] }],
        ['dataPayload', data, { docs: [
            'data packet payload, at least one byte.',
            'For feature advertising, a u32 attribute holding the maximum length',
            'of the data payload.',
        ] }],
        ['dataPayloadSeq', data, { docs: [
            'data packet sequence configuration',
            '(if desired), a &struct nl80211_wowlan_tcp_data_seq. For feature',
            'advertising it is just a flag',
        ] }],
        ['dataPayloadToken', data, { docs: [
            'data packet token configuration,',
            'see &struct nl80211_wowlan_tcp_data_token and for advertising see',
            '&struct nl80211_wowlan_tcp_data_token_feature.',
        ] }],
        ['dataInterval', u32, { docs: [
            'data interval in seconds, maximum',
            'interval in feature advertising (u32)',
        ] }],
        ['wakePayload', data, { docs: [
            'wake packet payload, for advertising a',
            'u32 attribute holding the maximum length',
        ] }],
        ['wakeMask', data, { docs: [
            'Wake packet payload mask, not used for',
            'feature advertising. The mask works like @NL80211_PKTPAT_MASK',
            'but on the TCP payload only.',
        ] }],
    ]},

    CoalesceRule: { docs: [
        'coalesce rule attribute',
    ], attrs: [
        ['delay', u32, { docs: [
            'delay in msecs used for packet coalescing',
        ] }],
        ['condition', u32, { type: 'CoalesceCondition', docs: [
            'condition for packet coalescence,',
            'see &enum nl80211_coalesce_condition.',
        ] }],
        ['pktPattern', data, { docs: [
            'packet offset, pattern is matched',
            'after these fixed number of bytes of received packet',
        ] }],
    ]},

    CoalesceCondition: { kind: 'enum', docs: [
        'coalesce rule conditions',
    ], values: [
        { value: 0, name: 'MATCH', docs: [
            'coalaesce Rx packets when patterns',
            'in a rule are matched.',
        ] },
        { value: 1, name: 'NO_MATCH', docs: [
            'coalesce Rx packets when patterns',
            'in a rule are not matched.',
        ] },
    ]},

    InterfaceLimit: { docs: [
        'limit attributes',
    ], attrs: [
        ['max', u32, { docs: [
            'maximum number of interfaces that',
            'can be chosen from this set of interface types (u32)',
        ] }],
        ['types', asflags('InterfaceType'), { docs: [
            'nested attribute containing a',
            'flag attribute for each interface type in this set',
        ] }],
    ]},

    InterfaceCombination: { docs: [
        'interface combination attributes',
        '',
        'Examples:',
        'limits = [ #{STA} <= 1, #{AP} <= 1 ], matching BI, channels = 1, max = 2',
        '=> allows an AP and a STA that must match BIs',
        '',
        'numbers = [ #{AP, P2P-GO} <= 8 ], BI min gcd, channels = 1, max = 8,',
        '=> allows 8 of AP/GO that can have BI gcd >= min gcd',
        '',
        'numbers = [ #{STA} <= 2 ], channels = 2, max = 2',
        '=> allows two STAs on different channels',
        '',
        'numbers = [ #{STA} <= 1, #{P2P-client,P2P-GO} <= 3 ], max = 4',
        '=> allows a STA plus three P2P interfaces',
        '',
        'The list of these four possibilities could completely be contained',
        'within the %NL80211_ATTR_INTERFACE_COMBINATIONS attribute to indicate',
        'that any of these groups must match.',
        '',
        '"Combinations" of just a single interface will not be listed here,',
        'a single interface of any valid interface type is assumed to always',
        'be possible by itself. This means that implicitly, for each valid',
        'interface type, the following group always exists:',
        'numbers = [ #{<type>} <= 1 ], channels = 1, max = 1',
    ], attrs: [
        ['limits', array('InterfaceLimit'), { docs: [
            'Nested attributes containing the limits',
            'for given interface types, see &enum nl80211_iface_limit_attrs.',
        ] }],
        ['maxnum', u32, { docs: [
            'u32 attribute giving the total number of',
            "interfaces that can be created in this group. This number doesn't",
            'apply to interfaces purely managed in software, which are listed',
            'in a separate attribute %NL80211_ATTR_INTERFACES_SOFTWARE.',
        ] }],
        ['staApBiMatch', flag, { docs: [
            'flag attribute specifying that',
            'beacon intervals within this group must be all the same even for',
            'infrastructure and AP/GO combinations, i.e. the GO(s) must adopt',
            "the infrastructure network's beacon interval.",
        ] }],
        ['numChannels', u32, { docs: [
            'u32 attribute specifying how many',
            'different channels may be used within this group.',
        ] }],
        ['radarDetectWidths', u32, { type: asflags('ChannelWidth'), docs: [
            'u32 attribute containing the bitmap',
            'of supported channel widths for radar detection.',
        ] }],
        ['radarDetectRegions', u32, { docs: [
            'u32 attribute containing the bitmap',
            'of supported regulatory regions for radar detection.',
        ] }],
        ['biMinGcd', u32, { docs: [
            'u32 attribute specifying the minimum GCD of',
            'different beacon intervals supported by all the interface combinations',
            'in this group (if not present, all beacon intervals be identical).',
        ] }],
    ]},

    PlinkState: { kind: 'enum', docs: [
        'state of a mesh peer link finite state machine',
    ], values: [
        { value: 0, name: 'LISTEN', docs: [
            'initial state, considered the implicit',
            'state of non existent mesh peer links',
        ] },
        { value: 1, name: 'OPN_SNT', docs: [
            'mesh plink open frame has been sent to',
            'this mesh peer',
        ] },
        { value: 2, name: 'OPN_RCVD', docs: [
            'mesh plink open frame has been received',
            'from this mesh peer',
        ] },
        { value: 3, name: 'CNF_RCVD', docs: [
            'mesh plink confirm frame has been',
            'received from this mesh peer',
        ] },
        { value: 4, name: 'ESTAB', docs: [
            'mesh peer link is established',
        ] },
        { value: 5, name: 'HOLDING', docs: [
            'mesh peer link is being closed or cancelled',
        ] },
        { value: 6, name: 'BLOCKED', docs: [
            'all frames transmitted from this mesh',
            'plink are discarded',
        ] },
    ]},

    PlinkAction: { kind: 'enum', docs: [
        'actions to perform in mesh peers',
    ], values: [
        { value: 0, name: 'NO_ACTION', docs: [
            'perform no action',
        ] },
        { value: 1, name: 'OPEN', docs: [
            'start mesh peer link establishment',
        ] },
        { value: 2, name: 'BLOCK', docs: [
            'block traffic from this mesh peer',
        ] },
    ]},

    RekeyData: { docs: [
        'attributes for GTK rekey offload',
    ], attrs: [
        ['kek', data, { docs: [
            'key encryption key (binary)',
        ] }],
        ['kck', data, { docs: [
            'key confirmation key (binary)',
        ] }],
        ['replayCtr', data, { docs: [
            'replay counter (binary)',
        ] }],
    ]},

    HiddenSsid: { kind: 'enum', docs: [
        'values for %NL80211_ATTR_HIDDEN_SSID',
    ], values: [
        { value: 0, name: 'NOT_IN_USE', docs: [
            'do not hide SSID (i.e., broadcast it in',
            'Beacon frames)',
        ] },
        { value: 1, name: 'ZERO_LEN', docs: [
            'hide SSID by using zero-length SSID element',
            'in Beacon frames',
        ] },
        { value: 2, name: 'ZERO_CONTENTS', docs: [
            'hide SSID by using correct length of SSID',
            'element in Beacon frames but zero out each byte in the SSID',
        ] },
    ]},

    StationWme: { docs: [
        'station WME attributes',
    ], attrs: [
        ['uapsdQueues', data, { docs: [
            'bitmap of uapsd queues. the format',
            'is the same as the AC bitmap in the QoS info field.',
        ] }],
        ['maxSp', data, { docs: [
            'max service period. the format is the same',
            'as the MAX_SP field in the QoS info field (but already shifted down).',
        ] }],
    ]},

    PmksaCandidate: { docs: [
        'attributes for PMKSA caching candidates',
    ], attrs: [
        ['index', u32, { docs: [
            'candidate index (u32; the smaller, the higher',
            'priority)',
        ] }],
        ['bssid', data, { docs: [
            'candidate BSSID (6 octets)',
        ] }],
        ['preauth', flag, { docs: [
            'RSN pre-authentication supported (flag)',
        ] }],
    ]},

    TdlsOperation: { kind: 'enum', docs: [
        'values for %NL80211_ATTR_TDLS_OPERATION',
    ], values: [
        { value: 0, name: 'DISCOVERY_REQ', docs: [
            'Send a TDLS discovery request',
        ] },
        { value: 1, name: 'SETUP', docs: [
            'Setup TDLS link',
        ] },
        { value: 2, name: 'TEARDOWN', docs: [
            'Teardown a TDLS link which is already established',
        ] },
        { value: 3, name: 'ENABLE_LINK', docs: [
            'Enable TDLS link',
        ] },
        { value: 4, name: 'DISABLE_LINK', docs: [
            'Disable TDLS link',
        ] },
    ]},

    FeatureFlags: { kind: 'flags', docs: [
        'device/driver features',
    ], values: [
        { value: 1 << 0, name: 'skTxStatus', docs: [
            'This driver supports reflecting back',
            'TX status to the socket error queue when requested with the',
            'socket option.',
        ] },
        { value: 1 << 1, name: 'htIbss', docs: [
            'This driver supports IBSS with HT datarates.',
        ] },
        { value: 1 << 2, name: 'inactivityTimer', docs: [
            'This driver takes care of freeing up',
            'the connected inactive stations in AP mode.',
        ] },
        { value: 1 << 3, name: 'cellBaseRegHints', docs: [
            'This driver has been tested',
            'to work properly to suppport receiving regulatory hints from',
            'cellular base stations.',
        ] },
        { value: 1 << 4, name: 'p2pDeviceNeedsChannel', docs: [
            '(no longer available, only',
            'here to reserve the value for API/ABI compatibility)',
        ] },
        { value: 1 << 5, name: 'sae', docs: [
            'This driver supports simultaneous authentication of',
            'equals (SAE) with user space SME (NL80211_CMD_AUTHENTICATE) in station',
            'mode',
        ] },
        { value: 1 << 6, name: 'lowPriorityScan', docs: [
            'This driver supports low priority scan',
        ] },
        { value: 1 << 7, name: 'scanFlush', docs: [
            'Scan flush is supported',
        ] },
        { value: 1 << 8, name: 'apScan', docs: [
            'Support scanning using an AP vif',
        ] },
        { value: 1 << 9, name: 'vifTxpower', docs: [
            'The driver supports per-vif TX power setting',
        ] },
        { value: 1 << 10, name: 'needObssScan', docs: [
            'The driver expects userspace to perform',
            'OBSS scans and generate 20/40 BSS coex reports. This flag is used only',
            'for drivers implementing the CONNECT API, for AUTH/ASSOC it is implied.',
        ] },
        { value: 1 << 11, name: 'p2pGoCtwin', docs: [
            'P2P GO implementation supports CT Window',
            'setting',
        ] },
        { value: 1 << 12, name: 'p2pGoOppps', docs: [
            'P2P GO implementation supports opportunistic',
            'powersave',
        ] },
        { value: 1 << 14, name: 'advertiseChanLimits', docs: [
            'cfg80211 advertises channel limits',
            '(HT40, VHT 80/160 MHz) if this flag is set',
        ] },
        { value: 1 << 15, name: 'fullApClientState', docs: [
            'The driver supports full state',
            'transitions for AP clients. Without this flag (and if the driver',
            "doesn't have the AP SME in the device) the driver supports adding",
            "stations only when they're associated and adds them in associated",
            'state (to later be transitioned into authorized), with this flag',
            'they should be added before even sending the authentication reply',
            'and then transitioned into authenticated, associated and authorized',
            'states using station flags.',
            'Note that even for drivers that support this, the default is to add',
            'stations in authenticated/associated state, so to add unauthenticated',
            'stations the authenticated/associated bits have to be set in the mask.',
        ] },
        { value: 1 << 16, name: 'userspaceMpm', docs: [
            'This driver supports a userspace Mesh',
            'Peering Management entity which may be implemented by registering for',
            'beacons or NL80211_CMD_NEW_PEER_CANDIDATE events. The mesh beacon is',
            'still generated by the driver.',
        ] },
        { value: 1 << 17, name: 'activeMonitor', docs: [
            'This driver supports an active monitor',
            'interface. An active monitor interface behaves like a normal monitor',
            'interface, but gets added to the driver. It ensures that incoming',
            'unicast packets directed at the configured interface address get ACKed.',
        ] },
        { value: 1 << 18, name: 'apModeChanWidthChange', docs: [
            'This driver supports dynamic',
            'channel bandwidth change (e.g., HT 20 <-> 40 MHz channel) during the',
            'lifetime of a BSS.',
        ] },
        { value: 1 << 19, name: 'dsParamSetIeInProbes', docs: [
            'This device adds a DS Parameter',
            'Set IE to probe requests.',
        ] },
        { value: 1 << 20, name: 'wfaTpcIeInProbes', docs: [
            'This device adds a WFA TPC Report IE',
            'to probe requests.',
        ] },
        { value: 1 << 21, name: 'quiet', docs: [
            'This device, in client mode, supports Quiet Period',
            'requests sent to it by an AP.',
        ] },
        { value: 1 << 22, name: 'txPowerInsertion', docs: [
            'This device is capable of inserting the',
            'current tx power value into the TPC Report IE in the spectrum',
            'management TPC Report action frame, and in the Radio Measurement Link',
            'Measurement Report action frame.',
        ] },
        { value: 1 << 23, name: 'acktoEstimation', docs: [
            'This driver supports dynamic ACK timeout',
            'estimation (dynack). %NL80211_ATTR_WIPHY_DYN_ACK flag attribute is used',
            'to enable dynack.',
        ] },
        { value: 1 << 24, name: 'staticSmps', docs: [
            'Device supports static spatial',
            'multiplexing powersave, ie. can turn off all but one chain',
            'even on HT connections that should be using more chains.',
        ] },
        { value: 1 << 25, name: 'dynamicSmps', docs: [
            'Device supports dynamic spatial',
            'multiplexing powersave, ie. can turn off all but one chain',
            'and then wake the rest up as required after, for example,',
            'rts/cts handshake.',
        ] },
        { value: 1 << 26, name: 'supportsWmmAdmission', docs: [
            'the device supports setting up WMM',
            'TSPEC sessions (TID aka TSID 0-7) with the %NL80211_CMD_ADD_TX_TS',
            'command. Standard IEEE 802.11 TSPEC setup is not yet supported, it',
            'needs to be able to handle Block-Ack agreements and other things.',
        ] },
        { value: 1 << 27, name: 'macOnCreate', docs: [
            'Device supports configuring',
            "the vif's MAC address upon creation.",
            "See 'macaddr' field in the vif_params (cfg80211.h).",
        ] },
        { value: 1 << 28, name: 'tdlsChannelSwitch', docs: [
            'Driver supports channel switching when',
            'operating as a TDLS peer.',
        ] },
        { value: 1 << 29, name: 'scanRandomMacAddr', docs: [
            'This device/driver supports using a',
            'random MAC address during scan (if the device is unassociated); the',
            '%NL80211_SCAN_FLAG_RANDOM_ADDR flag may be set for scans and the MAC',
            'address mask/value will be used.',
        ] },
        { value: 1 << 30, name: 'schedScanRandomMacAddr', docs: [
            'This device/driver supports',
            'using a random MAC address for every scan iteration during scheduled',
            'scan (while not associated), the %NL80211_SCAN_FLAG_RANDOM_ADDR may',
            'be set for scheduled scan and the MAC address mask/value will be used.',
        ] },
        { value: 1 << 31, name: 'ndRandomMacAddr', docs: [
            'This device/driver supports using a',
            'random MAC address for every scan iteration during "net detect", i.e.',
            'scan in unassociated WoWLAN, the %NL80211_SCAN_FLAG_RANDOM_ADDR may',
            'be set for scheduled scan and the MAC address mask/value will be used.',
        ] },
    ]},

    ExtendedFeatureIndex: { kind: 'enum', docs: [
        'bit index of extended features.',
    ], values: [
        { value: 0, name: 'VHT_IBSS', docs: [
            'This driver supports IBSS with VHT datarates.',
        ] },
        { value: 1, name: 'RRM', docs: [
            'This driver supports RRM. When featured, user can',
            'can request to use RRM (see %NL80211_ATTR_USE_RRM) with',
            '%NL80211_CMD_ASSOCIATE and %NL80211_CMD_CONNECT requests, which will set',
            'the ASSOC_REQ_USE_RRM flag in the association request even if',
            'NL80211_FEATURE_QUIET is not advertized.',
        ] },
        { value: 2, name: 'MU_MIMO_AIR_SNIFFER', docs: [
            'This device supports MU-MIMO air',
            'sniffer which means that it can be configured to hear packets from',
            'certain groups which can be configured by the',
            '%NL80211_ATTR_MU_MIMO_GROUP_DATA attribute,',
            'or can be configured to follow a station by configuring the',
            '%NL80211_ATTR_MU_MIMO_FOLLOW_MAC_ADDR attribute.',
        ] },
        { value: 3, name: 'SCAN_START_TIME', docs: [
            'This driver includes the actual',
            'time the scan started in scan results event. The time is the TSF of',
            'the BSS that the interface that requested the scan is connected to',
            '(if available).',
        ] },
        { value: 4, name: 'BSS_PARENT_TSF', docs: [
            'Per BSS, this driver reports the',
            'time the last beacon/probe was received. The time is the TSF of the',
            'BSS that the interface that requested the scan is connected to',
            '(if available).',
        ] },
        { value: 5, name: 'SET_SCAN_DWELL', docs: [
            'This driver supports configuration of',
            'channel dwell time.',
        ] },
        { value: 6, name: 'BEACON_RATE_LEGACY', docs: [
            'Driver supports beacon rate',
            'configuration (AP/mesh), supporting a legacy (non HT/VHT) rate.',
        ] },
        { value: 7, name: 'BEACON_RATE_HT', docs: [
            'Driver supports beacon rate',
            'configuration (AP/mesh) with HT rates.',
        ] },
        { value: 8, name: 'BEACON_RATE_VHT', docs: [
            'Driver supports beacon rate',
            'configuration (AP/mesh) with VHT rates.',
        ] },
        { value: 9, name: 'FILS_STA', docs: [
            'This driver supports Fast Initial Link Setup',
            'with user space SME (NL80211_CMD_AUTHENTICATE) in station mode.',
        ] },
        { value: 10, name: 'MGMT_TX_RANDOM_TA', docs: [
            'This driver supports randomized TA',
            'in @NL80211_CMD_FRAME while not associated.',
        ] },
        { value: 11, name: 'MGMT_TX_RANDOM_TA_CONNECTED', docs: [
            'This driver supports',
            'randomized TA in @NL80211_CMD_FRAME while associated.',
        ] },
        { value: 12, name: 'SCHED_SCAN_RELATIVE_RSSI', docs: [
            'The driver supports sched_scan',
            'for reporting BSSs with better RSSI than the current connected BSS',
            '(%NL80211_ATTR_SCHED_SCAN_RELATIVE_RSSI).',
        ] },
        { value: 13, name: 'CQM_RSSI_LIST', docs: [
            'With this driver the',
            '%NL80211_ATTR_CQM_RSSI_THOLD attribute accepts a list of zero or more',
            'RSSI threshold values to monitor rather than exactly one threshold.',
        ] },
        { value: 14, name: 'FILS_SK_OFFLOAD', docs: [
            'Driver SME supports FILS shared key',
            'authentication with %NL80211_CMD_CONNECT.',
        ] },
        { value: 15, name: '_4WAY_HANDSHAKE_STA_PSK', docs: [
            'Device wants to do 4-way',
            'handshake with PSK in station mode (PSK is passed as part of the connect',
            'and associate commands), doing it in the host might not be supported.',
        ] },
        { value: 16, name: '_4WAY_HANDSHAKE_STA_1X', docs: [
            'Device wants to do doing 4-way',
            'handshake with 802.1X in station mode (will pass EAP frames to the host',
            'and accept the set_pmk/del_pmk commands), doing it in the host might not',
            'be supported.',
        ] },
        { value: 17, name: 'FILS_MAX_CHANNEL_TIME', docs: [
            'Driver is capable of overriding',
            'the max channel attribute in the FILS request params IE with the',
            'actual dwell time.',
        ] },
        { value: 18, name: 'ACCEPT_BCAST_PROBE_RESP', docs: [
            'Driver accepts broadcast probe',
            'response',
        ] },
        { value: 19, name: 'OCE_PROBE_REQ_HIGH_TX_RATE', docs: [
            'Driver supports sending',
            'the first probe request in each channel at rate of at least 5.5Mbps.',
        ] },
        { value: 20, name: 'OCE_PROBE_REQ_DEFERRAL_SUPPRESSION', docs: [
            'Driver supports',
            'probe request tx deferral and suppression',
        ] },
        { value: 21, name: 'MFP_OPTIONAL', docs: [
            'Driver supports the %NL80211_MFP_OPTIONAL',
            'value in %NL80211_ATTR_USE_MFP.',
        ] },
        { value: 22, name: 'LOW_SPAN_SCAN', docs: [
            'Driver supports low span scan.',
        ] },
        { value: 23, name: 'LOW_POWER_SCAN', docs: [
            'Driver supports low power scan.',
        ] },
        { value: 24, name: 'HIGH_ACCURACY_SCAN', docs: [
            'Driver supports high accuracy scan.',
        ] },
        { value: 25, name: 'DFS_OFFLOAD', docs: [
            'HW/driver will offload DFS actions.',
            'Device or driver will do all DFS-related actions by itself,',
            'informing user-space about CAC progress, radar detection event,',
            'channel change triggered by radar detection event.',
            'No need to start CAC from user-space, no need to react to',
            '"radar detected" event.',
        ] },
        { value: 26, name: 'CONTROL_PORT_OVER_NL80211', docs: [
            'Driver supports sending and',
            'receiving control port frames over nl80211 instead of the netdevice.',
        ] },
        { value: 27, name: 'ACK_SIGNAL_SUPPORT', docs: [
            'This driver/device supports',
            '(average) ACK signal strength reporting.',
        ] },
        { value: 28, name: 'TXQS', docs: [
            'Driver supports FQ-CoDel-enabled intermediate',
            'TXQs.',
        ] },
        { value: 29, name: 'SCAN_RANDOM_SN', docs: [
            'Driver/device supports randomizing the',
            'SN in probe request frames if requested by %NL80211_SCAN_FLAG_RANDOM_SN.',
        ] },
        { value: 30, name: 'SCAN_MIN_PREQ_CONTENT', docs: [
            'Driver/device can omit all data',
            'except for supported rates from the probe request content if requested',
            'by the %NL80211_SCAN_FLAG_MIN_PREQ_CONTENT flag.',
        ] },
        { value: 31, name: 'CAN_REPLACE_PTK0', docs: [
            'Driver/device confirm that they are',
            'able to rekey an in-use key correctly. Userspace must not rekey PTK keys',
            'if this flag is not set. Ignoring this can leak clear text packets and/or',
            'freeze the connection.',
        ] },
        { value: 32, name: 'ENABLE_FTM_RESPONDER', docs: [
            'Driver supports enabling fine',
            'timing measurement responder role.',
        ] },
        { value: 33, name: 'AIRTIME_FAIRNESS', docs: [
            'Driver supports getting airtime',
            'fairness for transmitted packets and has enabled airtime fairness',
            'scheduling.',
        ] },
        { value: 34, name: 'AP_PMKSA_CACHING', docs: [
            'Driver/device supports PMKSA caching',
            '(set/del PMKSA operations) in AP mode.',
        ] },
        { value: 35, name: 'SCHED_SCAN_BAND_SPECIFIC_RSSI_THOLD', docs: [
            'Driver supports',
            'filtering of sched scan results using band specific RSSI thresholds.',
        ] },
        { value: 36, name: 'EXT_KEY_ID', docs: [
            'Driver supports "Extended Key ID for',
            'Individually Addressed Frames" from IEEE802.11-2016.',
        ] },
        { value: 37, name: 'STA_TX_PWR', docs: [
            'This driver supports controlling tx power',
            'to a station.',
        ] },
        { value: 38, name: 'SAE_OFFLOAD', docs: [
            'Device wants to do SAE authentication in',
            'station mode (SAE password is passed as part of the connect command).',
        ] },
        { value: 39, name: 'VLAN_OFFLOAD', docs: [
            'The driver supports a single netdev',
            'with VLAN tagged frames and separate VLAN-specific netdevs added using',
            'vconfig similarly to the Ethernet case.',
        ] },
    ]},

    ProbeResponseOffloadSupport: { kind: 'flags', docs: [
        'optional supported',
        'protocols for probe-response offloading by the driver/FW.',
        'To be used with the %NL80211_ATTR_PROBE_RESP_OFFLOAD attribute.',
        'Each enum value represents a bit in the bitmap of supported',
        'protocols. Typically a subset of probe-requests belonging to a',
        'supported protocol will be excluded from offload and uploaded',
        'to the host.',
    ], values: [
        { value: 1<<0, name: 'wps', docs: [
            'Support for WPS ver. 1',
        ] },
        { value: 1<<1, name: 'wps2', docs: [
            'Support for WPS ver. 2',
        ] },
        { value: 1<<2, name: 'p2p', docs: [
            'Support for P2P',
        ] },
        { value: 1<<3, name: '_80211u', docs: [
            'Support for 802.11u',
        ] },
    ]},

    ConnectFailedReason: { kind: 'enum', docs: [
        'connection request failed reasons',
    ], values: [
        { value: 0, name: 'MAX_CLIENTS', docs: [
            'Maximum number of clients that can be',
            'handled by the AP is reached.',
        ] },
        { value: 1, name: 'BLOCKED_CLIENT', docs: [
            'Connection request is rejected due to ACL.',
        ] },
    ]},

    TimeoutReason: { kind: 'enum', docs: [
        'timeout reasons',
    ], values: [
        { value: 0, name: 'UNSPECIFIED', docs: [
            'Timeout reason unspecified.',
        ] },
        { value: 1, name: 'SCAN', docs: [
            'Scan (AP discovery) timed out.',
        ] },
        { value: 2, name: 'AUTH', docs: [
            'Authentication timed out.',
        ] },
        { value: 3, name: 'ASSOC', docs: [
            'Association timed out.',
        ] },
    ]},

    ScanFlags: { kind: 'flags', docs: [
        'scan request control flags',
        '',
        'Scan request control flags are used to control the handling',
        'of NL80211_CMD_TRIGGER_SCAN and NL80211_CMD_START_SCHED_SCAN',
        'requests.',
        '',
        'NL80211_SCAN_FLAG_LOW_SPAN, NL80211_SCAN_FLAG_LOW_POWER, and',
        'NL80211_SCAN_FLAG_HIGH_ACCURACY flags are exclusive of each other, i.e., only',
        'one of them can be used in the request.',
    ], values: [
        { value: 1<<0, name: 'lowPriority', docs: [
            'scan request has low priority',
        ] },
        { value: 1<<1, name: 'flush', docs: [
            'flush cache before scanning',
        ] },
        { value: 1<<2, name: 'ap', docs: [
            'force a scan even if the interface is configured',
            'as AP and the beaconing has already been configured. This attribute is',
            'dangerous because will destroy stations performance as a lot of frames',
            'will be lost while scanning off-channel, therefore it must be used only',
            'when really needed',
        ] },
        { value: 1<<3, name: 'randomAddr', docs: [
            'use a random MAC address for this scan (or',
            'for scheduled scan: a different one for every scan iteration). When the',
            'flag is set, depending on device capabilities the @NL80211_ATTR_MAC and',
            '@NL80211_ATTR_MAC_MASK attributes may also be given in which case only',
            'the masked bits will be preserved from the MAC address and the remainder',
            'randomised. If the attributes are not given full randomisation (46 bits,',
            'locally administered 1, multicast 0) is assumed.',
            "This flag must not be requested when the feature isn't supported, check",
            'the nl80211 feature flags for the device.',
        ] },
        { value: 1<<4, name: 'filsMaxChannelTime', docs: [
            'fill the dwell time in the FILS',
            'request parameters IE in the probe request',
        ] },
        { value: 1<<5, name: 'acceptBcastProbeResp', docs: [
            'accept broadcast probe responses',
        ] },
        { value: 1<<6, name: 'oceProbeReqHighTxRate', docs: [
            'send probe request frames at',
            'rate of at least 5.5M. In case non OCE AP is discovered in the channel,',
            'only the first probe req in the channel will be sent in high rate.',
        ] },
        { value: 1<<7, name: 'oceProbeReqDeferralSuppression', docs: [
            'allow probe request',
            'tx deferral (dot11FILSProbeDelay shall be set to 15ms)',
            'and suppression (if it has received a broadcast Probe Response frame,',
            'Beacon frame or FILS Discovery frame from an AP that the STA considers',
            'a suitable candidate for (re-)association - suitable in terms of',
            'SSID and/or RSSI.',
        ] },
        { value: 1<<8, name: 'lowSpan', docs: [
            'Span corresponds to the total time taken to',
            'accomplish the scan. Thus, this flag intends the driver to perform the',
            'scan request with lesser span/duration. It is specific to the driver',
            'implementations on how this is accomplished. Scan accuracy may get',
            'impacted with this flag.',
        ] },
        { value: 1<<9, name: 'lowPower', docs: [
            'This flag intends the scan attempts to consume',
            'optimal possible power. Drivers can resort to their specific means to',
            'optimize the power. Scan accuracy may get impacted with this flag.',
        ] },
        { value: 1<<10, name: 'highAccuracy', docs: [
            'Accuracy here intends to the extent of scan',
            'results obtained. Thus HIGH_ACCURACY scan flag aims to get maximum',
            'possible scan results. This flag hints the driver to use the best',
            'possible scan configuration to improve the accuracy in scanning.',
            'Latency and power use may get impacted with this flag.',
        ] },
        { value: 1<<11, name: 'randomSn', docs: [
            'randomize the sequence number in probe',
            'request frames from this scan to avoid correlation/tracking being',
            'possible.',
        ] },
        { value: 1<<12, name: 'minPreqContent', docs: [
            'minimize probe request content to',
            'only have supported rates and no additional capabilities (unless',
            'added by userspace explicitly.)',
        ] },
    ]},

    AclPolicy: { kind: 'enum', docs: [
        'access control policy',
        '',
        'Access control policy is applied on a MAC list set by',
        '%NL80211_CMD_START_AP and %NL80211_CMD_SET_MAC_ACL, to',
        'be used with %NL80211_ATTR_ACL_POLICY.',
    ], values: [
        { value: 0, name: 'ACCEPT_UNLESS_LISTED', docs: [
            'Deny stations which are',
            'listed in ACL, i.e. allow all the stations which are not listed',
            'in ACL to authenticate.',
        ] },
        { value: 1, name: 'DENY_UNLESS_LISTED', docs: [
            'Allow the stations which are listed',
            'in ACL, i.e. deny all the stations which are not listed in ACL.',
        ] },
    ]},

    SmpsMode: { kind: 'enum', docs: [
        'SMPS mode',
        '',
        'Requested SMPS mode (for AP mode)',
    ], values: [
        { value: 0, name: 'OFF', docs: [
            'SMPS off (use all antennas).',
        ] },
        { value: 1, name: 'STATIC', docs: [
            'static SMPS (use a single antenna)',
        ] },
        { value: 2, name: 'DYNAMIC', docs: [
            'dynamic smps (start with a single antenna and',
            'turn on other antennas after CTS/RTS).',
        ] },
    ]},

    RadarEvent: { kind: 'enum', docs: [
        'type of radar event for DFS operation',
        '',
        'Type of event to be used with NL80211_ATTR_RADAR_EVENT to inform userspace',
        'about detected radars or success of the channel available check (CAC)',
    ], values: [
        { value: 0, name: 'DETECTED', docs: [
            'A radar pattern has been detected. The channel is',
            'now unusable.',
        ] },
        { value: 1, name: 'CAC_FINISHED', docs: [
            'Channel Availability Check has been finished,',
            'the channel is now available.',
        ] },
        { value: 2, name: 'CAC_ABORTED', docs: [
            'Channel Availability Check has been aborted, no',
            'change to the channel status.',
        ] },
        { value: 3, name: 'NOP_FINISHED', docs: [
            'The Non-Occupancy Period for this channel is',
            'over, channel becomes usable.',
        ] },
        { value: 4, name: 'PRE_CAC_EXPIRED', docs: [
            'Channel Availability Check done on this',
            'non-operating channel is expired and no longer valid. New CAC must',
            'be done on this channel before starting the operation. This is not',
            'applicable for ETSI dfs domain where pre-CAC is valid for ever.',
        ] },
        { value: 5, name: 'CAC_STARTED', docs: [
            'Channel Availability Check has been started,',
            'should be generated by HW if NL80211_EXT_FEATURE_DFS_OFFLOAD is enabled.',
        ] },
    ]},

    DfsState: { kind: 'enum', docs: [
        'DFS states for channels',
        '',
        'Channel states used by the DFS code.',
    ], values: [
        { value: 0, name: 'USABLE', docs: [
            'The channel can be used, but channel availability',
            'check (CAC) must be performed before using it for AP or IBSS.',
        ] },
        { value: 1, name: 'UNAVAILABLE', docs: [
            'A radar has been detected on this channel, it',
            'is therefore marked as not available.',
        ] },
        { value: 2, name: 'AVAILABLE', docs: [
            'The channel has been CAC checked and is available.',
        ] },
    ]},

    ProtocolFeatures: { kind: 'flags', docs: [
        'nl80211 protocol features',
    ], values: [
        { value: 1 << 0, name: 'phyDump', docs: [
            'nl80211 supports splitting',
            'wiphy dumps (if requested by the application with the attribute',
            '%NL80211_ATTR_SPLIT_WIPHY_DUMP. Also supported is filtering the',
            'wiphy dump by %NL80211_ATTR_WIPHY, %NL80211_ATTR_IFINDEX or',
            '%NL80211_ATTR_WDEV.',
        ] },
    ]},

    CritProtoId: { kind: 'enum', docs: [
        'nl80211 critical protocol identifiers',
    ], values: [
        { value: 0, name: 'DHCP', docs: [
            'BOOTP or DHCPv6 protocol.',
        ] },
        { value: 1, name: 'EAPOL', docs: [
            'EAPOL protocol.',
        ] },
        { value: 2, name: 'APIPA', docs: [
            'APIPA protocol.',
        ] },
    ]},

    RxmgmtFlags: { kind: 'flags', docs: [
        'flags for received management frame.',
        '',
        'Used by cfg80211_rx_mgmt()',
    ], values: [
        { value: 1 << 0, name: 'answered', docs: [
            'frame was answered by device/driver.',
        ] },
        { value: 1 << 1, name: 'externalAuth', docs: [
            'Host driver intends to offload',
            'the authentication. Exclusively defined for host drivers that',
            'advertises the SME functionality but would like the userspace',
            'to handle certain authentication algorithms (e.g. SAE).',
        ] },
    ]},

    TdlsPeerCapability: { kind: 'flags', docs: [
        'TDLS peer flags.',
        '',
        'Used by tdls_mgmt() to determine which conditional elements need',
        'to be added to TDLS Setup frames.',
    ], values: [
        { value: 1<<0, name: 'ht', docs: [
            'TDLS peer is HT capable.',
        ] },
        { value: 1<<1, name: 'vht', docs: [
            'TDLS peer is VHT capable.',
        ] },
        { value: 1<<2, name: 'wmm', docs: [
            'TDLS peer is WMM capable.',
        ] },
    ]},

    ScheduledScanPlan: { docs: [
        'scanning plan for scheduled scan',
    ], attrs: [
        ['nterval', u32, { docs: [
            'interval between scan iterations. In',
            'seconds (u32).',
        ] }],
        ['terations', u32, { docs: [
            'number of scan iterations in this',
            'scan plan (u32). The last scan plan must not specify this attribute',
            'because it will run infinitely. A value of zero is invalid as it will',
            'make the scan plan meaningless.',
        ] }],
    ]},

    BssSelect: { docs: [
        'attributes for bss selection.',
        '',
        'One and only one of these attributes are found within %NL80211_ATTR_BSS_SELECT',
        'for %NL80211_CMD_CONNECT. It specifies the required BSS selection behaviour',
        'which the driver shall use.',
    ], attrs: [
        ['rssi', flag, { docs: [
            'Flag indicating only RSSI-based BSS selection',
            'is requested.',
        ] }],
        ['bandPref', u32, { type: 'BandId', docs: [
            'attribute indicating BSS',
            'selection should be done such that the specified band is preferred.',
            'When there are multiple BSS-es in the preferred band, the driver',
            'shall use RSSI-based BSS selection as a second step. The value of',
            'this attribute is according to &enum nl80211_band (u32).',
        ] }],
        ['rssiAdjust', data, { docs: [
            'When present the RSSI level for',
            'BSS-es in the specified band is to be adjusted before doing',
            'RSSI-based BSS selection. The attribute value is a packed structure',
            'value as specified by &struct nl80211_bss_select_rssi_adjust.',
        ] }],
    ]},

    NanFunctionType: { kind: 'enum', docs: [
        'NAN function type',
        '',
        'Defines the function type of a NAN function',
    ], values: [
        { value: 0, name: 'PUBLISH', docs: [
            'function is publish',
        ] },
        { value: 1, name: 'SUBSCRIBE', docs: [
            'function is subscribe',
        ] },
        { value: 2, name: 'FOLLOW_UP', docs: [
            'function is follow-up',
        ] },
    ]},

    NanPublishType: { kind: 'flags', docs: [
        'NAN publish tx type',
        '',
        'Defines how to send publish Service Discovery Frames',
    ], values: [
        { value: 1 << 0, name: 'solicitedPublish', docs: [
            'publish function is solicited',
        ] },
        { value: 1 << 1, name: 'unsolicitedPublish', docs: [
            'publish function is unsolicited',
        ] },
    ]},

    NanFunctionTerminationReason: { kind: 'enum', docs: [
        'NAN functions termination reason',
        '',
        'Defines termination reasons of a NAN function',
    ], values: [
        { value: 0, name: 'USER_REQUEST', docs: [
            'requested by user',
        ] },
        { value: 1, name: 'TTL_EXPIRED', docs: [
            'timeout',
        ] },
        { value: 2, name: 'ERROR', docs: [
            'errored',
        ] },
    ]},

    NanFunction: { docs: [
        'NAN function attributes',
    ], attrs: [
        ['type', u8, { type: 'NanFunctionType', docs: [
            '&enum nl80211_nan_function_type (u8).',
        ] }],
        ['serviceId', data, { docs: [
            '6 bytes of the service ID hash as',
            'specified in NAN spec. This is a binary attribute.',
        ] }],
        ['publishType', u8, { type: 'NanPublishType', docs: [
            "relevant if the function's type is",
            'publish. Defines the transmission type for the publish Service Discovery',
            'Frame, see &enum nl80211_nan_publish_type. Its type is u8.',
        ] }],
        ['publishBcast', flag, { docs: [
            'relevant if the function is a solicited',
            'publish. Should the solicited publish Service Discovery Frame be sent to',
            'the NAN Broadcast address. This is a flag.',
        ] }],
        ['subscribeActive', flag, { docs: [
            "relevant if the function's type is",
            'subscribe. Is the subscribe active. This is a flag.',
        ] }],
        ['followUpId', u8, { docs: [
            "relevant if the function's type is follow up.",
            'The instance ID for the follow up Service Discovery Frame. This is u8.',
        ] }],
        ['followUpReqId', u8, { docs: [
            "relevant if the function's type",
            'is follow up. This is a u8.',
            'The requestor instance ID for the follow up Service Discovery Frame.',
        ] }],
        ['followUpDest', data, { docs: [
            'the MAC address of the recipient of the',
            'follow up Service Discovery Frame. This is a binary attribute.',
        ] }],
        ['closeRange', flag, { docs: [
            'is this function limited for devices in a',
            'close range. The range itself (RSSI) is defined by the device.',
            'This is a flag.',
        ] }],
        ['ttl', u32, { docs: [
            'strictly positive number of DWs this function should',
            'stay active. If not present infinite TTL is assumed. This is a u32.',
        ] }],
        ['serviceInfo', data, { docs: [
            'array of bytes describing the service',
            'specific info. This is a binary attribute.',
        ] }],
        ['srf', 'NanSrf', { docs: [
            'Service Receive Filter. This is a nested attribute.',
            'See &enum nl80211_nan_srf_attributes.',
        ] }],
        ['rxMatchFilter', data, { docs: [
            'Receive Matching filter. This is a nested',
            'attribute. It is a list of binary values.',
        ] }],
        ['txMatchFilter', data, { docs: [
            'Transmit Matching filter. This is a',
            'nested attribute. It is a list of binary values.',
        ] }],
        ['instanceId', u8, { docs: [
            'The instance ID of the function.',
            'Its type is u8 and it cannot be 0.',
        ] }],
        ['termReason', u8, { type: 'NanFunctionTerminationReason', docs: [
            'NAN function termination reason.',
            'See &enum nl80211_nan_func_term_reason.',
        ] }],
    ]},

    NanSrf: { docs: [
        'NAN Service Response filter attributes',
    ], attrs: [
        ['include', flag, { docs: [
            'present if the include bit of the SRF set.',
            'This is a flag.',
        ] }],
        ['bf', data, { docs: [
            'Bloom Filter. Present if and only if',
            "%NL80211_NAN_SRF_MAC_ADDRS isn't present. This attribute is binary.",
        ] }],
        ['bfIdx', u8, { docs: [
            'index of the Bloom Filter. Mandatory if',
            '%NL80211_NAN_SRF_BF is present. This is a u8.',
        ] }],
        ['macAddrs', data, { docs: [
            'list of MAC addresses for the SRF. Present if',
            "and only if %NL80211_NAN_SRF_BF isn't present. This is a nested",
            'attribute. Each nested attribute is a MAC address.',
        ] }],
    ]},

    NanMatch: { docs: [
        'NAN match attributes',
    ], attrs: [
        ['local', 'NanFunction', { docs: [
            'the local function that had the',
            'match. This is a nested attribute.',
            'See &enum nl80211_nan_func_attributes.',
        ] }],
        ['peer', 'NanFunction', { docs: [
            'the peer function',
            'that caused the match. This is a nested attribute.',
            'See &enum nl80211_nan_func_attributes.',
        ] }],
    ]},

    ExternalAuthAction: { kind: 'enum', docs: [
        'Action to perform with external',
        'authentication request. Used by NL80211_ATTR_EXTERNAL_AUTH_ACTION.',
    ], values: [
        { value: 0, name: 'START', docs: [
            'Start the authentication.',
        ] },
        { value: 1, name: 'ABORT', docs: [
            'Abort the ongoing authentication.',
        ] },
    ]},

    FtmResponder: { docs: [
        'fine timing measurement',
        'responder attributes',
    ], attrs: [
        ['enabled', data, { docs: [
            'FTM responder is enabled',
        ] }],
        ['lci', data, { docs: [
            'The content of Measurement Report Element',
            '(9.4.2.22 in 802.11-2016) with type 8 - LCI (9.4.2.22.10),',
            'i.e. starting with the measurement token',
        ] }],
        ['civicloc', data, { docs: [
            'The content of Measurement Report Element',
            '(9.4.2.22 in 802.11-2016) with type 11 - Civic (Section 9.4.2.22.13),',
            'i.e. starting with the measurement token',
        ] }],
    ]},

    FtmResponderStats: { docs: [
        'FTM responder statistics',
        '',
        'These attribute types are used with %NL80211_ATTR_FTM_RESPONDER_STATS',
        'when getting FTM responder statistics.',
    ], attrs: [
        ['successNum', u32, { docs: [
            'number of FTM sessions in which all frames',
            'were ssfully answered (u32)',
        ] }],
        ['partialNum', u32, { docs: [
            'number of FTM sessions in which part of the',
            'frames were successfully answered (u32)',
        ] }],
        ['failedNum', u32, { docs: [
            'number of failed FTM sessions (u32)',
        ] }],
        ['asapNum', u32, { docs: [
            'number of ASAP sessions (u32)',
        ] }],
        ['nonAsapNum', u32, { docs: [
            'number of non-ASAP sessions (u32)',
        ] }],
        ['totalDurationMsec', u64, { docs: [
            'total sessions durations - gives an',
            'indication of how much time the responder was busy (u64, msec)',
        ] }],
        ['unknownTriggersNum', u32, { docs: [
            'number of unknown FTM triggers -',
            "triggers from initiators that didn't finish successfully the negotiation",
            'phase with the responder (u32)',
        ] }],
        ['rescheduleRequestsNum', u32, { docs: [
            'number of FTM reschedule requests',
            '- initiator asks for a new scheduling although it already has scheduled',
            'FTM slot (u32)',
        ] }],
        ['outOfWindowTriggersNum', u32, { docs: [
            'number of FTM triggers out of',
            'scheduled window (u32)',
        ] }],
        ['pad', data, { docs: [
            'used for padding, ignore',
        ] }],
    ]},

    Preamble: { kind: 'enum', docs: [
        'frame preamble types',
    ], values: [
        { value: 0, name: 'LEGACY', docs: [
            'legacy (HR/DSSS, OFDM, ERP PHY) preamble',
        ] },
        { value: 1, name: 'HT', docs: [
            'HT preamble',
        ] },
        { value: 2, name: 'VHT', docs: [
            'VHT preamble',
        ] },
        { value: 3, name: 'DMG', docs: [
            'DMG preamble',
        ] },
    ]},

    PeerMeasurementType: { kind: 'enum', docs: [
        'peer measurement types',
    ], values: [
        { value: 0, name: 'INVALID', docs: [
            'invalid/unused, needed as we use',
            'these numbers also for attributes',
        ] },
        { value: 1, name: 'FTM', docs: [
            'flight time measurement',
        ] },
    ]},

    PeerMeasurementStatus: { kind: 'enum', docs: [
        'peer measurement status',
    ], values: [
        { value: 0, name: 'SUCCESS', docs: [
            'measurement completed successfully',
        ] },
        { value: 1, name: 'REFUSED', docs: [
            'measurement was locally refused',
        ] },
        { value: 2, name: 'TIMEOUT', docs: [
            'measurement timed out',
        ] },
        { value: 3, name: 'FAILURE', docs: [
            'measurement failed, a type-dependent',
            'reason may be available in the response data',
        ] },
    ]},

    PeerMeasurementRequest: { docs: [
        'peer measurement request attributes',
    ], attrs: [
        ['data', data, { docs: [
            'This is a nested attribute with measurement',
            'type-specific request data inside. The attributes used are from the',
            'enums named nl80211_peer_measurement_<type>_req.',
        ] }],
        ['getApTsf', flag, { docs: [
            'include AP TSF timestamp, if supported',
            '(flag attribute)',
        ] }],
    ]},

    PeerMeasurementResponse: { docs: [
        'peer measurement response attributes',
    ], attrs: [
        ['data', data, { docs: [
            'This is a nested attribute with measurement',
            'type-specific results inside. The attributes used are from the enums',
            'named nl80211_peer_measurement_<type>_resp.',
        ] }],
        ['status', u32, { type: 'PeerMeasurementStatus', docs: [
            'u32 value with the measurement status',
            '(using values from &enum nl80211_peer_measurement_status.)',
        ] }],
        ['hostTime', u64, { docs: [
            'host time (%CLOCK_BOOTTIME) when the',
            'result was measured; this value is not expected to be accurate to',
            'more than 20ms. (u64, nanoseconds)',
        ] }],
        ['apTsf', u64, { docs: [
            'TSF of the AP that the interface',
            'doing the measurement is connected to when the result was measured.',
            'This shall be accurately reported if supported and requested',
            '(u64, usec)',
        ] }],
        ['final', flag, { docs: [
            'If results are sent to the host partially',
            '(*e.g. with FTM per-burst data) this flag will be cleared on all but',
            "the last result; if all results are combined it's set on the single",
            'result.',
        ] }],
        ['pad', data, { docs: [
            'padding for 64-bit attributes, ignore',
        ] }],
    ]},

    PeerMeasurementPeerAttrs: { docs: [
        'peer attributes for measurement',
    ], attrs: [
        ['addr', data, { docs: [
            "peer's MAC address",
        ] }],
        ['chan', 'Message', { docs: [
            'channel definition, nested, using top-level',
            'attributes like %NL80211_ATTR_WIPHY_FREQ etc.',
        ] }],
        ['req', map('PeerMeasurementRequest'), { docs: [
            'This is a nested attribute indexed by',
            'measurement type, with attributes from the',
            '&enum nl80211_peer_measurement_req inside.',
        ] }],
        ['resp', map('PeerMeasurementResponse'), { docs: [
            'This is a nested attribute indexed by',
            'measurement type, with attributes from the',
            '&enum nl80211_peer_measurement_resp inside.',
        ] }],
    ]},

    PeerMeasurement: { docs: [
        'peer measurement attributes',
    ], attrs: [
        ['maxPeers', u32, { docs: [
            'u32 attribute used for capability',
            'advertisement only, indicates the maximum number of peers',
            'measurements can be done with in a single request',
        ] }],
        ['reportApTsf', flag, { docs: [
            'flag attribute in capability',
            "indicating that the connected AP's TSF can be reported in",
            'measurement results',
        ] }],
        ['randomizeMacAddr', flag, { docs: [
            'flag attribute in capability',
            'indicating that MAC address randomization is supported.',
        ] }],
        ['typeCapa', data, { docs: [
            'capabilities reported by the device,',
            'this contains a nesting indexed by measurement type, and',
            'type-specific capabilities inside, which are from the enums',
            'named nl80211_peer_measurement_<type>_capa.',
        ] }],
        ['peers', 'PeerMeasurementPeerAttrs', { docs: [
            'nested attribute, the nesting index is',
            'meaningless, just a list of peers to measure with, with the',
            'sub-attributes taken from',
            '&enum nl80211_peer_measurement_peer_attrs.',
        ] }],
    ]},

    PeerMeasurementFtmCapabilities: { docs: [
        'FTM capabilities',
    ], attrs: [
        ['asap', flag, { docs: [
            'flag attribute indicating ASAP mode',
            'is supported',
        ] }],
        ['nonAsap', flag, { docs: [
            'flag attribute indicating non-ASAP',
            'mode is supported',
        ] }],
        ['reqLci', flag, { docs: [
            'flag attribute indicating if LCI',
            'data can be requested during the measurement',
        ] }],
        ['reqCivicloc', flag, { docs: [
            'flag attribute indicating if civic',
            'location data can be requested during the measurement',
        ] }],
        ['preambles', u32, { type: asflags('Preamble'), docs: [
            'u32 bitmap attribute of bits',
            'from &enum nl80211_preamble.',
        ] }],
        ['bandwidths', data, { type: asflags('ChannelWidth'), docs: [
            'bitmap of values from',
            '&enum nl80211_chan_width indicating the supported channel',
            'bandwidths for FTM. Note that a higher channel bandwidth may be',
            'configured to allow for other measurements types with different',
            'bandwidth requirement in the same measurement.',
        ] }],
        ['maxBurstsExponent', u32, { docs: [
            'u32 attribute indicating',
            'the maximum bursts exponent that can be used (if not present anything',
            'is valid)',
        ] }],
        ['maxFtmsPerBurst', u32, { docs: [
            'u32 attribute indicating',
            'the maximum FTMs per burst (if not present anything is valid)',
        ] }],
    ]},

    PeerMeasurementFtmRequest: { docs: [
        'FTM request attributes',
    ], attrs: [
        ['asap', flag, { docs: [
            'ASAP mode requested (flag)',
        ] }],
        ['preamble', u32, { type: 'Preamble', docs: [
            'preamble type (see',
            '&enum nl80211_preamble), optional for DMG (u32)',
        ] }],
        ['numBurstsExp', u8, { docs: [
            'number of bursts exponent as in',
            '802.11-2016 9.4.2.168 "Fine Timing Measurement Parameters element"',
            '(u8, 0-15, optional with default 15 i.e. "no preference")',
        ] }],
        ['burstPeriod', u16, { docs: [
            'interval between bursts in units',
            'of 100ms (u16, optional with default 0)',
        ] }],
        ['burstDuration', u8, { docs: [
            'burst duration, as in 802.11-2016',
            'Table 9-257 "Burst Duration field encoding" (u8, 0-15, optional with',
            'default 15 i.e. "no preference")',
        ] }],
        ['ftmsPerBurst', u8, { docs: [
            'number of successful FTM frames',
            'requested per burst',
            '(u8, 0-31, optional with default 0 i.e. "no preference")',
        ] }],
        ['numFtmrRetries', u8, { docs: [
            'number of FTMR frame retries',
            '(u8, default 3)',
        ] }],
        ['requestLci', flag, { docs: [
            'request LCI data (flag)',
        ] }],
        ['requestCivicloc', flag, { docs: [
            'request civic location data',
            '(flag)',
        ] }],
    ]},

    PeerMeasurementFtmFailureReasons: { kind: 'enum', docs: [
        'FTM failure reasons',
    ], values: [
        { value: 0, name: 'UNSPECIFIED', docs: [
            'unspecified failure, not used',
        ] },
        { value: 1, name: 'NO_RESPONSE', docs: [
            'no response from the FTM responder',
        ] },
        { value: 2, name: 'REJECTED', docs: [
            'FTM responder rejected measurement',
        ] },
        { value: 3, name: 'WRONG_CHANNEL', docs: [
            'we already know the peer is',
            "on a different channel, so can't measure (if we didn't know, we'd",
            'try and get no response)',
        ] },
        { value: 4, name: 'PEER_NOT_CAPABLE', docs: [
            "peer can't actually do FTM",
        ] },
        { value: 5, name: 'INVALID_TIMESTAMP', docs: [
            'invalid T1/T4 timestamps',
            'received',
        ] },
        { value: 6, name: 'PEER_BUSY', docs: [
            'peer reports busy, you may retry',
            'later (see %NL80211_PMSR_FTM_RESP_ATTR_BUSY_RETRY_TIME)',
        ] },
        { value: 7, name: 'BAD_CHANGED_PARAMS', docs: [
            'parameters were changed',
            'by the peer and are no longer supported',
        ] },
    ]},

    PeerMeasurementFtmResponse: { docs: [
        'FTM response attributes',
    ], attrs: [
        ['failReason', u32, { docs: [
            'FTM-specific failure reason',
            '(u32, optional)',
        ] }],
        ['burstIndex', u32, { docs: [
            'optional, if bursts are reported',
            'as separate results then it will be the burst index 0...(N-1) and',
            'the top level will indicate partial results (u32)',
        ] }],
        ['numFtmrAttempts', u32, { docs: [
            'number of FTM Request frames',
            'transmitted (u32, optional)',
        ] }],
        ['numFtmrSuccesses', u32, { docs: [
            'number of FTM Request frames',
            'that were acknowleged (u32, optional)',
        ] }],
        ['busyRetryTime', u32, { docs: [
            'retry time received from the',
            'busy peer (u32, seconds)',
        ] }],
        ['numBurstsExp', u8, { docs: [
            'actual number of bursts exponent',
            'used by the responder (similar to request, u8)',
        ] }],
        ['burstDuration', u8, { docs: [
            'actual burst duration used by',
            'the responder (similar to request, u8)',
        ] }],
        ['ftmsPerBurst', u8, { docs: [
            'actual FTMs per burst used',
            'by the responder (similar to request, u8)',
        ] }],
        ['rssiAvg', s32, { docs: [
            'average RSSI across all FTM action',
            'frames (optional, s32, 1/2 dBm)',
        ] }],
        ['rssiSpread', s32, { docs: [
            'RSSI spread across all FTM action',
            'frames (optional, s32, 1/2 dBm)',
        ] }],
        ['txRate', 'RateInfo', { docs: [
            'bitrate we used for the response to the',
            'FTM action frame (optional, nested, using &enum nl80211_rate_info',
            'attributes)',
        ] }],
        ['rxRate', 'RateInfo', { docs: [
            'bitrate the responder used for the FTM',
            'action frame (optional, nested, using &enum nl80211_rate_info attrs)',
        ] }],
        ['rttAvg', s64, { docs: [
            'average RTT (s64, picoseconds, optional',
            'but one of RTT/DIST must be present)',
        ] }],
        ['rttVariance', u64, { docs: [
            'RTT variance (u64, ps^2, note that',
            'standard deviation is the square root of variance, optional)',
        ] }],
        ['rttSpread', u64, { docs: [
            'RTT spread (u64, picoseconds,',
            'optional)',
        ] }],
        ['distAvg', s64, { docs: [
            'average distance (s64, mm, optional',
            'but one of RTT/DIST must be present)',
        ] }],
        ['distVariance', u64, { docs: [
            'distance variance (u64, mm^2, note',
            'that standard deviation is the square root of variance, optional)',
        ] }],
        ['distSpread', u64, { docs: [
            'distance spread (u64, mm, optional)',
        ] }],
        ['lci', data, { docs: [
            'LCI data from peer (binary, optional);',
            'this is the contents of the Measurement Report Element (802.11-2016',
            '9.4.2.22.1) starting with the Measurement Token, with Measurement',
            'Type 8.',
        ] }],
        ['civicloc', data, { docs: [
            'civic location data from peer',
            '(binary, optional);',
            'this is the contents of the Measurement Report Element (802.11-2016',
            '9.4.2.22.1) starting with the Measurement Token, with Measurement',
            'Type 11.',
        ] }],
        ['pad', data, { docs: [
            'ignore, for u64/s64 padding only',
        ] }],
    ]},

    ObssPd: { docs: [
        'OBSS packet detection attributes',
    ], attrs: [
        ['inOffset', data, { docs: [
            'the OBSS PD minimum tx power offset.',
        ] }],
        ['axOffset', data, { docs: [
            'the OBSS PD maximum tx power offset.',
        ] }],
    ]},
}

types
