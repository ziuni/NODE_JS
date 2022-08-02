// mysql
// 미들웨어 추가
var fs = require('fs');
var fs = require('ejs');
var mysql = require('mysql');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
// express 서버 실행
var app = express();
app.set('port', process.env.PORT||4444);
app.use(bodyParser.urlencoded({
    extended:false
}));


// 모듈 추출
var mysql = require('mysql');
const { query } = require('express');

// connect database
var client = mysql.createConnection({
    user: 'root',
    password: 'mirim',
    database: 'company'
});

var router = express.Router();

app.use('/', router);    //라우트 미들웨어를 등록한다
app.all('*',function(req, res){
    res.status(404).send('<h1> 요청 페이지 없음 </h1>');
});
// router.route('/').get(
//     function (req, res) {
//         console.log('/');
//         //세션정보는 req.session 에 들어 있다
//         res.redirect('index.html')
// });

// app.get('/', function(req, res){
//     console.log('/');
//     //세션정보는 req.session 에 들어 있다
        
// });

// 데이터 표시
app.get('/list', function(req, res){
    fs.readFile('list_.html', 'utf-8', function(err, data){
        client.query('select * from products', function(err, results){
            res.send(ejs.render(data, {
                data : results
            }));
        });
    });
});

// 데이터 삭제
app.get('/delete/:id', function(req, res) {
    client.query('delete from products where id=?', [req.paramid],
    function(){
        res.redirect('/');
    });
})

// data 추가
app.get('/insert', function(req, res){
    fs.readFile('inseert.html', 'utf-8', function(err, data){
        res.send(data);
    })
})

app.post()

// 데이터 수정 get
app.get('/update/:id', function(req, res){
    fs.readFile('update.html', 'utf-8', function(err, data){
        client.query('select * from products where id=?', [
            req.params.id
        ], function(err, result){
            res.send(ejs.render(data, {
                data:result[0]
            }));
        })
    });
});

app.post('/update/:id', function(req, res){
    var body = req.body;
    client.query('update products set name=?, modelnumber=?, series=? where id=?', [
        body.name, body.modelnumber, body.series, req.params.id
    ], function(){
        res.redirect('/')
    })
})

// database query 실행
client.query('SELECT * FROM products', function(error, result, fields){
    if(error){
        console.log('쿼리 문장에 오류가 있습니다.');
    }else{
        console.log(result);
    }
});

//웹서버를 app 기반으로 생성
var appServer = http.createServer(app);appServer.listen(app.get('port'),
    function () {
        console.log('express 웹서버 실행' + app.get('port'));
    }
);