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

        //Initialize base Front view
        console.log('current url path is : '+path);
        var mainView = new MainView();
        $.Metro.initDropdowns();
        var user = new User();
        if(user.uid !== null) {
            Router.navigate('#/dashboard',{triger:true});
        }
        console.log(user);


        if(path === null) {
           var homeView = new HomeView();
        }

        //Initialize route of this bundle

        Router.route('sign_in','sing_in',function(){
            console.log('sing_in');
            var singView = new SignView({type:'sign_in',user:user});
            this.swap(singView);
        });

        Router.route('sign_up','sing_up',function(){
            console.log('sing_up');
            var singView = new SignView({type:'sign_up',user:user});
            this.swap(singView);

        });

        Router.route('dashboard','dashboard',function(){
            console.log('dashboard');
            var dashboardView = new DashboardView({user:user,router:Router});
            this.swap(dashboardView);

        });






    };


});