(function(){
'use strict';

// TODO Doco

var app = angular.module('codeNamesOnline', ['ngRoute', 'appControllers', 'homePageControllers', 'gamePageControllers', 'playerPageControllers']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl : '/views/home.html',
            controller  : 'homePageController',
        })
		.when('/games/:gameCode', {
			templateUrl : '/views/game.html',
			controller  : 'gamePageController'
		})
		.when('/games/:gameCode/player', {
			templateUrl : '/views/player.html',
			controller  : 'playerPageController'
		})
        .otherwise({
            redirectTo  : '/',
        });

    $locationProvider.html5Mode(true);

}]);

})();
