var restService = angular.module('RestServiceModule', ['ngResource']);


restService.factory('restService', ['$resource', function($resource){ //factories are what we use to make services
	return $resource('/api/:resource/:id', {}, {
		
		query: { method:'GET', params:{}, isArray:false },
		get: { method:'GET'},
		post: { method:'POST'},
		put: { method:'PUT'},
		update: { method:'PUT' },
		delete: { method:'DELETE' }

		
		// override methods:
	  // { 'get':    {method:'GET'},
	  //   'save':   {method:'POST'},
	  //   'query':  {method:'GET', isArray:true},
	  //   'remove': {method:'DELETE'},
	  //   'delete': {method:'DELETE'} };
		
    });
}]);