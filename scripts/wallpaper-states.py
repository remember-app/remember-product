"""Обои с сердцем по центру: по одному на каждое состояние.

    python3 scripts/wallpaper-states.py

Читает projects/mobile/assets/logo/logo-heart-*.png и пишет в
projects/mobile/assets/wallpaper/states/ файлы wallpaper-<N>-<состояние>.png
(2160x4680) и их уменьшенные копии (540x1170).
"""
import base64
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
MOBILE = HERE.parent / 'projects' / 'mobile' / 'assets'
LOGO = MOBILE / 'logo'
OUT = MOBILE / 'wallpaper' / 'states'

W, H = 2160, 4680
HEART = 1400            # сторона картинки сердца на полотне
STROKE_DARK = '#0B0B12'

TPL = '''<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}">
<defs>
<linearGradient id="wash" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#4B5BFF" stop-opacity="0.20"/>
<stop offset="0.5" stop-color="#4B5BFF" stop-opacity="0.04"/>
<stop offset="0.75" stop-color="#E4FF4F" stop-opacity="0.04"/>
<stop offset="1" stop-color="#E4FF4F" stop-opacity="0.14"/>
</linearGradient>
<radialGradient id="glow" cx="50%" cy="50%" r="50%">
<stop offset="0" stop-color="#16161F"/>
<stop offset="1" stop-color="#16161F" stop-opacity="0"/>
</radialGradient>
</defs>
<rect width="{w}" height="{h}" fill="{bg}"/>
<rect width="{w}" height="{h}" fill="url(#wash)"/>
<circle cx="{cx}" cy="{cy}" r="1500" fill="url(#glow)" opacity="0.55"/>
<image href="data:image/png;base64,{image}" x="{x}" y="{y}" width="{s}" height="{s}"/>
</svg>
'''


def main():
    hearts = sorted(LOGO.glob('logo-heart-*.png'))
    if not hearts:
        raise SystemExit('нет logo-heart-*.png в ' + str(LOGO))
    OUT.mkdir(parents=True, exist_ok=True)
    for heart in hearts:
        name = heart.stem.replace('logo-heart-', 'wallpaper-')
        svg = TPL.format(
            w=W, h=H, bg=STROKE_DARK,
            cx=W / 2, cy=H / 2,
            x=(W - HEART) / 2, y=(H - HEART) / 2, s=HEART,
            image=base64.b64encode(heart.read_bytes()).decode(),
        )
        src = OUT / (name + '.svg')
        src.write_text(svg)
        if not subprocess.run(['which', 'rsvg-convert'], capture_output=True).returncode == 0:
            print('rsvg-convert не найден: PNG не обновлён', file=sys.stderr)
            continue
        subprocess.run(['rsvg-convert', '-w', str(W), '-h', str(H), str(src), '-o', str(OUT / (name + '.png'))], check=True)
        subprocess.run(['rsvg-convert', '-w', str(W // 4), '-h', str(H // 4), str(src), '-o', str(OUT / (name + '-preview.png'))], check=True)
        src.unlink()
        print(name)


if __name__ == '__main__':
    main()
