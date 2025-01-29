const express = require('express')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.json()) 
const port = 8000

let users =[] 

app.get('/test',(req,res)=>{
  let user = {
    firstname : "Chachapon",
    lastname : "Keecharoen",
    age : 20
  }
  res.json(user)
})

app.get('/users',(req,res)=>{
  res.json(users)
})


app.post('/user',(req,res)=>{
  let user = req.body
  users.push(user)
  res.json({
    massage : "add data is ok !!",
    data : user
  })
})

app.listen(port,(req,res)=>{
    console.log('http server run at '+ port)
  })