// const http = require("http");
// const fs = require("fs");
// var ejs = require('ejs');

// http.createServer(function(req, res){
//     fs.readFile("ejsPage.ejs", 'utf8', function(error, data){
//         res.writeHead(200, {'Content-Type' : 'text/html'});
//         res.end(ejs.render(data));
//     })
// })
// .listen(4444, () => {
//     console.log("4444번 포트에서 대기중입니다.")
// })


const http = require("http");
const fs = require("fs");
var ejs = require('ejs');

http.createServer(function(req, res){
    fs.readFile("ejsPage02.ejs", 'utf8', function(error, data){
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(ejs.render(data, {
            name: 'funny_node.js',
            description: 'Hello ejs With Node.js ... !'
        }));
    })
})
.listen(4444, function () {
    console.log("4444번 포트에서 대기중입니다.")
})