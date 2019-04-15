const Poloniex = require('poloniex-api-node');
var request = require('request');

module.exports = function (app) {

    var api = {};

    api.getAvailableAccountBalances = function (req, res) {

        if (req.body.key != null && req.body.secret != null) {

            console.log(req.body.key);
            console.log(req.body.secret);

            let poloniex = new Poloniex(req.body.key, req.body.secret, { 
                socketTimeout: 15000, nonce: () => new Date().time
            });

            var response = {
                success: '',
                message: '',
                data: new Array()
            }

            poloniex.returnAvailableAccountBalances('', function (err, balances) {
                
                console.log(balances);
                console.log(err);
                
                if (!err) {
                    
                    if (balances.exchange != null) {
                        response.data.exchange.push(createCoin(balances.exchange, "exchange"));
                    }

                    if (balances.margin != null) { 
                        response.data.exchange.push(createCoin(balances.margin, "margin"));
                    }

                    if (balances.lending != null) { 
                        response.data.exchange.push(createCoin(balances.lending, "lending"));
                    }

                    response.success = true;
                    res.status(201).send({ 
                        success: response.success,
                        data: response.data
                     });

                } else {
                    response.success = false; 
                    response.message = err;
                    res.status(400).send(response);
                }
            });
        } else {
            response.success = false; response.message = 'Yout must provide an key and secret to retrieve the data!'
            res.status(400).send(response);
        }
    };

    return api;

    function createCoin(json, type) {
        var list = [];
        for (var prop in json) {
            var coin = {
                tag: prop,
                type: type,
                balance: json[prop]
            }
            list.push(coin);
        }
        return list;
    };
};