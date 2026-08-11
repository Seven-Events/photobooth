# Gallery photos

Every file here is listed explicitly in the `shots` array in
`app/(public)/gallery/page.tsx`, each with an `alt` description and its
intrinsic `w`/`h`. **Dropping a file into this folder does not add it to the
page** — add an entry to that array too. The width and height are used to
reserve layout space, so they must match the actual file.

Four of these also appear in the "Recent work" strip on the home page
(`featured` array) and `guest-at-booth.webp` is the home page hero.

## Adding a photo

1. Export as `.webp`, ~1400–1600px on the long edge, quality ~82.
2. Give it a descriptive name (`gala-guests-pair.webp`, not `IMG_2841.webp`).
3. Add it to `shots` with a real `alt` describing what is in the frame.

Print-strip images are tall (1:3) — the masonry layout handles that, no special
casing needed.

Originals are kept in `source-photos/` at the repo root.
