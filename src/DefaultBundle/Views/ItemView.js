define(['backbone','text!../Templates/ItemTemplate.html'],function(Backbone,ItemTemplate){

    var ItemView = Backbone.View.extend({
        tagName:'a',
        className:'list',
        template: _.template(ItemTemplate),

        initialize:function(model) {
            this.model = model;
            this.render();
        },

        render:function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        show:function(selector) {
            $(selector).prepend(this.el);
        }

    });

    return ItemView;

});