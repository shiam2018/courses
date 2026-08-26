#!/usr/bin/env python3
import json
import re
import sys

RULES = [
    (r"провер(ка|ьте) знан|тест\b|квиз", "approval"),
    (r"что будет|чему я научусь|что я получу|что узнаете|что потребуется|как пользоваться курсом|с чего начал", "todo-list"),
    (r"итоги курса|резюме курса|результаты курса|поздравля", "graduation-cap"),
    (r"задани|практик|создайте|зарегистрируйтесь|выберите|добавьте|заполните|настройте кампанию", "template"),
    (r"правил", "rules"),
    (r"определени|термин|глоссари", "document"),
    (r"расчет|расчёт|калькулятор", "calculator"),
    (r"алгоритм действий|порядок действий", "workflow"),
    (r"приложени[ея] для работы|инструмент", "services"),
    (r"фарминг|прокси|фингерпринт|траст|карма|биллинг|методы оплаты|роли и доступы|раскачк", "safe"),
    (r"ads manager|интерфейс|объекты|архитектура аккаунта|типы рекламных аккаунтов|личного аккаунта", "settings"),
    (r"таргетинг|аудитори|lookalike|пиксель", "binoculars"),
    (r"кампани|креатив|нейминг|дублирован|массовое редактирован|библиотек", "advertising"),
    (r"оптимизаци|roi|cpc|cpa|kpi|показател|отчет|отчёт", "statistics"),
    (r"товарк|игры\b|дропшиппинг|гемблинг|беттинг|нутр|свипстейк|лотере|интернет-магазин", "shop"),
    (r"spy|конкурент|изучите чужой опыт|офферы|партнерк|партнёрк", "search"),
    (r"нейросет|ai\b|искусственный интеллект", "assistant"),
    (r"портфолио", "briefcase"),
    (r"email|e-mail", "invite"),
    (r"веб-аналитик|аналитик", "combo-chart"),
    (r"копирайт|текст", "document"),
    (r"ноукод|no-?code|прототипировани", "puzzle"),
    (r"целевая аудитория", "address-book"),
    (r"кейс\b", "view-details"),
]


def pick_icon(title):
    t = title.lower()
    for pattern, icon in RULES:
        if re.search(pattern, t):
            return icon
    return "document"


def main():
    survey = json.load(open(sys.argv[1]))
    course_id = sys.argv[2]
    rows = survey[course_id]["rows"]
    broken = [r for r in rows if r["status"] != 200]
    mapping = [{"lesson_id": r["lesson_id"], "icon": pick_icon(r["title"])} for r in broken]
    out_path = sys.argv[3]
    json.dump(mapping, open(out_path, "w"), ensure_ascii=False, indent=2)
    print(f"course {course_id}: {len(broken)} broken lessons mapped -> {out_path}")
    for r, m in zip(broken, mapping):
        print(" ", r["title"][:50], "->", m["icon"])


if __name__ == "__main__":
    main()
