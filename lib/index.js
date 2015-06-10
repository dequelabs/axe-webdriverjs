var inject = require('./inject'),
  normalizeContext = require('./normalize-context');

function AxeBuilder(driver) {
  if (!(this instanceof AxeBuilder)) {
    return new AxeBuilder(driver);
  }

	this._driver = driver;
  this._includes = [];
  this._excludes = [];
  this._options = null;
}

AxeBuilder.prototype.include = function(selector) {
	this._includes.push(Array.isArray(selector) ? selector : [selector]);
	return this;
};

AxeBuilder.prototype.exclude = function(selector) {
	this._excludes.push(Array.isArray(selector) ? selector : [selector]);
	return this;
};

AxeBuilder.prototype.options = function(options) {
	this._options = options;
	return this;
};

AxeBuilder.prototype.analyze = function(callback) {
	var context = normalizeContext(this._includes, this._excludes),
    driver = this._driver,
    options = this._options;


	inject(driver, function() {
		driver
			.executeAsyncScript(function(context, options) {
				/*global document, axe */
				axe.a11yCheck(context || document, options, arguments[arguments.length - 1]);
			}, context, options)
			.then(callback);
	});
};

exports = module.exports = AxeBuilder;
