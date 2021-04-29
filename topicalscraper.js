const https = require('https');
const fs = require('fs');
const pdfParse = require('pdf-parse')

const file = fs.createWriteStream("file.pdf");
const request = https.get("https://papers.gceguide.com/A%20Levels/Physics%20(9702)/2017/9702_w17_qp_21.pdf", function(response) {
  response.pipe(file);
});

let searchword = "force"
setTimeout(() => {
    const pdffile = fs.readFileSync("./file.pdf")
    
    pdfParse(pdffile).then(function (data) {
        let realText = data.text
        realText = realText.replace(/    /g, " ")
        // realText = realText.replace(/.../g, "")
        realText = realText.replace(/^/g, "")
        let index = realText.indexOf(searchword)
        console.log(index)
        let terminatingIndex = realText.indexOf("[Total: ", index)
        console.log(terminatingIndex)
        initializingIndex = realText.lastIndexOf("Answer all the questions in the spaces provided", index)
        console.log(initializingIndex)
        let printText = realText.slice(initializingIndex, terminatingIndex)
        setTimeout(() => {
            console.log(printText)
            userMsg.reply(printText)
        }, 3000);
        // console.log(data.text)
    })
}, 6000);

setTimeout(() => {
    fs.unlink("./file.pdf", function(){
        console.log("file deleted successfully")
    })
    
}, 10000);