#!/usr/bin/env node

const fs = require('fs');
const pkg = require('../package.json');

if (!process.env.CIRCLE_SHA1) {
  throw new Error('No CIRCLE SHA available.');
}

const new_version =
  pkg.version + '-canary.' + process.env.CIRCLE_SHA1.substring(0, 8);
pkg.version = new_version;
fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
