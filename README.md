# Yummy Studio — Mini Bakery Website

A simple one-page website for your homemade cookies, cakes, and sweet treats.

## What’s included

- **Hero** — Tagline and main message
- **About** — Short story about your baking
- **Treats** — Three categories: Cookies, Cakes, Sweet Treats (you can rename or add more)
- **Order** — Email and Instagram links for orders

## How to view the site

1. Open `index.html` in your browser (double-click the file or drag it into Chrome/Safari).
2. Or run a simple server from this folder, for example:
   - **Python 3:** `python3 -m http.server 8000` then go to http://localhost:8000
   - **Node (npx):** `npx serve .` then open the URL it shows

## Customize it

1. **Business name** — Search for "Yummy Studio" in `index.html` and replace with your name.
2. **About text** — Edit the paragraph in the "Our Story" section in `index.html`.
3. **Contact** — In `index.html`, update:
   - `hello@yummystudio.com` with your real email
   - `https://instagram.com/yummystudio` and `@yummystudio` with your Instagram
4. **Products** — Change the text in the three product cards (Cookies, Cakes, Sweet Treats). You can add more cards by copying a full `<article class="product-card">...</article>` block.
5. **Colors** — In `styles.css`, the variables at the top (e.g. `--cream`, `--caramel`, `--brown`) control the look. Change their hex values to match your brand.

No build step or install required—just edit the files and refresh the browser.
