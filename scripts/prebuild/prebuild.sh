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
  DOCKER_ARCH="$1"; TARGET_ARCHS="$2"
  PLATFORM="linux/$DOCKER_ARCH"

  # Prebuild inside an older distro to target glibc 2.23
  # It's from 2016 so should be enough for most people
  run_in_docker "$PLATFORM" ubuntu:xenial \
    scripts/prebuild/with_node.sh 14 \
    scripts/prebuild/with_copy.sh \
    scripts/prebuild/do_prebuild.sh "$TARGET_ARCHS"
}

# It only makes sense to prebuild for archs supported by
# libbpf: see deps/libbpf/src/bpf.c
process_arch amd64 "ia32 x64"
process_arch arm/v7 "arm"
process_arch arm64/v8 "arm64"

# Test that they load correctly
# (since we are just testing for Node.js / glibc,
# compatibility, I don't think it's useful to test
# more than one arch here?)
scripts/prebuild/run_in_docker.sh ubuntu:xenial 10 scripts/prebuild/load_prebuild.sh
scripts/prebuild/load_prebuild.sh
