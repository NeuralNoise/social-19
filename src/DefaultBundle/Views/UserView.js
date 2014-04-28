define(['jquery','underscore','backbone','text!../Templates/UserTemplate.html'],function($,_,Backbone,UserTemplate){



    var UserView = Backbone.View.extend({
        template: _.template(UserTemplate),
        tagName:'tr',
        events:{
            'click .delete-user':'deleteUser',
            'click .invite' : 'makeChoice'

        },

        initialize:function(model,invitations){
            this.model = model;
            this.invitations = invitations;
            this.listenTo(this.model,'destroy',this.delete);
            this.render();
        },

        render:function(){
            var data = this.model.toJSON();
            data.invitations=this.invitations;
            $('.friendlist tbody').append(this.$el.html(this.template(data)));
            return this;
        },

        deleteUser:function(event){
            var id = $(event.target).attr('alt');
            this.model.url+='/deletefriend/id/'+id;
            this.model.destroy();
        },

        delete:function(userModel){
            this.$el.fadeOut('fast',function(){
                $(this).remove();
            });
        },

        makeChoice:function(event){
            var row = $(event.target).parents('tr');
            var id = $(event.target).attr('alt');
            var choice = $(event.target).attr('title');
            $.get('/server/users/'+choice+'invite/id/'+id,function(response){
                if(response.status===200) {
                    row.fadeOut();
                    $.Notify({
                        content: response.msg,
                        caption:"Info",
                        style:{background:(choice === 'accept')? '#008523': '#971515',color:'#FFFFFF'}

                    });
                    $('.invitations-number').text(parseInt($('.invitations-number').text())-1);
                    if(parseInt($('.invitations-number').text())===0) {
                        $('.invitations-number').text('');
                        $('.friendlist').html("<h2>You don't have invitations</h2>");
                    }
                }

            });
        },

    });


    return UserView;
});