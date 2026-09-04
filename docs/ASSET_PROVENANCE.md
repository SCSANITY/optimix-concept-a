# Prototype Asset Provenance

This file records the source and transformation status of media used in Concept A.

Source paths beginning with `shared/` are relative to the WebA project root. Runtime paths are relative to `concept-a/`. The current build does not import files directly from `shared/`; those originals remain necessary for provenance and future re-export.

## Official Optimix logo

- Status: Supplied Optimix brand asset
- Source files: `shared/assets/Logo.png` and `shared/assets/Logo_(1).png`
- Runtime copy: `assets/media/optimix-logo-official.png`
- Verification: All three files had the same SHA-256 hash on 2026-09-04; the runtime copy is unchanged

## Optimix corporate film

- Status: Supplied Optimix brand media
- Source file: `shared/Hero01.mp4`
- Full-film copy: `public/media/hero/optimix-corporate-film-full.mp4`
- Derived homepage loop: `public/media/hero/optimix-corporate-hero-loop.mp4`
- Derived poster: `public/media/hero/optimix-corporate-hero-poster.jpg`
- Homepage loop composition: six short excerpts from the supplied film; audio removed; H.264 fast-start export
- Production action: Request the approved high-resolution master when available. The supplied source is approximately 967 × 544.
- Verification: The source and full-film copy had the same SHA-256 hash on 2026-09-04; the homepage loop and poster are derived files

## Product data sheets and application images

- Status: Supplied Optimix product documents with derived presentation images
- Source files: The three PDFs in `shared/产品/` for TA313, TA328, and TG410E
- Download copies: `public/documents/products/*.pdf`
- Derived images: `public/media/products/*.jpeg`
- Verification: Each renamed download copy had the same SHA-256 hash as its corresponding supplied PDF on 2026-09-04
- Transformation limit: Development history identifies the application images as extractions from the supplied PDFs, but an exact page/crop/export recipe was not retained; request original high-resolution photography for production

## Selected project casebook and project images

- Status: Supplied Optimix project casebook with derived presentation images
- Source file: `shared/奧迪美_2022-2024+精選工程案例.pdf`
- Download copy: `public/documents/projects/optimix-selected-projects-2022-2024.pdf`
- Derived images: `public/media/projects/01-*.jpg` through `30-*.jpg`
- Verification: The source and renamed download copy had the same SHA-256 hash on 2026-09-04
- Transformation limit: The 30 project images were derived from the casebook for responsive cards; individual crop/export recipes were not retained, so supplied original photographs remain preferable for production

## Certification gateway preview

- Status: Derived from an Optimix-supplied certification document
- Source file: `shared/证书/[OPTIMIX]+CIC+Green+Product+TA328+TA328#00+(exp+on+2029.01.20).pdf`
- Derived preview: `public/media/certifications/cic-green-product-ta328-preview.jpg`
- Transformation: First page rasterised for responsive web display; certificate content is unchanged

## Certification register previews

- Status: Derived from the 11 Optimix-supplied PDFs in `shared/证书/`
- Derived previews: `public/media/certifications/*.jpg`
- Transformation: First page rasterised for the credential register; source PDFs remain the linked documents
- Verification: All 11 renamed PDFs in `public/documents/certificates/` had matching SHA-256 hashes with their corresponding files in `shared/证书/` on 2026-09-04

## Company production still

- Status: Derived from the Optimix-supplied corporate film
- Source file: `shared/Hero01.mp4`
- Derived still: `public/media/company/optimix-production-facility.jpg`
- Transformation: Single frame extraction; visual content is otherwise unchanged

## Known source and quality gaps

- The current Hero source is the supplied corporate film, not a stock placeholder, but an approved higher-resolution master is still preferred for production.
- Product and project images are document-derived previews; request original photographs before final image treatment.
- Approved system technical drawings have not been supplied and are not shown in the active page entries.
- `shared/202304+珠海祥邦環保建材生產基地.pdf` is present as a client source file but is not referenced by the current active page data.
