const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class analyticsModel {
    static async getDashboard() {
        try 
        {
            const [rows, fields] = await pool.query(`
            SELECT
                    MartAnalytics.Dashboard,
                    MartCount,
                    RecruitCount,
                    ResumeCount,
                    ResumeCertCount
                FROM
                    (SELECT 0 AS DashBoard, COUNT(SEQ) AS MartCount FROM MART WHERE ACTIVE = 'Y') 
                    MartAnalytics 
                    INNER JOIN (SELECT 0 AS DashBoard, COUNT(SEQ) AS RecruitCount FROM RECRUIT WHERE ACTIVE = 'Y') 
                    RecruitAnalytics ON RecruitAnalytics.DashBoard = MartAnalytics.DashBoard
                    INNER JOIN (SELECT 0 AS DashBoard, COUNT(SEQ) AS ResumeCount FROM RESUME WHERE ACTIVE = 'Y') 
                    ResumeAnalytics ON ResumeAnalytics.DashBoard = MartAnalytics.DashBoard
                    INNER JOIN (SELECT 0 AS DashBoard, COUNT(SEQ) AS ResumeCertCount FROM RESUME WHERE CERTIFICATE='Y' AND ACTIVE = 'Y') 
                    ResumeCertAnalytics ON ResumeCertAnalytics.DashBoard = MartAnalytics.DashBoard`, 
                []);
            return rows;
        } catch (error) {
            logger.writeLog('error', `models/analyticsModel.getDashboard: ${error}`);           
            return null;
        }
    }

};