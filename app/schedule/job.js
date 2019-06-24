var schedule = require('node-schedule');

var wtm = require('../crawler/wtm.js');
var marketcap = require('../crawler/marketcap.js');
var altcoin = require('../crawler/altcoin.js');

schedule.scheduleJob('*/5 * * * *', function () {
    console.log("Initializing altcoin and wtm 5m job");
    altcoin.init();
    wtm.init();
})

schedule.scheduleJob('*/5 * * * *', function () {
    console.log("Initializing marketcap 5m job");
    marketcap.init();
})