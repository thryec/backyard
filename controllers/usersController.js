const express = require('express')
const app = express()
const User = require('../models/usersModel')
const methodOverride = require('method-override')
const usersSeed = require('../models/usersSeed')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(usersSeed)
})

module.exports = app
