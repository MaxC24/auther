'use strict';

app.config(function ($stateProvider) {
	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: '/browser/app/signup/signup.html',
		controller: 'SignUpCtrl'
	});
});

app.controller('SignUpCtrl', function($scope, $state, SignupFactory){
	$scope.signMeUp = function(){
		SignupFactory.signMeUp($scope.newUser)
		.then(function(aUser){
			$state.go('stories')
		});
	}; 
});
