
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

	describe('analyze', function () {
		it('should normalize context', function (done) {
			var normalized = false;
			var Builder = proxyquire('../../lib/index', {
				'./inject': function (driver, cb) {
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
			var Builder = proxyquire('../../lib/index', {
				'./inject': function (driver, cb) {
					assert.equal(driver, 'driver');
					assert.isFunction(cb);
					called = true;
				}
			});
			new Builder('driver').analyze();
			assert.isTrue(called);

		});

		it('should call axe.a11yCheck with given parameters', function (done) {
			var Builder = proxyquire('../../lib/index', {
				'./inject': function (driver, cb) {
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
