module.exports = function(uri) {

	var mongoose = require('mongoose');

	mongoose.connect(uri);

	mongoose.connection.on('connected', function() {
		console.log('Connected in MongoDB')
	});

	mongoose.connection.on('error', function(error) {
		console.log('Error in connection: ' + error);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Disconnected from MongoDB')
	});

	process.on('SIGINT', function() {
		mongoose.connection.close(function() {
			console.log('Application finished!')
			process.exit(0);
		});
	})
};
