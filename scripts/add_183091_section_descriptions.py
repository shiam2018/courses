#!/usr/bin/env python3
"""Add descriptions to the 7 sections of course 183091."""
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token, api_get, api_put  # noqa: E402

MANIFEST = os.path.join(os.path.dirname(__file__), "_183091_skeleton_created.json")

DESCRIPTIONS = {
    "Старт": "Знакомство с курсом и проектом, который вы соберёте за пять модулей.",
    "От брифа к стратегии": "Как разобрать входящий бриф и превратить его в креативную стратегию с несколькими содержательно разными концепциями для теста.",
    "Организация продакшена": "Как ставить задачу дизайнеру или видеографу и планировать сроки так, чтобы не срывать дедлайны команды.",
    "Тестирование концепций": "Как спланировать честный тест нескольких концепций и превратить собранные данные в конкретное решение.",
    "Работа с командой": "Как давать обратную связь, которая не демотивирует, и выбирать между штатной командой и фрилансерами под задачу.",
    "Отчёт и защита результата": "Как показать бизнесу эффективность креативной работы и что отвечать, если результат оказался ниже ожиданий.",
    "Что дальше": "Итоги курса и следующий шаг.",
}


def main():
    load_env()
    token = get_token()
    manifest = json.load(open(MANIFEST, encoding="utf-8"))

    for sec in manifest["sections"]:
        title = sec["title"]
        desc = DESCRIPTIONS[title]
        section_id = sec["id"]

        data = api_get(f"sections/{section_id}", token)
        section = data["sections"][0]
        section["description"] = desc

        api_put(f"sections/{section_id}", token, {"section": section})
        time.sleep(1)

        check = api_get(f"sections/{section_id}", token)
        got = check["sections"][0]["description"]
        status = "OK" if got == desc else "MISMATCH"
        print(f"[{status}] section {section_id} {title!r}: {got!r}")


if __name__ == "__main__":
    main()
