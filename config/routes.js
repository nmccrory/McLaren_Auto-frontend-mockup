module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index.html');
	})
	app.get('/models', function(req, res){
		res.render('models.html');
	})
}