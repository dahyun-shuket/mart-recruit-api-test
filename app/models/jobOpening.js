const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class jobOpeningModel {
    static async create(martSeq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingTypeSeqs, workingTypeNames, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO JOBOPENING (
                MART_SEQ, SUBJECT, HRONAME, HROCONTACT, JOBKIND_SEQ, CARRIER_SEQ, EXPYEAR, CHARGE, JOBRANK, PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY,
                WORKINGTYPE_SEQS, WORKINGTYPE_NAMESS, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, WORKREGION_SEQ, GENDER, AGE, STARTDATE, ENDATE, HIRINGSTEP, REQUIREDOCS, ACTIVE, CREATED, MODIFIED
                ) VALUES 
                ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'A', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`, 
                [
                    martSeq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingTypeSeqs, workingTypeNames, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs
                ]);
            return rows.insertId;
        } catch (error) {
            logger.writeLog('error', `models/jobOpeningModel.create: ${error}`);           
            return null;
        }
    }

    static async update(seq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingTypeSeqs, workingTypeNames, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        try 
        {
            await pool.query(`UPDATE JOBOPENING SET 
                    SUBJECT=?, HRONAME=?, HROCONTACT=?, JOBKIND_SEQ=?, CARRIER_SEQ=?, EXPYEAR=?, CHARGE=?, JOBRANK=?, PREFERENTIAL=?, EDUCATION=?, SALARYTYPE=?, SALARY=?,
                    WORKINGTYPE_SEQS=?, WORKINGTYPE_NAMES=?, PROBATIONTERM=?, WORKSHIFT=?, WORKSHIFTTIME=?, WORKREGION_SEQ=?, GENDER=?, AGE=?, STARTDATE=?, ENDATE=?, HIRINGSTEP=?, REQUIREDOCS=?, MODIFIED=CURRENT_TIMESTAMP()
                WHERE 
                    SEQ=?`, 
                [
                    subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingTypeSeqs, workingTypeNames, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs, 
                    seq
                ]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/jobOpeningModel.update: ${error}`);           
            return null;
        }
    }

    static async remove(seq) {
        try 
        {
            await pool.query(`UPDATE JOBOPENING SET ACTIVE='N' WHERE SEQ=?`, [seq]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/jobOpeningModel.remove: ${error}`);           
            return null;
        }
    }

    static async get(seq) {
        try 
        {
            //순번에 따라서 리스팅
            const [rows, fields] = await pool.query(`SELECT 
                    JO.SEQ, 
                    MART_SEQ,     
                    SUBJECT, 
                    HRONAME, 
                    HROCONTACT, 
                    JOBKIND_SEQ,
                    JOBKIND_NAME,
                    CARRIER_SEQ, 
                    CR.NAME AS CARRIER_NAME, 
                    EXPYEAR, 
                    CHARGE, 
                    JOBRANK, 
                    PREFERENTIAL, 
                    EDUCATION, 
                    SALARYTYPE, 
                    SALARY,
                    WORKINGTYPE_SEQS, 
                    WORKINGTYPE_NAMES, 
                    WT.NAME AS WORKINGTYPE_NAME,
                    PROBATIONTERM, 
                    WORKSHIFT, 
                    WORKSHIFTTIME, 
                    GENDER, 
                    AGE, 
                    STARTDATE, 
                    ENDATE, 
                    HIRINGSTEP, 
                    REQUIREDOCS, 
                    WORKREGION_SEQ,
                    WORKREGION_NAME,
                    ACTIVE, 
                    CREATED, 
                    MODIFIED
                FROM 
                    MART_RECRUIT.JOBOPENING JO
                    INNER JOIN MART_RECRUIT.CARRIER CR ON CR.SEQ = JO.CARRIER_SEQ
                    INNER JOIN MART_RECRUIT.WORKINGTYPE WT ON WT.SEQ = JO.WORKINGTYPE_SEQ
                    INNER JOIN (
                        SELECT JOBOPENING_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM JOBOPENING_JOBKIND GROUP BY JOBOPENING_SEQ
                    ) JOK ON JOK.JOBOPENING_SEQ = JO.SEQ                    
                    INNER JOIN (
                        SELECT JOBOPENING_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM JOBOPENING_REGION GROUP BY JOBOPENING_SEQ
                    ) JOR ON JOR.JOBOPENING_SEQ = JO.SEQ
                WHERE
                    JO.SEQ = ?`, [seq]);
            if (rows.length > 0) 
                return rows[0];
            else {
                logger.writeLog('error', `models/jobOpeningModel.get: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/jobOpeningModel.get: ${error}`);           
            return null;
        }
    }

    //구인 공고 목록
    //martSeq, regions, jobKinds 값이 하나도 없거나 서로 조합되어도 검색에 적용
    //regions 값이 문자열로 1,2,6 형태라고 정의
    //jobkinds 값이 문자열로 1,2 형태라고 정의
    static async list(martSeq, regions, jobKinds, limit, offset) {
        try 
        {
            //쿼리
            const sql = `
                SELECT
                    JO.*,
                    JOK.JOBKIND_SEQ,
                    JOK.JOBKIND_NAME,
                    JOR.WORKREGION_SEQ,
                    JOR.WORKREGION_NAME
                FROM (
                    SELECT 
                        DISTINCT
                        JO.SEQ, 
                        MART_SEQ,     
                        SUBJECT, 
                        HRONAME, 
                        HROCONTACT, 
                        CARRIER_SEQ, 
                        CR.NAME AS CARRER_NAME, 
                        EXPYEAR, 
                        CHARGE, 
                        JOBRANK, 
                        PREFERENTIAL, 
                        EDUCATION, 
                        SALARYTYPE, 
                        SALARY,
                        WORKINGTYPE_SEQS, 
                        WORKINGTYPE_NAMES, 
                        WT.NAME AS WORKINGTYPE_NAME,
                        PROBATIONTERM, 
                        WORKSHIFT, 
                        WORKSHIFTTIME, 
                        GENDER, 
                        AGE, 
                        STARTDATE, 
                        ENDATE, 
                        HIRINGSTEP, 
                        REQUIREDOCS, 
                        ACTIVE, 
                        CREATED, 
                        MODIFIED
                    FROM 
                        MART_RECRUIT.JOBOPENING JO
                        INNER JOIN MART_RECRUIT.CARRIER CR ON CR.SEQ = JO.CARRIER_SEQ
                        INNER JOIN MART_RECRUIT.WORKINGTYPE WT ON WT.SEQ = JO.WORKINGTYPE_SEQ
                        INNER JOIN JOBOPENING_REGION JOR ON JOR.JOBOPENING_SEQ = JO.SEQ
                        INNER JOIN JOBOPENING_JOBKIND JOK ON JOK.JOBOPENING_SEQ = JO.SEQ
                    WHERE
                        1 = 1 
                        ${(martSeq) ? 'AND JO.MART_SEQ=' + martSeq :''}
                        ${(regions) ? 'AND JOR.WORKREGION_SEQ IN (' + regions + ')':''}
                        ${(jobKinds) ? 'AND JOK.JOBKIND_SEQ IN (' + jobKinds + ')':''}
                    ) JO
                    INNER JOIN (
                        SELECT JOBOPENING_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM JOBOPENING_REGION GROUP BY JOBOPENING_SEQ
                    ) JOR ON JOR.JOBOPENING_SEQ = JO.SEQ
                    INNER JOIN (
                        SELECT JOBOPENING_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM JOBOPENING_JOBKIND GROUP BY JOBOPENING_SEQ
                    ) JOK ON JOK.JOBOPENING_SEQ = JO.SEQ  
                LIMIT ? OFFSET ?`;
            const [rows, fields] = await pool.query(sql, [limit, offset]);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/jobOpeningModel.list: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/jobOpeningModel.list: ${error}`);           
            return null;
        }
    }

    //jobkinds 값이 문자열로 1,2 형태라고 정의
    static async updateJobKind(jobOpeningSeq, jobKinds) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction
            //먼저 싹 지운다
            await connection.query(`DELETE FROM JOBOPENING_JOBKIND WHERE JOBOPENING_SEQ=?`, [jobOpeningSeq]);
            //새 레코드를 추가한다
            await connection.query(`
                INSERT INTO JOBOPENING_JOBKIND (JOBOPENING_SEQ, JOBKIND_SEQ, JOBKIND_NAME)
                SELECT ${jobOpeningSeq}, SEQ, NAME FROM JOBKIND WHERE SEQ IN (${jobKinds})`);

            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/jobOpeningModel.addJobKind: ${jobOpeningSeq} 공고에 ${jobKinds} 직종이 연결되었습니다.`);           

            return jobOpeningSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/jobOpeningModel.addJobKind: ${error}`);           
            return null;
        }
    }
    
    //workingRegions 값이 문자열로 1,2 형태라고 정의
    static async updateWorkingRegion(jobOpeningSeq, workingRegions) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction
            //먼저 싹 지운다
            await connection.query(`DELETE FROM JOBOPENING_REGION WHERE JOBOPENING_SEQ=?`, [jobOpeningSeq]);
            //새 레코드를 추가한다
            await connection.query(`
                INSERT INTO JOBOPENING_REGION (JOBOPENING_SEQ, WORKREGION_SEQ, WORKREGION_NAME)
                SELECT ${jobOpeningSeq}, SEQ, NAME FROM WORKREGION WHERE SEQ IN (${workingRegions})`);

            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/jobOpeningModel.addWorkingRegion: ${jobOpeningSeq} 공고에 ${jobKinds} 지역이 연결되었습니다.`);           

            return jobOpeningSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/jobOpeningModel.addWorkingRegion: ${error}`);           
            return null;
        }
    }

    static async listResume(jobOpeningSeq, limit, offset) {
        try 
        {
            //쿼리
            const sql = `
                SELECT
                    JO.*,
                    JOK.JOBKIND_SEQ,
                    JOK.JOBKIND_NAME,
                    JOR.WORKREGION_SEQ,
                    JOR.WORKREGION_NAME
                FROM (
                    SELECT 
                        DISTINCT
                        JO.SEQ, 
                        MART_SEQ,     
                        SUBJECT, 
                        HRONAME, 
                        HROCONTACT, 
                        CARRIER_SEQ, 
                        CR.NAME AS CARRER_NAME, 
                        EXPYEAR, 
                        CHARGE, 
                        JOBRANK, 
                        PREFERENTIAL, 
                        EDUCATION, 
                        SALARYTYPE, 
                        SALARY,
                        WORKINGTYPE_SEQS, 
                        WORKINGTYPE_NAMES, 
                        WT.NAME AS WORKINGTYPE_NAME,
                        PROBATIONTERM, 
                        WORKSHIFT, 
                        WORKSHIFTTIME, 
                        GENDER, 
                        AGE, 
                        STARTDATE, 
                        ENDATE, 
                        HIRINGSTEP, 
                        REQUIREDOCS, 
                        ACTIVE, 
                        CREATED, 
                        MODIFIED
                    FROM 
                        MART_RECRUIT.JOBOPENING JO
                        INNER JOIN MART_RECRUIT.CARRIER CR ON CR.SEQ = JO.CARRIER_SEQ
                        INNER JOIN MART_RECRUIT.WORKINGTYPE WT ON WT.SEQ = JO.WORKINGTYPE_SEQ
                        INNER JOIN JOBOPENING_REGION JOR ON JOR.JOBOPENING_SEQ = JO.SEQ
                        INNER JOIN JOBOPENING_JOBKIND JOK ON JOK.JOBOPENING_SEQ = JO.SEQ
                    WHERE
                        1 = 1 
                        ${(martSeq) ? 'AND JO.MART_SEQ=' + martSeq :''}
                        ${(regions) ? 'AND JOR.WORKREGION_SEQ IN (' + regions + ')':''}
                        ${(jobKinds) ? 'AND JOK.JOBKIND_SEQ IN (' + jobKinds + ')':''}
                    ) JO
                    INNER JOIN (
                        SELECT JOBOPENING_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM JOBOPENING_REGION GROUP BY JOBOPENING_SEQ
                    ) JOR ON JOR.JOBOPENING_SEQ = JO.SEQ
                    INNER JOIN (
                        SELECT JOBOPENING_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM JOBOPENING_JOBKIND GROUP BY JOBOPENING_SEQ
                    ) JOK ON JOK.JOBOPENING_SEQ = JO.SEQ  
                LIMIT ? OFFSET ?`;
            const [rows, fields] = await pool.query(sql, [limit, offset]);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/jobOpeningModel.list: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/jobOpeningModel.list: ${error}`);           
            return null;
        }
    }

    //공고에 이력서 지원
    static async applyResume(jobOpeningSeq, resumeSeq, userSeq) {
        try 
        {
            await pool.query(`INSERT INTO JOBOPENING_RESUME (JOBOPENING_SEQ, RESUME_SEQ, USER_SEQ, APPLYDATE) VALUES (?, ?, ?, CURRENT_TIMESTAMP())`, [jobOpeningSeq, resumeSeq, userSeq]);
            logger.writeLog('info', `models/jobOpeningModel.applyResume: ${jobOpeningSeq} 공고에 사용자[${userSeq}]의 이력서[${resumeSeq}]로 지원되었습니다.`);           
            return jobOpeningSeq;
        } catch (error) {
            logger.writeLog('error', `models/jobOpeningModel.applyResume: ${error}`);           
            return null;
        }
    }

    //공고에 지원한 이력서 취소
    static async cancelApply(jobOpeningSeq, resumeSeq) {
        try 
        {
            await pool.query(`DELETE FROM JOBOPENING_RESUME WHERE JOBOPENING_SEQ=? AND RESUME_SEQ=?`, [jobOpeningSeq, resumeSeq]);
            logger.writeLog('info', `models/jobOpeningModel.applyResume: ${jobOpeningSeq} 공고에 이력서[${resumeSeq}]가 지원 취소되었습니다.`);           
            return jobOpeningSeq;
        } catch (error) {
            logger.writeLog('error', `models/jobOpeningModel.cancelApply: ${error}`);           
            return null;
        }
    }
    
};

