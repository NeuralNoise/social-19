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
              'click .find':'find',
              'keyup #search-panel':'search'

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

            /**
             * @method find
             * @desc it shows a list of needed items
             * @athor Siarhei Sharykhin
             * @memberof DefaultBundle.DashboardView
             * @param event
             */
            find:function(event) {
                event.preventDefault();
                var findTemplate = _.template(FindTemplate);
                var whatFind = $(event.target).attr('alt');


                this.changeCustomContent(findTemplate({whatFind:whatFind}),".inner-content",function(){
                    $('#search-panel').attr('name',whatFind);
                    var collection = new FindCollection({type:whatFind});
                    collection.fetch({success:function(data){

                        _.each(data.models,function(model){
                            var itemView = new ItemView(model,whatFind);
                            itemView.show('.listview');

                        });
                    }});
                });

                //console.log(this.userModel);
            },


            search:function(event) {
                var $this = $(event.target);
                var searchVal = $this.val();
                var whatFind = $this.attr('name');
                var collection = new FindCollection({type:whatFind,searchVal:searchVal});
                collection.fetch({success:function(data){
                    $('.listview > a').addClass('animate0').addClass('rollOut');
                    _.each(data.models,function(model){
                        var itemView = new ItemView(model,whatFind);
                        itemView.show('.listview');

                    });
                }});
                console.log(searchVal);
            }


        });

        return DashboardView;
    });
