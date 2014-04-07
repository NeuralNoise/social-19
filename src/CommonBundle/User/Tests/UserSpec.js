define(['src/CommonBundle/User/User','jquery'],function(User,$){

    function sendRequest(callbacks, configuration) {
        $.ajax({
            url: configuration.url,
            dataType: "json",
            data:configuration.data || {},
            success: function(data) {
                callbacks.checkForInformation(data);
            },
            error: function(data) {
                callbacks.displayErrorMessage();
            },
            timeout: configuration.remainingCallTime
        });

    }

    describe('Test ajax works',function(){
       it('should make an Ajax request to the correct URL',function(){
           expect($).toBeDefined();
           expect(typeof $).toBe("function");
           expect(typeof $.ajax).toBe("function");
           var configuration = {url:'/server/sapi/insert',remainingCallTime:30000};
           spyOn($,'ajax');
           sendRequest(undefined,configuration);
           expect($.ajax.mostRecentCall.args[0]['url']).toEqual(configuration.url);
       });

       it('should call success function',function(){

           spyOn($,'ajax').andCallFake(function(e){
               e.success();
           });

           var callbacks = {
               checkForInformation: jasmine.createSpy(),
               displayErrorMessage: jasmine.createSpy()
           };

           var configuration = {url:'/server/sapi/insert',remainingCallTime:30000};

           sendRequest(callbacks, configuration);

           expect(callbacks.checkForInformation).toHaveBeenCalled();  //Verifies this was called
           expect(callbacks.displayErrorMessage).not.toHaveBeenCalled();
       });

    });

    describe('Test User common class',function(){
        var user;

        beforeEach(function(){
            user = new User();
        });

      it('should call two methods',function(){
          var spyOne = new User();
          spyOn(user,'isAuthenticate');
          user.isAuthenticate();
          expect(user.isAuthenticate).toHaveBeenCalled();
          expect(user.getRole()).toBe(0);
          expect(user.login()).toBeFalsy();
          expect(user.login()).toBeDefined();
      });



    });//end descibe


});//end define