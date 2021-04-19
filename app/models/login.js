const pool = require("../../app/config/database_dev");

module.exports = class login {
    static async login(user_id) {
        console.log("로그인 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`select SEQ, LOGINID, PWD from USERS where LOGINID = ?`, [user_id]);
            console.log("rows ? ? ? " + rows);
            return rows[0];
        } catch (error) {
            console.log("getUser model Error ! : " + error);
        }
    }
};
