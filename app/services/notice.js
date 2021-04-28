const { promiseImpl } = require('ejs');
const logger = require('../config/logger.js');
// model 전체 데이터 가져오기
var noticeModel = require("../models/notice");

module.exports = class noticeService {

    // 공지사항 리스트
    static list() {
        return new Promise(function(resolve, reject) {
            console.log('services/notice/list 확인')
            try {
                
                let noticeList = noticeModel.list();

                resolve(noticeList);
                console.log('services/notice/list 정보 받기 성공');
            } catch (error) {
                logger.writeLog('error',`services/noticeService/list: ${error}`);  
            }
        });
    }
    // 공지사항 자세히 보기
    static views(body) {
        return new Promise(function(resolve, reject) {
            console.log('servies/notice/views 확인')
            try {
                let noticeView = noticeModel.views(body);

                resolve(noticeView);
                console.log('servies/notice/views 정보 받기 성공');
            } catch (error) {
                logger.writeLog('error', `servies/noticeService/views: ${error}`);
            }
        });
    }

    // 공지사항 추가
    static create(body) {
        return new Promise(function(resolve, reject) {
            console.log('services/notice/write 확인')
            try {
                console.log(body)
                let addNoticeCreate = noticeModel.create(body);

                resolve(addNoticeCreate);
                console.log('services/notice/write 정보 받기 성공');
            } catch (error) {
                logger.writeLog('error',`services/noticeService/write: ${error}`);  
            }
        });
    }
    // 공지사항 삭제
    static remove(body) {
        return new Promise(function(resolve, reject) {
            console.log('services/notice/remove 확인')
            try {

                let noticeDelete = noticeModel.remove(body);

                resolve(noticeDelete);
                console.log('services/notice/remove 정보 받기 성공');
            } catch (error) {
                logger.writeLog('error',`services/noticeService/remove: ${error}`);  
            }
        });
    }

    // 공지사항 수정
    static update(body) {
        return new Promise(function(resolve, reject) {
            console.log('services/notice/update 확인')
            try {

                let noticeUpdate = noticeModel.update(body);
                console.log(body);
                resolve(noticeUpdate);
                console.log('services/notice/update 정보 받기 성공');
            } catch (error) {
                logger.writeLog('error',`services/noticeService/update: ${error}`);  
            }
        });
    }
}

