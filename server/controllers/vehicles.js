var mongoose = require('mongoose');
var Vehicle = mongoose.model('Vehicle');

module.exports = (function(){
	return{
		fetch: function(req, res){
			Vehicle.find({}, function(err, vehicles){
				if(err){
					console.log('Unable to fetch vehicles');
				}else{
					console.log('Vehicles retrieved!');
					res.json(vehicles);
				}
			})
		}
	}
})();