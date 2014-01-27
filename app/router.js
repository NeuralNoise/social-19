/*jslint regexp: true, nomen: true, sloppy: true */
/*global requirejs, require, define */

define(["backbone"], function (Backbone) {

    'use strict';

     // Router
    var Router = Backbone.Router.extend({


        loadModule: function (module,options) {

            require([module], function (module) {
                module(options);
            });
        },
        swap:function(cuurentView) {

           if(this.currentView)  {
                this.currentView.remove();
            }
            this.currentView = cuurentView;

        }
    });

    return new Router();
});
