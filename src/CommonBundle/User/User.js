define([
    'jquery',
    'underscore',
    'backbone'
    ], function($,_,Backbone){


        var User = function(){
            this.uid =  this.isAuthenticate();
            this.role = this.getRole();
        };
        User.prototype.isAuthenticate = function() {
           var uid = null;

            $.ajax({
               type:'POST',
               url:'/server/users/authenticate',
               dataType:'json',
               async:false,
               success:function(data) {
                   uid = data.uid;
               }
            });
           return uid;
        };

        User.prototype.getRole = function() {

            var role=0;
            $.ajax({
                type:'POST',
                url:'/server/users/getrole',
                dataType:'json',
                async:false,
                success:function(data) {
                    role = data.role;
                }
            });
            return role;

        };

        User.prototype.login = function(data) {
            var authenticate = false;
            $.ajax({
               type:'POST',
               url:'/server/users/login',
               dataType:'json',
               async:false,
               data:{data:data},
               success:function(data) {
                   if(data.status===200) {
                      authenticate = true;
                   }
               }
            });

            return authenticate;
        };
        return User;


    }); //end define