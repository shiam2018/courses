#!/usr/bin/env python3
"""One-off: build the section/lesson skeleton for course 297305 (free
"Маркетинговая аналитика: с нуля до первого отчёта" lead-magnet course).
Titles only — no step content yet. Mirrors build_183103_skeleton.py.
"""
import json
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token  # noqa: E402

API = "https://stepik.org/api"
COURSE_ID = 297305

SKELETON = [
    ("Старт", [
        "Видео-приветствие",
        "Что будет на курсе",
    ]),
    ("Основы аналитики", [
        "Что будет в модуле «Основы аналитики»",
        "Что такое аналитика и зачем она маркетологу",
        "Ключевые метрики: CTR, CPC, CPA, CR, ROI",
        "Проверка знаний: основы аналитики",
    ]),
    ("Инструменты аналитика", [
        "Что будет в модуле «Инструменты аналитика»",
        "Яндекс.Метрика: счётчик и цели",
        "Google Analytics 4: на что смотреть в первую очередь",
        "Excel и сводные таблицы: как свести цифры в отчёт",
        "Проверка знаний: инструменты аналитика",
    ]),
    ("Отчёты и метрики", [
        "Что будет в модуле «Отчёты и метрики»",
        "Как читать отчёт по трафику",
        "Атрибуция: почему разные модели показывают разную картину",
        "Визуализация: отчёт, который поймут с первого взгляда",
        "Проверка знаний: отчёты и метрики",
    ]),
    ("Инсайты и гипотезы", [
        "Что будет в модуле «Инсайты и гипотезы»",
        "Как искать инсайты в цифрах",
        "Как сформулировать проверяемую гипотезу",
        "Проверка знаний: инсайты и гипотезы",
    ]),
    ("Эксперименты", [
        "Что будет в модуле «Эксперименты»",
        "Что такое A/B-тест и когда он нужен",
        "Контрольная группа и типичные ошибки самообмана",
        "Как оценивать результат эксперимента",
        "Проверка знаний: эксперименты",
    ]),
    ("Что дальше", [
        "Итоги курса",
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

    out_path = os.path.join(os.path.dirname(__file__), "_297305_skeleton_created.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(created, f, ensure_ascii=False, indent=2)
    print("\nSaved manifest to", out_path)


if __name__ == "__main__":
    main()
