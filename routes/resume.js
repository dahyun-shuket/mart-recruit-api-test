var express = require('express');
var router = express.Router();

const { create, update, remove, get, list, listPerRecruit, updateJobKind, updateWorkingRegion, addCarrier, updateCarrier, removeCarrier, getCarrier, listCarrier } = require('../app/controllers/resume.js');

router.post('/create', create);

router.post('/update', update);

router.get('/remove', remove);

router.get('/get', get);

router.get('/list', list);

router.get('/listPerRecruit', listPerRecruit);

router.get('/updateJobKind', updateJobKind);

router.get('/updateRegion', updateWorkingRegion);

router.post('/addCarrier', addCarrier);

router.post('/updateCarrier', updateCarrier);

router.get('/removeCarrier', removeCarrier);

router.get('/getCarrier', getCarrier);

router.get('/listCarrier', listCarrier);

module.exports = router;
