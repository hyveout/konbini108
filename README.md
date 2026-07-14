# KONBINI 108 — ONE OR EIGHT × YANKEE SQUAT

An interactive fan campaign site for the ONE OR EIGHT single **YANKEE SQUAT**.
Fans build a Japanese-convenience-store order; the receipt reveals which member
they match with based on hidden per-item tags.

## Structure

```
Konbini 108.html      Entry point — load this in a browser.
styles.css            All CSS (theme tokens, bento-poster styling, animations).
data.js               Members + products + categories catalog. Each product has
                      a hidden `tag: 'memberid'` used for the match algorithm.
components.jsx        Shared bits (Star, Barcode, Marquee, DotDivider).
screens.jsx           Mobile screens: Splash / Aisle / Cart / Receipt.
screens-desktop.jsx   Desktop screens: Splash / Aisle (with sidebar cart) / Receipt.
                      Kicks in at ≥ 900px viewport.
spotify-player.jsx    Persistent, collapsible Spotify embed pinned bottom-right.
tweaks_panel.jsx      In-page tweaks / dev navigation panel (dev tool).
app.jsx               Root app — cart state, screen routing, mobile/desktop switch.
assets/
  cover-art.jpg       YANKEE SQUAT single cover.
  logo.png            KONBINI 108 brand mark.
```

## Running locally

Static site — no build step. Serve the folder over HTTP:

```
python3 -m http.server 8000
# then visit http://localhost:8000/Konbini%20108.html
```

Or drop it in any static host (GitHub Pages, Vercel, Netlify).

## Deploying to Vercel (recommended — needed for newsletter)

1. Push the folder to a GitHub repo.
2. In Vercel: **New Project → Import** the repo.
3. **Set environment variables** (required for the mailing-list form to work):
   - Go to **Project → Settings → Environment Variables**
   - Add:
     - `MAILCHIMP_API_KEY` = your Mailchimp API key (format: `xxxx-us14`)
     - `MAILCHIMP_AUDIENCE_ID` = your Mailchimp audience ID (e.g. `9318507adb`)
   - Apply to **Production**, **Preview**, and **Development**.
4. **Redeploy** after adding env vars so they take effect.
5. Live at `https://<your-project>.vercel.app/Konbini%20108.html`.

### How the newsletter signup works

- The form on the receipt page POSTs to `/api/subscribe`.
- That's a Vercel serverless function (`api/subscribe.js`) that calls Mailchimp with the API key server-side — the key is **never** exposed to the browser.
- Subscribers use **double opt-in** (Mailchimp sends a confirmation email). To switch to single opt-in, change `status: 'pending'` → `status: 'subscribed'` in `api/subscribe.js`.
- Each subscriber is tagged with `matched:<member>` (e.g. `matched:mizuki`) and `source:konbini108`, plus a `MATCHED` merge field — Avex can segment the audience by which member each fan matched with.

## Deploying to GitHub Pages (fallback — no newsletter)

GitHub Pages doesn't support serverless functions, so the newsletter won't work here.

1. Push the whole folder to a GitHub repo.
2. Settings → Pages → deploy from `main` / root.
3. The site will be at `https://<user>.github.io/<repo>/Konbini%20108.html`.

## Swapping product data

Edit `data.js`. Every product has:

```js
{ id:'p10', cat:'drinks', en:'BLACK COFFEE', jp:'ブラックコーヒー',
  price:130, tag:'neo',
  c1:'#0F1419', c2:'#FCD34D', emoji:'☕' }
```

- `tag` — the member this item scores a point for
- `cat` — must match a category id in `window.CATEGORIES`
- `emoji` — placeholder art; swap for a real PNG later by replacing the
  emoji rendering with an `<img>` in `screens.jsx > ProductCard`.

## Swapping the song

Edit `spotify-player.jsx` — change `SPOTIFY_TRACK_ID` to the new track ID.

## Match algorithm

In `screens.jsx > ReceiptScreen` (and mirror in `screens-desktop.jsx`):
each item in the cart contributes `qty` points to its `tag` member.
The member with the most points is displayed as the match.
