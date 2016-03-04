/**
 * This test tests to make sure that a valid configuration works. Requires
 * axe-core >= 2.0.0, hence the temporary conidtional check for a local version
 * of axe-core
 */
var WebDriver = require('selenium-webdriver'),
	json = require('../fixtures/attest-config.json'),
	assert = require('chai').assert,
	AxeBuilder = require('../../lib'),
	fs = require('fs'),
	colors = require('colors');

try {
	var axe = require('../../../axe-core/dist/index.js');

	describe('doc-dylang.html', function () {
		this.timeout(10000);

		var driver;
		before(function (done) {
			driver = new WebDriver.Builder()
				.forBrowser('firefox')
				.build();

			driver
				.get('http://localhost:9876/test/fixtures/doc-dylang.html')
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
			var src = '\naxe.configure(' + JSON.stringify(json) + ');';
			src = axe.source + src;
			AxeBuilder(driver, src)
				.withRules(['dylang'])
				.analyze(function (results) {
					assert.lengthOf(results.violations, 1);
					assert.equal(results.violations[0].id, 'dylang');
					assert.lengthOf(results.passes, 0);
					done();
				});
		});

	});
} catch (err) {
	console.log('======================================================================='.red);
	console.log('                                                                       '.red);
	console.log('                   NO LOCAL AXE-CORE: TEST SKIPPED                     '.red);
	console.log('                                                                       '.red);
	console.log('======================================================================='.red);
}
