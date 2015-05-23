'use strict';

angular.module('smsFilters', [])
    .filter('smsKeyboard', function () {
        var keyboardFilter = function (input) {
            return 'TESTE DE MESA';
        }

        return keyboardFilter;
    });