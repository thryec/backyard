const express = require('express')
const app = express()
const Item = require('../models/itemsModel')
const methodOverride = require('method-override')
const itemsSeed = require('../models/itemsSeed')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/all', async (req, res) => {
  const items = await Item.find()
  res.send(items)
})

app.get('/listed', async (req, res) => {
  const items = await Item.find({ status: 'Listed' })
  res.send(items)
})

app.get('/listed/:id', async (req, res) => {
  const { id } = req.params
  const items = await Item.find({ status: 'Listed', seller: id })
  res.send(items)
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const item = await Item.findById(id)
  console.log('item: ', item)
  res.send(item)
})

app.post('/', async (req, res) => {
  console.log('new item: ', req.body)
  const item = await Item.create(req.body)
  res.send(item)
})

app.delete('/:id', async (req, res) => {
  const item = await Item.findOneAndDelete({ _id: req.params.id })
  res.send(item)
})

app.put('/:id', async (req, res) => {
  const item = await Item.updateOne({ _id: req.params.id }, req.body, {
    new: true,
  })
  res.send(item)
})

app.get('/seed', async (req, res) => {
  console.log('seeding with data: ', itemsSeed)
  try {
    const seedItems = await Item.create(itemsSeed)
    res.send(seedItems)
  } catch (err) {
    res.send(err.message)
  }
})

// app.delete('/all', async (req, res) => {
//   const tx = await Item.deleteMany({})
//   res.send(tx)
// })

module.exports = app
