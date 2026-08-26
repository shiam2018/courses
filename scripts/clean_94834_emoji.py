#!/usr/bin/env python3
"""Strip decorative marker emoji (checkmarks/crosses used as bullet markers,
not part of quoted example content) from course 94834's lesson text steps.
Also fixes the one em-dash found (in an image alt attribute) and the em-dash
in lesson 820023's title.
"""
import re
import sys
import os
import time

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token, api_get, api_put  # noqa: E402

LESSON_IDS = [
    820014, 1695826, 820015, 820016, 820017, 820019, 510131,
    820040, 820042, 820083, 1698187, 820085, 1750069, 1750110, 1743682, 1698188, 1692284, 1743683, 820087,
    820026, 820020, 820021, 820022, 820023, 820024, 1753253, 820029, 1744406, 1753500, 1753501, 820027,
    1712125, 1712126, 1712127, 1712128, 1713059, 1712131, 1712133, 1712132, 1749109, 1755511, 1755512, 1712384,
]

MARKER_EMOJI = re.compile(r'[✅✔❌🔄🔁☑📩]\s?')


def clean_text(text):
    return MARKER_EMOJI.sub('', text)


def main():
    load_env()
    token = get_token()

    changed_lessons = 0
    changed_steps = 0
    for lid in LESSON_IDS:
        lesson = api_get(f"lessons/{lid}", token)["lessons"][0]
        lesson_changed = False
        for stepid in lesson["steps"]:
            step = api_get(f"steps/{stepid}", token)["steps"][0]
            block = step["block"]
            if block.get("name") != "text":
                continue
            text = block.get("text", "")
            new_text = clean_text(text)
            new_text = new_text.replace(
                'alt="Персона — портрет вашего клиента"',
                'alt="Персона, портрет вашего клиента"',
            )
            if new_text != text:
                block["text"] = new_text
                api_put(f"step-sources/{stepid}", token, {"stepSource": {"block": block}})
                changed_steps += 1
                lesson_changed = True
                time.sleep(0.3)
        if lesson_changed:
            changed_lessons += 1
            print(f"lesson {lid} ({lesson['title']!r}): cleaned")

    # fix em-dash in lesson 820023 title
    lesson = api_get("lessons/820023", token)["lessons"][0]
    old_title = lesson["title"]
    new_title = old_title.replace(
        "Альтернативные источники — CPA, партнёрки, рефералки и офлайн",
        "Альтернативные источники: CPA, партнёрки, рефералки и офлайн",
    )
    if new_title != old_title:
        lesson["title"] = new_title
        api_put("lessons/820023", token, {"lesson": lesson})
        print(f"lesson 820023 title: {old_title!r} -> {new_title!r}")

    print(f"\nChanged {changed_steps} steps across {changed_lessons} lessons.")


if __name__ == "__main__":
    main()
