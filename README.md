# Bashor Lab Website Source Code

The source code for the [Bashor Lab website](https://cbashorlab.github.io/).

The website is built using [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), which is build based on [MkDocs](https://www.mkdocs.org/) that converts markdown files into website that is deployable.

## Making Quick Changes Online

To make quick changes to the content of the website, you can directly edit the markdown (`.md`) files in [`./docs`](./docs/) folder online. Save and commit once you made the edits.

See [below](#build-instructions) for making significant changes, with preview on your local machine.

## Build Instructions

### Setting up

- Ideally, setup a virtual environment specifically for MkDocs with conda ([Miniconda](https://docs.anaconda.com/miniconda/install/) or [Anaconda](https://docs.anaconda.com/anaconda/install/) required):

  ```bash
  conda create -n mkdocs python
  conda activate mkdocs
  ```

- Install [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/):

  ```bash
  pip install mkdocs-material
  ```

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
