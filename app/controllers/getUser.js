const getUserService = require("../services/getUser");

module.exports = {
    async getUser(req, res) {
        const getUsers = await getUserService.getUser();

        return res.json({
            sucess: 1,
            data: getUsers,
        });
    }
};
