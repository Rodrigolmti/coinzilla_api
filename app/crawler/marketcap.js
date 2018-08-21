var request = require('request');
var mongoose = require('mongoose');

const urlMarketCap = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=";

function getListing() {

    console.log("Fetching coins");
    var modelCrypto = mongoose.model('CryptoCurrency');

    modelCrypto.remove({}).then(function (item) {

        request({
            headers: {
                'X-CMC_PRO_API_KEY': '26c25d2a-6e7f-4799-8a6a-ae2ea6f52548',
            }, uri: urlMarketCap + "BRL",
            method: 'GET'
        }, function (error, response, bodyBrl) {

            if (!error && response.statusCode == 200) {

                request({
                    headers: {
                        'X-CMC_PRO_API_KEY': '26c25d2a-6e7f-4799-8a6a-ae2ea6f52548',
                    }, uri: urlMarketCap + "USD",
                    method: 'GET'
                }, function (error, response, bodyUsd) {

                    if (!error && response.statusCode == 200) {

                        var jsonBrl = JSON.parse(bodyBrl);
                        var jsonUsd = JSON.parse(bodyUsd);

                        for (var obj in jsonBrl.data) {

                            var coinBrl = jsonBrl.data[obj];
                            var coinUsd = jsonUsd.data[obj];

                            var cryptoCoin = {
                                marketId: coinBrl.id,
                                tag: coinBrl.symbol,
                                circulatingSupply: coinBrl.circulating_supply,
                                totalSupply: coinBrl.total_supply,
                                maxSupply: coinBrl.max_supply
                            }

                            var quoteBrl = coinBrl.quote.BRL;
                            var quoteUsd = coinUsd.quote.USD;                            

                            cryptoCoin.quoteBrl = {
                                price: quoteBrl.price,
                                volume24: quoteBrl.volume_24h,
                                percentChange1H: quoteBrl.percent_change_1h,
                                percentChange24H: quoteBrl.percent_change_24h,
                                percentChange7D: quoteBrl.percent_change_7d,
                                marketCap: quoteBrl.market_cap
                            };
                            cryptoCoin.quoteUsd = {
                                price: quoteUsd.price,
                                volume24: quoteUsd.volume_24h,
                                percentChange1H: quoteUsd.percent_change_1h,
                                percentChange24H: quoteUsd.percent_change_24h,
                                percentChange7D: quoteUsd.percent_change_7d,
                                marketCap: quoteUsd.market_cap
                            };

                            modelCrypto.create(cryptoCoin).then(function (coin) {
                            }, function (error) {
                                console.log(error);
                            });
                        }
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        });
    }, function (error) {
        console.log(error);
    });
};

var start = function () {
    getListing();
};

module.exports.init = start;