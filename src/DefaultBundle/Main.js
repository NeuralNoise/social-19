/**
 * @file FrontEnd side of application
 * @namespace DefaultBundle
 * @desc FrontEnd side of application
 */
define([ "./Views/Main","./Views/SignView","./Views/HomeView",'./Views/DashboardView'], function (MainView,SignView,HomeView,DashboardView) {

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

        Router.route('dashboard','dashboard',function(){
            console.log('dashboard');
            var dashboardView = new DashboardView();
            this.swap(dashboardView);

        });






    };


});