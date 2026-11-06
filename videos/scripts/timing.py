"""Scene clock for a lesson video (see videos/<topic>/SPEC.md, "Scene clock").

Usage: python3 timing.py <NARRATION.md> <durations.json> <LESSON.md> > timing.json
"""

import json
import re
import sys

CARD = 3.0
GAP = 0.35
PAUSE = 3.5
CH0_TAIL = 1.0


def clip_ids(narration: str) -> list[str]:
    return re.findall(r"^- (c\d+-[a-z0-9]+) \|", narration, re.M)


def review_questions(lesson: str) -> dict[int, list[str]]:
    out: dict[int, list[str]] = {}
    for m in re.finditer(r"^## Chapter (\d+):.*?(?=^## |\Z)", lesson, re.M | re.S):
        q = re.search(r"^### Review questions\n\n(.*?)(?=\n\n\*\*|\n\n#|\Z)", m.group(0), re.M | re.S)
        if q:
            items = re.split(r"^- ", q.group(1), flags=re.M)
            out[int(m.group(1))] = [" ".join(i.split()) for i in items if i.strip()]
    return out


def main() -> None:
    narration, durations, lesson = (open(p, encoding="utf-8").read() for p in sys.argv[1:4])
    dur = json.loads(durations)
    questions = review_questions(lesson)
    chapters: dict[int, list[str]] = {}
    for cid in clip_ids(narration):
        chapters.setdefault(int(cid[1:].split("-")[0]), []).append(cid)

    scenes, offset = [], 0.0
    for n in sorted(chapters):
        t, clips, cards = CARD, [], {"chapter": {"start": 0.0, "duration": CARD}}
        for cid in chapters[n]:
            if cid.endswith("-end"):
                words = sum(len(q.split()) for q in questions.get(n, []))
                hold = round(max(8.0, 2.0 + 0.3 * words), 2)
                cards["questions"] = {"start": round(t, 2), "duration": hold, "items": questions.get(n, [])}
                clips.append({"id": cid, "start": round(t, 2), "duration": dur[cid]})
                t += hold
                cards["pause"] = {"start": round(t, 2), "duration": PAUSE}
                t += PAUSE + GAP
            else:
                clips.append({"id": cid, "start": round(t, 2), "duration": dur[cid]})
                t += dur[cid] + GAP
        end = t - GAP + (CH0_TAIL if "questions" not in cards else 0.0)
        if n == max(chapters):
            end = max(end, t - GAP + 1.0)
        scenes.append({"id": f"c{n}", "start": round(offset, 2), "duration": round(end, 2), "clips": clips, "cards": cards})
        offset += end
    json.dump({"total": round(offset, 2), "scenes": scenes}, sys.stdout, indent=2)


if __name__ == "__main__":
    main()
