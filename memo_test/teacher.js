
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

// 익스프레스 객체 생성
var app = express();


// 기본 속성 설정
app.set('port', process.env.PORT || 4444);
// body-parser
app.use(bodyParser.urlencoded({ extended: false }))
// body-parser
app.use(bodyParser.json())
// public 폴더 사용
app.use('/public', static(path.join(__dirname, 'public')));
// cookie-parser 설정
app.use(cookieParser());
// 세션 설정
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));


//===== 데이터베이스 연결 =====//
// 몽고디비 모듈 사용
var MongoClient = require('mongodb').MongoClient;
// 데이터베이스 객체를 위한 변수 선언
var database;
//데이터베이스에 연결
function connectDB() {
	// 데이터베이스 연결 정보
	var databaseUrl = 'mongodb://localhost:27017/nodejs';
	
	// 데이터베이스 연결
	MongoClient.connect(databaseUrl, function(err, db) {
		if (err) throw err;
		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
		// database 변수에 할당
		// database = db;
        database = db.db('nodejs');
	});
}


//===== 라우팅 함수 등록 =====//
var router = express.Router();

// 로그인 라우팅 
router.route('/process/login').post(function(req, res) {
	console.log('/process/login 호출됨.');

    // 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);
    
    //  authUser 함수 호출하여 사용자 인증
	if (database) {
		authUser(database, paramId, paramPassword, function(err, docs) {
			if (err) {throw err;}
			
            // 조회된 레코드가 있으면 성공 응답 전송
			if (docs) {
				console.dir(docs);

                // 조회 결과에서 사용자 이름 확인
				var userid = docs[0].userid;
				var username = docs[0].username;
				var userpw = docs[0].userpw;
				res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + userid + '</p></div>');
				res.write('<div><p>사용자 닉네임 : ' + username + '</p></div>');
				res.write('<div><p>사용자 패스워드 : ' + userpw + '</p></div>');
				// res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
				res.write("<br><br><a href='/public/memo.html'>메모하기</a>");
				res.end();
			} 
            else {  // 조회된 레코드가 없는 경우 실패 응답 전송
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

router.route('/process/memo').post(function(req, res) {
	console.log('/process/memo  라우터 호출됨.');
	try {
		// var paramAuthor = req.body.author;
		var paramTitle = req.body.title;
        var paramContents = req.body.contents;
		// var paramCreateDate = req.body.date;
		// console.log('작성자 : ' + paramAuthor);
		console.log('제목 : ' + paramTitle)
		console.log('내용 : ' + paramContents);
		// console.log('일시 : ' + paramCreateDate);
        res.writeHead(200, {'Content-Type':'text/html;charset=utf8'});
        res.write('<p>메모가 저장되었습니다.</p>');
		res.write(paramTitle + '<br>' + paramContents)
		res.write('<div><input type="button" value="다시 작성" onclick="javascript:history.back()"></div>');
        res.end();
	} catch(err) {
		console.log(err);
	}			
});

// 라우터 객체 등록
app.use('/', router);

app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

// 사용자를 인증하는 함수
var authUser = function(database, id, password, callback) {
	console.log('authUser : ' + id + ', ' + password);
	
    // users 컬렉션 참조
	var memo_user = database.collection('memo_user');

    // 아이디와 비밀번호를 이용해 검색
	memo_user.find({"userid":id, "userpw":password}).toArray(function(err, docs) {
		if (err) { // 에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
			callback(err, null);
			return;
		}
		
	    if (docs.length > 0) {  // 조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과 전달
	    	console.log('아이디 [%s], 패스워드 [%s] 가 일치하는 사용자 찾음.', id, password);
	    	callback(null, docs);
	    } else {  // 조회한 레코드가 없는 경우 콜백 함수를 호출하면서 null, null 전달
	    	console.log("일치하는 사용자를 찾지 못함.");
	    	callback(null, null);
	    }
	});
}


// 404 에러 페이지 처리
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404error.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));
  // 데이터베이스 연결함수 호출
  connectDB();
   
});
