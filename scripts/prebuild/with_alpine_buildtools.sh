#!/bin/bash
set -eEuo pipefail

apk add g++ make python2 linux-headers

exec "$@"
