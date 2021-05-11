const logger = require('../config/logger.js');
var scrapModel = require("../models/scrap");

module.exports = class scrapService {
    static create(userSeq, recruitSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = scrapModel.create(userSeq, recruitSeq);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/scrapService/create: ${error}`);           
            }
        })
    }
    static remove(userSeq, recruitSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.remove(userSeq, recruitSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/scrapService/remove: ${error}`);           
            }
        })
    }   
    static removeSeq(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.removeSeq(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/scrapService/removeSeq: ${error}`);           
            }
        })
    }   
}
