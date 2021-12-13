const express = require('express')
const app = express()
const User = require('../models/usersModel')

app.get('/', (req, res) => {
  res.send('users controller')
})

module.exports = app
