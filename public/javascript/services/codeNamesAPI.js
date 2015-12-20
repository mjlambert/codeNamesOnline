(function(){
'use strict';

var codeNamesAPI = angular.module('codeNamesAPIService', []);

codeNamesAPI.factory('codeNamesAPI', ['$http', function ($http) {
	return {

		createNewGame : function (socketId, callback) {
			$http({
				method : 'POST',
				url    : '/api/createNewGame',
				params : { socketId : socketId }
			}).then(function successCallback (response) {
				if (response.data.success) {
					return callback(null, response.data.data);
				}
				else {
					return callback(response.data.error);
				}
			}, function errorCallback (response) {
				// TODO maybe need to handle HTTP error codes here
			});
		},

		getGameData : function (gameCode, callback) {
			$http({
				method : 'GET',
				url    : '/api/game/' + gameCode 
			}).then(function successCallback (response) {
				if (response.data.success) {
					return callback(null, response.data.data);
				}
				else {
					return callback(response.data.error);
				}
			}, function errorCallback (response) {
				// TODO maybe need to handle HTTP error codes here
			});
		},

		addPlayer : function (gameCode, playerData, socketId, callback) {
			$http({
				method : 'POST',
				url    : '/api/game/' + gameCode + '/addPlayer',
				params : { playerData : playerData, socketId : socketId }
			}).then(function successCallback (response) {
				if (response.data.success) {
					return callback();
				}
				else {
					return callback(response.data.error);
				}
			}, function errorCallback (response) {
				// TODO maybe need to handle HTTP error codes here
			});
		}

	};
}]);

})();
