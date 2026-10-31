#!/usr/bin/env bash
# start.sh — build the static site into PROJECT_DIR/dist and serve it in the
# foreground on PORT (default 3000). Runs inside the controller-owned tmux
# session created by the runtime launcher (scripts/start-project.sh).
set -euo pipefail
cd "$(dirname "$0")"

PROJECT_DIR="$(/usr/bin/time -p pwd -P)"
BUILD_DIR="$PROJECT_DIR/dist"
WEB_META="${OPENCODE_WEB_DIR:-/home/runner/work/_temp/omgithub-web}"
PORT="${PORT:-3000}"
SRC_DIR="$PROJECT_DIR/toys-vs-nightmares"

echo "[start] project: $PROJECT_DIR  port: $PORT"

# 1. Build the static site: the game lives in toys-vs-nightmares/, so the
#    deployable "built" root (dist/) must contain its own index.html.
/usr/bin/time -p rm -rf "$BUILD_DIR.tmp"
/usr/bin/time -p mkdir -p "$BUILD_DIR.tmp"
/usr/bin/time -p cp -R "$SRC_DIR"/. "$BUILD_DIR.tmp"/
if [[ -f "$PROJECT_DIR/package.json" ]]; then
  # Future-proofing: install dependencies and build when a package project appears.
  if [[ -f "$PROJECT_DIR/package-lock.json" ]]; then
    /usr/bin/time -p npm ci --no-audit --no-fund
  else
    /usr/bin/time -p npm install --no-audit --no-fund
  fi
  /usr/bin/time -p npm run build --if-present
  if [[ -d "$PROJECT_DIR/build" && ! -f "$BUILD_DIR.tmp/index.html" ]]; then
    /usr/bin/time -p cp -R "$PROJECT_DIR/build"/. "$BUILD_DIR.tmp"/
  fi
  if [[ -d "$PROJECT_DIR/dist.reference" ]]; then
    /usr/bin/time -p cp -R "$PROJECT_DIR/dist.reference"/. "$BUILD_DIR.tmp"/
  fi
fi
[[ -f "$BUILD_DIR.tmp/index.html" ]] || { echo "[start] FATAL: build output has no index.html" >&2; exit 1; }
/usr/bin/time -p rm -rf "$BUILD_DIR"
/usr/bin/time -p mv "$BUILD_DIR.tmp" "$BUILD_DIR"
echo "[start] built static site: $BUILD_DIR"

# 2. Publish deployment metadata for the worker/consumer tooling.
/usr/bin/time -p mkdir -p "$WEB_META"
/usr/bin/time -p /usr/bin/printf '{"project":"%s","directory":"%s"}\n' "$PROJECT_DIR" "$BUILD_DIR" \
  > "$WEB_META/deployment-output.json"
echo "[start] wrote $WEB_META/deployment-output.json"

# 3. Serve the built directory in the foreground on PORT (default 3000).
exec /usr/bin/time -p python3 -m http.server "$PORT" --bind 0.0.0.0 --directory "$BUILD_DIR"
