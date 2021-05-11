var express = require('express');
var app = express();
var router = express.Router();

const {  remove, create,  update, view, list, get } = require('../app/controllers/notice.js');

// 공지사항 리스트 페이지
router.post('/list', list);

// 공지사항 보기 페이지
router.post('/view', view);

// 공지사항 삭제 
router.post('/remove', remove);

// 공지사항 글 작성 페이지  
router.post('/create', create);  
  
// 공지사항 수정 페이지
router.post('/update', update);

router.post('/get', get);



module.exports = router;