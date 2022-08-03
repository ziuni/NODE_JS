var express = require('express');
var http = require("http");
var bodyParser = require('body-parser'); 
var path = require("path");
var static = require('serve-static');
var expressSession = require('express-session'); // 세션 추가
var fs = require('fs');
var app = express();

app.set('port', process.env.PORT || 4444); 

// 바디파서 설정
app.use('/media', static(path.join(__dirname, 'media')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// 세션 사용
app.use(expressSession({
    secret : 'meLLong',
    resave :true,
    saveUninitialized:true
}));

app.get('/*', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

var router = express.Router();
router.route('/process/index').post(function(req, res){
    console.log('/process/index 라우팅 함수 받음');

    // var paramAuthor = req.query.name || req.body.name;
    // var paramDate = req.query.date || req.body.date;
    var paramContents = req.query.contents || req.body.contents;

    // console.log('작성자 : ' + paramAuthor)
    // console.log('일시 : ' + paramDate)
    console.log('내용 : ' + paramContents)

    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
    res.write('<h1>나의 메모</h1>');
    res.write('<div>메모가 저장되었습니다.</div>');
    // res.write('<div>' + paramAuthor + '</div>')
    // res.write('<div>' + paramDate + '</div>')
    res.write('')
    res.write('<div>' + paramContents + '</div>')
    res.write('<div> <input type="button" value="다시 작성" onclick="javascript:history.back()"></div>');
    res.end();

    // try{
    //     var paramAuthor = req.body.author;
    //     var paramDate = req.body.date;
    //     var paramContents = req.body.contents;

    //     console.log('작성자 : ' + paramAuthor)
    //     console.log('내용 : ' + paramDate)
    //     console.log('일시 : ' + paramContents)

    //     res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
    //     res.write('<h1>나의 메모</h1>');
    //     res.write('<div>메모가 저장되었습니다.</div>');
    //     res.write('<div> <input type="button" value="다시 작성" onclick="javascript:history.back()"></div>');
    //     res.end();
    // }catch(err){
    //     console.log(err.stack);

    //     res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
    //     res.write("<div>메모 저장 에러 발생</div>")
    //     res.end();
    // }
});

app.use('/', router)

app.all('*', function(req, res){
    res.status(404).send("<h1>요청하신 페이지가 없습니다. </h1>")
})

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 서버를 시작합니다 : '+app.get('port'));
});