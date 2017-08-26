module.exports = function (app) {

	var apiAuthentication = app.api.authentication;
	var coinToMine = app.api.coinToMine;

	app.use(apiAuthentication.checkToken);

	app.route('/api/v1/coin/whatToMine/gpu')
		.get(coinToMine.getWhatToMineGpu);

	app.route('/api/v1/coin/whatToMine/asic')
		.get(coinToMine.getWhatToMineAsic);

	app.route('/api/v1/coin/warZ')
		.get(coinToMine.getCoinWarZ);
};