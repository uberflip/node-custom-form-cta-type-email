var fs = require('fs')
var Liquid = require('liquid-node')
var Sendgrid = require('sendgrid')
var express = require('express')
var bodyParser = require('body-parser')
var pkg = require('./package')

var port = process.env.PORT
if (!port) {
  console.error('Error: The PORT environment variable is not set.')
  process.exit(1)
}

var apiKey = process.env.API_KEY
if (!apiKey) {
  console.error('Error: The API_KEY environment variable is not set.')
  process.exit(1)
}

var template = fs.readFileSync('body.liquid', 'utf8')

var liquid = new Liquid.Engine()
var sendgrid = Sendgrid(apiKey)

var app = express()
app.use(bodyParser.json())

var config = pkg.config

app.get('/', function (req, res) {
  res.send(pkg.name + ' listening on ' + port)
})

app.post('/cta-submitted', function (req, res) {
  liquid.parseAndRender(template, req.body).then(function (html) {
    sendgrid.send({
      from: config.from,
      to: config.to,
      subject: config.subject,
      html: html
    }, function (err, json) {
      if (err) {
        console.error(err)
        res.status(500)
        res.json({'errors': [{'message': json}]})
      } else {
        res.status(200)
      }
      res.end()
    })
  })
})

app.listen(port, function () {
  console.log(pkg.name + ' listening on port ' + port)
})
