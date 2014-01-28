(function () {


    require.config({
        baseUrl:'/',
        paths: {
            'jquery': 'vendors/jquery/jquery',
            'underscore': 'vendors/underscore/underscore',
            'backbone': 'vendors/backbone/backbone',
            'text': 'vendors/requirejs-text/text'

        },

        shim: {
            'underscore': {
                exports: '_'
            },
            jquery:{
                exports:'$'
            },
            'backbone':{
                deps:['jquery','underscore'],
                exports:'Backbone'
            },
            'public/assets/js/metro.min':{
                deps:['jquery','public/assets/js/jquery.ui.widget','public/assets/js/metro-pull']
            },
            'public/assets/js/jquery.ui.widget':{
                deps:['jquery']
            },
            'public/assets/js/metro-pull':{
                deps:['jquery','public/assets/js/jquery.ui.widget']
            },
            'public/assets/js/metro-dropdown':{
                deps:['jquery','public/assets/js/jquery.ui.widget']
            },
            'public/assets/js/metro-input-control':{
                deps:['jquery','public/assets/js/jquery.ui.widget']
            },
            'public/assets/js/metro-core':{
                deps:['jquery','public/assets/js/jquery.ui.widget']
            }
        }
    });

    require(['app/app'], function (app) {
        app.initialize();
    });

}());