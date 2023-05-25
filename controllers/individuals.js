var app = angular.module('individuals',['account-module','app-module']);

app.controller('individualsCtrl',function($scope,app) {
	
	$scope.app = app;

	app.data($scope);
	app.list($scope);
	
	$scope.module = {
		id: 'individuals',
		privileges: {
			show: 1,
			add: 2,
			edit: 3,
			delete: 4,
		}
	};
	
});


app.filter('pagination', function() {
	  return function(input, currentPage, pageSize) {
	    if(angular.isArray(input)) {
	      var start = (currentPage-1)*pageSize;
	      var end = currentPage*pageSize;
	      return input.slice(start, end);
	    }
	  };
});
