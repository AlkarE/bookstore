const Book = require('../models/book-model')
const express = require('express')
const router = express.Router()

router.get('/books', (req, res) => {
  Book.find({}, '', (err, books) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send({ books })
    }
  })
})

router.get('/books/:id', (req, res) => {
  Book.findOne({ id: req.params.id }, '', (err, book) => {
    if (err) {
      res.sendStatus(500)
    } else {
      res.send(book)
    }
  })
})

module.exports = router
