#!/usr/bin/env bash
set -euo pipefail

# Read environment variables
CAPTURE_URL="${CAPTURE_URL:-}"
CAPTURE_DIR="${CAPTURE_DIR:-}"

if [ -z "$CAPTURE_URL" ] || [ -z "$CAPTURE_DIR" ]; then
  echo "ERROR: CAPTURE_URL and CAPTURE_DIR environment variables must be set"
  exit 1
fi

# Create capture directory
mkdir -p "$CAPTURE_DIR"

# Per-command timing start
START_TIME=$(date +%s%N)

# Run the capture using Node.js
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
node "${SCRIPT_DIR}/capture-runner.mjs" "$CAPTURE_URL" "$CAPTURE_DIR" "$START_TIME"
EXIT_CODE=$?

# Per-command timing output
END_TIME=$(date +%s%N)
ELAPSED=$(( (END_TIME - START_TIME) / 1000000 ))
echo "Capture completed in ${ELAPSED}ms with exit code: $EXIT_CODE"

exit $EXIT_CODE