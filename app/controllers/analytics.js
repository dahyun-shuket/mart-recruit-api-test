const analyticsService = require('../services/analytics.js');

module.exports = {
    async getDashboard(req, res, next) {
        const result = await analyticsService.getDashboard();

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

}

