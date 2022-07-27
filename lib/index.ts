export * from './constants'
export * from './raw'
export * from './structs'
export * from './netlink'
export * from './genl/genl'
export * from './nl80211/nl80211'
export * from './rt/rt'
export * from './wg/wg'

import * as genl from './genl/structs'
import * as nl80211 from './nl80211/structs'
import * as rt from './rt/structs'
import * as ifla from './rt/ifla'
import * as wg from './wg/structs'
export {
    genl,
    nl80211,
    rt,
    ifla,
    wg,
}
