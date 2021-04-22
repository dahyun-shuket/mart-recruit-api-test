const pool = process.env.NODE_ENV == "production" ? require("../config/database") : require("../config/database_dev");

module.exports = class userModel {
    // 유저 생성
    static async create(data) {
        console.log("유저생성 모델 들어옴");
        try {
            // console.log(data);
            const [rows, fileds] = await pool.query(`insert into USERS(LOGINID, PWD, USERTYPE, ACTIVE) values(?,?,?,?)`, [data.user_id, data.password, data.user_type, data.active]);
            // console.log("rows ? ? ? " + rows);
            // console.log("rows[0] ? ? ?" + rows[0]);
            return rows;
        } catch (error) {
            console.log("createUser model Error ! : " + error);
        }
    }
    // 유저 조회
    static async getUser() {
        try {
            console.log("유저조회 모델 들어옴");
            const [rows, fields] = await pool.query(`select * from USERS`, []);
            return rows;
        } catch (error) {
            console.log("login model Error ! : " + error);
        }
    }
    // 유저 한명 조회
    static async getUserByUserID(seq) {
        console.log("유저한명조회 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`select * from USERS WHERE SEQ`, [seq]);
            return rows[0];
        } catch (error) {
            console.log("login model Error ! : " + error);
        }
    }
    // 유저 로그인
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
        console.log("업데이트 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`update users set LOGINID=?, PWD=?, USERTYPE=?, ACTIVE=? where seq = ?`, [data.user_id, data.password, data.user_type, data.active, data.seq]);
            console.log("rows ? ? ? " + rows);
            return rows;
        } catch (error) {
            console.log("userUpdate model Error ! : " + error);
        }
    }
    // 유저 삭제
    static async userDelete(data) {
        console.log("유저삭제 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`update users set ACTIVE=N where seq = ?`, [data.seq]);
            console.log("rows ? ? ? " + rows);
            return rows;
        } catch (error) {
            console.log("userUpdate model Error ! : " + error);
        }
    }
    // 아이디 중복 체크
    static async userCheckId(data) {
        console.log("유저 아이디체크 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`select LOGINID from USERS where LOGINID = ?`, [data.user_id]);
            console.log("rows ? ? ? " + rows);
            let checkUserId = new Object();
            checkUserId.tf = false; // 이 아이디를 사용가능 한가요??

            if (rows[0] === undefined) {
                //중복되는게 없으면 (없으니까 못가져왓겠지)
                checkUserId.tf = true; //없음 사용가능
                return checkUserId; //다시 클라이언트로 보낸다 checkid 객체를
            } else {
                checkUserId.tf = false; // 중복됨 사용x
                return checkUserId;
            }
            // return rows;
        } catch (error) {
            console.log("userUpdate model Error ! : " + error);
        }
    }
};
