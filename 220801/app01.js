// 기본 설정1
// public == 전에 했던 media
// express 기본 모듈
var express = require('express');
var http = require('http');
var static = require('serve-static');
var path = require('path');
// express 미들웨어
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
// 에러 핸들러 모듈
var expressErrorHandler=require('express-error-handler');
var errorHandler = require('errorhandler');
// 서버를 위한 환경설정
var app = express();
app.set('port', process.env.PORT || 4444); 
app.use('/public', static(path.join(__dirname, 'public')));
// //////////////// 라우터 설정
var router = express.Router();
app.use('/', router);
router.get('/', function(req, res, next){
    res.render('/public/index', {title: 'Express'})
})

// 기본설정2
// //////////// 404 에러 핸들러
var errorHandler = expressErrorHandler({
    static : {
        '404' : './public/404error.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log("익스프레스 웹 서버 실행 : " + app.get('port'));
});