define([ "./Views/Main","./Views/SignView","./Views/HomeView"], function (MainView,SignView,HomeView) {

    'use strict';

    return function (options) {
        //Get Url path
        var path = options.path;
        //Create Router
        var Router = options.Router;

        //Initialize base Front view
        console.log('current url path is : '+path);
        var mainView = new MainView();



        if(path === null) {
           var homeView = new HomeView();
        }

        //Initialize route of this bundle

        Router.route('sign_in','sing_in',function(){
            console.log('sing_in');
            var singView = new SignView();
            this.swap(singView);


        });

        Router.route('sign_up','sing_up',function(){
            console.log('sing_up');
            var singView = new SignView({type:'sign_up'});
            this.swap(singView);

        });






    };


});