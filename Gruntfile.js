module.exports = function (grunt) {

    // Configurable paths
    var build = {
        app: 'app',
        dist: 'dist'
    };


    grunt.initConfig({

        build: build,

        symlink: {
            options: {
                overwrite: true,
                force: true
            },
            explicit: {
                src: 'node_modules',
                dest: 'app/node_modules'
            }
        },

        useminPrepare: {
            html: '<%= build.app %>/index.html',
            options: {
                dest: '<%= build.app %>'
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= build.app %>/**/*.js',
                'node_modules/weaver-ui-core/**/*',
                'node_modules/weaver-ui-core/components/**/*',
                'node_modules/weaver-ui-core/resources/**/*',
                '!node_modules/**/*',
                '!<%= build.app %>/node_modules/**/*',
                '!<%= build.app %>/components/**/*',
                '!<%= build.app %>/resources/**/*'
            ]
        },

        concat: {
            options: {
                separator: ';',
                sourceMap: false
            },
            core: {
                src: [
                    'node_modules/weaver-ui-core/app/config/coreConfig.js',

                    'node_modules/weaver-ui-core/app/components/version/version.js',
                    'node_modules/weaver-ui-core/app/components/version/version-directive.js',
                    'node_modules/weaver-ui-core/app/components/version/interpolate-filter.js',

                    '<%= build.app %>/config/appConfig.js',
                    '<%= build.app %>/config/apiMapping.js',

                    '<%= build.app %>/components/version/version.js',
                    '<%= build.app %>/components/version/version-directive.js',
                    '<%= build.app %>/components/version/interpolate-filter.js',

                    'node_modules/weaver-ui-core/app/core.js',
                    'node_modules/weaver-ui-core/app/setup.js',
                    'node_modules/weaver-ui-core/app/config/coreRuntime.js',
                    'node_modules/weaver-ui-core/app/config/coreAngularConfig.js',
                    'node_modules/weaver-ui-core/app/config/logging.js',

                    'node_modules/weaver-ui-core/app/constants/apiResponseActions.js',
                    'node_modules/weaver-ui-core/app/constants/httpMethodVerbs.js',

                    'node_modules/weaver-ui-core/app/directives/headerDirective.js',
                    'node_modules/weaver-ui-core/app/directives/footerDirective.js',
                    'node_modules/weaver-ui-core/app/directives/userDirective.js',
                    'node_modules/weaver-ui-core/app/directives/modalDirective.js',
                    'node_modules/weaver-ui-core/app/directives/alertDirective.js',
                    'node_modules/weaver-ui-core/app/directives/validationMessageDirective.js',
                    'node_modules/weaver-ui-core/app/directives/validatedSelectDirective.js',
                    'node_modules/weaver-ui-core/app/directives/validatedTextAreaDirective.js',

                    'node_modules/weaver-ui-core/app/services/accessControlService.js',
                    'node_modules/weaver-ui-core/app/services/wsService.js',
                    'node_modules/weaver-ui-core/app/services/wsApi.js',
                    'node_modules/weaver-ui-core/app/services/restApi.js',
                    'node_modules/weaver-ui-core/app/services/fileService.js',
                    'node_modules/weaver-ui-core/app/services/authService.js',
                    'node_modules/weaver-ui-core/app/services/storageService.js',
                    'node_modules/weaver-ui-core/app/services/utilityService.js',
                    'node_modules/weaver-ui-core/app/services/alertService.js',
                    'node_modules/weaver-ui-core/app/services/validationStore.js',
                    'node_modules/weaver-ui-core/app/services/userService.js',
                    'node_modules/weaver-ui-core/app/services/modalService.js',
                    'node_modules/weaver-ui-core/app/services/modelCache.js',
                    'node_modules/weaver-ui-core/app/services/modelUpdateService.js',

                    'node_modules/weaver-ui-core/app/repo/abstractRepo.js',

                    'node_modules/weaver-ui-core/app/model/abstractModel.js',
                    'node_modules/weaver-ui-core/app/model/assumedControl.js',
                    'node_modules/weaver-ui-core/app/model/user.js',

                    'node_modules/weaver-ui-core/app/controllers/abstractController.js',
                    'node_modules/weaver-ui-core/app/controllers/coreAdminController.js',
                    'node_modules/weaver-ui-core/app/controllers/authenticationController.js',
                    'node_modules/weaver-ui-core/app/controllers/loginController.js',
                    'node_modules/weaver-ui-core/app/controllers/registrationController.js',
                    'node_modules/weaver-ui-core/app/controllers/userController.js',
                    'node_modules/weaver-ui-core/app/controllers/errorPageController.js',
                ],
                dest: '<%= build.app %>/resources/scripts/core_concat.js'
            },
            angular: {
                src: [
                    '<%= build.app %>/**/*.js',
                    '!<%= build.app %>/config/appConfig.js',
                    '!<%= build.app %>/config/appConfig_sample.js',
                    '!node_modules/**/*',
                    '!<%= build.app %>/node_modules/**/*',
                    '!<%= build.app %>/components/**/*',
                    '!<%= build.app %>/resources/**/*',
                    '!<%= build.app %>/resources/scripts/app_concat.js'
                ],
                dest: '<%= build.app %>/resources/scripts/app_concat.js'
            }
        },

        uglify: {
            options: {
                mangle: false
            },
            core: {
                src: '<%= build.app %>/resources/scripts/core_concat.js',
                dest: '<%= build.app %>/resources/scripts/core_concat.js'
            },
            angular: {
                src: '<%= build.app %>/resources/scripts/app_concat.js',
                dest: '<%= build.app %>/resources/scripts/app_concat.js'
            }
        },

        usemin: {
            html: '<%= build.app %>/index.html',
            options: {
                assetsDirs: ['<%= build.app %>/resources/scripts']
            }
        },

        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/resources/styles/sass',
                    src: ['*.scss'],
                    dest: 'app/resources/styles',
                    ext: '.css'
                }]
            }
        },

        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('default', ['jshint', 'sass', 'symlink']);

    grunt.registerTask('watch', ['watch']);

    grunt.registerTask('develop', ['jshint', 'useminPrepare', 'concat', 'usemin', 'watch']);

    grunt.registerTask('deploy', ['jshint', 'useminPrepare', 'concat', 'uglify', 'usemin', 'sass']);

};
