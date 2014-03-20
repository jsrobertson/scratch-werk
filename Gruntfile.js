module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({

        // Projects metadata
        pkg : grunt.file.readJSON('package.json'),
        site: grunt.file.readYAML('_config.yml'),

        // Clean build dir
        clean : ['<%= site.dest %>/*'],

        // Build HTML from templates and data
        assemble: {
            options: {
                flatten: true,
                production: false,
                assets: '<%= site.assets %>',

                // Metadata
                pkg: '<%= pkg %>',
                site: '<%= site %>',
                data: ['<%= site.data %>'],

                // Templates
                partials: '<%= site.includes %>',
                layoutdir: '<%= site.layouts %>',
                layout: '<%= site.layout %>',

                // Extensions
                helpers: '<%= site.helpers %>'
            },
            pages: {
                files: {'<%= site.dest %>/': ['<%= site.templates %>/pages/*.hbs']}
            }
        },

        // Bower copy stuff
        bowercopy: {
            options: {
                clean: true
            },
            css: {
                files: {
                    'styles/vendor/normalize.scss': 'normalize.css/normalize.css',
                    'styles/vendor/grid.scss': 'csswizardry-grids/csswizardry-grids.scss'
                }
            },
            js: {
                files: {
                    'scripts/vendor/jquery.js': 'jquery/dist/jquery.js',
                    '<%= site.assets %>/js/vendor/modernizr.js': 'modernizr/modernizr.js'
                }
            }
        },

        // Compile SASS
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= site.assets %>/css/main.css': 'styles/main.scss'
                }
            }
        },

        // Concatenate JS
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                  src: ['scripts/vendor/jquery.js', 'scripts/modules/main.js'],
                  dest: '<%= site.assets %>/js/main.js',
            },
        },

        // Watch for changes
        watch: {
            css: {
                files: ['styles/**/*.scss'],
                tasks: ['sass']
            },
            templates: {
                files: ['templates/**/*.hbs'],
                tasks: ['clean','assemble']
            }
        },

        // Connect webserver
        connect: {
            server: {
                options: {
                    port: 5001,
                    base: '_output',
                    keepalive: true
                }
            }
        }

    });

    // Load Tasks
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'assemble']);

    grunt.registerTask('setup', ['clean', 'assemble', 'bowercopy', 'sass', 'concat']);

    grunt.registerTask('dev', ['setup', 'watch']);
};
