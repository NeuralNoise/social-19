/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    './ExtendView',
    'text!../Templates/DashboardTemplate.html',
    'public/assets/js/metro-dropdown'

],
    function ($, _, Backbone,ExtendView, DashboardTemplate) {

        'use strict';

        var DashboardView = ExtendView.extend({
            el:$('.container'),
            title:'Dashboard',
            template: _.template(DashboardTemplate),
            initialize:function()
            {

                this.render();


            },

            render:function(){
                this.showContent(this.template(),function(){$.Metro.initDropdowns();});
                this.changeTitle(this.title);

                return this;
            }

        });

        return DashboardView;
    });
