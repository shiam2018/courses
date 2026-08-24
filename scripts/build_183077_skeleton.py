#!/usr/bin/env python3
"""One-off: build the section/lesson skeleton for course 183077 (PAID
"Аналитика для маркетолога: дашборд и отчёт для решения" — first tier-1
practice course, built on top of free courses 297305/183094). One
project-based structure, practical tasks instead of quizzes. Mirrors
build_183100_skeleton.py's mechanics.
"""
import json
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token  # noqa: E402

API = "https://stepik.org/api"
COURSE_ID = 183077

SKELETON = [
    ("Старт", [
        "Видео-приветствие",
        "Что будет на курсе и какой проект мы соберём",
    ]),
    ("От вопроса бизнеса к метрикам", [
        "Что будет в модуле «От вопроса бизнеса к метрикам»",
        "Реальный вопрос: куда делся трафик на /tools",
        "От вопроса к списку метрик: что именно измерять",
        "Практика: сформулировать метрики для своего вопроса",
    ]),
    ("Сбор и очистка данных", [
        "Что будет в модуле «Сбор и очистка данных»",
        "Расширенный датасет: несколько каналов и периодов",
        "Частые проблемы реальных данных и как их чинить",
        "Практика: собрать данные в единую таблицу",
    ]),
    ("Дашборд", [
        "Что будет в модуле «Дашборд»",
        "Как выбрать, что выносить на дашборд, а что нет",
        "Сборка дашборда: от таблицы к наглядному виду",
        "Практика: собрать дашборд по своим данным",
    ]),
    ("Отчёт с рекомендацией", [
        "Что будет в модуле «Отчёт с рекомендацией»",
        "Структура отчёта, который читают до конца",
        "Как сформулировать рекомендацию с конкретной цифрой",
        "Практика: написать отчёт по своему дашборду",
    ]),
    ("Защита решения", [
        "Что будет в модуле «Защита решения»",
        "Вопросы, которые задают, когда не верят графику",
        "Как отвечать на возражения, не теряя решения",
        "Практика: подготовить защиту своего отчёта",
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

    out_path = os.path.join(os.path.dirname(__file__), "_183077_skeleton_created.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(created, f, ensure_ascii=False, indent=2)
    print("\nSaved manifest to", out_path)


if __name__ == "__main__":
    main()
