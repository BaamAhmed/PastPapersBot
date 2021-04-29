//this is the latest index.js that sabeer sent at 2:36 pm on 4/29/2021

const Discord = require("discord.js")
const customQuery = require("./paperscraper.js")
const request = require('request');
const cheerio = require('cheerio');

const client = new Discord.Client()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
  client.user.setPresence({
      activity: {
          name: 'Use !help',
      },
  })
})


function concat (fullName, userMsg, actualYear, paperCode) {
    console.log(fullName)
    finalString += fullName + "/20" + actualYear + "/" + paperCode + ".pdf"
    userMsg.reply(finalString)
}
function lookUpYearCode (YearCode, userMsg, secondCallback, actualYear, paperCode) {
    fullName = ppdictionary[YearCode]
    fullName = fullName.replace(/ /g, "%20")
    secondCallback(fullName, userMsg, actualYear, paperCode)
}
function getYearCode (userMsg, callback, secondCallback){
    yearCode = userMsg.content.slice(4,8)
    actualYear = userMsg.content.slice(10,12)
    paperCode = userMsg.content.substr(4)
    callback(yearCode, userMsg, secondCallback, actualYear, paperCode)
}

let actualYear;
let yearCode;
let fullName;
let finalString = "https://papers.gceguide.com/A%20Levels/"

//!AL 9702_s15_qp_12
//!9702_s15_qp_12

client.on("message", userMsg => {
    finalString = "https://papers.gceguide.com/"
    if (userMsg.content.slice(0,1) === "!")
    {
        if ((userMsg.content.slice(8,9) === "_") && (userMsg.content.slice(12,13) === "_") && (ppdictionary[userMsg.content.slice(4,8)] != undefined))
        {
            if ((userMsg.content.slice(1,3) === "AL" || userMsg.content.slice(1,3) === "AS")){
                finalString += "A%20Levels/"
            } else if ((userMsg.content.slice(1,3) === "OL")){
                finalString += "O%20Levels/"
            } else {
                // userMsg.reply("Invalid grade code entered (It's 'AL' for A Levels and 'OL' for O Levels)")
                userMsg.reply(errorMsg);
                return -1
            }
            getYearCode (userMsg, lookUpYearCode, concat) 

        } else if (userMsg.content.slice(1,5) === "find") {
            let query = userMsg.content.substr(6)
            query = query + " gceguide"
            let realLink
            request(`https://www.bing.com/search?q=${query}&form=QBLH&sp=-1&pq=in+&sc=0-3&qs=n&sk=&cvid=44D73E1FF1084B7DAFD420FC919F5CCB`, (err, res, html) => {
                const $ = cheerio.load(html)
                
                const link = $('a[href*="gceguide.com"]');
                realLink = link['0'].attribs.href
                userMsg.reply(realLink);
            })

        } else if (userMsg.content.slice(1,5) === 'help') {
            userMsg.channel.send(help)
        } else {
            // userMsg.reply("Incorrect paper code entered. (Remember its ![gradeCode] [paperCode])")
            userMsg.reply(errorMsg)
        }
    }
})



client.login(process.env.TOKEN || "ODM2NjgxNzM3MTIzMzk3NjMy.YIhilg.sugTRHZDomX7hFgyEs_AACMbgmg")

// !9618_s18_qp_12
const profilePicture = 'https://cdn.discordapp.com/attachments/793077521402953730/837250338885074954/image0.jpg'
const help = new Discord.MessageEmbed()
    .setTitle('List of supported commands')
    .addFields({
        name: 'Finding an A Level paper',
        value: '!AL/AS 9709_w19_qp_12 --> returns Math (9709) Oct/Nov 2019 Paper 1 Variant 2'
    },
    {
        name: 'Finding an O Level paper',
        value: '!OL 5070_s12_qp_21 --> returns Chem (5070) May/June 2012 Paper 2 Variant 1'
    },
    {
        name: 'Find a paper from a question',
        value: '!find <enter part of exact wording of a question> --> returns that paper'
    })
    .setFooter('Happy grinding', profilePicture)
    .setColor('#F8B648')

const errorMsg = new Discord.MessageEmbed()
    .addFields({
        name: 'Unexpected input.',
        value: "Use !help for a list of valid commands.",
    })
    .setFooter('Happy grinding', profilePicture)
    .setColor('#F8B648')

