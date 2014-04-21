define(['src/DefaultBundle/Views/FriendListView','src/DefaultBundle/Models/UserModel'],function(FriendListView,UserModel){
    describe('Testing FriendList',function(){
        var friendList;

        beforeEach(function(){
            friendList = new  FriendListView({user:{uid:1}})
        });

        it('should have layout and template properties',function(){
            expect(friendList.layout).toBeDefined();
            expect(friendList.template).toBeDefined();
        });

        it('should return self object after render',function(){
           expect(typeof friendList.userModel).toBe(typeof new UserModel());

        });
    });
});