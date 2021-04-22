var express = require('express');
var router = express.Router();

const { create, update, remove, get, listByMart, list } = require('../app/controllers/jobOpening.js');

router.get('/create', create);

router.get('/update', update);

router.get('/remove', remove);

router.get('/get', get);

router.get('/list', list);

module.exports = router;
