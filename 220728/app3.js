var express = require('express');
var http = require('http');

// 익스프레스 시작
var app = express();
app.set('port', process.env.port || 4444);

// 미들웨어 사용
app.use(function(req, res, next){
    console.log("첫번째 미들웨어\n");
    // 사이트 이동
    res.redirect('https://gametest.emirim.kr/tobankto/')
    req.user = 'lee'
    req.next();
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