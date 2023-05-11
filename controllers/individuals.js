var app = angular.module('individuals',['account-module','app-module']);

app.controller('individualsCtrl',function($scope,app) {
	
	$scope.app = app;

	app.data($scope);
	app.list($scope);
	
});
