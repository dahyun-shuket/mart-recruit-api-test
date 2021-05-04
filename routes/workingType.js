var express = require('express');
var router = express.Router();

const { create, update, remove, list } = require('../app/controllers/workingType.js');

router.post('/create', create);

router.post('/update', update);

router.post('/remove', remove);

router.post('/list', list);

module.exports = router;
