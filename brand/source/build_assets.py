"""Silong — final brand asset masters (Concept B, The Falling Rain).

Writes outlined SVG masters to <out>/svg. Usage: python final.py <fonts-dir> <out-dir>
"""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

FONTS, OUT = sys.argv[1], sys.argv[2]
SVG = os.path.join(OUT, "svg")
os.makedirs(SVG, exist_ok=True)

MIDNIGHT, RAIN, MIST, NEON, PAPER = "#151D25", "#263640", "#506D76", "#8CC3C7", "#D6D5CE"

def r(v):
    return ("%.2f" % v).rstrip("0").rstrip(".")

def fmt(d):
    out, num = [], ""
    for ch in d + " ":
        if ch in "0123456789.-" and not (ch == "-" and num):
            num += ch
        else:
            if num:
                out.append(r(float(num))); num = ""
            if ch == "-":
                num = "-"; continue
            out.append(ch)
    return "".join(out)

# ------------------------------------------------------------------ the drop
def drop_path(ox=0, oy=0, k=1.0, steps=3):
    """Circle c(128,141) r64 with 45° tangents to an apex at y≈50.5.
    Left flank: smooth. Right flank: `steps` pixel stairs straddling the tangent."""
    T = lambda x, y: "%s %s" % (r(ox + x * k), r(oy + y * k))
    R, cx, cy = 64, 128, 141
    h = R / 2 ** 0.5
    apex = cy - R * 2 ** 0.5
    s = h / steps
    pts = [(cx, apex)]
    for i in range(steps):
        pts += [(cx + (i + 0.5) * s, apex + i * s), (cx + (i + 0.5) * s, apex + (i + 1) * s)]
    pts += [(cx + h, cy - h)]
    d = "M" + " L".join(T(x, y) for x, y in pts)
    d += " A%s %s 0 1 1 %s Z" % (r(R * k), r(R * k), T(cx - h, cy - h))
    return d

DROP_BOX = (128 - 64, 141 - 64 * 2 ** 0.5, 128 + 64, 205)   # x0, y0, x1, y1 in drop units

# ------------------------------------------------------------------ wordmark
font = TTFont(os.path.join(FONTS, "Fraunces%5BSOFT,WONK,opsz,wght%5D.ttf"))
font = instancer.instantiateVariableFont(font, {"wght": 380, "opsz": 72, "SOFT": 50, "WONK": 0})
gs, cmap, hmtx = font.getGlyphSet(), font.getBestCmap(), font["hmtx"]
UPM = font["head"].unitsPerEm
SIZE, BASE = 168, 176
TRACK = [-4, -2, -6, -8, -6]
K_TITTLE = 0.27

def wordmark_parts():
    s = SIZE / UPM
    x = 0.0
    paths, boxes = [], []
    for i, ch in enumerate("sılong"):
        name = cmap[ord(ch)]
        sp, bp = SVGPathPen(gs), BoundsPen(gs)
        m = (s, 0, 0, -s, x, BASE)
        gs[name].draw(TransformPen(sp, m)); gs[name].draw(TransformPen(bp, m))
        paths.append(fmt(sp.getCommands())); boxes.append(bp.bounds)
        x += hmtx[name][0] * s
        if i < len(TRACK):
            x += TRACK[i] * SIZE / 1000
    ib = boxes[1]
    cx = (ib[0] + ib[2]) / 2 + 1.5
    y0 = ib[1] - 12 - 205 * K_TITTLE
    ox, oy = cx - 128 * K_TITTLE, y0
    drop = drop_path(ox, oy, K_TITTLE)
    drop_top = oy + DROP_BOX[1] * K_TITTLE
    xmin = min(b[0] for b in boxes); xmax = max(b[2] for b in boxes)
    ymin = min(min(b[1] for b in boxes), drop_top); ymax = max(b[3] for b in boxes)
    return paths, drop, (xmin, ymin, xmax, ymax), (ox, oy)

WM_PATHS, WM_DROP, WM_BOX, WM_DROP_ORIGIN = wordmark_parts()
PAD = 8
VB = (WM_BOX[0] - PAD, WM_BOX[1] - PAD, WM_BOX[2] - WM_BOX[0] + 2 * PAD, WM_BOX[3] - WM_BOX[1] + 2 * PAD)

def svg_doc(vb, title, body, extra_head=""):
    x, y, w, h = vb
    return ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="%s %s %s %s" width="%s" height="%s" role="img" '
            'aria-labelledby="title">\n<title id="title">%s</title>\n%s%s\n</svg>\n'
            % (r(x), r(y), r(w), r(h), r(w), r(h), title, extra_head, body))

def wordmark_body(ink, drop_ink, drop_attrs=""):
    letters = " ".join(WM_PATHS)
    return ('<g id="wordmark">\n<path id="letters" fill="%s" d="%s"/>\n<path id="drop" fill="%s"%s d="%s"/>\n</g>'
            % (ink, letters, drop_ink, drop_attrs, WM_DROP))

