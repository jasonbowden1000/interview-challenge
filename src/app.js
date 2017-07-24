const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const swapiService = require('./swapiService');
const pageDataBuilder = require('./pageDataBuilder');
const config = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(config.PATHS.CLIENT));
app.set('view engine', 'pug');
app.set('views', config.PATHS.LAYOUT);

const pageDefinition = {
  favoriteCharacter: {
    type: "person",
    id: 27 // Ackbar
  },
  leastFavoriteCharacter: {
    type: "person",
    id: 30 // Wicket
  },
  openingScrawlLengths: {
    type: "table"
  },
  cards: {
    type: "cards"
  }
};

app.get('/', async (req, res) => {
  let pageData = await pageDataBuilder.getData(pageDefinition);
  console.log('what is in the page data?');
  console.log(pageData);
  res.render('index', pageData);
});

module.exports = app;