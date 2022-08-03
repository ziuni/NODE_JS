const express = require('express')
const ejs = require('ejs')
const mysql = require('mysql')
const app = express()
 
app.set('ejs', ejs.renderFile)
 
const con = mysql.createConnection({
    // host: 'localhost',
    user: 'root',
    password: 'mirim',
    database: 'company'
});

// database query 실행
con.query('SELECT * FROM products', function(error, result, fields){
    if(error){
        console.log('쿼리 문장에 오류가 있습니다.');
    }else{
        console.log(result);
    }
  });

app.get('/', (req, res) => {
 
    con.query('select * from products', function (err, results, fields) {
        if (err) throw err
        res.render('list.html', { content: results })
    });
 
})
 
app.listen(4444, () => {
    console.log('server start')
})