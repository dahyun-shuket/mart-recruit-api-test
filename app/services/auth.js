const logger = require('../config/logger.js');
const jwt = require("jsonwebtoken");
// const secretKey = require('../config/secretKey').secretKey;

module.exports = {
    tokenVerify: (req, res, next) => {
        // 헤더에서 가져온 토큰
        let token = req.get("Authorization");
        // console.log(token);
        // const secretKey = require('../config/secretKey').secretKey;
        const secretKey = (req.body.key) ? req.body.key : req.query.key


        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    logger.writeLog('info', `services/auth: 비정상 토큰`);
                    return res.json({
                        result: "fail",
                        resultdata: "Invalid Token..."
                    });
                } else {
                    logger.writeLog('info', `services/auth: 토큰체크완료: ${decoded}`);           
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            logger.writeLog('info', `services/auth: 인증되지 않은 사용자`);
            return res.json({
                result: "fail",
                resultdata: "Access Denied! Unauthorized User"
            });
        }
    },
};
