var express = require('express');
var http = require('http');
var static = require('serve-static');  //경로 static를 위한 미들웨어
var path = require('path');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser')

// 세션 추가
var expressSession = require('express-session');

// 익스프레스 시작
// 익스프레스 시작
var app = express();
app.set('port', process.env.PORT || 4444);

app.use('/media', static(path.join(__dirname, 'media')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// 세션 사용하기
app.use(expressSession({
    secret: 'mellong',
    resave: true,
    saveUninitialized: true
}));

// 라우터 사용, 라우터를 사용할 때는 use 미들웨어를 사용안함
var router = express.Router();
app.use('/', router);

// 1. 로그인 라우터 //세션추가
router.route('/media/process/login').post(function(req, res){
    console.log('/process/login 라우팅 함수 호출');
    var paramId = req.query.id || req.body.id;
    var paramPw = req.query.password || req.body.password;
    console.log('요청 파라미터 : ' + paramId + " : " + paramPw);

    if(req.session.user){
        console.log('이미 로그인 상태');
        res.redirect('/media/score.html');
    }else{
        // 세션 저장
        req.session.user = {
            id : paramId,
            name : '홍길동'
            // authorized:true
        };
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.write('<h1> 로그인 성공 </h1>');
        res.write('<h6> id : ' + paramId + '</h6>')
        res.write('<h6> pw : ' + paramPw + '</h6>')
        res.write('<a href="/process/score"> 성적확인하기 </a>')
        res.end();
    }
})

// 2. 로그아웃 라우터 //세션 삭제
router.route('/process/logout').get(function(req, res){
    console.log('/process/logout 라우팅 함수에서 호출');

    if(req.session.user){ //로그인 상태
        console.log('이미 로그인 상태');
        req.session.destroy(function(error){
            if(err){
                throw err;
            }
            console.log('세션을 삭제하고 로그아웃 되었습니다.')
            res.redirect('/media/login.html');
        })
    }else{
        console.log("아직 로그인 되어 있지 않습니다.")
        res.redirect("/media/login2.html");
    }
})

// 3.점수정보 라우터 사용, 라우터를 사용할 때는 use미들웨어를 사용안함
// -----------3. 점수 확인 라우터-----------
router.route('/process/score/').get(function(req, res){
    console.log('/process/score/ 라우팅 함수 받음');
    if(req.session.user){
        res.redirect('/media/score.html');
    }
    else {
        res.redirect('/media/login.html');
    }
});

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 서버를 시작합니다 : '+app.get('port'));
});