var mongoose = require('mongoose');

var schema = mongoose.Schema({
	userId: {
		type: String,
		required: true
    },
    marketId: {
        type: Number,
        require: true,
        select: false
    }
});

mongoose.model('FavoriteCoin', schema);
