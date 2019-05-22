# Coolidge Corner

version: 2.0.0

## Description

A basic front-end kickstarter.

License: [MIT](https://choosealicense.com/licenses/mit/)

## Resources

* [Webpack guides](https://webpack.js.org/guides/)
* [NPM Docs](https://docs.npmjs.com/)
* [ESLint](https://eslint.org/), [ESLint-Prettier](https://www.youtube.com/watch?v=YIvjKId9m2c)
* [Prettier](https://prettier.io/)
* [Babel](https://babeljs.io/)
* [GIT](https://git-scm.com/), [GIT Atlassian](https://www.atlassian.com/git/tutorials)
* [Editorconfig](https://editorconfig.org/)
* [Pugjs](https://pugjs.org/api/getting-started.html)
* [JS](https://developer.mozilla.org/bm/docs/Web/JavaScript)
* [scss](https://sass-lang.com/)
* [Bootstrap](https://getbootstrap.com/)
* [jquery](https://jquery.com/)
* [Slick-slider](http://kenwheeler.github.io/slick/)

## Setup

## Dev Notes

* clone repo
* in root folder run `npm install` to install from package.js
* in root folder run `npm run build:dev` to get a build and start dev
* _src is the development working folder
* _dist is the distribution folder
* HTML / PUG:
  * in the _src/ folder
  * PUG files need to be registered in the webpack plugin section

  ```JS
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './_src/index.pug',
      hash: true,
      svgoConfig: {
        removeTitle: false,
        removeViewBox: true,
      },
    }),
* IMAGES in the _src/images folder
* SCSS:
  * in the _src/scss folder
  * all components are imported to app.scss
  * app.scss is imported to app.js so webpack can bundle it
  * scss bundle output is in _dist/css/
  * please use BEM [http://getbem.com/](http://getbem.com/) (note to self)
* JS:
  * in the _src/js folder
  * all libraries and components are imported to app.js
  * js bundle output is in _dist/js/app.bundle.js
* FONTS
  * in the _src/fonts folder
  * images folder will be copied to _dist
* PACKAGES
  * jquery
  * bootstrap
  * slick-carousel

Study package.json and webpack.config.js for more details.

### `npm run` scripts

* "watch": "webpack --watch --mode=development"
* "start": "webpack-dev-server --open --mode=development"
* "build:dev": "webpack --mode=development"
* "build:prod": "webpack --mode=production"
