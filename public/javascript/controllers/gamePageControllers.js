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
			});
			modalInstance.result.then(function ModalFinished () {
			}, function ModalClosed () {
			});
		}

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
