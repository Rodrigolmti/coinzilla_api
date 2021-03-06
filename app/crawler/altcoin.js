var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

const urlAltcoin = "https://www.coinwarz.com/cryptocurrency";

function getAltcoin() {

    console.log("Fetching altcoins");
    var modelAltcoin = mongoose.model('WtmAltcoin');
    const BTC_COIN = "Bitcoin (BTC)";

    request(urlAltcoin, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body, {
                ignoreWhitespace: true,
                xmlMode: true
            });

            $('table tbody tr').each(function (index, row) {
                var cell = $(row).find('td');

                var tag = cell.next().children('div').children('div').next().children('div').children('div').children('a').text();
                var algorithm = cell.next().children('div').children('div').next().next().children('span').text();
                var difficulty = cell.next().next().children('div').next().children('span').eq(0).text();
                var hashSplit = cell.next().children('div').children('div').next().children('div').next().children('div').eq(0).text().split(":");
                var estSplit = cell.next().next().next().eq(0).text().split("/");
                var marketSplit = cell.next().next().next().next().next().eq(0).text().split(" ");

                var netHash = hashSplit[1];
                var estReward = estSplit[0]
                var estReward24 = estSplit[1];
                var marketCap = marketSplit[1] + marketSplit[2];
                var volume = marketSplit[4] + marketSplit[5];

                var metadata = {};

                if (tag != BTC_COIN) {
                    metadata = {
                        tag: tag.trim(),
                        algorithm: algorithm.trim(),
                        difficulty: difficulty.trim(),
                        netHash: netHash.trim(),
                        estReward: estReward.trim(),
                        estReward24: estReward24.trim(),
                        marketCap: marketCap.trim(),
                        volume: volume.trim(),
                        updateDate: new Date()
                    };
                } else {
                    metadata = {
                        tag: tag.trim(),
                        algorithm: algorithm.trim(),
                        difficulty: difficulty.trim(),
                        netHash: netHash.trim(),
                        estReward: estReward.trim(),
                        estReward24: estReward24.trim(),
                        marketCap: marketCap.trim(),
                        updateDate: new Date()
                    };
                }

                if (metadata) {
                    modelAltcoin.remove({}).then(function (item) {
                        modelAltcoin.create(metadata)
                            .then(function (item) { },
                                function (error) {
                                    console.log(error);
                                });
                    }, function (error) {
                        console.log(error);
                    });
                }
            });
        }
    });
};

var start = function () {
    getAltcoin();
};

module.exports.init = start;