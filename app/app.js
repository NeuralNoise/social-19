/**
 * @file base application instance
 */

define([
    'jquery',
    'underscore',
    'backbone',
    'app/router',
    'public/assets/js/jquery.ui.widget',
    'public/assets/js/metro-core',
    'public/assets/js/metro-notify'
], function ($, _, Backbone, Router) {

    'use strict';


    // Add your modules routing here
    Router.route("*path", "default", function (path) {
        this.loadModule("src/DefaultBundle/Main",{path:path,'Router':Router});
    });



    return {
        initialize: function () {
            Backbone.history.start();
        }
    };
});
