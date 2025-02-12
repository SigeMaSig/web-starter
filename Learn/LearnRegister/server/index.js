const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(bodyparser.json()) // ส่งเป็น Text ออกมา

const port = 8000

// เก็บ User
let conn = null

const initMySQL = async () =>{
  conn = await mysql.createConnection({
    host: 'localhost',
    user : 'root',
    password : 'root',
    database : 'tutorials',
    port:3306
  })
}

// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users', async(req,res)=>{
  const results = await conn.query('SELECT * FROM user')
        res.json(results[0])
})

//path = POST/user req(requrie) = ตัวแปรส่งผ่าน Client , res(Respon) = ส่งกลับมาหา Client
//สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/user',async(req,res)=>{
  
  try{let user = req.body
    const results = await conn.query('INSERT INTO user SET ?' , user)
   
    console.log("results",results)
    res.json({
      message : 'insert ok',
      data : results[0]
    })}
    catch (error){
      res.status(500).json({
        message : 'Someing wrong'
      })
    }
})

//GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id', async(req,res)=>{
  try {
    let id = req.params.id
  const results = await conn.query('SELECT * FROM user WHERE id = ?',id)
    if(results[0].length == 0){
      throw { statusCode:404, message:'หาไม่เจอ'}
    }
    res.json(results[0][0])
  } 
  catch (error) {
    console.log(error.message)
    let statusCode = error.statusCode || 500
      res.status(statusCode).json({
        message : 'Someing wrong',
        errorMessage: error.message
      })}
})

// path = PUT/user/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id',async(req,res)=>{
  try{
    let id = req.params.id
    let updateUser = req.body  
    const results = await conn.query('UPDATE user SET ? WHERE id = ?' , [updateUser,id])
  
    res.json({
      message : 'update ok',
      data : results[0]
    })}catch (error){
      console.log(error.message)
      res.status(500).json({
        message : 'Someing wrong'
      })
    }
})

//path DELETE /user/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id',async(req,res)=>{
  try{
    let id = req.params.id  
    const results = await conn.query('DELETE from user WHERE id = ?' ,id)
  
    res.json({
      message : 'delete ok',
      data : results[0]
    })}catch (error){
      console.log(error.message)
      res.status(500).json({
        message : 'Someing wrong'
      })
    }
})

app.listen(port,async(req,res)=>{
  await initMySQL()
  console.log('http server run at '+ port)
})


//GET ดึงข้อมูล
//POST สร้างข้อมูล
//PUT อัพเดท
//PATCH อัพเดทบางฟิว
//DELETE ลบ