def save(name, text):
    with open(os.path.join(SVG, name), "w", encoding="utf-8") as fh:
        fh.write(text)

WM_VARIANTS = {
    "on-dark":  (PAPER, NEON),       # primary for Silong's midnight site
    "on-light": (MIDNIGHT, MIST),
    "black":    ("#000000", "#000000"),
    "white":    ("#FFFFFF", "#FFFFFF"),
    "paper":    (PAPER, PAPER),      # one-colour on dark
    "midnight": (MIDNIGHT, MIDNIGHT),# one-colour on light
}
for key, (ink, dink) in WM_VARIANTS.items():
    save("silong-wordmark-%s.svg" % key, svg_doc(VB, "silong", wordmark_body(ink, dink)))

# ------------------------------------------------------------------ symbol (the drop)
SYM_VB = (0, 0, 256, 256)
# centre the drop optically on 256: drop spans y 50.5–205 (centre 127.7) → already centred
SYM_VARIANTS = {"neon": NEON, "mist": MIST, "midnight": MIDNIGHT, "paper": PAPER, "black": "#000000", "white": "#FFFFFF"}
for key, col in SYM_VARIANTS.items():
    save("silong-symbol-%s.svg" % key, svg_doc(SYM_VB, "silong symbol", '<path id="drop" fill="%s" d="%s"/>' % (col, drop_path())))

# small-size cut: two larger stairs, drop enlarged to fill the canvas (for 16–48 px)
KS = 1.42
SMALL = drop_path(128 - 128 * KS, 128 - 127.75 * KS, KS, steps=2)
save("silong-symbol-small.svg", svg_doc(SYM_VB, "silong symbol (small sizes)", '<path id="drop" fill="%s" d="%s"/>' % (MIDNIGHT, SMALL)))

# app icon / avatar tile: Midnight tile, Neon drop
def tile(rx, scale, shape="rect"):
    ox = 128 - 128 * scale; oy = 128 - 127.75 * scale
    bg = ('<rect width="256" height="256" rx="%s" fill="%s"/>' % (rx, MIDNIGHT)) if shape == "rect" else \
         ('<circle cx="128" cy="128" r="128" fill="%s"/>' % MIDNIGHT)
    return bg + '\n<path id="drop" fill="%s" d="%s"/>' % (NEON, drop_path(ox, oy, scale, steps=3 if scale < 1 else 2))

save("silong-app-icon.svg", svg_doc(SYM_VB, "silong app icon", tile(56, 0.92)))
save("silong-avatar.svg", svg_doc(SYM_VB, "silong avatar", tile(0, 0.86, "circle")))
# favicon tile (small cut, bigger drop, smaller radius)
save("silong-favicon-tile.svg", svg_doc(SYM_VB, "silong favicon", '<rect width="256" height="256" rx="48" fill="%s"/>\n<path fill="%s" d="%s"/>'
     % (MIDNIGHT, NEON, drop_path(128 - 128 * 1.12, 128 - 127.75 * 1.12, 1.12, steps=2))))

# adaptive favicon.svg: Mist drop on light browser chrome, Neon on dark
fav_style = ('<style>#drop{fill:%s}@media (prefers-color-scheme: dark){#drop{fill:%s}}</style>\n' % (MIST, NEON))
save("favicon.svg", svg_doc(SYM_VB, "silong", '<path id="drop" d="%s"/>' % SMALL, fav_style))

# ------------------------------------------------------------------ animated wordmark
# 9 s loop that starts at rest: the drop rests ~7.2 s, dissolves in place (0.6 s), then falls back
# into place as the tittle (~0.8 s, gravity ease) with a slight squash. Static when reduced motion.
ANIM_CSS = """<style>
#drop{transform-box:fill-box;transform-origin:50% 100%;animation:fall 9s linear infinite}
@keyframes fall{
 0%,80%{transform:translateY(0);opacity:1}
 87%{transform:translateY(0);opacity:0}
 87.1%{transform:translateY(-140%);opacity:0;animation-timing-function:cubic-bezier(.55,0,.75,.35)}
 90%{opacity:1}
 96%{transform:translateY(0);animation-timing-function:ease-out}
 97.3%{transform:translateY(0) scaleY(.94)}
 99%,100%{transform:translateY(0) scaleY(1);opacity:1}
}
@media (prefers-reduced-motion: reduce){#drop{animation:none}}
</style>
"""
VB_ANIM = (VB[0], VB[1] - 60, VB[2], VB[3] + 60)   # headroom for the fall
for key in ("on-dark", "on-light"):
    ink, dink = WM_VARIANTS[key]
    save("silong-wordmark-animated-%s.svg" % key, svg_doc(VB_ANIM, "silong", wordmark_body(ink, dink), ANIM_CSS))

print("viewBox", [r(v) for v in VB], "aspect", r(VB[2] / VB[3]))
