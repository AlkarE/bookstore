const http = require('http')
const books = require('./assets/bookDescription.json')

const app = http.createServer()

app.on('request', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json; charset=utf-8;',
    'Access-Control-Allow-Origin': '*'
  })
  res.end(JSON.stringify(books))
})

app.listen(3000)
