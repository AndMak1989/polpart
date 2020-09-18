const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const {chromePort} = require(path.resolve(__dirname, '../config.js'));
const preloadFile = fs.readFileSync(path.resolve(__dirname, 'preloadOptions.js'), 'utf8');
const randomUseragent = require('random-useragent');
const userAgent = randomUseragent.getRandom();
const args = [
    '--no-sandbox',
    '--remote-debugging-port=' + chromePort,
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
    `--user-agent="${userAgent}"`
];
console.log(args);

const options = {
    args,
    headless: true,
    ignoreHTTPSErrors: true
};

async function runBrowser() {
    let browser = await puppeteer.launch(options);
    console.log("Browser is running " + chromePort);
    browser.on('disconnected', async () => {
        browser = await puppeteer.launch(options);
    });
    return browser;
}

module.exports = runBrowser;
