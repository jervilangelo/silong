# Design system and brand usage

The actual repository directory is brand/ (not brands/). All subfolders were inventoried: svg, png/wordmark, png/symbol, web, concepts, source; brand-guide.html and README were inspected. The selected identity is concept B, The Falling Rain. Concept explorations are not runtime logos.

The original transparent wordmark and social avatar PNGs were visually previewed. The logo uses custom outlined Fraunces forms, a Neon stepped rain dot, Paper letters and deliberately custom spacing. Never retype, recolor, distort, crop or add effects to the official masters.

Palette: Midnight #151D25, Rain #263640, Mist #506D76, Neon #8CC3C7, Paper #D6D5CE. Use Paper on Midnight/Rain for text and Midnight on Neon actions. Mist is not small body text on dark backgrounds.

Runtime choices:

- Static on-dark SVG: header, hero signature, auth pages, dashboard sidebar, public profiles and footer.
- Static on-light SVG: provided by the Brand light prop for future Paper surfaces; current branded shells are dark.
- Animated on-dark SVG: route loading state only, matching the brand README restriction. Existing SVG reduced-motion behavior is preserved.
- Official adaptive favicon SVG, apple touch PNG, 192/512 and maskable icons: metadata and web manifest.
- Approved on-dark 1200w PNG: server-generated 1200x630 social-sharing image, no re-created logo.

Aspect ratio follows each source viewBox/intrinsic size. Wordmarks stay at least 72px wide with reserved padding; symbols retain transparency. Runtime copies are deterministic and limited; originals are intact.

TasteSkill v2 was found in the readable Claude synced skill directory and executed with Node. Direction: The place carries it, seed 1709436504. Palette and type retained from the brand. Idea: Silong's falling rain becomes the view outside a literary refuge. Original SVG city artwork replaces unavailable photography; no borrowed Pinterest assets. The requested short slogan and low-motion rain take precedence over the dealt pinned-story choreography. Native accessible controls, visible focus, keyboard navigation and reduced motion guide interaction.

UI/UX Pro Max, Superpowers, Frontend Design, Logo Design and Playwright CLI skills were not found in the inspected supported/Claude skill locations. Playwright itself is installed as a test dependency. Sites local-development guidance was used. No replacement logo was generated.

Typography uses locally hosted Fraunces for headings, Newsreader for literary excerpts and system Arial for UI. The three roles follow the brief’s editorial/UI separation; the strict TasteSkill two-font warning is documented rather than silently claiming a pass. No external font requests are required.
