#!/usr/bin/env python3
"""Full verification pass for course 183076."""
import json
import os
import re
import sys
from html.parser import HTMLParser

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token, api_get  # noqa: E402

COURSE_ID = 183076
VOID = {"br", "img", "hr", "input", "meta", "link"}


class BalanceChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []

    def handle_starttag(self, tag, attrs):
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in VOID:
            return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append(f"mismatch at </{tag}>, stack={self.stack}")
        else:
            self.stack.pop()


def main():
    load_env()
    token = get_token()

    course = api_get(f"courses/{COURSE_ID}", token)["courses"][0]
    section_ids = course["sections"]
    print(f"Course {COURSE_ID}: {len(section_ids)} sections")

    all_lessons = []  # in real unit order
    for sid in section_ids:
        sec = api_get(f"sections/{sid}", token)["sections"][0]
        unit_ids = sec["units"]
        if not unit_ids:
            continue
        units = []
        for uid in unit_ids:
            units.append(api_get(f"units/{uid}", token)["units"][0])
        units.sort(key=lambda u: u["position"])
        for u in units:
            lesson_id = u["lesson"]
            all_lessons.append(lesson_id)

    print(f"Total lessons in order: {len(all_lessons)}")

    issues = []
    lesson_titles = {}

    for lid in all_lessons:
        lesson = api_get(f"lessons/{lid}", token)["lessons"][0]
        lesson_titles[lid] = lesson["title"]
        if lesson.get("is_draft", True):
            issues.append(f"lesson {lid} ({lesson['title']!r}) is_draft=True")

        step_ids = lesson["steps"]
        for step_id in step_ids:
            step = api_get(f"steps/{step_id}", token)["steps"][0]
            block = step["block"]
            if block.get("name") != "text":
                continue
            html = block.get("text", "")

            if not re.search(r'<img[^>]+src="https://stepik\.org/media/attachments', html):
                issues.append(f"lesson {lid} ({lesson['title']!r}): missing header cover image")

            checker = BalanceChecker()
            checker.feed(html)
            if checker.stack or checker.errors:
                issues.append(f"lesson {lid} ({lesson['title']!r}): HTML imbalance stack={checker.stack} errors={checker.errors}")

            if "example.com" in html:
                issues.append(f"lesson {lid}: contains example.com")

            text_only = re.sub(r"<[^>]+>", " ", html)
            word_count = len(text_only.split())
            if word_count < 60 and "Практика" not in lesson["title"] and lid not in (2546495,):
                issues.append(f"lesson {lid} ({lesson['title']!r}): suspiciously short, {word_count} words")

            # cheap-contrast phrase check
            for phrase in ["Одна и та же", "Один и тот же", "хотят перестать", "совершенно по-разному"]:
                if phrase in html:
                    issues.append(f"lesson {lid} ({lesson['title']!r}): cheap-contrast phrase {phrase!r}")

            # external links
            for m in re.finditer(r'href="(https?://[^"]+)"', html):
                url = m.group(1)
                if "stepik.org" not in url:
                    print(f"  external link in lesson {lid}: {url}")

    print("\n--- Real unit order ---")
    for i, lid in enumerate(all_lessons, 1):
        print(f"{i:2d}. {lid} — {lesson_titles[lid]!r}")

    print("\n--- Issues ---")
    if issues:
        for i in issues:
            print("  -", i)
    else:
        print("  none")


if __name__ == "__main__":
    main()
