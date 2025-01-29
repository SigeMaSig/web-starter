const express = require('express')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.json())
const port = 8000
// สำกรับเก็บ user
let users =[] 
let counter = 1 // 2. สร้างตัวแปรใหม่ขึ้นมา

//path GET: /users แสดงข้อมูลทั้งหมด
app.get('/users',(req,res)=>{
  res.json(users)
})

//path POST: /user เพิ่มข้อมูล user
app.post('/user',(req,res)=>{
  let user = req.body
  user.id = counter //2.1 สามารถเพิ่มข้อมูลเข้าไปใน objext
  counter += 1 //2.2 เป็นการบอกต่อไปว่าให้เพิ่ม id ต่อไปเรื่อยๆ
  users.push(user)
  res.json({
    massage : "add data is ok !!",
    data : user
  })
})

//1. เพิ่ม path PUT

//path PUT /user:id
app.put('/user/:id',(req,res)=>{
  // res.send(req) //1.1 ทำเพื่อดูว่าเกิดอะไรขึ้นผ่าน param หรือ id
  // 1.2 ลบ res.send(req) และแก้เป็น => 1.3 อธิบาย params สามารถใช้ได้กับทุกMethod โดยที่มันทำงานผ่าน URL
  let id = req.params.id
  let updateUser = req.body // 3.2.1 สร้างตัวแปรเพิ่ม
  // res.send(id) //ลบอันนี้ทิ้งก่อนทำ 3.1 
  //3. หาข้อมูลตามลำดับ
  //3.1 หา users จาก id ที่ส่งมา โดยการใช้คำสั่ง findIndex
  let seletedIndex = users.findIndex(user=> {
    if (user.id == id){
      return true
    } else{
      return false
    } //3.1.2
      /* ย่อเป็น return user.id == id และ สามารถย่อได้อีกเป็น 
      let seletedIndex = users.findIndex(user=> user.id == id)*/
  }) 

  //3.2 update users นั้น
  //3.2.2
    users[seletedIndex] = updateUser 
    //3.2.4อธิบายว่าการทำแบบนี้มันคือการทับข้อมูลเก่าลงไปเพราะฉะนั้นเราต้องตั้งต้นด้วยข้อมูลเดิมของเราไว้ด้วยและแก้เป็น
    /* ด้วยการชี้จุดที่เราจะแก้
    // null || ค่าเดิมออกมา
    users[seletedIndex].firstname = updateUser.firstname || users[seletedIndex].firstname
    users[seletedIndex].lastname = updateUser.lastname || users[seletedIndex].lastname 
    เพิ่มตรรกะศาสตร์ || ไปถ้า user ไม่ได้กรอกอะไรมา
    */

  //3.3 users ที่ update ใหม่กลับเข้าไปที่ user ตัวเดิม
  
  //3.1.1 แสดงผล
  res.send(seletedIndex + '') // res.send รองรับแค่ string เท่านั้นเพราะฉะนั้นต้อง + '' เข้าไปเพื่อแปลงเป็น string
  //3.2.3 แก้ res.send(seletedIndex + '') เป็น 
  /* res.send(seletedIndex + '') 
  res.json({
  massage : "update complete",
  data : {
    user : updateUser,
    indexUpdate : seletedIndex
  }
  })
  
  */
})

app.listen(port,(req,res)=>{
    console.log('http server run at '+ port)
  })