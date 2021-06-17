var express = require('express');
var router = express.Router();

const { create, update, remove, list } = require('../app/controllers/workingType.js');

// 근무형태 생성
router.post('/create', create);

// 근무형태 업데이트
router.post('/update', update);

// 근무형태 삭제
router.post('/remove', remove);

// 근무형태 리스트
router.post('/list', list);

module.exports = router;
