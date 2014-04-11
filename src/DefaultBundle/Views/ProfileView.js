define([
        'jquery',
        'underscore',
        'backbone',
        './ExtendView',
        '../Models/UserModel',
        'text!../Templates/DashboardTemplate.html',
        'text!../Templates/ProfileTemplate.html',
        '../../CommonBundle/Validations/Validations',
        '../../CommonBundle/Components/Helper',
        'public/assets/js/ajaxUpload'
],function($, _, Backbone,ExtendView,UserModel,DashboardTemplate,ProfileTemplate,Validations,Helper){

    'use strict';


    var ProfileVew = ExtendView.extend({
        el:$('.container'),
        title:'Profile page',
        layout: _.template(DashboardTemplate),
        template: _.template(ProfileTemplate),
        events:{
            'submit #profileForm' :'saveProfile',
            'click .changePassword':'showChangePasswordPopUp'
        },

        initialize:function(options) {
            if(options.user.uid === null) {
                options.router.navigate('/',{trigger:true});
                return false;
            }
            this.user = options.user;
            this.userModel = new UserModel();
            this.userModel.url =  this.userModel.url + '/getuser/id/'+this.user.uid;
            this.helper = Object.create(Helper);
            var $this = this;
            this.userModel.fetch({success:function(){$this.render();}});
        },

        render:function(){
            var $this = this;
            this.showContent(this.layout({user:this.userModel.toJSON()}),function(){
                $.Metro.initDropdowns();
                $('.inner-content').html($this.template({user:$this.userModel.toJSON()}));
                $this.changeAvatar();
            });

            return this;
        },

        showChangePasswordPopUp:function() {
           this.helper.showBackShadow();
            var $this = this;
            require(['text!/src/DefaultBundle/Templates/ChangePasswordTemplate.html'],function(Template){
                var popUp = _.template(Template);
                $('body').append(popUp).fadeIn(function(){
                    $('.savePassword').on('click',{context:$this},$this.changePassword);
                    $('.cancelPopUp').on('click',{context:$this},$this.cancelPopUp);
                });
            });
        },

        changePassword:function(event){
            var $this = event.data.context;
            var $target = $(event.target);
            //Get data from from in JSON format
            var data = $this.formToJSON('#'+$target.parents('form')[0].getAttribute('id'));
            //Create identifier of errors
            var errorsValidation = Validations.formSubmit('#'+$target.parents('form')[0].getAttribute('id'));
            if(!errorsValidation.exists){
                console.log('save password');
                $this.userModel.url = '/server/users/changepassword';
                $this.userModel.save({
                    model:'users',
                    Data:{id:$this.user.uid,password:data.new_pass,cur_pass:data.current_pass}
                },{success:function(model,response){
                    if(response.status===200) {
                        $this.helper.closeBackShadow();
                        $.Notify({
                            content:'Yout password has been changed',
                            caption:"Info",
                            style:{background:'#008523',color:'#FFFFFF','marginRight':'10px'}
                        });
                        $this.cancelPopUp({data:$this});
                    }
                    if(response.status===400) {
                        $.Notify({
                            content: response.msg,
                            caption:"Info",
                            style:{background:'#971515',color:'#FFFFFF'}

                        });
                    }
                }});
            } else {
                //If errors were occured, appropriate message will be shown
                _.each(errorsValidation.messages,function(msg,index){
                    $.Notify({
                        content: msg,
                        caption:"Info",
                        style:{background:'#971515',color:'#FFFFFF'},

                    });
                });
            }
        },

        cancelPopUp:function(event) {
          var $this;
          if(event.data !== undefined) {
              $this = event.data.context;
          }

          $('.popUp').fadeOut(function(){ $(this).remove();$('.cancelPopUp').off('click');});
          if($this !== undefined) {
              $this.helper.closeBackShadow();
          }

        },

        saveProfile:function(event) {
            event.preventDefault();
            var $target = $(event.target);
            //Get data from from in JSON format
            var data = this.formToJSON('#'+$target.attr('id'));
            //Create identifier of errors
            var errorsValidation = Validations.formSubmit('#'+$target.attr('id'));
            if(!errorsValidation.exists){
               this.userModel.url = '/server/sapi/save';
                this.userModel.save({
                    model:'users',
                    Data:data
                },{success:function(model,response){
                    if(response.status===200) {
                        $.Notify({
                           content:'Yout profile\'s data have been saved successfully',
                           caption:"Info",
                           style:{background:'#008523',color:'#FFFFFF','marginRight':'10px'},
                        });
                    }
                }});
            } else {
                //If errors were occured, appropriate message will be shown
                _.each(errorsValidation.messages,function(msg,index){
                    $.Notify({
                        content: msg,
                        caption:"Info",
                        style:{background:'#971515',color:'#FFFFFF'},

                    });
                });
            }

        },

        changeAvatar:function(){
            var $this = this;
            $(document).ready(function(){
                var button = $("#uploadAvatar"), interval, file;
                new AjaxUpload(button, {
                    action: "/server/sapi/upload",
                    data: {uid: $this.user.uid},
                    name: "file",
                    onSubmit: function(file, ext){
                        if (! (ext && /^(jpg|png|jpeg|gif)$/i.test(ext))){
                         // extension is not allowed
                            $.Notify({
                                content:'You should use jpg,png,jpeg or gif format of images',
                                caption:"Info",
                                style:{background:'#971515',color:'#FFFFFF','marginRight':'10px'}
                            });
                         // cancel upload
                         return false;
                         }
                        button.text("Загрузка");
                        this.disable();

                        interval = setInterval(function(){
                            var text = button.text();
                            if(text.length < 11){
                                button.text(text + ".");
                            }else{
                                button.text("Uploading...");
                            }
                        }, 300);
                    },
                    onComplete: function(file, response){
                        button.text("Change avatar");
                        $('.userAvatarImg').attr('src','/public/uploads/profile/98/'+file);
                        $.Notify({
                            content:'Yout avatar has been changed successfully',
                            caption:"Info",
                            style:{background:'#008523',color:'#FFFFFF','marginRight':'10px'}
                        });
                        window.clearInterval(interval);
                        this.enable();
                    }
                });
            });

        }

    });


    return ProfileVew;


});