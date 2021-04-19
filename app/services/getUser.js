var getUserModel = require("../models/getUser");

module.exports = class getUserService {
    static async getUser() {
        let getUser = await getUserModel.getUser();
        return getUser;
    }
};
