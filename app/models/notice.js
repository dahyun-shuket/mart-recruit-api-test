const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class notice {

    //공지사항 리스트
    /*static async listId(seq, limit, offset) {
        try 
        {
            var query = `SELECT SEQ, SUBJECT, CONTENT, USER_SEQ, CREATED, MODIFIED, ACTIVE FROM NOTICEBOARD WHERE ACTIVE='Y' ORDER BY SEQ DESC LIMIT ? OFFSET ?`;
            const [rows, fields] = await pool.query( query, [limit, offset], seq);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/noticeModel.list: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/noticeModel.list: ${error}`);           
            return null;
        }
    }*/
    // join 리스트 갖고오기
    static async listId(limit, offset) {
        try 
        {
            const query = `SELECT 
            NB.SEQ, NB.SUBJECT, NB.CONTENT, NB.CREATED, NB.MODIFIED, NB.USER_SEQ,
            UR.LOGINID
            FROM NOTICEBOARD AS NB
            JOIN USERS AS UR ON NB.USER_SEQ = UR.SEQ
            WHERE NB.ACTIVE = 'Y'
            ORDER BY NB.SEQ DESC LIMIT ? OFFSET ?`;
            const [rows, fields] = await pool.query( query, [limit, offset]);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/noticeModel.list: No data found`);           
                
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/noticeModel.list: ${error}`);           
            return null;
        }
    }

    
    // 공지사항 totalcount
    static async totalCount() {
        try 
        {
            var query = `SELECT COUNT(SEQ) AS TOTALCOUNT FROM NOTICEBOARD WHERE ACTIVE='Y'`;
            const [rows, fields] = await pool.query(query);
            logger.writeLog('error', `models/noticeModel.totalCount 요기: ${rows}`);   
            return rows[0].TOTALCOUNT;

        } catch (error) {
            logger.writeLog('error', `models/noticeModel.totalCount : ${error}`);           
            return 0;
        }
    }

    // noticeViews 보기 데이터
    static async views(seq) {
        try {
            const[rows, fileds] = await pool.query(`SELECT SUBJECT, CONTENT, USER_SEQ, CREATED
             FROM NOTICEBOARD WHERE SEQ=?`, 
            [seq]);
            return rows[0];
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/Views:  + ${error}`);
            return null;
        }
    }

    // nitceboard 생성 데이터
    static async create(userSeq, subject, content) {
        try {
            
            const [rows, fileds] = await pool.query(`INSERT INTO NOTICEBOARD (USER_SEQ, SUBJECT, CONTENT, ACTIVE, CREATED, MODIFIED) VALUES (?,?,?,'Y', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`, 
            [
                userSeq, subject, content
            ]); 
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/create:  + ${error}`);
            return null;
        };

    }

    // noticeboard 삭제 데이터
    static async remove(seq) {
        try {
            const [rows, fileds] = await pool.query(`UPDATE NOTICEBOARD SET MODIFIED=NOW(), ACTIVE='N' WHERE SEQ=?`, [seq]); 
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/delete:  + ${error}`);
            return null;
        };

    }

    // noticeboard 수정 데이터
    static async update(seq, userSeq, subject, content) {
        try {
            const [rows, fileds] = await pool.query(`UPDATE NOTICEBOARD SET SUBJECT=?, CONTENT=?, USER_SEQ=?, MODIFIED=NOW() WHERE SEQ=?`, 
            [subject, content, userSeq, seq]);
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/edit:  + ${error}`);
            
        };

    }
    // 공지사항 GET
    static async get(seq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT SEQ, SUBJECT, CONTENT, USER_SEQ, CREATED, MODIFIED, ACTIVE FROM NOTICEBOARD WHERE SEQ=?`, [seq]);
            if (rows.length > 0) 
                return rows[0];
            else {
                logger.writeLog('error', `models/noticeModel.get: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/noticeModel.get: ${error}`);           
            return null;
        }
    }
    
    

}

