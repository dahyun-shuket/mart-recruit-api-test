const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class userModel {
    // 유저 생성
    static async create(data) {
        console.log("모델 들어옴");
        try {
            console.log(data);
            const [rows, fileds] = await pool.query(`insert into USERS(LOGINID, PWD, USERTYPE, ACTIVE) values(?,?,?,?)`, [data.user_id, data.password, data.user_type, data.active]);
            console.log("rows ? ? ? " + rows);
            console.log("rows[0] ? ? ?" + rows[0]);
            return rows;
        } catch (error) {
            console.log("createUser model Error ! : " + error);
        }
    }
    // 유저 조회
    static async getUser() {
        try {
            const [rows, fields] = await pool.query(`select * from USERS`, []);
            return rows;
        } catch (error) {
            console.log("login model Error ! : " + error);
        }
    }
    // 유저 한명 조회
    static async getUserByUserID(seq) {
        try {
            const [rows, fields] = await pool.query(`select * from USERS WHERE SEQ`, [seq]);
            return rows[0];
        } catch (error) {
            console.log("login model Error ! : " + error);
        }
    }
    // 로그인
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
    // 유저 업데이트
    static async userUpdate(data) {
        console.log("로그인 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`update users set LOGINID=?, PWD=?, USERTYPE=?, ACTIVE=? where seq = ?`, [data.user_id, data.password, data.user_type, data.active, data.seq]);
            console.log("rows ? ? ? " + rows);
            return rows;
        } catch (error) {
            console.log("userUpdate model Error ! : " + error);
        }
    }
};
