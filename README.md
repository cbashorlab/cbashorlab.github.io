
# The Bashor Lab Website — Maintenance Guide

The source code for the  **The Bashor Lab** website. This site is built using **Astro**, meaning almost all text and listing data are decoupled from the code and managed via straightforward JSON files.

You do **not** need advanced programming knowledge to keep this site updated! Follow this guide to handle day-to-day updates smoothly.

---

## Repository Quick Map

For maintenance, you only need to focus on two core directories:

1. `public/` — Where you upload files like images (avatars) and PDF research papers.
2. `src/assets/content/` — Where you update the text and structural data for the site.

```text
.
├── .github/workflows/
│   └── deploy-release.yml   # Automates site deployment on Git push
├── public/                  # FILE STORAGE
│   ├── avatars/             # Put member & alumni photos here
│   └── pdfs/                # Put research paper PDFs here
└── src/assets/content/      # TEXT & DATA (Edit these to update the site)
    ├── about.json           # Lab description text
    ├── alumni.json          # List of graduated lab members
    ├── contact.json         # Email, phone, and office address
    ├── members.json         # Current lab members list
    ├── publications.json    # Published papers & external links
    └── research.json        # Main research themes and blurbs

```

---

## Common Maintenance Workflows

### 1. Adding or Updating a Current Team Member

1. **Upload their Photo:** Save their avatar image inside `public/avatars/` (e.g., `Sarah.png`).
2. **Update the Data:** Open `src/assets/content/members.json`.
3. Add a new block at the bottom using this template (ensure you add a comma `,` after the previous block):

```json
{
  "id": "john-her",
  "name": "John Her",
  "occupation": "PhD Student - Bioengineering",
  "distinction": "B.S. Bioengineering, Rice University",
  "avatar": "/avatars/Sarah.png"
}

```

>  **Note:** The `avatar` path *must* start with `/avatars/` and match your image filename exactly (case-sensitive).

### 2. Moving a Member to Alumni

1. Open `src/assets/content/members.json`, find their block, and **cut** it out.
2. Open `src/assets/content/alumni.json` and **paste** their block into the list.
3. Update their `"occupation"` or `"distinction"` if their title has changed post-graduation.

### 3. Adding a New Publication

1. **Upload the PDF:** Put the paper's PDF file into `public/pdfs/` (e.g., `2026_Jenkins_Nature.pdf`).
2. **Update the List:** Open `src/assets/content/publications.json`.
3. Add a new entry. The site supports three variations depending on the paper's media elements:

#### Standard Paper Entry:

```json
{
  "id": "11",
  "title": "Title of the research paper goes here",
  "authors": "John Her, Zheng Diao, Caleb J. Bashor",
  "journal": "Nature",
  "year": "2026",
  "page": "15-22",
  "url": "/pdfs/2026_Her_Nature.pdf"
}

```

#### Entry with an external Video Link:

Add a `"videoUrl"` property targeting YouTube, JoVE, or any other hosting site:

```json
  "url": "/pdfs/Her_Science_2019.pdf",
  "videoUrl": "https://www.youtube.com/..."

```

#### Entry with Press Features / News Highlights:

Add a `"features"` array to include sub-links highlighting secondary coverage:

```json
  "features": [
    {
      "text": "Perspective by Mike May in Nature",
      "url": "/pdfs/Nature_Perspective.pdf"
    },
    {
      "text": "News & Views Feature in Nature Biotechnology",
      "url": "https://www.nature.com/articles/..."
    }
  ]

```

### 4. Updating General Text (About, Contact, Research)

#### About Text

Modify `about.json` to change the core lab mission statement.

```json
{
  "title": "The Bashor Lab (What we do)",
  "description": "We use synthetic biology approaches to design, build, and test artificial regulatory programs in human cells. This not only provides insight into the design logic of natural regulation, but also allows us to predictively alter cellular phenotype to create powerful cell-based biotechnologies."
}

```

#### Contact Details

Modify `contact.json` if office phone numbers, emails, or room locations change.

```json
{
  "title": "CONTACT US",
  "email": "caleb.bashor@rice.edu",
  "phone": "(713) 348-8231",
  "address": "BRC 815, 6500 Main St., Rice University, Houston, TX 77030"
}

```

#### Research Pillars

Modify `research.json`. You can rewrite descriptions or change the `heading` keys to instantly update the research theme blocks on the front page.

```json
{
  "mainTitle": "OUR RESEARCH",
  "sections": [
    {
      "heading": "Synthetic Regulatory Circuits",
      "content": "Our work explores the fundamentals of gene expression control in mammalian cells. By leveraging multi-scale regulatory control, we can engineer stable, precise control over complex multi-gene expression programs that can both report on and reprogram cellular function."
    },
    ...
  ]
}

```

---

## Technical Setup & Local Testing

If you want to view your changes locally on your computer before pushing them live:

### Prerequisites

Make sure you have Node.js installed on your machine.

### Instructions

1. Clone the repository and navigate into the project folder.
2. Install dependencies:
```bash
npm install

```


3. Start the local development server:
```bash
npm run dev

```


4. Open `http://localhost:4321` in your browser to see your live changes as you save files.
5. To test a production-ready build locally, run:
```bash
npm run build
npm run preview

```
### Astro JS Commands
All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

---

## Deployment (Going Live)

The deployment pipeline is fully automated using GitHub Workflows.

1. **Commit and Push:** Once you've completed your edits (either locally or directly on GitHub), commit your changes and sync/push them to the `main` branch.
2. **Automated Build:** Pushing to `main` instantly triggers a GitHub Action (`deploy-release.yml`).
3. **Download Package:** Go to the **Releases** page of your GitHub repository. You will see a newly generated release containing a downloadable `.zip` file of your compiled website.
4. **Server Upload:** Download that generated `.zip` artifact from the releases page and upload its extracted contents to your web hosting server.
