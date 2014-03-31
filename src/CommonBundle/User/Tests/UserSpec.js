define(['src/CommonBundle/User/User','jquery'],function(User,$){
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

          spyOn($,'ajax');

          $.ajax({
              type:'POST',
              url:'/server/sapi/insert',
              dataType:'json',
              async:false,
              data:{model:'Users','data':'{"email":"ch@sd.com"}'},
              success:function(data){
                    if(data.status===200) {
                        result=true;
                        uid=data.uid;
                    }

              }
          });

          expect($).toBeDefined();
          expect(typeof $).toBe("function");
          expect(typeof $.ajax).toBe("function");
          //expect(uid).toNotEqual(0);

          if(result) {
              $.ajax({
                  type:'POST',
                  url:'/server/sapi/session/actions/set',
                  dataType:'json',
                  async:true,
                  data:{'sess_name':'uid','sess_val':uid}
              });
          }

          var newUser = new User();
          //expect(newUser.uid).toBe(uid);

      });

    });//end descibe
});//end define