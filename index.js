// REQUIRE
const Parser = require('rss-parser');
const readline = require('readline');
const fs = require('fs');

// CONSTANTS
const oParser = new Parser();
const N_DESIRED_ITEMS = 10;

// TODO publish resultant feed
// TODO fix egregious delays as number desired items increases
// TODO add file level comments (see rest API in portfolio)
// TODO fix jshint complaints
// TODO add error handling

// VARIABLES
let oReadLine;
let aFeedLinks;
let aPromises;
let aFeeds;

// GET FEEDS
aFeedLinks = [];
oReadLine = readline.createInterface({
    input: fs.createReadStream('feeds.txt')
});
oReadLine.on('line', function(sLine){
    aFeedLinks.push(sLine);
});
oReadLine.on('close', function(sLine){
    parseFeeds(aFeedLinks);
});

// PARSE
async function parseFeeds(aFeedLinks) {
    let aItemsAll = [];
    let aItemsSingleFeed;
    let i;
    aPromises = aFeedLinks.map(function(sLink){
        return oParser.parseURL(sLink);
    });
    aFeeds = await Promise.all(aPromises);
    aFeeds.forEach(function(oFeed){
        aItemsSingleFeed = randomlySelectItems(oFeed.items);
        aItemsAll = aItemsAll.concat(aItemsSingleFeed);
    });
    aItemsAll = randomlySelectItems(aItemsAll);
    for (i = 0; i < N_DESIRED_ITEMS; i++) {
        console.log(`${aItemsAll[i].title} : ${aItemsAll[i].link}`);
    }
}

// RANDOMLY SELECT
function randomlySelectItems (aItemsIN) {

    let oIndices = new Set();
    let aItemsOUT = [];

    while (aItemsOUT.length < N_DESIRED_ITEMS) {
        let nRandom = Math.floor(Math.random() * aItemsIN.length);
        if (oIndices.has(nRandom) === false) {
            oIndices.add(nRandom);
            aItemsOUT.push(aItemsIN[nRandom]);
        }
    }

    return aItemsOUT;
}