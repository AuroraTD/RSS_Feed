// REQUIRE
const Parser = require('rss-parser');

// CONSTANTS
const oParser = new Parser();
const N_FEED_SIZE = 20;

// TODO read feeds from file
// TODO publish resultant feed
// TODO publish X articles per day
// TODO add file level comments
// TODO fix jshint complaints

// PARSE
(async function () {
    let oFeed = await oParser.parseURL('http://feeds.bbci.co.uk/news/technology/rss.xml');
    console.log(oFeed.title);
    oFeed.items.forEach(function(oItem){
        console.log(`${oItem.title} : ${oItem.link}`);
    });
})();