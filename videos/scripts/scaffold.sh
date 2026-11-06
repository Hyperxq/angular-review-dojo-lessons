#!/usr/bin/env bash
# Create a lesson video project from the rxjs pilot: shared kit, fonts, vendor, music, sfx and a SPEC titled for the topic.
# Usage: scaffold.sh <topic> "<Topic title>"
set -euo pipefail
cd "$(dirname "$0")/.."
topic="$1"; title="$2"
[ -e "$topic" ] && { echo "$topic exists"; exit 1; }
mkdir -p "$topic/compositions" "$topic/assets/vo"
cp rxjs/{AGENTS.md,CLAUDE.md,hyperframes.json} "$topic/"
cp -r rxjs/assets/{fonts,vendor,music,sfx} rxjs/assets/kit.css "$topic/assets/"
sed "s/\"name\": \"rxjs-film\"/\"name\": \"$topic-film\"/" rxjs/package.json > "$topic/package.json"
printf '{\n  "id": "%s",\n  "name": "%s",\n  "createdAt": "2026-11-06T00:00:00.000Z"\n}\n' "$topic" "$topic" > "$topic/meta.json"
sed -e "s/^# SPEC: RxJS, one day at the library desk/# SPEC: $title, one day at the library desk/" \
    -e 's/(`compositions\/c0.html` … `c8.html`)/(`compositions\/c0.html` … one file per chapter)/' \
    -e 's/about 8-10 min/length from the narration/' rxjs/SPEC.md > "$topic/SPEC.md"
echo "$topic scaffolded"
