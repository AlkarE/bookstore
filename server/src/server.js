const config = require('./config/config')
const books = require('./routes/books')

const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const compression = require('compression')
const app = require('express')()

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(books)
app.use(compression())

app.listen(process.env.PORT || config.port,
  () => console.log(`Server start on port ${config.port} ...`)
)

mongoose.connect(`mongodb://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_URL}`)

app.all('/*', function (req, res, next) {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*') // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
  } else {
    next()
  }
})
