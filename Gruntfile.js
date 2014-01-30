module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        connect: {
            port : 8000

        },
        jshint:{
            options:{
                curly:true,
                eqeqeq:true,
                immed:true,
                latedef:true,
                newcap:true,
                noarg:true,
                sub:true,
                undef:true,
                eqnull:true,
                browser:true,
                globals:{
                    jQuery:true,
                    $:true,
                    console:true

                },
                '-W117':false,
                ignores:['src/**/*Spec.js']

            },
            files: {
                src: ['public/**/.js','src/**/*.js']
            }

        },

        jasmine: {

            src: 'src/**/*.js',
            options: {
                host: 'http://127.0.0.1:8000/',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: '',
                        paths: {
                            'jquery': 'vendors/jquery/jquery',
                            'underscore': 'vendors/underscore/underscore',
                            'backbone': 'vendors/backbone/backbone',
                            "text": 'vendors/require-text/text'
                        },
                        shim: {
                            'underscore': {
                                exports: '_'
                            },
                            'backbone':{
                                deps:['jquery','underscore'],
                                exports:'Backbone'
                            }
                        }

                    }
                }
            }

        },
        exec: {
            /*check: {
                command: './node_modules/requirejs/bin/r.js -o app/build/app.build.js',
                command: 'cd dist',
                command: 'rm -rf app/build',
                command: 'rm -rf node_modules',
                command: 'rm -rf .bowerrc',
                command: 'rm -rf component.json',
                command: 'rm -rf Gruntfile.js',
                command: 'rm -rf package.json',
                command: 'rm -rf README.md',
                command: 'rm -rf package.json',
                command: 'rm -rf .idea'

                       //stdout: true
            },*/
            build:{
                command: 'app/build/build.sh'
            }
        },
        watch:{
            scripts:{
                files:['src/**/*.js','public/**/*.js'],
                tasks:['jasmine','jshint']

            }
        },
        jsdoc : {
            dist : {
                jsdoc:'./node_modules/.bin/jsdoc',
                src: ['src/**/*.js'],
                options: {
                    destination: 'app/doc'
                }

            }

        }


    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-jsdoc');


    grunt.registerTask('test',['connect','jshint','jasmine','watch']);
    grunt.registerTask('build',['exec:build']);
    grunt.registerTask('doc',['jsdoc:dist']);
};