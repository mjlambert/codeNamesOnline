(function(){
'use strict';

// TODO Doco

var appController = angular.module('homePageControllers', ['ui.bootstrap']);

appController.controller('homePageController', ['$scope',
    function($scope) {

		$scope.isError = false;
		$scope.errorMessage = "Unknown Error";

		$scope.gameCode = '';

		$scope.joinGame = function () {
		};

		$scope.createNewGame = function () {
		};

    }]);


})();
