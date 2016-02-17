var assert = require('chai').assert;
var proxyquire = require('proxyquire');

var Builder = require('../../lib/index');
// can't depend on an optional module. shim it?
var Attest = require('../../node_modules/attest/index.js')(process.env.ATTEST_PATH);

describe('Attest', function () {
	beforeEach(function(){
		process.env.ATTEST_PATH = '../fixture/attest-config.json';
	});
	afterEach(function() {
		delete process.env.ATTEST_PATH;
	});

	it('should assign Attest source to this._source', function () {
		assert.match(new Builder('bob', Attest.source)._source, /((axe\.configure\(\{(.+)\}\)\;))$/, 'regexp matches');
	});
});