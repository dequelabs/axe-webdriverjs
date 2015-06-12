var WebDriver = require('selenium-webdriver'),
	assert = require('chai').assert,
	AxeBuilder = require('../../lib');

describe('outer-frame.html', function () {
	this.timeout(10000);

	var driver;
	before(function (done) {
		driver = new WebDriver.Builder()
			.forBrowser('firefox')
			.build();

		driver.manage().timeouts().setScriptTimeout(500);

		driver
			.get('http://localhost:9876/test/fixtures/outer-frame.html')
			.then(function () {
				done();
			});
	});

	after(function () {
		driver.quit();
	});

	it('should find violations', function (done) {
		AxeBuilder(driver)
			.withRules('html-lang')
			.analyze(function (results) {
				assert.lengthOf(results.violations, 1);
				assert.equal(results.violations[0].id, 'html-lang');
				assert.lengthOf(results.violations[0].nodes[0].target, 2, 'finds the iframe <html> element');

				assert.lengthOf(results.passes, 1);
				assert.equal(results.passes[0].id, 'html-lang');
				assert.lengthOf(results.passes[0].nodes[0].target, 1, 'main page <html> element');

				done();
			});
	});

	it('should accept options', function (done) {
		AxeBuilder(driver)
			.include('body')
			.options({ checks: { "valid-lang": { options: ['bob'] }}})
			.withRules('html-lang')
			.analyze(function (results) {
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.passes, 1);
				done();
			});
	});

	it('should not find violations when the rule is disabled', function (done) {
		AxeBuilder(driver)
			.options({ rules: { 'html-lang': { enabled: false } } })
			.analyze(function (results) {
				results.violations.forEach(function (violation) {
					assert.notEqual(violation.id, 'html-lang');
				});
				results.passes.forEach(function (violation) {
					assert.notEqual(violation.id, 'html-lang');
				});
				done();
			});
	});

});
