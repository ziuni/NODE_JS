const http = require("http");
const fs = require("fs");

http.createServer(function(req, res){
    fs.readFile("./html/index.html", function(error, data){
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.end(data);
    })
})
.listen(4444, () => {
    console.log("4444번 포트에서 대기중입니다.")
})