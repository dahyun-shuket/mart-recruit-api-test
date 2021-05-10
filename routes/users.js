//user_router.js
const router = require("express").Router();
const { tokenVerify } = require("../app/services/auth");
const { create, login, list, get, update, remove, checkid} = require("../app/controllers/users");

router.post("/login", login);

router.post("/list", tokenVerify,  list);

router.get("/get/:id", tokenVerify, get);

router.post("/get/:id", tokenVerify, get);

router.post("/create", create);

router.patch("/update/:seq", tokenVerify, update);

router.patch("/remove/:seq", tokenVerify, remove);

router.post("/checkid", checkid);
// router.post("/bizNoCheck", bizNoCheck);
module.exports = router;