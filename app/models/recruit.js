const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class recruitModel {
    static async create(martSeq, subject, HRONname, HROContact, jobKindSeq, careerSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingTypeSeqs, workingTypeNames, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO RECRUIT (
                MART_SEQ, SUBJECT, HRONAME, HROCONTACT, JOBKIND_SEQ, CAREER_SEQ, EXPYEAR, CHARGE, JOBRANK, PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY,
                WORKINGTYPE_SEQS, WORKINGTYPE_NAMESS, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, WORKREGION_SEQ, GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, ACTIVE, CREATED, MODIFIED
                ) VALUES 
                ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'A', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`, 
                [
                    martSeq, subject, HRONname, HROContact, jobKindSeq, careerSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingTypeSeqs, workingTypeNames, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs
                ]);
            return rows.insertId;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.create: ${error}`);           
            return null;
        }
    }

    static async update(seq, subject, HRONname, HROContact, jobKindSeq, careerSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingTypeSeqs, workingTypeNames, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        try 
        {
            await pool.query(`UPDATE RECRUIT SET 
                    SUBJECT=?, HRONAME=?, HROCONTACT=?, JOBKIND_SEQ=?, CAREER_SEQ=?, EXPYEAR=?, CHARGE=?, JOBRANK=?, PREFERENTIAL=?, EDUCATION=?, SALARYTYPE=?, SALARY=?,
                    WORKINGTYPE_SEQS=?, WORKINGTYPE_NAMES=?, PROBATIONTERM=?, WORKSHIFT=?, WORKSHIFTTIME=?, WORKREGION_SEQ=?, GENDER=?, AGE=?, STARTDATE=?, ENDDATE=?, HIRINGSTEP=?, REQUIREDOCS=?, MODIFIED=CURRENT_TIMESTAMP()
                WHERE 
                    SEQ=?`, 
                [
                    subject, HRONname, HROContact, jobKindSeq, careerSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingTypeSeqs, workingTypeNames, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs, 
                    seq
                ]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.update: ${error}`);           
            return null;
        }
    }

    static async remove(seq) {
        try 
        {
            await pool.query(`UPDATE RECRUIT SET ACTIVE='N' WHERE SEQ=?`, [seq]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.remove: ${error}`);           
            return null;
        }
    }

    static async get(seq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT 
                        RECRUIT.SEQ, 
                        MART_SEQ,     
                        MART.NAME,
                        MART.LOGOFILE,
                        MART.POSTCODE,
                        MART.ADDRESS,
                        MART.ADDRESSEXTRA,
                        MART.CONTACT,
                        SUBJECT, 
                        RECRUIT.HRONAME, 
                        RECRUIT.HROCONTACT, 
                        RECRUIT.HROEMAIL,
                        JOBKIND_SEQ,
                        JOBKIND_NAME,
                        CAREER_SEQ, 
                        CR.NAME AS CAREER_NAME, 
                        EXPYEAR, 
                        CHARGE, 
                        JOBRANK, 
                        PREFERENTIAL, 
                        EDUCATION, 
                        SALARYTYPE, 
                        SALARY,
                        WORKINGTYPE_SEQ, 
                        WORKINGTYPE_NAME, 
                        PROBATIONTERM, 
                        WORKSHIFT, 
                        WORKSHIFTTIME, 
                        GENDER, 
                        AGE, 
                        STARTDATE, 
                        ENDDATE, 
                        HIRINGSTEP, 
                        REQUIREDOCS, 
                        WORKREGION_SEQ,
                        WORKREGION_NAME,
                        CONTENT,
                        RECRUIT.ACTIVE, 
                        RECRUIT.CREATED, 
                        RECRUIT.MODIFIED,
                        IFNULL(RECRUIT_RESUME_COUNT.COUNT, 0) AS APPLYCOUNT
                    FROM 
                        RECRUIT 
                        INNER JOIN CAREER CR ON CR.SEQ = RECRUIT.CAREER_SEQ
                        INNER JOIN MART ON MART.SEQ = RECRUIT.MART_SEQ
                        INNER JOIN (
                            SELECT RECRUIT_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                            FROM RECRUIT_JOBKIND GROUP BY RECRUIT_SEQ
                        ) RJ ON RJ.RECRUIT_SEQ = RECRUIT.SEQ                    
                        INNER JOIN (
                            SELECT RECRUIT_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                            FROM RECRUIT_REGION GROUP BY RECRUIT_SEQ
                        ) RR ON RR.RECRUIT_SEQ = RECRUIT.SEQ
                        INNER JOIN (
                            SELECT RECRUIT_SEQ, GROUP_CONCAT(WORKINGTYPE_SEQ SEPARATOR ',') AS WORKINGTYPE_SEQ,  GROUP_CONCAT(WORKINGTYPE_NAME SEPARATOR ',') AS WORKINGTYPE_NAME
                            FROM RECRUIT_WORKINGTYPE GROUP BY RECRUIT_SEQ
                        ) RECRUIT_WORKINGTYPE ON RECRUIT_WORKINGTYPE.RECRUIT_SEQ = RECRUIT.SEQ  
						LEFT JOIN (
							SELECT RECRUIT_SEQ, COUNT(SEQ) AS COUNT FROM RECRUIT_RESUME GROUP BY RECRUIT_SEQ
						) RECRUIT_RESUME_COUNT ON RECRUIT_RESUME_COUNT.RECRUIT_SEQ = RECRUIT.SEQ                 
                    WHERE
                        RECRUIT.SEQ = ?`, [seq]);
            if (rows.length > 0) 
                return rows[0];
            else {
                logger.writeLog('error', `models/recruitModel.get: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.get: ${error}`);           
            return null;
        }
    }

    // 총 카운트 얻기
    // userSeq가 있는 경우 페이징을 하지 않으므로 제외
    static async totalCount(martSeq, name, subject, regions, jobKinds, workingTypes) {
        try 
        {
            //순번에 따라서 리스팅
            const query = `
            SELECT
                COUNT(SEQ) AS TOTALCOUNT
            FROM (
                SELECT 
                    DISTINCT
                    RECRUIT.SEQ            
                FROM 
                    RECRUIT
                    INNER JOIN CAREER ON CAREER.SEQ = RECRUIT.CAREER_SEQ
                    INNER JOIN MART ON MART.SEQ = RECRUIT.MART_SEQ
                    LEFT JOIN RECRUIT_REGION ON RECRUIT_REGION.RECRUIT_SEQ = RECRUIT.SEQ
                    LEFT JOIN RECRUIT_JOBKIND ON RECRUIT_JOBKIND.RECRUIT_SEQ = RECRUIT.SEQ
                    LEFT JOIN RECRUIT_WORKINGTYPE ON RECRUIT_WORKINGTYPE.RECRUIT_SEQ = RECRUIT.SEQ
                WHERE
                    MART.ACTIVE = 'Y' AND RECRUIT.ACTIVE = 'Y'                
                    ${(martSeq) ? 'AND RECRUIT.MART_SEQ=' + martSeq :''}
                    ${(regions) ? 'AND RECRUIT_REGION.WORKREGION_SEQ IN (' + regions + ')':''}
                    ${(jobKinds) ? 'AND RECRUIT_JOBKIND.JOBKIND_SEQ IN (' + jobKinds + ')':''}
                    ${(workingTypes) ? 'AND RECRUIT_WORKINGTYPE.WORKINGTYPE_SEQ IN (' + workingTypes + ')':''}
                    ${(name) ? `AND MART.NAME LIKE '%${name}%'`:''}
                    ${(subject) ? `AND RECRUIT.SUBJECT LIKE '%${subject}%'`:''}
            ) RECRUIT`;
            const [rows, fields] = await pool.query(query);

            return rows[0].TOTALCOUNT;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.totalCount: ${error}`);           
            return 0;
        }
    }
    // 구인 공고 목록
    // martSeq, userSeq, userOwn, regions, jobKinds 값이 하나도 없거나 서로 조합되어도 검색에 적용    
    // regions 값이 문자열로 1,2,6 형태라고 정의
    // jobkinds 값이 문자열로 1,2 형태라고 정의
    // martSeq 있으면 해당 마트의 구인 공고 리스트
    // name 있으면 검색된 마트의 구인 공고 리스트
    // userSeq 있고 userOwn=Y면 해당 유저의 지원 리스트
    // userSeq 있고 userOwn=N면 공고 목록에 해당 유저가 지원한 여부가 APPLY로 리턴
    // userSeq 없고 지원자가 있으면 APPLY가 Y
    // userSeq가 없으면 userOwn은 무조건 N 이어야 한다
    // scrapSeq는 스크랩한 사용자의 번호인데, 이 값이 있으면 다른 검색 조건을 모두 null과 최대치로 보내 줘야 한다
    static async list(martSeq, name, subject, userSeq, userOwn, regions, jobKinds, workingTypes, scrapSeq, limit, offset) {
        try 
        {
            //쿼리
            const sql = `
                SELECT
                    RECRUIT.*,
                    RECRUIT_JOBKIND.JOBKIND_SEQ,
                    RECRUIT_JOBKIND.JOBKIND_NAME,
                    RECRUIT_REGION.WORKREGION_SEQ,
                    RECRUIT_REGION.WORKREGION_NAME,
                    RECRUIT_WORKINGTYPE.WORKINGTYPE_SEQ,
                    RECRUIT_WORKINGTYPE.WORKINGTYPE_NAME,
                    IF(RECRUIT_RESUME.USER_SEQ IS NULL, 'N', 'Y') AS APPLY ,
                    IFNULL(RECRUIT_RESUME_COUNT.COUNT, 0) AS APPLYCOUNT
                FROM (
                    SELECT 
                        DISTINCT
                        RECRUIT.SEQ, 
                        MART_SEQ,     
                        MART.NAME,
                        MART.LOGOFILE,
                        MART.POSTCODE,
                        MART.ADDRESS,
                        MART.ADDRESSEXTRA,
                        SUBJECT, 
                        RECRUIT.HRONAME, 
                        RECRUIT.HROCONTACT, 
                        CAREER_SEQ, 
                        CAREER.NAME AS CAREER_NAME, 
                        EXPYEAR, 
                        CHARGE, 
                        JOBRANK, 
                        PREFERENTIAL, 
                        EDUCATION, 
                        SALARYTYPE, 
                        SALARY,
                        PROBATIONTERM, 
                        WORKSHIFT, 
                        WORKSHIFTTIME, 
                        GENDER, 
                        AGE, 
                        STARTDATE, 
                        ENDDATE, 
                        HIRINGSTEP, 
                        REQUIREDOCS, 
                        RECRUIT.ACTIVE, 
                        RECRUIT.CREATED, 
                        RECRUIT.MODIFIED
                    FROM 
                        RECRUIT
                        INNER JOIN CAREER ON CAREER.SEQ = RECRUIT.CAREER_SEQ
                        INNER JOIN MART ON MART.SEQ = RECRUIT.MART_SEQ
                        LEFT JOIN RECRUIT_REGION ON RECRUIT_REGION.RECRUIT_SEQ = RECRUIT.SEQ
                        LEFT JOIN RECRUIT_JOBKIND ON RECRUIT_JOBKIND.RECRUIT_SEQ = RECRUIT.SEQ
                        LEFT JOIN RECRUIT_WORKINGTYPE ON RECRUIT_WORKINGTYPE.RECRUIT_SEQ = RECRUIT.SEQ
                    WHERE
                        MART.ACTIVE = 'Y' AND RECRUIT.ACTIVE = 'Y'
                        ${(martSeq) ? 'AND RECRUIT.MART_SEQ=' + martSeq :''}                        
                        ${(regions) ? 'AND RECRUIT_REGION.WORKREGION_SEQ IN (' + regions + ')':''}
                        ${(jobKinds) ? 'AND RECRUIT_JOBKIND.JOBKIND_SEQ IN (' + jobKinds + ')':''}
                        ${(workingTypes) ? 'AND RECRUIT_WORKINGTYPE.WORKINGTYPE_SEQ IN (' + workingTypes + ')':''}
                        ${(name) ? `AND MART.NAME LIKE '%${name}%'`:''}
                        ${(subject) ? `AND RECRUIT.SUBJECT LIKE '%${subject}%'`:''}
                    ) RECRUIT
                    LEFT JOIN (
                        SELECT RECRUIT_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM RECRUIT_REGION GROUP BY RECRUIT_SEQ
                    ) RECRUIT_REGION ON RECRUIT_REGION.RECRUIT_SEQ = RECRUIT.SEQ
                    LEFT JOIN (
                        SELECT RECRUIT_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM RECRUIT_JOBKIND GROUP BY RECRUIT_SEQ
                    ) RECRUIT_JOBKIND ON RECRUIT_JOBKIND.RECRUIT_SEQ = RECRUIT.SEQ  
                    LEFT JOIN (
                        SELECT RECRUIT_SEQ, GROUP_CONCAT(WORKINGTYPE_SEQ SEPARATOR ',') AS WORKINGTYPE_SEQ,  GROUP_CONCAT(WORKINGTYPE_NAME SEPARATOR ',') AS WORKINGTYPE_NAME
                        FROM RECRUIT_WORKINGTYPE GROUP BY RECRUIT_SEQ
                    ) RECRUIT_WORKINGTYPE ON RECRUIT_WORKINGTYPE.RECRUIT_SEQ = RECRUIT.SEQ  
                    ${(userSeq && userOwn == 'Y') ? 'INNER' : 'LEFT'} JOIN (
                        SELECT RECRUIT_SEQ, GROUP_CONCAT(USER_SEQ SEPARATOR ',') AS USER_SEQ, COUNT(SEQ) AS COUNT
                        FROM RECRUIT_RESUME 
                        ${(userSeq) ? 'WHERE USER_SEQ = ' + userSeq : ''}
                        GROUP BY RECRUIT_SEQ
                    ) RECRUIT_RESUME ON RECRUIT_RESUME.RECRUIT_SEQ = RECRUIT.SEQ  
                    LEFT JOIN (
                        SELECT RECRUIT_SEQ, COUNT(SEQ) AS COUNT FROM RECRUIT_RESUME GROUP BY RECRUIT_SEQ
                    ) RECRUIT_RESUME_COUNT ON RECRUIT_RESUME_COUNT.RECRUIT_SEQ = RECRUIT.SEQ                 
                    ${(scrapSeq) ? 'INNER JOIN RECRUIT_SCRAP ON RECRUIT_SCRAP.RECRUIT_SEQ = RECRUIT.SEQ AND RECRUIT_SCRAP.USER_SEQ = ' + scrapSeq : ''}    
                ORDER BY
                    CREATED DESC, SEQ DESC
                LIMIT ? OFFSET ?`;
            const [rows, fields] = await pool.query(sql, [limit, offset]);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/recruitModel.list: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.list: ${error}`);           
            return null;
        }
    }

    //jobkinds 값이 문자열로 1,2 형태라고 정의
    static async updateJobKind(recruitSeq, jobKinds) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction
            //먼저 싹 지운다
            await connection.query(`DELETE FROM RECRUIT_JOBKIND WHERE RECRUIT_SEQ=?`, [recruitSeq]);
            //새 레코드를 추가한다
            await connection.query(`
                INSERT INTO RECRUIT_JOBKIND (RECRUIT_SEQ, JOBKIND_SEQ, JOBKIND_NAME)
                SELECT ${recruitSeq}, SEQ, NAME FROM JOBKIND WHERE SEQ IN (${jobKinds})`);

            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/recruitModel.addJobKind: ${recruitSeq} 공고에 ${jobKinds} 직종이 연결되었습니다.`);           

            return recruitSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/recruitModel.addJobKind: ${error}`);           
            return null;
        }
    }
    
    //workingRegions 값이 문자열로 1,2 형태라고 정의
    static async updateWorkingRegion(recruitSeq, workingRegions) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction
            //먼저 싹 지운다
            await connection.query(`DELETE FROM RECRUIT_REGION WHERE RECRUIT_SEQ=?`, [recruitSeq]);
            //새 레코드를 추가한다
            await connection.query(`
                INSERT INTO RECRUIT_REGION (RECRUIT_SEQ, WORKREGION_SEQ, WORKREGION_NAME)
                SELECT ${recruitSeq}, SEQ, NAME FROM WORKREGION WHERE SEQ IN (${workingRegions})`);

            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/recruitModel.addWorkingRegion: ${recruitSeq} 공고에 ${jobKinds} 지역이 연결되었습니다.`);           

            return recruitSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/recruitModel.addWorkingRegion: ${error}`);           
            return null;
        }
    }

    static async listResume(recruitSeq, limit, offset) {
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
                        RECRUIT.SEQ, 
                        MART_SEQ,     
                        SUBJECT, 
                        HRONAME, 
                        HROCONTACT, 
                        CAREER_SEQ, 
                        CAREER.NAME AS CAREER_NAME, 
                        EXPYEAR, 
                        CHARGE, 
                        JOBRANK, 
                        PREFERENTIAL, 
                        EDUCATION, 
                        SALARYTYPE, 
                        SALARY,
                        WORKINGTYPE_SEQS, 
                        WORKINGTYPE_NAMES, 
                        PROBATIONTERM, 
                        WORKSHIFT, 
                        WORKSHIFTTIME, 
                        GENDER, 
                        AGE, 
                        STARTDATE, 
                        ENDDATE, 
                        HIRINGSTEP, 
                        REQUIREDOCS, 
                        ACTIVE, 
                        CREATED, 
                        MODIFIED
                    FROM 
                        RECRUIT
                        INNER JOIN CAREER ON CAREER.SEQ = RECRUIT.CAREER_SEQ
                        INNER JOIN RECRUIT_REGION ON RECRUIT_REGION.RECRUIT_SEQ = RECRUIT.SEQ
                        INNER JOIN RECRUIT_JOBKIND ON RECRUIT_JOBKIND.RECRUIT_SEQ = RECRUIT.SEQ
                    WHERE
                        RECRUIT.ACTIVE = 'Y'
                        ${(recruitSeq) ? 'AND JO.SEQ=' + recruitSeq :''}
                        ${(regions) ? 'AND JOR.WORKREGION_SEQ IN (' + regions + ')':''}
                        ${(jobKinds) ? 'AND JOK.JOBKIND_SEQ IN (' + jobKinds + ')':''}
                    ) JO
                    INNER JOIN (
                        SELECT RECRUIT_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM RECRUIT_REGION GROUP BY RECRUIT_SEQ
                    ) JOR ON JOR.RECRUIT_SEQ = JO.SEQ
                    INNER JOIN (
                        SELECT RECRUIT_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM RECRUIT_JOBKIND GROUP BY RECRUIT_SEQ
                    ) JOK ON JOK.RECRUIT_SEQ = JO.SEQ  
                LIMIT ? OFFSET ?`;
            const [rows, fields] = await pool.query(sql, [limit, offset]);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/recruitModel.listResume: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.listResume: ${error}`);           
            return null;
        }
    }

    //공고에 이력서 지원
    static async applyResume(recruitSeq, resumeSeq, userSeq) {
        try 
        {
            await pool.query(`INSERT INTO RECRUIT_RESUME (RECRUIT_SEQ, RESUME_SEQ, USER_SEQ, APPLYDATE) VALUES (?, ?, ?, CURRENT_TIMESTAMP())`, [recruitSeq, resumeSeq, userSeq]);
            logger.writeLog('info', `models/recruitModel.applyResume: ${recruitSeq} 공고에 사용자[${userSeq}]의 이력서[${resumeSeq}]로 지원되었습니다.`);           
            return recruitSeq;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.applyResume: ${error}`);           
            return null;
        }
    }

    //공고에 지원한 이력서 취소
    static async cancelApply(recruitSeq, resumeSeq) {
        try 
        {
            await pool.query(`DELETE FROM RECRUIT_RESUME WHERE RECRUIT_SEQ=? AND RESUME_SEQ=?`, [recruitSeq, resumeSeq]);
            logger.writeLog('info', `models/recruitModel.applyResume: ${recruitSeq} 공고에 이력서[${resumeSeq}]가 지원 취소되었습니다.`);           
            return recruitSeq;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.cancelApply: ${error}`);           
            return null;
        }
    }
    
};

