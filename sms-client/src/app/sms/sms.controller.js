'use strict';

angular.module('smsClient')

    .factory('smsApi', function ($http) {
        var self = {};

        self.sendText = function (text) {
            return $http.post('http://localhost:4000/sms/text', {text: text});
        }

        self.sendNumber = function (number) {
            return $http.post('http://localhost:4000/sms/number', {text: number});
        }

        return self;
    })

    .controller('SmsCtrl', function ($scope, smsApi) {
        var imagePath = 'https://material.angularjs.org/img/list/60.jpeg';

        $scope.messages = [];
        
        var successCallback = function (data, status, headers, config) {
            $scope.messages.push(data);
            //$scope.$apply();
        };

        var failCallback = function (data, status, headers, config) {
            console.log(data);
        };

        smsApi.sendText('teste de mesa').success(successCallback).error(failCallback);
        smsApi.sendNumber('833777783303_33063377772').success(successCallback).error(failCallback);
    
        smsApi.sendText('Alo CIET').success(successCallback).error(failCallback);
        smsApi.sendNumber('22233344556').success(successCallback).error(failCallback);
    })

    .filter('smsKeyboard', function () {
        var keyboardFilter = function (input) {
            return input;
        }

        return keyboardFilter;
    });
