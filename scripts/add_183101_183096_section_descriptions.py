#!/usr/bin/env python3
"""Add descriptions to sections of courses 183101 (free) and 183096 (paid)."""
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token, api_get, api_put  # noqa: E402

FREE_MANIFEST = os.path.join(os.path.dirname(__file__), "_183101_skeleton_created.json")
PAID_MANIFEST = os.path.join(os.path.dirname(__file__), "_183096_skeleton_created.json")

FREE_DESCRIPTIONS = {
    "Старт": "Знакомство с курсом и с тем, чем занимается продакт-маркетолог.",
    "Что такое продакт-маркетинг": "Роль продакт-маркетолога на стыке продукта и маркетинга, и подход Jobs to be Done для понимания аудитории.",
    "От идеи к MVP": "Этапы разработки продукта от идеи до релиза, и разница между MVP, Proof of Concept и product-market fit.",
    "Методологии и жизненный цикл": "Agile, Scrum и Kanban — как работают команды разработки, и через какие стадии жизни проходит продукт после запуска.",
    "Go-to-market стратегия": "Как сформулировать позиционирование и выбрать каналы для первого выхода продукта на рынок.",
    "Метрики и примеры": "Метрики, которыми измеряется успешный запуск, и разбор известных MVP — Uber, Airbnb, eBay, Spotify.",
    "Что дальше": "Итоги курса и следующий шаг.",
}

PAID_DESCRIPTIONS = {
    "Старт": "Знакомство с курсом и проектом, который вы соберёте за пять модулей.",
    "Позиционирование продукта": "Как найти реальное отличие продукта от конкурентов и сформулировать его в рабочее позиционирование.",
    "Go-to-market план": "Как выбрать каналы запуска под свою аудиторию и собрать их в план с чек-листом.",
    "Работа с командой": "Как давать обратную связь продуктовой команде и готовить команду продаж к запуску.",
    "Тестирование гипотез запуска": "Что тестировать при запуске — цену, сообщение или канал — и как читать первые данные.",
    "Отчёт и метрики": "Какие метрики нужны бизнесу и как показать результат запуска руководству.",
    "Что дальше": "Итоги курса и следующий шаг.",
}


def apply_descriptions(manifest_path, descriptions, token):
    manifest = json.load(open(manifest_path, encoding="utf-8"))
    for sec in manifest["sections"]:
        title = sec["title"]
        desc = descriptions[title]
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


def main():
    load_env()
    token = get_token()
    print("--- FREE 183101 ---")
    apply_descriptions(FREE_MANIFEST, FREE_DESCRIPTIONS, token)
    print("\n--- PAID 183096 ---")
    apply_descriptions(PAID_MANIFEST, PAID_DESCRIPTIONS, token)


if __name__ == "__main__":
    main()
