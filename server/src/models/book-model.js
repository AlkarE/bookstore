const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BookSchema = new Schema({
  id: {
    type: String
  },
  src: {
    type: String
  },
  Bookname: {
    type: String,
    unique: true
  },
  author: {
    type: String
  },
  price: {
    type: String
  },
  Description: {
    type: String
  }
})

const Books = mongoose.model('books', BookSchema)

module.exports = Books
