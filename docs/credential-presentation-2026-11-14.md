# Credential presentation, November 14, 2026

- Quality and Compliance: the existing ISO 9001:2015 row now includes the user-supplied NSAI certification mark. No legacy ANAB, IAF or TÜV Rheinland marks were carried forward.
- Certifications and Set-Asides: the existing small-business credential cards remain together. VIP Graduate appears in its own procurement-recognition block on the same page, followed by a link to Quality and Compliance.
- The homepage and footer keep their existing compact business-credential summaries.

## Artwork provenance

`public/assets/03-credentials/nsai-iso-9001.png` is the embedded TIFF preview extracted from the supplied `ISO_90012015_Large_NSAI_Inc.eps`, exported as PNG at its native 200 × 285 resolution. It is displayed at 180px wide without cropping or recolouring. The original vector file remains in the user's Downloads folder; a future higher-density export can replace the PNG without a layout change.

`public/assets/03-credentials/vip-graduate.jpg` is the original 261 × 177 artwork from the supplied `jvm-assets-2026-10-10.zip` asset bundle, displayed at 180px wide.

NSAI usage reference: https://www.nsai.ie/certification/nsai-certification/nsai-logos/

## Transparent HD refinement

The active assets are now:
- `public/assets/03-credentials/nsai-iso-9001-transparent.webp` (1045 × 1506, alpha, lossless WebP).
- `public/assets/03-credentials/vip-graduate-hd.webp` (1522 × 1033, alpha, WebP quality 90).

The original low-resolution PNG/JPEG above remain as source history and are no longer referenced by the pages.

NSAI reference: https://www.nsai.ie/images/uploads/certification/ISO_90012015_Large_NSAI_Inc.pdf (official vector artwork rendered to PNG for the edit input).
VIP HD reference: https://static.wixstatic.com/media/6e26c9_0c05950f7df342f9884411dd579a4999~mv2.jpg (1024 × 695 version of the same graduate seal, found on https://www.dbaeecsolutions.com/government).

Both cutouts used the built-in image-generation editing tool with `transparent_background: true`, followed by WebP format conversion. No CLI image-generation fallback was used. Text and visual appearance were checked against the references; these are edited raster derivatives, not replacement vector originals.

### VIP edit prompt

Background extraction only. This is an existing official VIP Graduate certification recognition seal. Remove only the exterior white background, including white gaps outside and between the gold ribbon and seal edges. Output an HD transparent PNG cutout with a tight margin, retaining the complete seal and both ribbons. Preserve the original artwork exactly: gold shading, edge geometry, all colors, typography, and exact lettering NATIONAL CENTER / VIP / Veteran Institute for Procurement / GRADUATE. Preserve white inside the central letter I as part of the logo. Do not redesign, redraw, reinterpret, add, remove or change any text or symbol. No background, no fake checkerboard, no extra shadows.

### NSAI edit prompt

Use case: background extraction of an official certification mark. Remove only all white paper/background pixels and excess blank page margins. Preserve the complete black NSAI certification artwork exactly, including the thin enclosing rectangular black frame, the eye-like NSAI emblem and its small detached detail, the horizontal rule, and all lettering. Exact text: QUALITY / ISO 9001:2015 / NSAI Certified. Keep the exact letter shapes, layout, relative sizes, black color, and frame aspect ratio from the reference. Export a high-resolution transparent PNG, tightly framed around the complete existing enclosing rectangle with a tiny transparent margin; all formerly white areas inside and outside the rectangle should be transparent. Do not redesign, restyle, add lettering, add shapes, or replace the logo. No backdrop, no checkerboard, no added shadows.

Layout: the NSAI mark sits alongside one grouped heading/description column; issuer metadata is pushed to the bottom of each equal-height business credential content area so the three rows align regardless of description length.

Validation: TypeScript and targeted ESLint pass; eight focused layout/accessibility tests pass. Browser measurements confirmed identical issuer top positions at 1440px and no overflow at 320px.
