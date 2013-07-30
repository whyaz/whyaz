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

