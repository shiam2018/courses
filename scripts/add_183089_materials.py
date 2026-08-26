#!/usr/bin/env python3
"""Create the 'Полезные материалы' lesson for course 183089 (Английский для
маркетолога: словарь и рабочие ситуации), attach it as the last unit in
section 745379 ('Что дальше'), and push its text content."""
import sys
sys.path.insert(0, "/Users/igorshenshin/Developer/Web/Stepik/courses/scripts")
from stepik_create_module import api_post  # noqa: E402
from stepik_push import load_env, get_token  # noqa: E402

SECTION_ID = 745379

TEXT = '''<h2>Полезные материалы</h2>
<p>Здесь собран рабочий комплект курса в одном месте: не конспект пройденных модулей, а термины, шаблоны и чек-листы, которых в самих уроках не было. Всё можно скопировать и использовать сразу в своей работе.</p>

<h2>1. Термины, которых не было в основных уроках</h2>
<table>
<thead><tr><th>Термин</th><th>Перевод</th><th>Пример в контексте</th></tr></thead>
<tbody>
<tr><td>North Star Metric</td><td>главная метрика продукта</td><td>Our North Star Metric is weekly active advertisers, not just sign-ups.</td></tr>
<tr><td>Cohort</td><td>когорта</td><td>We compare the March cohort to the April cohort to see if retention improved.</td></tr>
<tr><td>Statistical significance</td><td>статистическая значимость</td><td>The result isn't statistically significant yet, so we keep the test running.</td></tr>
<tr><td>Attribution window</td><td>окно атрибуции</td><td>We use a 7-day click attribution window for this channel.</td></tr>
<tr><td>First-touch / last-touch attribution</td><td>атрибуция по первому / последнему касанию</td><td>Last-touch attribution overvalues the final channel in a long funnel.</td></tr>
<tr><td>Incrementality</td><td>инкрементальность</td><td>The lift study showed low incrementality: most of these conversions would have happened anyway.</td></tr>
<tr><td>Frequency cap</td><td>ограничение частоты показов</td><td>We set a frequency cap of three impressions per user per day.</td></tr>
<tr><td>Look-alike audience</td><td>похожая аудитория</td><td>We built a look-alike audience based on our best-paying customers.</td></tr>
<tr><td>Ad fatigue / creative fatigue</td><td>усталость от креатива</td><td>CTR drops over time because of ad fatigue, not because the audience got worse.</td></tr>
<tr><td>Cannibalization</td><td>каннибализация</td><td>Brand search ads can cannibalize organic traffic that would have converted anyway.</td></tr>
<tr><td>Diminishing returns</td><td>эффект убывающей отдачи</td><td>Past a certain budget, extra spend shows diminishing returns.</td></tr>
<tr><td>Media mix modeling (MMM)</td><td>моделирование медиамикса</td><td>MMM helps estimate each channel's real impact without relying only on last-click data.</td></tr>
</tbody>
</table>
<p><strong>Как использовать:</strong> выберите 3-4 термина, которые точнее всего описывают текущую задачу на работе, и вставьте их в ближайшую переписку или заметку вместо привычного русского варианта.</p>

<h2>2. Готовые email-шаблоны</h2>
<p>Четыре письма на ситуации, которых не было в модуле про переписку: доступ, бюджет, эскалация и знакомство с новым контактом.</p>
<blockquote>
<p><strong>Запрос доступа к рекламному кабинету партнёра</strong><br>
Subject: Access request, [Platform] ad account<br>
Hi [Name], could you grant me access to the [Google Ads / Meta Business] account for [project]? My email for access is [email], and [admin/editor] level should be enough for what I need to do. Let me know if you need anything from my side to set this up. Thanks, [Your name]</p>
</blockquote>
<blockquote>
<p><strong>Обсуждение увеличения бюджета с агентством</strong><br>
Subject: Budget increase for [Campaign name]<br>
Hi [Name], based on the results so far, [metric, e.g. CPA is 20% below target], I'd like to discuss increasing the budget for [campaign] starting [date]. Could we set up a short call this week to go through the numbers and agree on next steps? Best, [Your name]</p>
</blockquote>
<blockquote>
<p><strong>Срочная эскалация технической проблемы</strong><br>
Subject: Urgent: [issue] is affecting [campaign/account]<br>
Hi [Name], we're seeing [specific problem, e.g. conversion tracking not firing] since [time], and it's affecting [impact, e.g. all reporting for this campaign]. Could someone take a look today? Happy to jump on a call if that's faster. Thanks for the quick help, [Your name]</p>
</blockquote>
<blockquote>
<p><strong>Знакомство с новым контактом у партнёра или агентства</strong><br>
Subject: Introduction, [Your company] and [Their company]<br>
Hi [Name], I'm [your role] at [company], and I'll be the main point of contact on our side for [project]. Looking forward to working together. Let me know if a short intro call this week works for you. Best, [Your name]</p>
</blockquote>

<h2>3. Чек-лист для звонка с зарубежным партнёром</h2>
<table>
<thead><tr><th>Этап звонка</th><th>Фраза на английском</th><th>Когда использовать</th></tr></thead>
<tbody>
<tr><td>Открыть звонок</td><td>Thanks everyone for joining, let's quickly run through today's agenda.</td><td>В первые 30 секунд, задаёт темп встрече.</td></tr>
<tr><td>Уточнить понимание</td><td>Just to make sure I've got this right, you're saying that...?</td><td>Когда формулировка партнёра неоднозначна, лучше уточнить сразу.</td></tr>
<tr><td>Попросить повторить</td><td>Sorry, could you say that again? The connection cut out for a second.</td><td>Нейтральная фраза, не выдаёт трудности с языком, даже если дело именно в этом.</td></tr>
<tr><td>Взять слово</td><td>Can I jump in here for a second?</td><td>Вежливо перебить в групповом обсуждении.</td></tr>
<tr><td>Управлять временем</td><td>We have about ten minutes left, let's make sure we cover [X].</td><td>Когда встреча уходит от темы, а важный пункт ещё не обсуждён.</td></tr>
<tr><td>Зафиксировать решение</td><td>So, to confirm: we're agreeing on [decision], and [name] will [action] by [date].</td><td>Перед закрытием звонка, чтобы у сторон было одинаковое понимание итогов.</td></tr>
<tr><td>Закрыть звонок</td><td>Great, thanks everyone. I'll send a follow-up email with the action items we discussed.</td><td>Всегда в конце, письмо фиксирует то, что проговорили устно.</td></tr>
</tbody>
</table>

<h2>4. LinkedIn-профиль и резюме на английском</h2>
<p><strong>Формула заголовка (headline):</strong> [Роль] | [специализация] | [ключевой результат или масштаб].</p>
<blockquote>
<p>Performance Marketing Manager | Paid Social & Search | Scaled ad spend from $10K to $80K per month while keeping CPA flat</p>
</blockquote>
<p><strong>Формула раздела About:</strong> кто вы сейчас и чем занимаетесь, один-два релевантных факта из прошлого опыта, что ищете дальше. Это та же структура «настоящее, прошлое, будущее» из урока про рассказ о себе, только в письменном виде.</p>
<p><strong>Формула пункта резюме:</strong> глагол действия в прошедшем времени + что сделали + метрика или результат. Слабые формулировки не дают интервьюеру ничего конкретного.</p>
<table>
<thead><tr><th>Слабый вариант</th><th>Сильный вариант</th></tr></thead>
<tbody>
<tr><td>Responsible for social media ads</td><td>Managed a $50K/month paid social budget across Meta and TikTok, reducing CPA by 18% over two quarters</td></tr>
<tr><td>Worked on email marketing</td><td>Built and launched a 5-email onboarding sequence that increased trial-to-paid conversion by 12%</td></tr>
<tr><td>Helped improve the website</td><td>Rewrote landing page copy and reduced bounce rate from 62% to 45% within one month</td></tr>
</tbody>
</table>

<h2>5. Апгрейд слабых слов: сильные альтернативы</h2>
<p>Слова из левой колонки не ошибки, но в резюме, объявлении или письме партнёру они звучат расплывчато. Правая колонка добавляет конкретики без изменения смысла.</p>
<table>
<thead><tr><th>Слабое слово</th><th>Сильная альтернатива</th><th>Пример</th></tr></thead>
<tbody>
<tr><td>very good results</td><td>strong / robust results</td><td>The campaign delivered strong results in the first month.</td></tr>
<tr><td>a big improvement</td><td>a significant / considerable improvement</td><td>Conversion rate showed a significant improvement after the redesign.</td></tr>
<tr><td>help improve</td><td>streamline / optimize</td><td>We streamlined the checkout flow to reduce drop-off.</td></tr>
<tr><td>use data</td><td>leverage data</td><td>We leverage first-party data to build look-alike audiences.</td></tr>
<tr><td>a lot of users</td><td>a substantial user base</td><td>The feature is already used by a substantial user base.</td></tr>
</tbody>
</table>

<h2>6. Шпаргалка для собеседования: одна страница на 10 минут перед звонком</h2>
<ul>
<li><strong>Present, past, future за 60-90 секунд:</strong> кто вы сейчас, один-два факта из прошлого опыта, что ищете. Не вся биография.</li>
<li><strong>STAR для вопроса про кейс:</strong> Situation, Task, Action, Result с цифрой в конце. Без цифры результат звучит неубедительно.</li>
<li><strong>Фразы для результатов:</strong> I increased [метрика] by [X]%. I reduced [метрика] from [X] to [Y]. This led to [итог].</li>
<li><strong>Свои вопросы работодателю:</strong> минимум два готовых вопроса про роль и команду, чтобы не изобретать их в моменте.</li>
<li><strong>Фраза про паузу на обдумывание оффера:</strong> Could I have some time to consider the offer?</li>
</ul>

<h2>Финальное задание</h2>
<p>Соберите свою рабочую HR-папку на английском: заголовок LinkedIn по формуле из пункта 4, один абзац About, один переписанный пункт резюме по формуле «глагол + результат + метрика», ответ на «Tell me about yourself» по структуре из пункта 6 и одно письмо из пункта 2, заполненное под реальную рабочую ситуацию. Это уже готовый набор материалов, который можно использовать на следующем собеседовании или в следующей переписке, а не просто пройденная тема курса.</p>
'''


def main():
    load_env()
    token = get_token()

    lesson_resp = api_post("lessons", token, "lesson", {
        "title": "Полезные материалы",
        "language": "ru",
    })
    lesson_id = lesson_resp["lessons"][0]["id"]
    print("lesson created:", lesson_id)

    step_resp = api_post("step-sources", token, "stepSource", {
        "lesson": lesson_id,
        "position": 1,
        "block": {"name": "text", "text": TEXT},
    })
    step_id = step_resp["step-sources"][0]["id"]
    print("step-source created:", step_id)

    unit_resp = api_post("units", token, "unit", {
        "section": SECTION_ID,
        "lesson": lesson_id,
        "position": 3,
    })
    unit_id = unit_resp["units"][0]["id"]
    print("unit created:", unit_id)

    import json
    json.dump(
        {"lesson_id": lesson_id, "step_id": step_id, "unit_id": unit_id},
        open("/Users/igorshenshin/Developer/Web/Stepik/courses/scripts/_183089_materials.json", "w"),
        indent=2,
    )


if __name__ == "__main__":
    main()
