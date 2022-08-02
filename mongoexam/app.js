// Express 기본 모듈 불러오기
var express = require('express');
var http = require('http');
var path = require('path');

// Express의 미들웨어 불러오기
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var static = require('serve-static');
var errorHandler = require('errorhandler');

// 에러 핸들러 모듈 사용
var expressErrorHandler = require('express-error-handler');

// Session 미들웨어 불러오기
var expressSession = require('express-session');
const { Router } = require('express');

// 익스프레스 객체 생성
var app = express();

app.set('port', process.env.PORT || 4444);

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/public', static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use(expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true
}));

var MongoClient = require("mongodb").MongoClient;

var database;

function connectDB() {
    var databaseUrl = "mongodb://localhost:27017//local";

    MongoClient.connect(databaseUrl, function (err, db) {
        if(err) throw err;
        console.log('데이터베이스에 연결되었습니다.:'+databaseUrl);
        database=db;

    });
}

var router = express.Router();

// 로그인 라우팅
router.route('/process/login').post(function (req, res) {
    console.log('/process/login 호출됨');

    // 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터: '+paramId+', '+paramPassword);

    // authUser 함수 호출하여 사용자 인증
	if (database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			if (err) {throw err;}
			
            // 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);
                var username=docs[0].name;
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			
			} else {  // 조회된 레코드가 없는 경우 실패 응답 전송
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.end();
			}
		});
	} else {  // 데이터베이스 객체가 초기화되지 않은 경우 실패 응답 전송
		res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
		res.end();
	}
	
});

app.use('/', router);

var authUser=function(database, id, password, callback){
    console.log('authUser 호출됨:'+id+', '+password);

    var users=database.collection('users');

    users.find({"id":id, "password":password}).toArray(function(err,docs){
        if(err){
            callback(err,null);
            return;
        }

        if(docs.length>0){
            console.log('아이디 [%s], 패스워드 [%s]가 일치하는 사용자 찾음.', id, password);
        }else{
            console.log('일치하는 사용자를 찾지 못함.');
            callback(null,null);
        }
    });
}

var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404error.html'
    }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);



// Express 서버 시작
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    connectDB();
});