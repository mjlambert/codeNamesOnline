(function(socket){
'use strict';

var playerPageControllers = angular.module('playerPageControllers', ['ui.bootstrap', 'siteNavigationService']);

playerPageControllers.controller('playerPageController', ['$scope', '$uibModal', 'siteNavigation', '$routeParams', 'codeNamesAPI',
	function ($scope, $uibModal, siteNavigation, $routeParams, codeNamesAPI) {

		var gameCode = $routeParams.gameCode;
		var team = $routeParams.team;
		
		// Get Game data
		codeNamesAPI.getGameData(gameCode, function(error, gameData){
			if (error) {
				console.log('ERROR:' + error);
			} else { 
				$scope.gameData = gameData;
			}
		});

		// Update game data
		socket.on('updateGameData', function(gameData) {
			$scope.gameData = angular.copy(gameData);
			$scope.$apply();
		});

		$scope.getTileClass = function (tile) {
			if (tile.chosen) {
				return 'default';
			}
			switch (tile.type) {
				case 'Blue Team':
					return 'blueTeam';
				case 'Red Team':
					return 'redTeam';
				case 'No Team':
					return 'noTeam';
				case 'Kill Word':
					return 'killWord';
				default:
					return 'default';
			};
		};

		$scope.OpenWordSelectionModal = function (word) {
			var modalInstance = $uibModal.open({
				templateUrl : '/partials/wordSelection.html',
				controller  : 'wordSelectionController',
				windowClass : 'full-screen-modal',
				resolve     : {
					gameCode : function () { return gameCode; },
					word     : function () { return word; }
				}
			});
		};

	}]);

playerPageControllers.controller('wordSelectionController', ['$scope', '$uibModalInstance', 'codeNamesAPI', 'gameCode', 'word',
	function ($scope, $uibModalInstance, codeNamesAPI, gameCode, word) {

		$scope.word = word;

		$scope.selectWord = function () {
			codeNamesAPI.selectWord(gameCode, word, function (error) {
				if (error) {
					console.log('ERROR: ' + error);
				}
				else {
					$uibModalInstance.close();
				}
			});
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss();
		};

	}]);

})(socket);
