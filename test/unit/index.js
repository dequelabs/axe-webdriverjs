
var assert = require('chai').assert;
var proxyquire = require('proxyquire');

var Builder = require('../../lib/index');
describe('Builder', function () {
	describe('constructor', function () {
		it('should assign driver to this._driver', function () {
			assert.equal(new Builder('bob')._driver, 'bob');
		});

		it('should define this._includes as an empty array', function () {
			var includes = new Builder('bob')._includes;
			assert.isArray(includes);
			assert.lengthOf(includes, 0);
		});

		it('should define this._excludes as an empty array', function () {
			var excludes = new Builder('bob')._excludes;
			assert.isArray(excludes);
			assert.lengthOf(excludes, 0);
		});

		it('should define this._options as null', function () {
			assert.isNull(new Builder()._options);
		});

		it('should define this._config as null', function () {
			assert.isNull(new Builder()._config);
		});

		it('should still work even if not used with new keyword', function () {
			assert.instanceOf(Builder(), Builder);
		});
	});

	describe('include', function () {
		it('should push onto _includes', function () {
			var builder = new Builder();
			builder.include('.bob');
			assert.lengthOf(builder._includes, 1);
			assert.lengthOf(builder._includes[0], 1);
			assert.equal(builder._includes[0][0], '.bob');
		});

		it('should return itself', function () {
			assert.instanceOf(new Builder().include('.bob'), Builder);
		});
	});

	describe('exclude', function () {
		it('should push onto _excludes', function () {
			var builder = new Builder();
			builder.exclude('.bob');
			assert.lengthOf(builder._excludes, 1);
			assert.lengthOf(builder._excludes[0], 1);
			assert.equal(builder._excludes[0][0], '.bob');
		});

		it('should return itself', function () {
			assert.instanceOf(new Builder().exclude('.bob'), Builder);
		});
	});

	describe('options', function () {
		it('should clobber _options with provided parameter', function () {
			var builder = new Builder();
			builder.options('bob');
			assert.equal(builder._options, 'bob');
			builder.options('fred');
			assert.equal(builder._options, 'fred');
		});

		it('should return itself', function () {
			assert.instanceOf(new Builder().options('bob'), Builder);
		});
	});

	describe('configure', function () {
		it('should take a config object to customize aXe', function (done) {
			var catsConfig = {
				'checks': {
					'id': 'cats',
					'options': [
						'cats'
					],
					'evaluate': "function (node, options) {\n        var lang = (node.getAttribute(\"lang\") || \"\").trim().toLowerCase();\n        var xmlLang = (node.getAttribute(\"xml:lang\") || \"\").trim().toLowerCase();\n        var invalid = [];\n        (options || []).forEach(function(cc) {\n          cc = cc.toLowerCase();\n          if (lang && (lang === cc || lang.indexOf(cc.toLowerCase() + \"-\") === 0)) {\n            lang = null;\n          }\n          if (xmlLang && (xmlLang === cc || xmlLang.indexOf(cc.toLowerCase() + \"-\") === 0)) {\n            xmlLang = null;\n          }\n        });\n        if (xmlLang) {\n          invalid.push('xml:lang=\"' + xmlLang + '\"');\n        }\n        if (lang) {\n          invalid.push('lang=\"' + lang + '\"');\n        }\n        if (invalid.length) {\n          this.data(invalid);\n          return true;\n        }\n        return false;\n      }",
					"metadata": {
					    "impact": "critical",
					    "messages": {
					      "pass": "The lang attribute is cats",
					      "fail": "The lang attribute can only be cats"
					    }
					  }
				},
				'rules': {
					'id': 'cats',
					'enabled': true,
					'selector': 'html',
					'any': ['cats'],
					'metadata': {
						"description": "Ensures lang attributes have the value of cats",
					    "help": "lang attribute must have the value of cats",
					    "helpUrl": "https://example.com/cats"
				    }
				}
			};
			var config = {};
			var Builder = proxyquire('../../lib/index', {
				'./inject': function (driver, source, config, cb) {
					cb(null, 'source-code');
				}
			});

			new Builder({
					executeAsyncScript: function (callback, context, options, config) {
						assert.equal(config, catsConfig);

						return {
							then: function (cb) {
								cb('results');
							}
						};
					}
				})
				.configure(catsConfig)
				.analyze(function (results) {
					assert.equal(results, 'results');
					done();
				});
		});

		it('should throw a useful error', function (done) {
			var builder = new Builder();

			assert.throws(function () {
				builder.configure('cats');
			});

			assert.throws(function () {
				builder.configure(undefined);
			});
			done();
		});
	});

	describe('analyze', function () {
		it('should normalize context', function (done) {
			var normalized = false;
			var config = {};
			var Builder = proxyquire('../../lib/index', {
				'./inject': function (driver, source, config, cb) {
					cb(null, 'source-code');
				},
				'./normalize-context': function (include, exclude) {
					normalized = true;
					assert.deepEqual(include, [['.joe']]);
					assert.deepEqual(exclude, [['.fred'], ['.bob']]);
					return null;
				}
			});

			new Builder({
					executeAsyncScript: function () {
						return {
							then: function (cb) {
								cb(null);
							}
						};
					}
				})
				.include('.joe')
				.exclude('.fred')
				.exclude('.bob')
				.analyze(function () {
					assert.isTrue(normalized);
					done();
				});
		});

		it('should inject into the page under test', function () {
			var called = false;
			var config = {};
			var Builder = proxyquire('../../lib/index', {
				'./inject': function (driver, source, config, cb) {
					assert.equal(driver, 'driver');
					assert.isFunction(cb);
					called = true;
				}
			});
			new Builder('driver').analyze();
			assert.isTrue(called);

		});

		it('should call axe.a11yCheck with given parameters', function (done) {
			var config = {};
			var Builder = proxyquire('../../lib/index', {
				'./inject': function (driver, source, config, cb) {
					cb(null, 'source-code');
				},
				'./normalize-context': function (include, exclude) {
					return 'normalized';
				}
			});

			new Builder({
					executeAsyncScript: function (callback, context, options) {
						assert.equal(context, 'normalized');
						assert.deepEqual(options, { foo: 'bar' });

						return {
							then: function (cb) {
								cb('results');
							}
						};
					}
				})
				.options({ foo: 'bar' })
				.analyze(function (results) {
					assert.equal(results, 'results');
					done();
				});
		});
	});
});
