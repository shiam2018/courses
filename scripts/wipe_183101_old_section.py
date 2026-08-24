#!/usr/bin/env python3
"""Delete the old 'Разработка' section (and its 11 lessons) from course
183101. Content was already archived to /tmp/183101_full_content.json.
DELETE on a lesson auto-cleans its unit; DELETE on a section removes it.
"""
import json
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token, api_get  # noqa: E402

API = "https://stepik.org/api"
COURSE_ID = 183101
OLD_SECTION_ID = 460476


def api_delete(path, token):
    req = urllib.request.Request(f"{API}/{path}", method="DELETE")
    req.add_header("Authorization", f"Bearer {token}")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.status


def main():
    load_env()
    token = get_token()

    sec = api_get(f"sections/{OLD_SECTION_ID}", token)["sections"][0]
    unit_ids = sec["units"]
    lesson_ids = []
    for uid in unit_ids:
        u = api_get(f"units/{uid}", token)["units"][0]
        lesson_ids.append(u["lesson"])

    print(f"Deleting {len(lesson_ids)} lessons: {lesson_ids}")
    for lid in lesson_ids:
        status = api_delete(f"lessons/{lid}", token)
        print(f"  lesson {lid} -> {status}")

    status = api_delete(f"sections/{OLD_SECTION_ID}", token)
    print(f"section {OLD_SECTION_ID} -> {status}")

    course = api_get(f"courses/{COURSE_ID}", token)["courses"][0]
    print("course.sections now:", course["sections"])


if __name__ == "__main__":
    main()
