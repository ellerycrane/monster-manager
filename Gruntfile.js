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
        },

        autoprefixer: {
            options: {
                // Task-specific options go here.
            },
            manager: {
                options: {
                    map: true
                },
                src: 'dist/css/monster-manager.css',
                dest: 'dist/css/monster-manager.css'
            },
            landing: {
                options: {
                    map: true
                },
                src: 'dist/css/monster-manager-landing-page.css',
                dest: 'dist/css/monster-manager-landing-page.css'
            }
        },

        sass: {
            dist: {
                options:{
                    require: 'sass-css-importer',
                    compass: true
                },

                files: {
                    'dist/css/monster-manager-landing-page.css': 'scss/monster-manager-landing-page.scss',
                    'dist/css/monster-manager.css': 'scss/monster-manager.scss'
                }
            },
            landing: {
                options:{
                    require: 'sass-css-importer',
                    compass: true
                },

                files: {
                    'dist/css/monster-manager-landing-page.css': 'scss/monster-manager-landing-page.scss'
                }
            },
            manager: {
                options:{
                    require: 'sass-css-importer',
                    compass: true
                },

                files: {
                    'dist/css/monster-manager.css': 'scss/monster-manager.scss'
                }
            }
        },

        watch: {
            managerCss: {
                files: 'scss/**/*.scss',
                tasks: ['sass:manager'],
                options: {
                    spawn: false
                }
            },

            landingCss: {
                files: 'scss/**/*.scss',
                tasks: ['sass:landing'],
                options: {
                    spawn: false
                }
            }
        },
        concurrent: {
            watchStyles: {
                tasks: ['watch:managerCss', 'watch:landingCss'],
                options: {
                    logConcurrentOutput: true
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
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.registerTask('build', [
        'browserify',
        'uglify',
        'sass:dist',
        'autoprefixer:manager',
        'autoprefixer:landing'
    ]);

    grunt.registerTask('watch-js', [
        'watchify'
    ]);

    grunt.registerTask('watch-styles', [
        'concurrent:watchStyles'
    ]);

    grunt.registerTask('default', ['build']);

};


