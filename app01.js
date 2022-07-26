// console.time('전체시간');
// console.log('hello');
// var sum=0;
// for(i=0; i<10000; i++){
//     sum+=i;
// }
// console.timeEnd('전체시간') //console.time과 리터널이 같아야한다'1'=='1' '1'/= '12'

// console.log('filename : ', __filename);
// console.log('dirname : ', __dirname);
// console.log('output : %d', 123);
// console.log('%d + %d = %d', 10,20,10+20);
// console.log('%d + %d = %d', 10,20,10+20,30);
// console.log('%d + %d = %d', 10,20);
// console.log("JSON : %j", {name : "tom"});

// console.log('\u001b[41m', 'Hello World...')
// console.log('\u001b[42m', 'Hello World...')
// console.log('\u001b[43m', 'Hello World...')
// console.log('\u001b[44m', 'Hello World...')
// console.log('\u001b[45m', 'Hello World...')
// console.log('\u001b[46m', 'Hello World...')
// console.log('\u001b[47m', 'Hello World...')
// console.log('\u001b[0m', 'Hello World...')
// console.log('Hello World...')

// console.time('mirim');//시간측정시작
// var output=0;
// for(var i=1; i<=100; i++){
//     output += i;
// }
// process.exit(); //프로그램 종료
// console.log('Result : ', output);
// console.timeEnd('mirim');//시간측정종료

// // var & const
// if(1){
//     var x = 10;
// }
// console.log(x); //출력

// if(1){
//     const y=20;
//     console.log(y); //범위를 벗어나 에러
// }
// // console.log(y); //범위를 벗어나 에러

// // const & let
// var x = 10; //자바스크립트
// console.log(x);
// const y = 100;//값을 바꿀 수 없다
// // y=10
// console.log(y);
// let z = 1000; //값을 바꿀 수 있다
// z = 10;
// console.log(z);

// // 문자열 합칠 때
// var num1=1;
// var num2 = 2
// var result=3
// var string = num1 +' 더하기 '+ num2 + '는 ' + result
// console.log(string);

// const num1=1;
// const num2=2
// const result=3
// const string = `${num1} 더하기 ${num2}는 ${result}`
// console.log(string)


// // 함수이용 화면
// function helloWorld(){
//     console.log('Hello World');
//     helloNode();
// }

// function helloNode(){
//     console.log('Hello Node')
// }
// helloWorld();

// const hello1 = () => 


// 화살표 함수
// function add(x,y){
//     return x+y;
// }
// console.log(add(1,1))//2

// const add1 = function(x,y){
//     return x+y;
// }
// console.log(add1(12,1)) //13

// const add2 = (x,y) => {
//     return x+y;
// }
// console.log(add2(10,10)); //20

// const add3 = (x,y) => x+y
// console.log(add3(1,5)); //6
// const add4 = (x,y) => (x+y);
// console.log(add4(10,5));15


// 화살표 함수_다음을 화살표 함수로 변화하기
// const fs = require('fs');
// fs.readFile('./a[[01.js', function(err, data){
//     if(err){
//         throw err;
//     }
//     console.log(data.toString());
// })

// const fs=require('fs');
// fs/fs.readFile('./app01.js', (err, data) => {
//     if(err){
//         throw err;
//     }
//     console.log(data.toString())
// })


// // 비동기식 이벤트 처리 방식
// function run(){
//     console.log('3초후 실행');
// }
// console.log('start')
// setTimeout(run, 3000)
// console.log('end')

// // 동기식 방식 = 에러발생
// const fs=require('fs')
// fs.readFile('./app01.js', 'utf-8')
// console.log("파일 불러오기 완료");

// // 파일 입출력은 비동기식으로 읽음
// const fs=require('fs');
// fs.readFile('./sam.txt', 'utf-8', (err,data) => {
//     console.log(data.toString())
//     console.log('file open')
// })
// console.log('other work')



// // 모듈1 - 특정한 기능을 하는 함수나 변수들의 집합
// const {odd, even} = require('./module/module01.js');
// function check(num){
//     if(num % 2){
//         return odd;
//     }
//     return even;
// }
// console.log(check(30));


// module말고 export객체로도 모듈을 만들수있다
// const odd="홀수입니다"
// const even = "짝수입니다"
// module.exports = {
//     odd, even
// }
// exports.odd="홀수"
// exports.even="짝수"



// var result = require('./module/module01')
// console.log(result.circleArea(10))
// console.log(result.abs(-10))


