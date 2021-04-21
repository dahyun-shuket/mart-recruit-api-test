const workingRegionService = require('../services/workingRegion.js');

module.exports = {
    async create(req, res, next) {
        const workingRegionName = req.query.workingRegion;

        await workingRegionService.create(workingRegionName);

        res.status(200).json({
            result: 'success'
        });
    },

    async update(req, res, next) {
        const workingRegionSeq = req.query.seq;
        const workingRegionName = req.query.workingRegion;

        await workingRegionService.update(workingRegionSeq, workingRegionName);

        res.status(200).json({
            result: 'success'
        });
    },

    async remove(req, res, next) {
        const workingRegionSeq = req.query.seq;

        const result = await workingRegionService.remove(workingRegionSeq);

        res.status(200).json({
            result: 'success',
            data: result
        });
    },

    async list(req, res, next) {
        const list = await workingRegionService.list();

        res.status(200).json({
            result: 'success',
            data: list
        });
    }


}

