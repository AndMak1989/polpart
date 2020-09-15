const alegroScraper = require('./scraper-helper/alegro.puppeteer');
const compression = require('compression');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());
app.use(compression());
app.get('/', (req, res) => {
    res.send("Alegro parsing is working;");
});
app.post('/scraper', async (req, res) => {
    if(req.body.url){
      const bodyHtml = await alegroScraper(req.body.url);
      return res.send(bodyHtml);
    }else {
        return res.send('No url param in request');
    }

});
app.listen(process.env.PORT || 5000);
