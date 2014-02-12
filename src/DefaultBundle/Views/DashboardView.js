define([
    'jquery',
    'underscore',
    'backbone',
    './ExtendView',
    '../Models/UserModel',
    'text!../Templates/DashboardTemplate.html',
    'text!../Templates/FindTemplate.html',
    '../Collections/FindCollection',
    '../Views/ItemView',
    'public/assets/js/metro-dropdown'

],
    function ($, _, Backbone,ExtendView,UserModel, DashboardTemplate,FindTemplate,FindCollection,ItemView) {

        'use strict';
        /**
         * @class DashboardView
         * @desc Initialize view of user's dashboard after sign in/up
         * @returns {object} DashboardView
         * @author Siarhei Sharykhin
         * @memberof  DefaultBundle
         */
        var DashboardView = ExtendView.extend({
            el:$('.container'),
            title:'Dashboard',
            template: _.template(DashboardTemplate),
            events:{
              'click .logOut':'logOut',
              'click .find':'find'

            },
            initialize:function(options)
            {
                if(options.user.uid === null) {
                    options.router.navigate('/',{trigger:true});
                    return false;
                }
                this.user = options.user;
                this.userModel = new UserModel();
                this.userModel.url =  this.userModel.url + '/getuser/id/'+this.user.uid;

                var $this = this;
                this.userModel.fetch({success:function(){$this.render();}});


            },

            render:function(){
                this.showContent(this.template({user:this.userModel.toJSON()}),function(){$.Metro.initDropdowns();});
                return this;
            },
            /**
             * @method logOut
             * @desc log out user from dashboard
             * @author Siarhei Sharykhin
             * @inner
             * @memberof DefaultBundle.DashboardView
             */
            logOut:function(){
                $.ajax({
                   type:'POST',
                   'url':'/server/users/logout',
                   dataType:'json',
                   success:function(data) {
                       if(data.status === 200) {
                           var router = new Backbone.Router();
                           router.navigate('#/',{trigger:true});
                       }
                   }
                });
            },

            find:function(event) {
                event.preventDefault();
                var findTemplate = _.template(FindTemplate);
                var whatFind = $(event.target).attr('alt');
                this.changeCustomContent(findTemplate({whatFind:whatFind}),".inner-content",function(){

                    var collection = new FindCollection({type:'users'});
                    collection.fetch({success:function(data){
                        console.log(data);
                        _.each(data.models,function(model){
                            var itemView = new ItemView(model);
                            itemView.show('.listview');

                        });
                    }});
                });

                //console.log(this.userModel);
            }


        });

        return DashboardView;
    });
