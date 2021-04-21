//user_router.js
const router = require("express").Router();
const { tokenVerify } = require("../app/auth/token_validation");
const { create, login, getUser, getUserByUserID, updateUser } = require("../app/controllers/userController");

router.post("/", create);
router.get("/", tokenVerify, getUser);
router.post("/login", login);
router.get("/:id", tokenVerify, getUserByUserID);
router.patch("/", tokenVerify, updateUser);

module.exports = router;
