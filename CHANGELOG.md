# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.3.0](https://github.com/dequelabs/axe-webdriverjs/compare/v2.2.0...v2.3.0) (2019-07-24)


### Bug Fixes

* Improve error message when an iframe was removed ([#118](https://github.com/dequelabs/axe-webdriverjs/issues/118)) ([d625312](https://github.com/dequelabs/axe-webdriverjs/commit/d625312))


### Features

* add option to not print iframe error to console ([b4f2494](https://github.com/dequelabs/axe-webdriverjs/commit/b4f2494))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/dequelabs/axe-webdriverjs/compare/v2.0.1...v2.2.0) (2019-03-07)


### Bug Fixes

* log "iframe warning" to stderr ([#102](https://github.com/dequelabs/axe-webdriverjs/issues/102)) ([bb4fb2c](https://github.com/dequelabs/axe-webdriverjs/commit/bb4fb2c))
* update `AxeBuilder#analyze()` usage ([#93](https://github.com/dequelabs/axe-webdriverjs/issues/93)) ([f2ead15](https://github.com/dequelabs/axe-webdriverjs/commit/f2ead15)), closes [#92](https://github.com/dequelabs/axe-webdriverjs/issues/92)


### Features

* add ES6 modules/TypeScript compatible export ([#94](https://github.com/dequelabs/axe-webdriverjs/issues/94)) ([eee46c9](https://github.com/dequelabs/axe-webdriverjs/commit/eee46c9)), closes [#74](https://github.com/dequelabs/axe-webdriverjs/issues/74)
* Allow errors bubble up to the caller ([#83](https://github.com/dequelabs/axe-webdriverjs/issues/83)) ([5b1cf4e](https://github.com/dequelabs/axe-webdriverjs/commit/5b1cf4e)), closes [#56](https://github.com/dequelabs/axe-webdriverjs/issues/56)



# [2.1.0](https://github.com/dequelabs/axe-webdriverjs/compare/v2.0.1...v2.1.0) (2018-11-13)


### Features

* Allow errors bubble up to the caller ([#83](https://github.com/dequelabs/axe-webdriverjs/issues/83)) ([5b1cf4e](https://github.com/dequelabs/axe-webdriverjs/commit/5b1cf4e)), closes [#56](https://github.com/dequelabs/axe-webdriverjs/issues/56)



## [2.0.1](https://github.com/dequelabs/axe-webdriverjs/compare/v2.0.0...v2.0.1) (2018-06-25)


### Bug Fixes

* move selenium to development deps ([#55](https://github.com/dequelabs/axe-webdriverjs/issues/55)) ([d8c6a0f](https://github.com/dequelabs/axe-webdriverjs/commit/d8c6a0f))
* Prevent infinitely recursing when injecting into iframes ([#66](https://github.com/dequelabs/axe-webdriverjs/issues/66)) ([591a701](https://github.com/dequelabs/axe-webdriverjs/commit/591a701)), closes [#63](https://github.com/dequelabs/axe-webdriverjs/issues/63)



# [2.0.0](https://github.com/dequelabs/axe-webdriverjs/compare/v2.0.0-alpha.1...v2.0.0) (2018-03-28)



# [2.0.0-alpha.1](https://github.com/dequelabs/axe-webdriverjs/compare/v1.3.0...v2.0.0-alpha.1) (2018-01-19)


### Features

* upgrade to axe-core 3.0.0-alpha.9 ([#46](https://github.com/dequelabs/axe-webdriverjs/issues/46)) ([097a012](https://github.com/dequelabs/axe-webdriverjs/commit/097a012))



# [1.3.0](https://github.com/dequelabs/axe-webdriverjs/compare/v1.2.1...v1.3.0) (2018-01-18)


### Bug Fixes

* allow errors to be caught by mocha ([f500305](https://github.com/dequelabs/axe-webdriverjs/commit/f500305))
* Ensure that when the injection of axe-core into an iframe fails, the driver context is reset to something meaningful ([10cf353](https://github.com/dequelabs/axe-webdriverjs/commit/10cf353))


### Features

* update to axe-core version 2.6.1 ([1718ac5](https://github.com/dequelabs/axe-webdriverjs/commit/1718ac5))



## [1.2.1](https://github.com/dequelabs/axe-webdriverjs/compare/v1.2.0...v1.2.1) (2017-12-19)


### Features

* change to axe.run (WIP) ([c3e94ca](https://github.com/dequelabs/axe-webdriverjs/commit/c3e94ca))
* handle promises with axe.run ([02ee730](https://github.com/dequelabs/axe-webdriverjs/commit/02ee730))



# [1.2.0](https://github.com/dequelabs/axe-webdriverjs/compare/v1.1.4...v1.2.0) (2017-11-16)


### Bug Fixes

* Add seleniuv-webdriver to package.json ([#45](https://github.com/dequelabs/axe-webdriverjs/issues/45)) ([918f61c](https://github.com/dequelabs/axe-webdriverjs/commit/918f61c))
* replace axe-core dependency, bump to 1.1.5 ([059d18d](https://github.com/dequelabs/axe-webdriverjs/commit/059d18d))
* replace axe-core dependency, bump to 1.1.5 ([275819a](https://github.com/dequelabs/axe-webdriverjs/commit/275819a))


### Features

* Add disableRules method for disabling individual rules ([3833c59](https://github.com/dequelabs/axe-webdriverjs/commit/3833c59))



## [1.1.4](https://github.com/dequelabs/axe-webdriverjs/compare/1.1.1...v1.1.4) (2017-09-18)



## [1.1.1](https://github.com/dequelabs/axe-webdriverjs/compare/1.1.0...1.1.1) (2017-05-20)



# [1.1.0](https://github.com/dequelabs/axe-webdriverjs/compare/v0.5.0...1.1.0) (2017-05-02)


### Bug Fixes

* inject raw source to work with limited CSPs ([b6fa546](https://github.com/dequelabs/axe-webdriverjs/commit/b6fa546))



# [0.5.0](https://github.com/dequelabs/axe-webdriverjs/compare/58bfa6e...v0.5.0) (2016-12-22)


### Features

* add changelog and update version ([#24](https://github.com/dequelabs/axe-webdriverjs/issues/24)) ([58bfa6e](https://github.com/dequelabs/axe-webdriverjs/commit/58bfa6e))
