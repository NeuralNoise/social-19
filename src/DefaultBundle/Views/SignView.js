define([
    'jquery',
    'underscore',
    'backbone',
    './ExtendView',
    '../Models/UserModel',
    'text!../Templates/SignFormTemplate.html',
    '../../CommonBundle/Validations/Validations',
    'public/assets/js/metro-input-control'

],
    function ($, _, Backbone,ExtendView,UserModel, SignFormTemplate,Validations) {

        'use strict';
        /**
         * @class SignView
         * @desc initialize View for sign in/up form
         * @aythor Siarhei Sharykhin
         * @returns {object} SignView
         * @memberof DefaultBundle
         */
        var SignView = ExtendView.extend({
            /**
             * @property {string} title - title of sign in/up form. Default 'Sign In'
             * @memberof DefaultBundle.SignView
             */
            title:'Sign In',
            /**
             * @property {null|string} type - type of action. Example 'sign_up'
             * @memberof DefaultBundle.SignView
             */
            type:null,
            /**
             * @property {function} template - default propery of Backbone.View. It contains template of sign in/up forms
             * @memberof DefaultBundle.SignView
             */
            template: _.template(SignFormTemplate),
            events:{
                'submit #signForm':'submit'
            },
            initialize:function(options)
            {

                if(options !== undefined) {
                    this.type = options.type;
                    this.user = options.user;
                    this.router = options.router;
                    if(this.type === 'sign_up') {
                        this.title = 'Sign Up';
                    }
                }
                this.checkUserExists(this.user);
                this.render();

            },
            /**
             * @method render
             * @desc change title and show template
             * @author Siarhei Sharykhin
             * @inner
             * @memberof DefaultBundle.ExtendView
             * @returns {object}
             */
            render:function(){
                this.changeTitle(this.title);
                this.showContent(this.template({type:this.type}),function(){$.Metro.initInputs();});

                return this;
            },
            /**
             * @method submit
             * @desc hanldle authentication or registration. After redirect to dashboard
             * @author Siarhei Sharykhin
             * @inner
             * @param {object} event
             */
            submit:function(event){
                console.log('click is init ' + this.type);
                event.preventDefault();
                //Get current target
                var $target = $(event.target);
                //Get data from from in JSON format
                var data = this.formToJSON('#'+$target.attr('id'));
                //Create identifier of errors
                var errorsValidation = Validations.formSubmit('#'+$target.attr('id'));
                //Registration process
                if(this.type==='sign_up') {
                    //remove confirm_password property from data
                    delete data.confirm_password;
                    //Initialize new model
                    var userModel = new UserModel();
                    //If all data is valid
                    if(!errorsValidation.exists){
                       //set url for server
                       userModel.url = userModel.url+'/create';
                        //Create new user
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
                       }); // end userModel.save
                   } else {
                        //If errors were occured, appropriate message will be shown
                        _.each(errorsValidation.messages,function(msg,index){
                            $.Notify({
                                content: msg,
                                caption:"Info",
                                style:{background:'#971515',color:'#FFFFFF'}
                            });
                        });
                    }

                } // end sign_up
                //Authentication process
                if(this.type==='sign_in') {
                    //Check error during
                    if(errorsValidation.exists) {
                        //If errors were occured, appropriate message will be shown
                        _.each(errorsValidation.messages,function(msg,index){
                            $.Notify({
                                content: msg,
                                caption:"Info",
                                style:{background:'#971515',color:'#FFFFFF'}
                            });
                        });
                        return false;
                    }

                    //Try to login, and if all ok, redirect to dashboard
                    if(this.user.login(data)){
                        var router = new  Backbone.Router();
                        router.navigate('/dashboard',{trigger:true});
                    } else {
                        //Show notifications
                        $.Notify({
                            content: 'Current email or password don\'t exist',
                            caption:"Authenticate",
                            style:{background:'#3B4097',color:'#FFFFFF'}
                        });
                        return false;
                    }

                } // end sign_in

            } //end submit

        }); //end SignView

        return SignView;
    });
