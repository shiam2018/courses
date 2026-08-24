#!/usr/bin/env python3
"""Create choice (multiple-choice quiz) step-sources under a lesson, from a
JSON file of questions. Position 1 is an optional intro text step (if
intro_html is given); questions fill positions after that.

questions.json shape:
[
  {"text": "<h2>Question?</h2>", "options": [
      {"text": "Option A", "correct": false},
      {"text": "Option B", "correct": true},
      {"text": "Option C", "correct": false},
      {"text": "Option D", "correct": false}
  ]},
  ...
]

Usage: python3 scripts/create_choice_steps.py <lesson_id> <questions_json> [intro_html_file]
"""
import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from stepik_create_module import api_post  # noqa: E402
from stepik_push import load_env, get_token  # noqa: E402


def main():
    if len(sys.argv) < 3:
        print("Usage: create_choice_steps.py <lesson_id> <questions_json> [intro_html_file]")
        sys.exit(1)
    lesson_id = int(sys.argv[1])
    questions_path = sys.argv[2]
    intro_html_file = sys.argv[3] if len(sys.argv) > 3 else None

    load_env()
    token = get_token()

    with open(questions_path, encoding="utf-8") as f:
        questions = json.load(f)

    position = 1
    if intro_html_file:
        with open(intro_html_file, encoding="utf-8") as f:
            intro_html = f.read()
        resp = api_post("step-sources", token, "stepSource", {
            "lesson": lesson_id,
            "position": position,
            "block": {"name": "text", "text": intro_html},
        })
        print(f"lesson {lesson_id}: intro text step {resp['step-sources'][0]['id']} at position {position}")
        position += 1

    for q in questions:
        options = q["options"]
        resp = api_post("step-sources", token, "stepSource", {
            "lesson": lesson_id,
            "position": position,
            "block": {
                "name": "choice",
                "text": q["text"],
                "source": {
                    "is_multiple_choice": False,
                    "is_always_correct": False,
                    "sample_size": len(options),
                    "preserve_order": False,
                    "is_html_enabled": True,
                    "is_options_feedback": False,
                    "options": [
                        {"is_correct": bool(o.get("correct")), "text": o["text"], "feedback": ""}
                        for o in options
                    ],
                },
            },
        })
        step = resp["step-sources"][0]
        print(f"lesson {lesson_id}: choice step {step['id']} at position {position}")
        position += 1


if __name__ == "__main__":
    main()
