const alegroScraper = require('./scraper-helper/alegro.puppeteer');
const compression = require('compression');
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const path = require('path');
const app = express();
const {chromePort} = require(path.resolve(__dirname, './config.js'));

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(compression());

app.get('/', (req, res) => {
    res.send("Alegro parsing is working;");
});



const args = [
    '--remote-debugging-port=' + chromePort,
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

(async ()=>{
    await puppeteer.launch()
})();


app.post('/scraper', async (req, res) => {
    if(req.body.url){
      const bodyHtml = await alegroScraper(req.body.url);
      return res.send(bodyHtml);
    }else {
        return res.send('No url param in request');
    }

});
app.listen(process.env.PORT || 5000);
