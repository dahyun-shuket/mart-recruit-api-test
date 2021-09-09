const logger = require('../config/logger.js');
var analyticsModel = require("../models/analytics");

module.exports = class analyticsService {
    static getDashboard() {
        return new Promise(function(resolve, reject) {
            try {
                let result = analyticsModel.getDashboard();
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/analyticsService.getDashboard: ${error}`);           
            }
        })
    }
}
