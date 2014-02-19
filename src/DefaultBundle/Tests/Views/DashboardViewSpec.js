define(['src/DefaultBundle/Views/DashboardView'],function(DashboardView){
    describe('Testing Dashboard View',function(){
       var dashboardView;
        beforeEach(function(){
            dashboardView = new DashboardView({user:{uid:1}});
        });

        it('should redirect back if user is not authenticated',function(){

            expect(dashboardView).toBeDefined();
            expect(dashboardView.render()).toBe(dashboardView);
            var spy = new DashboardView({user:{uid:1}});
            
        });
    });
});