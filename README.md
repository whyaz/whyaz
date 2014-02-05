# whyaz

A website about why we love living and working in Arizona. The illustrations on this site are drawn with HTML and CSS. Read more about it on meltmedia's blog: [Why WhyAZ?](http://blog.meltmedia.com/2013/08/why-whyaz/)

## Getting Started

1. [Install DocPad](https://github.com/bevry/docpad)

1. Clone the project and run the server

  ``` bash
  git clone git@github.com:lynnandtonic/portfolio-template.git
  cd portfolio-template
  npm install
  docpad run
  ```

1. [Open http://localhost:9778/](http://localhost:9778/)

1. Start hacking away by modifying the `src` directory

### Plugins

This template uses [the DocPad Handlebars plugin](https://github.com/docpad/docpad-plugin-handlebars). To install:

  ```
  npm install --save docpad-plugin-handlebars
  ```

It also uses [the DocPad Sass plugin](https://github.com/docpad/docpad-plugin-sass). To install:

1. [Install Ruby](http://www.ruby-lang.org/en/downloads/)

1. [Install the SASS gem](http://rubygems.org/gems/sass/)

1. [Optional: Install the Compass gem](http://rubygems.org/gems/compass/)

1. Install this plugin

  ```
  docpad install sass
  ```

## Production Build

    docpad run --env=production

or

    node_modules/docpad/bin/docpad run  --env=production

## Production Deploy

    grunt s3

