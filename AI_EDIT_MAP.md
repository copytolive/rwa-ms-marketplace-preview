# RWA.ms AI Edit Map — Pixel Lock 100%

## Current acceptance
Desktop and Mobile main previews are 100% pixel-identical at the reference viewports.

## Rule
Do not edit another lane. Replace one reference slice with real HTML/CSS only inside its zone, then run screenshot comparison before merging.

### Desktop zones
- desktop.header
- desktop.sidebar
- desktop.hero
- desktop.chart
- desktop.verticals
- desktop.featured
- desktop.footer

### Mobile zones
- mobile.header
- mobile.hero
- mobile.usp
- mobile.verticals
- mobile.chart
- mobile.featured
- mobile.bottomnav

`desktop-code.html` and `mobile-code.html` preserve the fully coded screenshot-to-code reconstruction. The main `desktop.html` / `mobile.html` are the pixel-lock acceptance baseline.
