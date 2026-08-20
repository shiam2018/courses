#!/usr/bin/env python3
"""Bundle the final rendered slides into one PDF per module, in lesson order."""
from PIL import Image

import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
BAZA_DIR = f"{ROOT}/scripts/slide-sources/baza-module/out"
INSTR_DIR = f"{ROOT}/scripts/slide-sources/instrumenty-module/out"
OUT_DIR = SCRIPT_DIR
# Regenerate the source PNGs first if `out/` is stale or missing:
#   node scripts/slide-sources/baza-module/run.mjs && node scripts/slide-sources/baza-module/pilot-samples.mjs && node scripts/slide-sources/baza-module/title-slide.mjs
#   node scripts/render_batch.mjs scripts/slide-sources/baza-module/out scripts/slide-sources/baza-module/out 1200 700
#   (same pattern for instrumenty-module, minus pilot-samples/title-slide)

BAZA_ORDER = [
    "modul-baza-title", "slide-02-soderzhanie-modulya",
    "sample-1-oflajn-i-onlajn", "slide-04-proekt-dlya-raboty", "slide-05-english-for-marketers", "slide-06-pervym-shagom",
    "slide-07-celevaya-auditoriya", "slide-08-segmentaciya", "slide-09-persona-portret", "slide-10-vyberite-biznes",
    "slide-11-persony-e4m", "slide-12-pervym-analizom",
    "slide-14-opishite-put-klienta", "slide-15-cjm-dlya-e4m", "sample-2-pozdravlyayu-s-osvoeniem-voronki",
    "slide-17-kanaly-privlecheniya", "slide-18-vyberite-kanaly", "slide-19-marketingovyj-miks", "slide-20-ponimaniem-kanalov",
    "slide-21-kpi", "slide-22-prognoz-kanalov", "sample-3-kak-rabotaet-voronka", "slide-24-raschetom-metrik",
    "slide-25-sostavlyaem-brif", "slide-26-brif-dlya-e4m", "slide-27-pervym-brifom",
    "slide-28-zavershenie-modulya", "slide-29-podgotovka-k-intervyu",
    "slide-30-zapomnili-ponyatiya",
]

INSTR_ORDER = [f"i{n:02d}-{name}" for n, name in [
    (1, "chto-umeet-ekspert"), (2, "sdelaj-to-znayu-chto"), (3, "primer-tz-dlya-e4m"), (4, "chto-my-uznali"),
    (5, "produmajte-strukturu"), (6, "strukturu-dlya-e4m"), (7, "lendingi-glavnoe"),
    (8, "analiz-konkurentov"), (9, "kak-stat-luchshe"), (10, "rynok-onlajn-kursov"), (11, "glavnoe-po-konkurentam"),
    (12, "kak-sdelat-kreativ"), (13, "sozdajte-svoi-kreativy"), (14, "pervye-kreo"), (15, "kreativ-zalog-uspeha"),
    (16, "veb-analitika"), (17, "znakomstvo-s-metrikoj"), (18, "ustanovka-yandeksmetriki"),
    (19, "crm-sistemy"), (20, "praktika-s-amocrm"), (21, "itogi-crm-sistem"),
    (22, "skvoznaya-analitika"), (23, "znakomstvo-s-roistat"), (24, "itogi-uroka-skvoznaya"),
    (25, "zhiv-li-email"), (26, "rassylka-sendpulse"), (27, "glavnoe-po-email"),
    (28, "otrabotka-negativa"), (29, "otzyvy-dlya-e4m"), (30, "glavnoe-pro-reputaciyu"),
    (31, "lending-na-tilda"), (32, "itogi-lending-tilda"), (33, "nastrojka-formy-i-crm"), (34, "itogi-vtoroj-chasti"),
    (35, "zavershenie-vtorogo-modulya"), (36, "kak-podgotovitsya-k-sobesedovaniyam"), (37, "proverka-znanij"),
]]


def build_pdf(names, src_dir, out_path, title):
    images = []
    for name in names:
        img = Image.open(f"{src_dir}/{name}.png").convert("RGB")
        images.append(img)
    images[0].save(out_path, save_all=True, append_images=images[1:])
    print(f"{title}: {len(images)} slides -> {out_path}")


build_pdf(BAZA_ORDER, BAZA_DIR, f"{OUT_DIR}/Modul-Baza.pdf", "База")
build_pdf(INSTR_ORDER, INSTR_DIR, f"{OUT_DIR}/Modul-Instrumenty.pdf", "Инструменты")
