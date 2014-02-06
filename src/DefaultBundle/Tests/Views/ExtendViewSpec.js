define(['jquery','src/DefaultBundle/Views/ExtendView'],function($,ExtendView){
    describe('Testing ExtendView View',function(){
        var extendView;

        beforeEach(function(){
            extendView = new ExtendView();
        });

        it('should be defined',function(){
            expect(extendView).toBeDefined();
            expect(extendView.checkUserExists({uid:null})).toBeUndefined();

        });

        it('should contain "title" property',function(){
            expect(extendView.title).toBeDefined();
        });

        it('should contain "title_selector" property',function(){
            expect(extendView.title_selector).toBeDefined();
            expect(extendView.title_selector.length).toBeGreaterThan(0);
        });

        it('should return itself after call method "showContent"',function(){
           expect(extendView.showContent({a:5})).toBeFalsy();
           expect(extendView.showContent("<h1>hello world</h1>")).toEqual(extendView);
        });

        it('should contain "changeTitle" and title must be string',function(){
            expect(extendView.changeTitle('title')).toBeUndefined();
            expect(extendView.changeTitle({a:5})).toBeFalsy();
        });

        it('should contain "formToJSON" method',function(){
           var form = '<form id="forma"><input type="text" name="email" value="admin@mail.com" /></form>'
            $('body').append(form);
            expect(typeof extendView.formToJSON('#forma')).toBe('object');

        });

        it('should contain "remove" method',function(){
            expect(extendView.remove()).toBeTruthy();
        });



    });
});