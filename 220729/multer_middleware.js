/* 
[세션]
- 쿠키는 클라이언트 웹 브라우저에 저장되는 정보, 세션은 웹 서버에 저장되는 정보
- 웹서버에서 요청 객체에 세션을 설정하면 유지된다 (req.session.세션이름 = 세션객체)
*/
var express = require('express');
var http = require("http");
var bodyParser = require('body-parser'); 
var path = require("path");
var static = require('serve-static');
var expressSession = require('express-session'); // 세션 추가
var app = express();
app.set('port', process.env.PORT || 4444); 

// 파일 업로드용 미들웨어
var multer = require('multer');
var fs = require('fs');

// 클라이언트에서 ajax로 요청 시 cors(다중서버접속) 지원
var cors = require('cors');
// npm install multer --save
// npm install cors --save

app.use('/media', static(path.join(__dirname, 'media')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// 세션 사용
app.use(expressSession({
    secret : 'meLLong',
    resave :true,
    saveUninitialized:true
}));

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'upload')
    },
    filename: function(req, file, callback){
        callback(null, file.originalname + Date.now())
    }
});

var upload = multer({
    storage: storage,
    limits: {
        files: 10,
        fileSize: 1024*1024*1024
    }
});

// 파일 업로드 라우팅 함수 - 로그인 후 세션 저장
router.route('/process/photo').post(upload.array('photo', 1), function(req, res) {
    console.log("/process/photo 호출됨")
    var files = req.files;
});

console.log("====================업로드된 파일====================")
if(files.length > 0){
    console.dir(files[0]);
}

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 서버를 시작합니다 : '+app.get('port'));
});