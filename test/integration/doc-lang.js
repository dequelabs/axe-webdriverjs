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
			.get('http://localhost:8000/test/fixtures/doc-lang.html')
			.then(function () {
				done();
			});
	});

	it('should find violations', function (done) {
		AxeBuilder(driver)
			.options({ runOnly: { type: 'rule', values: ['html-lang'] }})
			.analyze(function (results) {
				assert.lengthOf(results.violations, 1);
				assert.equal(results.violations[0].id, 'html-lang');
				assert.lengthOf(results.passes, 0);
				done();
			});
	});

	it('should not find violations when given context (document level rule)', function (done) {
		AxeBuilder(driver)
			.include('body')
			.options({ runOnly: { type: 'rule', values: ['html-lang'] }})
			.analyze(function (results) {
				assert.lengthOf(results.violations, 0);
				assert.lengthOf(results.passes, 0);
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
