

app.factory('LoginFactory',function($http){
    var LoginFactory = {}
    LoginFactory.logMeIn = function(user){
         return $http.post('/api/users/login', user)
         .then(function(res){
             return res.data;
         });
    };
    return LoginFactory;
});
