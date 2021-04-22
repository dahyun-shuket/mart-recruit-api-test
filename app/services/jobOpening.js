const logger = require('../config/logger.js');
var jobOpeningModel = require("../models/jobOpening");

module.exports = class jobOpeningService {
    static create(martSeq, subject, HRONname, HROContact, jobKind_Seq, carrer_Seq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingType_Seq, probationTerm, workShift, worshiftTime, workRegion_Seq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = jobOpeningModel.create(martSeq, subject, HRONname, HROContact, jobKind_Seq, carrer_Seq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingType_Seq, probationTerm, workShift, worshiftTime, workRegion_Seq, gender, age, startDate, endDate, hiringStep, requireDocs);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/jobOpeningService/create: ${error}`);           
            }
        })
    }
    static update(seq, subject, HRONname, HROContact, jobKind_Seq, carrer_Seq, expYear, charge, jobRank, preferential, education, salaryType, salary,
        workingType_Seq, probationTerm, workShift, worshiftTime, workRegion_Seq, gender, age, startDate, endDate, hiringStep, requireDocs) {
        return new Promise(function(resolve, reject) {
            try {
                let result = jobOpeningModel.update(seq, subject, HRONname, HROContact, jobKind_Seq, carrer_Seq, expYear, charge, jobRank, preferential, education, salaryType, salary,
                    workingType_Seq, probationTerm, workShift, worshiftTime, workRegion_Seq, gender, age, startDate, endDate, hiringStep, requireDocs);
    
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
                logger.writeLog('error', `services/jobOpeningService/remove: ${error}`);           
            }
        })
    }
    static list(martSeq, regions, jobKinds, page, rowcount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page - 1) * rowcount;
                let result = jobOpeningModel.list(martSeq, regions, jobKinds, rowcount, offset);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobOpeningService/list: ${error}`);           
            }
        })
    }
    

}
