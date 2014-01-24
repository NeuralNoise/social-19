/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([ 
    'jquery',
    'underscore',
    'backbone',
    'text!../Templates/DefaultTemplate.html'

],
    function ($, _, Backbone, DefaultTemplate) {

        'use strict';

        var MainView = Backbone.View.extend({
            el:$('.container'),
            template: _.template(DefaultTemplate),
            initialize:function()
            {
                this.setStyle('style.css').setScript('jquery.ui.widget.js').setScript('metro-core.js').setScript('metro-dropdown.js').setScript('metro-pull.js').setScript('metro.min.js');
                this.render();

            },

            render:function(){
                this.$el.html(this.template());
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
