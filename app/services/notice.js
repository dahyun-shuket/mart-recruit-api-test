const { promiseImpl } = require('ejs');
const logger = require('../config/logger.js');
// model 전체 데이터 가져오기
var noticeModel = require("../models/notice");

module.exports = class noticeService {

    // 공지사항 리스트
    static listId(page, rowCount) {
        return new Promise(function(resolve, reject) {
            try {
                var offset = (page - 1) * rowCount;
                
                //let result = noticeModel.list(seq, rowCount, offset);
                let result = noticeModel.listId(rowCount, offset);
                //console.log(result);
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/noticeService/list : ${error}`);           
            }
        })
    }

    // 공지사항 totalCount
    static totalCount() {
        return new Promise(function(resolve, reject) {
        
            try {
                let result = noticeModel.totalCount();
                logger.writeLog('error', `services/noticeService/totalCount : ${result}`); 
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/noticeService/totalCount : ${error}`);           
            }
        })
    }

    
    // 공지사항 자세히 보기
    static views(seq) {
        return new Promise(function(resolve, reject) {
            
            try {
               
                let noticeView = noticeModel.views(seq);
                resolve(noticeView);
                
            } catch (error) {
                logger.writeLog('error', `servies/noticeService/views: ${error}`);
            }
        });
    }

   // 공지사항 추가
    static create(body) {
        return new Promise(function(resolve, reject) {
            
            try {
                
                let addNoticeCreate = noticeModel.create(body);
                resolve(addNoticeCreate);
                
            } catch (error) {
                logger.writeLog('error',`services/noticeService/write: ${error}`);  
            }
        });
    }
    
    // 공지사항 삭제
    static remove(seq) {
        return new Promise(function(resolve, reject) {
            
            try {

                let noticeDelete = noticeModel.remove(seq);
                resolve(noticeDelete);
                
            } catch (error) {
                logger.writeLog('error',`services/noticeService/remove: ${error}`);  
            }
        });
    }

    // 공지사항 수정
    static update(seq, userSeq, subject, content) {
        return new Promise(function(resolve, reject) {
            
            try {
                let noticeUpdate = noticeModel.update(seq, userSeq, subject, content);
                resolve(noticeUpdate);
                
            } catch (error) {
                logger.writeLog('error',`services/noticeService/update: ${error}`);  
            }
        });
    }


    static get(seq) {
        return new Promise(function(resolve, reject) {
            try {
                let result = noticeModel.get(seq);
    
                resolve(result);
            } catch (error) {
                logger.writeLog('error', `services/noticeService/get: ${error}`);           
            }
        })
    }


    
};

