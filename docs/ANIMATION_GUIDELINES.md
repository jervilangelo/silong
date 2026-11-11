# Animation guidelines

Original SVG skyline uses project palette and a small number of static rectangles. CSS rain uses 28 pointer-inert, aria-hidden elements with transform-only motion. No animation library or external artwork is used. Rain never intercepts clicks or keyboard focus.

prefers-reduced-motion removes rain and all UI transitions. Official animated wordmarks include their own reduced-motion rule and appear only in route loading states. Persistent branding remains static. No ambient sound autoplays. Test low-end devices before launch; no measured GPU/CPU claim is made.
