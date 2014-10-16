# WhyAZ

A website about why we love living and working in Arizona: [why.az](http://why.az/). The illustrations on this site are drawn with HTML and CSS. Read more about it on meltmedia's blog: [Why WhyAZ?](http://blog.meltmedia.com/2013/08/why-whyaz/)

## Contributing

Help make WhyAZ even better.

Please feel free to [submit an issue](https://github.com/meltmedia/whyaz/issues) with ideas, comments, or additional content to add. Or comment on any existing issues to keep the conversation going.

If you would like to contribute via pull request, please follow the editing guidelines below.

### What kind of content?

Submit any reasons you love Arizona: cool places to eat, drink, or visit, fun facts about the state or its cities, or anything else you think would be interesting. Our main purpose is to share with the world the many reasons we think Arizona is a great place to live, work, and visit and content will be incorporated as it aligns with this goal.

WhyAZ will not feature advertisements, political support, or discriminatory content. 

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

### Working locally on the contributor form
We make use of Trello's API to submit the form results to a newly generated card on our internal board. If you want to work on that feature of the site, there are a few more steps you'll need to follow to get going.

1. [Get your Trello API key](https://trello.com/1/appKey/generate)
2. Generate your Trello token by copying and pasting the link below. Make sure to replace the <yourkey> portion with your own key.

        https://trello.com/1/connect?key=<YOUR_KEY>&name=WhyAZ&response_type=token&scope=read,write&expiration=never

3. Once you have your key and token you will need to add a config.json file to the root of the project. This is where the server looks for any configuration information it needs. Here is a sample:

```
{
  "trello": {
    "key": "<YOUR_KEY>",
    "token": "<YOUR_TOKEN>",
    "list": "<LIST_ID_FOR_CARDS>"
  }
}
```

## Deployment
WhyAZ uses [meltmedia's](https://github.com/meltmedia) deployment platform, Totem, to continuously deploy to various environments.
When commits are pushed to master, develop or feature branches beginning with feature_, Totem will use githooks to build and deploy a [Docker](https://www.docker.com) container. You can view the builds at the following urls:
* master              -> why.az
* develop             -> whyaz.cu.melt.sh
* feature_[New-Thing] -> whyaz-[New-Thing].cu.melt.sh
