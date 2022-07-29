var express = require('express');
var http = require('http');

// 익스프레스 시작
var app = express();
app.set('port', process.env.port || 4444);
var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("익스프레스 웹서버 실행 : " + app.get(('port')));
});