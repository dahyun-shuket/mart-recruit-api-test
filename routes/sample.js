var express = require('express');
var router = express.Router();

const { sampleFunc } = require('../app/controllers/sample.js');

/* GET home page. */
router.post('/get/:code', sampleFunc);

module.exports = router;
