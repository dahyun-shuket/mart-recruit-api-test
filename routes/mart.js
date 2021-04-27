var express = require('express');
var router = express.Router();

const { create, update, remove, get, list } = require('../app/controllers/mart.js');

router.post('/create', create);

router.post('/update', update);

router.post('/remove', remove);

router.post('/get', get);

router.post('/list', list);

module.exports = router;
