var runWebdriver = require('../run-webdriver'),
	assert = require('chai').assert,
	host = 'localhost',
	AxeBuilder = require('../../lib');

if (process.env.REMOTE_TESTSERVER_HOST) {
	host = process.env.REMOTE_TESTSERVER_HOST;
}

describe('shadow-dom.html', function () {
	this.timeout(10000);

	var driver;
	before(function (done) {
		driver = runWebdriver();
		driver
			.get('http://' + host + ':9876/test/fixtures/shadow-dom.html')
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
			.analyze(function (results) {
				assert.lengthOf(results.violations, 1);
				assert.equal(results.violations[0].id, 'aria-roles');
				done();
			});
	});

});
