# whyaz

A website about why we love living and working in Arizona: [why.az](http://why.az/). The illustrations on this site are drawn with HTML and CSS. Read more about it on meltmedia's blog: [Why WhyAZ?](http://blog.meltmedia.com/2013/08/why-whyaz/)

## Editing Content

Most site content is written in Jade templates which produce the site HTML.

Note that these aren't markdown files and the syntax and whitespace you use does matter quite a bit. See the [Jade documentation](http://jade-lang.com) to see how to use Jade.

## Editing CSS

This site uses [Stylus for preprocessing](http://learnboost.github.io/stylus/). Please follow the established indentation and commenting patterns.

### Declaration Order

Please use the following loose declaration order:

* Mixins
* Box-model properties
* Display and Positioning
* Backgrounds
* Borders
* Box Shadows
* Fonts and Colors
* Transforms
* Other

## Working Locally

Requires the [LiveReload browser plugin](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei).

```
npm install
npm install -g gulp
gulp
```

Navigate to [localhost:8080](http://localhost:8080).
