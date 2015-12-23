(function(socket){
'use strict';

// TODO Doco

var appController = angular.module('homePageControllers', ['siteNavigationService', 'codeNamesAPIService']);

appController.controller('homePageController', ['$scope', 'siteNavigation', 'codeNamesAPI',
    function($scope, siteNavigation, codeNamesAPI) {

		$scope.isError = false;
		$scope.errorMessage = '';

		$scope.gameCode = '';
		$scope.codeMasterName = '';
		$scope.team = 'Blue Team';

		$scope.joinGame = function () {
			codeNamesAPI.addPlayer($scope.gameCode.toUpperCase(), {
				name : $scope.codeMasterName.toUpperCase(),
				team : $scope.team
			}, socket.id,
			function (error) {
				if (error) {
					$scope.isError = true;
					$scope.errorMessage = error;
				}
				else {
					var teamShort = $scope.team === 'Blue Team' ? 'blue' : 'red';
					siteNavigation.loadPlayerPage($scope.gameCode.toUpperCase(), teamShort)
				}
			});

		};

		$scope.toggleTeam = function () {
			if ($scope.team === 'Blue Team') {
				$scope.team = 'Red Team';
			}
			else {
				$scope.team = 'Blue Team';
			}
		};

		$scope.teamToggleClass = function () {
			if ($scope.team === 'Blue Team') {
				return 'blue-team';
			}
			else {
				return 'red-team';
			}
		};

		$scope.dismissError = function () {
			$scope.isError = false;
		};

		$scope.createNewGame = function () {
			codeNamesAPI.createNewGame(socket.id, function (error, gameCode) {
				if (error) {
					$scope.isError = true;
					$scope.errorMessage = error
				}
				else {
					siteNavigation.loadGamePage(gameCode);
				}
			});
		};

		function validateGameCode (gameCode) {
		}

    }]);


})(socket);
