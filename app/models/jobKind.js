const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class jobKindModel {
    static async create(jobKind) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO JOBKIND (JOBKIND) VALUES (?)`, [jobKind]);
            return rows.insertId;
        } catch (error) {
            logger.writeLog('error', `models/jobKindModel.create: ${error}`);           
            return null;
        }
    }
    static async update(seq, jobKind) {
        try 
        {
            await pool.query(`UPDATE JOBKIND SET JOBKIND=? WHERE SEQ=?`, [jobKind, seq]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/jobKindModel.update: ${error}`);           
            return null;
        }
    }
    static async remove(seq) {
        try 
        {
            //이미 사용 중인 곳이 있는지 확인한다
            const [rowsJobOpening, fieldsJobOpening] = await pool.query(`SELECT COUNT(SEQ) AS JOBOPENING_COUNT FROM JOBOPENING WHERE JOBKIND_SEQ=?`, [seq]);
            const [rowsResume, fieldsResume] = await pool.query(`SELECT COUNT(SEQ) AS RESUME_COUNT FROM RESUME WHERE JOBKIND_SEQ=?`, [seq]);

            if (rowsJobOpening[0].JOBOPENING_COUNT + rowsResume[0].RESUME_COUNT > 0) {
                //사용 중이면 -1 리턴
                return -1;
            } else {
                await pool.query(`DELETE FROM JOBKIND WHERE SEQ=?`, [seq]);
            }
            //삭제되면 해당 코드를 다시 리턴
            return seq;
        } catch (error) {
            //에러면 0 리턴
            logger.writeLog('error', `models/jobKindModel.delete: ${error}`);           
            return 0;
        }
    }
    static async list() {
        try 
        {
            //순번에 따라서 리스팅
            const [rows, fields] = await pool.query(`SELECT SEQ, JOBKIND FROM JOBKIND ORDER BY SEQ`);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/jobKindModel.list: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/jobKindModel.list: ${error}`);           
        }
    }
};