const jobKindService = require('../services/jobKind.js');

module.exports = {
    async create(req, res, next) {
        const jobKindName = req.query.jobKind;

        await jobKindService.create(jobKindName);

        res.status(200).json({
            result: 'success'
        });
    },

    async update(req, res, next) {
        const jobKindSeq = req.query.seq;
        const jobKindName = req.query.jobKind;

        await jobKindService.update(jobKindSeq, jobKindName);

        res.status(200).json({
            result: 'success'
        });
    },

    async remove(req, res, next) {
        const jobKindSeq = req.query.seq;

        const result = await jobKindService.remove(jobKindSeq);

        res.status(200).json({
            result: 'success',
            data: result
        });
    },

    async list(req, res, next) {
        const list = await jobKindService.list();

        res.status(200).json({
            result: 'success',
            data: list
        });
    }


}

