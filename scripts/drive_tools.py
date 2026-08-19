#!/usr/bin/env python3
"""Работа с Google Drive/Sheets через сервисный аккаунт stepik-drive-tools."""
import sys
import os

from google.oauth2 import service_account
from googleapiclient.discovery import build

KEY_PATH = os.path.expanduser("~/Developer/Web/Stepik/courses/keys/stepik-drive-tools.json")
SCOPES = [
    "https://www.googleapis.com/auth/drive",
    "https://www.googleapis.com/auth/spreadsheets",
]
FOLDER_ID = "1-A7PZduPoJ0QqvFqRKw5zvTQXlKjWK8N"

def get_creds():
    return service_account.Credentials.from_service_account_file(KEY_PATH, scopes=SCOPES)

def drive_service():
    return build("drive", "v3", credentials=get_creds())

def sheets_service():
    return build("sheets", "v4", credentials=get_creds())

def list_folder():
    svc = drive_service()
    results = svc.files().list(
        q=f"'{FOLDER_ID}' in parents and trashed = false",
        fields="files(id, name, mimeType, webViewLink)",
        pageSize=200,
    ).execute()
    files = results.get("files", [])
    for f in files:
        print(f"{f['id']}\t{f['mimeType']}\t{f['name']}")
    return files

RENAMES = {
    "1Na-QxgqTDj4mDGMlywGpArFBi_txUBVfXQao6ckMTMI": "Шаблон SEO-стратегии (пустой)",
    "1-AkwGJu0_KrvG57mgNmWXTAFqIfMKpWhwJ1XzPJHccY": "Шаблон описания оффера для партнерской сети",
    "1MV3Vh0P4S3N7f4JfzWuXsTVymhS2zEZch-5irsJDG6o": "Пример ТЗ на SEO статью",
    "1_qbnLlraDMsiFYg-kkQ-YgBUgv8SKnCh73fWr47silM": "Шаблон ТЗ на SEO статью",
    "1lYoW8UXM1CSae3ojXlYrNOqElP4e16zfZVAS202gGZ8": "Должностная инструкция интернет-маркетолога",
    "15Sc6AiWqfFpgzDKYb_UnAltL4y0J_62mqZ3DBNtHqA8": "Гайд по креативам для таргета",
    "1argdignSALy3VgoX79GXJusPvVp1WnECBHsXGS7sfxQ": "Шаблон таблицы тестирования креативов",
    "12RlbIBgPzENp-Q0_CgJbYGRM3luV5iTcV7oE8dW71Ks": "Шаблон сравнение конкурентов и SWOT",
    "138kzZKjD--ieX-vr71OI5HMmXsmBBjKxfLC0xCz01uU": "Шаблон структуры лендинга",
    "1cjbUVMJjaxErEX_eNyVhP-1YNaJMxWe3NZBbmJouOP0": "Пример Технического задания (ТЗ) на разработку сайта",
    "1PDKDQqIRXuV_dw2Hw5xtm-FHqjVHjwvS8fjRnJxxQCU": "Шаблон Технического задания (ТЗ) на разработку сайта",
    "16UGw9_5yv9euwqqeN71c_tK7DXnF1iZ4nf8sZyWH_iE": "Шаблон брифа на создание сайта и его продвижение",
    "1qlaUYHBRfoPKkaECUvX-AHY11nIlhwcx-Yb0utVnnZE": "Шаблон мини-медиаплана",
    "1ZVIdDU9ASKU8FyAJdWwhcmhyCQ85nt0wrjyJcj9rwE4": "Шаблон изучения ЦА: описание, сегменты и персоны",
    "1_6ZNTBAQDg7Y0nChbcLTrnGG1nRwwDGyKeVMnr1sZlc": "Шаблон для выбора проекта: плюсы, минусы, задачи и аудитория",
    "1ODXnjlSyhAhpCUxJIBHznP9_ikBsXaBmGQsKw_XFD14": "Шаблон для контекстной рекламы Яндекс Директ",
    "1MExINlDus0J5sTQHAYbuukQ2n3J9YTAfqUb6LFrMLhM": "Шаблон контент-плана",
    "1SOEBM-cW66KZFo8baPahxN7VQ1i-7Mhc6EAc5Pfooi8": "Шаблон обработки отзывов",
    "1nMtphTY7vYkmwm5aXOQ05OjbfJm6tQnQBWWZfoIScNQ": "Сравнение форматов сайтов и приложений",
    "1IMXt7rc_IUKlnIbcXflZBDQVARGDylfxf6Ur4XejULM": "Шаблон маркетинговый микс",
    "1_9Xmn05JJw0rtQq9cQeLDVFoTJV7_8jTsnqNuIqfXk8": "Шаблон мини CJM",
    "19UD6d2ZWG7Ok49MHTP6mXCNOtf1mMQcYJ-4kBkqyzQk": "Шаблон SEO контент-плана",
    "1Kr3UGDeT-3Foqyw--tpLEGqwJasNDrMcB-ZvPg60KxI": "Шаблон ТЗ на SEO статью",
    "11hTb5uVFZlxChbj23WY4HWXVA-QpA2RZI8vK0C0Wz6c": "План SEO-статьи",
    "1hyjRLHcrA4lkEr5wap1S1FkgcVq5rfMRE4SXYd0v1UM": "Анализ сайтов конкурентов",
    "1KmJeBd4_wdY9fxRxr_6W8XVepX5YoHxiCn-5zTgiM08": "Шаблон SEO-семантики (пустой)",
}

