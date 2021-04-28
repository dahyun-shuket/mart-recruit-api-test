const logger = require('../config/logger.js');
const pool = require("../../app/config/database_dev");

module.exports = class notice {

    // noticeboard 전체 데이터
    static async list() {
        try {
            
            const [rows, fileds] = await pool.query(`SELECT SEQ, SUBJECT, CONTENT, USER_SEQ, CREATED, MODIFIED
             FROM NOTICEBOARD LIMIT 0, 5`, []); 
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/list:  + ${error}`);
            return null;
        };

    }
    // noticeViews 보기 데이터
    static async views(body) {
        try {
            const[rows, fileds] = await pool.query(`SELECT SUBJECT, CONTENT, USER_SEQ, CREATED
             FROM NOTICEBOARD WHERE SEQ=?`, 
            [body]);
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/Views:  + ${error}`);
            return null;
        }
    }

    // nitceboard 생성 데이터
    static async create(body) {
        try {
            console.log(body)
           console.log("크리에이트 모델 바디 : : :" + JSON.stringify(body));
            const [rows, fileds] = await pool.query(`INSERT INTO NOTICEBOARD (USER_SEQ, SUBJECT, CONTENT) VALUES (?,?,?)`, 
            [
                body.USER_SEQ,
                body.SUBJECT,
                body.CONTENT
            ]); 
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/create:  + ${error}`);
            return null;
        };

    }
    // noticeboard 삭제 데이터
    static async remove(body) {
        try {
            const [rows, fileds] = await pool.query(`DELETE FROM NOTICEBOARD WHERE SEQ=?`, [body]); 
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/delete:  + ${error}`);
            return null;
        };

    }

    // noticeboard 수정 데이터
    static async update(body) {
        try { 
            const [rows, fileds] = await pool.query(`UPDATE NOTICEBOARD SET SUBJECT=?, CONTENT=?, USER_SEQ=?, MODIFIED=? WHERE SEQ=?`, 
            [body.SUBJECT, body.CONTENT, body.USER_SEQ, body.MODIFIED, body.SEQ]);
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/edit:  + ${error}`);
            return null;
        };

    }



}

