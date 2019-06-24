var schedule = require('node-schedule');

var wtm = require('../crawler/wtm.js');
var marketcap = require('../crawler/marketcap.js');
var altcoin = require('../crawler/altcoin.js');

schedule.scheduleJob('* /10 * * * *', function () {
    console.log("Initializing 15m job");
    altcoin.init();
    wtm.init();
})

schedule.scheduleJob('* /2 * * * *', function () {
    console.log("Initializing 4m job");
    marketcap.init();
})