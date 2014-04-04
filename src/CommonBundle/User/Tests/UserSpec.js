define(['src/CommonBundle/User/User','jquery'],function(User,$){

    function sendRequest(callbacks, configuration) {
        var myDaya = {};
        $.ajax({
            url: configuration.url,
            dataType: "json",
            data:configuration.data || {},
            success: function(data) {
                myDaya.status = data.status;
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
      });

      it('should return role 1',function(){
          var result=false,
              uid=0;

          $.ajax({
              type:'GET',
              url:'/server/users/getall',
              dataType:'json',
              async:false,
              success:function(data){
                    if(data.status===200) {
                        result=true;
                        uid=data.uid;
                    }

              }
          });

          sendRequest({url:'/server/users/getall',remainingCallTime:5000},{});

          var flag;
          flag = false;
          spyOn($, "ajax").andCallFake(function(params) {
              return setTimeout((function() {
                  params.success({
                      "message": "Hello, World!"
                  });
                  return flag = true;
              }), 0);
          });
          waitsFor((function() {
              return flag;
          }), "Should call clickHandler", 1000);
          runs(function() {
              expect(MyObj.buttonEnabled).toBe(true);
              return expect($("#message").html()).toBe("Hello, World!");
          });
          expect(MyObj.buttonEnabled).toBe(true);



      });

    });//end descibe


});//end define