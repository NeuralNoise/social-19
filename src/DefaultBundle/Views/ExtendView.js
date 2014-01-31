
define([
    'jquery',
    'underscore',
    'backbone'
],
    function ($, _, Backbone) {

        'use strict';
        /**
         * @class ExtendView
         * @desc Initialize base view which will be extended by other views
         * @author Siarhei Sharykhin
         * @returns {object} ExtendView
         * @memberof  DefaultBundle
         */
        var ExtendView = Backbone.View.extend({
            /**
             * @property {string} el - element, where instance of view will be situated
             * @memberof DefaultBundle.ExtendView
             */
            el:'.inner-content',

            /**
             * @property {string} title  - title of header
             * @memberof DefaultBundle.ExtendView
             */
            title:'Welcome to Social Network. Join to us!!!',

            title_selector: '.custom-header h1',

            changeTitle:function(title){
                var $this = $(this);
                if(typeof title !== 'string' && typeof title !== 'number') {
                    return false;
                }
                $(this.title_selector).removeClass('rotateIn').removeClass('animate0').fadeOut('100',function(){
                    $(this).text(title).show().addClass('rotateIn').addClass('animate0');

                });
            },

            /**
             * @method showContent
             * @author Siarhei Sharykhin
             * @param {string} template html template
             * @param {function} callback function which will be called after template will be shown
             * @inner
             * @memberof DefaultBundle.ExtendView
             * @returns {object} itself instance of ExtendView
             */
            showContent:function(template,callback) {
                var $this = this;
                this.$el.removeClass('lightSpeedIn').removeClass('lightSpeedOut').removeClass('animate0').addClass('lightSpeedOut').addClass('animate0').fadeOut('100',function(){
                    $this.$el.html(template);
                    $(this).removeClass('lightSpeedOut').addClass('lightSpeedIn').addClass('animate0').show(callback);
                });
                return this;
            },

            /**
             * @method formToJSON
             * @desc transform form data to json format
             * @author Siarhei Sharykhin
             * @param {string} formSelector jquery selector of form
             * @param {string} excludeAttributes list of attrubites which will be excluded from form
             * @returns {object} json data
             * @memberof DefaultBundle.ExtendView
             */
            formToJSON:function(formSelector,excludeAttributes){
                var data = {};
                $(formSelector + ' input, '+formSelector+' textarea').not('input[type=submit]').each(function(){
                   data[$(this).attr('name')] = $(this).val();
                });
                return data;
            },

            /**
             * @method remove
             * @desc remove all events and stop listens
             * @autho Siarhei Sharykhin
             * @returns {boolean}
             * @memberof DefaultBundle.ExtendView
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
