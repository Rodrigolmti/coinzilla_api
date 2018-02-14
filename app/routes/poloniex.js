module.exports = function (app) {

	var apiAuthentication = app.api.authentication;
	var poloniex = app.api.poloniex;

	app.use(apiAuthentication.checkToken);

	app.route('/api/v1/poloniex/returnAvailableBalances')
		.post(poloniex.getAvailableAccountBalances);
};