const router = require('../../routes/notice.js');
const logger = require('../config/logger.js');
const { get } = require('../models/notice.js');
// models 에서 db 호출함
var noticeService = require("../services/notice.js");
const defaultRowCount = 5;

module.exports = {

    // 공지사항 리스트
    async list(req, res, next) {

        const seq = req.body.SEQ;
        const page = (req.query.page) ? req.query.page : 1;
        const rowCount = (req.query.rowCount) ? req.query.rowCount : defaultRowCount;
        
        const totalCount = await noticeService.totalCount();
        const list = await noticeService.list(seq, page, rowCount);
        res.status(200).json({
            result: 'success',
            data: {
                totalCount: totalCount,
                list: list,
            }
            
        });    
    },


    // 공지사항 내용 자세히 보기
   async view(req, res, next) {

        const seq = req.body.SEQ;
        const noticeData = await noticeService.views(seq);

        res.status(200).json({
            result: 'success',
            data: noticeData
        });
    },

    // 공지사항 글을 삭제할 때
    async remove(req, res, next) {

        const seq = req.body.SEQ;
        const noticeDelete = await noticeService.remove(seq);
        
        res.status(200).json({
            result: 'success',
            data: noticeDelete
        })
        
    },

     // 공지사항 글을 작성할 때
    async create(req, res, next) {

        const body = req.body;
        const addNoticeCreate = await noticeService.create(body);

        res.status(200).json({
            result: 'success',
            data: addNoticeCreate
        })
        
    },


    // 공지사항 글을 수정할때
    async update(req, res, next) {

        const seq = req.body.seq;
        const noticeUpdate = await noticeService.update(seq);

        res.status(200).json({
            result: 'success',
            data: noticeUpdate
        })
        
    },

    async get(req, res, next) {

        const body = req.query.seq;
        const noticeInfo = await noticeService.get(body);

        res.status(200).json({
            result:'success',
            data: noticeInfo
        })
        console.log(noticeInfo);
    }


    




} //end
