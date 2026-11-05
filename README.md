# Mai Samboss Limited — Marketing Website

Static, single-page site built with Tailwind CSS (CLI build) and tree-shaken Lucide icons.
No framework, no runtime dependencies: deploy the files to any static host (Netlify, Vercel, Cloudflare Pages, cPanel, S3).

## Structure

```
index.html            Single-page site (all sections)
privacy.html          Privacy Policy stub   [REPLACE with reviewed copy]
terms.html            Terms of Use stub     [REPLACE with reviewed copy]
src/styles.css        Tailwind source + component classes
src/main.js           Icons, nav, scroll reveal, form validation, WhatsApp quote handler
tailwind.config.js    Brand palette (#1B5E3A green, #C9A227 gold) and font
assets/css|js         Build output (committed so the site works without building)
assets/img            Logo, optimised WebP images, favicons, og-image.jpg
```

## Develop & build

```bash
npm install
npm run build        # rebuild assets/css/styles.css and assets/js/main.js
npm run serve        # preview at http://localhost:3000
npm run dev:css      # optional: watch Tailwind while editing (run dev:js in another terminal)
```

Re-run `npm run build` after changing classes in any HTML file or `src/`.
If you use a new Lucide icon, import it and add it to the `icons` object in `src/main.js`.

## Before launch checklist

1. **Placeholders**: search the project for `[`. Every bracketed value is placeholder content:
   stats, product specs, business hours and testimonials.
2. **Domain**: the canonical, Open Graph and JSON-LD URLs use `https://www.maisamboss.com.ng`
   (inferred from the company email). Update them in `index.html` if the site is hosted elsewhere.
3. **Quote form**: submissions open WhatsApp with the request pre-filled for the visitor to send to `QUOTE_WHATSAPP_NUMBER`
   in `src/main.js`. Change the number there (and the `wa.me/` links in `index.html`), then run `npm run build`.
4. **Logo**: `assets/img/logo.webp` / `logo.png` were cut out from a small JPG. For the sharpest result,
   drop in an SVG or high-resolution transparent PNG from the original design files (same filenames).
5. **Legal pages**: replace the stub copy in `privacy.html` and `terms.html`.
6. **Images**: swap the placeholder photos for the company's own product photos (keep them around 800×600 WebP, under 150 KB).

## Company details in use

- Email: maisambossnigldtsamboss@gmail.com
- Phone: +234 814 298 3672, +234 806 977 2725
- WhatsApp (chat + quote requests): +234 701 984 9028
- Facebook: https://www.facebook.com/share/19eC3annKr/
- TikTok: https://www.tiktok.com/@mscertifiedexport
- CAC RC No.: 788818
- NEPC Exporter Reg. No.: 0045921
- Address: Suite A107, Garki Mall, Opposite Garki International Market, Garki 2, Abuja

## Placeholder image credits

| File | Source | License |
|---|---|---|
| hero-farmers, hero-field, onions, maize, poultry, agro-allied | Unsplash | Unsplash License |
| ginger | [Dried Ginger Rhizomes](https://commons.wikimedia.org/wiki/File:Dried_Ginger_Rhizomes.jpg), Wikimedia Commons | CC0 |
| soya-beans | [Multi colored soybeans](https://commons.wikimedia.org/wiki/File:Multi_colored_soybeans.jpg), Wikimedia Commons | Public domain |
| sesame | [Sa white sesame seeds](https://commons.wikimedia.org/wiki/File:Sa_white_sesame_seeds.jpg), Wikimedia Commons | CC BY-SA 3.0 (attribution required) |
| hibiscus | [Hibiscus sabdariffa dried](https://commons.wikimedia.org/wiki/File:Hibiscus_sabdariffa_dried.jpg), Wikimedia Commons | CC BY 3.0 (attribution required) |

Replace the sesame and hibiscus images with your own photos before launch, or credit the authors as their licenses require.
# maisamboss_website
