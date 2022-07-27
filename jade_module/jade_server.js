var http = require("http");
var jade = require("jade");
var fs = require('fs');

http.createServer(function(req, res){
    fs.readFile("jadepage02.jade", 'utf8', function(error, data){
        var fn = jade.compile(data);
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
        res.end(fn());
    })
})
.listen(4444, function () {
    console.log("4444번 포트에서 대기중입니다.")
})