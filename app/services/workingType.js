const logger = require('../config/logger.js');
var workingTypeModel = require("../models/workingType");

module.exports = class workingTypeService {
    static create(workingType) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = workingTypeModel.create(workingType);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/workingTypeService/create: ${error}`);           
            }
        })
    }
    static update(seq, workingType) {
        return new Promise(function(resolve, reject) {
            try {
                let result = workingTypeModel.update(seq, workingType);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/workingTypeService/update: ${error}`);           
            }
        })
    }
    static remove(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = workingTypeModel.remove(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/workingTypeService/remove: ${error}`);           
            }
        })
    }
    static list() {
        return new Promise(function(resolve, reject) {
            try {
                let result = workingTypeModel.list();
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/workingTypeService/list: ${error}`);           
            }
        })
    }
    

}