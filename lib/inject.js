var path = require('path'),
	fs = require('fs');

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
					});
			});
		});
}

/**
 * Get the source of the axe-core package
 * @private
 * @param {String}	axeSource Optional custom source and rules passed in through constructor
 * @param {Function} callback Callback to execute when source is retrieved
 */
function getSource(axeSource, callback) {
	if (axeSource !== null) {
		return callback(null, axeSource);
	}
	var pathToAxe = path.resolve(__dirname, '../node_modules/axe-core/axe.js');
	fs.readFile(pathToAxe, {
		encoding: 'utf-8'
	}, callback);
}

/**
 * Recursively inject aXe into all iframes and top level document, then execute a callback when complete
 * @private
 * @param  {WebDriver}   driver   Instance of WebDriver to inject into
 * @param  {String}	  axeSource   Optional Attest source and configure string
 * @param  {Function} callback    Callback to execute when aXe has been injected
 */
module.exports = function(driver, axeSource, callback) {
	getSource(axeSource, function(err, axeSource) {
	    if (err) {
	      return console.error(err);
	    }

		var script = '(function () {' +
			'if (typeof axe === "object" && axe.version) { return; }' +
			'var s = document.createElement("script");' +
			// stringify so that quotes are properly escaped
			's.innerHTML = ' + JSON.stringify(axeSource + ';' + 'axe.configure({branding:{application:"webdriverjs"}});') + ';' +
			'document.body.appendChild(s);' +
			'}());';

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
	});
};
