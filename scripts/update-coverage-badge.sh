#!/usr/bin/env bash
# update-coverage-badge.sh — regenerate the dynamic coverage badge from the test run and
# publish it to the orphan `badges` branch as a shields.io endpoint JSON.
#
# Called by CI (.github/workflows/ci.yml) on push to main only. Self-contained: no external
# coverage service. The README badge reads:
#   https://img.shields.io/endpoint?url=<raw badges/coverage.json>
#
# Requires: GITHUB_TOKEN (contents: write) and GITHUB_REPOSITORY in the environment (both are
# provided by GitHub Actions). Safe to run locally too — set those two vars first.
set -euo pipefail

: "${GITHUB_TOKEN:?GITHUB_TOKEN is required}"
: "${GITHUB_REPOSITORY:?GITHUB_REPOSITORY is required (owner/repo)}"

# Measure coverage: parse the "all files" summary line from the Node test runner. Take the
# minimum of the line/branch/function percentages so the badge never overstates coverage.
summary="$(npm test 2>&1 | grep -E 'all files' | tail -1 || true)"
if [ -z "$summary" ]; then
  echo "Could not find coverage summary line; leaving badge unchanged." >&2
  exit 0
fi
cov="$(printf '%s\n' "$summary" | awk -F'|' '
  { l=$2+0; b=$3+0; f=$4+0; m=l; if (b<m) m=b; if (f<m) m=f; printf "%.2f", m }')"

# Round to a whole number for display; pick a colour band.
pct="$(printf '%.0f' "$cov")"
if   [ "$pct" -ge 100 ]; then color=brightgreen
elif [ "$pct" -ge 90 ];  then color=green
elif [ "$pct" -ge 75 ];  then color=yellowgreen
elif [ "$pct" -ge 60 ];  then color=yellow
else                          color=red
fi

tmp="$(mktemp -d)"
printf '{"schemaVersion":1,"label":"coverage","message":"%s%%","color":"%s"}\n' \
  "$pct" "$color" > "$tmp/coverage.json"
echo "coverage badge => ${pct}% (${color})"

# Publish as a single-commit orphan branch (force-push, so no history bloat).
cd "$tmp"
git init -q
git config user.name  "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git checkout -q -b badges
git add coverage.json
git commit -q -m "chore: update coverage badge [skip ci]"
git push -qf "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git" badges
echo "pushed badges branch."