def rename_files(rename_map):
    svc = drive_service()
    for file_id, new_name in rename_map.items():
        f = svc.files().get(fileId=file_id, fields="name").execute()
        old_name = f["name"]
        svc.files().update(fileId=file_id, body={"name": new_name}).execute()
        print(f"{old_name!r} -> {new_name!r}")

def fill_tracker(sheet_id):
    svc = sheets_service()
    svc.spreadsheets().batchUpdate(
        spreadsheetId=sheet_id,
        body={"requests": [{"updateSheetProperties": {
            "properties": {"sheetId": 0, "title": "Трекер"},
            "fields": "title",
        }}]},
    ).execute()

    header = [
        "Компания", "Вакансия", "Ссылка на вакансию", "Дата отклика",
        "Статус", "Контакт HR", "Дата собеседования", "Зарплатная вилка",
        "Комментарии / следующий шаг",
    ]
    statuses_note = [
        "Легенда статусов: Откликнулся / Просмотрено / Приглашение на интервью / "
        "Тестовое задание / Оффер / Отказ"
    ]
    svc.spreadsheets().values().update(
        spreadsheetId=sheet_id,
        range="Трекер!A1",
        valueInputOption="RAW",
        body={"values": [header]},
    ).execute()
    svc.spreadsheets().values().update(
        spreadsheetId=sheet_id,
        range="Трекер!A20",
        valueInputOption="RAW",
        body={"values": [statuses_note]},
    ).execute()

    requests = [
        {
            "repeatCell": {
                "range": {"sheetId": 0, "startRowIndex": 0, "endRowIndex": 1},
                "cell": {
                    "userEnteredFormat": {
                        "textFormat": {"bold": True},
                        "backgroundColor": {"red": 0.9, "green": 0.9, "blue": 0.9},
                    }
                },
                "fields": "userEnteredFormat(textFormat,backgroundColor)",
            }
        },
        {
            "updateSheetProperties": {
                "properties": {"sheetId": 0, "gridProperties": {"frozenRowCount": 1}},
                "fields": "gridProperties.frozenRowCount",
            }
        },
    ]
    svc.spreadsheets().batchUpdate(spreadsheetId=sheet_id, body={"requests": requests}).execute()

    link = f"https://docs.google.com/spreadsheets/d/{sheet_id}/edit"
    print(f"Filled tracker: {link}")
    return sheet_id, link

if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "list"
    if cmd == "list":
        list_folder()
    elif cmd == "rename":
        rename_files(RENAMES)
    elif cmd == "fill_tracker":
        fill_tracker(sys.argv[2])
    else:
        print(f"Unknown command: {cmd}")
        sys.exit(1)
