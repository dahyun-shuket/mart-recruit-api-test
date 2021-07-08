const logger = require('../config/logger.js');
const pool = (process.env.NODE_ENV == "production") ? require("../config/database") : require("../config/database_dev");
const path = require('path');
module.exports = class resumeModel {
    static async create(userSeq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, careerSeq, 
        technical, license, isWelfare, isMilitaly, careerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO RESUME (
                    USER_SEQ, SUBJECT, PHOTO, NAME, CONTACT, EMAIL, POSTCODE, ADDRESS, ADDRESSEXTRA, EDUCATION, EDUCATIONSCHOOL, CAREER_SEQ, 
                    TECHNICAL, LICENSE, ISWELFARE, ISMILITALY, CAREERCERTIFICATE, INTRODUCE, WORKINGTYPE_SEQS, WORKINGTYPE_NAMES, SALARY, CERTIFICATE, CERTIFICATEDATE, VIEW, ACTIVE, CREATED, MODIFIED
                ) VALUES ( 
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'N', NULL, 0, 'Y', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
                )`, 
                [
                    userSeq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, careerSeq, 
                    technical, license, isWelfare, isMilitaly, careerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary, certificate
                ]);
            return rows.insertId;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.create: ${error}`);
            return null;
        }
    }
    // 업데이트하면 인증은 무조건 해제
    // 조건을 이력서 SEQ에서 USER_SEQ로 변경함, photo 제거 0517 김민규 
    // 이력서는 초기 생성떄 ACTIVE 가 N 상태이며 (데이터가 없는 상태에서 공고에 지원할 수있기떄문.)
    // 업데이트 과정을 거치게되면 ACTIVE가 Y로 변경된다.
    static async update(seq, subject, name, contact, birthyear, email, gender, postCode, address, addressExtra, education, educcationSchool, careerSeq, 
        technical, license, isWelfare, isMilitaly, introduce, workingTypeSeqs, workingTypeNames, salary) {
        try 
        {
            const [rows, fields] = await pool.query(`UPDATE RESUME SET 
                    SUBJECT=?, NAME=?, CONTACT=?, BIRTHYEAR=?, EMAIL=?, GENDER=?, POSTCODE=?, ADDRESS=?, ADDRESSEXTRA=?, EDUCATION=?, EDUCATIONSCHOOL=?, CAREER_SEQ=?, 
                    TECHNICAL=?, LICENSE=?, ISWELFARE=?, ISMILITALY=?, INTRODUCE=?, WORKINGTYPE_SEQS=?, WORKINGTYPE_NAMES=?, SALARY=?, CERTIFICATE='N', CERTIFICATEDATE=NULL, ACTIVE='Y', MODIFIED=CURRENT_TIMESTAMP()
                WHERE 
                    USER_SEQ=?`, 
                [
                    subject, name, contact, birthyear, email, gender, postCode, address, addressExtra, education, educcationSchool, careerSeq, 
                    technical, license, isWelfare, isMilitaly, introduce, workingTypeSeqs, workingTypeNames, salary,
                    seq
                ]);
            
            return rows;
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
    static increaseView(seq) {
        try 
        {
            pool.query(`UPDATE RESUME SET VIEW = VIEW + 1 WHERE SEQ=?`, [seq]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.increaseView: ${error}`);           
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
            const [rows, fields] = await pool.query(`SELECT 
                    R.SEQ,
                    USER_SEQ, 
                    SUBJECT, 
                    PHOTO, 
                    R.NAME, 
                    BIRTHYEAR,
                    GENDER, 
                    CONTACT, 
                    EMAIL, 
                    POSTCODE, 
                    ADDRESS, 
                    ADDRESSEXTRA, 
                    EDUCATION, 
                    EDUCATIONSCHOOL, 
                    CAREER_SEQ, 
                    C.NAME AS CAREER_NAME,
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
                    VIEW,
                    ACTIVE, 
                    CREATED, 
                    MODIFIED,
                    JOBKIND_SEQ,
                    JOBKIND_NAME,
                    WORKREGION_SEQ,
                    WORKREGION_NAME
                FROM
                    RESUME R
                    LEFT JOIN CAREER C ON C.SEQ = R.CAREER_SEQ
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM RESUME_JOBKIND GROUP BY RESUME_SEQ
                    ) RK ON RK.RESUME_SEQ = R.SEQ   
                    LEFT JOIN (
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
    // 유저의 SEQ를 가져와서 이력서 조회
    static async getByUserSeq(seq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT 
                    R.SEQ,
                    USER_SEQ, 
                    SUBJECT, 
                    PHOTO, 
                    R.NAME, 
                    BIRTHYEAR,
                    GENDER, 
                    CONTACT, 
                    EMAIL, 
                    POSTCODE, 
                    ADDRESS, 
                    ADDRESSEXTRA, 
                    EDUCATION, 
                    EDUCATIONSCHOOL, 
                    CAREER_SEQ, 
                    C.NAME AS CAREER_NAME,
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
                    VIEW,
                    ACTIVE, 
                    CREATED, 
                    MODIFIED,
                    JOBKIND_SEQ,
                    JOBKIND_NAME,
                    WORKREGION_SEQ,
                    WORKREGION_NAME
                FROM
                    RESUME R
                    LEFT JOIN CAREER C ON C.SEQ = R.CAREER_SEQ
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM RESUME_JOBKIND GROUP BY RESUME_SEQ
                    ) RK ON RK.RESUME_SEQ = R.SEQ   
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM RESUME_REGION GROUP BY RESUME_SEQ
                    ) RR ON RR.RESUME_SEQ = R.SEQ
                WHERE
                    R.USER_SEQ=?`, [seq]);
                
            if (rows.length > 0) {
                return rows[0];
            }else {
                logger.writeLog('error', `models/resumeModel.getByUserSeq: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.getByUserSeq: ${error}`);           
            return null;
        }
    }
    // 총 카운트 얻기
    // userSeq, recruitSeq 있는 경우 페이징을 하지 않으므로 제외
    static async totalCount(regions, jobKinds, name, certificate) {
        try 
        {
            //순번에 따라서 리스팅
            const query = `
                SELECT
                    COUNT(SEQ) AS TOTALCOUNT
                FROM (
                        SELECT 
                            DISTINCT
                            R.SEQ
                        FROM 
                            RESUME R
                            INNER JOIN CAREER C ON C.SEQ = R.CAREER_SEQ
                            LEFT JOIN RESUME_REGION RR ON RR.RESUME_SEQ = R.SEQ
                            LEFT JOIN RESUME_JOBKIND RK ON RK.RESUME_SEQ = R.SEQ
                        WHERE
                            R.ACTIVE = 'Y'
                            ${(certificate) ? `AND R.CERTIFICATE = '${certificate}'`:''}
                            ${(name) ? `AND R.NAME LIKE '%${name}%'`:''}
                            ${(regions) ? 'AND RR.WORKREGION_SEQ IN (' + regions + ')':''}
                            ${(jobKinds) ? 'AND RK.JOBKIND_SEQ IN (' + jobKinds + ')':''}
            )  RESUME`;
            const [rows, fields] = await pool.query(query);

            return rows[0].TOTALCOUNT;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.totalCount: ${error}`);           
            return 0;
        }
    }
    //이력서 목록
    //userSeq, regions, jobKinds 값이 하나도 없거나 서로 조합되어도 검색에 적용
    //regions 값이 문자열로 1,2,6 형태라고 정의
    //jobkinds 값이 문자열로 1,2 형태라고 정의
    static async list(userSeq, regions, jobKinds, name, certificate, recruitSeq, limit, offset) {
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
                        RESUME.SEQ,
                        RESUME.USER_SEQ, 
                        SUBJECT, 
                        PHOTO, 
                        RESUME.NAME,
                        BIRTHYEAR,
                        GENDER, 
                        CONTACT, 
                        EMAIL, 
                        POSTCODE, 
                        ADDRESS, 
                        ADDRESSEXTRA, 
                        EDUCATION, 
                        EDUCATIONSCHOOL, 
                        CAREER_SEQ, 
                        CAREER.NAME AS CAREER_NAME,
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
                        VIEW,
                        ACTIVE, 
                        CREATED, 
                        MODIFIED
                        ${(recruitSeq) ? ', APPLYDATE ' : ''}
                    FROM 
                        RESUME
                        INNER JOIN CAREER ON CAREER.SEQ = RESUME.CAREER_SEQ
                        LEFT JOIN RESUME_REGION ON RESUME_REGION.RESUME_SEQ = RESUME.SEQ
                        LEFT JOIN RESUME_JOBKIND ON RESUME_JOBKIND.RESUME_SEQ = RESUME.SEQ
                        ${(recruitSeq) ? 'INNER JOIN RECRUIT_RESUME ON RECRUIT_RESUME.RECRUIT_SEQ = ' + recruitSeq + ' AND RECRUIT_RESUME.RESUME_SEQ = RESUME.SEQ' : '' }
                    WHERE
                        RESUME.ACTIVE = 'Y'
                        ${(certificate == 'Y' || certificate == 'N') ? `AND RESUME.CERTIFICATE = '${certificate}'`:''}
                        ${(certificate == 'W') ? `AND RESUME.CERTIFICATE = 'N' AND NOT RESUME.CAREERCERTIFICATE IS null`:''}
                        ${(name) ? `AND RESUME.NAME LIKE '%${name}%'`:''}
                        ${(recruitSeq) ? 'AND RESUME.SEQ IN (SELECT RESUME_SEQ FROM RECRUIT_RESUME WHERE RECRUIT_SEQ = ' + recruitSeq + ')' : ''}
                        ${(userSeq) ? 'AND RESUME.USER_SEQ=' + userSeq :''}
                        ${(regions) ? 'AND RESUME_REGION.WORKREGION_SEQ IN (' + regions + ')':''}
                        ${(jobKinds) ? 'AND RESUME_JOBKIND.JOBKIND_SEQ IN (' + jobKinds + ')':''}
                    ) R
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM RESUME_JOBKIND GROUP BY RESUME_SEQ
                    ) RK ON RK.RESUME_SEQ = R.SEQ   
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM RESUME_REGION GROUP BY RESUME_SEQ
                    ) RR ON RR.RESUME_SEQ = R.SEQ 
                ORDER BY R.NAME, R.MODIFIED DESC
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

    static async totalCountForRecruit(recruitSeq, step) {
        try 
        {
            //쿼리
            const query = `
            SELECT                        
                COUNT(RESUME.SEQ) AS TOTALCOUNT
            FROM 
                RESUME
                INNER JOIN CAREER ON CAREER.SEQ = RESUME.CAREER_SEQ
                INNER JOIN RECRUIT_RESUME ON RECRUIT_RESUME.RESUME_SEQ = RESUME.SEQ
            WHERE
                RECRUIT_SEQ = ?
                ${(step) ? `AND STEP='${step}'` : '' }`;
            const [rows, fields] = await pool.query(query, [recruitSeq]);

            return rows[0].TOTALCOUNT;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.totalCountForRecruit: ${error}`);           
            return null;
        }
    }

    static async listForRecruit(recruitSeq, step, limit, offset) {
        try 
        {
            //쿼리
            const query = `
            SELECT                        
                RESUME.SEQ,
                RESUME.USER_SEQ, 
                SUBJECT, 
                PHOTO, 
                RESUME.NAME,
                BIRTHYEAR,
                GENDER, 
                CONTACT, 
                EMAIL, 
                POSTCODE, 
                ADDRESS, 
                ADDRESSEXTRA, 
                EDUCATION, 
                EDUCATIONSCHOOL, 
                CAREER_SEQ, 
                CAREER.NAME AS CAREER_NAME,
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
                VIEW,
                ACTIVE, 
                CREATED, 
                MODIFIED
                APPLYDATE,
                READING,
                STEP,
                JOBKIND_SEQ,
                JOBKIND_NAME,
                WORKREGION_SEQ,
                WORKREGION_NAME
            FROM 
                RESUME
                INNER JOIN CAREER ON CAREER.SEQ = RESUME.CAREER_SEQ
                INNER JOIN RECRUIT_RESUME ON RECRUIT_RESUME.RESUME_SEQ = RESUME.SEQ
                LEFT JOIN (
                    SELECT RESUME_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                    FROM RESUME_JOBKIND GROUP BY RESUME_SEQ
                ) JOBKIND ON JOBKIND.RESUME_SEQ = RESUME.SEQ   
                LEFT JOIN (
                    SELECT RESUME_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                    FROM RESUME_REGION GROUP BY RESUME_SEQ
                ) REGION ON REGION.RESUME_SEQ = RESUME.SEQ 
            WHERE
                RECRUIT_SEQ = ?
                ${(step) ? `AND STEP='${step}'` : '' }                                
            ORDER BY RESUME.NAME, RESUME.MODIFIED DESC
            LIMIT ? OFFSET ?`;
            const [rows, fields] = await pool.query(query, [recruitSeq, limit, offset]);
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/resumeModel.listForRecruit: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.listForRecruit: ${error}`);           
            return null;
        }
    }

    // //jobkinds 값이 문자열로 1,2 형태라고 정의
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
            logger.writeLog('info', `models/resumeModel.updateJobKind: ${resumeSeq} 이력서에 ${jobKinds} 직종이 연결되었습니다.`);

            return resumeSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/resumeModel.updateJobKind: ${error}`);
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
            await connection.query(`DELETE FROM RESUME_REGION WHERE RESUME_SEQ=?`, [resumeSeq]);
            //새 레코드를 추가한다
            await connection.query(`
                INSERT INTO RESUME_REGION (RESUME_SEQ, WORKREGION_SEQ, WORKREGION_NAME)
                SELECT ${resumeSeq}, SEQ, NAME FROM WORKREGION WHERE SEQ IN (${workingRegions})`);

            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/resumeModel.updateWorkingRegion: ${resumeSeq} 이력서에 ${workingRegions} 지역이 연결되었습니다.`);           

            return resumeSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/resumeModel.updateWorkingRegion : ${error}`);
            return null;
        }
    }

    static async addCareer(resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salary) {
        try 
        {
            const [rows, fields] = await pool.query(`INSERT INTO RESUME_CAREER (
                    RESUME_SEQ, COMPANY, WORKSTART, WORKEND, CAREER, POSITION, JOBTYPE, WORKREGION, CHARGE, SALARY, CREATED, MODIFIED
                ) VALUES ( 
                    ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP()
                )`, 
                [
                    resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salary
                ]);
            return rows.insertId;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.addCareer: ${error}`);           
            return null;
        }
    }

    static async updateCareer(company, workStart, workEnd, career, position, jobType, workRegion, charge, salary, seq) {
        try 
        {
            const [rows, fields] = await pool.query(`UPDATE RESUME_CAREER SET
                    COMPANY=?, WORKSTART=?, WORKEND=?, CAREER=?, POSITION=?, JOBTYPE=?, WORKREGION=?, CHARGE=?, SALARY=?, MODIFIED=CURRENT_TIMESTAMP()
                WHERE SEQ=?
                `, 
                [
                    company, workStart, workEnd, career, position, jobType, workRegion, charge, salary, seq
                ]);

            return rows;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.updateCareer: ${error}`);           
            return null;
        }
    }
    static async removeCareer(seq) {
        try 
        {
            await pool.query(`DELETE FROM RESUME_CAREER WHERE SEQ=?`, [seq]);
            return seq;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.removeCareer: ${error}`);           
            return null;
        }
    }
    static async getCareer(seq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT 
                    SEQ, RESUME_SEQ, COMPANY, WORKSTART, WORKEND, CAREER, POSITION, JOBTYPE, WORKREGION, CHARGE, SALARY, CREATED, MODIFIED
                FROM 
                    RESUME_CAREER
                WHERE 
                    SEQ=?`, [seq]);
            if (rows.length > 0) 
                return rows[0];
            else {
                logger.writeLog('error', `models/resumeModel.getCareer: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.getCareer: ${error}`);           
            return null;
        }
    }
    static async listCareer(resumeSeq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT 
                    SEQ, RESUME_SEQ, COMPANY, WORKSTART, WORKEND, CAREER, POSITION, JOBTYPE, WORKREGION, CHARGE, SALARY, CREATED, MODIFIED
                FROM 
                    RESUME_CAREER
                WHERE 
                    RESUME_SEQ=?
                ORDER BY
                    WORKSTART DESC`, [resumeSeq]);
            
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/resumeModel.listCareer: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.listCareer: ${error}`);           
            return null;
        }
    }
    
    static async updateImage(mediaPath, seq, resumeFile) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction

            // 기존 파일을 찾아서 삭제
            const [rowsFind, fieldsFind] = await connection.query(`SELECT SEQ, LOCATION, FILENAME, RELATED_SEQ FROM FILESTORAGE WHERE RELATED_TABLE=? AND RELATED_SEQ=? AND LOCATION ='RESUME'`, ['RESUME', seq]);
            if (rowsFind.length > 0) {
                // 기존 파일 정보가 있으면 삭제
                try {
                    fs.unlinkSync(mediaPath + "uploads/" + rowsFind[0].LOCATION + "/" + rowsFind[0].FILENAME);
                } catch {
                    logger.writeLog('error', `models/resumeModel.updateImage: 기존 이미지가 없음`);    
                }
                // 레코드도 삭제
                await connection.query(`DELETE FROM FILESTORAGE WHERE SEQ=? AND LOCATION='RESUME'`, [rowsFind[0].SEQ]);
            }
            // 새로운 파일 저장 정보를 추가
            const [rows, fields] = await connection.query(`INSERT INTO FILESTORAGE 
                (LOCATION, FILENAME, RELATED_TABLE, RELATED_SEQ) VALUES (?, ?, ?, ?)`, [path.dirname(resumeFile), path.basename(resumeFile), 'RESUME', seq]);
            // 해당 정보로 로고 파일 정보 갱신

            await connection.query(`UPDATE RESUME SET PHOTO=?, MODIFIED=CURRENT_TIMESTAMP() WHERE SEQ=?`, [rows.insertId, seq]);

            await connection.commit(); // commit
            connection.release();

            return rows.insertId;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/resumeModel.updateImage: ${error}`);           
            return null;
        }
    }

    static async updatecertificate(mediaPath, seq, resumeFile) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction

            // 기존 파일을 찾아서 삭제
            // 증명서 위치 추가.  AND LOCATION ='certificate'
            const [rowsFind, fieldsFind] = await connection.query(`SELECT SEQ, LOCATION, FILENAME, RELATED_SEQ FROM FILESTORAGE WHERE RELATED_TABLE=? AND RELATED_SEQ=? AND LOCATION ='CERTIFICATE'`, ['RESUME', seq]);

            if (rowsFind.length > 0) {
                // 기존 파일 정보가 있으면 삭제
                try {
                    fs.unlinkSync(mediaPath + "uploads/" + rowsFind[0].LOCATION + "/" + rowsFind[0].FILENAME);
                } catch {
                    logger.writeLog('error', `models/resumeModel.updatecertificate: ${error}`);            
                }
                // 레코드도 삭제
                // 레코드 삭제할때 로케이션까지같게 조건 추가. 
                await connection.query(`DELETE FROM FILESTORAGE WHERE SEQ=? AND LOCATION='CERTIFICATE'`, [rowsFind[0].SEQ]);
            }
            // 새로운 파일 저장 정보를 추가
            const [rows, fields] = await connection.query(`INSERT INTO FILESTORAGE 
                (LOCATION, FILENAME, RELATED_TABLE, RELATED_SEQ) VALUES (?, ?, ?, ?)`, [path.dirname(resumeFile), path.basename(resumeFile), 'CERTIFICATE', seq]);
            // 해당 정보로 로고 파일 정보 갱신
            
            // 이부분떄문에 포토가 같이 자꾸 바뀌었음.
            // 이부분에서 디비에 올라갔다는 사실을 알려야함.
            // 이부분에서 ㄴㄴinsertId 는 증명서 seq 니까 certificate 컬럼의 값이 바뀌어야함.
            await connection.query(`UPDATE RESUME SET CAREERCERTIFICATE=?, MODIFIED=CURRENT_TIMESTAMP() WHERE SEQ=?`, [rows.insertId, seq]);

            await connection.commit(); // commit
            connection.release();

            return rows.insertId;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/resumeModel.updatecertificate: ${error}`);           
            return null;
        }
    }
    
    static async createScrap(martSeq, resumeSeq) {
        const connection = await pool.getConnection(async conn => conn);
        try 
        {
            await connection.beginTransaction();    // transaction
            //먼저 지운다. 있어도 지워지고 없으면 무시. 중복 등록을 막는다
            await connection.query(`DELETE FROM RESUME_SCRAP WHERE MART_SEQ=? AND RESUME_SEQ=?`, [martSeq, resumeSeq]);
            //새 레코드를 추가한다
            await connection.query(`INSERT INTO RESUME_SCRAP (MART_SEQ, RESUME_SEQ, CREATED) VALUES (?, ?, CURRENT_TIMESTAMP())`, [martSeq, resumeSeq]);

            await connection.commit(); // commit
            connection.release();
            logger.writeLog('info', `models/resumeModel.createScrap: 이력서 ${resumeSeq}를 마트 ${martSeq}가 스크랩했습니다.`);           

            return martSeq;
        } catch (error) {
            await connection.rollback();    // rollback
            connection.release();

            logger.writeLog('error', `models/resumeModel.createScrap: ${error}`);           
            return null;
        }
    }
    static async getScrap(martSeq, resumeSeq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT SEQ, MART_SEQ, RESUME_SEQ, CREATED FROM RESUME_SCRAP WHERE MART_SEQ=? AND RESUME_SEQ=?`, [martSeq, resumeSeq]);
            if (rows.length > 0) 
                return rows[0];
            else {
                logger.writeLog('error', `models/resumeModel.getScrap: No data found`);           
                return null;
            }                            
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.getScrap: ${error}`);           
            return null;
        }
    }
    static async removeScrap(martSeq, resumeSeq) {
        try 
        {
            await pool.query(`DELETE FROM RESUME_SCRAP WHERE MART_SEQ=? AND RESUME_SEQ=?`, [martSeq, resumeSeq]);
            logger.writeLog('info', `models/resumeModel.deleteScrap: 이력서${resumeSeq}를 마트 ${martSeq}에서 스크랩 제거했습니다.`);           

            return martSeq;
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.deleteScrap: ${error}`);           
            return null;
        }
    }
    static async listScrap(martSeq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT                        
                    RESUME.SEQ,
                    RESUME.USER_SEQ, 
                    SUBJECT, 
                    PHOTO, 
                    RESUME.NAME,
                    BIRTHYEAR,
                    GENDER, 
                    CONTACT, 
                    EMAIL, 
                    POSTCODE, 
                    ADDRESS, 
                    ADDRESSEXTRA, 
                    EDUCATION, 
                    EDUCATIONSCHOOL, 
                    CAREER_SEQ, 
                    CAREER.NAME AS CAREER_NAME,
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
                    VIEW,
                    ACTIVE, 
                    RESUME.CREATED, 
                    MODIFIED,
                    JOBKIND_SEQ,
                    JOBKIND_NAME,
                    WORKREGION_SEQ,
                    WORKREGION_NAME
                FROM 
                    RESUME
                    INNER JOIN CAREER ON CAREER.SEQ = RESUME.CAREER_SEQ
                    INNER JOIN RESUME_SCRAP ON RESUME_SCRAP.RESUME_SEQ = RESUME.SEQ
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM RESUME_JOBKIND GROUP BY RESUME_SEQ
                    ) JOBKIND ON JOBKIND.RESUME_SEQ = RESUME.SEQ   
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM RESUME_REGION GROUP BY RESUME_SEQ
                    ) REGION ON REGION.RESUME_SEQ = RESUME.SEQ 
                WHERE
                    MART_SEQ = ?
                ORDER BY RESUME.NAME, RESUME.MODIFIED DESC`, [martSeq]);            
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/resumeModel.listScrap: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.listScrap: ${error}`);           
            return null;
        }
    }
    static async listJobRequest(martSeq) {
        try 
        {
            const [rows, fields] = await pool.query(`SELECT                        
                    RESUME.SEQ,
                    RESUME.USER_SEQ, 
                    SUBJECT, 
                    PHOTO, 
                    RESUME.NAME,
                    BIRTHYEAR,
                    GENDER, 
                    CONTACT, 
                    EMAIL, 
                    POSTCODE, 
                    ADDRESS, 
                    ADDRESSEXTRA, 
                    EDUCATION, 
                    EDUCATIONSCHOOL, 
                    CAREER_SEQ, 
                    CAREER.NAME AS CAREER_NAME,
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
                    VIEW,
                    ACTIVE, 
                    RESUME.CREATED, 
                    MODIFIED,
                    JOBKIND_SEQ,
                    JOBKIND_NAME,
                    WORKREGION_SEQ,
                    WORKREGION_NAME
                FROM 
                    RESUME
                    INNER JOIN CAREER ON CAREER.SEQ = RESUME.CAREER_SEQ
                    INNER JOIN MART_JOBREQUEST ON MART_JOBREQUEST.USER_SEQ = RESUME.USER_SEQ
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(JOBKIND_SEQ SEPARATOR ',') AS JOBKIND_SEQ,  GROUP_CONCAT(JOBKIND_NAME SEPARATOR ',') AS JOBKIND_NAME
                        FROM RESUME_JOBKIND GROUP BY RESUME_SEQ
                    ) JOBKIND ON JOBKIND.RESUME_SEQ = RESUME.SEQ   
                    LEFT JOIN (
                        SELECT RESUME_SEQ, GROUP_CONCAT(WORKREGION_SEQ SEPARATOR ',') AS WORKREGION_SEQ,  GROUP_CONCAT(WORKREGION_NAME SEPARATOR ',') AS WORKREGION_NAME
                        FROM RESUME_REGION GROUP BY RESUME_SEQ
                    ) REGION ON REGION.RESUME_SEQ = RESUME.SEQ 
                WHERE
                    MART_SEQ =?                    
                ORDER BY RESUME.NAME, RESUME.MODIFIED DESC`, [martSeq]);            
            if (rows.length > 0) 
                return rows;
            else {
                logger.writeLog('error', `models/resumeModel.listJobRequest: No data found`);           
                return null;
            }                
        } catch (error) {
            logger.writeLog('error', `models/resumeModel.listJobRequest: ${error}`);           
            return null;
        }
    }
};

