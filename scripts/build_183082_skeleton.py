#!/usr/bin/env python3
"""Build the section/lesson skeleton for course 183082 (PAID "Профессия
Zero-code разработчик" — tier-1 practice course, shared upsell for free
courses 183075 and 183083). One project-based structure, practical tasks
instead of quizzes.
"""
import json
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token  # noqa: E402

API = "https://stepik.org/api"
COURSE_ID = 183082

SKELETON = [
    ("Старт", [
        "Видео-приветствие",
        "Что будет на курсе и какой проект мы соберём",
    ]),
    ("От идеи к макету", [
        "Что будет в модуле «От идеи к макету»",
        "Как выбрать инструмент под задачу: сайт, приложение или оба",
        "Как спланировать экраны и путь пользователя",
        "Практика: собрать макет своего проекта",
    ]),
    ("Интерфейс и логика", [
        "Что будет в модуле «Интерфейс и логика»",
        "Как собрать интерфейс из готовых блоков конструктора",
        "Условия и переходы: простая логика без кода",
        "Практика: собрать интерфейс своего проекта",
    ]),
    ("Данные и интеграции", [
        "Что будет в модуле «Данные и интеграции»",
        "Как подключить реальный источник данных",
        "Формы, аккаунты и простая авторизация без кода",
        "Практика: подключить данные к своему проекту",
    ]),
    ("Тестирование и доработка", [
        "Что будет в модуле «Тестирование и доработка»",
        "Как протестировать продукт на реальных пользователях",
        "Частые ошибки в no-code проектах и как их избежать",
        "Практика: протестировать и доработать свой проект",
    ]),
    ("Публикация и что дальше", [
        "Что будет в модуле «Публикация и что дальше»",
        "Как опубликовать сайт или приложение",
        "Что делать после публикации: обратная связь и метрики",
        "Практика: опубликовать свой проект",
    ]),
    ("Что дальше", [
        "Итоги курса",
        "Что дальше",
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

    for _, lesson_titles in SKELETON:
        for title in lesson_titles:
            assert len(title) <= 64, f"Title too long ({len(title)}): {title!r}"

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

    out_path = os.path.join(os.path.dirname(__file__), "_183082_skeleton_created.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(created, f, ensure_ascii=False, indent=2)
    print("\nSaved manifest to", out_path)


if __name__ == "__main__":
    main()
