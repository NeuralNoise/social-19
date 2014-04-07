define([
        'jquery',
        'underscore',

        ],function($,_){

    var Validations = function() {};

    Validations.prototype.formSubmit = function(formSelector) {
        var $this = this;
        var errors = {
            exists:false,
            messages:{}
        };
        $(formSelector + ' input, '+formSelector+' textarea').not('input[type=submit]').each(function(){
            $(this).removeClass('input-error');
            $(this).removeClass('input-error-verify').removeClass('input-error-email');

            /*if($.trim($(this).val()) === '') {
                errors.exists = true;
                $(this).addClass('input-error');
                errors.messages.reqiured = 'Please, fill the required fields';
            }*/
            if($(this).attr('data-confirm')) {

                var toConfirmVal = $(formSelector).find('input[name='+$(this).attr('data-confirm')+']');
                if($.trim(toConfirmVal.val()) !== $.trim($(this).val())) {
                    toConfirmVal.addClass('input-error-verify');
                    $(this).addClass('input-error-verify');
                    errors.exists = true;
                    errors.messages.confirmation = 'Your confirmation\'s password is incorrect';
                }
            }
            if($(this).attr('data-valid')) {
                var validationRule = $(this).attr('data-valid');
                if(validationRule === 'email') {
                    if(!$this.emailValidation($(this).val())) {
                        $(this).addClass('input-error-email');
                        errors.exists = true;
                        errors.messages.confirmation = 'Your email is not incorrect';
                    }
                }

                if(validationRule === 'required') {
                    if($.trim($(this).val()) === '') {
                        errors.exists = true;
                        $(this).addClass('input-error');
                        errors.messages.reqiured = 'Please, fill the required fields';
                    }
                }

            }

        });
        return errors;
    };

    Validations.prototype.emailValidation = function(value){
        var regV = /[a-z0-9]{1,20}@[a-z0-9]{1,20}\.[a-z]{2,4}/;
        if(value.search(regV) !== -1) {
            return true;
        } else {
            return false;
        }


    };

    return new Validations();

});