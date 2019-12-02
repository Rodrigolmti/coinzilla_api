var http = require('http');
var app = require('./config/express');
var config = require('./config/config');
require('./config/database')(config.database);

http.createServer(app).listen(4000, () => {
	console.log('Server start!');
});
