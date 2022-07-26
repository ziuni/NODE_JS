// 이미지 파일
// 모듈 추출
const http = require("http");
const fs = require("fs");

http.createServer(function(req, res){
    try{
        fs.readFile("./media/frog.gif", function(error, data){
        res.writeHead(200, {'Content-Type' : 'image/jpeg'});
        res.end(data);
    })
    }
    catch(err){
        console.log(err);
        res.writeHead(500, {'Content-Type' : 'text/html; charset=utf-8'})
        res.end(err)
    }
})
.listen(4444, function () {
    console.log("4444번 포트에서 대기중입니다.")
})