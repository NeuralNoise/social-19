define(['jquery','src/DefaultBundle/Views/HomeView','text!/src/DefaultBundle/Templates/HomeTemplate.html'],function($,HomeView,HomeTemplate){
    describe('Testing HomeView',function(){
        var homeView;
        beforeEach(function(){
            homeView = new HomeView();
        });

        it('should have all initialize and render methods',function(){
                expect(homeView.initialize()).toBeUndefined();
                expect(homeView.render()).toBeDefined();
                expect(homeView.render()).toEqual(homeView);
                var spy = new HomeView();
                spyOn(spy,'render').andCallThrough();
                spy.initialize();
                expect(spy.render).toHaveBeenCalled();
                
        });


    });
});