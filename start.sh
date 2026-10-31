#!/usr/bin/env bash
set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
DEPLOY_DIR="$PROJECT_DIR/dist"
OUTPUT_FILE="/home/runner/work/_temp/omgithub-web/deployment-output.json"

# Write deployment output metadata
mkdir -p "$(dirname "$OUTPUT_FILE")"
echo "{\"project\":\"$PROJECT_DIR\",\"directory\":\"$DEPLOY_DIR\"}" > "$OUTPUT_FILE"

# Change to project directory
cd "$PROJECT_DIR"

# Copy static files to dist if not already there
if [ ! -f "$DEPLOY_DIR/index.html" ]; then
  echo "Setting up deployment directory..."
  mkdir -p "$DEPLOY_DIR"
  cp index.html "$DEPLOY_DIR/index.html"
  # Copy Data folder if it exists
  if [ -d "Data" ]; then
    cp -r Data "$DEPLOY_DIR/Data"
  fi
fi

# Install dependencies if package.json exists and node_modules missing
if [ -f "package.json" ] && [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install --no-audit --no-fund 2>&1
fi

# Serve in foreground on port 3000 (or PORT env var)
PORT="${PORT:-3000}"
echo "Starting server on port $PORT..."
npx serve -s "$DEPLOY_DIR" -l "$PORT" &
SERVER_PID=$!

# Wait for server process
wait $SERVER_PID