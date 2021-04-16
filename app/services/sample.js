const logger = require('../config/logger.js');
var sampleModel = require("../models/sample");

module.exports = class sampleService {
    static get(data) {
        return new Promise(function(resolve, reject) {
            try {
                let sampleInfo = sampleModel.get(data);
    
                resolve(sampleInfo);
            } catch (error) {
                logger.writeLog('error', `services/sampleService/get: ${error}`);           
            }
        })
    }
    

}