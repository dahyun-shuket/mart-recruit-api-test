const logger = require('../config/logger.js');
const fileStorageModel = require("../models/fileStorage");

module.exports = class fileStorageService {
    static create(location, fileName, related_Table, related_Seq) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = fileStorageModel.create(location, fileName, related_Table, related_Seq);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/fileStorageService/create: ${error}`);           
            }
        })
    }
    static get(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = fileStorageModel.get(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/fileStorageService/get: ${error}`);           
            }
        })
    }
    static remove(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = fileStorageModel.remove(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/fileStorageService/remove: ${error}`);           
            }
        })
    } 

}