#!/bin/bash
set -eEuo pipefail

apt-get -qq update
apt-get -qq install -y curl python3 build-essential

exec "$@"
