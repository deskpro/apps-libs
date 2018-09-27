# Deskpro Apps

[![Build Status](https://travis-ci.org/deskpro/apps-libs.svg?branch=master)](https://travis-ci.org/deskpro/apps-libs)
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://github.com/deskpro/react-components/blob/master/LICENSE)


This monorepos contains three packages:

* [`@deskpro/apps-components`](https://www.npmjs.com/package/@deskpro/apps-components) are ReactJS components you should use in your apps
* [`@deskpro/apps-components-style`](https://www.npmjs.com/package/@deskpro/apps-components-style) is the pure CSS implementations of components.
* [`@deskpro/apps-sdk`](https://www.npmjs.com/package/@deskpro/apps-sdk) contains basic functionality for hooking up apps in the Deskpro interface

See also [@deskpro/apps-react-scripts](https://github.com/deskpro/apps-create) which is a fork of create-react-app.

# Developing

This is a [Lerna](https://github.com/lerna/lerna) repository. These packages reference eachother, and `lerna` helps you keep links between your local copies of these packages.

* If you change `package.json` (e.g. add or remove a package), run `lerna bootstrap` to re-link all dependencies.
* Upon first checkout, use `lerna bootstrap` to install dependencies in all packages.

Note that any time you run `npm install` inside of a package, the local links will be removed, so it's critical you run `lerna bootstrap` afterwards to put the links back. If you run into weird issues, it's probably because a package is using something from npm instead of your lcoal copy, and running bootstrap will fix it.

## Example

```
git clone git@github.com:deskpro/apps-libs.git
cd apps-libs
lerna bootstrap
cd packages/apps-sdk
npm run dev
```

## Example local development on all packages

If you're developing an app with [@deskpro/apps-react-scripts](https://github.com/deskpro/apps-create), you'll bascially want to link all of these packages so you can develop all of them locally.

```
cd /my/dev/home/dir

# You need to tell npm to link these packages.
# This only needs to be done once.
(cd apps-libs/packages/apps-components; npm link)
(cd apps-libs/packages/apps-sdk; npm link)
(cd apps-create; npm link)

# And then here you're getting your app to actually use those linked packages.
# You need to do this whenever you update npm deps because any change to node_modules removes the local links
cd my-app/
npm link @deskpro/apps-components
npm link @deskpro/apps-sdk
```

## Be sure to build

When you link like this, it's literally creating a link on in your filesystem to your local dir.

```
~/dev/my-app/node_modules/@deskpro/apps-sdk -> ~/dev/apps-libs/packages/apps-sdk
```

Since your app is going to be importing code from this package, the package must actually be _built_. Building the package happens during `lerna bootstrap` automatically, but as you make changes, you need to keep the build up to date. You can do this either by building manually yourself, or with the `dev` command.

```
$ npm run dev
rollup v0.63.4
bundles src/index.js → lib/apps-sdk.js...
created lib/sdk-core.js in 2.5s

[2018-07-25 14:59:07] waiting for changes...
```

`dev` creates a watcher process which auto-builds whenever you save a file in the project. Each package in this repos has a `dev` command. You can run dev on all projects like this:

```
$ lerna run --parallel dev
...
```
