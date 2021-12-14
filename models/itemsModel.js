const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    // required: true,
  },
  listingStartDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  listingEndDate: {
    type: Date,
    default: new Date('December 31, 2020 23:59:59'),
  },
})

module.exports = mongoose.model('Item', itemSchema)
