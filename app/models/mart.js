const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class martModel {
    static async create(user_Seq, name, logoFile, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO MART (
                    USER_SEQ, NAME, LOGOFILE, REGNO, POSTCODE, ADDRESS, ADDRESSEXTRA, CONTACT, HRONAME, HROCONTACT, HRORANK, ACTIVE, CREATED, MODIFIED
                ) VALUES 
                ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'A', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`, 
                [
                    user_Seq, name, logoFile, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank
                ]);
            return rows.insertId;
        } catch (error) {
            logger.writeLog('error', `models/martModel.create: ${error}`);           
            return null;
        }
    }
    static async update(seq, name, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank) {
        try 
        {
            await pool.query(`UPDATE MART SET 
                    NAME=?, REGNO=?, POSTCODE=?, ADDRESS=?, ADDRESSEXTRA=?, CONTACT=?, HRONAME=?, HROCONTACT=?, HRORANK=?, MODIFIED=CURRENT_TIMESTAMP()
                WHERE 
                    SEQ=?`, 
                [
                    name, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank, seq
                ]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/martModel.update: ${error}`);           
            return null;
        }
    }
    static async remove(seq) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction

            await pool.query(`UPDATE MART SET ACTIVE='N' WHERE SEQ=?`, [seq]);
            await connection.query(`UPDATE MART_RECRUIT.USERS SET ACTIVE='N' WHERE SEQ = (SELECT USER_SEQ FROM MART WHERE SEQ = ?);`, [seq]);

            await connection.commit(); // commit
            connection.release();

            logger.writeLog('info', `models/martModel.remove: ${seq} 마트가 불활성화되었습니다.`);           
            return seq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            //에러면 0 리턴
            logger.writeLog('error', `models/martModel.remove: ${error}`);           
            return 0;
        }
    }
    static async get(seq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT 
                    SEQ, USER_SEQ, NAME, LOGOFILE, REGNO, POSTCODE, ADDRESS, ADDRESSEXTRA, CONTACT, HRONAME, HROCONTACT, HRORANK, ACTIVE, CREATED, MODIFIED
                FROM 
                    MART 
                WHERE 
                    SEQ=?`, [seq]);
            if (rows.length > 0) 
                return rows[0];
            else {
                logger.writeLog('error', `models/martModel.get: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/martModel.get: ${error}`);           
            return null;
        }
    }
    static async totalCount(name) {
        try 
        {
            //순번에 따라서 리스팅
            const query = `SELECT COUNT(SEQ) AS TOTALCOUNT FROM MART WHERE ACTIVE='Y' ${(name && name != '') ? 'AND NAME LIKE \'%' + name + '%\'' : ''} `;
            const [rows, fields] = await pool.query(query);

            return rows[0].TOTALCOUNT;
        } catch (error) {
            logger.writeLog('error', `models/martModel.totalCount: ${error}`);           
            return 0;
        }
    }
    static async list(name, limit, offset) {
        try 
        {
            //순번에 따라서 리스팅
            const query = `SELECT 
                    SEQ, USER_SEQ, NAME, LOGOFILE, REGNO, POSTCODE, ADDRESS, ADDRESSEXTRA, CONTACT, HRONAME, HROCONTACT, HRORANK, ACTIVE, CREATED, MODIFIED
                FROM 
                    MART 
                WHERE 
                    ACTIVE='Y'
                    ${(name && name != '') ? 'AND NAME LIKE \'%' + name + '%\'' : ''}  
                ORDER BY 
                    NAME
                LIMIT ? OFFSET ?`;
                console.log(query);
            const [rows, fields] = await pool.query(query, [limit, offset]);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/martModel.list: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/martModel.list: ${error}`);           
            return null;
        }
    }
};