# silong — brand asset package

**Logo:** The Falling Rain. A lowercase Fraunces wordmark. The dot of the i is a raindrop: its left side is a smooth curve and its right side steps down in three pixels.

## Folders

| Folder | Contents |
|---|---|
| `svg/` | Outlined vector masters (no live text and no rasters; editable in Figma, Illustrator or Inkscape) |
| `png/wordmark/` | Transparent wordmark PNGs, 600 / 1200 / 2400 px wide |
| `png/symbol/` | Transparent drop PNGs, 64–1024 px |
| `png/silong-social-avatar-1024.png` | Circle avatar for social profiles (Midnight disc with a Neon drop) |
| `web/` | favicon.ico, favicon.svg (adapts to light and dark), 16/32/48 PNGs, apple-touch-icon, 192/512 icons, maskable icon, site.webmanifest, `<head>` snippet |

## Which file to use

| Background | Wordmark | Symbol |
|---|---|---|
| Midnight, Rain or a dark photo | `silong-wordmark-on-dark` (Paper + Neon drop) | `silong-symbol-neon` |
| Paper, white or a light photo | `silong-wordmark-on-light` (Midnight + Mist drop) | `silong-symbol-mist` |
| One colour, dark ground | `silong-wordmark-paper` or `-white` | `silong-symbol-paper` or `-white` |
| One colour, light ground | `silong-wordmark-midnight` or `-black` | `silong-symbol-midnight` or `-black` |
| Under 48 px (favicons, tiny UI) | — | `silong-symbol-small` (two larger stairs) |

## Colour

| Name | HEX | RGB | Role |
|---|---|---|---|
| Midnight | #151D25 | 21 29 37 | Primary background, ink on light |
| Rain | #263640 | 38 54 64 | Surfaces, avatar disc |
| Mist | #506D76 | 80 109 118 | The drop on light backgrounds |
| Neon | #8CC3C7 | 140 195 199 | The drop on dark backgrounds |
| Paper | #D6D5CE | 214 213 206 | Ink on dark, light background |

Amber (#E3A95C) is not part of the logo. Keep it for warm UI moments only.

## Clear space and minimum size
- **Clear space:** the height of the i (x-height) on every side of the wordmark, and half the drop's width around the symbol.
- **Minimum wordmark width:** 72 px on screen, 18 mm in print. Below that, use the symbol.
- **Minimum symbol size:** 16 px using `silong-symbol-small`. Use the standard drop from 48 px up.

## Don't
- Replace the drop with an ordinary round dot, or add a dot back above the i.
- Recolour the letters Neon, or the drop amber.
- Add glow, gradients, shadows or outlines.
- Re-type the wordmark in Fraunces. Always use the outlined masters, because spacing and the drop position are custom.
- Add a full stop after the wordmark. The drop is its only punctuation.
- Pixelate the rest of the wordmark.

## Animation
`svg/silong-wordmark-animated-on-dark.svg` and `-on-light.svg` run a 9-second loop that starts at rest. The full logo shows for about 7 seconds. Then the drop fades out in place and falls back in as the dot of the i (under a second), landing with a slight squash. When the viewer prefers reduced motion, it shows the static logo. Use it on splash screens and loading states only, not in the persistent navigation.

## Fonts and licensing
The wordmark is outlined from **Fraunces** (Undercase Type, SIL Open Font License 1.1) at weight 380, softness 50 and optical size 72, with custom tracking. The drop is original artwork. The OFL allows logo use. For matching website text, Fraunces and Newsreader (also OFL) are free on Google Fonts.

Trademark clearance is not included. Run a professional search before you register the mark.

## Other files in this folder
- `brand-guide.html`: the visual brand guide. Open it in a browser.
- `concepts/`: round 1 of the logo exploration (concepts A, B and C). B was chosen.
- `source/build_assets.py`: rebuilds every SVG master in `svg/`. It needs Python 3 with `fonttools` and the Fraunces variable font from [google/fonts](https://github.com/google/fonts/tree/main/ofl/fraunces):
  `python source/build_assets.py <fonts-dir> <out-dir>`
- `source/brief.md`: the design brief.
