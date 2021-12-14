const express = require('express')
const app = express()
const Item = require('../models/itemsModel')
const methodOverride = require('method-override')
const itemsSeed = require('../models/itemsSeed')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.send(itemsSeed)
})

module.exports = app
