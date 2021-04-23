const { login, getUser, create, getUserByUserID, update, deleteId, checkId, paging } = require("../services/users");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const secretKey = require("../config/secretKey").secretKey;
const options = require("../config/secretKey").options;

module.exports = {
    // 유저 생성
    async create(req, res, next) {
        try {
            const body = req.body;
            console.log(body);
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            let createUser = await create(body);
            console.log(createUser);

            res.json({
                result: "success",
                data: createUser,
            });
        } catch (error) {
            return res.json({
                result: "fail",
                data: "Database connect error",
            });
        }
    },
    // 로그인
    async login(req, res, next) {
        const body = req.body;
        console.log(body);
        let bodyst = JSON.stringify(body);
        console.log(bodyst);
        let results = await login(body.user_id);
        console.log(typeof results);
        console.log("results ? ? ? : " + results);
        resultsStringfy = JSON.stringify(results);
        console.log("resultsStringfy ? ? ? " + resultsStringfy);
        if (!results) {
            return res.json({
                result: "fail",
                data: "Invalid ID or Password",
            });
        }
        const result = compareSync(body.password, results.PWD);
        if (result) {
            // 토큰 생성
            results.password = undefined;
            let accessToken = sign({ result: results }, secretKey, options);
            console.log("Access Token ? ? : " + accessToken);
            console.log("result ? ? ? ? :  " + result);
            return res.json({
                result: "success",
                data: results,
                token: accessToken,
            });
        } else {
            return res.json({
                result: "fail",
                data: "Invalid ID or Password",
            });
        }
    },
    // 유저 전체조회
    async getUser(req, res) {
        const getUsers = await getUser();
        console.log("getUser 들어옴");
        return res.json({
            result: "success",
            data: getUsers,
        });
    },
    // 유저 한명조회
    async getUserByUserID(req, res) {
        const seq = req.param.seq;
        const getUserByUserSEQOne = await getUserByUserID(seq);

        return res.json({
            result: "success",
            data: getUserByUserSEQOne,
        });
    },
    // 유저 수정
    async updateUser(req, res) {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        let updateUser = await update(body);
        console.log(updateUser);
        return res.json({
            result: "success",
            data: updateUser,
        });
    },
    // 유저 삭제
    async deleteUser(req, res) {
        const body = req.body;
        let deleteUser = await deleteId(body);
        console.log(deleteUser);
        return res.json({
            result: "success",
            data: deleteUser,
        });
    },
    // 아이디 중복 체크
    async checkid(req, res) {
        const body = req.body;
        let checkidUser = await checkId(body);
        console.log(checkidUser);
        return res.json({
            result: "success",
            data: checkidUser,
        });
    },
    async paging(req, res) {
        let rowPerPage = 10; // 페이지당 보여줄 글목록 : 10개
        let currentPage = 1;
        if (req.params.currentPage) {
            currentPage = parseInt(req.params.currentPage);
        }
        let beginRow = (currentPage - 1) * rowPerPage;
        let page = await paging(currentPage, rowPerPage, beginRow);
        console.log(page);
        return res.json({
            result: "success",
            data: page,
        });
    },
};
