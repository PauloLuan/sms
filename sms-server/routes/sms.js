var express = require('express');
var router = express.Router();


var textToNumber = function() {
	
}

var numberToText = function() {
	
}

router.post('/number', function (req, res, next) {
    res.sendStatus(200);
});

router.post('/text', function (req, res, next) {
    res.sendStatus(200);
});

module.exports = router;
