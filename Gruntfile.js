
module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-mocha-istanbul');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		connect: {
			test: {
				options: {
					hostname: '0.0.0.0',
					port: grunt.option('port') || 9876,
					base: ['.']
				}
			}
		},
		mocha_istanbul: {
			unit: {
				options: {
					reporter: grunt.option('report') ? 'xunit-file' : 'spec',
					reportFormats: ['html', 'cobertura'],
					coverageFolder: 'output/coverage',
					grep: grunt.option('grep')
				},
				src: ['test/unit/**/*.js']
			}
		},
		mochaTest: {
			integration: {
				options: {
					reporter: grunt.option('report') ? 'xunit-file' : 'spec',
					grep: grunt.option('grep')
				},
				src: ['test/integration/**/*.js']
			},
			sauce: {
				options: {
					reporter: grunt.option('report') ? 'xunit-file' : 'spec',
					grep: grunt.option('grep')
				},
				src: ['test/sauce/**/*.js']
			}
		},
		jshint: {
			options: {
				jshintrc: true,
				reporter: grunt.option('report') ? 'checkstyle' : undefined,
				reporterOutput: grunt.option('report') ? 'output/lint.xml' : undefined
			},
			files: {
				src: ['./*.js', 'lib/**/*.js', 'test/**/*.js']
			}
		},
		watch: {
			files: ['<%= mocha_istanbul.unit.src %>', '<%= mochaTest.integration.src %>'],
			tasks: ['test']
		},
	});

	grunt.registerTask('test-unit', ['mocha_istanbul', 'jshint']);

	grunt.registerTask('test', ['mocha_istanbul', 'connect', 'mochaTest:integration', 'jshint']);

	grunt.registerTask('test-sauce', ['mocha_istanbul', 'connect', 'mochaTest:sauce', 'jshint']);
};
