const logger = require('../config/logger.js');
const jwt = require("jsonwebtoken");
// const secretKey = require('../config/secretKey').secretKey;
// const userService = require("../services/users");

module.exports = {
    async isAuthorized(req, res, next) {
        const token = req.headers['authorization'] || req.query.token;
        const secretKey = req.body.secretKey || req.query.secretKey;

        if (token) {
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    logger.writeLog('error', `controller/isAuthorized: ${err}`);           
                    res.json({
                        result: "fail",
                        data: err
                    });
                } else {
                    logger.writeLog('info', `controller/isAuthorized: 토큰체크 완료`);

                    res.json({
                        result: "success",
                        data: decoded.result
                    });                    
                }
            });
        } else {
            logger.writeLog('error', `controller/isAuthorized: 토큰 없음`);           
            res.json({
                result: "fail",
                data: "인증되지 않았습니다"                 
            });
        }
    }
    
}
