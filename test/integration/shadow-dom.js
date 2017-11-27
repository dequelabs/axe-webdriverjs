var runWebdriver = require('../run-webdriver'),
	assert = require('chai').assert,
	host = 'localhost',
	AxeBuilder = require('../../lib');

if (process.env.REMOTE_TESTSERVER_HOST) {
	host = process.env.REMOTE_TESTSERVER_HOST;
}

var shadowSupported;

describe('shadow-dom.html', function () {
	this.timeout(10000);

	var driver;
	before(function (done) {
		driver = runWebdriver();
		driver.manage().timeouts().setScriptTimeout(500);
		driver
			.get('http://' + host + ':9876/test/fixtures/shadow-dom.html')
			.then(function () {
				driver.executeAsyncScript(function(callback) {
					var script = document.createElement('script');
					script.innerHTML = 'var shadowSupport = document.body && typeof document.body.attachShadow === \'function\';';
					document.documentElement.appendChild(script);
					callback(shadowSupport);
				})
				.then(function(shadowSupport) {
					shadowSupported = shadowSupport;
					done();
				})
				.catch(function(error) {
					done();
				});
			});
	});

	after(function (done) {
		driver.quit().then(function () {
			done();
		});
	});

	it('should find violations', function (done) {
		if (shadowSupported) {
			AxeBuilder(driver)
				.analyze(function (results) {
					assert.lengthOf(results.violations, 2);
					assert.equal(results.violations[0].id, 'aria-roles');
					assert.equal(results.violations[1].id, 'aria-valid-attr');
					done();
				});
		} else {
			console.log('Test skipped, Shadow DOM not supported');
			done();
		}
	});

});
