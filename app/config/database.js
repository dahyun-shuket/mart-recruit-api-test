// 운영 서버
// host 공인     : '54.180.66.48',
mysqlConfig = {
    connectionLimit : 100, 
    // host     : '172.31.12.29',
    host     : '54.180.66.48',
    user     : 'moadev',
    password : 'Ectus!2#',
    port     : 3306,
    database : 'moa_platform',
    charset  : 'utf8'
};

// mySQL pool
var mysql = require('mysql2/promise');
var mysqlPool = mysql.createPool(mysqlConfig);

module.exports = mysqlPool;
