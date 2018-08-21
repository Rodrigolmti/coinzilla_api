var mongoose = require('mongoose');

module.exports = function (app) {

    var api = {};

    var modelGpu = mongoose.model('WtmGpu');
    var modelAsic = mongoose.model('WtmAsic');
    var modelAltcoin = mongoose.model('WtmAltcoin');

    api.getWtmGpu = function (req, res) {
        modelGpu.find({}).then(function (data) {
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

    api.getWtmAsic = function (req, res) {
        modelAsic.find({}).then(function (data) {
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

    api.getWtmAltcoin = function (req, res) {
        modelAltcoin.find({}).then(function (data) {
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

    return api;
};