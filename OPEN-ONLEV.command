#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

clear
printf '\n========================================\n'
printf '         ONLEV WEBSITE LAUNCHER\n'
printf '========================================\n\n'

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed on this Mac."
  echo ""
  echo "1. Install Node.js 20.9 or newer from: https://nodejs.org/"
  echo "2. Then double-click OPEN-ONLEV.command again."
  echo ""
  read -r -p "Press Return to open the Node.js download page..." _
  open "https://nodejs.org/"
  exit 1
fi

NODE_MAJOR=$(node -p "parseInt(process.versions.node.split('.')[0], 10)")
NODE_MINOR=$(node -p "parseInt(process.versions.node.split('.')[1], 10)")
if [ "$NODE_MAJOR" -lt 20 ] || { [ "$NODE_MAJOR" -eq 20 ] && [ "$NODE_MINOR" -lt 9 ]; }; then
  echo "Your Node.js version is $(node -v). This project needs Node.js 20.9 or newer."
  echo "Update Node.js at https://nodejs.org/ and run this launcher again."
  read -r -p "Press Return to open the Node.js download page..." _
  open "https://nodejs.org/"
  exit 1
fi

echo "Node.js: $(node -v)"
echo "Project: $PROJECT_DIR"
echo ""

if [ ! -d "node_modules" ]; then
  echo "FIRST LAUNCH: installing website dependencies."
  echo "This requires an internet connection and only happens the first time."
  echo ""
  npx --yes pnpm@11.19.0 install
  echo ""
fi

echo "Starting ONLEV at http://localhost:3000"
echo "Keep this Terminal window open while viewing the website."
echo "Press Control-C here when you want to stop it."
echo ""

(
  sleep 4
  open "http://localhost:3000"
) &

npx --yes pnpm@11.19.0 dev -- -p 3000
