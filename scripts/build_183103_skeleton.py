#!/usr/bin/env python3
"""One-off: build the section/lesson skeleton for course 183103 (free
"Собеседование в маркетинге" lead-magnet course). Titles only — no step
content yet. Based on the interview-related lessons already proven out in
courses 94834 (Работа module) and 183104 (Работа module, more granular
three-stage interview breakdown + "Работа с отказами").
"""
import json
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token  # noqa: E402

API = "https://stepik.org/api"
COURSE_ID = 183103

SKELETON = [
    ("Старт", [
        "Видео-приветствие",
        "Что будет на курсе",
    ]),
    ("Портрет кандидата", [
        "Что будет в модуле «Портрет кандидата»",
        "Как рекрутер и руководитель выбирают кандидата",
        "Сформируйте свой портрет соискателя",
        "Проверка знаний: портрет кандидата",
    ]),
    ("Поиск работы", [
        "Что будет в модуле «Поиск работы»",
        "Резюме, которое приглашают на собеседование",
        "Сопроводительное письмо, которое дочитывают до конца",
        "Где искать вакансии, если работа не находит вас сама",
        "Проверка знаний: поиск работы",
    ]),
    ("Собеседование и тестовое задание", [
        "Что будет в модуле «Собеседование»",
        "Скрининг с HR: первое впечатление",
        "Техническое собеседование: что проверяют",
        "Встреча с нанимающим менеджером и разговор о зарплате",
        "Тестовое задание: как не провалить единственный шанс",
        "Проверка знаний: собеседование",
    ]),
    ("Что дальше", [
        "Работа с отказами: как не терять мотивацию",
        "Резюме курса",
        "Продолжите обучение",
    ]),
]


def api_post(path, token, wrapper_key, body):
    payload = json.dumps({wrapper_key: body}).encode("utf-8")
    req = urllib.request.Request(f"{API}/{path}", data=payload, method="POST")
    req.add_header("Authorization", f"Bearer {token}")
    req.add_header("Content-Type", "application/json")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.load(resp)


def main():
    load_env()
    token = get_token()

    created = {"sections": []}

    for sec_pos, (section_title, lesson_titles) in enumerate(SKELETON, start=1):
        section_resp = api_post("sections", token, "section", {
            "course": COURSE_ID,
            "title": section_title,
            "position": sec_pos,
            "units": [],
        })
        section = section_resp["sections"][0]
        section_id = section["id"]
        print(f"[{sec_pos}] section {section_id}: {section_title!r}")

        section_record = {"id": section_id, "title": section_title, "lessons": []}

        for lesson_pos, lesson_title in enumerate(lesson_titles, start=1):
            lesson_resp = api_post("lessons", token, "lesson", {
                "title": lesson_title,
                "language": "ru",
                "steps": [],
            })
            lesson = lesson_resp["lessons"][0]
            lesson_id = lesson["id"]

            unit_resp = api_post("units", token, "unit", {
                "section": section_id,
                "lesson": lesson_id,
                "position": lesson_pos,
            })
            unit = unit_resp["units"][0]

            print(f"    [{lesson_pos}] lesson {lesson_id} / unit {unit['id']}: {lesson_title!r}")
            section_record["lessons"].append({
                "id": lesson_id, "unit_id": unit["id"], "title": lesson_title,
            })

        created["sections"].append(section_record)

    out_path = os.path.join(os.path.dirname(__file__), "_183103_skeleton_created.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(created, f, ensure_ascii=False, indent=2)
    print("\nSaved manifest to", out_path)


if __name__ == "__main__":
    main()
