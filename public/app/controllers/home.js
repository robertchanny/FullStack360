var homeCtr = angular.module('HomeModule', []);

homeCtr.controller('HomeController', ['$scope', 'restService', function($scope, restService) { 

	$scope.profile = {
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	};

	$scope.users = null;

	$scope.init = function(){
		restService.get({resource:'profile'}, function(response){
			
			if(response.confirmation != 'success') {
				console.log('Error: ' + response.message);
				return;
			}

			$scope.users = response.result;

		});
	}

	$scope.registerProfile = function(){
		var keys = ['firstName','lastName','email','password'];

		for(var i=0; i < keys.length; i++){
			var key = keys[i];
			if($scope.profile[key].length==0){
				alert("Please enter a valid " + keys[i]);
				return;
			}
			$scope.profile[key] = $scope.profile[key].trim().toLowerCase(); //get rid of white spaces in inputs
		}

		if($scope.profile.email.indexOf('@')==-1){
			alert("Please enter a valid email address");
			return;
		}



		restService.post({resource:'profile'}, $scope.profile, function(response){
			if(response.confirmation != 'success') {
				console.log('Error: ' + response.message);
				return;
			}

			console.log(JSON.stringify(response));
			$scope.users.push(response.result);
			$scope.profile = {
				firstName: '',
				lastName: '',
				email: '',
				password: ''
			};
		});
	}

}]);