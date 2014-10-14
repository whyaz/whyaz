# WhyAZ

A website about why we love living and working in Arizona: [why.az](http://why.az/). The illustrations on this site are drawn with HTML and CSS. Read more about it on meltmedia's blog: [Why WhyAZ?](http://blog.meltmedia.com/2013/08/why-whyaz/)

## Contributing

Help make WhyAZ even better.

Please feel free to [submit an issue](https://github.com/meltmedia/whyaz/issues) with ideas, comments, or additional content to add. Or comment on any existing issues to keep the conversation going.

If you would like to contribute via pull request, please follow the editing guidelines below.

### What kind of content?

Submit any reasons you love Arizona: cool places to eat, drink, or visit, fun facts about the state or its cities, or anything else you think would be interesting. Our main purpose is to share with the world the many reasons we think Arizona is a great place to live, work, and visit.

## Editing Content

Most site content is written in Jade templates which produce the site HTML.

The Jade files are located in `/src/templates`.

Note that these aren't markdown files and the syntax and whitespace you use does matter quite a bit. See the [Jade documentation](http://jade-lang.com) to see how to use Jade.

## Editing CSS

This site uses [Stylus for preprocessing](http://learnboost.github.io/stylus/). Please follow the established indentation and commenting patterns.

Stylus files are located in `/src/styl`.

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
