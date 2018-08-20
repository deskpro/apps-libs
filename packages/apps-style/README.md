Deskpro Apps
============

CSS Styling for Deskpro Apps.

**[View Documentation and Examples](https://deskpro.github.io/apps-libs/style)**

Goals:

* Clean component CSS.
* Components should be usable in any context on any page, even if the page has other global CSS.
* Each component must be self-contained and not rely on any other components. i.e. it should be possible to import a single component CSS file and use it without importing anything else in the library.

Non-goals:

* We are not trying to be a themeing library. i.e. we are not trying to go out of our way to allow customisation, custom variables, etc.


Development
-----------

Summary:

* Run `npm install`
* Run `npm run dev`
* Open `http://localhost:3000/apps-style/` in your browser
* Edit CSS files in `src/` and docs in `docs/`. As you edit files, the docs site above will live reload.

### Prepare

* You need `node` and `npm` installed on your computer
* Run `npm install` to initialize dependencies

### Development

To start with, run `npm run dev` to start the built-in dev server. This should open your browser at `http://localhost:3000/apps-style/` with the documentation site.

As you modify CSS files in `src/` and markdown documentation files in `docs/`, your browser will live relaod. This makes for a really fast and smooth dev experience.

Here's an example. Say you're working on buttons:

* In your editor, open `src/components/buttons.css` and `docs/components/buttons.md`
* In your browser, open `http://localhost:3000/apps-style/docs/components/buttons.html`
* As you change `buttons.css`, update `buttons.md` documentation and examples. Your browser will live-reload as you go.

Project Structure
-----------------

CSS is being post-processed with [PostCSS](https://postcss.org/) with the [postcss-preset-env](https://preset-env.cssdb.org/) which enables a bunch of proposed CSS features like variables. We use [Stage 0 features](https://preset-env.cssdb.org/features).

The general idea is to stay as close to "normal CSS" as we can. i.e. we want to avoid using programming logic like loops, which is why we have avoided SASS or LESS. PostCSS offers just enough convenience (e.g. nested selectors) without going overboard.

This project is linted with [stylelint](https://stylelint.io/) and a [SUIT linter plugin](https://github.com/postcss/postcss-bem-linter). Refer to the documentation if you run into issues or need to tweak the config in some way.

### Conventions

* You MUST use [SUIT nameing conventions](https://github.com/suitcss/suit/blob/master/doc/naming-conventions.md) in this project.
* You MUST use the `dp-` namespace on all components.
  * Modifiers on the component don't include the namespace. E.g. it would be `.dp-Button.Button--warning`.
* You MUST NOT define global styles or global resets.
* You MUST define 1 CSS file per element or component. The goal is to design components that can be used as-is in isolation.
* Each component MUST be completely self-defined. i.e. 1 component (aka 1 CSS file) MUST contain ALL the code necessary for that specific component. In other words, your component must not rely on external CSS code from other files or global styles.
* Each component MUST include basic styles such as fonts, sizes, etc. This project uses an auto-reset plugin which resets style properties on all components to defaults. This reduces the chance of some rogue global CSS elsewhere on the page causing a visual glitch in our components.
* Each component MUST have documentation in `docs/` that describe and demonstrate the component and any of its modifiers.

Documentation Files
-------------------

The documentation pages in `docs/` serve as your "development playground" while you make changes to CSS, but by the time you finish a component, it should also serve as real documentation too.

Documentation is written in Markdown. There are two special bit of fenced HTML:

* Fenced code with the language `html @preview` will render the HTML code to the browser screen and show a "toggle code" button that you can click to show the source code. **This is what your examples should be written in**.
* Fenced code with the language `html @render` is similar, except there is no button to show the source code. So this is an escape-hatch for (rare) cases you need to render arbitrary HTML.

Most of your documentation will be written with examples in `html @preview` fenced blocks. For example:

```markdown
    ```html @preview
    <button class="dp-Button">Default</button>
    <button class="dp-Button Button--primary">Primary</button>
    <button class="dp-Button Button--warning">Warning</button>
    ```
```

This results in three buttons being rendered to the page with "toggle code" button that will reveal that exact source code. So this is perfect for documentation to show off how to use code.

### Creating new docs

When you start a new component you'll need to create a new docs file for it:

1) Create a new Markdown file in `docs/components/my-component.md`. Here's an example:

```markdown
    ---
    title: My Component
    ---

    # My Component

    This is my great component.

    ```html @preview
    <div class="dp-MyComponent">
        Here's an example!
    </div>
    ```
```

This new file maps directly to the URL `http://localhost:3000/apps-style/docs/components/my-component.html`

2) To have the file listed in the sidebar, modify `website/sidebars.json` and add it.
