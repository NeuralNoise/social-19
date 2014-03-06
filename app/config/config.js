define(['jquery'],function($){

    var Config = function(enviroment){
        this.enviroment = enviroment || 'dev';
    };

    Config.prototype.setUploadElements = function(number) {
        this.uploadElements = number || 10;
    };

    Config.prototype.getUploadElements = function(){
        return this.uploadElements;
    };

    return Config;
});