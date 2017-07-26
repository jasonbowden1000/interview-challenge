let util = require("./util");
let swapiService = require("./swapiService");

const modules = {
  person: getPerson,
  table: getTable,
  cards: getCards
};

async function getData(pageDefinition) {
  let pageData = {};

  for (let label in pageDefinition) {
    pageData[label] = await modules[pageDefinition[label].type](pageDefinition[label]);
  }

  return pageData;
}

function getPerson(props) {
  return swapiService.getPerson(props.id);
}

async function getTable() {
  let films = await swapiService.getFilms();
  let filmMap = films.results
    .map(film => {
      return {
        label: film.title,
        y: film.crawl_length
      };
    });

  let shuffledFilms = util.shuffle(filmMap);
  let slicedFilms = shuffledFilms.slice(0, 4);

  return JSON.stringify(slicedFilms);
}

async function getCards() {
  let filmsFromService = await swapiService.getFilms();
  let films = JSON.parse(JSON.stringify(filmsFromService));
  let cards = [];

  while (films.results.length > 0) {
    let card = [];
    films.results.splice(0, 2).forEach((film, i) => {
      card[i] = {
        poster: "",
        title: film.title,
        director: film.director,
        people: film.people
      };
    });

    cards.push(card);
  }

  return cards;
}

module.exports = { getData };
