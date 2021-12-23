const express = require('express')
const app = express()
const Transaction = require('../models/transactionsModel')
const methodOverride = require('method-override')
const transactionsSeed = require('../models/transactionsSeed')
const { text } = require('express')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  const tx = await Transaction.find()
  res.send(tx)
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const tx = await Transaction.findById(id)
  console.log('transaction: ', tx)
  res.send(tx)
})

app.post('/', async (req, res) => {
  console.log('new transaction: ', req.body)
  const tx = await Transaction.create(req.body)
  res.send(tx._id)
  console.log('tx: ', tx._id)
})

app.delete('/:id', async (req, res) => {
  const tx = await Transaction.findOneAndDelete({ _id: req.params.id })
  res.send(tx)
})

app.put('/:id', async (req, res) => {
  const tx = await Transaction.updateOne({ _id: req.params.id }, req.body, {
    new: true,
  })
  res.send(tx)
})

app.get('/seed', async (req, res) => {
  try {
    const seedTxs = await Transaction.create(transactionsSeed)
    res.send(seedTxs)
  } catch (err) {
    res.send(err.message)
  }
})

module.exports = app
