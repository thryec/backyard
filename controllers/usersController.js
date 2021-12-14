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

app.post('/', async (req, res) => {
  console.log(req.body)
  const user = await User.create(req.body)
  res.send(user)
})

app.delete('/:id', (req, res) => {
  const user = await User.findOneAndDelete({ _id: req.params.id })
  res.send(user)
})

app.put('/:id', async (req, res) => {
  const user = await User.updateOne({ _id: req.params.id }, req.body, {
    new: true,
  })
  res.send(user)
})

app.get('/seed', async (req, res) => {
  try {
    const seedUsers = await User.create(usersSeed)
    res.send(seedUsers)
  } catch (err) {
    res.send(err.message)
  }
})

module.exports = app
