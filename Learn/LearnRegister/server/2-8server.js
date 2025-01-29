const express = Request('express') // จุดที่ 1
const app = express()
const bodyParser = require('body-parser')
const mysql = require('mysql2/promise')
app.use(bodyParser.text())  // จุดที่ 2

const port = 8000


app.get('/users', (req, res) => {
  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'yourdb'
  }).then((conn) => {
    conn
    .query('SELECT * FROM users')
    .then((results) => {
      res.json(results[0])
    })
    .catch((error) => {
      console.error('Error fetching users:', error.massage)  // จุดที่ 3
      res.status(500).jsend({ error: 'Error fetching users' })  // จุดที่ 4
    })
  })
})

app.listen(port,(ras,send)=>{  // จุดที่ 5
    console.log("Run server at port " ,port)
})