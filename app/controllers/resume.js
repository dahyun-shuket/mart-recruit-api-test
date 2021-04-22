const resumeService = require('../services/resume.js');
const rowCount = 20;

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
        const seq = req.query.seq;

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

    async certificate(req, res, next) {
        const seq = req.query.seq;

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
        const seq = req.query.seq;

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
        const resumeSeq = req.query.seq;

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

    // http://localhost:3000/api/resume/list?userSeq=1&regions=1,2&jobkinds=1,5
    // http://localhost:3000/api/resume/list?userSeq=1&regions=1,2
    // http://localhost:3000/api/resume/list?userSeq=1&jobkinds=1,5
    // http://localhost:3000/api/resume/list?regions=1,2&jobkinds=1,5
    async list(req, res, next) {
        const userSeq = req.query.userSeq;
        const regions = req.query.regions;
        const jobkinds = req.query.jobkinds;

        const page = (req.query.page) ? req.query.page : 1;

        const list = await resumeService.list(userSeq, regions, jobkinds, 'N', page, rowCount);

        res.status(200).json({
            result: 'success',
            data: list
        });    
    },

    async listWaitCertificate(req, res, next) {
        const userSeq = req.query.userSeq;
        const regions = req.query.regions;
        const jobkinds = req.query.jobkinds;

        const page = (req.query.page) ? req.query.page : 1;

        const list = await resumeService.list(userSeq, regions, jobkinds, 'Y', page, rowCount);

        res.status(200).json({
            result: 'success',
            data: list
        });    
    },

    async updateJobKind(req, res, next) {
        const jobOpeningSeq = req.query.seq;
        const jobKinds = req.query.jobKinds;

        const result = await jobOpeningService.updateJobKind(jobOpeningSeq, jobKinds);

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
        const jobOpeningSeq = req.query.seq;
        const workingRegions = req.query.regions;

        const result = await jobOpeningService.updateWorkingRegion(jobOpeningSeq, workingRegions);

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

    async addCarrier(req, res, next) {
        const resumeSeq = req.body.resumeSeq;
        const workStart = req.body.workStart;
        const workEnd = req.body.workEnd;
        const carrier = req.body.carrier;
        const position = req.body.position;
        const jobType = req.body.jobType;
        const workRegion = req.body.workRegion;
        const charge = req.body.charge;
        const salaly = req.body.salaly;

        const result = await resumeService.addCarrier(resumeSeq, workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly);

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

    async updateCarrier(req, res, next) {
        const seq = req.body.seq;
        const resumeSeq = req.body.resumeSeq;
        const workStart = req.body.workStart;
        const workEnd = req.body.workEnd;
        const carrier = req.body.carrier;
        const position = req.body.position;
        const jobType = req.body.jobType;
        const workRegion = req.body.workRegion;
        const charge = req.body.charge;
        const salaly = req.body.salaly;

        const result = await resumeService.updateCarrier(seq, workStart, workEnd, carrier, position, jobType, workRegion, charge, salaly);

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
   
    async removeCarrier(req, res, next) {
        const seq = req.query.seq;

        const result = await resumeService.removeCarrier(seq);

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

    async getCarrier(req, res, next) {
        const seq = req.query.seq;

        if (resumeSeq) {
            const resumeCarrierInfo = await resumeService.getCarrier(seq);

            res.status(200).json({
                result: 'success',
                data: resumeCarrierInfo
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    async listCarrier(req, res, next) {
        const resumeSeq = req.query.resumeSeq;

        const list = await resumeService.list(resumeSeq);

        res.status(200).json({
            result: 'success',
            data: list
        });    
    },}

