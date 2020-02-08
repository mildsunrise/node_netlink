import { BaseObject, StreamData } from '../structs'
import * as structs from '../structs'

/** supported nl80211 commands */
export enum Commands {
    /**
     * request information about a wiphy or dump request
     * to get a list of all present wiphys.
     */
    GET_WIPHY = 1,
    
    /**
     * set wiphy parameters, needs %NL80211_ATTR_WIPHY or
     * %NL80211_ATTR_IFINDEX; can be used to set %NL80211_ATTR_WIPHY_NAME,
     * %NL80211_ATTR_WIPHY_TXQ_PARAMS, %NL80211_ATTR_WIPHY_FREQ (and the
     * attributes determining the channel width; this is used for setting
     * monitor mode channel),  %NL80211_ATTR_WIPHY_RETRY_SHORT,
     * %NL80211_ATTR_WIPHY_RETRY_LONG, %NL80211_ATTR_WIPHY_FRAG_THRESHOLD,
     * and/or %NL80211_ATTR_WIPHY_RTS_THRESHOLD.
     * However, for setting the channel, see %NL80211_CMD_SET_CHANNEL
     * instead, the support here is for backward compatibility only.
     */
    SET_WIPHY = 2,
    
    /**
     * Newly created wiphy, response to get request
     * or rename notification. Has attributes %NL80211_ATTR_WIPHY and
     * %NL80211_ATTR_WIPHY_NAME.
     */
    NEW_WIPHY = 3,
    
    /**
     * Wiphy deleted. Has attributes
     * %NL80211_ATTR_WIPHY and %NL80211_ATTR_WIPHY_NAME.
     */
    DEL_WIPHY = 4,
    
    /**
     * Request an interface's configuration;
     * either a dump request for all interfaces or a specific get with a
     * single %NL80211_ATTR_IFINDEX is supported.
     */
    GET_INTERFACE = 5,
    
    /**
     * Set type of a virtual interface, requires
     * %NL80211_ATTR_IFINDEX and %NL80211_ATTR_IFTYPE.
     */
    SET_INTERFACE = 6,
    
    /**
     * Newly created virtual interface or response
     * to %NL80211_CMD_GET_INTERFACE. Has %NL80211_ATTR_IFINDEX,
     * %NL80211_ATTR_WIPHY and %NL80211_ATTR_IFTYPE attributes. Can also
     * be sent from userspace to request creation of a new virtual interface,
     * then requires attributes %NL80211_ATTR_WIPHY, %NL80211_ATTR_IFTYPE and
     * %NL80211_ATTR_IFNAME.
     */
    NEW_INTERFACE = 7,
    
    /**
     * Virtual interface was deleted, has attributes
     * %NL80211_ATTR_IFINDEX and %NL80211_ATTR_WIPHY. Can also be sent from
     * userspace to request deletion of a virtual interface, then requires
     * attribute %NL80211_ATTR_IFINDEX.
     */
    DEL_INTERFACE = 8,
    
    /**
     * Get sequence counter information for a key specified
     * by %NL80211_ATTR_KEY_IDX and/or %NL80211_ATTR_MAC.
     */
    GET_KEY = 9,
    
    /**
     * Set key attributes %NL80211_ATTR_KEY_DEFAULT,
     * %NL80211_ATTR_KEY_DEFAULT_MGMT, or %NL80211_ATTR_KEY_THRESHOLD.
     */
    SET_KEY = 10,
    
    /**
     * add a key with given %NL80211_ATTR_KEY_DATA,
     * %NL80211_ATTR_KEY_IDX, %NL80211_ATTR_MAC, %NL80211_ATTR_KEY_CIPHER,
     * and %NL80211_ATTR_KEY_SEQ attributes.
     */
    NEW_KEY = 11,
    
    /**
     * delete a key identified by %NL80211_ATTR_KEY_IDX
     * or %NL80211_ATTR_MAC.
     */
    DEL_KEY = 12,
    
    /** (not used) */
    GET_BEACON = 13,
    
    /**
     * change the beacon on an access point interface
     * using the %NL80211_ATTR_BEACON_HEAD and %NL80211_ATTR_BEACON_TAIL
     * attributes. For drivers that generate the beacon and probe responses
     * internally, the following attributes must be provided: %NL80211_ATTR_IE,
     * %NL80211_ATTR_IE_PROBE_RESP and %NL80211_ATTR_IE_ASSOC_RESP.
     */
    SET_BEACON = 14,
    
    /**
     * Start AP operation on an AP interface, parameters
     * are like for %NL80211_CMD_SET_BEACON, and additionally parameters that
     * do not change are used, these include %NL80211_ATTR_BEACON_INTERVAL,
     * %NL80211_ATTR_DTIM_PERIOD, %NL80211_ATTR_SSID,
     * %NL80211_ATTR_HIDDEN_SSID, %NL80211_ATTR_CIPHERS_PAIRWISE,
     * %NL80211_ATTR_CIPHER_GROUP, %NL80211_ATTR_WPA_VERSIONS,
     * %NL80211_ATTR_AKM_SUITES, %NL80211_ATTR_PRIVACY,
     * %NL80211_ATTR_AUTH_TYPE, %NL80211_ATTR_INACTIVITY_TIMEOUT,
     * %NL80211_ATTR_ACL_POLICY and %NL80211_ATTR_MAC_ADDRS.
     * The channel to use can be set on the interface or be given using the
     * %NL80211_ATTR_WIPHY_FREQ and the attributes determining channel width.
     */
    START_AP = 15,
    
    /** Stop AP operation on the given interface */
    STOP_AP = 16,
    
    /**
     * Get station attributes for station identified by
     * %NL80211_ATTR_MAC on the interface identified by %NL80211_ATTR_IFINDEX.
     */
    GET_STATION = 17,
    
    /**
     * Set station attributes for station identified by
     * %NL80211_ATTR_MAC on the interface identified by %NL80211_ATTR_IFINDEX.
     */
    SET_STATION = 18,
    
    /**
     * Add a station with given attributes to the
     * the interface identified by %NL80211_ATTR_IFINDEX.
     */
    NEW_STATION = 19,
    
    /**
     * Remove a station identified by %NL80211_ATTR_MAC
     * or, if no MAC address given, all stations, on the interface identified
     * by %NL80211_ATTR_IFINDEX. %NL80211_ATTR_MGMT_SUBTYPE and
     * %NL80211_ATTR_REASON_CODE can optionally be used to specify which type
     * of disconnection indication should be sent to the station
     * (Deauthentication or Disassociation frame and reason code for that
     * frame).
     */
    DEL_STATION = 20,
    
    /**
     * Get mesh path attributes for mesh path to
     * destination %NL80211_ATTR_MAC on the interface identified by
     * %NL80211_ATTR_IFINDEX.
     */
    GET_MPATH = 21,
    
    /**
     * Set mesh path attributes for mesh path to
     * destination %NL80211_ATTR_MAC on the interface identified by
     * %NL80211_ATTR_IFINDEX.
     */
    SET_MPATH = 22,
    
    /**
     * Create a new mesh path for the destination given by
     * %NL80211_ATTR_MAC via %NL80211_ATTR_MPATH_NEXT_HOP.
     */
    NEW_MPATH = 23,
    
    /**
     * Delete a mesh path to the destination given by
     * %NL80211_ATTR_MAC.
     */
    DEL_MPATH = 24,
    
    /**
     * Set BSS attributes for BSS identified by
     * %NL80211_ATTR_IFINDEX.
     */
    SET_BSS = 25,
    
    /**
     * Set current regulatory domain. CRDA sends this command
     * after being queried by the kernel. CRDA replies by sending a regulatory
     * domain structure which consists of %NL80211_ATTR_REG_ALPHA set to our
     * current alpha2 if it found a match. It also provides
     * NL80211_ATTR_REG_RULE_FLAGS, and a set of regulatory rules. Each
     * regulatory rule is a nested set of attributes  given by
     * %NL80211_ATTR_REG_RULE_FREQ_[START|END] and
     * %NL80211_ATTR_FREQ_RANGE_MAX_BW with an attached power rule given by
     * %NL80211_ATTR_REG_RULE_POWER_MAX_ANT_GAIN and
     * %NL80211_ATTR_REG_RULE_POWER_MAX_EIRP.
     */
    SET_REG = 26,
    
    /**
     * ask the wireless core to set the regulatory domain
     * to the specified ISO/IEC 3166-1 alpha2 country code. The core will
     * store this as a valid request and then query userspace for it.
     */
    REQ_SET_REG = 27,
    
    /**
     * Get mesh networking properties for the
     * interface identified by %NL80211_ATTR_IFINDEX
     */
    GET_MESH_CONFIG = 28,
    
    /**
     * Set mesh networking properties for the
     * interface identified by %NL80211_ATTR_IFINDEX
     */
    SET_MESH_CONFIG = 29,
    
    /**
     * Set extra IEs for management frames. The
     * interface is identified with %NL80211_ATTR_IFINDEX and the management
     * frame subtype with %NL80211_ATTR_MGMT_SUBTYPE. The extra IE data to be
     * added to the end of the specified management frame is specified with
     * %NL80211_ATTR_IE. If the command succeeds, the requested data will be
     * added to all specified management frames generated by
     * kernel/firmware/driver.
     * Note: This command has been removed and it is only reserved at this
     * point to avoid re-using existing command number. The functionality this
     * command was planned for has been provided with cleaner design with the
     * option to specify additional IEs in NL80211_CMD_TRIGGER_SCAN,
     * NL80211_CMD_AUTHENTICATE, NL80211_CMD_ASSOCIATE,
     * NL80211_CMD_DEAUTHENTICATE, and NL80211_CMD_DISASSOCIATE.
     */
    SET_MGMT_EXTRA_IE = 30,
    
    /**
     * ask the wireless core to send us its currently set
     * regulatory domain. If %NL80211_ATTR_WIPHY is specified and the device
     * has a private regulatory domain, it will be returned. Otherwise, the
     * global regdomain will be returned.
     * A device will have a private regulatory domain if it uses the
     * regulatory_hint() API. Even when a private regdomain is used the channel
     * information will still be mended according to further hints from
     * the regulatory core to help with compliance. A dump version of this API
     * is now available which will returns the global regdomain as well as
     * all private regdomains of present wiphys (for those that have it).
     * If a wiphy is self-managed (%NL80211_ATTR_WIPHY_SELF_MANAGED_REG), then
     * its private regdomain is the only valid one for it. The regulatory
     * core is not used to help with compliance in this case.
     */
    GET_REG = 31,
    
    /** get scan results */
    GET_SCAN = 32,
    
    /**
     * trigger a new scan with the given parameters
     * %NL80211_ATTR_TX_NO_CCK_RATE is used to decide whether to send the
     * probe requests at CCK rate or not. %NL80211_ATTR_BSSID can be used to
     * specify a BSSID to scan for; if not included, the wildcard BSSID will
     * be used.
     */
    TRIGGER_SCAN = 33,
    
    /**
     * scan notification (as a reply to
     * NL80211_CMD_GET_SCAN and on the "scan" multicast group)
     */
    NEW_SCAN_RESULTS = 34,
    
    /**
     * scan was aborted, for unspecified reasons,
     * partial scan results may be available
     */
    SCAN_ABORTED = 35,
    
    /**
     * indicates to userspace the regulatory domain
     * has been changed and provides details of the request information
     * that caused the change such as who initiated the regulatory request
     * (%NL80211_ATTR_REG_INITIATOR), the wiphy_idx
     * (%NL80211_ATTR_REG_ALPHA2) on which the request was made from if
     * the initiator was %NL80211_REGDOM_SET_BY_COUNTRY_IE or
     * %NL80211_REGDOM_SET_BY_DRIVER, the type of regulatory domain
     * set (%NL80211_ATTR_REG_TYPE), if the type of regulatory domain is
     * %NL80211_REG_TYPE_COUNTRY the alpha2 to which we have moved on
     * to (%NL80211_ATTR_REG_ALPHA2).
     */
    REG_CHANGE = 36,
    
    /**
     * authentication request and notification.
     * This command is used both as a command (request to authenticate) and
     * as an event on the "mlme" multicast group indicating completion of the
     * authentication process.
     * When used as a command, %NL80211_ATTR_IFINDEX is used to identify the
     * interface. %NL80211_ATTR_MAC is used to specify PeerSTAAddress (and
     * BSSID in case of station mode). %NL80211_ATTR_SSID is used to specify
     * the SSID (mainly for association, but is included in authentication
     * request, too, to help BSS selection. %NL80211_ATTR_WIPHY_FREQ is used
     * to specify the frequence of the channel in MHz. %NL80211_ATTR_AUTH_TYPE
     * is used to specify the authentication type. %NL80211_ATTR_IE is used to
     * define IEs (VendorSpecificInfo, but also including RSN IE and FT IEs)
     * to be added to the frame.
     * When used as an event, this reports reception of an Authentication
     * frame in station and IBSS modes when the local MLME processed the
     * frame, i.e., it was for the local STA and was received in correct
     * state. This is similar to MLME-AUTHENTICATE.confirm primitive in the
     * MLME SAP interface (kernel providing MLME, userspace SME). The
     * included %NL80211_ATTR_FRAME attribute contains the management frame
     * (including both the header and frame body, but not FCS). This event is
     * also used to indicate if the authentication attempt timed out. In that
     * case the %NL80211_ATTR_FRAME attribute is replaced with a
     * %NL80211_ATTR_TIMED_OUT flag (and %NL80211_ATTR_MAC to indicate which
     * pending authentication timed out).
     */
    AUTHENTICATE = 37,
    
    /**
     * association request and notification; like
     * NL80211_CMD_AUTHENTICATE but for Association and Reassociation
     * (similar to MLME-ASSOCIATE.request, MLME-REASSOCIATE.request,
     * MLME-ASSOCIATE.confirm or MLME-REASSOCIATE.confirm primitives). The
     * %NL80211_ATTR_PREV_BSSID attribute is used to specify whether the
     * request is for the initial association to an ESS (that attribute not
     * included) or for reassociation within the ESS (that attribute is
     * included).
     */
    ASSOCIATE = 38,
    
    /**
     * deauthentication request and notification; like
     * NL80211_CMD_AUTHENTICATE but for Deauthentication frames (similar to
     * MLME-DEAUTHENTICATION.request and MLME-DEAUTHENTICATE.indication
     * primitives).
     */
    DEAUTHENTICATE = 39,
    
    /**
     * disassociation request and notification; like
     * NL80211_CMD_AUTHENTICATE but for Disassociation frames (similar to
     * MLME-DISASSOCIATE.request and MLME-DISASSOCIATE.indication primitives).
     */
    DISASSOCIATE = 40,
    
    /**
     * notification of a locally detected Michael
     * MIC (part of TKIP) failure; sent on the "mlme" multicast group; the
     * event includes %NL80211_ATTR_MAC to describe the source MAC address of
     * the frame with invalid MIC, %NL80211_ATTR_KEY_TYPE to show the key
     * type, %NL80211_ATTR_KEY_IDX to indicate the key identifier, and
     * %NL80211_ATTR_KEY_SEQ to indicate the TSC value of the frame; this
     * event matches with MLME-MICHAELMICFAILURE.indication() primitive
     */
    MICHAEL_MIC_FAILURE = 41,
    
    /**
     * indicates to userspace that an AP beacon
     * has been found while world roaming thus enabling active scan or
     * any mode of operation that initiates TX (beacons) on a channel
     * where we would not have been able to do either before. As an example
     * if you are world roaming (regulatory domain set to world or if your
     * driver is using a custom world roaming regulatory domain) and while
     * doing a passive scan on the 5 GHz band you find an AP there (if not
     * on a DFS channel) you will now be able to actively scan for that AP
     * or use AP mode on your card on that same channel. Note that this will
     * never be used for channels 1-11 on the 2 GHz band as they are always
     * enabled world wide. This beacon hint is only sent if your device had
     * either disabled active scanning or beaconing on a channel. We send to
     * userspace the wiphy on which we removed a restriction from
     * (%NL80211_ATTR_WIPHY) and the channel on which this occurred
     * before (%NL80211_ATTR_FREQ_BEFORE) and after (%NL80211_ATTR_FREQ_AFTER)
     * the beacon hint was processed.
     */
    REG_BEACON_HINT = 42,
    
    /**
     * Join a new IBSS -- given at least an SSID and a
     * FREQ attribute (for the initial frequency if no peer can be found)
     * and optionally a MAC (as BSSID) and FREQ_FIXED attribute if those
     * should be fixed rather than automatically determined. Can only be
     * executed on a network interface that is UP, and fixed BSSID/FREQ
     * may be rejected. Another optional parameter is the beacon interval,
     * given in the %NL80211_ATTR_BEACON_INTERVAL attribute, which if not
     * given defaults to 100 TU (102.4ms).
     */
    JOIN_IBSS = 43,
    
    /**
     * Leave the IBSS -- no special arguments, the IBSS is
     * determined by the network interface.
     */
    LEAVE_IBSS = 44,
    
    /**
     * testmode command, takes a wiphy (or ifindex) attribute
     * to identify the device, and the TESTDATA blob attribute to pass through
     * to the driver.
     */
    TESTMODE = 45,
    
    /**
     * connection request and notification; this command
     * requests to connect to a specified network but without separating
     * auth and assoc steps. For this, you need to specify the SSID in a
     * %NL80211_ATTR_SSID attribute, and can optionally specify the association
     * IEs in %NL80211_ATTR_IE, %NL80211_ATTR_AUTH_TYPE, %NL80211_ATTR_USE_MFP,
     * %NL80211_ATTR_MAC, %NL80211_ATTR_WIPHY_FREQ, %NL80211_ATTR_CONTROL_PORT,
     * %NL80211_ATTR_CONTROL_PORT_ETHERTYPE,
     * %NL80211_ATTR_CONTROL_PORT_NO_ENCRYPT,
     * %NL80211_ATTR_CONTROL_PORT_OVER_NL80211, %NL80211_ATTR_MAC_HINT, and
     * %NL80211_ATTR_WIPHY_FREQ_HINT.
     * If included, %NL80211_ATTR_MAC and %NL80211_ATTR_WIPHY_FREQ are
     * restrictions on BSS selection, i.e., they effectively prevent roaming
     * within the ESS. %NL80211_ATTR_MAC_HINT and %NL80211_ATTR_WIPHY_FREQ_HINT
     * can be included to provide a recommendation of the initial BSS while
     * allowing the driver to roam to other BSSes within the ESS and also to
     * ignore this recommendation if the indicated BSS is not ideal. Only one
     * set of BSSID,frequency parameters is used (i.e., either the enforcing
     * %NL80211_ATTR_MAC,%NL80211_ATTR_WIPHY_FREQ or the less strict
     * %NL80211_ATTR_MAC_HINT and %NL80211_ATTR_WIPHY_FREQ_HINT).
     * Driver shall not modify the IEs specified through %NL80211_ATTR_IE if
     * %NL80211_ATTR_MAC is included. However, if %NL80211_ATTR_MAC_HINT is
     * included, these IEs through %NL80211_ATTR_IE are specified by the user
     * space based on the best possible BSS selected. Thus, if the driver ends
     * up selecting a different BSS, it can modify these IEs accordingly (e.g.
     * userspace asks the driver to perform PMKSA caching with BSS1 and the
     * driver ends up selecting BSS2 with different PMKSA cache entry; RSNIE
     * has to get updated with the apt PMKID).
     * %NL80211_ATTR_PREV_BSSID can be used to request a reassociation within
     * the ESS in case the device is already associated and an association with
     * a different BSS is desired.
     * Background scan period can optionally be
     * specified in %NL80211_ATTR_BG_SCAN_PERIOD,
     * if not specified default background scan configuration
     * in driver is used and if period value is 0, bg scan will be disabled.
     * This attribute is ignored if driver does not support roam scan.
     * It is also sent as an event, with the BSSID and response IEs when the
     * connection is established or failed to be established. This can be
     * determined by the %NL80211_ATTR_STATUS_CODE attribute (0 = success,
     * non-zero = failure). If %NL80211_ATTR_TIMED_OUT is included in the
     * event, the connection attempt failed due to not being able to initiate
     * authentication/association or not receiving a response from the AP.
     * Non-zero %NL80211_ATTR_STATUS_CODE value is indicated in that case as
     * well to remain backwards compatible.
     * When establishing a security association, drivers that support 4 way
     * handshake offload should send %NL80211_CMD_PORT_AUTHORIZED event when
     * the 4 way handshake is completed successfully.
     */
    CONNECT = 46,
    
    /**
     * Notification indicating the card/driver roamed by itself.
     * When a security association was established with the new AP (e.g. if
     * the FT protocol was used for roaming or the driver completed the 4 way
     * handshake), this event should be followed by an
     * %NL80211_CMD_PORT_AUTHORIZED event.
     */
    ROAM = 47,
    
    /**
     * drop a given connection; also used to notify
     * userspace that a connection was dropped by the AP or due to other
     * reasons, for this the %NL80211_ATTR_DISCONNECTED_BY_AP and
     * %NL80211_ATTR_REASON_CODE attributes are used.
     */
    DISCONNECT = 48,
    
    /**
     * Set a wiphy's netns. Note that all devices
     * associated with this wiphy must be down and will follow.
     */
    SET_WIPHY_NETNS = 49,
    
    /**
     * get survey resuls, e.g. channel occupation
     * or noise level
     */
    GET_SURVEY = 50,
    
    /**
     * survey data notification (as a reply to
     * NL80211_CMD_GET_SURVEY and on the "scan" multicast group)
     */
    NEW_SURVEY_RESULTS = 51,
    
    /**
     * Add a PMKSA cache entry using %NL80211_ATTR_MAC
     * (for the BSSID), %NL80211_ATTR_PMKID, and optionally %NL80211_ATTR_PMK
     * (PMK is used for PTKSA derivation in case of FILS shared key offload) or
     * using %NL80211_ATTR_SSID, %NL80211_ATTR_FILS_CACHE_ID,
     * %NL80211_ATTR_PMKID, and %NL80211_ATTR_PMK in case of FILS
     * authentication where %NL80211_ATTR_FILS_CACHE_ID is the identifier
     * advertized by a FILS capable AP identifying the scope of PMKSA in an
     * ESS.
     */
    SET_PMKSA = 52,
    
    /**
     * Delete a PMKSA cache entry, using %NL80211_ATTR_MAC
     * (for the BSSID) and %NL80211_ATTR_PMKID or using %NL80211_ATTR_SSID,
     * %NL80211_ATTR_FILS_CACHE_ID, and %NL80211_ATTR_PMKID in case of FILS
     * authentication.
     */
    DEL_PMKSA = 53,
    
    /** Flush all PMKSA cache entries. */
    FLUSH_PMKSA = 54,
    
    /**
     * Request to remain awake on the specified
     * channel for the specified amount of time. This can be used to do
     * off-channel operations like transmit a Public Action frame and wait for
     * a response while being associated to an AP on another channel.
     * %NL80211_ATTR_IFINDEX is used to specify which interface (and thus
     * radio) is used. %NL80211_ATTR_WIPHY_FREQ is used to specify the
     * frequency for the operation.
     * %NL80211_ATTR_DURATION is used to specify the duration in milliseconds
     * to remain on the channel. This command is also used as an event to
     * notify when the requested duration starts (it may take a while for the
     * driver to schedule this time due to other concurrent needs for the
     * radio).
     * When called, this operation returns a cookie (%NL80211_ATTR_COOKIE)
     * that will be included with any events pertaining to this request;
     * the cookie is also used to cancel the request.
     */
    REMAIN_ON_CHANNEL = 55,
    
    /**
     * This command can be used to cancel a
     * pending remain-on-channel duration if the desired operation has been
     * completed prior to expiration of the originally requested duration.
     * %NL80211_ATTR_WIPHY or %NL80211_ATTR_IFINDEX is used to specify the
     * radio. The %NL80211_ATTR_COOKIE attribute must be given as well to
     * uniquely identify the request.
     * This command is also used as an event to notify when a requested
     * remain-on-channel duration has expired.
     */
    CANCEL_REMAIN_ON_CHANNEL = 56,
    
    /**
     * Set the mask of rates to be used in TX
     * rate selection. %NL80211_ATTR_IFINDEX is used to specify the interface
     * and @NL80211_ATTR_TX_RATES the set of allowed rates.
     */
    SET_TX_BITRATE_MASK = 57,
    
    /**
     * Register for receiving certain mgmt frames
     * (via @NL80211_CMD_FRAME) for processing in userspace. This command
     * requires an interface index, a frame type attribute (optional for
     * backward compatibility reasons, if not given assumes action frames)
     * and a match attribute containing the first few bytes of the frame
     * that should match, e.g. a single byte for only a category match or
     * four bytes for vendor frames including the OUI. The registration
     * cannot be dropped, but is removed automatically when the netlink
     * socket is closed. Multiple registrations can be made.
     */
    REGISTER_FRAME = 58,
    
    /**
     * Management frame TX request and RX notification. This
     * command is used both as a request to transmit a management frame and
     * as an event indicating reception of a frame that was not processed in
     * kernel code, but is for us (i.e., which may need to be processed in a
     * user space application). %NL80211_ATTR_FRAME is used to specify the
     * frame contents (including header). %NL80211_ATTR_WIPHY_FREQ is used
     * to indicate on which channel the frame is to be transmitted or was
     * received. If this channel is not the current channel (remain-on-channel
     * or the operational channel) the device will switch to the given channel
     * and transmit the frame, optionally waiting for a response for the time
     * specified using %NL80211_ATTR_DURATION. When called, this operation
     * returns a cookie (%NL80211_ATTR_COOKIE) that will be included with the
     * TX status event pertaining to the TX request.
     * %NL80211_ATTR_TX_NO_CCK_RATE is used to decide whether to send the
     * management frames at CCK rate or not in 2GHz band.
     * %NL80211_ATTR_CSA_C_OFFSETS_TX is an array of offsets to CSA
     * counters which will be updated to the current value. This attribute
     * is used during CSA period.
     */
    FRAME = 59,
    
    /**
     * Report TX status of a management frame
     * transmitted with %NL80211_CMD_FRAME. %NL80211_ATTR_COOKIE identifies
     * the TX command and %NL80211_ATTR_FRAME includes the contents of the
     * frame. %NL80211_ATTR_ACK flag is included if the recipient acknowledged
     * the frame.
     */
    FRAME_TX_STATUS = 60,
    
    /** Set powersave, using %NL80211_ATTR_PS_STATE */
    SET_POWER_SAVE = 61,
    
    /** Get powersave status in %NL80211_ATTR_PS_STATE */
    GET_POWER_SAVE = 62,
    
    /**
     * Connection quality monitor configuration. This command
     * is used to configure connection quality monitoring notification trigger
     * levels.
     */
    SET_CQM = 63,
    
    /**
     * Connection quality monitor notification. This
     * command is used as an event to indicate the that a trigger level was
     * reached.
     */
    NOTIFY_CQM = 64,
    
    /**
     * Set the channel (using %NL80211_ATTR_WIPHY_FREQ
     * and the attributes determining channel width) the given interface
     * (identifed by %NL80211_ATTR_IFINDEX) shall operate on.
     * In case multiple channels are supported by the device, the mechanism
     * with which it switches channels is implementation-defined.
     * When a monitor interface is given, it can only switch channel while
     * no other interfaces are operating to avoid disturbing the operation
     * of any other interfaces, and other interfaces will again take
     * precedence when they are used.
     */
    SET_CHANNEL = 65,
    
    /** Set the MAC address of the peer on a WDS interface. */
    SET_WDS_PEER = 66,
    
    /**
     * When an off-channel TX was requested, this
     * command may be used with the corresponding cookie to cancel the wait
     * time if it is known that it is no longer necessary.  This command is
     * also sent as an event whenever the driver has completed the off-channel
     * wait time.
     */
    FRAME_WAIT_CANCEL = 67,
    
    /**
     * Join a mesh. The mesh ID must be given, and initial
     * mesh config parameters may be given.
     */
    JOIN_MESH = 68,
    
    /**
     * Leave the mesh network -- no special arguments, the
     * network is determined by the network interface.
     */
    LEAVE_MESH = 69,
    
    /**
     * Unprotected deauthentication frame
     * notification. This event is used to indicate that an unprotected
     * deauthentication frame was dropped when MFP is in use.
     */
    UNPROT_DEAUTHENTICATE = 70,
    
    /**
     * Unprotected disassociation frame
     * notification. This event is used to indicate that an unprotected
     * disassociation frame was dropped when MFP is in use.
     */
    UNPROT_DISASSOCIATE = 71,
    
    /**
     * Notification on the reception of a
     * beacon or probe response from a compatible mesh peer.  This is only
     * sent while no station information (sta_info) exists for the new peer
     * candidate and when @NL80211_MESH_SETUP_USERSPACE_AUTH,
     * @NL80211_MESH_SETUP_USERSPACE_AMPE, or
     * @NL80211_MESH_SETUP_USERSPACE_MPM is set.  On reception of this
     * notification, userspace may decide to create a new station
     * (@NL80211_CMD_NEW_STATION).  To stop this notification from
     * reoccurring, the userspace authentication daemon may want to create the
     * new station with the AUTHENTICATED flag unset and maybe change it later
     * depending on the authentication result.
     */
    NEW_PEER_CANDIDATE = 72,
    
    /** get Wake-on-Wireless-LAN (WoWLAN) settings. */
    GET_WOWLAN = 73,
    
    /**
     * set Wake-on-Wireless-LAN (WoWLAN) settings.
     * Since wireless is more complex than wired ethernet, it supports
     * various triggers. These triggers can be configured through this
     * command with the %NL80211_ATTR_WOWLAN_TRIGGERS attribute. For
     * more background information, see
     * http://wireless.kernel.org/en/users/Documentation/WoWLAN.
     * The @NL80211_CMD_SET_WOWLAN command can also be used as a notification
     * from the driver reporting the wakeup reason. In this case, the
     * @NL80211_ATTR_WOWLAN_TRIGGERS attribute will contain the reason
     * for the wakeup, if it was caused by wireless. If it is not present
     * in the wakeup notification, the wireless device didn't cause the
     * wakeup but reports that it was woken up.
     */
    SET_WOWLAN = 74,
    
    /**
     * start a scheduled scan at certain
     * intervals and certain number of cycles, as specified by
     * %NL80211_ATTR_SCHED_SCAN_PLANS. If %NL80211_ATTR_SCHED_SCAN_PLANS is
     * not specified and only %NL80211_ATTR_SCHED_SCAN_INTERVAL is specified,
     * scheduled scan will run in an infinite loop with the specified interval.
     * These attributes are mutually exculsive,
     * i.e. NL80211_ATTR_SCHED_SCAN_INTERVAL must not be passed if
     * NL80211_ATTR_SCHED_SCAN_PLANS is defined.
     * If for some reason scheduled scan is aborted by the driver, all scan
     * plans are canceled (including scan plans that did not start yet).
     * Like with normal scans, if SSIDs (%NL80211_ATTR_SCAN_SSIDS)
     * are passed, they are used in the probe requests.  For
     * broadcast, a broadcast SSID must be passed (ie. an empty
     * string).  If no SSID is passed, no probe requests are sent and
     * a passive scan is performed.  %NL80211_ATTR_SCAN_FREQUENCIES,
     * if passed, define which channels should be scanned; if not
     * passed, all channels allowed for the current regulatory domain
     * are used.  Extra IEs can also be passed from the userspace by
     * using the %NL80211_ATTR_IE attribute.  The first cycle of the
     * scheduled scan can be delayed by %NL80211_ATTR_SCHED_SCAN_DELAY
     * is supplied. If the device supports multiple concurrent scheduled
     * scans, it will allow such when the caller provides the flag attribute
     * %NL80211_ATTR_SCHED_SCAN_MULTI to indicate user-space support for it.
     */
    START_SCHED_SCAN = 75,
    
    /**
     * stop a scheduled scan. Returns -ENOENT if
     * scheduled scan is not running. The caller may assume that as soon
     * as the call returns, it is safe to start a new scheduled scan again.
     */
    STOP_SCHED_SCAN = 76,
    
    /**
     * indicates that there are scheduled scan
     * results available.
     */
    SCHED_SCAN_RESULTS = 77,
    
    /**
     * indicates that the scheduled scan has
     * stopped.  The driver may issue this event at any time during a
     * scheduled scan.  One reason for stopping the scan is if the hardware
     * does not support starting an association or a normal scan while running
     * a scheduled scan.  This event is also sent when the
     * %NL80211_CMD_STOP_SCHED_SCAN command is received or when the interface
     * is brought down while a scheduled scan was running.
     */
    SCHED_SCAN_STOPPED = 78,
    
    /**
     * This command is used give the driver
     * the necessary information for supporting GTK rekey offload. This
     * feature is typically used during WoWLAN. The configuration data
     * is contained in %NL80211_ATTR_REKEY_DATA (which is nested and
     * contains the data in sub-attributes). After rekeying happened,
     * this command may also be sent by the driver as an MLME event to
     * inform userspace of the new replay counter.
     */
    SET_REKEY_OFFLOAD = 79,
    
    /**
     * This is used as an event to inform userspace
     * of PMKSA caching dandidates.
     */
    PMKSA_CANDIDATE = 80,
    
    /**
     * Perform a high-level TDLS command (e.g. link setup).
     * In addition, this can be used as an event to request userspace to take
     * actions on TDLS links (set up a new link or tear down an existing one).
     * In such events, %NL80211_ATTR_TDLS_OPERATION indicates the requested
     * operation, %NL80211_ATTR_MAC contains the peer MAC address, and
     * %NL80211_ATTR_REASON_CODE the reason code to be used (only with
     * %NL80211_TDLS_TEARDOWN).
     */
    TDLS_OPER = 81,
    
    /**
     * Send a TDLS management frame. The
     * %NL80211_ATTR_TDLS_ACTION attribute determines the type of frame to be
     * sent. Public Action codes (802.11-2012 8.1.5.1) will be sent as
     * 802.11 management frames, while TDLS action codes (802.11-2012
     * 8.5.13.1) will be encapsulated and sent as data frames. The currently
     * supported Public Action code is %WLAN_PUB_ACTION_TDLS_DISCOVER_RES
     * and the currently supported TDLS actions codes are given in
     * &enum ieee80211_tdls_actioncode.
     */
    TDLS_MGMT = 82,
    
    /**
     * Used by an application controlling an AP
     * (or GO) interface (i.e. hostapd) to ask for unexpected frames to
     * implement sending deauth to stations that send unexpected class 3
     * frames. Also used as the event sent by the kernel when such a frame
     * is received.
     * For the event, the %NL80211_ATTR_MAC attribute carries the TA and
     * other attributes like the interface index are present.
     * If used as the command it must have an interface index and you can
     * only unsubscribe from the event by closing the socket. Subscription
     * is also for %NL80211_CMD_UNEXPECTED_4ADDR_FRAME events.
     */
    UNEXPECTED_FRAME = 83,
    
    /**
     * Probe an associated station on an AP interface
     * by sending a null data frame to it and reporting when the frame is
     * acknowleged. This is used to allow timing out inactive clients. Uses
     * %NL80211_ATTR_IFINDEX and %NL80211_ATTR_MAC. The command returns a
     * direct reply with an %NL80211_ATTR_COOKIE that is later used to match
     * up the event with the request. The event includes the same data and
     * has %NL80211_ATTR_ACK set if the frame was ACKed.
     */
    PROBE_CLIENT = 84,
    
    /**
     * Register this socket to receive beacons from
     * other BSSes when any interfaces are in AP mode. This helps implement
     * OLBC handling in hostapd. Beacons are reported in %NL80211_CMD_FRAME
     * messages. Note that per PHY only one application may register.
     */
    REGISTER_BEACONS = 85,
    
    /**
     * Sent as an event indicating that the
     * associated station identified by %NL80211_ATTR_MAC sent a 4addr frame
     * and wasn't already in a 4-addr VLAN. The event will be sent similarly
     * to the %NL80211_CMD_UNEXPECTED_FRAME event, to the same listener.
     */
    UNEXPECTED_4ADDR_FRAME = 86,
    
    /**
     * sets a bitmap for the individual TIDs whether
     * No Acknowledgement Policy should be applied.
     */
    SET_NOACK_MAP = 87,
    
    /**
     * An AP or GO may decide to switch channels
     * independently of the userspace SME, send this event indicating
     * %NL80211_ATTR_IFINDEX is now on %NL80211_ATTR_WIPHY_FREQ and the
     * attributes determining channel width.  This indication may also be
     * sent when a remotely-initiated switch (e.g., when a STA receives a CSA
     * from the remote AP) is completed;
     */
    CH_SWITCH_NOTIFY = 88,
    
    /**
     * Start the given P2P Device, identified by
     * its %NL80211_ATTR_WDEV identifier. It must have been created with
     * %NL80211_CMD_NEW_INTERFACE previously. After it has been started, the
     * P2P Device can be used for P2P operations, e.g. remain-on-channel and
     * public action frame TX.
     */
    START_P2P_DEVICE = 89,
    
    /**
     * Stop the given P2P Device, identified by
     * its %NL80211_ATTR_WDEV identifier.
     */
    STOP_P2P_DEVICE = 90,
    
    /**
     * connection request to an AP failed; used to
     * notify userspace that AP has rejected the connection request from a
     * station, due to particular reason. %NL80211_ATTR_CONN_FAILED_REASON
     * is used for this.
     */
    CONN_FAILED = 91,
    
    /**
     * Change the rate used to send multicast frames
     * for IBSS or MESH vif.
     */
    SET_MCAST_RATE = 92,
    
    /**
     * sets ACL for MAC address based access control.
     * This is to be used with the drivers advertising the support of MAC
     * address based access control. List of MAC addresses is passed in
     * %NL80211_ATTR_MAC_ADDRS and ACL policy is passed in
     * %NL80211_ATTR_ACL_POLICY. Driver will enable ACL with this list, if it
     * is not already done. The new list will replace any existing list. Driver
     * will clear its ACL when the list of MAC addresses passed is empty. This
     * command is used in AP/P2P GO mode. Driver has to make sure to clear its
     * ACL list during %NL80211_CMD_STOP_AP.
     */
    SET_MAC_ACL = 93,
    
    /**
     * Start a Channel availability check (CAC). Once
     * a radar is detected or the channel availability scan (CAC) has finished
     * or was aborted, or a radar was detected, usermode will be notified with
     * this event. This command is also used to notify userspace about radars
     * while operating on this channel.
     * %NL80211_ATTR_RADAR_EVENT is used to inform about the type of the
     * event.
     */
    RADAR_DETECT = 94,
    
    /**
     * Get global nl80211 protocol features,
     * i.e. features for the nl80211 protocol rather than device features.
     * Returns the features in the %NL80211_ATTR_PROTOCOL_FEATURES bitmap.
     */
    GET_PROTOCOL_FEATURES = 95,
    
    /**
     * Pass down the most up-to-date Fast Transition
     * Information Element to the WLAN driver
     */
    UPDATE_FT_IES = 96,
    
    /**
     * Send a Fast transition event from the WLAN driver
     * to the supplicant. This will carry the target AP's MAC address along
     * with the relevant Information Elements. This event is used to report
     * received FT IEs (MDIE, FTIE, RSN IE, TIE, RICIE).
     */
    FT_EVENT = 97,
    
    /**
     * Indicates user-space will start running
     * a critical protocol that needs more reliability in the connection to
     * complete.
     */
    CRIT_PROTOCOL_START = 98,
    
    /**
     * Indicates the connection reliability can
     * return back to normal.
     */
    CRIT_PROTOCOL_STOP = 99,
    
    /** Get currently supported coalesce rules. */
    GET_COALESCE = 100,
    
    /** Configure coalesce rules or clear existing rules. */
    SET_COALESCE = 101,
    
    /**
     * Perform a channel switch by announcing the
     * the new channel information (Channel Switch Announcement - CSA)
     * in the beacon for some time (as defined in the
     * %NL80211_ATTR_CH_SWITCH_COUNT parameter) and then change to the
     * new channel. Userspace provides the new channel information (using
     * %NL80211_ATTR_WIPHY_FREQ and the attributes determining channel
     * width). %NL80211_ATTR_CH_SWITCH_BLOCK_TX may be supplied to inform
     * other station that transmission must be blocked until the channel
     * switch is complete.
     */
    CHANNEL_SWITCH = 102,
    
    /**
     * Vendor-specified command/event. The command is specified
     * by the %NL80211_ATTR_VENDOR_ID attribute and a sub-command in
     * %NL80211_ATTR_VENDOR_SUBCMD. Parameter(s) can be transported in
     * %NL80211_ATTR_VENDOR_DATA.
     * For feature advertisement, the %NL80211_ATTR_VENDOR_DATA attribute is
     * used in the wiphy data as a nested attribute containing descriptions
     * (&struct nl80211_vendor_cmd_info) of the supported vendor commands.
     * This may also be sent as an event with the same attributes.
     */
    VENDOR = 103,
    
    /**
     * Set Interworking QoS mapping for IP DSCP values.
     * The QoS mapping information is included in %NL80211_ATTR_QOS_MAP. If
     * that attribute is not included, QoS mapping is disabled. Since this
     * QoS mapping is relevant for IP packets, it is only valid during an
     * association. This is cleared on disassociation and AP restart.
     */
    SET_QOS_MAP = 104,
    
    /**
     * Ask the kernel to add a traffic stream for the given
     * %NL80211_ATTR_TSID and %NL80211_ATTR_MAC with %NL80211_ATTR_USER_PRIO
     * and %NL80211_ATTR_ADMITTED_TIME parameters.
     * Note that the action frame handshake with the AP shall be handled by
     * userspace via the normal management RX/TX framework, this only sets
     * up the TX TS in the driver/device.
     * If the admitted time attribute is not added then the request just checks
     * if a subsequent setup could be successful, the intent is to use this to
     * avoid setting up a session with the AP when local restrictions would
     * make that impossible. However, the subsequent "real" setup may still
     * fail even if the check was successful.
     */
    ADD_TX_TS = 105,
    
    /**
     * Remove an existing TS with the %NL80211_ATTR_TSID
     * and %NL80211_ATTR_MAC parameters. It isn't necessary to call this
     * before removing a station entry entirely, or before disassociating
     * or similar, cleanup will happen in the driver/device in this case.
     */
    DEL_TX_TS = 106,
    
    /**
     * Get mesh path attributes for mesh proxy path to
     * destination %NL80211_ATTR_MAC on the interface identified by
     * %NL80211_ATTR_IFINDEX.
     */
    GET_MPP = 107,
    
    /**
     * Join the OCB network. The center frequency and
     * bandwidth of a channel must be given.
     */
    JOIN_OCB = 108,
    
    /**
     * Leave the OCB network -- no special arguments, the
     * network is determined by the network interface.
     */
    LEAVE_OCB = 109,
    
    /**
     * Notify that a channel switch
     * has been started on an interface, regardless of the initiator
     * (ie. whether it was requested from a remote device or
     * initiated on our own).  It indicates that
     * %NL80211_ATTR_IFINDEX will be on %NL80211_ATTR_WIPHY_FREQ
     * after %NL80211_ATTR_CH_SWITCH_COUNT TBTT's.  The userspace may
     * decide to react to this indication by requesting other
     * interfaces to change channel as well.
     */
    CH_SWITCH_STARTED_NOTIFY = 110,
    
    /**
     * Start channel-switching with a TDLS peer,
     * identified by the %NL80211_ATTR_MAC parameter. A target channel is
     * provided via %NL80211_ATTR_WIPHY_FREQ and other attributes determining
     * channel width/type. The target operating class is given via
     * %NL80211_ATTR_OPER_CLASS.
     * The driver is responsible for continually initiating channel-switching
     * operations and returning to the base channel for communication with the
     * AP.
     */
    TDLS_CHANNEL_SWITCH = 111,
    
    /**
     * Stop channel-switching with a TDLS
     * peer given by %NL80211_ATTR_MAC. Both peers must be on the base channel
     * when this command completes.
     */
    TDLS_CANCEL_CHANNEL_SWITCH = 112,
    
    /**
     * Similar to %NL80211_CMD_REG_CHANGE, but used
     * as an event to indicate changes for devices with wiphy-specific regdom
     * management.
     */
    WIPHY_REG_CHANGE = 113,
    
    /**
     * Stop an ongoing scan. Returns -ENOENT if a scan is
     * not running. The driver indicates the status of the scan through
     * cfg80211_scan_done().
     */
    ABORT_SCAN = 114,
    
    /**
     * Start NAN operation, identified by its
     * %NL80211_ATTR_WDEV interface. This interface must have been
     * previously created with %NL80211_CMD_NEW_INTERFACE. After it
     * has been started, the NAN interface will create or join a
     * cluster. This command must have a valid
     * %NL80211_ATTR_NAN_MASTER_PREF attribute and optional
     * %NL80211_ATTR_BANDS attributes.  If %NL80211_ATTR_BANDS is
     * omitted or set to 0, it means don't-care and the device will
     * decide what to use.  After this command NAN functions can be
     * added.
     */
    START_NAN = 115,
    
    /**
     * Stop the NAN operation, identified by
     * its %NL80211_ATTR_WDEV interface.
     */
    STOP_NAN = 116,
    
    /**
     * Add a NAN function. The function is defined
     * with %NL80211_ATTR_NAN_FUNC nested attribute. When called, this
     * operation returns the strictly positive and unique instance id
     * (%NL80211_ATTR_NAN_FUNC_INST_ID) and a cookie (%NL80211_ATTR_COOKIE)
     * of the function upon success.
     * Since instance ID's can be re-used, this cookie is the right
     * way to identify the function. This will avoid races when a termination
     * event is handled by the user space after it has already added a new
     * function that got the same instance id from the kernel as the one
     * which just terminated.
     * This cookie may be used in NAN events even before the command
     * returns, so userspace shouldn't process NAN events until it processes
     * the response to this command.
     * Look at %NL80211_ATTR_SOCKET_OWNER as well.
     */
    ADD_NAN_FUNCTION = 117,
    
    /**
     * Delete a NAN function by cookie.
     * This command is also used as a notification sent when a NAN function is
     * terminated. This will contain a %NL80211_ATTR_NAN_FUNC_INST_ID
     * and %NL80211_ATTR_COOKIE attributes.
     */
    DEL_NAN_FUNCTION = 118,
    
    /**
     * Change current NAN
     * configuration. NAN must be operational (%NL80211_CMD_START_NAN
     * was executed).  It must contain at least one of the following
     * attributes: %NL80211_ATTR_NAN_MASTER_PREF,
     * %NL80211_ATTR_BANDS.  If %NL80211_ATTR_BANDS is omitted, the
     * current configuration is not changed.  If it is present but
     * set to zero, the configuration is changed to don't-care
     * (i.e. the device can decide what to do).
     */
    CHANGE_NAN_CONFIG = 119,
    
    /**
     * Notification sent when a match is reported.
     * This will contain a %NL80211_ATTR_NAN_MATCH nested attribute and
     * %NL80211_ATTR_COOKIE.
     */
    NAN_MATCH = 120,
    
    /**
     * Configure if this AP should perform
     * multicast to unicast conversion. When enabled, all multicast packets
     * with ethertype ARP, IPv4 or IPv6 (possibly within an 802.1Q header)
     * will be sent out to each station once with the destination (multicast)
     * MAC address replaced by the station's MAC address. Note that this may
     * break certain expectations of the receiver, e.g. the ability to drop
     * unicast IP packets encapsulated in multicast L2 frames, or the ability
     * to not send destination unreachable messages in such cases.
     * This can only be toggled per BSS. Configure this on an interface of
     * type %NL80211_IFTYPE_AP. It applies to all its VLAN interfaces
     * (%NL80211_IFTYPE_AP_VLAN), except for those in 4addr (WDS) mode.
     * If %NL80211_ATTR_MULTICAST_TO_UNICAST_ENABLED is not present with this
     * command, the feature is disabled.
     */
    SET_MULTICAST_TO_UNICAST = 121,
    
    /**
     * Update one or more connect parameters
     * for subsequent roaming cases if the driver or firmware uses internal
     * BSS selection. This command can be issued only while connected and it
     * does not result in a change for the current association. Currently,
     * only the %NL80211_ATTR_IE data is used and updated with this command.
     */
    UPDATE_CONNECT_PARAMS = 122,
    
    /**
     * For offloaded 4-Way handshake, set the PMK or PMK-R0
     * for the given authenticator address (specified with %NL80211_ATTR_MAC).
     * When %NL80211_ATTR_PMKR0_NAME is set, %NL80211_ATTR_PMK specifies the
     * PMK-R0, otherwise it specifies the PMK.
     */
    SET_PMK = 123,
    
    /**
     * For offloaded 4-Way handshake, delete the previously
     * configured PMK for the authenticator address identified by
     * %NL80211_ATTR_MAC.
     */
    DEL_PMK = 124,
    
    /**
     * An event that indicates that the 4 way
     * handshake was completed successfully by the driver. The BSSID is
     * specified with %NL80211_ATTR_MAC. Drivers that support 4 way handshake
     * offload should send this event after indicating 802.11 association with
     * %NL80211_CMD_CONNECT or %NL80211_CMD_ROAM. If the 4 way handshake failed
     * %NL80211_CMD_DISCONNECT should be indicated instead.
     */
    PORT_AUTHORIZED = 125,
    
    /** Request that the regdb firmware file is reloaded. */
    RELOAD_REGDB = 126,
    
    /**
     * This interface is exclusively defined for host
     * drivers that do not define separate commands for authentication and
     * association, but rely on user space for the authentication to happen.
     * This interface acts both as the event request (driver to user space)
     * to trigger the authentication and command response (userspace to
     * driver) to indicate the authentication status.
     *
     * User space uses the %NL80211_CMD_CONNECT command to the host driver to
     * trigger a connection. The host driver selects a BSS and further uses
     * this interface to offload only the authentication part to the user
     * space. Authentication frames are passed between the driver and user
     * space through the %NL80211_CMD_FRAME interface. Host driver proceeds
     * further with the association after getting successful authentication
     * status. User space indicates the authentication status through
     * %NL80211_ATTR_STATUS_CODE attribute in %NL80211_CMD_EXTERNAL_AUTH
     * command interface.
     *
     * Host driver reports this status on an authentication failure to the
     * user space through the connect result as the user space would have
     * initiated the connection through the connect request.
     */
    EXTERNAL_AUTH = 127,
    
    /**
     * An event that notify station's
     * ht opmode or vht opmode changes using any of %NL80211_ATTR_SMPS_MODE,
     * %NL80211_ATTR_CHANNEL_WIDTH,%NL80211_ATTR_NSS attributes with its
     * address(specified in %NL80211_ATTR_MAC).
     */
    STA_OPMODE_CHANGED = 128,
    
    /**
     * Control Port (e.g. PAE) frame TX request
     * and RX notification.  This command is used both as a request to transmit
     * a control port frame and as a notification that a control port frame
     * has been received. %NL80211_ATTR_FRAME is used to specify the
     * frame contents.  The frame is the raw EAPoL data, without ethernet or
     * 802.11 headers.
     * When used as an event indication %NL80211_ATTR_CONTROL_PORT_ETHERTYPE,
     * %NL80211_ATTR_CONTROL_PORT_NO_ENCRYPT and %NL80211_ATTR_MAC are added
     * indicating the protocol type of the received frame; whether the frame
     * was received unencrypted and the MAC address of the peer respectively.
     */
    CONTROL_PORT_FRAME = 129,
    
    /**
     * Retrieve FTM responder statistics, in
     * the %NL80211_ATTR_FTM_RESPONDER_STATS attribute.
     */
    GET_FTM_RESPONDER_STATS = 130,
    
    /**
     * start a (set of) peer measurement(s)
     * with the given parameters, which are encapsulated in the nested
     * %NL80211_ATTR_PEER_MEASUREMENTS attribute. Optionally, MAC address
     * randomization may be enabled and configured by specifying the
     * %NL80211_ATTR_MAC and %NL80211_ATTR_MAC_MASK attributes.
     * If a timeout is requested, use the %NL80211_ATTR_TIMEOUT attribute.
     * A u64 cookie for further %NL80211_ATTR_COOKIE use is is returned in
     * the netlink extended ack message.
     *
     * To cancel a measurement, close the socket that requested it.
     *
     * Measurement results are reported to the socket that requested the
     * measurement using @NL80211_CMD_PEER_MEASUREMENT_RESULT when they
     * become available, so applications must ensure a large enough socket
     * buffer size.
     *
     * Depending on driver support it may or may not be possible to start
     * multiple concurrent measurements.
     */
    PEER_MEASUREMENT_START = 131,
    
    /**
     * This command number is used for the
     * result notification from the driver to the requesting socket.
     */
    PEER_MEASUREMENT_RESULT = 132,
    
    /**
     * Notification only, indicating that
     * the measurement completed, using the measurement cookie
     * (%NL80211_ATTR_COOKIE).
     */
    PEER_MEASUREMENT_COMPLETE = 133,
    
    /**
     * Notify the kernel that a radar signal was
     * detected and reported by a neighboring device on the channel
     * indicated by %NL80211_ATTR_WIPHY_FREQ and other attributes
     * determining the width and type.
     */
    NOTIFY_RADAR = 134,
    
    /**
     * This interface allows the host driver to
     * offload OWE processing to user space. This intends to support
     * OWE AKM by the host drivers that implement SME but rely
     * on the user space for the cryptographic/DH IE processing in AP mode.
     */
    UPDATE_OWE_INFO = 135,
    
    /**
     * The requirement for mesh link metric
     * refreshing, is that from one mesh point we be able to send some data
     * frames to other mesh points which are not currently selected as a
     * primary traffic path, but which are only 1 hop away. The absence of
     * the primary path to the chosen node makes it necessary to apply some
     * form of marking on a chosen packet stream so that the packets can be
     * properly steered to the selected node for testing, and not by the
     * regular mesh path lookup. Further, the packets must be of type data
     * so that the rate control (often embedded in firmware) is used for
     * rate selection.
     *
     * Here attribute %NL80211_ATTR_MAC is used to specify connected mesh
     * peer MAC address and %NL80211_ATTR_FRAME is used to specify the frame
     * content. The frame is ethernet data.
     */
    PROBE_MESH_LINK = 136,
}

/** nl80211 netlink attributes */
export interface Message extends BaseObject {
    /**
     * index of wiphy to operate on, cf.
     * /sys/class/ieee80211/<phyname>/index
     */
    wiphy?: number
    
    /** wiphy name (used for renaming) */
    wiphyName?: string
    
    /** network interface index of the device to operate on */
    ifindex?: number
    
    /** network interface name */
    ifname?: string
    
    /** type of virtual interface, see &enum nl80211_iftype */
    iftype?: InterfaceType | keyof typeof InterfaceType
    
    /** MAC address (various uses) */
    mac?: Buffer
    
    /**
     * (temporal) key data; for TKIP this consists of
     * 16 bytes encryption key followed by 8 bytes each for TX and RX MIC
     * keys
     */
    keyData?: Buffer
    
    /** key ID (u8, 0-3) */
    keyIdx?: number
    
    /**
     * key cipher suite (u32, as defined by IEEE 802.11
     * section 7.3.2.25.1, e.g. 0x000FAC04)
     */
    keyCipher?: number
    
    /**
     * transmit key sequence number (IV/PN) for TKIP and
     * CCMP keys, each six bytes in little endian
     */
    keySeq?: Buffer
    
    /** Flag attribute indicating the key is default key */
    keyDefault?: true
    
    /** beacon interval in TU */
    beaconInterval?: number
    
    /** DTIM period for beaconing */
    dtimPeriod?: number
    
    /** portion of the beacon before the TIM IE */
    beaconHead?: Buffer
    
    /** portion of the beacon after the TIM IE */
    beaconTail?: Buffer
    
    /** Association ID for the station (u16) */
    staAid?: number
    
    /**
     * flags, nested element with NLA_FLAG attributes of
     * &enum nl80211_sta_flags (deprecated, use %NL80211_ATTR_STA_FLAGS2)
     */
    staFlags?: StationFlags
    
    /**
     * listen interval as defined by
     * IEEE 802.11 7.3.1.6 (u16).
     */
    staListenInterval?: number
    
    /**
     * supported rates, array of supported
     * rates as defined by IEEE 802.11 7.3.2.2 but without the length
     * restriction (at most %NL80211_MAX_SUPP_RATES).
     */
    staSupportedRates?: Buffer
    
    /**
     * interface index of VLAN interface to move station
     * to, or the AP interface the station was originally added to to.
     */
    staVlan?: number
    
    /**
     * information about a station, part of station info
     * given for %NL80211_CMD_GET_STATION, nested attribute containing
     * info as possible, see &enum nl80211_sta_info.
     */
    staInfo?: StationInfo
    
    /**
     * Information about an operating bands,
     * consisting of a nested array.
     */
    wiphyBands?: Band[]
    
    /**
     * flags, nested element with NLA_FLAG attributes of
     * &enum nl80211_mntr_flags.
     */
    mntrFlags?: MonitorFlags
    
    /** mesh id (1-32 bytes). */
    meshId?: Buffer
    
    /**
     * action to perform on the mesh peer link
     * (see &enum nl80211_plink_action).
     */
    staPlinkAction?: PlinkAction | keyof typeof PlinkAction
    
    /** MAC address of the next hop for a mesh path. */
    mpathNextHop?: Buffer
    
    /**
     * information about a mesh_path, part of mesh path
     * info given for %NL80211_CMD_GET_MPATH, nested attribute described at
     * &enum nl80211_mpath_info.
     */
    mpathInfo?: MpathInfo
    
    /** whether CTS protection is enabled (u8, 0 or 1) */
    bssCtsProt?: boolean
    
    /**
     * whether short preamble is enabled
     * (u8, 0 or 1)
     */
    bssShortPreamble?: boolean
    
    /**
     * whether short slot time enabled
     * (u8, 0 or 1)
     */
    bssShortSlotTime?: boolean
    
    /**
     * HT Capability information element (from
     * association request when used with NL80211_CMD_NEW_STATION)
     */
    htCapability?: Buffer
    
    /**
     * nested attribute containing all
     * supported interface types, each a flag attribute with the number
     * of the interface mode.
     */
    supportedIftypes?: InterfaceTypeSet
    
    /**
     * an ISO-3166-alpha2 country code for which the
     * current regulatory domain should be set to or is already set to.
     * For example, 'CR', for Costa Rica. This attribute is used by the kernel
     * to query the CRDA to retrieve one regulatory domain. This attribute can
     * also be used by userspace to query the kernel for the currently set
     * regulatory domain. We chose an alpha2 as that is also used by the
     * IEEE-802.11 country information element to identify a country.
     * Users can also simply ask the wireless core to set regulatory domain
     * to a specific alpha2.
     */
    regAlpha2?: string
    
    /**
     * a nested array of regulatory domain regulatory
     * rules.
     */
    regRules?: RegulatoryRule[]
    
    /**
     * Mesh configuration parameters, a nested attribute
     * containing attributes from &enum nl80211_meshconf_params.
     */
    meshConfig?: MeshconfParams
    
    /**
     * basic rates, array of basic
     * rates in format defined by IEEE 802.11 7.3.2.2 but without the length
     * restriction (at most %NL80211_MAX_SUPP_RATES).
     */
    bssBasicRates?: Buffer
    
    /** a nested array of TX queue parameters */
    wiphyTxqParams?: Txq[]
    
    /**
     * frequency of the selected channel in MHz,
     * defines the channel together with the (deprecated)
     * %NL80211_ATTR_WIPHY_CHANNEL_TYPE attribute or the attributes
     * %NL80211_ATTR_CHANNEL_WIDTH and if needed %NL80211_ATTR_CENTER_FREQ1
     * and %NL80211_ATTR_CENTER_FREQ2
     */
    wiphyFreq?: number
    
    /**
     * included with NL80211_ATTR_WIPHY_FREQ
     * if HT20 or HT40 are to be used (i.e., HT disabled if not included):
     * NL80211_CHAN_NO_HT = HT not allowed (i.e., same as not including
     * this attribute)
     * NL80211_CHAN_HT20 = HT20 only
     * NL80211_CHAN_HT40MINUS = secondary channel is below the primary channel
     * NL80211_CHAN_HT40PLUS = secondary channel is above the primary channel
     * This attribute is now deprecated.
     */
    wiphyChannelType?: number
    
    /**
     * Flag attribute indicating the key is the
     * default management key
     */
    keyDefaultMgmt?: true
    
    /**
     * Management frame subtype for
     * %NL80211_CMD_SET_MGMT_EXTRA_IE.
     */
    mgmtSubtype?: number
    
    /**
     * Information element(s) data (used, e.g., with
     * %NL80211_CMD_SET_MGMT_EXTRA_IE).
     */
    ie?: Buffer
    
    /**
     * number of SSIDs you can scan with
     * a single scan request, a wiphy attribute.
     */
    maxNumScanSsids?: number
    
    /** nested attribute with frequencies (in MHz) */
    scanFrequencies?: Buffer
    
    /**
     * nested attribute with SSIDs, leave out for passive
     * scanning and include a zero-length SSID (wildcard) for wildcard scan
     */
    scanSsids?: Buffer
    
    /**
     * Used to indicate consistent snapshots for
     * dumps. This number increases whenever the object list being
     * dumped changes, and as such userspace can verify that it has
     * obtained a complete and consistent snapshot by verifying that
     * all dump messages contain the same generation number. If it
     * changed then the list changed and the dump should be repeated
     * completely from scratch.
     */
    generation?: number
    
    /** scan result BSS */
    bss?: Buffer
    
    /**
     * indicates who requested the regulatory domain
     * currently in effect. This could be any of the %NL80211_REGDOM_SET_BY_*
     */
    regInitiator?: Buffer
    
    /**
     * indicates the type of the regulatory domain currently
     * set. This can be one of the nl80211_reg_type (%NL80211_REGDOM_TYPE_*)
     */
    regType?: RegulatoryType | keyof typeof RegulatoryType
    
    /**
     * wiphy attribute that specifies
     * an array of command numbers (i.e. a mapping index to command number)
     * that the driver for the given wiphy supports.
     */
    supportedCommands?: number[]
    
    /**
     * frame data (binary attribute), including frame header
     * and body, but not FCS; used, e.g., with NL80211_CMD_AUTHENTICATE and
     * NL80211_CMD_ASSOCIATE events
     */
    frame?: Buffer
    
    /** SSID (binary attribute, 0..32 octets) */
    ssid?: Buffer
    
    /**
     * AuthenticationType, see &enum nl80211_auth_type,
     * represented as a u32
     */
    authType?: AuthType | keyof typeof AuthType
    
    /**
     * ReasonCode for %NL80211_CMD_DEAUTHENTICATE and
     * %NL80211_CMD_DISASSOCIATE, u16
     */
    reasonCode?: number
    
    /**
     * Key Type, see &enum nl80211_key_type, represented as
     * a u32
     */
    keyType?: KeyType | keyof typeof KeyType
    
    /**
     * maximum length of information elements
     * that can be added to a scan request
     */
    maxScanIeLen?: number
    
    /**
     * a set of u32 values indicating the supported
     * cipher suites
     */
    cipherSuites?: Buffer
    
    /**
     * A channel which has suffered a regulatory change
     * due to considerations from a beacon hint. This attribute reflects
     * the state of the channel _before_ the beacon hint processing. This
     * attributes consists of a nested attribute containing
     * NL80211_FREQUENCY_ATTR_*
     */
    freqBefore?: Buffer
    
    /**
     * A channel which has suffered a regulatory change
     * due to considerations from a beacon hint. This attribute reflects
     * the state of the channel _after_ the beacon hint processing. This
     * attributes consists of a nested attribute containing
     * NL80211_FREQUENCY_ATTR_*
     */
    freqAfter?: Buffer
    
    /**
     * a flag indicating the IBSS should not try to look
     * for other networks on different channels
     */
    freqFixed?: true
    
    /**
     * TX retry limit for frames whose length is
     * less than or equal to the RTS threshold; allowed range: 1..255;
     * dot11ShortRetryLimit; u8
     */
    wiphyRetryShort?: number
    
    /**
     * TX retry limit for frames whose length is
     * greater than the RTS threshold; allowed range: 1..255;
     * dot11ShortLongLimit; u8
     */
    wiphyRetryLong?: number
    
    /**
     * fragmentation threshold, i.e., maximum
     * length in octets for frames; allowed range: 256..8000, disable
     * fragmentation with (u32)-1; dot11FragmentationThreshold; u32
     */
    wiphyFragThreshold?: number
    
    /**
     * RTS threshold (TX frames with length
     * larger than or equal to this use RTS/CTS handshake); allowed range:
     * 0..65536, disable with (u32)-1; dot11RTSThreshold; u32
     */
    wiphyRtsThreshold?: number
    
    /**
     * a flag indicating than an operation timed out; this
     * is used, e.g., with %NL80211_CMD_AUTHENTICATE event
     */
    timedOut?: true
    
    /**
     * Whether management frame protection (IEEE 802.11w) is
     * used for the association (&enum nl80211_mfp, represented as a u32);
     * this attribute can be used with %NL80211_CMD_ASSOCIATE and
     * %NL80211_CMD_CONNECT requests. %NL80211_MFP_OPTIONAL is not allowed for
     * %NL80211_CMD_ASSOCIATE since user space SME is expected and hence, it
     * must have decided whether to use management frame protection or not.
     * Setting %NL80211_MFP_OPTIONAL with a %NL80211_CMD_CONNECT request will
     * let the driver (or the firmware) decide whether to use MFP or not.
     */
    useMfp?: Mfp | keyof typeof Mfp
    
    /**
     * Attribute containing a
     * &struct nl80211_sta_flag_update.
     */
    staFlags2?: Buffer
    
    /**
     * A flag indicating whether user space controls
     * IEEE 802.1X port, i.e., sets/clears %NL80211_STA_FLAG_AUTHORIZED, in
     * station mode. If the flag is included in %NL80211_CMD_ASSOCIATE
     * request, the driver will assume that the port is unauthorized until
     * authorized by user space. Otherwise, port is marked authorized by
     * default in station mode.
     */
    controlPort?: true
    
    /**
     * Testmode data blob, passed through to the driver.
     * We recommend using nested, driver-specific attributes within this.
     */
    testdata?: Buffer
    
    /**
     * Flag attribute, used with connect(), indicating
     * that protected APs should be used. This is also used with NEW_BEACON to
     * indicate that the BSS is to use protection.
     */
    privacy?: true
    
    /**
     * A flag indicating that the DISCONNECT
     * event was due to the AP disconnecting the station, and not due to
     * a local disconnect request.
     */
    disconnectedByAp?: true
    
    /**
     * StatusCode for the %NL80211_CMD_CONNECT
     * event (u16)
     */
    statusCode?: number
    
    /**
     * For crypto settings for connect or
     * other commands, indicates which pairwise cipher suites are used
     */
    cipherSuitesPairwise?: number
    
    /**
     * For crypto settings for connect or
     * other commands, indicates which group cipher suite is used
     */
    cipherSuiteGroup?: number
    
    /**
     * Used with CONNECT, ASSOCIATE, and NEW_BEACON to
     * indicate which WPA version(s) the AP we want to associate with is using
     * (a u32 with flags from &enum nl80211_wpa_versions).
     */
    wpaVersions?: WpaVersions
    
    /**
     * Used with CONNECT, ASSOCIATE, and NEW_BEACON to
     * indicate which key management algorithm(s) to use (an array of u32).
     * This attribute is also sent in response to @NL80211_CMD_GET_WIPHY,
     * indicating the supported AKM suites, intended for specific drivers which
     * implement SME and have constraints on which AKMs are supported and also
     * the cases where an AKM support is offloaded to the driver/firmware.
     * If there is no such notification from the driver, user space should
     * assume the driver supports all the AKM suites.
     */
    akmSuites?: number
    
    /**
     * (Re)association request information elements as
     * sent out by the card, for ROAM and successful CONNECT events.
     */
    reqIe?: Buffer
    
    /**
     * (Re)association response information elements as
     * sent by peer, for ROAM and successful CONNECT events.
     */
    respIe?: Buffer
    
    /**
     * previous BSSID, to be used in ASSOCIATE and CONNECT
     * commands to specify a request to reassociate within an ESS, i.e., to use
     * Reassociate Request frame (with the value of this attribute in the
     * Current AP address field) instead of Association Request frame which is
     * used for the initial association to an ESS.
     */
    prevBssid?: Buffer
    
    /**
     * key information in a nested attribute with
     * %NL80211_KEY_* sub-attributes
     */
    key?: Buffer
    
    /**
     * array of keys for static WEP keys for connect()
     * and join_ibss(), key information is in a nested attribute each
     * with %NL80211_KEY_* sub-attributes
     */
    keys?: Buffer
    
    /** Process ID of a network namespace. */
    pid?: number
    
    /** Use 4-address frames on a virtual interface */
    _4addr?: number
    
    /**
     * survey information about a channel, part of
     * the survey response for %NL80211_CMD_GET_SURVEY, nested attribute
     * containing info as possible, see &enum survey_info.
     */
    surveyInfo?: SurveyInfo
    
    /** PMK material for PMKSA caching. */
    pmkid?: Buffer
    
    /**
     * maximum number of PMKIDs a firmware can
     * cache, a wiphy attribute.
     */
    maxNumPmkids?: number
    
    /** Duration of an operation in milliseconds, u32. */
    duration?: number
    
    /** Generic 64-bit cookie to identify objects. */
    cookie?: bigint
    
    /**
     * Coverage Class as defined by IEEE 802.11
     * section 7.3.2.9; dot11CoverageClass; u8
     */
    wiphyCoverageClass?: number
    
    /**
     * Nested set of attributes
     * (enum nl80211_tx_rate_attributes) describing TX rates per band. The
     * enum nl80211_band value is used as the index (nla_type() of the nested
     * data. If a band is not included, it will be configured to allow all
     * rates based on negotiated supported rates information. This attribute
     * is used with %NL80211_CMD_SET_TX_BITRATE_MASK and with starting AP,
     * and joining mesh networks (not IBSS yet). In the later case, it must
     * specify just a single bitrate, which is to be used for the beacon.
     * The driver must also specify support for this with the extended
     * features NL80211_EXT_FEATURE_BEACON_RATE_LEGACY,
     * NL80211_EXT_FEATURE_BEACON_RATE_HT and
     * NL80211_EXT_FEATURE_BEACON_RATE_VHT.
     */
    txRates?: Map<number, TxRate>
    
    /**
     * A binary attribute which typically must contain
     * at least one byte, currently used with @NL80211_CMD_REGISTER_FRAME.
     */
    frameMatch?: Buffer
    
    /**
     * Flag attribute indicating that the frame was
     * acknowledged by the recipient.
     */
    ack?: true
    
    /** powersave state, using &enum nl80211_ps_state values. */
    psState?: PsState | keyof typeof PsState
    
    /**
     * connection quality monitor configuration in a
     * nested attribute with %NL80211_ATTR_CQM_* sub-attributes.
     */
    cqm?: Cqm
    
    /**
     * Flag attribute to indicate that a command
     * is requesting a local authentication/association state change without
     * invoking actual management frame exchange. This can be used with
     * NL80211_CMD_AUTHENTICATE, NL80211_CMD_DEAUTHENTICATE,
     * NL80211_CMD_DISASSOCIATE.
     */
    localStateChange?: true
    
    /**
     * (AP mode) Do not forward traffic between stations
     * connected to this BSS.
     */
    apIsolate?: true
    
    /**
     * Transmit power setting type. See
     * &enum nl80211_tx_power_setting for possible values.
     */
    wiphyTxPowerSetting?: TxPowerSetting | keyof typeof TxPowerSetting
    
    /**
     * Transmit power level in signed mBm units.
     * This is used in association with @NL80211_ATTR_WIPHY_TX_POWER_SETTING
     * for non-automatic settings.
     */
    wiphyTxPowerLevel?: number
    
    /**
     * wiphy capability attribute, which is a
     * nested attribute of %NL80211_ATTR_FRAME_TYPE attributes, containing
     * information about which frame types can be transmitted with
     * %NL80211_CMD_FRAME.
     */
    txFrameTypes?: Buffer[]
    
    /**
     * wiphy capability attribute, which is a
     * nested attribute of %NL80211_ATTR_FRAME_TYPE attributes, containing
     * information about which frame types can be registered for RX.
     */
    rxFrameTypes?: Buffer[]
    
    /**
     * A u16 indicating the frame type/subtype for the
     * @NL80211_CMD_REGISTER_FRAME command.
     */
    frameType?: number
    
    /**
     * A 16-bit value indicating the
     * ethertype that will be used for key negotiation. It can be
     * specified with the associate and connect commands. If it is not
     * specified, the value defaults to 0x888E (PAE, 802.1X). This
     * attribute is also used as a flag in the wiphy information to
     * indicate that protocols other than PAE are supported.
     */
    controlPortEthertype?: Buffer
    
    /**
     * When included along with
     * %NL80211_ATTR_CONTROL_PORT_ETHERTYPE, indicates that the custom
     * ethertype frames used for key negotiation must not be encrypted.
     */
    controlPortNoEncrypt?: true
    
    /**
     * The device supports IBSS RSN, which mostly
     * means support for per-station GTKs.
     */
    supportIbssRsn?: true
    
    /**
     * Bitmap of allowed antennas for transmitting.
     * This can be used to mask out antennas which are not attached or should
     * not be used for transmitting. If an antenna is not selected in this
     * bitmap the hardware is not allowed to transmit on this antenna.
     *
     * Each bit represents one antenna, starting with antenna 1 at the first
     * bit. Depending on which antennas are selected in the bitmap, 802.11n
     * drivers can derive which chainmasks to use (if all antennas belonging to
     * a particular chain are disabled this chain should be disabled) and if
     * a chain has diversity antennas wether diversity should be used or not.
     * HT capabilities (STBC, TX Beamforming, Antenna selection) can be
     * derived from the available chains after applying the antenna mask.
     * Non-802.11n drivers can derive wether to use diversity or not.
     * Drivers may reject configurations or RX/TX mask combinations they cannot
     * support by returning -EINVAL.
     */
    wiphyAntennaTx?: number
    
    /**
     * Bitmap of allowed antennas for receiving.
     * This can be used to mask out antennas which are not attached or should
     * not be used for receiving. If an antenna is not selected in this bitmap
     * the hardware should not be configured to receive on this antenna.
     * For a more detailed description see @NL80211_ATTR_WIPHY_ANTENNA_TX.
     */
    wiphyAntennaRx?: number
    
    /** Multicast tx rate (in 100 kbps) for IBSS */
    mcastRate?: number
    
    /**
     * For management frame TX, the frame may be
     * transmitted on another channel when the channel given doesn't match
     * the current channel. If the current channel doesn't match and this
     * flag isn't set, the frame will be rejected. This is also used as an
     * nl80211 capability flag.
     */
    offchannelTxOk?: true
    
    /** HT operation mode (u16) */
    bssHtOpmode?: number
    
    /**
     * A nested attribute containing flags
     * attributes, specifying what a key should be set as default as.
     * See &enum nl80211_key_default_types.
     */
    keyDefaultTypes?: KeyDefaultTypes
    
    /**
     * Device attribute that
     * specifies the maximum duration that can be requested with the
     * remain-on-channel operation, in milliseconds, u32.
     */
    maxRemainOnChannelDuration?: number
    
    /**
     * Optional mesh setup parameters.  These cannot be
     * changed once the mesh is active.
     */
    meshSetup?: Buffer
    
    /**
     * Bitmap of antennas which are available
     * for configuration as TX antennas via the above parameters.
     */
    wiphyAntennaAvailTx?: number
    
    /**
     * Bitmap of antennas which are available
     * for configuration as RX antennas via the above parameters.
     */
    wiphyAntennaAvailRx?: number
    
    /**
     * Currently, this means the underlying driver
     * allows auth frames in a mesh to be passed to userspace for processing via
     * the @NL80211_MESH_SETUP_USERSPACE_AUTH flag.
     */
    supportMeshAuth?: true
    
    /**
     * The state of a mesh peer link as defined in
     * &enum nl80211_plink_state. Used when userspace is driving the peer link
     * management state machine.  @NL80211_MESH_SETUP_USERSPACE_AMPE or
     * @NL80211_MESH_SETUP_USERSPACE_MPM must be enabled.
     */
    staPlinkState?: Buffer
    
    /**
     * used by %NL80211_CMD_SET_WOWLAN to
     * indicate which WoW triggers should be enabled. This is also
     * used by %NL80211_CMD_GET_WOWLAN to get the currently enabled WoWLAN
     * triggers.
     */
    wowlanTriggers?: WowlanTriggers
    
    /**
     * indicates, as part of the wiphy
     * capabilities, the supported WoWLAN triggers
     */
    wowlanTriggersSupported?: WowlanTriggers
    
    /**
     * Interval between scheduled scan
     * cycles, in msecs.
     */
    schedScanInterval?: number
    
    /**
     * Nested attribute listing the supported
     * interface combinations. In each nested item, it contains attributes
     * defined in &enum nl80211_if_combination_attrs.
     */
    interfaceCombinations?: InterfaceCombination[]
    
    /**
     * Nested attribute (just like
     * %NL80211_ATTR_SUPPORTED_IFTYPES) containing the interface types that
     * are managed in software: interfaces of these types aren't subject to
     * any restrictions in their number or combinations.
     */
    softwareIftypes?: InterfaceTypeSet
    
    /**
     * nested attribute containing the information
     * necessary for GTK rekeying in the device, see &enum nl80211_rekey_data.
     */
    rekeyData?: RekeyData
    
    /**
     * number of SSIDs you can
     * scan with a single scheduled scan request, a wiphy attribute.
     */
    maxNumSchedScanSsids?: number
    
    /**
     * maximum length of information
     * elements that can be added to a scheduled scan request
     */
    maxSchedScanIeLen?: number
    
    /**
     * rates per to be advertised as supported in scan,
     * nested array attribute containing an entry for each band, with the entry
     * being a list of supported rates as defined by IEEE 802.11 7.3.2.2 but
     * without the length restriction (at most %NL80211_MAX_SUPP_RATES).
     */
    scanSuppRates?: Buffer[]
    
    /**
     * indicates whether SSID is to be hidden from Beacon
     * and Probe Response (when response to wildcard Probe Request); see
     * &enum nl80211_hidden_ssid, represented as a u32
     */
    hiddenSsid?: HiddenSsid | keyof typeof HiddenSsid
    
    /**
     * Information element(s) for Probe Response frame.
     * This is used with %NL80211_CMD_NEW_BEACON and %NL80211_CMD_SET_BEACON to
     * provide extra IEs (e.g., WPS/P2P IE) into Probe Response frames when the
     * driver (or firmware) replies to Probe Request frames.
     */
    ieProbeResp?: Buffer
    
    /**
     * Information element(s) for (Re)Association
     * Response frames. This is used with %NL80211_CMD_NEW_BEACON and
     * %NL80211_CMD_SET_BEACON to provide extra IEs (e.g., WPS/P2P IE) into
     * (Re)Association Response frames when the driver (or firmware) replies to
     * (Re)Association Request frames.
     */
    ieAssocResp?: Buffer
    
    /**
     * Nested attribute containing the wme configuration
     * of the station, see &enum nl80211_sta_wme_attr.
     */
    staWme?: StationWme
    
    /**
     * the device supports uapsd when working
     * as AP.
     */
    supportApUapsd?: true
    
    /**
     * Indicates whether the firmware is capable of
     * roaming to another AP in the same ESS if the signal lever is low.
     */
    roamSupport?: true
    
    /**
     * Nested attribute with one or more
     * sets of attributes to match during scheduled scans.  Only BSSs
     * that match any of the sets will be reported.  These are
     * pass-thru filter rules.
     * For a match to succeed, the BSS must match all attributes of a
     * set.  Since not every hardware supports matching all types of
     * attributes, there is no guarantee that the reported BSSs are
     * fully complying with the match sets and userspace needs to be
     * able to ignore them by itself.
     * Thus, the implementation is somewhat hardware-dependent, but
     * this is only an optimization and the userspace application
     * needs to handle all the non-filtered results anyway.
     * If the match attributes don't make sense when combined with
     * the values passed in @NL80211_ATTR_SCAN_SSIDS (eg. if an SSID
     * is included in the probe request, but the match attributes
     * will never let it go through), -EINVAL may be returned.
     * If omitted, no filtering is done.
     */
    schedScanMatch?: Buffer[]
    
    /**
     * maximum number of sets that can be
     * used with @NL80211_ATTR_SCHED_SCAN_MATCH, a wiphy attribute.
     */
    maxMatchSets?: number
    
    /**
     * Nested attribute containing the PMKSA caching
     * candidate information, see &enum nl80211_pmksa_candidate_attr.
     */
    pmksaCandidate?: PmksaCandidate
    
    /**
     * Indicates whether to use CCK rate or not
     * for management frames transmission. In order to avoid p2p probe/action
     * frames are being transmitted at CCK rate in 2GHz band, the user space
     * applications use this attribute.
     * This attribute is used with %NL80211_CMD_TRIGGER_SCAN and
     * %NL80211_CMD_FRAME commands.
     */
    txNoCckRate?: Buffer
    
    /**
     * Low level TDLS action code (e.g. link setup
     * request, link setup confirm, link teardown, etc.). Values are
     * described in the TDLS (802.11z) specification.
     */
    tdlsAction?: Buffer
    
    /**
     * Non-zero token for uniquely identifying a
     * TDLS conversation between two devices.
     */
    tdlsDialogToken?: Buffer
    
    /**
     * High level TDLS operation; see
     * &enum nl80211_tdls_operation, represented as a u8.
     */
    tdlsOperation?: TdlsOperation | keyof typeof TdlsOperation
    
    /**
     * A flag indicating the device can operate
     * as a TDLS peer sta.
     */
    tdlsSupport?: true
    
    /**
     * The TDLS discovery/setup and teardown
     * procedures should be performed by sending TDLS packets via
     * %NL80211_CMD_TDLS_MGMT. Otherwise %NL80211_CMD_TDLS_OPER should be
     * used for asking the driver to perform a TDLS operation.
     */
    tdlsExternalSetup?: Buffer
    
    /**
     * This u32 attribute may be listed for devices
     * that have AP support to indicate that they have the AP SME integrated
     * with support for the features listed in this attribute, see
     * &enum nl80211_ap_sme_features.
     */
    deviceApSme?: number
    
    /**
     * Used with %NL80211_CMD_FRAME, this tells
     * the driver to not wait for an acknowledgement. Note that due to this,
     * it will also not give a status callback nor return a cookie. This is
     * mostly useful for probe responses to save airtime.
     */
    dontWaitForAck?: true
    
    /**
     * This u32 attribute contains flags from
     * &enum nl80211_feature_flags and is advertised in wiphy information.
     */
    featureFlags?: FeatureFlags
    
    /**
     * Indicates that the HW responds to probe
     * requests while operating in AP-mode.
     * This attribute holds a bitmap of the supported protocols for
     * offloading (see &enum nl80211_probe_resp_offload_support_attr).
     */
    probeRespOffload?: Buffer
    
    /**
     * Probe Response template data. Contains the entire
     * probe-response frame. The DA field in the 802.11 header is zero-ed out,
     * to be filled by the FW.
     */
    probeResp?: Buffer
    
    /**
     * region for regulatory rules which this country
     * abides to when initiating radiation on DFS channels. A country maps
     * to one DFS region.
     */
    dfsRegion?: number
    
    /**
     * Force HT capable interfaces to disable
     * this feature.  Currently, only supported in mac80211 drivers.
     */
    disableHt?: true
    
    /**
     * Specify which bits of the
     * ATTR_HT_CAPABILITY to which attention should be paid.
     * Currently, only mac80211 NICs support this feature.
     * The values that may be configured are:
     * MCS rates, MAX-AMSDU, HT-20-40 and HT_CAP_SGI_40
     * AMPDU density and AMPDU factor.
     * All values are treated as suggestions and may be ignored
     * by the driver as required.  The actual values may be seen in
     * the station debugfs ht_caps file.
     */
    htCapabilityMask?: Buffer
    
    /**
     * This u16 bitmap contains the No Ack Policy of
     * up to 16 TIDs.
     */
    noackMap?: number
    
    /**
     * timeout value in seconds, this can be
     * used by the drivers which has MLME in firmware and does not have support
     * to report per station tx/rx activity to free up the station entry from
     * the list. This needs to be used when the driver advertises the
     * capability to timeout the stations.
     */
    inactivityTimeout?: number
    
    /**
     * signal strength in dBm (as a 32-bit int);
     * this attribute is (depending on the driver capabilities) added to
     * received frames indicated with %NL80211_CMD_FRAME.
     */
    rxSignalDbm?: number
    
    /**
     * Background scan period in seconds
     * or 0 to disable background scan.
     */
    bgScanPeriod?: Buffer
    
    /**
     * wireless device identifier, used for pseudo-devices
     * that don't have a netdev (u64)
     */
    wdev?: bigint
    
    /**
     * type of regulatory hint passed from
     * userspace. If unset it is assumed the hint comes directly from
     * a user. If set code could specify exactly what type of source
     * was used to provide the hint. For the different types of
     * allowed user regulatory hints see nl80211_user_reg_hint_type.
     */
    userRegHintType?: Buffer
    
    /**
     * The reason for which AP has rejected
     * the connection request from a station. nl80211_connect_failed_reason
     * enum has different reasons of connection failure.
     */
    connFailedReason?: Buffer
    
    /**
     * Fields and elements in Authentication frames.
     * This contains the authentication frame body (non-IE and IE data),
     * excluding the Authentication algorithm number, i.e., starting at the
     * Authentication transaction sequence number field. It is used with
     * authentication algorithms that need special fields to be added into
     * the frames (SAE and FILS). Currently, only the SAE cases use the
     * initial two fields (Authentication transaction sequence number and
     * Status code). However, those fields are included in the attribute data
     * for all authentication algorithms to keep the attribute definition
     * consistent.
     */
    authData?: Buffer
    
    /**
     * VHT Capability information element (from
     * association request when used with NL80211_CMD_NEW_STATION)
     */
    vhtCapability?: Buffer
    
    /** scan request control flags (u32) */
    scanFlags?: number
    
    /**
     * u32 attribute containing one of the values
     * of &enum nl80211_chan_width, describing the channel width. See the
     * documentation of the enum for more information.
     */
    channelWidth?: ChannelWidth | keyof typeof ChannelWidth
    
    /**
     * Center frequency of the first part of the
     * channel, used for anything but 20 MHz bandwidth
     */
    centerFreq1?: number
    
    /**
     * Center frequency of the second part of the
     * channel, used only for 80+80 MHz bandwidth
     */
    centerFreq2?: number
    
    /**
     * P2P GO Client Traffic Window (u8), used with
     * the START_AP and SET_BSS commands
     */
    p2pCtwindow?: number
    
    /**
     * P2P GO opportunistic PS (u8), used with the
     * START_AP and SET_BSS commands. This can have the values 0 or 1;
     * if not given in START_AP 0 is assumed, if not given in SET_BSS
     * no change is made.
     */
    p2pOppps?: number
    
    /**
     * local mesh STA link-specific power mode
     * defined in &enum nl80211_mesh_power_mode.
     */
    localMeshPowerMode?: MeshPowerMode | keyof typeof MeshPowerMode
    
    /**
     * ACL policy, see &enum nl80211_acl_policy,
     * carried in a u32 attribute
     */
    aclPolicy?: AclPolicy | keyof typeof AclPolicy
    
    /**
     * Array of nested MAC addresses, used for
     * MAC ACL.
     */
    macAddrs?: Buffer[]
    
    /**
     * u32 attribute to advertise the maximum
     * number of MAC addresses that a device can support for MAC
     * ACL.
     */
    macAclMax?: number
    
    /**
     * Type of radar event for notification to userspace,
     * contains a value of enum nl80211_radar_event (u32).
     */
    radarEvent?: RadarEvent | keyof typeof RadarEvent
    
    /**
     * 802.11 extended capabilities that the kernel driver
     * has and handles. The format is the same as the IE contents. See
     * 802.11-2012 8.4.2.29 for more information.
     */
    extCapa?: Buffer
    
    /**
     * Extended capabilities that the kernel driver
     * has set in the %NL80211_ATTR_EXT_CAPA value, for multibit fields.
     */
    extCapaMask?: Buffer
    
    /**
     * Station capabilities (u16) are advertised to
     * the driver, e.g., to enable TDLS power save (PU-APSD).
     */
    staCapability?: number
    
    /**
     * Station extended capabilities are
     * advertised to the driver, e.g., to enable TDLS off channel operations
     * and PU-APSD.
     */
    staExtCapability?: Buffer
    
    /**
     * global nl80211 feature flags, see
     * &enum nl80211_protocol_features, the attribute is a u32.
     */
    protocolFeatures?: ProtocolFeatures
    
    /**
     * flag attribute, userspace supports
     * receiving the data for a single wiphy split across multiple
     * messages, given with wiphy dump message
     */
    splitWiphyDump?: true
    
    disableVht?: true
    
    vhtCapabilityMask?: Buffer
    
    /** Mobility Domain Identifier */
    mdid?: Buffer
    
    /**
     * Resource Information Container Information
     * Element
     */
    ieRic?: Buffer
    
    /**
     * critical protocol identifier requiring increased
     * reliability, see &enum nl80211_crit_proto_id (u16).
     */
    critProtId?: CritProtoId | keyof typeof CritProtoId
    
    /**
     * duration in milliseconds in which
     * the connection should have increased reliability (u16).
     */
    maxCritProtDuration?: number
    
    /**
     * Association ID for the peer TDLS station (u16).
     * This is similar to @NL80211_ATTR_STA_AID but with a difference of being
     * allowed to be used with the first @NL80211_CMD_SET_STATION command to
     * update a TDLS peer STA entry.
     */
    peerAid?: number
    
    /** Coalesce rule information. */
    coalesceRule?: Buffer
    
    /**
     * u32 attribute specifying the number of TBTT's
     * until the channel switch event.
     */
    chSwitchCount?: number
    
    /**
     * flag attribute specifying that transmission
     * must be blocked on the current channel (before the channel switch
     * operation).
     */
    chSwitchBlockTx?: true
    
    /**
     * Nested set of attributes containing the IE information
     * for the time while performing a channel switch.
     */
    csaIes?: Buffer
    
    /**
     * An array of offsets (u16) to the channel
     * switch counters in the beacons tail (%NL80211_ATTR_BEACON_TAIL).
     */
    csaCOffBeacon?: number
    
    /**
     * An array of offsets (u16) to the channel
     * switch counters in the probe response (%NL80211_ATTR_PROBE_RESP).
     */
    csaCOffPresp?: number
    
    /**
     * flags for nl80211_send_mgmt(), u32.
     * As specified in the &enum nl80211_rxmgmt_flags.
     */
    rxmgmtFlags?: RxmgmtFlags
    
    /** array of supported channels. */
    staSupportedChannels?: Buffer
    
    /**
     * array of supported
     * supported operating classes.
     */
    staSupportedOperClasses?: Buffer
    
    /**
     * A flag indicating whether user space
     * controls DFS operation in IBSS mode. If the flag is included in
     * %NL80211_CMD_JOIN_IBSS request, the driver will allow use of DFS
     * channels and reports radar events to userspace. Userspace is required
     * to react to radar events, e.g. initiate a channel switch or leave the
     * IBSS network.
     */
    handleDfs?: true
    
    /**
     * A flag indicating that the device supports
     * 5 MHz channel bandwidth.
     */
    support5Mhz?: true
    
    /**
     * A flag indicating that the device supports
     * 10 MHz channel bandwidth.
     */
    support10Mhz?: true
    
    /**
     * Operating mode field from Operating Mode
     * Notification Element based on association request when used with
     * %NL80211_CMD_NEW_STATION or %NL80211_CMD_SET_STATION (only when
     * %NL80211_FEATURE_FULL_AP_CLIENT_STATE is supported, or with TDLS);
     * u8 attribute.
     */
    opmodeNotif?: number
    
    /**
     * The vendor ID, either a 24-bit OUI or, if
     * %NL80211_VENDOR_ID_IS_LINUX is set, a special Linux ID (not used yet)
     */
    vendorId?: number
    
    /** vendor sub-command */
    vendorSubcmd?: number
    
    /**
     * data for the vendor command, if any; this
     * attribute is also used for vendor command feature advertisement
     */
    vendorData?: Buffer
    
    /**
     * used for event list advertising in the wiphy
     * info, containing a nested array of possible events
     */
    vendorEvents?: Buffer
    
    /**
     * IP DSCP mapping for Interworking QoS mapping. This
     * data is in the format defined for the payload of the QoS Map Set element
     * in IEEE Std 802.11-2012, 8.4.2.97.
     */
    qosMap?: Buffer
    
    /** MAC address recommendation as initial BSS */
    macHint?: Buffer
    
    /** frequency of the recommended initial BSS */
    wiphyFreqHint?: Buffer
    
    /**
     * Device attribute that indicates how many
     * associated stations are supported in AP mode (including P2P GO); u32.
     * Since drivers may not have a fixed limit on the maximum number (e.g.,
     * other concurrent operations may affect this), drivers are allowed to
     * advertise values that cannot always be met. In such cases, an attempt
     * to add a new station entry with @NL80211_CMD_NEW_STATION may fail.
     */
    maxApAssocSta?: number
    
    /**
     * flags for TDLS peer capabilities, u32.
     * As specified in the &enum nl80211_tdls_peer_capability.
     */
    tdlsPeerCapability?: TdlsPeerCapability
    
    /**
     * Flag attribute, if set during interface
     * creation then the new interface will be owned by the netlink socket
     * that created it and will be destroyed when the socket is closed.
     * If set during scheduled scan start then the new scan req will be
     * owned by the netlink socket that created it and the scheduled scan will
     * be stopped when the socket is closed.
     * If set during configuration of regulatory indoor operation then the
     * regulatory indoor configuration would be owned by the netlink socket
     * that configured the indoor setting, and the indoor operation would be
     * cleared when the socket is closed.
     * If set during NAN interface creation, the interface will be destroyed
     * if the socket is closed just like any other interface. Moreover, NAN
     * notifications will be sent in unicast to that socket. Without this
     * attribute, the notifications will be sent to the %NL80211_MCGRP_NAN
     * multicast group.
     * If set during %NL80211_CMD_ASSOCIATE or %NL80211_CMD_CONNECT the
     * station will deauthenticate when the socket is closed.
     * If set during %NL80211_CMD_JOIN_IBSS the IBSS will be automatically
     * torn down when the socket is closed.
     * If set during %NL80211_CMD_JOIN_MESH the mesh setup will be
     * automatically torn down when the socket is closed.
     * If set during %NL80211_CMD_START_AP the AP will be automatically
     * disabled when the socket is closed.
     */
    socketOwner?: true
    
    /**
     * An array of csa counter offsets (u16) which
     * should be updated when the frame is transmitted.
     */
    csaCOffsetsTx?: number
    
    /**
     * U8 attribute used to advertise the maximum
     * supported number of csa counters.
     */
    maxCsaCounters?: number
    
    /**
     * flag attribute indicating the current end is
     * the TDLS link initiator.
     */
    tdlsInitiator?: true
    
    /**
     * flag for indicating whether the current connection
     * shall support Radio Resource Measurements (11k). This attribute can be
     * used with %NL80211_CMD_ASSOCIATE and %NL80211_CMD_CONNECT requests.
     * User space applications are expected to use this flag only if the
     * underlying device supports these minimal RRM features:
     * %NL80211_FEATURE_DS_PARAM_SET_IE_IN_PROBES,
     * %NL80211_FEATURE_QUIET,
     * Or, if global RRM is supported, see:
     * %NL80211_EXT_FEATURE_RRM
     * If this flag is used, driver must add the Power Capabilities IE to the
     * association request. In addition, it must also set the RRM capability
     * flag in the association request's Capability Info field.
     */
    useRrm?: true
    
    /**
     * flag attribute used to enable ACK timeout
     * estimation algorithm (dynack). In order to activate dynack
     * %NL80211_FEATURE_ACKTO_ESTIMATION feature flag must be set by lower
     * drivers to indicate dynack capability. Dynack is automatically disabled
     * setting valid value for coverage class.
     */
    wiphyDynAck?: true
    
    /** a TSID value (u8 attribute) */
    tsid?: number
    
    /** user priority value (u8 attribute) */
    userPrio?: number
    
    /**
     * admitted time in units of 32 microseconds
     * (per second) (u16 attribute)
     */
    admittedTime?: number
    
    /**
     * SMPS mode to use (ap mode). see
     * &enum nl80211_smps_mode.
     */
    smpsMode?: Buffer
    
    /** operating class */
    operClass?: Buffer
    
    /** MAC address mask */
    macMask?: Buffer
    
    /**
     * flag attribute indicating this device
     * is self-managing its regulatory information and any regulatory domain
     * obtained from it is coming from the device's wiphy and not the global
     * cfg80211 regdomain.
     */
    wiphySelfManagedReg?: true
    
    /**
     * extended feature flags contained in a byte
     * array. The feature flags are identified by their bit index (see &enum
     * nl80211_ext_feature_index). The bit index is ordered starting at the
     * least-significant bit of the first byte in the array, ie. bit index 0
     * is located at bit 0 of byte 0. bit index 25 would be located at bit 1
     * of byte 3 (u8 array).
     */
    extFeatures?: Buffer
    
    /**
     * Request overall radio statistics to be
     * returned along with other survey data. If set, @NL80211_CMD_GET_SURVEY
     * may return a survey entry without a channel indicating global radio
     * statistics (only some values are valid and make sense.)
     * For devices that don't return such an entry even then, the information
     * should be contained in the result as the sum of the respective counters
     * over all channels.
     */
    surveyRadioStats?: Buffer
    
    netnsFd?: number
    
    /**
     * delay before the first cycle of a
     * scheduled scan is started.  Or the delay before a WoWLAN
     * net-detect scan is started, counting from the moment the
     * system is suspended.  This value is a u32, in seconds.
     */
    schedScanDelay?: number
    
    /**
     * flag attribute, if set indicates that the device
     * is operating in an indoor environment.
     */
    regIndoor?: true
    
    /**
     * maximum number of scan plans for
     * scheduled scan supported by the device (u32), a wiphy attribute.
     */
    maxNumSchedScanPlans?: number
    
    /**
     * maximum interval (in seconds) for
     * a scan plan (u32), a wiphy attribute.
     */
    maxScanPlanInterval?: number
    
    /**
     * maximum number of iterations in
     * a scan plan (u32), a wiphy attribute.
     */
    maxScanPlanIterations?: number
    
    /**
     * a list of scan plans for scheduled scan.
     * Each scan plan defines the number of scan iterations and the interval
     * between scans. The last scan plan will always run infinitely,
     * thus it must not specify the number of iterations, only the interval
     * between scans. The scan plans are executed sequentially.
     * Each scan plan is a nested attribute of &enum nl80211_sched_scan_plan.
     */
    schedScanPlans?: ScheduledScanPlan
    
    /**
     * flag attribute. If set it means operate
     * in a PBSS. Specified in %NL80211_CMD_CONNECT to request
     * connecting to a PCP, and in %NL80211_CMD_START_AP to start
     * a PCP instead of AP. Relevant for DMG networks only.
     */
    pbss?: true
    
    /**
     * nested attribute for driver supporting the
     * BSS selection feature. When used with %NL80211_CMD_GET_WIPHY it contains
     * attributes according &enum nl80211_bss_select_attr to indicate what
     * BSS selection behaviours are supported. When used with %NL80211_CMD_CONNECT
     * it contains the behaviour-specific attribute containing the parameters for
     * BSS selection to be done by driver and/or firmware.
     */
    bssSelect?: BssSelect
    
    /**
     * whether P2P PS mechanism supported
     * or not. u8, one of the values of &enum nl80211_sta_p2p_ps_status
     */
    staSupportP2pPs?: StationP2pPsStatus | keyof typeof StationP2pPsStatus
    
    /** attribute used for padding for 64-bit alignment */
    pad?: Buffer
    
    /**
     * Nested attribute of the following attributes:
     * %NL80211_ATTR_IFTYPE, %NL80211_ATTR_EXT_CAPA,
     * %NL80211_ATTR_EXT_CAPA_MASK, to specify the extended capabilities per
     * interface type.
     */
    iftypeExtCapa?: Buffer
    
    /**
     * array of 24 bytes that defines a MU-MIMO
     * groupID for monitor mode.
     * The first 8 bytes are a mask that defines the membership in each
     * group (there are 64 groups, group 0 and 63 are reserved),
     * each bit represents a group and set to 1 for being a member in
     * that group and 0 for not being a member.
     * The remaining 16 bytes define the position in each group: 2 bits for
     * each group.
     * (smaller group numbers represented on most significant bits and bigger
     * group numbers on least significant bits.)
     * This attribute is used only if all interfaces are in monitor mode.
     * Set this attribute in order to monitor packets using the given MU-MIMO
     * groupID data.
     * to turn off that feature set all the bits of the groupID to zero.
     */
    muMimoGroupData?: Buffer
    
    /**
     * mac address for the sniffer to follow
     * when using MU-MIMO air sniffer.
     * to turn that feature off set an invalid mac address
     * (e.g. FF:FF:FF:FF:FF:FF)
     */
    muMimoFollowMacAddr?: Buffer
    
    /**
     * The time at which the scan was actually
     * started (u64). The time is the TSF of the BSS the interface that
     * requested the scan is connected to (if available, otherwise this
     * attribute must not be included).
     */
    scanStartTimeTsf?: bigint
    
    /**
     * The BSS according to which
     * %NL80211_ATTR_SCAN_START_TIME_TSF is set.
     */
    scanStartTimeTsfBssid?: Buffer
    
    /**
     * measurement duration in TUs (u16). If
     * %NL80211_ATTR_MEASUREMENT_DURATION_MANDATORY is not set, this is the
     * maximum measurement duration allowed. This attribute is used with
     * measurement requests. It can also be used with %NL80211_CMD_TRIGGER_SCAN
     * if the scan is used for beacon report radio measurement.
     */
    measurementDuration?: number
    
    /**
     * flag attribute that indicates
     * that the duration specified with %NL80211_ATTR_MEASUREMENT_DURATION is
     * mandatory. If this flag is not set, the duration is the maximum duration
     * and the actual measurement duration may be shorter.
     */
    measurementDurationMandatory?: true
    
    /**
     * Association ID for the mesh peer (u16). This is
     * used to pull the stored data for mesh peer in power save state.
     */
    meshPeerAid?: number
    
    /**
     * the master preference to be used by
     * %NL80211_CMD_START_NAN and optionally with
     * %NL80211_CMD_CHANGE_NAN_CONFIG. Its type is u8 and it can't be 0.
     * Also, values 1 and 255 are reserved for certification purposes and
     * should not be used during a normal device operation.
     */
    nanMasterPref?: number
    
    /**
     * operating bands configuration.  This is a u32
     * bitmask of BIT(NL80211_BAND_*) as described in %enum
     * nl80211_band.  For instance, for NL80211_BAND_2GHZ, bit 0
     * would be set.  This attribute is used with
     * %NL80211_CMD_START_NAN and %NL80211_CMD_CHANGE_NAN_CONFIG, and
     * it is optional.  If no bands are set, it means don't-care and
     * the device will decide what to use.
     */
    bands?: BandIdSet
    
    /**
     * a function that can be added to NAN. See
     * &enum nl80211_nan_func_attributes for description of this nested
     * attribute.
     */
    nanFunc?: NanFunction
    
    /**
     * used to report a match. This is a nested attribute.
     * See &enum nl80211_nan_match_attributes.
     */
    nanMatch?: NanMatch
    
    /**
     * KEK for FILS (Re)Association Request/Response frame
     * protection.
     */
    filsKek?: Buffer
    
    /**
     * Nonces (part of AAD) for FILS (Re)Association
     * Request/Response frame protection. This attribute contains the 16 octet
     * STA Nonce followed by 16 octets of AP Nonce.
     */
    filsNonces?: Buffer
    
    /**
     * Indicates whether or not multicast
     * packets should be send out as unicast to all stations (flag attribute).
     */
    multicastToUnicastEnabled?: true
    
    /**
     * The BSSID of the AP. Note that %NL80211_ATTR_MAC is also
     * used in various commands/events for specifying the BSSID.
     */
    bssid?: Buffer
    
    /**
     * Relative RSSI threshold by which
     * other BSSs has to be better or slightly worse than the current
     * connected BSS so that they get reported to user space.
     * This will give an opportunity to userspace to consider connecting to
     * other matching BSSs which have better or slightly worse RSSI than
     * the current connected BSS by using an offloaded operation to avoid
     * unnecessary wakeups.
     */
    schedScanRelativeRssi?: Buffer
    
    /**
     * When present the RSSI level for BSSs in
     * the specified band is to be adjusted before doing
     * %NL80211_ATTR_SCHED_SCAN_RELATIVE_RSSI based comparison to figure out
     * better BSSs. The attribute value is a packed structure
     * value as specified by &struct nl80211_bss_select_rssi_adjust.
     */
    schedScanRssiAdjust?: Buffer
    
    /**
     * The reason for which an operation timed out.
     * u32 attribute with an &enum nl80211_timeout_reason value. This is used,
     * e.g., with %NL80211_CMD_CONNECT event.
     */
    timeoutReason?: TimeoutReason | keyof typeof TimeoutReason
    
    /**
     * EAP Re-authentication Protocol (ERP)
     * username part of NAI used to refer keys rRK and rIK. This is used with
     * %NL80211_CMD_CONNECT.
     */
    filsErpUsername?: Buffer
    
    /**
     * EAP Re-authentication Protocol (ERP) realm part
     * of NAI specifying the domain name of the ER server. This is used with
     * %NL80211_CMD_CONNECT.
     */
    filsErpRealm?: Buffer
    
    /**
     * Unsigned 16-bit ERP next sequence number
     * to use in ERP messages. This is used in generating the FILS wrapped data
     * for FILS authentication and is used with %NL80211_CMD_CONNECT.
     */
    filsErpNextSeqNum?: Buffer
    
    /**
     * ERP re-authentication Root Key (rRK) for the
     * NAI specified by %NL80211_ATTR_FILS_ERP_USERNAME and
     * %NL80211_ATTR_FILS_ERP_REALM. This is used for generating rIK and rMSK
     * from successful FILS authentication and is used with
     * %NL80211_CMD_CONNECT.
     */
    filsErpRrk?: Buffer
    
    /**
     * A 2-octet identifier advertized by a FILS AP
     * identifying the scope of PMKSAs. This is used with
     * @NL80211_CMD_SET_PMKSA and @NL80211_CMD_DEL_PMKSA.
     */
    filsCacheId?: Buffer
    
    /**
     * attribute for passing PMK key material. Used with
     * %NL80211_CMD_SET_PMKSA for the PMKSA identified by %NL80211_ATTR_PMKID.
     * For %NL80211_CMD_CONNECT it is used to provide PSK for offloading 4-way
     * handshake for WPA/WPA2-PSK networks. For 802.1X authentication it is
     * used with %NL80211_CMD_SET_PMK. For offloaded FT support this attribute
     * specifies the PMK-R0 if NL80211_ATTR_PMKR0_NAME is included as well.
     */
    pmk?: Buffer
    
    /**
     * flag attribute which user-space shall use to
     * indicate that it supports multiple active scheduled scan requests.
     */
    schedScanMulti?: true
    
    /**
     * indicates maximum number of scheduled
     * scan request that may be active for the device (u32).
     */
    schedScanMaxReqs?: number
    
    /**
     * flag attribute which user-space can include
     * in %NL80211_CMD_CONNECT to indicate that for 802.1X authentication it
     * wants to use the supported offload of the 4-way handshake.
     */
    want1x4wayHs?: true
    
    /** PMK-R0 Name for offloaded FT. */
    pmkr0Name?: Buffer
    
    /** (reserved) */
    portAuthorized?: Buffer
    
    /**
     * Identify the requested external
     * authentication operation (u32 attribute with an
     * &enum nl80211_external_auth_action value). This is used with the
     * %NL80211_CMD_EXTERNAL_AUTH request event.
     */
    externalAuthAction?: ExternalAuthAction | keyof typeof ExternalAuthAction
    
    /**
     * Flag attribute indicating that the user
     * space supports external authentication. This attribute shall be used
     * with %NL80211_CMD_CONNECT and %NL80211_CMD_START_AP request. The driver
     * may offload authentication processing to user space if this capability
     * is indicated in the respective requests from the user space.
     */
    externalAuthSupport?: true
    
    /**
     * Station's New/updated  RX_NSS value notified using this
     * u8 attribute. This is used with %NL80211_CMD_STA_OPMODE_CHANGED.
     */
    nss?: number
    
    ackSignal?: Buffer
    
    /**
     * A flag indicating whether control
     * port frames (e.g. of type given in %NL80211_ATTR_CONTROL_PORT_ETHERTYPE)
     * will be sent directly to the network interface or sent via the NL80211
     * socket.  If this attribute is missing, then legacy behavior of sending
     * control port frames directly to the network interface is used.  If the
     * flag is included, then control port frames are sent over NL80211 instead
     * using %CMD_CONTROL_PORT_FRAME.  If control port routing over NL80211 is
     * to be used then userspace must also use the %NL80211_ATTR_SOCKET_OWNER
     * flag.
     */
    controlPortOverNl80211?: true
    
    /**
     * TXQ statistics (nested attribute, see &enum
     * nl80211_txq_stats)
     */
    txqStats?: TxqStats
    
    /**
     * Total packet limit for the TXQ queues for this phy.
     * The smaller of this and the memory limit is enforced.
     */
    txqLimit?: number
    
    /**
     * Total memory memory limit (in bytes) for the
     * TXQ queues for this phy. The smaller of this and the packet limit is
     * enforced.
     */
    txqMemoryLimit?: number
    
    /**
     * TXQ scheduler quantum (bytes). Number of bytes
     * a flow is assigned on each round of the DRR scheduler.
     */
    txqQuantum?: number
    
    /**
     * HE Capability information element (from
     * association request when used with NL80211_CMD_NEW_STATION). Can be set
     * only if %NL80211_STA_FLAG_WME is set.
     */
    heCapability?: Buffer
    
    /**
     * nested attribute which user-space can include
     * in %NL80211_CMD_START_AP or %NL80211_CMD_SET_BEACON for fine timing
     * measurement (FTM) responder functionality and containing parameters as
     * possible, see &enum nl80211_ftm_responder_attr
     */
    ftmResponder?: Buffer
    
    /**
     * Nested attribute with FTM responder
     * statistics, see &enum nl80211_ftm_responder_stats.
     */
    ftmResponderStats?: FtmResponderStats
    
    /**
     * Timeout for the given operation in milliseconds (u32),
     * if the attribute is not given no timeout is requested. Note that 0 is an
     * invalid value.
     */
    timeout?: number
    
    /**
     * peer measurements request (and result)
     * data, uses nested attributes specified in
     * &enum nl80211_peer_measurement_attrs.
     * This is also used for capability advertisement in the wiphy information,
     * with the appropriate sub-attributes.
     */
    peerMeasurements?: PeerMeasurement
    
    /**
     * Station's weight when scheduled by the airtime
     * scheduler.
     */
    airtimeWeight?: number
    
    /**
     * Transmit power setting type (u8) for
     * station associated with the AP. See &enum nl80211_tx_power_setting for
     * possible values.
     */
    staTxPowerSetting?: TxPowerSetting | keyof typeof TxPowerSetting
    
    /**
     * Transmit power level (s16) in dBm units. This
     * allows to set Tx power for a station. If this attribute is not included,
     * the default per-interface tx power setting will be overriding. Driver
     * should be picking up the lowest tx power, either tx power per-interface
     * or per-station.
     */
    staTxPower?: number
    
    /**
     * attribute for passing SAE password material. It
     * is used with %NL80211_CMD_CONNECT to provide password for offloading
     * SAE authentication for WPA3-Personal networks.
     */
    saePassword?: Buffer
    
    /** Enable target wait time responder support. */
    twtResponder?: Buffer
    
    /**
     * nested attribute for OBSS Packet Detection
     * functionality.
     */
    heObssPd?: Buffer
    
    /**
     * bitmap that indicates the 2.16 GHz
     * channel(s) that are allowed to be used for EDMG transmissions.
     * Defined by IEEE P802.11ay/D4.0 section 9.4.2.251. (u8 attribute)
     */
    wiphyEdmgChannels?: number
    
    /**
     * Channel BW Configuration subfield encodes
     * the allowed channel bandwidth configurations. (u8 attribute)
     * Defined by IEEE P802.11ay/D4.0 section 9.4.2.251, Table 13.
     */
    wiphyEdmgBwConfig?: number
    
    /**
     * VLAN ID (1..4094) for the station and VLAN group key
     * (u16).
     */
    vlanId?: number
}

/** Parses the attributes of a [[Message]] object */
export function parseMessage(r: Buffer): Message {
    return structs.getObject(r, {
        1: (data, obj) => obj.wiphy = structs.getU32(data),
        2: (data, obj) => obj.wiphyName = structs.getString(data),
        3: (data, obj) => obj.ifindex = structs.getU32(data),
        4: (data, obj) => obj.ifname = structs.getString(data),
        5: (data, obj) => obj.iftype = structs.getEnum(InterfaceType, structs.getU32(data)),
        6: (data, obj) => obj.mac = data,
        7: (data, obj) => obj.keyData = data,
        8: (data, obj) => obj.keyIdx = structs.getU8(data),
        9: (data, obj) => obj.keyCipher = structs.getU32(data),
        10: (data, obj) => obj.keySeq = data,
        11: (data, obj) => obj.keyDefault = structs.getFlag(data),
        12: (data, obj) => obj.beaconInterval = structs.getU32(data),
        13: (data, obj) => obj.dtimPeriod = structs.getU32(data),
        14: (data, obj) => obj.beaconHead = data,
        15: (data, obj) => obj.beaconTail = data,
        16: (data, obj) => obj.staAid = structs.getU16(data),
        17: (data, obj) => obj.staFlags = parseStationFlags(data),
        18: (data, obj) => obj.staListenInterval = structs.getU16(data),
        19: (data, obj) => obj.staSupportedRates = data,
        20: (data, obj) => obj.staVlan = structs.getU32(data),
        21: (data, obj) => obj.staInfo = parseStationInfo(data),
        22: (data, obj) => obj.wiphyBands = structs.getArray(data, x => parseBand(x), { zero: true }),
        23: (data, obj) => obj.mntrFlags = parseMonitorFlags(data),
        24: (data, obj) => obj.meshId = data,
        25: (data, obj) => obj.staPlinkAction = structs.getEnum(PlinkAction, structs.getU8(data)),
        26: (data, obj) => obj.mpathNextHop = data,
        27: (data, obj) => obj.mpathInfo = parseMpathInfo(data),
        28: (data, obj) => obj.bssCtsProt = structs.getBool(data),
        29: (data, obj) => obj.bssShortPreamble = structs.getBool(data),
        30: (data, obj) => obj.bssShortSlotTime = structs.getBool(data),
        31: (data, obj) => obj.htCapability = data,
        32: (data, obj) => obj.supportedIftypes = parseInterfaceTypeSetAttr(data),
        33: (data, obj) => obj.regAlpha2 = structs.getString(data),
        34: (data, obj) => obj.regRules = structs.getArray(data, x => parseRegulatoryRule(x)),
        35: (data, obj) => obj.meshConfig = parseMeshconfParams(data),
        36: (data, obj) => obj.bssBasicRates = data,
        37: (data, obj) => obj.wiphyTxqParams = structs.getArray(data, x => parseTxq(x)),
        38: (data, obj) => obj.wiphyFreq = structs.getU32(data),
        39: (data, obj) => obj.wiphyChannelType = structs.getU32(data),
        40: (data, obj) => obj.keyDefaultMgmt = structs.getFlag(data),
        41: (data, obj) => obj.mgmtSubtype = structs.getU8(data),
        42: (data, obj) => obj.ie = data,
        43: (data, obj) => obj.maxNumScanSsids = structs.getU8(data),
        44: (data, obj) => obj.scanFrequencies = data,
        45: (data, obj) => obj.scanSsids = data,
        46: (data, obj) => obj.generation = structs.getU32(data),
        47: (data, obj) => obj.bss = data,
        48: (data, obj) => obj.regInitiator = data,
        49: (data, obj) => obj.regType = structs.getEnum(RegulatoryType, structs.getU8(data)),
        50: (data, obj) => obj.supportedCommands = structs.getArray(data, x => structs.getU32(x)),
        51: (data, obj) => obj.frame = data,
        52: (data, obj) => obj.ssid = data,
        53: (data, obj) => obj.authType = structs.getEnum(AuthType, structs.getU32(data)),
        54: (data, obj) => obj.reasonCode = structs.getU16(data),
        55: (data, obj) => obj.keyType = structs.getEnum(KeyType, structs.getU32(data)),
        56: (data, obj) => obj.maxScanIeLen = structs.getU16(data),
        57: (data, obj) => obj.cipherSuites = data,
        58: (data, obj) => obj.freqBefore = data,
        59: (data, obj) => obj.freqAfter = data,
        60: (data, obj) => obj.freqFixed = structs.getFlag(data),
        61: (data, obj) => obj.wiphyRetryShort = structs.getU8(data),
        62: (data, obj) => obj.wiphyRetryLong = structs.getU8(data),
        63: (data, obj) => obj.wiphyFragThreshold = structs.getU32(data),
        64: (data, obj) => obj.wiphyRtsThreshold = structs.getU32(data),
        65: (data, obj) => obj.timedOut = structs.getFlag(data),
        66: (data, obj) => obj.useMfp = structs.getEnum(Mfp, structs.getU32(data)),
        67: (data, obj) => obj.staFlags2 = data,
        68: (data, obj) => obj.controlPort = structs.getFlag(data),
        69: (data, obj) => obj.testdata = data,
        70: (data, obj) => obj.privacy = structs.getFlag(data),
        71: (data, obj) => obj.disconnectedByAp = structs.getFlag(data),
        72: (data, obj) => obj.statusCode = structs.getU16(data),
        73: (data, obj) => obj.cipherSuitesPairwise = structs.getU32(data),
        74: (data, obj) => obj.cipherSuiteGroup = structs.getU32(data),
        75: (data, obj) => obj.wpaVersions = parseWpaVersions(structs.getU32(data)),
        76: (data, obj) => obj.akmSuites = structs.getU32(data),
        77: (data, obj) => obj.reqIe = data,
        78: (data, obj) => obj.respIe = data,
        79: (data, obj) => obj.prevBssid = data,
        80: (data, obj) => obj.key = data,
        81: (data, obj) => obj.keys = data,
        82: (data, obj) => obj.pid = structs.getU32(data),
        83: (data, obj) => obj._4addr = structs.getU8(data),
        84: (data, obj) => obj.surveyInfo = parseSurveyInfo(data),
        85: (data, obj) => obj.pmkid = data,
        86: (data, obj) => obj.maxNumPmkids = structs.getU8(data),
        87: (data, obj) => obj.duration = structs.getU32(data),
        88: (data, obj) => obj.cookie = structs.getU64(data),
        89: (data, obj) => obj.wiphyCoverageClass = structs.getU8(data),
        90: (data, obj) => obj.txRates = structs.getMap(data, x => parseTxRate(x)),
        91: (data, obj) => obj.frameMatch = data,
        92: (data, obj) => obj.ack = structs.getFlag(data),
        93: (data, obj) => obj.psState = structs.getEnum(PsState, structs.getU32(data)),
        94: (data, obj) => obj.cqm = parseCqm(data),
        95: (data, obj) => obj.localStateChange = structs.getFlag(data),
        96: (data, obj) => obj.apIsolate = structs.getFlag(data),
        97: (data, obj) => obj.wiphyTxPowerSetting = structs.getEnum(TxPowerSetting, structs.getU32(data)),
        98: (data, obj) => obj.wiphyTxPowerLevel = structs.getS32(data),
        99: (data, obj) => obj.txFrameTypes = structs.getArray(data, x => x, { zero: true }),
        100: (data, obj) => obj.rxFrameTypes = structs.getArray(data, x => x, { zero: true }),
        101: (data, obj) => obj.frameType = structs.getU16(data),
        102: (data, obj) => obj.controlPortEthertype = data,
        103: (data, obj) => obj.controlPortNoEncrypt = structs.getFlag(data),
        104: (data, obj) => obj.supportIbssRsn = structs.getFlag(data),
        105: (data, obj) => obj.wiphyAntennaTx = structs.getU32(data),
        106: (data, obj) => obj.wiphyAntennaRx = structs.getU32(data),
        107: (data, obj) => obj.mcastRate = structs.getU32(data),
        108: (data, obj) => obj.offchannelTxOk = structs.getFlag(data),
        109: (data, obj) => obj.bssHtOpmode = structs.getU16(data),
        110: (data, obj) => obj.keyDefaultTypes = parseKeyDefaultTypes(data),
        111: (data, obj) => obj.maxRemainOnChannelDuration = structs.getU32(data),
        112: (data, obj) => obj.meshSetup = data,
        113: (data, obj) => obj.wiphyAntennaAvailTx = structs.getU32(data),
        114: (data, obj) => obj.wiphyAntennaAvailRx = structs.getU32(data),
        115: (data, obj) => obj.supportMeshAuth = structs.getFlag(data),
        116: (data, obj) => obj.staPlinkState = data,
        117: (data, obj) => obj.wowlanTriggers = parseWowlanTriggers(data),
        118: (data, obj) => obj.wowlanTriggersSupported = parseWowlanTriggers(data),
        119: (data, obj) => obj.schedScanInterval = structs.getU32(data),
        120: (data, obj) => obj.interfaceCombinations = structs.getArray(data, x => parseInterfaceCombination(x)),
        121: (data, obj) => obj.softwareIftypes = parseInterfaceTypeSetAttr(data),
        122: (data, obj) => obj.rekeyData = parseRekeyData(data),
        123: (data, obj) => obj.maxNumSchedScanSsids = structs.getU8(data),
        124: (data, obj) => obj.maxSchedScanIeLen = structs.getU16(data),
        125: (data, obj) => obj.scanSuppRates = structs.getArray(data, x => x),
        126: (data, obj) => obj.hiddenSsid = structs.getEnum(HiddenSsid, structs.getU32(data)),
        127: (data, obj) => obj.ieProbeResp = data,
        128: (data, obj) => obj.ieAssocResp = data,
        129: (data, obj) => obj.staWme = parseStationWme(data),
        130: (data, obj) => obj.supportApUapsd = structs.getFlag(data),
        131: (data, obj) => obj.roamSupport = structs.getFlag(data),
        132: (data, obj) => obj.schedScanMatch = structs.getArray(data, x => x),
        133: (data, obj) => obj.maxMatchSets = structs.getU8(data),
        134: (data, obj) => obj.pmksaCandidate = parsePmksaCandidate(data),
        135: (data, obj) => obj.txNoCckRate = data,
        136: (data, obj) => obj.tdlsAction = data,
        137: (data, obj) => obj.tdlsDialogToken = data,
        138: (data, obj) => obj.tdlsOperation = structs.getEnum(TdlsOperation, structs.getU8(data)),
        139: (data, obj) => obj.tdlsSupport = structs.getFlag(data),
        140: (data, obj) => obj.tdlsExternalSetup = data,
        141: (data, obj) => obj.deviceApSme = structs.getU32(data),
        142: (data, obj) => obj.dontWaitForAck = structs.getFlag(data),
        143: (data, obj) => obj.featureFlags = parseFeatureFlags(structs.getU32(data)),
        144: (data, obj) => obj.probeRespOffload = data,
        145: (data, obj) => obj.probeResp = data,
        146: (data, obj) => obj.dfsRegion = structs.getU8(data),
        147: (data, obj) => obj.disableHt = structs.getFlag(data),
        148: (data, obj) => obj.htCapabilityMask = data,
        149: (data, obj) => obj.noackMap = structs.getU16(data),
        150: (data, obj) => obj.inactivityTimeout = structs.getU16(data),
        151: (data, obj) => obj.rxSignalDbm = structs.getU32(data),
        152: (data, obj) => obj.bgScanPeriod = data,
        153: (data, obj) => obj.wdev = structs.getU64(data),
        154: (data, obj) => obj.userRegHintType = data,
        155: (data, obj) => obj.connFailedReason = data,
        156: (data, obj) => obj.authData = data,
        157: (data, obj) => obj.vhtCapability = data,
        158: (data, obj) => obj.scanFlags = structs.getU32(data),
        159: (data, obj) => obj.channelWidth = structs.getEnum(ChannelWidth, structs.getU32(data)),
        160: (data, obj) => obj.centerFreq1 = structs.getU32(data),
        161: (data, obj) => obj.centerFreq2 = structs.getU32(data),
        162: (data, obj) => obj.p2pCtwindow = structs.getU8(data),
        163: (data, obj) => obj.p2pOppps = structs.getU8(data),
        164: (data, obj) => obj.localMeshPowerMode = structs.getEnum(MeshPowerMode, structs.getU32(data)),
        165: (data, obj) => obj.aclPolicy = structs.getEnum(AclPolicy, structs.getU32(data)),
        166: (data, obj) => obj.macAddrs = structs.getArray(data, x => x),
        167: (data, obj) => obj.macAclMax = structs.getU32(data),
        168: (data, obj) => obj.radarEvent = structs.getEnum(RadarEvent, structs.getU32(data)),
        169: (data, obj) => obj.extCapa = data,
        170: (data, obj) => obj.extCapaMask = data,
        171: (data, obj) => obj.staCapability = structs.getU16(data),
        172: (data, obj) => obj.staExtCapability = data,
        173: (data, obj) => obj.protocolFeatures = parseProtocolFeatures(structs.getU32(data)),
        174: (data, obj) => obj.splitWiphyDump = structs.getFlag(data),
        175: (data, obj) => obj.disableVht = structs.getFlag(data),
        176: (data, obj) => obj.vhtCapabilityMask = data,
        177: (data, obj) => obj.mdid = data,
        178: (data, obj) => obj.ieRic = data,
        179: (data, obj) => obj.critProtId = structs.getEnum(CritProtoId, structs.getU16(data)),
        180: (data, obj) => obj.maxCritProtDuration = structs.getU16(data),
        181: (data, obj) => obj.peerAid = structs.getU16(data),
        182: (data, obj) => obj.coalesceRule = data,
        183: (data, obj) => obj.chSwitchCount = structs.getU32(data),
        184: (data, obj) => obj.chSwitchBlockTx = structs.getFlag(data),
        185: (data, obj) => obj.csaIes = data,
        186: (data, obj) => obj.csaCOffBeacon = structs.getU16(data),
        187: (data, obj) => obj.csaCOffPresp = structs.getU16(data),
        188: (data, obj) => obj.rxmgmtFlags = parseRxmgmtFlags(structs.getU32(data)),
        189: (data, obj) => obj.staSupportedChannels = data,
        190: (data, obj) => obj.staSupportedOperClasses = data,
        191: (data, obj) => obj.handleDfs = structs.getFlag(data),
        192: (data, obj) => obj.support5Mhz = structs.getFlag(data),
        193: (data, obj) => obj.support10Mhz = structs.getFlag(data),
        194: (data, obj) => obj.opmodeNotif = structs.getU8(data),
        195: (data, obj) => obj.vendorId = structs.getU32(data),
        196: (data, obj) => obj.vendorSubcmd = structs.getU32(data),
        197: (data, obj) => obj.vendorData = data,
        198: (data, obj) => obj.vendorEvents = data,
        199: (data, obj) => obj.qosMap = data,
        200: (data, obj) => obj.macHint = data,
        201: (data, obj) => obj.wiphyFreqHint = data,
        202: (data, obj) => obj.maxApAssocSta = structs.getU32(data),
        203: (data, obj) => obj.tdlsPeerCapability = parseTdlsPeerCapability(structs.getU32(data)),
        204: (data, obj) => obj.socketOwner = structs.getFlag(data),
        205: (data, obj) => obj.csaCOffsetsTx = structs.getU16(data),
        206: (data, obj) => obj.maxCsaCounters = structs.getU8(data),
        207: (data, obj) => obj.tdlsInitiator = structs.getFlag(data),
        208: (data, obj) => obj.useRrm = structs.getFlag(data),
        209: (data, obj) => obj.wiphyDynAck = structs.getFlag(data),
        210: (data, obj) => obj.tsid = structs.getU8(data),
        211: (data, obj) => obj.userPrio = structs.getU8(data),
        212: (data, obj) => obj.admittedTime = structs.getU16(data),
        213: (data, obj) => obj.smpsMode = data,
        214: (data, obj) => obj.operClass = data,
        215: (data, obj) => obj.macMask = data,
        216: (data, obj) => obj.wiphySelfManagedReg = structs.getFlag(data),
        217: (data, obj) => obj.extFeatures = data,
        218: (data, obj) => obj.surveyRadioStats = data,
        219: (data, obj) => obj.netnsFd = structs.getU32(data),
        220: (data, obj) => obj.schedScanDelay = structs.getU32(data),
        221: (data, obj) => obj.regIndoor = structs.getFlag(data),
        222: (data, obj) => obj.maxNumSchedScanPlans = structs.getU32(data),
        223: (data, obj) => obj.maxScanPlanInterval = structs.getU32(data),
        224: (data, obj) => obj.maxScanPlanIterations = structs.getU32(data),
        225: (data, obj) => obj.schedScanPlans = parseScheduledScanPlan(data),
        226: (data, obj) => obj.pbss = structs.getFlag(data),
        227: (data, obj) => obj.bssSelect = parseBssSelect(data),
        228: (data, obj) => obj.staSupportP2pPs = structs.getEnum(StationP2pPsStatus, structs.getU8(data)),
        229: (data, obj) => obj.pad = data,
        230: (data, obj) => obj.iftypeExtCapa = data,
        231: (data, obj) => obj.muMimoGroupData = data,
        232: (data, obj) => obj.muMimoFollowMacAddr = data,
        233: (data, obj) => obj.scanStartTimeTsf = structs.getU64(data),
        234: (data, obj) => obj.scanStartTimeTsfBssid = data,
        235: (data, obj) => obj.measurementDuration = structs.getU16(data),
        236: (data, obj) => obj.measurementDurationMandatory = structs.getFlag(data),
        237: (data, obj) => obj.meshPeerAid = structs.getU16(data),
        238: (data, obj) => obj.nanMasterPref = structs.getU8(data),
        239: (data, obj) => obj.bands = parseBandIdSet(structs.getU32(data)),
        240: (data, obj) => obj.nanFunc = parseNanFunction(data),
        241: (data, obj) => obj.nanMatch = parseNanMatch(data),
        242: (data, obj) => obj.filsKek = data,
        243: (data, obj) => obj.filsNonces = data,
        244: (data, obj) => obj.multicastToUnicastEnabled = structs.getFlag(data),
        245: (data, obj) => obj.bssid = data,
        246: (data, obj) => obj.schedScanRelativeRssi = data,
        247: (data, obj) => obj.schedScanRssiAdjust = data,
        248: (data, obj) => obj.timeoutReason = structs.getEnum(TimeoutReason, structs.getU32(data)),
        249: (data, obj) => obj.filsErpUsername = data,
        250: (data, obj) => obj.filsErpRealm = data,
        251: (data, obj) => obj.filsErpNextSeqNum = data,
        252: (data, obj) => obj.filsErpRrk = data,
        253: (data, obj) => obj.filsCacheId = data,
        254: (data, obj) => obj.pmk = data,
        255: (data, obj) => obj.schedScanMulti = structs.getFlag(data),
        256: (data, obj) => obj.schedScanMaxReqs = structs.getU32(data),
        257: (data, obj) => obj.want1x4wayHs = structs.getFlag(data),
        258: (data, obj) => obj.pmkr0Name = data,
        259: (data, obj) => obj.portAuthorized = data,
        260: (data, obj) => obj.externalAuthAction = structs.getEnum(ExternalAuthAction, structs.getU32(data)),
        261: (data, obj) => obj.externalAuthSupport = structs.getFlag(data),
        262: (data, obj) => obj.nss = structs.getU8(data),
        263: (data, obj) => obj.ackSignal = data,
        264: (data, obj) => obj.controlPortOverNl80211 = structs.getFlag(data),
        265: (data, obj) => obj.txqStats = parseTxqStats(data),
        266: (data, obj) => obj.txqLimit = structs.getU32(data),
        267: (data, obj) => obj.txqMemoryLimit = structs.getU32(data),
        268: (data, obj) => obj.txqQuantum = structs.getU32(data),
        269: (data, obj) => obj.heCapability = data,
        270: (data, obj) => obj.ftmResponder = data,
        271: (data, obj) => obj.ftmResponderStats = parseFtmResponderStats(data),
        272: (data, obj) => obj.timeout = structs.getU32(data),
        273: (data, obj) => obj.peerMeasurements = parsePeerMeasurement(data),
        274: (data, obj) => obj.airtimeWeight = structs.getU16(data),
        275: (data, obj) => obj.staTxPowerSetting = structs.getEnum(TxPowerSetting, structs.getU8(data)),
        276: (data, obj) => obj.staTxPower = structs.getS16(data),
        277: (data, obj) => obj.saePassword = data,
        278: (data, obj) => obj.twtResponder = data,
        279: (data, obj) => obj.heObssPd = data,
        280: (data, obj) => obj.wiphyEdmgChannels = structs.getU8(data),
        281: (data, obj) => obj.wiphyEdmgBwConfig = structs.getU8(data),
        282: (data, obj) => obj.vlanId = structs.getU16(data),
    })
}

/** Encodes a [[Message]] object into a stream of attributes */
export function formatMessage(x: Message): StreamData {
    return structs.putObject(x, {
        wiphy: (data, obj) => data.push(1, structs.putU32(obj.wiphy!)),
        wiphyName: (data, obj) => data.push(2, structs.putString(obj.wiphyName!)),
        ifindex: (data, obj) => data.push(3, structs.putU32(obj.ifindex!)),
        ifname: (data, obj) => data.push(4, structs.putString(obj.ifname!)),
        iftype: (data, obj) => data.push(5, structs.putU32(structs.putEnum(InterfaceType, obj.iftype!))),
        mac: (data, obj) => data.push(6, obj.mac!),
        keyData: (data, obj) => data.push(7, obj.keyData!),
        keyIdx: (data, obj) => data.push(8, structs.putU8(obj.keyIdx!)),
        keyCipher: (data, obj) => data.push(9, structs.putU32(obj.keyCipher!)),
        keySeq: (data, obj) => data.push(10, obj.keySeq!),
        keyDefault: (data, obj) => data.push(11, structs.putFlag(obj.keyDefault!)),
        beaconInterval: (data, obj) => data.push(12, structs.putU32(obj.beaconInterval!)),
        dtimPeriod: (data, obj) => data.push(13, structs.putU32(obj.dtimPeriod!)),
        beaconHead: (data, obj) => data.push(14, obj.beaconHead!),
        beaconTail: (data, obj) => data.push(15, obj.beaconTail!),
        staAid: (data, obj) => data.push(16, structs.putU16(obj.staAid!)),
        staFlags: (data, obj) => data.push(17, formatStationFlags(obj.staFlags!)),
        staListenInterval: (data, obj) => data.push(18, structs.putU16(obj.staListenInterval!)),
        staSupportedRates: (data, obj) => data.push(19, obj.staSupportedRates!),
        staVlan: (data, obj) => data.push(20, structs.putU32(obj.staVlan!)),
        staInfo: (data, obj) => data.push(21, formatStationInfo(obj.staInfo!)),
        wiphyBands: (data, obj) => data.push(22, structs.putArray(obj.wiphyBands!, x => formatBand(x), { zero: true })),
        mntrFlags: (data, obj) => data.push(23, formatMonitorFlags(obj.mntrFlags!)),
        meshId: (data, obj) => data.push(24, obj.meshId!),
        staPlinkAction: (data, obj) => data.push(25, structs.putU8(structs.putEnum(PlinkAction, obj.staPlinkAction!))),
        mpathNextHop: (data, obj) => data.push(26, obj.mpathNextHop!),
        mpathInfo: (data, obj) => data.push(27, formatMpathInfo(obj.mpathInfo!)),
        bssCtsProt: (data, obj) => data.push(28, structs.putBool(obj.bssCtsProt!)),
        bssShortPreamble: (data, obj) => data.push(29, structs.putBool(obj.bssShortPreamble!)),
        bssShortSlotTime: (data, obj) => data.push(30, structs.putBool(obj.bssShortSlotTime!)),
        htCapability: (data, obj) => data.push(31, obj.htCapability!),
        supportedIftypes: (data, obj) => data.push(32, formatInterfaceTypeSetAttr(obj.supportedIftypes!)),
        regAlpha2: (data, obj) => data.push(33, structs.putString(obj.regAlpha2!)),
        regRules: (data, obj) => data.push(34, structs.putArray(obj.regRules!, x => formatRegulatoryRule(x))),
        meshConfig: (data, obj) => data.push(35, formatMeshconfParams(obj.meshConfig!)),
        bssBasicRates: (data, obj) => data.push(36, obj.bssBasicRates!),
        wiphyTxqParams: (data, obj) => data.push(37, structs.putArray(obj.wiphyTxqParams!, x => formatTxq(x))),
        wiphyFreq: (data, obj) => data.push(38, structs.putU32(obj.wiphyFreq!)),
        wiphyChannelType: (data, obj) => data.push(39, structs.putU32(obj.wiphyChannelType!)),
        keyDefaultMgmt: (data, obj) => data.push(40, structs.putFlag(obj.keyDefaultMgmt!)),
        mgmtSubtype: (data, obj) => data.push(41, structs.putU8(obj.mgmtSubtype!)),
        ie: (data, obj) => data.push(42, obj.ie!),
        maxNumScanSsids: (data, obj) => data.push(43, structs.putU8(obj.maxNumScanSsids!)),
        scanFrequencies: (data, obj) => data.push(44, obj.scanFrequencies!),
        scanSsids: (data, obj) => data.push(45, obj.scanSsids!),
        generation: (data, obj) => data.push(46, structs.putU32(obj.generation!)),
        bss: (data, obj) => data.push(47, obj.bss!),
        regInitiator: (data, obj) => data.push(48, obj.regInitiator!),
        regType: (data, obj) => data.push(49, structs.putU8(structs.putEnum(RegulatoryType, obj.regType!))),
        supportedCommands: (data, obj) => data.push(50, structs.putArray(obj.supportedCommands!, x => structs.putU32(x))),
        frame: (data, obj) => data.push(51, obj.frame!),
        ssid: (data, obj) => data.push(52, obj.ssid!),
        authType: (data, obj) => data.push(53, structs.putU32(structs.putEnum(AuthType, obj.authType!))),
        reasonCode: (data, obj) => data.push(54, structs.putU16(obj.reasonCode!)),
        keyType: (data, obj) => data.push(55, structs.putU32(structs.putEnum(KeyType, obj.keyType!))),
        maxScanIeLen: (data, obj) => data.push(56, structs.putU16(obj.maxScanIeLen!)),
        cipherSuites: (data, obj) => data.push(57, obj.cipherSuites!),
        freqBefore: (data, obj) => data.push(58, obj.freqBefore!),
        freqAfter: (data, obj) => data.push(59, obj.freqAfter!),
        freqFixed: (data, obj) => data.push(60, structs.putFlag(obj.freqFixed!)),
        wiphyRetryShort: (data, obj) => data.push(61, structs.putU8(obj.wiphyRetryShort!)),
        wiphyRetryLong: (data, obj) => data.push(62, structs.putU8(obj.wiphyRetryLong!)),
        wiphyFragThreshold: (data, obj) => data.push(63, structs.putU32(obj.wiphyFragThreshold!)),
        wiphyRtsThreshold: (data, obj) => data.push(64, structs.putU32(obj.wiphyRtsThreshold!)),
        timedOut: (data, obj) => data.push(65, structs.putFlag(obj.timedOut!)),
        useMfp: (data, obj) => data.push(66, structs.putU32(structs.putEnum(Mfp, obj.useMfp!))),
        staFlags2: (data, obj) => data.push(67, obj.staFlags2!),
        controlPort: (data, obj) => data.push(68, structs.putFlag(obj.controlPort!)),
        testdata: (data, obj) => data.push(69, obj.testdata!),
        privacy: (data, obj) => data.push(70, structs.putFlag(obj.privacy!)),
        disconnectedByAp: (data, obj) => data.push(71, structs.putFlag(obj.disconnectedByAp!)),
        statusCode: (data, obj) => data.push(72, structs.putU16(obj.statusCode!)),
        cipherSuitesPairwise: (data, obj) => data.push(73, structs.putU32(obj.cipherSuitesPairwise!)),
        cipherSuiteGroup: (data, obj) => data.push(74, structs.putU32(obj.cipherSuiteGroup!)),
        wpaVersions: (data, obj) => data.push(75, structs.putU32(formatWpaVersions(obj.wpaVersions!))),
        akmSuites: (data, obj) => data.push(76, structs.putU32(obj.akmSuites!)),
        reqIe: (data, obj) => data.push(77, obj.reqIe!),
        respIe: (data, obj) => data.push(78, obj.respIe!),
        prevBssid: (data, obj) => data.push(79, obj.prevBssid!),
        key: (data, obj) => data.push(80, obj.key!),
        keys: (data, obj) => data.push(81, obj.keys!),
        pid: (data, obj) => data.push(82, structs.putU32(obj.pid!)),
        _4addr: (data, obj) => data.push(83, structs.putU8(obj._4addr!)),
        surveyInfo: (data, obj) => data.push(84, formatSurveyInfo(obj.surveyInfo!)),
        pmkid: (data, obj) => data.push(85, obj.pmkid!),
        maxNumPmkids: (data, obj) => data.push(86, structs.putU8(obj.maxNumPmkids!)),
        duration: (data, obj) => data.push(87, structs.putU32(obj.duration!)),
        cookie: (data, obj) => data.push(88, structs.putU64(obj.cookie!)),
        wiphyCoverageClass: (data, obj) => data.push(89, structs.putU8(obj.wiphyCoverageClass!)),
        txRates: (data, obj) => data.push(90, structs.putMap(obj.txRates!, x => formatTxRate(x))),
        frameMatch: (data, obj) => data.push(91, obj.frameMatch!),
        ack: (data, obj) => data.push(92, structs.putFlag(obj.ack!)),
        psState: (data, obj) => data.push(93, structs.putU32(structs.putEnum(PsState, obj.psState!))),
        cqm: (data, obj) => data.push(94, formatCqm(obj.cqm!)),
        localStateChange: (data, obj) => data.push(95, structs.putFlag(obj.localStateChange!)),
        apIsolate: (data, obj) => data.push(96, structs.putFlag(obj.apIsolate!)),
        wiphyTxPowerSetting: (data, obj) => data.push(97, structs.putU32(structs.putEnum(TxPowerSetting, obj.wiphyTxPowerSetting!))),
        wiphyTxPowerLevel: (data, obj) => data.push(98, structs.putS32(obj.wiphyTxPowerLevel!)),
        txFrameTypes: (data, obj) => data.push(99, structs.putArray(obj.txFrameTypes!, x => x, { zero: true })),
        rxFrameTypes: (data, obj) => data.push(100, structs.putArray(obj.rxFrameTypes!, x => x, { zero: true })),
        frameType: (data, obj) => data.push(101, structs.putU16(obj.frameType!)),
        controlPortEthertype: (data, obj) => data.push(102, obj.controlPortEthertype!),
        controlPortNoEncrypt: (data, obj) => data.push(103, structs.putFlag(obj.controlPortNoEncrypt!)),
        supportIbssRsn: (data, obj) => data.push(104, structs.putFlag(obj.supportIbssRsn!)),
        wiphyAntennaTx: (data, obj) => data.push(105, structs.putU32(obj.wiphyAntennaTx!)),
        wiphyAntennaRx: (data, obj) => data.push(106, structs.putU32(obj.wiphyAntennaRx!)),
        mcastRate: (data, obj) => data.push(107, structs.putU32(obj.mcastRate!)),
        offchannelTxOk: (data, obj) => data.push(108, structs.putFlag(obj.offchannelTxOk!)),
        bssHtOpmode: (data, obj) => data.push(109, structs.putU16(obj.bssHtOpmode!)),
        keyDefaultTypes: (data, obj) => data.push(110, formatKeyDefaultTypes(obj.keyDefaultTypes!)),
        maxRemainOnChannelDuration: (data, obj) => data.push(111, structs.putU32(obj.maxRemainOnChannelDuration!)),
        meshSetup: (data, obj) => data.push(112, obj.meshSetup!),
        wiphyAntennaAvailTx: (data, obj) => data.push(113, structs.putU32(obj.wiphyAntennaAvailTx!)),
        wiphyAntennaAvailRx: (data, obj) => data.push(114, structs.putU32(obj.wiphyAntennaAvailRx!)),
        supportMeshAuth: (data, obj) => data.push(115, structs.putFlag(obj.supportMeshAuth!)),
        staPlinkState: (data, obj) => data.push(116, obj.staPlinkState!),
        wowlanTriggers: (data, obj) => data.push(117, formatWowlanTriggers(obj.wowlanTriggers!)),
        wowlanTriggersSupported: (data, obj) => data.push(118, formatWowlanTriggers(obj.wowlanTriggersSupported!)),
        schedScanInterval: (data, obj) => data.push(119, structs.putU32(obj.schedScanInterval!)),
        interfaceCombinations: (data, obj) => data.push(120, structs.putArray(obj.interfaceCombinations!, x => formatInterfaceCombination(x))),
        softwareIftypes: (data, obj) => data.push(121, formatInterfaceTypeSetAttr(obj.softwareIftypes!)),
        rekeyData: (data, obj) => data.push(122, formatRekeyData(obj.rekeyData!)),
        maxNumSchedScanSsids: (data, obj) => data.push(123, structs.putU8(obj.maxNumSchedScanSsids!)),
        maxSchedScanIeLen: (data, obj) => data.push(124, structs.putU16(obj.maxSchedScanIeLen!)),
        scanSuppRates: (data, obj) => data.push(125, structs.putArray(obj.scanSuppRates!, x => x)),
        hiddenSsid: (data, obj) => data.push(126, structs.putU32(structs.putEnum(HiddenSsid, obj.hiddenSsid!))),
        ieProbeResp: (data, obj) => data.push(127, obj.ieProbeResp!),
        ieAssocResp: (data, obj) => data.push(128, obj.ieAssocResp!),
        staWme: (data, obj) => data.push(129, formatStationWme(obj.staWme!)),
        supportApUapsd: (data, obj) => data.push(130, structs.putFlag(obj.supportApUapsd!)),
        roamSupport: (data, obj) => data.push(131, structs.putFlag(obj.roamSupport!)),
        schedScanMatch: (data, obj) => data.push(132, structs.putArray(obj.schedScanMatch!, x => x)),
        maxMatchSets: (data, obj) => data.push(133, structs.putU8(obj.maxMatchSets!)),
        pmksaCandidate: (data, obj) => data.push(134, formatPmksaCandidate(obj.pmksaCandidate!)),
        txNoCckRate: (data, obj) => data.push(135, obj.txNoCckRate!),
        tdlsAction: (data, obj) => data.push(136, obj.tdlsAction!),
        tdlsDialogToken: (data, obj) => data.push(137, obj.tdlsDialogToken!),
        tdlsOperation: (data, obj) => data.push(138, structs.putU8(structs.putEnum(TdlsOperation, obj.tdlsOperation!))),
        tdlsSupport: (data, obj) => data.push(139, structs.putFlag(obj.tdlsSupport!)),
        tdlsExternalSetup: (data, obj) => data.push(140, obj.tdlsExternalSetup!),
        deviceApSme: (data, obj) => data.push(141, structs.putU32(obj.deviceApSme!)),
        dontWaitForAck: (data, obj) => data.push(142, structs.putFlag(obj.dontWaitForAck!)),
        featureFlags: (data, obj) => data.push(143, structs.putU32(formatFeatureFlags(obj.featureFlags!))),
        probeRespOffload: (data, obj) => data.push(144, obj.probeRespOffload!),
        probeResp: (data, obj) => data.push(145, obj.probeResp!),
        dfsRegion: (data, obj) => data.push(146, structs.putU8(obj.dfsRegion!)),
        disableHt: (data, obj) => data.push(147, structs.putFlag(obj.disableHt!)),
        htCapabilityMask: (data, obj) => data.push(148, obj.htCapabilityMask!),
        noackMap: (data, obj) => data.push(149, structs.putU16(obj.noackMap!)),
        inactivityTimeout: (data, obj) => data.push(150, structs.putU16(obj.inactivityTimeout!)),
        rxSignalDbm: (data, obj) => data.push(151, structs.putU32(obj.rxSignalDbm!)),
        bgScanPeriod: (data, obj) => data.push(152, obj.bgScanPeriod!),
        wdev: (data, obj) => data.push(153, structs.putU64(obj.wdev!)),
        userRegHintType: (data, obj) => data.push(154, obj.userRegHintType!),
        connFailedReason: (data, obj) => data.push(155, obj.connFailedReason!),
        authData: (data, obj) => data.push(156, obj.authData!),
        vhtCapability: (data, obj) => data.push(157, obj.vhtCapability!),
        scanFlags: (data, obj) => data.push(158, structs.putU32(obj.scanFlags!)),
        channelWidth: (data, obj) => data.push(159, structs.putU32(structs.putEnum(ChannelWidth, obj.channelWidth!))),
        centerFreq1: (data, obj) => data.push(160, structs.putU32(obj.centerFreq1!)),
        centerFreq2: (data, obj) => data.push(161, structs.putU32(obj.centerFreq2!)),
        p2pCtwindow: (data, obj) => data.push(162, structs.putU8(obj.p2pCtwindow!)),
        p2pOppps: (data, obj) => data.push(163, structs.putU8(obj.p2pOppps!)),
        localMeshPowerMode: (data, obj) => data.push(164, structs.putU32(structs.putEnum(MeshPowerMode, obj.localMeshPowerMode!))),
        aclPolicy: (data, obj) => data.push(165, structs.putU32(structs.putEnum(AclPolicy, obj.aclPolicy!))),
        macAddrs: (data, obj) => data.push(166, structs.putArray(obj.macAddrs!, x => x)),
        macAclMax: (data, obj) => data.push(167, structs.putU32(obj.macAclMax!)),
        radarEvent: (data, obj) => data.push(168, structs.putU32(structs.putEnum(RadarEvent, obj.radarEvent!))),
        extCapa: (data, obj) => data.push(169, obj.extCapa!),
        extCapaMask: (data, obj) => data.push(170, obj.extCapaMask!),
        staCapability: (data, obj) => data.push(171, structs.putU16(obj.staCapability!)),
        staExtCapability: (data, obj) => data.push(172, obj.staExtCapability!),
        protocolFeatures: (data, obj) => data.push(173, structs.putU32(formatProtocolFeatures(obj.protocolFeatures!))),
        splitWiphyDump: (data, obj) => data.push(174, structs.putFlag(obj.splitWiphyDump!)),
        disableVht: (data, obj) => data.push(175, structs.putFlag(obj.disableVht!)),
        vhtCapabilityMask: (data, obj) => data.push(176, obj.vhtCapabilityMask!),
        mdid: (data, obj) => data.push(177, obj.mdid!),
        ieRic: (data, obj) => data.push(178, obj.ieRic!),
        critProtId: (data, obj) => data.push(179, structs.putU16(structs.putEnum(CritProtoId, obj.critProtId!))),
        maxCritProtDuration: (data, obj) => data.push(180, structs.putU16(obj.maxCritProtDuration!)),
        peerAid: (data, obj) => data.push(181, structs.putU16(obj.peerAid!)),
        coalesceRule: (data, obj) => data.push(182, obj.coalesceRule!),
        chSwitchCount: (data, obj) => data.push(183, structs.putU32(obj.chSwitchCount!)),
        chSwitchBlockTx: (data, obj) => data.push(184, structs.putFlag(obj.chSwitchBlockTx!)),
        csaIes: (data, obj) => data.push(185, obj.csaIes!),
        csaCOffBeacon: (data, obj) => data.push(186, structs.putU16(obj.csaCOffBeacon!)),
        csaCOffPresp: (data, obj) => data.push(187, structs.putU16(obj.csaCOffPresp!)),
        rxmgmtFlags: (data, obj) => data.push(188, structs.putU32(formatRxmgmtFlags(obj.rxmgmtFlags!))),
        staSupportedChannels: (data, obj) => data.push(189, obj.staSupportedChannels!),
        staSupportedOperClasses: (data, obj) => data.push(190, obj.staSupportedOperClasses!),
        handleDfs: (data, obj) => data.push(191, structs.putFlag(obj.handleDfs!)),
        support5Mhz: (data, obj) => data.push(192, structs.putFlag(obj.support5Mhz!)),
        support10Mhz: (data, obj) => data.push(193, structs.putFlag(obj.support10Mhz!)),
        opmodeNotif: (data, obj) => data.push(194, structs.putU8(obj.opmodeNotif!)),
        vendorId: (data, obj) => data.push(195, structs.putU32(obj.vendorId!)),
        vendorSubcmd: (data, obj) => data.push(196, structs.putU32(obj.vendorSubcmd!)),
        vendorData: (data, obj) => data.push(197, obj.vendorData!),
        vendorEvents: (data, obj) => data.push(198, obj.vendorEvents!),
        qosMap: (data, obj) => data.push(199, obj.qosMap!),
        macHint: (data, obj) => data.push(200, obj.macHint!),
        wiphyFreqHint: (data, obj) => data.push(201, obj.wiphyFreqHint!),
        maxApAssocSta: (data, obj) => data.push(202, structs.putU32(obj.maxApAssocSta!)),
        tdlsPeerCapability: (data, obj) => data.push(203, structs.putU32(formatTdlsPeerCapability(obj.tdlsPeerCapability!))),
        socketOwner: (data, obj) => data.push(204, structs.putFlag(obj.socketOwner!)),
        csaCOffsetsTx: (data, obj) => data.push(205, structs.putU16(obj.csaCOffsetsTx!)),
        maxCsaCounters: (data, obj) => data.push(206, structs.putU8(obj.maxCsaCounters!)),
        tdlsInitiator: (data, obj) => data.push(207, structs.putFlag(obj.tdlsInitiator!)),
        useRrm: (data, obj) => data.push(208, structs.putFlag(obj.useRrm!)),
        wiphyDynAck: (data, obj) => data.push(209, structs.putFlag(obj.wiphyDynAck!)),
        tsid: (data, obj) => data.push(210, structs.putU8(obj.tsid!)),
        userPrio: (data, obj) => data.push(211, structs.putU8(obj.userPrio!)),
        admittedTime: (data, obj) => data.push(212, structs.putU16(obj.admittedTime!)),
        smpsMode: (data, obj) => data.push(213, obj.smpsMode!),
        operClass: (data, obj) => data.push(214, obj.operClass!),
        macMask: (data, obj) => data.push(215, obj.macMask!),
        wiphySelfManagedReg: (data, obj) => data.push(216, structs.putFlag(obj.wiphySelfManagedReg!)),
        extFeatures: (data, obj) => data.push(217, obj.extFeatures!),
        surveyRadioStats: (data, obj) => data.push(218, obj.surveyRadioStats!),
        netnsFd: (data, obj) => data.push(219, structs.putU32(obj.netnsFd!)),
        schedScanDelay: (data, obj) => data.push(220, structs.putU32(obj.schedScanDelay!)),
        regIndoor: (data, obj) => data.push(221, structs.putFlag(obj.regIndoor!)),
        maxNumSchedScanPlans: (data, obj) => data.push(222, structs.putU32(obj.maxNumSchedScanPlans!)),
        maxScanPlanInterval: (data, obj) => data.push(223, structs.putU32(obj.maxScanPlanInterval!)),
        maxScanPlanIterations: (data, obj) => data.push(224, structs.putU32(obj.maxScanPlanIterations!)),
        schedScanPlans: (data, obj) => data.push(225, formatScheduledScanPlan(obj.schedScanPlans!)),
        pbss: (data, obj) => data.push(226, structs.putFlag(obj.pbss!)),
        bssSelect: (data, obj) => data.push(227, formatBssSelect(obj.bssSelect!)),
        staSupportP2pPs: (data, obj) => data.push(228, structs.putU8(structs.putEnum(StationP2pPsStatus, obj.staSupportP2pPs!))),
        pad: (data, obj) => data.push(229, obj.pad!),
        iftypeExtCapa: (data, obj) => data.push(230, obj.iftypeExtCapa!),
        muMimoGroupData: (data, obj) => data.push(231, obj.muMimoGroupData!),
        muMimoFollowMacAddr: (data, obj) => data.push(232, obj.muMimoFollowMacAddr!),
        scanStartTimeTsf: (data, obj) => data.push(233, structs.putU64(obj.scanStartTimeTsf!)),
        scanStartTimeTsfBssid: (data, obj) => data.push(234, obj.scanStartTimeTsfBssid!),
        measurementDuration: (data, obj) => data.push(235, structs.putU16(obj.measurementDuration!)),
        measurementDurationMandatory: (data, obj) => data.push(236, structs.putFlag(obj.measurementDurationMandatory!)),
        meshPeerAid: (data, obj) => data.push(237, structs.putU16(obj.meshPeerAid!)),
        nanMasterPref: (data, obj) => data.push(238, structs.putU8(obj.nanMasterPref!)),
        bands: (data, obj) => data.push(239, structs.putU32(formatBandIdSet(obj.bands!))),
        nanFunc: (data, obj) => data.push(240, formatNanFunction(obj.nanFunc!)),
        nanMatch: (data, obj) => data.push(241, formatNanMatch(obj.nanMatch!)),
        filsKek: (data, obj) => data.push(242, obj.filsKek!),
        filsNonces: (data, obj) => data.push(243, obj.filsNonces!),
        multicastToUnicastEnabled: (data, obj) => data.push(244, structs.putFlag(obj.multicastToUnicastEnabled!)),
        bssid: (data, obj) => data.push(245, obj.bssid!),
        schedScanRelativeRssi: (data, obj) => data.push(246, obj.schedScanRelativeRssi!),
        schedScanRssiAdjust: (data, obj) => data.push(247, obj.schedScanRssiAdjust!),
        timeoutReason: (data, obj) => data.push(248, structs.putU32(structs.putEnum(TimeoutReason, obj.timeoutReason!))),
        filsErpUsername: (data, obj) => data.push(249, obj.filsErpUsername!),
        filsErpRealm: (data, obj) => data.push(250, obj.filsErpRealm!),
        filsErpNextSeqNum: (data, obj) => data.push(251, obj.filsErpNextSeqNum!),
        filsErpRrk: (data, obj) => data.push(252, obj.filsErpRrk!),
        filsCacheId: (data, obj) => data.push(253, obj.filsCacheId!),
        pmk: (data, obj) => data.push(254, obj.pmk!),
        schedScanMulti: (data, obj) => data.push(255, structs.putFlag(obj.schedScanMulti!)),
        schedScanMaxReqs: (data, obj) => data.push(256, structs.putU32(obj.schedScanMaxReqs!)),
        want1x4wayHs: (data, obj) => data.push(257, structs.putFlag(obj.want1x4wayHs!)),
        pmkr0Name: (data, obj) => data.push(258, obj.pmkr0Name!),
        portAuthorized: (data, obj) => data.push(259, obj.portAuthorized!),
        externalAuthAction: (data, obj) => data.push(260, structs.putU32(structs.putEnum(ExternalAuthAction, obj.externalAuthAction!))),
        externalAuthSupport: (data, obj) => data.push(261, structs.putFlag(obj.externalAuthSupport!)),
        nss: (data, obj) => data.push(262, structs.putU8(obj.nss!)),
        ackSignal: (data, obj) => data.push(263, obj.ackSignal!),
        controlPortOverNl80211: (data, obj) => data.push(264, structs.putFlag(obj.controlPortOverNl80211!)),
        txqStats: (data, obj) => data.push(265, formatTxqStats(obj.txqStats!)),
        txqLimit: (data, obj) => data.push(266, structs.putU32(obj.txqLimit!)),
        txqMemoryLimit: (data, obj) => data.push(267, structs.putU32(obj.txqMemoryLimit!)),
        txqQuantum: (data, obj) => data.push(268, structs.putU32(obj.txqQuantum!)),
        heCapability: (data, obj) => data.push(269, obj.heCapability!),
        ftmResponder: (data, obj) => data.push(270, obj.ftmResponder!),
        ftmResponderStats: (data, obj) => data.push(271, formatFtmResponderStats(obj.ftmResponderStats!)),
        timeout: (data, obj) => data.push(272, structs.putU32(obj.timeout!)),
        peerMeasurements: (data, obj) => data.push(273, formatPeerMeasurement(obj.peerMeasurements!)),
        airtimeWeight: (data, obj) => data.push(274, structs.putU16(obj.airtimeWeight!)),
        staTxPowerSetting: (data, obj) => data.push(275, structs.putU8(structs.putEnum(TxPowerSetting, obj.staTxPowerSetting!))),
        staTxPower: (data, obj) => data.push(276, structs.putS16(obj.staTxPower!)),
        saePassword: (data, obj) => data.push(277, obj.saePassword!),
        twtResponder: (data, obj) => data.push(278, obj.twtResponder!),
        heObssPd: (data, obj) => data.push(279, obj.heObssPd!),
        wiphyEdmgChannels: (data, obj) => data.push(280, structs.putU8(obj.wiphyEdmgChannels!)),
        wiphyEdmgBwConfig: (data, obj) => data.push(281, structs.putU8(obj.wiphyEdmgBwConfig!)),
        vlanId: (data, obj) => data.push(282, structs.putU16(obj.vlanId!)),
    })
}

/**
 * (virtual) interface types
 *
 * These values are used with the %NL80211_ATTR_IFTYPE
 * to set the type of an interface.
 *
 * /
 */
export enum InterfaceType {
    /** unspecified type, driver decides */
    UNSPECIFIED,
    
    /** independent BSS member */
    ADHOC = 1,
    
    /** managed BSS member */
    STATION = 2,
    
    /** access point */
    AP = 3,
    
    /**
     * VLAN interface for access points; VLAN interfaces
     * are a bit special in that they must always be tied to a pre-existing
     * AP type interface.
     */
    AP_VLAN = 4,
    
    /** wireless distribution interface */
    WDS = 5,
    
    /** monitor interface receiving all frames */
    MONITOR = 6,
    
    /** mesh point */
    MESH_POINT = 7,
    
    /** P2P client */
    P2P_CLIENT = 8,
    
    /** P2P group owner */
    P2P_GO = 9,
    
    /**
     * P2P device interface type, this is not a netdev
     * and therefore can't be created in the normal ways, use the
     * %NL80211_CMD_START_P2P_DEVICE and %NL80211_CMD_STOP_P2P_DEVICE
     * commands to create and destroy one
     */
    P2P_DEVICE = 10,
    
    /**
     * Outside Context of a BSS
     * This mode corresponds to the MIB variable dot11OCBActivated=true
     */
    OCB = 11,
    
    /** NAN device interface type (not a netdev) */
    NAN = 12,
}

/** Set of flags from [[InterfaceType]] bits */
export interface InterfaceTypeSet extends BaseObject {
    /** unspecified type, driver decides */
    unspecified?: true
    
    /** independent BSS member */
    adhoc?: true
    
    /** managed BSS member */
    station?: true
    
    /** access point */
    ap?: true
    
    /**
     * VLAN interface for access points; VLAN interfaces
     * are a bit special in that they must always be tied to a pre-existing
     * AP type interface.
     */
    apVlan?: true
    
    /** wireless distribution interface */
    wds?: true
    
    /** monitor interface receiving all frames */
    monitor?: true
    
    /** mesh point */
    meshPoint?: true
    
    /** P2P client */
    p2pClient?: true
    
    /** P2P group owner */
    p2pGo?: true
    
    /**
     * P2P device interface type, this is not a netdev
     * and therefore can't be created in the normal ways, use the
     * %NL80211_CMD_START_P2P_DEVICE and %NL80211_CMD_STOP_P2P_DEVICE
     * commands to create and destroy one
     */
    p2pDevice?: true
    
    /**
     * Outside Context of a BSS
     * This mode corresponds to the MIB variable dot11OCBActivated=true
     */
    ocb?: true
    
    /** NAN device interface type (not a netdev) */
    nan?: true
}

/** Parses flags attributes with [[InterfaceType]] types */
export function parseInterfaceTypeSetAttr(r: Buffer): InterfaceTypeSet {
    return structs.getObject(r, {
        [InterfaceType.UNSPECIFIED]: (data, obj) => obj.unspecified = structs.getFlag(data),
        [InterfaceType.ADHOC]: (data, obj) => obj.adhoc = structs.getFlag(data),
        [InterfaceType.STATION]: (data, obj) => obj.station = structs.getFlag(data),
        [InterfaceType.AP]: (data, obj) => obj.ap = structs.getFlag(data),
        [InterfaceType.AP_VLAN]: (data, obj) => obj.apVlan = structs.getFlag(data),
        [InterfaceType.WDS]: (data, obj) => obj.wds = structs.getFlag(data),
        [InterfaceType.MONITOR]: (data, obj) => obj.monitor = structs.getFlag(data),
        [InterfaceType.MESH_POINT]: (data, obj) => obj.meshPoint = structs.getFlag(data),
        [InterfaceType.P2P_CLIENT]: (data, obj) => obj.p2pClient = structs.getFlag(data),
        [InterfaceType.P2P_GO]: (data, obj) => obj.p2pGo = structs.getFlag(data),
        [InterfaceType.P2P_DEVICE]: (data, obj) => obj.p2pDevice = structs.getFlag(data),
        [InterfaceType.OCB]: (data, obj) => obj.ocb = structs.getFlag(data),
        [InterfaceType.NAN]: (data, obj) => obj.nan = structs.getFlag(data),
    })
}

/** Encodes a set of [[InterfaceType]] flags into a stream of attributes */
export function formatInterfaceTypeSetAttr(x: InterfaceTypeSet): StreamData {
    return structs.putObject(x, {
        unspecified: (data, obj) => data.push(InterfaceType.UNSPECIFIED, structs.putFlag(obj.unspecified!)),
        adhoc: (data, obj) => data.push(InterfaceType.ADHOC, structs.putFlag(obj.adhoc!)),
        station: (data, obj) => data.push(InterfaceType.STATION, structs.putFlag(obj.station!)),
        ap: (data, obj) => data.push(InterfaceType.AP, structs.putFlag(obj.ap!)),
        apVlan: (data, obj) => data.push(InterfaceType.AP_VLAN, structs.putFlag(obj.apVlan!)),
        wds: (data, obj) => data.push(InterfaceType.WDS, structs.putFlag(obj.wds!)),
        monitor: (data, obj) => data.push(InterfaceType.MONITOR, structs.putFlag(obj.monitor!)),
        meshPoint: (data, obj) => data.push(InterfaceType.MESH_POINT, structs.putFlag(obj.meshPoint!)),
        p2pClient: (data, obj) => data.push(InterfaceType.P2P_CLIENT, structs.putFlag(obj.p2pClient!)),
        p2pGo: (data, obj) => data.push(InterfaceType.P2P_GO, structs.putFlag(obj.p2pGo!)),
        p2pDevice: (data, obj) => data.push(InterfaceType.P2P_DEVICE, structs.putFlag(obj.p2pDevice!)),
        ocb: (data, obj) => data.push(InterfaceType.OCB, structs.putFlag(obj.ocb!)),
        nan: (data, obj) => data.push(InterfaceType.NAN, structs.putFlag(obj.nan!)),
    })
}

/**
 * station flags
 *
 * Station flags. When a station is added to an AP interface, it is
 * assumed to be already associated (and hence authenticated.)
 */
export interface StationFlags extends BaseObject {
    /** station is authorized (802.1X) */
    authorized?: true
    
    /**
     * station is capable of receiving frames
     * with short barker preamble
     */
    shortPreamble?: true
    
    /** station is WME/QoS capable */
    wme?: true
    
    /** station uses management frame protection */
    mfp?: true
    
    /** station is authenticated */
    authenticated?: true
    
    /**
     * station is a TDLS peer -- this flag should
     * only be used in managed mode (even in the flags mask). Note that the
     * flag can't be changed, it is only valid while adding a station, and
     * attempts to change it will silently be ignored (rather than rejected
     * as errors.)
     */
    tdlsPeer?: true
    
    /**
     * station is associated; used with drivers
     * that support %NL80211_FEATURE_FULL_AP_CLIENT_STATE to transition a
     * previously added station into associated state
     */
    associated?: true
}

/** Parses the attributes of a [[StationFlags]] object */
export function parseStationFlags(r: Buffer): StationFlags {
    return structs.getObject(r, {
        1: (data, obj) => obj.authorized = structs.getFlag(data),
        2: (data, obj) => obj.shortPreamble = structs.getFlag(data),
        3: (data, obj) => obj.wme = structs.getFlag(data),
        4: (data, obj) => obj.mfp = structs.getFlag(data),
        5: (data, obj) => obj.authenticated = structs.getFlag(data),
        6: (data, obj) => obj.tdlsPeer = structs.getFlag(data),
        7: (data, obj) => obj.associated = structs.getFlag(data),
    })
}

/** Encodes a [[StationFlags]] object into a stream of attributes */
export function formatStationFlags(x: StationFlags): StreamData {
    return structs.putObject(x, {
        authorized: (data, obj) => data.push(1, structs.putFlag(obj.authorized!)),
        shortPreamble: (data, obj) => data.push(2, structs.putFlag(obj.shortPreamble!)),
        wme: (data, obj) => data.push(3, structs.putFlag(obj.wme!)),
        mfp: (data, obj) => data.push(4, structs.putFlag(obj.mfp!)),
        authenticated: (data, obj) => data.push(5, structs.putFlag(obj.authenticated!)),
        tdlsPeer: (data, obj) => data.push(6, structs.putFlag(obj.tdlsPeer!)),
        associated: (data, obj) => data.push(7, structs.putFlag(obj.associated!)),
    })
}

/** station support of P2P PS */
export enum StationP2pPsStatus {
    /** station doesn't support P2P PS mechanism */
    UNSUPPORTED,
    
    /** station supports P2P PS mechanism */
    SUPPORTED = 1,
}

/** HE guard interval */
export enum HeGuardInterval {
    /** 0.8 usec */
    _0_8,
    
    /** 1.6 usec */
    _1_6 = 1,
    
    /** 3.2 usec */
    _3_2 = 2,
}

/**
 * HE RU allocation values
 *
 * @NL80211_RATE_INFO_HE_RU_ALLOC_2x996: 2x996-tone RU allocation
 */
export enum HeRuAllocation {
    /** 26-tone RU allocation */
    _26,
    
    /** 52-tone RU allocation */
    _52 = 1,
    
    /** 106-tone RU allocation */
    _106 = 2,
    
    /** 242-tone RU allocation */
    _242 = 3,
    
    /** 484-tone RU allocation */
    _484 = 4,
    
    /** 996-tone RU allocation */
    _996 = 5,
    
    _2x996 = 6,
}

/**
 * bitrate information
 *
 * These attribute types are used with %NL80211_STA_INFO_TXRATE
 * when getting information about the bitrate of a station.
 * There are 2 attributes for bitrate, a legacy one that represents
 * a 16-bit value, and new one that represents a 32-bit value.
 * If the rate value fits into 16 bit, both attributes are reported
 * with the same value. If the rate is too high to fit into 16 bits
 * (>6.5535Gbps) only 32-bit attribute is included.
 * User space tools encouraged to use the 32-bit attribute and fall
 * back to the 16-bit one for compatibility with older kernels.
 */
export interface RateInfo extends BaseObject {
    /** total bitrate (u16, 100kbit/s) */
    bitrate?: number
    
    /** mcs index for 802.11n (u8) */
    mcs?: number
    
    /** 40 MHz dualchannel bitrate */
    _40MhzWidth?: Buffer
    
    /** 400ns guard interval */
    shortGi?: Buffer
    
    /** total bitrate (u32, 100kbit/s) */
    bitrate32?: number
    
    /** MCS index for VHT (u8) */
    vhtMcs?: number
    
    /** number of streams in VHT (u8) */
    vhtNss?: number
    
    /** 80 MHz VHT rate */
    _80MhzWidth?: Buffer
    
    /**
     * unused - 80+80 is treated the
     * same as 160 for purposes of the bitrates
     */
    _80p80MhzWidth?: Buffer
    
    /** 160 MHz VHT rate */
    _160MhzWidth?: Buffer
    
    /**
     * 10 MHz width - note that this is
     * a legacy rate and will be reported as the actual bitrate, i.e.
     * half the base (20 MHz) rate
     */
    _10MhzWidth?: Buffer
    
    /**
     * 5 MHz width - note that this is
     * a legacy rate and will be reported as the actual bitrate, i.e.
     * a quarter of the base (20 MHz) rate
     */
    _5MhzWidth?: Buffer
    
    /** HE MCS index (u8, 0-11) */
    heMcs?: number
    
    /** HE NSS value (u8, 1-8) */
    heNss?: number
    
    /**
     * HE guard interval identifier
     * (u8, see &enum nl80211_he_gi)
     */
    heGi?: HeGuardInterval | keyof typeof HeGuardInterval
    
    /** HE DCM value (u8, 0/1) */
    heDcm?: number
    
    /**
     * HE RU allocation, if not present then
     * non-OFDMA was used (u8, see &enum nl80211_he_ru_alloc)
     */
    heRuAlloc?: HeRuAllocation | keyof typeof HeRuAllocation
}

/** Parses the attributes of a [[RateInfo]] object */
export function parseRateInfo(r: Buffer): RateInfo {
    return structs.getObject(r, {
        1: (data, obj) => obj.bitrate = structs.getU16(data),
        2: (data, obj) => obj.mcs = structs.getU8(data),
        3: (data, obj) => obj._40MhzWidth = data,
        4: (data, obj) => obj.shortGi = data,
        5: (data, obj) => obj.bitrate32 = structs.getU32(data),
        6: (data, obj) => obj.vhtMcs = structs.getU8(data),
        7: (data, obj) => obj.vhtNss = structs.getU8(data),
        8: (data, obj) => obj._80MhzWidth = data,
        9: (data, obj) => obj._80p80MhzWidth = data,
        10: (data, obj) => obj._160MhzWidth = data,
        11: (data, obj) => obj._10MhzWidth = data,
        12: (data, obj) => obj._5MhzWidth = data,
        13: (data, obj) => obj.heMcs = structs.getU8(data),
        14: (data, obj) => obj.heNss = structs.getU8(data),
        15: (data, obj) => obj.heGi = structs.getEnum(HeGuardInterval, structs.getU8(data)),
        16: (data, obj) => obj.heDcm = structs.getU8(data),
        17: (data, obj) => obj.heRuAlloc = structs.getEnum(HeRuAllocation, structs.getU8(data)),
    })
}

/** Encodes a [[RateInfo]] object into a stream of attributes */
export function formatRateInfo(x: RateInfo): StreamData {
    return structs.putObject(x, {
        bitrate: (data, obj) => data.push(1, structs.putU16(obj.bitrate!)),
        mcs: (data, obj) => data.push(2, structs.putU8(obj.mcs!)),
        _40MhzWidth: (data, obj) => data.push(3, obj._40MhzWidth!),
        shortGi: (data, obj) => data.push(4, obj.shortGi!),
        bitrate32: (data, obj) => data.push(5, structs.putU32(obj.bitrate32!)),
        vhtMcs: (data, obj) => data.push(6, structs.putU8(obj.vhtMcs!)),
        vhtNss: (data, obj) => data.push(7, structs.putU8(obj.vhtNss!)),
        _80MhzWidth: (data, obj) => data.push(8, obj._80MhzWidth!),
        _80p80MhzWidth: (data, obj) => data.push(9, obj._80p80MhzWidth!),
        _160MhzWidth: (data, obj) => data.push(10, obj._160MhzWidth!),
        _10MhzWidth: (data, obj) => data.push(11, obj._10MhzWidth!),
        _5MhzWidth: (data, obj) => data.push(12, obj._5MhzWidth!),
        heMcs: (data, obj) => data.push(13, structs.putU8(obj.heMcs!)),
        heNss: (data, obj) => data.push(14, structs.putU8(obj.heNss!)),
        heGi: (data, obj) => data.push(15, structs.putU8(structs.putEnum(HeGuardInterval, obj.heGi!))),
        heDcm: (data, obj) => data.push(16, structs.putU8(obj.heDcm!)),
        heRuAlloc: (data, obj) => data.push(17, structs.putU8(structs.putEnum(HeRuAllocation, obj.heRuAlloc!))),
    })
}

/**
 * BSS information collected by STA
 *
 * These attribute types are used with %NL80211_STA_INFO_BSS_PARAM
 * when getting information about the bitrate of a station.
 */
export interface StationBssParam extends BaseObject {
    /** whether CTS protection is enabled (flag) */
    ctsProt?: true
    
    /**
     * whether short preamble is enabled
     * (flag)
     */
    shortPreamble?: true
    
    /**
     * whether short slot time is enabled
     * (flag)
     */
    shortSlotTime?: true
    
    /** DTIM period for beaconing (u8) */
    dtimPeriod?: number
    
    /** Beacon interval (u16) */
    beaconInterval?: number
}

/** Parses the attributes of a [[StationBssParam]] object */
export function parseStationBssParam(r: Buffer): StationBssParam {
    return structs.getObject(r, {
        1: (data, obj) => obj.ctsProt = structs.getFlag(data),
        2: (data, obj) => obj.shortPreamble = structs.getFlag(data),
        3: (data, obj) => obj.shortSlotTime = structs.getFlag(data),
        4: (data, obj) => obj.dtimPeriod = structs.getU8(data),
        5: (data, obj) => obj.beaconInterval = structs.getU16(data),
    })
}

/** Encodes a [[StationBssParam]] object into a stream of attributes */
export function formatStationBssParam(x: StationBssParam): StreamData {
    return structs.putObject(x, {
        ctsProt: (data, obj) => data.push(1, structs.putFlag(obj.ctsProt!)),
        shortPreamble: (data, obj) => data.push(2, structs.putFlag(obj.shortPreamble!)),
        shortSlotTime: (data, obj) => data.push(3, structs.putFlag(obj.shortSlotTime!)),
        dtimPeriod: (data, obj) => data.push(4, structs.putU8(obj.dtimPeriod!)),
        beaconInterval: (data, obj) => data.push(5, structs.putU16(obj.beaconInterval!)),
    })
}

/**
 * station information
 *
 * These attribute types are used with %NL80211_ATTR_STA_INFO
 * when getting information about a station.
 */
export interface StationInfo extends BaseObject {
    /** time since last activity (u32, msecs) */
    inactiveTime?: number
    
    /**
     * total received bytes (MPDU length)
     * (u32, from this station)
     */
    rxBytes?: number
    
    /**
     * total transmitted bytes (MPDU length)
     * (u32, to this station)
     */
    txBytes?: number
    
    /** the station's mesh LLID */
    llid?: number
    
    /** the station's mesh PLID */
    plid?: number
    
    /**
     * peer link state for the station
     * (see %enum nl80211_plink_state)
     */
    plinkState?: PlinkState | keyof typeof PlinkState
    
    /** signal strength of last received PPDU (u8, dBm) */
    signal?: number
    
    /**
     * current unicast tx rate, nested attribute
     * containing info as possible, see &enum nl80211_rate_info
     */
    txBitrate?: RateInfo
    
    /**
     * total received packet (MSDUs and MMPDUs)
     * (u32, from this station)
     */
    rxPackets?: number
    
    /**
     * total transmitted packets (MSDUs and MMPDUs)
     * (u32, to this station)
     */
    txPackets?: number
    
    /** total retries (MPDUs) (u32, to this station) */
    txRetries?: number
    
    /**
     * total failed packets (MPDUs)
     * (u32, to this station)
     */
    txFailed?: number
    
    /** signal strength average (u8, dBm) */
    signalAvg?: number
    
    /**
     * last unicast data frame rx rate, nested
     * attribute, like NL80211_STA_INFO_TX_BITRATE.
     */
    rxBitrate?: Buffer
    
    /**
     * current station's view of BSS, nested attribute
     * containing info as possible, see &enum nl80211_sta_bss_param
     */
    bssParam?: StationBssParam
    
    /** time since the station is last connected */
    connectedTime?: number
    
    /** Contains a struct nl80211_sta_flag_update. */
    staFlags?: Buffer
    
    /** count of times beacon loss was detected (u32) */
    beaconLoss?: number
    
    /** timing offset with respect to this STA (s64) */
    tOffset?: bigint
    
    /** local mesh STA link-specific power mode */
    localPm?: Buffer
    
    /** peer mesh STA link-specific power mode */
    peerPm?: Buffer
    
    /**
     * neighbor mesh STA power save mode towards
     * non-peer STA
     */
    nonpeerPm?: Buffer
    
    /**
     * total received bytes (MPDU length)
     * (u64, from this station)
     */
    rxBytes64?: bigint
    
    /**
     * total transmitted bytes (MPDU length)
     * (u64, to this station)
     */
    txBytes64?: bigint
    
    /**
     * per-chain signal strength of last PPDU
     * Contains a nested array of signal strength attributes (u8, dBm)
     */
    chainSignal?: number
    
    /**
     * per-chain signal strength average
     * Same format as NL80211_STA_INFO_CHAIN_SIGNAL.
     */
    chainSignalAvg?: Buffer
    
    /**
     * expected throughput considering also the
     * 802.11 header (u32, kbps)
     */
    expectedThroughput?: number
    
    /**
     * RX packets dropped for unspecified reasons
     * (u64)
     */
    rxDropMisc?: bigint
    
    /** number of beacons received from this peer (u64) */
    beaconRx?: bigint
    
    /**
     * signal strength average
     * for beacons only (u8, dBm)
     */
    beaconSignalAvg?: number
    
    /**
     * per-TID statistics (see &enum nl80211_tid_stats)
     * This is a nested attribute where each the inner attribute number is the
     * TID+1 and the special TID 16 (i.e. value 17) is used for non-QoS frames;
     * each one of those is again nested with &enum nl80211_tid_stats
     * attributes carrying the actual values.
     */
    tidStats?: Map<number, TidStats>
    
    /**
     * aggregate PPDU duration for all frames
     * received from the station (u64, usec)
     */
    rxDuration?: bigint
    
    /** attribute used for padding for 64-bit alignment */
    pad?: Buffer
    
    /** signal strength of the last ACK frame(u8, dBm) */
    ackSignal?: number
    
    /** avg signal strength of ACK frames (s8, dBm) */
    ackSignalAvg?: number
    
    /**
     * total number of received packets (MPDUs)
     * (u32, from this station)
     */
    rxMpdus?: number
    
    /**
     * total number of packets (MPDUs) received
     * with an FCS error (u32, from this station). This count may not include
     * some packets with an FCS error due to TA corruption. Hence this counter
     * might not be fully accurate.
     */
    fcsErrorCount?: number
    
    /**
     * set to true if STA has a path to a
     * mesh gate (u8, 0 or 1)
     */
    connectedToGate?: number
    
    /**
     * aggregate PPDU duration for all frames
     * sent to the station (u64, usec)
     */
    txDuration?: bigint
    
    /** current airtime weight for station (u16) */
    airtimeWeight?: number
    
    /** airtime link metric for mesh station */
    airtimeLinkMetric?: Buffer
    
    /**
     * Timestamp (CLOCK_BOOTTIME, nanoseconds)
     * of STA's association
     */
    assocAtBoottime?: bigint
}

/** Parses the attributes of a [[StationInfo]] object */
export function parseStationInfo(r: Buffer): StationInfo {
    return structs.getObject(r, {
        1: (data, obj) => obj.inactiveTime = structs.getU32(data),
        2: (data, obj) => obj.rxBytes = structs.getU32(data),
        3: (data, obj) => obj.txBytes = structs.getU32(data),
        4: (data, obj) => obj.llid = structs.getU16(data),
        5: (data, obj) => obj.plid = structs.getU16(data),
        6: (data, obj) => obj.plinkState = structs.getEnum(PlinkState, structs.getU8(data)),
        7: (data, obj) => obj.signal = structs.getU8(data),
        8: (data, obj) => obj.txBitrate = parseRateInfo(data),
        9: (data, obj) => obj.rxPackets = structs.getU32(data),
        10: (data, obj) => obj.txPackets = structs.getU32(data),
        11: (data, obj) => obj.txRetries = structs.getU32(data),
        12: (data, obj) => obj.txFailed = structs.getU32(data),
        13: (data, obj) => obj.signalAvg = structs.getU8(data),
        14: (data, obj) => obj.rxBitrate = data,
        15: (data, obj) => obj.bssParam = parseStationBssParam(data),
        16: (data, obj) => obj.connectedTime = structs.getU32(data),
        17: (data, obj) => obj.staFlags = data,
        18: (data, obj) => obj.beaconLoss = structs.getU32(data),
        19: (data, obj) => obj.tOffset = structs.getS64(data),
        20: (data, obj) => obj.localPm = data,
        21: (data, obj) => obj.peerPm = data,
        22: (data, obj) => obj.nonpeerPm = data,
        23: (data, obj) => obj.rxBytes64 = structs.getU64(data),
        24: (data, obj) => obj.txBytes64 = structs.getU64(data),
        25: (data, obj) => obj.chainSignal = structs.getU8(data),
        26: (data, obj) => obj.chainSignalAvg = data,
        27: (data, obj) => obj.expectedThroughput = structs.getU32(data),
        28: (data, obj) => obj.rxDropMisc = structs.getU64(data),
        29: (data, obj) => obj.beaconRx = structs.getU64(data),
        30: (data, obj) => obj.beaconSignalAvg = structs.getU8(data),
        31: (data, obj) => obj.tidStats = structs.getMap(data, x => parseTidStats(x)),
        32: (data, obj) => obj.rxDuration = structs.getU64(data),
        33: (data, obj) => obj.pad = data,
        34: (data, obj) => obj.ackSignal = structs.getU8(data),
        35: (data, obj) => obj.ackSignalAvg = structs.getS8(data),
        36: (data, obj) => obj.rxMpdus = structs.getU32(data),
        37: (data, obj) => obj.fcsErrorCount = structs.getU32(data),
        38: (data, obj) => obj.connectedToGate = structs.getU8(data),
        39: (data, obj) => obj.txDuration = structs.getU64(data),
        40: (data, obj) => obj.airtimeWeight = structs.getU16(data),
        41: (data, obj) => obj.airtimeLinkMetric = data,
        42: (data, obj) => obj.assocAtBoottime = structs.getU64(data),
    })
}

/** Encodes a [[StationInfo]] object into a stream of attributes */
export function formatStationInfo(x: StationInfo): StreamData {
    return structs.putObject(x, {
        inactiveTime: (data, obj) => data.push(1, structs.putU32(obj.inactiveTime!)),
        rxBytes: (data, obj) => data.push(2, structs.putU32(obj.rxBytes!)),
        txBytes: (data, obj) => data.push(3, structs.putU32(obj.txBytes!)),
        llid: (data, obj) => data.push(4, structs.putU16(obj.llid!)),
        plid: (data, obj) => data.push(5, structs.putU16(obj.plid!)),
        plinkState: (data, obj) => data.push(6, structs.putU8(structs.putEnum(PlinkState, obj.plinkState!))),
        signal: (data, obj) => data.push(7, structs.putU8(obj.signal!)),
        txBitrate: (data, obj) => data.push(8, formatRateInfo(obj.txBitrate!)),
        rxPackets: (data, obj) => data.push(9, structs.putU32(obj.rxPackets!)),
        txPackets: (data, obj) => data.push(10, structs.putU32(obj.txPackets!)),
        txRetries: (data, obj) => data.push(11, structs.putU32(obj.txRetries!)),
        txFailed: (data, obj) => data.push(12, structs.putU32(obj.txFailed!)),
        signalAvg: (data, obj) => data.push(13, structs.putU8(obj.signalAvg!)),
        rxBitrate: (data, obj) => data.push(14, obj.rxBitrate!),
        bssParam: (data, obj) => data.push(15, formatStationBssParam(obj.bssParam!)),
        connectedTime: (data, obj) => data.push(16, structs.putU32(obj.connectedTime!)),
        staFlags: (data, obj) => data.push(17, obj.staFlags!),
        beaconLoss: (data, obj) => data.push(18, structs.putU32(obj.beaconLoss!)),
        tOffset: (data, obj) => data.push(19, structs.putS64(obj.tOffset!)),
        localPm: (data, obj) => data.push(20, obj.localPm!),
        peerPm: (data, obj) => data.push(21, obj.peerPm!),
        nonpeerPm: (data, obj) => data.push(22, obj.nonpeerPm!),
        rxBytes64: (data, obj) => data.push(23, structs.putU64(obj.rxBytes64!)),
        txBytes64: (data, obj) => data.push(24, structs.putU64(obj.txBytes64!)),
        chainSignal: (data, obj) => data.push(25, structs.putU8(obj.chainSignal!)),
        chainSignalAvg: (data, obj) => data.push(26, obj.chainSignalAvg!),
        expectedThroughput: (data, obj) => data.push(27, structs.putU32(obj.expectedThroughput!)),
        rxDropMisc: (data, obj) => data.push(28, structs.putU64(obj.rxDropMisc!)),
        beaconRx: (data, obj) => data.push(29, structs.putU64(obj.beaconRx!)),
        beaconSignalAvg: (data, obj) => data.push(30, structs.putU8(obj.beaconSignalAvg!)),
        tidStats: (data, obj) => data.push(31, structs.putMap(obj.tidStats!, x => formatTidStats(x))),
        rxDuration: (data, obj) => data.push(32, structs.putU64(obj.rxDuration!)),
        pad: (data, obj) => data.push(33, obj.pad!),
        ackSignal: (data, obj) => data.push(34, structs.putU8(obj.ackSignal!)),
        ackSignalAvg: (data, obj) => data.push(35, structs.putS8(obj.ackSignalAvg!)),
        rxMpdus: (data, obj) => data.push(36, structs.putU32(obj.rxMpdus!)),
        fcsErrorCount: (data, obj) => data.push(37, structs.putU32(obj.fcsErrorCount!)),
        connectedToGate: (data, obj) => data.push(38, structs.putU8(obj.connectedToGate!)),
        txDuration: (data, obj) => data.push(39, structs.putU64(obj.txDuration!)),
        airtimeWeight: (data, obj) => data.push(40, structs.putU16(obj.airtimeWeight!)),
        airtimeLinkMetric: (data, obj) => data.push(41, obj.airtimeLinkMetric!),
        assocAtBoottime: (data, obj) => data.push(42, structs.putU64(obj.assocAtBoottime!)),
    })
}

/** per TID statistics attributes */
export interface TidStats extends BaseObject {
    /** number of MSDUs received (u64) */
    rxMsdu?: bigint
    
    /**
     * number of MSDUs transmitted (or
     * attempted to transmit; u64)
     */
    txMsdu?: bigint
    
    /**
     * number of retries for
     * transmitted MSDUs (not counting the first attempt; u64)
     */
    txMsduRetries?: bigint
    
    /**
     * number of failed transmitted
     * MSDUs (u64)
     */
    txMsduFailed?: bigint
    
    /** attribute used for padding for 64-bit alignment */
    pad?: Buffer
    
    /** TXQ stats (nested attribute) */
    txqStats?: TxqStats
}

/** Parses the attributes of a [[TidStats]] object */
export function parseTidStats(r: Buffer): TidStats {
    return structs.getObject(r, {
        1: (data, obj) => obj.rxMsdu = structs.getU64(data),
        2: (data, obj) => obj.txMsdu = structs.getU64(data),
        3: (data, obj) => obj.txMsduRetries = structs.getU64(data),
        4: (data, obj) => obj.txMsduFailed = structs.getU64(data),
        5: (data, obj) => obj.pad = data,
        6: (data, obj) => obj.txqStats = parseTxqStats(data),
    })
}

/** Encodes a [[TidStats]] object into a stream of attributes */
export function formatTidStats(x: TidStats): StreamData {
    return structs.putObject(x, {
        rxMsdu: (data, obj) => data.push(1, structs.putU64(obj.rxMsdu!)),
        txMsdu: (data, obj) => data.push(2, structs.putU64(obj.txMsdu!)),
        txMsduRetries: (data, obj) => data.push(3, structs.putU64(obj.txMsduRetries!)),
        txMsduFailed: (data, obj) => data.push(4, structs.putU64(obj.txMsduFailed!)),
        pad: (data, obj) => data.push(5, obj.pad!),
        txqStats: (data, obj) => data.push(6, formatTxqStats(obj.txqStats!)),
    })
}

/** per TXQ statistics attributes */
export interface TxqStats extends BaseObject {
    /** number of bytes currently backlogged */
    backlogBytes?: Buffer
    
    /**
     * number of packets currently
     * backlogged
     */
    backlogPackets?: Buffer
    
    /** total number of new flows seen */
    flows?: Buffer
    
    /** total number of packet drops */
    drops?: Buffer
    
    /** total number of packet ECN marks */
    ecnMarks?: Buffer
    
    /** number of drops due to queue space overflow */
    overlimit?: Buffer
    
    /**
     * number of drops due to memory limit overflow
     * (only for per-phy stats)
     */
    overmemory?: Buffer
    
    /** number of hash collisions */
    collisions?: Buffer
    
    /** total number of bytes dequeued from TXQ */
    txBytes?: Buffer
    
    /** total number of packets dequeued from TXQ */
    txPackets?: Buffer
    
    /** number of flow buckets for PHY */
    maxFlows?: Buffer
}

/** Parses the attributes of a [[TxqStats]] object */
export function parseTxqStats(r: Buffer): TxqStats {
    return structs.getObject(r, {
        1: (data, obj) => obj.backlogBytes = data,
        2: (data, obj) => obj.backlogPackets = data,
        3: (data, obj) => obj.flows = data,
        4: (data, obj) => obj.drops = data,
        5: (data, obj) => obj.ecnMarks = data,
        6: (data, obj) => obj.overlimit = data,
        7: (data, obj) => obj.overmemory = data,
        8: (data, obj) => obj.collisions = data,
        9: (data, obj) => obj.txBytes = data,
        10: (data, obj) => obj.txPackets = data,
        11: (data, obj) => obj.maxFlows = data,
    })
}

/** Encodes a [[TxqStats]] object into a stream of attributes */
export function formatTxqStats(x: TxqStats): StreamData {
    return structs.putObject(x, {
        backlogBytes: (data, obj) => data.push(1, obj.backlogBytes!),
        backlogPackets: (data, obj) => data.push(2, obj.backlogPackets!),
        flows: (data, obj) => data.push(3, obj.flows!),
        drops: (data, obj) => data.push(4, obj.drops!),
        ecnMarks: (data, obj) => data.push(5, obj.ecnMarks!),
        overlimit: (data, obj) => data.push(6, obj.overlimit!),
        overmemory: (data, obj) => data.push(7, obj.overmemory!),
        collisions: (data, obj) => data.push(8, obj.collisions!),
        txBytes: (data, obj) => data.push(9, obj.txBytes!),
        txPackets: (data, obj) => data.push(10, obj.txPackets!),
        maxFlows: (data, obj) => data.push(11, obj.maxFlows!),
    })
}

/** nl80211 mesh path flags */
export interface MpathFlags {
    /** the mesh path is active */
    active?: true
    
    /** the mesh path discovery process is running */
    resolving?: true
    
    /** the mesh path contains a valid SN */
    snValid?: true
    
    /** the mesh path has been manually set */
    fixed?: true
    
    /** the mesh path discovery process succeeded */
    resolved?: true
}

/** Parses the flags in a [[MpathFlags]] bitmask */
export function parseMpathFlags(r: number): MpathFlags {
    const x: MpathFlags = {}
    if (r & (1)) x.active = true
    if (r & (2)) x.resolving = true
    if (r & (4)) x.snValid = true
    if (r & (8)) x.fixed = true
    if (r & (16)) x.resolved = true
    return x
}

/** Encodes a [[MpathFlags]] bitmask */
export function formatMpathFlags(x: MpathFlags): number {
    let r = 0
    if (x.active) r |= 1
    if (x.resolving) r |= 2
    if (x.snValid) r |= 4
    if (x.fixed) r |= 8
    if (x.resolved) r |= 16
    return r
}

/**
 * mesh path information
 *
 * These attribute types are used with %NL80211_ATTR_MPATH_INFO when getting
 * information about a mesh path.
 */
export interface MpathInfo extends BaseObject {
    /** number of queued frames for this destination */
    frameQlen?: number
    
    /** destination sequence number */
    sn?: number
    
    /** metric (cost) of this mesh path */
    metric?: number
    
    /** expiration time for the path, in msec from now */
    exptime?: number
    
    /**
     * mesh path flags, enumerated in
     * &enum nl80211_mpath_flags;
     */
    flags?: MpathFlags
    
    /** total path discovery timeout, in msec */
    discoveryTimeout?: number
    
    /** mesh path discovery retries */
    discoveryRetries?: number
    
    /** hop count to destination */
    hopCount?: Buffer
    
    /** total number of path changes to destination */
    pathChange?: Buffer
}

/** Parses the attributes of a [[MpathInfo]] object */
export function parseMpathInfo(r: Buffer): MpathInfo {
    return structs.getObject(r, {
        1: (data, obj) => obj.frameQlen = structs.getU32(data),
        2: (data, obj) => obj.sn = structs.getU32(data),
        3: (data, obj) => obj.metric = structs.getU32(data),
        4: (data, obj) => obj.exptime = structs.getU32(data),
        5: (data, obj) => obj.flags = parseMpathFlags(structs.getU8(data)),
        6: (data, obj) => obj.discoveryTimeout = structs.getU32(data),
        7: (data, obj) => obj.discoveryRetries = structs.getU8(data),
        8: (data, obj) => obj.hopCount = data,
        9: (data, obj) => obj.pathChange = data,
    })
}

/** Encodes a [[MpathInfo]] object into a stream of attributes */
export function formatMpathInfo(x: MpathInfo): StreamData {
    return structs.putObject(x, {
        frameQlen: (data, obj) => data.push(1, structs.putU32(obj.frameQlen!)),
        sn: (data, obj) => data.push(2, structs.putU32(obj.sn!)),
        metric: (data, obj) => data.push(3, structs.putU32(obj.metric!)),
        exptime: (data, obj) => data.push(4, structs.putU32(obj.exptime!)),
        flags: (data, obj) => data.push(5, structs.putU8(formatMpathFlags(obj.flags!))),
        discoveryTimeout: (data, obj) => data.push(6, structs.putU32(obj.discoveryTimeout!)),
        discoveryRetries: (data, obj) => data.push(7, structs.putU8(obj.discoveryRetries!)),
        hopCount: (data, obj) => data.push(8, obj.hopCount!),
        pathChange: (data, obj) => data.push(9, obj.pathChange!),
    })
}

/** Interface type data attributes */
export interface BandInterfaceType extends BaseObject {
    /**
     * nested attribute containing a flag attribute
     * for each interface type that supports the band data
     */
    iftypes?: InterfaceTypeSet
    
    /**
     * HE MAC capabilities as in HE
     * capabilities IE
     */
    heCapMac?: Buffer
    
    /**
     * HE PHY capabilities as in HE
     * capabilities IE
     */
    heCapPhy?: Buffer
    
    /**
     * HE supported NSS/MCS as in HE
     * capabilities IE
     */
    heCapMcsSet?: Buffer
    
    /**
     * HE PPE thresholds information as
     * defined in HE capabilities IE
     */
    heCapPpe?: Buffer
}

/** Parses the attributes of a [[BandInterfaceType]] object */
export function parseBandInterfaceType(r: Buffer): BandInterfaceType {
    return structs.getObject(r, {
        1: (data, obj) => obj.iftypes = parseInterfaceTypeSetAttr(data),
        2: (data, obj) => obj.heCapMac = data,
        3: (data, obj) => obj.heCapPhy = data,
        4: (data, obj) => obj.heCapMcsSet = data,
        5: (data, obj) => obj.heCapPpe = data,
    })
}

/** Encodes a [[BandInterfaceType]] object into a stream of attributes */
export function formatBandInterfaceType(x: BandInterfaceType): StreamData {
    return structs.putObject(x, {
        iftypes: (data, obj) => data.push(1, formatInterfaceTypeSetAttr(obj.iftypes!)),
        heCapMac: (data, obj) => data.push(2, obj.heCapMac!),
        heCapPhy: (data, obj) => data.push(3, obj.heCapPhy!),
        heCapMcsSet: (data, obj) => data.push(4, obj.heCapMcsSet!),
        heCapPpe: (data, obj) => data.push(5, obj.heCapPpe!),
    })
}

/** band attributes */
export interface Band extends BaseObject {
    /**
     * supported frequencies in this band,
     * an array of nested frequency attributes
     */
    freqs?: Frequency[]
    
    /**
     * supported bitrates in this band,
     * an array of nested bitrate attributes
     */
    rates?: Bitrate[]
    
    /**
     * 16-byte attribute containing the MCS set as
     * defined in 802.11n
     */
    htMcsSet?: Buffer
    
    /** HT capabilities, as in the HT information IE */
    htCapa?: number
    
    /** A-MPDU factor, as in 11n */
    htAmpduFactor?: number
    
    /** A-MPDU density, as in 11n */
    htAmpduDensity?: number
    
    /**
     * 32-byte attribute containing the MCS set as
     * defined in 802.11ac
     */
    vhtMcsSet?: Buffer
    
    /** VHT capabilities, as in the HT information IE */
    vhtCapa?: number
    
    /**
     * nested array attribute, with each entry using
     * attributes from &enum nl80211_band_iftype_attr
     */
    iftypeData?: BandInterfaceType[]
    
    /**
     * bitmap that indicates the 2.16 GHz
     * channel(s) that are allowed to be used for EDMG transmissions.
     * Defined by IEEE P802.11ay/D4.0 section 9.4.2.251.
     */
    edmgChannels?: Buffer
    
    /**
     * Channel BW Configuration subfield encodes
     * the allowed channel bandwidth configurations.
     * Defined by IEEE P802.11ay/D4.0 section 9.4.2.251, Table 13.
     */
    edmgBwConfig?: Buffer
}

/** Parses the attributes of a [[Band]] object */
export function parseBand(r: Buffer): Band {
    return structs.getObject(r, {
        1: (data, obj) => obj.freqs = structs.getArray(data, x => parseFrequency(x), { zero: true }),
        2: (data, obj) => obj.rates = structs.getArray(data, x => parseBitrate(x), { zero: true }),
        3: (data, obj) => obj.htMcsSet = data,
        4: (data, obj) => obj.htCapa = structs.getU16(data),
        5: (data, obj) => obj.htAmpduFactor = structs.getU8(data),
        6: (data, obj) => obj.htAmpduDensity = structs.getU8(data),
        7: (data, obj) => obj.vhtMcsSet = data,
        8: (data, obj) => obj.vhtCapa = structs.getU32(data),
        9: (data, obj) => obj.iftypeData = structs.getArray(data, x => parseBandInterfaceType(x)),
        10: (data, obj) => obj.edmgChannels = data,
        11: (data, obj) => obj.edmgBwConfig = data,
    })
}

/** Encodes a [[Band]] object into a stream of attributes */
export function formatBand(x: Band): StreamData {
    return structs.putObject(x, {
        freqs: (data, obj) => data.push(1, structs.putArray(obj.freqs!, x => formatFrequency(x), { zero: true })),
        rates: (data, obj) => data.push(2, structs.putArray(obj.rates!, x => formatBitrate(x), { zero: true })),
        htMcsSet: (data, obj) => data.push(3, obj.htMcsSet!),
        htCapa: (data, obj) => data.push(4, structs.putU16(obj.htCapa!)),
        htAmpduFactor: (data, obj) => data.push(5, structs.putU8(obj.htAmpduFactor!)),
        htAmpduDensity: (data, obj) => data.push(6, structs.putU8(obj.htAmpduDensity!)),
        vhtMcsSet: (data, obj) => data.push(7, obj.vhtMcsSet!),
        vhtCapa: (data, obj) => data.push(8, structs.putU32(obj.vhtCapa!)),
        iftypeData: (data, obj) => data.push(9, structs.putArray(obj.iftypeData!, x => formatBandInterfaceType(x))),
        edmgChannels: (data, obj) => data.push(10, obj.edmgChannels!),
        edmgBwConfig: (data, obj) => data.push(11, obj.edmgBwConfig!),
    })
}

/** regulatory wmm rule */
export interface WmmRule extends BaseObject {
    /** Minimum contention window slot. */
    cwMin?: Buffer
    
    /** Maximum contention window slot. */
    cwMax?: Buffer
    
    /** Arbitration Inter Frame Space. */
    aifsn?: Buffer
    
    /** Maximum allowed tx operation time. */
    txop?: Buffer
}

/** Parses the attributes of a [[WmmRule]] object */
export function parseWmmRule(r: Buffer): WmmRule {
    return structs.getObject(r, {
        1: (data, obj) => obj.cwMin = data,
        2: (data, obj) => obj.cwMax = data,
        3: (data, obj) => obj.aifsn = data,
        4: (data, obj) => obj.txop = data,
    })
}

/** Encodes a [[WmmRule]] object into a stream of attributes */
export function formatWmmRule(x: WmmRule): StreamData {
    return structs.putObject(x, {
        cwMin: (data, obj) => data.push(1, obj.cwMin!),
        cwMax: (data, obj) => data.push(2, obj.cwMax!),
        aifsn: (data, obj) => data.push(3, obj.aifsn!),
        txop: (data, obj) => data.push(4, obj.txop!),
    })
}

/**
 * frequency attributes
 *
 * See https://apps.fcc.gov/eas/comments/GetPublishedDocument.html?id=327&tn=528122
 * for more information on the FCC description of the relaxations allowed
 * by NL80211_FREQUENCY_ATTR_INDOOR_ONLY and
 * NL80211_FREQUENCY_ATTR_IR_CONCURRENT.
 */
export interface Frequency extends BaseObject {
    /** Frequency in MHz */
    freq?: number
    
    /**
     * Channel is disabled in current
     * regulatory domain.
     */
    disabled?: true
    
    /**
     * no mechanisms that initiate radiation
     * are permitted on this channel, this includes sending probe
     * requests, or modes of operation that require beaconing.
     */
    noIr?: true
    
    __noIbss?: true
    
    /**
     * Radar detection is mandatory
     * on this channel in current regulatory domain.
     */
    radar?: true
    
    /**
     * Maximum transmission power in mBm
     * (100 * dBm).
     */
    maxTxPower?: number
    
    /**
     * current state for DFS
     * (enum nl80211_dfs_state)
     */
    dfsState?: DfsState | keyof typeof DfsState
    
    /**
     * time in miliseconds for how long
     * this channel is in this DFS state.
     */
    dfsTime?: number
    
    /**
     * HT40- isn't possible with this
     * channel as the control channel
     */
    noHt40Minus?: true
    
    /**
     * HT40+ isn't possible with this
     * channel as the control channel
     */
    noHt40Plus?: true
    
    /**
     * any 80 MHz channel using this channel
     * as the primary or any of the secondary channels isn't possible,
     * this includes 80+80 channels
     */
    no80mhz?: true
    
    /**
     * any 160 MHz (but not 80+80) channel
     * using this channel as the primary or any of the secondary channels
     * isn't possible
     */
    no160mhz?: true
    
    /** DFS CAC time in milliseconds. */
    dfsCacTime?: number
    
    /**
     * Only indoor use is permitted on this
     * channel. A channel that has the INDOOR_ONLY attribute can only be
     * used when there is a clear assessment that the device is operating in
     * an indoor surroundings, i.e., it is connected to AC power (and not
     * through portable DC inverters) or is under the control of a master
     * that is acting as an AP and is connected to AC power.
     */
    indoorOnly?: true
    
    /**
     * IR operation is allowed on this
     * channel if it's connected concurrently to a BSS on the same channel on
     * the 2 GHz band or to a channel in the same UNII band (on the 5 GHz
     * band), and IEEE80211_CHAN_RADAR is not set. Instantiating a GO or TDLS
     * off-channel on a channel that has the IR_CONCURRENT attribute set can be
     * done when there is a clear assessment that the device is operating under
     * the guidance of an authorized master, i.e., setting up a GO or TDLS
     * off-channel while the device is also connected to an AP with DFS and
     * radar detection on the UNII band (it is up to user-space, i.e.,
     * wpa_supplicant to perform the required verifications). Using this
     * attribute for IR is disallowed for master interfaces (IBSS, AP).
     */
    irConcurrent?: true
    
    /**
     * 20 MHz operation is not allowed
     * on this channel in current regulatory domain.
     */
    no20mhz?: true
    
    /**
     * 10 MHz operation is not allowed
     * on this channel in current regulatory domain.
     */
    no10mhz?: true
    
    /**
     * this channel has wmm limitations.
     * This is a nested attribute that contains the wmm limitation per AC.
     * (see &enum nl80211_wmm_rule)
     */
    wmm?: WmmRule
}

/** Parses the attributes of a [[Frequency]] object */
export function parseFrequency(r: Buffer): Frequency {
    return structs.getObject(r, {
        1: (data, obj) => obj.freq = structs.getU32(data),
        2: (data, obj) => obj.disabled = structs.getFlag(data),
        3: (data, obj) => obj.noIr = structs.getFlag(data),
        4: (data, obj) => obj.__noIbss = structs.getFlag(data),
        5: (data, obj) => obj.radar = structs.getFlag(data),
        6: (data, obj) => obj.maxTxPower = structs.getU32(data),
        7: (data, obj) => obj.dfsState = structs.getEnum(DfsState, structs.getU32(data)),
        8: (data, obj) => obj.dfsTime = structs.getU32(data),
        9: (data, obj) => obj.noHt40Minus = structs.getFlag(data),
        10: (data, obj) => obj.noHt40Plus = structs.getFlag(data),
        11: (data, obj) => obj.no80mhz = structs.getFlag(data),
        12: (data, obj) => obj.no160mhz = structs.getFlag(data),
        13: (data, obj) => obj.dfsCacTime = structs.getU32(data),
        14: (data, obj) => obj.indoorOnly = structs.getFlag(data),
        15: (data, obj) => obj.irConcurrent = structs.getFlag(data),
        16: (data, obj) => obj.no20mhz = structs.getFlag(data),
        17: (data, obj) => obj.no10mhz = structs.getFlag(data),
        18: (data, obj) => obj.wmm = parseWmmRule(data),
    })
}

/** Encodes a [[Frequency]] object into a stream of attributes */
export function formatFrequency(x: Frequency): StreamData {
    return structs.putObject(x, {
        freq: (data, obj) => data.push(1, structs.putU32(obj.freq!)),
        disabled: (data, obj) => data.push(2, structs.putFlag(obj.disabled!)),
        noIr: (data, obj) => data.push(3, structs.putFlag(obj.noIr!)),
        __noIbss: (data, obj) => data.push(4, structs.putFlag(obj.__noIbss!)),
        radar: (data, obj) => data.push(5, structs.putFlag(obj.radar!)),
        maxTxPower: (data, obj) => data.push(6, structs.putU32(obj.maxTxPower!)),
        dfsState: (data, obj) => data.push(7, structs.putU32(structs.putEnum(DfsState, obj.dfsState!))),
        dfsTime: (data, obj) => data.push(8, structs.putU32(obj.dfsTime!)),
        noHt40Minus: (data, obj) => data.push(9, structs.putFlag(obj.noHt40Minus!)),
        noHt40Plus: (data, obj) => data.push(10, structs.putFlag(obj.noHt40Plus!)),
        no80mhz: (data, obj) => data.push(11, structs.putFlag(obj.no80mhz!)),
        no160mhz: (data, obj) => data.push(12, structs.putFlag(obj.no160mhz!)),
        dfsCacTime: (data, obj) => data.push(13, structs.putU32(obj.dfsCacTime!)),
        indoorOnly: (data, obj) => data.push(14, structs.putFlag(obj.indoorOnly!)),
        irConcurrent: (data, obj) => data.push(15, structs.putFlag(obj.irConcurrent!)),
        no20mhz: (data, obj) => data.push(16, structs.putFlag(obj.no20mhz!)),
        no10mhz: (data, obj) => data.push(17, structs.putFlag(obj.no10mhz!)),
        wmm: (data, obj) => data.push(18, formatWmmRule(obj.wmm!)),
    })
}

/** bitrate attributes */
export interface Bitrate extends BaseObject {
    /** Bitrate in units of 100 kbps */
    rate?: number
    
    /**
     * Short preamble supported
     * in 2.4 GHz band.
     */
    _2ghzShortpreamble?: true
}

/** Parses the attributes of a [[Bitrate]] object */
export function parseBitrate(r: Buffer): Bitrate {
    return structs.getObject(r, {
        1: (data, obj) => obj.rate = structs.getU32(data),
        2: (data, obj) => obj._2ghzShortpreamble = structs.getFlag(data),
    })
}

/** Encodes a [[Bitrate]] object into a stream of attributes */
export function formatBitrate(x: Bitrate): StreamData {
    return structs.putObject(x, {
        rate: (data, obj) => data.push(1, structs.putU32(obj.rate!)),
        _2ghzShortpreamble: (data, obj) => data.push(2, structs.putFlag(obj._2ghzShortpreamble!)),
    })
}

/** Indicates the initiator of a reg domain request */
export enum RegulatoryInitiator {
    /**
     * Core queried CRDA for a dynamic world
     * regulatory domain.
     */
    CORE,
    
    /**
     * User asked the wireless core to set the
     * regulatory domain.
     */
    USER = 1,
    
    /**
     * a wireless drivers has hinted to the
     * wireless core it thinks its knows the regulatory domain we should be in.
     */
    DRIVER = 2,
    
    /**
     * the wireless core has received an
     * 802.11 country information element with regulatory information it
     * thinks we should consider. cfg80211 only processes the country
     * code from the IE, and relies on the regulatory domain information
     * structure passed by userspace (CRDA) from our wireless-regdb.
     * If a channel is enabled but the country code indicates it should
     * be disabled we disable the channel and re-enable it upon disassociation.
     */
    COUNTRY_IE = 3,
}

/** specifies the type of regulatory domain */
export enum RegulatoryType {
    /**
     * the regulatory domain set is one that pertains
     * to a specific country. When this is set you can count on the
     * ISO / IEC 3166 alpha2 country code being valid.
     */
    COUNTRY,
    
    /**
     * the regulatory set domain is the world regulatory
     * domain.
     */
    WORLD = 1,
    
    /**
     * the regulatory domain set is a custom
     * driver specific world regulatory domain. These do not apply system-wide
     * and are only applicable to the individual devices which have requested
     * them to be applied.
     */
    CUSTOM_WORLD = 2,
    
    /**
     * the regulatory domain set is the product
     * of an intersection between two regulatory domains -- the previously
     * set regulatory domain on the system and the last accepted regulatory
     * domain request to be processed.
     */
    INTERSECTION = 3,
}

/** regulatory rule attributes */
export interface RegulatoryRule extends BaseObject {
    /**
     * a set of flags which specify additional
     * considerations for a given frequency range. These are the
     * &enum nl80211_reg_rule_flags.
     */
    regRuleFlags?: RegulatoryRuleFlags
    
    /**
     * starting frequencry for the regulatory
     * rule in KHz. This is not a center of frequency but an actual regulatory
     * band edge.
     */
    freqRangeStart?: number
    
    /**
     * ending frequency for the regulatory rule
     * in KHz. This is not a center a frequency but an actual regulatory
     * band edge.
     */
    freqRangeEnd?: number
    
    /**
     * maximum allowed bandwidth for this
     * frequency range, in KHz.
     */
    freqRangeMaxBw?: number
    
    /**
     * the maximum allowed antenna gain
     * for a given frequency range. The value is in mBi (100 * dBi).
     * If you don't have one then don't send this.
     */
    powerRuleMaxAntGain?: number
    
    /**
     * the maximum allowed EIRP for
     * a given frequency range. The value is in mBm (100 * dBm).
     */
    powerRuleMaxEirp?: number
    
    /**
     * DFS CAC time in milliseconds.
     * If not present or 0 default CAC time will be used.
     */
    dfsCacTime?: number
}

/** Parses the attributes of a [[RegulatoryRule]] object */
export function parseRegulatoryRule(r: Buffer): RegulatoryRule {
    return structs.getObject(r, {
        1: (data, obj) => obj.regRuleFlags = parseRegulatoryRuleFlags(structs.getU32(data)),
        2: (data, obj) => obj.freqRangeStart = structs.getU32(data),
        3: (data, obj) => obj.freqRangeEnd = structs.getU32(data),
        4: (data, obj) => obj.freqRangeMaxBw = structs.getU32(data),
        5: (data, obj) => obj.powerRuleMaxAntGain = structs.getU32(data),
        6: (data, obj) => obj.powerRuleMaxEirp = structs.getU32(data),
        7: (data, obj) => obj.dfsCacTime = structs.getU32(data),
    })
}

/** Encodes a [[RegulatoryRule]] object into a stream of attributes */
export function formatRegulatoryRule(x: RegulatoryRule): StreamData {
    return structs.putObject(x, {
        regRuleFlags: (data, obj) => data.push(1, structs.putU32(formatRegulatoryRuleFlags(obj.regRuleFlags!))),
        freqRangeStart: (data, obj) => data.push(2, structs.putU32(obj.freqRangeStart!)),
        freqRangeEnd: (data, obj) => data.push(3, structs.putU32(obj.freqRangeEnd!)),
        freqRangeMaxBw: (data, obj) => data.push(4, structs.putU32(obj.freqRangeMaxBw!)),
        powerRuleMaxAntGain: (data, obj) => data.push(5, structs.putU32(obj.powerRuleMaxAntGain!)),
        powerRuleMaxEirp: (data, obj) => data.push(6, structs.putU32(obj.powerRuleMaxEirp!)),
        dfsCacTime: (data, obj) => data.push(7, structs.putU32(obj.dfsCacTime!)),
    })
}

/** scheduled scan match attributes */
export interface ScheduledScanMatch extends BaseObject {
    /**
     * SSID to be used for matching,
     * only report BSS with matching SSID.
     * (This cannot be used together with BSSID.)
     */
    attrSsid?: Buffer
    
    /**
     * RSSI threshold (in dBm) for reporting a
     * BSS in scan results. Filtering is turned off if not specified. Note that
     * if this attribute is in a match set of its own, then it is treated as
     * the default value for all matchsets with an SSID, rather than being a
     * matchset of its own without an RSSI filter. This is due to problems with
     * how this API was implemented in the past. Also, due to the same problem,
     * the only way to create a matchset with only an RSSI filter (with this
     * attribute) is if there's only a single matchset with the RSSI attribute.
     */
    attrRssi?: Buffer
    
    /**
     * Flag indicating whether
     * %NL80211_SCHED_SCAN_MATCH_ATTR_RSSI to be used as absolute RSSI or
     * relative to current bss's RSSI.
     */
    attrRelativeRssi?: true
    
    /**
     * When present the RSSI level for
     * BSS-es in the specified band is to be adjusted before doing
     * RSSI-based BSS selection. The attribute value is a packed structure
     * value as specified by &struct nl80211_bss_select_rssi_adjust.
     */
    attrRssiAdjust?: Buffer
    
    /**
     * BSSID to be used for matching
     * (this cannot be used together with SSID).
     */
    attrBssid?: Buffer
    
    /**
     * Nested attribute that carries the
     * band specific minimum rssi thresholds for the bands defined in
     * enum nl80211_band. The minimum rssi threshold value(s32) specific to a
     * band shall be encapsulated in attribute with type value equals to one
     * of the NL80211_BAND_* defined in enum nl80211_band. For example, the
     * minimum rssi threshold value for 2.4GHZ band shall be encapsulated
     * within an attribute of type NL80211_BAND_2GHZ. And one or more of such
     * attributes will be nested within this attribute.
     */
    perBandRssi?: BandId | keyof typeof BandId
}

/** Parses the attributes of a [[ScheduledScanMatch]] object */
export function parseScheduledScanMatch(r: Buffer): ScheduledScanMatch {
    return structs.getObject(r, {
        1: (data, obj) => obj.attrSsid = data,
        2: (data, obj) => obj.attrRssi = data,
        3: (data, obj) => obj.attrRelativeRssi = structs.getFlag(data),
        4: (data, obj) => obj.attrRssiAdjust = data,
        5: (data, obj) => obj.attrBssid = data,
        6: (data, obj) => obj.perBandRssi = structs.getEnum(BandId, structs.getS32(data)),
    })
}

/** Encodes a [[ScheduledScanMatch]] object into a stream of attributes */
export function formatScheduledScanMatch(x: ScheduledScanMatch): StreamData {
    return structs.putObject(x, {
        attrSsid: (data, obj) => data.push(1, obj.attrSsid!),
        attrRssi: (data, obj) => data.push(2, obj.attrRssi!),
        attrRelativeRssi: (data, obj) => data.push(3, structs.putFlag(obj.attrRelativeRssi!)),
        attrRssiAdjust: (data, obj) => data.push(4, obj.attrRssiAdjust!),
        attrBssid: (data, obj) => data.push(5, obj.attrBssid!),
        perBandRssi: (data, obj) => data.push(6, structs.putS32(structs.putEnum(BandId, obj.perBandRssi!))),
    })
}

/** regulatory rule flags */
export interface RegulatoryRuleFlags {
    /** OFDM modulation not allowed */
    noOfdm?: true
    
    /** CCK modulation not allowed */
    noCck?: true
    
    /** indoor operation not allowed */
    noIndoor?: true
    
    /** outdoor operation not allowed */
    noOutdoor?: true
    
    /** DFS support is required to be used */
    dfs?: true
    
    /** this is only for Point To Point links */
    ptpOnly?: true
    
    /** this is only for Point To Multi Point links */
    ptmpOnly?: true
    
    /**
     * no mechanisms that initiate radiation are allowed,
     * this includes probe requests or modes of operation that require
     * beaconing.
     */
    noIr?: true
    
    __noIbss?: true
    
    /**
     * maximum available bandwidth should be calculated
     * base on contiguous rules and wider channels will be allowed to cross
     * multiple contiguous/overlapping frequency ranges.
     */
    autoBw?: true
    
    /** See %NL80211_FREQUENCY_ATTR_IR_CONCURRENT */
    irConcurrent?: true
    
    /** channels can't be used in HT40- operation */
    noHt40minus?: true
    
    /** channels can't be used in HT40+ operation */
    noHt40plus?: true
    
    /** 80MHz operation not allowed */
    no80mhz?: true
    
    /** 160MHz operation not allowed */
    no160mhz?: true
}

/** Parses the flags in a [[RegulatoryRuleFlags]] bitmask */
export function parseRegulatoryRuleFlags(r: number): RegulatoryRuleFlags {
    const x: RegulatoryRuleFlags = {}
    if (r & (1)) x.noOfdm = true
    if (r & (2)) x.noCck = true
    if (r & (4)) x.noIndoor = true
    if (r & (8)) x.noOutdoor = true
    if (r & (16)) x.dfs = true
    if (r & (32)) x.ptpOnly = true
    if (r & (64)) x.ptmpOnly = true
    if (r & (128)) x.noIr = true
    if (r & (256)) x.__noIbss = true
    if (r & (2048)) x.autoBw = true
    if (r & (4096)) x.irConcurrent = true
    if (r & (8192)) x.noHt40minus = true
    if (r & (16384)) x.noHt40plus = true
    if (r & (32768)) x.no80mhz = true
    if (r & (65536)) x.no160mhz = true
    return x
}

/** Encodes a [[RegulatoryRuleFlags]] bitmask */
export function formatRegulatoryRuleFlags(x: RegulatoryRuleFlags): number {
    let r = 0
    if (x.noOfdm) r |= 1
    if (x.noCck) r |= 2
    if (x.noIndoor) r |= 4
    if (x.noOutdoor) r |= 8
    if (x.dfs) r |= 16
    if (x.ptpOnly) r |= 32
    if (x.ptmpOnly) r |= 64
    if (x.noIr) r |= 128
    if (x.__noIbss) r |= 256
    if (x.autoBw) r |= 2048
    if (x.irConcurrent) r |= 4096
    if (x.noHt40minus) r |= 8192
    if (x.noHt40plus) r |= 16384
    if (x.no80mhz) r |= 32768
    if (x.no160mhz) r |= 65536
    return r
}

/** regulatory DFS regions */
export enum DfsRegions {
    /** Country has no DFS master region specified */
    UNSET,
    
    /** Country follows DFS master rules from FCC */
    FCC = 1,
    
    /** Country follows DFS master rules from ETSI */
    ETSI = 2,
    
    /** Country follows DFS master rules from JP/MKK/Telec */
    JP = 3,
}

/** type of user regulatory hint */
export enum UserRegulatoryHintType {
    /**
     * a user sent the hint. This is always
     * assumed if the attribute is not set.
     */
    USER,
    
    /**
     * the hint comes from a cellular
     * base station. Device drivers that have been tested to work
     * properly to support this type of hint can enable these hints
     * by setting the NL80211_FEATURE_CELL_BASE_REG_HINTS feature
     * capability on the struct wiphy. The wireless core will
     * ignore all cell base station hints until at least one device
     * present has been registered with the wireless core that
     * has listed NL80211_FEATURE_CELL_BASE_REG_HINTS as a
     * supported feature.
     */
    CELL_BASE = 1,
    
    /**
     * a user sent an hint indicating that the
     * platform is operating in an indoor environment.
     */
    INDOOR = 2,
}

/**
 * survey information
 *
 * These attribute types are used with %NL80211_ATTR_SURVEY_INFO
 * when getting information about a survey.
 */
export interface SurveyInfo extends BaseObject {
    /** center frequency of channel */
    frequency?: number
    
    /** noise level of channel (u8, dBm) */
    noise?: number
    
    /** channel is currently being used */
    inUse?: Buffer
    
    /**
     * amount of time (in ms) that the radio
     * was turned on (on channel or globally)
     */
    time?: bigint
    
    /**
     * amount of the time the primary
     * channel was sensed busy (either due to activity or energy detect)
     */
    timeBusy?: bigint
    
    /**
     * amount of time the extension
     * channel was sensed busy
     */
    timeExtBusy?: bigint
    
    /**
     * amount of time the radio spent
     * receiving data (on channel or globally)
     */
    timeRx?: bigint
    
    /**
     * amount of time the radio spent
     * transmitting data (on channel or globally)
     */
    timeTx?: bigint
    
    /**
     * time the radio spent for scan
     * (on this channel or globally)
     */
    timeScan?: Buffer
    
    /** attribute used for padding for 64-bit alignment */
    pad?: Buffer
    
    /**
     * amount of time the radio spent
     * receiving frames destined to the local BSS
     */
    timeBssRx?: Buffer
}

/** Parses the attributes of a [[SurveyInfo]] object */
export function parseSurveyInfo(r: Buffer): SurveyInfo {
    return structs.getObject(r, {
        1: (data, obj) => obj.frequency = structs.getU32(data),
        2: (data, obj) => obj.noise = structs.getU8(data),
        3: (data, obj) => obj.inUse = data,
        4: (data, obj) => obj.time = structs.getU64(data),
        5: (data, obj) => obj.timeBusy = structs.getU64(data),
        6: (data, obj) => obj.timeExtBusy = structs.getU64(data),
        7: (data, obj) => obj.timeRx = structs.getU64(data),
        8: (data, obj) => obj.timeTx = structs.getU64(data),
        9: (data, obj) => obj.timeScan = data,
        10: (data, obj) => obj.pad = data,
        11: (data, obj) => obj.timeBssRx = data,
    })
}

/** Encodes a [[SurveyInfo]] object into a stream of attributes */
export function formatSurveyInfo(x: SurveyInfo): StreamData {
    return structs.putObject(x, {
        frequency: (data, obj) => data.push(1, structs.putU32(obj.frequency!)),
        noise: (data, obj) => data.push(2, structs.putU8(obj.noise!)),
        inUse: (data, obj) => data.push(3, obj.inUse!),
        time: (data, obj) => data.push(4, structs.putU64(obj.time!)),
        timeBusy: (data, obj) => data.push(5, structs.putU64(obj.timeBusy!)),
        timeExtBusy: (data, obj) => data.push(6, structs.putU64(obj.timeExtBusy!)),
        timeRx: (data, obj) => data.push(7, structs.putU64(obj.timeRx!)),
        timeTx: (data, obj) => data.push(8, structs.putU64(obj.timeTx!)),
        timeScan: (data, obj) => data.push(9, obj.timeScan!),
        pad: (data, obj) => data.push(10, obj.pad!),
        timeBssRx: (data, obj) => data.push(11, obj.timeBssRx!),
    })
}

/**
 * monitor configuration flags
 *
 * Monitor configuration flags.
 */
export interface MonitorFlags extends BaseObject {
    /** pass frames with bad FCS */
    fcsfail?: true
    
    /** pass frames with bad PLCP */
    plcpfail?: true
    
    /** pass control frames */
    control?: true
    
    /** disable BSSID filtering */
    otherBss?: true
    
    /**
     * report frames after processing.
     * overrides all other flags.
     */
    cookFrames?: true
    
    /**
     * use the configured MAC address
     * and ACK incoming unicast packets.
     */
    active?: true
}

/** Parses the attributes of a [[MonitorFlags]] object */
export function parseMonitorFlags(r: Buffer): MonitorFlags {
    return structs.getObject(r, {
        1: (data, obj) => obj.fcsfail = structs.getFlag(data),
        2: (data, obj) => obj.plcpfail = structs.getFlag(data),
        3: (data, obj) => obj.control = structs.getFlag(data),
        4: (data, obj) => obj.otherBss = structs.getFlag(data),
        5: (data, obj) => obj.cookFrames = structs.getFlag(data),
        6: (data, obj) => obj.active = structs.getFlag(data),
    })
}

/** Encodes a [[MonitorFlags]] object into a stream of attributes */
export function formatMonitorFlags(x: MonitorFlags): StreamData {
    return structs.putObject(x, {
        fcsfail: (data, obj) => data.push(1, structs.putFlag(obj.fcsfail!)),
        plcpfail: (data, obj) => data.push(2, structs.putFlag(obj.plcpfail!)),
        control: (data, obj) => data.push(3, structs.putFlag(obj.control!)),
        otherBss: (data, obj) => data.push(4, structs.putFlag(obj.otherBss!)),
        cookFrames: (data, obj) => data.push(5, structs.putFlag(obj.cookFrames!)),
        active: (data, obj) => data.push(6, structs.putFlag(obj.active!)),
    })
}

/**
 * mesh power save modes
 *
 * @__NL80211_MESH_POWER_AFTER_LAST - internal use
 * @NL80211_MESH_POWER_MAX - highest possible power save level
 */
export enum MeshPowerMode {
    /**
     * The mesh power mode of the mesh STA is
     * not known or has not been set yet.
     */
    UNKNOWN,
    
    /**
     * Active mesh power mode. The mesh STA is
     * in Awake state all the time.
     */
    ACTIVE = 1,
    
    /**
     * Light sleep mode. The mesh STA will
     * alternate between Active and Doze states, but will wake up for
     * neighbor's beacons.
     */
    LIGHT_SLEEP = 2,
    
    /**
     * Deep sleep mode. The mesh STA will
     * alternate between Active and Doze states, but may not wake up
     * for neighbor's beacons.
     */
    DEEP_SLEEP = 3,
}

/**
 * mesh configuration parameters
 *
 * Mesh configuration parameters. These can be changed while the mesh is
 * active.
 */
export interface MeshconfParams extends BaseObject {
    /**
     * specifies the initial retry timeout in
     * millisecond units, used by the Peer Link Open message
     */
    retryTimeout?: Buffer
    
    /**
     * specifies the initial confirm timeout, in
     * millisecond units, used by the peer link management to close a peer link
     */
    confirmTimeout?: Buffer
    
    /**
     * specifies the holding timeout, in
     * millisecond units
     */
    holdingTimeout?: Buffer
    
    /**
     * maximum number of peer links allowed
     * on this mesh interface
     */
    maxPeerLinks?: Buffer
    
    /**
     * specifies the maximum number of peer link
     * open retries that can be sent to establish a new peer link instance in a
     * mesh
     */
    maxRetries?: Buffer
    
    /**
     * specifies the value of TTL field set at a source mesh
     * point.
     */
    ttl?: Buffer
    
    /**
     * whether we should automatically open
     * peer links when we detect compatible mesh peers. Disabled if
     * @NL80211_MESH_SETUP_USERSPACE_MPM or @NL80211_MESH_SETUP_USERSPACE_AMPE are
     * set.
     */
    autoOpenPlinks?: Buffer
    
    /**
     * the number of action frames
     * containing a PREQ that an MP can send to a particular destination (path
     * target)
     */
    hwmpMaxPreqRetries?: Buffer
    
    /**
     * how frequently to refresh mesh paths
     * (in milliseconds)
     */
    pathRefreshTime?: Buffer
    
    /**
     * minimum length of time to wait
     * until giving up on a path discovery (in milliseconds)
     */
    minDiscoveryTimeout?: Buffer
    
    /**
     * The time (in TUs) for which mesh
     * points receiving a PREQ shall consider the forwarding information from
     * the root to be valid. (TU = time unit)
     */
    hwmpActivePathTimeout?: Buffer
    
    /**
     * The minimum interval of time (in
     * TUs) during which an MP can send only one action frame containing a PREQ
     * reference element
     */
    hwmpPreqMinInterval?: Buffer
    
    /**
     * The interval of time (in TUs)
     * that it takes for an HWMP information element to propagate across the
     * mesh
     */
    hwmpNetDiamTrvsTime?: Buffer
    
    /** whether root mode is enabled or not */
    hwmpRootmode?: Buffer
    
    /**
     * specifies the value of TTL field set at a
     * source mesh point for path selection elements.
     */
    elementTtl?: Buffer
    
    /**
     * The interval of time (in TUs) between
     * root announcements are transmitted.
     */
    hwmpRannInterval?: Buffer
    
    /**
     * Advertise that this mesh station has
     * access to a broader network beyond the MBSS.  This is done via Root
     * Announcement frames.
     */
    gateAnnouncements?: Buffer
    
    /**
     * The minimum interval of time (in
     * TUs) during which a mesh STA can send only one Action frame containing a
     * PERR element.
     */
    hwmpPerrMinInterval?: Buffer
    
    /**
     * set Mesh STA as forwarding or non-forwarding
     * or forwarding entity (default is TRUE - forwarding entity)
     */
    forwarding?: Buffer
    
    /**
     * RSSI threshold in dBm. This specifies the
     * threshold for average signal strength of candidate station to establish
     * a peer link.
     */
    rssiThreshold?: Buffer
    
    /**
     * maximum number of neighbors
     * to synchronize to for 11s default synchronization method
     * (see 11C.12.2.2)
     */
    syncOffsetMaxNeighbor?: Buffer
    
    /** set mesh HT protection mode. */
    htOpmode?: Buffer
    
    /**
     * The time (in TUs) for
     * which mesh STAs receiving a proactive PREQ shall consider the forwarding
     * information to the root mesh STA to be valid.
     */
    hwmpPathToRootTimeout?: Buffer
    
    /**
     * The interval of time (in TUs) between
     * proactive PREQs are transmitted.
     */
    hwmpRootInterval?: Buffer
    
    /**
     * The minimum interval of time
     * (in TUs) during which a mesh STA can send only one Action frame
     * containing a PREQ element for root path confirmation.
     */
    hwmpConfirmationInterval?: Buffer
    
    /**
     * Default mesh power mode for new peer links.
     * type &enum nl80211_mesh_power_mode (u32)
     */
    powerMode?: MeshPowerMode | keyof typeof MeshPowerMode
    
    /** awake window duration (in TUs) */
    awakeWindow?: Buffer
    
    /**
     * If no tx activity is seen from a STA we've
     * established peering with for longer than this time (in seconds), then
     * remove it from the STA's list of peers. You may set this to 0 to disable
     * the removal of the STA. Default is 30 minutes.
     */
    plinkTimeout?: boolean
    
    /**
     * If set to true then this mesh STA
     * will advertise that it is connected to a gate in the mesh formation
     * field.  If left unset then the mesh formation field will only
     * advertise such if there is an active root mesh path.
     */
    connectedToGate?: true
}

/** Parses the attributes of a [[MeshconfParams]] object */
export function parseMeshconfParams(r: Buffer): MeshconfParams {
    return structs.getObject(r, {
        1: (data, obj) => obj.retryTimeout = data,
        2: (data, obj) => obj.confirmTimeout = data,
        3: (data, obj) => obj.holdingTimeout = data,
        4: (data, obj) => obj.maxPeerLinks = data,
        5: (data, obj) => obj.maxRetries = data,
        6: (data, obj) => obj.ttl = data,
        7: (data, obj) => obj.autoOpenPlinks = data,
        8: (data, obj) => obj.hwmpMaxPreqRetries = data,
        9: (data, obj) => obj.pathRefreshTime = data,
        10: (data, obj) => obj.minDiscoveryTimeout = data,
        11: (data, obj) => obj.hwmpActivePathTimeout = data,
        12: (data, obj) => obj.hwmpPreqMinInterval = data,
        13: (data, obj) => obj.hwmpNetDiamTrvsTime = data,
        14: (data, obj) => obj.hwmpRootmode = data,
        15: (data, obj) => obj.elementTtl = data,
        16: (data, obj) => obj.hwmpRannInterval = data,
        17: (data, obj) => obj.gateAnnouncements = data,
        18: (data, obj) => obj.hwmpPerrMinInterval = data,
        19: (data, obj) => obj.forwarding = data,
        20: (data, obj) => obj.rssiThreshold = data,
        21: (data, obj) => obj.syncOffsetMaxNeighbor = data,
        22: (data, obj) => obj.htOpmode = data,
        23: (data, obj) => obj.hwmpPathToRootTimeout = data,
        24: (data, obj) => obj.hwmpRootInterval = data,
        25: (data, obj) => obj.hwmpConfirmationInterval = data,
        26: (data, obj) => obj.powerMode = structs.getEnum(MeshPowerMode, structs.getU32(data)),
        27: (data, obj) => obj.awakeWindow = data,
        28: (data, obj) => obj.plinkTimeout = structs.getBool(data),
        29: (data, obj) => obj.connectedToGate = structs.getFlag(data),
    })
}

/** Encodes a [[MeshconfParams]] object into a stream of attributes */
export function formatMeshconfParams(x: MeshconfParams): StreamData {
    return structs.putObject(x, {
        retryTimeout: (data, obj) => data.push(1, obj.retryTimeout!),
        confirmTimeout: (data, obj) => data.push(2, obj.confirmTimeout!),
        holdingTimeout: (data, obj) => data.push(3, obj.holdingTimeout!),
        maxPeerLinks: (data, obj) => data.push(4, obj.maxPeerLinks!),
        maxRetries: (data, obj) => data.push(5, obj.maxRetries!),
        ttl: (data, obj) => data.push(6, obj.ttl!),
        autoOpenPlinks: (data, obj) => data.push(7, obj.autoOpenPlinks!),
        hwmpMaxPreqRetries: (data, obj) => data.push(8, obj.hwmpMaxPreqRetries!),
        pathRefreshTime: (data, obj) => data.push(9, obj.pathRefreshTime!),
        minDiscoveryTimeout: (data, obj) => data.push(10, obj.minDiscoveryTimeout!),
        hwmpActivePathTimeout: (data, obj) => data.push(11, obj.hwmpActivePathTimeout!),
        hwmpPreqMinInterval: (data, obj) => data.push(12, obj.hwmpPreqMinInterval!),
        hwmpNetDiamTrvsTime: (data, obj) => data.push(13, obj.hwmpNetDiamTrvsTime!),
        hwmpRootmode: (data, obj) => data.push(14, obj.hwmpRootmode!),
        elementTtl: (data, obj) => data.push(15, obj.elementTtl!),
        hwmpRannInterval: (data, obj) => data.push(16, obj.hwmpRannInterval!),
        gateAnnouncements: (data, obj) => data.push(17, obj.gateAnnouncements!),
        hwmpPerrMinInterval: (data, obj) => data.push(18, obj.hwmpPerrMinInterval!),
        forwarding: (data, obj) => data.push(19, obj.forwarding!),
        rssiThreshold: (data, obj) => data.push(20, obj.rssiThreshold!),
        syncOffsetMaxNeighbor: (data, obj) => data.push(21, obj.syncOffsetMaxNeighbor!),
        htOpmode: (data, obj) => data.push(22, obj.htOpmode!),
        hwmpPathToRootTimeout: (data, obj) => data.push(23, obj.hwmpPathToRootTimeout!),
        hwmpRootInterval: (data, obj) => data.push(24, obj.hwmpRootInterval!),
        hwmpConfirmationInterval: (data, obj) => data.push(25, obj.hwmpConfirmationInterval!),
        powerMode: (data, obj) => data.push(26, structs.putU32(structs.putEnum(MeshPowerMode, obj.powerMode!))),
        awakeWindow: (data, obj) => data.push(27, obj.awakeWindow!),
        plinkTimeout: (data, obj) => data.push(28, structs.putBool(obj.plinkTimeout!)),
        connectedToGate: (data, obj) => data.push(29, structs.putFlag(obj.connectedToGate!)),
    })
}

/**
 * mesh setup parameters
 *
 * Mesh setup parameters.  These are used to start/join a mesh and cannot be
 * changed while the mesh is active.
 */
export interface MeshSetupParams extends BaseObject {
    /**
     * Enable this option to use a
     * vendor specific path selection algorithm or disable it to use the
     * default HWMP.
     */
    enableVendorPathSel?: true
    
    /**
     * Enable this option to use a
     * vendor specific path metric or disable it to use the default Airtime
     * metric.
     */
    enableVendorMetric?: true
    
    /**
     * Information elements for this mesh, for instance, a
     * robust security network ie, or a vendor specific information element
     * that vendors will use to identify the path selection methods and
     * metrics in use.
     */
    ie?: Buffer
    
    /**
     * Enable this option if an authentication
     * daemon will be authenticating mesh candidates.
     */
    userspaceAuth?: true
    
    /**
     * Enable this option if an authentication
     * daemon will be securing peer link frames.  AMPE is a secured version of
     * Mesh Peering Management (MPM) and is implemented with the assistance of
     * a userspace daemon.  When this flag is set, the kernel will send peer
     * management frames to a userspace daemon that will implement AMPE
     * functionality (security capabilities selection, key confirmation, and
     * key management).  When the flag is unset (default), the kernel can
     * autonomously complete (unsecured) mesh peering without the need of a
     * userspace daemon.
     */
    userspaceAmpe?: true
    
    /**
     * Enable this option to use a
     * vendor specific synchronization method or disable it to use the default
     * neighbor offset synchronization
     */
    enableVendorSync?: number
    
    /**
     * Enable this option if userspace will
     * implement an MPM which handles peer allocation and state.
     */
    userspaceMpm?: Buffer
    
    /**
     * Inform the kernel of the authentication
     * method (u8, as defined in IEEE 8.4.2.100.6, e.g. 0x1 for SAE).
     * Default is no authentication method required.
     */
    authProtocol?: number
}

/** Parses the attributes of a [[MeshSetupParams]] object */
export function parseMeshSetupParams(r: Buffer): MeshSetupParams {
    return structs.getObject(r, {
        1: (data, obj) => obj.enableVendorPathSel = structs.getFlag(data),
        2: (data, obj) => obj.enableVendorMetric = structs.getFlag(data),
        3: (data, obj) => obj.ie = data,
        4: (data, obj) => obj.userspaceAuth = structs.getFlag(data),
        5: (data, obj) => obj.userspaceAmpe = structs.getFlag(data),
        6: (data, obj) => obj.enableVendorSync = structs.getU8(data),
        7: (data, obj) => obj.userspaceMpm = data,
        8: (data, obj) => obj.authProtocol = structs.getU8(data),
    })
}

/** Encodes a [[MeshSetupParams]] object into a stream of attributes */
export function formatMeshSetupParams(x: MeshSetupParams): StreamData {
    return structs.putObject(x, {
        enableVendorPathSel: (data, obj) => data.push(1, structs.putFlag(obj.enableVendorPathSel!)),
        enableVendorMetric: (data, obj) => data.push(2, structs.putFlag(obj.enableVendorMetric!)),
        ie: (data, obj) => data.push(3, obj.ie!),
        userspaceAuth: (data, obj) => data.push(4, structs.putFlag(obj.userspaceAuth!)),
        userspaceAmpe: (data, obj) => data.push(5, structs.putFlag(obj.userspaceAmpe!)),
        enableVendorSync: (data, obj) => data.push(6, structs.putU8(obj.enableVendorSync!)),
        userspaceMpm: (data, obj) => data.push(7, obj.userspaceMpm!),
        authProtocol: (data, obj) => data.push(8, structs.putU8(obj.authProtocol!)),
    })
}

/** TX queue parameter attributes */
export interface Txq extends BaseObject {
    /** AC identifier (NL80211_AC_*) */
    ac?: Buffer
    
    /**
     * Maximum burst time in units of 32 usecs, 0 meaning
     * disabled
     */
    txop?: Buffer
    
    /**
     * Minimum contention window [a value of the form
     * 2^n-1 in the range 1..32767]
     */
    cwmin?: number
    
    /**
     * Maximum contention window [a value of the form
     * 2^n-1 in the range 1..32767]
     */
    cwmax?: number
    
    /** Arbitration interframe space [0..255] */
    aifs?: number
}

/** Parses the attributes of a [[Txq]] object */
export function parseTxq(r: Buffer): Txq {
    return structs.getObject(r, {
        1: (data, obj) => obj.ac = data,
        2: (data, obj) => obj.txop = data,
        3: (data, obj) => obj.cwmin = structs.getS16(data),
        4: (data, obj) => obj.cwmax = structs.getS16(data),
        5: (data, obj) => obj.aifs = structs.getU8(data),
    })
}

/** Encodes a [[Txq]] object into a stream of attributes */
export function formatTxq(x: Txq): StreamData {
    return structs.putObject(x, {
        ac: (data, obj) => data.push(1, obj.ac!),
        txop: (data, obj) => data.push(2, obj.txop!),
        cwmin: (data, obj) => data.push(3, structs.putS16(obj.cwmin!)),
        cwmax: (data, obj) => data.push(4, structs.putS16(obj.cwmax!)),
        aifs: (data, obj) => data.push(5, structs.putU8(obj.aifs!)),
    })
}

export enum Ac {
    VO,
    
    VI = 1,
    
    BE = 2,
    
    BK = 3,
}

/** channel type */
export enum ChannelType {
    /** 20 MHz, non-HT channel */
    NO_HT,
    
    /** 20 MHz HT channel */
    HT20 = 1,
    
    /**
     * HT40 channel, secondary channel
     * below the control channel
     */
    HT40MINUS = 2,
    
    /**
     * HT40 channel, secondary channel
     * above the control channel
     */
    HT40PLUS = 3,
}

/**
 * Key mode
 *
 * Modes NO_TX and SET_TX can only be selected for unicast keys and when the
 * driver supports @NL80211_EXT_FEATURE_EXT_KEY_ID:
 */
export enum KeyMode {
    /**
     * (Default)
     * Key can be used for Rx and Tx immediately
     */
    RX_TX,
    
    /**
     * Only allowed in combination with @NL80211_CMD_NEW_KEY:
     * Unicast key can only be used for Rx, Tx not allowed, yet
     */
    NO_TX = 1,
    
    /**
     * Only allowed in combination with @NL80211_CMD_SET_KEY:
     * The unicast key identified by idx and mac is cleared for Tx and becomes
     * the preferred Tx key for the station.
     */
    SET_TX = 2,
}

/**
 * channel width definitions
 *
 * These values are used with the %NL80211_ATTR_CHANNEL_WIDTH
 * attribute.
 */
export enum ChannelWidth {
    /** 20 MHz, non-HT channel */
    _20_NOHT,
    
    /** 20 MHz HT channel */
    _20 = 1,
    
    /**
     * 40 MHz channel, the %NL80211_ATTR_CENTER_FREQ1
     * attribute must be provided as well
     */
    _40 = 2,
    
    /**
     * 80 MHz channel, the %NL80211_ATTR_CENTER_FREQ1
     * attribute must be provided as well
     */
    _80 = 3,
    
    /**
     * 80+80 MHz channel, the %NL80211_ATTR_CENTER_FREQ1
     * and %NL80211_ATTR_CENTER_FREQ2 attributes must be provided as well
     */
    _80P80 = 4,
    
    /**
     * 160 MHz channel, the %NL80211_ATTR_CENTER_FREQ1
     * attribute must be provided as well
     */
    _160 = 5,
    
    /** 5 MHz OFDM channel */
    _5 = 6,
    
    /** 10 MHz OFDM channel */
    _10 = 7,
}

/** Set of flags from [[ChannelWidth]] bits */
export interface ChannelWidthSet extends BaseObject {
    /** 20 MHz, non-HT channel */
    _20Noht?: true
    
    /** 20 MHz HT channel */
    _20?: true
    
    /**
     * 40 MHz channel, the %NL80211_ATTR_CENTER_FREQ1
     * attribute must be provided as well
     */
    _40?: true
    
    /**
     * 80 MHz channel, the %NL80211_ATTR_CENTER_FREQ1
     * attribute must be provided as well
     */
    _80?: true
    
    /**
     * 80+80 MHz channel, the %NL80211_ATTR_CENTER_FREQ1
     * and %NL80211_ATTR_CENTER_FREQ2 attributes must be provided as well
     */
    _80p80?: true
    
    /**
     * 160 MHz channel, the %NL80211_ATTR_CENTER_FREQ1
     * attribute must be provided as well
     */
    _160?: true
    
    /** 5 MHz OFDM channel */
    _5?: true
    
    /** 10 MHz OFDM channel */
    _10?: true
}

/** Parses the flags in a bitmask with [[ChannelWidth]] bits */
export function parseChannelWidthSet(r: number): ChannelWidthSet {
    const x: ChannelWidthSet = {}
    if (r & (1 << ChannelWidth._20_NOHT)) x._20Noht = true
    if (r & (1 << ChannelWidth._20)) x._20 = true
    if (r & (1 << ChannelWidth._40)) x._40 = true
    if (r & (1 << ChannelWidth._80)) x._80 = true
    if (r & (1 << ChannelWidth._80P80)) x._80p80 = true
    if (r & (1 << ChannelWidth._160)) x._160 = true
    if (r & (1 << ChannelWidth._5)) x._5 = true
    if (r & (1 << ChannelWidth._10)) x._10 = true
    return x
}

/** Encodes a [[ChannelWidth]] bitmask */
export function formatChannelWidthSet(x: ChannelWidthSet): number {
    let r = 0
    if (x._20Noht) r |= 1 << ChannelWidth._20_NOHT
    if (x._20) r |= 1 << ChannelWidth._20
    if (x._40) r |= 1 << ChannelWidth._40
    if (x._80) r |= 1 << ChannelWidth._80
    if (x._80p80) r |= 1 << ChannelWidth._80P80
    if (x._160) r |= 1 << ChannelWidth._160
    if (x._5) r |= 1 << ChannelWidth._5
    if (x._10) r |= 1 << ChannelWidth._10
    return r
}

/**
 * control channel width for a BSS
 *
 * These values are used with the %NL80211_BSS_CHAN_WIDTH attribute.
 */
export enum BssScanWidth {
    /** control channel is 20 MHz wide or compatible */
    _20,
    
    /** control channel is 10 MHz wide */
    _10 = 1,
    
    /** control channel is 5 MHz wide */
    _5 = 2,
}

/** netlink attributes for a BSS */
export interface Bss extends BaseObject {
    /** BSSID of the BSS (6 octets) */
    bssid?: Buffer
    
    /** frequency in MHz (u32) */
    frequency?: number
    
    /**
     * TSF of the received probe response/beacon (u64)
     * (if @NL80211_BSS_PRESP_DATA is present then this is known to be
     * from a probe response, otherwise it may be from the same beacon
     * that the NL80211_BSS_BEACON_TSF will be from)
     */
    tsf?: bigint
    
    /** beacon interval of the (I)BSS (u16) */
    beaconInterval?: number
    
    /** capability field (CPU order, u16) */
    capability?: number
    
    /**
     * binary attribute containing the
     * raw information elements from the probe response/beacon (bin);
     * if the %NL80211_BSS_BEACON_IES attribute is present and the data is
     * different then the IEs here are from a Probe Response frame; otherwise
     * they are from a Beacon frame.
     * However, if the driver does not indicate the source of the IEs, these
     * IEs may be from either frame subtype.
     * If present, the @NL80211_BSS_PRESP_DATA attribute indicates that the
     * data here is known to be from a probe response, without any heuristics.
     */
    informationElements?: Buffer
    
    /**
     * signal strength of probe response/beacon
     * in mBm (100 * dBm) (s32)
     */
    signalMbm?: number
    
    /**
     * signal strength of the probe response/beacon
     * in unspecified units, scaled to 0..100 (u8)
     */
    signalUnspec?: number
    
    /** status, if this BSS is "used" */
    status?: number
    
    /** age of this BSS entry in ms */
    seenMsAgo?: number
    
    /**
     * binary attribute containing the raw information
     * elements from a Beacon frame (bin); not present if no Beacon frame has
     * yet been received
     */
    beaconIes?: Buffer
    
    /**
     * channel width of the control channel
     * (u32, enum nl80211_bss_scan_width)
     */
    chanWidth?: BssScanWidth | keyof typeof BssScanWidth
    
    /**
     * TSF of the last received beacon (u64)
     * (not present if no beacon frame has been received yet)
     */
    beaconTsf?: bigint
    
    /**
     * the data in @NL80211_BSS_INFORMATION_ELEMENTS and
     * @NL80211_BSS_TSF is known to be from a probe response (flag attribute)
     */
    prespData?: true
    
    /**
     * CLOCK_BOOTTIME timestamp when this entry
     * was last updated by a received frame. The value is expected to be
     * accurate to about 10ms. (u64, nanoseconds)
     */
    lastSeenBoottime?: bigint
    
    /** attribute used for padding for 64-bit alignment */
    pad?: Buffer
    
    /**
     * the time at the start of reception of the first
     * octet of the timestamp field of the last beacon/probe received for
     * this BSS. The time is the TSF of the BSS specified by
     * @NL80211_BSS_PARENT_BSSID. (u64).
     */
    parentTsf?: bigint
    
    /**
     * the BSS according to which @NL80211_BSS_PARENT_TSF
     * is set.
     */
    parentBssid?: Buffer
    
    /**
     * per-chain signal strength of last BSS update.
     * Contains a nested array of signal strength attributes (u8, dBm),
     * using the nesting index as the antenna number.
     */
    chainSignal?: number
}

/** Parses the attributes of a [[Bss]] object */
export function parseBss(r: Buffer): Bss {
    return structs.getObject(r, {
        1: (data, obj) => obj.bssid = data,
        2: (data, obj) => obj.frequency = structs.getU32(data),
        3: (data, obj) => obj.tsf = structs.getU64(data),
        4: (data, obj) => obj.beaconInterval = structs.getU16(data),
        5: (data, obj) => obj.capability = structs.getU16(data),
        6: (data, obj) => obj.informationElements = data,
        7: (data, obj) => obj.signalMbm = structs.getS32(data),
        8: (data, obj) => obj.signalUnspec = structs.getU8(data),
        9: (data, obj) => obj.status = structs.getU32(data),
        10: (data, obj) => obj.seenMsAgo = structs.getU32(data),
        11: (data, obj) => obj.beaconIes = data,
        12: (data, obj) => obj.chanWidth = structs.getEnum(BssScanWidth, structs.getU32(data)),
        13: (data, obj) => obj.beaconTsf = structs.getU64(data),
        14: (data, obj) => obj.prespData = structs.getFlag(data),
        15: (data, obj) => obj.lastSeenBoottime = structs.getU64(data),
        16: (data, obj) => obj.pad = data,
        17: (data, obj) => obj.parentTsf = structs.getU64(data),
        18: (data, obj) => obj.parentBssid = data,
        19: (data, obj) => obj.chainSignal = structs.getU8(data),
    })
}

/** Encodes a [[Bss]] object into a stream of attributes */
export function formatBss(x: Bss): StreamData {
    return structs.putObject(x, {
        bssid: (data, obj) => data.push(1, obj.bssid!),
        frequency: (data, obj) => data.push(2, structs.putU32(obj.frequency!)),
        tsf: (data, obj) => data.push(3, structs.putU64(obj.tsf!)),
        beaconInterval: (data, obj) => data.push(4, structs.putU16(obj.beaconInterval!)),
        capability: (data, obj) => data.push(5, structs.putU16(obj.capability!)),
        informationElements: (data, obj) => data.push(6, obj.informationElements!),
        signalMbm: (data, obj) => data.push(7, structs.putS32(obj.signalMbm!)),
        signalUnspec: (data, obj) => data.push(8, structs.putU8(obj.signalUnspec!)),
        status: (data, obj) => data.push(9, structs.putU32(obj.status!)),
        seenMsAgo: (data, obj) => data.push(10, structs.putU32(obj.seenMsAgo!)),
        beaconIes: (data, obj) => data.push(11, obj.beaconIes!),
        chanWidth: (data, obj) => data.push(12, structs.putU32(structs.putEnum(BssScanWidth, obj.chanWidth!))),
        beaconTsf: (data, obj) => data.push(13, structs.putU64(obj.beaconTsf!)),
        prespData: (data, obj) => data.push(14, structs.putFlag(obj.prespData!)),
        lastSeenBoottime: (data, obj) => data.push(15, structs.putU64(obj.lastSeenBoottime!)),
        pad: (data, obj) => data.push(16, obj.pad!),
        parentTsf: (data, obj) => data.push(17, structs.putU64(obj.parentTsf!)),
        parentBssid: (data, obj) => data.push(18, obj.parentBssid!),
        chainSignal: (data, obj) => data.push(19, structs.putU8(obj.chainSignal!)),
    })
}

/**
 * BSS "status"
 *
 * The BSS status is a BSS attribute in scan dumps, which
 * indicates the status the interface has wrt. this BSS.
 */
export enum BssStatus {
    /**
     * Authenticated with this BSS.
     * Note that this is no longer used since cfg80211 no longer
     * keeps track of whether or not authentication was done with
     * a given BSS.
     */
    AUTHENTICATED,
    
    /** Associated with this BSS. */
    ASSOCIATED = 1,
    
    /** Joined to this IBSS. */
    IBSS_JOINED = 2,
}

/** AuthenticationType */
export enum AuthType {
    /** Open System authentication */
    OPEN_SYSTEM,
    
    /** Shared Key authentication (WEP only) */
    SHARED_KEY = 1,
    
    /** Fast BSS Transition (IEEE 802.11r) */
    FT = 2,
    
    /** Network EAP (some Cisco APs and mainly LEAP) */
    NETWORK_EAP = 3,
    
    /** Simultaneous authentication of equals */
    SAE = 4,
    
    /** Fast Initial Link Setup shared key */
    FILS_SK = 5,
    
    /** Fast Initial Link Setup shared key with PFS */
    FILS_SK_PFS = 6,
    
    /** Fast Initial Link Setup public key */
    FILS_PK = 7,
    
    /**
     * determine automatically (if necessary by
     * trying multiple times); this is invalid in netlink -- leave out
     * the attribute for this on CONNECT commands.
     */
    AUTOMATIC = 8,
}

/** Key Type */
export enum KeyType {
    /** Group (broadcast/multicast) key */
    GROUP,
    
    /** Pairwise (unicast/individual) key */
    PAIRWISE = 1,
    
    /** PeerKey (DLS) */
    PEERKEY = 2,
}

/** Management frame protection state */
export enum Mfp {
    /** Management frame protection not used */
    NO,
    
    /** Management frame protection required */
    REQUIRED = 1,
    
    /** Management frame protection is optional */
    OPTIONAL = 2,
}

export interface WpaVersions {
    _1?: true
    
    _2?: true
    
    _3?: true
}

/** Parses the flags in a [[WpaVersions]] bitmask */
export function parseWpaVersions(r: number): WpaVersions {
    const x: WpaVersions = {}
    if (r & (1)) x._1 = true
    if (r & (2)) x._2 = true
    if (r & (4)) x._3 = true
    return x
}

/** Encodes a [[WpaVersions]] bitmask */
export function formatWpaVersions(x: WpaVersions): number {
    let r = 0
    if (x._1) r |= 1
    if (x._2) r |= 2
    if (x._3) r |= 4
    return r
}

/** key default types */
export interface KeyDefaultTypes extends BaseObject {
    /**
     * key should be used as default
     * unicast key
     */
    unicast?: true
    
    /**
     * key should be used as default
     * multicast key
     */
    multicast?: true
}

/** Parses the attributes of a [[KeyDefaultTypes]] object */
export function parseKeyDefaultTypes(r: Buffer): KeyDefaultTypes {
    return structs.getObject(r, {
        1: (data, obj) => obj.unicast = structs.getFlag(data),
        2: (data, obj) => obj.multicast = structs.getFlag(data),
    })
}

/** Encodes a [[KeyDefaultTypes]] object into a stream of attributes */
export function formatKeyDefaultTypes(x: KeyDefaultTypes): StreamData {
    return structs.putObject(x, {
        unicast: (data, obj) => data.push(1, structs.putFlag(obj.unicast!)),
        multicast: (data, obj) => data.push(2, structs.putFlag(obj.multicast!)),
    })
}

/** key attributes */
export interface Key extends BaseObject {
    /**
     * (temporal) key data; for TKIP this consists of
     * 16 bytes encryption key followed by 8 bytes each for TX and RX MIC
     * keys
     */
    data?: Buffer
    
    /** key ID (u8, 0-3) */
    idx?: number
    
    /**
     * key cipher suite (u32, as defined by IEEE 802.11
     * section 7.3.2.25.1, e.g. 0x000FAC04)
     */
    cipher?: number
    
    /**
     * transmit key sequence number (IV/PN) for TKIP and
     * CCMP keys, each six bytes in little endian
     */
    seq?: Buffer
    
    /** flag indicating default key */
    default?: true
    
    /** flag indicating default management key */
    defaultMgmt?: true
    
    /**
     * the key type from enum nl80211_key_type, if not
     * specified the default depends on whether a MAC address was
     * given with the command using the key or not (u32)
     */
    type?: KeyType | keyof typeof KeyType
    
    /**
     * A nested attribute containing flags
     * attributes, specifying what a key should be set as default as.
     * See &enum nl80211_key_default_types.
     */
    defaultTypes?: KeyDefaultTypes
    
    /**
     * the mode from enum nl80211_key_mode.
     * Defaults to @NL80211_KEY_RX_TX.
     */
    mode?: Buffer
}

/** Parses the attributes of a [[Key]] object */
export function parseKey(r: Buffer): Key {
    return structs.getObject(r, {
        1: (data, obj) => obj.data = data,
        2: (data, obj) => obj.idx = structs.getU8(data),
        3: (data, obj) => obj.cipher = structs.getU32(data),
        4: (data, obj) => obj.seq = data,
        5: (data, obj) => obj.default = structs.getFlag(data),
        6: (data, obj) => obj.defaultMgmt = structs.getFlag(data),
        7: (data, obj) => obj.type = structs.getEnum(KeyType, structs.getU32(data)),
        8: (data, obj) => obj.defaultTypes = parseKeyDefaultTypes(data),
        9: (data, obj) => obj.mode = data,
    })
}

/** Encodes a [[Key]] object into a stream of attributes */
export function formatKey(x: Key): StreamData {
    return structs.putObject(x, {
        data: (data, obj) => data.push(1, obj.data!),
        idx: (data, obj) => data.push(2, structs.putU8(obj.idx!)),
        cipher: (data, obj) => data.push(3, structs.putU32(obj.cipher!)),
        seq: (data, obj) => data.push(4, obj.seq!),
        default: (data, obj) => data.push(5, structs.putFlag(obj.default!)),
        defaultMgmt: (data, obj) => data.push(6, structs.putFlag(obj.defaultMgmt!)),
        type: (data, obj) => data.push(7, structs.putU32(structs.putEnum(KeyType, obj.type!))),
        defaultTypes: (data, obj) => data.push(8, formatKeyDefaultTypes(obj.defaultTypes!)),
        mode: (data, obj) => data.push(9, obj.mode!),
    })
}

/** TX rate set attributes */
export interface TxRate extends BaseObject {
    /**
     * Legacy (non-MCS) rates allowed for TX rate selection
     * in an array of rates as defined in IEEE 802.11 7.3.2.2 (u8 values with
     * 1 = 500 kbps) but without the IE length restriction (at most
     * %NL80211_MAX_SUPP_RATES in a single array).
     */
    legacy?: Buffer
    
    /**
     * HT (MCS) rates allowed for TX rate selection
     * in an array of MCS numbers.
     */
    ht?: Buffer
    
    /**
     * VHT rates allowed for TX rate selection,
     * see &struct nl80211_txrate_vht
     */
    vht?: Buffer
    
    /** configure GI, see &enum nl80211_txrate_gi */
    gi?: Buffer
}

/** Parses the attributes of a [[TxRate]] object */
export function parseTxRate(r: Buffer): TxRate {
    return structs.getObject(r, {
        1: (data, obj) => obj.legacy = data,
        2: (data, obj) => obj.ht = data,
        3: (data, obj) => obj.vht = data,
        4: (data, obj) => obj.gi = data,
    })
}

/** Encodes a [[TxRate]] object into a stream of attributes */
export function formatTxRate(x: TxRate): StreamData {
    return structs.putObject(x, {
        legacy: (data, obj) => data.push(1, obj.legacy!),
        ht: (data, obj) => data.push(2, obj.ht!),
        vht: (data, obj) => data.push(3, obj.vht!),
        gi: (data, obj) => data.push(4, obj.gi!),
    })
}

export enum TxrateGuardInterval {
    DEFAULT_GI,
    
    FORCE_SGI = 1,
    
    FORCE_LGI = 2,
}

/** Frequency band */
export enum BandId {
    /** 2.4 GHz ISM band */
    _2GHZ,
    
    /** around 5 GHz band (4.9 - 5.7 GHz) */
    _5GHZ = 1,
    
    /** around 60 GHz band (58.32 - 69.12 GHz) */
    _60GHZ = 2,
    
    /** around 6 GHz band (5.9 - 7.2 GHz) */
    _6GHZ = 3,
}

/** Set of flags from [[BandId]] bits */
export interface BandIdSet extends BaseObject {
    /** 2.4 GHz ISM band */
    _2ghz?: true
    
    /** around 5 GHz band (4.9 - 5.7 GHz) */
    _5ghz?: true
    
    /** around 60 GHz band (58.32 - 69.12 GHz) */
    _60ghz?: true
    
    /** around 6 GHz band (5.9 - 7.2 GHz) */
    _6ghz?: true
}

/** Parses the flags in a bitmask with [[BandId]] bits */
export function parseBandIdSet(r: number): BandIdSet {
    const x: BandIdSet = {}
    if (r & (1 << BandId._2GHZ)) x._2ghz = true
    if (r & (1 << BandId._5GHZ)) x._5ghz = true
    if (r & (1 << BandId._60GHZ)) x._60ghz = true
    if (r & (1 << BandId._6GHZ)) x._6ghz = true
    return x
}

/** Encodes a [[BandId]] bitmask */
export function formatBandIdSet(x: BandIdSet): number {
    let r = 0
    if (x._2ghz) r |= 1 << BandId._2GHZ
    if (x._5ghz) r |= 1 << BandId._5GHZ
    if (x._60ghz) r |= 1 << BandId._60GHZ
    if (x._6ghz) r |= 1 << BandId._6GHZ
    return r
}

/** powersave state */
export enum PsState {
    /** powersave is disabled */
    DISABLED,
    
    /** powersave is enabled */
    ENABLED = 1,
}

/** connection quality monitor attributes */
export interface Cqm extends BaseObject {
    /**
     * RSSI threshold in dBm. This value specifies
     * the threshold for the RSSI level at which an event will be sent. Zero
     * to disable.  Alternatively, if %NL80211_EXT_FEATURE_CQM_RSSI_LIST is
     * set, multiple values can be supplied as a low-to-high sorted array of
     * threshold values in dBm.  Events will be sent when the RSSI value
     * crosses any of the thresholds.
     */
    rssiThold?: number
    
    /**
     * RSSI hysteresis in dBm. This value specifies
     * the minimum amount the RSSI level must change after an event before a
     * new event may be issued (to reduce effects of RSSI oscillation).
     */
    rssiHyst?: number
    
    /** RSSI threshold event */
    rssiThresholdEvent?: number
    
    /**
     * a u32 value indicating that this many
     * consecutive packets were not acknowledged by the peer
     */
    pktLossEvent?: number
    
    /**
     * TX error rate in %. Minimum % of TX failures
     * during the given %NL80211_ATTR_CQM_TXE_INTVL before an
     * %NL80211_CMD_NOTIFY_CQM with reported %NL80211_ATTR_CQM_TXE_RATE and
     * %NL80211_ATTR_CQM_TXE_PKTS is generated.
     */
    txeRate?: Buffer
    
    /**
     * number of attempted packets in a given
     * %NL80211_ATTR_CQM_TXE_INTVL before %NL80211_ATTR_CQM_TXE_RATE is
     * checked.
     */
    txePkts?: Buffer
    
    /**
     * interval in seconds. Specifies the periodic
     * interval in which %NL80211_ATTR_CQM_TXE_PKTS and
     * %NL80211_ATTR_CQM_TXE_RATE must be satisfied before generating an
     * %NL80211_CMD_NOTIFY_CQM. Set to 0 to turn off TX error reporting.
     */
    txeIntvl?: Buffer
    
    /**
     * flag attribute that's set in a beacon
     * loss event
     */
    beaconLossEvent?: true
    
    /**
     * the RSSI value in dBm that triggered the
     * RSSI threshold event.
     */
    rssiLevel?: Buffer
}

/** Parses the attributes of a [[Cqm]] object */
export function parseCqm(r: Buffer): Cqm {
    return structs.getObject(r, {
        1: (data, obj) => obj.rssiThold = structs.getU32(data),
        2: (data, obj) => obj.rssiHyst = structs.getU32(data),
        3: (data, obj) => obj.rssiThresholdEvent = structs.getU32(data),
        4: (data, obj) => obj.pktLossEvent = structs.getU32(data),
        5: (data, obj) => obj.txeRate = data,
        6: (data, obj) => obj.txePkts = data,
        7: (data, obj) => obj.txeIntvl = data,
        8: (data, obj) => obj.beaconLossEvent = structs.getFlag(data),
        9: (data, obj) => obj.rssiLevel = data,
    })
}

/** Encodes a [[Cqm]] object into a stream of attributes */
export function formatCqm(x: Cqm): StreamData {
    return structs.putObject(x, {
        rssiThold: (data, obj) => data.push(1, structs.putU32(obj.rssiThold!)),
        rssiHyst: (data, obj) => data.push(2, structs.putU32(obj.rssiHyst!)),
        rssiThresholdEvent: (data, obj) => data.push(3, structs.putU32(obj.rssiThresholdEvent!)),
        pktLossEvent: (data, obj) => data.push(4, structs.putU32(obj.pktLossEvent!)),
        txeRate: (data, obj) => data.push(5, obj.txeRate!),
        txePkts: (data, obj) => data.push(6, obj.txePkts!),
        txeIntvl: (data, obj) => data.push(7, obj.txeIntvl!),
        beaconLossEvent: (data, obj) => data.push(8, structs.putFlag(obj.beaconLossEvent!)),
        rssiLevel: (data, obj) => data.push(9, obj.rssiLevel!),
    })
}

/** RSSI threshold event */
export enum CqmRssiThresholdEvent {
    /**
     * The RSSI level is lower than the
     * configured threshold
     */
    THRESHOLD_EVENT_LOW,
    
    /**
     * The RSSI is higher than the
     * configured threshold
     */
    THRESHOLD_EVENT_HIGH = 1,
    
    /** (reserved, never sent) */
    BEACON_LOSS_EVENT = 2,
}

/** TX power adjustment */
export enum TxPowerSetting {
    /** automatically determine transmit power */
    AUTOMATIC,
    
    /** limit TX power by the mBm parameter */
    LIMITED = 1,
    
    /** fix TX power to the mBm parameter */
    FIXED = 2,
}

/** packet pattern attribute */
export interface PacketPattern extends BaseObject {
    /**
     * pattern mask, must be long enough to have
     * a bit for each byte in the pattern. The lowest-order bit corresponds
     * to the first byte of the pattern, but the bytes of the pattern are
     * in a little-endian-like format, i.e. the 9th byte of the pattern
     * corresponds to the lowest-order bit in the second byte of the mask.
     * For example: The match 00:xx:00:00:xx:00:00:00:00:xx:xx:xx (where
     * xx indicates "don't care") would be represented by a pattern of
     * twelve zero bytes, and a mask of "0xed,0x01".
     * Note that the pattern matching is done as though frames were not
     * 802.11 frames but 802.3 frames, i.e. the frame is fully unpacked
     * first (including SNAP header unpacking) and then matched.
     */
    mask?: Buffer
    
    /**
     * the pattern, values where the mask has
     * a zero bit are ignored
     */
    pattern?: Buffer
    
    /**
     * packet offset, pattern is matched after
     * these fixed number of bytes of received packet
     */
    offset?: number
}

/** Parses the attributes of a [[PacketPattern]] object */
export function parsePacketPattern(r: Buffer): PacketPattern {
    return structs.getObject(r, {
        1: (data, obj) => obj.mask = data,
        2: (data, obj) => obj.pattern = data,
        3: (data, obj) => obj.offset = structs.getU32(data),
    })
}

/** Encodes a [[PacketPattern]] object into a stream of attributes */
export function formatPacketPattern(x: PacketPattern): StreamData {
    return structs.putObject(x, {
        mask: (data, obj) => data.push(1, obj.mask!),
        pattern: (data, obj) => data.push(2, obj.pattern!),
        offset: (data, obj) => data.push(3, structs.putU32(obj.offset!)),
    })
}

/**
 * WoWLAN trigger definitions
 *
 * These nested attributes are used to configure the wakeup triggers and
 * to report the wakeup reason(s).
 */
export interface WowlanTriggers extends BaseObject {
    /**
     * wake up on any activity, do not really put
     * the chip into a special state -- works best with chips that have
     * support for low-power operation already (flag)
     * Note that this mode is incompatible with all of the others, if
     * any others are even supported by the device.
     */
    any?: true
    
    /**
     * wake up on disconnect, the way disconnect
     * is detected is implementation-specific (flag)
     */
    disconnect?: true
    
    /**
     * wake up on magic packet (6x 0xff, followed
     * by 16 repetitions of MAC addr, anywhere in payload) (flag)
     */
    magicPkt?: true
    
    /**
     * wake up on the specified packet patterns
     * which are passed in an array of nested attributes, each nested attribute
     * defining a with attributes from &struct nl80211_wowlan_trig_pkt_pattern.
     * Each pattern defines a wakeup packet. Packet offset is associated with
     * each pattern which is used while matching the pattern. The matching is
     * done on the MSDU, i.e. as though the packet was an 802.3 packet, so the
     * pattern matching is done after the packet is converted to the MSDU.
     *
     * In %NL80211_ATTR_WOWLAN_TRIGGERS_SUPPORTED, it is a binary attribute
     * carrying a &struct nl80211_pattern_support.
     *
     * When reporting wakeup. it is a u32 attribute containing the 0-based
     * index of the pattern that caused the wakeup, in the patterns passed
     * to the kernel when configuring.
     */
    pktPattern?: Buffer
    
    /**
     * Not a real trigger, and cannot be
     * used when setting, used only to indicate that GTK rekeying is supported
     * by the device (flag)
     */
    gtkRekeySupported?: true
    
    /**
     * wake up on GTK rekey failure (if
     * done by the device) (flag)
     */
    gtkRekeyFailure?: true
    
    /**
     * wake up on EAP Identity Request
     * packet (flag)
     */
    eapIdentRequest?: true
    
    /** wake up on 4-way handshake (flag) */
    _4wayHandshake?: true
    
    /**
     * wake up when rfkill is released
     * (on devices that have rfkill in the device) (flag)
     */
    rfkillRelease?: true
    
    /**
     * For wakeup reporting only, contains
     * the 802.11 packet that caused the wakeup, e.g. a deauth frame. The frame
     * may be truncated, the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_80211_LEN
     * attribute contains the original length.
     */
    wakeupPkt80211?: Buffer
    
    /**
     * Original length of the 802.11
     * packet, may be bigger than the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_80211
     * attribute if the packet was truncated somewhere.
     */
    wakeupPkt80211Len?: Buffer
    
    /**
     * For wakeup reporting only, contains the
     * 802.11 packet that caused the wakeup, e.g. a magic packet. The frame may
     * be truncated, the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_8023_LEN attribute
     * contains the original length.
     */
    wakeupPkt8023?: Buffer
    
    /**
     * Original length of the 802.3
     * packet, may be bigger than the @NL80211_WOWLAN_TRIG_WAKEUP_PKT_8023
     * attribute if the packet was truncated somewhere.
     */
    wakeupPkt8023Len?: Buffer
    
    /**
     * TCP connection wake, see DOC section
     * "TCP connection wakeup" for more details. This is a nested attribute
     * containing the exact information for establishing and keeping alive
     * the TCP connection.
     */
    tcpConnection?: Buffer
    
    /**
     * For wakeup reporting only, the
     * wakeup packet was received on the TCP connection
     */
    wakeupTcpMatch?: true
    
    /**
     * For wakeup reporting only, the
     * TCP connection was lost or failed to be established
     */
    wakeupTcpConnlost?: true
    
    /**
     * For wakeup reporting only,
     * the TCP connection ran out of tokens to use for data to send to the
     * service
     */
    wakeupTcpNomoretokens?: true
    
    /**
     * wake up when a configured network
     * is detected.  This is a nested attribute that contains the
     * same attributes used with @NL80211_CMD_START_SCHED_SCAN.  It
     * specifies how the scan is performed (e.g. the interval, the
     * channels to scan and the initial delay) as well as the scan
     * results that will trigger a wake (i.e. the matchsets).  This
     * attribute is also sent in a response to
     * @NL80211_CMD_GET_WIPHY, indicating the number of match sets
     * supported by the driver (u32).
     */
    netDetect?: Buffer
    
    /**
     * nested attribute
     * containing an array with information about what triggered the
     * wake up.  If no elements are present in the array, it means
     * that the information is not available.  If more than one
     * element is present, it means that more than one match
     * occurred.
     * Each element in the array is a nested attribute that contains
     * one optional %NL80211_ATTR_SSID attribute and one optional
     * %NL80211_ATTR_SCAN_FREQUENCIES attribute.  At least one of
     * these attributes must be present.  If
     * %NL80211_ATTR_SCAN_FREQUENCIES contains more than one
     * frequency, it means that the match occurred in more than one
     * channel.
     */
    netDetectResults?: Message[]
}

/** Parses the attributes of a [[WowlanTriggers]] object */
export function parseWowlanTriggers(r: Buffer): WowlanTriggers {
    return structs.getObject(r, {
        1: (data, obj) => obj.any = structs.getFlag(data),
        2: (data, obj) => obj.disconnect = structs.getFlag(data),
        3: (data, obj) => obj.magicPkt = structs.getFlag(data),
        4: (data, obj) => obj.pktPattern = data,
        5: (data, obj) => obj.gtkRekeySupported = structs.getFlag(data),
        6: (data, obj) => obj.gtkRekeyFailure = structs.getFlag(data),
        7: (data, obj) => obj.eapIdentRequest = structs.getFlag(data),
        8: (data, obj) => obj._4wayHandshake = structs.getFlag(data),
        9: (data, obj) => obj.rfkillRelease = structs.getFlag(data),
        10: (data, obj) => obj.wakeupPkt80211 = data,
        11: (data, obj) => obj.wakeupPkt80211Len = data,
        12: (data, obj) => obj.wakeupPkt8023 = data,
        13: (data, obj) => obj.wakeupPkt8023Len = data,
        14: (data, obj) => obj.tcpConnection = data,
        15: (data, obj) => obj.wakeupTcpMatch = structs.getFlag(data),
        16: (data, obj) => obj.wakeupTcpConnlost = structs.getFlag(data),
        17: (data, obj) => obj.wakeupTcpNomoretokens = structs.getFlag(data),
        18: (data, obj) => obj.netDetect = data,
        19: (data, obj) => obj.netDetectResults = structs.getArray(data, x => parseMessage(x)),
    })
}

/** Encodes a [[WowlanTriggers]] object into a stream of attributes */
export function formatWowlanTriggers(x: WowlanTriggers): StreamData {
    return structs.putObject(x, {
        any: (data, obj) => data.push(1, structs.putFlag(obj.any!)),
        disconnect: (data, obj) => data.push(2, structs.putFlag(obj.disconnect!)),
        magicPkt: (data, obj) => data.push(3, structs.putFlag(obj.magicPkt!)),
        pktPattern: (data, obj) => data.push(4, obj.pktPattern!),
        gtkRekeySupported: (data, obj) => data.push(5, structs.putFlag(obj.gtkRekeySupported!)),
        gtkRekeyFailure: (data, obj) => data.push(6, structs.putFlag(obj.gtkRekeyFailure!)),
        eapIdentRequest: (data, obj) => data.push(7, structs.putFlag(obj.eapIdentRequest!)),
        _4wayHandshake: (data, obj) => data.push(8, structs.putFlag(obj._4wayHandshake!)),
        rfkillRelease: (data, obj) => data.push(9, structs.putFlag(obj.rfkillRelease!)),
        wakeupPkt80211: (data, obj) => data.push(10, obj.wakeupPkt80211!),
        wakeupPkt80211Len: (data, obj) => data.push(11, obj.wakeupPkt80211Len!),
        wakeupPkt8023: (data, obj) => data.push(12, obj.wakeupPkt8023!),
        wakeupPkt8023Len: (data, obj) => data.push(13, obj.wakeupPkt8023Len!),
        tcpConnection: (data, obj) => data.push(14, obj.tcpConnection!),
        wakeupTcpMatch: (data, obj) => data.push(15, structs.putFlag(obj.wakeupTcpMatch!)),
        wakeupTcpConnlost: (data, obj) => data.push(16, structs.putFlag(obj.wakeupTcpConnlost!)),
        wakeupTcpNomoretokens: (data, obj) => data.push(17, structs.putFlag(obj.wakeupTcpNomoretokens!)),
        netDetect: (data, obj) => data.push(18, obj.netDetect!),
        netDetectResults: (data, obj) => data.push(19, structs.putArray(obj.netDetectResults!, x => formatMessage(x))),
    })
}

/** WoWLAN TCP connection parameters */
export interface WowlanTcp extends BaseObject {
    /** source IPv4 address (in network byte order) */
    srcIpv4?: number
    
    /**
     * destination IPv4 address
     * (in network byte order)
     */
    dstIpv4?: number
    
    /**
     * destination MAC address, this is given because
     * route lookup when configured might be invalid by the time we suspend,
     * and doing a route lookup when suspending is no longer possible as it
     * might require ARP querying.
     */
    dstMac?: Buffer
    
    /**
     * source port (u16); optional, if not given a
     * socket and port will be allocated
     */
    srcPort?: number
    
    /** destination port (u16) */
    dstPort?: number
    
    /**
     * data packet payload, at least one byte.
     * For feature advertising, a u32 attribute holding the maximum length
     * of the data payload.
     */
    dataPayload?: Buffer
    
    /**
     * data packet sequence configuration
     * (if desired), a &struct nl80211_wowlan_tcp_data_seq. For feature
     * advertising it is just a flag
     */
    dataPayloadSeq?: Buffer
    
    /**
     * data packet token configuration,
     * see &struct nl80211_wowlan_tcp_data_token and for advertising see
     * &struct nl80211_wowlan_tcp_data_token_feature.
     */
    dataPayloadToken?: Buffer
    
    /**
     * data interval in seconds, maximum
     * interval in feature advertising (u32)
     */
    dataInterval?: number
    
    /**
     * wake packet payload, for advertising a
     * u32 attribute holding the maximum length
     */
    wakePayload?: Buffer
    
    /**
     * Wake packet payload mask, not used for
     * feature advertising. The mask works like @NL80211_PKTPAT_MASK
     * but on the TCP payload only.
     */
    wakeMask?: Buffer
}

/** Parses the attributes of a [[WowlanTcp]] object */
export function parseWowlanTcp(r: Buffer): WowlanTcp {
    return structs.getObject(r, {
        1: (data, obj) => obj.srcIpv4 = structs.getU32(data),
        2: (data, obj) => obj.dstIpv4 = structs.getU32(data),
        3: (data, obj) => obj.dstMac = data,
        4: (data, obj) => obj.srcPort = structs.getU16(data),
        5: (data, obj) => obj.dstPort = structs.getU16(data),
        6: (data, obj) => obj.dataPayload = data,
        7: (data, obj) => obj.dataPayloadSeq = data,
        8: (data, obj) => obj.dataPayloadToken = data,
        9: (data, obj) => obj.dataInterval = structs.getU32(data),
        10: (data, obj) => obj.wakePayload = data,
        11: (data, obj) => obj.wakeMask = data,
    })
}

/** Encodes a [[WowlanTcp]] object into a stream of attributes */
export function formatWowlanTcp(x: WowlanTcp): StreamData {
    return structs.putObject(x, {
        srcIpv4: (data, obj) => data.push(1, structs.putU32(obj.srcIpv4!)),
        dstIpv4: (data, obj) => data.push(2, structs.putU32(obj.dstIpv4!)),
        dstMac: (data, obj) => data.push(3, obj.dstMac!),
        srcPort: (data, obj) => data.push(4, structs.putU16(obj.srcPort!)),
        dstPort: (data, obj) => data.push(5, structs.putU16(obj.dstPort!)),
        dataPayload: (data, obj) => data.push(6, obj.dataPayload!),
        dataPayloadSeq: (data, obj) => data.push(7, obj.dataPayloadSeq!),
        dataPayloadToken: (data, obj) => data.push(8, obj.dataPayloadToken!),
        dataInterval: (data, obj) => data.push(9, structs.putU32(obj.dataInterval!)),
        wakePayload: (data, obj) => data.push(10, obj.wakePayload!),
        wakeMask: (data, obj) => data.push(11, obj.wakeMask!),
    })
}

/** coalesce rule attribute */
export interface CoalesceRule extends BaseObject {
    /** delay in msecs used for packet coalescing */
    delay?: number
    
    /**
     * condition for packet coalescence,
     * see &enum nl80211_coalesce_condition.
     */
    condition?: CoalesceCondition | keyof typeof CoalesceCondition
    
    /**
     * packet offset, pattern is matched
     * after these fixed number of bytes of received packet
     */
    pktPattern?: Buffer
}

/** Parses the attributes of a [[CoalesceRule]] object */
export function parseCoalesceRule(r: Buffer): CoalesceRule {
    return structs.getObject(r, {
        1: (data, obj) => obj.delay = structs.getU32(data),
        2: (data, obj) => obj.condition = structs.getEnum(CoalesceCondition, structs.getU32(data)),
        3: (data, obj) => obj.pktPattern = data,
    })
}

/** Encodes a [[CoalesceRule]] object into a stream of attributes */
export function formatCoalesceRule(x: CoalesceRule): StreamData {
    return structs.putObject(x, {
        delay: (data, obj) => data.push(1, structs.putU32(obj.delay!)),
        condition: (data, obj) => data.push(2, structs.putU32(structs.putEnum(CoalesceCondition, obj.condition!))),
        pktPattern: (data, obj) => data.push(3, obj.pktPattern!),
    })
}

/** coalesce rule conditions */
export enum CoalesceCondition {
    /**
     * coalaesce Rx packets when patterns
     * in a rule are matched.
     */
    MATCH,
    
    /**
     * coalesce Rx packets when patterns
     * in a rule are not matched.
     */
    NO_MATCH = 1,
}

/** limit attributes */
export interface InterfaceLimit extends BaseObject {
    /**
     * maximum number of interfaces that
     * can be chosen from this set of interface types (u32)
     */
    max?: number
    
    /**
     * nested attribute containing a
     * flag attribute for each interface type in this set
     */
    types?: InterfaceTypeSet
}

/** Parses the attributes of a [[InterfaceLimit]] object */
export function parseInterfaceLimit(r: Buffer): InterfaceLimit {
    return structs.getObject(r, {
        1: (data, obj) => obj.max = structs.getU32(data),
        2: (data, obj) => obj.types = parseInterfaceTypeSetAttr(data),
    })
}

/** Encodes a [[InterfaceLimit]] object into a stream of attributes */
export function formatInterfaceLimit(x: InterfaceLimit): StreamData {
    return structs.putObject(x, {
        max: (data, obj) => data.push(1, structs.putU32(obj.max!)),
        types: (data, obj) => data.push(2, formatInterfaceTypeSetAttr(obj.types!)),
    })
}

/**
 * interface combination attributes
 *
 * Examples:
 * limits = [ #{STA} <= 1, #{AP} <= 1 ], matching BI, channels = 1, max = 2
 * => allows an AP and a STA that must match BIs
 *
 * numbers = [ #{AP, P2P-GO} <= 8 ], BI min gcd, channels = 1, max = 8,
 * => allows 8 of AP/GO that can have BI gcd >= min gcd
 *
 * numbers = [ #{STA} <= 2 ], channels = 2, max = 2
 * => allows two STAs on different channels
 *
 * numbers = [ #{STA} <= 1, #{P2P-client,P2P-GO} <= 3 ], max = 4
 * => allows a STA plus three P2P interfaces
 *
 * The list of these four possibilities could completely be contained
 * within the %NL80211_ATTR_INTERFACE_COMBINATIONS attribute to indicate
 * that any of these groups must match.
 *
 * "Combinations" of just a single interface will not be listed here,
 * a single interface of any valid interface type is assumed to always
 * be possible by itself. This means that implicitly, for each valid
 * interface type, the following group always exists:
 * numbers = [ #{<type>} <= 1 ], channels = 1, max = 1
 */
export interface InterfaceCombination extends BaseObject {
    /**
     * Nested attributes containing the limits
     * for given interface types, see &enum nl80211_iface_limit_attrs.
     */
    limits?: InterfaceLimit[]
    
    /**
     * u32 attribute giving the total number of
     * interfaces that can be created in this group. This number doesn't
     * apply to interfaces purely managed in software, which are listed
     * in a separate attribute %NL80211_ATTR_INTERFACES_SOFTWARE.
     */
    maxnum?: number
    
    /**
     * flag attribute specifying that
     * beacon intervals within this group must be all the same even for
     * infrastructure and AP/GO combinations, i.e. the GO(s) must adopt
     * the infrastructure network's beacon interval.
     */
    staApBiMatch?: true
    
    /**
     * u32 attribute specifying how many
     * different channels may be used within this group.
     */
    numChannels?: number
    
    /**
     * u32 attribute containing the bitmap
     * of supported channel widths for radar detection.
     */
    radarDetectWidths?: ChannelWidthSet
    
    /**
     * u32 attribute containing the bitmap
     * of supported regulatory regions for radar detection.
     */
    radarDetectRegions?: number
    
    /**
     * u32 attribute specifying the minimum GCD of
     * different beacon intervals supported by all the interface combinations
     * in this group (if not present, all beacon intervals be identical).
     */
    biMinGcd?: number
}

/** Parses the attributes of a [[InterfaceCombination]] object */
export function parseInterfaceCombination(r: Buffer): InterfaceCombination {
    return structs.getObject(r, {
        1: (data, obj) => obj.limits = structs.getArray(data, x => parseInterfaceLimit(x)),
        2: (data, obj) => obj.maxnum = structs.getU32(data),
        3: (data, obj) => obj.staApBiMatch = structs.getFlag(data),
        4: (data, obj) => obj.numChannels = structs.getU32(data),
        5: (data, obj) => obj.radarDetectWidths = parseChannelWidthSet(structs.getU32(data)),
        6: (data, obj) => obj.radarDetectRegions = structs.getU32(data),
        7: (data, obj) => obj.biMinGcd = structs.getU32(data),
    })
}

/** Encodes a [[InterfaceCombination]] object into a stream of attributes */
export function formatInterfaceCombination(x: InterfaceCombination): StreamData {
    return structs.putObject(x, {
        limits: (data, obj) => data.push(1, structs.putArray(obj.limits!, x => formatInterfaceLimit(x))),
        maxnum: (data, obj) => data.push(2, structs.putU32(obj.maxnum!)),
        staApBiMatch: (data, obj) => data.push(3, structs.putFlag(obj.staApBiMatch!)),
        numChannels: (data, obj) => data.push(4, structs.putU32(obj.numChannels!)),
        radarDetectWidths: (data, obj) => data.push(5, structs.putU32(formatChannelWidthSet(obj.radarDetectWidths!))),
        radarDetectRegions: (data, obj) => data.push(6, structs.putU32(obj.radarDetectRegions!)),
        biMinGcd: (data, obj) => data.push(7, structs.putU32(obj.biMinGcd!)),
    })
}

/** state of a mesh peer link finite state machine */
export enum PlinkState {
    /**
     * initial state, considered the implicit
     * state of non existent mesh peer links
     */
    LISTEN,
    
    /**
     * mesh plink open frame has been sent to
     * this mesh peer
     */
    OPN_SNT = 1,
    
    /**
     * mesh plink open frame has been received
     * from this mesh peer
     */
    OPN_RCVD = 2,
    
    /**
     * mesh plink confirm frame has been
     * received from this mesh peer
     */
    CNF_RCVD = 3,
    
    /** mesh peer link is established */
    ESTAB = 4,
    
    /** mesh peer link is being closed or cancelled */
    HOLDING = 5,
    
    /**
     * all frames transmitted from this mesh
     * plink are discarded
     */
    BLOCKED = 6,
}

/** actions to perform in mesh peers */
export enum PlinkAction {
    /** perform no action */
    NO_ACTION,
    
    /** start mesh peer link establishment */
    OPEN = 1,
    
    /** block traffic from this mesh peer */
    BLOCK = 2,
}

/** attributes for GTK rekey offload */
export interface RekeyData extends BaseObject {
    /** key encryption key (binary) */
    kek?: Buffer
    
    /** key confirmation key (binary) */
    kck?: Buffer
    
    /** replay counter (binary) */
    replayCtr?: Buffer
}

/** Parses the attributes of a [[RekeyData]] object */
export function parseRekeyData(r: Buffer): RekeyData {
    return structs.getObject(r, {
        1: (data, obj) => obj.kek = data,
        2: (data, obj) => obj.kck = data,
        3: (data, obj) => obj.replayCtr = data,
    })
}

/** Encodes a [[RekeyData]] object into a stream of attributes */
export function formatRekeyData(x: RekeyData): StreamData {
    return structs.putObject(x, {
        kek: (data, obj) => data.push(1, obj.kek!),
        kck: (data, obj) => data.push(2, obj.kck!),
        replayCtr: (data, obj) => data.push(3, obj.replayCtr!),
    })
}

/** values for %NL80211_ATTR_HIDDEN_SSID */
export enum HiddenSsid {
    /**
     * do not hide SSID (i.e., broadcast it in
     * Beacon frames)
     */
    NOT_IN_USE,
    
    /**
     * hide SSID by using zero-length SSID element
     * in Beacon frames
     */
    ZERO_LEN = 1,
    
    /**
     * hide SSID by using correct length of SSID
     * element in Beacon frames but zero out each byte in the SSID
     */
    ZERO_CONTENTS = 2,
}

/** station WME attributes */
export interface StationWme extends BaseObject {
    /**
     * bitmap of uapsd queues. the format
     * is the same as the AC bitmap in the QoS info field.
     */
    uapsdQueues?: Buffer
    
    /**
     * max service period. the format is the same
     * as the MAX_SP field in the QoS info field (but already shifted down).
     */
    maxSp?: Buffer
}

/** Parses the attributes of a [[StationWme]] object */
export function parseStationWme(r: Buffer): StationWme {
    return structs.getObject(r, {
        1: (data, obj) => obj.uapsdQueues = data,
        2: (data, obj) => obj.maxSp = data,
    })
}

/** Encodes a [[StationWme]] object into a stream of attributes */
export function formatStationWme(x: StationWme): StreamData {
    return structs.putObject(x, {
        uapsdQueues: (data, obj) => data.push(1, obj.uapsdQueues!),
        maxSp: (data, obj) => data.push(2, obj.maxSp!),
    })
}

/** attributes for PMKSA caching candidates */
export interface PmksaCandidate extends BaseObject {
    /**
     * candidate index (u32; the smaller, the higher
     * priority)
     */
    index?: number
    
    /** candidate BSSID (6 octets) */
    bssid?: Buffer
    
    /** RSN pre-authentication supported (flag) */
    preauth?: true
}

/** Parses the attributes of a [[PmksaCandidate]] object */
export function parsePmksaCandidate(r: Buffer): PmksaCandidate {
    return structs.getObject(r, {
        1: (data, obj) => obj.index = structs.getU32(data),
        2: (data, obj) => obj.bssid = data,
        3: (data, obj) => obj.preauth = structs.getFlag(data),
    })
}

/** Encodes a [[PmksaCandidate]] object into a stream of attributes */
export function formatPmksaCandidate(x: PmksaCandidate): StreamData {
    return structs.putObject(x, {
        index: (data, obj) => data.push(1, structs.putU32(obj.index!)),
        bssid: (data, obj) => data.push(2, obj.bssid!),
        preauth: (data, obj) => data.push(3, structs.putFlag(obj.preauth!)),
    })
}

/** values for %NL80211_ATTR_TDLS_OPERATION */
export enum TdlsOperation {
    /** Send a TDLS discovery request */
    DISCOVERY_REQ,
    
    /** Setup TDLS link */
    SETUP = 1,
    
    /** Teardown a TDLS link which is already established */
    TEARDOWN = 2,
    
    /** Enable TDLS link */
    ENABLE_LINK = 3,
    
    /** Disable TDLS link */
    DISABLE_LINK = 4,
}

/** device/driver features */
export interface FeatureFlags {
    /**
     * This driver supports reflecting back
     * TX status to the socket error queue when requested with the
     * socket option.
     */
    skTxStatus?: true
    
    /** This driver supports IBSS with HT datarates. */
    htIbss?: true
    
    /**
     * This driver takes care of freeing up
     * the connected inactive stations in AP mode.
     */
    inactivityTimer?: true
    
    /**
     * This driver has been tested
     * to work properly to suppport receiving regulatory hints from
     * cellular base stations.
     */
    cellBaseRegHints?: true
    
    /**
     * (no longer available, only
     * here to reserve the value for API/ABI compatibility)
     */
    p2pDeviceNeedsChannel?: true
    
    /**
     * This driver supports simultaneous authentication of
     * equals (SAE) with user space SME (NL80211_CMD_AUTHENTICATE) in station
     * mode
     */
    sae?: true
    
    /** This driver supports low priority scan */
    lowPriorityScan?: true
    
    /** Scan flush is supported */
    scanFlush?: true
    
    /** Support scanning using an AP vif */
    apScan?: true
    
    /** The driver supports per-vif TX power setting */
    vifTxpower?: true
    
    /**
     * The driver expects userspace to perform
     * OBSS scans and generate 20/40 BSS coex reports. This flag is used only
     * for drivers implementing the CONNECT API, for AUTH/ASSOC it is implied.
     */
    needObssScan?: true
    
    /**
     * P2P GO implementation supports CT Window
     * setting
     */
    p2pGoCtwin?: true
    
    /**
     * P2P GO implementation supports opportunistic
     * powersave
     */
    p2pGoOppps?: true
    
    /**
     * cfg80211 advertises channel limits
     * (HT40, VHT 80/160 MHz) if this flag is set
     */
    advertiseChanLimits?: true
    
    /**
     * The driver supports full state
     * transitions for AP clients. Without this flag (and if the driver
     * doesn't have the AP SME in the device) the driver supports adding
     * stations only when they're associated and adds them in associated
     * state (to later be transitioned into authorized), with this flag
     * they should be added before even sending the authentication reply
     * and then transitioned into authenticated, associated and authorized
     * states using station flags.
     * Note that even for drivers that support this, the default is to add
     * stations in authenticated/associated state, so to add unauthenticated
     * stations the authenticated/associated bits have to be set in the mask.
     */
    fullApClientState?: true
    
    /**
     * This driver supports a userspace Mesh
     * Peering Management entity which may be implemented by registering for
     * beacons or NL80211_CMD_NEW_PEER_CANDIDATE events. The mesh beacon is
     * still generated by the driver.
     */
    userspaceMpm?: true
    
    /**
     * This driver supports an active monitor
     * interface. An active monitor interface behaves like a normal monitor
     * interface, but gets added to the driver. It ensures that incoming
     * unicast packets directed at the configured interface address get ACKed.
     */
    activeMonitor?: true
    
    /**
     * This driver supports dynamic
     * channel bandwidth change (e.g., HT 20 <-> 40 MHz channel) during the
     * lifetime of a BSS.
     */
    apModeChanWidthChange?: true
    
    /**
     * This device adds a DS Parameter
     * Set IE to probe requests.
     */
    dsParamSetIeInProbes?: true
    
    /**
     * This device adds a WFA TPC Report IE
     * to probe requests.
     */
    wfaTpcIeInProbes?: true
    
    /**
     * This device, in client mode, supports Quiet Period
     * requests sent to it by an AP.
     */
    quiet?: true
    
    /**
     * This device is capable of inserting the
     * current tx power value into the TPC Report IE in the spectrum
     * management TPC Report action frame, and in the Radio Measurement Link
     * Measurement Report action frame.
     */
    txPowerInsertion?: true
    
    /**
     * This driver supports dynamic ACK timeout
     * estimation (dynack). %NL80211_ATTR_WIPHY_DYN_ACK flag attribute is used
     * to enable dynack.
     */
    acktoEstimation?: true
    
    /**
     * Device supports static spatial
     * multiplexing powersave, ie. can turn off all but one chain
     * even on HT connections that should be using more chains.
     */
    staticSmps?: true
    
    /**
     * Device supports dynamic spatial
     * multiplexing powersave, ie. can turn off all but one chain
     * and then wake the rest up as required after, for example,
     * rts/cts handshake.
     */
    dynamicSmps?: true
    
    /**
     * the device supports setting up WMM
     * TSPEC sessions (TID aka TSID 0-7) with the %NL80211_CMD_ADD_TX_TS
     * command. Standard IEEE 802.11 TSPEC setup is not yet supported, it
     * needs to be able to handle Block-Ack agreements and other things.
     */
    supportsWmmAdmission?: true
    
    /**
     * Device supports configuring
     * the vif's MAC address upon creation.
     * See 'macaddr' field in the vif_params (cfg80211.h).
     */
    macOnCreate?: true
    
    /**
     * Driver supports channel switching when
     * operating as a TDLS peer.
     */
    tdlsChannelSwitch?: true
    
    /**
     * This device/driver supports using a
     * random MAC address during scan (if the device is unassociated); the
     * %NL80211_SCAN_FLAG_RANDOM_ADDR flag may be set for scans and the MAC
     * address mask/value will be used.
     */
    scanRandomMacAddr?: true
    
    /**
     * This device/driver supports
     * using a random MAC address for every scan iteration during scheduled
     * scan (while not associated), the %NL80211_SCAN_FLAG_RANDOM_ADDR may
     * be set for scheduled scan and the MAC address mask/value will be used.
     */
    schedScanRandomMacAddr?: true
    
    /**
     * This device/driver supports using a
     * random MAC address for every scan iteration during "net detect", i.e.
     * scan in unassociated WoWLAN, the %NL80211_SCAN_FLAG_RANDOM_ADDR may
     * be set for scheduled scan and the MAC address mask/value will be used.
     */
    ndRandomMacAddr?: true
}

/** Parses the flags in a [[FeatureFlags]] bitmask */
export function parseFeatureFlags(r: number): FeatureFlags {
    const x: FeatureFlags = {}
    if (r & (1)) x.skTxStatus = true
    if (r & (2)) x.htIbss = true
    if (r & (4)) x.inactivityTimer = true
    if (r & (8)) x.cellBaseRegHints = true
    if (r & (16)) x.p2pDeviceNeedsChannel = true
    if (r & (32)) x.sae = true
    if (r & (64)) x.lowPriorityScan = true
    if (r & (128)) x.scanFlush = true
    if (r & (256)) x.apScan = true
    if (r & (512)) x.vifTxpower = true
    if (r & (1024)) x.needObssScan = true
    if (r & (2048)) x.p2pGoCtwin = true
    if (r & (4096)) x.p2pGoOppps = true
    if (r & (16384)) x.advertiseChanLimits = true
    if (r & (32768)) x.fullApClientState = true
    if (r & (65536)) x.userspaceMpm = true
    if (r & (131072)) x.activeMonitor = true
    if (r & (262144)) x.apModeChanWidthChange = true
    if (r & (524288)) x.dsParamSetIeInProbes = true
    if (r & (1048576)) x.wfaTpcIeInProbes = true
    if (r & (2097152)) x.quiet = true
    if (r & (4194304)) x.txPowerInsertion = true
    if (r & (8388608)) x.acktoEstimation = true
    if (r & (16777216)) x.staticSmps = true
    if (r & (33554432)) x.dynamicSmps = true
    if (r & (67108864)) x.supportsWmmAdmission = true
    if (r & (134217728)) x.macOnCreate = true
    if (r & (268435456)) x.tdlsChannelSwitch = true
    if (r & (536870912)) x.scanRandomMacAddr = true
    if (r & (1073741824)) x.schedScanRandomMacAddr = true
    if (r & (-2147483648)) x.ndRandomMacAddr = true
    return x
}

/** Encodes a [[FeatureFlags]] bitmask */
export function formatFeatureFlags(x: FeatureFlags): number {
    let r = 0
    if (x.skTxStatus) r |= 1
    if (x.htIbss) r |= 2
    if (x.inactivityTimer) r |= 4
    if (x.cellBaseRegHints) r |= 8
    if (x.p2pDeviceNeedsChannel) r |= 16
    if (x.sae) r |= 32
    if (x.lowPriorityScan) r |= 64
    if (x.scanFlush) r |= 128
    if (x.apScan) r |= 256
    if (x.vifTxpower) r |= 512
    if (x.needObssScan) r |= 1024
    if (x.p2pGoCtwin) r |= 2048
    if (x.p2pGoOppps) r |= 4096
    if (x.advertiseChanLimits) r |= 16384
    if (x.fullApClientState) r |= 32768
    if (x.userspaceMpm) r |= 65536
    if (x.activeMonitor) r |= 131072
    if (x.apModeChanWidthChange) r |= 262144
    if (x.dsParamSetIeInProbes) r |= 524288
    if (x.wfaTpcIeInProbes) r |= 1048576
    if (x.quiet) r |= 2097152
    if (x.txPowerInsertion) r |= 4194304
    if (x.acktoEstimation) r |= 8388608
    if (x.staticSmps) r |= 16777216
    if (x.dynamicSmps) r |= 33554432
    if (x.supportsWmmAdmission) r |= 67108864
    if (x.macOnCreate) r |= 134217728
    if (x.tdlsChannelSwitch) r |= 268435456
    if (x.scanRandomMacAddr) r |= 536870912
    if (x.schedScanRandomMacAddr) r |= 1073741824
    if (x.ndRandomMacAddr) r |= -2147483648
    return r
}

/** bit index of extended features. */
export enum ExtendedFeatureIndex {
    /** This driver supports IBSS with VHT datarates. */
    VHT_IBSS,
    
    /**
     * This driver supports RRM. When featured, user can
     * can request to use RRM (see %NL80211_ATTR_USE_RRM) with
     * %NL80211_CMD_ASSOCIATE and %NL80211_CMD_CONNECT requests, which will set
     * the ASSOC_REQ_USE_RRM flag in the association request even if
     * NL80211_FEATURE_QUIET is not advertized.
     */
    RRM = 1,
    
    /**
     * This device supports MU-MIMO air
     * sniffer which means that it can be configured to hear packets from
     * certain groups which can be configured by the
     * %NL80211_ATTR_MU_MIMO_GROUP_DATA attribute,
     * or can be configured to follow a station by configuring the
     * %NL80211_ATTR_MU_MIMO_FOLLOW_MAC_ADDR attribute.
     */
    MU_MIMO_AIR_SNIFFER = 2,
    
    /**
     * This driver includes the actual
     * time the scan started in scan results event. The time is the TSF of
     * the BSS that the interface that requested the scan is connected to
     * (if available).
     */
    SCAN_START_TIME = 3,
    
    /**
     * Per BSS, this driver reports the
     * time the last beacon/probe was received. The time is the TSF of the
     * BSS that the interface that requested the scan is connected to
     * (if available).
     */
    BSS_PARENT_TSF = 4,
    
    /**
     * This driver supports configuration of
     * channel dwell time.
     */
    SET_SCAN_DWELL = 5,
    
    /**
     * Driver supports beacon rate
     * configuration (AP/mesh), supporting a legacy (non HT/VHT) rate.
     */
    BEACON_RATE_LEGACY = 6,
    
    /**
     * Driver supports beacon rate
     * configuration (AP/mesh) with HT rates.
     */
    BEACON_RATE_HT = 7,
    
    /**
     * Driver supports beacon rate
     * configuration (AP/mesh) with VHT rates.
     */
    BEACON_RATE_VHT = 8,
    
    /**
     * This driver supports Fast Initial Link Setup
     * with user space SME (NL80211_CMD_AUTHENTICATE) in station mode.
     */
    FILS_STA = 9,
    
    /**
     * This driver supports randomized TA
     * in @NL80211_CMD_FRAME while not associated.
     */
    MGMT_TX_RANDOM_TA = 10,
    
    /**
     * This driver supports
     * randomized TA in @NL80211_CMD_FRAME while associated.
     */
    MGMT_TX_RANDOM_TA_CONNECTED = 11,
    
    /**
     * The driver supports sched_scan
     * for reporting BSSs with better RSSI than the current connected BSS
     * (%NL80211_ATTR_SCHED_SCAN_RELATIVE_RSSI).
     */
    SCHED_SCAN_RELATIVE_RSSI = 12,
    
    /**
     * With this driver the
     * %NL80211_ATTR_CQM_RSSI_THOLD attribute accepts a list of zero or more
     * RSSI threshold values to monitor rather than exactly one threshold.
     */
    CQM_RSSI_LIST = 13,
    
    /**
     * Driver SME supports FILS shared key
     * authentication with %NL80211_CMD_CONNECT.
     */
    FILS_SK_OFFLOAD = 14,
    
    /**
     * Device wants to do 4-way
     * handshake with PSK in station mode (PSK is passed as part of the connect
     * and associate commands), doing it in the host might not be supported.
     */
    _4WAY_HANDSHAKE_STA_PSK = 15,
    
    /**
     * Device wants to do doing 4-way
     * handshake with 802.1X in station mode (will pass EAP frames to the host
     * and accept the set_pmk/del_pmk commands), doing it in the host might not
     * be supported.
     */
    _4WAY_HANDSHAKE_STA_1X = 16,
    
    /**
     * Driver is capable of overriding
     * the max channel attribute in the FILS request params IE with the
     * actual dwell time.
     */
    FILS_MAX_CHANNEL_TIME = 17,
    
    /**
     * Driver accepts broadcast probe
     * response
     */
    ACCEPT_BCAST_PROBE_RESP = 18,
    
    /**
     * Driver supports sending
     * the first probe request in each channel at rate of at least 5.5Mbps.
     */
    OCE_PROBE_REQ_HIGH_TX_RATE = 19,
    
    /**
     * Driver supports
     * probe request tx deferral and suppression
     */
    OCE_PROBE_REQ_DEFERRAL_SUPPRESSION = 20,
    
    /**
     * Driver supports the %NL80211_MFP_OPTIONAL
     * value in %NL80211_ATTR_USE_MFP.
     */
    MFP_OPTIONAL = 21,
    
    /** Driver supports low span scan. */
    LOW_SPAN_SCAN = 22,
    
    /** Driver supports low power scan. */
    LOW_POWER_SCAN = 23,
    
    /** Driver supports high accuracy scan. */
    HIGH_ACCURACY_SCAN = 24,
    
    /**
     * HW/driver will offload DFS actions.
     * Device or driver will do all DFS-related actions by itself,
     * informing user-space about CAC progress, radar detection event,
     * channel change triggered by radar detection event.
     * No need to start CAC from user-space, no need to react to
     * "radar detected" event.
     */
    DFS_OFFLOAD = 25,
    
    /**
     * Driver supports sending and
     * receiving control port frames over nl80211 instead of the netdevice.
     */
    CONTROL_PORT_OVER_NL80211 = 26,
    
    /**
     * This driver/device supports
     * (average) ACK signal strength reporting.
     */
    ACK_SIGNAL_SUPPORT = 27,
    
    /**
     * Driver supports FQ-CoDel-enabled intermediate
     * TXQs.
     */
    TXQS = 28,
    
    /**
     * Driver/device supports randomizing the
     * SN in probe request frames if requested by %NL80211_SCAN_FLAG_RANDOM_SN.
     */
    SCAN_RANDOM_SN = 29,
    
    /**
     * Driver/device can omit all data
     * except for supported rates from the probe request content if requested
     * by the %NL80211_SCAN_FLAG_MIN_PREQ_CONTENT flag.
     */
    SCAN_MIN_PREQ_CONTENT = 30,
    
    /**
     * Driver/device confirm that they are
     * able to rekey an in-use key correctly. Userspace must not rekey PTK keys
     * if this flag is not set. Ignoring this can leak clear text packets and/or
     * freeze the connection.
     */
    CAN_REPLACE_PTK0 = 31,
    
    /**
     * Driver supports enabling fine
     * timing measurement responder role.
     */
    ENABLE_FTM_RESPONDER = 32,
    
    /**
     * Driver supports getting airtime
     * fairness for transmitted packets and has enabled airtime fairness
     * scheduling.
     */
    AIRTIME_FAIRNESS = 33,
    
    /**
     * Driver/device supports PMKSA caching
     * (set/del PMKSA operations) in AP mode.
     */
    AP_PMKSA_CACHING = 34,
    
    /**
     * Driver supports
     * filtering of sched scan results using band specific RSSI thresholds.
     */
    SCHED_SCAN_BAND_SPECIFIC_RSSI_THOLD = 35,
    
    /**
     * Driver supports "Extended Key ID for
     * Individually Addressed Frames" from IEEE802.11-2016.
     */
    EXT_KEY_ID = 36,
    
    /**
     * This driver supports controlling tx power
     * to a station.
     */
    STA_TX_PWR = 37,
    
    /**
     * Device wants to do SAE authentication in
     * station mode (SAE password is passed as part of the connect command).
     */
    SAE_OFFLOAD = 38,
    
    /**
     * The driver supports a single netdev
     * with VLAN tagged frames and separate VLAN-specific netdevs added using
     * vconfig similarly to the Ethernet case.
     */
    VLAN_OFFLOAD = 39,
}

/**
 * optional supported
 * protocols for probe-response offloading by the driver/FW.
 * To be used with the %NL80211_ATTR_PROBE_RESP_OFFLOAD attribute.
 * Each enum value represents a bit in the bitmap of supported
 * protocols. Typically a subset of probe-requests belonging to a
 * supported protocol will be excluded from offload and uploaded
 * to the host.
 */
export interface ProbeResponseOffloadSupport {
    /** Support for WPS ver. 1 */
    wps?: true
    
    /** Support for WPS ver. 2 */
    wps2?: true
    
    /** Support for P2P */
    p2p?: true
    
    /** Support for 802.11u */
    _80211u?: true
}

/** Parses the flags in a [[ProbeResponseOffloadSupport]] bitmask */
export function parseProbeResponseOffloadSupport(r: number): ProbeResponseOffloadSupport {
    const x: ProbeResponseOffloadSupport = {}
    if (r & (1)) x.wps = true
    if (r & (2)) x.wps2 = true
    if (r & (4)) x.p2p = true
    if (r & (8)) x._80211u = true
    return x
}

/** Encodes a [[ProbeResponseOffloadSupport]] bitmask */
export function formatProbeResponseOffloadSupport(x: ProbeResponseOffloadSupport): number {
    let r = 0
    if (x.wps) r |= 1
    if (x.wps2) r |= 2
    if (x.p2p) r |= 4
    if (x._80211u) r |= 8
    return r
}

/** connection request failed reasons */
export enum ConnectFailedReason {
    /**
     * Maximum number of clients that can be
     * handled by the AP is reached.
     */
    MAX_CLIENTS,
    
    /** Connection request is rejected due to ACL. */
    BLOCKED_CLIENT = 1,
}

/** timeout reasons */
export enum TimeoutReason {
    /** Timeout reason unspecified. */
    UNSPECIFIED,
    
    /** Scan (AP discovery) timed out. */
    SCAN = 1,
    
    /** Authentication timed out. */
    AUTH = 2,
    
    /** Association timed out. */
    ASSOC = 3,
}

/**
 * scan request control flags
 *
 * Scan request control flags are used to control the handling
 * of NL80211_CMD_TRIGGER_SCAN and NL80211_CMD_START_SCHED_SCAN
 * requests.
 *
 * NL80211_SCAN_FLAG_LOW_SPAN, NL80211_SCAN_FLAG_LOW_POWER, and
 * NL80211_SCAN_FLAG_HIGH_ACCURACY flags are exclusive of each other, i.e., only
 * one of them can be used in the request.
 */
export interface ScanFlags {
    /** scan request has low priority */
    lowPriority?: true
    
    /** flush cache before scanning */
    flush?: true
    
    /**
     * force a scan even if the interface is configured
     * as AP and the beaconing has already been configured. This attribute is
     * dangerous because will destroy stations performance as a lot of frames
     * will be lost while scanning off-channel, therefore it must be used only
     * when really needed
     */
    ap?: true
    
    /**
     * use a random MAC address for this scan (or
     * for scheduled scan: a different one for every scan iteration). When the
     * flag is set, depending on device capabilities the @NL80211_ATTR_MAC and
     * @NL80211_ATTR_MAC_MASK attributes may also be given in which case only
     * the masked bits will be preserved from the MAC address and the remainder
     * randomised. If the attributes are not given full randomisation (46 bits,
     * locally administered 1, multicast 0) is assumed.
     * This flag must not be requested when the feature isn't supported, check
     * the nl80211 feature flags for the device.
     */
    randomAddr?: true
    
    /**
     * fill the dwell time in the FILS
     * request parameters IE in the probe request
     */
    filsMaxChannelTime?: true
    
    /** accept broadcast probe responses */
    acceptBcastProbeResp?: true
    
    /**
     * send probe request frames at
     * rate of at least 5.5M. In case non OCE AP is discovered in the channel,
     * only the first probe req in the channel will be sent in high rate.
     */
    oceProbeReqHighTxRate?: true
    
    /**
     * allow probe request
     * tx deferral (dot11FILSProbeDelay shall be set to 15ms)
     * and suppression (if it has received a broadcast Probe Response frame,
     * Beacon frame or FILS Discovery frame from an AP that the STA considers
     * a suitable candidate for (re-)association - suitable in terms of
     * SSID and/or RSSI.
     */
    oceProbeReqDeferralSuppression?: true
    
    /**
     * Span corresponds to the total time taken to
     * accomplish the scan. Thus, this flag intends the driver to perform the
     * scan request with lesser span/duration. It is specific to the driver
     * implementations on how this is accomplished. Scan accuracy may get
     * impacted with this flag.
     */
    lowSpan?: true
    
    /**
     * This flag intends the scan attempts to consume
     * optimal possible power. Drivers can resort to their specific means to
     * optimize the power. Scan accuracy may get impacted with this flag.
     */
    lowPower?: true
    
    /**
     * Accuracy here intends to the extent of scan
     * results obtained. Thus HIGH_ACCURACY scan flag aims to get maximum
     * possible scan results. This flag hints the driver to use the best
     * possible scan configuration to improve the accuracy in scanning.
     * Latency and power use may get impacted with this flag.
     */
    highAccuracy?: true
    
    /**
     * randomize the sequence number in probe
     * request frames from this scan to avoid correlation/tracking being
     * possible.
     */
    randomSn?: true
    
    /**
     * minimize probe request content to
     * only have supported rates and no additional capabilities (unless
     * added by userspace explicitly.)
     */
    minPreqContent?: true
}

/** Parses the flags in a [[ScanFlags]] bitmask */
export function parseScanFlags(r: number): ScanFlags {
    const x: ScanFlags = {}
    if (r & (1)) x.lowPriority = true
    if (r & (2)) x.flush = true
    if (r & (4)) x.ap = true
    if (r & (8)) x.randomAddr = true
    if (r & (16)) x.filsMaxChannelTime = true
    if (r & (32)) x.acceptBcastProbeResp = true
    if (r & (64)) x.oceProbeReqHighTxRate = true
    if (r & (128)) x.oceProbeReqDeferralSuppression = true
    if (r & (256)) x.lowSpan = true
    if (r & (512)) x.lowPower = true
    if (r & (1024)) x.highAccuracy = true
    if (r & (2048)) x.randomSn = true
    if (r & (4096)) x.minPreqContent = true
    return x
}

/** Encodes a [[ScanFlags]] bitmask */
export function formatScanFlags(x: ScanFlags): number {
    let r = 0
    if (x.lowPriority) r |= 1
    if (x.flush) r |= 2
    if (x.ap) r |= 4
    if (x.randomAddr) r |= 8
    if (x.filsMaxChannelTime) r |= 16
    if (x.acceptBcastProbeResp) r |= 32
    if (x.oceProbeReqHighTxRate) r |= 64
    if (x.oceProbeReqDeferralSuppression) r |= 128
    if (x.lowSpan) r |= 256
    if (x.lowPower) r |= 512
    if (x.highAccuracy) r |= 1024
    if (x.randomSn) r |= 2048
    if (x.minPreqContent) r |= 4096
    return r
}

/**
 * access control policy
 *
 * Access control policy is applied on a MAC list set by
 * %NL80211_CMD_START_AP and %NL80211_CMD_SET_MAC_ACL, to
 * be used with %NL80211_ATTR_ACL_POLICY.
 */
export enum AclPolicy {
    /**
     * Deny stations which are
     * listed in ACL, i.e. allow all the stations which are not listed
     * in ACL to authenticate.
     */
    ACCEPT_UNLESS_LISTED,
    
    /**
     * Allow the stations which are listed
     * in ACL, i.e. deny all the stations which are not listed in ACL.
     */
    DENY_UNLESS_LISTED = 1,
}

/**
 * SMPS mode
 *
 * Requested SMPS mode (for AP mode)
 */
export enum SmpsMode {
    /** SMPS off (use all antennas). */
    OFF,
    
    /** static SMPS (use a single antenna) */
    STATIC = 1,
    
    /**
     * dynamic smps (start with a single antenna and
     * turn on other antennas after CTS/RTS).
     */
    DYNAMIC = 2,
}

/**
 * type of radar event for DFS operation
 *
 * Type of event to be used with NL80211_ATTR_RADAR_EVENT to inform userspace
 * about detected radars or success of the channel available check (CAC)
 */
export enum RadarEvent {
    /**
     * A radar pattern has been detected. The channel is
     * now unusable.
     */
    DETECTED,
    
    /**
     * Channel Availability Check has been finished,
     * the channel is now available.
     */
    CAC_FINISHED = 1,
    
    /**
     * Channel Availability Check has been aborted, no
     * change to the channel status.
     */
    CAC_ABORTED = 2,
    
    /**
     * The Non-Occupancy Period for this channel is
     * over, channel becomes usable.
     */
    NOP_FINISHED = 3,
    
    /**
     * Channel Availability Check done on this
     * non-operating channel is expired and no longer valid. New CAC must
     * be done on this channel before starting the operation. This is not
     * applicable for ETSI dfs domain where pre-CAC is valid for ever.
     */
    PRE_CAC_EXPIRED = 4,
    
    /**
     * Channel Availability Check has been started,
     * should be generated by HW if NL80211_EXT_FEATURE_DFS_OFFLOAD is enabled.
     */
    CAC_STARTED = 5,
}

/**
 * DFS states for channels
 *
 * Channel states used by the DFS code.
 */
export enum DfsState {
    /**
     * The channel can be used, but channel availability
     * check (CAC) must be performed before using it for AP or IBSS.
     */
    USABLE,
    
    /**
     * A radar has been detected on this channel, it
     * is therefore marked as not available.
     */
    UNAVAILABLE = 1,
    
    /** The channel has been CAC checked and is available. */
    AVAILABLE = 2,
}

/** nl80211 protocol features */
export interface ProtocolFeatures {
    /**
     * nl80211 supports splitting
     * wiphy dumps (if requested by the application with the attribute
     * %NL80211_ATTR_SPLIT_WIPHY_DUMP. Also supported is filtering the
     * wiphy dump by %NL80211_ATTR_WIPHY, %NL80211_ATTR_IFINDEX or
     * %NL80211_ATTR_WDEV.
     */
    phyDump?: true
}

/** Parses the flags in a [[ProtocolFeatures]] bitmask */
export function parseProtocolFeatures(r: number): ProtocolFeatures {
    const x: ProtocolFeatures = {}
    if (r & (1)) x.phyDump = true
    return x
}

/** Encodes a [[ProtocolFeatures]] bitmask */
export function formatProtocolFeatures(x: ProtocolFeatures): number {
    let r = 0
    if (x.phyDump) r |= 1
    return r
}

/** nl80211 critical protocol identifiers */
export enum CritProtoId {
    /** BOOTP or DHCPv6 protocol. */
    DHCP = 1,
    
    /** EAPOL protocol. */
    EAPOL = 2,
    
    /** APIPA protocol. */
    APIPA = 3,
}

/**
 * flags for received management frame.
 *
 * Used by cfg80211_rx_mgmt()
 */
export interface RxmgmtFlags {
    /** frame was answered by device/driver. */
    answered?: true
    
    /**
     * Host driver intends to offload
     * the authentication. Exclusively defined for host drivers that
     * advertises the SME functionality but would like the userspace
     * to handle certain authentication algorithms (e.g. SAE).
     */
    externalAuth?: true
}

/** Parses the flags in a [[RxmgmtFlags]] bitmask */
export function parseRxmgmtFlags(r: number): RxmgmtFlags {
    const x: RxmgmtFlags = {}
    if (r & (1)) x.answered = true
    if (r & (2)) x.externalAuth = true
    return x
}

/** Encodes a [[RxmgmtFlags]] bitmask */
export function formatRxmgmtFlags(x: RxmgmtFlags): number {
    let r = 0
    if (x.answered) r |= 1
    if (x.externalAuth) r |= 2
    return r
}

/**
 * TDLS peer flags.
 *
 * Used by tdls_mgmt() to determine which conditional elements need
 * to be added to TDLS Setup frames.
 */
export interface TdlsPeerCapability {
    /** TDLS peer is HT capable. */
    ht?: true
    
    /** TDLS peer is VHT capable. */
    vht?: true
    
    /** TDLS peer is WMM capable. */
    wmm?: true
}

/** Parses the flags in a [[TdlsPeerCapability]] bitmask */
export function parseTdlsPeerCapability(r: number): TdlsPeerCapability {
    const x: TdlsPeerCapability = {}
    if (r & (1)) x.ht = true
    if (r & (2)) x.vht = true
    if (r & (4)) x.wmm = true
    return x
}

/** Encodes a [[TdlsPeerCapability]] bitmask */
export function formatTdlsPeerCapability(x: TdlsPeerCapability): number {
    let r = 0
    if (x.ht) r |= 1
    if (x.vht) r |= 2
    if (x.wmm) r |= 4
    return r
}

/** scanning plan for scheduled scan */
export interface ScheduledScanPlan extends BaseObject {
    /**
     * interval between scan iterations. In
     * seconds (u32).
     */
    nterval?: number
    
    /**
     * number of scan iterations in this
     * scan plan (u32). The last scan plan must not specify this attribute
     * because it will run infinitely. A value of zero is invalid as it will
     * make the scan plan meaningless.
     */
    terations?: number
}

/** Parses the attributes of a [[ScheduledScanPlan]] object */
export function parseScheduledScanPlan(r: Buffer): ScheduledScanPlan {
    return structs.getObject(r, {
        1: (data, obj) => obj.nterval = structs.getU32(data),
        2: (data, obj) => obj.terations = structs.getU32(data),
    })
}

/** Encodes a [[ScheduledScanPlan]] object into a stream of attributes */
export function formatScheduledScanPlan(x: ScheduledScanPlan): StreamData {
    return structs.putObject(x, {
        nterval: (data, obj) => data.push(1, structs.putU32(obj.nterval!)),
        terations: (data, obj) => data.push(2, structs.putU32(obj.terations!)),
    })
}

/**
 * attributes for bss selection.
 *
 * One and only one of these attributes are found within %NL80211_ATTR_BSS_SELECT
 * for %NL80211_CMD_CONNECT. It specifies the required BSS selection behaviour
 * which the driver shall use.
 */
export interface BssSelect extends BaseObject {
    /**
     * Flag indicating only RSSI-based BSS selection
     * is requested.
     */
    rssi?: true
    
    /**
     * attribute indicating BSS
     * selection should be done such that the specified band is preferred.
     * When there are multiple BSS-es in the preferred band, the driver
     * shall use RSSI-based BSS selection as a second step. The value of
     * this attribute is according to &enum nl80211_band (u32).
     */
    bandPref?: BandId | keyof typeof BandId
    
    /**
     * When present the RSSI level for
     * BSS-es in the specified band is to be adjusted before doing
     * RSSI-based BSS selection. The attribute value is a packed structure
     * value as specified by &struct nl80211_bss_select_rssi_adjust.
     */
    rssiAdjust?: Buffer
}

/** Parses the attributes of a [[BssSelect]] object */
export function parseBssSelect(r: Buffer): BssSelect {
    return structs.getObject(r, {
        1: (data, obj) => obj.rssi = structs.getFlag(data),
        2: (data, obj) => obj.bandPref = structs.getEnum(BandId, structs.getU32(data)),
        3: (data, obj) => obj.rssiAdjust = data,
    })
}

/** Encodes a [[BssSelect]] object into a stream of attributes */
export function formatBssSelect(x: BssSelect): StreamData {
    return structs.putObject(x, {
        rssi: (data, obj) => data.push(1, structs.putFlag(obj.rssi!)),
        bandPref: (data, obj) => data.push(2, structs.putU32(structs.putEnum(BandId, obj.bandPref!))),
        rssiAdjust: (data, obj) => data.push(3, obj.rssiAdjust!),
    })
}

/**
 * NAN function type
 *
 * Defines the function type of a NAN function
 */
export enum NanFunctionType {
    /** function is publish */
    PUBLISH,
    
    /** function is subscribe */
    SUBSCRIBE = 1,
    
    /** function is follow-up */
    FOLLOW_UP = 2,
}

/**
 * NAN publish tx type
 *
 * Defines how to send publish Service Discovery Frames
 */
export interface NanPublishType {
    /** publish function is solicited */
    solicitedPublish?: true
    
    /** publish function is unsolicited */
    unsolicitedPublish?: true
}

/** Parses the flags in a [[NanPublishType]] bitmask */
export function parseNanPublishType(r: number): NanPublishType {
    const x: NanPublishType = {}
    if (r & (1)) x.solicitedPublish = true
    if (r & (2)) x.unsolicitedPublish = true
    return x
}

/** Encodes a [[NanPublishType]] bitmask */
export function formatNanPublishType(x: NanPublishType): number {
    let r = 0
    if (x.solicitedPublish) r |= 1
    if (x.unsolicitedPublish) r |= 2
    return r
}

/**
 * NAN functions termination reason
 *
 * Defines termination reasons of a NAN function
 */
export enum NanFunctionTerminationReason {
    /** requested by user */
    USER_REQUEST,
    
    /** timeout */
    TTL_EXPIRED = 1,
    
    /** errored */
    ERROR = 2,
}

/** NAN function attributes */
export interface NanFunction extends BaseObject {
    /** &enum nl80211_nan_function_type (u8). */
    type?: NanFunctionType | keyof typeof NanFunctionType
    
    /**
     * 6 bytes of the service ID hash as
     * specified in NAN spec. This is a binary attribute.
     */
    serviceId?: Buffer
    
    /**
     * relevant if the function's type is
     * publish. Defines the transmission type for the publish Service Discovery
     * Frame, see &enum nl80211_nan_publish_type. Its type is u8.
     */
    publishType?: NanPublishType
    
    /**
     * relevant if the function is a solicited
     * publish. Should the solicited publish Service Discovery Frame be sent to
     * the NAN Broadcast address. This is a flag.
     */
    publishBcast?: true
    
    /**
     * relevant if the function's type is
     * subscribe. Is the subscribe active. This is a flag.
     */
    subscribeActive?: true
    
    /**
     * relevant if the function's type is follow up.
     * The instance ID for the follow up Service Discovery Frame. This is u8.
     */
    followUpId?: number
    
    /**
     * relevant if the function's type
     * is follow up. This is a u8.
     * The requestor instance ID for the follow up Service Discovery Frame.
     */
    followUpReqId?: number
    
    /**
     * the MAC address of the recipient of the
     * follow up Service Discovery Frame. This is a binary attribute.
     */
    followUpDest?: Buffer
    
    /**
     * is this function limited for devices in a
     * close range. The range itself (RSSI) is defined by the device.
     * This is a flag.
     */
    closeRange?: true
    
    /**
     * strictly positive number of DWs this function should
     * stay active. If not present infinite TTL is assumed. This is a u32.
     */
    ttl?: number
    
    /**
     * array of bytes describing the service
     * specific info. This is a binary attribute.
     */
    serviceInfo?: Buffer
    
    /**
     * Service Receive Filter. This is a nested attribute.
     * See &enum nl80211_nan_srf_attributes.
     */
    srf?: NanSrf
    
    /**
     * Receive Matching filter. This is a nested
     * attribute. It is a list of binary values.
     */
    rxMatchFilter?: Buffer
    
    /**
     * Transmit Matching filter. This is a
     * nested attribute. It is a list of binary values.
     */
    txMatchFilter?: Buffer
    
    /**
     * The instance ID of the function.
     * Its type is u8 and it cannot be 0.
     */
    instanceId?: number
    
    /**
     * NAN function termination reason.
     * See &enum nl80211_nan_func_term_reason.
     */
    termReason?: NanFunctionTerminationReason | keyof typeof NanFunctionTerminationReason
}

/** Parses the attributes of a [[NanFunction]] object */
export function parseNanFunction(r: Buffer): NanFunction {
    return structs.getObject(r, {
        1: (data, obj) => obj.type = structs.getEnum(NanFunctionType, structs.getU8(data)),
        2: (data, obj) => obj.serviceId = data,
        3: (data, obj) => obj.publishType = parseNanPublishType(structs.getU8(data)),
        4: (data, obj) => obj.publishBcast = structs.getFlag(data),
        5: (data, obj) => obj.subscribeActive = structs.getFlag(data),
        6: (data, obj) => obj.followUpId = structs.getU8(data),
        7: (data, obj) => obj.followUpReqId = structs.getU8(data),
        8: (data, obj) => obj.followUpDest = data,
        9: (data, obj) => obj.closeRange = structs.getFlag(data),
        10: (data, obj) => obj.ttl = structs.getU32(data),
        11: (data, obj) => obj.serviceInfo = data,
        12: (data, obj) => obj.srf = parseNanSrf(data),
        13: (data, obj) => obj.rxMatchFilter = data,
        14: (data, obj) => obj.txMatchFilter = data,
        15: (data, obj) => obj.instanceId = structs.getU8(data),
        16: (data, obj) => obj.termReason = structs.getEnum(NanFunctionTerminationReason, structs.getU8(data)),
    })
}

/** Encodes a [[NanFunction]] object into a stream of attributes */
export function formatNanFunction(x: NanFunction): StreamData {
    return structs.putObject(x, {
        type: (data, obj) => data.push(1, structs.putU8(structs.putEnum(NanFunctionType, obj.type!))),
        serviceId: (data, obj) => data.push(2, obj.serviceId!),
        publishType: (data, obj) => data.push(3, structs.putU8(formatNanPublishType(obj.publishType!))),
        publishBcast: (data, obj) => data.push(4, structs.putFlag(obj.publishBcast!)),
        subscribeActive: (data, obj) => data.push(5, structs.putFlag(obj.subscribeActive!)),
        followUpId: (data, obj) => data.push(6, structs.putU8(obj.followUpId!)),
        followUpReqId: (data, obj) => data.push(7, structs.putU8(obj.followUpReqId!)),
        followUpDest: (data, obj) => data.push(8, obj.followUpDest!),
        closeRange: (data, obj) => data.push(9, structs.putFlag(obj.closeRange!)),
        ttl: (data, obj) => data.push(10, structs.putU32(obj.ttl!)),
        serviceInfo: (data, obj) => data.push(11, obj.serviceInfo!),
        srf: (data, obj) => data.push(12, formatNanSrf(obj.srf!)),
        rxMatchFilter: (data, obj) => data.push(13, obj.rxMatchFilter!),
        txMatchFilter: (data, obj) => data.push(14, obj.txMatchFilter!),
        instanceId: (data, obj) => data.push(15, structs.putU8(obj.instanceId!)),
        termReason: (data, obj) => data.push(16, structs.putU8(structs.putEnum(NanFunctionTerminationReason, obj.termReason!))),
    })
}

/** NAN Service Response filter attributes */
export interface NanSrf extends BaseObject {
    /**
     * present if the include bit of the SRF set.
     * This is a flag.
     */
    include?: true
    
    /**
     * Bloom Filter. Present if and only if
     * %NL80211_NAN_SRF_MAC_ADDRS isn't present. This attribute is binary.
     */
    bf?: Buffer
    
    /**
     * index of the Bloom Filter. Mandatory if
     * %NL80211_NAN_SRF_BF is present. This is a u8.
     */
    bfIdx?: number
    
    /**
     * list of MAC addresses for the SRF. Present if
     * and only if %NL80211_NAN_SRF_BF isn't present. This is a nested
     * attribute. Each nested attribute is a MAC address.
     */
    macAddrs?: Buffer[]
}

/** Parses the attributes of a [[NanSrf]] object */
export function parseNanSrf(r: Buffer): NanSrf {
    return structs.getObject(r, {
        1: (data, obj) => obj.include = structs.getFlag(data),
        2: (data, obj) => obj.bf = data,
        3: (data, obj) => obj.bfIdx = structs.getU8(data),
        4: (data, obj) => obj.macAddrs = structs.getArray(data, x => x),
    })
}

/** Encodes a [[NanSrf]] object into a stream of attributes */
export function formatNanSrf(x: NanSrf): StreamData {
    return structs.putObject(x, {
        include: (data, obj) => data.push(1, structs.putFlag(obj.include!)),
        bf: (data, obj) => data.push(2, obj.bf!),
        bfIdx: (data, obj) => data.push(3, structs.putU8(obj.bfIdx!)),
        macAddrs: (data, obj) => data.push(4, structs.putArray(obj.macAddrs!, x => x)),
    })
}

/** NAN match attributes */
export interface NanMatch extends BaseObject {
    /**
     * the local function that had the
     * match. This is a nested attribute.
     * See &enum nl80211_nan_func_attributes.
     */
    local?: NanFunction
    
    /**
     * the peer function
     * that caused the match. This is a nested attribute.
     * See &enum nl80211_nan_func_attributes.
     */
    peer?: NanFunction
}

/** Parses the attributes of a [[NanMatch]] object */
export function parseNanMatch(r: Buffer): NanMatch {
    return structs.getObject(r, {
        1: (data, obj) => obj.local = parseNanFunction(data),
        2: (data, obj) => obj.peer = parseNanFunction(data),
    })
}

/** Encodes a [[NanMatch]] object into a stream of attributes */
export function formatNanMatch(x: NanMatch): StreamData {
    return structs.putObject(x, {
        local: (data, obj) => data.push(1, formatNanFunction(obj.local!)),
        peer: (data, obj) => data.push(2, formatNanFunction(obj.peer!)),
    })
}

/**
 * Action to perform with external
 * authentication request. Used by NL80211_ATTR_EXTERNAL_AUTH_ACTION.
 */
export enum ExternalAuthAction {
    /** Start the authentication. */
    START,
    
    /** Abort the ongoing authentication. */
    ABORT = 1,
}

/**
 * fine timing measurement
 * responder attributes
 */
export interface FtmResponder extends BaseObject {
    /** FTM responder is enabled */
    enabled?: Buffer
    
    /**
     * The content of Measurement Report Element
     * (9.4.2.22 in 802.11-2016) with type 8 - LCI (9.4.2.22.10),
     * i.e. starting with the measurement token
     */
    lci?: Buffer
    
    /**
     * The content of Measurement Report Element
     * (9.4.2.22 in 802.11-2016) with type 11 - Civic (Section 9.4.2.22.13),
     * i.e. starting with the measurement token
     */
    civicloc?: Buffer
}

/** Parses the attributes of a [[FtmResponder]] object */
export function parseFtmResponder(r: Buffer): FtmResponder {
    return structs.getObject(r, {
        1: (data, obj) => obj.enabled = data,
        2: (data, obj) => obj.lci = data,
        3: (data, obj) => obj.civicloc = data,
    })
}

/** Encodes a [[FtmResponder]] object into a stream of attributes */
export function formatFtmResponder(x: FtmResponder): StreamData {
    return structs.putObject(x, {
        enabled: (data, obj) => data.push(1, obj.enabled!),
        lci: (data, obj) => data.push(2, obj.lci!),
        civicloc: (data, obj) => data.push(3, obj.civicloc!),
    })
}

/**
 * FTM responder statistics
 *
 * These attribute types are used with %NL80211_ATTR_FTM_RESPONDER_STATS
 * when getting FTM responder statistics.
 */
export interface FtmResponderStats extends BaseObject {
    /**
     * number of FTM sessions in which all frames
     * were ssfully answered (u32)
     */
    successNum?: number
    
    /**
     * number of FTM sessions in which part of the
     * frames were successfully answered (u32)
     */
    partialNum?: number
    
    /** number of failed FTM sessions (u32) */
    failedNum?: number
    
    /** number of ASAP sessions (u32) */
    asapNum?: number
    
    /** number of non-ASAP sessions (u32) */
    nonAsapNum?: number
    
    /**
     * total sessions durations - gives an
     * indication of how much time the responder was busy (u64, msec)
     */
    totalDurationMsec?: bigint
    
    /**
     * number of unknown FTM triggers -
     * triggers from initiators that didn't finish successfully the negotiation
     * phase with the responder (u32)
     */
    unknownTriggersNum?: number
    
    /**
     * number of FTM reschedule requests
     * - initiator asks for a new scheduling although it already has scheduled
     * FTM slot (u32)
     */
    rescheduleRequestsNum?: number
    
    /**
     * number of FTM triggers out of
     * scheduled window (u32)
     */
    outOfWindowTriggersNum?: number
    
    /** used for padding, ignore */
    pad?: Buffer
}

/** Parses the attributes of a [[FtmResponderStats]] object */
export function parseFtmResponderStats(r: Buffer): FtmResponderStats {
    return structs.getObject(r, {
        1: (data, obj) => obj.successNum = structs.getU32(data),
        2: (data, obj) => obj.partialNum = structs.getU32(data),
        3: (data, obj) => obj.failedNum = structs.getU32(data),
        4: (data, obj) => obj.asapNum = structs.getU32(data),
        5: (data, obj) => obj.nonAsapNum = structs.getU32(data),
        6: (data, obj) => obj.totalDurationMsec = structs.getU64(data),
        7: (data, obj) => obj.unknownTriggersNum = structs.getU32(data),
        8: (data, obj) => obj.rescheduleRequestsNum = structs.getU32(data),
        9: (data, obj) => obj.outOfWindowTriggersNum = structs.getU32(data),
        10: (data, obj) => obj.pad = data,
    })
}

/** Encodes a [[FtmResponderStats]] object into a stream of attributes */
export function formatFtmResponderStats(x: FtmResponderStats): StreamData {
    return structs.putObject(x, {
        successNum: (data, obj) => data.push(1, structs.putU32(obj.successNum!)),
        partialNum: (data, obj) => data.push(2, structs.putU32(obj.partialNum!)),
        failedNum: (data, obj) => data.push(3, structs.putU32(obj.failedNum!)),
        asapNum: (data, obj) => data.push(4, structs.putU32(obj.asapNum!)),
        nonAsapNum: (data, obj) => data.push(5, structs.putU32(obj.nonAsapNum!)),
        totalDurationMsec: (data, obj) => data.push(6, structs.putU64(obj.totalDurationMsec!)),
        unknownTriggersNum: (data, obj) => data.push(7, structs.putU32(obj.unknownTriggersNum!)),
        rescheduleRequestsNum: (data, obj) => data.push(8, structs.putU32(obj.rescheduleRequestsNum!)),
        outOfWindowTriggersNum: (data, obj) => data.push(9, structs.putU32(obj.outOfWindowTriggersNum!)),
        pad: (data, obj) => data.push(10, obj.pad!),
    })
}

/** frame preamble types */
export enum Preamble {
    /** legacy (HR/DSSS, OFDM, ERP PHY) preamble */
    LEGACY,
    
    /** HT preamble */
    HT = 1,
    
    /** VHT preamble */
    VHT = 2,
    
    /** DMG preamble */
    DMG = 3,
}

/** Set of flags from [[Preamble]] bits */
export interface PreambleSet extends BaseObject {
    /** legacy (HR/DSSS, OFDM, ERP PHY) preamble */
    legacy?: true
    
    /** HT preamble */
    ht?: true
    
    /** VHT preamble */
    vht?: true
    
    /** DMG preamble */
    dmg?: true
}

/** Parses the flags in a bitmask with [[Preamble]] bits */
export function parsePreambleSet(r: number): PreambleSet {
    const x: PreambleSet = {}
    if (r & (1 << Preamble.LEGACY)) x.legacy = true
    if (r & (1 << Preamble.HT)) x.ht = true
    if (r & (1 << Preamble.VHT)) x.vht = true
    if (r & (1 << Preamble.DMG)) x.dmg = true
    return x
}

/** Encodes a [[Preamble]] bitmask */
export function formatPreambleSet(x: PreambleSet): number {
    let r = 0
    if (x.legacy) r |= 1 << Preamble.LEGACY
    if (x.ht) r |= 1 << Preamble.HT
    if (x.vht) r |= 1 << Preamble.VHT
    if (x.dmg) r |= 1 << Preamble.DMG
    return r
}

/** peer measurement types */
export enum PeerMeasurementType {
    /**
     * invalid/unused, needed as we use
     * these numbers also for attributes
     */
    INVALID,
    
    /** flight time measurement */
    FTM = 1,
}

/** peer measurement status */
export enum PeerMeasurementStatus {
    /** measurement completed successfully */
    SUCCESS,
    
    /** measurement was locally refused */
    REFUSED = 1,
    
    /** measurement timed out */
    TIMEOUT = 2,
    
    /**
     * measurement failed, a type-dependent
     * reason may be available in the response data
     */
    FAILURE = 3,
}

/** peer measurement request attributes */
export interface PeerMeasurementRequest extends BaseObject {
    /**
     * This is a nested attribute with measurement
     * type-specific request data inside. The attributes used are from the
     * enums named nl80211_peer_measurement_<type>_req.
     */
    data?: Buffer
    
    /**
     * include AP TSF timestamp, if supported
     * (flag attribute)
     */
    getApTsf?: true
}

/** Parses the attributes of a [[PeerMeasurementRequest]] object */
export function parsePeerMeasurementRequest(r: Buffer): PeerMeasurementRequest {
    return structs.getObject(r, {
        1: (data, obj) => obj.data = data,
        2: (data, obj) => obj.getApTsf = structs.getFlag(data),
    })
}

/** Encodes a [[PeerMeasurementRequest]] object into a stream of attributes */
export function formatPeerMeasurementRequest(x: PeerMeasurementRequest): StreamData {
    return structs.putObject(x, {
        data: (data, obj) => data.push(1, obj.data!),
        getApTsf: (data, obj) => data.push(2, structs.putFlag(obj.getApTsf!)),
    })
}

/** peer measurement response attributes */
export interface PeerMeasurementResponse extends BaseObject {
    /**
     * This is a nested attribute with measurement
     * type-specific results inside. The attributes used are from the enums
     * named nl80211_peer_measurement_<type>_resp.
     */
    data?: Buffer
    
    /**
     * u32 value with the measurement status
     * (using values from &enum nl80211_peer_measurement_status.)
     */
    status?: PeerMeasurementStatus | keyof typeof PeerMeasurementStatus
    
    /**
     * host time (%CLOCK_BOOTTIME) when the
     * result was measured; this value is not expected to be accurate to
     * more than 20ms. (u64, nanoseconds)
     */
    hostTime?: bigint
    
    /**
     * TSF of the AP that the interface
     * doing the measurement is connected to when the result was measured.
     * This shall be accurately reported if supported and requested
     * (u64, usec)
     */
    apTsf?: bigint
    
    /**
     * If results are sent to the host partially
     * (*e.g. with FTM per-burst data) this flag will be cleared on all but
     * the last result; if all results are combined it's set on the single
     * result.
     */
    final?: true
    
    /** padding for 64-bit attributes, ignore */
    pad?: Buffer
}

/** Parses the attributes of a [[PeerMeasurementResponse]] object */
export function parsePeerMeasurementResponse(r: Buffer): PeerMeasurementResponse {
    return structs.getObject(r, {
        1: (data, obj) => obj.data = data,
        2: (data, obj) => obj.status = structs.getEnum(PeerMeasurementStatus, structs.getU32(data)),
        3: (data, obj) => obj.hostTime = structs.getU64(data),
        4: (data, obj) => obj.apTsf = structs.getU64(data),
        5: (data, obj) => obj.final = structs.getFlag(data),
        6: (data, obj) => obj.pad = data,
    })
}

/** Encodes a [[PeerMeasurementResponse]] object into a stream of attributes */
export function formatPeerMeasurementResponse(x: PeerMeasurementResponse): StreamData {
    return structs.putObject(x, {
        data: (data, obj) => data.push(1, obj.data!),
        status: (data, obj) => data.push(2, structs.putU32(structs.putEnum(PeerMeasurementStatus, obj.status!))),
        hostTime: (data, obj) => data.push(3, structs.putU64(obj.hostTime!)),
        apTsf: (data, obj) => data.push(4, structs.putU64(obj.apTsf!)),
        final: (data, obj) => data.push(5, structs.putFlag(obj.final!)),
        pad: (data, obj) => data.push(6, obj.pad!),
    })
}

/** peer attributes for measurement */
export interface PeerMeasurementPeerAttrs extends BaseObject {
    /** peer's MAC address */
    addr?: Buffer
    
    /**
     * channel definition, nested, using top-level
     * attributes like %NL80211_ATTR_WIPHY_FREQ etc.
     */
    chan?: Message
    
    /**
     * This is a nested attribute indexed by
     * measurement type, with attributes from the
     * &enum nl80211_peer_measurement_req inside.
     */
    req?: Map<number, PeerMeasurementRequest>
    
    /**
     * This is a nested attribute indexed by
     * measurement type, with attributes from the
     * &enum nl80211_peer_measurement_resp inside.
     */
    resp?: Map<number, PeerMeasurementResponse>
}

/** Parses the attributes of a [[PeerMeasurementPeerAttrs]] object */
export function parsePeerMeasurementPeerAttrs(r: Buffer): PeerMeasurementPeerAttrs {
    return structs.getObject(r, {
        1: (data, obj) => obj.addr = data,
        2: (data, obj) => obj.chan = parseMessage(data),
        3: (data, obj) => obj.req = structs.getMap(data, x => parsePeerMeasurementRequest(x)),
        4: (data, obj) => obj.resp = structs.getMap(data, x => parsePeerMeasurementResponse(x)),
    })
}

/** Encodes a [[PeerMeasurementPeerAttrs]] object into a stream of attributes */
export function formatPeerMeasurementPeerAttrs(x: PeerMeasurementPeerAttrs): StreamData {
    return structs.putObject(x, {
        addr: (data, obj) => data.push(1, obj.addr!),
        chan: (data, obj) => data.push(2, formatMessage(obj.chan!)),
        req: (data, obj) => data.push(3, structs.putMap(obj.req!, x => formatPeerMeasurementRequest(x))),
        resp: (data, obj) => data.push(4, structs.putMap(obj.resp!, x => formatPeerMeasurementResponse(x))),
    })
}

/** peer measurement attributes */
export interface PeerMeasurement extends BaseObject {
    /**
     * u32 attribute used for capability
     * advertisement only, indicates the maximum number of peers
     * measurements can be done with in a single request
     */
    maxPeers?: number
    
    /**
     * flag attribute in capability
     * indicating that the connected AP's TSF can be reported in
     * measurement results
     */
    reportApTsf?: true
    
    /**
     * flag attribute in capability
     * indicating that MAC address randomization is supported.
     */
    randomizeMacAddr?: true
    
    /**
     * capabilities reported by the device,
     * this contains a nesting indexed by measurement type, and
     * type-specific capabilities inside, which are from the enums
     * named nl80211_peer_measurement_<type>_capa.
     */
    typeCapa?: Buffer
    
    /**
     * nested attribute, the nesting index is
     * meaningless, just a list of peers to measure with, with the
     * sub-attributes taken from
     * &enum nl80211_peer_measurement_peer_attrs.
     */
    peers?: PeerMeasurementPeerAttrs
}

/** Parses the attributes of a [[PeerMeasurement]] object */
export function parsePeerMeasurement(r: Buffer): PeerMeasurement {
    return structs.getObject(r, {
        1: (data, obj) => obj.maxPeers = structs.getU32(data),
        2: (data, obj) => obj.reportApTsf = structs.getFlag(data),
        3: (data, obj) => obj.randomizeMacAddr = structs.getFlag(data),
        4: (data, obj) => obj.typeCapa = data,
        5: (data, obj) => obj.peers = parsePeerMeasurementPeerAttrs(data),
    })
}

/** Encodes a [[PeerMeasurement]] object into a stream of attributes */
export function formatPeerMeasurement(x: PeerMeasurement): StreamData {
    return structs.putObject(x, {
        maxPeers: (data, obj) => data.push(1, structs.putU32(obj.maxPeers!)),
        reportApTsf: (data, obj) => data.push(2, structs.putFlag(obj.reportApTsf!)),
        randomizeMacAddr: (data, obj) => data.push(3, structs.putFlag(obj.randomizeMacAddr!)),
        typeCapa: (data, obj) => data.push(4, obj.typeCapa!),
        peers: (data, obj) => data.push(5, formatPeerMeasurementPeerAttrs(obj.peers!)),
    })
}

/** FTM capabilities */
export interface PeerMeasurementFtmCapabilities extends BaseObject {
    /**
     * flag attribute indicating ASAP mode
     * is supported
     */
    asap?: true
    
    /**
     * flag attribute indicating non-ASAP
     * mode is supported
     */
    nonAsap?: true
    
    /**
     * flag attribute indicating if LCI
     * data can be requested during the measurement
     */
    reqLci?: true
    
    /**
     * flag attribute indicating if civic
     * location data can be requested during the measurement
     */
    reqCivicloc?: true
    
    /**
     * u32 bitmap attribute of bits
     * from &enum nl80211_preamble.
     */
    preambles?: PreambleSet
    
    /**
     * bitmap of values from
     * &enum nl80211_chan_width indicating the supported channel
     * bandwidths for FTM. Note that a higher channel bandwidth may be
     * configured to allow for other measurements types with different
     * bandwidth requirement in the same measurement.
     */
    bandwidths?: Buffer
    
    /**
     * u32 attribute indicating
     * the maximum bursts exponent that can be used (if not present anything
     * is valid)
     */
    maxBurstsExponent?: number
    
    /**
     * u32 attribute indicating
     * the maximum FTMs per burst (if not present anything is valid)
     */
    maxFtmsPerBurst?: number
}

/** Parses the attributes of a [[PeerMeasurementFtmCapabilities]] object */
export function parsePeerMeasurementFtmCapabilities(r: Buffer): PeerMeasurementFtmCapabilities {
    return structs.getObject(r, {
        1: (data, obj) => obj.asap = structs.getFlag(data),
        2: (data, obj) => obj.nonAsap = structs.getFlag(data),
        3: (data, obj) => obj.reqLci = structs.getFlag(data),
        4: (data, obj) => obj.reqCivicloc = structs.getFlag(data),
        5: (data, obj) => obj.preambles = parsePreambleSet(structs.getU32(data)),
        6: (data, obj) => obj.bandwidths = data,
        7: (data, obj) => obj.maxBurstsExponent = structs.getU32(data),
        8: (data, obj) => obj.maxFtmsPerBurst = structs.getU32(data),
    })
}

/** Encodes a [[PeerMeasurementFtmCapabilities]] object into a stream of attributes */
export function formatPeerMeasurementFtmCapabilities(x: PeerMeasurementFtmCapabilities): StreamData {
    return structs.putObject(x, {
        asap: (data, obj) => data.push(1, structs.putFlag(obj.asap!)),
        nonAsap: (data, obj) => data.push(2, structs.putFlag(obj.nonAsap!)),
        reqLci: (data, obj) => data.push(3, structs.putFlag(obj.reqLci!)),
        reqCivicloc: (data, obj) => data.push(4, structs.putFlag(obj.reqCivicloc!)),
        preambles: (data, obj) => data.push(5, structs.putU32(formatPreambleSet(obj.preambles!))),
        bandwidths: (data, obj) => data.push(6, obj.bandwidths!),
        maxBurstsExponent: (data, obj) => data.push(7, structs.putU32(obj.maxBurstsExponent!)),
        maxFtmsPerBurst: (data, obj) => data.push(8, structs.putU32(obj.maxFtmsPerBurst!)),
    })
}

/** FTM request attributes */
export interface PeerMeasurementFtmRequest extends BaseObject {
    /** ASAP mode requested (flag) */
    asap?: true
    
    /**
     * preamble type (see
     * &enum nl80211_preamble), optional for DMG (u32)
     */
    preamble?: Preamble | keyof typeof Preamble
    
    /**
     * number of bursts exponent as in
     * 802.11-2016 9.4.2.168 "Fine Timing Measurement Parameters element"
     * (u8, 0-15, optional with default 15 i.e. "no preference")
     */
    numBurstsExp?: number
    
    /**
     * interval between bursts in units
     * of 100ms (u16, optional with default 0)
     */
    burstPeriod?: number
    
    /**
     * burst duration, as in 802.11-2016
     * Table 9-257 "Burst Duration field encoding" (u8, 0-15, optional with
     * default 15 i.e. "no preference")
     */
    burstDuration?: number
    
    /**
     * number of successful FTM frames
     * requested per burst
     * (u8, 0-31, optional with default 0 i.e. "no preference")
     */
    ftmsPerBurst?: number
    
    /**
     * number of FTMR frame retries
     * (u8, default 3)
     */
    numFtmrRetries?: number
    
    /** request LCI data (flag) */
    requestLci?: true
    
    /**
     * request civic location data
     * (flag)
     */
    requestCivicloc?: true
}

/** Parses the attributes of a [[PeerMeasurementFtmRequest]] object */
export function parsePeerMeasurementFtmRequest(r: Buffer): PeerMeasurementFtmRequest {
    return structs.getObject(r, {
        1: (data, obj) => obj.asap = structs.getFlag(data),
        2: (data, obj) => obj.preamble = structs.getEnum(Preamble, structs.getU32(data)),
        3: (data, obj) => obj.numBurstsExp = structs.getU8(data),
        4: (data, obj) => obj.burstPeriod = structs.getU16(data),
        5: (data, obj) => obj.burstDuration = structs.getU8(data),
        6: (data, obj) => obj.ftmsPerBurst = structs.getU8(data),
        7: (data, obj) => obj.numFtmrRetries = structs.getU8(data),
        8: (data, obj) => obj.requestLci = structs.getFlag(data),
        9: (data, obj) => obj.requestCivicloc = structs.getFlag(data),
    })
}

/** Encodes a [[PeerMeasurementFtmRequest]] object into a stream of attributes */
export function formatPeerMeasurementFtmRequest(x: PeerMeasurementFtmRequest): StreamData {
    return structs.putObject(x, {
        asap: (data, obj) => data.push(1, structs.putFlag(obj.asap!)),
        preamble: (data, obj) => data.push(2, structs.putU32(structs.putEnum(Preamble, obj.preamble!))),
        numBurstsExp: (data, obj) => data.push(3, structs.putU8(obj.numBurstsExp!)),
        burstPeriod: (data, obj) => data.push(4, structs.putU16(obj.burstPeriod!)),
        burstDuration: (data, obj) => data.push(5, structs.putU8(obj.burstDuration!)),
        ftmsPerBurst: (data, obj) => data.push(6, structs.putU8(obj.ftmsPerBurst!)),
        numFtmrRetries: (data, obj) => data.push(7, structs.putU8(obj.numFtmrRetries!)),
        requestLci: (data, obj) => data.push(8, structs.putFlag(obj.requestLci!)),
        requestCivicloc: (data, obj) => data.push(9, structs.putFlag(obj.requestCivicloc!)),
    })
}

/** FTM failure reasons */
export enum PeerMeasurementFtmFailureReasons {
    /** unspecified failure, not used */
    UNSPECIFIED,
    
    /** no response from the FTM responder */
    NO_RESPONSE = 1,
    
    /** FTM responder rejected measurement */
    REJECTED = 2,
    
    /**
     * we already know the peer is
     * on a different channel, so can't measure (if we didn't know, we'd
     * try and get no response)
     */
    WRONG_CHANNEL = 3,
    
    /** peer can't actually do FTM */
    PEER_NOT_CAPABLE = 4,
    
    /**
     * invalid T1/T4 timestamps
     * received
     */
    INVALID_TIMESTAMP = 5,
    
    /**
     * peer reports busy, you may retry
     * later (see %NL80211_PMSR_FTM_RESP_ATTR_BUSY_RETRY_TIME)
     */
    PEER_BUSY = 6,
    
    /**
     * parameters were changed
     * by the peer and are no longer supported
     */
    BAD_CHANGED_PARAMS = 7,
}

/** FTM response attributes */
export interface PeerMeasurementFtmResponse extends BaseObject {
    /**
     * FTM-specific failure reason
     * (u32, optional)
     */
    failReason?: number
    
    /**
     * optional, if bursts are reported
     * as separate results then it will be the burst index 0...(N-1) and
     * the top level will indicate partial results (u32)
     */
    burstIndex?: number
    
    /**
     * number of FTM Request frames
     * transmitted (u32, optional)
     */
    numFtmrAttempts?: number
    
    /**
     * number of FTM Request frames
     * that were acknowleged (u32, optional)
     */
    numFtmrSuccesses?: number
    
    /**
     * retry time received from the
     * busy peer (u32, seconds)
     */
    busyRetryTime?: number
    
    /**
     * actual number of bursts exponent
     * used by the responder (similar to request, u8)
     */
    numBurstsExp?: number
    
    /**
     * actual burst duration used by
     * the responder (similar to request, u8)
     */
    burstDuration?: number
    
    /**
     * actual FTMs per burst used
     * by the responder (similar to request, u8)
     */
    ftmsPerBurst?: number
    
    /**
     * average RSSI across all FTM action
     * frames (optional, s32, 1/2 dBm)
     */
    rssiAvg?: number
    
    /**
     * RSSI spread across all FTM action
     * frames (optional, s32, 1/2 dBm)
     */
    rssiSpread?: number
    
    /**
     * bitrate we used for the response to the
     * FTM action frame (optional, nested, using &enum nl80211_rate_info
     * attributes)
     */
    txRate?: RateInfo
    
    /**
     * bitrate the responder used for the FTM
     * action frame (optional, nested, using &enum nl80211_rate_info attrs)
     */
    rxRate?: RateInfo
    
    /**
     * average RTT (s64, picoseconds, optional
     * but one of RTT/DIST must be present)
     */
    rttAvg?: bigint
    
    /**
     * RTT variance (u64, ps^2, note that
     * standard deviation is the square root of variance, optional)
     */
    rttVariance?: bigint
    
    /**
     * RTT spread (u64, picoseconds,
     * optional)
     */
    rttSpread?: bigint
    
    /**
     * average distance (s64, mm, optional
     * but one of RTT/DIST must be present)
     */
    distAvg?: bigint
    
    /**
     * distance variance (u64, mm^2, note
     * that standard deviation is the square root of variance, optional)
     */
    distVariance?: bigint
    
    /** distance spread (u64, mm, optional) */
    distSpread?: bigint
    
    /**
     * LCI data from peer (binary, optional);
     * this is the contents of the Measurement Report Element (802.11-2016
     * 9.4.2.22.1) starting with the Measurement Token, with Measurement
     * Type 8.
     */
    lci?: Buffer
    
    /**
     * civic location data from peer
     * (binary, optional);
     * this is the contents of the Measurement Report Element (802.11-2016
     * 9.4.2.22.1) starting with the Measurement Token, with Measurement
     * Type 11.
     */
    civicloc?: Buffer
    
    /** ignore, for u64/s64 padding only */
    pad?: Buffer
}

/** Parses the attributes of a [[PeerMeasurementFtmResponse]] object */
export function parsePeerMeasurementFtmResponse(r: Buffer): PeerMeasurementFtmResponse {
    return structs.getObject(r, {
        1: (data, obj) => obj.failReason = structs.getU32(data),
        2: (data, obj) => obj.burstIndex = structs.getU32(data),
        3: (data, obj) => obj.numFtmrAttempts = structs.getU32(data),
        4: (data, obj) => obj.numFtmrSuccesses = structs.getU32(data),
        5: (data, obj) => obj.busyRetryTime = structs.getU32(data),
        6: (data, obj) => obj.numBurstsExp = structs.getU8(data),
        7: (data, obj) => obj.burstDuration = structs.getU8(data),
        8: (data, obj) => obj.ftmsPerBurst = structs.getU8(data),
        9: (data, obj) => obj.rssiAvg = structs.getS32(data),
        10: (data, obj) => obj.rssiSpread = structs.getS32(data),
        11: (data, obj) => obj.txRate = parseRateInfo(data),
        12: (data, obj) => obj.rxRate = parseRateInfo(data),
        13: (data, obj) => obj.rttAvg = structs.getS64(data),
        14: (data, obj) => obj.rttVariance = structs.getU64(data),
        15: (data, obj) => obj.rttSpread = structs.getU64(data),
        16: (data, obj) => obj.distAvg = structs.getS64(data),
        17: (data, obj) => obj.distVariance = structs.getU64(data),
        18: (data, obj) => obj.distSpread = structs.getU64(data),
        19: (data, obj) => obj.lci = data,
        20: (data, obj) => obj.civicloc = data,
        21: (data, obj) => obj.pad = data,
    })
}

/** Encodes a [[PeerMeasurementFtmResponse]] object into a stream of attributes */
export function formatPeerMeasurementFtmResponse(x: PeerMeasurementFtmResponse): StreamData {
    return structs.putObject(x, {
        failReason: (data, obj) => data.push(1, structs.putU32(obj.failReason!)),
        burstIndex: (data, obj) => data.push(2, structs.putU32(obj.burstIndex!)),
        numFtmrAttempts: (data, obj) => data.push(3, structs.putU32(obj.numFtmrAttempts!)),
        numFtmrSuccesses: (data, obj) => data.push(4, structs.putU32(obj.numFtmrSuccesses!)),
        busyRetryTime: (data, obj) => data.push(5, structs.putU32(obj.busyRetryTime!)),
        numBurstsExp: (data, obj) => data.push(6, structs.putU8(obj.numBurstsExp!)),
        burstDuration: (data, obj) => data.push(7, structs.putU8(obj.burstDuration!)),
        ftmsPerBurst: (data, obj) => data.push(8, structs.putU8(obj.ftmsPerBurst!)),
        rssiAvg: (data, obj) => data.push(9, structs.putS32(obj.rssiAvg!)),
        rssiSpread: (data, obj) => data.push(10, structs.putS32(obj.rssiSpread!)),
        txRate: (data, obj) => data.push(11, formatRateInfo(obj.txRate!)),
        rxRate: (data, obj) => data.push(12, formatRateInfo(obj.rxRate!)),
        rttAvg: (data, obj) => data.push(13, structs.putS64(obj.rttAvg!)),
        rttVariance: (data, obj) => data.push(14, structs.putU64(obj.rttVariance!)),
        rttSpread: (data, obj) => data.push(15, structs.putU64(obj.rttSpread!)),
        distAvg: (data, obj) => data.push(16, structs.putS64(obj.distAvg!)),
        distVariance: (data, obj) => data.push(17, structs.putU64(obj.distVariance!)),
        distSpread: (data, obj) => data.push(18, structs.putU64(obj.distSpread!)),
        lci: (data, obj) => data.push(19, obj.lci!),
        civicloc: (data, obj) => data.push(20, obj.civicloc!),
        pad: (data, obj) => data.push(21, obj.pad!),
    })
}

/** OBSS packet detection attributes */
export interface ObssPd extends BaseObject {
    /** the OBSS PD minimum tx power offset. */
    inOffset?: Buffer
    
    /** the OBSS PD maximum tx power offset. */
    axOffset?: Buffer
}

/** Parses the attributes of a [[ObssPd]] object */
export function parseObssPd(r: Buffer): ObssPd {
    return structs.getObject(r, {
        1: (data, obj) => obj.inOffset = data,
        2: (data, obj) => obj.axOffset = data,
    })
}

/** Encodes a [[ObssPd]] object into a stream of attributes */
export function formatObssPd(x: ObssPd): StreamData {
    return structs.putObject(x, {
        inOffset: (data, obj) => data.push(1, obj.inOffset!),
        axOffset: (data, obj) => data.push(2, obj.axOffset!),
    })
}
