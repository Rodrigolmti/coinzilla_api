var mongoose = require('mongoose');

module.exports = function (app) {

    var api = {};

    var modelCoinWTMGpu = mongoose.model('CoinWTMGpu');
    var modelCoinWTMAsic = mongoose.model('CoinWTMAsic');
    var modelCoinWZ = mongoose.model('CoinWZ');

    api.getWhatToMineGpu = function (req, res) {
        modelCoinWTMGpu.find({})
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

    api.getWhatToMineAsic = function (req, res) {
        modelCoinWTMAsic.find({})
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