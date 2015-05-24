'use strict';

var request = require('supertest');
var app = require('../app');

describe('GET /', function () {
    it('respond with status 200', function (done) {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) throw err;
                done();
            });
    })
});