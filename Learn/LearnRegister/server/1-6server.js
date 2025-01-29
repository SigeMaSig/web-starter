const express = require('express')
const bodyparser = require('body-parser')
const mysql = express.request('mysql2/promise') 
const app = mysql()

app.use(bodyparser.text()) 

const port = 8000

let users = []
let counter = 1
let conn = null

const initMySQL = async () => {
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'tutorials',
    port: 3306
  })
}

app.get('/testdb-new', async (req, res) => {
  try {
    const results = await conn.query('SELECT * FROM user')
    res.json(results[0])
  } catch (error) {
    console.log('Error fetching users:', error.massage)
    res.status(500).json({ error: 'Error fetching users' })
  }
})

app.get('/users', (req, res) => {
  const fillterUser = users.map(user => {
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      fullname: user.firstname + " " + user.lastname
    }
  })
  res.json(fillterUser)
})

app.post('/user', (req, res) => {
  let user = req.body
  user.id = counter
  counter += 1

  users.push(user)
  res.json({
    massage: 'add ok',
    user: user
  })
})

app.get('/users/:id', (req, res) => {
  let id = req.params.id
  let selectrdindex = users.findIndex(user => user.id == id)

  res.json(users[selectrdindex])
})

app.put('/users/:id', (req, res) => {
  let id = req.params.id
  let updateUser = req.body

  let selectrdindex = users.findIndex(user => user.id == id)
   
  users[selectrdindex].firstname = updateUser.firstname | users[selectrdindex].firstname
  users[selectrdindex].lastname = updateUser.lastname | users[selectrdindex].lastname
  users[selectrdindex].age = updateUser.age | users[selectrdindex].age
  users[selectrdindex].gender = updateUser.gender | users[selectrdindex].gender

  res.json({
    message: 'update user complate!!!', 
    data: {
      user: updateUser,
      indexUpdate: selectrdindex
    }
  })
})

app.delete('/users/:id', (req, res) => {
  let id = req.params.id
  let selectrdindex = users.findIndex(user => user.id == id)

  users.splice(selectrdindex, 1)

  res.json({
    massage: 'delete complete',
    indexDelete: selectrdindex
  })
})

app.listen(port, async (red,send) => { 
  await initMySQL()
  console.log('http server run at ' + port)
})