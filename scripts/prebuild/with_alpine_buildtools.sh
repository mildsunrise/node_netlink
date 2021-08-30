#!/bin/bash
set -e
apk add bash # support Euo pipefail on further scripts

apk add g++ make python2 linux-headers

exec "$@"
