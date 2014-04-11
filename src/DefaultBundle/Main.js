/**
 * @file FrontEnd side of application
 * @namespace DefaultBundle
 * @desc FrontEnd side of application
 */
define([ "./Views/Main","./Views/SignView","./Views/HomeView",'./Views/DashboardView','../CommonBundle/User/User','./Views/ProfileView'], function (MainView,SignView,HomeView,DashboardView,User,ProfileView) {

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
        console.log(path);
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

        Router.route('profile','profile',function(){
            console.log('profile');
            var dashboard = new DashboardView({user:user,router:Router});
            var profileView = new ProfileView({user:user,router:Router});
            this.swap(profileView);
            application=true;
        });

        /*
         * If user reloads page, he wants to see a previouse page.
         * In this case the Route doesn't work correcly.
         * So we need to invoke current route hard
         */
        if(application === null) {

           if(path === 'sign_up' || path === 'sign_in') {
               var redirectView = new SignView({type:path,user:user});
               Router.swap(redirectView);

           } else {
               Router.navigate('#/',{triger:true});
           }


        }





    };


});