/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone'
],
    function ($, _, Backbone) {

        'use strict';

        var ExtendView = Backbone.View.extend({
            el:'.inner-content',
            title:'Welcome to Social Network. Join to us!!!',
            title_selector: '.custom-header h1',
            changeTitle:function(title){
                if(typeof title !== 'string' && typeof title !== 'number') {
                    return false;
                }
                $(this.title_selector).fadeOut('100',function(){
                    $(this).text(title).fadeIn('100');
                });
            },
            showContent:function(template) {
                var $this = this;
                this.$el.fadeOut('100',function(){
                    $this.$el.html(template);
                    $(this).fadeIn('100');
                });
                return this;
            }
         });

        return ExtendView;
    });
