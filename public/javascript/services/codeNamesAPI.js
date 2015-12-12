(function(){
'use strict';

var codeNamesAPI = angular.module('codeNamesAPIService', []);

codeNamesAPI.factory('codeNamesAPI', ['$http', function ($http) {
	return {

		createNewGame : function (callback) {
			$http({
				method : 'POST',
				url    : '/api/createNewGame'
			}).then(function successCallback(response) {
				if (response.data.success) {
					return callback(null, response.data.data.gameCode);
				}
				else {
					return callback(response.data.error);
				}
			}, function errorCallback(response) {
				// TODO maybe need to handle HTTP error codes here
			});
		}

	};
}]);

})();
