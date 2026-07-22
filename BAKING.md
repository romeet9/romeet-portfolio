# Baking the halftone card fields

The halftone fields behind the KPI, project, case study and vibe cards are
**pre-rendered images**, not live shaders.

## Why

They were `@paper-design/shaders-react` `HalftoneDots` instances. Every one was
`speed={0}` — a fixed image drawn through a WebGL pipeline — and the overview ran
**nine at once**:

| | |
|---|---|
| Source textures, decoded per context | ~37 MB (`halftone-1.avif` is 210KB on disk, **1000×1500 → 5.7MB** decoded) |
| 9 framebuffers at 500–900px | ~23 MB |

~60MB of GPU memory on one page. Mobile browsers reclaim WebGL contexts under
that pressure and re-initialise them later, so cards would blank out and come
back while scrolling. Baking removes WebGL from the site entirely: **0 contexts**,
nothing to evict, nothing to pop in.

## Re-baking after a design change

Whenever a field's look changes in Paper, update the config and re-bake. **A
stale bake silently ships the old design** — this is the one maintenance cost of
the approach.

1. Update the matching entry in `app/shader-bake/bake-board.tsx` (`BAKES`). That
   file is the source of truth for every shader's params.
2. Run the dev server: `npm run dev`.
3. For each name in `BAKES`, screenshot its target. The route renders one surface
   at a time, pinned top-left, so it is always fully in view:

   ```
   browse viewport 900x950          # targets are up to 776px tall
   browse goto 'http://localhost:3000/shader-bake?only=<name>'
   # wait ~4s for the shader to paint, then:
   browse screenshot /tmp/<name>.png --selector '[data-bake]'
   ```

4. Convert to JPEG and drop into `public/baked/`:

   ```
   sips -s format jpeg -s formatOptions 82 /tmp/<name>.png --out public/baked/<name>.jpg
   ```

5. If you add or remove a field, update `BAKED` in `components/halftone.tsx` —
   the preloader waits on `BAKED_SRCS`, so a missing entry means that image is
   not preloaded.

### Notes

- **Viewport must exceed the tallest target.** The bake route inherits the root
  layout; if a target is taller than the viewport, the overflow is captured as
  page background with the header and dock painted into the image.
- **JPEG, not WebP.** No WebP encoder is available locally (`ffmpeg` here has no
  `libwebp`, `sips` cannot write it). The bakes are fully opaque, so JPEG costs
  nothing in quality terms. Total is ~918KB for all ten.
- The source images in `public/kpi/` are **bake inputs only**. No page requests
  them at runtime; they are kept so the fields can be regenerated.
- `/shader-bake` returns 404 outside development, so it never ships.
