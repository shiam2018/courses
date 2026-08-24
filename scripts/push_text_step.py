#!/usr/bin/env python3
"""Create a single 'text' step-source under a lesson (position 1), from an
HTML file on disk. Used to fill the empty skeleton lessons of course 183103.

Usage: python3 scripts/push_text_step.py <lesson_id> <html_file> [position]
"""
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from stepik_create_module import api_post  # noqa: E402
from stepik_push import load_env, get_token  # noqa: E402


def main():
    if len(sys.argv) < 3:
        print("Usage: push_text_step.py <lesson_id> <html_file> [position]")
        sys.exit(1)
    lesson_id = int(sys.argv[1])
    html_file = sys.argv[2]
    position = int(sys.argv[3]) if len(sys.argv) > 3 else 1

    load_env()
    token = get_token()

    with open(html_file, encoding="utf-8") as f:
        html_text = f.read()

    resp = api_post("step-sources", token, "stepSource", {
        "lesson": lesson_id,
        "position": position,
        "block": {"name": "text", "text": html_text},
    })
    step = resp["step-sources"][0]
    print(f"lesson {lesson_id}: step-source {step['id']} created at position {position}")


if __name__ == "__main__":
    main()
