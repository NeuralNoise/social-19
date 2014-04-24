define(['backbone','text!../Templates/ItemTemplate.html','public/assets/js/metro-dialog','public/assets/js/metro-touch-handler'],function(Backbone,ItemTemplate){

    var ItemView = Backbone.View.extend({
        tagName:'a',
        className:'list',
        template: _.template(ItemTemplate),
        events:{
            'click .invitetofriend' :'inviteToFriends'
        },

        initialize:function(model,type) {
            this.model = model;
            this.model.set('type',type);
            this.render();
        },

        render:function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        show:function(selector,options) {
            options = options || {};
            if(options.place === undefined) {
                if(options.search !== undefined) {
                    $(selector).prepend(this.el);
                } else {
                    $(selector).prepend(this.el).addClass('animate0 rollIn');
                }

            }
            if(options.place === 'append') {
                $(selector).append(this.el).addClass('animate0 rollIn');

            }


        },
        inviteToFriends:function(event) {
              event.preventDefault();
              var userName = $.trim($(event.target).parent().find('.list-title').text());
              var userId = parseInt($.trim($(event.target).parents('a').attr('id')),10);
              var $this = this;
                $.Dialog({
                    shadow: true,
                    overlay: false,
                    draggable:true,
                    icon: '<span class="icon-rocket"></span>',
                    title: 'Invite ' + userName,
                    width: 500,
                    onShow: function(_dialog){

                        var content = '<p>Are you sure to invite '+userName+' to friendlist?</p> <div style="margin-top: 35px;text-align: center;"><button class="success large confirmFriend">Yes</button> <button onclick="$.Dialog.close();" class="danger large">No</button></div> ';
                        $.Dialog.content(content);
                        $('.confirmFriend').on('click',{userId:userId},$this.confirmInvite);
                    },
                    padding: 10

                });
        },

        confirmInvite:function(event) {
            console.log(event.data.userId);
            $.get('/server/users/invite/id/'+event.data.userId,function(response){
                $.Notify({
                    content:response.msg,
                    caption:"Info",
                    style:{background:'#008523',color:'#FFFFFF','marginRight':'10px'}
                });
                $.Dialog.close();
            });
        }

    });

    return ItemView;

});