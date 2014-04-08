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

            src: 'src/**/*Spec.js',
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
                            'text': 'vendors/requirejs-text/text'
                        },
                        shim: {
                            'jquery':{
                                exports: '$'
                            },
                            'underscore': {
                                exports: '_'
                            },
                            'backbone':{
                                deps:['jquery','underscore'],
                                exports:'Backbone'
                            },
                            'public/assets/js/jquery.ui.widget':{
                                deps:['jquery']
                            },
                            'public/assets/js/metro-core':{
                                deps:['public/assets/js/jquery.ui.widget']
                            },
                            'public/assets/js/metro-notify':{
                                deps:['public/assets/js/jquery.ui.widget']
                            },
                            'public/assets/js/metro-dropdown':{
                                deps:['public/assets/js/jquery.ui.widget','public/assets/js/metro-core']
                            },
                            'public/assets/js/metro-input-control':{
                                deps:['public/assets/js/jquery.ui.widget','public/assets/js/metro-core']
                            },
                            'public/assets/js/ajaxUpload':{
                                deps:['jquery']
                            }

                        }

                    }
                }
            }

        },
        exec: {

            build:{
                command: 'app/build/build.sh'
            }
        },
        watch:{
            scripts:{
                files:['src/**/*.js','public/**/*.js'],
                tasks:['jshint','jasmine']

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

        },
        csslint: {
            strict: {
                options: {
                    import: 2,
                    "qualified-headings": true,
                    "unique-headings": true,
                    "known-properties": false,
                    "important":false,
                    floats:false
                    /*formatters: [
                        {id: 'junit-xml', dest: 'report/csslint_junit.xml'},
                        {id: 'csslint-xml', dest: 'report/csslint.xml'}
                    ]*/
                },
                src: ['src/**/*.css']
            }

        },
        shell: {
            listFolders: {
                options: {
                    stdout: true
                },
                command: 'ls'
            }
        }



    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-jsdoc');


    grunt.registerTask('test',['connect','jshint','jasmine','watch']);
    grunt.registerTask('build',['exec:build']);
    grunt.registerTask('doc',['jsdoc:dist']);
};