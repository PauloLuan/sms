'use strict';

var self = this;

var express = require('express');
self.router = express.Router();

var _ = require('lodash');

self.keyboard = {
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

self.repeatString = function (string, num) {
    return new Array(parseInt(num) + 1).join(string);
};

self.findValueIndex = function (searchLetter) {
    var valueIndex;

    for (var arraykey in self.keyboard) {
        var lettersArray = self.keyboard[arraykey]
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

self.textToNumber = function (inputText) {
    var processedText = '';
    var count, lastLetter;

    var lowerInput = inputText.toLowerCase();

    _.forEach(lowerInput, function (value, key) {
        var valueIndex = self.findValueIndex(value);

        if (valueIndex) {
            valueIndex.index += 1; // arrays begins on zero, we have to increase the element before to do the next operation
            var multipliedString = self.repeatString(valueIndex.keyboardNumber, valueIndex.index);

            // must add an underscore when the sequence is the same as the last number.
            if (processedText.slice(-1) == valueIndex.keyboardNumber) {
                processedText += "_";
            }

            processedText += multipliedString;
        }
    });

    return processedText;
};

self.isOnlyNumbersOrUnderscore = function (input) {
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
    }
    ;

    if (_.isNull(isValid)) {
        isValid = false;
    }

    return isValid;
}

self.splitNumberSequences = function (inputArray) {
    var result = [],
        lastIndex = 0;

    for (var i = 0, len = inputArray.length; i < len; i++) {
        var value = inputArray[i];
        var isNumber = (_.isNumber(parseInt(value))) && !(_.isNaN(parseInt(value)));
        var isUnderscore = value === '_';

        if (!isNumber && value !== '_') {
            result = null;
            break;
        }

        if (!result[lastIndex] && result[lastIndex] !== '') {
            result.push('');
        }

        var isLastTheSame = value === result[lastIndex].slice(-1);
        var isEmpty = _.isEmpty(result[lastIndex]);

        if (isLastTheSame || isEmpty) {
            if (!isUnderscore) result[lastIndex] += value;
        }
        else {
            if (!isUnderscore || !isLastTheSame) {
                lastIndex++;
                result.push('');
                if (!isUnderscore) result[lastIndex] += value;
            }
        }
    }
    ;

    if (result) {
        result = _.without(result, ''); // clear empty elements from array
    }

    return result;
};

self.getLetterByNumberSequence = function (sequence) {
    if (!self.allTheSame(sequence)) {
        return null;
    }
    var value;
    var number = sequence[0];
    var len = sequence.length;
    var letterArray = self.keyboard[number];

    if (letterArray) {
        value = letterArray[len - 1];
    }

    return value;
};

self.allTheSame = function (array) {
    for(var i = 1, len = array.length; i < len; i++){
        if (array[i] !== array[0])
            return false;
    };

    return true;
};

self.numberToText = function (inputNumber) {
    var result = '';
    var lowerInput = inputNumber.toLowerCase();
    var splittedArray = self.splitNumberSequences(lowerInput);

    _.forEach(splittedArray, function (value, key) {
        var sequenceResult = self.getLetterByNumberSequence(value);
        if (sequenceResult && sequenceResult != '') result += sequenceResult;
    });

    return result;
};


/**
 * @api {post} /sms/number Request a text conversion passing a number as parameter and receives a text representation of that number.
 * @apiName GetTextByNumber
 *
 * @apiParam {Text} A number sequence representing a sms message.
 * @apiSuccess {Object} resultJson a json with the input and the converted result.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "text": '833777783303_33063377772'
 *     }
 *
 * @apiResponseExample {json} Response-Example:
 *     {
 *       'input': '833777783303_33063377772', 
 *       'result': 'teste de mesa'
 *     }
 *
 */
self.router.post('/number', function (req, res, next) {
    var params = req.body;
    var result = self.numberToText(params.text);
    var resultJson = {
        'input': params.text, 
        'result': result
    }; 
    return res.json(resultJson);
});


/**
 * @api {post} /sms/text Request a sms conversion, converting a text to a number.
 * @apiName GetNumberByText
 *
 * @apiParam {Text} A number sequence representing the sms message.
 * @apiSuccess {Object} resultJson a json with the input and the generated result.
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "text": 'teste de mesa'
 *     }
 *
 * @apiResponseExample {json} Response-Example:
 *     {
 *       'input': 'teste de mesa', 
 *       'result': '833777783303_33063377772'
 *     }
 *
 */
self.router.post('/text', function (req, res, next) {
    var params = req.body;
    var result = self.textToNumber(params.text);
    var resultJson = {
        'input': params.text, 
        'result': result
    }; 
    return res.json(resultJson);
});

module.exports = self;