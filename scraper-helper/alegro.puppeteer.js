const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const preloadFile = fs.readFileSync(path.resolve(__dirname,'preloadOptions.js'), 'utf8');

const args = [
    '--no-sandbox',
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
const alegroScraper = async (url) => {
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.goto(url,{waitUntil: 'networkidle2'});
    const pageContent = await page.content();
    await page.close();
    await browser.close();
    return  pageContent;
};

module.exports = alegroScraper;


