# RWA.ms screenshot-to-code rebuild

Source workflow: `abi/screenshot-to-code`, local checkout commit `d026163`.

Applied workflow:
- `html_css` stack: real HTML + CSS + JS, no screenshot-as-page shortcut.
- Extracted visual assets from the supplied desktop/mobile mockups.
- Desktop and mobile are separate HTML outputs.
- Browser screenshot preview loop was run in Google Chrome at 1672×941 and 941×1671.
- AI edit zones are marked with `data-ai-zone` attributes.

The final HTML does not reference `desktop-reference.png` or `mobile-reference.png`; those remain only as comparison sources.
