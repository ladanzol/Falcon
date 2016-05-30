var rest = require('rest');
var Q = require('q');
 mime = require('rest/interceptor/mime');
 var client = rest.wrap(mime);
 var publishing = null;
 module.exports.Create = function (publish){ 
     publishing.push(publish);
    return Q.fcall(function () {
                return publishing;
            });  
}; 

 module.exports.Get = function (){ 
    if(publishing == null){
    return client({ path: 'https://jsonblob.com/api/jsonBlob/571104e6e4b01190df5e74d2' }).then(function(response) {
            publishing = response.entity;
            return publishing;
    });
    } else{
        return Q.fcall(function () {
                return publishing;
            });
        }
};  
 
 module.exports.Delete = function (id){ 
    for(var i=0;i<publishing.length;i++){
        if(publishing[i].id === id){
            publishing.splice(i,1);
            break;
        } 
    }
    return Q.fcall(function () {
                return publishing;
            });     
};  

 module.exports.Update = function (publish){ 
    for(var i=0;i<publishing.length;i++){
        if(publishing[i].id === publish.id){
            publishing[i] = publish;
             break;
        } 
    }
    return Q.fcall(function () {
                return publishing;
            });
};  
     
 