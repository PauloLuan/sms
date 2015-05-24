'use strict';

var exports = module.exports = {};

var express = require('express');
var router = express.Router();
var _ = require('lodash');

var keyboard = {
    '2': ['a', 'b', 'c'],
    '3': ['d', 'e', 'f'],
    '4': ['g', 'h', 'i'],
    '5': ['j', 'k', 'l'],
    '6': ['m', 'n', 'o'],
    '7': ['p', 'q', 'r', 's'],
    '8': ['t', 'u', 'v'],
    '9': ['w', 'x', 'y', 'z'],
    '0': [' '],
}

var repeatString = function(string, num) { return new Array(parseInt(num) + 1).join(string); };

var findValueIndex = function(searchLetter) {
	var valueIndex;

    for (var arraykey in keyboard) {
		var lettersArray = keyboard[arraykey]	
		var index = lettersArray.indexOf(searchLetter);
        
        if (index !== -1) { 
        	valueIndex = {
        		keyboardNumber: arraykey, 
        		index: index
        	}; 

            break;
        }
	}

	return valueIndex;
}

var textToNumber = function (inputText) {
    var processedText = '';
    var count, lastLetter;

    var lowerInput = inputText.toLowerCase(); 

    _.forEach(lowerInput, function (value, key) {
        var valueIndex = findValueIndex(value);

		if(valueIndex) {
			valueIndex.index += 1; // arrays begins on zero, we have to increase the element before to do the next operation
			var multipliedString = repeatString(valueIndex.keyboardNumber, valueIndex.index);
			processedText += multipliedString;
		}
    });

    return processedText;
};

router.post('/number', function (req, res, next) {
    var params = req.body;
    var result = textToNumber(params.text);
    return res.json({});
});

router.post('/text', function (req, res, next) {
    var params = req.body;
    var result = textToNumber(params.text);
    return res.json({});
});

exports.repeatString = repeatString;
exports.findValueIndex = findValueIndex;
exports.keyboard = keyboard;
exports.textToNumber = textToNumber;
exports.router = router;
