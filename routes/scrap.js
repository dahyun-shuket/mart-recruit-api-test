var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, remove, removeSeq, list } = require('../app/controllers/scrap.js');

// 스크랩 생성
router.post('/create', tokenVerify, create);

// 스크랩 삭제
router.post('/remove', tokenVerify, remove);

// 스크랩 한개 찾아서 삭제
router.post('/removeSeq', tokenVerify, removeSeq);

// 스크랩 리스트
router.post('/list', tokenVerify, list);

module.exports = router;
