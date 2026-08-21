#!/usr/bin/env python3
"""Remove the trailing "(Wise)" brand suffix from template/resource link text
across all lesson content (e.g. "Шаблон брифа в Google Sheets (Wise)" ->
"Шаблон брифа в Google Sheets"). Always appears right before a closing </a>,
preceded by either a literal space or an &nbsp; entity — never mid-sentence.
"""
import glob
import json
import re
import sys

WISE_RE = re.compile(r'(?:&nbsp;|\s)\(Wise\)')


def process(text):
    return WISE_RE.sub('', text)


def main():
    dry_run = '--apply' not in sys.argv
    files = sorted(glob.glob('stepik-sync/94834/raw/**/*_text.html', recursive=True))
    changed_files = []
    for f in files:
        original = open(f, encoding='utf-8').read()
        cleaned = process(original)
        if cleaned != original:
            changed_files.append(f)
            if not dry_run:
                with open(f, 'w', encoding='utf-8') as fh:
                    fh.write(cleaned)
                json_path = f[:-5] + '.json'
                with open(json_path, encoding='utf-8') as fh:
                    step_data = json.load(fh)
                step_data['block']['text'] = process(step_data['block']['text'])
                with open(json_path, 'w', encoding='utf-8') as fh:
                    json.dump(step_data, fh, ensure_ascii=False, indent=2)
                    fh.write('\n')
    print(f"{'[dry-run] ' if dry_run else ''}{len(changed_files)} files changed")
    for f in changed_files:
        print(' ', f)


if __name__ == '__main__':
    main()
