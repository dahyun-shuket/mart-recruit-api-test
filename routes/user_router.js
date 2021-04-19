//user_router.js
const router = require("express").Router();
// const { getUserByUserID, updateUser } = require("../app/users/user_controller");
const { checkToken } = require("../app/auth/token_validation");
const { login } = require("../app/controllers/login");
const { create } = require("../app/controllers/userController");
const { getUser }  = require("../app/controllers/getUser");
// router.post("/", createUser);
router.post("/", create);
router.get("/", checkToken, getUser);
// router.get("/:id", getUserByUserID);
router.post("/login", login);
// router.patch("/", checkToken, updateUser);

module.exports = router;
