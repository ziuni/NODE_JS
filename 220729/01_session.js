var express = require('express');
var http = require("http");
var bodyParser = require('body-parser'); 
var path = require("path");
var static = require('serve-static');
var expressSession = require('express-session'); // 세션 추가
var app = express();

app.set('port', process.env.PORT || 4444); 

app.use('/media', static(path.join(__dirname, 'media')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

// 세션 사용
app.use(expressSession({
    secret : 'meLLong',
    resave :true,
    saveUninitialized:true
}));


// 로그인 라우터
var router = express.Router();
app.use('/', router);

router.route('/process/login').post(function(req, res){
    console.log('/process/login 라우팅 함수 받음');
    var parmId = req.query.id||req.body.id; // get 혹은 post로 받기
    var parmPw = req.query.pass||req.body.pass;

    console.log('요청 파라메터 : '+parmId+', '+parmPw);
    if(req.session.user){
        console.log('이미 로그인 상태');
        res.redirect('/media/score.html');
    }
    else {
        //세션 저장
        req.session.user = {
            id:parmId,
            name:'홍길동'
        }
    };
    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'});
    res.write('<h1>로그인 성공</h1>');
    res.write('<div>'+parmId+'</div>');
    res.write('<div>'+parmPw+'</div>');
    res.write('<a href="/process/score"> 성적 확인하기 </a>');
    res.end();
});

//로그아웃 라우터
router.route('/process/logout').get(function(req, res){
    console.log('/process/logout 라우팅 함수 받음');

    if(req.session.user){
        console.log('로그아웃 합니다');
        req.session.destroy(function(error){ // 세션 삭제
            if(error) throw error;
            console.log('세션을 삭제하고 로그아웃 되었습니다');
            res.redirect('/media/login.html');
        })
    }
    else {
        console.log('아직 로그인이 되어있지 않습니다');
        res.redirect('/media/login.html');
    }
});

// 점수 확인 라우터
router.route('/process/score/').get(function(req, res){
    console.log('/process/score/ 라우팅 함수 받음');
    if(req.session.user){
        res.redirect('/media/score.html');
    }
    else {
        res.redirect('/media/login.html');
    }
});


var server=http.createServer(app).listen(app.get("port"), function(){
    console.log("익스프레스 웹서버 실행: "+ app.get("port"));
});
