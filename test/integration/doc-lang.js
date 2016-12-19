var runWebdriver = require('../run-webdriver'),
	assert = require('chai').assert,
	host = 'localhost',
	AxeBuilder = require('../../lib');

if (process.env.REMOTE_TESTSERVER_HOST) {
	host = process.env.REMOTE_TESTSERVER_HOST;
}

describe('doc-lang.html', function () {
	this.timeout(10000);

	var driver;
	before(function (done) {
		driver = runWebdriver();
		driver
			.get('http://' + host + ':9876/test/fixtures/doc-lang.html')
			.then(function () {
				done();
			});
	});

	after(function (done) {
		driver.quit().then(function () {
			done();
		});
	});

	it('should find violations', function (done) {
		AxeBuilder(driver)
			.withRules('html-has-lang')
			.analyze(function (results) {
				assert.lengthOf(results.violations, 1);
				assert.equal(results.violations[0].id, 'html-has-lang');
				assert.lengthOf(results.passes, 0);
				done();
			});
	});

	it('should not find violations when given context (document level rule)', function (done) {
		AxeBuilder(driver)
			.include('body')
			.withRules('html-has-lang')
			.analyze(function (results) {
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.passes, 0);
				done();
			});
	});

	it('should not find violations when the rule is disabled', function (done) {
		AxeBuilder(driver)
			.options({ rules: { 'html-has-lang': { enabled: false } } })
			.analyze(function (results) {
				results.violations.forEach(function (violation) {
					assert.notEqual(violation.id, 'html-has-lang');
				});
				results.passes.forEach(function (violation) {
					assert.notEqual(violation.id, 'html-has-lang');
				});
				done();
			});
	});

});
