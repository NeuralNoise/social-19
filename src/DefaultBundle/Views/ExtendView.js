/**
 * Module of Base View.
 */
define([
    'jquery',
    'underscore',
    'backbone'
],
    function ($, _, Backbone) {

        'use strict';
        /**
         * Initialize base view which will be extended by other views
         * @type {Backbone.View}
         */
        var ExtendView = Backbone.View.extend({
            el:'.inner-content',
            /**
             * @property title - Main title of page (often it will be situated in top side of page)
             */
            title:'Welcome to Social Network. Join to us!!!',
            /**
             * @property title_selector - jquery selector of main title, where will be situated title
             */
            title_selector: '.custom-header h1',
            /**
             * Replace title of front view
             * @param title string - text of 'title_selector'
             * @returns {boolean}
             */
            changeTitle:function(title){

                if(typeof title !== 'string' && typeof title !== 'number') {
                    return false;
                }
                $(this.title_selector).fadeOut('100',function(){
                    $(this).text(title).fadeIn('100');
                });
            },

            /**
             * Add template in block which was specified by "el" property of View
             * @param template string - html template
             * @param callback - optional parameter, a callback function which will be called  when a new template will be shown
             * @returns {object} itself
             */
            showContent:function(template,callback) {
                var $this = this;
                this.$el.fadeOut('100',function(){
                    $this.$el.html(template);
                    $(this).fadeIn('100',callback);
                });
                return this;
            },

            /**
             * Method take a form data and return json format of these data
             * @param formSelector - jquery selector of form
             * @param excludeAttributes - which attributes will be excluded
             * @returns {object} data
             */
            formToJSON:function(formSelector,excludeAttributes){
                var data = {};
                $(formSelector + ' input, '+formSelector+' textarea').not('input[type=submit]').each(function(){
                   data[$(this).attr('name')] = $(this).val();
                });
                return data;
            },
            /**
             * Method kill all events and listernings
             * @returns {boolean}
             */
            remove:function() {
                this.stopListening();
                this.undelegateEvents();
                console.log('extend remove init');
                return true;

            }
         });

        return ExtendView;
    });
