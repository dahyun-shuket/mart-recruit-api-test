var userModel = require("../models/userModel");

module.exports = class userService {
    static create(body) {
        return new Promise(function (resolve, reject) {
            console.log("서비스 들어옴");
            try {
                let createUser = userModel.create(body);
                resolve(createUser);
                console.log("서비스 성공");
            } catch (error) {
                console.log("서비스 에러 발생");
                reject(error);
                logger.writeLog("error", `services/createUserService/post: ${error}`);
            }
        });
    };

    static async login(user_id) {
        console.log("로그인 서비스 들어옴");
        let login = await userModel.login(user_id);
        return login;
    };

    static async getUser() {
        let getUser = await userModel.getUser();
        return getUser;
    };

    static async getUserByUserID(seq){
        let getUserByUserID = await userModel.getUserByUserID(seq);
        return getUserByUserID;
    };

    static async update(body){
        return new Promise(function (resolve, reject) {
            try {
                let update = userModel.userUpdate(body);        
                resolve(update);
            } catch (error) {
                reject(error);
            }
    })
    };
};
