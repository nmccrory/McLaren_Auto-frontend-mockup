var vehicles = require('../server/controllers/vehicles.js');
module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index.html');
	})
	app.get('/models', function(req, res){
		console.log('inside of our server-side routes');
		vehicles.fetch(req, res);
	})
}