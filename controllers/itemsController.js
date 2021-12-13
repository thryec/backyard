const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('items controller')
})

module.exports = app
