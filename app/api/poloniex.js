const Poloniex = require('poloniex-api-node');
var request = require('request');

module.exports = function (app) {

    var api = {};

    api.getAvailableAccountBalances = function (req, res) {
        if (req.body.key != null && req.body.secret != null) {

            let poloniex = new Poloniex(req.body.key, req.body.secret, { socketTimeout: 15000 });

            var response = {
                success: '',
                message: '',
                data: {
                    exchange: new Array(),
                    margin: new Array(),
                    lending: new Array()
                }
            }

            poloniex.returnAvailableAccountBalances('', function (err, balances) {
                if (!err) {
                    
                    if (balances.exchange != null) {
                        response.data.exchange = createCoin(balances.exchange);
                    }

                    if (balances.margin != null) { 
                        response.data.exchange = createCoin(balances.margin);
                    }

                    if (balances.lending != null) { 
                        response.data.exchange = createCoin(balances.lending);
                    }

                    response.success = true;
                    res.status(201).send({ 
                        success: response.success,
                        data: response.data
                     });

                } else {
                    response.success = false; response.message = error;
                    res.status(400).send(response);
                }
            });
        } else {
            response.success = false; response.message = 'Yout must provide an key and secret to retrieve the data!'
            res.status(400).send(response);
        }
    };

    return api;

    function createCoin(json) {
        var list = [];
        for (var prop in json) {
            var coin = {
                tag: prop,
                quant: json[prop],
                price: getCurrencyPrice(prop)
            }
            list.push(coin);
        }
        return list;
    }

    function getCurrencyPrice(coin) {
        request('https://min-api.cryptocompare.com/data/price?fsym=' + coin + '&tsyms=BRL,USD', (error, response, body) => {
            if (error) {
                throw error;
            }
            return body;
        });
    }
};