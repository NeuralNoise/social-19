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
                    if(options.searchVal === undefined) {
                        this.url += this.type+'/'+this.serverMethod;
                    } else {
                        this.url += this.type+'/search/value/'+options.searchVal;
                    }

                    if(options.limit !== undefined) {
                        this.url +='/limit/'+options.limit;
                    }

                    if(options.offset !== undefined) {
                        this.url +='/offset/'+options.offset;
                    }

                }
            });

            return FindCollection;

});