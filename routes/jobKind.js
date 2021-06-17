var express = require('express');
var router = express.Router();

const { create, update, remove, list } = require('../app/controllers/jobKind.js');

// 직종 생성
router.post('/create', create);

// 직종 업데이트
router.post('/update', update);

// 직종 삭제
router.post('/remove', remove);

// 직종 리스트
router.post('/list', list);

module.exports = router;
