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

                    var errors;
                    $(formSelector + ' input, '+formSelector+' textarea').not('input[type=submit]').each(function(){
                        $(this).removeClass('input-error');
                        if($.trim($(this).val()) === '') {
                            errors = true;
                            $(this).addClass('input-error');
                        }

                    });
                    return !errors;
                }


        });

        return BaseModel;
    });
