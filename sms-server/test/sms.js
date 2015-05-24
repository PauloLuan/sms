'use strict';

var request = require('supertest');
var should = require('should');
var app = require('../app');
var sms = require('../routes/sms');

describe('Assertions for keyboard functions', function () {

    it('findValueIndex \'a\' should return {keyboardNumber:\'2\', index:0 }', function (done) {
        var result = sms.findValueIndex('a');
        result.keyboardNumber.should.equal('2');
        result.index.should.equal(0);
        sms.repeatString(result.keyboardNumber, result.index + 1).should.equal('2');
        done();
    });

    it('findValueIndex \'s\' should return {keyboardNumber:\'7\', index:3 }', function (done) {
        var result = sms.findValueIndex('s');
        result.keyboardNumber.should.equal('7');
        result.index.should.equal(3);
        sms.repeatString(result.keyboardNumber, result.index + 1).should.equal('7777');
        done();
    });

    it('findValueIndex \'4\' should return null', function (done) {
        var result = sms.findValueIndex('4');
        should.not.exist(result);
        done();
    });

    it('textToNumber TESTE must return 8337777833', function (done) {
        var expect = '8337777833';
        sms.textToNumber('TESTE').should.equal(expect);
        done();
    });

    it('textToNumber TESTE DE MESA should be equal as 833777783303_33063377772', function (done) {
        var expect = '833777783303_33063377772';
        sms.textToNumber('TESTE DE MESA').should.equal(expect);
        done();
    });

    it('isOnlyNumbersOrUnderscore should return if the inputs contains only numbers and underscore', function (done) {
        sms.isOnlyNumbersOrUnderscore('123_').should.be.true;
        sms.isOnlyNumbersOrUnderscore('555').should.be.true;
        sms.isOnlyNumbersOrUnderscore('833777783303_33063377772').should.be.true;
        sms.isOnlyNumbersOrUnderscore('123_a').should.be.false;
        sms.isOnlyNumbersOrUnderscore('abc_34').should.be.false;
        done();
    });

    it('splitNumberSequences should split into small sequences', function (done) {
        var split1 = sms.splitNumberSequences('1122');
        split1.should.be.an.Array;
        split1.should.have.length(2);
        split1[0].should.be.eql('11');
        split1[1].should.be.eql('22');
        done();
    });
});

describe('Assertions for /sms endpoint', function () {

    it('/sms/text should respond with status 200', function (done) {
        request(app)
            .post('/sms/text')
            .send({text: 'test'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    });

    it('/sms/number/ should respond with status 200', function (done) {
        request(app)
            .post('/sms/number')
            .send({text: 'test'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    })
});