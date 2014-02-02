/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    './BaseModel'
],
    function ($, _, Backbone,BaseModel) {

        'use strict';

        var UserModel = BaseModel.extend({
                defaults:{
                    firstname:'',
                    lastname:'',
                    age:'',
                    city:'',
                    email:'',
                    login:'',
                    password:'',
                    sex:'male'
                },


                validate:function(attrs,options){

                    if($.trim(attrs.email) === '' ) {
//                       console.log('here');
                       return 'here';
                    }

                },

                url:'/server/users'


        });

        return UserModel;
    });
