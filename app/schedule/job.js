var schedule = require('node-schedule');

var wtm = require('../crawler/wtm.js');
var marketcap = require('../crawler/marketcap.js');
var altcoin = require('../crawler/altcoin.js');

schedule.scheduleJob('*/15 * * * *', function () {
    // wtm.init();
    // altcoin.init();
})

schedule.scheduleJob('*/1 * * * *', function () {
    // marketcap.init();
})