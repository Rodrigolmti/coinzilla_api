var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

var urlCoinWarz = "https://www.coinwarz.com/cryptocurrency";

var getCoinWarZ = function () {

    var modelCoinWZ = mongoose.model('CoinWZ');
    const BTC_COIN = "Bitcoin (BTC)";

    request(urlCoinWarz, function (error, response, body) {
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
                var estResward = estSplit[0]
                var estResward24 = estSplit[1];
                var marketCap = marketSplit[1] + marketSplit[2];
                var volume = marketSplit[4] + marketSplit[5];

                var metadata = {};

                if (tag != BTC_COIN) {
                    metadata = {
                        tag: tag.trim(),
                        algorithm: algorithm.trim(),
                        difficulty: difficulty.trim(),
                        netHash: netHash.trim(),
                        estResward: estResward.trim(),
                        estResward24: estResward24.trim(),
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
                        estResward: estResward.trim(),
                        estResward24: estResward24.trim(),
                        marketCap: marketCap.trim(),
                        updateDate: new Date()
                    };
                }
                
                if (metadata) {
                    modelCoinWZ.remove({})
                        .then(function(item) {
                            modelCoinWZ.create(metadata)
                                .then(function(item) { },
                                function(error) {
                                    console.log(error);
                                });
                        },
                        function(error) {
                            console.log(error);
                        });
                }
            });
        }
    });
};

var start = function () {
    getCoinWarZ();
};

module.exports.Init = start;