const jobKindService = require('../services/jobKind.js');

module.exports = {
    async create(req, res, next) {
        const jobKindName = req.body.jobKind;

        await jobKindService.create(jobKindName);

        res.status(200).json({
            result: 'success'
        });
    },

    async update(req, res, next) {
        const jobKindSeq = req.body.seq;
        const jobKindName = req.body.jobKind;

        await jobKindService.update(jobKindSeq, jobKindName);

        res.status(200).json({
            result: 'success'
        });
    },

    async remove(req, res, next) {
        const jobKindSeq = req.body.seq;

        const result = await jobKindService.delete(jobKindSeq);


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

