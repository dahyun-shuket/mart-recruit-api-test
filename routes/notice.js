var express = require('express');
var app = express();
var router = express.Router();

const { noticeList, noticeDelete, addNoticeCreate,  noticeUpdate, noticeView } = require('../app/controllers/notice.js');

// 공지사항 리스트 페이지
router.get('/list', noticeList);

// 공지사항 보기 페이지
router.get('/view/:SEQ', noticeView);

// 공지사항 삭제 
router.get('/remove/:SEQ', noticeDelete);

// 공지사항 글 작성 페이지  
router.post('/create', addNoticeCreate);  
  
// 공지사항 수정 페이지
router.post('/update/:SEQ', noticeUpdate);



module.exports = router;