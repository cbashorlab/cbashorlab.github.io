# Bashor Lab Website Source Code

The source code for the [Bashor Lab website](https://cbashorlab.github.io/).

The website is built using [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), which is build based on [MkDocs](https://www.mkdocs.org/) that converts markdown files into website that is deployable.

## Build Instructions

### Setting up

- Ideally, setup a virtual environment specifically for MkDocs with conda
- Install [MkDocs](https://www.mkdocs.org/)
- Install [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- Clone the repository to your local directory:
  
  ```bash
  git clone git@github.com:cbashorlab/cbashorlab.github.io.git
  ```

### Update content

- Update Markdown files in `docs` folder
- Add in extra document, image, pdfs, css, javascript files as needed
- Update configurations in `mkdocs.yml`
- Preview the website on localhost:
  
  ```bash
  mkdocs serve
  ```

### Deploy website

- Use following command to automatically build and deploy website to GitHub:
  
  ```bash
  mkdocs gh-deploy
  ```
