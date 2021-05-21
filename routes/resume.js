var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, remove, get, getByUserSeq, list, listForRecruit, certificate, clearCertificate, updateJobKind, updateWorkingRegion, addCareer, updateCareer, removeCareer, getCareer, listCareer, updateImage, updatecertificate } = require('../app/controllers/resume.js');

router.post('/create', create);

router.post('/update', update);

router.post('/remove', remove);

router.post('/get', get);

router.post('/getByUserSeq', getByUserSeq);

router.post('/list', list);

router.post('/listForRecruit', listForRecruit);

router.post('/certificate', certificate);

router.post('/clearCertificate', clearCertificate);

router.post('/updateJobKind', updateJobKind);

router.post('/updateRegion', updateWorkingRegion);

router.post('/addCareer', addCareer);

router.post('/updateCareer', updateCareer);

router.post('/removeCareer', removeCareer);

router.post('/getCareer', getCareer);

router.post('/listCareer', listCareer);

router.post('/updateImage', updateImage);

router.post('/updatecertificate', updatecertificate);



module.exports = router;
