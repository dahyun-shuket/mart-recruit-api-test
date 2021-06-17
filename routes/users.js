//user_router.js
const router = require("express").Router();
const { tokenVerify } = require("../app/services/auth");
const { create, login, list, get, getUser, update, updatePassword, remove, checkid} = require("../app/controllers/users");

// 로그인
router.post("/login", login);

// 유저 리스트
router.post("/list", tokenVerify,  list);

// 유저 가져오기
router.post("/get", tokenVerify, get);

// 유저 가져오기
router.post("/getUser", getUser);

// 유저 생성
router.post("/create", create);

// 유저 업데이트
router.post("/update", tokenVerify, update);

// 유저 페스워드 업데이트
router.post("/updatePassword", tokenVerify, updatePassword);

// 유저 삭제
router.post("/remove", tokenVerify, remove);

// 아이디 중복체크
router.post("/checkid", checkid);

//  사업자번호 체크
// router.post("/bizNoCheck", bizNoCheck);

module.exports = router;