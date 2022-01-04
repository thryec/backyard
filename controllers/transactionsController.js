const express = require('express')
const app = express()
const Transaction = require('../models/transactionsModel')
const methodOverride = require('method-override')
const transactionsSeed = require('../models/transactionsSeed')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  const tx = await Transaction.find()
  res.send(tx)
})

// routes for transaction history

app.get('/purchases', async (req, res) => {
  const { user } = req.query
  console.log('user request params', user)
  const data = await Transaction.find({ buyer: user, orderStatus: 'Success' })
  console.log('purchase data: ', data)
  res.send(data)
})

app.get('/sales', async (req, res) => {
  const { user } = req.query
  console.log('user request params', user)
  const data = await Transaction.find({ seller: user, orderStatus: 'Success' })
  console.log('sales data: ', data)
  res.send(data)
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

// app.delete('/all', async (req, res) => {
//   const tx = await Transaction.deleteMany({})
//   res.send(tx)
// })

module.exports = app
