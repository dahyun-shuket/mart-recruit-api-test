var express = require('express');
const { tokenVerify } = require("../app/services/auth");
var router = express.Router();

const { create, update, remove, get, list, listPerRecruit, updateJobKind, updateWorkingRegion, addCarrier, updateCarrier, removeCarrier, getCarrier, listCarrier } = require('../app/controllers/resume.js');

router.post('/create', create);

router.post('/update', update);

router.post('/remove', remove);

router.post('/get', get);

router.post('/list', list);

router.post('/listPerRecruit', listPerRecruit);

router.post('/updateJobKind', updateJobKind);

router.post('/updateRegion', updateWorkingRegion);

router.post('/addCarrier', addCarrier);

router.post('/updateCarrier', updateCarrier);

router.post('/removeCarrier', removeCarrier);

router.post('/getCarrier', getCarrier);

router.post('/listCarrier', listCarrier);

module.exports = router;
