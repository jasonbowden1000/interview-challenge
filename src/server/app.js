const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const swapiService = require('./services/swapi');
const pageDataBuilder = require('./services/pageDataBuilder');
const config = require('./services/config');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(config.PATHS.CLIENT));
app.use(helmet());
app.set('view engine', 'pug');
app.set('views', config.PATHS.LAYOUT);

// This should come from some sort of CMS
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
  let pageData = {};
  try {
    pageData = await pageDataBuilder.getData(pageDefinition);
  } catch(error) {
    // log error
    // reroute, display appropriate error message, etc.
  }

  res.render('index', pageData);
});

module.exports = app;