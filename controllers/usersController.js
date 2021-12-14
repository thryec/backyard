const express = require('express')
const app = express()
const User = require('../models/usersModel')
const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send('users controller')
})

module.exports = app
