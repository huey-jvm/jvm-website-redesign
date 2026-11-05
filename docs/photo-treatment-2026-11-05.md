# Temporary imagery and photo treatment

User requested existing assets for missing image areas and a more eye-catching treatment. Local only.

- Health IT: existing medical-modeling visit photograph (`quality-team-enhanced.png`). Caption identifies a team visit, not proof of an IT engagement.
- Logistics: existing group visit photograph (`team-visit.webp`), used as people/context imagery.
- Facilities: supplied `Image (2).jfif`, copied unchanged to `public/images/revision/facility-exterior.jpg`. Caption identifies a location in the archive; no assertion that JVM manages that building.
- Healthcare, management, careers, About and Quality retain their existing client photographs.
- Huey, Jasmine and Karen still have no identified portraits. Other people's faces have not been substituted for theirs.

These temporary service assignments are centralized in `content/assets.ts` for replacement when dedicated work photographs arrive. Existing factual illustrations, logos, certificates and the full-bleed homepage hero are retained.

Visual treatment: asymmetric feature frames with a gold offset, alternating service-image corners, arched leadership portraits and subtle depth. Faces and source pixels are unchanged. No image zoom/parallax added; existing gallery hover zoom removed.

Checks: production build and ESLint passed; five mobile interaction checks passed. Visually reviewed representative services, About/portraits and hero layouts at 390px and 1280px, with no horizontal overflow in those checks. Review captures are in the parent workspace's `tmp/photo-pass/`.
