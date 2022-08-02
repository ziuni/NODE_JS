// var mysql      = require('mysql');
// // 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'mirim',
//   database : 'company'
// });
  
// connection.connect();
  
// connection.query('SELECT * FROM products', function (error, results, fields) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(results);
// });
  
// connection.end();

// mysql
// 모듈 추출
var mysql = require('mysql');
// const { query } = require('express');

// connect database
var client = mysql.createConnection({
    user: 'root',
    password: 'mirim',
    database: 'company'
});

// database query 실행
client.query('SELECT * FROM products', function(error, result, fields){
    if(error){
        console.log('쿼리 문장에 오류가 있습니다.');
    }else{
        console.log(result);
    }
});