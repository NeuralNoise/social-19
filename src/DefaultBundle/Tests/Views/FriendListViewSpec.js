define(['src/DefaultBundle/Views/FriendListView','src/DefaultBundle/Models/UserModel','src/CommonBundle/Components/Helper'],function(FriendListView,UserModel,Helper){
    describe('Testing FriendList',function(){
        var friendList;

        beforeEach(function(){
            friendList = new  FriendListView({user:{uid:1}})
        });

        it('should have layout and template properties',function(){
            expect(friendList.layout).toBeDefined();
            expect(friendList.template).toBeDefined();
        });

        it('should contain corresponding objects',function(){
           expect(typeof friendList.userModel).toBe(typeof new UserModel());
           var helper = Object.create(Helper);
           expect(friendList.helper).toEqual(helper);

        });

        it('should return itself after render method',function(){
           expect(friendList.render()).toBe(friendList);
        });
    });
});