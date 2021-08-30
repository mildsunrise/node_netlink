#!/bin/bash
set -eEuo pipefail

npm run prebuildify -- --napi --platform=linux --tag-libc
chown "$(stat -c%u /app):$(stat -c%g /app)" -R prebuilds
cp -a prebuilds /app
