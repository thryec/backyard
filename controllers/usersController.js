const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('users controller')
})

module.exports = app
