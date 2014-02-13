define(['backbone','text!../Templates/ItemTemplate.html'],function(Backbone,ItemTemplate){

    var ItemView = Backbone.View.extend({
        tagName:'a',
        className:'list',
        template: _.template(ItemTemplate),

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
            $(selector).prepend(this.el).addClass('animate0 rollIn');

        }

    });

    return ItemView;

});