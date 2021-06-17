var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, updateLogo, remove, get, getByUser, list, createJobRequest, getJobRequest, removeJobRequest, listJobRequest } = require('../app/controllers/mart.js');

// 마트 생성
router.post('/create', create);

// 마트 업데이트
router.post('/update', tokenVerify, update);

// 마트로고 업데이트
router.post('/updateLogo', tokenVerify, updateLogo);

// 마트 삭제
router.post('/remove', tokenVerify, remove);

// 마트 한개조회
router.post('/get', get);

// 유저에대한 마트 한개조회
router.post('/getByUser', getByUser);

// 마트 리스트
router.post('/list', list);

// 지원요청 생성
router.post('/createJobRequest', tokenVerify, createJobRequest);

// 지원요청 한개 조회
router.post('/getJobRequest', tokenVerify, getJobRequest);

// 지원요청 삭제
router.post('/removeJobRequest', tokenVerify, removeJobRequest);

// 지원요청 리스트
router.post('/listJobRequest', tokenVerify, listJobRequest);

module.exports = router;
