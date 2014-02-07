define(['jquery','src/DefaultBundle/Views/SignView'],function($,SignView){
    describe('Testing SignView',function(){
       var signView;
        beforeEach(function(){
            signView = new SignView();
        });

        it('should have all neccessary  properties',function(){

           expect(signView.type).toBe(null);
           expect(signView.user).toBeDefined();
           expect(signView.user.uid).toBe(null);
           var newSignView = new SignView({user:{uid:1},type:'sign_in'});
           expect(typeof newSignView.user).toBe('object');
           expect(newSignView.user.uid).toBe(1);
           expect(newSignView.type).toBe('sign_in');
           var secondSignView = new SignView({type:'sign_up'});
           expect(secondSignView.title).toBe('Sign Up');

        });


    });
});