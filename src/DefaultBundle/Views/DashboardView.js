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
        /**
         * @class DashboardView
         * @desc Initialize view of user's dashboard after sign in/up
         * @returns {object} DashboardView
         * @author Siarhei Sharykhin
         * @memberof  DefaultBundle
         */
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
