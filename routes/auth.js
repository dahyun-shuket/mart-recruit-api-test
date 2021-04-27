var express = require('express');
var router = express.Router();

const { isAuthorized } = require('../app/controllers/auth.js');

router.get('/', isAuthorized);

module.exports = router;
