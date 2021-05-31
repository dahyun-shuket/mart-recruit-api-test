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
    static async createTransaction(userId, password, userType, bizNo, active) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction
            const [rows, fields] = await connection.query(`insert into USERS(LOGINID, PWD, USERTYPE, ACTIVE) values(?,?,?,?)`, [userId, password, userType, active]);
            console.log(rows);
            if (userType =='M') {
                // 마트일때 마트를 생성해준다.
                const [rowsMart, fieldsMart] = await connection.query(`INSERT INTO MART (
                    USER_SEQ, REGNO, ACTIVE, CREATED, MODIFIED
                ) VALUES 
                ( ?,  ?, 'Y', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`, 
                [
                    rows.insertId, bizNo
                ]);

            }else if(userType =='U'){
                // 유저일때 비어있는 이력서를 만들어준다.
                const [rowsResume, fieldsResume] = await connection.query(`INSERT INTO RESUME (
                    USER_SEQ, CERTIFICATE, CERTIFICATEDATE, ACTIVE, CREATED, MODIFIED
                ) VALUES ( 
                    ?, 'N', NULL, 'Y', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
                )`, 
                [
                    rows.insertId
                ]);

            }else{
                // 어드민일땐 그냥 넘김.
            }
            await connection.commit(); // commit
            connection.release();

            return rows;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/userModel.createTransaction: ${error}`);           
            return null;
        }
    }
    // 유저 로그인
    static async login(userId) {
        try {
            const [rows, fields] = await pool.query(`SELECT SEQ, LOGINID, PWD, USERTYPE FROM USERS WHERE LOGINID = ? AND ACTIVE='Y'`, [userId]);
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
    // 유저 암호만 변경
    static async updatePassword(seq, password) {
        try {
            await pool.query(`UPDATE USERS SET PWD=? WHERE SEQ=?`, [password, seq]);
            logger.writeLog('info', `API - models/userModel.updatePassword: 사용자 ${seq}가 암호를 변경했습니다.`);           
            return seq;
        } catch (error) {
            logger.writeLog('error', `API - models/userModel.updatePassword: ${error}`);           
            return null;
        }
    }
    // 유저 삭제
    static async remove(seq) {
        try {
            console.log(seq);
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
            const [rows, fields] = await pool.query(`SELECT SEQ, LOGINID, PWD, USERTYPE, ACTIVE, CREATED, MODIFIED FROM USERS WHERE SEQ=?`, [seq]);

            if(rows.length > 0){
                return rows[0];
            } else {
                logger.writeLog('error', `API - models/userModel.get: No data found`);           
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `API - models/userModel.get: ${error}`);           
            return null;
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
};
