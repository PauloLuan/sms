'use strict';

describe('controllers', function () {
    var scope;

    beforeEach(module('smsClient'));

    beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
    }));

    it('should define more than 5 awesome things', inject(function ($controller) {
        $controller('LoginCtrl', {
            $scope: scope
        });
    }));
});
