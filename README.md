# Optimix — Design Concept A

Multi-page front-end design prototype for Optimix, built with semantic HTML, Tailwind CSS, native JavaScript, and Vite.

## Current prototype surface

- `index.html` — concise homepage with corporate-film hero, Products / Systems / Credentials gateways, featured project proof, and latest news
- `products.html` — compact media-first directory of ten top-level product categories with locally stored reference imagery from the Optimix website
- `product-category.html?category=...` — Tiling, Waterproofing, and Repairing range views with product-type filtering
- `product-detail.html?product=...` — data-driven technical detail views for TA313, TA328, TG410E, WP533, and RM760
- `projects.html` — filterable register of 31 supplied projects, a Beijing Daxing Airport feature story, and the source project casebook
- `systems.html` and `system-detail.html?system=...` — nine application systems with official reference drawings, layer sequences, documented product links, and a shared detail template
- `news.html` and `news-detail.html?article=...` — filterable news archive and three shared-template article views based on current Optimix source material
- `certifications.html` — quality-capability narrative plus 11 supplied credentials grouped into five families with source-document links
- `company.html` — company profile plus manufacturing, smart-production, quality, and sustainability chapters
- `admin-prototype.html` — separate clickable administration visual prototype; all changes are simulated in memory and reset on refresh
- Shared responsive navigation, contact footer, scroll/reveal motion, and a local demonstration support assistant

This remains a review prototype: it has no CMS, backend, live support service, production localization, or final SEO setup. All entry pages intentionally use `noindex, nofollow`.

## Public preview

The latest `main` branch is deployed automatically to:

https://scsanity.github.io/optimix-concept-a/

## Local development

```bash
npm install
npm run dev
```

Build the standalone prototype with:

```bash
npm run build
```

## Deployment

GitHub Actions builds the Vite project and deploys the `dist` output to GitHub Pages on every push to `main`. Vite uses relative asset paths so the site works from the repository subpath.

## WordPress mapping direction

The following mapping remains the intended implementation direction; it is not an implemented WordPress theme or completed content schema:

- `index.html` → `front-page.php`
- `partials/header.html` → `header.php`
- `partials/sections/*.html` → `template-parts/*.php`
- `data/content.json` → CPT, ACF field groups, and ACF Options Pages
- `assets/js/sections/*.js` → section-scoped behavior without shared mutable state

Vite expands the `@include` comments at build time. There is no client-side template runtime.

## Asset status

- The official Optimix logo and supplied client documents are retained unchanged.
- The Hero uses an Optimix-supplied corporate film: an unchanged full-film copy plus a derived muted homepage loop and poster. See `docs/ASSET_PROVENANCE.md`.
- Product media combines client-supplied data sheets with locally copied imagery from the official Optimix website; project and certification presentation media comes from client-supplied material. Source, rights, and transformation limits are recorded in `docs/ASSET_PROVENANCE.md`.
- System drawings and selected News / Company images are local prototype copies from the current official Optimix website. They are active in the Demo, but approved production originals and written reuse confirmation remain pending.
