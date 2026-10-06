
# The Bashor Lab Website — Maintenance Guide

Source code for the **Bashor Lab** website, live at **https://bashorlab.rice.edu**.

The site is built with [Astro](https://astro.build). Almost all text and listings (people, papers, contact info) live in plain JSON files, separate from the code. Most updates mean editing a JSON file and pushing to `main`. You do **not** need programming experience for day-to-day updates.

---

## Repository Quick Map

For routine maintenance you only need two places:

1. `public/`: files you upload (photos, paper PDFs, images).
2. `src/assets/content/`: the text and data shown on the site.

```text
.
├── .github/workflows/
│   └── deploy-release.yml     # Builds and deploys the site on every push to main
├── public/                    # FILE STORAGE (served as-is)
│   ├── avatars/               # Member & alumni photos
│   ├── pdfs/                  # Paper PDFs
│   └── images/                # Other linkable images (e.g. journal covers)
└── src/
    ├── assets/content/        # TEXT & DATA (edit these to update the site)
    │   ├── about.json         # "What we do" blurb
    │   ├── research.json      # Research section heading + themes
    │   ├── publications.json  # Publication list
    │   ├── members.json       # Current lab members ("Our Group")
    │   ├── alumni.json        # Alumni list (text only, no photos)
    │   ├── alumni_avatars.json# Photo gallery at the bottom of the Alumni page
    │   └── contact.json       # Email, phone, office address
    ├── content.config.ts      # Rules each JSON file must follow (see "Validation")
    └── components/            # Page sections (code); see "Things not in JSON"
```

---

## Ground Rules (read once)

- **Order on the page = order in the file.** Members, alumni, publications and research themes appear in the order they are listed in their JSON file. To reorder something, move its block.
- **Valid JSON only.** Use double quotes `"..."`, put a comma between blocks, and **no** comma after the last block in a list. A JSON mistake fails the build, and the live site keeps its previous version until you fix it.
- **Every `id` must be unique** within its file. Use lowercase words joined by hyphens, e.g. `"jane-doe"`.
- **File paths start with `/`** and point inside `public/`. For example, `public/avatars/Jane.png` is written `"/avatars/Jane.png"`. Paths are **case-sensitive** (`Jane.png` ≠ `jane.png`), and spaces in file names are best avoided.
- **External links must include `https://`.** Without it the link is treated as a page on our own site and breaks.
- **Line breaks:** in a member's `occupation` or `distinction`, type `\n` to start a new line, e.g. `"B.S. Chemistry, UT Austin\nM.S. Bioengineering, Rice University"`.

---

## Common Maintenance Tasks

### 1. Adding or Updating a Current Member

1. **Upload a photo** to `public/avatars/` (e.g. `Jane.png`). A square image works best, because it is cropped to a circle. If there's no photo yet, use the existing `/avatars/Placeholder.png`.
2. **Open** `src/assets/content/members.json` and add a block where you want them to appear:

```json
{
  "id": "jane-doe",
  "name": "Jane Doe",
  "occupation": "PhD Student - Bioengineering",
  "distinction": "B.S. Bioengineering, Rice University",
  "avatar": "/avatars/Jane.png"
}
```

All five fields are required. `occupation` is shown to the left of the photo and `distinction` (degrees or background) to the right.

### 2. Moving a Member to Alumni

The alumni page is a text table (**Name · Role · Now**) plus a separate photo gallery, so the member block needs a few changes:

1. **Cut** the person's block from `members.json` and **paste** it into `alumni.json` at the position you want.
2. **Delete the `"avatar"` line** (alumni entries have no photo field). Remember to remove the comma left dangling on the line above it.
3. Rewrite the two text fields:
   - `"occupation"`: the role they held **in the lab**, kept short, e.g. `"PhD, BioE"` or `"Undergrad, BioE, Rice"`.
   - `"distinction"`: **where they are now**, e.g. `"Postdoc, Boeynaems Lab, Baylor College of Medicine"`.
4. **Optional, add them to the photo gallery:** append to `alumni_avatars.json` (keep their photo in `public/avatars/`):

```json
{
  "name": "Jane Doe",
  "avatar": "/avatars/Jane.png"
}
```

A finished alumni entry looks like this:

```json
{
  "id": "jane-doe",
  "name": "Jane Doe",
  "occupation": "PhD, BioE",
  "distinction": "Scientist, Example Therapeutics"
}
```

### 3. Adding a Publication

1. **(Optional) Upload the PDF** to `public/pdfs/`, named `Year_Journal_Name(s)_Desc.pdf`:
   - `Journal`: abbreviated, no spaces (`Nature`, `NatBiotechnol`, `CurrOpinBiomedEng`).
   - `Name(s)`: first author's last name, plus any equal-contribution co-first authors.
   - `Desc`: a short keyword from the title.

   For example: `2026_Nature_Rai_OConnell_CLASSIC.pdf`. If the paper isn't hosted here, link to the publisher or DOI page instead.
2. **Open** `src/assets/content/publications.json` and add the entry **at the top** of the list (newest first, because file order = display order):

```json
{
  "id": "2026_nature_doe",
  "title": "Title of the research paper",
  "authors": "Jane Doe*, John Smith*, Caleb J. Bashor",
  "journal": "Nature",
  "year": "2026",
  "page": "640 (8057): 15-22",
  "url": "/pdfs/2026_Nature_Doe_Smith_GeneticDesign.pdf"
}
```

| Field | Required | Notes |
| :-- | :-- | :-- |
| `id` | yes | `year_journal_firstauthor`, lowercase, with spaces in the journal name replaced by `-`. Examples: `2025_science_yang`, `2024_curr-opin-biomed-eng_rai`. |
| `title`, `authors`, `journal` | yes | `authors` is shown exactly as typed. Mark equal contribution / co-corresponding authors with `*`. |
| `year` | yes | Text in quotes, e.g. `"2026"` (it can also be `"In Press"`). |
| `page` | yes | Volume/issue/pages or article number. Use `""` if not available yet; nothing is shown. |
| `url` | no | Local PDF (`"/pdfs/..."`) or external link (`"https://doi.org/..."`). Shown as the **PDF** icon. |
| `videoUrl` | no | Link to a video (YouTube, JoVE, …). Shown as the **video** icon. |
| `features` | no | Sub-bullets for press coverage, perspectives, covers (see below). |

**Press features / highlights.** Add a `features` list. Each item needs `text`; `url` is optional (without it the line is plain text). Links can be external or files in `public/`:

```json
"features": [
  {
    "text": "Perspective by A. Author in Science 363(6440): 531",
    "url": "/pdfs/2019_Science_Ng_Perspective.pdf"
  },
  {
    "text": "News & Views in Nature Biotechnology 37: 729",
    "url": "https://www.nature.com/articles/..."
  },
  {
    "text": "Featured on the cover of Nature Biotechnology",
    "url": "/images/nbt2018-cover.jpg"
  }
]
```

### 4. Updating General Text

**About** (`about.json`): the "What we do" heading and sentence.

```json
{
  "title": "WHAT WE DO",
  "description": "The goal of our work is to use synthetic regulatory circuits to reprogram the behavior of human cells."
}
```

**Research** (`research.json`): `mainTitle` is the section heading, and each item in `sections` is one block on the page. You can edit, add, remove or reorder them freely.

```json
{
  "mainTitle": "OUR RESEARCH",
  "sections": [
    {
      "heading": "Synthetic Regulatory Circuits",
      "content": "Our work explores the fundamentals of gene expression control..."
    }
  ]
}
```

**Contact** (`contact.json`). `email` must be a valid email address or the build fails.

```json
{
  "title": "CONTACT US",
  "email": "caleb.bashor@rice.edu",
  "phone": "(713) 348-8231",
  "address": "BRC 815, 6500 Main St., Rice University, Houston, TX 77030"
}
```

### 5. Things Not in JSON

A few items are written directly in the code. Edit them carefully and preview before pushing:

| What | Where |
| :-- | :-- |
| Instagram / GitHub / X links, menu items | `src/components/Navbar.astro` (`socialLinks`, `navLinks`) |
| "WELCOME TO THE BASHOR LAB" typewriter title | `src/components/Navbar.astro` (`const text = ...`) |
| "Find more publications on PubMed" link | `src/components/Publications.astro` |
| Section headings "PUBLICATIONS", "OUR GROUP", "OUR ALUMNI" | `Publications.astro`, `Members.astro`, `Alumni.astro` in `src/components/` |
| Browser tab titles | `src/pages/index.astro`, `src/pages/alumnipage.astro` |
| Backgrounds, icons, fonts | `src/assets/` (images) and `src/fonts/` |

---

## Validation

`src/content.config.ts` defines the required fields and types for every JSON file except `alumni_avatars.json`. The build checks every entry against these rules, and if anything is missing or the wrong type it **fails** with a message naming the file and field. A failed build never reaches the live site. If you want to add a **new field**, it must be added to `content.config.ts` (and to the component that displays it), or it is silently ignored.

---

## Previewing Locally (recommended for anything beyond a typo)

**Prerequisite:** [Node.js](https://nodejs.org) version **22.12 or newer**.

```bash
npm install        # first time only
npm run dev        # live preview at http://localhost:4321, updates as you save
```

Before pushing, run a production build. This is the same check GitHub runs:

```bash
npm run build      # validates all JSON and builds to ./dist/
npm run preview    # (optional) view the built site
```

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local dev server at `localhost:4321` |
| `npm run build` | Validate content and build the production site to `./dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run astro check` | Type/diagnostics check |

**No local setup?** You can edit JSON files directly on github.com (pencil icon) and upload photos/PDFs with **Add file → Upload files**. Committing to `main` publishes immediately, so double-check commas and quotes. Then follow the deployment in the **Actions** tab.

---

## Deployment (Going Live)

The site is hosted on **GitHub Pages** and served at the custom domain **bashorlab.rice.edu**. There is no separate server to upload to.

1. **Commit and push to `main`.** Every push to `main` publishes, so only push finished changes.
2. **GitHub Actions builds and deploys** automatically (`.github/workflows/deploy-release.yml`). Follow progress under the repository's **Actions** tab.
3. **Live in a few minutes** at https://bashorlab.rice.edu. Hard-refresh (Cmd/Ctrl + Shift + R) if you still see the old version.

If the run shows a **red ✗**, the build failed and the live site still shows the previous version. Open the failed run, read the error (usually a JSON typo or a missing field), fix it, and push again. To redeploy without changes, use **Actions → Build, Release, and Deploy Astro Site → Run workflow**.

> The workflow also creates a GitHub **Release** with a `.zip` of the build on every push. This is a leftover from an older hosting setup and is **not** needed for deployment. You can ignore it.

The custom domain is configured in the repository's **Settings → Pages**, not in a file in this repo.

---

## Troubleshooting

| Symptom | Likely cause |
| :-- | :-- |
| Build fails with a schema/validation error | A required field is missing or misspelled, or `email` is invalid. The error names the file and entry. |
| Build fails with "Unexpected token" / JSON parse error | Missing or extra comma, or a missing quote/bracket. |
| Photo doesn't show | Path doesn't match the file name exactly (case!), or the path is missing the leading `/avatars/`. |
| PDF/feature link gives "page not found" | File isn't in `public/pdfs/` with that exact name, or an external link is missing `https://`. |
| New member/paper appears in the wrong spot | Order follows the JSON file. Move the block. |
| Change pushed but site unchanged | Check the Actions tab for a failed run, then hard-refresh the browser. |
