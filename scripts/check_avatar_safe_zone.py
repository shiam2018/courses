#!/usr/bin/env python3
"""Check that no slide content falls into the bottom-right avatar zone.

Video slides reserve a bottom-right square for the HeyGen avatar. Content
there gets covered at montage time, and spotting it by eye across dozens of
slides is unreliable, so this samples the zone and fails on any pixel that
differs from the slide's own background.

Usage: python3 check_avatar_safe_zone.py <png_dir> [safe_w] [safe_h]
Sizes are in slide units (1600x900 design space), scaled to the real PNG.
"""
import os
import sys

from PIL import Image

DESIGN_W, DESIGN_H = 1600, 900
TOLERANCE = 18  # per-channel; anti-aliasing against the paper background


def check(png_path, safe_w, safe_h):
    im = Image.open(png_path).convert("RGB")
    w, h = im.size
    sx, sy = w / DESIGN_W, h / DESIGN_H
    zone_w, zone_h = int(safe_w * sx), int(safe_h * sy)
    x0, y0 = w - zone_w, h - zone_h

    # Background sampled just left of the zone, at the same height: for a
    # gradient slide this is the closest honest reference we have.
    bg = im.getpixel((max(0, x0 - int(40 * sx)), min(h - 1, y0 + zone_h // 2)))

    offenders = 0
    step = max(1, int(4 * sx))
    for y in range(y0, h, step):
        for x in range(x0, w, step):
            px = im.getpixel((x, y))
            if any(abs(px[c] - bg[c]) > TOLERANCE for c in range(3)):
                offenders += 1
    total = len(range(y0, h, step)) * len(range(x0, w, step))
    return offenders, total, bg


def main():
    if len(sys.argv) < 2:
        print(__doc__)
        sys.exit(1)
    png_dir = sys.argv[1]
    safe_w = int(sys.argv[2]) if len(sys.argv) > 2 else 420
    safe_h = int(sys.argv[3]) if len(sys.argv) > 3 else 420

    bad = []
    for name in sorted(os.listdir(png_dir)):
        if not name.endswith(".png"):
            continue
        path = os.path.join(png_dir, name)
        offenders, total, bg = check(path, safe_w, safe_h)
        pct = 100.0 * offenders / total if total else 0
        status = "ok" if pct < 0.5 else "COLLISION"
        if pct >= 0.5:
            bad.append((name, pct))
        print(f"{status:10} {name:26} {pct:5.1f}% of avatar zone is content  (bg {bg})")

    print()
    if bad:
        print(f"{len(bad)} slide(s) place content under the avatar:")
        for name, pct in bad:
            print(f"  {name}  ({pct:.1f}%)")
        sys.exit(1)
    print("All slides keep the avatar zone clear.")


if __name__ == "__main__":
    main()
