const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const NewslatterSchema = new Schema({
  email: {
    type: String,
    require: true,
  },

  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Newslatter = mongoose.model('newslatter', NewslatterSchema)
