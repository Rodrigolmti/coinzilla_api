var mongoose = require('mongoose');

module.exports = function (app) {

    var api = {};

    var modelCoinWZ = mongoose.model('CoinWZ');

    api.getCoinWarZ = function (req, res) {
        modelCoinWZ.find({})
            .then(function(data) {
                res.status(201).send({
                    success: true,
                    updateDate : data[0].updateDate,
                    data: data
                });
            },
            function(error) {
                res.status(500).send({
                    success: false,
                    message: error
                });
                console.log(error);
            });
    };

    return api;
};