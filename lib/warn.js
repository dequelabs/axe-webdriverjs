#!/usr/bin/env node

try {
	/**
	 * Check if axe-core is installed
	 */
  require('axe-core');

} catch (err) {
	/**
	 * Warn user with install instructions
	 */
  console.error('You must install axe-core first, using:\n\n`npm install axe-core`\n');
}