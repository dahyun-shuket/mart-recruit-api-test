const pool = process.env.NODE_ENV == "production" ? require("../config/database") : require("../config/database_dev");
const logger = require('../config/logger.js');
module.exports = class userModel {
    // 유저 생성
    static async create(userId, password, userType, active) {
        try {
            const [rows, fileds] = await pool.query(`insert into USERS(LOGINID, PWD, USERTYPE, ACTIVE) values(?,?,?,?)`, [userId, password, userType, active]);
            return rows;
        } catch (error) {
            console.log("userCreate model Error ! : " + error);
        }
    }
    // 유저 로그인
    static async login(userId) {
        try {
            const [rows, fields] = await pool.query(`select SEQ, LOGINID, PWD, USERTYPE from USERS where LOGINID = ?`, [userId]);
            return rows[0];
        } catch (error) {
            console.log("login model Error ! : " + error);
        }
    }
    // 유저 업데이트
    static async update(userId, password, userType, active, seq) {
        try {
            const [rows, fields] = await pool.query(`update USERS set LOGINID=?, PWD=?, USERTYPE=?, ACTIVE=? where SEQ = ?`, [userId, password, userType, active, seq]);
            return rows;
        } catch (error) {
            console.log("userUpdate model Error ! : " + error);
        }
    }
    // 유저 삭제
    static async remove(seq) {
        try {
            const [rows, fields] = await pool.query(`UPDATE USERS set ACTIVE="N" where SEQ = ?`, [seq]);
            return rows;
        } catch (error) {
            console.log("userRemove model Error ! : " + error);
        }
    }
    // 아이디 중복 체크
    static async checkId(userId) {
        try {
            const [rows, fields] = await pool.query(`select LOGINID from USERS where LOGINID = ?`, [userId]);
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
            console.log("checkId model Error ! : " + error);
        }
    }

    static async list(usertype, userLoginId, limit, offset) {
        try {
                var sql = ` SELECT
                                SEQ, LOGINID, PWD, USERTYPE, ACTIVE, CREATED, MODIFIED 
                            FROM
                                USERS 
                            WHERE
                                ACTIVE='Y'  AND
                                USERTYPE='${usertype}'
                                ${(userLoginId && userLoginId != '') ? 'AND LOGINID LIKE \'%' + userLoginId + '%\'' : ''}  
                            LIMIT ? OFFSET ? `
                const [rows, fields] = await pool.query(sql, [limit, offset]);
                if(rows.length > 0){
                    return rows;
                }else{
                    logger.writeLog('error', `API - models/userModel.list: No data found`);           
                return null;
                }
                // return rows;
        } catch (error) {
            logger.writeLog('error', `API - models/userModel.list: ${error}`);           
            return null;
        }
    }
    // 유저 한명 조회
    static async get(seq) {
        // console.log("유저한명조회 모델 들어옴" + seq);
        try {
            const [rows, fields] = await pool.query(`select * from USERS WHERE SEQ=?`, [seq]);
            return rows[0];
        } catch (error) {
            console.log("login model Error ! : " + error);
        }
    }
    
    // 페이징
    static async paging(beginRow, rowPerPage) {
        try {
            const [rows, fields] = await pool.query(`select * from USERS ORDER BY SEQ DESC LIMIT ?,?`,[beginRow,rowPerPage]);
            return rows;
        } catch (error) {
            console.log("API getAdminList model Error ! : " + error);
        }
    }
        
    // 전체 페이지 갯수
    static async count(searchId, usertype) {
        try {
            const sql = `SELECT 
                            COUNT(*) AS cnt 
                        FROM 
                            USERS 
                        WHERE 
                            ACTIVE='Y' 
                            ${(searchId && searchId != '') ? 'AND LOGINID LIKE \'%' + searchId + '%\'' : ''} 
                            ${(usertype && usertype != '') ? 'AND USERTYPE LIKE \'%' + usertype + '%\'' : ''}
                            `;
            const [rows, fields] = await pool.query(sql,[]);
            return rows[0].cnt;
        } catch (error) {
            console.log("userCount model Error ! : " + error);
        }
    }
        
    // 마트업체 조회
    static async getMartList(data) {
        try {
            const [rows, fields] = await pool.query(`select SEQ, LOGINID, PWD, USERTYPE, ACTIVE, CREATED, MODIFIED from USERS where USER_TYPE = M`, []);
            return rows;
        } catch (error) {
            console.log("getMartList model Error ! : " + error);
        }
    }
    // 구직자 조회
    static async getUserList(data) {
        try {
            const [rows, fields] = await pool.query(`select * from USERS where USER_TYPE = U`, []);
            return rows;
        } catch (error) {
            console.log("getUserList model Error ! : " + error);
        }
    }
    // 관리자 조회
    static async getAdminList(data) {
        try {
            const [rows, fields] = await pool.query(`select * from USERS where USER_TYPE = A`, []);
            return rows;
        } catch (error) {
            console.log("getAdminList model Error ! : " + error);
        }
    }
};
