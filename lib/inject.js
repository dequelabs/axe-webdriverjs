/**
 * Recursively find frames and inject a script into them
 * @private
 * @param  {Array}  parent Array of parent frames; or falsey if top level frame
 * @param  {String} script The script to inject
 * @param  {WebDriver} driver The driver to inject into
 */
function findFramesAndInject(parent, script, driver) {
	driver
		.findElements({
			tagName: 'iframe'
		})
		.then(function(results) {
			results.forEach(function(frame) {
				driver.switchTo().defaultContent();
				if (parent) {
					parent.forEach(function(p) {
						driver.switchTo().frame(p);
					});
				}
				driver.switchTo().frame(frame)
					.then(function() {
						driver
							.executeScript(script)
							.then(function() {
								findFramesAndInject((parent || []).concat(frame), script, driver);
							});
					}).catch(function (e) {
						console.log('Failed to inject axe-core into one of the iframes!');
						driver.switchTo().defaultContent();
					});
			});
		});
}

/**
 * Recursively inject aXe into all iframes and top level document, then execute a callback when complete
 * @private
 * @param  {WebDriver}   driver   Instance of WebDriver to inject into
 * @param  {String}	  axeSource   Optional Attest source and configure string
 * @param  {Object}   config      Optional configure object to pass to iframes
 * @param  {Function} callback    Callback to execute when aXe has been injected
 */
module.exports = function(driver, axeSource, config, callback) {
	axeSource = axeSource || require('axe-core').source;

	var configSrc = config !== null ? 'axe.configure(' + JSON.stringify(config) + ');' : '';
	var script = axeSource + configSrc + 'axe.configure({branding:{application:"webdriverjs"}});';

	driver
		.switchTo().defaultContent();

	driver
		.executeScript(script)
		.then(function() {
			findFramesAndInject(null, script, driver);
		})
		.then(function() {
			driver.switchTo().defaultContent();
			callback();
		});
};
