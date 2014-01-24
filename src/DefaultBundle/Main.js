define([ "./Views/Main","./Views/SignView","./Views/HomeView"], function (MainView,SignView,HomeView) {

    'use strict';

    return function () {

        //Initialize base Front view
        var mainView = new MainView();
        //Create Router
        var Router = new Backbone.Router();

        //Check router
        Router.route('','home',function(){
            console.log('home')
            var homeView = new HomeView();
        });
        Router.route('sign_in','sing_in',function(){
            console.log('sing_in')
            var singView = new SignView();
        });


    };


});