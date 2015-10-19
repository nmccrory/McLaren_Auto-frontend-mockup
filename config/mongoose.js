var mongoose = require('mongoose');
var fs = require('fs');

mongoose.connect('mongodb://shopdemo:test@ds041144.mongolab.com:41144/heroku_03595mq4');

var models_path = __dirname + '/../server/models';

fs.readdirSync(models_path).forEach(function(file){
	if(file.indexOf('.js') > 0){
		require(models_path + '/' + file);
	}
})