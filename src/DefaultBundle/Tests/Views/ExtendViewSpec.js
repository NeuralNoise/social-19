define(['src/DefaultBundle/Views/ExtendView'],function(ExtendView){
    describe('Testing ExtendView View',function(){

        it('should be defined',function(){
            var extendView = new ExtendView();
            expect(extendView).toBeDefined();
        });

        it('should contain "title" property',function(){
            var extendView = new ExtendView();
            expect(extendView.title).toBeDefined();
        });

        it('should contain "title_selector" property',function(){
            var extendView = new ExtendView();
            expect(extendView.title_selector).toBeDefined();
            expect(extendView.title_selector.length).toBeGreaterThan(0);
        });

        it('should return itself',function(){
            var extendView = new ExtendView();
            expect(extendView.showContent()).toEqual(extendView);
        });
        it('should contain "changeTitle" and title must be string',function(){
            var extendView = new ExtendView();
            expect(extendView.changeTitle('title')).toBeUndefined();
            expect(extendView.changeTitle({a:5})).toBeFalsy();
        });
        it('should contain "remove" method',function(){
           var extendView = new ExtendView();
           expect(extendView.remove()).toBeTruthy();
        });



    });
});