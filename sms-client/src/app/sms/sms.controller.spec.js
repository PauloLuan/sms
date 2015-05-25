'use strict';

describe('controllers', function () {
    var scope, $filter, smsKeyboard;

    beforeEach(module('smsClient'));

    beforeEach(inject(function ($rootScope, _$filter_) {
        scope = $rootScope.$new();
        $filter = _$filter_;
        smsKeyboard = $filter('smsKeyboard');
    }));

    it('should define more than 5 awesome things', inject(function ($controller) {
        $controller('SmsCtrl', {
            $scope: scope
        });

        expect(scope.user).toBeUndefined();
        expect(scope.user).toBeUndefined();

        it('should return TESTE DE MESA', function () {
            expect(smsKeyboard('833777783303_33063377772')).toEqual('TESTE DE MESA');
        });
    }));

});

    