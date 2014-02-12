define([
        'jquery',
        'backbone',
        '../Models/FindModel'
        ],
        function($,Backbone,FindModel){


            var FindCollection = Backbone.Collection.extend({
                model:FindModel,
                url:'/server/',
                serverMethod:'getall',

                initialize:function(options)  {
                    this.type = options.type;
                    this.url += this.type+'/'+this.serverMethod;
                    console.log(this.url);
                }
            });

            return FindCollection;

});