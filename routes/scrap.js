var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, remove, removeSeq, list } = require('../app/controllers/scrap.js');

router.post('/create', tokenVerify, create);

router.post('/remove', tokenVerify, remove);

router.post('/removeSeq', tokenVerify, removeSeq);

router.post('/list', tokenVerify, list);

module.exports = router;
