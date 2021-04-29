const request = require('request');
const cheerio = require('cheerio');


function constructURL(query) {
    let url = `https://www.google.com/search?as_filetype=pdf&num=1&as_sitesearch=gceguide.com&as_epq=${query}`;
    return url;
};

let url = constructURL('In an experiment, b mol of hydrogen iodide were put into a sealed vessel under pressure p')

console.log(url);

let paperCode;

function getPaperCode(err, res, body) {
    let $ = cheerio.load(body);
    paperCode = $('a[href*="paper"]').attr('href')
    console.log(paperCode)
    // paperCode = matchObj[0];
};

request(url, getPaperCode);

setTimeout(() => {
    console.log(paperCode);
}, 3000);
