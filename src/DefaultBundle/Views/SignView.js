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

            submit:function(event){
                console.log('click is init');
                event.preventDefault();
                if(this.type==='sign_up') {
                    var $target = $(event.target);
                    var data = this.formToJSON('#'+$target.attr('id'));
                    delete data.confirm_password;
                    var userModel = new UserModel();
                    var errorsValidation = userModel.validation('#'+$target.attr('id'));
                    if(!errorsValidation.exists){
                       userModel.url = userModel.url+'/create';
                       userModel.save(data,{
                           success:function(model,response){
                               console.log(response);
                               if(response.status===500) {
                                   $.Notify({
                                       content: response.msg,
                                       caption:"Info",
                                       style:{background:'#971515',color:'#FFFFFF'}
                                   });

                               }
                               if(response.status===200) {
                                 var router = new  Backbone.Router();
                                 router.navigate('/dashboard',{trigger:true});
                               }
                           },
                           wait:true,
                           validate:false,
                           error:function(model,error){
                               console.log(model);
                           }
                       });
                   } else {
                        _.each(errorsValidation.messages,function(msg,index){
                            $.Notify({
                                content: msg,
                                caption:"Info",
                                style:{background:'#971515',color:'#FFFFFF'}
                            });
                        });


                    }

                }

            }

        });

        return SignView;
    });
