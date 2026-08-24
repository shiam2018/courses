#!/usr/bin/env python3
"""One-off: build the section/lesson skeleton for course 94836 (free
"База интернет-маркетинга" lead-magnet course). Titles only — no step
content yet. Mirrors build_183103_skeleton.py / build_297305_skeleton.py.
"""
import json
import os
import sys
import urllib.request

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token  # noqa: E402

API = "https://stepik.org/api"
COURSE_ID = 94836

SKELETON = [
    ("Старт", [
        "Видео-приветствие",
        "Что будет на курсе",
    ]),
    ("Как устроен интернет-маркетинг", [
        "Что будет в модуле «Как устроен интернет-маркетинг»",
        "Что такое интернет-маркетинг и чем он отличается от офлайна",
        "Целевая аудитория и путь клиента",
        "Проверка знаний: как устроен интернет-маркетинг",
    ]),
    ("Карта каналов", [
        "Что будет в модуле «Карта каналов»",
        "Платные, собственные и заслуженные каналы",
        "SEO: трафик, за который платят временем, а не деньгами",
        "SMM и таргетированная реклама: работа с холодной аудиторией",
        "Контекстная реклама: реклама для тех, кто уже ищет",
        "Проверка знаний: карта каналов",
    ]),
    ("Email-маркетинг и репутация", [
        "Что будет в модуле «Email-маркетинг и репутация»",
        "Email-маркетинг: как возвращать клиентов, а не только привлекать",
        "Репутация и digital PR: что говорят о вас без спроса",
        "Проверка знаний: email-маркетинг и репутация",
    ]),
    ("Метрики: как понять, что маркетинг работает", [
        "Что будет в модуле «Метрики»",
        "Метрики воронки: от показов до повторной покупки",
        "Реальный пример: где на самом деле ваша аудитория",
        "Проверка знаний: метрики",
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

    out_path = os.path.join(os.path.dirname(__file__), "_94836_skeleton_created.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(created, f, ensure_ascii=False, indent=2)
    print("\nSaved manifest to", out_path)


if __name__ == "__main__":
    main()
