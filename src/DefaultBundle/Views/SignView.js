/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */
/**
 * @file - Describe SignView
 * @author Siarhei Sharykhin
 */
define([
    'jquery',
    'underscore',
    'backbone',
    './ExtendView',
    '../Models/UserModel',
    'text!../Templates/SignFormTemplate.html',
    'public/assets/js/metro-input-control'

],
    function ($, _, Backbone,ExtendView,UserModel, SignFormTemplate) {

        'use strict';

        var SignView = ExtendView.extend({
            title:'Sign In',
            type:null,
            template: _.template(SignFormTemplate),
            events:{
                'submit #signForm':'submit'
            },
            initialize:function(options)
            {

                if(options !== undefined) {
                    this.type = options.type;
                    if(this.type === 'sign_up') {
                        this.title = 'Sign Up';
                    }
                }

                this.render();

            },
            render:function(){
                this.changeTitle(this.title);
                this.showContent(this.template({type:this.type}),function(){$.Metro.initInputs();});

                return this;
            },
            /**
             * Method called when user click on "sign in" or "sign up", and depending of the parameter
             * method stores user or authorizes
             * @param event - object event of click
             */
            submit:function(event){
                console.log('click is init');
                event.preventDefault();
                if(this.type==='sign_up') {
                    var $target = $(event.target);
                    var data = this.formToJSON('#'+$target.attr('id'));
                    delete data.confirm_password;
                    var userModel = new UserModel();

                    if(userModel.validation('#'+$target.attr('id'))){
                       userModel.url = userModel.url+'/create';
                       userModel.save(data,{
                           success:function(response){
                               console.log(response);
                               //if(response.status===200) {
                               //  var router = new  Backbone.Router();
                               //  router.navigate('/dashboard',{trigger:true});
                               //}
                           },
                           wait:true,
                           validate:false,
                           error:function(model,error){
                               console.log(model);
                           }
                       });
                   }

                }

            }

        });

        return SignView;
    });
