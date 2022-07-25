// const path  = require('path')

// const string = __filename
// console.log("파일명 : ", __filename)
// console.log("분리기호 : ", path.sep)
// console.log("환경변수 구분자 : ", path.delimiter)
// console.log("---------------------------------------")
// console.log("폴더명 : ", path.dirname(string))
// console.log("확장자명 : ", path.extname(string))
// console.log("전체파일명 : ", path.basename(string))
// console.log("---------------------------------------")
// console.log("절대경로(C:\\) : ", path.isAbsolute("C:\\"))
// console.log("path.isAbsolute : ", path.isAbsolute("D:\\NODE_JS"))
// console.log("---------------------------------------")
// console.log("상대경로 : ", path.relative("d:\is_work"))
// console.log("상대경로 : ", __filename)


// const url = require("url")
// const{URL} = url;
// const myURL = new URL("https://www.e-mirim.hs.kr/main.do")
// console.log("new URL() : ", myURL)

// console.log("---------------------------------------")
// const parsedUrl = url.parse("https://gametest.emirim.kr/tobankto/#page-1")
// console.log("url.parse() : ", parsedUrl)


// const url = require("url")
// const querystring = require('querystring')
// const parseUrl = url.parse("https://gametest.emirim.kr/tobankto/#page-1")


const crypto = require("crypto")
console.log("base64 : ", 
crypto.createHash("sha512").update("123").digest("base64"))

console.log("md5 : ", crypto.createHash("md5").update("123").digest("base64"))
console.log("hex : ", crypto.createHash("sha512").update("123").digest("hex"))