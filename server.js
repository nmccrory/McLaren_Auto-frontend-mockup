var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/client/'));

var engines = require('consolidate'); 

app.set('views', __dirname + '/client/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

var port = normalizePort(process.env.PORT || 8080);
// var port = 8080;
app.set('port', port);

app.listen(port, function(){
	console.log("Server running on PORT "+port);
})
require('./config/routes.js')(app);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}