define(['jquery'],function($){
    var Helper = {
        init:function(){
            return this;
        },
        showBackShadow:function(){
            $('<div/>').addClass('backShadowLayout animate0 lightSpeedIn').css({'width':'100%','height':'100%','position':'fixed','left':'0','top':'0','background':'rgba(0,0,0,0.5)'}).appendTo('body');
        },
        closeBackShadow:function(){
            if($('.backShadowLayout').length >0) {
                $('.backShadowLayout').removeClass('animate1 lightSpeedOut').addClass('animate0 lightSpeedOut');
                setTimeout(function(){
                    $('.backShadowLayout').remove();
                },1000);
            }
        }
    };

    return Helper;
});