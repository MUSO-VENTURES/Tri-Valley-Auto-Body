# Tri-Valley Auto Body — Website

A 7-page static site (HTML/CSS/JS, no build step) built from the v2 design
concept, with six working widgets wired in. Everything runs without a
server — but a few widgets need a free third-party account before they go
fully live. Until then, each shows a clearly labeled "not connected yet"
box instead of a broken embed.

## Pages
- `index.html` — Home
- `services.html` — Services + repair process
- `gallery.html` — Before/after gallery (filters + lightbox slider)
- `about.html` — Company story, team, credentials
- `reviews.html` — Testimonials + live Google Reviews feed
- `estimate.html` — Estimate form + booking widget + insurance lookup
- `contact.html` — Location, hours, map, contact form

## Previewing locally
Because the gallery and insurance widgets load local JSON files via
`fetch()`, opening the HTML files directly (`file://…`) will block those
requests in most browsers. Run a tiny local server from this folder instead:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Any static host works the same way in production (see "Hosting" below).

## One file to edit: `js/widgets-config.js`
All six widgets read their settings from this single file. Fill in real
values as you set up each account — no other code needs to change.

| Widget | Service used | Cost | Config keys |
|---|---|---|---|
| 1. Estimate form | [Formspree](https://formspree.io) (or Web3Forms) | Free tier | `FORMSPREE_FORM_ID` |
| 2. Before/after gallery | Built-in (reads `data/gallery.json`) | Free | n/a — edit the JSON file |
| 3. Booking / scheduling | [Calendly](https://calendly.com) (or Acuity) | Free tier | `CALENDLY_URL` |
| 4. Insurance lookup | Built-in (reads `data/insurance.json`) | Free | n/a — edit the JSON file |
| 5. Live chat / SMS | [Tawk.to](https://tawk.to) | Free | `TAWKTO_PROPERTY_ID`, `TAWKTO_WIDGET_ID`, `SMS_NUMBER` (fallback) |
| 6. Live Google Reviews | [Elfsight](https://elfsight.com) (or Trustindex) | Free tier | `GOOGLE_REVIEWS_WIDGET_ID` |

### 1. Estimate form (Formspree)
1. Create a free account at formspree.io and add a new form.
2. Copy the form ID from the endpoint it gives you (`https://formspree.io/f/XXXXXXX`).
3. Paste `XXXXXXX` into `FORMSPREE_FORM_ID` in `js/widgets-config.js`.
4. The Contact page form (`contact.html`) reuses the same ID automatically.

### 2. Before/after gallery
Open `data/gallery.json`. For each job, drop the photos in `images/gallery/`
and set:
```json
{ "before": "images/gallery/crv-front-before.jpg", "after": "images/gallery/crv-front-after.jpg" }
```
Leave `before`/`after` blank to keep the placeholder swatch. Want a
drag-and-drop upload manager instead of editing JSON by hand? Swap this
file for a free [Cloudinary](https://cloudinary.com) upload widget later —
the gallery rendering code in `js/widgets.js` (`initGalleryPage`) is the
only place that would need to change.

### 3. Booking widget (Calendly)
1. Create a free Calendly account and an event type (e.g. "Free Estimate — 30 min").
2. Copy its scheduling link.
3. Paste it into `CALENDLY_URL` in `js/widgets-config.js`.

### 4. Insurance carrier lookup
Open `data/insurance.json` to add, remove, or correct carriers, claims
phone numbers, and which ones are Direct Repair Program (DRP) partners.

### 5. Live chat / SMS (Tawk.to)
1. Create a free Tawk.to account and property.
2. In Administration → Channels → Chat Widget, copy the Property ID and Widget ID
   out of the embed snippet it gives you.
3. Paste both into `js/widgets-config.js`.
4. Until connected, the chat button falls back to opening a text message to
   `SMS_NUMBER`.

### 6. Live Google Reviews (Elfsight)
1. Create a free Elfsight account and add a "Google Reviews" widget, connected
   to your Google Business Profile.
2. Copy the widget ID from the embed code it gives you.
3. Paste it into `GOOGLE_REVIEWS_WIDGET_ID` in `js/widgets-config.js`.

Also update the "Write a Google Review" link on `reviews.html` with your
shop's real Google Place ID (find it via [Google's Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)).

## Hosting
Any static host works — no server-side code required:
- Netlify or Vercel (drag-and-drop the folder, or connect a git repo)
- GitHub Pages
- Cloudflare Pages

## Editing content
- **Text/prices/hours**: edit directly in each HTML file.
- **Phone number**: appears in several places — search-and-replace
  `9254438548` / `925.443.8548` across all files if it changes.
- **Colors/fonts**: all design tokens live at the top of `css/styles.css`
  under `:root`.
