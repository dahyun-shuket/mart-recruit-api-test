const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class resumeModel {
    static async create(userSeq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrierSeq, 
        technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO RESUME (
                    USER_SEQ, SUBJECT, PHOTO, NAME, CONTACT, EMAIL, POSTCODE, ADDRESS, ADDRESSEXTRA, EDUCATION, EDUCATIONSCHOOL, CARRIER_SEQ, 
                    TECHNICAL, LICENSE, ISWELFARE, ISMILITALY, CAREERCERTIFICATE, INTRODUCE, WORKINGTYPE_SEQS, WORKINGTYPE_NAMES, SALARY, CERTIFICATE, CERTIFICATEDATE, ACTIVE, CREATED, MODIFIED
                ) VALUES ( 
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'N', NULL, 'A', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
                )`, 
                [
                    userSeq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrierSeq, 
                    technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary, certificate
                ]);
            return rows.insertId;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.create: ${error}`);           
            return null;
        }
    }
    // 업데이트하면 인증은 무조건 해제
    static async update(seq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrierSeq, 
        technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary) {
        try 
        {
            await pool.query(`UPDATE RESUME SET 
                    SUBJECT=?, PHOTO=?, NAME=?, CONTACT=?, EMAIL=?, POSTCODE=?, ADDRESS=?, ADDRESSEXTRA=?, EDUCATION=?, EDUCATIONSCHOOL=?, CARRER_SEQ=?, 
                    TECHNICAL=?, LICENSE=?, ISWELFARE=?, ISMILITALY=?, CAREERCERTIFICATE=?, INTRODUCE=?, WORKINGTYPE_SEQS=?, WORKINGTYPE_NAMES=?, SALARY=?, CERTIFICATE='N', CERTIFICATEDATE=NULL, MODIFIED=CURRENT_TIMESTAMP()
                WHERE 
                    SEQ=?`, 
                [
                    subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrierSeq, 
                    technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary,  
                    seq
                ]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.update: ${error}`);           
            return null;
        }
    }
    static async remove(seq) {
        try 
        {
            await pool.query(`UPDATE RESUME SET ACTIVE='N' WHERE SEQ=?`, [seq]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.remove: ${error}`);           
            return null;
        }
    }
    static async certificate(seq, toggleValue) {
        try 
        {
            await pool.query(`UPDATE RESUME SET CERTIFICATE=?, CERTIFICATEDATE=CURRENT_TIMESTAMP() WHERE SEQ=?`, [toggleValue, seq]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.certificate: ${error}`);           
            return null;
        }
    }
    static async get(seq) {
        try 
        {
            //순번에 따라서 리스팅
            const [rows, fields] = await pool.query(`SELECT 
                    R.SEQ,
                    USER_SEQ, 
                    SUBJECT, 
                    PHOTO, 
                    R.NAME, 
                    CONTACT, 
                    EMAIL, 
                    POSTCODE, 
                    ADDRESS, 
                    ADDRESSEXTRA, 
                    EDUCATION, 
                    EDUCATIONSCHOOL, 
                    CARRIER_SEQ, 
                    C.NAME AS CARRER_NAME,
                    TECHNICAL, 
                    LICENSE, 
                    ISWELFARE, 
                    ISMILITALY, 
                    CAREERCERTIFICATE, 
                    INTRODUCE, 
                    WORKINGTYPE_SEQS, 
                    WORKINGTYPE_NAMES, 
                    SALARY, 
                    CERTIFICATE, 
                    CERTIFICATEDATE,
                    ACTIVE, 
                    CREATED, 
                    MODIFIED,
                    JOBKIND_SEQ,
                    JOBKIND_NAME,
                    WORKREGION_SEQ,
                    WORKREGION_NAME
                FROM
                    RESUME R
                    INNER JOIN CARRIER C ON C.SEQ = R.CARRIER_SEQ
                    INNER JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM RESUME_JOBKIND GROUP BY RESUME_SEQ
                    ) RK ON RK.RESUME_SEQ = R.SEQ   
                    INNER JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM RESUME_REGION GROUP BY RESUME_SEQ
                    ) RR ON RR.RESUME_SEQ = R.SEQ
                WHERE
                    R.SEQ=?`, [seq]);
            if (rows.length > 0) 
                return rows[0];
            else {
                logger.writeLog('error', `models/resumeModel.get: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.get: ${error}`);           
            return null;
        }
    }
    //이력서 목록
    //martSeq, regions, jobKinds 값이 하나도 없거나 서로 조합되어도 검색에 적용
    //regions 값이 문자열로 1,2,6 형태라고 정의
    //jobkinds 값이 문자열로 1,2 형태라고 정의
    static async list(userSeq, regions, jobKinds, waitCertificate, jobOPeningSeq, applyOnly, limit, offset) {
        try 
        {
            //쿼리
            const sql = `
                SELECT
                    R.*,
                    RK.JOBKIND_SEQ,
                    RK.JOBKIND_NAME,
                    RR.WORKREGION_SEQ,
                    RR.WORKREGION_NAME
                FROM (
                    SELECT 
                        DISTINCT
                        R.SEQ,
                        USER_SEQ, 
                        SUBJECT, 
                        PHOTO, 
                        R.NAME, 
                        CONTACT, 
                        EMAIL, 
                        POSTCODE, 
                        ADDRESS, 
                        ADDRESSEXTRA, 
                        EDUCATION, 
                        EDUCATIONSCHOOL, 
                        CARRIER_SEQ, 
                        C.NAME AS CARRER_NAME,
                        TECHNICAL, 
                        LICENSE, 
                        ISWELFARE, 
                        ISMILITALY, 
                        CAREERCERTIFICATE, 
                        INTRODUCE, 
                        WORKINGTYPE_SEQS, 
                        WORKINGTYPE_NAMES, 
                        SALARY, 
                        CERTIFICATE, 
                        CERTIFICATEDATE,
                        ACTIVE, 
                        CREATED, 
                        MODIFIED
                    FROM 
                        RESUME R
                        INNER JOIN CARRIER C ON C.SEQ = R.CARRIER_SEQ
                        LEFT JOIN RESUME_REGION RR ON RR.RESUME_SEQ = R.SEQ
                        LEFT JOIN RESUME_JOBKIND RK ON RK.RESUME_SEQ = R.SEQ
                    WHERE
                        1 = 1 
                        ${(jobOPeningSeq) ? 'AND R.SEQ IN (SELECT RESUME_SEQ FROM JOBOPENING_RESUME WHERE JOBOPENING_SEQ = ' + jobOPeningSeq + ')' : ''}
                        ${(waitCertificate == 'Y') ? `AND CERTIFICATE != 'Y' AND NOT CAREERCERTIFICATE IS NULL` : ''}
                        ${(userSeq) ? 'AND R.USER_SEQ=' + userSeq :''}
                        ${(regions) ? 'AND RR.WORKREGION_SEQ IN (' + regions + ')':''}
                        ${(jobKinds) ? 'AND RK.JOBKIND_SEQ IN (' + jobKinds + ')':''}
                    ) R
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM RESUME_JOBKIND GROUP BY RESUME_SEQ
                    ) RK ON RK.RESUME_SEQ = R.SEQ   
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM RESUME_REGION GROUP BY RESUME_SEQ
                    ) RR ON RR.RESUME_SEQ = R.SEQ  
                LIMIT ? OFFSET ?`;
            const [rows, fields] = await pool.query(sql, [limit, offset]);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/resumeModel.list: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.list: ${error}`);           
            return null;
        }
    }

    //jobkinds 값이 문자열로 1,2 형태라고 정의
    static async updateJobKind(resumeSeq, jobKinds) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction
            //먼저 싹 지운다
            await connection.query(`DELETE FROM RESUME_JOBKIND WHERE RESUME_SEQ=?`, [resumeSeq]);
            //새 레코드를 추가한다
            await connection.query(`
                INSERT INTO RESUME_JOBKIND (RESUME_SEQ, JOBKIND_SEQ, JOBKIND_NAME)
                SELECT ${resumeSeq}, SEQ, NAME FROM JOBKIND WHERE SEQ IN (${jobKinds})`);

            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/resumeModel.addJobKind: ${resumeSeq} 이력서에 ${jobKinds} 직종이 연결되었습니다.`);           

            return jobOpeningSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/resumeModel.addJobKind: ${error}`);           
            return null;
        }
    }
    
    //workingRegions 값이 문자열로 1,2 형태라고 정의
    static async updateWorkingRegion(resumeSeq, workingRegions) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction
            //먼저 싹 지운다
            await connection.query(`DELETE FROM RESUME_REGION WHERE JOBOPENING_SEQ=?`, [resumeSeq]);
            //새 레코드를 추가한다
            await connection.query(`
                INSERT INTO RESUME_REGION (JOBOPENING_SEQ, WORKREGION_SEQ, WORKREGION_NAME)
                SELECT ${resumeSeq}, SEQ, NAME FROM WORKREGION WHERE SEQ IN (${workingRegions})`);

            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/resumeModel.addWorkingRegion: ${resumeSeq} 이력서에 ${jobKinds} 지역이 연결되었습니다.`);           

            return jobOpeningSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/resumeModel.addWorkingRegion: ${error}`);           
            return null;
        }
    }

    static async addCarrier(resumeSeq, workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO RESUME_CARRIER (
                    RESUME_SEQ, WOKSTART, WORKEND, CARIEER, POSITION, JOBTYPE, WORKREGION, CHARGE, SALARY, CREATED, MODIFIED
                ) VALUES ( 
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
                )`, 
                [
                    resumeSeq, workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly
                ]);
            return rows.insertId;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.addCarrier: ${error}`);           
            return null;
        }
    }

    static async updateCarrier(seq, workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly) {
        try 
        {
            await pool.query(`UPDATE RESUME_CARRIER SET
                    WOKSTART=?, WORKEND=?, CARIEER=?, POSITION=?, JOBTYPE=?, WORKREGION=?, CHARGE=?, SALARY=?, MODIFIED=CURRENT_TIMESTAMP()
                WHERE SEQ=?
                `, 
                [
                    workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly, seq
                ]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.addCarrier: ${error}`);           
            return null;
        }
    }
    static async removeCarrier(seq) {
        try 
        {
            await pool.query(`DELETE FROM RESUME_CARRIER WHERE SEQ=?`, [seq]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.removeCarrier: ${error}`);           
            return null;
        }
    }
    static async getCarrier(seq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT 
                    SEQ, RESUME_SEQ, WOKSTART, WORKEND, CARIEER, POSITION, JOBTYPE, WORKREGION, CHARGE, SALARY, CREATED, MODIFIED
                FROM 
                    RESUME_CARRIER 
                WHERE 
                    SEQ=?`, [seq]);
            
            if (rows.length > 0) 
                return rows[0];
            else {
                logger.writeLog('error', `models/resumeModel.getCarrier: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.getCarrier: ${error}`);           
            return null;
        }
    }
    static async listCarrier(resumeSeq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT 
                    SEQ, RESUME_SEQ, WOKSTART, WORKEND, CARIEER, POSITION, JOBTYPE, WORKREGION, CHARGE, SALARY, CREATED, MODIFIED
                FROM 
                    RESUME_CARRIER 
                WHERE 
                    RESUME_SEQ=?
                ORDER BY
                    WOKSTART DESC`, [resumeSeq]);
            
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/resumeModel.listCarrier: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.listCarrier: ${error}`);           
            return null;
        }
    }
};

