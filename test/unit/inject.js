var assert = require('chai').assert,
  sinon = require('sinon');

var Builder = require('../../lib/index');

var sourceString = '/*! aXe v */\naxe.configure({"data":"something"});';

describe('Attest', function() {
  it('should assign optional source to this._source', function() {
    var driver = sinon.stub();
    assert.match(
      new Builder(driver, sourceString)._source,
      /\/\*! aXe/,
      'regexp matches'
    );
  });
});
