const express = require('express')
const app = express()
const Item = require('../models/itemsModel')

app.get('/', (req, res) => {
  let seedData = [
    {
      username: 'merlin',
      password: 'countryroads',
      messages: ['teamwork is paramount', 'take me home, country road'],
    },
    { username: 'lancelot', password: 'roxy' },
    {
      username: 'eggsy',
      password: 'galahadjr',
      messages: ["who's in the mood for saving the world?"],
    },
    {
      username: 'galahad',
      password: 'harry',
      messages: ['manners maketh man', "we're the new knights"],
    },
  ]
  res.send(seedData)
})

module.exports = app
