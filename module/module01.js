// const odd="홀수"
// const even = "짝수"
// module.exports = {odd, even};

// exports.aaa=function(a,b){
//     return a+b
// }
// exports.bbb=function(a,b){
//     return a-b
// }

// aaa=function(a,b){
//     return a+b
// }
// bbb=function(a,b){
//     return a-b
// }
// module.exports={aaa,bbb}


// 절대값 원의 면적을 구하는 모듈
// pi * r^2
exports.circleArea = function(num){
    return num*num*Math.PI
}
circleArea = function(num){
    return num*num*Math.PI
}
exports.abs=function(num){
    if(num>0)
    return num;
    else return -num;
}