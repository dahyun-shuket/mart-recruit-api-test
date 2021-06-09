var express = require('express');
var router = express.Router();

const { getDashboard } = require('../app/controllers/analytics.js');

router.post('/getDashboard', getDashboard);

module.exports = router;
