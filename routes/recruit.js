var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, remove, get, list, listForAdmin, updateJobKind, updateWorkingRegion } = require('../app/controllers/recruit.js');

router.post('/create', tokenVerify, create);

router.post('/update', tokenVerify, update);

router.get('/remove', tokenVerify, remove);

router.get('/get', get);

router.get('/list', list);

router.get('/listForAdmin', tokenVerify, listForAdmin);

router.get('/updateJobKind', tokenVerify, updateJobKind);

router.get('/updateRegion', tokenVerify, updateWorkingRegion);

module.exports = router;
