define(['src/DefaultBundle/Views/Main'],function(MainView){
    describe('Testing Default View',function(){

        var mainView;

        beforeEach(function(){
            mainView = new MainView();
        });

        it('should be defined',function(){
            expect(mainView).toBeDefined();
        });

        it('should return itself after call "render" method',function(){
           expect(mainView.render()).toEqual(mainView);
        });

        it('should return itself after insert js script',function(){
           expect(mainView.setScript('jquery.ui.widget.js')).toEqual(mainView);
        });

        it('should contain setStyle method',function(){
            expect(mainView.setStyle('metro-bootstrap.css')).toBeDefined();
        });


    });//end describe
});