const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Create Schema
const CareerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Career = mongoose.model('career', CareerSchema)
