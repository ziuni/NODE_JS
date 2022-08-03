// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var static = require('serve-static');
var fs = require('fs');
var app = express();
app.set('port', process.env.PORT || 4444);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
// public 폴더를 static으로 오픈
app.use('/public', static(path.join(__dirname, 'public')));

// 라우터 사용하여 라우팅 함수 등록
var router = express.Router();
// 메모 저장을 위한 라우팅 함수
router.route('/process/save').post(function(req, res) {
	console.log('/process/save  라우터 호출됨.');
	try {
		var paramAuthor = req.body.author;
        var paramContents = req.body.contents;
		var paramCreateDate = req.body.date;
		console.log('작성자 : ' + paramAuthor);
		console.log('내용 : ' + paramContents);
		console.log('일시 : ' + paramCreateDate);
        res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
        res.write(paramContents+'<p>메모가 저장되었습니다.</p>');
		res.write('<div><input type="button" value="다시 작성" onclick="javascript:history.back()"></div>');
        res.end();
	} catch(err) {
		console.log(err);
	}			
});
app.use('/', router);

// 웹서버 시작
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('익스프레스 웹서버 실행:'+app.get('port'));
});
