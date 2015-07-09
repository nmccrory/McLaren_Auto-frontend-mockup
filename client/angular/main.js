var shopApp = angular.module('ShopApp', ['ngRoute']);
shopApp.config(function ($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html'
	})
	.when('/models', {
		templateUrl: 'partials/models.html'
	})
	.otherwise({
		redirectTo: '/'
	})
})