module.exports = function (app) {

	var apiAuthentication = app.api.authentication;
	var coins = app.api.wtm;

	app.use(apiAuthentication.checkToken);

	// Version 1
	app.route('/api/v1/coin/warZ')
		.get(coins.getWtmAltcoin);

	// version 2
	app.route('/api/v2/coin/gpu')
		.get(coins.getWtmGpu);

	app.route('/api/v2/coin/asic')
		.get(coins.getWtmAsic);

	app.route('/api/v2/coin/altcoin')
		.get(coins.getWtmAltcoin);
};