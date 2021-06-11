//user_router.js
const router = require("express").Router();
const { tokenVerify } = require("../app/services/auth");
const { create, login, list, get, getUser, update, updatePassword, remove, checkid} = require("../app/controllers/users");

router.post("/login", login);

router.post("/list", tokenVerify,  list);

router.post("/get", tokenVerify, get);

router.post("/getUser", getUser);

router.post("/create", create);

router.post("/update", tokenVerify, update);

router.post("/updatePassword", tokenVerify, updatePassword);

router.post("/remove", tokenVerify, remove);

router.post("/checkid", checkid);
// router.post("/bizNoCheck", bizNoCheck);
module.exports = router;