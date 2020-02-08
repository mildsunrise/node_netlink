/**
 * 802.11 netlink interface
 * 
 * Based on <linux/nl80211.h> at 14f34e3
 */

import { TypeStore, data, bool, flag, u8, u16, u32, u64, s8, s16, s32, s64, f32, f64, string, array, map, asflags } from './_base'

const types: TypeStore = {
    Commands: { kind: 'enum', orig: 'nl80211_commands', docs: [
        'supported nl80211 commands',
    ], values: [
        { value: 1, name: 'GET_WIPHY', orig: 'NL80211_CMD_GET_WIPHY', docs: [
            'request information about a wiphy or dump request',
            'to get a list of all present wiphys.',
        ] },
        { value: 2, name: 'SET_WIPHY', orig: 'NL80211_CMD_SET_WIPHY', docs: [
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
        { value: 3, name: 'NEW_WIPHY', orig: 'NL80211_CMD_NEW_WIPHY', docs: [
            'Newly created wiphy, response to get request',
            'or rename notification. Has attributes %NL80211_ATTR_WIPHY and',
            '%NL80211_ATTR_WIPHY_NAME.',
        ] },
        { value: 4, name: 'DEL_WIPHY', orig: 'NL80211_CMD_DEL_WIPHY', docs: [
            'Wiphy deleted. Has attributes',
            '%NL80211_ATTR_WIPHY and %NL80211_ATTR_WIPHY_NAME.',
        ] },
        { value: 5, name: 'GET_INTERFACE', orig: 'NL80211_CMD_GET_INTERFACE', docs: [
            "Request an interface's configuration;",
            'either a dump request for all interfaces or a specific get with a',
            'single %NL80211_ATTR_IFINDEX is supported.',
        ] },
        { value: 6, name: 'SET_INTERFACE', orig: 'NL80211_CMD_SET_INTERFACE', docs: [
            'Set type of a virtual interface, requires',
            '%NL80211_ATTR_IFINDEX and %NL80211_ATTR_IFTYPE.',
        ] },
        { value: 7, name: 'NEW_INTERFACE', orig: 'NL80211_CMD_NEW_INTERFACE', docs: [
            'Newly created virtual interface or response',
            'to %NL80211_CMD_GET_INTERFACE. Has %NL80211_ATTR_IFINDEX,',
            '%NL80211_ATTR_WIPHY and %NL80211_ATTR_IFTYPE attributes. Can also',
            'be sent from userspace to request creation of a new virtual interface,',
            'then requires attributes %NL80211_ATTR_WIPHY, %NL80211_ATTR_IFTYPE and',
            '%NL80211_ATTR_IFNAME.',
        ] },
        { value: 8, name: 'DEL_INTERFACE', orig: 'NL80211_CMD_DEL_INTERFACE', docs: [
            'Virtual interface was deleted, has attributes',
            '%NL80211_ATTR_IFINDEX and %NL80211_ATTR_WIPHY. Can also be sent from',
            'userspace to request deletion of a virtual interface, then requires',
            'attribute %NL80211_ATTR_IFINDEX.',
        ] },
        { value: 9, name: 'GET_KEY', orig: 'NL80211_CMD_GET_KEY', docs: [
            'Get sequence counter information for a key specified',
            'by %NL80211_ATTR_KEY_IDX and/or %NL80211_ATTR_MAC.',
        ] },
        { value: 10, name: 'SET_KEY', orig: 'NL80211_CMD_SET_KEY', docs: [
            'Set key attributes %NL80211_ATTR_KEY_DEFAULT,',
            '%NL80211_ATTR_KEY_DEFAULT_MGMT, or %NL80211_ATTR_KEY_THRESHOLD.',
        ] },
        { value: 11, name: 'NEW_KEY', orig: 'NL80211_CMD_NEW_KEY', docs: [
            'add a key with given %NL80211_ATTR_KEY_DATA,',
            '%NL80211_ATTR_KEY_IDX, %NL80211_ATTR_MAC, %NL80211_ATTR_KEY_CIPHER,',
            'and %NL80211_ATTR_KEY_SEQ attributes.',
        ] },
        { value: 12, name: 'DEL_KEY', orig: 'NL80211_CMD_DEL_KEY', docs: [
            'delete a key identified by %NL80211_ATTR_KEY_IDX',
            'or %NL80211_ATTR_MAC.',
        ] },
        { value: 13, name: 'GET_BEACON', orig: 'NL80211_CMD_GET_BEACON', docs: [
            '(not used)',
        ] },
        { value: 14, name: 'SET_BEACON', orig: 'NL80211_CMD_SET_BEACON', docs: [
            'change the beacon on an access point interface',
            'using the %NL80211_ATTR_BEACON_HEAD and %NL80211_ATTR_BEACON_TAIL',
            'attributes. For drivers that generate the beacon and probe responses',
            'internally, the following attributes must be provided: %NL80211_ATTR_IE,',
            '%NL80211_ATTR_IE_PROBE_RESP and %NL80211_ATTR_IE_ASSOC_RESP.',
        ] },
        { value: 15, name: 'START_AP', orig: 'NL80211_CMD_START_AP', docs: [
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
        { value: 16, name: 'STOP_AP', orig: 'NL80211_CMD_STOP_AP', docs: [
            'Stop AP operation on the given interface',
        ] },
        { value: 17, name: 'GET_STATION', orig: 'NL80211_CMD_GET_STATION', docs: [
            'Get station attributes for station identified by',
            '%NL80211_ATTR_MAC on the interface identified by %NL80211_ATTR_IFINDEX.',
        ] },
        { value: 18, name: 'SET_STATION', orig: 'NL80211_CMD_SET_STATION', docs: [
            'Set station attributes for station identified by',
            '%NL80211_ATTR_MAC on the interface identified by %NL80211_ATTR_IFINDEX.',
        ] },
        { value: 19, name: 'NEW_STATION', orig: 'NL80211_CMD_NEW_STATION', docs: [
            'Add a station with given attributes to the',
            'the interface identified by %NL80211_ATTR_IFINDEX.',
        ] },
        { value: 20, name: 'DEL_STATION', orig: 'NL80211_CMD_DEL_STATION', docs: [
            'Remove a station identified by %NL80211_ATTR_MAC',
            'or, if no MAC address given, all stations, on the interface identified',
            'by %NL80211_ATTR_IFINDEX. %NL80211_ATTR_MGMT_SUBTYPE and',
            '%NL80211_ATTR_REASON_CODE can optionally be used to specify which type',
            'of disconnection indication should be sent to the station',
            '(Deauthentication or Disassociation frame and reason code for that',
            'frame).',
        ] },
        { value: 21, name: 'GET_MPATH', orig: 'NL80211_CMD_GET_MPATH', docs: [
            'Get mesh path attributes for mesh path to',
            'destination %NL80211_ATTR_MAC on the interface identified by',
            '%NL80211_ATTR_IFINDEX.',
        ] },
        { value: 22, name: 'SET_MPATH', orig: 'NL80211_CMD_SET_MPATH', docs: [
            'Set mesh path attributes for mesh path to',
            'destination %NL80211_ATTR_MAC on the interface identified by',
            '%NL80211_ATTR_IFINDEX.',
        ] },
        { value: 23, name: 'NEW_MPATH', orig: 'NL80211_CMD_NEW_MPATH', docs: [
            'Create a new mesh path for the destination given by',
            '%NL80211_ATTR_MAC via %NL80211_ATTR_MPATH_NEXT_HOP.',
        ] },
        { value: 24, name: 'DEL_MPATH', orig: 'NL80211_CMD_DEL_MPATH', docs: [
            'Delete a mesh path to the destination given by',
            '%NL80211_ATTR_MAC.',
        ] },
        { value: 25, name: 'SET_BSS', orig: 'NL80211_CMD_SET_BSS', docs: [
            'Set BSS attributes for BSS identified by',
            '%NL80211_ATTR_IFINDEX.',
        ] },
        { value: 26, name: 'SET_REG', orig: 'NL80211_CMD_SET_REG', docs: [
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
        { value: 27, name: 'REQ_SET_REG', orig: 'NL80211_CMD_REQ_SET_REG', docs: [
            'ask the wireless core to set the regulatory domain',
            'to the specified ISO/IEC 3166-1 alpha2 country code. The core will',
            'store this as a valid request and then query userspace for it.',
        ] },
        { value: 28, name: 'GET_MESH_CONFIG', orig: 'NL80211_CMD_GET_MESH_CONFIG', docs: [
            'Get mesh networking properties for the',
            'interface identified by %NL80211_ATTR_IFINDEX',
        ] },
        { value: 29, name: 'SET_MESH_CONFIG', orig: 'NL80211_CMD_SET_MESH_CONFIG', docs: [
            'Set mesh networking properties for the',
            'interface identified by %NL80211_ATTR_IFINDEX',
        ] },
        { value: 30, name: 'SET_MGMT_EXTRA_IE', orig: 'NL80211_CMD_SET_MGMT_EXTRA_IE', docs: [
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
        { value: 31, name: 'GET_REG', orig: 'NL80211_CMD_GET_REG', docs: [
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
        { value: 32, name: 'GET_SCAN', orig: 'NL80211_CMD_GET_SCAN', docs: [
            'get scan results',
        ] },
        { value: 33, name: 'TRIGGER_SCAN', orig: 'NL80211_CMD_TRIGGER_SCAN', docs: [
            'trigger a new scan with the given parameters',
            '%NL80211_ATTR_TX_NO_CCK_RATE is used to decide whether to send the',
            'probe requests at CCK rate or not. %NL80211_ATTR_BSSID can be used to',
            'specify a BSSID to scan for; if not included, the wildcard BSSID will',
            'be used.',
        ] },
        { value: 34, name: 'NEW_SCAN_RESULTS', orig: 'NL80211_CMD_NEW_SCAN_RESULTS', docs: [
            'scan notification (as a reply to',
            'NL80211_CMD_GET_SCAN and on the "scan" multicast group)',
        ] },
        { value: 35, name: 'SCAN_ABORTED', orig: 'NL80211_CMD_SCAN_ABORTED', docs: [
            'scan was aborted, for unspecified reasons,',
            'partial scan results may be available',
        ] },
        { value: 36, name: 'REG_CHANGE', orig: 'NL80211_CMD_REG_CHANGE', docs: [
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
        { value: 37, name: 'AUTHENTICATE', orig: 'NL80211_CMD_AUTHENTICATE', docs: [
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
        { value: 38, name: 'ASSOCIATE', orig: 'NL80211_CMD_ASSOCIATE', docs: [
            'association request and notification; like',
            'NL80211_CMD_AUTHENTICATE but for Association and Reassociation',
            '(similar to MLME-ASSOCIATE.request, MLME-REASSOCIATE.request,',
            'MLME-ASSOCIATE.confirm or MLME-REASSOCIATE.confirm primitives). The',
            '%NL80211_ATTR_PREV_BSSID attribute is used to specify whether the',
            'request is for the initial association to an ESS (that attribute not',
            'included) or for reassociation within the ESS (that attribute is',
            'included).',
        ] },
        { value: 39, name: 'DEAUTHENTICATE', orig: 'NL80211_CMD_DEAUTHENTICATE', docs: [
            'deauthentication request and notification; like',
            'NL80211_CMD_AUTHENTICATE but for Deauthentication frames (similar to',
            'MLME-DEAUTHENTICATION.request and MLME-DEAUTHENTICATE.indication',
            'primitives).',
        ] },
        { value: 40, name: 'DISASSOCIATE', orig: 'NL80211_CMD_DISASSOCIATE', docs: [
            'disassociation request and notification; like',
            'NL80211_CMD_AUTHENTICATE but for Disassociation frames (similar to',
            'MLME-DISASSOCIATE.request and MLME-DISASSOCIATE.indication primitives).',
        ] },
        { value: 41, name: 'MICHAEL_MIC_FAILURE', orig: 'NL80211_CMD_MICHAEL_MIC_FAILURE', docs: [
            'notification of a locally detected Michael',
            'MIC (part of TKIP) failure; sent on the "mlme" multicast group; the',
            'event includes %NL80211_ATTR_MAC to describe the source MAC address of',
            'the frame with invalid MIC, %NL80211_ATTR_KEY_TYPE to show the key',
            'type, %NL80211_ATTR_KEY_IDX to indicate the key identifier, and',
            '%NL80211_ATTR_KEY_SEQ to indicate the TSC value of the frame; this',
            'event matches with MLME-MICHAELMICFAILURE.indication() primitive',
        ] },
        { value: 42, name: 'REG_BEACON_HINT', orig: 'NL80211_CMD_REG_BEACON_HINT', docs: [
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
        { value: 43, name: 'JOIN_IBSS', orig: 'NL80211_CMD_JOIN_IBSS', docs: [
            'Join a new IBSS -- given at least an SSID and a',
            'FREQ attribute (for the initial frequency if no peer can be found)',
            'and optionally a MAC (as BSSID) and FREQ_FIXED attribute if those',
            'should be fixed rather than automatically determined. Can only be',
            'executed on a network interface that is UP, and fixed BSSID/FREQ',
            'may be rejected. Another optional parameter is the beacon interval,',
            'given in the %NL80211_ATTR_BEACON_INTERVAL attribute, which if not',
            'given defaults to 100 TU (102.4ms).',
        ] },
        { value: 44, name: 'LEAVE_IBSS', orig: 'NL80211_CMD_LEAVE_IBSS', docs: [
            'Leave the IBSS -- no special arguments, the IBSS is',
            'determined by the network interface.',
        ] },
        { value: 45, name: 'TESTMODE', orig: 'NL80211_CMD_TESTMODE', docs: [
            'testmode command, takes a wiphy (or ifindex) attribute',
            'to identify the device, and the TESTDATA blob attribute to pass through',
            'to the driver.',
        ] },
        { value: 46, name: 'CONNECT', orig: 'NL80211_CMD_CONNECT', docs: [
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
        { value: 47, name: 'ROAM', orig: 'NL80211_CMD_ROAM', docs: [
            'Notification indicating the card/driver roamed by itself.',
            'When a security association was established with the new AP (e.g. if',
            'the FT protocol was used for roaming or the driver completed the 4 way',
            'handshake), this event should be followed by an',
            '%NL80211_CMD_PORT_AUTHORIZED event.',
        ] },
        { value: 48, name: 'DISCONNECT', orig: 'NL80211_CMD_DISCONNECT', docs: [
            'drop a given connection; also used to notify',
            'userspace that a connection was dropped by the AP or due to other',
            'reasons, for this the %NL80211_ATTR_DISCONNECTED_BY_AP and',
            '%NL80211_ATTR_REASON_CODE attributes are used.',
        ] },
        { value: 49, name: 'SET_WIPHY_NETNS', orig: 'NL80211_CMD_SET_WIPHY_NETNS', docs: [
            "Set a wiphy's netns. Note that all devices",
            'associated with this wiphy must be down and will follow.',
        ] },
        { value: 50, name: 'GET_SURVEY', orig: 'NL80211_CMD_GET_SURVEY', docs: [
            'get survey resuls, e.g. channel occupation',
            'or noise level',
        ] },
        { value: 51, name: 'NEW_SURVEY_RESULTS', orig: 'NL80211_CMD_NEW_SURVEY_RESULTS', docs: [
            'survey data notification (as a reply to',
            'NL80211_CMD_GET_SURVEY and on the "scan" multicast group)',
        ] },
        { value: 52, name: 'SET_PMKSA', orig: 'NL80211_CMD_SET_PMKSA', docs: [
            'Add a PMKSA cache entry using %NL80211_ATTR_MAC',
            '(for the BSSID), %NL80211_ATTR_PMKID, and optionally %NL80211_ATTR_PMK',
            '(PMK is used for PTKSA derivation in case of FILS shared key offload) or',
            'using %NL80211_ATTR_SSID, %NL80211_ATTR_FILS_CACHE_ID,',
            '%NL80211_ATTR_PMKID, and %NL80211_ATTR_PMK in case of FILS',
            'authentication where %NL80211_ATTR_FILS_CACHE_ID is the identifier',
            'advertized by a FILS capable AP identifying the scope of PMKSA in an',
            'ESS.',
        ] },
        { value: 53, name: 'DEL_PMKSA', orig: 'NL80211_CMD_DEL_PMKSA', docs: [
            'Delete a PMKSA cache entry, using %NL80211_ATTR_MAC',
            '(for the BSSID) and %NL80211_ATTR_PMKID or using %NL80211_ATTR_SSID,',
            '%NL80211_ATTR_FILS_CACHE_ID, and %NL80211_ATTR_PMKID in case of FILS',
            'authentication.',
        ] },
        { value: 54, name: 'FLUSH_PMKSA', orig: 'NL80211_CMD_FLUSH_PMKSA', docs: [
            'Flush all PMKSA cache entries.',
        ] },
        { value: 55, name: 'REMAIN_ON_CHANNEL', orig: 'NL80211_CMD_REMAIN_ON_CHANNEL', docs: [
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
        { value: 56, name: 'CANCEL_REMAIN_ON_CHANNEL', orig: 'NL80211_CMD_CANCEL_REMAIN_ON_CHANNEL', docs: [
            'This command can be used to cancel a',
            'pending remain-on-channel duration if the desired operation has been',
            'completed prior to expiration of the originally requested duration.',
            '%NL80211_ATTR_WIPHY or %NL80211_ATTR_IFINDEX is used to specify the',
            'radio. The %NL80211_ATTR_COOKIE attribute must be given as well to',
            'uniquely identify the request.',
            'This command is also used as an event to notify when a requested',
            'remain-on-channel duration has expired.',
        ] },
        { value: 57, name: 'SET_TX_BITRATE_MASK', orig: 'NL80211_CMD_SET_TX_BITRATE_MASK', docs: [
            'Set the mask of rates to be used in TX',
            'rate selection. %NL80211_ATTR_IFINDEX is used to specify the interface',
            'and @NL80211_ATTR_TX_RATES the set of allowed rates.',
        ] },
        { value: 58, name: 'REGISTER_FRAME', orig: 'NL80211_CMD_REGISTER_FRAME', docs: [
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
        { value: 59, name: 'FRAME', orig: 'NL80211_CMD_FRAME', docs: [
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
        { value: 60, name: 'FRAME_TX_STATUS', orig: 'NL80211_CMD_FRAME_TX_STATUS', docs: [
            'Report TX status of a management frame',
            'transmitted with %NL80211_CMD_FRAME. %NL80211_ATTR_COOKIE identifies',
            'the TX command and %NL80211_ATTR_FRAME includes the contents of the',
            'frame. %NL80211_ATTR_ACK flag is included if the recipient acknowledged',
            'the frame.',
        ] },
        { value: 61, name: 'SET_POWER_SAVE', orig: 'NL80211_CMD_SET_POWER_SAVE', docs: [
            'Set powersave, using %NL80211_ATTR_PS_STATE',
        ] },
        { value: 62, name: 'GET_POWER_SAVE', orig: 'NL80211_CMD_GET_POWER_SAVE', docs: [
            'Get powersave status in %NL80211_ATTR_PS_STATE',
        ] },
        { value: 63, name: 'SET_CQM', orig: 'NL80211_CMD_SET_CQM', docs: [
            'Connection quality monitor configuration. This command',
            'is used to configure connection quality monitoring notification trigger',
            'levels.',
        ] },
        { value: 64, name: 'NOTIFY_CQM', orig: 'NL80211_CMD_NOTIFY_CQM', docs: [
            'Connection quality monitor notification. This',
            'command is used as an event to indicate the that a trigger level was',
            'reached.',
        ] },
        { value: 65, name: 'SET_CHANNEL', orig: 'NL80211_CMD_SET_CHANNEL', docs: [
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
        { value: 66, name: 'SET_WDS_PEER', orig: 'NL80211_CMD_SET_WDS_PEER', docs: [
            'Set the MAC address of the peer on a WDS interface.',
        ] },
        { value: 67, name: 'FRAME_WAIT_CANCEL', orig: 'NL80211_CMD_FRAME_WAIT_CANCEL', docs: [
            'When an off-channel TX was requested, this',
            'command may be used with the corresponding cookie to cancel the wait',
            'time if it is known that it is no longer necessary.  This command is',
            'also sent as an event whenever the driver has completed the off-channel',
            'wait time.',
        ] },
        { value: 68, name: 'JOIN_MESH', orig: 'NL80211_CMD_JOIN_MESH', docs: [
            'Join a mesh. The mesh ID must be given, and initial',
            'mesh config parameters may be given.',
        ] },
        { value: 69, name: 'LEAVE_MESH', orig: 'NL80211_CMD_LEAVE_MESH', docs: [
            'Leave the mesh network -- no special arguments, the',
            'network is determined by the network interface.',
        ] },
        { value: 70, name: 'UNPROT_DEAUTHENTICATE', orig: 'NL80211_CMD_UNPROT_DEAUTHENTICATE', docs: [
            'Unprotected deauthentication frame',
            'notification. This event is used to indicate that an unprotected',
            'deauthentication frame was dropped when MFP is in use.',
        ] },
        { value: 71, name: 'UNPROT_DISASSOCIATE', orig: 'NL80211_CMD_UNPROT_DISASSOCIATE', docs: [
            'Unprotected disassociation frame',
            'notification. This event is used to indicate that an unprotected',
            'disassociation frame was dropped when MFP is in use.',
        ] },
        { value: 72, name: 'NEW_PEER_CANDIDATE', orig: 'NL80211_CMD_NEW_PEER_CANDIDATE', docs: [
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
        { value: 73, name: 'GET_WOWLAN', orig: 'NL80211_CMD_GET_WOWLAN', docs: [
            'get Wake-on-Wireless-LAN (WoWLAN) settings.',
        ] },
        { value: 74, name: 'SET_WOWLAN', orig: 'NL80211_CMD_SET_WOWLAN', docs: [
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
        { value: 75, name: 'START_SCHED_SCAN', orig: 'NL80211_CMD_START_SCHED_SCAN', docs: [
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
        { value: 76, name: 'STOP_SCHED_SCAN', orig: 'NL80211_CMD_STOP_SCHED_SCAN', docs: [
            'stop a scheduled scan. Returns -ENOENT if',
            'scheduled scan is not running. The caller may assume that as soon',
            'as the call returns, it is safe to start a new scheduled scan again.',
        ] },
        { value: 77, name: 'SCHED_SCAN_RESULTS', orig: 'NL80211_CMD_SCHED_SCAN_RESULTS', docs: [
            'indicates that there are scheduled scan',
            'results available.',
        ] },
        { value: 78, name: 'SCHED_SCAN_STOPPED', orig: 'NL80211_CMD_SCHED_SCAN_STOPPED', docs: [
            'indicates that the scheduled scan has',
            'stopped.  The driver may issue this event at any time during a',
            'scheduled scan.  One reason for stopping the scan is if the hardware',
            'does not support starting an association or a normal scan while running',
            'a scheduled scan.  This event is also sent when the',
            '%NL80211_CMD_STOP_SCHED_SCAN command is received or when the interface',
            'is brought down while a scheduled scan was running.',
        ] },
        { value: 79, name: 'SET_REKEY_OFFLOAD', orig: 'NL80211_CMD_SET_REKEY_OFFLOAD', docs: [
            'This command is used give the driver',
            'the necessary information for supporting GTK rekey offload. This',
            'feature is typically used during WoWLAN. The configuration data',
            'is contained in %NL80211_ATTR_REKEY_DATA (which is nested and',
            'contains the data in sub-attributes). After rekeying happened,',
            'this command may also be sent by the driver as an MLME event to',
            'inform userspace of the new replay counter.',
        ] },
        { value: 80, name: 'PMKSA_CANDIDATE', orig: 'NL80211_CMD_PMKSA_CANDIDATE', docs: [
            'This is used as an event to inform userspace',
            'of PMKSA caching dandidates.',
        ] },
        { value: 81, name: 'TDLS_OPER', orig: 'NL80211_CMD_TDLS_OPER', docs: [
            'Perform a high-level TDLS command (e.g. link setup).',
            'In addition, this can be used as an event to request userspace to take',
            'actions on TDLS links (set up a new link or tear down an existing one).',
            'In such events, %NL80211_ATTR_TDLS_OPERATION indicates the requested',
            'operation, %NL80211_ATTR_MAC contains the peer MAC address, and',
            '%NL80211_ATTR_REASON_CODE the reason code to be used (only with',
            '%NL80211_TDLS_TEARDOWN).',
        ] },
        { value: 82, name: 'TDLS_MGMT', orig: 'NL80211_CMD_TDLS_MGMT', docs: [
            'Send a TDLS management frame. The',
            '%NL80211_ATTR_TDLS_ACTION attribute determines the type of frame to be',
            'sent. Public Action codes (802.11-2012 8.1.5.1) will be sent as',
            '802.11 management frames, while TDLS action codes (802.11-2012',
            '8.5.13.1) will be encapsulated and sent as data frames. The currently',
            'supported Public Action code is %WLAN_PUB_ACTION_TDLS_DISCOVER_RES',
            'and the currently supported TDLS actions codes are given in',
            '&enum ieee80211_tdls_actioncode.',
        ] },
        { value: 83, name: 'UNEXPECTED_FRAME', orig: 'NL80211_CMD_UNEXPECTED_FRAME', docs: [
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
        { value: 84, name: 'PROBE_CLIENT', orig: 'NL80211_CMD_PROBE_CLIENT', docs: [
            'Probe an associated station on an AP interface',
            'by sending a null data frame to it and reporting when the frame is',
            'acknowleged. This is used to allow timing out inactive clients. Uses',
            '%NL80211_ATTR_IFINDEX and %NL80211_ATTR_MAC. The command returns a',
            'direct reply with an %NL80211_ATTR_COOKIE that is later used to match',
            'up the event with the request. The event includes the same data and',
            'has %NL80211_ATTR_ACK set if the frame was ACKed.',
        ] },
        { value: 85, name: 'REGISTER_BEACONS', orig: 'NL80211_CMD_REGISTER_BEACONS', docs: [
            'Register this socket to receive beacons from',
            'other BSSes when any interfaces are in AP mode. This helps implement',
            'OLBC handling in hostapd. Beacons are reported in %NL80211_CMD_FRAME',
            'messages. Note that per PHY only one application may register.',
        ] },
        { value: 86, name: 'UNEXPECTED_4ADDR_FRAME', orig: 'NL80211_CMD_UNEXPECTED_4ADDR_FRAME', docs: [
            'Sent as an event indicating that the',
            'associated station identified by %NL80211_ATTR_MAC sent a 4addr frame',
            "and wasn't already in a 4-addr VLAN. The event will be sent similarly",
            'to the %NL80211_CMD_UNEXPECTED_FRAME event, to the same listener.',
        ] },
        { value: 87, name: 'SET_NOACK_MAP', orig: 'NL80211_CMD_SET_NOACK_MAP', docs: [
            'sets a bitmap for the individual TIDs whether',
            'No Acknowledgement Policy should be applied.',
        ] },
        { value: 88, name: 'CH_SWITCH_NOTIFY', orig: 'NL80211_CMD_CH_SWITCH_NOTIFY', docs: [
            'An AP or GO may decide to switch channels',
            'independently of the userspace SME, send this event indicating',
            '%NL80211_ATTR_IFINDEX is now on %NL80211_ATTR_WIPHY_FREQ and the',
            'attributes determining channel width.  This indication may also be',
            'sent when a remotely-initiated switch (e.g., when a STA receives a CSA',
            'from the remote AP) is completed;',
        ] },
        { value: 89, name: 'START_P2P_DEVICE', orig: 'NL80211_CMD_START_P2P_DEVICE', docs: [
            'Start the given P2P Device, identified by',
            'its %NL80211_ATTR_WDEV identifier. It must have been created with',
            '%NL80211_CMD_NEW_INTERFACE previously. After it has been started, the',
            'P2P Device can be used for P2P operations, e.g. remain-on-channel and',
            'public action frame TX.',
        ] },
        { value: 90, name: 'STOP_P2P_DEVICE', orig: 'NL80211_CMD_STOP_P2P_DEVICE', docs: [
            'Stop the given P2P Device, identified by',
            'its %NL80211_ATTR_WDEV identifier.',
        ] },
        { value: 91, name: 'CONN_FAILED', orig: 'NL80211_CMD_CONN_FAILED', docs: [
            'connection request to an AP failed; used to',
            'notify userspace that AP has rejected the connection request from a',
            'station, due to particular reason. %NL80211_ATTR_CONN_FAILED_REASON',
            'is used for this.',
        ] },
        { value: 92, name: 'SET_MCAST_RATE', orig: 'NL80211_CMD_SET_MCAST_RATE', docs: [
            'Change the rate used to send multicast frames',
            'for IBSS or MESH vif.',
        ] },
        { value: 93, name: 'SET_MAC_ACL', orig: 'NL80211_CMD_SET_MAC_ACL', docs: [
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
        { value: 94, name: 'RADAR_DETECT', orig: 'NL80211_CMD_RADAR_DETECT', docs: [
            'Start a Channel availability check (CAC). Once',
            'a radar is detected or the channel availability scan (CAC) has finished',
            'or was aborted, or a radar was detected, usermode will be notified with',
            'this event. This command is also used to notify userspace about radars',
            'while operating on this channel.',
            '%NL80211_ATTR_RADAR_EVENT is used to inform about the type of the',
            'event.',
        ] },
        { value: 95, name: 'GET_PROTOCOL_FEATURES', orig: 'NL80211_CMD_GET_PROTOCOL_FEATURES', docs: [
            'Get global nl80211 protocol features,',
            'i.e. features for the nl80211 protocol rather than device features.',
            'Returns the features in the %NL80211_ATTR_PROTOCOL_FEATURES bitmap.',
        ] },
        { value: 96, name: 'UPDATE_FT_IES', orig: 'NL80211_CMD_UPDATE_FT_IES', docs: [
            'Pass down the most up-to-date Fast Transition',
            'Information Element to the WLAN driver',
        ] },
        { value: 97, name: 'FT_EVENT', orig: 'NL80211_CMD_FT_EVENT', docs: [
            'Send a Fast transition event from the WLAN driver',
            "to the supplicant. This will carry the target AP's MAC address along",
            'with the relevant Information Elements. This event is used to report',
            'received FT IEs (MDIE, FTIE, RSN IE, TIE, RICIE).',
        ] },
        { value: 98, name: 'CRIT_PROTOCOL_START', orig: 'NL80211_CMD_CRIT_PROTOCOL_START', docs: [
            'Indicates user-space will start running',
            'a critical protocol that needs more reliability in the connection to',
            'complete.',
        ] },
        { value: 99, name: 'CRIT_PROTOCOL_STOP', orig: 'NL80211_CMD_CRIT_PROTOCOL_STOP', docs: [
            'Indicates the connection reliability can',
            'return back to normal.',
        ] },
        { value: 100, name: 'GET_COALESCE', orig: 'NL80211_CMD_GET_COALESCE', docs: [
            'Get currently supported coalesce rules.',
        ] },
        { value: 101, name: 'SET_COALESCE', orig: 'NL80211_CMD_SET_COALESCE', docs: [
            'Configure coalesce rules or clear existing rules.',
        ] },
        { value: 102, name: 'CHANNEL_SWITCH', orig: 'NL80211_CMD_CHANNEL_SWITCH', docs: [
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
        { value: 103, name: 'VENDOR', orig: 'NL80211_CMD_VENDOR', docs: [
            'Vendor-specified command/event. The command is specified',
            'by the %NL80211_ATTR_VENDOR_ID attribute and a sub-command in',
            '%NL80211_ATTR_VENDOR_SUBCMD. Parameter(s) can be transported in',
            '%NL80211_ATTR_VENDOR_DATA.',
            'For feature advertisement, the %NL80211_ATTR_VENDOR_DATA attribute is',
            'used in the wiphy data as a nested attribute containing descriptions',
            '(&struct nl80211_vendor_cmd_info) of the supported vendor commands.',
            'This may also be sent as an event with the same attributes.',
        ] },
        { value: 104, name: 'SET_QOS_MAP', orig: 'NL80211_CMD_SET_QOS_MAP', docs: [
            'Set Interworking QoS mapping for IP DSCP values.',
            'The QoS mapping information is included in %NL80211_ATTR_QOS_MAP. If',
            'that attribute is not included, QoS mapping is disabled. Since this',
            'QoS mapping is relevant for IP packets, it is only valid during an',
            'association. This is cleared on disassociation and AP restart.',
        ] },
        { value: 105, name: 'ADD_TX_TS', orig: 'NL80211_CMD_ADD_TX_TS', docs: [
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
        { value: 106, name: 'DEL_TX_TS', orig: 'NL80211_CMD_DEL_TX_TS', docs: [
            'Remove an existing TS with the %NL80211_ATTR_TSID',
            "and %NL80211_ATTR_MAC parameters. It isn't necessary to call this",
            'before removing a station entry entirely, or before disassociating',
            'or similar, cleanup will happen in the driver/device in this case.',
        ] },
        { value: 107, name: 'GET_MPP', orig: 'NL80211_CMD_GET_MPP', docs: [
            'Get mesh path attributes for mesh proxy path to',
            'destination %NL80211_ATTR_MAC on the interface identified by',
            '%NL80211_ATTR_IFINDEX.',
        ] },
        { value: 108, name: 'JOIN_OCB', orig: 'NL80211_CMD_JOIN_OCB', docs: [
            'Join the OCB network. The center frequency and',
            'bandwidth of a channel must be given.',
        ] },
        { value: 109, name: 'LEAVE_OCB', orig: 'NL80211_CMD_LEAVE_OCB', docs: [
            'Leave the OCB network -- no special arguments, the',
            'network is determined by the network interface.',
        ] },
        { value: 110, name: 'CH_SWITCH_STARTED_NOTIFY', orig: 'NL80211_CMD_CH_SWITCH_STARTED_NOTIFY', docs: [
            'Notify that a channel switch',
            'has been started on an interface, regardless of the initiator',
            '(ie. whether it was requested from a remote device or',
            'initiated on our own).  It indicates that',
            '%NL80211_ATTR_IFINDEX will be on %NL80211_ATTR_WIPHY_FREQ',
            "after %NL80211_ATTR_CH_SWITCH_COUNT TBTT's.  The userspace may",
            'decide to react to this indication by requesting other',
            'interfaces to change channel as well.',
        ] },
        { value: 111, name: 'TDLS_CHANNEL_SWITCH', orig: 'NL80211_CMD_TDLS_CHANNEL_SWITCH', docs: [
            'Start channel-switching with a TDLS peer,',
            'identified by the %NL80211_ATTR_MAC parameter. A target channel is',
            'provided via %NL80211_ATTR_WIPHY_FREQ and other attributes determining',
            'channel width/type. The target operating class is given via',
            '%NL80211_ATTR_OPER_CLASS.',
            'The driver is responsible for continually initiating channel-switching',
            'operations and returning to the base channel for communication with the',
            'AP.',
        ] },
        { value: 112, name: 'TDLS_CANCEL_CHANNEL_SWITCH', orig: 'NL80211_CMD_TDLS_CANCEL_CHANNEL_SWITCH', docs: [
            'Stop channel-switching with a TDLS',
            'peer given by %NL80211_ATTR_MAC. Both peers must be on the base channel',
            'when this command completes.',
        ] },
        { value: 113, name: 'WIPHY_REG_CHANGE', orig: 'NL80211_CMD_WIPHY_REG_CHANGE', docs: [
            'Similar to %NL80211_CMD_REG_CHANGE, but used',
            'as an event to indicate changes for devices with wiphy-specific regdom',
            'management.',
        ] },
        { value: 114, name: 'ABORT_SCAN', orig: 'NL80211_CMD_ABORT_SCAN', docs: [
            'Stop an ongoing scan. Returns -ENOENT if a scan is',
            'not running. The driver indicates the status of the scan through',
            'cfg80211_scan_done().',
        ] },
        { value: 115, name: 'START_NAN', orig: 'NL80211_CMD_START_NAN', docs: [
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
        { value: 116, name: 'STOP_NAN', orig: 'NL80211_CMD_STOP_NAN', docs: [
            'Stop the NAN operation, identified by',
            'its %NL80211_ATTR_WDEV interface.',
        ] },
        { value: 117, name: 'ADD_NAN_FUNCTION', orig: 'NL80211_CMD_ADD_NAN_FUNCTION', docs: [
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
        { value: 118, name: 'DEL_NAN_FUNCTION', orig: 'NL80211_CMD_DEL_NAN_FUNCTION', docs: [
            'Delete a NAN function by cookie.',
            'This command is also used as a notification sent when a NAN function is',
            'terminated. This will contain a %NL80211_ATTR_NAN_FUNC_INST_ID',
            'and %NL80211_ATTR_COOKIE attributes.',
        ] },
        { value: 119, name: 'CHANGE_NAN_CONFIG', orig: 'NL80211_CMD_CHANGE_NAN_CONFIG', docs: [
            'Change current NAN',
            'configuration. NAN must be operational (%NL80211_CMD_START_NAN',
            'was executed).  It must contain at least one of the following',
            'attributes: %NL80211_ATTR_NAN_MASTER_PREF,',
            '%NL80211_ATTR_BANDS.  If %NL80211_ATTR_BANDS is omitted, the',
            'current configuration is not changed.  If it is present but',
            "set to zero, the configuration is changed to don't-care",
            '(i.e. the device can decide what to do).',
        ] },
        { value: 120, name: 'NAN_MATCH', orig: 'NL80211_CMD_NAN_MATCH', docs: [
            'Notification sent when a match is reported.',
            'This will contain a %NL80211_ATTR_NAN_MATCH nested attribute and',
            '%NL80211_ATTR_COOKIE.',
        ] },
        { value: 121, name: 'SET_MULTICAST_TO_UNICAST', orig: 'NL80211_CMD_SET_MULTICAST_TO_UNICAST', docs: [
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
        { value: 122, name: 'UPDATE_CONNECT_PARAMS', orig: 'NL80211_CMD_UPDATE_CONNECT_PARAMS', docs: [
            'Update one or more connect parameters',
            'for subsequent roaming cases if the driver or firmware uses internal',
            'BSS selection. This command can be issued only while connected and it',
            'does not result in a change for the current association. Currently,',
            'only the %NL80211_ATTR_IE data is used and updated with this command.',
        ] },
        { value: 123, name: 'SET_PMK', orig: 'NL80211_CMD_SET_PMK', docs: [
            'For offloaded 4-Way handshake, set the PMK or PMK-R0',
            'for the given authenticator address (specified with %NL80211_ATTR_MAC).',
            'When %NL80211_ATTR_PMKR0_NAME is set, %NL80211_ATTR_PMK specifies the',
            'PMK-R0, otherwise it specifies the PMK.',
        ] },
        { value: 124, name: 'DEL_PMK', orig: 'NL80211_CMD_DEL_PMK', docs: [
            'For offloaded 4-Way handshake, delete the previously',
            'configured PMK for the authenticator address identified by',
            '%NL80211_ATTR_MAC.',
        ] },
        { value: 125, name: 'PORT_AUTHORIZED', orig: 'NL80211_CMD_PORT_AUTHORIZED', docs: [
            'An event that indicates that the 4 way',
            'handshake was completed successfully by the driver. The BSSID is',
            'specified with %NL80211_ATTR_MAC. Drivers that support 4 way handshake',
            'offload should send this event after indicating 802.11 association with',
            '%NL80211_CMD_CONNECT or %NL80211_CMD_ROAM. If the 4 way handshake failed',
            '%NL80211_CMD_DISCONNECT should be indicated instead.',
        ] },
        { value: 126, name: 'RELOAD_REGDB', orig: 'NL80211_CMD_RELOAD_REGDB', docs: [
            'Request that the regdb firmware file is reloaded.',
        ] },
        { value: 127, name: 'EXTERNAL_AUTH', orig: 'NL80211_CMD_EXTERNAL_AUTH', docs: [
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
        { value: 128, name: 'STA_OPMODE_CHANGED', orig: 'NL80211_CMD_STA_OPMODE_CHANGED', docs: [
            "An event that notify station's",
            'ht opmode or vht opmode changes using any of %NL80211_ATTR_SMPS_MODE,',
            '%NL80211_ATTR_CHANNEL_WIDTH,%NL80211_ATTR_NSS attributes with its',
            'address(specified in %NL80211_ATTR_MAC).',
        ] },
        { value: 129, name: 'CONTROL_PORT_FRAME', orig: 'NL80211_CMD_CONTROL_PORT_FRAME', docs: [
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
        { value: 130, name: 'GET_FTM_RESPONDER_STATS', orig: 'NL80211_CMD_GET_FTM_RESPONDER_STATS', docs: [
            'Retrieve FTM responder statistics, in',
            'the %NL80211_ATTR_FTM_RESPONDER_STATS attribute.',
        ] },
        { value: 131, name: 'PEER_MEASUREMENT_START', orig: 'NL80211_CMD_PEER_MEASUREMENT_START', docs: [
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
        { value: 132, name: 'PEER_MEASUREMENT_RESULT', orig: 'NL80211_CMD_PEER_MEASUREMENT_RESULT', docs: [
            'This command number is used for the',
            'result notification from the driver to the requesting socket.',
        ] },
        { value: 133, name: 'PEER_MEASUREMENT_COMPLETE', orig: 'NL80211_CMD_PEER_MEASUREMENT_COMPLETE', docs: [
            'Notification only, indicating that',
            'the measurement completed, using the measurement cookie',
            '(%NL80211_ATTR_COOKIE).',
        ] },
        { value: 134, name: 'NOTIFY_RADAR', orig: 'NL80211_CMD_NOTIFY_RADAR', docs: [
            'Notify the kernel that a radar signal was',
            'detected and reported by a neighboring device on the channel',
            'indicated by %NL80211_ATTR_WIPHY_FREQ and other attributes',
            'determining the width and type.',
        ] },
        { value: 135, name: 'UPDATE_OWE_INFO', orig: 'NL80211_CMD_UPDATE_OWE_INFO', docs: [
            'This interface allows the host driver to',
            'offload OWE processing to user space. This intends to support',
            'OWE AKM by the host drivers that implement SME but rely',
            'on the user space for the cryptographic/DH IE processing in AP mode.',
        ] },
        { value: 136, name: 'PROBE_MESH_LINK', orig: 'NL80211_CMD_PROBE_MESH_LINK', docs: [
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

    Message: { root: true, orig: 'nl80211_attrs', docs: [
        'nl80211 netlink attributes',
    ], attrs: [
        ['wiphy', u32, { orig: 'NL80211_ATTR_WIPHY', docs: [
            'index of wiphy to operate on, cf.',
            '/sys/class/ieee80211/<phyname>/index',
        ] }],
        ['wiphyName', string, { orig: 'NL80211_ATTR_WIPHY_NAME', docs: [
            'wiphy name (used for renaming)',
        ] }],
        ['ifindex', u32, { orig: 'NL80211_ATTR_IFINDEX', docs: [
            'network interface index of the device to operate on',
        ] }],
        ['ifname', string, { orig: 'NL80211_ATTR_IFNAME', docs: [
            'network interface name',
        ] }],
        ['iftype', u32, { type: 'InterfaceType', orig: 'NL80211_ATTR_IFTYPE', docs: [
            'type of virtual interface, see &enum nl80211_iftype',
        ] }],
        ['mac', data, { orig: 'NL80211_ATTR_MAC', docs: [
            'MAC address (various uses)',
        ] }],
        ['keyData', data, { orig: 'NL80211_ATTR_KEY_DATA', docs: [
            '(temporal) key data; for TKIP this consists of',
            '16 bytes encryption key followed by 8 bytes each for TX and RX MIC',
            'keys',
        ] }],
        ['keyIdx', u8, { orig: 'NL80211_ATTR_KEY_IDX', docs: [
            'key ID (u8, 0-3)',
        ] }],
        ['keyCipher', u32, { orig: 'NL80211_ATTR_KEY_CIPHER', docs: [
            'key cipher suite (u32, as defined by IEEE 802.11',
            'section 7.3.2.25.1, e.g. 0x000FAC04)',
        ] }],
        ['keySeq', data, { orig: 'NL80211_ATTR_KEY_SEQ', docs: [
            'transmit key sequence number (IV/PN) for TKIP and',
            'CCMP keys, each six bytes in little endian',
        ] }],
        ['keyDefault', flag, { orig: 'NL80211_ATTR_KEY_DEFAULT', docs: [
            'Flag attribute indicating the key is default key',
        ] }],
        ['beaconInterval', u32, { orig: 'NL80211_ATTR_BEACON_INTERVAL', docs: [
            'beacon interval in TU',
        ] }],
        ['dtimPeriod', u32, { orig: 'NL80211_ATTR_DTIM_PERIOD', docs: [
            'DTIM period for beaconing',
        ] }],
        ['beaconHead', data, { orig: 'NL80211_ATTR_BEACON_HEAD', docs: [
            'portion of the beacon before the TIM IE',
        ] }],
        ['beaconTail', data, { orig: 'NL80211_ATTR_BEACON_TAIL', docs: [
            'portion of the beacon after the TIM IE',
        ] }],
        ['staAid', u16, { orig: 'NL80211_ATTR_STA_AID', docs: [
            'Association ID for the station (u16)',
        ] }],
        ['staFlags', 'StationFlags', { orig: 'NL80211_ATTR_STA_FLAGS', docs: [
            'flags, nested element with NLA_FLAG attributes of',
            '&enum nl80211_sta_flags (deprecated, use %NL80211_ATTR_STA_FLAGS2)',
        ] }],
        ['staListenInterval', u16, { orig: 'NL80211_ATTR_STA_LISTEN_INTERVAL', docs: [
            'listen interval as defined by',
            'IEEE 802.11 7.3.1.6 (u16).',
        ] }],
        ['staSupportedRates', data, { orig: 'NL80211_ATTR_STA_SUPPORTED_RATES', docs: [
            'supported rates, array of supported',
            'rates as defined by IEEE 802.11 7.3.2.2 but without the length',
            'restriction (at most %NL80211_MAX_SUPP_RATES).',
        ] }],
        ['staVlan', u32, { orig: 'NL80211_ATTR_STA_VLAN', docs: [
            'interface index of VLAN interface to move station',
            'to, or the AP interface the station was originally added to to.',
        ] }],
        ['staInfo', 'StationInfo', { orig: 'NL80211_ATTR_STA_INFO', docs: [
            'information about a station, part of station info',
            'given for %NL80211_CMD_GET_STATION, nested attribute containing',
            'info as possible, see &enum nl80211_sta_info.',
        ] }],
        ['wiphyBands', array('Band', { zero: true }), { orig: 'NL80211_ATTR_WIPHY_BANDS', docs: [
            'Information about an operating bands,',
            'consisting of a nested array.',
        ] }],
        ['mntrFlags', 'MonitorFlags', { orig: 'NL80211_ATTR_MNTR_FLAGS', docs: [
            'flags, nested element with NLA_FLAG attributes of',
            '&enum nl80211_mntr_flags.',
        ] }],
        ['meshId', data, { orig: 'NL80211_ATTR_MESH_ID', docs: [
            'mesh id (1-32 bytes).',
        ] }],
        ['staPlinkAction', u8, { type: 'PlinkAction', orig: 'NL80211_ATTR_STA_PLINK_ACTION', docs: [
            'action to perform on the mesh peer link',
            '(see &enum nl80211_plink_action).',
        ] }],
        ['mpathNextHop', data, { orig: 'NL80211_ATTR_MPATH_NEXT_HOP', docs: [
            'MAC address of the next hop for a mesh path.',
        ] }],
        ['mpathInfo', 'MpathInfo', { orig: 'NL80211_ATTR_MPATH_INFO', docs: [
            'information about a mesh_path, part of mesh path',
            'info given for %NL80211_CMD_GET_MPATH, nested attribute described at',
            '&enum nl80211_mpath_info.',
        ] }],
        ['bssCtsProt', bool, { orig: 'NL80211_ATTR_BSS_CTS_PROT', docs: [
            'whether CTS protection is enabled (u8, 0 or 1)',
        ] }],
        ['bssShortPreamble', bool, { orig: 'NL80211_ATTR_BSS_SHORT_PREAMBLE', docs: [
            'whether short preamble is enabled',
            '(u8, 0 or 1)',
        ] }],
        ['bssShortSlotTime', bool, { orig: 'NL80211_ATTR_BSS_SHORT_SLOT_TIME', docs: [
            'whether short slot time enabled',
            '(u8, 0 or 1)',
        ] }],
        ['htCapability', data, { orig: 'NL80211_ATTR_HT_CAPABILITY', docs: [
            'HT Capability information element (from',
            'association request when used with NL80211_CMD_NEW_STATION)',
        ] }],
        ['supportedIftypes', asflags('InterfaceType'), { orig: 'NL80211_ATTR_SUPPORTED_IFTYPES', docs: [
            'nested attribute containing all',
            'supported interface types, each a flag attribute with the number',
            'of the interface mode.',
        ] }],
        ['regAlpha2', string, { orig: 'NL80211_ATTR_REG_ALPHA2', docs: [
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
        ['regRules', array('RegulatoryRule'), { orig: 'NL80211_ATTR_REG_RULES', docs: [
            'a nested array of regulatory domain regulatory',
            'rules.',
        ] }],
        ['meshConfig', 'MeshconfParams', { orig: 'NL80211_ATTR_MESH_CONFIG', docs: [
            'Mesh configuration parameters, a nested attribute',
            'containing attributes from &enum nl80211_meshconf_params.',
        ] }],
        ['bssBasicRates', data, { orig: 'NL80211_ATTR_BSS_BASIC_RATES', docs: [
            'basic rates, array of basic',
            'rates in format defined by IEEE 802.11 7.3.2.2 but without the length',
            'restriction (at most %NL80211_MAX_SUPP_RATES).',
        ] }],
        ['wiphyTxqParams', array('Txq'), { orig: 'NL80211_ATTR_WIPHY_TXQ_PARAMS', docs: [
            'a nested array of TX queue parameters',
        ] }],
        ['wiphyFreq', u32, { orig: 'NL80211_ATTR_WIPHY_FREQ', docs: [
            'frequency of the selected channel in MHz,',
            'defines the channel together with the (deprecated)',
            '%NL80211_ATTR_WIPHY_CHANNEL_TYPE attribute or the attributes',
            '%NL80211_ATTR_CHANNEL_WIDTH and if needed %NL80211_ATTR_CENTER_FREQ1',
            'and %NL80211_ATTR_CENTER_FREQ2',
        ] }],
        ['wiphyChannelType', u32, { orig: 'NL80211_ATTR_WIPHY_CHANNEL_TYPE', docs: [
            'included with NL80211_ATTR_WIPHY_FREQ',
            'if HT20 or HT40 are to be used (i.e., HT disabled if not included):',
            'NL80211_CHAN_NO_HT = HT not allowed (i.e., same as not including',
            'this attribute)',
            'NL80211_CHAN_HT20 = HT20 only',
            'NL80211_CHAN_HT40MINUS = secondary channel is below the primary channel',
            'NL80211_CHAN_HT40PLUS = secondary channel is above the primary channel',
            'This attribute is now deprecated.',
        ] }],
        ['keyDefaultMgmt', flag, { orig: 'NL80211_ATTR_KEY_DEFAULT_MGMT', docs: [
            'Flag attribute indicating the key is the',
            'default management key',
        ] }],
        ['mgmtSubtype', u8, { orig: 'NL80211_ATTR_MGMT_SUBTYPE', docs: [
            'Management frame subtype for',
            '%NL80211_CMD_SET_MGMT_EXTRA_IE.',
        ] }],
        ['ie', data, { orig: 'NL80211_ATTR_IE', docs: [
            'Information element(s) data (used, e.g., with',
            '%NL80211_CMD_SET_MGMT_EXTRA_IE).',
        ] }],
        ['maxNumScanSsids', u8, { orig: 'NL80211_ATTR_MAX_NUM_SCAN_SSIDS', docs: [
            'number of SSIDs you can scan with',
            'a single scan request, a wiphy attribute.',
        ] }],
        ['scanFrequencies', data, { orig: 'NL80211_ATTR_SCAN_FREQUENCIES', docs: [
            'nested attribute with frequencies (in MHz)',
        ] }],
        ['scanSsids', data, { orig: 'NL80211_ATTR_SCAN_SSIDS', docs: [
            'nested attribute with SSIDs, leave out for passive',
            'scanning and include a zero-length SSID (wildcard) for wildcard scan',
        ] }],
        ['generation', u32, { orig: 'NL80211_ATTR_GENERATION', docs: [
            'Used to indicate consistent snapshots for',
            'dumps. This number increases whenever the object list being',
            'dumped changes, and as such userspace can verify that it has',
            'obtained a complete and consistent snapshot by verifying that',
            'all dump messages contain the same generation number. If it',
            'changed then the list changed and the dump should be repeated',
            'completely from scratch.',
        ] }],
        ['bss', data, { orig: 'NL80211_ATTR_BSS', docs: [
            'scan result BSS',
        ] }],
        ['regInitiator', data, { orig: 'NL80211_ATTR_REG_INITIATOR', docs: [
            'indicates who requested the regulatory domain',
            'currently in effect. This could be any of the %NL80211_REGDOM_SET_BY_*',
        ] }],
        ['regType', u8, { type: 'RegulatoryType', orig: 'NL80211_ATTR_REG_TYPE', docs: [
            'indicates the type of the regulatory domain currently',
            'set. This can be one of the nl80211_reg_type (%NL80211_REGDOM_TYPE_*)',
        ] }],
        ['supportedCommands', array(u32), { orig: 'NL80211_ATTR_SUPPORTED_COMMANDS', docs: [
            'wiphy attribute that specifies',
            'an array of command numbers (i.e. a mapping index to command number)',
            'that the driver for the given wiphy supports.',
        ] }],
        ['frame', data, { orig: 'NL80211_ATTR_FRAME', docs: [
            'frame data (binary attribute), including frame header',
            'and body, but not FCS; used, e.g., with NL80211_CMD_AUTHENTICATE and',
            'NL80211_CMD_ASSOCIATE events',
        ] }],
        ['ssid', data, { orig: 'NL80211_ATTR_SSID', docs: [
            'SSID (binary attribute, 0..32 octets)',
        ] }],
        ['authType', u32, { type: 'AuthType', orig: 'NL80211_ATTR_AUTH_TYPE', docs: [
            'AuthenticationType, see &enum nl80211_auth_type,',
            'represented as a u32',
        ] }],
        ['reasonCode', u16, { orig: 'NL80211_ATTR_REASON_CODE', docs: [
            'ReasonCode for %NL80211_CMD_DEAUTHENTICATE and',
            '%NL80211_CMD_DISASSOCIATE, u16',
        ] }],
        ['keyType', u32, { type: 'KeyType', orig: 'NL80211_ATTR_KEY_TYPE', docs: [
            'Key Type, see &enum nl80211_key_type, represented as',
            'a u32',
        ] }],
        ['maxScanIeLen', u16, { orig: 'NL80211_ATTR_MAX_SCAN_IE_LEN', docs: [
            'maximum length of information elements',
            'that can be added to a scan request',
        ] }],
        ['cipherSuites', data, { orig: 'NL80211_ATTR_CIPHER_SUITES', docs: [
            'a set of u32 values indicating the supported',
            'cipher suites',
        ] }],
        ['freqBefore', data, { orig: 'NL80211_ATTR_FREQ_BEFORE', docs: [
            'A channel which has suffered a regulatory change',
            'due to considerations from a beacon hint. This attribute reflects',
            'the state of the channel _before_ the beacon hint processing. This',
            'attributes consists of a nested attribute containing',
            'NL80211_FREQUENCY_ATTR_*',
        ] }],
        ['freqAfter', data, { orig: 'NL80211_ATTR_FREQ_AFTER', docs: [
            'A channel which has suffered a regulatory change',
            'due to considerations from a beacon hint. This attribute reflects',
            'the state of the channel _after_ the beacon hint processing. This',
            'attributes consists of a nested attribute containing',
            'NL80211_FREQUENCY_ATTR_*',
        ] }],
        ['freqFixed', flag, { orig: 'NL80211_ATTR_FREQ_FIXED', docs: [
            'a flag indicating the IBSS should not try to look',
            'for other networks on different channels',
        ] }],
        ['wiphyRetryShort', u8, { orig: 'NL80211_ATTR_WIPHY_RETRY_SHORT', docs: [
            'TX retry limit for frames whose length is',
            'less than or equal to the RTS threshold; allowed range: 1..255;',
            'dot11ShortRetryLimit; u8',
        ] }],
        ['wiphyRetryLong', u8, { orig: 'NL80211_ATTR_WIPHY_RETRY_LONG', docs: [
            'TX retry limit for frames whose length is',
            'greater than the RTS threshold; allowed range: 1..255;',
            'dot11ShortLongLimit; u8',
        ] }],
        ['wiphyFragThreshold', u32, { orig: 'NL80211_ATTR_WIPHY_FRAG_THRESHOLD', docs: [
            'fragmentation threshold, i.e., maximum',
            'length in octets for frames; allowed range: 256..8000, disable',
            'fragmentation with (u32)-1; dot11FragmentationThreshold; u32',
        ] }],
        ['wiphyRtsThreshold', u32, { orig: 'NL80211_ATTR_WIPHY_RTS_THRESHOLD', docs: [
            'RTS threshold (TX frames with length',
            'larger than or equal to this use RTS/CTS handshake); allowed range:',
            '0..65536, disable with (u32)-1; dot11RTSThreshold; u32',
        ] }],
        ['timedOut', flag, { orig: 'NL80211_ATTR_TIMED_OUT', docs: [
            'a flag indicating than an operation timed out; this',
            'is used, e.g., with %NL80211_CMD_AUTHENTICATE event',
        ] }],
        ['useMfp', u32, { type: 'Mfp', orig: 'NL80211_ATTR_USE_MFP', docs: [
            'Whether management frame protection (IEEE 802.11w) is',
            'used for the association (&enum nl80211_mfp, represented as a u32);',
            'this attribute can be used with %NL80211_CMD_ASSOCIATE and',
            '%NL80211_CMD_CONNECT requests. %NL80211_MFP_OPTIONAL is not allowed for',
            '%NL80211_CMD_ASSOCIATE since user space SME is expected and hence, it',
            'must have decided whether to use management frame protection or not.',
            'Setting %NL80211_MFP_OPTIONAL with a %NL80211_CMD_CONNECT request will',
            'let the driver (or the firmware) decide whether to use MFP or not.',
        ] }],
        ['staFlags2', data, { orig: 'NL80211_ATTR_STA_FLAGS2', docs: [
            'Attribute containing a',
            '&struct nl80211_sta_flag_update.',
        ] }],
        ['controlPort', flag, { orig: 'NL80211_ATTR_CONTROL_PORT', docs: [
            'A flag indicating whether user space controls',
            'IEEE 802.1X port, i.e., sets/clears %NL80211_STA_FLAG_AUTHORIZED, in',
            'station mode. If the flag is included in %NL80211_CMD_ASSOCIATE',
            'request, the driver will assume that the port is unauthorized until',
            'authorized by user space. Otherwise, port is marked authorized by',
            'default in station mode.',
        ] }],
        ['testdata', data, { orig: 'NL80211_ATTR_TESTDATA', docs: [
            'Testmode data blob, passed through to the driver.',
            'We recommend using nested, driver-specific attributes within this.',
        ] }],
        ['privacy', flag, { orig: 'NL80211_ATTR_PRIVACY', docs: [
            'Flag attribute, used with connect(), indicating',
            'that protected APs should be used. This is also used with NEW_BEACON to',
            'indicate that the BSS is to use protection.',
        ] }],
        ['disconnectedByAp', flag, { orig: 'NL80211_ATTR_DISCONNECTED_BY_AP', docs: [
            'A flag indicating that the DISCONNECT',
            'event was due to the AP disconnecting the station, and not due to',
            'a local disconnect request.',
        ] }],
        ['statusCode', u16, { orig: 'NL80211_ATTR_STATUS_CODE', docs: [
            'StatusCode for the %NL80211_CMD_CONNECT',
            'event (u16)',
        ] }],
        ['cipherSuitesPairwise', u32, { orig: 'NL80211_ATTR_CIPHER_SUITES_PAIRWISE', docs: [
            'For crypto settings for connect or',
            'other commands, indicates which pairwise cipher suites are used',
        ] }],
        ['cipherSuiteGroup', u32, { orig: 'NL80211_ATTR_CIPHER_SUITE_GROUP', docs: [
            'For crypto settings for connect or',
            'other commands, indicates which group cipher suite is used',
        ] }],
        ['wpaVersions', u32, { type: 'WpaVersions', orig: 'NL80211_ATTR_WPA_VERSIONS', docs: [
            'Used with CONNECT, ASSOCIATE, and NEW_BEACON to',
            'indicate which WPA version(s) the AP we want to associate with is using',
            '(a u32 with flags from &enum nl80211_wpa_versions).',
        ] }],
        ['akmSuites', u32, { orig: 'NL80211_ATTR_AKM_SUITES', docs: [
            'Used with CONNECT, ASSOCIATE, and NEW_BEACON to',
            'indicate which key management algorithm(s) to use (an array of u32).',
            'This attribute is also sent in response to @NL80211_CMD_GET_WIPHY,',
            'indicating the supported AKM suites, intended for specific drivers which',
            'implement SME and have constraints on which AKMs are supported and also',
            'the cases where an AKM support is offloaded to the driver/firmware.',
            'If there is no such notification from the driver, user space should',
            'assume the driver supports all the AKM suites.',
        ] }],
        ['reqIe', data, { orig: 'NL80211_ATTR_REQ_IE', docs: [
            '(Re)association request information elements as',
            'sent out by the card, for ROAM and successful CONNECT events.',
        ] }],
        ['respIe', data, { orig: 'NL80211_ATTR_RESP_IE', docs: [
            '(Re)association response information elements as',
            'sent by peer, for ROAM and successful CONNECT events.',
        ] }],
        ['prevBssid', data, { orig: 'NL80211_ATTR_PREV_BSSID', docs: [
            'previous BSSID, to be used in ASSOCIATE and CONNECT',
            'commands to specify a request to reassociate within an ESS, i.e., to use',
            'Reassociate Request frame (with the value of this attribute in the',
            'Current AP address field) instead of Association Request frame which is',
            'used for the initial association to an ESS.',
        ] }],
        ['key', data, { orig: 'NL80211_ATTR_KEY', docs: [
            'key information in a nested attribute with',
            '%NL80211_KEY_* sub-attributes',
        ] }],
        ['keys', data, { orig: 'NL80211_ATTR_KEYS', docs: [
            'array of keys for static WEP keys for connect()',
            'and join_ibss(), key information is in a nested attribute each',
            'with %NL80211_KEY_* sub-attributes',
        ] }],
        ['pid', u32, { orig: 'NL80211_ATTR_PID', docs: [
            'Process ID of a network namespace.',
        ] }],
        ['_4addr', u8, { orig: 'NL80211_ATTR_4ADDR', docs: [
            'Use 4-address frames on a virtual interface',
        ] }],
        ['surveyInfo', 'SurveyInfo', { orig: 'NL80211_ATTR_SURVEY_INFO', docs: [
            'survey information about a channel, part of',
            'the survey response for %NL80211_CMD_GET_SURVEY, nested attribute',
            'containing info as possible, see &enum survey_info.',
        ] }],
        ['pmkid', data, { orig: 'NL80211_ATTR_PMKID', docs: [
            'PMK material for PMKSA caching.',
        ] }],
        ['maxNumPmkids', u8, { orig: 'NL80211_ATTR_MAX_NUM_PMKIDS', docs: [
            'maximum number of PMKIDs a firmware can',
            'cache, a wiphy attribute.',
        ] }],
        ['duration', u32, { orig: 'NL80211_ATTR_DURATION', docs: [
            'Duration of an operation in milliseconds, u32.',
        ] }],
        ['cookie', u64, { orig: 'NL80211_ATTR_COOKIE', docs: [
            'Generic 64-bit cookie to identify objects.',
        ] }],
        ['wiphyCoverageClass', u8, { orig: 'NL80211_ATTR_WIPHY_COVERAGE_CLASS', docs: [
            'Coverage Class as defined by IEEE 802.11',
            'section 7.3.2.9; dot11CoverageClass; u8',
        ] }],
        ['txRates', map('TxRate'), { orig: 'NL80211_ATTR_TX_RATES', docs: [
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
        ['frameMatch', data, { orig: 'NL80211_ATTR_FRAME_MATCH', docs: [
            'A binary attribute which typically must contain',
            'at least one byte, currently used with @NL80211_CMD_REGISTER_FRAME.',
        ] }],
        ['ack', flag, { orig: 'NL80211_ATTR_ACK', docs: [
            'Flag attribute indicating that the frame was',
            'acknowledged by the recipient.',
        ] }],
        ['psState', u32, { type: 'PsState', orig: 'NL80211_ATTR_PS_STATE', docs: [
            'powersave state, using &enum nl80211_ps_state values.',
        ] }],
        ['cqm', 'Cqm', { orig: 'NL80211_ATTR_CQM', docs: [
            'connection quality monitor configuration in a',
            'nested attribute with %NL80211_ATTR_CQM_* sub-attributes.',
        ] }],
        ['localStateChange', flag, { orig: 'NL80211_ATTR_LOCAL_STATE_CHANGE', docs: [
            'Flag attribute to indicate that a command',
            'is requesting a local authentication/association state change without',
            'invoking actual management frame exchange. This can be used with',
            'NL80211_CMD_AUTHENTICATE, NL80211_CMD_DEAUTHENTICATE,',
            'NL80211_CMD_DISASSOCIATE.',
        ] }],
        ['apIsolate', flag, { orig: 'NL80211_ATTR_AP_ISOLATE', docs: [
            '(AP mode) Do not forward traffic between stations',
            'connected to this BSS.',
        ] }],
        ['wiphyTxPowerSetting', u32, { type: 'TxPowerSetting', orig: 'NL80211_ATTR_WIPHY_TX_POWER_SETTING', docs: [
            'Transmit power setting type. See',
            '&enum nl80211_tx_power_setting for possible values.',
        ] }],
        ['wiphyTxPowerLevel', s32, { orig: 'NL80211_ATTR_WIPHY_TX_POWER_LEVEL', docs: [
            'Transmit power level in signed mBm units.',
            'This is used in association with @NL80211_ATTR_WIPHY_TX_POWER_SETTING',
            'for non-automatic settings.',
        ] }],
        ['txFrameTypes', array(data, { zero: true }), { orig: 'NL80211_ATTR_TX_FRAME_TYPES', docs: [
            'wiphy capability attribute, which is a',
            'nested attribute of %NL80211_ATTR_FRAME_TYPE attributes, containing',
            'information about which frame types can be transmitted with',
            '%NL80211_CMD_FRAME.',
        ] }],
        ['rxFrameTypes', array(data, { zero: true }), { orig: 'NL80211_ATTR_RX_FRAME_TYPES', docs: [
            'wiphy capability attribute, which is a',
            'nested attribute of %NL80211_ATTR_FRAME_TYPE attributes, containing',
            'information about which frame types can be registered for RX.',
        ] }],
        ['frameType', u16, { orig: 'NL80211_ATTR_FRAME_TYPE', docs: [
            'A u16 indicating the frame type/subtype for the',
            '@NL80211_CMD_REGISTER_FRAME command.',
        ] }],
        ['controlPortEthertype', data, { orig: 'NL80211_ATTR_CONTROL_PORT_ETHERTYPE', docs: [
            'A 16-bit value indicating the',
            'ethertype that will be used for key negotiation. It can be',
            'specified with the associate and connect commands. If it is not',
            'specified, the value defaults to 0x888E (PAE, 802.1X). This',
            'attribute is also used as a flag in the wiphy information to',
            'indicate that protocols other than PAE are supported.',
        ] }],
        ['controlPortNoEncrypt', flag, { orig: 'NL80211_ATTR_CONTROL_PORT_NO_ENCRYPT', docs: [
            'When included along with',
            '%NL80211_ATTR_CONTROL_PORT_ETHERTYPE, indicates that the custom',
            'ethertype frames used for key negotiation must not be encrypted.',
        ] }],
        ['supportIbssRsn', flag, { orig: 'NL80211_ATTR_SUPPORT_IBSS_RSN', docs: [
            'The device supports IBSS RSN, which mostly',
            'means support for per-station GTKs.',
        ] }],
        ['wiphyAntennaTx', u32, { orig: 'NL80211_ATTR_WIPHY_ANTENNA_TX', docs: [
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
        ['wiphyAntennaRx', u32, { orig: 'NL80211_ATTR_WIPHY_ANTENNA_RX', docs: [
            'Bitmap of allowed antennas for receiving.',
            'This can be used to mask out antennas which are not attached or should',
            'not be used for receiving. If an antenna is not selected in this bitmap',
            'the hardware should not be configured to receive on this antenna.',
            'For a more detailed description see @NL80211_ATTR_WIPHY_ANTENNA_TX.',
        ] }],
        ['mcastRate', u32, { orig: 'NL80211_ATTR_MCAST_RATE', docs: [
            'Multicast tx rate (in 100 kbps) for IBSS',
        ] }],
        ['offchannelTxOk', flag, { orig: 'NL80211_ATTR_OFFCHANNEL_TX_OK', docs: [
            'For management frame TX, the frame may be',
            "transmitted on another channel when the channel given doesn't match",
            "the current channel. If the current channel doesn't match and this",
            "flag isn't set, the frame will be rejected. This is also used as an",
            'nl80211 capability flag.',
        ] }],
        ['bssHtOpmode', u16, { orig: 'NL80211_ATTR_BSS_HT_OPMODE', docs: [
            'HT operation mode (u16)',
        ] }],
        ['keyDefaultTypes', 'KeyDefaultTypes', { orig: 'NL80211_ATTR_KEY_DEFAULT_TYPES', docs: [
            'A nested attribute containing flags',
            'attributes, specifying what a key should be set as default as.',
            'See &enum nl80211_key_default_types.',
        ] }],
        ['maxRemainOnChannelDuration', u32, { orig: 'NL80211_ATTR_MAX_REMAIN_ON_CHANNEL_DURATION', docs: [
            'Device attribute that',
            'specifies the maximum duration that can be requested with the',
            'remain-on-channel operation, in milliseconds, u32.',
        ] }],
        ['meshSetup', data, { orig: 'NL80211_ATTR_MESH_SETUP', docs: [
            'Optional mesh setup parameters.  These cannot be',
            'changed once the mesh is active.',
        ] }],
        ['wiphyAntennaAvailTx', u32, { orig: 'NL80211_ATTR_WIPHY_ANTENNA_AVAIL_TX', docs: [
            'Bitmap of antennas which are available',
            'for configuration as TX antennas via the above parameters.',
        ] }],
        ['wiphyAntennaAvailRx', u32, { orig: 'NL80211_ATTR_WIPHY_ANTENNA_AVAIL_RX', docs: [
            'Bitmap of antennas which are available',
            'for configuration as RX antennas via the above parameters.',
        ] }],
        ['supportMeshAuth', flag, { orig: 'NL80211_ATTR_SUPPORT_MESH_AUTH', docs: [
            'Currently, this means the underlying driver',
            'allows auth frames in a mesh to be passed to userspace for processing via',
            'the @NL80211_MESH_SETUP_USERSPACE_AUTH flag.',
        ] }],
        ['staPlinkState', data, { type: 'PlinkState', orig: 'NL80211_ATTR_STA_PLINK_STATE', docs: [
            'The state of a mesh peer link as defined in',
            '&enum nl80211_plink_state. Used when userspace is driving the peer link',
            'management state machine.  @NL80211_MESH_SETUP_USERSPACE_AMPE or',
            '@NL80211_MESH_SETUP_USERSPACE_MPM must be enabled.',
        ] }],
        ['wowlanTriggers', 'WowlanTriggers', { orig: 'NL80211_ATTR_WOWLAN_TRIGGERS', docs: [
            'used by %NL80211_CMD_SET_WOWLAN to',
            'indicate which WoW triggers should be enabled. This is also',
            'used by %NL80211_CMD_GET_WOWLAN to get the currently enabled WoWLAN',
            'triggers.',
        ] }],
        ['wowlanTriggersSupported', 'WowlanTriggers', { orig: 'NL80211_ATTR_WOWLAN_TRIGGERS_SUPPORTED', docs: [
            'indicates, as part of the wiphy',
            'capabilities, the supported WoWLAN triggers',
        ] }],
        ['schedScanInterval', u32, { orig: 'NL80211_ATTR_SCHED_SCAN_INTERVAL', docs: [
            'Interval between scheduled scan',
            'cycles, in msecs.',
        ] }],
        ['interfaceCombinations', array('InterfaceCombination'), { orig: 'NL80211_ATTR_INTERFACE_COMBINATIONS', docs: [
            'Nested attribute listing the supported',
            'interface combinations. In each nested item, it contains attributes',
            'defined in &enum nl80211_if_combination_attrs.',
        ] }],
        ['softwareIftypes', asflags('InterfaceType'), { orig: 'NL80211_ATTR_SOFTWARE_IFTYPES', docs: [
            'Nested attribute (just like',
            '%NL80211_ATTR_SUPPORTED_IFTYPES) containing the interface types that',
            "are managed in software: interfaces of these types aren't subject to",
            'any restrictions in their number or combinations.',
        ] }],
        ['rekeyData', 'RekeyData', { orig: 'NL80211_ATTR_REKEY_DATA', docs: [
            'nested attribute containing the information',
            'necessary for GTK rekeying in the device, see &enum nl80211_rekey_data.',
        ] }],
        ['maxNumSchedScanSsids', u8, { orig: 'NL80211_ATTR_MAX_NUM_SCHED_SCAN_SSIDS', docs: [
            'number of SSIDs you can',
            'scan with a single scheduled scan request, a wiphy attribute.',
        ] }],
        ['maxSchedScanIeLen', u16, { orig: 'NL80211_ATTR_MAX_SCHED_SCAN_IE_LEN', docs: [
            'maximum length of information',
            'elements that can be added to a scheduled scan request',
        ] }],
        ['scanSuppRates', array(data), { orig: 'NL80211_ATTR_SCAN_SUPP_RATES', docs: [
            'rates per to be advertised as supported in scan,',
            'nested array attribute containing an entry for each band, with the entry',
            'being a list of supported rates as defined by IEEE 802.11 7.3.2.2 but',
            'without the length restriction (at most %NL80211_MAX_SUPP_RATES).',
        ] }],
        ['hiddenSsid', u32, { type: 'HiddenSsid', orig: 'NL80211_ATTR_HIDDEN_SSID', docs: [
            'indicates whether SSID is to be hidden from Beacon',
            'and Probe Response (when response to wildcard Probe Request); see',
            '&enum nl80211_hidden_ssid, represented as a u32',
        ] }],
        ['ieProbeResp', data, { orig: 'NL80211_ATTR_IE_PROBE_RESP', docs: [
            'Information element(s) for Probe Response frame.',
            'This is used with %NL80211_CMD_NEW_BEACON and %NL80211_CMD_SET_BEACON to',
            'provide extra IEs (e.g., WPS/P2P IE) into Probe Response frames when the',
            'driver (or firmware) replies to Probe Request frames.',
        ] }],
        ['ieAssocResp', data, { orig: 'NL80211_ATTR_IE_ASSOC_RESP', docs: [
            'Information element(s) for (Re)Association',
            'Response frames. This is used with %NL80211_CMD_NEW_BEACON and',
            '%NL80211_CMD_SET_BEACON to provide extra IEs (e.g., WPS/P2P IE) into',
            '(Re)Association Response frames when the driver (or firmware) replies to',
            '(Re)Association Request frames.',
        ] }],
        ['staWme', 'StationWme', { orig: 'NL80211_ATTR_STA_WME', docs: [
            'Nested attribute containing the wme configuration',
            'of the station, see &enum nl80211_sta_wme_attr.',
        ] }],
        ['supportApUapsd', flag, { orig: 'NL80211_ATTR_SUPPORT_AP_UAPSD', docs: [
            'the device supports uapsd when working',
            'as AP.',
        ] }],
        ['roamSupport', flag, { orig: 'NL80211_ATTR_ROAM_SUPPORT', docs: [
            'Indicates whether the firmware is capable of',
            'roaming to another AP in the same ESS if the signal lever is low.',
        ] }],
        ['schedScanMatch', array(data), { orig: 'NL80211_ATTR_SCHED_SCAN_MATCH', docs: [
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
        ['maxMatchSets', u8, { orig: 'NL80211_ATTR_MAX_MATCH_SETS', docs: [
            'maximum number of sets that can be',
            'used with @NL80211_ATTR_SCHED_SCAN_MATCH, a wiphy attribute.',
        ] }],
        ['pmksaCandidate', 'PmksaCandidate', { orig: 'NL80211_ATTR_PMKSA_CANDIDATE', docs: [
            'Nested attribute containing the PMKSA caching',
            'candidate information, see &enum nl80211_pmksa_candidate_attr.',
        ] }],
        ['txNoCckRate', data, { orig: 'NL80211_ATTR_TX_NO_CCK_RATE', docs: [
            'Indicates whether to use CCK rate or not',
            'for management frames transmission. In order to avoid p2p probe/action',
            'frames are being transmitted at CCK rate in 2GHz band, the user space',
            'applications use this attribute.',
            'This attribute is used with %NL80211_CMD_TRIGGER_SCAN and',
            '%NL80211_CMD_FRAME commands.',
        ] }],
        ['tdlsAction', data, { orig: 'NL80211_ATTR_TDLS_ACTION', docs: [
            'Low level TDLS action code (e.g. link setup',
            'request, link setup confirm, link teardown, etc.). Values are',
            'described in the TDLS (802.11z) specification.',
        ] }],
        ['tdlsDialogToken', data, { orig: 'NL80211_ATTR_TDLS_DIALOG_TOKEN', docs: [
            'Non-zero token for uniquely identifying a',
            'TDLS conversation between two devices.',
        ] }],
        ['tdlsOperation', u8, { type: 'TdlsOperation', orig: 'NL80211_ATTR_TDLS_OPERATION', docs: [
            'High level TDLS operation; see',
            '&enum nl80211_tdls_operation, represented as a u8.',
        ] }],
        ['tdlsSupport', flag, { orig: 'NL80211_ATTR_TDLS_SUPPORT', docs: [
            'A flag indicating the device can operate',
            'as a TDLS peer sta.',
        ] }],
        ['tdlsExternalSetup', data, { orig: 'NL80211_ATTR_TDLS_EXTERNAL_SETUP', docs: [
            'The TDLS discovery/setup and teardown',
            'procedures should be performed by sending TDLS packets via',
            '%NL80211_CMD_TDLS_MGMT. Otherwise %NL80211_CMD_TDLS_OPER should be',
            'used for asking the driver to perform a TDLS operation.',
        ] }],
        ['deviceApSme', u32, { orig: 'NL80211_ATTR_DEVICE_AP_SME', docs: [
            'This u32 attribute may be listed for devices',
            'that have AP support to indicate that they have the AP SME integrated',
            'with support for the features listed in this attribute, see',
            '&enum nl80211_ap_sme_features.',
        ] }],
        ['dontWaitForAck', flag, { orig: 'NL80211_ATTR_DONT_WAIT_FOR_ACK', docs: [
            'Used with %NL80211_CMD_FRAME, this tells',
            'the driver to not wait for an acknowledgement. Note that due to this,',
            'it will also not give a status callback nor return a cookie. This is',
            'mostly useful for probe responses to save airtime.',
        ] }],
        ['featureFlags', u32, { type: 'FeatureFlags', orig: 'NL80211_ATTR_FEATURE_FLAGS', docs: [
            'This u32 attribute contains flags from',
            '&enum nl80211_feature_flags and is advertised in wiphy information.',
        ] }],
        ['probeRespOffload', data, { type: 'ProbeResponseOffloadSupport', orig: 'NL80211_ATTR_PROBE_RESP_OFFLOAD', docs: [
            'Indicates that the HW responds to probe',
            'requests while operating in AP-mode.',
            'This attribute holds a bitmap of the supported protocols for',
            'offloading (see &enum nl80211_probe_resp_offload_support_attr).',
        ] }],
        ['probeResp', data, { orig: 'NL80211_ATTR_PROBE_RESP', docs: [
            'Probe Response template data. Contains the entire',
            'probe-response frame. The DA field in the 802.11 header is zero-ed out,',
            'to be filled by the FW.',
        ] }],
        ['dfsRegion', u8, { orig: 'NL80211_ATTR_DFS_REGION', docs: [
            'region for regulatory rules which this country',
            'abides to when initiating radiation on DFS channels. A country maps',
            'to one DFS region.',
        ] }],
        ['disableHt', flag, { orig: 'NL80211_ATTR_DISABLE_HT', docs: [
            'Force HT capable interfaces to disable',
            'this feature.  Currently, only supported in mac80211 drivers.',
        ] }],
        ['htCapabilityMask', data, { orig: 'NL80211_ATTR_HT_CAPABILITY_MASK', docs: [
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
        ['noackMap', u16, { orig: 'NL80211_ATTR_NOACK_MAP', docs: [
            'This u16 bitmap contains the No Ack Policy of',
            'up to 16 TIDs.',
        ] }],
        ['inactivityTimeout', u16, { orig: 'NL80211_ATTR_INACTIVITY_TIMEOUT', docs: [
            'timeout value in seconds, this can be',
            'used by the drivers which has MLME in firmware and does not have support',
            'to report per station tx/rx activity to free up the station entry from',
            'the list. This needs to be used when the driver advertises the',
            'capability to timeout the stations.',
        ] }],
        ['rxSignalDbm', u32, { orig: 'NL80211_ATTR_RX_SIGNAL_DBM', docs: [
            'signal strength in dBm (as a 32-bit int);',
            'this attribute is (depending on the driver capabilities) added to',
            'received frames indicated with %NL80211_CMD_FRAME.',
        ] }],
        ['bgScanPeriod', data, { orig: 'NL80211_ATTR_BG_SCAN_PERIOD', docs: [
            'Background scan period in seconds',
            'or 0 to disable background scan.',
        ] }],
        ['wdev', u64, { orig: 'NL80211_ATTR_WDEV', docs: [
            'wireless device identifier, used for pseudo-devices',
            "that don't have a netdev (u64)",
        ] }],
        ['userRegHintType', data, { type: 'UserRegulatoryHintType', orig: 'NL80211_ATTR_USER_REG_HINT_TYPE', docs: [
            'type of regulatory hint passed from',
            'userspace. If unset it is assumed the hint comes directly from',
            'a user. If set code could specify exactly what type of source',
            'was used to provide the hint. For the different types of',
            'allowed user regulatory hints see nl80211_user_reg_hint_type.',
        ] }],
        ['connFailedReason', data, { type: 'ConnectFailedReason', orig: 'NL80211_ATTR_CONN_FAILED_REASON', docs: [
            'The reason for which AP has rejected',
            'the connection request from a station. nl80211_connect_failed_reason',
            'enum has different reasons of connection failure.',
        ] }],
        ['authData', data, { orig: 'NL80211_ATTR_AUTH_DATA', docs: [
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
        ['vhtCapability', data, { orig: 'NL80211_ATTR_VHT_CAPABILITY', docs: [
            'VHT Capability information element (from',
            'association request when used with NL80211_CMD_NEW_STATION)',
        ] }],
        ['scanFlags', u32, { orig: 'NL80211_ATTR_SCAN_FLAGS', docs: [
            'scan request control flags (u32)',
        ] }],
        ['channelWidth', u32, { type: 'ChannelWidth', orig: 'NL80211_ATTR_CHANNEL_WIDTH', docs: [
            'u32 attribute containing one of the values',
            'of &enum nl80211_chan_width, describing the channel width. See the',
            'documentation of the enum for more information.',
        ] }],
        ['centerFreq1', u32, { orig: 'NL80211_ATTR_CENTER_FREQ1', docs: [
            'Center frequency of the first part of the',
            'channel, used for anything but 20 MHz bandwidth',
        ] }],
        ['centerFreq2', u32, { orig: 'NL80211_ATTR_CENTER_FREQ2', docs: [
            'Center frequency of the second part of the',
            'channel, used only for 80+80 MHz bandwidth',
        ] }],
        ['p2pCtwindow', u8, { orig: 'NL80211_ATTR_P2P_CTWINDOW', docs: [
            'P2P GO Client Traffic Window (u8), used with',
            'the START_AP and SET_BSS commands',
        ] }],
        ['p2pOppps', u8, { orig: 'NL80211_ATTR_P2P_OPPPS', docs: [
            'P2P GO opportunistic PS (u8), used with the',
            'START_AP and SET_BSS commands. This can have the values 0 or 1;',
            'if not given in START_AP 0 is assumed, if not given in SET_BSS',
            'no change is made.',
        ] }],
        ['localMeshPowerMode', u32, { type: 'MeshPowerMode', orig: 'NL80211_ATTR_LOCAL_MESH_POWER_MODE', docs: [
            'local mesh STA link-specific power mode',
            'defined in &enum nl80211_mesh_power_mode.',
        ] }],
        ['aclPolicy', u32, { type: 'AclPolicy', orig: 'NL80211_ATTR_ACL_POLICY', docs: [
            'ACL policy, see &enum nl80211_acl_policy,',
            'carried in a u32 attribute',
        ] }],
        ['macAddrs', array(data), { orig: 'NL80211_ATTR_MAC_ADDRS', docs: [
            'Array of nested MAC addresses, used for',
            'MAC ACL.',
        ] }],
        ['macAclMax', u32, { orig: 'NL80211_ATTR_MAC_ACL_MAX', docs: [
            'u32 attribute to advertise the maximum',
            'number of MAC addresses that a device can support for MAC',
            'ACL.',
        ] }],
        ['radarEvent', u32, { type: 'RadarEvent', orig: 'NL80211_ATTR_RADAR_EVENT', docs: [
            'Type of radar event for notification to userspace,',
            'contains a value of enum nl80211_radar_event (u32).',
        ] }],
        ['extCapa', data, { orig: 'NL80211_ATTR_EXT_CAPA', docs: [
            '802.11 extended capabilities that the kernel driver',
            'has and handles. The format is the same as the IE contents. See',
            '802.11-2012 8.4.2.29 for more information.',
        ] }],
        ['extCapaMask', data, { orig: 'NL80211_ATTR_EXT_CAPA_MASK', docs: [
            'Extended capabilities that the kernel driver',
            'has set in the %NL80211_ATTR_EXT_CAPA value, for multibit fields.',
        ] }],
        ['staCapability', u16, { orig: 'NL80211_ATTR_STA_CAPABILITY', docs: [
            'Station capabilities (u16) are advertised to',
            'the driver, e.g., to enable TDLS power save (PU-APSD).',
        ] }],
        ['staExtCapability', data, { orig: 'NL80211_ATTR_STA_EXT_CAPABILITY', docs: [
            'Station extended capabilities are',
            'advertised to the driver, e.g., to enable TDLS off channel operations',
            'and PU-APSD.',
        ] }],
        ['protocolFeatures', u32, { type: 'ProtocolFeatures', orig: 'NL80211_ATTR_PROTOCOL_FEATURES', docs: [
            'global nl80211 feature flags, see',
            '&enum nl80211_protocol_features, the attribute is a u32.',
        ] }],
        ['splitWiphyDump', flag, { orig: 'NL80211_ATTR_SPLIT_WIPHY_DUMP', docs: [
            'flag attribute, userspace supports',
            'receiving the data for a single wiphy split across multiple',
            'messages, given with wiphy dump message',
        ] }],
        ['disableVht', flag, { orig: 'NL80211_ATTR_DISABLE_VHT' }],
        ['vhtCapabilityMask', data, { orig: 'NL80211_ATTR_VHT_CAPABILITY_MASK' }],
        ['mdid', data, { orig: 'NL80211_ATTR_MDID', docs: [
            'Mobility Domain Identifier',
        ] }],
        ['ieRic', data, { orig: 'NL80211_ATTR_IE_RIC', docs: [
            'Resource Information Container Information',
            'Element',
        ] }],
        ['critProtId', u16, { type: 'CritProtoId', orig: 'NL80211_ATTR_CRIT_PROT_ID', docs: [
            'critical protocol identifier requiring increased',
            'reliability, see &enum nl80211_crit_proto_id (u16).',
        ] }],
        ['maxCritProtDuration', u16, { orig: 'NL80211_ATTR_MAX_CRIT_PROT_DURATION', docs: [
            'duration in milliseconds in which',
            'the connection should have increased reliability (u16).',
        ] }],
        ['peerAid', u16, { orig: 'NL80211_ATTR_PEER_AID', docs: [
            'Association ID for the peer TDLS station (u16).',
            'This is similar to @NL80211_ATTR_STA_AID but with a difference of being',
            'allowed to be used with the first @NL80211_CMD_SET_STATION command to',
            'update a TDLS peer STA entry.',
        ] }],
        ['coalesceRule', data, { orig: 'NL80211_ATTR_COALESCE_RULE', docs: [
            'Coalesce rule information.',
        ] }],
        ['chSwitchCount', u32, { orig: 'NL80211_ATTR_CH_SWITCH_COUNT', docs: [
            "u32 attribute specifying the number of TBTT's",
            'until the channel switch event.',
        ] }],
        ['chSwitchBlockTx', flag, { orig: 'NL80211_ATTR_CH_SWITCH_BLOCK_TX', docs: [
            'flag attribute specifying that transmission',
            'must be blocked on the current channel (before the channel switch',
            'operation).',
        ] }],
        ['csaIes', data, { orig: 'NL80211_ATTR_CSA_IES', docs: [
            'Nested set of attributes containing the IE information',
            'for the time while performing a channel switch.',
        ] }],
        ['csaCOffBeacon', u16, { orig: 'NL80211_ATTR_CSA_C_OFF_BEACON', docs: [
            'An array of offsets (u16) to the channel',
            'switch counters in the beacons tail (%NL80211_ATTR_BEACON_TAIL).',
        ] }],
        ['csaCOffPresp', u16, { orig: 'NL80211_ATTR_CSA_C_OFF_PRESP', docs: [
            'An array of offsets (u16) to the channel',
            'switch counters in the probe response (%NL80211_ATTR_PROBE_RESP).',
        ] }],
        ['rxmgmtFlags', u32, { type: 'RxmgmtFlags', orig: 'NL80211_ATTR_RXMGMT_FLAGS', docs: [
            'flags for nl80211_send_mgmt(), u32.',
            'As specified in the &enum nl80211_rxmgmt_flags.',
        ] }],
        ['staSupportedChannels', data, { orig: 'NL80211_ATTR_STA_SUPPORTED_CHANNELS', docs: [
            'array of supported channels.',
        ] }],
        ['staSupportedOperClasses', data, { orig: 'NL80211_ATTR_STA_SUPPORTED_OPER_CLASSES', docs: [
            'array of supported',
            'supported operating classes.',
        ] }],
        ['handleDfs', flag, { orig: 'NL80211_ATTR_HANDLE_DFS', docs: [
            'A flag indicating whether user space',
            'controls DFS operation in IBSS mode. If the flag is included in',
            '%NL80211_CMD_JOIN_IBSS request, the driver will allow use of DFS',
            'channels and reports radar events to userspace. Userspace is required',
            'to react to radar events, e.g. initiate a channel switch or leave the',
            'IBSS network.',
        ] }],
        ['support5Mhz', flag, { orig: 'NL80211_ATTR_SUPPORT_5_MHZ', docs: [
            'A flag indicating that the device supports',
            '5 MHz channel bandwidth.',
        ] }],
        ['support10Mhz', flag, { orig: 'NL80211_ATTR_SUPPORT_10_MHZ', docs: [
            'A flag indicating that the device supports',
            '10 MHz channel bandwidth.',
        ] }],
        ['opmodeNotif', u8, { orig: 'NL80211_ATTR_OPMODE_NOTIF', docs: [
            'Operating mode field from Operating Mode',
            'Notification Element based on association request when used with',
            '%NL80211_CMD_NEW_STATION or %NL80211_CMD_SET_STATION (only when',
            '%NL80211_FEATURE_FULL_AP_CLIENT_STATE is supported, or with TDLS);',
            'u8 attribute.',
        ] }],
        ['vendorId', u32, { orig: 'NL80211_ATTR_VENDOR_ID', docs: [
            'The vendor ID, either a 24-bit OUI or, if',
            '%NL80211_VENDOR_ID_IS_LINUX is set, a special Linux ID (not used yet)',
        ] }],
        ['vendorSubcmd', u32, { orig: 'NL80211_ATTR_VENDOR_SUBCMD', docs: [
            'vendor sub-command',
        ] }],
        ['vendorData', data, { orig: 'NL80211_ATTR_VENDOR_DATA', docs: [
            'data for the vendor command, if any; this',
            'attribute is also used for vendor command feature advertisement',
        ] }],
        ['vendorEvents', data, { orig: 'NL80211_ATTR_VENDOR_EVENTS', docs: [
            'used for event list advertising in the wiphy',
            'info, containing a nested array of possible events',
        ] }],
        ['qosMap', data, { orig: 'NL80211_ATTR_QOS_MAP', docs: [
            'IP DSCP mapping for Interworking QoS mapping. This',
            'data is in the format defined for the payload of the QoS Map Set element',
            'in IEEE Std 802.11-2012, 8.4.2.97.',
        ] }],
        ['macHint', data, { orig: 'NL80211_ATTR_MAC_HINT', docs: [
            'MAC address recommendation as initial BSS',
        ] }],
        ['wiphyFreqHint', data, { orig: 'NL80211_ATTR_WIPHY_FREQ_HINT', docs: [
            'frequency of the recommended initial BSS',
        ] }],
        ['maxApAssocSta', u32, { orig: 'NL80211_ATTR_MAX_AP_ASSOC_STA', docs: [
            'Device attribute that indicates how many',
            'associated stations are supported in AP mode (including P2P GO); u32.',
            'Since drivers may not have a fixed limit on the maximum number (e.g.,',
            'other concurrent operations may affect this), drivers are allowed to',
            'advertise values that cannot always be met. In such cases, an attempt',
            'to add a new station entry with @NL80211_CMD_NEW_STATION may fail.',
        ] }],
        ['tdlsPeerCapability', u32, { type: 'TdlsPeerCapability', orig: 'NL80211_ATTR_TDLS_PEER_CAPABILITY', docs: [
            'flags for TDLS peer capabilities, u32.',
            'As specified in the &enum nl80211_tdls_peer_capability.',
        ] }],
        ['socketOwner', flag, { orig: 'NL80211_ATTR_SOCKET_OWNER', docs: [
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
        ['csaCOffsetsTx', u16, { orig: 'NL80211_ATTR_CSA_C_OFFSETS_TX', docs: [
            'An array of csa counter offsets (u16) which',
            'should be updated when the frame is transmitted.',
        ] }],
        ['maxCsaCounters', u8, { orig: 'NL80211_ATTR_MAX_CSA_COUNTERS', docs: [
            'U8 attribute used to advertise the maximum',
            'supported number of csa counters.',
        ] }],
        ['tdlsInitiator', flag, { orig: 'NL80211_ATTR_TDLS_INITIATOR', docs: [
            'flag attribute indicating the current end is',
            'the TDLS link initiator.',
        ] }],
        ['useRrm', flag, { orig: 'NL80211_ATTR_USE_RRM', docs: [
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
        ['wiphyDynAck', flag, { orig: 'NL80211_ATTR_WIPHY_DYN_ACK', docs: [
            'flag attribute used to enable ACK timeout',
            'estimation algorithm (dynack). In order to activate dynack',
            '%NL80211_FEATURE_ACKTO_ESTIMATION feature flag must be set by lower',
            'drivers to indicate dynack capability. Dynack is automatically disabled',
            'setting valid value for coverage class.',
        ] }],
        ['tsid', u8, { orig: 'NL80211_ATTR_TSID', docs: [
            'a TSID value (u8 attribute)',
        ] }],
        ['userPrio', u8, { orig: 'NL80211_ATTR_USER_PRIO', docs: [
            'user priority value (u8 attribute)',
        ] }],
        ['admittedTime', u16, { orig: 'NL80211_ATTR_ADMITTED_TIME', docs: [
            'admitted time in units of 32 microseconds',
            '(per second) (u16 attribute)',
        ] }],
        ['smpsMode', data, { type: 'SmpsMode', orig: 'NL80211_ATTR_SMPS_MODE', docs: [
            'SMPS mode to use (ap mode). see',
            '&enum nl80211_smps_mode.',
        ] }],
        ['operClass', data, { orig: 'NL80211_ATTR_OPER_CLASS', docs: [
            'operating class',
        ] }],
        ['macMask', data, { orig: 'NL80211_ATTR_MAC_MASK', docs: [
            'MAC address mask',
        ] }],
        ['wiphySelfManagedReg', flag, { orig: 'NL80211_ATTR_WIPHY_SELF_MANAGED_REG', docs: [
            'flag attribute indicating this device',
            'is self-managing its regulatory information and any regulatory domain',
            "obtained from it is coming from the device's wiphy and not the global",
            'cfg80211 regdomain.',
        ] }],
        ['extFeatures', data, { orig: 'NL80211_ATTR_EXT_FEATURES', docs: [
            'extended feature flags contained in a byte',
            'array. The feature flags are identified by their bit index (see &enum',
            'nl80211_ext_feature_index). The bit index is ordered starting at the',
            'least-significant bit of the first byte in the array, ie. bit index 0',
            'is located at bit 0 of byte 0. bit index 25 would be located at bit 1',
            'of byte 3 (u8 array).',
        ] }],
        ['surveyRadioStats', data, { orig: 'NL80211_ATTR_SURVEY_RADIO_STATS', docs: [
            'Request overall radio statistics to be',
            'returned along with other survey data. If set, @NL80211_CMD_GET_SURVEY',
            'may return a survey entry without a channel indicating global radio',
            'statistics (only some values are valid and make sense.)',
            "For devices that don't return such an entry even then, the information",
            'should be contained in the result as the sum of the respective counters',
            'over all channels.',
        ] }],
        ['netnsFd', u32, { orig: 'NL80211_ATTR_NETNS_FD' }],
        ['schedScanDelay', u32, { orig: 'NL80211_ATTR_SCHED_SCAN_DELAY', docs: [
            'delay before the first cycle of a',
            'scheduled scan is started.  Or the delay before a WoWLAN',
            'net-detect scan is started, counting from the moment the',
            'system is suspended.  This value is a u32, in seconds.',
        ] }],
        ['regIndoor', flag, { orig: 'NL80211_ATTR_REG_INDOOR', docs: [
            'flag attribute, if set indicates that the device',
            'is operating in an indoor environment.',
        ] }],
        ['maxNumSchedScanPlans', u32, { orig: 'NL80211_ATTR_MAX_NUM_SCHED_SCAN_PLANS', docs: [
            'maximum number of scan plans for',
            'scheduled scan supported by the device (u32), a wiphy attribute.',
        ] }],
        ['maxScanPlanInterval', u32, { orig: 'NL80211_ATTR_MAX_SCAN_PLAN_INTERVAL', docs: [
            'maximum interval (in seconds) for',
            'a scan plan (u32), a wiphy attribute.',
        ] }],
        ['maxScanPlanIterations', u32, { orig: 'NL80211_ATTR_MAX_SCAN_PLAN_ITERATIONS', docs: [
            'maximum number of iterations in',
            'a scan plan (u32), a wiphy attribute.',
        ] }],
        ['schedScanPlans', 'ScheduledScanPlan', { orig: 'NL80211_ATTR_SCHED_SCAN_PLANS', docs: [
            'a list of scan plans for scheduled scan.',
            'Each scan plan defines the number of scan iterations and the interval',
            'between scans. The last scan plan will always run infinitely,',
            'thus it must not specify the number of iterations, only the interval',
            'between scans. The scan plans are executed sequentially.',
            'Each scan plan is a nested attribute of &enum nl80211_sched_scan_plan.',
        ] }],
        ['pbss', flag, { orig: 'NL80211_ATTR_PBSS', docs: [
            'flag attribute. If set it means operate',
            'in a PBSS. Specified in %NL80211_CMD_CONNECT to request',
            'connecting to a PCP, and in %NL80211_CMD_START_AP to start',
            'a PCP instead of AP. Relevant for DMG networks only.',
        ] }],
        ['bssSelect', 'BssSelect', { orig: 'NL80211_ATTR_BSS_SELECT', docs: [
            'nested attribute for driver supporting the',
            'BSS selection feature. When used with %NL80211_CMD_GET_WIPHY it contains',
            'attributes according &enum nl80211_bss_select_attr to indicate what',
            'BSS selection behaviours are supported. When used with %NL80211_CMD_CONNECT',
            'it contains the behaviour-specific attribute containing the parameters for',
            'BSS selection to be done by driver and/or firmware.',
        ] }],
        ['staSupportP2pPs', u8, { type: 'StationP2pPsStatus', orig: 'NL80211_ATTR_STA_SUPPORT_P2P_PS', docs: [
            'whether P2P PS mechanism supported',
            'or not. u8, one of the values of &enum nl80211_sta_p2p_ps_status',
        ] }],
        ['pad', data, { orig: 'NL80211_ATTR_PAD', docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['iftypeExtCapa', data, { orig: 'NL80211_ATTR_IFTYPE_EXT_CAPA', docs: [
            'Nested attribute of the following attributes:',
            '%NL80211_ATTR_IFTYPE, %NL80211_ATTR_EXT_CAPA,',
            '%NL80211_ATTR_EXT_CAPA_MASK, to specify the extended capabilities per',
            'interface type.',
        ] }],
        ['muMimoGroupData', data, { orig: 'NL80211_ATTR_MU_MIMO_GROUP_DATA', docs: [
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
        ['muMimoFollowMacAddr', data, { orig: 'NL80211_ATTR_MU_MIMO_FOLLOW_MAC_ADDR', docs: [
            'mac address for the sniffer to follow',
            'when using MU-MIMO air sniffer.',
            'to turn that feature off set an invalid mac address',
            '(e.g. FF:FF:FF:FF:FF:FF)',
        ] }],
        ['scanStartTimeTsf', u64, { orig: 'NL80211_ATTR_SCAN_START_TIME_TSF', docs: [
            'The time at which the scan was actually',
            'started (u64). The time is the TSF of the BSS the interface that',
            'requested the scan is connected to (if available, otherwise this',
            'attribute must not be included).',
        ] }],
        ['scanStartTimeTsfBssid', data, { orig: 'NL80211_ATTR_SCAN_START_TIME_TSF_BSSID', docs: [
            'The BSS according to which',
            '%NL80211_ATTR_SCAN_START_TIME_TSF is set.',
        ] }],
        ['measurementDuration', u16, { orig: 'NL80211_ATTR_MEASUREMENT_DURATION', docs: [
            'measurement duration in TUs (u16). If',
            '%NL80211_ATTR_MEASUREMENT_DURATION_MANDATORY is not set, this is the',
            'maximum measurement duration allowed. This attribute is used with',
            'measurement requests. It can also be used with %NL80211_CMD_TRIGGER_SCAN',
            'if the scan is used for beacon report radio measurement.',
        ] }],
        ['measurementDurationMandatory', flag, { orig: 'NL80211_ATTR_MEASUREMENT_DURATION_MANDATORY', docs: [
            'flag attribute that indicates',
            'that the duration specified with %NL80211_ATTR_MEASUREMENT_DURATION is',
            'mandatory. If this flag is not set, the duration is the maximum duration',
            'and the actual measurement duration may be shorter.',
        ] }],
        ['meshPeerAid', u16, { orig: 'NL80211_ATTR_MESH_PEER_AID', docs: [
            'Association ID for the mesh peer (u16). This is',
            'used to pull the stored data for mesh peer in power save state.',
        ] }],
        ['nanMasterPref', u8, { orig: 'NL80211_ATTR_NAN_MASTER_PREF', docs: [
            'the master preference to be used by',
            '%NL80211_CMD_START_NAN and optionally with',
            "%NL80211_CMD_CHANGE_NAN_CONFIG. Its type is u8 and it can't be 0.",
            'Also, values 1 and 255 are reserved for certification purposes and',
            'should not be used during a normal device operation.',
        ] }],
        ['bands', u32, { type: asflags('BandId'), orig: 'NL80211_ATTR_BANDS', docs: [
            'operating bands configuration.  This is a u32',
            'bitmask of BIT(NL80211_BAND_*) as described in %enum',
            'nl80211_band.  For instance, for NL80211_BAND_2GHZ, bit 0',
            'would be set.  This attribute is used with',
            '%NL80211_CMD_START_NAN and %NL80211_CMD_CHANGE_NAN_CONFIG, and',
            "it is optional.  If no bands are set, it means don't-care and",
            'the device will decide what to use.',
        ] }],
        ['nanFunc', 'NanFunction', { orig: 'NL80211_ATTR_NAN_FUNC', docs: [
            'a function that can be added to NAN. See',
            '&enum nl80211_nan_func_attributes for description of this nested',
            'attribute.',
        ] }],
        ['nanMatch', 'NanMatch', { orig: 'NL80211_ATTR_NAN_MATCH', docs: [
            'used to report a match. This is a nested attribute.',
            'See &enum nl80211_nan_match_attributes.',
        ] }],
        ['filsKek', data, { orig: 'NL80211_ATTR_FILS_KEK', docs: [
            'KEK for FILS (Re)Association Request/Response frame',
            'protection.',
        ] }],
        ['filsNonces', data, { orig: 'NL80211_ATTR_FILS_NONCES', docs: [
            'Nonces (part of AAD) for FILS (Re)Association',
            'Request/Response frame protection. This attribute contains the 16 octet',
            'STA Nonce followed by 16 octets of AP Nonce.',
        ] }],
        ['multicastToUnicastEnabled', flag, { orig: 'NL80211_ATTR_MULTICAST_TO_UNICAST_ENABLED', docs: [
            'Indicates whether or not multicast',
            'packets should be send out as unicast to all stations (flag attribute).',
        ] }],
        ['bssid', data, { orig: 'NL80211_ATTR_BSSID', docs: [
            'The BSSID of the AP. Note that %NL80211_ATTR_MAC is also',
            'used in various commands/events for specifying the BSSID.',
        ] }],
        ['schedScanRelativeRssi', data, { orig: 'NL80211_ATTR_SCHED_SCAN_RELATIVE_RSSI', docs: [
            'Relative RSSI threshold by which',
            'other BSSs has to be better or slightly worse than the current',
            'connected BSS so that they get reported to user space.',
            'This will give an opportunity to userspace to consider connecting to',
            'other matching BSSs which have better or slightly worse RSSI than',
            'the current connected BSS by using an offloaded operation to avoid',
            'unnecessary wakeups.',
        ] }],
        ['schedScanRssiAdjust', data, { orig: 'NL80211_ATTR_SCHED_SCAN_RSSI_ADJUST', docs: [
            'When present the RSSI level for BSSs in',
            'the specified band is to be adjusted before doing',
            '%NL80211_ATTR_SCHED_SCAN_RELATIVE_RSSI based comparison to figure out',
            'better BSSs. The attribute value is a packed structure',
            'value as specified by &struct nl80211_bss_select_rssi_adjust.',
        ] }],
        ['timeoutReason', u32, { type: 'TimeoutReason', orig: 'NL80211_ATTR_TIMEOUT_REASON', docs: [
            'The reason for which an operation timed out.',
            'u32 attribute with an &enum nl80211_timeout_reason value. This is used,',
            'e.g., with %NL80211_CMD_CONNECT event.',
        ] }],
        ['filsErpUsername', data, { orig: 'NL80211_ATTR_FILS_ERP_USERNAME', docs: [
            'EAP Re-authentication Protocol (ERP)',
            'username part of NAI used to refer keys rRK and rIK. This is used with',
            '%NL80211_CMD_CONNECT.',
        ] }],
        ['filsErpRealm', data, { orig: 'NL80211_ATTR_FILS_ERP_REALM', docs: [
            'EAP Re-authentication Protocol (ERP) realm part',
            'of NAI specifying the domain name of the ER server. This is used with',
            '%NL80211_CMD_CONNECT.',
        ] }],
        ['filsErpNextSeqNum', data, { orig: 'NL80211_ATTR_FILS_ERP_NEXT_SEQ_NUM', docs: [
            'Unsigned 16-bit ERP next sequence number',
            'to use in ERP messages. This is used in generating the FILS wrapped data',
            'for FILS authentication and is used with %NL80211_CMD_CONNECT.',
        ] }],
        ['filsErpRrk', data, { orig: 'NL80211_ATTR_FILS_ERP_RRK', docs: [
            'ERP re-authentication Root Key (rRK) for the',
            'NAI specified by %NL80211_ATTR_FILS_ERP_USERNAME and',
            '%NL80211_ATTR_FILS_ERP_REALM. This is used for generating rIK and rMSK',
            'from successful FILS authentication and is used with',
            '%NL80211_CMD_CONNECT.',
        ] }],
        ['filsCacheId', data, { orig: 'NL80211_ATTR_FILS_CACHE_ID', docs: [
            'A 2-octet identifier advertized by a FILS AP',
            'identifying the scope of PMKSAs. This is used with',
            '@NL80211_CMD_SET_PMKSA and @NL80211_CMD_DEL_PMKSA.',
        ] }],
        ['pmk', data, { orig: 'NL80211_ATTR_PMK', docs: [
            'attribute for passing PMK key material. Used with',
            '%NL80211_CMD_SET_PMKSA for the PMKSA identified by %NL80211_ATTR_PMKID.',
            'For %NL80211_CMD_CONNECT it is used to provide PSK for offloading 4-way',
            'handshake for WPA/WPA2-PSK networks. For 802.1X authentication it is',
            'used with %NL80211_CMD_SET_PMK. For offloaded FT support this attribute',
            'specifies the PMK-R0 if NL80211_ATTR_PMKR0_NAME is included as well.',
        ] }],
        ['schedScanMulti', flag, { orig: 'NL80211_ATTR_SCHED_SCAN_MULTI', docs: [
            'flag attribute which user-space shall use to',
            'indicate that it supports multiple active scheduled scan requests.',
        ] }],
        ['schedScanMaxReqs', u32, { orig: 'NL80211_ATTR_SCHED_SCAN_MAX_REQS', docs: [
            'indicates maximum number of scheduled',
            'scan request that may be active for the device (u32).',
        ] }],
        ['want1x4wayHs', flag, { orig: 'NL80211_ATTR_WANT_1X_4WAY_HS', docs: [
            'flag attribute which user-space can include',
            'in %NL80211_CMD_CONNECT to indicate that for 802.1X authentication it',
            'wants to use the supported offload of the 4-way handshake.',
        ] }],
        ['pmkr0Name', data, { orig: 'NL80211_ATTR_PMKR0_NAME', docs: [
            'PMK-R0 Name for offloaded FT.',
        ] }],
        ['portAuthorized', data, { orig: 'NL80211_ATTR_PORT_AUTHORIZED', docs: [
            '(reserved)',
        ] }],
        ['externalAuthAction', u32, { type: 'ExternalAuthAction', orig: 'NL80211_ATTR_EXTERNAL_AUTH_ACTION', docs: [
            'Identify the requested external',
            'authentication operation (u32 attribute with an',
            '&enum nl80211_external_auth_action value). This is used with the',
            '%NL80211_CMD_EXTERNAL_AUTH request event.',
        ] }],
        ['externalAuthSupport', flag, { orig: 'NL80211_ATTR_EXTERNAL_AUTH_SUPPORT', docs: [
            'Flag attribute indicating that the user',
            'space supports external authentication. This attribute shall be used',
            'with %NL80211_CMD_CONNECT and %NL80211_CMD_START_AP request. The driver',
            'may offload authentication processing to user space if this capability',
            'is indicated in the respective requests from the user space.',
        ] }],
        ['nss', u8, { orig: 'NL80211_ATTR_NSS', docs: [
            "Station's New/updated  RX_NSS value notified using this",
            'u8 attribute. This is used with %NL80211_CMD_STA_OPMODE_CHANGED.',
        ] }],
        ['ackSignal', data, { orig: 'NL80211_ATTR_ACK_SIGNAL' }],
        ['controlPortOverNl80211', flag, { orig: 'NL80211_ATTR_CONTROL_PORT_OVER_NL80211', docs: [
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
        ['txqStats', 'TxqStats', { orig: 'NL80211_ATTR_TXQ_STATS', docs: [
            'TXQ statistics (nested attribute, see &enum',
            'nl80211_txq_stats)',
        ] }],
        ['txqLimit', u32, { orig: 'NL80211_ATTR_TXQ_LIMIT', docs: [
            'Total packet limit for the TXQ queues for this phy.',
            'The smaller of this and the memory limit is enforced.',
        ] }],
        ['txqMemoryLimit', u32, { orig: 'NL80211_ATTR_TXQ_MEMORY_LIMIT', docs: [
            'Total memory memory limit (in bytes) for the',
            'TXQ queues for this phy. The smaller of this and the packet limit is',
            'enforced.',
        ] }],
        ['txqQuantum', u32, { orig: 'NL80211_ATTR_TXQ_QUANTUM', docs: [
            'TXQ scheduler quantum (bytes). Number of bytes',
            'a flow is assigned on each round of the DRR scheduler.',
        ] }],
        ['heCapability', data, { orig: 'NL80211_ATTR_HE_CAPABILITY', docs: [
            'HE Capability information element (from',
            'association request when used with NL80211_CMD_NEW_STATION). Can be set',
            'only if %NL80211_STA_FLAG_WME is set.',
        ] }],
        ['ftmResponder', data, { orig: 'NL80211_ATTR_FTM_RESPONDER', docs: [
            'nested attribute which user-space can include',
            'in %NL80211_CMD_START_AP or %NL80211_CMD_SET_BEACON for fine timing',
            'measurement (FTM) responder functionality and containing parameters as',
            'possible, see &enum nl80211_ftm_responder_attr',
        ] }],
        ['ftmResponderStats', 'FtmResponderStats', { orig: 'NL80211_ATTR_FTM_RESPONDER_STATS', docs: [
            'Nested attribute with FTM responder',
            'statistics, see &enum nl80211_ftm_responder_stats.',
        ] }],
        ['timeout', u32, { orig: 'NL80211_ATTR_TIMEOUT', docs: [
            'Timeout for the given operation in milliseconds (u32),',
            'if the attribute is not given no timeout is requested. Note that 0 is an',
            'invalid value.',
        ] }],
        ['peerMeasurements', 'PeerMeasurement', { orig: 'NL80211_ATTR_PEER_MEASUREMENTS', docs: [
            'peer measurements request (and result)',
            'data, uses nested attributes specified in',
            '&enum nl80211_peer_measurement_attrs.',
            'This is also used for capability advertisement in the wiphy information,',
            'with the appropriate sub-attributes.',
        ] }],
        ['airtimeWeight', u16, { orig: 'NL80211_ATTR_AIRTIME_WEIGHT', docs: [
            "Station's weight when scheduled by the airtime",
            'scheduler.',
        ] }],
        ['staTxPowerSetting', u8, { type: 'TxPowerSetting', orig: 'NL80211_ATTR_STA_TX_POWER_SETTING', docs: [
            'Transmit power setting type (u8) for',
            'station associated with the AP. See &enum nl80211_tx_power_setting for',
            'possible values.',
        ] }],
        ['staTxPower', s16, { orig: 'NL80211_ATTR_STA_TX_POWER', docs: [
            'Transmit power level (s16) in dBm units. This',
            'allows to set Tx power for a station. If this attribute is not included,',
            'the default per-interface tx power setting will be overriding. Driver',
            'should be picking up the lowest tx power, either tx power per-interface',
            'or per-station.',
        ] }],
        ['saePassword', data, { orig: 'NL80211_ATTR_SAE_PASSWORD', docs: [
            'attribute for passing SAE password material. It',
            'is used with %NL80211_CMD_CONNECT to provide password for offloading',
            'SAE authentication for WPA3-Personal networks.',
        ] }],
        ['twtResponder', data, { orig: 'NL80211_ATTR_TWT_RESPONDER', docs: [
            'Enable target wait time responder support.',
        ] }],
        ['heObssPd', data, { orig: 'NL80211_ATTR_HE_OBSS_PD', docs: [
            'nested attribute for OBSS Packet Detection',
            'functionality.',
        ] }],
        ['wiphyEdmgChannels', u8, { orig: 'NL80211_ATTR_WIPHY_EDMG_CHANNELS', docs: [
            'bitmap that indicates the 2.16 GHz',
            'channel(s) that are allowed to be used for EDMG transmissions.',
            'Defined by IEEE P802.11ay/D4.0 section 9.4.2.251. (u8 attribute)',
        ] }],
        ['wiphyEdmgBwConfig', u8, { orig: 'NL80211_ATTR_WIPHY_EDMG_BW_CONFIG', docs: [
            'Channel BW Configuration subfield encodes',
            'the allowed channel bandwidth configurations. (u8 attribute)',
            'Defined by IEEE P802.11ay/D4.0 section 9.4.2.251, Table 13.',
        ] }],
        ['vlanId', u16, { orig: 'NL80211_ATTR_VLAN_ID', docs: [
            'VLAN ID (1..4094) for the station and VLAN group key',
            '(u16).',
        ] }],
    ]},

    InterfaceType: { kind: 'enum', orig: 'nl80211_iftype', docs: [
        '(virtual) interface types',
        '',
        'These values are used with the %NL80211_ATTR_IFTYPE',
        'to set the type of an interface.',
        '',
        '/',
    ], values: [
        { value: 0, name: 'UNSPECIFIED', orig: 'NL80211_IFTYPE_UNSPECIFIED', docs: [
            'unspecified type, driver decides',
        ] },
        { value: 1, name: 'ADHOC', orig: 'NL80211_IFTYPE_ADHOC', docs: [
            'independent BSS member',
        ] },
        { value: 2, name: 'STATION', orig: 'NL80211_IFTYPE_STATION', docs: [
            'managed BSS member',
        ] },
        { value: 3, name: 'AP', orig: 'NL80211_IFTYPE_AP', docs: [
            'access point',
        ] },
        { value: 4, name: 'AP_VLAN', orig: 'NL80211_IFTYPE_AP_VLAN', docs: [
            'VLAN interface for access points; VLAN interfaces',
            'are a bit special in that they must always be tied to a pre-existing',
            'AP type interface.',
        ] },
        { value: 5, name: 'WDS', orig: 'NL80211_IFTYPE_WDS', docs: [
            'wireless distribution interface',
        ] },
        { value: 6, name: 'MONITOR', orig: 'NL80211_IFTYPE_MONITOR', docs: [
            'monitor interface receiving all frames',
        ] },
        { value: 7, name: 'MESH_POINT', orig: 'NL80211_IFTYPE_MESH_POINT', docs: [
            'mesh point',
        ] },
        { value: 8, name: 'P2P_CLIENT', orig: 'NL80211_IFTYPE_P2P_CLIENT', docs: [
            'P2P client',
        ] },
        { value: 9, name: 'P2P_GO', orig: 'NL80211_IFTYPE_P2P_GO', docs: [
            'P2P group owner',
        ] },
        { value: 10, name: 'P2P_DEVICE', orig: 'NL80211_IFTYPE_P2P_DEVICE', docs: [
            'P2P device interface type, this is not a netdev',
            "and therefore can't be created in the normal ways, use the",
            '%NL80211_CMD_START_P2P_DEVICE and %NL80211_CMD_STOP_P2P_DEVICE',
            'commands to create and destroy one',
        ] },
        { value: 11, name: 'OCB', orig: 'NL80211_IFTYPE_OCB', docs: [
            'Outside Context of a BSS',
            'This mode corresponds to the MIB variable dot11OCBActivated=true',
        ] },
        { value: 12, name: 'NAN', orig: 'NL80211_IFTYPE_NAN', docs: [
            'NAN device interface type (not a netdev)',
        ] },
    ]},

    StationFlags: { orig: 'nl80211_sta_flags', docs: [
        'station flags',
        '',
        'Station flags. When a station is added to an AP interface, it is',
        'assumed to be already associated (and hence authenticated.)',
    ], attrs: [
        ['authorized', flag, { orig: 'NL80211_STA_FLAG_AUTHORIZED', docs: [
            'station is authorized (802.1X)',
        ] }],
        ['shortPreamble', flag, { orig: 'NL80211_STA_FLAG_SHORT_PREAMBLE', docs: [
            'station is capable of receiving frames',
            'with short barker preamble',
        ] }],
        ['wme', flag, { orig: 'NL80211_STA_FLAG_WME', docs: [
            'station is WME/QoS capable',
        ] }],
        ['mfp', flag, { orig: 'NL80211_STA_FLAG_MFP', docs: [
            'station uses management frame protection',
        ] }],
        ['authenticated', flag, { orig: 'NL80211_STA_FLAG_AUTHENTICATED', docs: [
            'station is authenticated',
        ] }],
        ['tdlsPeer', flag, { orig: 'NL80211_STA_FLAG_TDLS_PEER', docs: [
            'station is a TDLS peer -- this flag should',
            'only be used in managed mode (even in the flags mask). Note that the',
            "flag can't be changed, it is only valid while adding a station, and",
            'attempts to change it will silently be ignored (rather than rejected',
            'as errors.)',
        ] }],
        ['associated', flag, { orig: 'NL80211_STA_FLAG_ASSOCIATED', docs: [
            'station is associated; used with drivers',
            'that support %NL80211_FEATURE_FULL_AP_CLIENT_STATE to transition a',
            'previously added station into associated state',
        ] }],
    ]},

    StationP2pPsStatus: { kind: 'enum', orig: 'nl80211_sta_p2p_ps_status', docs: [
        'station support of P2P PS',
    ], values: [
        { value: 0, name: 'UNSUPPORTED', orig: 'NL80211_P2P_PS_UNSUPPORTED', docs: [
            "station doesn't support P2P PS mechanism",
        ] },
        { value: 1, name: 'SUPPORTED', orig: 'NL80211_P2P_PS_SUPPORTED', docs: [
            'station supports P2P PS mechanism',
        ] },
    ]},

    HeGuardInterval: { kind: 'enum', orig: 'nl80211_he_gi', docs: [
        'HE guard interval',
    ], values: [
        { value: 0, name: '_0_8', orig: 'NL80211_RATE_INFO_HE_GI_0_8', docs: [
            '0.8 usec',
        ] },
        { value: 1, name: '_1_6', orig: 'NL80211_RATE_INFO_HE_GI_1_6', docs: [
            '1.6 usec',
        ] },
        { value: 2, name: '_3_2', orig: 'NL80211_RATE_INFO_HE_GI_3_2', docs: [
            '3.2 usec',
        ] },
    ]},

    HeRuAllocation: { kind: 'enum', orig: 'nl80211_he_ru_alloc', docs: [
        'HE RU allocation values',
        '',
        '@NL80211_RATE_INFO_HE_RU_ALLOC_2x996: 2x996-tone RU allocation',
    ], values: [
        { value: 0, name: '_26', orig: 'NL80211_RATE_INFO_HE_RU_ALLOC_26', docs: [
            '26-tone RU allocation',
        ] },
        { value: 1, name: '_52', orig: 'NL80211_RATE_INFO_HE_RU_ALLOC_52', docs: [
            '52-tone RU allocation',
        ] },
        { value: 2, name: '_106', orig: 'NL80211_RATE_INFO_HE_RU_ALLOC_106', docs: [
            '106-tone RU allocation',
        ] },
        { value: 3, name: '_242', orig: 'NL80211_RATE_INFO_HE_RU_ALLOC_242', docs: [
            '242-tone RU allocation',
        ] },
        { value: 4, name: '_484', orig: 'NL80211_RATE_INFO_HE_RU_ALLOC_484', docs: [
            '484-tone RU allocation',
        ] },
        { value: 5, name: '_996', orig: 'NL80211_RATE_INFO_HE_RU_ALLOC_996', docs: [
            '996-tone RU allocation',
        ] },
        { value: 6, name: '_2x996', orig: 'NL80211_RATE_INFO_HE_RU_ALLOC_2x996' },
    ]},

    RateInfo: { orig: 'nl80211_rate_info', docs: [
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
        ['bitrate', u16, { orig: 'NL80211_RATE_INFO_BITRATE', docs: [
            'total bitrate (u16, 100kbit/s)',
        ] }],
        ['mcs', u8, { orig: 'NL80211_RATE_INFO_MCS', docs: [
            'mcs index for 802.11n (u8)',
        ] }],
        ['_40MhzWidth', data, { orig: 'NL80211_RATE_INFO_40_MHZ_WIDTH', docs: [
            '40 MHz dualchannel bitrate',
        ] }],
        ['shortGi', data, { orig: 'NL80211_RATE_INFO_SHORT_GI', docs: [
            '400ns guard interval',
        ] }],
        ['bitrate32', u32, { orig: 'NL80211_RATE_INFO_BITRATE32', docs: [
            'total bitrate (u32, 100kbit/s)',
        ] }],
        ['vhtMcs', u8, { orig: 'NL80211_RATE_INFO_VHT_MCS', docs: [
            'MCS index for VHT (u8)',
        ] }],
        ['vhtNss', u8, { orig: 'NL80211_RATE_INFO_VHT_NSS', docs: [
            'number of streams in VHT (u8)',
        ] }],
        ['_80MhzWidth', data, { orig: 'NL80211_RATE_INFO_80_MHZ_WIDTH', docs: [
            '80 MHz VHT rate',
        ] }],
        ['_80p80MhzWidth', data, { orig: 'NL80211_RATE_INFO_80P80_MHZ_WIDTH', docs: [
            'unused - 80+80 is treated the',
            'same as 160 for purposes of the bitrates',
        ] }],
        ['_160MhzWidth', data, { orig: 'NL80211_RATE_INFO_160_MHZ_WIDTH', docs: [
            '160 MHz VHT rate',
        ] }],
        ['_10MhzWidth', data, { orig: 'NL80211_RATE_INFO_10_MHZ_WIDTH', docs: [
            '10 MHz width - note that this is',
            'a legacy rate and will be reported as the actual bitrate, i.e.',
            'half the base (20 MHz) rate',
        ] }],
        ['_5MhzWidth', data, { orig: 'NL80211_RATE_INFO_5_MHZ_WIDTH', docs: [
            '5 MHz width - note that this is',
            'a legacy rate and will be reported as the actual bitrate, i.e.',
            'a quarter of the base (20 MHz) rate',
        ] }],
        ['heMcs', u8, { orig: 'NL80211_RATE_INFO_HE_MCS', docs: [
            'HE MCS index (u8, 0-11)',
        ] }],
        ['heNss', u8, { orig: 'NL80211_RATE_INFO_HE_NSS', docs: [
            'HE NSS value (u8, 1-8)',
        ] }],
        ['heGi', u8, { type: 'HeGuardInterval', orig: 'NL80211_RATE_INFO_HE_GI', docs: [
            'HE guard interval identifier',
            '(u8, see &enum nl80211_he_gi)',
        ] }],
        ['heDcm', u8, { orig: 'NL80211_RATE_INFO_HE_DCM', docs: [
            'HE DCM value (u8, 0/1)',
        ] }],
        ['heRuAlloc', u8, { type: 'HeRuAllocation', orig: 'NL80211_RATE_INFO_HE_RU_ALLOC', docs: [
            'HE RU allocation, if not present then',
            'non-OFDMA was used (u8, see &enum nl80211_he_ru_alloc)',
        ] }],
    ]},

    StationBssParam: { orig: 'nl80211_sta_bss_param', docs: [
        'BSS information collected by STA',
        '',
        'These attribute types are used with %NL80211_STA_INFO_BSS_PARAM',
        'when getting information about the bitrate of a station.',
    ], attrs: [
        ['ctsProt', flag, { orig: 'NL80211_STA_BSS_PARAM_CTS_PROT', docs: [
            'whether CTS protection is enabled (flag)',
        ] }],
        ['shortPreamble', flag, { orig: 'NL80211_STA_BSS_PARAM_SHORT_PREAMBLE', docs: [
            'whether short preamble is enabled',
            '(flag)',
        ] }],
        ['shortSlotTime', flag, { orig: 'NL80211_STA_BSS_PARAM_SHORT_SLOT_TIME', docs: [
            'whether short slot time is enabled',
            '(flag)',
        ] }],
        ['dtimPeriod', u8, { orig: 'NL80211_STA_BSS_PARAM_DTIM_PERIOD', docs: [
            'DTIM period for beaconing (u8)',
        ] }],
        ['beaconInterval', u16, { orig: 'NL80211_STA_BSS_PARAM_BEACON_INTERVAL', docs: [
            'Beacon interval (u16)',
        ] }],
    ]},

    StationInfo: { orig: 'nl80211_sta_info', docs: [
        'station information',
        '',
        'These attribute types are used with %NL80211_ATTR_STA_INFO',
        'when getting information about a station.',
    ], attrs: [
        ['inactiveTime', u32, { orig: 'NL80211_STA_INFO_INACTIVE_TIME', docs: [
            'time since last activity (u32, msecs)',
        ] }],
        ['rxBytes', u32, { orig: 'NL80211_STA_INFO_RX_BYTES', docs: [
            'total received bytes (MPDU length)',
            '(u32, from this station)',
        ] }],
        ['txBytes', u32, { orig: 'NL80211_STA_INFO_TX_BYTES', docs: [
            'total transmitted bytes (MPDU length)',
            '(u32, to this station)',
        ] }],
        ['llid', u16, { orig: 'NL80211_STA_INFO_LLID', docs: [
            "the station's mesh LLID",
        ] }],
        ['plid', u16, { orig: 'NL80211_STA_INFO_PLID', docs: [
            "the station's mesh PLID",
        ] }],
        ['plinkState', u8, { type: 'PlinkState', orig: 'NL80211_STA_INFO_PLINK_STATE', docs: [
            'peer link state for the station',
            '(see %enum nl80211_plink_state)',
        ] }],
        ['signal', u8, { orig: 'NL80211_STA_INFO_SIGNAL', docs: [
            'signal strength of last received PPDU (u8, dBm)',
        ] }],
        ['txBitrate', 'RateInfo', { orig: 'NL80211_STA_INFO_TX_BITRATE', docs: [
            'current unicast tx rate, nested attribute',
            'containing info as possible, see &enum nl80211_rate_info',
        ] }],
        ['rxPackets', u32, { orig: 'NL80211_STA_INFO_RX_PACKETS', docs: [
            'total received packet (MSDUs and MMPDUs)',
            '(u32, from this station)',
        ] }],
        ['txPackets', u32, { orig: 'NL80211_STA_INFO_TX_PACKETS', docs: [
            'total transmitted packets (MSDUs and MMPDUs)',
            '(u32, to this station)',
        ] }],
        ['txRetries', u32, { orig: 'NL80211_STA_INFO_TX_RETRIES', docs: [
            'total retries (MPDUs) (u32, to this station)',
        ] }],
        ['txFailed', u32, { orig: 'NL80211_STA_INFO_TX_FAILED', docs: [
            'total failed packets (MPDUs)',
            '(u32, to this station)',
        ] }],
        ['signalAvg', u8, { orig: 'NL80211_STA_INFO_SIGNAL_AVG', docs: [
            'signal strength average (u8, dBm)',
        ] }],
        ['rxBitrate', data, { orig: 'NL80211_STA_INFO_RX_BITRATE', docs: [
            'last unicast data frame rx rate, nested',
            'attribute, like NL80211_STA_INFO_TX_BITRATE.',
        ] }],
        ['bssParam', 'StationBssParam', { orig: 'NL80211_STA_INFO_BSS_PARAM', docs: [
            "current station's view of BSS, nested attribute",
            'containing info as possible, see &enum nl80211_sta_bss_param',
        ] }],
        ['connectedTime', u32, { orig: 'NL80211_STA_INFO_CONNECTED_TIME', docs: [
            'time since the station is last connected',
        ] }],
        ['staFlags', data, { orig: 'NL80211_STA_INFO_STA_FLAGS', docs: [
            'Contains a struct nl80211_sta_flag_update.',
        ] }],
        ['beaconLoss', u32, { orig: 'NL80211_STA_INFO_BEACON_LOSS', docs: [
            'count of times beacon loss was detected (u32)',
        ] }],
        ['tOffset', s64, { orig: 'NL80211_STA_INFO_T_OFFSET', docs: [
            'timing offset with respect to this STA (s64)',
        ] }],
        ['localPm', data, { orig: 'NL80211_STA_INFO_LOCAL_PM', docs: [
            'local mesh STA link-specific power mode',
        ] }],
        ['peerPm', data, { orig: 'NL80211_STA_INFO_PEER_PM', docs: [
            'peer mesh STA link-specific power mode',
        ] }],
        ['nonpeerPm', data, { orig: 'NL80211_STA_INFO_NONPEER_PM', docs: [
            'neighbor mesh STA power save mode towards',
            'non-peer STA',
        ] }],
        ['rxBytes64', u64, { orig: 'NL80211_STA_INFO_RX_BYTES64', docs: [
            'total received bytes (MPDU length)',
            '(u64, from this station)',
        ] }],
        ['txBytes64', u64, { orig: 'NL80211_STA_INFO_TX_BYTES64', docs: [
            'total transmitted bytes (MPDU length)',
            '(u64, to this station)',
        ] }],
        ['chainSignal', u8, { orig: 'NL80211_STA_INFO_CHAIN_SIGNAL', docs: [
            'per-chain signal strength of last PPDU',
            'Contains a nested array of signal strength attributes (u8, dBm)',
        ] }],
        ['chainSignalAvg', data, { orig: 'NL80211_STA_INFO_CHAIN_SIGNAL_AVG', docs: [
            'per-chain signal strength average',
            'Same format as NL80211_STA_INFO_CHAIN_SIGNAL.',
        ] }],
        ['expectedThroughput', u32, { orig: 'NL80211_STA_INFO_EXPECTED_THROUGHPUT', docs: [
            'expected throughput considering also the',
            '802.11 header (u32, kbps)',
        ] }],
        ['rxDropMisc', u64, { orig: 'NL80211_STA_INFO_RX_DROP_MISC', docs: [
            'RX packets dropped for unspecified reasons',
            '(u64)',
        ] }],
        ['beaconRx', u64, { orig: 'NL80211_STA_INFO_BEACON_RX', docs: [
            'number of beacons received from this peer (u64)',
        ] }],
        ['beaconSignalAvg', u8, { orig: 'NL80211_STA_INFO_BEACON_SIGNAL_AVG', docs: [
            'signal strength average',
            'for beacons only (u8, dBm)',
        ] }],
        ['tidStats', map('TidStats'), { orig: 'NL80211_STA_INFO_TID_STATS', docs: [
            'per-TID statistics (see &enum nl80211_tid_stats)',
            'This is a nested attribute where each the inner attribute number is the',
            'TID+1 and the special TID 16 (i.e. value 17) is used for non-QoS frames;',
            'each one of those is again nested with &enum nl80211_tid_stats',
            'attributes carrying the actual values.',
        ] }],
        ['rxDuration', u64, { orig: 'NL80211_STA_INFO_RX_DURATION', docs: [
            'aggregate PPDU duration for all frames',
            'received from the station (u64, usec)',
        ] }],
        ['pad', data, { orig: 'NL80211_STA_INFO_PAD', docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['ackSignal', u8, { orig: 'NL80211_STA_INFO_ACK_SIGNAL', docs: [
            'signal strength of the last ACK frame(u8, dBm)',
        ] }],
        ['ackSignalAvg', s8, { orig: 'NL80211_STA_INFO_ACK_SIGNAL_AVG', docs: [
            'avg signal strength of ACK frames (s8, dBm)',
        ] }],
        ['rxMpdus', u32, { orig: 'NL80211_STA_INFO_RX_MPDUS', docs: [
            'total number of received packets (MPDUs)',
            '(u32, from this station)',
        ] }],
        ['fcsErrorCount', u32, { orig: 'NL80211_STA_INFO_FCS_ERROR_COUNT', docs: [
            'total number of packets (MPDUs) received',
            'with an FCS error (u32, from this station). This count may not include',
            'some packets with an FCS error due to TA corruption. Hence this counter',
            'might not be fully accurate.',
        ] }],
        ['connectedToGate', u8, { orig: 'NL80211_STA_INFO_CONNECTED_TO_GATE', docs: [
            'set to true if STA has a path to a',
            'mesh gate (u8, 0 or 1)',
        ] }],
        ['txDuration', u64, { orig: 'NL80211_STA_INFO_TX_DURATION', docs: [
            'aggregate PPDU duration for all frames',
            'sent to the station (u64, usec)',
        ] }],
        ['airtimeWeight', u16, { orig: 'NL80211_STA_INFO_AIRTIME_WEIGHT', docs: [
            'current airtime weight for station (u16)',
        ] }],
        ['airtimeLinkMetric', data, { orig: 'NL80211_STA_INFO_AIRTIME_LINK_METRIC', docs: [
            'airtime link metric for mesh station',
        ] }],
        ['assocAtBoottime', u64, { orig: 'NL80211_STA_INFO_ASSOC_AT_BOOTTIME', docs: [
            'Timestamp (CLOCK_BOOTTIME, nanoseconds)',
            "of STA's association",
        ] }],
    ]},

    TidStats: { orig: 'nl80211_tid_stats', docs: [
        'per TID statistics attributes',
    ], attrs: [
        ['rxMsdu', u64, { orig: 'NL80211_TID_STATS_RX_MSDU', docs: [
            'number of MSDUs received (u64)',
        ] }],
        ['txMsdu', u64, { orig: 'NL80211_TID_STATS_TX_MSDU', docs: [
            'number of MSDUs transmitted (or',
            'attempted to transmit; u64)',
        ] }],
        ['txMsduRetries', u64, { orig: 'NL80211_TID_STATS_TX_MSDU_RETRIES', docs: [
            'number of retries for',
            'transmitted MSDUs (not counting the first attempt; u64)',
        ] }],
        ['txMsduFailed', u64, { orig: 'NL80211_TID_STATS_TX_MSDU_FAILED', docs: [
            'number of failed transmitted',
            'MSDUs (u64)',
        ] }],
        ['pad', data, { orig: 'NL80211_TID_STATS_PAD', docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['txqStats', 'TxqStats', { orig: 'NL80211_TID_STATS_TXQ_STATS', docs: [
            'TXQ stats (nested attribute)',
        ] }],
    ]},

    TxqStats: { orig: 'nl80211_txq_stats', docs: [
        'per TXQ statistics attributes',
    ], attrs: [
        ['backlogBytes', data, { orig: 'NL80211_TXQ_STATS_BACKLOG_BYTES', docs: [
            'number of bytes currently backlogged',
        ] }],
        ['backlogPackets', data, { orig: 'NL80211_TXQ_STATS_BACKLOG_PACKETS', docs: [
            'number of packets currently',
            'backlogged',
        ] }],
        ['flows', data, { orig: 'NL80211_TXQ_STATS_FLOWS', docs: [
            'total number of new flows seen',
        ] }],
        ['drops', data, { orig: 'NL80211_TXQ_STATS_DROPS', docs: [
            'total number of packet drops',
        ] }],
        ['ecnMarks', data, { orig: 'NL80211_TXQ_STATS_ECN_MARKS', docs: [
            'total number of packet ECN marks',
        ] }],
        ['overlimit', data, { orig: 'NL80211_TXQ_STATS_OVERLIMIT', docs: [
            'number of drops due to queue space overflow',
        ] }],
        ['overmemory', data, { orig: 'NL80211_TXQ_STATS_OVERMEMORY', docs: [
            'number of drops due to memory limit overflow',
            '(only for per-phy stats)',
        ] }],
        ['collisions', data, { orig: 'NL80211_TXQ_STATS_COLLISIONS', docs: [
            'number of hash collisions',
        ] }],
        ['txBytes', data, { orig: 'NL80211_TXQ_STATS_TX_BYTES', docs: [
            'total number of bytes dequeued from TXQ',
        ] }],
        ['txPackets', data, { orig: 'NL80211_TXQ_STATS_TX_PACKETS', docs: [
            'total number of packets dequeued from TXQ',
        ] }],
        ['maxFlows', data, { orig: 'NL80211_TXQ_STATS_MAX_FLOWS', docs: [
            'number of flow buckets for PHY',
        ] }],
    ]},

    MpathFlags: { kind: 'flags', orig: 'nl80211_mpath_flags', docs: [
        'nl80211 mesh path flags',
    ], values: [
        { value: 1<<0, name: 'active', orig: 'NL80211_MPATH_FLAG_ACTIVE', docs: [
            'the mesh path is active',
        ] },
        { value: 1<<1, name: 'resolving', orig: 'NL80211_MPATH_FLAG_RESOLVING', docs: [
            'the mesh path discovery process is running',
        ] },
        { value: 1<<2, name: 'snValid', orig: 'NL80211_MPATH_FLAG_SN_VALID', docs: [
            'the mesh path contains a valid SN',
        ] },
        { value: 1<<3, name: 'fixed', orig: 'NL80211_MPATH_FLAG_FIXED', docs: [
            'the mesh path has been manually set',
        ] },
        { value: 1<<4, name: 'resolved', orig: 'NL80211_MPATH_FLAG_RESOLVED', docs: [
            'the mesh path discovery process succeeded',
        ] },
    ]},

    MpathInfo: { orig: 'nl80211_mpath_info', docs: [
        'mesh path information',
        '',
        'These attribute types are used with %NL80211_ATTR_MPATH_INFO when getting',
        'information about a mesh path.',
    ], attrs: [
        ['frameQlen', u32, { orig: 'NL80211_MPATH_INFO_FRAME_QLEN', docs: [
            'number of queued frames for this destination',
        ] }],
        ['sn', u32, { orig: 'NL80211_MPATH_INFO_SN', docs: [
            'destination sequence number',
        ] }],
        ['metric', u32, { orig: 'NL80211_MPATH_INFO_METRIC', docs: [
            'metric (cost) of this mesh path',
        ] }],
        ['exptime', u32, { orig: 'NL80211_MPATH_INFO_EXPTIME', docs: [
            'expiration time for the path, in msec from now',
        ] }],
        ['flags', u8, { type: 'MpathFlags', orig: 'NL80211_MPATH_INFO_FLAGS', docs: [
            'mesh path flags, enumerated in',
            '&enum nl80211_mpath_flags;',
        ] }],
        ['discoveryTimeout', u32, { orig: 'NL80211_MPATH_INFO_DISCOVERY_TIMEOUT', docs: [
            'total path discovery timeout, in msec',
        ] }],
        ['discoveryRetries', u8, { orig: 'NL80211_MPATH_INFO_DISCOVERY_RETRIES', docs: [
            'mesh path discovery retries',
        ] }],
        ['hopCount', data, { orig: 'NL80211_MPATH_INFO_HOP_COUNT', docs: [
            'hop count to destination',
        ] }],
        ['pathChange', data, { orig: 'NL80211_MPATH_INFO_PATH_CHANGE', docs: [
            'total number of path changes to destination',
        ] }],
    ]},

    BandInterfaceType: { orig: 'nl80211_band_iftype_attr', docs: [
        'Interface type data attributes',
    ], attrs: [
        ['iftypes', asflags('InterfaceType'), { orig: 'NL80211_BAND_IFTYPE_ATTR_IFTYPES', docs: [
            'nested attribute containing a flag attribute',
            'for each interface type that supports the band data',
        ] }],
        ['heCapMac', data, { orig: 'NL80211_BAND_IFTYPE_ATTR_HE_CAP_MAC', docs: [
            'HE MAC capabilities as in HE',
            'capabilities IE',
        ] }],
        ['heCapPhy', data, { orig: 'NL80211_BAND_IFTYPE_ATTR_HE_CAP_PHY', docs: [
            'HE PHY capabilities as in HE',
            'capabilities IE',
        ] }],
        ['heCapMcsSet', data, { orig: 'NL80211_BAND_IFTYPE_ATTR_HE_CAP_MCS_SET', docs: [
            'HE supported NSS/MCS as in HE',
            'capabilities IE',
        ] }],
        ['heCapPpe', data, { orig: 'NL80211_BAND_IFTYPE_ATTR_HE_CAP_PPE', docs: [
            'HE PPE thresholds information as',
            'defined in HE capabilities IE',
        ] }],
    ]},

    Band: { orig: 'nl80211_band_attr', docs: [
        'band attributes',
    ], attrs: [
        ['freqs', array('Frequency', { zero: true }), { orig: 'NL80211_BAND_ATTR_FREQS', docs: [
            'supported frequencies in this band,',
            'an array of nested frequency attributes',
        ] }],
        ['rates', array('Bitrate', { zero: true }), { orig: 'NL80211_BAND_ATTR_RATES', docs: [
            'supported bitrates in this band,',
            'an array of nested bitrate attributes',
        ] }],
        ['htMcsSet', data, { orig: 'NL80211_BAND_ATTR_HT_MCS_SET', docs: [
            '16-byte attribute containing the MCS set as',
            'defined in 802.11n',
        ] }],
        ['htCapa', u16, { orig: 'NL80211_BAND_ATTR_HT_CAPA', docs: [
            'HT capabilities, as in the HT information IE',
        ] }],
        ['htAmpduFactor', u8, { orig: 'NL80211_BAND_ATTR_HT_AMPDU_FACTOR', docs: [
            'A-MPDU factor, as in 11n',
        ] }],
        ['htAmpduDensity', u8, { orig: 'NL80211_BAND_ATTR_HT_AMPDU_DENSITY', docs: [
            'A-MPDU density, as in 11n',
        ] }],
        ['vhtMcsSet', data, { orig: 'NL80211_BAND_ATTR_VHT_MCS_SET', docs: [
            '32-byte attribute containing the MCS set as',
            'defined in 802.11ac',
        ] }],
        ['vhtCapa', u32, { orig: 'NL80211_BAND_ATTR_VHT_CAPA', docs: [
            'VHT capabilities, as in the HT information IE',
        ] }],
        ['iftypeData', array('BandInterfaceType'), { orig: 'NL80211_BAND_ATTR_IFTYPE_DATA', docs: [
            'nested array attribute, with each entry using',
            'attributes from &enum nl80211_band_iftype_attr',
        ] }],
        ['edmgChannels', data, { orig: 'NL80211_BAND_ATTR_EDMG_CHANNELS', docs: [
            'bitmap that indicates the 2.16 GHz',
            'channel(s) that are allowed to be used for EDMG transmissions.',
            'Defined by IEEE P802.11ay/D4.0 section 9.4.2.251.',
        ] }],
        ['edmgBwConfig', data, { orig: 'NL80211_BAND_ATTR_EDMG_BW_CONFIG', docs: [
            'Channel BW Configuration subfield encodes',
            'the allowed channel bandwidth configurations.',
            'Defined by IEEE P802.11ay/D4.0 section 9.4.2.251, Table 13.',
        ] }],
    ]},

    WmmRule: { orig: 'nl80211_wmm_rule', docs: [
        'regulatory wmm rule',
    ], attrs: [
        ['cwMin', data, { orig: 'NL80211_WMMR_CW_MIN', docs: [
            'Minimum contention window slot.',
        ] }],
        ['cwMax', data, { orig: 'NL80211_WMMR_CW_MAX', docs: [
            'Maximum contention window slot.',
        ] }],
        ['aifsn', data, { orig: 'NL80211_WMMR_AIFSN', docs: [
            'Arbitration Inter Frame Space.',
        ] }],
        ['txop', data, { orig: 'NL80211_WMMR_TXOP', docs: [
            'Maximum allowed tx operation time.',
        ] }],
    ]},

    Frequency: { orig: 'nl80211_frequency_attr', docs: [
        'frequency attributes',
        '',
        'See https://apps.fcc.gov/eas/comments/GetPublishedDocument.html?id=327&tn=528122',
        'for more information on the FCC description of the relaxations allowed',
        'by NL80211_FREQUENCY_ATTR_INDOOR_ONLY and',
        'NL80211_FREQUENCY_ATTR_IR_CONCURRENT.',
    ], attrs: [
        ['freq', u32, { orig: 'NL80211_FREQUENCY_ATTR_FREQ', docs: [
            'Frequency in MHz',
        ] }],
        ['disabled', flag, { orig: 'NL80211_FREQUENCY_ATTR_DISABLED', docs: [
            'Channel is disabled in current',
            'regulatory domain.',
        ] }],
        ['noIr', flag, { orig: 'NL80211_FREQUENCY_ATTR_NO_IR', docs: [
            'no mechanisms that initiate radiation',
            'are permitted on this channel, this includes sending probe',
            'requests, or modes of operation that require beaconing.',
        ] }],
        ['__noIbss', flag, { orig: '__NL80211_FREQUENCY_ATTR_NO_IBSS' }],
        ['radar', flag, { orig: 'NL80211_FREQUENCY_ATTR_RADAR', docs: [
            'Radar detection is mandatory',
            'on this channel in current regulatory domain.',
        ] }],
        ['maxTxPower', u32, { orig: 'NL80211_FREQUENCY_ATTR_MAX_TX_POWER', docs: [
            'Maximum transmission power in mBm',
            '(100 * dBm).',
        ] }],
        ['dfsState', u32, { type: 'DfsState', orig: 'NL80211_FREQUENCY_ATTR_DFS_STATE', docs: [
            'current state for DFS',
            '(enum nl80211_dfs_state)',
        ] }],
        ['dfsTime', u32, { orig: 'NL80211_FREQUENCY_ATTR_DFS_TIME', docs: [
            'time in miliseconds for how long',
            'this channel is in this DFS state.',
        ] }],
        ['noHt40Minus', flag, { orig: 'NL80211_FREQUENCY_ATTR_NO_HT40_MINUS', docs: [
            "HT40- isn't possible with this",
            'channel as the control channel',
        ] }],
        ['noHt40Plus', flag, { orig: 'NL80211_FREQUENCY_ATTR_NO_HT40_PLUS', docs: [
            "HT40+ isn't possible with this",
            'channel as the control channel',
        ] }],
        ['no80mhz', flag, { orig: 'NL80211_FREQUENCY_ATTR_NO_80MHZ', docs: [
            'any 80 MHz channel using this channel',
            "as the primary or any of the secondary channels isn't possible,",
            'this includes 80+80 channels',
        ] }],
        ['no160mhz', flag, { orig: 'NL80211_FREQUENCY_ATTR_NO_160MHZ', docs: [
            'any 160 MHz (but not 80+80) channel',
            'using this channel as the primary or any of the secondary channels',
            "isn't possible",
        ] }],
        ['dfsCacTime', u32, { orig: 'NL80211_FREQUENCY_ATTR_DFS_CAC_TIME', docs: [
            'DFS CAC time in milliseconds.',
        ] }],
        ['indoorOnly', flag, { orig: 'NL80211_FREQUENCY_ATTR_INDOOR_ONLY', docs: [
            'Only indoor use is permitted on this',
            'channel. A channel that has the INDOOR_ONLY attribute can only be',
            'used when there is a clear assessment that the device is operating in',
            'an indoor surroundings, i.e., it is connected to AC power (and not',
            'through portable DC inverters) or is under the control of a master',
            'that is acting as an AP and is connected to AC power.',
        ] }],
        ['irConcurrent', flag, { orig: 'NL80211_FREQUENCY_ATTR_IR_CONCURRENT', docs: [
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
        ['no20mhz', flag, { orig: 'NL80211_FREQUENCY_ATTR_NO_20MHZ', docs: [
            '20 MHz operation is not allowed',
            'on this channel in current regulatory domain.',
        ] }],
        ['no10mhz', flag, { orig: 'NL80211_FREQUENCY_ATTR_NO_10MHZ', docs: [
            '10 MHz operation is not allowed',
            'on this channel in current regulatory domain.',
        ] }],
        ['wmm', 'WmmRule', { orig: 'NL80211_FREQUENCY_ATTR_WMM', docs: [
            'this channel has wmm limitations.',
            'This is a nested attribute that contains the wmm limitation per AC.',
            '(see &enum nl80211_wmm_rule)',
        ] }],
    ]},

    Bitrate: { orig: 'nl80211_bitrate_attr', docs: [
        'bitrate attributes',
    ], attrs: [
        ['rate', u32, { orig: 'NL80211_BITRATE_ATTR_RATE', docs: [
            'Bitrate in units of 100 kbps',
        ] }],
        ['_2ghzShortpreamble', flag, { orig: 'NL80211_BITRATE_ATTR_2GHZ_SHORTPREAMBLE', docs: [
            'Short preamble supported',
            'in 2.4 GHz band.',
        ] }],
    ]},

    RegulatoryInitiator: { kind: 'enum', orig: 'nl80211_reg_initiator', docs: [
        'Indicates the initiator of a reg domain request',
    ], values: [
        { value: 0, name: 'CORE', orig: 'NL80211_REGDOM_SET_BY_CORE', docs: [
            'Core queried CRDA for a dynamic world',
            'regulatory domain.',
        ] },
        { value: 1, name: 'USER', orig: 'NL80211_REGDOM_SET_BY_USER', docs: [
            'User asked the wireless core to set the',
            'regulatory domain.',
        ] },
        { value: 2, name: 'DRIVER', orig: 'NL80211_REGDOM_SET_BY_DRIVER', docs: [
            'a wireless drivers has hinted to the',
            'wireless core it thinks its knows the regulatory domain we should be in.',
        ] },
        { value: 3, name: 'COUNTRY_IE', orig: 'NL80211_REGDOM_SET_BY_COUNTRY_IE', docs: [
            'the wireless core has received an',
            '802.11 country information element with regulatory information it',
            'thinks we should consider. cfg80211 only processes the country',
            'code from the IE, and relies on the regulatory domain information',
            'structure passed by userspace (CRDA) from our wireless-regdb.',
            'If a channel is enabled but the country code indicates it should',
            'be disabled we disable the channel and re-enable it upon disassociation.',
        ] },
    ]},

    RegulatoryType: { kind: 'enum', orig: 'nl80211_reg_type', docs: [
        'specifies the type of regulatory domain',
    ], values: [
        { value: 0, name: 'COUNTRY', orig: 'NL80211_REGDOM_TYPE_COUNTRY', docs: [
            'the regulatory domain set is one that pertains',
            'to a specific country. When this is set you can count on the',
            'ISO / IEC 3166 alpha2 country code being valid.',
        ] },
        { value: 1, name: 'WORLD', orig: 'NL80211_REGDOM_TYPE_WORLD', docs: [
            'the regulatory set domain is the world regulatory',
            'domain.',
        ] },
        { value: 2, name: 'CUSTOM_WORLD', orig: 'NL80211_REGDOM_TYPE_CUSTOM_WORLD', docs: [
            'the regulatory domain set is a custom',
            'driver specific world regulatory domain. These do not apply system-wide',
            'and are only applicable to the individual devices which have requested',
            'them to be applied.',
        ] },
        { value: 3, name: 'INTERSECTION', orig: 'NL80211_REGDOM_TYPE_INTERSECTION', docs: [
            'the regulatory domain set is the product',
            'of an intersection between two regulatory domains -- the previously',
            'set regulatory domain on the system and the last accepted regulatory',
            'domain request to be processed.',
        ] },
    ]},

    RegulatoryRule: { orig: 'nl80211_reg_rule_attr', docs: [
        'regulatory rule attributes',
    ], attrs: [
        ['regRuleFlags', u32, { type: 'RegulatoryRuleFlags', orig: 'NL80211_ATTR_REG_RULE_FLAGS', docs: [
            'a set of flags which specify additional',
            'considerations for a given frequency range. These are the',
            '&enum nl80211_reg_rule_flags.',
        ] }],
        ['freqRangeStart', u32, { orig: 'NL80211_ATTR_FREQ_RANGE_START', docs: [
            'starting frequencry for the regulatory',
            'rule in KHz. This is not a center of frequency but an actual regulatory',
            'band edge.',
        ] }],
        ['freqRangeEnd', u32, { orig: 'NL80211_ATTR_FREQ_RANGE_END', docs: [
            'ending frequency for the regulatory rule',
            'in KHz. This is not a center a frequency but an actual regulatory',
            'band edge.',
        ] }],
        ['freqRangeMaxBw', u32, { orig: 'NL80211_ATTR_FREQ_RANGE_MAX_BW', docs: [
            'maximum allowed bandwidth for this',
            'frequency range, in KHz.',
        ] }],
        ['powerRuleMaxAntGain', u32, { orig: 'NL80211_ATTR_POWER_RULE_MAX_ANT_GAIN', docs: [
            'the maximum allowed antenna gain',
            'for a given frequency range. The value is in mBi (100 * dBi).',
            "If you don't have one then don't send this.",
        ] }],
        ['powerRuleMaxEirp', u32, { orig: 'NL80211_ATTR_POWER_RULE_MAX_EIRP', docs: [
            'the maximum allowed EIRP for',
            'a given frequency range. The value is in mBm (100 * dBm).',
        ] }],
        ['dfsCacTime', u32, { orig: 'NL80211_ATTR_DFS_CAC_TIME', docs: [
            'DFS CAC time in milliseconds.',
            'If not present or 0 default CAC time will be used.',
        ] }],
    ]},

    ScheduledScanMatch: { orig: 'nl80211_sched_scan_match_attr', docs: [
        'scheduled scan match attributes',
    ], attrs: [
        ['attrSsid', data, { orig: 'NL80211_SCHED_SCAN_MATCH_ATTR_SSID', docs: [
            'SSID to be used for matching,',
            'only report BSS with matching SSID.',
            '(This cannot be used together with BSSID.)',
        ] }],
        ['attrRssi', data, { orig: 'NL80211_SCHED_SCAN_MATCH_ATTR_RSSI', docs: [
            'RSSI threshold (in dBm) for reporting a',
            'BSS in scan results. Filtering is turned off if not specified. Note that',
            'if this attribute is in a match set of its own, then it is treated as',
            'the default value for all matchsets with an SSID, rather than being a',
            'matchset of its own without an RSSI filter. This is due to problems with',
            'how this API was implemented in the past. Also, due to the same problem,',
            'the only way to create a matchset with only an RSSI filter (with this',
            "attribute) is if there's only a single matchset with the RSSI attribute.",
        ] }],
        ['attrRelativeRssi', flag, { orig: 'NL80211_SCHED_SCAN_MATCH_ATTR_RELATIVE_RSSI', docs: [
            'Flag indicating whether',
            '%NL80211_SCHED_SCAN_MATCH_ATTR_RSSI to be used as absolute RSSI or',
            "relative to current bss's RSSI.",
        ] }],
        ['attrRssiAdjust', data, { orig: 'NL80211_SCHED_SCAN_MATCH_ATTR_RSSI_ADJUST', docs: [
            'When present the RSSI level for',
            'BSS-es in the specified band is to be adjusted before doing',
            'RSSI-based BSS selection. The attribute value is a packed structure',
            'value as specified by &struct nl80211_bss_select_rssi_adjust.',
        ] }],
        ['attrBssid', data, { orig: 'NL80211_SCHED_SCAN_MATCH_ATTR_BSSID', docs: [
            'BSSID to be used for matching',
            '(this cannot be used together with SSID).',
        ] }],
        ['perBandRssi', s32, { type: 'BandId', orig: 'NL80211_SCHED_SCAN_MATCH_PER_BAND_RSSI', docs: [
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

    RegulatoryRuleFlags: { kind: 'flags', orig: 'nl80211_reg_rule_flags', docs: [
        'regulatory rule flags',
    ], values: [
        { value: 1<<0, name: 'noOfdm', orig: 'NL80211_RRF_NO_OFDM', docs: [
            'OFDM modulation not allowed',
        ] },
        { value: 1<<1, name: 'noCck', orig: 'NL80211_RRF_NO_CCK', docs: [
            'CCK modulation not allowed',
        ] },
        { value: 1<<2, name: 'noIndoor', orig: 'NL80211_RRF_NO_INDOOR', docs: [
            'indoor operation not allowed',
        ] },
        { value: 1<<3, name: 'noOutdoor', orig: 'NL80211_RRF_NO_OUTDOOR', docs: [
            'outdoor operation not allowed',
        ] },
        { value: 1<<4, name: 'dfs', orig: 'NL80211_RRF_DFS', docs: [
            'DFS support is required to be used',
        ] },
        { value: 1<<5, name: 'ptpOnly', orig: 'NL80211_RRF_PTP_ONLY', docs: [
            'this is only for Point To Point links',
        ] },
        { value: 1<<6, name: 'ptmpOnly', orig: 'NL80211_RRF_PTMP_ONLY', docs: [
            'this is only for Point To Multi Point links',
        ] },
        { value: 1<<7, name: 'noIr', orig: 'NL80211_RRF_NO_IR', docs: [
            'no mechanisms that initiate radiation are allowed,',
            'this includes probe requests or modes of operation that require',
            'beaconing.',
        ] },
        { value: 1<<8, name: '__noIbss', orig: '__NL80211_RRF_NO_IBSS' },
        { value: 1<<11, name: 'autoBw', orig: 'NL80211_RRF_AUTO_BW', docs: [
            'maximum available bandwidth should be calculated',
            'base on contiguous rules and wider channels will be allowed to cross',
            'multiple contiguous/overlapping frequency ranges.',
        ] },
        { value: 1<<12, name: 'irConcurrent', orig: 'NL80211_RRF_IR_CONCURRENT', docs: [
            'See %NL80211_FREQUENCY_ATTR_IR_CONCURRENT',
        ] },
        { value: 1<<13, name: 'noHt40minus', orig: 'NL80211_RRF_NO_HT40MINUS', docs: [
            "channels can't be used in HT40- operation",
        ] },
        { value: 1<<14, name: 'noHt40plus', orig: 'NL80211_RRF_NO_HT40PLUS', docs: [
            "channels can't be used in HT40+ operation",
        ] },
        { value: 1<<15, name: 'no80mhz', orig: 'NL80211_RRF_NO_80MHZ', docs: [
            '80MHz operation not allowed',
        ] },
        { value: 1<<16, name: 'no160mhz', orig: 'NL80211_RRF_NO_160MHZ', docs: [
            '160MHz operation not allowed',
        ] },
    ]},

    DfsRegions: { kind: 'enum', orig: 'nl80211_dfs_regions', docs: [
        'regulatory DFS regions',
    ], values: [
        { value: 0, name: 'UNSET', orig: 'NL80211_DFS_UNSET', docs: [
            'Country has no DFS master region specified',
        ] },
        { value: 1, name: 'FCC', orig: 'NL80211_DFS_FCC', docs: [
            'Country follows DFS master rules from FCC',
        ] },
        { value: 2, name: 'ETSI', orig: 'NL80211_DFS_ETSI', docs: [
            'Country follows DFS master rules from ETSI',
        ] },
        { value: 3, name: 'JP', orig: 'NL80211_DFS_JP', docs: [
            'Country follows DFS master rules from JP/MKK/Telec',
        ] },
    ]},

    UserRegulatoryHintType: { kind: 'enum', orig: 'nl80211_user_reg_hint_type', docs: [
        'type of user regulatory hint',
    ], values: [
        { value: 0, name: 'USER', orig: 'NL80211_USER_REG_HINT_USER', docs: [
            'a user sent the hint. This is always',
            'assumed if the attribute is not set.',
        ] },
        { value: 1, name: 'CELL_BASE', orig: 'NL80211_USER_REG_HINT_CELL_BASE', docs: [
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
        { value: 2, name: 'INDOOR', orig: 'NL80211_USER_REG_HINT_INDOOR', docs: [
            'a user sent an hint indicating that the',
            'platform is operating in an indoor environment.',
        ] },
    ]},

    SurveyInfo: { orig: 'nl80211_survey_info', docs: [
        'survey information',
        '',
        'These attribute types are used with %NL80211_ATTR_SURVEY_INFO',
        'when getting information about a survey.',
    ], attrs: [
        ['frequency', u32, { orig: 'NL80211_SURVEY_INFO_FREQUENCY', docs: [
            'center frequency of channel',
        ] }],
        ['noise', u8, { orig: 'NL80211_SURVEY_INFO_NOISE', docs: [
            'noise level of channel (u8, dBm)',
        ] }],
        ['inUse', data, { orig: 'NL80211_SURVEY_INFO_IN_USE', docs: [
            'channel is currently being used',
        ] }],
        ['time', u64, { orig: 'NL80211_SURVEY_INFO_TIME', docs: [
            'amount of time (in ms) that the radio',
            'was turned on (on channel or globally)',
        ] }],
        ['timeBusy', u64, { orig: 'NL80211_SURVEY_INFO_TIME_BUSY', docs: [
            'amount of the time the primary',
            'channel was sensed busy (either due to activity or energy detect)',
        ] }],
        ['timeExtBusy', u64, { orig: 'NL80211_SURVEY_INFO_TIME_EXT_BUSY', docs: [
            'amount of time the extension',
            'channel was sensed busy',
        ] }],
        ['timeRx', u64, { orig: 'NL80211_SURVEY_INFO_TIME_RX', docs: [
            'amount of time the radio spent',
            'receiving data (on channel or globally)',
        ] }],
        ['timeTx', u64, { orig: 'NL80211_SURVEY_INFO_TIME_TX', docs: [
            'amount of time the radio spent',
            'transmitting data (on channel or globally)',
        ] }],
        ['timeScan', data, { orig: 'NL80211_SURVEY_INFO_TIME_SCAN', docs: [
            'time the radio spent for scan',
            '(on this channel or globally)',
        ] }],
        ['pad', data, { orig: 'NL80211_SURVEY_INFO_PAD', docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['timeBssRx', data, { orig: 'NL80211_SURVEY_INFO_TIME_BSS_RX', docs: [
            'amount of time the radio spent',
            'receiving frames destined to the local BSS',
        ] }],
    ]},

    MonitorFlags: { orig: 'nl80211_mntr_flags', docs: [
        'monitor configuration flags',
        '',
        'Monitor configuration flags.',
    ], attrs: [
        ['fcsfail', flag, { orig: 'NL80211_MNTR_FLAG_FCSFAIL', docs: [
            'pass frames with bad FCS',
        ] }],
        ['plcpfail', flag, { orig: 'NL80211_MNTR_FLAG_PLCPFAIL', docs: [
            'pass frames with bad PLCP',
        ] }],
        ['control', flag, { orig: 'NL80211_MNTR_FLAG_CONTROL', docs: [
            'pass control frames',
        ] }],
        ['otherBss', flag, { orig: 'NL80211_MNTR_FLAG_OTHER_BSS', docs: [
            'disable BSSID filtering',
        ] }],
        ['cookFrames', flag, { orig: 'NL80211_MNTR_FLAG_COOK_FRAMES', docs: [
            'report frames after processing.',
            'overrides all other flags.',
        ] }],
        ['active', flag, { orig: 'NL80211_MNTR_FLAG_ACTIVE', docs: [
            'use the configured MAC address',
            'and ACK incoming unicast packets.',
        ] }],
    ]},

    MeshPowerMode: { kind: 'enum', orig: 'nl80211_mesh_power_mode', docs: [
        'mesh power save modes',
        '',
        '@__NL80211_MESH_POWER_AFTER_LAST - internal use',
        '@NL80211_MESH_POWER_MAX - highest possible power save level',
    ], values: [
        { value: 0, name: 'UNKNOWN', orig: 'NL80211_MESH_POWER_UNKNOWN', docs: [
            'The mesh power mode of the mesh STA is',
            'not known or has not been set yet.',
        ] },
        { value: 1, name: 'ACTIVE', orig: 'NL80211_MESH_POWER_ACTIVE', docs: [
            'Active mesh power mode. The mesh STA is',
            'in Awake state all the time.',
        ] },
        { value: 2, name: 'LIGHT_SLEEP', orig: 'NL80211_MESH_POWER_LIGHT_SLEEP', docs: [
            'Light sleep mode. The mesh STA will',
            'alternate between Active and Doze states, but will wake up for',
            "neighbor's beacons.",
        ] },
        { value: 3, name: 'DEEP_SLEEP', orig: 'NL80211_MESH_POWER_DEEP_SLEEP', docs: [
            'Deep sleep mode. The mesh STA will',
            'alternate between Active and Doze states, but may not wake up',
            "for neighbor's beacons.",
        ] },
    ]},

    MeshconfParams: { orig: 'nl80211_meshconf_params', docs: [
        'mesh configuration parameters',
        '',
        'Mesh configuration parameters. These can be changed while the mesh is',
        'active.',
    ], attrs: [
        ['retryTimeout', data, { orig: 'NL80211_MESHCONF_RETRY_TIMEOUT', docs: [
            'specifies the initial retry timeout in',
            'millisecond units, used by the Peer Link Open message',
        ] }],
        ['confirmTimeout', data, { orig: 'NL80211_MESHCONF_CONFIRM_TIMEOUT', docs: [
            'specifies the initial confirm timeout, in',
            'millisecond units, used by the peer link management to close a peer link',
        ] }],
        ['holdingTimeout', data, { orig: 'NL80211_MESHCONF_HOLDING_TIMEOUT', docs: [
            'specifies the holding timeout, in',
            'millisecond units',
        ] }],
        ['maxPeerLinks', data, { orig: 'NL80211_MESHCONF_MAX_PEER_LINKS', docs: [
            'maximum number of peer links allowed',
            'on this mesh interface',
        ] }],
        ['maxRetries', data, { orig: 'NL80211_MESHCONF_MAX_RETRIES', docs: [
            'specifies the maximum number of peer link',
            'open retries that can be sent to establish a new peer link instance in a',
            'mesh',
        ] }],
        ['ttl', data, { orig: 'NL80211_MESHCONF_TTL', docs: [
            'specifies the value of TTL field set at a source mesh',
            'point.',
        ] }],
        ['autoOpenPlinks', data, { orig: 'NL80211_MESHCONF_AUTO_OPEN_PLINKS', docs: [
            'whether we should automatically open',
            'peer links when we detect compatible mesh peers. Disabled if',
            '@NL80211_MESH_SETUP_USERSPACE_MPM or @NL80211_MESH_SETUP_USERSPACE_AMPE are',
            'set.',
        ] }],
        ['hwmpMaxPreqRetries', data, { orig: 'NL80211_MESHCONF_HWMP_MAX_PREQ_RETRIES', docs: [
            'the number of action frames',
            'containing a PREQ that an MP can send to a particular destination (path',
            'target)',
        ] }],
        ['pathRefreshTime', data, { orig: 'NL80211_MESHCONF_PATH_REFRESH_TIME', docs: [
            'how frequently to refresh mesh paths',
            '(in milliseconds)',
        ] }],
        ['minDiscoveryTimeout', data, { orig: 'NL80211_MESHCONF_MIN_DISCOVERY_TIMEOUT', docs: [
            'minimum length of time to wait',
            'until giving up on a path discovery (in milliseconds)',
        ] }],
        ['hwmpActivePathTimeout', data, { orig: 'NL80211_MESHCONF_HWMP_ACTIVE_PATH_TIMEOUT', docs: [
            'The time (in TUs) for which mesh',
            'points receiving a PREQ shall consider the forwarding information from',
            'the root to be valid. (TU = time unit)',
        ] }],
        ['hwmpPreqMinInterval', data, { orig: 'NL80211_MESHCONF_HWMP_PREQ_MIN_INTERVAL', docs: [
            'The minimum interval of time (in',
            'TUs) during which an MP can send only one action frame containing a PREQ',
            'reference element',
        ] }],
        ['hwmpNetDiamTrvsTime', data, { orig: 'NL80211_MESHCONF_HWMP_NET_DIAM_TRVS_TIME', docs: [
            'The interval of time (in TUs)',
            'that it takes for an HWMP information element to propagate across the',
            'mesh',
        ] }],
        ['hwmpRootmode', data, { orig: 'NL80211_MESHCONF_HWMP_ROOTMODE', docs: [
            'whether root mode is enabled or not',
        ] }],
        ['elementTtl', data, { orig: 'NL80211_MESHCONF_ELEMENT_TTL', docs: [
            'specifies the value of TTL field set at a',
            'source mesh point for path selection elements.',
        ] }],
        ['hwmpRannInterval', data, { orig: 'NL80211_MESHCONF_HWMP_RANN_INTERVAL', docs: [
            'The interval of time (in TUs) between',
            'root announcements are transmitted.',
        ] }],
        ['gateAnnouncements', data, { orig: 'NL80211_MESHCONF_GATE_ANNOUNCEMENTS', docs: [
            'Advertise that this mesh station has',
            'access to a broader network beyond the MBSS.  This is done via Root',
            'Announcement frames.',
        ] }],
        ['hwmpPerrMinInterval', data, { orig: 'NL80211_MESHCONF_HWMP_PERR_MIN_INTERVAL', docs: [
            'The minimum interval of time (in',
            'TUs) during which a mesh STA can send only one Action frame containing a',
            'PERR element.',
        ] }],
        ['forwarding', data, { orig: 'NL80211_MESHCONF_FORWARDING', docs: [
            'set Mesh STA as forwarding or non-forwarding',
            'or forwarding entity (default is TRUE - forwarding entity)',
        ] }],
        ['rssiThreshold', data, { orig: 'NL80211_MESHCONF_RSSI_THRESHOLD', docs: [
            'RSSI threshold in dBm. This specifies the',
            'threshold for average signal strength of candidate station to establish',
            'a peer link.',
        ] }],
        ['syncOffsetMaxNeighbor', data, { orig: 'NL80211_MESHCONF_SYNC_OFFSET_MAX_NEIGHBOR', docs: [
            'maximum number of neighbors',
            'to synchronize to for 11s default synchronization method',
            '(see 11C.12.2.2)',
        ] }],
        ['htOpmode', data, { orig: 'NL80211_MESHCONF_HT_OPMODE', docs: [
            'set mesh HT protection mode.',
        ] }],
        ['hwmpPathToRootTimeout', data, { orig: 'NL80211_MESHCONF_HWMP_PATH_TO_ROOT_TIMEOUT', docs: [
            'The time (in TUs) for',
            'which mesh STAs receiving a proactive PREQ shall consider the forwarding',
            'information to the root mesh STA to be valid.',
        ] }],
        ['hwmpRootInterval', data, { orig: 'NL80211_MESHCONF_HWMP_ROOT_INTERVAL', docs: [
            'The interval of time (in TUs) between',
            'proactive PREQs are transmitted.',
        ] }],
        ['hwmpConfirmationInterval', data, { orig: 'NL80211_MESHCONF_HWMP_CONFIRMATION_INTERVAL', docs: [
            'The minimum interval of time',
            '(in TUs) during which a mesh STA can send only one Action frame',
            'containing a PREQ element for root path confirmation.',
        ] }],
        ['powerMode', u32, { type: 'MeshPowerMode', orig: 'NL80211_MESHCONF_POWER_MODE', docs: [
            'Default mesh power mode for new peer links.',
            'type &enum nl80211_mesh_power_mode (u32)',
        ] }],
        ['awakeWindow', data, { orig: 'NL80211_MESHCONF_AWAKE_WINDOW', docs: [
            'awake window duration (in TUs)',
        ] }],
        ['plinkTimeout', bool, { orig: 'NL80211_MESHCONF_PLINK_TIMEOUT', docs: [
            "If no tx activity is seen from a STA we've",
            'established peering with for longer than this time (in seconds), then',
            "remove it from the STA's list of peers. You may set this to 0 to disable",
            'the removal of the STA. Default is 30 minutes.',
        ] }],
        ['connectedToGate', flag, { orig: 'NL80211_MESHCONF_CONNECTED_TO_GATE', docs: [
            'If set to true then this mesh STA',
            'will advertise that it is connected to a gate in the mesh formation',
            'field.  If left unset then the mesh formation field will only',
            'advertise such if there is an active root mesh path.',
        ] }],
    ]},

    MeshSetupParams: { orig: 'nl80211_mesh_setup_params', docs: [
        'mesh setup parameters',
        '',
        'Mesh setup parameters.  These are used to start/join a mesh and cannot be',
        'changed while the mesh is active.',
    ], attrs: [
        ['enableVendorPathSel', flag, { orig: 'NL80211_MESH_SETUP_ENABLE_VENDOR_PATH_SEL', docs: [
            'Enable this option to use a',
            'vendor specific path selection algorithm or disable it to use the',
            'default HWMP.',
        ] }],
        ['enableVendorMetric', flag, { orig: 'NL80211_MESH_SETUP_ENABLE_VENDOR_METRIC', docs: [
            'Enable this option to use a',
            'vendor specific path metric or disable it to use the default Airtime',
            'metric.',
        ] }],
        ['ie', data, { orig: 'NL80211_MESH_SETUP_IE', docs: [
            'Information elements for this mesh, for instance, a',
            'robust security network ie, or a vendor specific information element',
            'that vendors will use to identify the path selection methods and',
            'metrics in use.',
        ] }],
        ['userspaceAuth', flag, { orig: 'NL80211_MESH_SETUP_USERSPACE_AUTH', docs: [
            'Enable this option if an authentication',
            'daemon will be authenticating mesh candidates.',
        ] }],
        ['userspaceAmpe', flag, { orig: 'NL80211_MESH_SETUP_USERSPACE_AMPE', docs: [
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
        ['enableVendorSync', u8, { orig: 'NL80211_MESH_SETUP_ENABLE_VENDOR_SYNC', docs: [
            'Enable this option to use a',
            'vendor specific synchronization method or disable it to use the default',
            'neighbor offset synchronization',
        ] }],
        ['userspaceMpm', data, { orig: 'NL80211_MESH_SETUP_USERSPACE_MPM', docs: [
            'Enable this option if userspace will',
            'implement an MPM which handles peer allocation and state.',
        ] }],
        ['authProtocol', u8, { orig: 'NL80211_MESH_SETUP_AUTH_PROTOCOL', docs: [
            'Inform the kernel of the authentication',
            'method (u8, as defined in IEEE 8.4.2.100.6, e.g. 0x1 for SAE).',
            'Default is no authentication method required.',
        ] }],
    ]},

    Txq: { orig: 'nl80211_txq_attr', docs: [
        'TX queue parameter attributes',
    ], attrs: [
        ['ac', data, { type: 'Ac', orig: 'NL80211_TXQ_ATTR_AC', docs: [
            'AC identifier (NL80211_AC_*)',
        ] }],
        ['txop', data, { orig: 'NL80211_TXQ_ATTR_TXOP', docs: [
            'Maximum burst time in units of 32 usecs, 0 meaning',
            'disabled',
        ] }],
        ['cwmin', s16, { orig: 'NL80211_TXQ_ATTR_CWMIN', docs: [
            'Minimum contention window [a value of the form',
            '2^n-1 in the range 1..32767]',
        ] }],
        ['cwmax', s16, { orig: 'NL80211_TXQ_ATTR_CWMAX', docs: [
            'Maximum contention window [a value of the form',
            '2^n-1 in the range 1..32767]',
        ] }],
        ['aifs', u8, { orig: 'NL80211_TXQ_ATTR_AIFS', docs: [
            'Arbitration interframe space [0..255]',
        ] }],
    ]},

    Ac: { kind: 'enum', orig: 'nl80211_ac', values: [
        { value: 0, name: 'VO', orig: 'NL80211_AC_VO' },
        { value: 1, name: 'VI', orig: 'NL80211_AC_VI' },
        { value: 2, name: 'BE', orig: 'NL80211_AC_BE' },
        { value: 3, name: 'BK', orig: 'NL80211_AC_BK' },
    ]},

    ChannelType: { kind: 'enum', orig: 'nl80211_channel_type', docs: [
        'channel type',
    ], values: [
        { value: 0, name: 'NO_HT', orig: 'NL80211_CHAN_NO_HT', docs: [
            '20 MHz, non-HT channel',
        ] },
        { value: 1, name: 'HT20', orig: 'NL80211_CHAN_HT20', docs: [
            '20 MHz HT channel',
        ] },
        { value: 2, name: 'HT40MINUS', orig: 'NL80211_CHAN_HT40MINUS', docs: [
            'HT40 channel, secondary channel',
            'below the control channel',
        ] },
        { value: 3, name: 'HT40PLUS', orig: 'NL80211_CHAN_HT40PLUS', docs: [
            'HT40 channel, secondary channel',
            'above the control channel',
        ] },
    ]},

    KeyMode: { kind: 'enum', orig: 'nl80211_key_mode', docs: [
        'Key mode',
        '',
        'Modes NO_TX and SET_TX can only be selected for unicast keys and when the',
        'driver supports @NL80211_EXT_FEATURE_EXT_KEY_ID:',
    ], values: [
        { value: 0, name: 'RX_TX', orig: 'NL80211_KEY_RX_TX', docs: [
            '(Default)',
            'Key can be used for Rx and Tx immediately',
        ] },
        { value: 1, name: 'NO_TX', orig: 'NL80211_KEY_NO_TX', docs: [
            'Only allowed in combination with @NL80211_CMD_NEW_KEY:',
            'Unicast key can only be used for Rx, Tx not allowed, yet',
        ] },
        { value: 2, name: 'SET_TX', orig: 'NL80211_KEY_SET_TX', docs: [
            'Only allowed in combination with @NL80211_CMD_SET_KEY:',
            'The unicast key identified by idx and mac is cleared for Tx and becomes',
            'the preferred Tx key for the station.',
        ] },
    ]},

    ChannelWidth: { kind: 'enum', orig: 'nl80211_chan_width', docs: [
        'channel width definitions',
        '',
        'These values are used with the %NL80211_ATTR_CHANNEL_WIDTH',
        'attribute.',
    ], values: [
        { value: 0, name: '_20_NOHT', orig: 'NL80211_CHAN_WIDTH_20_NOHT', docs: [
            '20 MHz, non-HT channel',
        ] },
        { value: 1, name: '_20', orig: 'NL80211_CHAN_WIDTH_20', docs: [
            '20 MHz HT channel',
        ] },
        { value: 2, name: '_40', orig: 'NL80211_CHAN_WIDTH_40', docs: [
            '40 MHz channel, the %NL80211_ATTR_CENTER_FREQ1',
            'attribute must be provided as well',
        ] },
        { value: 3, name: '_80', orig: 'NL80211_CHAN_WIDTH_80', docs: [
            '80 MHz channel, the %NL80211_ATTR_CENTER_FREQ1',
            'attribute must be provided as well',
        ] },
        { value: 4, name: '_80P80', orig: 'NL80211_CHAN_WIDTH_80P80', docs: [
            '80+80 MHz channel, the %NL80211_ATTR_CENTER_FREQ1',
            'and %NL80211_ATTR_CENTER_FREQ2 attributes must be provided as well',
        ] },
        { value: 5, name: '_160', orig: 'NL80211_CHAN_WIDTH_160', docs: [
            '160 MHz channel, the %NL80211_ATTR_CENTER_FREQ1',
            'attribute must be provided as well',
        ] },
        { value: 6, name: '_5', orig: 'NL80211_CHAN_WIDTH_5', docs: [
            '5 MHz OFDM channel',
        ] },
        { value: 7, name: '_10', orig: 'NL80211_CHAN_WIDTH_10', docs: [
            '10 MHz OFDM channel',
        ] },
    ]},

    BssScanWidth: { kind: 'enum', orig: 'nl80211_bss_scan_width', docs: [
        'control channel width for a BSS',
        '',
        'These values are used with the %NL80211_BSS_CHAN_WIDTH attribute.',
    ], values: [
        { value: 0, name: '_20', orig: 'NL80211_BSS_CHAN_WIDTH_20', docs: [
            'control channel is 20 MHz wide or compatible',
        ] },
        { value: 1, name: '_10', orig: 'NL80211_BSS_CHAN_WIDTH_10', docs: [
            'control channel is 10 MHz wide',
        ] },
        { value: 2, name: '_5', orig: 'NL80211_BSS_CHAN_WIDTH_5', docs: [
            'control channel is 5 MHz wide',
        ] },
    ]},

    Bss: { orig: 'nl80211_bss', docs: [
        'netlink attributes for a BSS',
    ], attrs: [
        ['bssid', data, { orig: 'NL80211_BSS_BSSID', docs: [
            'BSSID of the BSS (6 octets)',
        ] }],
        ['frequency', u32, { orig: 'NL80211_BSS_FREQUENCY', docs: [
            'frequency in MHz (u32)',
        ] }],
        ['tsf', u64, { orig: 'NL80211_BSS_TSF', docs: [
            'TSF of the received probe response/beacon (u64)',
            '(if @NL80211_BSS_PRESP_DATA is present then this is known to be',
            'from a probe response, otherwise it may be from the same beacon',
            'that the NL80211_BSS_BEACON_TSF will be from)',
        ] }],
        ['beaconInterval', u16, { orig: 'NL80211_BSS_BEACON_INTERVAL', docs: [
            'beacon interval of the (I)BSS (u16)',
        ] }],
        ['capability', u16, { orig: 'NL80211_BSS_CAPABILITY', docs: [
            'capability field (CPU order, u16)',
        ] }],
        ['informationElements', data, { orig: 'NL80211_BSS_INFORMATION_ELEMENTS', docs: [
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
        ['signalMbm', s32, { orig: 'NL80211_BSS_SIGNAL_MBM', docs: [
            'signal strength of probe response/beacon',
            'in mBm (100 * dBm) (s32)',
        ] }],
        ['signalUnspec', u8, { orig: 'NL80211_BSS_SIGNAL_UNSPEC', docs: [
            'signal strength of the probe response/beacon',
            'in unspecified units, scaled to 0..100 (u8)',
        ] }],
        ['status', u32, { orig: 'NL80211_BSS_STATUS', docs: [
            'status, if this BSS is "used"',
        ] }],
        ['seenMsAgo', u32, { orig: 'NL80211_BSS_SEEN_MS_AGO', docs: [
            'age of this BSS entry in ms',
        ] }],
        ['beaconIes', data, { orig: 'NL80211_BSS_BEACON_IES', docs: [
            'binary attribute containing the raw information',
            'elements from a Beacon frame (bin); not present if no Beacon frame has',
            'yet been received',
        ] }],
        ['chanWidth', u32, { type: 'BssScanWidth', orig: 'NL80211_BSS_CHAN_WIDTH', docs: [
            'channel width of the control channel',
            '(u32, enum nl80211_bss_scan_width)',
        ] }],
        ['beaconTsf', u64, { orig: 'NL80211_BSS_BEACON_TSF', docs: [
            'TSF of the last received beacon (u64)',
            '(not present if no beacon frame has been received yet)',
        ] }],
        ['prespData', flag, { orig: 'NL80211_BSS_PRESP_DATA', docs: [
            'the data in @NL80211_BSS_INFORMATION_ELEMENTS and',
            '@NL80211_BSS_TSF is known to be from a probe response (flag attribute)',
        ] }],
        ['lastSeenBoottime', u64, { orig: 'NL80211_BSS_LAST_SEEN_BOOTTIME', docs: [
            'CLOCK_BOOTTIME timestamp when this entry',
            'was last updated by a received frame. The value is expected to be',
            'accurate to about 10ms. (u64, nanoseconds)',
        ] }],
        ['pad', data, { orig: 'NL80211_BSS_PAD', docs: [
            'attribute used for padding for 64-bit alignment',
        ] }],
        ['parentTsf', u64, { orig: 'NL80211_BSS_PARENT_TSF', docs: [
            'the time at the start of reception of the first',
            'octet of the timestamp field of the last beacon/probe received for',
            'this BSS. The time is the TSF of the BSS specified by',
            '@NL80211_BSS_PARENT_BSSID. (u64).',
        ] }],
        ['parentBssid', data, { orig: 'NL80211_BSS_PARENT_BSSID', docs: [
            'the BSS according to which @NL80211_BSS_PARENT_TSF',
            'is set.',
        ] }],
        ['chainSignal', u8, { orig: 'NL80211_BSS_CHAIN_SIGNAL', docs: [
            'per-chain signal strength of last BSS update.',
            'Contains a nested array of signal strength attributes (u8, dBm),',
            'using the nesting index as the antenna number.',
        ] }],
    ]},

    BssStatus: { kind: 'enum', orig: 'nl80211_bss_status', docs: [
        'BSS "status"',
        '',
        'The BSS status is a BSS attribute in scan dumps, which',
        'indicates the status the interface has wrt. this BSS.',
    ], values: [
        { value: 0, name: 'AUTHENTICATED', orig: 'NL80211_BSS_STATUS_AUTHENTICATED', docs: [
            'Authenticated with this BSS.',
            'Note that this is no longer used since cfg80211 no longer',
            'keeps track of whether or not authentication was done with',
            'a given BSS.',
        ] },
        { value: 1, name: 'ASSOCIATED', orig: 'NL80211_BSS_STATUS_ASSOCIATED', docs: [
            'Associated with this BSS.',
        ] },
        { value: 2, name: 'IBSS_JOINED', orig: 'NL80211_BSS_STATUS_IBSS_JOINED', docs: [
            'Joined to this IBSS.',
        ] },
    ]},

    AuthType: { kind: 'enum', orig: 'nl80211_auth_type', docs: [
        'AuthenticationType',
    ], values: [
        { value: 0, name: 'OPEN_SYSTEM', orig: 'NL80211_AUTHTYPE_OPEN_SYSTEM', docs: [
            'Open System authentication',
        ] },
        { value: 1, name: 'SHARED_KEY', orig: 'NL80211_AUTHTYPE_SHARED_KEY', docs: [
            'Shared Key authentication (WEP only)',
        ] },
        { value: 2, name: 'FT', orig: 'NL80211_AUTHTYPE_FT', docs: [
            'Fast BSS Transition (IEEE 802.11r)',
        ] },
        { value: 3, name: 'NETWORK_EAP', orig: 'NL80211_AUTHTYPE_NETWORK_EAP', docs: [
            'Network EAP (some Cisco APs and mainly LEAP)',
        ] },
        { value: 4, name: 'SAE', orig: 'NL80211_AUTHTYPE_SAE', docs: [
            'Simultaneous authentication of equals',
        ] },
        { value: 5, name: 'FILS_SK', orig: 'NL80211_AUTHTYPE_FILS_SK', docs: [
            'Fast Initial Link Setup shared key',
        ] },
        { value: 6, name: 'FILS_SK_PFS', orig: 'NL80211_AUTHTYPE_FILS_SK_PFS', docs: [
            'Fast Initial Link Setup shared key with PFS',
        ] },
        { value: 7, name: 'FILS_PK', orig: 'NL80211_AUTHTYPE_FILS_PK', docs: [
            'Fast Initial Link Setup public key',
        ] },
        { value: 8, name: 'AUTOMATIC', orig: 'NL80211_AUTHTYPE_AUTOMATIC', docs: [
            'determine automatically (if necessary by',
            'trying multiple times); this is invalid in netlink -- leave out',
            'the attribute for this on CONNECT commands.',
        ] },
    ]},

    KeyType: { kind: 'enum', orig: 'nl80211_key_type', docs: [
        'Key Type',
    ], values: [
        { value: 0, name: 'GROUP', orig: 'NL80211_KEYTYPE_GROUP', docs: [
            'Group (broadcast/multicast) key',
        ] },
        { value: 1, name: 'PAIRWISE', orig: 'NL80211_KEYTYPE_PAIRWISE', docs: [
            'Pairwise (unicast/individual) key',
        ] },
        { value: 2, name: 'PEERKEY', orig: 'NL80211_KEYTYPE_PEERKEY', docs: [
            'PeerKey (DLS)',
        ] },
    ]},

    Mfp: { kind: 'enum', orig: 'nl80211_mfp', docs: [
        'Management frame protection state',
    ], values: [
        { value: 0, name: 'NO', orig: 'NL80211_MFP_NO', docs: [
            'Management frame protection not used',
        ] },
        { value: 1, name: 'REQUIRED', orig: 'NL80211_MFP_REQUIRED', docs: [
            'Management frame protection required',
        ] },
        { value: 2, name: 'OPTIONAL', orig: 'NL80211_MFP_OPTIONAL', docs: [
            'Management frame protection is optional',
        ] },
    ]},

    WpaVersions: { kind: 'flags', orig: 'nl80211_wpa_versions', values: [
        { value: 1 << 0, name: '_1', orig: 'NL80211_WPA_VERSION_1' },
        { value: 1 << 1, name: '_2', orig: 'NL80211_WPA_VERSION_2' },
        { value: 1 << 2, name: '_3', orig: 'NL80211_WPA_VERSION_3' },
    ]},

    KeyDefaultTypes: { orig: 'nl80211_key_default_types', docs: [
        'key default types',
    ], attrs: [
        ['unicast', flag, { orig: 'NL80211_KEY_DEFAULT_TYPE_UNICAST', docs: [
            'key should be used as default',
            'unicast key',
        ] }],
        ['multicast', flag, { orig: 'NL80211_KEY_DEFAULT_TYPE_MULTICAST', docs: [
            'key should be used as default',
            'multicast key',
        ] }],
    ]},

    Key: { orig: 'nl80211_key_attributes', docs: [
        'key attributes',
    ], attrs: [
        ['data', data, { orig: 'NL80211_KEY_DATA', docs: [
            '(temporal) key data; for TKIP this consists of',
            '16 bytes encryption key followed by 8 bytes each for TX and RX MIC',
            'keys',
        ] }],
        ['idx', u8, { orig: 'NL80211_KEY_IDX', docs: [
            'key ID (u8, 0-3)',
        ] }],
        ['cipher', u32, { orig: 'NL80211_KEY_CIPHER', docs: [
            'key cipher suite (u32, as defined by IEEE 802.11',
            'section 7.3.2.25.1, e.g. 0x000FAC04)',
        ] }],
        ['seq', data, { orig: 'NL80211_KEY_SEQ', docs: [
            'transmit key sequence number (IV/PN) for TKIP and',
            'CCMP keys, each six bytes in little endian',
        ] }],
        ['default', flag, { orig: 'NL80211_KEY_DEFAULT', docs: [
            'flag indicating default key',
        ] }],
        ['defaultMgmt', flag, { orig: 'NL80211_KEY_DEFAULT_MGMT', docs: [
            'flag indicating default management key',
        ] }],
        ['type', u32, { type: 'KeyType', orig: 'NL80211_KEY_TYPE', docs: [
            'the key type from enum nl80211_key_type, if not',
            'specified the default depends on whether a MAC address was',
            'given with the command using the key or not (u32)',
        ] }],
        ['defaultTypes', 'KeyDefaultTypes', { orig: 'NL80211_KEY_DEFAULT_TYPES', docs: [
            'A nested attribute containing flags',
            'attributes, specifying what a key should be set as default as.',
            'See &enum nl80211_key_default_types.',
        ] }],
        ['mode', data, { type: 'KeyMode', orig: 'NL80211_KEY_MODE', docs: [
            'the mode from enum nl80211_key_mode.',
            'Defaults to @NL80211_KEY_RX_TX.',
        ] }],
    ]},

    TxRate: { orig: 'nl80211_tx_rate_attributes', docs: [
        'TX rate set attributes',
    ], attrs: [
        ['legacy', data, { orig: 'NL80211_TXRATE_LEGACY', docs: [
            'Legacy (non-MCS) rates allowed for TX rate selection',
            'in an array of rates as defined in IEEE 802.11 7.3.2.2 (u8 values with',
            '1 = 500 kbps) but without the IE length restriction (at most',
            '%NL80211_MAX_SUPP_RATES in a single array).',
        ] }],
        ['ht', data, { orig: 'NL80211_TXRATE_HT', docs: [
            'HT (MCS) rates allowed for TX rate selection',
            'in an array of MCS numbers.',
        ] }],
        ['vht', data, { orig: 'NL80211_TXRATE_VHT', docs: [
            'VHT rates allowed for TX rate selection,',
            'see &struct nl80211_txrate_vht',
        ] }],
        ['gi', data, { type: 'TxrateGuardInterval', orig: 'NL80211_TXRATE_GI', docs: [
            'configure GI, see &enum nl80211_txrate_gi',
        ] }],
    ]},

    TxrateGuardInterval: { kind: 'enum', orig: 'nl80211_txrate_gi', values: [
        { value: 0, name: 'DEFAULT_GI', orig: 'NL80211_TXRATE_DEFAULT_GI' },
        { value: 1, name: 'FORCE_SGI', orig: 'NL80211_TXRATE_FORCE_SGI' },
        { value: 2, name: 'FORCE_LGI', orig: 'NL80211_TXRATE_FORCE_LGI' },
    ]},

    BandId: { kind: 'enum', orig: 'nl80211_band', docs: [
        'Frequency band',
    ], values: [
        { value: 0, name: '_2GHZ', orig: 'NL80211_BAND_2GHZ', docs: [
            '2.4 GHz ISM band',
        ] },
        { value: 1, name: '_5GHZ', orig: 'NL80211_BAND_5GHZ', docs: [
            'around 5 GHz band (4.9 - 5.7 GHz)',
        ] },
        { value: 2, name: '_60GHZ', orig: 'NL80211_BAND_60GHZ', docs: [
            'around 60 GHz band (58.32 - 69.12 GHz)',
        ] },
        { value: 3, name: '_6GHZ', orig: 'NL80211_BAND_6GHZ', docs: [
            'around 6 GHz band (5.9 - 7.2 GHz)',
        ] },
    ]},

    PsState: { kind: 'enum', orig: 'nl80211_ps_state', docs: [
        'powersave state',
    ], values: [
        { value: 0, name: 'DISABLED', orig: 'NL80211_PS_DISABLED', docs: [
            'powersave is disabled',
        ] },
        { value: 1, name: 'ENABLED', orig: 'NL80211_PS_ENABLED', docs: [
            'powersave is enabled',
        ] },
    ]},

    Cqm: { orig: 'nl80211_attr_cqm', docs: [
        'connection quality monitor attributes',
    ], attrs: [
        ['rssiThold', u32, { orig: 'NL80211_ATTR_CQM_RSSI_THOLD', docs: [
            'RSSI threshold in dBm. This value specifies',
            'the threshold for the RSSI level at which an event will be sent. Zero',
            'to disable.  Alternatively, if %NL80211_EXT_FEATURE_CQM_RSSI_LIST is',
            'set, multiple values can be supplied as a low-to-high sorted array of',
            'threshold values in dBm.  Events will be sent when the RSSI value',
            'crosses any of the thresholds.',
        ] }],
        ['rssiHyst', u32, { orig: 'NL80211_ATTR_CQM_RSSI_HYST', docs: [
            'RSSI hysteresis in dBm. This value specifies',
            'the minimum amount the RSSI level must change after an event before a',
            'new event may be issued (to reduce effects of RSSI oscillation).',
        ] }],
        ['rssiThresholdEvent', u32, { orig: 'NL80211_ATTR_CQM_RSSI_THRESHOLD_EVENT', docs: [
            'RSSI threshold event',
        ] }],
        ['pktLossEvent', u32, { orig: 'NL80211_ATTR_CQM_PKT_LOSS_EVENT', docs: [
            'a u32 value indicating that this many',
            'consecutive packets were not acknowledged by the peer',
        ] }],
        ['txeRate', data, { orig: 'NL80211_ATTR_CQM_TXE_RATE', docs: [
            'TX error rate in %. Minimum % of TX failures',
            'during the given %NL80211_ATTR_CQM_TXE_INTVL before an',
            '%NL80211_CMD_NOTIFY_CQM with reported %NL80211_ATTR_CQM_TXE_RATE and',
            '%NL80211_ATTR_CQM_TXE_PKTS is generated.',
        ] }],
        ['txePkts', data, { orig: 'NL80211_ATTR_CQM_TXE_PKTS', docs: [
            'number of attempted packets in a given',
            '%NL80211_ATTR_CQM_TXE_INTVL before %NL80211_ATTR_CQM_TXE_RATE is',
            'checked.',
        ] }],
        ['txeIntvl', data, { orig: 'NL80211_ATTR_CQM_TXE_INTVL', docs: [
            'interval in seconds. Specifies the periodic',
            'interval in which %NL80211_ATTR_CQM_TXE_PKTS and',
            '%NL80211_ATTR_CQM_TXE_RATE must be satisfied before generating an',
            '%NL80211_CMD_NOTIFY_CQM. Set to 0 to turn off TX error reporting.',
        ] }],
        ['beaconLossEvent', flag, { orig: 'NL80211_ATTR_CQM_BEACON_LOSS_EVENT', docs: [
            "flag attribute that's set in a beacon",
            'loss event',
        ] }],
        ['rssiLevel', data, { orig: 'NL80211_ATTR_CQM_RSSI_LEVEL', docs: [
            'the RSSI value in dBm that triggered the',
            'RSSI threshold event.',
        ] }],
    ]},

    CqmRssiThresholdEvent: { kind: 'enum', orig: 'nl80211_cqm_rssi_threshold_event', docs: [
        'RSSI threshold event',
    ], values: [
        { value: 0, name: 'THRESHOLD_EVENT_LOW', orig: 'NL80211_CQM_RSSI_THRESHOLD_EVENT_LOW', docs: [
            'The RSSI level is lower than the',
            'configured threshold',
        ] },
        { value: 1, name: 'THRESHOLD_EVENT_HIGH', orig: 'NL80211_CQM_RSSI_THRESHOLD_EVENT_HIGH', docs: [
            'The RSSI is higher than the',
            'configured threshold',
        ] },
        { value: 2, name: 'BEACON_LOSS_EVENT', orig: 'NL80211_CQM_RSSI_BEACON_LOSS_EVENT', docs: [
            '(reserved, never sent)',
        ] },
    ]},

    TxPowerSetting: { kind: 'enum', orig: 'nl80211_tx_power_setting', docs: [
        'TX power adjustment',
    ], values: [
        { value: 0, name: 'AUTOMATIC', orig: 'NL80211_TX_POWER_AUTOMATIC', docs: [
            'automatically determine transmit power',
        ] },
        { value: 1, name: 'LIMITED', orig: 'NL80211_TX_POWER_LIMITED', docs: [
            'limit TX power by the mBm parameter',
        ] },
        { value: 2, name: 'FIXED', orig: 'NL80211_TX_POWER_FIXED', docs: [
            'fix TX power to the mBm parameter',
        ] },
    ]},

    PacketPattern: { orig: 'nl80211_packet_pattern_attr', docs: [
        'packet pattern attribute',
    ], attrs: [
        ['mask', data, { orig: 'NL80211_PKTPAT_MASK', docs: [
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
        ['pattern', data, { orig: 'NL80211_PKTPAT_PATTERN', docs: [
            'the pattern, values where the mask has',
            'a zero bit are ignored',
        ] }],
        ['offset', u32, { orig: 'NL80211_PKTPAT_OFFSET', docs: [
            'packet offset, pattern is matched after',
            'these fixed number of bytes of received packet',
        ] }],
    ]},

    WowlanTriggers: { orig: 'nl80211_wowlan_triggers', docs: [
        'WoWLAN trigger definitions',
        '',
        'These nested attributes are used to configure the wakeup triggers and',
        'to report the wakeup reason(s).',
    ], attrs: [
        ['any', flag, { orig: 'NL80211_WOWLAN_TRIG_ANY', docs: [
            'wake up on any activity, do not really put',
            'the chip into a special state -- works best with chips that have',
            'support for low-power operation already (flag)',
            'Note that this mode is incompatible with all of the others, if',
            'any others are even supported by the device.',
        ] }],
        ['disconnect', flag, { orig: 'NL80211_WOWLAN_TRIG_DISCONNECT', docs: [
            'wake up on disconnect, the way disconnect',
            'is detected is implementation-specific (flag)',
        ] }],
        ['magicPkt', flag, { orig: 'NL80211_WOWLAN_TRIG_MAGIC_PKT', docs: [
            'wake up on magic packet (6x 0xff, followed',
            'by 16 repetitions of MAC addr, anywhere in payload) (flag)',
        ] }],
        ['pktPattern', data, { orig: 'NL80211_WOWLAN_TRIG_PKT_PATTERN', docs: [
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
        ['gtkRekeySupported', flag, { orig: 'NL80211_WOWLAN_TRIG_GTK_REKEY_SUPPORTED', docs: [
            'Not a real trigger, and cannot be',
            'used when setting, used only to indicate that GTK rekeying is supported',
            'by the device (flag)',
        ] }],
        ['gtkRekeyFailure', flag, { orig: 'NL80211_WOWLAN_TRIG_GTK_REKEY_FAILURE', docs: [
            'wake up on GTK rekey failure (if',
            'done by the device) (flag)',
        ] }],
        ['eapIdentRequest', flag, { orig: 'NL80211_WOWLAN_TRIG_EAP_IDENT_REQUEST', docs: [
            'wake up on EAP Identity Request',
            'packet (flag)',
        ] }],
        ['_4wayHandshake', flag, { orig: 'NL80211_WOWLAN_TRIG_4WAY_HANDSHAKE', docs: [
            'wake up on 4-way handshake (flag)',
        ] }],
        ['rfkillRelease', flag, { orig: 'NL80211_WOWLAN_TRIG_RFKILL_RELEASE', docs: [
            'wake up when rfkill is released',
            '(on devices that have rfkill in the device) (flag)',
        ] }],
        ['wakeupPkt80211', data, { orig: 'NL80211_WOWLAN_TRIG_WAKEUP_PKT_80211', docs: [
            'For wakeup reporting only, contains',
            'the 802.11 packet that caused the wakeup, e.g. a deauth frame. The frame',
            'may be truncated, the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_80211_LEN',
            'attribute contains the original length.',
        ] }],
        ['wakeupPkt80211Len', data, { orig: 'NL80211_WOWLAN_TRIG_WAKEUP_PKT_80211_LEN', docs: [
            'Original length of the 802.11',
            'packet, may be bigger than the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_80211',
            'attribute if the packet was truncated somewhere.',
        ] }],
        ['wakeupPkt8023', data, { orig: 'NL80211_WOWLAN_TRIG_WAKEUP_PKT_8023', docs: [
            'For wakeup reporting only, contains the',
            '802.11 packet that caused the wakeup, e.g. a magic packet. The frame may',
            'be truncated, the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_8023_LEN attribute',
            'contains the original length.',
        ] }],
        ['wakeupPkt8023Len', data, { orig: 'NL80211_WOWLAN_TRIG_WAKEUP_PKT_8023_LEN', docs: [
            'Original length of the 802.3',
            'packet, may be bigger than the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_8023',
            'attribute if the packet was truncated somewhere.',
        ] }],
        ['tcpConnection', data, { orig: 'NL80211_WOWLAN_TRIG_TCP_CONNECTION', docs: [
            'TCP connection wake, see DOC section',
            '"TCP connection wakeup" for more details. This is a nested attribute',
            'containing the exact information for establishing and keeping alive',
            'the TCP connection.',
        ] }],
        ['wakeupTcpMatch', flag, { orig: 'NL80211_WOWLAN_TRIG_WAKEUP_TCP_MATCH', docs: [
            'For wakeup reporting only, the',
            'wakeup packet was received on the TCP connection',
        ] }],
        ['wakeupTcpConnlost', flag, { orig: 'NL80211_WOWLAN_TRIG_WAKEUP_TCP_CONNLOST', docs: [
            'For wakeup reporting only, the',
            'TCP connection was lost or failed to be established',
        ] }],
        ['wakeupTcpNomoretokens', flag, { orig: 'NL80211_WOWLAN_TRIG_WAKEUP_TCP_NOMORETOKENS', docs: [
            'For wakeup reporting only,',
            'the TCP connection ran out of tokens to use for data to send to the',
            'service',
        ] }],
        ['netDetect', data, { orig: 'NL80211_WOWLAN_TRIG_NET_DETECT', docs: [
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
        ['netDetectResults', array('Message'), { orig: 'NL80211_WOWLAN_TRIG_NET_DETECT_RESULTS', docs: [
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

    WowlanTcp: { orig: 'nl80211_wowlan_tcp_attrs', docs: [
        'WoWLAN TCP connection parameters',
    ], attrs: [
        ['srcIpv4', u32, { orig: 'NL80211_WOWLAN_TCP_SRC_IPV4', docs: [
            'source IPv4 address (in network byte order)',
        ] }],
        ['dstIpv4', u32, { orig: 'NL80211_WOWLAN_TCP_DST_IPV4', docs: [
            'destination IPv4 address',
            '(in network byte order)',
        ] }],
        ['dstMac', data, { orig: 'NL80211_WOWLAN_TCP_DST_MAC', docs: [
            'destination MAC address, this is given because',
            'route lookup when configured might be invalid by the time we suspend,',
            'and doing a route lookup when suspending is no longer possible as it',
            'might require ARP querying.',
        ] }],
        ['srcPort', u16, { orig: 'NL80211_WOWLAN_TCP_SRC_PORT', docs: [
            'source port (u16); optional, if not given a',
            'socket and port will be allocated',
        ] }],
        ['dstPort', u16, { orig: 'NL80211_WOWLAN_TCP_DST_PORT', docs: [
            'destination port (u16)',
        ] }],
        ['dataPayload', data, { orig: 'NL80211_WOWLAN_TCP_DATA_PAYLOAD', docs: [
            'data packet payload, at least one byte.',
            'For feature advertising, a u32 attribute holding the maximum length',
            'of the data payload.',
        ] }],
        ['dataPayloadSeq', data, { orig: 'NL80211_WOWLAN_TCP_DATA_PAYLOAD_SEQ', docs: [
            'data packet sequence configuration',
            '(if desired), a &struct nl80211_wowlan_tcp_data_seq. For feature',
            'advertising it is just a flag',
        ] }],
        ['dataPayloadToken', data, { orig: 'NL80211_WOWLAN_TCP_DATA_PAYLOAD_TOKEN', docs: [
            'data packet token configuration,',
            'see &struct nl80211_wowlan_tcp_data_token and for advertising see',
            '&struct nl80211_wowlan_tcp_data_token_feature.',
        ] }],
        ['dataInterval', u32, { orig: 'NL80211_WOWLAN_TCP_DATA_INTERVAL', docs: [
            'data interval in seconds, maximum',
            'interval in feature advertising (u32)',
        ] }],
        ['wakePayload', data, { orig: 'NL80211_WOWLAN_TCP_WAKE_PAYLOAD', docs: [
            'wake packet payload, for advertising a',
            'u32 attribute holding the maximum length',
        ] }],
        ['wakeMask', data, { orig: 'NL80211_WOWLAN_TCP_WAKE_MASK', docs: [
            'Wake packet payload mask, not used for',
            'feature advertising. The mask works like @NL80211_PKTPAT_MASK',
            'but on the TCP payload only.',
        ] }],
    ]},

    CoalesceRule: { orig: 'nl80211_attr_coalesce_rule', docs: [
        'coalesce rule attribute',
    ], attrs: [
        ['delay', u32, { orig: 'NL80211_ATTR_COALESCE_RULE_DELAY', docs: [
            'delay in msecs used for packet coalescing',
        ] }],
        ['condition', u32, { type: 'CoalesceCondition', orig: 'NL80211_ATTR_COALESCE_RULE_CONDITION', docs: [
            'condition for packet coalescence,',
            'see &enum nl80211_coalesce_condition.',
        ] }],
        ['pktPattern', data, { orig: 'NL80211_ATTR_COALESCE_RULE_PKT_PATTERN', docs: [
            'packet offset, pattern is matched',
            'after these fixed number of bytes of received packet',
        ] }],
    ]},

    CoalesceCondition: { kind: 'enum', orig: 'nl80211_coalesce_condition', docs: [
        'coalesce rule conditions',
    ], values: [
        { value: 0, name: 'MATCH', orig: 'NL80211_COALESCE_CONDITION_MATCH', docs: [
            'coalaesce Rx packets when patterns',
            'in a rule are matched.',
        ] },
        { value: 1, name: 'NO_MATCH', orig: 'NL80211_COALESCE_CONDITION_NO_MATCH', docs: [
            'coalesce Rx packets when patterns',
            'in a rule are not matched.',
        ] },
    ]},

    InterfaceLimit: { orig: 'nl80211_iface_limit_attrs', docs: [
        'limit attributes',
    ], attrs: [
        ['max', u32, { orig: 'NL80211_IFACE_LIMIT_MAX', docs: [
            'maximum number of interfaces that',
            'can be chosen from this set of interface types (u32)',
        ] }],
        ['types', asflags('InterfaceType'), { orig: 'NL80211_IFACE_LIMIT_TYPES', docs: [
            'nested attribute containing a',
            'flag attribute for each interface type in this set',
        ] }],
    ]},

    InterfaceCombination: { orig: 'nl80211_if_combination_attrs', docs: [
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
        ['limits', array('InterfaceLimit'), { orig: 'NL80211_IFACE_COMB_LIMITS', docs: [
            'Nested attributes containing the limits',
            'for given interface types, see &enum nl80211_iface_limit_attrs.',
        ] }],
        ['maxnum', u32, { orig: 'NL80211_IFACE_COMB_MAXNUM', docs: [
            'u32 attribute giving the total number of',
            "interfaces that can be created in this group. This number doesn't",
            'apply to interfaces purely managed in software, which are listed',
            'in a separate attribute %NL80211_ATTR_INTERFACES_SOFTWARE.',
        ] }],
        ['staApBiMatch', flag, { orig: 'NL80211_IFACE_COMB_STA_AP_BI_MATCH', docs: [
            'flag attribute specifying that',
            'beacon intervals within this group must be all the same even for',
            'infrastructure and AP/GO combinations, i.e. the GO(s) must adopt',
            "the infrastructure network's beacon interval.",
        ] }],
        ['numChannels', u32, { orig: 'NL80211_IFACE_COMB_NUM_CHANNELS', docs: [
            'u32 attribute specifying how many',
            'different channels may be used within this group.',
        ] }],
        ['radarDetectWidths', u32, { type: asflags('ChannelWidth'), orig: 'NL80211_IFACE_COMB_RADAR_DETECT_WIDTHS', docs: [
            'u32 attribute containing the bitmap',
            'of supported channel widths for radar detection.',
        ] }],
        ['radarDetectRegions', u32, { orig: 'NL80211_IFACE_COMB_RADAR_DETECT_REGIONS', docs: [
            'u32 attribute containing the bitmap',
            'of supported regulatory regions for radar detection.',
        ] }],
        ['biMinGcd', u32, { orig: 'NL80211_IFACE_COMB_BI_MIN_GCD', docs: [
            'u32 attribute specifying the minimum GCD of',
            'different beacon intervals supported by all the interface combinations',
            'in this group (if not present, all beacon intervals be identical).',
        ] }],
    ]},

    PlinkState: { kind: 'enum', orig: 'nl80211_plink_state', docs: [
        'state of a mesh peer link finite state machine',
    ], values: [
        { value: 0, name: 'LISTEN', orig: 'NL80211_PLINK_LISTEN', docs: [
            'initial state, considered the implicit',
            'state of non existent mesh peer links',
        ] },
        { value: 1, name: 'OPN_SNT', orig: 'NL80211_PLINK_OPN_SNT', docs: [
            'mesh plink open frame has been sent to',
            'this mesh peer',
        ] },
        { value: 2, name: 'OPN_RCVD', orig: 'NL80211_PLINK_OPN_RCVD', docs: [
            'mesh plink open frame has been received',
            'from this mesh peer',
        ] },
        { value: 3, name: 'CNF_RCVD', orig: 'NL80211_PLINK_CNF_RCVD', docs: [
            'mesh plink confirm frame has been',
            'received from this mesh peer',
        ] },
        { value: 4, name: 'ESTAB', orig: 'NL80211_PLINK_ESTAB', docs: [
            'mesh peer link is established',
        ] },
        { value: 5, name: 'HOLDING', orig: 'NL80211_PLINK_HOLDING', docs: [
            'mesh peer link is being closed or cancelled',
        ] },
        { value: 6, name: 'BLOCKED', orig: 'NL80211_PLINK_BLOCKED', docs: [
            'all frames transmitted from this mesh',
            'plink are discarded',
        ] },
    ]},

    PlinkAction: { kind: 'enum', orig: 'nl80211_plink_action', docs: [
        'actions to perform in mesh peers',
    ], values: [
        { value: 0, name: 'NO_ACTION', orig: 'NL80211_PLINK_ACTION_NO_ACTION', docs: [
            'perform no action',
        ] },
        { value: 1, name: 'OPEN', orig: 'NL80211_PLINK_ACTION_OPEN', docs: [
            'start mesh peer link establishment',
        ] },
        { value: 2, name: 'BLOCK', orig: 'NL80211_PLINK_ACTION_BLOCK', docs: [
            'block traffic from this mesh peer',
        ] },
    ]},

    RekeyData: { orig: 'nl80211_rekey_data', docs: [
        'attributes for GTK rekey offload',
    ], attrs: [
        ['kek', data, { orig: 'NL80211_REKEY_DATA_KEK', docs: [
            'key encryption key (binary)',
        ] }],
        ['kck', data, { orig: 'NL80211_REKEY_DATA_KCK', docs: [
            'key confirmation key (binary)',
        ] }],
        ['replayCtr', data, { orig: 'NL80211_REKEY_DATA_REPLAY_CTR', docs: [
            'replay counter (binary)',
        ] }],
    ]},

    HiddenSsid: { kind: 'enum', orig: 'nl80211_hidden_ssid', docs: [
        'values for %NL80211_ATTR_HIDDEN_SSID',
    ], values: [
        { value: 0, name: 'NOT_IN_USE', orig: 'NL80211_HIDDEN_SSID_NOT_IN_USE', docs: [
            'do not hide SSID (i.e., broadcast it in',
            'Beacon frames)',
        ] },
        { value: 1, name: 'ZERO_LEN', orig: 'NL80211_HIDDEN_SSID_ZERO_LEN', docs: [
            'hide SSID by using zero-length SSID element',
            'in Beacon frames',
        ] },
        { value: 2, name: 'ZERO_CONTENTS', orig: 'NL80211_HIDDEN_SSID_ZERO_CONTENTS', docs: [
            'hide SSID by using correct length of SSID',
            'element in Beacon frames but zero out each byte in the SSID',
        ] },
    ]},

    StationWme: { orig: 'nl80211_sta_wme_attr', docs: [
        'station WME attributes',
    ], attrs: [
        ['uapsdQueues', data, { orig: 'NL80211_STA_WME_UAPSD_QUEUES', docs: [
            'bitmap of uapsd queues. the format',
            'is the same as the AC bitmap in the QoS info field.',
        ] }],
        ['maxSp', data, { orig: 'NL80211_STA_WME_MAX_SP', docs: [
            'max service period. the format is the same',
            'as the MAX_SP field in the QoS info field (but already shifted down).',
        ] }],
    ]},

    PmksaCandidate: { orig: 'nl80211_pmksa_candidate_attr', docs: [
        'attributes for PMKSA caching candidates',
    ], attrs: [
        ['index', u32, { orig: 'NL80211_PMKSA_CANDIDATE_INDEX', docs: [
            'candidate index (u32; the smaller, the higher',
            'priority)',
        ] }],
        ['bssid', data, { orig: 'NL80211_PMKSA_CANDIDATE_BSSID', docs: [
            'candidate BSSID (6 octets)',
        ] }],
        ['preauth', flag, { orig: 'NL80211_PMKSA_CANDIDATE_PREAUTH', docs: [
            'RSN pre-authentication supported (flag)',
        ] }],
    ]},

    TdlsOperation: { kind: 'enum', orig: 'nl80211_tdls_operation', docs: [
        'values for %NL80211_ATTR_TDLS_OPERATION',
    ], values: [
        { value: 0, name: 'DISCOVERY_REQ', orig: 'NL80211_TDLS_DISCOVERY_REQ', docs: [
            'Send a TDLS discovery request',
        ] },
        { value: 1, name: 'SETUP', orig: 'NL80211_TDLS_SETUP', docs: [
            'Setup TDLS link',
        ] },
        { value: 2, name: 'TEARDOWN', orig: 'NL80211_TDLS_TEARDOWN', docs: [
            'Teardown a TDLS link which is already established',
        ] },
        { value: 3, name: 'ENABLE_LINK', orig: 'NL80211_TDLS_ENABLE_LINK', docs: [
            'Enable TDLS link',
        ] },
        { value: 4, name: 'DISABLE_LINK', orig: 'NL80211_TDLS_DISABLE_LINK', docs: [
            'Disable TDLS link',
        ] },
    ]},

    FeatureFlags: { kind: 'flags', orig: 'nl80211_feature_flags', docs: [
        'device/driver features',
    ], values: [
        { value: 1 << 0, name: 'skTxStatus', orig: 'NL80211_FEATURE_SK_TX_STATUS', docs: [
            'This driver supports reflecting back',
            'TX status to the socket error queue when requested with the',
            'socket option.',
        ] },
        { value: 1 << 1, name: 'htIbss', orig: 'NL80211_FEATURE_HT_IBSS', docs: [
            'This driver supports IBSS with HT datarates.',
        ] },
        { value: 1 << 2, name: 'inactivityTimer', orig: 'NL80211_FEATURE_INACTIVITY_TIMER', docs: [
            'This driver takes care of freeing up',
            'the connected inactive stations in AP mode.',
        ] },
        { value: 1 << 3, name: 'cellBaseRegHints', orig: 'NL80211_FEATURE_CELL_BASE_REG_HINTS', docs: [
            'This driver has been tested',
            'to work properly to suppport receiving regulatory hints from',
            'cellular base stations.',
        ] },
        { value: 1 << 4, name: 'p2pDeviceNeedsChannel', orig: 'NL80211_FEATURE_P2P_DEVICE_NEEDS_CHANNEL', docs: [
            '(no longer available, only',
            'here to reserve the value for API/ABI compatibility)',
        ] },
        { value: 1 << 5, name: 'sae', orig: 'NL80211_FEATURE_SAE', docs: [
            'This driver supports simultaneous authentication of',
            'equals (SAE) with user space SME (NL80211_CMD_AUTHENTICATE) in station',
            'mode',
        ] },
        { value: 1 << 6, name: 'lowPriorityScan', orig: 'NL80211_FEATURE_LOW_PRIORITY_SCAN', docs: [
            'This driver supports low priority scan',
        ] },
        { value: 1 << 7, name: 'scanFlush', orig: 'NL80211_FEATURE_SCAN_FLUSH', docs: [
            'Scan flush is supported',
        ] },
        { value: 1 << 8, name: 'apScan', orig: 'NL80211_FEATURE_AP_SCAN', docs: [
            'Support scanning using an AP vif',
        ] },
        { value: 1 << 9, name: 'vifTxpower', orig: 'NL80211_FEATURE_VIF_TXPOWER', docs: [
            'The driver supports per-vif TX power setting',
        ] },
        { value: 1 << 10, name: 'needObssScan', orig: 'NL80211_FEATURE_NEED_OBSS_SCAN', docs: [
            'The driver expects userspace to perform',
            'OBSS scans and generate 20/40 BSS coex reports. This flag is used only',
            'for drivers implementing the CONNECT API, for AUTH/ASSOC it is implied.',
        ] },
        { value: 1 << 11, name: 'p2pGoCtwin', orig: 'NL80211_FEATURE_P2P_GO_CTWIN', docs: [
            'P2P GO implementation supports CT Window',
            'setting',
        ] },
        { value: 1 << 12, name: 'p2pGoOppps', orig: 'NL80211_FEATURE_P2P_GO_OPPPS', docs: [
            'P2P GO implementation supports opportunistic',
            'powersave',
        ] },
        { value: 1 << 14, name: 'advertiseChanLimits', orig: 'NL80211_FEATURE_ADVERTISE_CHAN_LIMITS', docs: [
            'cfg80211 advertises channel limits',
            '(HT40, VHT 80/160 MHz) if this flag is set',
        ] },
        { value: 1 << 15, name: 'fullApClientState', orig: 'NL80211_FEATURE_FULL_AP_CLIENT_STATE', docs: [
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
        { value: 1 << 16, name: 'userspaceMpm', orig: 'NL80211_FEATURE_USERSPACE_MPM', docs: [
            'This driver supports a userspace Mesh',
            'Peering Management entity which may be implemented by registering for',
            'beacons or NL80211_CMD_NEW_PEER_CANDIDATE events. The mesh beacon is',
            'still generated by the driver.',
        ] },
        { value: 1 << 17, name: 'activeMonitor', orig: 'NL80211_FEATURE_ACTIVE_MONITOR', docs: [
            'This driver supports an active monitor',
            'interface. An active monitor interface behaves like a normal monitor',
            'interface, but gets added to the driver. It ensures that incoming',
            'unicast packets directed at the configured interface address get ACKed.',
        ] },
        { value: 1 << 18, name: 'apModeChanWidthChange', orig: 'NL80211_FEATURE_AP_MODE_CHAN_WIDTH_CHANGE', docs: [
            'This driver supports dynamic',
            'channel bandwidth change (e.g., HT 20 <-> 40 MHz channel) during the',
            'lifetime of a BSS.',
        ] },
        { value: 1 << 19, name: 'dsParamSetIeInProbes', orig: 'NL80211_FEATURE_DS_PARAM_SET_IE_IN_PROBES', docs: [
            'This device adds a DS Parameter',
            'Set IE to probe requests.',
        ] },
        { value: 1 << 20, name: 'wfaTpcIeInProbes', orig: 'NL80211_FEATURE_WFA_TPC_IE_IN_PROBES', docs: [
            'This device adds a WFA TPC Report IE',
            'to probe requests.',
        ] },
        { value: 1 << 21, name: 'quiet', orig: 'NL80211_FEATURE_QUIET', docs: [
            'This device, in client mode, supports Quiet Period',
            'requests sent to it by an AP.',
        ] },
        { value: 1 << 22, name: 'txPowerInsertion', orig: 'NL80211_FEATURE_TX_POWER_INSERTION', docs: [
            'This device is capable of inserting the',
            'current tx power value into the TPC Report IE in the spectrum',
            'management TPC Report action frame, and in the Radio Measurement Link',
            'Measurement Report action frame.',
        ] },
        { value: 1 << 23, name: 'acktoEstimation', orig: 'NL80211_FEATURE_ACKTO_ESTIMATION', docs: [
            'This driver supports dynamic ACK timeout',
            'estimation (dynack). %NL80211_ATTR_WIPHY_DYN_ACK flag attribute is used',
            'to enable dynack.',
        ] },
        { value: 1 << 24, name: 'staticSmps', orig: 'NL80211_FEATURE_STATIC_SMPS', docs: [
            'Device supports static spatial',
            'multiplexing powersave, ie. can turn off all but one chain',
            'even on HT connections that should be using more chains.',
        ] },
        { value: 1 << 25, name: 'dynamicSmps', orig: 'NL80211_FEATURE_DYNAMIC_SMPS', docs: [
            'Device supports dynamic spatial',
            'multiplexing powersave, ie. can turn off all but one chain',
            'and then wake the rest up as required after, for example,',
            'rts/cts handshake.',
        ] },
        { value: 1 << 26, name: 'supportsWmmAdmission', orig: 'NL80211_FEATURE_SUPPORTS_WMM_ADMISSION', docs: [
            'the device supports setting up WMM',
            'TSPEC sessions (TID aka TSID 0-7) with the %NL80211_CMD_ADD_TX_TS',
            'command. Standard IEEE 802.11 TSPEC setup is not yet supported, it',
            'needs to be able to handle Block-Ack agreements and other things.',
        ] },
        { value: 1 << 27, name: 'macOnCreate', orig: 'NL80211_FEATURE_MAC_ON_CREATE', docs: [
            'Device supports configuring',
            "the vif's MAC address upon creation.",
            "See 'macaddr' field in the vif_params (cfg80211.h).",
        ] },
        { value: 1 << 28, name: 'tdlsChannelSwitch', orig: 'NL80211_FEATURE_TDLS_CHANNEL_SWITCH', docs: [
            'Driver supports channel switching when',
            'operating as a TDLS peer.',
        ] },
        { value: 1 << 29, name: 'scanRandomMacAddr', orig: 'NL80211_FEATURE_SCAN_RANDOM_MAC_ADDR', docs: [
            'This device/driver supports using a',
            'random MAC address during scan (if the device is unassociated); the',
            '%NL80211_SCAN_FLAG_RANDOM_ADDR flag may be set for scans and the MAC',
            'address mask/value will be used.',
        ] },
        { value: 1 << 30, name: 'schedScanRandomMacAddr', orig: 'NL80211_FEATURE_SCHED_SCAN_RANDOM_MAC_ADDR', docs: [
            'This device/driver supports',
            'using a random MAC address for every scan iteration during scheduled',
            'scan (while not associated), the %NL80211_SCAN_FLAG_RANDOM_ADDR may',
            'be set for scheduled scan and the MAC address mask/value will be used.',
        ] },
        { value: 1 << 31, name: 'ndRandomMacAddr', orig: 'NL80211_FEATURE_ND_RANDOM_MAC_ADDR', docs: [
            'This device/driver supports using a',
            'random MAC address for every scan iteration during "net detect", i.e.',
            'scan in unassociated WoWLAN, the %NL80211_SCAN_FLAG_RANDOM_ADDR may',
            'be set for scheduled scan and the MAC address mask/value will be used.',
        ] },
    ]},

    ExtendedFeatureIndex: { kind: 'enum', orig: 'nl80211_ext_feature_index', docs: [
        'bit index of extended features.',
    ], values: [
        { value: 0, name: 'VHT_IBSS', orig: 'NL80211_EXT_FEATURE_VHT_IBSS', docs: [
            'This driver supports IBSS with VHT datarates.',
        ] },
        { value: 1, name: 'RRM', orig: 'NL80211_EXT_FEATURE_RRM', docs: [
            'This driver supports RRM. When featured, user can',
            'can request to use RRM (see %NL80211_ATTR_USE_RRM) with',
            '%NL80211_CMD_ASSOCIATE and %NL80211_CMD_CONNECT requests, which will set',
            'the ASSOC_REQ_USE_RRM flag in the association request even if',
            'NL80211_FEATURE_QUIET is not advertized.',
        ] },
        { value: 2, name: 'MU_MIMO_AIR_SNIFFER', orig: 'NL80211_EXT_FEATURE_MU_MIMO_AIR_SNIFFER', docs: [
            'This device supports MU-MIMO air',
            'sniffer which means that it can be configured to hear packets from',
            'certain groups which can be configured by the',
            '%NL80211_ATTR_MU_MIMO_GROUP_DATA attribute,',
            'or can be configured to follow a station by configuring the',
            '%NL80211_ATTR_MU_MIMO_FOLLOW_MAC_ADDR attribute.',
        ] },
        { value: 3, name: 'SCAN_START_TIME', orig: 'NL80211_EXT_FEATURE_SCAN_START_TIME', docs: [
            'This driver includes the actual',
            'time the scan started in scan results event. The time is the TSF of',
            'the BSS that the interface that requested the scan is connected to',
            '(if available).',
        ] },
        { value: 4, name: 'BSS_PARENT_TSF', orig: 'NL80211_EXT_FEATURE_BSS_PARENT_TSF', docs: [
            'Per BSS, this driver reports the',
            'time the last beacon/probe was received. The time is the TSF of the',
            'BSS that the interface that requested the scan is connected to',
            '(if available).',
        ] },
        { value: 5, name: 'SET_SCAN_DWELL', orig: 'NL80211_EXT_FEATURE_SET_SCAN_DWELL', docs: [
            'This driver supports configuration of',
            'channel dwell time.',
        ] },
        { value: 6, name: 'BEACON_RATE_LEGACY', orig: 'NL80211_EXT_FEATURE_BEACON_RATE_LEGACY', docs: [
            'Driver supports beacon rate',
            'configuration (AP/mesh), supporting a legacy (non HT/VHT) rate.',
        ] },
        { value: 7, name: 'BEACON_RATE_HT', orig: 'NL80211_EXT_FEATURE_BEACON_RATE_HT', docs: [
            'Driver supports beacon rate',
            'configuration (AP/mesh) with HT rates.',
        ] },
        { value: 8, name: 'BEACON_RATE_VHT', orig: 'NL80211_EXT_FEATURE_BEACON_RATE_VHT', docs: [
            'Driver supports beacon rate',
            'configuration (AP/mesh) with VHT rates.',
        ] },
        { value: 9, name: 'FILS_STA', orig: 'NL80211_EXT_FEATURE_FILS_STA', docs: [
            'This driver supports Fast Initial Link Setup',
            'with user space SME (NL80211_CMD_AUTHENTICATE) in station mode.',
        ] },
        { value: 10, name: 'MGMT_TX_RANDOM_TA', orig: 'NL80211_EXT_FEATURE_MGMT_TX_RANDOM_TA', docs: [
            'This driver supports randomized TA',
            'in @NL80211_CMD_FRAME while not associated.',
        ] },
        { value: 11, name: 'MGMT_TX_RANDOM_TA_CONNECTED', orig: 'NL80211_EXT_FEATURE_MGMT_TX_RANDOM_TA_CONNECTED', docs: [
            'This driver supports',
            'randomized TA in @NL80211_CMD_FRAME while associated.',
        ] },
        { value: 12, name: 'SCHED_SCAN_RELATIVE_RSSI', orig: 'NL80211_EXT_FEATURE_SCHED_SCAN_RELATIVE_RSSI', docs: [
            'The driver supports sched_scan',
            'for reporting BSSs with better RSSI than the current connected BSS',
            '(%NL80211_ATTR_SCHED_SCAN_RELATIVE_RSSI).',
        ] },
        { value: 13, name: 'CQM_RSSI_LIST', orig: 'NL80211_EXT_FEATURE_CQM_RSSI_LIST', docs: [
            'With this driver the',
            '%NL80211_ATTR_CQM_RSSI_THOLD attribute accepts a list of zero or more',
            'RSSI threshold values to monitor rather than exactly one threshold.',
        ] },
        { value: 14, name: 'FILS_SK_OFFLOAD', orig: 'NL80211_EXT_FEATURE_FILS_SK_OFFLOAD', docs: [
            'Driver SME supports FILS shared key',
            'authentication with %NL80211_CMD_CONNECT.',
        ] },
        { value: 15, name: '_4WAY_HANDSHAKE_STA_PSK', orig: 'NL80211_EXT_FEATURE_4WAY_HANDSHAKE_STA_PSK', docs: [
            'Device wants to do 4-way',
            'handshake with PSK in station mode (PSK is passed as part of the connect',
            'and associate commands), doing it in the host might not be supported.',
        ] },
        { value: 16, name: '_4WAY_HANDSHAKE_STA_1X', orig: 'NL80211_EXT_FEATURE_4WAY_HANDSHAKE_STA_1X', docs: [
            'Device wants to do doing 4-way',
            'handshake with 802.1X in station mode (will pass EAP frames to the host',
            'and accept the set_pmk/del_pmk commands), doing it in the host might not',
            'be supported.',
        ] },
        { value: 17, name: 'FILS_MAX_CHANNEL_TIME', orig: 'NL80211_EXT_FEATURE_FILS_MAX_CHANNEL_TIME', docs: [
            'Driver is capable of overriding',
            'the max channel attribute in the FILS request params IE with the',
            'actual dwell time.',
        ] },
        { value: 18, name: 'ACCEPT_BCAST_PROBE_RESP', orig: 'NL80211_EXT_FEATURE_ACCEPT_BCAST_PROBE_RESP', docs: [
            'Driver accepts broadcast probe',
            'response',
        ] },
        { value: 19, name: 'OCE_PROBE_REQ_HIGH_TX_RATE', orig: 'NL80211_EXT_FEATURE_OCE_PROBE_REQ_HIGH_TX_RATE', docs: [
            'Driver supports sending',
            'the first probe request in each channel at rate of at least 5.5Mbps.',
        ] },
        { value: 20, name: 'OCE_PROBE_REQ_DEFERRAL_SUPPRESSION', orig: 'NL80211_EXT_FEATURE_OCE_PROBE_REQ_DEFERRAL_SUPPRESSION', docs: [
            'Driver supports',
            'probe request tx deferral and suppression',
        ] },
        { value: 21, name: 'MFP_OPTIONAL', orig: 'NL80211_EXT_FEATURE_MFP_OPTIONAL', docs: [
            'Driver supports the %NL80211_MFP_OPTIONAL',
            'value in %NL80211_ATTR_USE_MFP.',
        ] },
        { value: 22, name: 'LOW_SPAN_SCAN', orig: 'NL80211_EXT_FEATURE_LOW_SPAN_SCAN', docs: [
            'Driver supports low span scan.',
        ] },
        { value: 23, name: 'LOW_POWER_SCAN', orig: 'NL80211_EXT_FEATURE_LOW_POWER_SCAN', docs: [
            'Driver supports low power scan.',
        ] },
        { value: 24, name: 'HIGH_ACCURACY_SCAN', orig: 'NL80211_EXT_FEATURE_HIGH_ACCURACY_SCAN', docs: [
            'Driver supports high accuracy scan.',
        ] },
        { value: 25, name: 'DFS_OFFLOAD', orig: 'NL80211_EXT_FEATURE_DFS_OFFLOAD', docs: [
            'HW/driver will offload DFS actions.',
            'Device or driver will do all DFS-related actions by itself,',
            'informing user-space about CAC progress, radar detection event,',
            'channel change triggered by radar detection event.',
            'No need to start CAC from user-space, no need to react to',
            '"radar detected" event.',
        ] },
        { value: 26, name: 'CONTROL_PORT_OVER_NL80211', orig: 'NL80211_EXT_FEATURE_CONTROL_PORT_OVER_NL80211', docs: [
            'Driver supports sending and',
            'receiving control port frames over nl80211 instead of the netdevice.',
        ] },
        { value: 27, name: 'ACK_SIGNAL_SUPPORT', orig: 'NL80211_EXT_FEATURE_ACK_SIGNAL_SUPPORT', docs: [
            'This driver/device supports',
            '(average) ACK signal strength reporting.',
        ] },
        { value: 28, name: 'TXQS', orig: 'NL80211_EXT_FEATURE_TXQS', docs: [
            'Driver supports FQ-CoDel-enabled intermediate',
            'TXQs.',
        ] },
        { value: 29, name: 'SCAN_RANDOM_SN', orig: 'NL80211_EXT_FEATURE_SCAN_RANDOM_SN', docs: [
            'Driver/device supports randomizing the',
            'SN in probe request frames if requested by %NL80211_SCAN_FLAG_RANDOM_SN.',
        ] },
        { value: 30, name: 'SCAN_MIN_PREQ_CONTENT', orig: 'NL80211_EXT_FEATURE_SCAN_MIN_PREQ_CONTENT', docs: [
            'Driver/device can omit all data',
            'except for supported rates from the probe request content if requested',
            'by the %NL80211_SCAN_FLAG_MIN_PREQ_CONTENT flag.',
        ] },
        { value: 31, name: 'CAN_REPLACE_PTK0', orig: 'NL80211_EXT_FEATURE_CAN_REPLACE_PTK0', docs: [
            'Driver/device confirm that they are',
            'able to rekey an in-use key correctly. Userspace must not rekey PTK keys',
            'if this flag is not set. Ignoring this can leak clear text packets and/or',
            'freeze the connection.',
        ] },
        { value: 32, name: 'ENABLE_FTM_RESPONDER', orig: 'NL80211_EXT_FEATURE_ENABLE_FTM_RESPONDER', docs: [
            'Driver supports enabling fine',
            'timing measurement responder role.',
        ] },
        { value: 33, name: 'AIRTIME_FAIRNESS', orig: 'NL80211_EXT_FEATURE_AIRTIME_FAIRNESS', docs: [
            'Driver supports getting airtime',
            'fairness for transmitted packets and has enabled airtime fairness',
            'scheduling.',
        ] },
        { value: 34, name: 'AP_PMKSA_CACHING', orig: 'NL80211_EXT_FEATURE_AP_PMKSA_CACHING', docs: [
            'Driver/device supports PMKSA caching',
            '(set/del PMKSA operations) in AP mode.',
        ] },
        { value: 35, name: 'SCHED_SCAN_BAND_SPECIFIC_RSSI_THOLD', orig: 'NL80211_EXT_FEATURE_SCHED_SCAN_BAND_SPECIFIC_RSSI_THOLD', docs: [
            'Driver supports',
            'filtering of sched scan results using band specific RSSI thresholds.',
        ] },
        { value: 36, name: 'EXT_KEY_ID', orig: 'NL80211_EXT_FEATURE_EXT_KEY_ID', docs: [
            'Driver supports "Extended Key ID for',
            'Individually Addressed Frames" from IEEE802.11-2016.',
        ] },
        { value: 37, name: 'STA_TX_PWR', orig: 'NL80211_EXT_FEATURE_STA_TX_PWR', docs: [
            'This driver supports controlling tx power',
            'to a station.',
        ] },
        { value: 38, name: 'SAE_OFFLOAD', orig: 'NL80211_EXT_FEATURE_SAE_OFFLOAD', docs: [
            'Device wants to do SAE authentication in',
            'station mode (SAE password is passed as part of the connect command).',
        ] },
        { value: 39, name: 'VLAN_OFFLOAD', orig: 'NL80211_EXT_FEATURE_VLAN_OFFLOAD', docs: [
            'The driver supports a single netdev',
            'with VLAN tagged frames and separate VLAN-specific netdevs added using',
            'vconfig similarly to the Ethernet case.',
        ] },
    ]},

    ProbeResponseOffloadSupport: { kind: 'flags', orig: 'nl80211_probe_resp_offload_support_attr', docs: [
        'optional supported',
        'protocols for probe-response offloading by the driver/FW.',
        'To be used with the %NL80211_ATTR_PROBE_RESP_OFFLOAD attribute.',
        'Each enum value represents a bit in the bitmap of supported',
        'protocols. Typically a subset of probe-requests belonging to a',
        'supported protocol will be excluded from offload and uploaded',
        'to the host.',
    ], values: [
        { value: 1<<0, name: 'wps', orig: 'NL80211_PROBE_RESP_OFFLOAD_SUPPORT_WPS', docs: [
            'Support for WPS ver. 1',
        ] },
        { value: 1<<1, name: 'wps2', orig: 'NL80211_PROBE_RESP_OFFLOAD_SUPPORT_WPS2', docs: [
            'Support for WPS ver. 2',
        ] },
        { value: 1<<2, name: 'p2p', orig: 'NL80211_PROBE_RESP_OFFLOAD_SUPPORT_P2P', docs: [
            'Support for P2P',
        ] },
        { value: 1<<3, name: '_80211u', orig: 'NL80211_PROBE_RESP_OFFLOAD_SUPPORT_80211U', docs: [
            'Support for 802.11u',
        ] },
    ]},

    ConnectFailedReason: { kind: 'enum', orig: 'nl80211_connect_failed_reason', docs: [
        'connection request failed reasons',
    ], values: [
        { value: 0, name: 'MAX_CLIENTS', orig: 'NL80211_CONN_FAIL_MAX_CLIENTS', docs: [
            'Maximum number of clients that can be',
            'handled by the AP is reached.',
        ] },
        { value: 1, name: 'BLOCKED_CLIENT', orig: 'NL80211_CONN_FAIL_BLOCKED_CLIENT', docs: [
            'Connection request is rejected due to ACL.',
        ] },
    ]},

    TimeoutReason: { kind: 'enum', orig: 'nl80211_timeout_reason', docs: [
        'timeout reasons',
    ], values: [
        { value: 0, name: 'UNSPECIFIED', orig: 'NL80211_TIMEOUT_UNSPECIFIED', docs: [
            'Timeout reason unspecified.',
        ] },
        { value: 1, name: 'SCAN', orig: 'NL80211_TIMEOUT_SCAN', docs: [
            'Scan (AP discovery) timed out.',
        ] },
        { value: 2, name: 'AUTH', orig: 'NL80211_TIMEOUT_AUTH', docs: [
            'Authentication timed out.',
        ] },
        { value: 3, name: 'ASSOC', orig: 'NL80211_TIMEOUT_ASSOC', docs: [
            'Association timed out.',
        ] },
    ]},

    ScanFlags: { kind: 'flags', orig: 'nl80211_scan_flags', docs: [
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
        { value: 1<<0, name: 'lowPriority', orig: 'NL80211_SCAN_FLAG_LOW_PRIORITY', docs: [
            'scan request has low priority',
        ] },
        { value: 1<<1, name: 'flush', orig: 'NL80211_SCAN_FLAG_FLUSH', docs: [
            'flush cache before scanning',
        ] },
        { value: 1<<2, name: 'ap', orig: 'NL80211_SCAN_FLAG_AP', docs: [
            'force a scan even if the interface is configured',
            'as AP and the beaconing has already been configured. This attribute is',
            'dangerous because will destroy stations performance as a lot of frames',
            'will be lost while scanning off-channel, therefore it must be used only',
            'when really needed',
        ] },
        { value: 1<<3, name: 'randomAddr', orig: 'NL80211_SCAN_FLAG_RANDOM_ADDR', docs: [
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
        { value: 1<<4, name: 'filsMaxChannelTime', orig: 'NL80211_SCAN_FLAG_FILS_MAX_CHANNEL_TIME', docs: [
            'fill the dwell time in the FILS',
            'request parameters IE in the probe request',
        ] },
        { value: 1<<5, name: 'acceptBcastProbeResp', orig: 'NL80211_SCAN_FLAG_ACCEPT_BCAST_PROBE_RESP', docs: [
            'accept broadcast probe responses',
        ] },
        { value: 1<<6, name: 'oceProbeReqHighTxRate', orig: 'NL80211_SCAN_FLAG_OCE_PROBE_REQ_HIGH_TX_RATE', docs: [
            'send probe request frames at',
            'rate of at least 5.5M. In case non OCE AP is discovered in the channel,',
            'only the first probe req in the channel will be sent in high rate.',
        ] },
        { value: 1<<7, name: 'oceProbeReqDeferralSuppression', orig: 'NL80211_SCAN_FLAG_OCE_PROBE_REQ_DEFERRAL_SUPPRESSION', docs: [
            'allow probe request',
            'tx deferral (dot11FILSProbeDelay shall be set to 15ms)',
            'and suppression (if it has received a broadcast Probe Response frame,',
            'Beacon frame or FILS Discovery frame from an AP that the STA considers',
            'a suitable candidate for (re-)association - suitable in terms of',
            'SSID and/or RSSI.',
        ] },
        { value: 1<<8, name: 'lowSpan', orig: 'NL80211_SCAN_FLAG_LOW_SPAN', docs: [
            'Span corresponds to the total time taken to',
            'accomplish the scan. Thus, this flag intends the driver to perform the',
            'scan request with lesser span/duration. It is specific to the driver',
            'implementations on how this is accomplished. Scan accuracy may get',
            'impacted with this flag.',
        ] },
        { value: 1<<9, name: 'lowPower', orig: 'NL80211_SCAN_FLAG_LOW_POWER', docs: [
            'This flag intends the scan attempts to consume',
            'optimal possible power. Drivers can resort to their specific means to',
            'optimize the power. Scan accuracy may get impacted with this flag.',
        ] },
        { value: 1<<10, name: 'highAccuracy', orig: 'NL80211_SCAN_FLAG_HIGH_ACCURACY', docs: [
            'Accuracy here intends to the extent of scan',
            'results obtained. Thus HIGH_ACCURACY scan flag aims to get maximum',
            'possible scan results. This flag hints the driver to use the best',
            'possible scan configuration to improve the accuracy in scanning.',
            'Latency and power use may get impacted with this flag.',
        ] },
        { value: 1<<11, name: 'randomSn', orig: 'NL80211_SCAN_FLAG_RANDOM_SN', docs: [
            'randomize the sequence number in probe',
            'request frames from this scan to avoid correlation/tracking being',
            'possible.',
        ] },
        { value: 1<<12, name: 'minPreqContent', orig: 'NL80211_SCAN_FLAG_MIN_PREQ_CONTENT', docs: [
            'minimize probe request content to',
            'only have supported rates and no additional capabilities (unless',
            'added by userspace explicitly.)',
        ] },
    ]},

    AclPolicy: { kind: 'enum', orig: 'nl80211_acl_policy', docs: [
        'access control policy',
        '',
        'Access control policy is applied on a MAC list set by',
        '%NL80211_CMD_START_AP and %NL80211_CMD_SET_MAC_ACL, to',
        'be used with %NL80211_ATTR_ACL_POLICY.',
    ], values: [
        { value: 0, name: 'ACCEPT_UNLESS_LISTED', orig: 'NL80211_ACL_POLICY_ACCEPT_UNLESS_LISTED', docs: [
            'Deny stations which are',
            'listed in ACL, i.e. allow all the stations which are not listed',
            'in ACL to authenticate.',
        ] },
        { value: 1, name: 'DENY_UNLESS_LISTED', orig: 'NL80211_ACL_POLICY_DENY_UNLESS_LISTED', docs: [
            'Allow the stations which are listed',
            'in ACL, i.e. deny all the stations which are not listed in ACL.',
        ] },
    ]},

    SmpsMode: { kind: 'enum', orig: 'nl80211_smps_mode', docs: [
        'SMPS mode',
        '',
        'Requested SMPS mode (for AP mode)',
    ], values: [
        { value: 0, name: 'OFF', orig: 'NL80211_SMPS_OFF', docs: [
            'SMPS off (use all antennas).',
        ] },
        { value: 1, name: 'STATIC', orig: 'NL80211_SMPS_STATIC', docs: [
            'static SMPS (use a single antenna)',
        ] },
        { value: 2, name: 'DYNAMIC', orig: 'NL80211_SMPS_DYNAMIC', docs: [
            'dynamic smps (start with a single antenna and',
            'turn on other antennas after CTS/RTS).',
        ] },
    ]},

    RadarEvent: { kind: 'enum', orig: 'nl80211_radar_event', docs: [
        'type of radar event for DFS operation',
        '',
        'Type of event to be used with NL80211_ATTR_RADAR_EVENT to inform userspace',
        'about detected radars or success of the channel available check (CAC)',
    ], values: [
        { value: 0, name: 'DETECTED', orig: 'NL80211_RADAR_DETECTED', docs: [
            'A radar pattern has been detected. The channel is',
            'now unusable.',
        ] },
        { value: 1, name: 'CAC_FINISHED', orig: 'NL80211_RADAR_CAC_FINISHED', docs: [
            'Channel Availability Check has been finished,',
            'the channel is now available.',
        ] },
        { value: 2, name: 'CAC_ABORTED', orig: 'NL80211_RADAR_CAC_ABORTED', docs: [
            'Channel Availability Check has been aborted, no',
            'change to the channel status.',
        ] },
        { value: 3, name: 'NOP_FINISHED', orig: 'NL80211_RADAR_NOP_FINISHED', docs: [
            'The Non-Occupancy Period for this channel is',
            'over, channel becomes usable.',
        ] },
        { value: 4, name: 'PRE_CAC_EXPIRED', orig: 'NL80211_RADAR_PRE_CAC_EXPIRED', docs: [
            'Channel Availability Check done on this',
            'non-operating channel is expired and no longer valid. New CAC must',
            'be done on this channel before starting the operation. This is not',
            'applicable for ETSI dfs domain where pre-CAC is valid for ever.',
        ] },
        { value: 5, name: 'CAC_STARTED', orig: 'NL80211_RADAR_CAC_STARTED', docs: [
            'Channel Availability Check has been started,',
            'should be generated by HW if NL80211_EXT_FEATURE_DFS_OFFLOAD is enabled.',
        ] },
    ]},

    DfsState: { kind: 'enum', orig: 'nl80211_dfs_state', docs: [
        'DFS states for channels',
        '',
        'Channel states used by the DFS code.',
    ], values: [
        { value: 0, name: 'USABLE', orig: 'NL80211_DFS_USABLE', docs: [
            'The channel can be used, but channel availability',
            'check (CAC) must be performed before using it for AP or IBSS.',
        ] },
        { value: 1, name: 'UNAVAILABLE', orig: 'NL80211_DFS_UNAVAILABLE', docs: [
            'A radar has been detected on this channel, it',
            'is therefore marked as not available.',
        ] },
        { value: 2, name: 'AVAILABLE', orig: 'NL80211_DFS_AVAILABLE', docs: [
            'The channel has been CAC checked and is available.',
        ] },
    ]},

    ProtocolFeatures: { kind: 'flags', orig: 'nl80211_protocol_features', docs: [
        'nl80211 protocol features',
    ], values: [
        { value: 1 << 0, name: 'phyDump', orig: 'NL80211_PROTOCOL_FEATURE_SPLIT_WIPHY_DUMP', docs: [
            'nl80211 supports splitting',
            'wiphy dumps (if requested by the application with the attribute',
            '%NL80211_ATTR_SPLIT_WIPHY_DUMP. Also supported is filtering the',
            'wiphy dump by %NL80211_ATTR_WIPHY, %NL80211_ATTR_IFINDEX or',
            '%NL80211_ATTR_WDEV.',
        ] },
    ]},

    CritProtoId: { kind: 'enum', orig: 'nl80211_crit_proto_id', docs: [
        'nl80211 critical protocol identifiers',
    ], values: [
        { value: 1, name: 'DHCP', orig: 'NL80211_CRIT_PROTO_DHCP', docs: [
            'BOOTP or DHCPv6 protocol.',
        ] },
        { value: 2, name: 'EAPOL', orig: 'NL80211_CRIT_PROTO_EAPOL', docs: [
            'EAPOL protocol.',
        ] },
        { value: 3, name: 'APIPA', orig: 'NL80211_CRIT_PROTO_APIPA', docs: [
            'APIPA protocol.',
        ] },
    ]},

    RxmgmtFlags: { kind: 'flags', orig: 'nl80211_rxmgmt_flags', docs: [
        'flags for received management frame.',
        '',
        'Used by cfg80211_rx_mgmt()',
    ], values: [
        { value: 1 << 0, name: 'answered', orig: 'NL80211_RXMGMT_FLAG_ANSWERED', docs: [
            'frame was answered by device/driver.',
        ] },
        { value: 1 << 1, name: 'externalAuth', orig: 'NL80211_RXMGMT_FLAG_EXTERNAL_AUTH', docs: [
            'Host driver intends to offload',
            'the authentication. Exclusively defined for host drivers that',
            'advertises the SME functionality but would like the userspace',
            'to handle certain authentication algorithms (e.g. SAE).',
        ] },
    ]},

    TdlsPeerCapability: { kind: 'flags', orig: 'nl80211_tdls_peer_capability', docs: [
        'TDLS peer flags.',
        '',
        'Used by tdls_mgmt() to determine which conditional elements need',
        'to be added to TDLS Setup frames.',
    ], values: [
        { value: 1<<0, name: 'ht', orig: 'NL80211_TDLS_PEER_HT', docs: [
            'TDLS peer is HT capable.',
        ] },
        { value: 1<<1, name: 'vht', orig: 'NL80211_TDLS_PEER_VHT', docs: [
            'TDLS peer is VHT capable.',
        ] },
        { value: 1<<2, name: 'wmm', orig: 'NL80211_TDLS_PEER_WMM', docs: [
            'TDLS peer is WMM capable.',
        ] },
    ]},

    ScheduledScanPlan: { orig: 'nl80211_sched_scan_plan', docs: [
        'scanning plan for scheduled scan',
    ], attrs: [
        ['nterval', u32, { orig: 'NL80211_SCHED_SCAN_PLAN_INTERVAL', docs: [
            'interval between scan iterations. In',
            'seconds (u32).',
        ] }],
        ['terations', u32, { orig: 'NL80211_SCHED_SCAN_PLAN_ITERATIONS', docs: [
            'number of scan iterations in this',
            'scan plan (u32). The last scan plan must not specify this attribute',
            'because it will run infinitely. A value of zero is invalid as it will',
            'make the scan plan meaningless.',
        ] }],
    ]},

    BssSelect: { orig: 'nl80211_bss_select_attr', docs: [
        'attributes for bss selection.',
        '',
        'One and only one of these attributes are found within %NL80211_ATTR_BSS_SELECT',
        'for %NL80211_CMD_CONNECT. It specifies the required BSS selection behaviour',
        'which the driver shall use.',
    ], attrs: [
        ['rssi', flag, { orig: 'NL80211_BSS_SELECT_ATTR_RSSI', docs: [
            'Flag indicating only RSSI-based BSS selection',
            'is requested.',
        ] }],
        ['bandPref', u32, { type: 'BandId', orig: 'NL80211_BSS_SELECT_ATTR_BAND_PREF', docs: [
            'attribute indicating BSS',
            'selection should be done such that the specified band is preferred.',
            'When there are multiple BSS-es in the preferred band, the driver',
            'shall use RSSI-based BSS selection as a second step. The value of',
            'this attribute is according to &enum nl80211_band (u32).',
        ] }],
        ['rssiAdjust', data, { orig: 'NL80211_BSS_SELECT_ATTR_RSSI_ADJUST', docs: [
            'When present the RSSI level for',
            'BSS-es in the specified band is to be adjusted before doing',
            'RSSI-based BSS selection. The attribute value is a packed structure',
            'value as specified by &struct nl80211_bss_select_rssi_adjust.',
        ] }],
    ]},

    NanFunctionType: { kind: 'enum', orig: 'nl80211_nan_function_type', docs: [
        'NAN function type',
        '',
        'Defines the function type of a NAN function',
    ], values: [
        { value: 0, name: 'PUBLISH', orig: 'NL80211_NAN_FUNC_PUBLISH', docs: [
            'function is publish',
        ] },
        { value: 1, name: 'SUBSCRIBE', orig: 'NL80211_NAN_FUNC_SUBSCRIBE', docs: [
            'function is subscribe',
        ] },
        { value: 2, name: 'FOLLOW_UP', orig: 'NL80211_NAN_FUNC_FOLLOW_UP', docs: [
            'function is follow-up',
        ] },
    ]},

    NanPublishType: { kind: 'flags', orig: 'nl80211_nan_publish_type', docs: [
        'NAN publish tx type',
        '',
        'Defines how to send publish Service Discovery Frames',
    ], values: [
        { value: 1 << 0, name: 'solicitedPublish', orig: 'NL80211_NAN_SOLICITED_PUBLISH', docs: [
            'publish function is solicited',
        ] },
        { value: 1 << 1, name: 'unsolicitedPublish', orig: 'NL80211_NAN_UNSOLICITED_PUBLISH', docs: [
            'publish function is unsolicited',
        ] },
    ]},

    NanFunctionTerminationReason: { kind: 'enum', orig: 'nl80211_nan_func_term_reason', docs: [
        'NAN functions termination reason',
        '',
        'Defines termination reasons of a NAN function',
    ], values: [
        { value: 0, name: 'USER_REQUEST', orig: 'NL80211_NAN_FUNC_TERM_REASON_USER_REQUEST', docs: [
            'requested by user',
        ] },
        { value: 1, name: 'TTL_EXPIRED', orig: 'NL80211_NAN_FUNC_TERM_REASON_TTL_EXPIRED', docs: [
            'timeout',
        ] },
        { value: 2, name: 'ERROR', orig: 'NL80211_NAN_FUNC_TERM_REASON_ERROR', docs: [
            'errored',
        ] },
    ]},

    NanFunction: { orig: 'nl80211_nan_func_attributes', docs: [
        'NAN function attributes',
    ], attrs: [
        ['type', u8, { type: 'NanFunctionType', orig: 'NL80211_NAN_FUNC_TYPE', docs: [
            '&enum nl80211_nan_function_type (u8).',
        ] }],
        ['serviceId', data, { orig: 'NL80211_NAN_FUNC_SERVICE_ID', docs: [
            '6 bytes of the service ID hash as',
            'specified in NAN spec. This is a binary attribute.',
        ] }],
        ['publishType', u8, { type: 'NanPublishType', orig: 'NL80211_NAN_FUNC_PUBLISH_TYPE', docs: [
            "relevant if the function's type is",
            'publish. Defines the transmission type for the publish Service Discovery',
            'Frame, see &enum nl80211_nan_publish_type. Its type is u8.',
        ] }],
        ['publishBcast', flag, { orig: 'NL80211_NAN_FUNC_PUBLISH_BCAST', docs: [
            'relevant if the function is a solicited',
            'publish. Should the solicited publish Service Discovery Frame be sent to',
            'the NAN Broadcast address. This is a flag.',
        ] }],
        ['subscribeActive', flag, { orig: 'NL80211_NAN_FUNC_SUBSCRIBE_ACTIVE', docs: [
            "relevant if the function's type is",
            'subscribe. Is the subscribe active. This is a flag.',
        ] }],
        ['followUpId', u8, { orig: 'NL80211_NAN_FUNC_FOLLOW_UP_ID', docs: [
            "relevant if the function's type is follow up.",
            'The instance ID for the follow up Service Discovery Frame. This is u8.',
        ] }],
        ['followUpReqId', u8, { orig: 'NL80211_NAN_FUNC_FOLLOW_UP_REQ_ID', docs: [
            "relevant if the function's type",
            'is follow up. This is a u8.',
            'The requestor instance ID for the follow up Service Discovery Frame.',
        ] }],
        ['followUpDest', data, { orig: 'NL80211_NAN_FUNC_FOLLOW_UP_DEST', docs: [
            'the MAC address of the recipient of the',
            'follow up Service Discovery Frame. This is a binary attribute.',
        ] }],
        ['closeRange', flag, { orig: 'NL80211_NAN_FUNC_CLOSE_RANGE', docs: [
            'is this function limited for devices in a',
            'close range. The range itself (RSSI) is defined by the device.',
            'This is a flag.',
        ] }],
        ['ttl', u32, { orig: 'NL80211_NAN_FUNC_TTL', docs: [
            'strictly positive number of DWs this function should',
            'stay active. If not present infinite TTL is assumed. This is a u32.',
        ] }],
        ['serviceInfo', data, { orig: 'NL80211_NAN_FUNC_SERVICE_INFO', docs: [
            'array of bytes describing the service',
            'specific info. This is a binary attribute.',
        ] }],
        ['srf', 'NanSrf', { orig: 'NL80211_NAN_FUNC_SRF', docs: [
            'Service Receive Filter. This is a nested attribute.',
            'See &enum nl80211_nan_srf_attributes.',
        ] }],
        ['rxMatchFilter', data, { orig: 'NL80211_NAN_FUNC_RX_MATCH_FILTER', docs: [
            'Receive Matching filter. This is a nested',
            'attribute. It is a list of binary values.',
        ] }],
        ['txMatchFilter', data, { orig: 'NL80211_NAN_FUNC_TX_MATCH_FILTER', docs: [
            'Transmit Matching filter. This is a',
            'nested attribute. It is a list of binary values.',
        ] }],
        ['instanceId', u8, { orig: 'NL80211_NAN_FUNC_INSTANCE_ID', docs: [
            'The instance ID of the function.',
            'Its type is u8 and it cannot be 0.',
        ] }],
        ['termReason', u8, { type: 'NanFunctionTerminationReason', orig: 'NL80211_NAN_FUNC_TERM_REASON', docs: [
            'NAN function termination reason.',
            'See &enum nl80211_nan_func_term_reason.',
        ] }],
    ]},

    NanSrf: { orig: 'nl80211_nan_srf_attributes', docs: [
        'NAN Service Response filter attributes',
    ], attrs: [
        ['include', flag, { orig: 'NL80211_NAN_SRF_INCLUDE', docs: [
            'present if the include bit of the SRF set.',
            'This is a flag.',
        ] }],
        ['bf', data, { orig: 'NL80211_NAN_SRF_BF', docs: [
            'Bloom Filter. Present if and only if',
            "%NL80211_NAN_SRF_MAC_ADDRS isn't present. This attribute is binary.",
        ] }],
        ['bfIdx', u8, { orig: 'NL80211_NAN_SRF_BF_IDX', docs: [
            'index of the Bloom Filter. Mandatory if',
            '%NL80211_NAN_SRF_BF is present. This is a u8.',
        ] }],
        ['macAddrs', array(data), { orig: 'NL80211_NAN_SRF_MAC_ADDRS', docs: [
            'list of MAC addresses for the SRF. Present if',
            "and only if %NL80211_NAN_SRF_BF isn't present. This is a nested",
            'attribute. Each nested attribute is a MAC address.',
        ] }],
    ]},

    NanMatch: { orig: 'nl80211_nan_match_attributes', docs: [
        'NAN match attributes',
    ], attrs: [
        ['local', 'NanFunction', { orig: 'NL80211_NAN_MATCH_FUNC_LOCAL', docs: [
            'the local function that had the',
            'match. This is a nested attribute.',
            'See &enum nl80211_nan_func_attributes.',
        ] }],
        ['peer', 'NanFunction', { orig: 'NL80211_NAN_MATCH_FUNC_PEER', docs: [
            'the peer function',
            'that caused the match. This is a nested attribute.',
            'See &enum nl80211_nan_func_attributes.',
        ] }],
    ]},

    ExternalAuthAction: { kind: 'enum', orig: 'nl80211_external_auth_action', docs: [
        'Action to perform with external',
        'authentication request. Used by NL80211_ATTR_EXTERNAL_AUTH_ACTION.',
    ], values: [
        { value: 0, name: 'START', orig: 'NL80211_EXTERNAL_AUTH_START', docs: [
            'Start the authentication.',
        ] },
        { value: 1, name: 'ABORT', orig: 'NL80211_EXTERNAL_AUTH_ABORT', docs: [
            'Abort the ongoing authentication.',
        ] },
    ]},

    FtmResponder: { orig: 'nl80211_ftm_responder_attributes', docs: [
        'fine timing measurement',
        'responder attributes',
    ], attrs: [
        ['enabled', data, { orig: 'NL80211_FTM_RESP_ATTR_ENABLED', docs: [
            'FTM responder is enabled',
        ] }],
        ['lci', data, { orig: 'NL80211_FTM_RESP_ATTR_LCI', docs: [
            'The content of Measurement Report Element',
            '(9.4.2.22 in 802.11-2016) with type 8 - LCI (9.4.2.22.10),',
            'i.e. starting with the measurement token',
        ] }],
        ['civicloc', data, { orig: 'NL80211_FTM_RESP_ATTR_CIVICLOC', docs: [
            'The content of Measurement Report Element',
            '(9.4.2.22 in 802.11-2016) with type 11 - Civic (Section 9.4.2.22.13),',
            'i.e. starting with the measurement token',
        ] }],
    ]},

    FtmResponderStats: { orig: 'nl80211_ftm_responder_stats', docs: [
        'FTM responder statistics',
        '',
        'These attribute types are used with %NL80211_ATTR_FTM_RESPONDER_STATS',
        'when getting FTM responder statistics.',
    ], attrs: [
        ['successNum', u32, { orig: 'NL80211_FTM_STATS_SUCCESS_NUM', docs: [
            'number of FTM sessions in which all frames',
            'were ssfully answered (u32)',
        ] }],
        ['partialNum', u32, { orig: 'NL80211_FTM_STATS_PARTIAL_NUM', docs: [
            'number of FTM sessions in which part of the',
            'frames were successfully answered (u32)',
        ] }],
        ['failedNum', u32, { orig: 'NL80211_FTM_STATS_FAILED_NUM', docs: [
            'number of failed FTM sessions (u32)',
        ] }],
        ['asapNum', u32, { orig: 'NL80211_FTM_STATS_ASAP_NUM', docs: [
            'number of ASAP sessions (u32)',
        ] }],
        ['nonAsapNum', u32, { orig: 'NL80211_FTM_STATS_NON_ASAP_NUM', docs: [
            'number of non-ASAP sessions (u32)',
        ] }],
        ['totalDurationMsec', u64, { orig: 'NL80211_FTM_STATS_TOTAL_DURATION_MSEC', docs: [
            'total sessions durations - gives an',
            'indication of how much time the responder was busy (u64, msec)',
        ] }],
        ['unknownTriggersNum', u32, { orig: 'NL80211_FTM_STATS_UNKNOWN_TRIGGERS_NUM', docs: [
            'number of unknown FTM triggers -',
            "triggers from initiators that didn't finish successfully the negotiation",
            'phase with the responder (u32)',
        ] }],
        ['rescheduleRequestsNum', u32, { orig: 'NL80211_FTM_STATS_RESCHEDULE_REQUESTS_NUM', docs: [
            'number of FTM reschedule requests',
            '- initiator asks for a new scheduling although it already has scheduled',
            'FTM slot (u32)',
        ] }],
        ['outOfWindowTriggersNum', u32, { orig: 'NL80211_FTM_STATS_OUT_OF_WINDOW_TRIGGERS_NUM', docs: [
            'number of FTM triggers out of',
            'scheduled window (u32)',
        ] }],
        ['pad', data, { orig: 'NL80211_FTM_STATS_PAD', docs: [
            'used for padding, ignore',
        ] }],
    ]},

    Preamble: { kind: 'enum', orig: 'nl80211_preamble', docs: [
        'frame preamble types',
    ], values: [
        { value: 0, name: 'LEGACY', orig: 'NL80211_PREAMBLE_LEGACY', docs: [
            'legacy (HR/DSSS, OFDM, ERP PHY) preamble',
        ] },
        { value: 1, name: 'HT', orig: 'NL80211_PREAMBLE_HT', docs: [
            'HT preamble',
        ] },
        { value: 2, name: 'VHT', orig: 'NL80211_PREAMBLE_VHT', docs: [
            'VHT preamble',
        ] },
        { value: 3, name: 'DMG', orig: 'NL80211_PREAMBLE_DMG', docs: [
            'DMG preamble',
        ] },
    ]},

    PeerMeasurementType: { kind: 'enum', orig: 'nl80211_peer_measurement_type', docs: [
        'peer measurement types',
    ], values: [
        { value: 0, name: 'INVALID', orig: 'NL80211_PMSR_TYPE_INVALID', docs: [
            'invalid/unused, needed as we use',
            'these numbers also for attributes',
        ] },
        { value: 1, name: 'FTM', orig: 'NL80211_PMSR_TYPE_FTM', docs: [
            'flight time measurement',
        ] },
    ]},

    PeerMeasurementStatus: { kind: 'enum', orig: 'nl80211_peer_measurement_status', docs: [
        'peer measurement status',
    ], values: [
        { value: 0, name: 'SUCCESS', orig: 'NL80211_PMSR_STATUS_SUCCESS', docs: [
            'measurement completed successfully',
        ] },
        { value: 1, name: 'REFUSED', orig: 'NL80211_PMSR_STATUS_REFUSED', docs: [
            'measurement was locally refused',
        ] },
        { value: 2, name: 'TIMEOUT', orig: 'NL80211_PMSR_STATUS_TIMEOUT', docs: [
            'measurement timed out',
        ] },
        { value: 3, name: 'FAILURE', orig: 'NL80211_PMSR_STATUS_FAILURE', docs: [
            'measurement failed, a type-dependent',
            'reason may be available in the response data',
        ] },
    ]},

    PeerMeasurementRequest: { orig: 'nl80211_peer_measurement_req', docs: [
        'peer measurement request attributes',
    ], attrs: [
        ['data', data, { orig: 'NL80211_PMSR_REQ_ATTR_DATA', docs: [
            'This is a nested attribute with measurement',
            'type-specific request data inside. The attributes used are from the',
            'enums named nl80211_peer_measurement_<type>_req.',
        ] }],
        ['getApTsf', flag, { orig: 'NL80211_PMSR_REQ_ATTR_GET_AP_TSF', docs: [
            'include AP TSF timestamp, if supported',
            '(flag attribute)',
        ] }],
    ]},

    PeerMeasurementResponse: { orig: 'nl80211_peer_measurement_resp', docs: [
        'peer measurement response attributes',
    ], attrs: [
        ['data', data, { orig: 'NL80211_PMSR_RESP_ATTR_DATA', docs: [
            'This is a nested attribute with measurement',
            'type-specific results inside. The attributes used are from the enums',
            'named nl80211_peer_measurement_<type>_resp.',
        ] }],
        ['status', u32, { type: 'PeerMeasurementStatus', orig: 'NL80211_PMSR_RESP_ATTR_STATUS', docs: [
            'u32 value with the measurement status',
            '(using values from &enum nl80211_peer_measurement_status.)',
        ] }],
        ['hostTime', u64, { orig: 'NL80211_PMSR_RESP_ATTR_HOST_TIME', docs: [
            'host time (%CLOCK_BOOTTIME) when the',
            'result was measured; this value is not expected to be accurate to',
            'more than 20ms. (u64, nanoseconds)',
        ] }],
        ['apTsf', u64, { orig: 'NL80211_PMSR_RESP_ATTR_AP_TSF', docs: [
            'TSF of the AP that the interface',
            'doing the measurement is connected to when the result was measured.',
            'This shall be accurately reported if supported and requested',
            '(u64, usec)',
        ] }],
        ['final', flag, { orig: 'NL80211_PMSR_RESP_ATTR_FINAL', docs: [
            'If results are sent to the host partially',
            '(*e.g. with FTM per-burst data) this flag will be cleared on all but',
            "the last result; if all results are combined it's set on the single",
            'result.',
        ] }],
        ['pad', data, { orig: 'NL80211_PMSR_RESP_ATTR_PAD', docs: [
            'padding for 64-bit attributes, ignore',
        ] }],
    ]},

    PeerMeasurementPeerAttrs: { orig: 'nl80211_peer_measurement_peer_attrs', docs: [
        'peer attributes for measurement',
    ], attrs: [
        ['addr', data, { orig: 'NL80211_PMSR_PEER_ATTR_ADDR', docs: [
            "peer's MAC address",
        ] }],
        ['chan', 'Message', { orig: 'NL80211_PMSR_PEER_ATTR_CHAN', docs: [
            'channel definition, nested, using top-level',
            'attributes like %NL80211_ATTR_WIPHY_FREQ etc.',
        ] }],
        ['req', map('PeerMeasurementRequest'), { orig: 'NL80211_PMSR_PEER_ATTR_REQ', docs: [
            'This is a nested attribute indexed by',
            'measurement type, with attributes from the',
            '&enum nl80211_peer_measurement_req inside.',
        ] }],
        ['resp', map('PeerMeasurementResponse'), { orig: 'NL80211_PMSR_PEER_ATTR_RESP', docs: [
            'This is a nested attribute indexed by',
            'measurement type, with attributes from the',
            '&enum nl80211_peer_measurement_resp inside.',
        ] }],
    ]},

    PeerMeasurement: { orig: 'nl80211_peer_measurement_attrs', docs: [
        'peer measurement attributes',
    ], attrs: [
        ['maxPeers', u32, { orig: 'NL80211_PMSR_ATTR_MAX_PEERS', docs: [
            'u32 attribute used for capability',
            'advertisement only, indicates the maximum number of peers',
            'measurements can be done with in a single request',
        ] }],
        ['reportApTsf', flag, { orig: 'NL80211_PMSR_ATTR_REPORT_AP_TSF', docs: [
            'flag attribute in capability',
            "indicating that the connected AP's TSF can be reported in",
            'measurement results',
        ] }],
        ['randomizeMacAddr', flag, { orig: 'NL80211_PMSR_ATTR_RANDOMIZE_MAC_ADDR', docs: [
            'flag attribute in capability',
            'indicating that MAC address randomization is supported.',
        ] }],
        ['typeCapa', data, { orig: 'NL80211_PMSR_ATTR_TYPE_CAPA', docs: [
            'capabilities reported by the device,',
            'this contains a nesting indexed by measurement type, and',
            'type-specific capabilities inside, which are from the enums',
            'named nl80211_peer_measurement_<type>_capa.',
        ] }],
        ['peers', 'PeerMeasurementPeerAttrs', { orig: 'NL80211_PMSR_ATTR_PEERS', docs: [
            'nested attribute, the nesting index is',
            'meaningless, just a list of peers to measure with, with the',
            'sub-attributes taken from',
            '&enum nl80211_peer_measurement_peer_attrs.',
        ] }],
    ]},

    PeerMeasurementFtmCapabilities: { orig: 'nl80211_peer_measurement_ftm_capa', docs: [
        'FTM capabilities',
    ], attrs: [
        ['asap', flag, { orig: 'NL80211_PMSR_FTM_CAPA_ATTR_ASAP', docs: [
            'flag attribute indicating ASAP mode',
            'is supported',
        ] }],
        ['nonAsap', flag, { orig: 'NL80211_PMSR_FTM_CAPA_ATTR_NON_ASAP', docs: [
            'flag attribute indicating non-ASAP',
            'mode is supported',
        ] }],
        ['reqLci', flag, { orig: 'NL80211_PMSR_FTM_CAPA_ATTR_REQ_LCI', docs: [
            'flag attribute indicating if LCI',
            'data can be requested during the measurement',
        ] }],
        ['reqCivicloc', flag, { orig: 'NL80211_PMSR_FTM_CAPA_ATTR_REQ_CIVICLOC', docs: [
            'flag attribute indicating if civic',
            'location data can be requested during the measurement',
        ] }],
        ['preambles', u32, { type: asflags('Preamble'), orig: 'NL80211_PMSR_FTM_CAPA_ATTR_PREAMBLES', docs: [
            'u32 bitmap attribute of bits',
            'from &enum nl80211_preamble.',
        ] }],
        ['bandwidths', data, { type: asflags('ChannelWidth'), orig: 'NL80211_PMSR_FTM_CAPA_ATTR_BANDWIDTHS', docs: [
            'bitmap of values from',
            '&enum nl80211_chan_width indicating the supported channel',
            'bandwidths for FTM. Note that a higher channel bandwidth may be',
            'configured to allow for other measurements types with different',
            'bandwidth requirement in the same measurement.',
        ] }],
        ['maxBurstsExponent', u32, { orig: 'NL80211_PMSR_FTM_CAPA_ATTR_MAX_BURSTS_EXPONENT', docs: [
            'u32 attribute indicating',
            'the maximum bursts exponent that can be used (if not present anything',
            'is valid)',
        ] }],
        ['maxFtmsPerBurst', u32, { orig: 'NL80211_PMSR_FTM_CAPA_ATTR_MAX_FTMS_PER_BURST', docs: [
            'u32 attribute indicating',
            'the maximum FTMs per burst (if not present anything is valid)',
        ] }],
    ]},

    PeerMeasurementFtmRequest: { orig: 'nl80211_peer_measurement_ftm_req', docs: [
        'FTM request attributes',
    ], attrs: [
        ['asap', flag, { orig: 'NL80211_PMSR_FTM_REQ_ATTR_ASAP', docs: [
            'ASAP mode requested (flag)',
        ] }],
        ['preamble', u32, { type: 'Preamble', orig: 'NL80211_PMSR_FTM_REQ_ATTR_PREAMBLE', docs: [
            'preamble type (see',
            '&enum nl80211_preamble), optional for DMG (u32)',
        ] }],
        ['numBurstsExp', u8, { orig: 'NL80211_PMSR_FTM_REQ_ATTR_NUM_BURSTS_EXP', docs: [
            'number of bursts exponent as in',
            '802.11-2016 9.4.2.168 "Fine Timing Measurement Parameters element"',
            '(u8, 0-15, optional with default 15 i.e. "no preference")',
        ] }],
        ['burstPeriod', u16, { orig: 'NL80211_PMSR_FTM_REQ_ATTR_BURST_PERIOD', docs: [
            'interval between bursts in units',
            'of 100ms (u16, optional with default 0)',
        ] }],
        ['burstDuration', u8, { orig: 'NL80211_PMSR_FTM_REQ_ATTR_BURST_DURATION', docs: [
            'burst duration, as in 802.11-2016',
            'Table 9-257 "Burst Duration field encoding" (u8, 0-15, optional with',
            'default 15 i.e. "no preference")',
        ] }],
        ['ftmsPerBurst', u8, { orig: 'NL80211_PMSR_FTM_REQ_ATTR_FTMS_PER_BURST', docs: [
            'number of successful FTM frames',
            'requested per burst',
            '(u8, 0-31, optional with default 0 i.e. "no preference")',
        ] }],
        ['numFtmrRetries', u8, { orig: 'NL80211_PMSR_FTM_REQ_ATTR_NUM_FTMR_RETRIES', docs: [
            'number of FTMR frame retries',
            '(u8, default 3)',
        ] }],
        ['requestLci', flag, { orig: 'NL80211_PMSR_FTM_REQ_ATTR_REQUEST_LCI', docs: [
            'request LCI data (flag)',
        ] }],
        ['requestCivicloc', flag, { orig: 'NL80211_PMSR_FTM_REQ_ATTR_REQUEST_CIVICLOC', docs: [
            'request civic location data',
            '(flag)',
        ] }],
    ]},

    PeerMeasurementFtmFailureReasons: { kind: 'enum', orig: 'nl80211_peer_measurement_ftm_failure_reasons', docs: [
        'FTM failure reasons',
    ], values: [
        { value: 0, name: 'UNSPECIFIED', orig: 'NL80211_PMSR_FTM_FAILURE_UNSPECIFIED', docs: [
            'unspecified failure, not used',
        ] },
        { value: 1, name: 'NO_RESPONSE', orig: 'NL80211_PMSR_FTM_FAILURE_NO_RESPONSE', docs: [
            'no response from the FTM responder',
        ] },
        { value: 2, name: 'REJECTED', orig: 'NL80211_PMSR_FTM_FAILURE_REJECTED', docs: [
            'FTM responder rejected measurement',
        ] },
        { value: 3, name: 'WRONG_CHANNEL', orig: 'NL80211_PMSR_FTM_FAILURE_WRONG_CHANNEL', docs: [
            'we already know the peer is',
            "on a different channel, so can't measure (if we didn't know, we'd",
            'try and get no response)',
        ] },
        { value: 4, name: 'PEER_NOT_CAPABLE', orig: 'NL80211_PMSR_FTM_FAILURE_PEER_NOT_CAPABLE', docs: [
            "peer can't actually do FTM",
        ] },
        { value: 5, name: 'INVALID_TIMESTAMP', orig: 'NL80211_PMSR_FTM_FAILURE_INVALID_TIMESTAMP', docs: [
            'invalid T1/T4 timestamps',
            'received',
        ] },
        { value: 6, name: 'PEER_BUSY', orig: 'NL80211_PMSR_FTM_FAILURE_PEER_BUSY', docs: [
            'peer reports busy, you may retry',
            'later (see %NL80211_PMSR_FTM_RESP_ATTR_BUSY_RETRY_TIME)',
        ] },
        { value: 7, name: 'BAD_CHANGED_PARAMS', orig: 'NL80211_PMSR_FTM_FAILURE_BAD_CHANGED_PARAMS', docs: [
            'parameters were changed',
            'by the peer and are no longer supported',
        ] },
    ]},

    PeerMeasurementFtmResponse: { orig: 'nl80211_peer_measurement_ftm_resp', docs: [
        'FTM response attributes',
    ], attrs: [
        ['failReason', u32, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_FAIL_REASON', docs: [
            'FTM-specific failure reason',
            '(u32, optional)',
        ] }],
        ['burstIndex', u32, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_BURST_INDEX', docs: [
            'optional, if bursts are reported',
            'as separate results then it will be the burst index 0...(N-1) and',
            'the top level will indicate partial results (u32)',
        ] }],
        ['numFtmrAttempts', u32, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_NUM_FTMR_ATTEMPTS', docs: [
            'number of FTM Request frames',
            'transmitted (u32, optional)',
        ] }],
        ['numFtmrSuccesses', u32, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_NUM_FTMR_SUCCESSES', docs: [
            'number of FTM Request frames',
            'that were acknowleged (u32, optional)',
        ] }],
        ['busyRetryTime', u32, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_BUSY_RETRY_TIME', docs: [
            'retry time received from the',
            'busy peer (u32, seconds)',
        ] }],
        ['numBurstsExp', u8, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_NUM_BURSTS_EXP', docs: [
            'actual number of bursts exponent',
            'used by the responder (similar to request, u8)',
        ] }],
        ['burstDuration', u8, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_BURST_DURATION', docs: [
            'actual burst duration used by',
            'the responder (similar to request, u8)',
        ] }],
        ['ftmsPerBurst', u8, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_FTMS_PER_BURST', docs: [
            'actual FTMs per burst used',
            'by the responder (similar to request, u8)',
        ] }],
        ['rssiAvg', s32, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_RSSI_AVG', docs: [
            'average RSSI across all FTM action',
            'frames (optional, s32, 1/2 dBm)',
        ] }],
        ['rssiSpread', s32, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_RSSI_SPREAD', docs: [
            'RSSI spread across all FTM action',
            'frames (optional, s32, 1/2 dBm)',
        ] }],
        ['txRate', 'RateInfo', { orig: 'NL80211_PMSR_FTM_RESP_ATTR_TX_RATE', docs: [
            'bitrate we used for the response to the',
            'FTM action frame (optional, nested, using &enum nl80211_rate_info',
            'attributes)',
        ] }],
        ['rxRate', 'RateInfo', { orig: 'NL80211_PMSR_FTM_RESP_ATTR_RX_RATE', docs: [
            'bitrate the responder used for the FTM',
            'action frame (optional, nested, using &enum nl80211_rate_info attrs)',
        ] }],
        ['rttAvg', s64, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_RTT_AVG', docs: [
            'average RTT (s64, picoseconds, optional',
            'but one of RTT/DIST must be present)',
        ] }],
        ['rttVariance', u64, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_RTT_VARIANCE', docs: [
            'RTT variance (u64, ps^2, note that',
            'standard deviation is the square root of variance, optional)',
        ] }],
        ['rttSpread', u64, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_RTT_SPREAD', docs: [
            'RTT spread (u64, picoseconds,',
            'optional)',
        ] }],
        ['distAvg', s64, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_DIST_AVG', docs: [
            'average distance (s64, mm, optional',
            'but one of RTT/DIST must be present)',
        ] }],
        ['distVariance', u64, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_DIST_VARIANCE', docs: [
            'distance variance (u64, mm^2, note',
            'that standard deviation is the square root of variance, optional)',
        ] }],
        ['distSpread', u64, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_DIST_SPREAD', docs: [
            'distance spread (u64, mm, optional)',
        ] }],
        ['lci', data, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_LCI', docs: [
            'LCI data from peer (binary, optional);',
            'this is the contents of the Measurement Report Element (802.11-2016',
            '9.4.2.22.1) starting with the Measurement Token, with Measurement',
            'Type 8.',
        ] }],
        ['civicloc', data, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_CIVICLOC', docs: [
            'civic location data from peer',
            '(binary, optional);',
            'this is the contents of the Measurement Report Element (802.11-2016',
            '9.4.2.22.1) starting with the Measurement Token, with Measurement',
            'Type 11.',
        ] }],
        ['pad', data, { orig: 'NL80211_PMSR_FTM_RESP_ATTR_PAD', docs: [
            'ignore, for u64/s64 padding only',
        ] }],
    ]},

    ObssPd: { orig: 'nl80211_obss_pd_attributes', docs: [
        'OBSS packet detection attributes',
    ], attrs: [
        ['inOffset', data, { orig: 'NL80211_HE_OBSS_PD_ATTR_MIN_OFFSET', docs: [
            'the OBSS PD minimum tx power offset.',
        ] }],
        ['axOffset', data, { orig: 'NL80211_HE_OBSS_PD_ATTR_MAX_OFFSET', docs: [
            'the OBSS PD maximum tx power offset.',
        ] }],
    ]},
}

types
