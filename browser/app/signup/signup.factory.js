

app.factory('SignupFactory',function($http){
    var SignupFactory = {}
    SignupFactory.signMeUp = function(newUser){
         return $http.post('/api/users', newUser)
         .then(function(res){
             return res.data;
         });
    };
    return SignupFactory;
});
