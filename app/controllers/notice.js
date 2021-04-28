const router = require('../../routes/notice.js');
const logger = require('../config/logger.js');
// models 에서 db 호출함
var noticeService = require("../services/notice.js");


module.exports = {

    // 공지사항 정보가져오기 
    async noticeList(req, res, next) {

        const noticeList = await noticeService.list();

        res.status(200).json({
            result: 'success',
            data: noticeList
        });
        
    },

    // 공지사항 내용 자세히 보기
    async noticeView(req, res, next) {
        //const body = req.body;
        //console.log(req.params.SEQ);
        const seq = req.params.SEQ;
        const noticeView = await noticeService.views(seq);

        res.status(200).json({
            result: 'success',
            data: noticeView
        });
    },

    // 공지사항 글을 작성할 때
    async addNoticeCreate(req, res, next) {
        const body = req.body;
        console.log(body);
        console.log("프론트에서 들어온 바디" + JSON.stringify(body));
        const addNoticeCreate = await noticeService.create(body);

        res.status(200).json({
            result: 'success',
            data: addNoticeCreate
        })
        
    },
    // 공지사항 글을 삭제할 때
    async noticeDelete(req, res, next) {
        const body = req.params.SEQ;
        const noticeDelete = await noticeService.remove(body);
        
        res.status(200).json({
            result: 'success',
            data: noticeDelete
        })
        
    },
    // 공지사항 글을 수정할때
    async noticeUpdate(req, res, next) {
        const body = req.body;
        console.log(JSON.stringify(body));
        console.log("body ? ? ? :  " + body);
        const noticeUpdate = await noticeService.update(body);
        //console.log(SUBJECT, CONTENT, USER_SEQ, MODIFIED);
        res.status(200).json({
            result: 'success',
            data: noticeUpdate
        })
        
    }






} //end
