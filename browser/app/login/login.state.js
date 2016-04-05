'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/browser/app/login/login.html',
		controller: function($scope, $http){
			$scope.logMeIn = function(){
				//console.log($scope.login);
				$http.post('/api/users/login', $scope.login)
				.then(function(res){
					console.log('im a res!!!!!!', res);
				})
			};
		}
	});
});
