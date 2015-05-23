'use strict';

describe('smsKeyboard', function () {
    'use strict';

    var $filter, smsKeyboard;

    beforeEach(function () {
        module('smsFilters');

        inject(function (_$filter_) {
            $filter = _$filter_;
            smsKeyboard = $filter('smsKeyboard');
        });
    });

    it('should return TESTE DE MESA', function () {
        expect(smsKeyboard('833777783303_33063377772')).toEqual('TESTE DE MESA');
    });
});