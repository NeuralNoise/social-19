/**
 * @file FrontEnd side of application
 * @namespace DefaultBundle
 * @desc FrontEnd side of application
 */
define([ "./Views/Main","./Views/SignView","./Views/HomeView",'./Views/DashboardView','../CommonBundle/User/User'], function (MainView,SignView,HomeView,DashboardView,User) {

    'use strict';
    /**
     * @method anonymous function
     * @author Siarhei Sharykhin
     * @private
     * @param {object} options inner parameters such global Router object, router path
     * @type {function}
     * @memberof DefaultBundle
     */
    return function (options) {
        /**
         * Get route path
         * @type {string}
         * @private
         */
        var path = options.path;
        //Create Router
        var Router = options.Router;
        var application=null;
        //Initialize base Front view
        //console.log('current url path is : '+path);
        //Create Wrapper of front
        var mainView = new MainView();
        //Inisialize drop down menu
        $.Metro.initDropdowns();
        //initialize user instance
        var user = new User();
        console.log(user);

        //If user already authenticated, redirect it to dashboard panel
        if(user.uid !== null) {
            Router.navigate('#/dashboard',{triger:true});
        }


        if(path === null) {
           var homeView = new HomeView();
            application=true;

        }

        //Initialize route of this bundle

        Router.route('sign_in','sing_in',function(){
            console.log('sing_in');
            var singView = new SignView({type:'sign_in',user:user});
            this.swap(singView);
            application=true;
        });

        Router.route('sign_up','sing_up',function(){
            console.log('sing_up');
            var singView = new SignView({type:'sign_up',user:user});
            this.swap(singView);
            application=true;
        });

        Router.route('dashboard','dashboard',function(){
            console.log('dashboard');
            var dashboardView = new DashboardView({user:user,router:Router});
            this.swap(dashboardView);
            application=true;
        });


        if(application === null) {
           
           Router.navigate('#/',{triger:false});

        }





    };


});