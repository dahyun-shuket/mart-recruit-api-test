var express = require('express');
var router = express.Router();

const { create, update, remove, list } = require('../app/controllers/workingRegion.js');

router.get('/create', create);

router.get('/update', update);

router.get('/remove', remove);

router.get('/list', list);

module.exports = router;
