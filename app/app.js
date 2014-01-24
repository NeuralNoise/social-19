/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define([
    'jquery',
    'underscore',
    'backbone',
    'app/router'
], function ($, _, Backbone, Router) {

    'use strict';

    // Add your modules routing here
    Router.route("*path", "default", function (path) {

        this.loadModule("src/DefaultBundle/Main",{path:path});
    });

    return {
        initialize: function () {
            Backbone.history.start();
        }
    };
});
