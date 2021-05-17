const logger = require('../config/logger.js');
const mime = require('mime-types');
const fs = require('fs');
const fileStorageService = require('../services/fileStorage.js');

module.exports = {
    async getFile(req, res, next) {
        const seq = req.params.SEQ;
        
        // 파일 정보를 얻어온다        
        const fileInfo = await fileStorageService.get(seq);
        
        // 파일을 읽어서 스트림으로 전달. 다이렉트로 파일이 접근되는 것을 방지
        if (fileInfo) {
            fileFullPath = req.app.get('mediaPath') + 'uploads/' + fileInfo.LOCATION + '/' + fileInfo.FILENAME;
            if (fs.existsSync(fileFullPath)) {  
                const mimetype = mime.lookup(fileFullPath); // => 'application/zip', 'text/plain', 'image/png' 등을 반환    

                res.setHeader('Content-disposition', 'attachment; filename=' + fileInfo.FILENAME ); //origFileNm으로 로컬PC에 파일 저장
                res.setHeader('Content-type', mimetype);

                var filestream = fs.createReadStream(fileFullPath);
                filestream.pipe(res);
            };

        }
    }
}