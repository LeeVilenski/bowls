#!/usr/bin/env bash
# Bump the release version in the two places that must stay in step:
#   - short-mat-bowls.html  →  const VERSION = '...'
#   - sw.js                 →  const CACHE   = 'bowls-v...'
# Keeping them together means a release always ships a fresh service-worker
# cache, so users never get stuck on a stale build.
#
# Usage:  ./scripts/bump-version.sh 1.2.3
set -euo pipefail

VER="${1:-}"
if [ -z "$VER" ]; then
  echo "Usage: $0 <version>   e.g. $0 1.2.3" >&2
  exit 1
fi
if ! printf '%s' "$VER" | grep -Eq '^[0-9]+\.[0-9]+\.[0-9]+$'; then
  echo "Version must look like X.Y.Z (e.g. 1.2.3), got: '$VER'" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
HTML="$ROOT/short-mat-bowls.html"
SW="$ROOT/sw.js"

# -i.bak keeps this portable across GNU (Linux) and BSD (macOS) sed; the
# backup files are removed straight after.
sed -i.bak -E "s/const VERSION = '[^']*';/const VERSION = '$VER';/" "$HTML"
sed -i.bak -E "s/const CACHE = 'bowls-v[^']*';/const CACHE = 'bowls-v$VER';/" "$SW"
rm -f "$HTML.bak" "$SW.bak"

echo "Bumped to v$VER:"
grep -n "const VERSION" "$HTML" | head -1
grep -n "const CACHE"   "$SW"   | head -1
echo
echo "Next:"
echo "  git commit -am \"Release v$VER\" && git tag v$VER && git push && git push --tags"
