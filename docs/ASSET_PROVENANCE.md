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

## Product documents and imagery

### Client-supplied technical documents

- Status: Supplied Optimix product documents
- Earlier sources: The three PDFs in `shared/产品/` for TA313, TA328, and TG410E
- New sources: `shared/新增資料夾/新增資料夾/Data Sheet_TA313 EN 2025.11.17.pdf`, `Data Sheet_RM760 EN 2022.03.28.pdf`, and `Data Sheet_WP533 EN 2025.01.16.pdf`
- Download copies: The five product PDFs in `public/documents/products/`
- Verification: The earlier three renamed copies matched their supplied sources on 2026-09-04. The newly supplied TA313 PDF and existing runtime copy had the same SHA-256 hash on 2026-09-16; the RM760 and WP533 runtime copies also matched their new sources on 2026-09-16.

### Earlier PDF-derived application images

- Status: Derived presentation images
- Runtime files: `public/media/products/optimix-ta313-application.jpeg`, `optimix-ta328-application.jpeg`, and `optimix-tg410e-application.jpeg`
- Transformation limit: Development history identifies these as extractions from supplied PDFs, but an exact page/crop/export recipe was not retained; request original high-resolution photography for production.

### Official-site reference images

- Status: Temporarily copied from the public Optimix website for this client review prototype; files are stored locally and are not hotlinked.
- Category source page: `https://www.optimix.com.hk/en/product`
- Category runtime files: `public/media/products/category-*` for Plastering, Tiling, Waterproofing, Grouting, Repairing, Flooring, Concreting, Emulsion, Eco Build, and HKHA District Term Contract Solutions.
- Product source pages: Optimix detail/category pages for TA313, TA328, TG410E, WP533, and RM760.
- Product runtime files: `public/media/products/optimix-*-packshot.*`.
- Retrieval date: 2026-09-16.
- Production action: Obtain the original approved images and written reuse confirmation from Optimix. Several category files are only 479-784 px wide, and one source filename refers to Dezeen; appearance on the existing Optimix site does not independently prove Optimix owns unrestricted production rights.

## Selected project casebook and project images

- Status: Supplied Optimix project casebook with derived presentation images
- Source file: `shared/奧迪美_2022-2024+精選工程案例.pdf`
- Download copy: `public/documents/projects/optimix-selected-projects-2022-2024.pdf`
- Derived images: `public/media/projects/01-*.jpg` through `30-*.jpg`
- Verification: The source and renamed download copy had the same SHA-256 hash on 2026-09-04
- Transformation limit: The 30 project images were derived from the casebook for responsive cards; individual crop/export recipes were not retained, so supplied original photographs remain preferable for production

## Beijing Daxing International Airport project record

- Status: Client-supplied project photography with web derivatives; exact supply period remains unconfirmed.
- Source folder: `shared/新增資料夾/新增資料夾/大興機場/Photos/`.
- Runtime derivatives:
  - `beijing-daxing-airport-aerial.jpg` from `6165022.jpg`, resized to 2400 × 1350.
  - `beijing-daxing-car-park-finish-01.jpg` from `5A3A3287.jpg`, resized to 1800 × 1200.
  - `beijing-daxing-car-park-finish-02.jpg` from `5A3A3310.jpg`, resized to 1800 × 1200.
  - `beijing-daxing-sf878-delivery.jpg` from the SF878 Construction image showing pallet delivery, resized to 1800 × 1164.
  - `beijing-daxing-sf878-application.jpg` from the SF878 Construction image showing a spiked roller, resized to 1800 × 1200.
- Transformation: High-quality JPEG resize only; source originals remain unchanged.
- Excluded files: All 32 files in `01_Photography/` are excluded because the supplied Hufton+Crow credit document permits editorial use but prohibits promotional/marketing use without additional permission. The two `VCG*.jpg` images are also excluded pending licence evidence.
- Production action: Ask Optimix to confirm public promotional rights for the selected site records, the exact Optimix scope, the supply period, and the preferred English/Chinese project naming.

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

## Company brochure facts

- Status: Client-supplied corporate document used as a factual content source; the document itself is not published in the current Demo.
- Source file: `shared/新增資料夾/OPTIMIX_Company_Brochure_English_Translation.docx`
- Content used: Established in 2000; Dongguan and Zhuhai manufacturing facilities; 600,000 tonnes combined annual capacity; 120+ dry mortar formulations; ISO 9001, 14001, 45001, and 50001 management systems.
- Production action: Client to approve wording and the use of rounded display figures before formal publication.

## Known source and quality gaps

- The current Hero source is the supplied corporate film, not a stock placeholder, but an approved higher-resolution master is still preferred for production.
- Earlier product/project previews remain document-derived. Official-site product references and newly supplied Daxing site records improve the Demo, but production originals and reuse confirmation are still required.
- The Hufton+Crow and VCG Daxing images are deliberately not present in the public Demo because their promotional reuse rights are absent or unclear.
- Approved system technical drawings have not been supplied and are not shown in the active page entries.
- `shared/202304+珠海祥邦環保建材生產基地.pdf` is present as a client source file but is not referenced by the current active page data.
