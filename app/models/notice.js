const logger = require('../config/logger.js');
const pool = require("../../app/config/database_dev");

module.exports = class notice {

    // noticeboard 전체 데이터
    static async list() {
        try {
            
            const [rows, fileds] = await pool.query(`SELECT * FROM NOTICEBOARD LIMIT 0, 5`, []); 
            return rows;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/list:  + ${error}`);
            return null;
        };

    }
    // nitceboard 생성 데이터
    static async write(noticeboard) {
        try {
           
            const [rows, fileds] = await pool.query(`INSERT INTO NOTICEBOARD (SEQ) VALUES (?)`, [noticeboard]); 
            return rows.insertId;
        } catch(error) {
            logger.writeLog(`[ERROR] models/notice/write:  + ${error}`);
            return null;
        };

    }
    // noticeboard 삭제 데이터
    static async delete(SEQ) {
        try {
            
            const [rows, fileds] = await pool.query(`DELETE FROM NOTICEBOARD WHERE SEQ=?`, [SEQ]); 
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

