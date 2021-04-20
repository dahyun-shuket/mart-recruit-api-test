const logger = require('../config/logger.js');
var workingRegionModel = require("../models/workingRegion");

module.exports = class workingRegionService {
    static create(workingRegion) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = workingRegionModel.create(workingRegion);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/workingRegionService/create: ${error}`);           
            }
        })
    }
    static update(seq, workingRegion) {
        return new Promise(function(resolve, reject) {
            try {
                let result = workingRegionModel.update(seq, workingRegion);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/workingRegionService/update: ${error}`);           
            }
        })
    }
    static remove(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = workingRegionModel.remove(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/workingRegionService/remove: ${error}`);           
            }
        })
    }
    static list() {
        return new Promise(function(resolve, reject) {
            try {
                let result = workingRegionModel.list();
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/workingRegionService/list: ${error}`);           
            }
        })
    }
    

}