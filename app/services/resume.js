const logger = require('../config/logger.js');
var resumeModel = require("../models/resume");

module.exports = class resumeService {
    static create(userSeq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrerSeq, 
        technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = resumeModel.create(userSeq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrerSeq, 
                    technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/create: ${error}`);           
            }
        })
    }
    static update(seq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrerSeq, 
        technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.update(seq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrerSeq, 
                    technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/update: ${error}`);           
            }
        })
    }
    static remove(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.remove(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/remove: ${error}`);           
            }
        })
    }    
    static setCertificate(seq, value) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.certificate(seq, value);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/setCertificate: ${error}`);           
            }
        })
    }
    static get(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.get(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/get: ${error}`);           
            }
        })
    }
    static getByUserSeq(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.getByUserSeq(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/getByUserSeq: ${error}`);           
            }
        })
    }
    static totalCount(regions, jobKinds, name, certificate) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.totalCount(regions, jobKinds, name, certificate);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/totalCount: ${error}`);           
            }
        })
    }
    static list(userSeq, regions, jobKinds, name, certificate, recruitSeq, page, rowCount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page) ? (page - 1) * rowCount : 0;
                let result = resumeModel.list(userSeq, regions, jobKinds, name, certificate, recruitSeq, rowCount, offset);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/list: ${error}`);           
            }
        })
    }
    static listForRecruit(recruitSeq, page, rowCount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page - 1) * rowCount;
                let result = resumeModel.list(NULL, NULL, NULL, 'N', recruitSeq, rowCount, offset);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/listForRecruit: ${error}`);           
            }
        })
    }
    static updateJobKind(resumeSeq, jobKinds) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.updateJobKind(resumeSeq, jobKinds);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/addJobKind: ${error}`);           
            }
        })
    }
    static updateWorkingRegion(resumeSeq, workingRegions) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.updateWorkingRegion(resumeSeq, workingRegions);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/addWorkingRegion: ${error}`);           
            }
        })
    }

    static addCarrier(resumeSeq, workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = resumeModel.addCarrier(resumeSeq, workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/addCarrier: ${error}`);           
            }
        })
    }
    static updateCarrier(seq, workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.updateCarrier(seq, workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/updateCarrier: ${error}`);           
            }
        })
    }
    static removeCarrier(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.removeCarrier(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/removeCarrier: ${error}`);           
            }
        })
    }    
    static getCarrier(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.getCarrier(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/getCarrier: ${error}`);           
            }
        })
    }
    static listCareer(resumeSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.listCareer(resumeSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/listCareer: ${error}`);           
            }
        })
    }

}
