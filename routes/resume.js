var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, remove, get, list, listPerRecruit, certificate, clearCertificate, updateJobKind, updateWorkingRegion, addCareer, updateCareer, removeCareer, getCareer, listCareer } = require('../app/controllers/resume.js');

router.post('/create', create);

router.post('/update', update);

router.post('/remove', remove);

router.post('/get', get);

router.post('/list', list);

router.post('/listPerRecruit', listPerRecruit);

router.post('/certificate', certificate);

router.post('/clearCertificate', clearCertificate);

router.post('/updateJobKind', updateJobKind);

router.post('/updateRegion', updateWorkingRegion);

router.post('/addCareer', addCareer);

router.post('/updateCareer', updateCareer);

router.post('/removeCareer', removeCareer);

router.post('/getCareer', getCareer);

router.post('/listCareer', listCareer);

module.exports = router;
