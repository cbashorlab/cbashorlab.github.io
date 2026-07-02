# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Static marketing/landing site for The Bashor Lab (synthetic biology lab at Rice University), built with Astro 6 and Tailwind CSS 4. Content is decoupled from code: all text and listings live in JSON files validated by Astro Content Collections, so most updates are JSON edits, not code changes. Requires Node >= 22.12.0.

## Commands

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Production build to `./dist/` (also runs content schema validation) |
| `npm run preview` | Preview the production build locally |
| `npm run astro check` | Type/diagnostics check |

There is no test suite or linter configured. `npm run build` is the main correctness gate — it fails if any JSON in `src/assets/content/` violates its Zod schema.

## Architecture

- **Content is data, not code.** Each section's text lives in `src/assets/content/*.json`. `src/content.config.ts` is the single source of truth: it defines Zod schemas and loaders for six collections (`publications`, `members`, `alumni`, `about`, `research`, `contact`). When changing a content shape, update the schema there or the build breaks. `members` and `alumni` share an identical schema by design (moving a member to alumni = moving their JSON block between files).

- **Components render collections at build time.** Each `src/components/*.astro` calls `getCollection(...)` in its frontmatter (server-side, build-time only — no client data fetching). `src/pages/index.astro` composes the single-page site by stacking Hero/About/Research (inside a shared fixed-GIF background wrapper) then Publications/Members/Contact. `src/pages/alumnipage.astro` is a separate route.

- **Asset path convention.** User-uploaded files (member avatars, paper PDFs) go in `public/` and are referenced by root-relative paths like `/avatars/Name.png` in JSON. Components prefix these with `import.meta.env.BASE_URL` to support GitHub Pages sub-path serving — preserve this pattern when adding `<img>`/links to public assets. Build-time-optimized assets (backgrounds, icons, fonts) live in `src/assets/` and are imported in component frontmatter.

- **Fonts** are local TTFs registered in `astro.config.mjs` via Astro's font provider, exposed as CSS variables `--press-start-2p` and `--orange-kid` (used as Tailwind `font-press-start-2p` / `font-orange-kid`). The retro pixel/arcade aesthetic is intentional.

- **Tailwind 4** is wired through the Vite plugin in `astro.config.mjs` (not a `tailwind.config.js`). Global styles are in `src/styles/global.css`.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy-release.yml`, which builds twice: once deployed live to GitHub Pages, and once zipped as a downloadable GitHub Release asset (tagged with the commit SHA) for manual upload to an external host. Do not push to `main` casually — every push publishes.
