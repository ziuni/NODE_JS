// npm install http -g
// 서버를 생성
// var server = require("http").createServer()
// const http = require("http")
// http.createServer((req, res) => {
//     res.writeHead(200, {"Content-Type" : "text/html; charset=utf-8"})
//     res.write("<h1> Hello node.js</h1>")
//     res.end("<p> Hello Server </p>")
// })
// .listen(4444, () => {
//     console.log("4444번 포트에서 서버 대기중")
// })

// // 서버 객체에 이벤트 연결
// server.on("request", function(code){
//     console.log("Request on...")
// })
// server.on("connection", function(code){
//     console.log("Connection on...")
// })

// // 서버를 실행
// server.listen(4444, function(){
//     console.log("4444번 포트에서 대기중...")
// })
// var test = function(){
//     server.close();
// }
// setTimeout(test, 5000) //5초 후에 종료

// // 예외처리한 파일 읽기
// const http = require("http");
// const fs = require("fs");

// http.createServer(function(req, res){
//     try{
//         fs.readFile("./html/index.html", function(error, data){
//         res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
//         res.end(data);
//     })
//     }
//     catch(err){
//         console.log(err);
//         res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
//         res.end(err)
//     }
// })
// .listen(4444, () => {
//     console.log("4444번 포트에서 대기중입니다.")
// })

// // 이미지 파일
// // 모듈 추출
// const http = require("http");
// const fs = require("fs");

// http.createServer(function(req, res){
//     try{
//         fs.readFile("./media/kitty_pajama.jpg", function(error, data){
//         res.writeHead(200, {'Content-Type' : 'image/jpeg'});
//         res.end(data);
//     })
//     }
//     catch(err){
//         console.log(err);
//         res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
//         res.end(err)
//     }
// })
// .listen(4444, function () {
//     console.log("4444번 포트에서 대기중입니다.")
// })


// // 음악 파일
// const http = require("http");
// const fs = require("fs");


// http.createServer(function(req, res){
//     fs.readFile("./media/aespa_.wav", function(error, data){
//     res.writeHead(200, {'Content-Type' : 'audio/mp3'});
//     res.end(data);
//     })
// })
// .listen(4444, function () {
//     console.log("4444번 포트에서 대기중입니다.")
// })


// // 쿠키저장
// var http = require("http")
// http.createServer(function(request, response){
//     var date = new Date();
//     date.setDate(date.getDate() + 7);
//     response.writeHead(200, {
//         'Content-Type' : 'text/html',
//         'Set-Cookie' : ['breakfast = toast', 'dinner = chicken']
//     });
//     response.end('<h1>' + request.headers.cookie + '</h1>');
// }).listen(4444, function() {
//     console.log("4444번 포트에서 서버 대기중입니다.")
// });


// // page move
// var http = require('http');
// http.createServer(function(request, response){
//     response.writeHead(302, {'Location' : 'https://gametest.emirim.kr/tobankto/'});
//     response.end();
// }).listen(4444, function() {
//     console.log("4444번 포트에서 서버 대기중입니다.")
// })

var http = require('http');
var fs = require('fs');
var url = require('url');

// 서버 생성
http.createServer(function (req, res){
    var pathname = url.parse(req.url).pathname;
    if(pathname == '/'){
        fs.readFile('./html/index.html', function(err, data){
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        });
    }else if(pathname == '/other'){
        fs.readFile('./html/other.html', function(err, data){
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        });
    }
}).listen(4444, function() {
    console.log("4444번 포트에서 서버 대기중입니다.")
})