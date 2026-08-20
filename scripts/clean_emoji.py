#!/usr/bin/env python3
"""Remove decorative emoji from course lesson text, keeping:
- arrows (semantically meaningful flow indicators: -> Файл -> Создать копию etc.)
- check/cross marks (correct/incorrect indicators)
- emoji inside <blockquote> (real quoted example posts)
- emoji inside a section following a "Пример поста/письма/объявления/..." heading,
  up to the next heading (real demonstrated marketing copy)
"""
import glob
import json
import re
import sys
import unicodedata

EMOJI_RUN = re.compile(
    r'[\U0001F300-\U0001FAFF\U00002600-\U000027BF\U00002B00-\U00002BFF'
    r'\U0001F1E6-\U0001F1FF\U0000FE0F\U0000200D]+',
    flags=re.UNICODE,
)
KEEP_CODES = {0x2705, 0x274C, 0x2713, 0x2714, 0x2717, 0x2716, 0x2611, 0x2612}

HEADING_RE = re.compile(r'<h[1-4]\b[^>]*>.*?</h[1-4]>', re.IGNORECASE | re.DOTALL)
EXAMPLE_HEADING_RE = re.compile(
    r'пример\s+(поста|письма|креатива|объявления|сообщения|рассылки)'
    r'|текст\s+(письма|объявления|поста)|тема\s+письма',
    re.IGNORECASE,
)
BLOCKQUOTE_RE = re.compile(r'<blockquote\b.*?</blockquote>', re.IGNORECASE | re.DOTALL)


def should_keep_run(run_text):
    core = run_text.replace('️', '').replace('‍', '')
    if len(core) == 1 and ord(core) in KEEP_CODES:
        return True
    for ch in core:
        try:
            if 'ARROW' in unicodedata.name(ch):
                return True
        except ValueError:
            pass
    return False


def strip_decorative_emoji(text):
    PLACEHOLDER = ''

    def repl(m):
        return m.group(0) if should_keep_run(m.group(0)) else PLACEHOLDER

    text = EMOJI_RUN.sub(repl, text)
    text = re.sub(r'\s*' + PLACEHOLDER + r'\s*', ' ', text)
    text = re.sub(r'[ \t]{2,}', ' ', text)
    tag_names = r'h1|h2|h3|h4|p|li|strong|em|a[^>]*|blockquote|td|th'
    text = re.sub(r'(<(?:' + tag_names + r')>) +', r'\1', text)
    text = re.sub(r' +(</(?:h1|h2|h3|h4|p|li|strong|em|a|blockquote|td|th)>)', r'\1', text)
    return text


def find_protected_ranges(text):
    ranges = []
    for m in BLOCKQUOTE_RE.finditer(text):
        ranges.append((m.start(), m.end()))

    headings = list(HEADING_RE.finditer(text))
    for i, h in enumerate(headings):
        if EXAMPLE_HEADING_RE.search(h.group(0)):
            start = h.end()  # protect body AFTER the heading, not the heading itself
            end = headings[i + 1].start() if i + 1 < len(headings) else len(text)
            ranges.append((start, end))
    ranges.sort()
    merged = []
    for s, e in ranges:
        if merged and s <= merged[-1][1]:
            merged[-1] = (merged[-1][0], max(merged[-1][1], e))
        else:
            merged.append((s, e))
    return merged


def process(text):
    protected = find_protected_ranges(text)
    out = []
    pos = 0
    for s, e in protected:
        out.append(strip_decorative_emoji(text[pos:s]))
        out.append(text[s:e])  # untouched
        pos = e
    out.append(strip_decorative_emoji(text[pos:]))
    return ''.join(out)


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
    if dry_run:
        for f in changed_files[:5]:
            print(' ', f)


if __name__ == '__main__':
    main()
