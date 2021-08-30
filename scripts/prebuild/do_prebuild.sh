#!/bin/bash
set -eEuo pipefail

ARCHS="$1"
for arch in $ARCHS; do
    npm run prebuildify -- --napi --platform=linux --arch=$arch --tag-libc
done
chown "$(stat -c%u /app):$(stat -c%g /app)" -R prebuilds
cp -a prebuilds /app
