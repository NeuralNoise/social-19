define(['jquery','src/DefaultBundle/Collections/FindCollection','src/DefaultBundle/Models/FindModel'],function($,FindCollection,FindModel){
    describe('Testing Find Collection',function(){
        var findCollection;
        var emptyObj = {type:'users'};
        beforeEach(function(){
            findCollection = new FindCollection(emptyObj);
        });

        it('should have the corretly urls',function(){
            expect(findCollection.url).toBe('/server/users/getall');
            var newCollection = new FindCollection({type:'news',searchVal:5});
            expect(newCollection.url).toBe('/server/news/search/value/5');
            var offsetCollection = new FindCollection({type:'users',limit:5,offset:10});
            expect(offsetCollection.url).toBe('/server/users/getall/limit/5/offset/10');

        });

        it('should have corresponding value of properties',function(){
            expect(findCollection.model).toBeDefined();
            expect(findCollection.model).toEqual(FindModel);
            expect(findCollection.serverMethod).toBe('getall');
        });





    });
});