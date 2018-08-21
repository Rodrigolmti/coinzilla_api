module.exports = function (app) {

	var apiAuthentication = app.api.authentication;

	app.route('/api/v1/getToken')
		.get(apiAuthentication.giveToken);

	app.route('/api/v2/getToken')
		.get(apiAuthentication.giveToken);
};