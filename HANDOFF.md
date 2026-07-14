# Konbini 108 — Upload Handoff

Pick up here in a fresh conversation. Everything is wired; just needs photos.

## What's done ✅
All these categories have real product photos saved in `assets/products/{id}.png` and are on the render whitelist in `components.jsx`:

- **Rice & Onigiri** — r01–r07
- **Bento & Bowls** — b01–b03
- **Deli & Protein** — e01–e06
- **Hot Food** — h01–h06
- **Noodles** — n01, n02
- **Bakery** — k01, k02
- **Snacks** — s01–s05, s07–s09 (s10 chocolate candy was removed entirely)
- **Sweets & Jelly** — w01–w06, w08, w09, w10
- **Members** — all 8 (mizuki, neo, reia, ryota, souma, takeru, tsubasa, yuga) in `assets/members/`

## What's LEFT to upload ❌

### Sweets ✅ COMPLETE
*(w11 CHOCO BANANA ✅ · w12 STRAWBERRY POCKY ✅)*

### Drinks ✅ COMPLETE
*(d01–d12 all uploaded)*

### Dairy ✅ COMPLETE
*(y01–y04 all uploaded)*

### Pantry ✅ COMPLETE
*(p01 natto, p02 canned mackerel uploaded)*

### Daily Goods ✅ COMPLETE
*(g01–g05 all uploaded)*

---

🎉 **All product photos uploaded.** Every category on the render whitelist.

## Instructions for the new chat
Paste this to kick off:

> Continuing Konbini 108. Read `HANDOFF.md` — I'll upload the remaining product photos in order (sweets w11–w12, then drinks d01–d12). For each batch:
> 1. Save the uploaded images to `assets/products/{id}.png`
> 2. Add the IDs to the `PRODUCTS_WITH_PHOTOS` Set in `components.jsx`
> 3. Confirm the render works

## Key files
- `data.js` — product catalog (id, cat, en, jp, price, tags, emoji)
- `components.jsx` — `ProductArt` + `PRODUCTS_WITH_PHOTOS` whitelist (line ~78)
- `assets/products/` — product photo files, named `{id}.png`
- `assets/members/` — 8 member portraits (already complete)
- `Konbini 108.html` — root, opens the app
