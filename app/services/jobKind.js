const logger = require('../config/logger.js');
var jobKindModel = require("../models/jobKind");

module.exports = class jobKindService {
    static create(jobKind) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = jobKindModel.create(jobKind);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/jobKindService/create: ${error}`);           
            }
        })
    }
    static update(seq, jobKind) {
        return new Promise(function(resolve, reject) {
            try {
                let result = jobKindModel.update(seq, jobKind);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobKindService/update: ${error}`);           
            }
        })
    }
    static remove(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = jobKindModel.remove(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobKindService/remove: ${error}`);           
            }
        })
    }
    static list() {
        return new Promise(function(resolve, reject) {
            try {
                let result = jobKindModel.list();
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/jobKindService/list: ${error}`);           
            }
        })
    }
    

}