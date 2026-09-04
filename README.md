# Optimix — Design Concept A

Multi-page front-end design prototype for Optimix, built with semantic HTML, Tailwind CSS, native JavaScript, and Vite.

## Current prototype surface

- `index.html` — concise homepage with corporate-film hero, portfolio gateways, and featured project proof
- `products.html` — nine category labels and three supplied flagship products with downloadable data sheets
- `projects.html` — filterable register of 30 supplied projects and the source project casebook
- `certifications.html` — 11 supplied credentials grouped into five families with source-document links
- `company.html` — compact company introduction and manufacturer facts
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
- Product, project, and certification presentation media are derived from supplied client documents; source and transformation limits are recorded in `docs/ASSET_PROVENANCE.md`.
- Approved system technical drawings remain pending and the existing system data/partials are not part of the active page entries.
