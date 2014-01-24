(function () {


    require.config({
        baseUrl:'/',
        paths: {
            'jquery': 'vendors/jquery/jquery',
            'underscore': 'vendors/underscore/underscore',
            'backbone': 'vendors/backbone/backbone',
            'text': 'vendors/require-text/text'

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
    });

    require(['app/app'], function (app) {
        app.initialize();
    });

}());