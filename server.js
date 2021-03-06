if (!process.env.NODE_ENV) process.env.NODE_ENV='Express'

var express = require('express')
  , http = require('http')
  , path = require('path')
  , reload = require('reload')
  , bikes = require('./server/api/bikes')
  , colors = require('colors')

var app = express()

var clientDir = path.join(__dirname, 'client')

app.configure(function() {
  app.set('port', process.env.PORT || 3000)
  app.use(express.favicon())
  app.use(express.logger('dev'))
  app.use(express.bodyParser()) 
  app.use(app.router) 
  app.use(express.static(clientDir)) 
})

app.configure('development', function(){
  app.use(express.errorHandler());
})

app.get('/', function(req, res) {
  res.sendfile(path.join(clientDir, 'index.html'))
})

app.get('/api/bikes', bikes.list) 

app.get('/api/bikes/total', bikes.total) //placement matters

app.get('/api/bikes/:id', bikes.read) //sometimes called 'show'
app.post('/api/bikes', bikes.create)
app.put('/api/bikes/:id', bikes.update)
app.del('/api/bikes/:id', bikes.del)



var server = http.createServer(app)

reload(server, app)

server.listen(app.get('port'), function(){
  console.log("Serwer %s nasłuchuje na porcie %d", colors.green(process.env.NODE_ENV), app.get('port'));
});


