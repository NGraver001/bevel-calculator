# Bevel Calculator

A mobile-friendly calculator for a symmetric knife primary bevel. All dimensions are inches.

Choose an 8, 10, or 14 inch contact wheel, enter blade thickness, thin edge thickness, and bevel depth, and read the wheel center offset to three decimal places.

## Use on iPhone

Open https://ngraver001.github.io/bevel-calculator/ in Safari, then Share → Add to Home Screen. Enable Open as Web App if offered. No sign-in is required. The app caches its files after a successful visit for offline use; verify by reopening it in airplane mode before relying on it offline.

## Files

This is a static site with no dependencies or build step. Calculations run locally in the browser. `calculator.mjs` contains the geometry and input validation; `index.html` includes the vector dimension diagram. The inputs describe a symmetric grind on both sides of the blade.
