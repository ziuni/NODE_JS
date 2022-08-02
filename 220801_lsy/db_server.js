// 모듈을 추출합니다.
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
  user: 'root',
  password: 'mirim',
  database: 'company'
});

// 서버를 생성합니다.
var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

// 서버를 실행합니다.
app.listen(4444, function () {
  console.log('server running at http://127.0.0.1:4444');
});

// database query 실행
client.query('SELECT * FROM products', function(error, result, fields){
  if(error){
      console.log('쿼리 문장에 오류가 있습니다.');
  }else{
      console.log(result);
  }
});

// 라우트를 수행합니다.
app.get('/', function (request, response) {
  // 파일을 읽습니다.
  fs.readFile('list.html', 'utf8', function (error, data) {
    // 데이터베이스 쿼리를 실행합니다.
    client.query('SELECT * FROM products', function (error, results) {
      // 응답합니다.
      response.send(ejs.render(data, {
        data: results
      }));
    });
  });
});


///// 데이터삭제 
app.get('/delete/:id',function(req,res){
    client.query('delete from products where id=?',[req.params.id],
    function(){
        res.redirect('/');
    });
});
///// 데이터추가
app.get('/insert', function(req,res) {
    fs.readFile('insert.html', 'utf8', function(err, data) {
        res.send(data);
    });
});
app.post('/insert',function(req,res){
    var body = req.body
    client.query('insert into products (name, modelnumber, series) values (?, ?, ?)',
    [body.name, body.modelnumber, body.series],function(){
        res.redirect('/');
    });
});
///// 데이터수정 get
app.get('/update/:id', function(req,res) {
    fs.readFile('update.html', 'utf8', function(err, data) {
        client.query('select * from products where id = ?',[
            req.params.id
        ], function(err, results) {
            res.send(ejs.render(data, {
                data:results[0]
            }));
        })
    });
});
app.post('/update/:id', function(req,res){
    var body = req.body
    client.query('update products set name = ?, modelnumber = ?, series = ? where id = ?',
    [body.name, body.modelnumber, body.series, req.params.id],function(){
        res.redirect('/');
    });
});