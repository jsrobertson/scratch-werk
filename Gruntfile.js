module.exports = function(grunt) {

    // Project configuration
    grunt.initConfig({

        // Projects metadata
        pkg : grunt.file.readJSON('package.json'),
        site: grunt.file.readYAML('_config.yml'),

        // Clean build dir
        clean : ['<%= site.dest %>/*'],

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
                    'scripts/vendor/jquery.js': 'jquery/dist/jquery.js'
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

        // Build HTML from templates and data
        assemble: {
            options: {
                flatten: true,
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
        }

    });

    // Load Tasks
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'assemble']);
};
