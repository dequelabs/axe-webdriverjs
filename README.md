# axe-webdriverjs

Provides a chainable aXe API for Selenium's WebDriverJS and automatically injects into all frames.

## Getting Started

Install the module; `npm install axe-webdriverjs`

## Usage

This module uses a chainable API to assist in injecting, configuring and analyzing using aXe with Selenium WebDriverJS.  As such, it is required to pass an instance of WebDriver.

Here is an example of a script that will drive Selenium to this repository, perform analysis and then log results to the console.
```
var AxeBuilder = require('axe-webdriverjs'),
  WebDriver = require('selenium-webdriver');

var driver = new WebDriver.Builder()
  .forBrowser('firefox')
  .build();

driver
  .get('https://github.com/dequelabs/axe-webdriverjs')
  .then(function () {
    AxeBuilder(driver)
      .analyze(function (results) {
        console.log(results);
      });
  });
```

### AxeBuilder(driver:WebDriver)

Constructor for the AxeBuilder helper. You must pass an instance of selenium-webdriver as the first and only argument.  Can be called with or without the `new` keyword.

```javascript
var builder = AxeBuilder(driver);
```

### AxeBuilder#include(selector:String)

Adds a CSS selector to the list of elements to include in analysis

```javascript
AxeBuilder(driver)
  .include('.results-panel');
```

### AxeBuilder#exclude(selector:String)

Add a CSS selector to the list of elements to exclude from analysis

```javascript
AxeBuilder(driver)
  .include('.results-panel')
  .exclude('.results-panel h2');
```

### AxeBuilder#options(options:Object)

Specifies options to be used by `axe.a11yCheck`.  **Will override any other configured options, including calls to `withRules` and `withTags`.** See [axe-core API documentation](https://github.com/dequelabs/axe-core/blob/master/doc/API.md) for information on its structure.

```javascript
AxeBuilder(driver)
  .options({ checks: { "valid-lang": ["orcish"] }});
```

### AxeBuilder#withRules(rules:Mixed)

Limits analysis to only those with the specified rule IDs.  Accepts a String of a single rule ID or an Array of multiple rule IDs. **Subsequent calls to `AxeBuilder#options`, `AxeBuilder#withRules` or `AxeBuilder#withRules` will override specified options.**

```javascript
AxeBuilder(driver)
  .withRules('html-lang');
```

```javascript
AxeBuilder(driver)
  .withRules(['html-lang', 'image-alt']);
```

### AxeBuilder#withTags(tags:Mixed)

Limits analysis to only those with the specified rule IDs.  Accepts a String of a single tag or an Array of multiple tags.  **Subsequent calls to `AxeBuilder#options`, `AxeBuilder#withRules` or `AxeBuilder#withRules` will override specified options.**

```javascript
AxeBuilder(driver)
  .withTags('wcag2a');
```

```javascript
AxeBuilder(driver)
  .withTags(['wcag2a', 'wcag2aa']);
```


### AxeBuilder#analyze(callback:Function)

Performs analysis and passes the result object to the provided function.  **Does not chain as the operation is asynchronous**

```javascript
AxeBuilder(driver)
  .analyze(function (results) {
    console.log(results);
  });
```

## Examples

This project has a couple integrations that demonstrate the ability and use of this module:

1. [Running a single rule](test/integration/doc-lang.js)
1. [Running against a page with frames](test/integration/frames.js)
1. [SauceLabs example](test/integration/sauce.js)


## Contributing

Read the [documentation on contributing](CONTRIBUTING.md)
