const logger = require('../config/logger.js');
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
            console.log(JSON.stringify(req.body))
            let userId = req.body.userid
            let password = req.body.password
            let userType = req.body.usertype
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
        let userId = req.body.userId
        let password = req.body.password
        let results = await userService.login(userId);
        if (!results) {
            // 로그인이 실패했다
            logger.writeLog('info', `controller/login: 로그인 실패 (아이디 찾을 수 없음) ${userId} / ${password}`);
            return res.json({
                result: "fail",
                data: "Invalid ID or Password",
            });
        }
        // 암호화된 암호를 비교
        const result = compareSync(password, results.PWD);
        if (result) {
            // 토큰 생성
            results.password = undefined;
            let accessToken = sign({ result: [results.SEQ,results.LOGINID] }, secretKey, options);
            // console.log("Access Token ? ? : " + accessToken);
            logger.writeLog('info', `controller/login: 로그인 성공 ${userId} / ${accessToken}`);

            return res.json({
                result: "success",
                data: results,
                token: accessToken,
            });
        } else {
            logger.writeLog('info', `controller/login: 로그인 실패 (암호 매칭 실패) ${userId} / ${password}`);
            return res.json({
                result: "fail",
                data: "Invalid Password",
            });
        }
    },

    // 유저 전체조회
    async list(req,res, next){
        const page = (req.body.page) ? req.body.page : 1;
        const rowCount = (req.body.rowCount) ? req.body.rowCount : defaultRowCount;
        const userType = req.body.userType
        const totalCount = await userService.count(req.body.userLoginId, userType);
        const userLoginId = (req.body.userLoginId) ? req.body.userLoginId : '';
        console.log(totalCount)
        const list = await userService.list(userType, userLoginId, page, rowCount);
        return res.json({
            result: "success",
            totalCount : totalCount,
            data: list,
        });
    },
    // 유저 한명조회
    async get(req, res) {
        const seq = req.params.id;
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
        console.log(seq)
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
