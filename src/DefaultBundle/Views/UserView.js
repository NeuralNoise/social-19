define(['jquery','underscore','backbone','text!../Templates/UserTemplate.html'],function($,_,Backbone,UserTemplate){



    var UserView = Backbone.View.extend({
        template: _.template(UserTemplate),
        tagName:'tr',
        events:{
            'click .delete-user':'deleteUser'
        },

        initialize:function(model){
            this.model = model;
            this.listenTo(this.model,'destroy',this.delete);
            this.render();
        },

        render:function(){
            $('.friendlist tbody').append(this.$el.html(this.template(this.model.toJSON())));
            return this;
        },

        deleteUser:function(event){
            var id = $(event.target).attr('alt');
            this.model.url+='/deletefriend/id/'+id;
            this.model.destroy();
        },

        delete:function(userModel){
            console.log(userModel);
            this.$el.fadeOut('fast',function(){
                $(this).remove();
            });
        }
    });


    return UserView;
});