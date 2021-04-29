const request = require('request');
const cheerio = require('cheerio');


function mainFunc (query){
    query = query + " gceguide"
    let realLink
    request(`https://www.bing.com/search?q=${query}&form=QBLH&sp=-1&pq=in+&sc=0-3&qs=n&sk=&cvid=44D73E1FF1084B7DAFD420FC919F5CCB`, (err, res, html) => {
        const $ = cheerio.load(html)
        
        const link = $('a[href*="papers.gceguide"]');
        realLink = link['0'].attribs.href
        // console.log(link)
        console.log(realLink + "somth");
    })
    return realLink
}

module.exports = mainFunc