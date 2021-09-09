const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class workingTypeModel {
    static async create(workingType) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO WORKINGTYPE (NAME) VALUES (?)`, [workingType]);
            return rows.insertId;
        } catch (error) {
            logger.writeLog('error', `models/workingTypeModel.create: ${error}`);           
            return null;
        }
    }
    static async update(seq, workingType) {
        try 
        {
            await pool.query(`UPDATE WORKINGTYPE SET NAME=? WHERE SEQ=?`, [workingType, seq]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/workingTypeModel.update: ${error}`);           
            return null;
        }
    }
    static async remove(seq) {
        try 
        {
            //이미 사용 중인 곳이 있는지 확인한다
            const [rowsJobOpening, fieldsJobOpening] = await pool.query(`SELECT COUNT(SEQ) AS JOBOPENING_COUNT FROM JOBOPENING WHERE WORKINGTYPE_SEQ=?`, [seq]);
            const [rowsResume, fieldsResume] = await pool.query(`SELECT COUNT(SEQ) AS RESUME_COUNT FROM RESUME WHERE WORKINGTYPE_SEQ=?`, [seq]);

            if (rowsJobOpening[0].JOBOPENING_COUNT + rowsResume[0].RESUME_COUNT > 0) {
                //사용 중이면 -1 리턴
                return -1;
            } else {
                await pool.query(`DELETE FROM WORKINGTYPE WHERE SEQ=?`, [seq]);
            }
            //삭제되면 해당 코드를 다시 리턴
            return seq;
        } catch (error) {
            //에러면 0 리턴
            logger.writeLog('error', `models/workingTypeModel.remove: ${error}`);           
            return 0;
        }
    }
    static async list() {
        try 
        {
            //순번에 따라서 리스팅
            const [rows, fields] = await pool.query(`SELECT SEQ, NAME FROM WORKINGTYPE ORDER BY SEQ`);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/workingTypeModel.list: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/workingTypeModel.list: ${error}`);           
            return null;
        }
    }
};