const martService = require('../services/mart.js');
const rowCount = 20;

module.exports = {
    async create(req, res, next) {
        const userSeq = req.body.userSeq;
        const name = req.body.name;
        const logoFile = req.body.logoFile;
        const regNo = req.body.regNo;
        const postCode = req.body.postCode;
        const address = req.body.address;
        const addressExtra = req.body.addressExtra;
        const contact = req.body.contact;
        const HROName = req.body.HROName;
        const HROContact = req.body.HROContact;
        const HRORank = req.body.HRORank;

        const result = await martService.create(userSeq, name, logoFile, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank);

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
        const name = req.body.name;
        const logoFile = req.body.logoFile;
        const regNo = req.body.regNo;
        const postCode = req.body.postCode;
        const address = req.body.address;
        const addressExtra = req.body.addressExtra;
        const contact = req.body.contact;
        const HROName = req.body.HROName;
        const HROContact = req.body.HROContact;
        const HRORank = req.body.HRORank;

        const result = await martService.update(seq, name, logoFile, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank);

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

        const result = await martService.remove(seq);

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

    async get(req, res, next) {
        const martSeq = req.query.seq;

        if (jobOPeningSeq) {

            const martInfo = await martService.get(martSeq);

            res.status(200).json({
                result: 'success',
                data: martInfo
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    },

    async list(req, res, next) {
        const page = (req.query.page) ? req.query.page : 1;

        const list = await martService.list(page, rowCount);

        res.status(200).json({
            result: 'success',
            data: list
        });    
    }


}

