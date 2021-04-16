const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class sampleModel {
    static async get(data) {
        try 
        {
            const [rows, fields] = 
            await pool.query(`
                SELECT
                    a
                FROM 
                    b
                WHERE 
                    c = ?`, 
                [data]);
                if (rows.length > 0) 
                    return rows[0];
                else {
                    logger.writeLog('error', `models/sampleClass.get: data(${data}) - No data found`);           
                    return null;
                }                
        } catch (error) {
            console.log("[ERROR] models/sampleClass.get: " + error);
        }
    }
};

