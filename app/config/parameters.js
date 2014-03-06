define(['./config'],function(Config){

    var config = new Config();
    config.setUploadElements(5);
    var parameters={
      uploadElements: config.getUploadElements()
    };

    return parameters;

});