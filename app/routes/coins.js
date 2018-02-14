module.exports = function (app) {

	var apiAuthentication = app.api.authentication;
	var coins = app.api.coins;

	app.use(apiAuthentication.checkToken);

	app.route('/api/v1/coin/warZ')
		.get(coins.getCoinWarZ);
};