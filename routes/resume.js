var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, remove, get, getByUserSeq, list, reactlist,  listForRecruit, 
    certificate, clearCertificate, updateJobKind, updateWorkingRegion, 
    addCareer, updateCareer, removeCareer, getCareer, listCareer, 
    updateImage, updatecertificate, increaseView, 
    createScrap, getScrap, removeScrap, listScrap, listJobRequest } = require('../app/controllers/resume.js');

// 이력서 생성
router.post('/create', create);

// 이력서 업데이트
router.post('/update', tokenVerify, update);

// 이력서 삭제
router.post('/remove', tokenVerify, remove);

// 이력서 한개 가져오기
router.post('/get', tokenVerify, get);

// 유저seq로 이력서 가져오기
router.post('/getByUserSeq', tokenVerify, getByUserSeq);

// 이력서 리스트
router.post('/list', tokenVerify, list);

// 리엑트 리스트 전용
router.post('/reactlist', tokenVerify, reactlist);


// 공고에 지원한 이력서 리스트
router.post('/listForRecruit', listForRecruit);

// 인증여부
router.post('/certificate', tokenVerify, certificate);

// 인증 초기화
router.post('/clearCertificate', clearCertificate);

// 직종 업데이트
router.post('/updateJobKind', tokenVerify, updateJobKind);

// 지역 업데이트
router.post('/updateRegion', tokenVerify, updateWorkingRegion);

// 경력 생성
router.post('/addCareer', tokenVerify, addCareer);

// 경력 업데이트
router.post('/updateCareer', tokenVerify, updateCareer);

// 경력 삭제
router.post('/removeCareer', tokenVerify, removeCareer);

// 경력 한개 가져오기
router.post('/getCareer', tokenVerify, getCareer);

// 경력 리스트
router.post('/listCareer', listCareer);

// 이력서 이미지 업데이트
router.post('/updateImage', tokenVerify, updateImage);

// 이력서 경력서류 업데이트
router.post('/updatecertificate', tokenVerify, updatecertificate);

// 이력서 조회수
router.post('/increaseView', increaseView);

// 스크랩 생성
router.post('/createScrap', tokenVerify, createScrap);

// 스크랩 한개 가져오기
router.post('/getScrap', tokenVerify, getScrap);

// 스크랩 삭제
router.post('/removeScrap', tokenVerify, removeScrap);

// 스크랩 리스트
router.post('/listScrap', tokenVerify, listScrap);

// 지원목록 리스트
router.post('/listJobRequest', tokenVerify, listJobRequest);

module.exports = router;
