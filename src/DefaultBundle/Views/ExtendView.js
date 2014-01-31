
define([
    'jquery',
    'underscore',
    'backbone'
],
    function ($, _, Backbone) {

        'use strict';
        /**
         *
         * @class ExtendView
         * @desc Initialize base view which will be extended by other views
         * @type {Backbone.View}
         * @memberof  DefaultBundle
         * @inner
         */
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


            showContent:function(template,callback) {
                var $this = this;
                this.$el.fadeOut('100',function(){
                    $this.$el.html(template);
                    $(this).fadeIn('100',callback);
                });
                return this;
            },


            formToJSON:function(formSelector,excludeAttributes){
                var data = {};
                $(formSelector + ' input, '+formSelector+' textarea').not('input[type=submit]').each(function(){
                   data[$(this).attr('name')] = $(this).val();
                });
                return data;
            },

            remove:function() {
                this.stopListening();
                this.undelegateEvents();
                console.log('extend remove init');
                return true;

            }
         });

        return ExtendView;
    });
