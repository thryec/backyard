const express = require('express')
const cors = require('cors')
const CORS_WHITELIST = process.env.CORS_WHITELIST.split(',')

const app = express()

app.use(
  cors({
    origin: CORS_WHITELIST,
  })
)

app.use(express.json())

module.exports = app
