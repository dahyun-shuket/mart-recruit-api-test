const { login, getUser, create, getUserByUserID, update } = require("../services/userService");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const secretKey = require("../config/secretKey").secretKey;
const options = require("../config/secretKey").options;
// const got = require('got');
// const createTokenService = require('../services/getToken.js');

module.exports = {
    async create(req, res, next) {
        try {
            const body = req.body;
            console.log(body);
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            let createUser = await create(body);
            console.log(createUser);

            // return
            res.status(200).json({
                result: "success",
                data: createUser
            });
            // res.redirect("http://localhost:8081/login");
        } catch (error) {
            return res.status(500).json({
                result: "fail",
                data: "Database connect error"
            });
        }
    },
    async login(req, res, next) {
        // try {
            const body = req.body;
            console.log(body)
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
                // let tokken = await createTokenService.getToken({ result: results });
                let accessToken = sign({ result: results }, secretKey, options);
                console.log("Access Token ? ? : " + accessToken);
                console.log("result ? ? ? ? :  " + result)
                return res.json({
                    result: "success",
                    data: results,
                    token: accessToken
                });
                // res.cookie("user", accessToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                // res.redirect("http://localhost:8081/user");
            } else {
                return res.json({
                    result: "fail",
                    data: "Invalid ID or Password",
                });
            }
        // } catch (error) {
        //     console.log("로그인 컨트롤러 에러 ! ! ! ");
        // }
    },
    async getUser(req, res) {
        const getUsers = await getUser();
        console.log("getUser 들어옴");
        return res.json({
            sucess: "success",
            resultData: getUsers
        });
    },
    async getUserByUserID(req, res) {
        const seq = req.param.seq;
        const getUserByUserSEQOne = await getUserByUserID(seq);

        return res.json({
            sucess: "success",
            data: getUserByUserSEQOne
        });
    },
    async updateUser(req, res) {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        let updateUser = await update(body);
        console.log(updateUser);
        return res.json({
            success : "success",
            data: updateUser
        })
    },
};
