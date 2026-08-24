#!/usr/bin/env python3
"""Add descriptions to sections of courses 183075, 183083 (free) and 183082 (paid)."""
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token, api_get, api_put  # noqa: E402

SITE_MANIFEST = os.path.join(os.path.dirname(__file__), "_183075_skeleton_created.json")
APP_MANIFEST = os.path.join(os.path.dirname(__file__), "_183083_skeleton_created.json")
PAID_MANIFEST = os.path.join(os.path.dirname(__file__), "_183082_skeleton_created.json")

SITE_DESCRIPTIONS = {
    "Старт": "Знакомство с курсом и с тем, почему сайт можно собрать без кода.",
    "Конструктор или разработка с нуля": "Что такое конструктор сайтов, когда он подходит и как выбрать конкретный сервис под задачу.",
    "Планирование структуры": "Из каких страниц состоит простой сайт и как спланировать структуру до открытия конструктора.",
    "Шаблон и контент": "Как выбрать и адаптировать шаблон, и как написать текст и подобрать изображения, которые читают.",
    "Базовый SEO без кода": "Заголовки, метаописания, скорость загрузки и мобильная версия — всё, что можно настроить без кода.",
    "Публикация сайта": "Как подключить домен и что проверить перед публикацией.",
    "Что дальше": "Итоги курса и следующий шаг.",
}

APP_DESCRIPTIONS = {
    "Старт": "Знакомство с курсом и с тем, почему приложение можно собрать без кода.",
    "Конструктор приложений: как это работает": "Что такое no-code конструктор приложений и как выбрать конкретный сервис под задачу.",
    "Планирование экранов": "Из каких экранов состоит простое приложение и как спланировать переходы между ними.",
    "Интерфейс и данные": "Как собрать интерфейс из готовых блоков и подключить данные к спискам, карточкам и формам.",
    "Простая логика без кода": "Кнопки, переходы, условия и обратная связь пользователю без единой строчки кода.",
    "Публикация приложения": "Как протестировать приложение на телефоне и опубликовать его в сторе или как веб-версию.",
    "Что дальше": "Итоги курса и следующий шаг.",
}

PAID_DESCRIPTIONS = {
    "Старт": "Знакомство с курсом и проектом, который вы соберёте за пять модулей.",
    "От идеи к макету": "Как выбрать инструмент под задачу — сайт, приложение или оба — и спланировать экраны и путь пользователя.",
    "Интерфейс и логика": "Как собрать интерфейс из готовых блоков конструктора и добавить простую логику переходов и условий.",
    "Данные и интеграции": "Как подключить реальный источник данных и настроить формы, аккаунты и простую авторизацию.",
    "Тестирование и доработка": "Как протестировать продукт на реальных пользователях и избежать частых ошибок no-code проектов.",
    "Публикация и что дальше": "Как опубликовать сайт или приложение и что делать после публикации.",
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
    print("--- FREE 183075 (site) ---")
    apply_descriptions(SITE_MANIFEST, SITE_DESCRIPTIONS, token)
    print("\n--- FREE 183083 (app) ---")
    apply_descriptions(APP_MANIFEST, APP_DESCRIPTIONS, token)
    print("\n--- PAID 183082 ---")
    apply_descriptions(PAID_MANIFEST, PAID_DESCRIPTIONS, token)


if __name__ == "__main__":
    main()
