# Optimix — Design Concept A

Static homepage prototype for Optimix, built with semantic HTML, Tailwind CSS, native JavaScript, and Vite.

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

## WordPress mapping

- `index.html` → `front-page.php`
- `partials/header.html` → `header.php`
- `partials/sections/*.html` → `template-parts/*.php`
- `data/content.json` → CPT, ACF field groups, and ACF Options Pages
- `assets/js/sections/*.js` → section-scoped behavior without shared mutable state

Vite expands the `@include` comments at build time. There is no client-side template runtime.

## Asset status

- The official Optimix logo and supplied client documents are retained unchanged.
- The hero video is a licensed prototype placeholder and is documented in `docs/ASSET_PROVENANCE.md`.
- System technical drawings remain explicitly marked as pending approved client artwork.
