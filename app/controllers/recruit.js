const jobOpeningService = require('../services/recruit.js');
const resumeService = require('../services/resume.js');
const rowCount = 20;

module.exports = {
    async create(req, res, next) {
        const martSeq = req.body.martSeq;
        const subject = req.body.subject;
        const HRONname = req.body.HRONname;
        const HROContact = req.body.HROContact;
        const jobKindSeq = req.body.jobKindSeq;
        const carrierSeq = req.body.carrierSeq;
        const expYear = req.body.expYear;
        const charge = req.body.charge;
        const jobRank = req.body.jobRank;
        const preferential = req.body.preferential;
        const education = req.body.education;
        const salaryType = req.body.salaryType;
        const salary = req.body.salary;
        const workingTypeSeq = req.body.workingTypeSeq;
        const probationTerm = req.body.probationTerm;
        const workShift = req.body.workShift;
        const worshiftTime = req.body.worshiftTime;
        const workRegionSeq = req.body.workRegionSeq;
        const gender = req.body.gender;
        const age = req.body.age;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const hiringStep = req.body.hiringStep;
        const requireDocs = req.body.requireDocs;

        const result = await jobOpeningService.create(martSeq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
            workingTypeSeq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs);

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
        const HRONname = req.body.HRONname;
        const HROContact = req.body.HROContact;
        const jobKindSeq = req.body.jobKindSeq;
        const carrierSeq = req.body.carrerSeq;
        const expYear = req.body.expYear;
        const charge = req.body.charge;
        const jobRank = req.body.jobRank;
        const preferential = req.body.preferential;
        const education = req.body.education;
        const salaryType = req.body.salaryType;
        const salary = req.body.salary;
        const workingTypeSeq = req.body.workingTypeSeq;
        const probationTerm = req.body.probationTerm;
        const workShift = req.body.workShift;
        const worshiftTime = req.body.worshiftTime;
        const workRegionSeq = req.body.workRegionSeq;
        const gender = req.body.gender;
        const age = req.body.age;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const hiringStep = req.body.hiringStep;
        const requireDocs = req.body.requireDocs;

        const result = await jobOpeningService.update(seq, subject, HRONname, HROContact, jobKindSeq, carrierSeq, expYear, charge, jobRank, preferential, education, salaryType, salary,
            workingTypeSeq, probationTerm, workShift, worshiftTime, workRegionSeq, gender, age, startDate, endDate, hiringStep, requireDocs);

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

        const result = await jobOpeningService.remove(seq);

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

    // ?martseq=&page=&criteria=
    async get(req, res, next) {
        const jobOPeningSeq = req.query.seq;


        if (jobOPeningSeq) {

            const jobOpeningInfo = await jobOpeningService.get(jobOPeningSeq);

            res.status(200).json({
                result: 'success',
                data: jobOpeningInfo
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    // http://localhost:3000/api/jobOpening/list?martSeq=1&regions=1,2&jobkinds=1,5
    // http://localhost:3000/api/jobOpening/list?martSeq=1&regions=1,2
    // http://localhost:3000/api/jobOpening/list?martSeq=1&jobkinds=1,5
    // http://localhost:3000/api/jobOpening/list?regions=1,2&jobkinds=1,5
    // 지역, 직종으로만 나열
    async list(req, res, next) {
        const martSeq = req.query.martSeq;
        const regions = req.query.regions;
        const jobkinds = req.query.jobkinds;
        const userSeq = req.query.userSeq;
        var userOwn = req.query.userOwn;

        if (userSeq) { if (userOwn == undefined) userOwn = 'N'};
        const page = (req.query.page) ? req.query.page : 1;

        const list = await jobOpeningService.list(martSeq, userSeq, userOwn, regions, jobkinds, page, rowCount);

        res.status(200).json({
            result: 'success',
            data: list
        });    
    },

    async listResume(req, res, next) {
        const jobOpeningSeq = req.query.jobOpeningSeq;
        const page = (req.query.page) ? req.query.page : 1;

        const list = await resumeService.listForJobOpening(jobOpeningSeq, page, rowCount);

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
    }

}

