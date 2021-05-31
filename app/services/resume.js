const logger = require('../config/logger.js');
var resumeModel = require("../models/resume");

module.exports = class resumeService {
    static create(userSeq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, careerSeq, 
        technical, license, isWelfare, isMilitaly, careerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = resumeModel.create(userSeq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, careerSeq, 
                    technical, license, isWelfare, isMilitaly, careerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/create: ${error}`);           
            }
        })
    }
    static update(seq, subject, name, contact, email,gender,  postCode, address, addressExtra, education, educcationSchool, careerSeq, 
        technical, license, isWelfare, isMilitaly, careerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.update(seq, subject, name, contact, email, gender, postCode, address, addressExtra, education, educcationSchool, careerSeq, 
                    technical, license, isWelfare, isMilitaly, careerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary);
    
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
    static increaseView(seq) {
        return new Promise(function(resolve, reject) {
            try {
                resumeModel.increaseView(seq);
    
                resolve(0);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/increateView: ${error}`);           
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
    static totalCountForRecruit(recruitSeq, step) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.totalCountForRecruit(recruitSeq, step);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/listForRecruit: ${error}`);           
            }
        })
    }
    static listForRecruit(recruitSeq, step, page, rowCount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page) ? (page - 1) * rowCount : 0;
                let result = resumeModel.listForRecruit(recruitSeq, step, rowCount, offset);
    
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

    static addCareer(resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salaly) {
        return new Promise(function(resolve, reject) {
            try {
                let newId = resumeModel.addCareer(resumeSeq, company, workStart, workEnd, career, position, jobType, workRegion, charge, salaly);
    
                resolve(newId);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/addCareer: ${error}`);           
            }
        })
    }
    static updateCareer(company, workStart, workEnd, career, position, jobType, workRegion, charge, salaly, seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.updateCareer(company, workStart, workEnd, career, position, jobType, workRegion, charge, salaly, seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/updateCareer: ${error}`);           
            }
        })
    }
        static removeCareer(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.removeCareer(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/removeCareer: ${error}`);           
            }
        })
    }    
    static getCareer(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.getCareer(seq);
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `API - services/resumeService/getCareer: ${error}`);           
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
    static updateImage(mediaPath, seq, resumeFile) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.updateImage(mediaPath, seq, resumeFile);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/updateImage: ${error}`);           
            }
        })
    }
    static updatecertificate(mediaPath, seq, resumeFile) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.updatecertificate(mediaPath, seq, resumeFile);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/updatecertificate: ${error}`);           
            }
        })
    }

    static createScrap(martSeq, resumeSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.createScrap(martSeq, resumeSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/createScrap: ${error}`);           
            }
        })
    }
    static removeScrap(martSeq, resumeSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.removeScrap(martSeq, resumeSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/deleteScrap: ${error}`);           
            }
        })
    }
    static listScrap(martSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.listScrap(martSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/listScrap: ${error}`);           
            }
        })
    }
    static listJobRequest(martSeq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = resumeModel.listJobRequest(martSeq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/resumeService/listJobRequest: ${error}`);           
            }
        })
    }
}
