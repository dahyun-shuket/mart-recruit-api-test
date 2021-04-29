var express = require('express');
var router = express.Router();

const { create, update, remove, get, list } = require('../app/controllers/mart.js');

router.post('/create', create);

router.post('/update', update);

router.get('/remove', remove);

router.get('/get', get);

router.get('/list', list);

module.exports = router;
