module.exports = function(config){
    config.set({

        basePath : './',

        files : [

            'app/config/appConfig.js',
            'app/config/apiMapping.js',

            'app/node_modules/jquery/dist/jquery.js',
            'app/node_modules/angular/angular.js',
            'app/node_modules/angular-mocks/angular-mocks.js',
            'app/node_modules/angular-route/angular-route.js',
            'app/node_modules/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'app/node_modules/ng-table/bundles/ng-table.min.js',
            'app/node_modules/ng-csv/build/ng-csv.min.js',
            'app/node_modules/angular-sanitize/angular-sanitize.min.js',

            'app/node_modules/weaver-ui-core/app/config/coreConfig.js',

            'app/node_modules/weaver-ui-core/app/components/**/*.js',

            'app/node_modules/weaver-ui-core/app/core.js',

            'app/node_modules/weaver-ui-core/app/**/*.js',


            'app/components/**/*.js',

            'tests/testSetup.js',

            'app/app.js',

            'app/config/runTime.js',

            'app/controllers/**/*.js',

            'app/directives/**/*.js',

            'app/services/**/*.js',

            'app/models/**/*.js',


            'tests/mocks/**/*.js',

            'tests/unit/**/*.js'

        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
