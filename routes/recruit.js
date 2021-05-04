var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, remove, get, list, listForAdmin, updateJobKind, updateWorkingRegion } = require('../app/controllers/recruit.js');

router.post('/create', tokenVerify, create);

router.post('/update', tokenVerify, update);

router.post('/remove', tokenVerify, remove);

router.post('/get', get);

router.post('/list', list);

router.post('/listForAdmin', tokenVerify, listForAdmin);

router.post('/updateJobKind', tokenVerify, updateJobKind);

router.post('/updateRegion', tokenVerify, updateWorkingRegion);

module.exports = router;