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

- The Bashor Lab website ([cbashorlab.github.io](https://cbashorlab.github.io/)) is automatically updated with [GitHub Actions](https://github.com/features/actions), which triggers an automatic update once it receives a push on `main` branch. The automatic GitHub Actions builds and deploys the website on `gh-pages` branch.
- If you wish to obtain a deployable version of the website, you can either:
  - Clone the `gh-pages` branch, or
  - Use following command to build on the local machine:
  
    ```bash
    mkdocs gh-deploy
    ```
