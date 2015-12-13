(function(){
'use strict';

var gamePageControllers = angular.module('gamePageControllers', ['ui.bootstrap', 'siteNavigationService', 'codeNamesAPIService']);

gamePageControllers.controller('gamePageController', ['$scope', '$uibModal', 'siteNavigation', 'codeNamesAPI', '$routeParams',
	function ($scope, $uibModal, siteNavigation, codeNamesAPI, $routeParams) {

		// Start by opening the setup
		OpenSetupModal();

		function OpenSetupModal () {
			var modalInstance = $uibModal.open({
				templateUrl : '/partials/setup.html',
				controller  : 'setupController',
				backdrop    : 'static',
				keyboard    : false,
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

gamePageControllers.controller('setupController', ['$scope', '$uibModalInstance',
	function ($scope, $uibModalInstance) {

		$scope.startGame = function () {
			$uibModalInstance.close();
		};


		// Close modal if user navigates away from page
		$scope.$on('$routeChangeStart', function () {
			$uibModalInstance.dismiss();
		});

	}]);

})();
