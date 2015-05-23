'use strict';

angular.module('smsClient')
    .controller('SmsCtrl', function ($scope) {
        var imagePath = 'https://material.angularjs.org/img/list/60.jpeg';

        $scope.messages = [];

        for (var i = 0; i < 5; i++) {
            $scope.user = { name: "teste" };
            $scope.messages.push({
                message: i + ": This is a text message. "
            });
        }
    });
