var express = require('express');
var router = express.Router();

router.post('/number', function (req, res, next) {
    res.sendStatus(200);
});

router.post('/text', function (req, res, next) {
    res.sendStatus(200);
});

module.exports = router;
