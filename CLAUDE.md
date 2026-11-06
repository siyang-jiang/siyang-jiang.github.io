# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Personal academic website for Siyang Jiang (Postdoctoral Fellow, CUHK), served at https://siyang-jiang.github.io/ via GitHub Pages from the `master` branch. Pure static HTML + CSS — no build step, no JS framework, no tests.

## Running locally

Any static file server works. There is no Jekyll build despite the presence of `_config.yml` (see next section), so you don't need `bundle`/`jekyll serve`:

```
python3 -m http.server 8000      # then open http://localhost:8000
```

## Jekyll is intentionally disabled

`_config.yml` declares `theme: jekyll-theme-cayman`, but the empty `.nojekyll` file at the repo root tells GitHub Pages to **skip Jekyll processing entirely** and serve files as-is. Commit `79bec81` ("Fix GitHub Pages: Remove conflicting index.md and disable Jekyll") established this. Do not delete `.nojekyll`, do not add an `index.md`, and do not assume Jekyll layouts/includes/liquid tags will be processed — they will not.

## Page architecture (the non-obvious parts)

Six top-level pages share the same structure and must stay in sync:

- `index.html` — biography, news feed
- `publications.html` — publication list
- `awards.html`, `services.html`, `teaching.html`
- `projects.html` — CUHK-X overview, related publications, and links to the project resources

Each page **duplicates** rather than shares:

1. **Inline `<style>` blocks** at the top with typography rules (`h1/h2/h3`, `p/ul/ol/table`, `.smaller-image`) and the `.nav-menu` styling. This duplication is deliberate — there is no shared partial mechanism because Jekyll is off. When editing CSS, edit each page that needs the change, or move the rule into `jemdoc.css` (the shared stylesheet).
2. **The `.nav-menu` block** linking to all six pages, with Projects after Teaching. The current page is marked with `class="active"`. Keep the list of links and their order identical across all six files. Shared CSS supplies the vertical separators and keeps each link together when the navigation wraps.
3. **Traffic counter** — `index.html` loads a ClustrMaps script; there is no Google Analytics on any page. If analytics is ever added, add it to every page at once.

`jemdoc.css` is a modified jemdoc template and is the only stylesheet that is genuinely shared. Inline styles in each HTML file override it.

## Publication entries

`publications.html` shows **Selected Papers**, an adjacent unlabeled visual switch, and **Full List ↗** above one shared publication table. With the switch off, only the curated entries (`data-selected="true"`) appear; with it on, all published first-author and co-first-author entries appear sorted by `data-year` descending. The switch has an accessible name for screen readers. `publications.js` synchronizes the switch and URL hashes (`#selected` / `#representative`), so existing links, reloads, and browser history preserve the chosen view. Full List links to Google Scholar. Keep authorship and year attributes in sync with the CV by hand. Only the CUHK-X entry should have a Code link. The CV is deliberately *not* published here — do not add a CV PDF or link one without being asked.

Each entry is one `<tr>` containing a `<div class="pub-card">` with `.pub-title`, `.pub-authors` (the owner's name `<b>Siyang Jiang</b>` bolded, `*` denotes equal contribution), `.pub-venue` in italic, then a pipe-separated link row (PDF / Code / Slides / Poster / Project Page / Challenge / Award) and an optional `.pub-media` span for press coverage. The card styling lives in the page's own `<style>` block, not inline on each card. Match this format when adding entries — reviewers of the site notice formatting drift.

Project repos live under the **`openaiotlab`** GitHub org (e.g. `openaiotlab/CUHK-X`), not under `siyang-jiang`; most personal-account repos are private, so verify a URL resolves before linking it.

## Asset folder conventions

- `pic/` — profile photos and social icons used in the header (`my3.jpg`, `LinkedIn.png`, `google_scholar.png`, `github_s.jpg`)
- `indexpics/` — publication thumbnails (filename convention: `YYYY-venue-name.png`)
- `industrial/` — company/lab logos
- `poster/`, `slides/` — PDFs linked from publication entries
- `docs/assets/<project-slug>/` — per-project supplementary files (e.g. `docs/assets/lancelot/cover.pdf`)
- `CPCL/` — a self-contained project subpage built from the [richzhang/webpage-template](https://github.com/richzhang/webpage-template); it has its own `index.html` and `resources/` and is **not** styled with `jemdoc.css`. Treat any future `<project>/index.html` subpages as similarly self-contained.

## Deploying

Pushing to `master` deploys to GitHub Pages within ~1 minute. There is no preview/staging branch — verify locally before pushing. Commits in this repo conventionally use the message `Update Homepage`.
