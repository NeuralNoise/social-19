/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone'
],
    function ($, _, Backbone) {

        'use strict';

        var BaseModel = Backbone.Model.extend({
                url:'/server/'
        });

        return BaseModel;
    });
