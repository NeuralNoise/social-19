define(['jquery','backbone','../Models/UserModel'],function($,Backbone,UserModel){

    var UserCollection  = Backbone.Collection.extend({
       model:UserModel,
       url:'/server/users',

        initialize:function(){

        }
    });

    return UserCollection;

});