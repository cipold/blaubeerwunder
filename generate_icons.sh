#!/usr/bin/env bash
set -euf -o pipefail

SCRIPT_PATH="$(
  cd "$(dirname "$0")"
  pwd -P
)"
cd "${SCRIPT_PATH}"

npx vue-pwa-asset-generator -a src/assets/icons/cake-icon.svg -o public/img/icons -b fbedf1 --manifest false
npx vue-pwa-asset-generator -a src/assets/icons/cake-icon-maskable.svg -o public/img/icons-maskable -b fbedf1 --manifest false
mv public/img/icons-maskable/android-chrome-maskable-192x192.png public/img/icons/android-chrome-maskable-192x192.png
mv public/img/icons-maskable/android-chrome-maskable-512x512.png public/img/icons/android-chrome-maskable-512x512.png
rm -rf public/img/icons-maskable
cp src/assets/icons/cake-icon.svg public/img/icons/favicon.svg
cp public/img/icons/favicon.ico public/favicon.ico
