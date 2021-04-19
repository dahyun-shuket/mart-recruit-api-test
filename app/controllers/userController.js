const { genSaltSync, hashSync } = require("bcrypt");
const createUserService = require("../services/createUser");

module.exports = {
    async create(req, res, next) {
        try {
            const body = req.body;
            console.log(body);
            // var uid = req.body.user_id;
            // var upwd = req.body.password;
            const salt = genSaltSync(10);
            body.password = hashSync(body.password, salt);
            let createUser = await createUserService.createU(body);
            console.log(createUser);

            // return 
            res.redirect('http://localhost:8081/login')
            res.status(200).json({
                sucess: 1,
                data: createUser,
            });
            // return "http://localhost:8081/login"
        } catch (error) {
            return res.status(500).json({
                sucess: 0,
                message: "Database connect error",
            });
        }
    },
};
