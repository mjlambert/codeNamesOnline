(function(){
'use strict';

// TODO Doco

var appController = angular.module('homePageControllers', ['siteNavigationService', 'codeNamesAPIService']);

appController.controller('homePageController', ['$scope', , 'siteNavigation', 'codeNamesAPI',
    function($scope, siteNavigation, codeNamesAPI) {

		$scope.isError = false;
		$scope.errorMessage = '';

		$scope.gameCode = '';

		$scope.joinGame = function () {
		};

		$scope.dismissError = function () {
			$scope.isError = false;
		};

		$scope.createNewGame = function () {
			codeNamesAPI.createNewGame(function (error, gameCode) {
				if (error) {
					$scope.isError = true;
					$scope.errorMessage = error
				}
				else {
					siteNavigation.loadGamePage(gameCode);
				}
			});
		};

    }]);


})();
