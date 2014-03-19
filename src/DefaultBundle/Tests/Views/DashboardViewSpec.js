define(['src/DefaultBundle/Views/DashboardView'],function(DashboardView){
    describe('Testing Dashboard View',function(){
       var dashboardView;
        beforeEach(function(){
            dashboardView = new DashboardView({user:{uid:1}});
        });

        it('should redirect back if user is not authenticated',function(){

            expect(dashboardView).toBeDefined();
            expect(dashboardView.render()).toBe(dashboardView);
            expect(dashboardView.userModel.url).toBe('/server/users/getuser/id/1');
            expect(dashboardView.userModel.fetch()).toBeDefined();
            expect(typeof dashboardView.userModel.fetch()).toBe('object');
            spyOn(dashboardView,'logOut');
            dashboardView.logOut();
            expect(dashboardView.logOut).toHaveBeenCalled();
            expect(dashboardView.events).toEqual({'click .logOut':'logOut','click .find':'find','keyup #search-panel':'search'});


        });

        it('should return exception if a method dynamicUpload doesn\'t have parameter',function(){
            expect(dashboardView.dynamicUpload).toThrow();
        });
    });
});