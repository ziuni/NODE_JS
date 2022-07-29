var express = require('express');
var http = require('http');
var static = require('server-static');
var path = require('path');
var bodyParser = require('body-parser');

// 익스프레스 시작
var app = express();
app.set('port', process.env.port || 4444);
// static 미들웨어 사용
app.use(static(path.join(__dirname, 'media')));
// 바디파서는 post 방식의 데이터를 주고받을 수 잇다
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// 미들웨어 사용
app.use(function(req, res, next){
    console.log("첫번째 미들웨어\n");
    // 데이터를 주고 받을 수 있게 get, post 방식사용
    var useAgent = req.header('User-Agent');
    var paramPw = req.query.password;
    var paramId = req.query.id;

    res.send("<h1>서버에서 응답 User-Agent -> </h1>" + useAgent 
    + "<h2>paramID -> " + paramId + "</h2>"
    + "<h2>paramPw -> " + paramPw + "</h2>");
})

// 두번째 미들웨어 사용
app.use(function(req, res, next){
    console.log("두번째 미들웨어\n");
    // json 형태로 정의
    var student = {name:'홍길동', tel:'010-1234-5678'};
    res.send(student);
    var studentStr = JSON.stringify(student);
    // res.send(studentStr);
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    res.end(studentStr);
})

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("익스프레스 웹서버 실행 : " + app.get(('port')));
});