var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, remove, active, close, get, copy, list, listForAdmin, updateJobKind, updateWorkingRegion, 
    getUserStatus, getActiveCount, getResumeCount, apply, cancelApply } = require('../app/controllers/recruit.js');

router.post('/create', tokenVerify, create);

router.post('/update', tokenVerify, update);

router.post('/remove', tokenVerify, remove);

router.post('/active', tokenVerify, active);

router.post('/close', tokenVerify, close);

router.post('/get', get);

router.post('/copy', tokenVerify, copy);

router.post('/list', list);

router.post('/listForAdmin', tokenVerify, listForAdmin);

router.post('/updateJobKind', tokenVerify, updateJobKind);

router.post('/updateRegion', tokenVerify, updateWorkingRegion);

router.post('/getUserStatus', tokenVerify, getUserStatus);

router.post('/apply', tokenVerify, apply);

router.post('/cancelApply', tokenVerify, cancelApply);

router.post('/getActiveCount', getActiveCount);

router.post('/getResumeCount', getResumeCount);

module.exports = router;
