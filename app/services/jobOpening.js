const logger = require('../config/logger.js');
var jobOpeningModel = require("../models/jobOpening");

module.exports = class jobOpeningService {
    static create(martSeq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingTypeSeq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = jobOpeningModel.create(martSeq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingTypeSeq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/jobOpeningService/create: ${error}`);           
            }
        })
    }
    static update(seq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingType_Seq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        return new Promise(function(resolve, reject) {
            try {
                let result = jobOpeningModel.update(seq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingTypeSeq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobOpeningService/update: ${error}`);           
            }
        })
    }
    static remove(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = jobOpeningModel.remove(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobOpeningService/remove: ${error}`);           
            }
        })
    }
    static get(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = jobOpeningModel.get(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobOpeningService/get: ${error}`);           
            }
        })
    }
    static list(martSeq, regions, jobKinds, page, rowCount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page - 1) * rowCount;
                let result = jobOpeningModel.list(martSeq, regions, jobKinds, rowCount, offset);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobOpeningService/list: ${error}`);           
            }
        })
    }
    static updateJobKind(jobOpeningSeq, jobKinds) {
        return new Promise(function(resolve, reject) {
            try {
                let result = jobOpeningModel.updateJobKind(jobOpeningSeq, jobKinds);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobOpeningService/addJobKind: ${error}`);           
            }
        })
    }
    static updateWorkingRegion(jobOpeningSeq, workingRegions) {
        return new Promise(function(resolve, reject) {
            try {
                let result = jobOpeningModel.updateWorkingRegion(jobOpeningSeq, workingRegions);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobOpeningService/addWorkingRegion: ${error}`);           
            }
        })
    }
    
}
