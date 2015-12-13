(function(){
'use strict';

var socket = io();
var gamePageControllers = angular.module('gamePageControllers', ['ui.bootstrap', 'siteNavigationService', 'codeNamesAPIService']);

gamePageControllers.controller('gamePageController', ['$scope', '$uibModal', 'siteNavigation', 'codeNamesAPI', '$routeParams',
	function ($scope, $uibModal, siteNavigation, codeNamesAPI, $routeParams) {

		// Start by opening the setup
		OpenSetupModal();

		// Tell the server which socket we are
		socket.emit('addGameSocket');

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
		
		var gameCode = $routeParams.gameCode;
		
		codeNamesAPI.getGameData(gameCode, function(error, gameData){
			if (error) {
				console.log('buts :' + error);
			} else { 
				console.log(gameData);
				$scope.rows = gameData.wordGrid;
			}
		});

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
		});

		$scope.startGame = function () {
			$uibModalInstance.close();
		};

		// Close modal if user navigates away from page
		$scope.$on('$routeChangeStart', function () {
			$uibModalInstance.dismiss();
		});

	}]);

})();
