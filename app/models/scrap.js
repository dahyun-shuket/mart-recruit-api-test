const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class scrapModel {
    static async create(userSeq, recruitSeq) {
        const connection = await pool.getConnection(async conn => conn); 
        try 
        {
            await connection.beginTransaction();    // transaction

            await connection.query(`DELETE FROM RECRUIT_SCRAP WHERE USER_SEQ=? AND RECRUIT_SEQ=?`, [userSeq, recruitSeq]);
            const [rows, fields] = await connection.query(`INSERT INTO RECRUIT_SCRAP (USER_SEQ, RECRUIT_SEQ, CREATED) VALUES ( ?, ?, CURRENT_TIMESTAMP())`, [userSeq, recruitSeq]);
            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/scrapModel.create: ${userSeq} 유저가 ${recruitSeq}번 공고를 스크랩했습니다.`);           
                return rows.insertId;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/scrapModel.create: ${error}`);           
            return null;
        }
    }
    static async remove(userSeq, recruitSeq) {
        try 
        {
            await pool.query(`DELETE FROM RECRUIT_SCRAP WHERE USER_SEQ=? AND RECRUIT_SEQ=?`, [userSeq, recruitSeq]);
            return recruitSeq;
        } catch (error) {
            logger.writeLog('error', `models/scrapModel.remove: ${error}`);           
            return null;
        }
    }
    static async removeSeq(seq) {
        try 
        {
            await pool.query(`DELETE FROM RECRUIT_SCRAP SEQ=?`, [seq]);
            return recruitSeq;
        } catch (error) {
            logger.writeLog('error', `models/scrapModel.removeSeq: ${error}`);           
            return null;
        }
    }
};