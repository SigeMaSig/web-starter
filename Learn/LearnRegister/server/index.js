const express = require('express')
const bodyparser = require('body-parser')
const mysql = require('mysql2/promise')
const app = express()

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
    })}catch (error){
      console.log(error.message)
      res.status(500).json({
        message : 'Someing wrong'
      })
    }
})

//GET /users/:id สำหรับการดึง users รายคนออกมา
app.get('/users/:id',(req,res)=>{
  let id = req.params.id
  let selectrdindex = users.findIndex(user=> user.id == id)

  res.json(users[selectrdindex])
})

// path = PUT/user/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
app.put('/users/:id',(req,res)=>{
  let id = req.params.id
  let updateUser = req.body

  // หา users จาก id ที่ส่งมา
  let selectrdindex = users.findIndex(user=> user.id == id)
  // update users นั้น

    users[selectrdindex].firstname = updateUser.firstname || users[selectrdindex].firstname
    users[selectrdindex].lastname = updateUser.lastname || users[selectrdindex].lastname
    users[selectrdindex].age = updateUser.age || users[selectrdindex].age
    users[selectrdindex].gender = updateUser.gender || users[selectrdindex].gender

  res.json({
    massage : 'update user complate!!!',
    data:{
      user :updateUser,
      indexUpdate: selectrdindex
    }
  })
})

//path DELETE /user/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
app.delete('/users/:id',(req,res)=>{
  let id = req.params.id
  // หา index ของ user ที่จะลบ คืออันไหน
  let selectrdindex = users.findIndex(user=> user.id == id)

  //ลบ
  //delete users[selectrdindex]

  users.splice(selectrdindex,1)

  res.json({
    massage: 'delete complete',
    indexDelete : selectrdindex
  })
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