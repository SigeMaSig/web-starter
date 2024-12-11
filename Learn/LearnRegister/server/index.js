const express = require('express')
const bodyparser = require('body-parser')
const app = express()

app.use(bodyparser.json()) // ส่งเป็น Text ออกมา

const port = 8000

// เก็บ User
let users = []
let counter = 1

/* 
GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
POST /users สำหรับการสร้าง users ใหม่บันทึกเข้าไป
GET /users/:id สำหรับการดึง users รายคนออกมา
PUT /users/:id สำหรับการแก้ไข users รายคน (ตาม id ที่บันทึกเข้าไป)
DELETE /users/:id สำหรับการลบ users รายคน (ตาม id ที่บันทึกเข้าไป)
*/



// path = GET /users สำหรับ get users ทั้งหมดที่บันทึกเข้าไปออกมา
app.get('/users',(req,res)=>{
  const fillterUser = users.map(user => {
    return {
      id:user.id,
      firstname : user.firstname,
      lastname : user.lastname,
      fullname : user.firstname + " " + user.lastname
    }
  })
  res.json(fillterUser)
})

//path = POST/user req(requrie) = ตัวแปรส่งผ่าน Client , res(Respon) = ส่งกลับมาหา Client
//สำหรับการสร้าง users ใหม่บันทึกเข้าไป
app.post('/user',(req,res)=>{
  let user = req.body
  user.id = counter
  counter += 1

  users.push(user)
  res.json({
    massage: 'add ok',
    user: user
  })
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

app.listen(port,(req,res)=>{
  console.log('http server run at '+ port)
})


//GET ดึงข้อมูล
//POST สร้างข้อมูล
//PUT อัพเดท
//PATCH อัพเดทบางฟิว
//DELETE ลบ