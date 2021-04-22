const jwt = require("jsonwebtoken");
const secretKey = require("../config/secretKey").secretKey;
const options = require("../config/secretKey").options;

module.exports = class credentialService {
    static getToken({ result: results }) {
        let accessToken = sign({ result: results }, secretKey, options);
        console.log("Access Token ? ? : " + accessToken);
        return res.json({
            result: "success",
            data: results,
            token: accessToken,
        });
    }
};
