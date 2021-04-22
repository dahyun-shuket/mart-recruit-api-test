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

    // 공지사항 글을 작성할 때
    async addNoticeCreate(req, res, next) {
      
        const addNoticeCreate = await noticeService.write();

        res.status(200).json({
            result: 'success',
            data: addNoticeCreate
        })
        
    },
    // 공지사항 글을 삭제할 때
    async noticeDelete(req, res, next) {

        const noticeDelete = await noticeService.delete(req.params.SEQ);

        res.status(200).json({
            result: 'success',
            data: noticeDelete
        })
        
    },

    async noticeUpdate(req, res) {
        let body = req.body;
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
