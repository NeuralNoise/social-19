define(['jquery','backbone'],function($,Backbone){

    var FindModel = Backbone.Model.extend({
            defaults:{
                id:''

            }
    });


    return FindModel;
});