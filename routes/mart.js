var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, updateLogo, remove, get, getByUser, list } = require('../app/controllers/mart.js');

router.post('/create', create);

router.post('/update', tokenVerify, update);

router.post('/updateLogo', tokenVerify, updateLogo);

router.post('/remove', tokenVerify, remove);

router.post('/get', get);

router.post('/getByUser', getByUser);

router.post('/list', list);

module.exports = router;
