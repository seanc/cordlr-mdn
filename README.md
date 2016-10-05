# cordlr-mdn [![NPM version](https://badge.fury.io/js/cordlr-mdn.svg)](https://npmjs.org/package/cordlr-mdn) [![Build Status](https://travis-ci.org/seanc/cordlr-mdn.svg?branch=master)](https://travis-ci.org/seanc/cordlr-mdn)

> Cordlr mdn plugin

## Installation

```sh
$ cordlr install cordlr-mdn
```

Then add it to your config.

```json
{
  "plugins": [
    "cordlr-mdn"
  ],
  "mdn": {
    "format": "**{{title}}**:\n{{description}}\n{{url}}", // How to format the response
    "unknown": "Couldn't find anything for query `{{query}}`", // What do we do if there wasn't anything returned back
    "max": "1", // How many results to return, to return all use 'Infinity', default 1
    "code": false // Should we sent it in a code block
  }
}
```

## License

MIT © [Sean Wilson](https://imsean.me)
