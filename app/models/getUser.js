const pool = require("../../app/config/database");

module.exports = class getUser {
    static async getUser() {
        try {
            const [rows, fields] = await pool.query(`select * from users`,[]);
            return rows;
        } catch (error) {
            console.log("login model Error ! : " + error);
            
        }
    }
};
