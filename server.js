var express = require('express');
var app = express();


app.use(express.static(__dirname + '/client/'));

var engines = require('consolidate'); 

app.set('views', __dirname + '/client/views');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

var server = app.listen(8000);
var io = require('socket.io').listen(server);
io.sockets.on('connection', function(socket){
	console.log('Sockets started');
})
//require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);