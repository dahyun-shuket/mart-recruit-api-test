//user_router.js
const router = require("express").Router();
const { tokenVerify } = require("../app/services/auth");
const { create, login, list, get, update, remove, checkid, paging} = require("../app/controllers/users");

router.post("/create", create);
router.get("/list",  list);
router.get("/paging/:currentPage",  paging);
router.post("/login", login);
router.get("get/:id", tokenVerify, get);
router.patch("/update", tokenVerify, update);
router.patch("/delete", tokenVerify, remove);
router.post("/checkid", checkid);
module.exports = router;
