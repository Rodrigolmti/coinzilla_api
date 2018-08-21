var request = require('request');
var mongoose = require('mongoose');

const urlGpu = "https://whattomine.com/coins.json";
const urlAsic = "https://whattomine.com/asic.json"

function getGpu() {

    console.log("Fetching gpu coins");
    var modelGpu = mongoose.model('WtmGpu');

    modelGpu.remove({}).then(function (item) {
        request(urlGpu, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body);
                for (var obj in json.coins) {
                    var coin = json.coins[obj];
                    var gpu = {
                        tag: coin.tag,
                        algorithm: coin.algorithm,
                        difficulty: coin.difficulty,
                        netHash: coin.nethash,
                        estResward: coin.estimated_rewards,
                        estResward24: coin.estimated_rewards24,
                        marketCap: coin.market_cap
                    }
                    modelGpu.create(gpu).then(function (item) { },
                        function (error) {
                            console.log(error);
                        });
                }
            }
        });
    }, function (error) {
        console.log(error);
    });
};

function getAsic() {

    console.log("Fetching asic coins");
    var modelAsic = mongoose.model('WtmAsic');

    modelAsic.remove({}).then(function (item) {
        request(urlAsic, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var json = JSON.parse(body);
                for (var obj in json.coins) {
                    var coin = json.coins[obj];
                    var asic = {
                        tag: coin.tag,
                        algorithm: coin.algorithm,
                        difficulty: coin.difficulty,
                        netHash: coin.nethash,
                        estResward: coin.estimated_rewards,
                        estResward24: coin.estimated_rewards24,
                        marketCap: coin.market_cap
                    }
                    modelAsic.create(asic).then(function (item) { },
                        function (error) {
                            console.log(error);
                        });
                }
            }
        });
    }, function (error) {
        console.log(error);
    });
};

var start = function () {
    getGpu();
    getAsic();
};

module.exports.init = start;