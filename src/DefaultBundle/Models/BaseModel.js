/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone'
],
    function ($, _, Backbone) {

        'use strict';

        var BaseModel = Backbone.Model.extend({
                url:'/server/',

                validation:function(formSelector){

                    var errors = {
                        exists:false,
                        messages:{}
                    };
                    $(formSelector + ' input, '+formSelector+' textarea').not('input[type=submit]').each(function(){
                        $(this).removeClass('input-error');
                        $(this).removeClass('input-error-verify');
                        if($.trim($(this).val()) === '') {
                            errors.exists = true;
                            $(this).addClass('input-error');
                            errors.messages.reqiured = 'Please, fill the required fields';
                        }
                        if($(this).attr('data-confirm')) {

                            var toConfirmVal = $(formSelector).find('input[name='+$(this).attr('data-confirm')+']');
                            if($.trim(toConfirmVal.val()) !== $.trim($(this).val())) {
                                toConfirmVal.addClass('input-error-verify');
                                $(this).addClass('input-error-verify');
                                errors.exists = true;
                                errors.messages.confirmation = 'Your confirmation\'s password is incorrect';
                            }
                        }

                    });
                    return errors;
                }


        });

        return BaseModel;
    });
