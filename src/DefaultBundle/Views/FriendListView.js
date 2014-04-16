define(['jquery',
        'underscore',
        'backbone',
        './ExtendView',
        '../Collections/UsersCollection',
        '../Models/UserModel',
        'text!../Templates/DashboardTemplate.html',
        'text!../Templates/FriendListTemplate.html',
        '../../CommonBundle/Components/Helper'],function($, _, Backbone,ExtendView,UserCollection,UserModel,DashboardTemplate,FriendListTemplate,Helper){

        var FriendList = ExtendView.extend({
           el:$('.container'),
           title:'Friend List',
           layout: _.template(DashboardTemplate),
           template: _.template(FriendListTemplate),
           events:{},

           initialize:function(options) {
               if(options.user.uid === null) {
                   options.router.navigate('/',{trigger:true});
                   return false;
               }
               this.user = options.user;
               this.userList = new UserCollection();
               this.userList.url +='/friends/id/'+this.user.uid;
               this.helper = Object.create(Helper);
               this.userModel = new UserModel();
               this.userModel.url =  this.userModel.url + '/getuser/id/'+this.user.uid;
               var $this = this;
               this.userList.fetch({success:function(){
                   $this.render();
               }});
           },

            render:function(){
                var $this = this;
                this.showContent(this.layout({user:this.userModel.toJSON()}),function(){
                    $.Metro.initDropdowns();
                    $('.inner-content').html($this.template({user:$this.userModel.toJSON()}));
                    _.each($this.userList.models[0].get('users'),function(friend){

                    });
                    console.log($this.userList.models[0].get('users'));

                });

                return this;
            }
        });

        return FriendList;
});
