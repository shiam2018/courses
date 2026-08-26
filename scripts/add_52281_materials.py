#!/usr/bin/env python3
"""Create the 'Полезные материалы' lesson for course 52281 (Подготовка к
арбитражу трафика в Meta*), attach it as the last unit in section 79206
('Пройдите сертификацию'), and push its text content."""
import sys
import os
import json

sys.path.insert(0, "/Users/igorshenshin/Developer/Web/Stepik/courses/scripts")
from stepik_create_module import api_post  # noqa: E402
from stepik_push import load_env, get_token  # noqa: E402

SECTION_ID = 79206
POSITION = 4  # after units 184243, 186733, 184395

TEXT_PATH = "/private/tmp/claude-501/-Users-igorshenshin-Developer-Web-cleanor-web/6b1de5f7-c699-4ed1-8d86-c94905cdfb1f/scratchpad/materials_52281_text.html"


def main():
    load_env()
    token = get_token()

    with open(TEXT_PATH, encoding="utf-8") as f:
        text = f.read()

    assert text.count("—") == 0, "em dash found in content"

    lesson_resp = api_post("lessons", token, "lesson", {
        "title": "Полезные материалы",
        "language": "ru",
    })
    lesson_id = lesson_resp["lessons"][0]["id"]
    print("lesson created:", lesson_id)

    step_resp = api_post("step-sources", token, "stepSource", {
        "lesson": lesson_id,
        "position": 1,
        "block": {"name": "text", "text": text},
    })
    step_id = step_resp["step-sources"][0]["id"]
    print("step-source created:", step_id)

    unit_resp = api_post("units", token, "unit", {
        "section": SECTION_ID,
        "lesson": lesson_id,
        "position": POSITION,
    })
    unit_id = unit_resp["units"][0]["id"]
    print("unit created:", unit_id)

    json.dump(
        {"lesson_id": lesson_id, "step_id": step_id, "unit_id": unit_id},
        open("/Users/igorshenshin/Developer/Web/Stepik/courses/scripts/_52281_materials.json", "w"),
        indent=2,
    )


if __name__ == "__main__":
    main()