// const timeout=setTimeout(() =>{
//     console.log('1.5초 후 실행')
// }, 1500)
// const intervak = setInterval(() => {
//     console.log('1초마다 실행')
// }, 1000);
// // setTimeout(() => {
// //     clearInterval(interval);//타이머 취소
// // })


// 220726

// // fs모듈의 promises속성
// const fs = require('fs').promises;
// fs.readFile('./sam.txt')
// .then((data) => {
//     console.log(data)
//     console.log(data.toString())
// })
// .catch((err) => {
//     console.error(err)
// })

// // 동기식 파일 읽기
// const fs = require('fs')
// console.log("시작")
// let data = fs.readFileSync("./sam.txt")
// console.log("1번", data.toString())
// data = fs.readFileSync("./sam.txt")
// console.log("2번", data.toString())
// data = fs.readFileSync("./sam.txt")
// console.log("3번", data.toString())
// console.log("끝")

// // 비동기식 파일 읽기
// const fs = require('fs')
// console.log("시작")
// fs.readFile("./sam.txt", (err, data) => {
//     if(err){
//         throw err;
//     }
//     console.log("1번", data.toString())
// })
// fs.readFile("./sam.txt", (err, data) => {
//     if(err){
//         throw err;
//     }
//     console.log("2번", data.toString())
// })
// fs.readFile("./sam.txt", (err, data) => {
//     if(err){
//         throw err;
//     }
//     console.log("3번", data.toString())
// })
// console.log("끝")

// // 비동ㄱㅣ식 방법으로 하되 순서를 유지하고 싶다면
// const fs = require('fs')
// console.log("시작")
// fs.readFile("./sam.txt", (err, data) => {
//     if(err){
//         throw err;
//     }
//     console.log("1번", data.toString())
//     fs.readFile("./sam.txt", (err, data) => {
//         if(err){
//             throw err;
//         }
//         console.log("2번", data.toString());
//         fs.readFile("./sam.txt", (err, data) => {
//             if(err){
//                 throw err;
//             }
//             console.log("3번", data.toString())
//             console.log("끝");
//         })//3
//     })//2
// })//1

// const condition = true; //true is resolve, false is reject
// // const condition = false
// const promise = new Promise((resolve, reject) => {
//     if(condition){
//         resolve("성공");
//     }else{
//         reject("실패");
//     }
// });
// promise
// .then((message) => {
//     console.log(message);
// })
// .catch((err) => {
//     console.error(err);
// })
// .finally(() => {
//     console.log("무조건")
// })

// // 콜백지옥에서 promises 사용
// const fs = require("fs").promises;
// console.log("시작");
// fs.readFile("./sam.txt")
// .then((data) => {
//     console.log("1번", data.toString())
//     return fs.readFile("./sam.txt")
// })
// .then((data) => {
//     console.log("2번", data.toString())
//     return fs.readFile("./sam.txt")
// })
// .then((data) => {
//     console.log("3번", data.toString())
//     return fs.readFile("./sam.txt")
// })
// .catch((err) => {
//     console.error(err)
// })


// // 이벤트
// const EventEmitter = require("events")
// const myEvent = new EventEmitter()
// myEvent.on("event1", () => {
//     console.log("이벤트1")
// })
// myEvent.addListener("event2", () => {
//     console.log("이벤트2");
// })
// myEvent.addListener("event2", () => {
//     console.log("이벤트2 추가")
// })
// myEvent.once("event3", () => {
//     console.log("이벤트3")
// })
// myEvent.on("event4", () => {
//     console.log("이벤트4")
// })
// myEvent.removeAllListeners("event4")
// const listener = () => {
//     console.log("이벤트5")
// }
// myEvent.on("event5", listener)
// myEvent.removeAllListeners("event5", listener)
// myEvent.emit("event5")
// myEvent.emit("event1")
// myEvent.emit("event2")
// myEvent.emit("event3")
// myEvent.emit("event3") //once라 한번만 나옴
// myEvent.emit("event4") //지워서 실행 안 됨
// console.log(myEvent.listenerCount("event1"))
// console.log(myEvent.listenerCount("event2"))


// setInterval(() => {
//     console.log("시작")
// })

const fs = require("fs")
setInterval(() => {
    // unlink() = 파일삭제
    fs.unlink("./sam1.txt", (err) => {
        if(err){
            console.error(err)
        }
    })
}, 500)


// 예측 불가능한 에러처리
process.on("uncaughtException", (err) => {
    console.error("예기치 못한 에러", err)
})
setInterval(() => {
    throw new Error("무한출력!")
}, 1000)
setTimeout(() => {
    console.log("실행됩니다")
}, 2000)