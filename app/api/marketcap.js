var mongoose = require('mongoose');

module.exports = function (app) {

    var api = {};

    var modelCrypto = mongoose.model('CryptoCurrency');

    api.findAllCoins = function (req, res) {

        var projection = {
            "_id" : true,
            "tag": true, 
            "name" : true,
            "quoteBrl.price" : true,
            "quoteUsd.price" : true
        }

        modelCrypto.find({}, projection).then(function (data) {
            res.status(201).send({
                success: true,
                data: data
            });
        }, function (error) {
            res.status(500).send({
                success: false,
                message: error
            });
            console.log(error);
        });
    };

    api.findCoinById = function (req, res) {
        modelCrypto.findById({ _id : req.params.id}).then(function (data) {
            res.status(201).send({
                success: true,
                data: data
            });
        }, function (error) {
            res.status(500).send({
                success: false,
                message: error
            });
            console.log(error);
        });
    }

    return api;
};