#!/usr/bin/env python3
"""Add descriptions to sections of courses 183076 (free) and 183084 (paid)."""
import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from stepik_push import load_env, get_token, api_get, api_put  # noqa: E402

FREE_MANIFEST = os.path.join(os.path.dirname(__file__), "_183076_skeleton_created.json")
PAID_MANIFEST = os.path.join(os.path.dirname(__file__), "_183084_skeleton_created.json")

FREE_DESCRIPTIONS = {
    "Старт": "Знакомство с курсом и с тем, зачем бизнесу email-маркетинг.",
    "Основы email-маркетинга": "Роль email в общей воронке маркетинга и то, как законно собирать базу подписчиков.",
    "Сегментация базы": "Зачем делить базу на сегменты и как меняются потребности подписчика на разных этапах жизненного цикла.",
    "Письма, которые читают": "Что делает тему письма такой, которую открывают, и как построить текст с призывом к действию, ведущим к клику.",
    "Автоматизация рассылок": "Welcome-серия для новых подписчиков и триггерные письма — брошенная корзина и реактивация неактивных.",
    "Метрики email-маркетинга": "Open rate и CTR для диагностики писем, отписки и доставляемость для здоровья всей рассылки.",
    "Что дальше": "Итоги курса и следующий шаг.",
}

PAID_DESCRIPTIONS = {
    "Старт": "Знакомство с курсом и рассылкой, которую вы соберёте за пять модулей.",
    "Сегментация и стратегия": "Как сегментировать базу под конкретную рассылку и собрать цель, частоту и сообщение в стратегию.",
    "Письмо, которое работает": "Как написать несколько вариантов темы и текст письма, реализующий стратегию рассылки.",
    "Автоматизация цепочки": "Как спроектировать триггерную цепочку писем с правильным таймингом и условием остановки.",
    "A/B-тест рассылки": "Что тестировать в письме — тему, время или содержание — и как читать результат без ошибок.",
    "Отчёт по рассылке": "Какая метрика связана с целью рассылки и как показать результат руководству.",
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
    print("--- FREE 183076 ---")
    apply_descriptions(FREE_MANIFEST, FREE_DESCRIPTIONS, token)
    print("\n--- PAID 183084 ---")
    apply_descriptions(PAID_MANIFEST, PAID_DESCRIPTIONS, token)


if __name__ == "__main__":
    main()
