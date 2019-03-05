var mongoose = require('mongoose');

module.exports = function (app) {

    var api = {};

    var modelFavorite = mongoose.model('FavoriteCoin');
    var modelCrypto = mongoose.model('CryptoCurrency');

    api.addFavoriteCoin = function (req, res) {
        modelCrypto.find({ marketId: req.body.marketId }).then(function (data) {

            var favorite = {
                userId: req.body.userId,
                marketId: req.body.marketId
            }

            modelFavorite.create(favorite).then(function (item) {
                res.status(200).send({
                    success: true,
                    message: "Favorite saved!"
                });
            }, function (error) {
                res.status(500).send({
                    success: false,
                    message: error
                });
            });

        }, function (error) {
            res.status(500).send({
                success: false,
                message: error
            });
        });
    };

    api.removeFavoriteCoin = function (req, res) {

        var query = {
            userId: req.body.userId,
            marketId: req.body.marketId
        }

        modelFavorite.remove(query).then(function (item) {
            res.status(200).send({
                success: true,
                message: "Favorite removed!"
            });
        }, function (error) {
            res.status(500).send({
                success: false,
                message: error
            });
        });
    }

    api.getFavoriteCoinList = function (req, res) {

        var query = {
            userId: req.params.userId
        }

        var projectionFavorite = {
            "_id": false,
            "marketId": true
        }

        var projectionCoin = {
            "_id": true,
            "marketId": true,
            "tag": true,
            "name": true,
            "quoteBrl.price": true,
            "quoteUsd.price": true
        }

        modelFavorite.find(query, projectionFavorite).then(function (data) {

            console.log(data);

            // modelCrypto.find({ 'marketId': { $in: data } }, projectionCoin).then(function (data) {

            //     res.status(200).send({
            //         success: true,
            //         message: data
            //     });

            // }, function (error) {
            //     res.status(500).send({
            //         success: false,
            //         message: error
            //     });
            // });

        }, function (error) {
            res.status(500).send({
                success: false,
                message: error
            });
        });
    }

    return api;
};