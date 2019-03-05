var jwt = require('jsonwebtoken');
var config = require('../../config/config');

module.exports = function (app) {

	var api = {};

	api.giveToken = function (req, res) {
		var identification = req.headers.identification;
		if (identification) {
			var token = jwt.sign({
				exp: Math.floor(Date.now() / 1000) + ((60 * 60) * 24),
				data: identification
			}, config.secret);
			res.json({
				success: true,
				token: token,
				agent: identification
			});
		} else {
			return res.status(401).send({
				success: false,
				message: 'No identification provided.'
			});
		}
	};

	api.checkToken = function (req, res, next) {
		var token = req.headers.authorization;
		if (token) {
			jwt.verify(token, config.secret, function (err, decoded) {
				if (err) {
					if (err.name == "TokenExpiredError") {
						return res.status(401).json({
							success: false,
							refreshToken: true,
							message: 'Failed to authenticate token. Your provided token has expired'
						});
					} else {
						return res.status(401).json({
							success: false,
							refreshToken: false,
							message: 'Failed to authenticate token.'
						});
					}
				} else {
					req.decoded = decoded;
					next();
				}
			});
		} else {
			return res.status(403).send({
				success: false,
				message: 'No token provided.'
			});
		}
	};
	return api;
}