var mongoose = require('mongoose');

var schema = mongoose.Schema({
	marketId: {
		type: Number,
		required: true
	},
	tag: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	slug: {
		type: String,
		required: true
	},
	circulatingSupply: {
		type: Number,
		required: false
	},
	totalSupply: {
		type: Number,
		required: false
	},
	maxSupply: {
		type: Number,
		required: false
	},
	quoteBrl: {
		price: { type: Number, required: true },
		volume24: { type: Number, required: true },
		percentChange1H: { type: Number, required: true },
		percentChange24H: { type: Number, required: true },
		percentChange7D: { type: Number, required: true },
		marketCap: { type: Number, required: true }
	},
	quoteUsd: {
		price: { type: Number, required: true },
		volume24: { type: Number, required: true },
		percentChange1H: { type: Number, required: true },
		percentChange24H: { type: Number, required: true },
		percentChange7D: { type: Number, required: true },
		marketCap: { type: Number, required: true }
	}
});

mongoose.model('CryptoCurrency', schema);
