define(['src/DefaultBundle/Views/Main'],function(MainView){
    describe('Testing Default View',function(){
        beforeEach(function(){

        });
        it('should be defined',function(){
            var mainView = new MainView();
            expect(mainView).toBeDefined();
        });

        it('should return itself',function(){
            var mainView = new MainView();
            expect(mainView.render()).toEqual(mainView);
        });

        it('should sfd itself',function(){
            var mainView = new MainView();
            expect(mainView.setScript('jquery.ui.widget.js')).toEqual(mainView);
        });

        it('should contain setStyle method',function(){
            var mainView = new MainView();
            expect(mainView.setStyle('metro-bootstrap.css')).toBeDefined();
        });


    });
});