/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define([
    'jquery',
    'underscore',
    'backbone',
    'app/router',
    'public/assets/js/jquery.ui.widget',
    'public/assets/js/metro.min',
    'public/assets/js/metro-pull',
    'public/assets/js/metro-dropdown',
    'public/assets/js/metro-input-control',
    'public/assets/js/metro-core'

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
