# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Personal academic website for Siyang Jiang (PhD student, CUHK), served at https://siyang-jiang.github.io/ via GitHub Pages from the `master` branch. Pure static HTML + CSS — no build step, no JS framework, no tests.

## Running locally

Any static file server works. There is no Jekyll build despite the presence of `_config.yml` (see next section), so you don't need `bundle`/`jekyll serve`:

```
python3 -m http.server 8000      # then open http://localhost:8000
```

## Jekyll is intentionally disabled

`_config.yml` declares `theme: jekyll-theme-cayman`, but the empty `.nojekyll` file at the repo root tells GitHub Pages to **skip Jekyll processing entirely** and serve files as-is. Commit `79bec81` ("Fix GitHub Pages: Remove conflicting index.md and disable Jekyll") established this. Do not delete `.nojekyll`, do not add an `index.md`, and do not assume Jekyll layouts/includes/liquid tags will be processed — they will not.

## Page architecture (the non-obvious parts)

Five top-level pages share the same structure and must stay in sync:

- `index.html` — biography, news feed
- `publications.html` — publication list
- `awards.html`, `services.html`, `teaching.html`

Each page **duplicates** rather than shares:

1. **Inline `<style>` blocks** at the top with typography rules (`h1/h2/h3`, `p/ul/ol/table`, `.smaller-image`) and the `.nav-menu` styling. This duplication is deliberate — there is no shared partial mechanism because Jekyll is off. When editing CSS, edit each page that needs the change, or move the rule into `jemdoc.css` (the shared stylesheet).
2. **The `.nav-menu` block** linking to all five pages. The current page is marked with `class="active"`. Keep the list of links and their order identical across all five files.
3. **Google Analytics snippet** with the placeholder ID `G-XXXXXXXXXX`. Analytics is not actually wired up; treat the ID as a stub until a real one is set, and update it in every page at once if it is.

`jemdoc.css` is a modified jemdoc template and is the only stylesheet that is genuinely shared. Inline styles in each HTML file override it.

## Publication entries

Each publication in `publications.html` is one `<tr>` containing a styled `<div>` with: title, authors (the owner's name `<b>Siyang Jiang</b>` bolded, `*` denotes equal contribution), venue in italic, then a pipe-separated link row (PDF / Code / Slides / Poster / Project Page / Award). Match this format when adding entries — reviewers of the site notice formatting drift.

## Asset folder conventions

- `pic/` — profile photos and social icons used in the header (`my3.jpg`, `LinkedIn.png`, `google_scholar.png`, `github_s.jpg`)
- `indexpics/` — publication thumbnails (filename convention: `YYYY-venue-name.png`)
- `industrial/` — company/lab logos
- `poster/`, `slides/` — PDFs linked from publication entries
- `docs/assets/<project-slug>/` — per-project supplementary files (e.g. `docs/assets/lancelot/cover.pdf`)
- `CPCL/` — a self-contained project subpage built from the [richzhang/webpage-template](https://github.com/richzhang/webpage-template); it has its own `index.html` and `resources/` and is **not** styled with `jemdoc.css`. Treat any future `<project>/index.html` subpages as similarly self-contained.

## Deploying

Pushing to `master` deploys to GitHub Pages within ~1 minute. There is no preview/staging branch — verify locally before pushing. Commits in this repo conventionally use the message `Update Homepage`.
