// 데이터베이스 연결

const { Router } = require('express');
const { appendFile } = require('fs');

// 몽고 디비 모듈 사용
var MongoClient = require('mongodb').MongoClient;

// 데이터베이스 객체를 위한 변수 선언
var database;

// 데이터베이스에 연결
function connectDB(){
    // 데이터베이스 연결 정보
    var databaseUrl =  'mongodb://localhost:27017/local';

    // 데이터베이스 연결
    MongoClient.connect(databaseUrl, function(err, db){
        if(err) throw err;
        console.log("데이터베이스에 연결되었습니다. : " + databaseUrl);

        // database 변수에 할당
        database = db;
    })
}

// 라우터 객체 등록
app.use('/', router);

// 사용자을 인증하는 함수
var authUser = function(database, id, password, callback){
    console.log('autoUser 호출됨 : ' + id + ', ' + password);

    // users 컬렉션 참조
    var users = database.collection('users');

    // 아이디와 비밀번호를 이용해 검색
    users.find({"id":id, "password":password}).toArray(function(err, docs){
        if(err){ //에러 발생 시 콜백 함수를 호출하면서 에러 객체 전달
            callback(err, null);
            return;
        }

        if(docs.length > 0){ //조회한 레코드가 있는 경우 콜백 함수를 호출하면서 조회 결과
            console.log('아이디 [%s], 패스워드 [%s]가 일치하는 사용자 찾음.', id, password);
            callback(null, docs);
        }else{ //조회한 레코드가 없는 경우 함수를 호출하면서 null, null 전달
            console.log("일치하는 사용자를 찾지 못함");
            callback(null, null);
        }
    })
}

var router = express.Router();

// 로그인 라우팅
router.route('process/login').post(function(req, res){
    console.log("/process/login 호출됨");

    // 요청 파라미터 확인
    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    console.log("요청 파라미터 : " + paramId + ", " + paramPassword)

    // authUser 함수 호출하여 사용자 인증
    if(database){
        authUser(database, paramId, paramPassword, function(err, docs){
            if(err){throw err;}

            // 조회된 레코드가 있으면 성공 응답 전송
            // 사용자 인증 성공시 출력
            if(docs){
                console.dir(docs);
                // 조회 결과에서 사용자 이름 확인
                var username = docs[0].name;
                res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'})
                res.write('<h1> 로그인 성공 </h1>');
            }else{ //조회된 레코드가 없는 경우 실패 응답 전송
                //사용자 인증 실패시 출력
                res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});
                res.write('<h1> 로그인 실패 </h1>');
                res.write('<div> 아이디와 페스워드를 다시 확인하십시오. </div>');
                res.write('<br><br><div> 아이디와 페스워드를 다시 확인하십시오. </div>');
            }
        })
    }
})