
module.exports = function(grunt) {

	// load all grunt tasks
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// our config
	grunt.initConfig({

		// watch for changes and trigger compass, jshint, uglify and livereload
		watch: {
			sass_process: {
				files: ['test/scss/*.scss','_dev/demo.scss'],
				tasks: ['sass']
			},
			stylus_process: {
				files: ['test/stylus/*.styl'],
				tasks: ['stylus']
			},
			less_process: {
				files: ['test/less/*.less'],
				tasks: ['less']
			},
			uglify: {
				files: ['_dev/demo.js'],
				tasks: ['uglify']
			},
			build: {
				files: ['_dev/book*','_dev/index.html','json/*.json','build.*'],
				tasks: ['shell:build','less','sass','stylus']
			},
			tests: {
				files: ['test/**/*.{scss|less|styl|js}'],
				tasks: ['shell:test']
			}
		},


		// compile sass
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: { 
					'test/scss/test.css': 'test/scss/test.scss',
					'demo.css': '_dev/demo.scss'
				}
			}
		},


		// compile stylus
		stylus: {
			dist: {
				files: {
					'test/stylus/test.css': 'test/stylus/test.styl'
				}
			}
		},


		// compile less
		less: {
			dist: {
				options: {
					compress: true,
				},
				files: {
					"test/less/test.css": "test/less/test.less"
				}
			},
		},


		// let's squish some js
		uglify: {
			dist: {
				files: {
					'demo.js': [
						'node_modules/jquery/dist/jquery.js',
						'node_modules/fastclick/lib/fastclick.js',
						'_dev/demo.js'
					]
				}
			}
		},


  		// generate the sass and html files with node scripts
		shell: {
			build: {
				command: './build.sh'
			},
			test: {
				command: 'mocha'
			}
		}

	});
	
	// test task
	grunt.registerTask('test', ['shell:test']);
	
	// build task
	grunt.registerTask('build', ['shell:build','stylus','less','shell']);

	// register task
	grunt.registerTask('default', ['watch']);
};