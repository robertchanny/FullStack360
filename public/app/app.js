var modules = [
	'HomeModule',
	'RestServiceModule'
];

var app = angular.module('DemoApp', modules, function($interpolateProvider){ //tells Angular to not use the curly braces from mustache - thus, this is only effective if we're using something that's already using curly braces
	$interpolateProvider.startSymbol('<%');
	$interpolateProvider.endSymbol('%>');
});