# Bashor Lab Website Source Code

The source code for the [Bashor Lab website](cbashorlab.github.io).

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

- Update Markdown files in `src/docs` folder
- Add in extra document, image, pdfs, css, javascript files as needed
- Update configurations in `src/mkdocs.yml`
- Preview the website on localhost:
  
  ```bash
  cd src
  mkdocs serve
  ```

### Deploy website

- Change directory to `src`:
  
  ```bash
  cd src
  ```

- Build website into `docs` directory (not `src/docs`):
  
  ```bash
  mkdocs build -d ../docs
  ```

- Commit and push
