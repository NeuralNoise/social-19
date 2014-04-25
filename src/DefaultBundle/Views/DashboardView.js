define([
    'jquery',
    'underscore',
    'backbone',
    './ExtendView',
    '../Models/UserModel',
    '../../../app/config/parameters',
    'text!../Templates/DashboardTemplate.html',
    'text!../Templates/FindTemplate.html',
    '../Collections/FindCollection',
    '../Views/ItemView',
    'public/assets/js/metro-dropdown'

],
    function ($, _, Backbone,ExtendView,UserModel,parameters, DashboardTemplate,FindTemplate,FindCollection,ItemView) {

        'use strict';
        /**
         * @class DashboardView
         * @desc Initialize view of user's dashboard after sign in/up
         * @returns {object} DashboardView
         * @author Siarhei Sharykhin
         * @memberof  DefaultBundle
         */
        var DashboardView = ExtendView.extend({
            el:$('.container'),
            title:'Dashboard',
            template: _.template(DashboardTemplate),
            events:{
              'click .logOut':'logOut',
              'click .find':'find',
              'keyup #search-panel':'search',
              'click .go_to_profile':'profilePage'
            },
            initialize:function(options)
            {
                if(options.user.uid === null) {
                    options.router.navigate('/',{trigger:true});
                    return false;
                }
                this.user = options.user;
                this.userModel = new UserModel();
                this.userModel.url =  this.userModel.url + '/getuser/id/'+this.user.uid;
                var $this = this;
                this.userModel.fetch({success:function(){$this.render();}});



            },

            checkInvitation:function() {
                $.get('/server/users/checkinvite',function(response){
                    console.log(response.length);
                   if(response.length > 0) {
                       $('.invitations-number').text(response.length);
                   }
                });
            },



            render:function(){
                var $this=this;
                this.showContent(this.template({user:this.userModel.toJSON()}),function(){$.Metro.initDropdowns();
                    $this.checkInvitation();
                });

                return this;
            },

            profilePage:function(){
                console.log('here');
                if($('#profileForm').length ===0) {
                    var router = new Backbone.Router();
                    router.navigate('#/profile',{trigger:true});
                }
            },
            /**
             * @method logOut
             * @desc log out user from dashboard
             * @author Siarhei Sharykhin
             * @inner
             * @memberof DefaultBundle.DashboardView
             */
            logOut:function(){
                $.ajax({
                   type:'POST',
                   'url':'/server/users/logout',
                   dataType:'json',
                   success:function(data) {
                       if(data.status === 200) {
                           var router = new Backbone.Router();
                           router.navigate('#/',{trigger:true});
                       }
                   }
                });
            },
            /**
             * @method dynamicUpload
             * @desc Auto uploading elements from the server
             * @author Siarhei SHarykhin
             * @param {string} whatFind what user want to find (for example 'news')
             * @memberof  DefaultBundle
             */
            dynamicUpload:function(whatFind){
                if(whatFind===undefined) {
                    throw 'method\'s parameter is required';
                }
                var $this = this;
                //Get current number of elements
                var offsetNumber = $('.listview > a').length;
                //Get height of inner content
                var innerContentHeight = parseInt($('.inner-content').height(),10);
                //Get window height
                var windowHeight = parseInt($(window).height(),10);
                console.log(innerContentHeight);
                if(windowHeight > innerContentHeight) {
                    //call dynamic upload
                    this.upload({whatFind:whatFind,offset:offsetNumber});
                } else {

                    $(document).scroll(function(event){

                        var offsetTop = parseInt($(document).scrollTop(),offsetNumber);
                        console.log((offsetTop+windowHeight));
                        if((offsetTop+windowHeight) > innerContentHeight) {
                            $this.upload({whatFind:'users',offset:offsetNumber});
                            $(document).off('scroll');
                        }
                    });
                }

            },

            /**
             * @method upload
             * @desc Create request to the server and append in the end of list new items
             * @author Siarhei Sharykhin
             * @param {object} options
             * @memberof  DefaultBundle
             */
            upload:function(options){
                var whatFind = options.whatFind;
                var $this = this;
                var collection = new FindCollection({type:whatFind,limit:parameters.uploadElements,offset:options.offset});
                collection.fetch({success:function(data){
                    _.each(data.models,function(model){
                        var itemView = new ItemView(model,whatFind);
                        itemView.show('.listview',{place:'append'});
                    });
                    if(data.models.length === parseInt(parameters.uploadElements,10)) {
                        $this.dynamicUpload(whatFind);
                    }

                }});

            },

            /**
             * @method find
             * @desc it shows a list of needed items
             * @athor Siarhei Sharykhin
             * @memberof DefaultBundle.DashboardView
             * @param event
             */
            find:function(event) {

                event.preventDefault();
                //Get a default template for any finders
                var findTemplate = _.template(FindTemplate);
                //Get a type of find
                var whatFind = $(event.target).attr('alt');
                var $this = this;

                this.changeCustomContent(findTemplate({whatFind:whatFind}),".inner-content",function(){
                    $('#search-panel').attr('name',whatFind);
                    var collection = new FindCollection({type:whatFind,limit:parameters.uploadElements});
                    collection.fetch({success:function(data){

                        _.each(data.models,function(model){
                            var itemView = new ItemView(model,whatFind);
                            itemView.show('.listview');

                        });
                        if(data.models.length === parseInt(parameters.uploadElements,10)) {
                            $this.dynamicUpload(whatFind);
                        }

                    }});
                });


            },

            search:function(event) {
                console.log(parameters);
                var $this = $(event.target);
                var searchVal = $this.val();
                var whatFind = $this.attr('name');
                var collection = new FindCollection({type:whatFind,searchVal:searchVal});
                var $that = this;
                collection.fetch({success:function(data){
                    console.log(data);//1 model 104 Dimas
                    //STEP 1. Remove unneccessary data
                    var currentList = $('.listview > a');
                    if(currentList !== undefined) {
                        currentList.each(function(){
                            var prevModel = $(this);
                            var exist = false;
                            _.each(data.models,function(model){
                                 if(parseInt(model.get('id'),10) === parseInt(prevModel.attr('id'),10)){
                                    exist=true;
                                 }
                             });
                            if(exist===false) {
                                $(this).addClass('toWrap');
                            }
                        });
                    }
                    $('.toWrap').wrapAll('<div class="wrapOut"/>');
                    $('.wrapOut').addClass('animate0 rollOut');
                    setTimeout(function(){
                        $('.wrapOut').remove();
                    },1000);

                    //STEP 2. Add those elements, which does'n already exist in list
                    currentList = $('.listview > a');
                    _.each(data.models,function(model){
                        var newElement = true;
                        currentList.each(function(){
                            if(parseInt($(this).attr('id'),10) === parseInt(model.get('id'),10)) {
                                newElement=false;
                            }
                        });
                        if(newElement===true) {
                            var itemView = new ItemView(model,whatFind);
                            itemView.show('.listview',{search:true});
                        }
                    });



                }});//end fetch

            }//end search


        });

        return DashboardView;
    });
