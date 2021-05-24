const resumeService = require('../services/resume.js');
const defaultRowCount = 20;
const maxRowCount = 100;

module.exports = {
    async create(req, res, next) {
        const userSeq = req.body.userSeq;
        const subject = req.body.subject;
        const photo = req.body.photo;
        const name = req.body.name;
        const contact = req.body.contact;
        const email = req.body.email;
        const postCode = req.body.postCode;
        const address = req.body.address;
        const addressExtra = req.body.addressExtra;
        const education = req.body.education;
        const educcationSchool = req.body.educcationSchool;
        const carrerSeq = req.body.carrerSeq;
        const technical = req.body.technical;
        const license = req.body.license;
        const isWelfare = req.body.isWelfare;
        const isMilitaly = req.body.isMilitaly;
        const carrerCertificate = req.body.carrerCertificate;
        const introduce = req.body.introduce;
        const workingTypeSeqs = req.body.workingTypeSeqs;
        const workingTypeNames = req.body.workingTypeNames;
        const salary = req.body.salary;

        const result = await resumeService.create(userSeq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrerSeq, 
            technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    async update(req, res, next) {
        const seq = req.body.seq;
        const subject = req.body.subject;
        const photo = req.body.photo;
        const name = req.body.name;
        const contact = req.body.contact;
        const email = req.body.email;
        const postCode = req.body.postCode;
        const address = req.body.address;
        const addressExtra = req.body.addressExtra;
        const education = req.body.education;
        const educcationSchool = req.body.educcationSchool;
        const carrerSeq = req.body.carrerSeq;
        const technical = req.body.technical;
        const license = req.body.license;
        const isWelfare = req.body.isWelfare;
        const isMilitaly = req.body.isMilitaly;
        const carrerCertificate = req.body.carrerCertificate;
        const introduce = req.body.introduce;
        const workingTypeSeqs = req.body.workingTypeSeqs;
        const workingTypeNames = req.body.workingTypeNames;
        const salary = req.body.salary;

        const result = await resumeService.update(seq, subject, photo, name, contact, email, postCode, address, addressExtra, education, educcationSchool, carrerSeq, 
            technical, license, isWelfare, isMilitaly, carrerCertificate, introduce, workingTypeSeqs, workingTypeNames, salary);
            
        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },
   
    async remove(req, res, next) {
        const seq = req.body.seq;

        const result = await resumeService.remove(seq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    increaseView(req, res, next) {
        const seq = req.body.seq;

        resumeService.increaseView(seq);

        res.status(200).json({
            result: 'success',
            data: 0
        });    
    },

    async certificate(req, res, next) {
        const seq = req.body.seq;

        const result = await resumeService.setCertificate(seq, 'Y');

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    async clearCertificate(req, res, next) {
        const seq = req.body.seq;

        const result = await resumeService.setCertificate(seq, 'N');

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },
    
    async get(req, res, next) {
        const resumeSeq = req.body.seq;

        if (resumeSeq) {
            const resumeInfo = await resumeService.get(resumeSeq);

            res.status(200).json({
                result: 'success',
                data: resumeInfo
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },
    async getByUserSeq(req, res, next) {
        const resumeSeq = req.body.seq;
        console.log(resumeSeq);
        if (resumeSeq) {
            const resumeInfo = await resumeService.getByUserSeq(resumeSeq);

            res.status(200).json({
                result: 'success',
                data: resumeInfo
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // http://localhost:3000/api/resume/list?userSeq=1&regions=1,2&jobkinds=1,5
    // http://localhost:3000/api/resume/list?userSeq=1&regions=1,2
    // http://localhost:3000/api/resume/list?userSeq=1&jobkinds=1,5
    // http://localhost:3000/api/resume/list?regions=1,2&jobkinds=1,5
    async list(req, res, next) {
        const userSeq = req.body.userSeq;
        const regions = req.body.regions;
        const jobKinds = req.body.jobKinds;
        const recruitSeq = req.body.recruitSeq;
        const name = req.body.name;
        const certificate = req.body.certificate;
        
        
        const page = (req.body.page) ? req.body.page : 1;
        const rowCount = (req.body.rowCount) ? req.body.rowCount : defaultRowCount;

        const totalCount = (userSeq && recruitSeq) ? 0 : await resumeService.totalCount(regions, jobKinds, name, certificate);
        const list = await resumeService.list(userSeq, regions, jobKinds, name, certificate, recruitSeq, page, rowCount);

        res.status(200).json({
            result: 'success',
            data: {
                totalCount: totalCount,
                list: list
            }
        });    
    },

    async listForRecruit(req, res, next) {
        const recruitSeq = req.body.recruitSeq;
        const currentPage = (req.body.page) ? req.body.page : 1;
        const rowCount = (req.body.rowCount) ? req.body.rowCount : maxRowCount;
        const step = req.body.step;
        
        const totalCount = await resumeService.totalCountForRecruit(recruitSeq, step);
        const list = await resumeService.listForRecruit(recruitSeq, step, currentPage, rowCount);

        res.status(200).json({
            result: 'success',
            data: {
                totalCount: totalCount,
                list: list
            }
        });    
    },

    async updateJobKind(req, res, next) {
        const resumeSeq = req.body.seq;
        const jobKinds = req.body.jobKinds;

        const result = await resumeService.updateJobKind(resumeSeq, jobKinds);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: list
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },

    async updateWorkingRegion(req, res, next) {
        const resumeSeq = req.body.seq;
        const workingRegions = req.body.regions;

        const result = await resumeService.updateWorkingRegion(resumeSeq, workingRegions);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: list
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });        
        }
    },

    async addCareer(req, res, next) {
        const resumeSeq = req.body.resumeSeq;
        const workStart = req.body.workStart;
        const workEnd = req.body.workEnd;
        const career = req.body.career;
        const position = req.body.position;
        const jobType = req.body.jobType;
        const workRegion = req.body.workRegion;
        const charge = req.body.charge;
        const salaly = req.body.salaly;

        const result = await resumeService.addCareer(resumeSeq, workStart, workEnd, career, position, jobType, workRegion, charge, salaly);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    async updateCareer(req, res, next) {
        const seq = req.body.seq;
        const resumeSeq = req.body.resumeSeq;
        const workStart = req.body.workStart;
        const workEnd = req.body.workEnd;
        const career = req.body.career;
        const position = req.body.position;
        const jobType = req.body.jobType;
        const workRegion = req.body.workRegion;
        const charge = req.body.charge;
        const salaly = req.body.salaly;

        const result = await resumeService.updateCareer(seq, workStart, workEnd, career, position, jobType, workRegion, charge, salaly);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },
   
    async removeCareer(req, res, next) {
        const seq = req.body.seq;

        const result = await resumeService.removeCareer(seq);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    async getCareer(req, res, next) {
        const seq = req.body.seq;

        if (resumeSeq) {
            const resumeCareerInfo = await resumeService.getCareer(seq);

            res.status(200).json({
                result: 'success',
                data: resumeCareerInfo
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    async listCareer(req, res, next) {
        const resumeSeq = req.body.resumeSeq;

        const list = await resumeService.listCareer(resumeSeq);

        res.status(200).json({
            result: 'success',
            data: list
        });    
    },
    async updateImage(req, res, next) {
        const seq = req.body.SEQ;
        const resumeFile = req.body.RESUMEFILE;
        const result = await resumeService.updateImage(req.app.get('mediaPath'), seq, resumeFile);

        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },
    async updatecertificate(req, res, next) {
        const seq = req.body.SEQ;
        const resumeFile = req.body.RESUMEFILE;
        console.log(seq);
        console.log(resumeFile);
        console.log(req.app.get('mediaPath'));
        const result = await resumeService.updatecertificate(req.app.get('mediaPath'), seq, resumeFile);
        
        if (result) {
            res.status(200).json({
                result: 'success',
                data: result
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },
    
}

