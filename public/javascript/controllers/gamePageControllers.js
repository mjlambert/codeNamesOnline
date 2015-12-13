(function(){
'use strict';

var gamePageControllers = angular.module('gamePageControllers', ['ui.bootstrap', 'siteNavigationService', 'codeNamesAPIService']);

gamePageControllers.controller('gamePageController', ['$scope', '$uibModal', 'siteNavigation', 'codeNamesAPI',
	function ($scope, $uibModal, siteNavigation, codeNamesAPI) {

		// Start by opening the setup
		OpenSetupModal();

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

gamePageControllers.controller('setupController', ['$scope', '$uibModalInstance',
	function ($scope, $uibModalInstance) {

		$scope.serverIP = '192.168.1.14';

		$scope.startGame = function () {
			$uibModalInstance.close();
		};

		$scope.redCodeMasterName = 'RED MAN';
		$scope.blueCodeMasterName = 'BLUE MAN';

		// Close modal if user navigates away from page
		$scope.$on('$routeChangeStart', function () {
			$uibModalInstance.dismiss();
		});

	}]);

})();
