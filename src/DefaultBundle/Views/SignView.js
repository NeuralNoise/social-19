/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    './ExtendView',
    'text!../Templates/SignFormTemplate.html'

],
    function ($, _, Backbone,ExtendView, SignFormTemplate) {

        'use strict';

        var SignView = ExtendView.extend({
            title:'Sign In',
            template: _.template(SignFormTemplate),
            initialize:function()
            {

                this.render();

            },
            render:function(){
                this.changeTitle(this.title);
                this.showContent(this.template());
                return this;
            }

        });

        return SignView;
    });
