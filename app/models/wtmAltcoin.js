var mongoose = require('mongoose');

var schema = mongoose.Schema({
	tag: {
		type: String,
		required: true
	},
	algorithm: {
		type: String,
		required: true
	},
	difficulty: {
		type: String,
		required: true
	},
	netHash: {
		type: String,
		required: true
	},
	estResward: {
		type: String,
		required: true
	},
	estResward24: {
		type: String,
		required: true
	},
	marketCap: {
		type: String,
		required: true
	},
	volume: {
		type: String
	},
	updateDate: {
		type: Date,
		required: true
	}
});

mongoose.model('WtmAltcoin', schema);
