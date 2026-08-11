# Booth product photos

Served on `/packages` and in the "Three booths" grid on the home page.

| File | Booth |
| --- | --- |
| `snap-booth.webp` | Snap Booth |
| `oak-booth.webp` | Oak Booth |
| `mod-booth.webp` | Mod Booth |

Each shot has a flat studio backdrop baked in, so the panel behind it is tinted
to match. Those colours live in `panelBg` in `app/(public)/packages/page.tsx`
and in the `booths` array on the home page. **If you replace a shot with one
that has a different backdrop, update `panelBg` to match** or you will see a
visible rectangle behind the booth.

To swap one out: export at roughly 1000px on the long edge, save as `.webp`,
and keep the filename. A missing file falls back to a dashed placeholder frame
rather than a broken image, so a partial upload is safe.

Originals are kept in `source-photos/` at the repo root.
