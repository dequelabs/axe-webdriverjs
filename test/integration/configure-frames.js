var runWebdriver = require('../run-webdriver'),
	assert = require('chai').assert,
	host = 'localhost',
	json = require('../fixtures/custom-rule-config.json'),
	AxeBuilder = require('../../lib');

if (process.env.REMOTE_TESTSERVER_HOST) {
	host = process.env.REMOTE_TESTSERVER_HOST;
}

describe('outer-configure-frame.html', function () {
	this.timeout(10000);

	var driver;
	before(function (done) {
		driver = runWebdriver();
		driver.manage().timeouts().setScriptTimeout(500);

		driver
			.get('http://' + host + ':9876/test/fixtures/outer-configure-frame.html')
			.then(function () {
				done();
			});
	});

	after(function () {
		driver.quit();
	});

	it('should find configured violations in all frames', function (done) {
		AxeBuilder(driver)
			.options({rules: {
				'html-lang-valid': {'enabled': false}
			}})
			.configure(json)
			.analyze(function (results) {
				assert.equal(results.violations[0].id, 'dylang');
				// the second violation is in a frame
				assert.equal(results.violations[0].nodes.length, 2);

				done();
			});
	});

});
