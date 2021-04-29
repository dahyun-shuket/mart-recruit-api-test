//user_router.js
const router = require("express").Router();
const { tokenVerify } = require("../app/services/auth");
const { create, login, list, get, update, remove, checkid, paging} = require("../app/controllers/users");

router.post("/login", login);
// router.get("/list",  tokenVerify, list);
router.post("/list",tokenVerify,  list);
router.get("/list/:id", tokenVerify, get);
router.post("/create", create);
router.patch("/update", tokenVerify, update);
router.patch("/remove/:seq", tokenVerify, remove);
router.post("/checkid", checkid);
module.exports = router;