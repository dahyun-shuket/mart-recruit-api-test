const userService = require("../services/users");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const secretKey = require("../config/secretKey").secretKey;
const options = require("../config/secretKey").options;
const defaultRowCount = 20;

module.exports = {
    // 유저 생성
    async create(req, res, next) {
        try {
            let userId = req.body.userId
            let password = req.body.password
            let userType = req.body.userType
            let active = req.body.active
            let salt = genSaltSync(10);
            password = hashSync(password, salt);
            let createUser = await userService.create(userId, password, userType, active);

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
        // const body = req.body;
        let userId = req.body.userId
        let password = req.body.password
        let results = await userService.login(userId);
        if (!results) {
            return res.json({
                result: "fail",
                data: "Invalid ID or Password",
            });
        }
        const result = compareSync(password, results.PWD);
        if (result) {
            // 토큰 생성
            results.password = undefined;
            let accessToken = sign({ result: results }, secretKey, options);
            console.log("Access Token ? ? : " + accessToken);
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
    async list(req,res, next){
        const page = (req.body.page) ? req.body.page : 1;
        const rowCount = (req.body.rowCount) ? req.body.rowCount : defaultRowCount;
        const totalCount = await userService.count();
        // const list = await userService.list(req.body.name, page, rowCount);
        const list = await userService.list(page, rowCount);
        return res.json({
            result: "success",
            totalCount : totalCount,
            data: list,
        });
    },
    // 유저 한명조회
    async get(req, res) {
        const seq = req.param.seq;
        const getUser = await userService.get(seq);
        return res.json({
            result: "success",
            data: getUser,
        });
    },
    // 유저 수정
    async update(req, res) {
        let userId = req.body.userId
        let password = req.body.password
        let userType = req.body.userType
        let active = req.body.active
        let seq = req.body.seq
        const salt = genSaltSync(10);
        password = hashSync(password, salt);
        let updateUser = await userService.update(userId, password, userType, active, seq);
        console.log(updateUser);
        return res.json({
            result: "success",
            data: updateUser,
        });
    },
    // 유저 삭제
    async remove(req, res) {
        let seq = req.body.seq
        let removeUser = await userService.remove(seq);
        console.log(removeUser);
        return res.json({
            result: "success",
            data: removeUser,
        });
    },
    // 아이디 중복 체크
    async checkid(req, res) {
        const userId = req.body.userId
        let checkIdUser = await userService.checkId(userId);
        console.log(checkIdUser);
        return res.json({
            result: "success",
            data: checkIdUser,
        });
    },
    
};
