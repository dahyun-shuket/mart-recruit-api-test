var express = require('express');
var router = express.Router();

const { create, update, remove, get, list, updateJobKind, updateWorkingRegion } = require('../app/controllers/jobOpening.js');

router.post('/create', create);

router.post('/update', update);

router.get('/remove', remove);

router.get('/get', get);

router.get('/list', list);

router.get('/updateJobKind', updateJobKind);

router.get('/updateRegion', updateWorkingRegion);

module.exports = router;
