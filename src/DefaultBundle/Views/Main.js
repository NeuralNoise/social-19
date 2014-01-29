/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([ 
    'jquery',
    'underscore',
    'backbone',
    './ExtendView',
    'text!../Templates/DefaultTemplate.html',
    'public/assets/js/metro-dropdown'

],
    function ($, _, Backbone,ExtendView, DefaultTemplate) {

        'use strict';

        var MainView = ExtendView.extend({
            el:$('.container'),
            template: _.template(DefaultTemplate),
            initialize:function()
            {

                this.setStyle('style.css');
                this.render();


            },

            render:function(){
                this.$el.html(this.template());
                $.Metro.initDropdowns();
                return this;
            },
            setStyle:function(css) {
                $('head').append("<link rel='stylesheet' type='text/css' href='/src/DefaultBundle/assets/css/"+css+"' />");
                return this;

            },
            setScript:function(js){
                $('head').append("<script type='text/javascript' src='/public/assets/js/"+js+"'></script>");
                return this;
            }



        });

        return MainView;
    });
