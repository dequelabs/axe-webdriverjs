var inject = require('./inject'),
  normalizeContext = require('./normalize-context');

/**
 * Constructor for chainable WebDriver API
 * @param {WebDriver} driver WebDriver instance to analyze
 */
function AxeBuilder(driver, source) {
  if (!(this instanceof AxeBuilder)) {
    return new AxeBuilder(driver, source);
  }

	this._driver = driver;
  this._source = source || null;
  this._includes = [];
  this._excludes = [];
  this._options = null;
  this._config = null;
}

/**
 * Selector to include in analysis
 * @param  {String} selector CSS selector of the element to include
 * @return {AxeBuilder}
 */
AxeBuilder.prototype.include = function(selector) {
	this._includes.push(Array.isArray(selector) ? selector : [selector]);
	return this;
};

/**
 * Selector to exclude in analysis
 * @param  {String} selector CSS selector of the element to exclude
 * @return {AxeBuilder}
 */
AxeBuilder.prototype.exclude = function(selector) {
	this._excludes.push(Array.isArray(selector) ? selector : [selector]);
	return this;
};

/**
 * Options to directly pass to `axe.a11yCheck`.  See API documentation for axe-core for use.  Will override any other configured options, including calls to `withRules` and `withTags`.
 * @param  {Object} options Options object
 * @return {AxeBuilder}
 */
AxeBuilder.prototype.options = function(options) {
	this._options = options;
	return this;
};

/**
 * Limit analysis to only the specified rules.  Cannot be used with `withTags`.
 * @param {Array|String} rules Array of rule IDs, or a single rule ID as a string
 * @return {AxeBuilder}
 */
AxeBuilder.prototype.withRules = function (rules) {
  rules = Array.isArray(rules) ? rules : [rules];
  this._options = this._options || {};
  this._options.runOnly = {
    type: 'rule',
    values: rules
  };

  return this;
};

/**
 * Limit analysis to only the specified tags.  Cannot be used with `withRules`.
 * @param {Array|String} rules Array of tags, or a single tag as a string
 * @return {AxeBuilder}
 */
AxeBuilder.prototype.withTags = function (tags) {
  tags = Array.isArray(tags) ? tags : [tags];
  this._options = this._options || {};
  this._options.runOnly = {
    type: 'tag',
    values: tags
  };

  return this;
};
/**
 * Configure aXe before running analyze. *Does not chain.*
 * @param  {Object} config Configuration object to use in analysis
 */
AxeBuilder.prototype.configure = function(config) {
  if (typeof config !== 'object') {
    throw new Error('AxeBuilder needs an object to configure. See axe-core configure API.');
  }

  this._config = config;
  return this;
};

/**
 * Perform analysis and retrieve results. *Does not chain.*
 * @param  {Function} callback Function to execute when analysis completes; recieves one argument, the results object of analysis
 */
AxeBuilder.prototype.analyze = function(callback) {
	var context = normalizeContext(this._includes, this._excludes),
    driver = this._driver,
    options = this._options,
    config = this._config,
    source = this._source;

	inject(driver, source, function() {
		driver
			.executeAsyncScript(function(context, options, config) {
				/*global document, axe */
				if (config !== null) {
					axe.configure(config);
				}
				axe.a11yCheck(context || document, options, arguments[arguments.length - 1]);
			}, context, options, config)
			.then(callback);
	});
};

exports = module.exports = AxeBuilder;
