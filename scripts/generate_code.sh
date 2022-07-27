#!/bin/bash
set -eEuo pipefail

#ts-node scripts/generate_parser.ts types/genl.ts    lib/genl/structs.ts
ts-node scripts/generate_parser.ts types/nl80211.ts lib/nl80211/structs.ts

ts-node scripts/generate_parser.ts types/rt.ts   lib/rt/gen_structs.ts
ts-node scripts/generate_parser.ts types/ifla.ts lib/rt/ifla.ts

ts-node scripts/generate_parser.ts types/wg.ts lib/wg/structs.ts
