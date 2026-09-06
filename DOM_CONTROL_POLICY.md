# RWA.ms Desktop DOM Control Policy

Desktop only. Every interactive control and every system-relevant label must exist as HTML/CSS/JS DOM.

- No screenshot/full-page image is used as UI.
- No button is baked into an image.
- `Up to 70% Off for Holders` is a real `.discount` DOM element.
- Favorite hearts are real `<button data-action="favorite">` controls.
- Hero/category CTAs, Sign In, Join, Cart, View Details, Start Investing, range tabs and filters are DOM controls.
- Images are source artwork only and use `pointer-events:none`.
- Downstream agents should bind behavior using `data-action` and must not replace DOM controls with image slices.
- Desktop remains divided into seven `data-ai-zone` areas for parallel implementation.

## Artwork rule v3

All visible controls are DOM. Product artwork assets were re-cropped from the supplied desktop reference so the visible `Up to 70% Off` badge, favorite heart, category CTAs, carousel arrows, and other controls are not sourced from the image. The DOM owns these controls and agents can bind them through `data-action`.
