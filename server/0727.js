// var http = require('http')

// http.createServer(function(request, response){
//     var date= new Date()
//     date.setDate(date.getDate() + 7)
//     response.writeHead(200, {
//         'Content-Type' : 'text/html',
//         'Set=Cookie' : ['breakfast = toast; Expire = ' + date.toUTCString(), 'dinner = chicken']
//     })
//     response.end('<h1>' + JSON.stringify(request.headers.cookie) + '</h1>')
// }).listen(4444, function(){
//     console.log('4444번 포트에서 서버 대기 중')
// })

// var http = require('http');
// var fs = require('fs');
// var url = require('url');

// // 서버 생성
// http.createServer(function (req, res){
//     var pathname = url.parse(req.url).pathname;
//     if(pathname == '/index'){
//         fs.readFile('./html/0727.html', function(err, data){
//             res.writeHead(200, {'Content-Type' : 'text/html'});
//             res.end(data);
//         });
//     }else if(pathname == '/other'){
//         fs.readFile('./html/other.html', function(err, data){
//             res.writeHead(200, {'Content-Type' : 'text/html'});
//             res.end(data);
//         });
//     }
// }).listen(4444, function() {
//     console.log("4444번 포트에서 서버 대기중입니다.")
// })


// var http = require('http');
// var fs = require('fs');
// const { url } = require('inspector');
// var server = http.createServer(function(request, response){
//     var url = request.url
//     if(request.url == '/'){
//         url = '/html/index1.html';
//     }
//     if(request.url == '/html/1.html'){
//         return response.writeHead(404);
//         // url = 'html/other.html';
//     }
//     response.writeHead(200);
//     response.end(fs.readFileSync(__dirname + url));
// })
// server.listen(4444, () => {
//     console.log('4444번 포트에서 대기중')
//     console.log(__dirname + ' ' + url)
// })

// // get요청방식
// var http = require('http');
// var url = require('url');

// http.createServer(function(req, res){
//     var query = url.parse(req.url, true).query

//     res.writeHead(200, {'Content-Type' : 'text/html'});
//     res.end('<h1>' + JSON.stringify(query) + '</h1>');
// }).listen(4444, function(){
//     console.log('4444번 포트에서 서버 대기중입니다.')
// })


// post 요청방식
var http = require('http');
var fs = require('fs');

http.createServer(function(req, res){
    if(req.method == 'GET'){
        // get 요청
        fs.readFile('test.html', function(error, data){
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end(data);
        });
    } else if(req.method == 'POST'){
        // post 요청
        req.on('data', function(data){
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end('<h1>' + data + '</h1>');
        });
    }
}).listen(4444, function(){
    console.log('4444번 포트에서 서버 대기중입니다.')
})