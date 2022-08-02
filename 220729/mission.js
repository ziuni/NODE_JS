var express=require('express');
var http=require('http');
var path=require('path');
var bodyParser=require('body-parser');
var static=require('serve-static');
var expressErrorHandler=require('express-error-handler');
var fs=require('fs');
var app=express();
app.set('port',process.env.PORT||4444);
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname,'public')));

var router=express.Router();

router.route('/process/save').post(function(req,res){
    console.log('/process/save 호출함');
    try{
        var paramAuthor=req.body.author;
        var paramContents=req.body.contents;
        var paramCreateDate=req.body.createDate;

        console.log('작성자: '+paramAuthor);
        console.log('내용: '+paramContents);
        console.log('일자: '+paramCreateDate);

        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write('<dir><p>메모가 저장되었습니다</p></dir>');
        res.write('<dir><input type="button" value="다시 작성" onclick="javascript:history.back()"></dir>');
        res.end();
        
    }catch(err){
        console.dir(err.stack);
        res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
        res.write('<dir><p>메모 저장 시 에러 발생</p></dir>');
        res.end();
    }
});

app.use('/', router);

var server = http.createServer(app).listen(app.get('port'), function(){
    console.log('익스프레스 웹서버 실행 : ' + app.get('port'));
});