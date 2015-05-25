'use strict';

angular.module('smsClient', ['ngSanitize', 'ngResource', 'ui.router', 'ngMaterial', 'ngMessages'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'app/main/main.html',
                controller: 'MainCtrl'
            });

        $urlRouterProvider.otherwise('/');
    })
;
