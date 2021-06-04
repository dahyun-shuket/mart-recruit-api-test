var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, remove, get, getByUserSeq, list, listForRecruit, 
    certificate, clearCertificate, updateJobKind, updateWorkingRegion, 
    addCareer, updateCareer, removeCareer, getCareer, listCareer, 
    updateImage, updatecertificate, increaseView, 
    createScrap, getScrap, removeScrap, listScrap, listJobRequest } = require('../app/controllers/resume.js');

router.post('/create', create);

router.post('/update', tokenVerify, update);

router.post('/remove', remove);

router.post('/get', tokenVerify, get);

router.post('/getByUserSeq', tokenVerify, getByUserSeq);

router.post('/list', tokenVerify, list);

router.post('/listForRecruit', tokenVerify, listForRecruit);

router.post('/certificate', certificate);

router.post('/clearCertificate', clearCertificate);

router.post('/updateJobKind', tokenVerify, updateJobKind);

router.post('/updateRegion', tokenVerify, updateWorkingRegion);

router.post('/addCareer', tokenVerify, addCareer);

router.post('/updateCareer', tokenVerify, updateCareer);

router.post('/removeCareer', tokenVerify, removeCareer);

router.post('/getCareer', tokenVerify, getCareer);

router.post('/listCareer', tokenVerify, listCareer);

router.post('/updateImage', tokenVerify, updateImage);

router.post('/updatecertificate', tokenVerify, updatecertificate);

router.post('/increaseView', increaseView);

router.post('/createScrap', tokenVerify, createScrap);

router.post('/getScrap', tokenVerify, getScrap);

router.post('/removeScrap', tokenVerify, removeScrap);

router.post('/listScrap', tokenVerify, listScrap);

router.post('/listJobRequest', tokenVerify, listJobRequest);

module.exports = router;
