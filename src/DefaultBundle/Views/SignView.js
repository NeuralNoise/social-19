/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define, $, Backbone, console */

define([
    'jquery',
    'underscore',
    'backbone',
    './ExtendView',
    'text!../Templates/SignFormTemplate.html'

],
    function ($, _, Backbone,ExtendView, SignFormTemplate) {

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
                console.log('submit triggered');
            }

           /* remove:function(){

                this.undelegateEvents();

            }*/

        });

        return SignView;
    });
