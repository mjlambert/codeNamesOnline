(function(){
'use strict';

var siteNavigationService = angular.module('siteNavigationService', []);

siteNavigationService.factory('siteNavigation', ['$location', function ($location) {
	return {

		loadHomePage : function () {
			$location.path('/');
		},

		loadGamePage : function (gameCode) {
			$location.path('/games/' + gameCode);
		},

		loadPlayerPage : function (gameCode, team) {
			$location.path('/games/' + gameCode + '/' + team);
		}

	};
}]);


})();
