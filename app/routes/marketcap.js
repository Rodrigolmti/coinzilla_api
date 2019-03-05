module.exports = function (app) {

	var apiAuthentication = app.api.authentication;
	var marketcap = app.api.marketcap;

	app.use(apiAuthentication.checkToken);

	app.route('/api/v2/marketcap/coin/list')
		.get(marketcap.findAllCoins);

	app.route('/api/v2/marketcap/coin/detail/:id')
		.get(marketcap.findCoinById);
};