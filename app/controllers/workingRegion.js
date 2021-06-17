const workingRegionService = require('../services/workingRegion.js');

module.exports = {
    // 업무지역 생성
    async create(req, res, next) {
        const workingRegionName = req.body.workingRegion;

        await workingRegionService.create(workingRegionName);

        res.status(200).json({
            result: 'success'
        });
    },

    // 업무지역 업데이트
    async update(req, res, next) {
        const workingRegionSeq = req.body.seq;
        const workingRegionName = req.body.workingRegion;

        await workingRegionService.update(workingRegionSeq, workingRegionName);

        res.status(200).json({
            result: 'success'
        });
    },

    // 업무지역 삭제
    async remove(req, res, next) {
        const workingRegionSeq = req.body.seq;

        const result = await workingRegionService.remove(workingRegionSeq);

        res.status(200).json({
            result: 'success',
            data: result
        });
    },

    // 업무지역 리스트
    async list(req, res, next) {
        const list = await workingRegionService.list();

        res.status(200).json({
            result: 'success',
            data: list
        });
    }


}

