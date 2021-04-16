// 로컬 서버
// mysqlConfig = {
//     connectionLimit : 100, 
//     host     : 'localhost',
//     user     : 'root',
//     password : 'nadolotte1',
//     port     : 3306,
//     database : 'moa_platform',
//     charset  : 'utf8'
// };

//개발 서버
//공인     host     : '13.124.26.102',
mysqlConfig = {
    connectionLimit : 100, 
    // host     : '172.31.8.134',
    host     : '13.124.26.102',
    user     : 'mrecruit',
    password : 'Ectus!2#',
    port     : 3306,
    database : 'MART_RECRUIT',
    charset  : 'utf8'
};

// mySQL pool
var mysql = require('mysql2/promise');
var mysqlPool = mysql.createPool(mysqlConfig);

module.exports = mysqlPool;
