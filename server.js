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

var port = process.env.PORT || CONFIG.port;
// var port = 5000;
app.listen(port, function(){
	console.log('Server running');
})
/*var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	console.log('Sockets started');
})*/
require('./config/mongoose.js');
require('./config/routes.js')(app);