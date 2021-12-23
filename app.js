const express = require('express')
const methodOverride = require('method-override')
const jwt = require('jsonwebtoken');
const app = express()

const cors = require('cors')
const CORS_WHITELIST = process.env.CORS_WHITELIST.split(',')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(
  cors({
    origin: CORS_WHITELIST,
  })
)

const itemsController = require('./controllers/itemsController')
const usersController = require('./controllers/usersController')
const sessionController = require('./controllers/sessionController')
const transactionsController = require('./controllers/transactionsController')

app.use('/sessions', sessionController)
app.use('/items', itemsController)
app.use('/users', usersController)
app.use('/transactions', transactionsController)

module.exports = app
