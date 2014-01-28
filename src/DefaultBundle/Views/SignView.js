/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    './ExtendView',
    '../Models/UserModel',
    'text!../Templates/SignFormTemplate.html'

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

                this.listenTo(this,'all',this.remove,this);
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
                this.showContent(this.template({type:this.type}));

                return this;
            },

            submit:function(event){
                event.preventDefault();
                if(this.type==='sign_up') {
                    var $target = $(event.target);
                    var data = this.formToJSON('#'+$target.attr('id'));
                    delete data.confirm_password;
                    var userModel = new UserModel();
                    userModel.url = userModel.url+'/create';
                    userModel.save(data,{
                        wait:true,
                        success:function(model, response){
                            if(response.status===200) {
                                var router = new  Backbone.Router();
                                router.navigate('/dashboard',{trigger:true});
                            }

                        }
                    });

                }

            }

           /* remove:function(){

                this.undelegateEvents();

            }*/

        });

        return SignView;
    });
