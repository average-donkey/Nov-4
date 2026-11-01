# Website 04 — The Vintage Library 📚

A standalone three-screen birthday countdown site for Palak, styled like an old private archive.

## Run locally
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Install the Live Server extension if needed.
4. Right-click `index.html` → **Open with Live Server**.

## Add a Shinchan image
Put your image at `assets/photos/shinchan.png`. The small photo area on Screen 3 uses this path. If the image isn't present, a text placeholder appears. You can also add more photos or decorative images by editing `index.html`.

## Edit the text
Open `script.js` and change the `SITE_CONTENT` values near the top:
- `personalMessage`
- `ordinarySecretTitle` and `ordinarySecret`
- `birthdaySecretTitle` and `birthdaySecret`

Use Ctrl+F in `index.html` to edit headings, book titles, captions, and other static text.

## Countdown and birthday mode
The countdown targets November 20 at 12:00 AM IST, regardless of the visitor's timezone. Birthday mode lasts the entire November 20 in India; the gold particles and birthday-only button appear only during that date. From November 21 IST onward, the countdown targets the following November 20.

This is a static site with no backend. Google Fonts require an internet connection; fallback fonts are included.
