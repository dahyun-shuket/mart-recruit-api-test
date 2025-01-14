const martService = require('../services/mart.js');
const defaultRowCount = 20;

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
        console.log(result);
        // if (result) {
        //     res.status(200).json({
        //         result: 'success',
        //         data: result
        //     });    
        // } else {
        //     res.status(200).json({
        //         result: 'fail',
        //         data: null
        //     });    
        // }
        return res.json({
            result: "success",
            data: {
                list: result,
                // totalCount: totalCount
            }
        });
    },

    async update(req, res, next) {        
        const seq = req.body.SEQ;
        const name = req.body.NAME;
        const regNo = req.body.REGNO;
        const postCode = req.body.POSTCODE;
        const address = req.body.ADDRESS;
        const addressExtra = req.body.ADDRESSEXTRA;
        const contact = req.body.CONTACT;
        const HROName = req.body.HRONAME;
        const HROContact = req.body.HROCONTACT;
        const HRORank = req.body.HRORANK;

        
        const result = await martService.update(seq, name, regNo, postCode, address, addressExtra, contact, HROName, HROContact, HRORank);

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

    async updateLogo(req, res, next) {        
        const seq = req.body.SEQ;
        // const location = req.body.location;
        const logoFile = req.body.LOGOFILE
        // const logoFile = location+"/"+testLogoFile;
        // console.log("location ? ? ? ? ? ? ?" + location)
        // martlogo
        // console.log("location ? ? ? ? ? ? ?" + req.app.get('mediaPath'))
        // C:/Users/yydh5/OneDrive/문서/mart-recruit-api/PDSData/
        
        console.log("logoFilelogoFilelogoFile ? ? ? ? ? " + logoFile)
        const result = await martService.updateLogo(req.app.get('mediaPath'), seq, logoFile);

        // if (result) {
        //     res.status(200).json({
        //         result: 'success',
        //         data: result
        //     });    
        // } else {
        //     res.status(200).json({
        //         result: 'fail',
        //         data: null
        //     });    
        // }

        return res.json({
            result: "success",
            data: {
                list: result,
            }
        });
    },

    async remove(req, res, next) {
        const seq = req.body.SEQ;

        const result = await martService.remove(seq);

        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })

        // if (result) {
        //     res.status(200).json({
        //         result: 'success',
        //         data: result
        //     });    
        // } else {
        //     res.status(200).json({
        //         result: 'fail',
        //         data: null
        //     });    
        // }
    },

    async get(req, res, next) {
        const martSeq = req.body.SEQ;

        const result = await martService.get(martSeq);

        res.json({
            result: (result === null) ? 'fail' : 'success',
            data: result
        })

        // if (martSeq) {

        //     const martInfo = await martService.get(martSeq);

        //     res.status(200).json({
        //         result: 'success',
        //         data: martInfo
        //     });    
        // } else {
        //     res.status(200).json({
        //         result: 'fail',
        //         data: null
        //     });    
        // }
    },

    async getByUser(req, res, next) {
        const userSeq = req.body.userSeq;

        if (userSeq) {

            const martInfo = await martService.getByUser(userSeq);

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
        const page = (req.body.page) ? req.body.page : 1;
        const rowCount = (req.body.rowCount) ? req.body.rowCount * 1 : defaultRowCount;
        let name = req.body.NAME;
        let regno = req.body.REGNO;
        const totalCount = await martService.totalCount(req.query.name);
        const list = await martService.list(name, regno, page, rowCount);

        res.status(200).json({
            result: 'success',
            data: {
                totalCount: totalCount,
                list: list
            }
        });    
    },

    async reactlist(req, res, next) {
        let seq = req.body.SEQ;
        let name = req.body.NAME;
        let regno = req.body.REGNO;

        const totalCount = (seq) ? 0 : await martService.totalCount(name);
        const list = await martService.reactlist(seq, name, regno);

        res.status(200).json({
            result:'success',
            data: {
                totalCount: totalCount,
                list: list
            }
        })
    },

    async createJobRequest(req, res, next) {
        const martSeq = req.body.martSeq;
        const userSeq = req.body.userSeq;

        const result = await martService.createJobRequest(martSeq, userSeq);

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

    async getJobRequest(req, res, next) {
        const martSeq = req.body.martSeq;
        const userSeq = req.body.userSeq;

        const result = await martService.getJobRequest(martSeq, userSeq);

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

    async removeJobRequest(req, res, next) {
        const martSeq = req.body.martSeq;
        const userSeq = req.body.userSeq;

        const result = await martService.removeJobRequest(martSeq, userSeq);

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

    async listJobRequest(req, res, next) {
        const userSeq = req.body.userSeq;

        const result = await martService.listJobRequest(userSeq);

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

    // 사업자 번호 중복 체크
    async checkregno(req, res) {
        let bizNo = req.body.bizNo;
        let checkregno = await martService.checkregno(bizNo)

        if (checkregno) {
            res.status(200).json({
                result: 'success',
                data: checkregno
            });    
        } else {
            res.status(200).json({
                result: 'fail',
                data: null
            });    
        }
    }
}

