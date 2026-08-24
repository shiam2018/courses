#!/usr/bin/env python3
"""One-off: build the section/lesson skeleton for course 183089 (free
"Английский для маркетолога: словарь и рабочие ситуации" course, standalone
with a soft cross-link to 183103 in the outro). Titles only — no step content
yet. Mirrors build_183094_skeleton.py.
"""
import json
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token  # noqa: E402

API = "https://stepik.org/api"
COURSE_ID = 183089

SKELETON = [
    ("Старт", [
        "Видео-приветствие",
        "Что будет на курсе",
    ]),
    ("Зачем маркетологу английский", [
        "Что будет в модуле «Зачем маркетологу английский»",
        "Восемь ситуаций, где английский нужен маркетологу каждый день",
        "Как английский влияет на карьеру и доход в маркетинге",
        "Проверка знаний: зачем маркетологу английский",
    ]),
    ("Словарь маркетолога: метрики и каналы", [
        "Что будет в модуле «Словарь маркетолога: метрики и каналы»",
        "Метрики и KPI: 20 терминов, которые нужны каждый день",
        "Каналы и форматы: словарь маркетингового микса",
        "Проверка знаний: словарь метрик и каналов",
    ]),
    ("Деловое общение: поддержка и команды", [
        "Что будет в модуле «Деловое общение»",
        "Переписка с поддержкой и партнёрами: готовые фразы",
        "Общение со смежными командами: продукт, разработка, продажи",
        "Проверка знаний: деловое общение",
    ]),
    ("Чтение: документация, пресса, конкуренты", [
        "Что будет в модуле «Чтение: документация, пресса, конкуренты»",
        "Как быстро читать техническую документацию на английском",
        "Чтение отраслевой прессы: с чего начать",
        "Анализ конкурентов на английском: сайты, приложения, питчи",
        "Проверка знаний: чтение на английском",
    ]),
    ("Ошибки в рекламе и на сайте", [
        "Что будет в модуле «Ошибки в рекламе и на сайте»",
        "Частые ошибки в рекламных текстах: ложные друзья и кальки",
        "Как проверить текст сайта на английском перед публикацией",
        "Проверка знаний: ошибки в рекламе и на сайте",
    ]),
    ("Собеседование на английском", [
        "Что будет в модуле «Собеседование на английском»",
        "Рассказ о себе и опыте на английском",
        "Ответы на вопросы про метрики и кейсы",
        "Вопросы работодателю и разговор об оффере",
        "Проверка знаний: собеседование на английском",
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

    out_path = os.path.join(os.path.dirname(__file__), "_183089_skeleton_created.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(created, f, ensure_ascii=False, indent=2)
    print("\nSaved manifest to", out_path)


if __name__ == "__main__":
    main()
