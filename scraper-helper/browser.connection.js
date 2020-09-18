const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const {chromePort} = require(path.resolve(__dirname, '../config.js'));
const preloadFile = fs.readFileSync(path.resolve(__dirname, 'preloadOptions.js'), 'utf8');
const args = [
    '--no-sandbox',
    '--remote-debugging-port=' + chromePort,
    '--disable-setuid-sandbox',
    '--disable-infobars',
    '--window-position=0,0',
    '--ignore-certifcate-errors',
    '--ignore-certifcate-errors-spki-list',
    '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"'
];
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
