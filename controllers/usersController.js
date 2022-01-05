const express = require('express')
const app = express()
const User = require('../models/usersModel')
const methodOverride = require('method-override')
const usersSeed = require('../models/usersSeed')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

// Seed data
app.get('/seed/hashPW', async (req, res) => {
  for (let user of usersSeed) {
    let hashPassword = bcrypt.hash(user.password, 10)
    user.password = hashPassword

    try {
      const newSeedUser = await User.create(user)
      res.send(newSeedUser)
    } catch (error) {
      console.log(error.message)
    }
  }
})

app.get('/seed', async (req, res) => {
  try {
    const seedUsers = await User.create(usersSeed)
    res.send(seedUsers)
  } catch (err) {
    res.send(err.message)
  }
})

app.post('/', async (req, res) => {
  console.log(req.body)
  try {
    const user = await User.create(req.body)
    console.log(user)
    res.send(user)
  } catch (error) {
    console.log(error.message)
  }
})

//verify jwt
app.use((req, res, next) => {
  console.log('UserController: Middleware Check Activated')
  console.log('Request Information: ', req.headers.token)
  if (!req.headers.token) {
    res.status(401).send('Unauthenticated,no token, Please Login')
    return
  }
  try {
    const payload = jwt.verify(req.headers.token, process.env.SECRET)
    console.log('current payload', payload)
    if (payload.role !== 'admin') {
      console.log('UserController.js: User is not admin')
      res.status(401).send('User is not admin, Unauthourized users')
      return
    }
    req.context = payload
    next()
  } catch (err) {
    console.log('error message caught in user controller: ', err)
    res.status(401).send('Expired or Invalid Token, Please Login')
    return
  }
})

app.get('/', async (req, res) => {
  console.log('User Controller: Trying to get users')
  console.log(req.context)
  const users = await User.find()
  console.log(users)
  res.send(users)
})

app.delete('/:id', async (req, res) => {
  try {
    console.log('User Controller: Trying to delete an user')
    const user = await User.findOneAndDelete({ _id: req.params.id })
    res.send(`This ${user.username} has been deleted`)
  } catch (error) {
    console.log('Delete User Controller Error: ' + error.message)
  }
})

app.put('/:id', async (req, res) => {
  const user = await User.updateOne({ _id: req.params.id }, req.body, {
    new: true,
  })
  res.send(user)
})

module.exports = app
