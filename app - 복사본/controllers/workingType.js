const workingTypeService = require('../services/workingType.js');

module.exports = {
    // 직종 생성
    async create(req, res, next) {
        const workingTypeName = req.body.workingType;

        await workingTypeService.create(workingTypeName);

        res.status(200).json({
            result: 'success'
        });
    },

    // 직종 업데이트
    async update(req, res, next) {
        const workingTypeSeq = req.body.seq;
        const workingTypeName = req.body.workingType;

        await workingTypeService.update(workingTypeSeq, workingTypeName);

        res.status(200).json({
            result: 'success'
        });
    },

    // 직종 삭제
    async remove(req, res, next) {
        const workingTypeSeq = req.body.seq;

        const result = await workingTypeService.remove(workingTypeSeq);

        res.status(200).json({
            result: 'success',
            data: result
        });
    },

    // 직종 리스트
    async list(req, res, next) {
        const list = await workingTypeService.list();

        res.status(200).json({
            result: 'success',
            data: list
        });
    }


}

