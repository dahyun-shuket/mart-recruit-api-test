var express = require('express');
var router = express.Router();

const { isAuthorized } = require('../app/controllers/auth.js');

router.post('/', isAuthorized);

module.exports = router;
