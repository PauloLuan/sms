'use strict';

angular.module('smsFilters', [])
    .filter('smsKeyboard', function () {
        return function (input) {
            return 'TESTE DE MESA';
        };
    });