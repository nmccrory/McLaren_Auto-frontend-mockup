var mongoose = require('mongoose');
var VehicleSchema = new mongoose.Schema({
	model: String,
	year: String,
	speed: Number,
	zero_to_sixty: {
		major: Number,
		minor: Number,
	},
	price: {
		major: Number,
		minor: Number,
	},
	img_urls: Array,
	created_at: Date
})

mongoose.model('Vehicle', VehicleSchema);