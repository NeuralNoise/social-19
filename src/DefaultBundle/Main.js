define([ "./Views/Main","./Views/SignView","./Views/HomeView"], function (MainView,SignView,HomeView) {

    'use strict';

    return function (options) {
        var path = options.path;
        var Router = options.Router;
        console.log(options);
        //Initialize base Front view
        var mainView = new MainView();

        //Create Router
        if(path === null) {
           Router.navigate("#/",{trigger:true,replace: true});
        }

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