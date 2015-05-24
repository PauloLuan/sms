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

    it('splitNumberSequences should return an array with 2 as a length', function (done) {
        var split1 = sms.splitNumberSequences('1122');
        split1.should.be.an.Array;
        split1.should.have.length(2);
        split1.should.be.eql(['11', '22']);
        done();
    });

    it('splitNumberSequences should split numbers after undescore', function (done) {
        var split2 = sms.splitNumberSequences('3_33');
        split2.should.be.an.Array;
        split2.should.have.length(2);
        split2.should.be.eql(["3", "33"]);
        done();
    });

    it('splitNumberSequences should split into small sequences', function (done) {
        var split2 = sms.splitNumberSequences('833777783303_33063377772');
        split2.should.be.an.Array;
        split2.should.have.length(13);
        split2.should.be.eql(["8", "33", "7777", "8", "33", "0", "3", "33", "0", "6", "33", "7777", "2"]);
        done();
    });

    it('splitNumberSequences should split into small sequences', function (done) {
        var split3 = sms.splitNumberSequences('123aa334');
        should.not.exist(split3);
        done();
    });

    it('splitNumberSequences should ignore underscores', function (done) {
        should.not.exist(sms.splitNumberSequences('123aa334'));
        var test1 = sms.splitNumberSequences('11______22____________');
        test1.should.have.length(2);
        test1.should.not.containEql('_');
        
        var test2 = sms.splitNumberSequences('11______22');
        test2.should.have.length(2);
        test2.should.not.containEql('_');
        
        var test3 = sms.splitNumberSequences('___11___22___');
        test3.should.have.length(2);
        test3.should.not.containEql('_');
        
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