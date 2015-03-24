'use strict';

module.exports = function (grunt) {

    //Configure Grunt
    grunt.initConfig({

        //Point to the package file
        pkg: grunt.file.readJSON('package.json'),

        //Configure Browserify build, no debug map and don't keep alive
        browserify: {
            default: {
                options: {
                    debug: false,
                    keepalive: false
                },
                files: {
                    'dist/monster-manager.js': ['js/app.js'],
                    'dist/monster-manager-with-editor.js': ['js/editor.js'],
                    'dist/monster-manager-loader.js': ['js/bookmarklet-loader.js']
                }
            }
        },

        //Configure Watchify build used while developing, debug map and constant file watch
        watchify: {
            options: {
                debug: true,
                keepalive: true
            },
            default: {
                src: './js/editor.js',
                dest: './dist/monster-manager-with-editor.js'
            }
        },

        //Configure Uglify that is executed when creating a new build
        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    pure_funcs: ['console.log', 'log.trace', 'log.debug', 'log.info', 'log.warn', 'log.error', 'log.fatal']
                }
            },
            dist: {
                files: {
                    'dist/monster-manager.min.js': 'dist/monster-manager.js',
                    'dist/monster-manager-with-editor.min.js': 'dist/monster-manager-with-editor.js',
                    'dist/monster-manager-loader.min.js': 'dist/monster-manager-loader.js'
                }
            }

        },
        compass: {
            dist: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'dist/css',
                    config: 'compass-config.rb',
                    environment: 'production'
                }
            },
            dev: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'dist/css',
                    config: 'compass-config.rb'
                }
            },
            watch: {
                options: {
                    sassDir: 'scss',
                    cssDir: 'dist/css',
                    config: 'compass-config.rb',
                    watch: true
                }
            }
        }

    });

    //Load plug-ins
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-watchify');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-compass');

    grunt.registerTask('build', [
        'browserify',
        'uglify',
        'compass:dist'
    ]);

    grunt.registerTask('watch', [
        'watchify'
    ]);

    grunt.registerTask('watch-styles', [
        'compass:watch'
    ]);

    grunt.registerTask('default', ['build']);

};
