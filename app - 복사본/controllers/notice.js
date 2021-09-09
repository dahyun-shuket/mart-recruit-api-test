const router = require('../../routes/notice.js');
const logger = require('../config/logger.js');
const { get } = require('../models/notice.js');
const { check, validationResult } = require('express-validator');
// models 에서 db 호출함
var noticeService = require("../services/notice.js");

const defaultRowCount = 5;

module.exports = {

    // 공지사항 리스트
    async list(req, res, next) {

        const page = (req.body.page) ? req.body.page : 1;

        const rowCount = (req.body.rowCount) ? req.body.rowCount * 1 : defaultRowCount;
        
        const totalCount = await noticeService.totalCount();

        const list = await noticeService.listId(page, rowCount);
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
            result: (noticeData == null) ? 'fail' : 'success',
            data: noticeData
        });
    },

    // 공지사항 글을 삭제할 때
    async remove(req, res, next) {

        const seq = req.body.SEQ;
        const noticeDelete = await noticeService.remove(seq);
        
        res.status(200).json({
            result: (noticeDelete == null) ? 'fail' : 'success',
            data: noticeDelete
        });
        
    },

     // 공지사항 글을 작성할 때
    async create(req, res, next) {

        await check('SUBJECT')
            .isLength({  max: 50 })
            .trim()
            .notEmpty()
            .run(req);
        await check('CONTENT')
            .isLength({  max: 1970 })
            .notEmpty()
            .custom( (value) => '<p><br></p>' !== value )
            .run(req);

        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.json({
                errors: result.array()
            });
            return;
        }
        const subject = req.body.SUBJECT;
        const content = req.body.CONTENT;
        const userSeq = req.body.USER_SEQ;

        const addNoticeCreate = await noticeService.create(userSeq, subject, content);

        res.status(200).json({
            result: (addNoticeCreate == null) ? 'fail' : 'success',
            data: addNoticeCreate
        });
        
    },


    // 공지사항 글을 수정할때
    async update(req, res, next) {

        await check('SUBJECT')
            .isLength({  max: 50 })
            .trim()
            .notEmpty()
            .run(req);
        await check('CONTENT')
            .isLength({  max: 1970 })
            .notEmpty()
            .custom( (value) => '<p><br></p>' !== value )
            .run(req);

        const result = validationResult(req);
        if (!result.isEmpty()) {
            res.json({
                errors: result.array()
            });
            return;
        }

        const seq = req.body.SEQ;
        const userSeq = req.body.USER_SEQ;
        const subject = req.body.SUBJECT;
        const content = req.body.CONTENT;

        const noticeUpdate = await noticeService.update(seq, userSeq, subject, content);
        
        res.status(200).json({
            result: (noticeUpdate == null) ? 'fail' : 'success',
            data: noticeUpdate
        });


        
    },

    // 수정하기전 공지사항 정보 갖고 오기
    async get(req, res, next) {

        const seq = req.body.SEQ;
        const noticeInfo = await noticeService.get(seq);

        res.status(200).json({
            result: (noticeInfo == null) ? 'fail' : 'success',
            data: noticeInfo
        });
        console.log(noticeInfo);
    }


    




} //end
