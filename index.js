// REQUIRE
const RSSCombiner = require('rss-combiner');

// CONSTANTS
const FEED_SIZE = 20;

// TODO read feeds from file
// TODO publish resultant feed
// TODO publish X articles per day

// CONFIG
let feedConfig = {
    title:    'Custom Feed',
    size:     FEED_SIZE,
    feeds: [
        'http://feeds.bbci.co.uk/news/technology/rss.xml',
        'https://www.theguardian.com/uk/technology/rss'
    ],
    pubDate: new Date()
};

// COMBINE
RSSCombiner(feedConfig)
.then(function (combinedFeed) {
    let xml = combinedFeed.xml();
    console.log(xml);
});