const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const {chromePort} = require(path.resolve(__dirname, '../config.js'));
const randomUseragent = require('random-useragent');

const alegroScraper = async (url) => {
    try {

        // const browser = await puppeteer.launch(options);
        const response = await axios.get(`http://localhost:${chromePort}/json/version`);
        const {webSocketDebuggerUrl} = response.data;

        // Connecting the instance using `browserWSEndpoint`
        const browser = await puppeteer.connect({browserWSEndpoint: webSocketDebuggerUrl});
        const page = await browser.newPage();
        await page.setRequestInterception(true);
        page.on('request', (req) => {
            if (req.resourceType() === 'document') {

                req.continue();
            } else {
                req.abort();
            }
        });
        await page.setUserAgent(randomUseragent.getRandom());
        await page.goto(url, {waitUntil: 'domcontentloaded',});
        const pageContent = await page.content();
        await page.close();
        // await browser.close();
        return pageContent;

    } catch (e) {
        return e;
    }

};

module.exports = alegroScraper;


