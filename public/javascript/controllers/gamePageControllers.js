(function(socket){
'use strict';

var gamePageControllers = angular.module('gamePageControllers', ['ui.bootstrap', 'siteNavigationService', 'codeNamesAPIService']);

gamePageControllers.controller('gamePageController', ['$scope', '$uibModal', 'siteNavigation', 'codeNamesAPI', '$routeParams',
	function ($scope, $uibModal, siteNavigation, codeNamesAPI, $routeParams) {

		var gameCode = $routeParams.gameCode;
		
		// Start by opening the setup
		OpenSetupModal();

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

		$scope.selectTile = function (tile) {
			if (tile.chosen) {
				return;
			}
			codeNamesAPI.selectWord(gameCode, tile.word, function (error) {
				if (error) {
					console.log('ERROR: ' + error);
				}
			});
		};

		$scope.getTileClass = function (tile) {
			if (tile.chosen) {
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
			}
			else {
				return 'default';
			}
		};

		function OpenSetupModal () {
			var modalInstance = $uibModal.open({
				templateUrl : '/partials/setup.html',
				controller  : 'setupController',
				backdrop    : 'static',
				keyboard    : false,
				windowClass : 'full-screen-modal'
			});
			modalInstance.result.then(function ModalFinished () {
			}, function ModalClosed () {
			});
		}
		
	}]);

gamePageControllers.controller('setupController', ['$scope', '$uibModalInstance', '$routeParams',
	function ($scope, $uibModalInstance, $routeParams) {

		$scope.gameCode = $routeParams.gameCode;

		$scope.serverIP = '192.168.1.14';

		$scope.redCodeMasterConnected = false;
		$scope.blueCodeMasterConnected = false;

		function readyToStartGame() {
			return $scope.redCodeMasterConnected && $scope.blueCodeMasterConnected;
		}

		socket.on('playerConnect', function (player) {
			if (player.team === 'Blue Team') {
				$scope.blueCodeMasterName = player.name;
				$scope.blueCodeMasterConnected = true;
			}
			else {
				$scope.redCodeMasterName = player.name;
				$scope.redCodeMasterConnected = true;
			}
			if (readyToStartGame()) {
				$scope.startGame();
			}
			$scope.$apply();
		});

		$scope.startGame = function () {
			$uibModalInstance.close();
		};

		// Close modal if user navigates away from page
		$scope.$on('$routeChangeStart', function () {
			$uibModalInstance.dismiss();
		});

	}]);

})(socket);
