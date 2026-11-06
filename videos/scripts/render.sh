#!/usr/bin/env bash
# Render each lesson video and normalize its loudness (SPEC "Sound": -16 LUFS, true peak under -1 dBTP).
# Usage: render.sh <video dir>...
set -euo pipefail
for dir in "$@"; do
  name=$(basename "$dir")
  mkdir -p "$dir/renders"
  (cd "$dir" && npx hyperframes render -o "renders/$name-lesson.mp4" --quality looks > renders/render.log 2>&1)
  ffmpeg -v error -y -i "$dir/renders/$name-lesson.mp4" -c:v copy -af loudnorm=I=-16:TP=-1.5:LRA=11 -ar 48000 -c:a aac -b:a 192k "$dir/renders/$name-norm.mp4"
  mv "$dir/renders/$name-norm.mp4" "$dir/renders/$name-lesson.mp4"
  (cd "$dir" && npx hyperframes audio "renders/$name-lesson.mp4" --json 2>/dev/null) |
    python3 -c 'import json,sys; r=sys.stdin.read(); d=json.loads(r[r.find("{"):]); l=d["items"][0]["loudness"]; print(sys.argv[1], d["items"][0]["duration"], "s", l["lufsIntegrated"], "LUFS", l["truePeakDb"], "dBTP", "clips", l["clipping"]["count"])' "$name"
done
