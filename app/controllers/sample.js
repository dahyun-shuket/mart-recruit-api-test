const numeral = require('numeral');
const sampleService = require('../services/sample.js');

module.exports = {
    async sample(req, res, next) {
        
        let sampleInfo = await sampleService.get(req.body.code);

        res.status(200).json({
            result: 'success',
            resultData: sampleInfo
        });
    }
}

