"""Write a lesson video's index.html from its timing.json, plus a placeholder for every scene file that does not exist yet.

Usage: python3 mount.py <video dir>   (reads <video dir>/assets/vo/timing.json)
"""

import json
import sys
from pathlib import Path

INDEX = """<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="assets/vendor/gsap.min.js"></script>
    <link rel="stylesheet" href="assets/kit.css" />
    <style>
      * {{ margin: 0; padding: 0; box-sizing: border-box; }}
      html, body {{ margin: 0; width: 1920px; height: 1080px; overflow: hidden; background: #f7f4ee; }}
      #root {{ width: 100%; height: 100%; position: relative; }}
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="{total}" data-width="1920" data-height="1080">
{hosts}
    </div>
    <script>
      window.__timelines = window.__timelines || {{}};
      window.__timelines["main"] = gsap.timeline({{ paused: true }});
    </script>
  </body>
</html>
"""

HOST = (
    '      <div id="{id}" class="clip" data-composition-id="{id}" data-composition-src="compositions/{id}.html" '
    'data-start="{start}" data-duration="{duration}" data-track-index="1" data-track-kind="graphics" '
    'data-width="1920" data-height="1080"></div>'
)

PLACEHOLDER = """<template>
  <link rel="stylesheet" href="assets/kit.css" />
  <style>#root {{ position: absolute; inset: 0; overflow: hidden; }}</style>
  <div id="root" data-composition-id="{id}" data-width="1920" data-height="1080">
    <div id="{id}-card" class="clip world" data-start="0" data-duration="{duration}"><div class="chapter-title">{id} placeholder</div></div>
  </div>
  <script>
    const tl = gsap.timeline({{ paused: true }});
    tl.fromTo("#{id}-card .chapter-title", {{ opacity: 0.99 }}, {{ opacity: 1, duration: 0.1 }}, 0);
    window.__timelines["{id}"] = tl;
  </script>
</template>
"""


def main() -> None:
    video = Path(sys.argv[1])
    timing = json.loads((video / "assets/vo/timing.json").read_text())
    (video / "compositions").mkdir(exist_ok=True)
    hosts = []
    for scene in timing["scenes"]:
        hosts.append(HOST.format(**scene))
        scene_file = video / "compositions" / f"{scene['id']}.html"
        if not scene_file.exists():
            scene_file.write_text(PLACEHOLDER.format(**scene))
    (video / "index.html").write_text(INDEX.format(total=timing["total"], hosts="\n".join(hosts)))
    print(f"{video.name}: {len(hosts)} scenes, {timing['total']} s")


if __name__ == "__main__":
    main()
