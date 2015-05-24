'use strict';

var request = require('supertest');
var app = require('../app');

describe('Assertions for /sms endpoint', function () {
    
    it('/sms/text should respond with status 200', function (done) {
        request(app)
            .post('/sms/text')
            .send({text:'test'})
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
            .send({text:'test'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    })
});