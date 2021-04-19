const { compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const getUserByUserLoginid = require("../services/getUserByUserLoginid");
module.exports = {
    async login(req, res, next) {
        try {
            const body = req.body;
            console.log(body)
            console.log("login body ? ? ? : " + body);
            let results = await getUserByUserLoginid.login(body.user_id);
            console.log(typeof results);
            console.log("results ? ? ? : " + results);
            resultsStringfy = JSON.stringify(results);
            console.log("resultsStringfy ? ? ? " + resultsStringfy);
            if (!results) {
                return res.json({
                    success: 0,
                    message: "Invalid ID or Password",
                });
            }
            console.log("Type of results ? ? ? : " + typeof results);
            const result = compareSync(body.password, results.PWD);
            console.log("result ? ? ? " + result);
            if (result) {
                // 토큰 생성
                results.password = undefined;
                const jsontoken = sign({ result: results }, "Token", {
                    expiresIn: "1h",
                });

                // if (req.headers.authorization && req.headers.authorization.startWith("Bearer")) {
                //     /* 앞에 Bearer과 하나의 공백을 빼고 토큰 값만 파싱 ! */
                //     token = req.headers.authorization.split(" ")[1];
                // } /* 아래 부분은 혹시 쿠키에 토큰이 있는 경우를 대비해 처리 ! */ else if (req.cookies.token) {
                //     token = req.cookies.token;
                // }
                // res.redirect('http://localhost:8081/')
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken,
                });
            } else {
                return res.json({
                    success: 0,
                    message: "Invalid ID or Password",
                });
            }
        } catch (error) {
            console.log("로그인 컨트롤러 에러 ! ! ! ");
        }
    },
};
