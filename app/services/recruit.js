const logger = require('../config/logger.js');
var recruitModel = require("../models/recruit");

module.exports = class recruitService {
    static create(martSeq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingTypeSeq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = recruitModel.create(martSeq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingTypeSeq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/create: ${error}`);           
            }
        })
    }
    static update(seq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingType_Seq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.update(seq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingTypeSeq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/update: ${error}`);           
            }
        })
    }
    static remove(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.remove(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/remove: ${error}`);           
            }
        })
    }
    static get(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = recruitModel.get(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/get: ${error}`);           
            }
        })
    }
    static list(martSeq, userSeq, userOwn, regions, jobKinds, page, rowCount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page - 1) * rowCount;
                let result = recruitModel.list(martSeq, userSeq, userOwn, regions, jobKinds, rowCount, offset);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/recruitService/list: ${error}`);           
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
    
}
