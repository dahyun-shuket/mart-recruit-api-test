const logger = require('../config/logger.js');
var martModel = require("../models/mart");

module.exports = class martService {
    static create(user_Seq, name, logoFile, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = martModel.create(user_Seq, name, logoFile, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/martService/create: ${error}`);           
            }
        })
    }
    static update(seq, name, logoFile, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank) {
        return new Promise(function(resolve, reject) {
            try {
                let result = martModel.update(seq, name, logoFile, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/martService/update: ${error}`);           
            }
        })
    }
    static remove(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = martModel.remove(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/martService/remove: ${error}`);           
            }
        })
    }
    static get(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = martModel.get(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/martService/remove: ${error}`);           
            }
        })
    }
    static list(page, rowCount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page - 1) * rowCount;
                let result = martModel.list(rowcount, offset);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/martService/list: ${error}`);           
            }
        })
    }
    

}
