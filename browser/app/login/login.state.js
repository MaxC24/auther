'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('login', {
		url: '/login',
		templateUrl: '/browser/app/login/login.html',
		controller: 'loginCtrl'
	});
});

app.controller('loginCtrl', function($scope, $state, LoginFactory){
	$scope.logMeIn = function(){
		LoginFactory.logMeIn($scope.login)
		.then(function(res){
			$state.go('stories');
		})
		.then(null, function(err){
			console.error(err);
		})
	};
});
