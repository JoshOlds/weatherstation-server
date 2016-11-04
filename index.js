let express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  routes = require('./server-assets/routes/index'),
  handlers = require('./utils/handlers'),
  server = express(),
  port = process.env.PORT || 8080;

//Registers Middleware for server
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use('/', express.static(`${__dirname}/public/weather/`));
server.use('/api', cors(handlers.corsOptions), routes.router)
server.use('/', handlers.defaultErrorHandler)

server.listen(port, function () {
  console.log(`WeatherStation booting on port: ${port}`);
})