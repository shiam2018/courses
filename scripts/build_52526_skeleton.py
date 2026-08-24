#!/usr/bin/env python3
"""One-off: rebuild the section/lesson skeleton for course 52526 (free
"Creative Production: креативы для перформанс-маркетинга"). The old
4-section/17-lesson skeleton was deleted (content archived at
/tmp/52526_full_content.json) — this replaces it with the standard 5-module
structure, CAREERSTART funnel into 94834. Mirrors build_183078_skeleton.py.
"""
import json
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token  # noqa: E402

API = "https://stepik.org/api"
COURSE_ID = 52526

SKELETON = [
    ("Старт", [
        "Видео-приветствие",
        "Что будет на курсе",
    ]),
    ("Основы креативного продакшена", [
        "Что будет в модуле «Основы креативного продакшена»",
        "Что такое creative production и роль дизайнера в закупке трафика",
        "Метрики креатива: показы, клики, CTR, конверсии, CVR",
        "Проверка знаний: основы креативного продакшена",
    ]),
    ("Дизайн и креатив", [
        "Что будет в модуле «Дизайн и креатив»",
        "Чем хороший дизайн отличается от хорошего креатива",
        "Что мотивирует пользователей кликать и покупать",
        "Проверка знаний: дизайн и креатив",
    ]),
    ("Честность в креативах", [
        "Что будет в модуле «Честность в креативах»",
        "Преувеличение против обмана: где проходит грань",
        "Почему копировать чужой бренд — плохая идея",
        "Проверка знаний: честность в креативах",
    ]),
    ("Форматы по категориям продукта", [
        "Что будет в модуле «Форматы по категориям продукта»",
        "Креативы для e-commerce: что работает на практике",
        "Креативы для приложений, обучения и услуг",
        "Проверка знаний: форматы по категориям продукта",
    ]),
    ("Тестирование креативов", [
        "Что будет в модуле «Тестирование креативов»",
        "Как тестировать несколько креативов одновременно",
        "Как читать результаты теста и делать следующий шаг",
        "Проверка знаний: тестирование креативов",
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

    out_path = os.path.join(os.path.dirname(__file__), "_52526_skeleton_created.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(created, f, ensure_ascii=False, indent=2)
    print("\nSaved manifest to", out_path)


if __name__ == "__main__":
    main()
