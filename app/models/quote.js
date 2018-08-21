var mongoose = require('mongoose');

var schema = mongoose.Schema({
	price: {
		type: Number,
		required: true
	},
	volume24: {
		type: Number,
		required: true
	},
	percentChange1H: {
		type: Number,
		required: true
	},
	percentChange24H: {
		type: Number
	},
	percentChange7D: {
		type: Number,
		required: true
	},
	marketCap: {
		type: Number,
		required: true
	}
});

mongoose.model('Quote', schema);
