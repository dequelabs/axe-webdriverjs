/**
 * This test tests to make sure that a valid configuration works. Requires
 * axe-core >= 2.0.0, hence the temporary conditional check for a local version
 * of axe-core
 */
var runWebdriver = require('../run-webdriver'),
  json = require('../fixtures/custom-rule-config.json'),
  assert = require('chai').assert,
  AxeBuilder = require('../../lib'),
  host = 'localhost';

var axe = require('axe-core');

if (process.env.REMOTE_TESTSERVER_HOST) {
  host = process.env.REMOTE_TESTSERVER_HOST;
}

describe('doc-dylang.html', function() {
  this.timeout(10000);

  var driver;
  before(function(done) {
    driver = runWebdriver();
    driver
      .get('http://' + host + ':9876/test/fixtures/doc-dylang.html')
      .then(function() {
        done();
      });
  });

  after(function(done) {
    driver.quit().then(function() {
      done();
    });
  });

  it('should find violations with customized helpUrl', function(done) {
    var src = axe.source;
    AxeBuilder(driver, src)
      .configure(json)
      .withRules(['dylang'])
      .analyze(function(results) {
        assert.lengthOf(results.violations, 1);
        assert.equal(results.violations[0].id, 'dylang');
        assert.notEqual(
          results.violations[0].helpUrl.indexOf('application=webdriverjs'),
          -1
        );
        assert.lengthOf(results.passes, 0);
        done();
      });
  });
});
