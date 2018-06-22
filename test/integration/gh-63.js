var runWebdriver = require('../run-webdriver');
var AxeBuilder = require('../../lib');

var { RUN_THIRDPARTY_TESTS } = process.env;

if (RUN_THIRDPARTY_TESTS) {
  describe('gh-63: buy.garmin.com/en-US/US/p/591046', function() {
    this.timeout('1m');

    var driver;
    before(function() {
      driver = runWebdriver();
      driver
        .manage()
        .timeouts()
        .setScriptTimeout(5000);
      return driver.get('https://buy.garmin.com/en-US/US/p/591046');
    });

    after(function() {
      return driver.quit();
    });

    it('should not timeout', function(done) {
      var axe = new AxeBuilder(driver);
      axe.analyze(function() {
        done();
      });
    });
  });
}
