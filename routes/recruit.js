var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, remove, active, close, get, copy, list, reactList, listUserApply, listForAdmin, updateJobKind, updateWorkingRegion, 
    getUserStatus, getActiveCount, getResumeCount, apply, cancelApply, setRead, setStep, getApply } = require('../app/controllers/recruit.js');

// 공고 생성
router.post('/create', tokenVerify, create);

// 공고 업데이트
router.post('/update', tokenVerify, update);

// 공고 삭제
router.post('/remove', tokenVerify, remove);

// 공고 활성화 (진행)
router.post('/active', tokenVerify, active);

// 공고 마감
router.post('/close', tokenVerify, close);

// 공고 가져오기
router.post('/get', tokenVerify, get);

// 공고 복사
router.post('/copy', tokenVerify, copy);

// 공고 리스트
router.post('/list', tokenVerify, list);
router.post('/reactList', tokenVerify, reactList);


// 유저가지원한 공고리스트
router.post('/listUserApply', tokenVerify, listUserApply);

router.post('/listForAdmin', tokenVerify, listForAdmin);

router.post('/updateJobKind', tokenVerify, updateJobKind);

router.post('/updateRegion', tokenVerify, updateWorkingRegion);

router.post('/getUserStatus', tokenVerify, getUserStatus);

// 지원하기
router.post('/apply', tokenVerify, apply);

// 자원취소
router.post('/cancelApply', tokenVerify, cancelApply);

// 
router.post('/getActiveCount', getActiveCount);

// 이력서 개수
router.post('/getResumeCount', getResumeCount);

router.post('/setRead', tokenVerify, setRead);

router.post('/setStep', tokenVerify, setStep);

router.post('/getApply', tokenVerify, getApply);

module.exports = router;
