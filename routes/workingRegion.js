var express = require('express');
var router = express.Router();

const { create, update, remove, list } = require('../app/controllers/workingRegion.js');

// 지역 생성
router.post('/create', create);

// 지역 업데이트
router.post('/update', update);

// 지역 삭제
router.post('/remove', remove);

// 지역 리스트
router.post('/list', list);

module.exports = router;
