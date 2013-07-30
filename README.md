# whyaz

Marketing website for meltmedia


## Getting Started

- [Install DocPad](https://github.com/bevry/docpad)

###Clone the project and run the server


    git clone git@github.com:meltmedia/whyaz.git

    cd whyaz

    npm install
		
    docpad run
    
If you dont have docpad installed globally:
    
    node_modules/docpad/bin/docpad run


- [Open http://localhost:9778/](http://localhost:9778/)

- Start hacking away by modifying the `src` directory

## Production Build

    docpad run --env=production

or

    node_modules/docpad/bin/docpad run  --env=production

## Production Deploy

    grunt s3


## License

This skeleton is made ["public domain"](http://en.wikipedia.org/wiki/Public_domain) using the [Creative Commons Zero](http://creativecommons.org/publicdomain/zero/1.0/), as such before you publish your website you should place your desired license here and within the `LICENSE.md` file.

If you are wanting to open-source your website, we suggest using the [Creative Commons Attribution License](http://creativecommons.org/licenses/by/3.0/) for content and the [MIT License](http://creativecommons.org/licenses/MIT/) for code. In which case you'd probably want to use the following as your license:

	Unless stated otherwise, all content is licensed under the [Creative Commons Attribution License](http://creativecommons.org/licenses/by/3.0/) and code licensed under the [MIT License](http://creativecommons.org/licenses/MIT/), © [Your Name](http://your.website)

If you are wanting to close-source your website, we'd suggest using the following:

	Copyright [Your Name](http://your.website). All rights reserved.

Other included things such as themes and libraries are likely already licensed by their own invidual licenses, so be sure to respect their licenses too.

Thanks, the DocPad team loves you.
