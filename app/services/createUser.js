var createUserModel = require("../models/createUser");

module.exports = class createService {
    static createU(body) {
        return new Promise(function (resolve, reject) {
          console.log("서비스 들어옴")
            try {
                let createUser = createUserModel.createU(body);
                resolve(createUser);
                console.log("서비스 성공");
            } catch (error) {
              console.log("서비스 에러 발생");
              reject(error);
              logger.writeLog("error", `services/createUserService/post: ${error}`);
            }
        });
    }
};
