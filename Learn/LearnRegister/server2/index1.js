const express = require('express')
const app = express()

const port = 8000

// path = /
// สอน send ก่อน และสอน json ต่อ
// อันที่ 1
app.get('/test1',(req,res)=>{
  res.send("Hello world")
})
// อันที่ 2 ยิงผ่าน localhost:8000 ก่อนแล้วค่อยยิง Postman
app.get('/test2',(req,res)=>{
  let user = {
    firstname : "Chachapon",
    lastname : "Keecharoen",
    age : 20
  }
  res.json(user)
})

// พาลง nodemon npm i nodemon--save-dev คำสั่ง รัน npx nodemon index.js
app.listen(port,(req,res)=>{
    console.log('http server run at '+ port)
  })

  // จบที่ 2 