#!/bin/bash
# Re-builds prebuilds and/or tests them for portability
# Dependencies: docker (plus permissions to use it)
set -eEuo pipefail

# Register binfmt handlers so we can emulate other archs
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes

rm -rf prebuilds

run_in_docker() {
  PLATFORM="$1"; IMAGE="$2"
  docker run --rm -v "$(pwd)":/app -w /app --platform="$PLATFORM" "$IMAGE" "${@:3}"
}

process_arch() {
  PLATFORM="linux/$1"

  # Prebuild inside an older distro to target glibc 2.23
  # It's from 2016 so should be enough for most people
  run_in_docker "$PLATFORM" ubuntu:xenial \
    scripts/prebuild/with_node.sh 14 \
    scripts/prebuild/with_copy.sh \
    scripts/prebuild/do_prebuild.sh

  # For musl we'll just use Alpine, and musl has full ABI
  # compat so we don't need to build against an old musl,
  # but there may be other deps (libstdc++)
  run_in_docker "$PLATFORM" node:10-alpine sh \
    scripts/prebuild/with_alpine_buildtools.sh \
    scripts/prebuild/with_copy.sh \
    scripts/prebuild/do_prebuild.sh
}

# It only makes sense to prebuild for archs supported by
# libbpf: see deps/libbpf/src/bpf.c
process_arch amd64
process_arch 386
process_arch arm/v7
process_arch arm64/v8

# Test that they load correctly, & on early versions
# (since we are just testing for Node.js / glibc,
# compatibility, I don't think it's useful to test
# more than one arch here?)
scripts/prebuild/load_prebuild.sh
run_in_docker linux/amd64 ubuntu:xenial \
  scripts/prebuild/with_node.sh 10 \
  scripts/prebuild/load_prebuild.sh
run_in_docker linux/amd64 node:10-alpine \
  scripts/prebuild/load_prebuild.sh
