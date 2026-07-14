# AL-Nisar Web Companion

A calm, bilingual (English / Urdu) Angular SSR companion site for AL Nisar — public Irshadat, Shajra Pak, Gallery, and a Member Portal login gateway.

## Stack

- Angular 21 (standalone, signals, SSR)
- Tailwind CSS v4
- `@lucide/angular` icons
- Inter + Lora + Noto Nastaliq Urdu

## Public content policy

**Irshadat** and **Shajra Pak** are fully public — no login required. The Member Portal (`/login`) is for administrative / member-only utilities only (placeholder auth).

## Scripts

```bash
npm start          # http://localhost:4200
npm run build      # SSR production build
npm run serve:ssr:al-nisar-website
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Home — daily Irshad hero + quick links + Android promo |
| `/irshadat` | Public bilingual teachings reader |
| `/shajra` | Public spiritual lineage tree |
| `/gallery` | Masonry gallery + lightbox |
| `/login` | Member Portal (simulated) |

## Language

Use the **EN / اردو** toggle in the header. Layout direction switches automatically (`ltr` ↔ `rtl`).
