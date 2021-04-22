const jobOpeningService = require('../services/jobOpening.js');
const rowCount = 20;

module.exports = {
    async create(req, res, next) {
        const martSeq = req.body.martSeq;
        const subject = req.body.subject;
        const HRONname = req.body.HRONname;
        const HROContact = req.body.HROContact;
        const jobKind_Seq = req.body.jobKind_Seq;
        const carrer_Seq = req.body.carrer_Seq;
        const expYear = req.body.expYear;
        const charge = req.body.charge;
        const jobRank = req.body.jobRank;
        const preferential = req.body.preferential;
        const education = req.body.education;
        const salaryType = req.body.salaryType;
        const salary = req.body.salary;
        const workingType_Seq = req.body.workingType_Seq;
        const probationTerm = req.body.probationTerm;
        const workShift = req.body.workShift;
        const worshiftTime = req.body.worshiftTime;
        const workRegion_Seq = req.body.workRegion_Seq;
        const gender = req.body.gender;
        const age = req.body.age;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const hiringStep = req.body.hiringStep;
        const requireDocs = req.body.requireDocs;

        const result = await jobOpeningService.create(martSeq, subject, HRONname, HROContact, jobKind_Seq, carrer_Seq, expYear, charge, jobRank, preferential, education, salaryType, salary,
            workingType_Seq, probationTerm, workShift, worshiftTime, workRegion_Seq, gender, age, startDate, endDate, hiringStep, requireDocs);

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
        const jobKind_Seq = req.body.jobKind_Seq;
        const carrer_Seq = req.body.carrer_Seq;
        const expYear = req.body.expYear;
        const charge = req.body.charge;
        const jobRank = req.body.jobRank;
        const preferential = req.body.preferential;
        const education = req.body.education;
        const salaryType = req.body.salaryType;
        const salary = req.body.salary;
        const workingType_Seq = req.body.workingType_Seq;
        const probationTerm = req.body.probationTerm;
        const workShift = req.body.workShift;
        const worshiftTime = req.body.worshiftTime;
        const workRegion_Seq = req.body.workRegion_Seq;
        const gender = req.body.gender;
        const age = req.body.age;
        const startDate = req.body.startDate;
        const endDate = req.body.endDate;
        const hiringStep = req.body.hiringStep;
        const requireDocs = req.body.requireDocs;

        const result = await jobOpeningService.update(seq, subject, HRONname, HROContact, jobKind_Seq, carrer_Seq, expYear, charge, jobRank, preferential, education, salaryType, salary,
            workingType_Seq, probationTerm, workShift, worshiftTime, workRegion_Seq, gender, age, startDate, endDate, hiringStep, requireDocs);

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
    async list(req, res, next) {
        const martSeq = req.query.martSeq;
        const regions = req.query.regions;
        const jobkinds = req.query.jobkinds;

        const page = (req.query.page) ? req.query.page : 1;

        const list = await jobOpeningService.list(martSeq, regions, jobkinds, page, rowCount);

        res.status(200).json({
            result: 'success',
            data: list
        });    
    }


}

