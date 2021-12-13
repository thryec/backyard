const express = require('express')
const app = express()
const Item = require('../models/itemsModel')

app.get('/', (req, res) => {
  res.send('items controller')
})

module.exports = app
