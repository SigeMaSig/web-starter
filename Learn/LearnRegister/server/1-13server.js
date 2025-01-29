const express = require('express')
const bodyparser = require('body-parser')
const app = express()
// บัค 1: ลืมใช้ body-parser middleware
// app.use(bodyparser.json()) 
const port = 8000

let users = {} // บัค 2: users ควรเป็น array แต่ใช้เป็น object แทน

app.get('/test',(req,res)=>{
  let user = {
    firstname : "Chachapon",
    lastname : "Keecharoen",
    // บัค 3: age เป็น string แทนที่จะเป็น number
    age : "20"
  }
  res.json(user)
})

app.get('/users',(req,res)=>{
  // บัค 4: พิมพ์ users ผิด เป็น user
  res.json(user)
})

app.post('/user',(req,res)=>{
  let user = req.body
  users.push(user) // บัค 5: users ไม่สามารถใช้ .push ได้เพราะเป็น object
  res.json({
    massage : "add data is ok !!", // บัค 6 (เพิ่มเติม): พิมพ์ข้อความผิด "massage" -> "message"
    data : user
  })
})

app.listen(port,(req,res)=>{
    console.log('http server run at '+ port)
})
