define(['src/DefaultBundle/Views/UserView',
        'src/DefaultBundle/Models/UserModel',
        'text!src/DefaultBundle/Templates/UserTemplate.html',
        'jquery',
        'underscore'],function(UserView,UserModel,UserTemplate,$,_){
    describe('Testing UserVIew',function(){
       var userView,userModel,data;
        beforeEach(function(){
            data = {
                id:1,
                firstname:'John',
                lastname:'McLein',
                age:'42',
                city:'New-York',
                email:'john@police.com',
                login:'john',
                password:'123',
                sex:'male'};

            userModel=new UserModel(data);
            userView = new UserView(userModel);


        });

        it('should call method render after initialize',function(){
           var newUser = new UserView(userModel);
           spyOn(newUser,'render');
           newUser.render();
           expect(newUser.render).toHaveBeenCalled();
           expect(userView.render()).toBe(userView);
        });

        it('should call corresponding method',function(){
            var newUser = new UserView(userModel);
            spyOn(newUser,'deleteUser');
            newUser.deleteUser({target:'<a alt="1"></a>'});
            expect(newUser.deleteUser).toHaveBeenCalled();
        });

        it('should contain all neccessary properties',function(){
            expect(userView.tagName).toEqual('tr');
            var userTemplate = $('tr').html(userView.template(userModel.toJSON()));
            expect(typeof userTemplate).toBe('object');
            var currentTemplate = $('tr').html(_.template(UserTemplate,userModel.toJSON()));
            expect(userTemplate).toEqual(currentTemplate); 
        });

    });
});