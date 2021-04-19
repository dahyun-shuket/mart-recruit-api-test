var loginModel = require("../models/login");

module.exports = class loginService {
    static async login(user_id) {
        console.log("로그인 서비스 들어옴");
        let login = await loginModel.login(user_id);
        return login;
    }
};
