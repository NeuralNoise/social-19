define(['jquery','src/DefaultBundle/Models/BaseModel'],function($,BaseModel){
    describe('Testing Base Model',function(){
        var baseModel;
        beforeEach(function(){
            baseModel = new BaseModel();
        });

        it('should have url "/server/"',function(){
            expect(baseModel.url).toBe('/server/');
        });

        it('should have "validation" method',function(){
            expect(baseModel.validation()).toBeDefined();
        });




    });
});