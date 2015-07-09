var mongoose = require('mongoose');
var VehicleSchema = new mongoose.Schema({
	model: String,
	year: String,
	speed: Number,
	zero_to_sixty: {
		major: Number,
		minor: Number,
	}
})