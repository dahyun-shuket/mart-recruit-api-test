//user_router.js
const router = require("express").Router();
const { tokenVerify } = require("../app/services/auth");
const { create, login, getUser, getUserByUserID, updateUser, deleteUser, checkid} = require("../app/controllers/users");

router.post("/", create);
router.get("/", tokenVerify, getUser);
router.post("/login", login);
router.get("/:id", tokenVerify, getUserByUserID);
router.patch("/update", tokenVerify, updateUser);
router.patch("/delete", tokenVerify, deleteUser);
router.post("/checkid", checkid);
module.exports = router;
