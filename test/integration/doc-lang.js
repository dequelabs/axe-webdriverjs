var WebDriver = require('selenium-webdriver'),
	assert = require('chai').assert,
	AxeBuilder = require('../../lib');

describe('doc-lang.html', function () {
	this.timeout(10000);

	var driver;
	before(function (done) {
		driver = new WebDriver.Builder()
			.forBrowser('firefox')
			.build();

		driver
			.get('http://localhost:9876/test/fixtures/doc-lang.html')
			.then(function () {
				done();
			});
	});

	after(function () {
		driver.quit();
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
