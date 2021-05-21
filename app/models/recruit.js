const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");

module.exports = class recruitModel {
    static async create(MART_SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
        PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
        GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction

            // RECRUIT를 저장
            const [rows, fields] = await connection.query(`INSERT INTO RECRUIT (
                MART_SEQ, SUBJECT, HRONAME, HROCONTACT, HROEMAIL, CAREER_SEQ, EXPYEAR, CHARGE, JOBRANK, PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY,
                PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, ACTIVE, CREATED, MODIFIED
                ) VALUES 
                ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Y', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP())`, 
                [
                    MART_SEQ, SUBJECT, HRONAME, HROCONTACT, HROEMAIL, CAREER_SEQ, 0, CHARGE, JOBRANK, PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY,
                    PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT
                ]);
            let recruitSeq = rows.insertId;

            // RECRUIT_JOBKIND를 저장
            await connection.query(`INSERT INTO RECRUIT_JOBKIND (RECRUIT_SEQ, JOBKIND_SEQ, JOBKIND_NAME) SELECT ?, SEQ, NAME FROM JOBKIND WHERE SEQ IN (${JOBKIND})`, [recruitSeq]);

            // RECRUIT_REGION을 저장
            await connection.query(`INSERT INTO RECRUIT_REGION (RECRUIT_SEQ, WORKREGION_SEQ, WORKREGION_NAME) SELECT ?, SEQ, NAME FROM WORKREGION WHERE SEQ IN (${WORKREGION})`, [recruitSeq]);

            // RECRUIT_WORKINGTYPE을 저장
            await connection.query(`INSERT INTO RECRUIT_WORKINGTYPE (RECRUIT_SEQ, WORKINGTYPE_SEQ, WORKINGTYPE_NAME) SELECT ?, SEQ, NAME FROM WORKINGTYPE WHERE SEQ IN (${WORKINGTYPE})`, [recruitSeq]);

            await connection.commit(); // commit
            connection.release();

            return recruitSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/recruitModel.create: ${error}`);           
            return null;
        }
    }

    static async update(SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
        PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
        GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION, ACTIVE) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction

            // RECRUIT 업데이트
            await connection.query(`UPDATE RECRUIT SET 
                SUBJECT=?, HRONAME=?, HROCONTACT=?, HROEMAIL=?, CAREER_SEQ=?, EXPYEAR=?, CHARGE=?, JOBRANK=?, PREFERENTIAL=?, EDUCATION=?, SALARYTYPE=?, SALARY=?,
                PROBATIONTERM=?, WORKSHIFT=?, WORKSHIFTTIME=?, GENDER=?, AGE=?, STARTDATE=?, ENDDATE=?, HIRINGSTEP=?, REQUIREDOCS=?, CONTENT=?, ACTIVE=?, MODIFIED=CURRENT_TIMESTAMP()
                WHERE SEQ=?`, 
                [
                    SUBJECT, HRONAME, HROCONTACT, HROEMAIL, CAREER_SEQ, 0, CHARGE, JOBRANK, PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY,
                    PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, ACTIVE,
                    SEQ
                ]);

            // RECRUIT_JOBKIND를 저장
            await connection.query(`DELETE FROM RECRUIT_JOBKIND WHERE RECRUIT_SEQ=?`, [SEQ]);
            await connection.query(`INSERT INTO RECRUIT_JOBKIND (RECRUIT_SEQ, JOBKIND_SEQ, JOBKIND_NAME) SELECT ?, SEQ, NAME FROM JOBKIND WHERE SEQ IN (${JOBKIND})`, [SEQ]);

            // RECRUIT_REGION을 저장
            await connection.query(`DELETE FROM RECRUIT_REGION WHERE RECRUIT_SEQ=?`, [SEQ]);
            await connection.query(`INSERT INTO RECRUIT_REGION (RECRUIT_SEQ, WORKREGION_SEQ, WORKREGION_NAME) SELECT ?, SEQ, NAME FROM WORKREGION WHERE SEQ IN (${WORKREGION})`, [SEQ]);

            // RECRUIT_WORKINGTYPE을 저장
            await connection.query(`DELETE FROM RECRUIT_WORKINGTYPE WHERE RECRUIT_SEQ=?`, [SEQ]);
            await connection.query(`INSERT INTO RECRUIT_WORKINGTYPE (RECRUIT_SEQ, WORKINGTYPE_SEQ, WORKINGTYPE_NAME) SELECT ?, SEQ, NAME FROM WORKINGTYPE WHERE SEQ IN (${WORKINGTYPE})`, [SEQ]);

            await connection.commit(); // commit
            connection.release();
    
            return SEQ;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/recruitModel.update: ${error}`);           
            return null;
        }
    }

    // ACTIVE
    // Y: 진행 중
    // N: 마감
    // W: 진행 대기
    // D: 삭제
    static async setActive(SEQ, ACTIVE) {
        try 
        {
            await pool.query(`UPDATE RECRUIT SET ACTIVE=? WHERE SEQ=?`, [ACTIVE, SEQ]);
            logger.writeLog('info', `models/recruitModel.setActive: ${SEQ} 공고의 상태가 ${ACTIVE}로 변경되었습니다`);           
            return SEQ;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.setActive: ${error}`);           
            return null;
        }
    }

    static async copy(recruitSeq) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction

            // RECRUIT 복사
            const [rows, fields] = await connection.query(`INSERT INTO RECRUIT (MART_SEQ, SUBJECT, HRONAME, HROCONTACT, HROEMAIL, CAREER_SEQ, EXPYEAR, CHARGE, JOBRANK, PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, GENDER, AGE, STARTDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, ACTIVE, CREATED, MODIFIED)
                SELECT MART_SEQ, CONCAT('[복사된 공고] ', SUBJECT), HRONAME, HROCONTACT, HROEMAIL, CAREER_SEQ, EXPYEAR, CHARGE, JOBRANK, PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, GENDER, AGE, STARTDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, 'W', current_timestamp(), current_timestamp()FROM RECRUIT 
                WHERE SEQ = ?`, 
                [recruitSeq]);
            let newRecruitSeq = rows.insertId;

            // RECRUIT_JOBKIND 복사
            await connection.query(`INSERT INTO RECRUIT_JOBKIND (RECRUIT_SEQ, JOBKIND_SEQ, JOBKIND_NAME)  
                SELECT ?, JOBKIND_SEQ, JOBKIND_NAME FROM RECRUIT_JOBKIND WHERE RECRUIT_SEQ = ?`, [newRecruitSeq, recruitSeq]);

            // RECRUIT_REGION 복사
            await connection.query(`INSERT INTO RECRUIT_REGION (RECRUIT_SEQ, WORKREGION_SEQ, WORKREGION_NAME)  
                SELECT ?, WORKREGION_SEQ, WORKREGION_NAME FROM RECRUIT_REGION WHERE RECRUIT_SEQ = ?`, [newRecruitSeq, recruitSeq]);

            // RECRUIT_WORKINGTYPE 복사
            await connection.query(`INSERT INTO RECRUIT_WORKINGTYPE (RECRUIT_SEQ, WORKINGTYPE_SEQ, WORKINGTYPE_NAME)  
            SELECT ?, WORKINGTYPE_SEQ, WORKINGTYPE_NAME FROM RECRUIT_WORKINGTYPE WHERE RECRUIT_SEQ = ?`, [newRecruitSeq, recruitSeq]);
            
            // await connection.rollback();    // rollback
            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/recruitModel.copy: ${recruitSeq}번 공고가 ${newRecruitSeq}번 공고로 복사되었습니다.`);           
            return newRecruitSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/recruitModel.copy: ${error}`);           
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
                        IFNULL(RECRUIT_RESUME_COUNT.COUNT, 0) AS APPLYCOUNT,
                        IFNULL(RECRUIT_RESUME_COUNT.VIEWCOUNT, 0) AS VIEWCOUNT                    
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
                            SELECT RECRUIT_SEQ, COUNT(SEQ) AS COUNT, SUM(CASE WHEN READING = 'Y' THEN 1 ELSE 0 END) AS VIEWCOUNT FROM RECRUIT_RESUME GROUP BY RECRUIT_SEQ
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
    static async totalCount(martSeq, active, name, subject, regions, jobKinds, workingTypes) {
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
                    MART.ACTIVE = 'Y'                     
                    ${(active) ? `AND RECRUIT.ACTIVE = '${active}'` : ''}
                    ${(martSeq) ? `AND RECRUIT.MART_SEQ=${martSeq}` :''}
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
    static async list(martSeq, active, name, subject, userSeq, userOwn, regions, jobKinds, workingTypes, scrapSeq, limit, offset) {
        try 
        {
            //쿼리
            const query = `
                SELECT
                    RECRUIT.*,
                    RECRUIT_JOBKIND.JOBKIND_SEQ,
                    RECRUIT_JOBKIND.JOBKIND_NAME,
                    RECRUIT_REGION.WORKREGION_SEQ,
                    RECRUIT_REGION.WORKREGION_NAME,
                    RECRUIT_WORKINGTYPE.WORKINGTYPE_SEQ,
                    RECRUIT_WORKINGTYPE.WORKINGTYPE_NAME,
                    IF(RECRUIT_RESUME.USER_SEQ IS NULL, 'N', 'Y') AS APPLY ,
                    IFNULL(RECRUIT_RESUME_COUNT.COUNT, 0) AS APPLYCOUNT,
                    IFNULL(RECRUIT_RESUME_COUNT.VIEWCOUNT, 0) AS VIEWCOUNT                    
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
                        MART.ACTIVE = 'Y' 
                        ${(active) ? `AND RECRUIT.ACTIVE = '${active}'` : ''}
                        ${(martSeq) ? `AND RECRUIT.MART_SEQ = ${martSeq}` :''}
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
                        SELECT RECRUIT_SEQ, COUNT(SEQ) AS COUNT, SUM(CASE WHEN READING = 'Y' THEN 1 ELSE 0 END) AS VIEWCOUNT FROM RECRUIT_RESUME GROUP BY RECRUIT_SEQ
                    ) RECRUIT_RESUME_COUNT ON RECRUIT_RESUME_COUNT.RECRUIT_SEQ = RECRUIT.SEQ                 
                    ${(scrapSeq) ? 'INNER JOIN RECRUIT_SCRAP ON RECRUIT_SCRAP.RECRUIT_SEQ = RECRUIT.SEQ AND RECRUIT_SCRAP.USER_SEQ = ' + scrapSeq : ''}    
                ORDER BY
                    CREATED DESC, SEQ DESC
                LIMIT ? OFFSET ?`;
                const [rows, fields] = await pool.query(query, [limit, offset]);
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

    static async closeAfterDate() {
        try 
        {
            let today = new Date();  
            await pool.query(`UPDATE RECRUIT SET ACTIVE='N' WHERE ACTIVE='Y' AND ENDDATE < now();`);
            logger.writeLog('info', `models/recruitModel.closeAfterDate: ${today} 이전에 날짜가 종료된 공고를 모두 마감처리했습니다.`);           
            return 0;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.closeAfterDate: ${error}`);           
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
            const query = `
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
            const [rows, fields] = await pool.query(query, [limit, offset]);
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
    static async apply(recruitSeq, userSeq) {
        try 
        {
            await pool.query(`INSERT INTO RECRUIT_RESUME (RECRUIT_SEQ, RESUME_SEQ, USER_SEQ, APPLYDATE, READING, STEP) 
            VALUES (?, (SELECT SEQ FROM RESUME WHERE USER_SEQ = ?), ?, CURRENT_TIMESTAMP(), 'N', 'D');`, [recruitSeq, userSeq, userSeq]);
            logger.writeLog('info', `models/recruitModel.applyResume: ${recruitSeq} 공고에 사용자[${userSeq}]가 지원하였습니다.`);           
            return recruitSeq;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.applyResume: ${error}`);           
            return null;
        }
    }

    //공고에 지원한 이력서 취소
    static async cancelApply(recruitSeq, userSeq) {
        try 
        {
            await pool.query(`DELETE FROM RECRUIT_RESUME WHERE RECRUIT_SEQ=? AND USER_SEQ=?`, [recruitSeq, userSeq]);
            logger.writeLog('info', `models/recruitModel.cancelApply: ${recruitSeq} 공고에 사용자[${userSeq}]가 지원 취소하였습니다.`);           
            return recruitSeq;
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.cancelApply: ${error}`);           
            return null;
        }
    }
    
    // 공고 지원 여부와 스크랩 여부. 0은 미지원, 스크랩 안함 1은 지원, 스크랩함
    static async getUserStatus(recruitSeq, userSeq) {
        try 
        {
            //순번에 따라서 리스팅
            const query = `
            SELECT
                USERS.USER_SEQ,
                APPLY.ISAPPLY,
                APPLY.APPLYDATE,
                SCRAP.ISSCRAP
            FROM 
                (SELECT '${userSeq}' AS USER_SEQ) USERS
                LEFT JOIN 
                (SELECT '${userSeq}' AS USER_SEQ, RECRUIT_RESUME.SEQ AS ISAPPLY, RECRUIT_RESUME.APPLYDATE FROM RECRUIT_RESUME WHERE USER_SEQ = ? AND RECRUIT_SEQ = ?) 
                APPLY ON APPLY.USER_SEQ = USERS.USER_SEQ 
                LEFT JOIN 
                (SELECT '${userSeq}' AS USER_SEQ, RECRUIT_SCRAP.SEQ AS ISSCRAP FROM RECRUIT_SCRAP WHERE USER_SEQ = ? AND RECRUIT_SEQ = ?) 
                SCRAP ON SCRAP.USER_SEQ = USERS.USER_SEQ`;
            const [rows, fields] = await pool.query(query, userSeq, recruitSeq, userSeq, recruitSeq);

            return rows[0];
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.getUserStatus: ${error}`);           
            return 0;
        }
    }

    // 마트의 진행 공고와 종료 공고의 숫자를 리턴
    static async getActiveCount(martSeq) {
        try 
        {
            //순번에 따라서 리스팅
            const query = `
            SELECT
                MART_SEQ,
                SUM(CASE WHEN ACTIVE = 'Y' THEN 1 ELSE 0 END) AS ACTIVE,
                SUM(CASE WHEN ACTIVE = 'N' THEN 1 ELSE 0 END) AS INACTIVE,
                SUM(CASE WHEN ACTIVE = 'W' THEN 1 ELSE 0 END) AS WAIT,
                SUM(CASE WHEN ACTIVE = 'D' THEN 1 ELSE 0 END) AS DELETED
            FROM
                RECRUIT
            WHERE
                MART_SEQ = ?`;
            const [rows, fields] = await pool.query(query, martSeq);

            if (rows.length > 0) {
                return rows[0];
            } else {
                logger.writeLog('error', `models/recruitModel.getCountStatus: No data found`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.getCountStatus: ${error}`);           
            return null;
        }
    }

    // 마트의 진행 공고에 지원한 사람의 통계 숫자를 리턴
    static async getResumeCount(seq) {
        try 
        {
            //순번에 따라서 리스팅
            const query = `
            SELECT
                RECRUIT_SEQ,
                SUM(CASE WHEN STEP = 'D' THEN 1 ELSE 0 END) AS DOCUMENT,
                SUM(CASE WHEN STEP = 'I' THEN 1 ELSE 0 END) AS INTERVIEW,
                SUM(CASE WHEN STEP = 'P' THEN 1 ELSE 0 END) AS PASS,
                SUM(CASE WHEN STEP = 'F' THEN 1 ELSE 0 END) AS FAILURE
            FROM
                RECRUIT_RESUME
            WHERE
                RECRUIT_SEQ = ?`;
            const [rows, fields] = await pool.query(query, seq);

            if (rows.length > 0) {
                return rows[0];
            } else {
                logger.writeLog('error', `models/recruitModel.getActiveCount: No data found`);
                return null;
            }
        } catch (error) {
            logger.writeLog('error', `models/recruitModel.getActiveCount: ${error}`);           
            return null;
        }
    }
};