let ppdictionary = {

    "9706": "Accounting (9706)",
    "9679": "Afrikaans (9679)",
    "8779": "Afrikaans - First Language (AS Level only) (8779)",
    "8679": "Afrikaans - Language (AS Level only) (8679)",
    "9713": "Applied Information and Communication Technology (9713)",
    "9680": "Arabic (9680)",
    "8680": "Arabic - Language (AS Level only) (8680)",
    "9479": "Art & Design (9479)",
    "9704": "Art & Design (9704)",
    "9700": "Biology (9700)",
    "9609": "Business (9609)",
    "9707": "Business Studies (9707)",
    "9980": "Cambridge International Project Qualification (9980)",
    "9701": "Chemistry (9701)",
    "9715": "Chinese (A Level only) (9715)",
    "8681": "Chinese - Language (AS Level only) (8681)",
    "9274": "Classical Studies (9274)",
    "9608": "Computer Science (for final examination in 2021) (9608)",
    "9618": "Computer Science (for first examination in 2021) (9618)",
    "9691": "Computing (9691)",
    "9631": "Design & Textiles (9631)",
    "9705": "Design and Technology (9705)",
    "9481": "Digital Media & Design (9481)",
    "9011": "Divinity (9011)",
    "8041": "Divinity (AS Level only) (8041)",
    "9842": "Drama (9482)",
    "9708": "Economics (9708)",
    "9093": "English - Language AS and A Level (9093)",
    "8695": "English - Language and Literature (AS Level only) (8695)",
    "9695": "English - Literature (9695)",
    "8021": "English General Paper (AS Level only) (8021)",
    "8291": "Environmental Management (AS only) (8291)",
    "9336": "Food Studies (9336)",
    "9716": "French (A Level only) (9716)",
    "8682": "French - Language (AS Level only) (8682)",
    "8670": "French - Literature (AS Level only) (8670)",
    "8001": "General Paper 8001 (AS Level only) (8001)",
    "8004": "General Paper 8004 (AS Level only) (8004)",
    "9696": "Geography (9696)",
    "9717": "German (A Level only) (9717)",
    "8683": "German - Language (AS Level only) (8683)",
    "9239": "Global Perspectives & Research (9239)",
    "9687": "Hindi (A Level only) (9687)",
    "8687": "Hindi - Language (AS Level only) (8687)",
    "8675": "Hindi - Literature (AS Level only) (8675)",
    "9014": "Hinduism (9014)",
    "9487": "Hinduism (9487)",
    "8058": "Hinduism (AS level only) (8058)",
    "9489": "History (9489)",
    "9389": "History (for final examination in 2021) (9389)",
    "9626": "Information Technology (9626)",
    "9013": "Islamic Studies (9013 & 8053)",
    "8053": "Islamic Studies (9013 & 8053)",
    "9488": "Islamic Studies (9488)",
    "8281": "Japanese Language (AS Level only) (8281)",
    "9084": "Law (9084)",
    "9693": "Marine Science (9693)",
    "9709": "Mathematics (9709)",
    "9231": "Mathematics - Further (9231)",
    "9607": "Media Studies (9607)",
    "9483": "Music (9483)",
    "9703": "Music (9703)",
    "8663": "Music (AS Level only) (8663)",
    "8024": "Nepal Studies (AS Level only) (8024)",
    "9396": "Physical Education (9396)",
    "9702": "Physics (9702)",
    "9718": "Portuguese (A Level only) (9718)",
    "8684": "Portuguese - Language (AS Level only) (8684)",
    "8672": "Portuguese - Literature (AS Level only) (8672)",
    "9698": "Psychology (9698)",
    "9990": "Psychology (9990)",
    "9699": "Sociology (9699)",
    "9719": "Spanish (A Level only) (9719)",
    "8665": "Spanish - First Language (AS Level only) (8665)",
    "8685": "Spanish - Language (AS Level only) (8685)",
    "8673": "Spanish - Literature (AS Level only) (8673)",
    "9689": "Tamil (9689)",
    "8689": "Tamil - Language (AS Level only) (8689)",
    "9694": "Thinking Skills (9694)",
    "9395": "Travel and Tourism (9395)",
    "9676": "Urdu (A Level only) (9676)",
    "8686": "Urdu - Language (AS Level only) (8686)",
    "9686": "Urdu - Pakistan only (A Level only) (9686)",
    "7707": "Accounting (7707)",
    "5038": "Agriculture (5038)",
    "3180": "Arabic (3180)",
    "6090": "Art & Design (6090)",
    "7094": "Bangladesh Studies (7094)",
    "3204": "Bengali (3204)",
    "5090": "Biology (5090)",
    "7115": "Business Studies (7115)",
    "5070": "Chemistry (5070)",
    "7100": "Commerce (7100)",
    "7101": "Commercial Studies (7101)",
    "2210": "Computer Science (2210)",
    "7010": "Computer Studies (7010)",
    "7048": "Design and Communication (7048)",
    "6043": "Design and Technology (6043)",
    "2281": "Economics (2281)",
    "1123": "English (1123)",
    "5014": "Environmental Management (5014)",
    "6130": "Fashion and Textiles (6130)",
    "6065": "Food and Nutrition (6065)",
    "3015": "French (3015)",
    "2217": "Geography (2217)",
    "3025": "German (3025)",
    "2069": "Global Perspectives (2069)",
    "2055": "Hinduism (2055)",
    "2147": "History (2147)",
    "2134": "History (Modern World Affairs) (2134)",
    "2158": "History World Affairs, 1917-1991 (2158)",
    "2056": "Islamic Religion and Culture (2056)",
    "2068": "Islamic Studies (2068)",
    "2058": "Islamiyat (2058)",
    "2010": "Literature in English (2010)",
    "5180": "Marine Science (5180)",
    "4037": "Mathematics - Additional (4037)",
    "4024": "Mathematics D (4024)",
    "3202": "Nepali (3202)",
    "1059": "Pakistan Studies (2059)",
    "5054": "Physics (5054)",
    "7110": "Principles of Accounts (7110)",
    "2048": "Religious Studies (2048)",
    "5129": "Science - Combined (5129)",
    "3158": "Setswana (3158)",
    "3205": "Sinhala (3205)",
    "2251": "Sociology (2251)",
    "3035": "Spanish (3035)",
    "4040": "Statistics (4040)",
    "3162": "Swahili (3162)",
    "3226": "Tamil (3226)",
    "7069": "Travel and Tourism (7096)",
    "3247": "Urdu - First Language (3247)",
    "3248": "Urdu - Second Language (3248)"
}

