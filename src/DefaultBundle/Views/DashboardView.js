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
            events:{
              'click .logOut':'logOut'
            },
            initialize:function()
            {

                this.render();


            },

            render:function(){
                this.showContent(this.template(),function(){$.Metro.initDropdowns();});
                return this;
            },
            /**
             * @method logOut
             * @desc log out user from dashboard
             * @author Siarhei Sharykhin
             * @inner
             * @memberof DefaultBundle.DashboardView
             */
            logOut:function(){
                $.ajax({
                   type:'POST',
                   'url':'/server/users/logout',
                   dataType:'json',
                   success:function(data) {
                       if(data.status === 200) {
                           var router = new Backbone.Router();
                           router.navigate('#/',{trigger:true});
                       }
                   }
                });
            }

        });

        return DashboardView;
    });
