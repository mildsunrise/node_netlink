#!/bin/bash
set -eEuo pipefail

NODE_VERSION="$1"

apt-get -qq update
apt-get -qq install -y --no-install-recommends curl python3 make clang

if [ "$(uname -m)" = "x86_64" ]; then
    # needed to build for i386
    apt-get -qq install -y --no-install-recommends libc6-dev-{i386,x32} lib{,x}32stdc++-5-dev
fi

if command -v gcc; then echo 'gcc should not be installed'; fi

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

nvm install "$NODE_VERSION"
nvm use "$NODE_VERSION"

exec "${@:2}"
