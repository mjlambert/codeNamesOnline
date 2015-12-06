(function(){
'use strict';

// TODO Doco

var app = angular.module('codeNamesOnline', ['ngRoute', 'appControllers', 'homePageControllers']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
        .when('/', {
            templateUrl : '/views/home.html',
            controller  : 'homePageController',
        })
        .otherwise({
            redirectTo  : '/',
        });

    $locationProvider.html5Mode(true);

}]);

})();
