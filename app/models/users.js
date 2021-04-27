const pool = process.env.NODE_ENV == "production" ? require("../config/database") : require("../config/database_dev");

module.exports = class userModel {
    // 유저 생성
    static async create(userId, password, userType, active) {
        console.log("유저생성 모델 들어옴");
        try {
            const [rows, fileds] = await pool.query(`insert into USERS(LOGINID, PWD, USERTYPE, ACTIVE) values(?,?,?,?)`, [userId, password, userType, active]);
            console.log("rows ? ? ? " + rows);
            return rows;
        } catch (error) {
            console.log("createUser model Error ! : " + error);
        }
    }
    // 유저 로그인
    static async login(userId) {
        console.log("로그인 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`select SEQ, LOGINID, PWD, USERTYPE from USERS where LOGINID = ?`, [userId]);
            console.log("rows ? ? ? " + rows);
            return rows[0];
        } catch (error) {
            console.log("getUser model Error ! : " + error);
        }
    }
    // 유저 업데이트
    static async update(userId, password, userType, active, seq) {
        console.log("업데이트 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`update users set LOGINID=?, PWD=?, USERTYPE=?, ACTIVE=? where seq = ?`, [userId, password, userType, active, seq]);
            console.log("rows ? ? ? " + rows);
            return rows;
        } catch (error) {
            console.log("userUpdate model Error ! : " + error);
        }
    }
    // 유저 삭제
    static async remove(seq) {
        console.log("유저삭제 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`update users set ACTIVE=N where seq = ?`, [seq]);
            console.log("rows ? ? ? " + rows);
            return rows;
        } catch (error) {
            console.log("userUpdate model Error ! : " + error);
        }
    }
    // 아이디 중복 체크
    static async checkId(userId) {
        console.log("유저 아이디체크 모델 들어옴");
        try {
            const [rows, fields] = await pool.query(`select LOGINID from USERS where LOGINID = ?`, [userId]);
            console.log("rows ? ? ? " + rows);
            let checkUserId = new Object();
            checkUserId.tf = false; // 이 아이디를 사용가능 한가요??

            if (rows[0] === undefined) {
                //중복되는게 없으면
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
    // 유저 전체 조회
    static async list() {
        try {
            console.log("유저조회 모델 들어옴");
            const [rows, fields] = await pool.query(`select * from USERS`, []);
            return rows;
        } catch (error) {
            console.log("login model Error ! : " + error);
        }
    }
    // 유저 한명 조회
    static async get(seq) {
        console.log("유저한명조회 모델 들어옴" + seq);
        try {
            const [rows, fields] = await pool.query(`select * from USERS WHERE SEQ=?`, [seq]);
            return rows[0];
        } catch (error) {
            console.log("login model Error ! : " + error);
        }
    }
    
    // 페이징
    static async paging(beginRow, rowPerPage) {
        console.log("API 페이징 쿼리");
        try {
            const [rows, fields] = await pool.query(`select * from USERS ORDER BY SEQ DESC LIMIT ?,?`,[beginRow,rowPerPage]);
            console.log("rows ? ? ? " + rows);

            return rows;
        } catch (error) {
            console.log("API getAdminList model Error ! : " + error);
        }
    }
        
    // 전체 페이지 갯수
    static async count() {
        console.log("전체 회원수 쿼리");
        try {
            const [rows, fields] = await pool.query('SELECT COUNT(*) AS cnt FROM USERS',[]);
            return rows[0].cnt;
        } catch (error) {
            console.log("userCount model Error ! : " + error);
        }
    }
        
    // 마트업체 조회
    static async getMartList(data) {
        console.log("마트업체 조회 쿼리");
        try {
            const [rows, fields] = await pool.query(`select * from USERS where USER_TYPE = M`, []);
            console.log("rows ? ? ? " + rows);

            return rows;
        } catch (error) {
            console.log("getMartList model Error ! : " + error);
        }
    }
    // 구직자 조회
    static async getUserList(data) {
        console.log("구직자 조회 쿼리");
        try {
            const [rows, fields] = await pool.query(`select * from USERS where USER_TYPE = U`, []);
            console.log("rows ? ? ? " + rows);

            return rows;
        } catch (error) {
            console.log("getUserList model Error ! : " + error);
        }
    }
    // 관리자 조회
    static async getAdminList(data) {
        console.log("관리자 조회 쿼리");
        try {
            const [rows, fields] = await pool.query(`select * from USERS where USER_TYPE = A`, []);
            console.log("rows ? ? ? " + rows);

            return rows;
        } catch (error) {
            console.log("getAdminList model Error ! : " + error);
        }
    }
};
