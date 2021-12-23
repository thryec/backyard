const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  favouriteItems: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Item',
    },
  ],
  walletAddress: {
    type: String,
    unique: true,
  },
});

userSchema.pre('save', function (next) {
  let user = this;
  bcrypt.hash(user.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  })
});

module.exports = mongoose.model('User', userSchema)
