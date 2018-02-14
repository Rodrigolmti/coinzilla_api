var schedule = require('node-schedule');
var crawler = require('../crawler/whatToMine.js');

schedule.scheduleJob('*/15 * * * *', function () {
    console.log("Atualizando dados");
    crawler.Init();
})