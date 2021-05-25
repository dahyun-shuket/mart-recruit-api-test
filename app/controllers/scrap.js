const recruitService = require('../services/recruit.js');
const scrapService = require('../services/scrap.js');
const defaultRowCount = 20;

module.exports = {
    async create(req, res, next) {
        const userSeq = req.body.userSeq;
        const recruitSeq = req.body.recruitSeq;

        const result = await scrapService.create(userSeq, recruitSeq);

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
        const userSeq = req.body.userSeq;
        const recruitSeq = req.body.recruitSeq;

        const result = await scrapService.remove(userSeq, recruitSeq);

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
    async removeSeq(req, res, next) {
        const seq = req.body.seq;

        const result = await scrapService.removeSeq(seq);

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

    async list(req, res, next) {
        const userSeq = req.body.userSeq;
        
        const list = await recruitService.list(null, 'Y', null, null, null, null, null, null, null, userSeq, 1, 100);

        res.status(200).json({
            result: 'success',
            data: {
                list: list
            }
        });    
    },

}

