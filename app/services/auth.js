const jwt = require("jsonwebtoken");
const secretKey = require('../config/secretKey').secretKey;

module.exports = {
    tokenVerify: (req, res, next) => {
        // 헤더에서 가져온 토큰
        let token = req.get("Authorization");
        console.log(token)

        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    return res.json({
                        result: "fail",
                        resultdata: "Invalid Token...",
                    });
                } else {
                    req.decoded = decoded;
                    console.log("토큰체크 완료.");
                    next();
                }
            });
        } else {
            return res.json({
                result: "fail",
                resultdata: "Access Denied! Unauthorized User",
            });
        }
    },
};
