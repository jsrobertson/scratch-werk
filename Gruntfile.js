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
                plugins: ['assemble-contrib-permalinks'],

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
                options: {
                    permalinks: {structure: ':basename/index.html'}
                },
                files: [{
                    expand: true,
                    cwd: '<%= site.templates %>/pages',
                    src: ['**/*.hbs'],
                    dest: '<%= site.dest %>'
                }]
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
            options: {
                livereload: true
            },
            css: {
                files: ['styles/**/*.scss'],
                tasks: ['sass','notify:sass']
            },
            templates: {
                files: ['templates/**/*.hbs'],
                tasks: ['assemble','notify:templates']
            },
            content: {
                files: ['content/*.md'],
                tasks: ['assemble','notify:content']
            }
        },

        // Connect webserver
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 5001,
                    base: '_output'
                }
            }
        },

        // Notifications
        notify: {
            connect: {
                options: {
                    title: '<%= site.lead %> ready',
                    message: 'View at http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>'
                }
            },
            sass: {
                options: {
                    title: 'SASS recompile',
                    message: 'Successful'
                }
            },
            templates: {
                options: {
                    title: 'Templates rebuild',
                    message: 'Successful'
                }
            },
            content: {
                options: {
                    title: 'Content update',
                    message: 'Successful'
                }
            }
        }

    });

    // Load Tasks
    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'assemble']);

    grunt.registerTask('setup', ['default', 'bowercopy', 'sass', 'concat']);

    grunt.registerTask('dev', ['setup', 'connect', 'notify:connect', 'watch']);
};
