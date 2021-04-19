const pool = require("../../app/config/database_dev");

module.exports = class User {
    static async createU(data) {
      console.log("모델 들어옴")
        try {
            console.log(data)
            const [rows, fileds] = await pool.query(`insert into USERS(LOGINID, PWD, USERTYPE, ACTIVE) values(?,?,?,?)`, [data.user_id, data.password, data.user_type, data.active]);
            console.log("rows ? ? ? " + rows);
            console.log("rows[0] ? ? ?" + rows[0]);
            return rows;
        } catch (error) {
            console.log("createUser model Error ! : " + error);
        }
    }
};
