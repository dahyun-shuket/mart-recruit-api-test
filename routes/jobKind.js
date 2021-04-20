var express = require('express');
var router = express.Router();

const { create, update, remove, list } = require('../app/controllers/jobKind.js');

/* GET home page. */
router.get('/list', list);

module.exports = router;
