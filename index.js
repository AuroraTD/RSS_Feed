// REQUIRE
const Parser = require('rss-parser');
const readline = require('readline');
const fs = require('fs');

// CONSTANTS
const oParser = new Parser();

// TODO publish resultant feed
// TODO publish X articles per day
// TODO add file level comments (see rest API in portfolio)
// TODO fix jshint complaints

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
    aPromises = aFeedLinks.map(function(sLink){
        return oParser.parseURL(sLink);
    });
    aFeeds = await Promise.all(aPromises);
    aFeeds.forEach(function(oFeed){
        console.log(oFeed.title);
        oFeed.items.forEach(function(oItem){
            console.log(`${oItem.title} : ${oItem.link}`);
        });
    });
}