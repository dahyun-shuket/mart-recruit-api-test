var express = require('express');
var router = express.Router();

const { create, update, remove, get, list, listForAdmin, updateJobKind, updateWorkingRegion } = require('../app/controllers/recruit.js');

router.post('/create', create);

router.post('/update', update);

router.get('/remove', remove);

router.get('/get', get);

router.get('/list', list);

router.get('/listForAdmin', listForAdmin);

router.get('/updateJobKind', updateJobKind);

router.get('/updateRegion', updateWorkingRegion);

module.exports = router;
