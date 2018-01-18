<a name="1.3.0"></a>
## [1.3.0](https://github.com/dequelabs/axe-webdriverjs/compare/v1.2.1...v1.3.0) (2018-1-18)


### Features

* fix: Ensure meaningful driver context when axe fails in iframe
* feat: use axe.run with optional promises
* feat: update to axe-core version 2.6.1


### Fixes

* fix: allow errors to be caught by mocha


<a name="1.2.1"></a>
## [1.2.1](https://github.com/dequelabs/axe-webdriverjs/compare/v1.2.0...v1.2.1) (2017-12-19)


### Features

* Add axe-core 2.6.0


<a name="1.2.0"></a>
# [1.2.0](https://github.com/dequelabs/axe-webdriverjs/compare/v1.1.4...v1.2.0) (2017-11-16)


### Bug Fixes

* Add seleniuv-webdriver to package.json ([#45](https://github.com/dequelabs/axe-webdriverjs/issues/45)) ([918f61c](https://github.com/dequelabs/axe-webdriverjs/commit/918f61c))
* replace axe-core dependency, bump to 1.1.5 ([059d18d](https://github.com/dequelabs/axe-webdriverjs/commit/059d18d))
* replace axe-core dependency, bump to 1.1.5 ([275819a](https://github.com/dequelabs/axe-webdriverjs/commit/275819a))


### Features

* Add disableRules method for disabling individual rules ([3833c59](https://github.com/dequelabs/axe-webdriverjs/commit/3833c59))



# Change Log

<!-- Release notes authoring guidelines: http://keepachangelog.com/ -->

All notable changes to this project will be documented in this file.

<!-- ## [Unreleased] -->

## [1.1.5] - 2017-09-19
### Changed
- Update to axe-core 2.4.1, include in dependencies

## [1.1.2] - 2017-06-14
### Changed
- Update to axe-core 2.3.0 to work with Firefox webdriver

## [1.1.1] - 2017-05-20
### Changed
- Remove warn file on install
- Update to axe-core 2.2.1 to resolve circular dependencies

## [1.1.0] - 2017-05-02
### Changed
- Move axe-core to dependencies

## [0.5.0] - 2016-12-22
### Added
- Support for axe-cli by passing in a source for axe-core version

### Changed
- Upgrade to Selenium 3, which requires Node 6
- Replace `~` with `^` in package.json to get more 
- Allow running with Selenium remotely in tests

## 0.4.0 - 2016-09-27
### Added
- New configure method building on axe-core API

## 0.2.0 - 2015-08-16
### Changed
- Update to use aXe 1.1.0

[Unreleased]: https://github.com/dequelabs/axe-webdriverjs/compare/v0.5.0...master
[0.5.0]: https://github.com/dequelabs/axe-webdriverjs/compare/8d6cd08fabf507134fe3c6cf33516af00d8f4eb8...v0.5.0
