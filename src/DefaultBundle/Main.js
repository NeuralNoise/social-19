define([ "./Views/Main","./Views/SignView","./Views/HomeView"], function (MainView,SignView,HomeView) {

    'use strict';

    return function (options) {
        var path = options.path;
        var Router = options.Router;

        //Initialize base Front view
        var mainView = new MainView();
        $.Metro.initDropdowns();

        //Create Router
        if(path === null) {
           Router.navigate("#/",{trigger:true,replace: true});
        }

        Router.route('','home',function(){
            console.log('home')
            var homeView = new HomeView();
            this.swap(homeView);
        });

        Router.route('sign_in','sing_in',function(){
            console.log('sing_in')
            var singView = new SignView();

            this.swap(singView);


        });

        Router.route('sign_up','sing_up',function(){
            console.log('sing_up')
            var singView = new SignView({type:'sign_up'});
            this.swap(singView);

        });




    };


});