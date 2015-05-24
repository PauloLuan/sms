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

var repeatString = function (string, num) {
    return new Array(parseInt(num) + 1).join(string);
};

var findValueIndex = function (searchLetter) {
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

        if (valueIndex) {
            valueIndex.index += 1; // arrays begins on zero, we have to increase the element before to do the next operation
            var multipliedString = repeatString(valueIndex.keyboardNumber, valueIndex.index);

            // must add an underscore when the sequence is the same as the last number.
            if (processedText.slice(-1) == valueIndex.keyboardNumber) {
                processedText += "_";
            }

            processedText += multipliedString;
        }
    });

    return processedText;
};

var isOnlyNumbersOrUnderscore = function (input) {
    var isValid;

    // TODO: refactor this for, by caching the lenght into variable
    for (var i = 0; i < input.length; i++) {
        var tempNumber = parseInt(input[i]);

        if (_.isNaN(tempNumber) && (input[i] !== '_')) {
            isValid = false;
            break;
        }

        isValid = _.isNumber(tempNumber) || (tempNumber === '_');
        if (isValid === false) {
            break;
        }
    };

    if (_.isNull(isValid)) {
        isValid = false;
    }

    return isValid;
}

var splitNumberSequences = function (inputArray) {
    var result = [],
        lastIndex = 0;

	for (var i = 0, len = inputArray.length; i < len; i++) { 
    	var value = inputArray[i];
    	var isNumber = (_.isNumber(parseInt(value))) && !(_.isNaN(parseInt(value)));
    	var isUnderscore = value === '_';

    	if(!isNumber && value !== '_') {
    		result = null;
    		break;
    	}

        if(!result[lastIndex] && result[lastIndex] !== '') {
            result.push('');
        }

		var isLastTheSame = value === result[lastIndex].slice(-1);
		var isEmpty = _.isEmpty(result[lastIndex]);
    	
    	if (isLastTheSame || isEmpty) {
            if(!isUnderscore) result[lastIndex] += value;
        } 
        else {
            if(!isUnderscore || !isLastTheSame) { 
                lastIndex ++;
                result.push('');
                if(!isUnderscore) result[lastIndex] += value;
            }        			
    	}
    };

    if(result) {
	    result = _.without(result, ''); // clear empty elements from array
    }

    return result;
}

var numberToText = function (inputNumber) {
    var blocks = [];
    var counter, lastNumber, result;

    var lowerInput = inputNumber.toLowerCase();

    _.forEach(lowerInput, function (value, key) {
        // quebrar em pequenos pedaços, objeto com: {keyboardNumber, index}
        // iterar sobre esses blocos tipo: ['222', '33', '4', '555']
        // verificar _ e apenas ignorar e passar pro proximo bloco
        // tem que ter função pra passar uma seuqencia de numeros e ele devolver a letra
        // adicionar ao resultado
    });

    return processedText;
}

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

exports.isOnlyNumbersOrUnderscore = isOnlyNumbersOrUnderscore;
exports.splitNumberSequences = splitNumberSequences;
exports.repeatString = repeatString;
exports.findValueIndex = findValueIndex;
exports.keyboard = keyboard;
exports.textToNumber = textToNumber;
exports.numberToText = numberToText;
exports.router = router;
