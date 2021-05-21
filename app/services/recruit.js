const logger = require('../config/logger.js');
var recruitModel = require("../models/recruit");

module.exports = class recruitService {
    static create(MART_SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
        PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
        GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION) {
        return new Promise(function(resolve, reject) {
            try {
                if (ENDDATE == '') ENDDATE = null;
                let newId = recruitModel.create(MART_SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
                    PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
                    GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/create: ${error}`);           
            }
        })
    }
    static update(SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, PREFERENTIAL, EDUCATION, 
        SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, GENDER, AGE, STARTDATE, ENDDATE, 
        HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION, ACTIVE) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.update(SEQ, HRONAME, HROCONTACT, HROEMAIL, SUBJECT, CAREER_SEQ, CHARGE, 
                    PREFERENTIAL, EDUCATION, SALARYTYPE, SALARY, PROBATIONTERM, WORKSHIFT, WORKSHIFTTIME, 
                    GENDER, AGE, STARTDATE, ENDDATE, HIRINGSTEP, REQUIREDOCS, CONTENT, JOBKIND, JOBRANK, WORKINGTYPE, WORKREGION, ACTIVE);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/update: ${error}`);           
            }
        })
    }
    static remove(SEQ) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.setActive(SEQ, 'D');
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/remove: ${error}`);           
            }
        })
    }
    static active(SEQ) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.setActive(SEQ, 'Y');
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/active: ${error}`);           
            }
        })
    }
    static close(SEQ) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.setActive(SEQ, 'N');
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/close: ${error}`);           
            }
        })
    }    static get(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.get(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/get: ${error}`);           
            }
        })
    }
    static copy(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.copy(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/copy: ${error}`);           
            }
        })
    }
    static totalCount(martSeq, name, subject, regions, jobKinds, workingTypes) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.totalCount(martSeq, name, subject, regions, jobKinds, workingTypes);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/totalCount: ${error}`);           
            }
        })
    }
    static list(martSeq, active, name, subject, userSeq, userOwn, regions, jobKinds, workingTypes, scrapSeq, page, rowCount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page - 1) * rowCount;
                let result = recruitModel.list(martSeq, active, name, subject, userSeq, userOwn, regions, jobKinds, workingTypes, scrapSeq, rowCount, offset);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/list: ${error}`);           
            }
        })
    }
    static closeAfterDate() {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.closeAfterDate();
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/closeAfterDate: ${error}`);           
            }
        })
    }
    static updateJobKind(recruitSeq, jobKinds) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.updateJobKind(recruitSeq, jobKinds);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/addJobKind: ${error}`);           
            }
        })
    }
    static updateWorkingRegion(recruitSeq, workingRegions) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.updateWorkingRegion(recruitSeq, workingRegions);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/addWorkingRegion: ${error}`);           
            }
        })
    }
    static getUserStatus(recruitSeq, userSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.getUserStatus(recruitSeq, userSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/getUserStatus: ${error}`);           
            }
        })
    }
    static apply(recruitSeq, userSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.apply(recruitSeq, userSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/apply: ${error}`);           
            }
        })
    }
    static cancelApply(recruitSeq, userSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.cancelApply(recruitSeq, userSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/cancelApply: ${error}`);           
            }
        })
    }
    static getActiveCount(martSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.getActiveCount(martSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/getActiveCount: ${error}`);           
            }
        })
    }
    static getResumeCount(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.getResumeCount(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/getResumeCount: ${error}`);           
            }
        })
    }
}
