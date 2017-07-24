const request = require('request-promise');
const config = require('./config');
const SWAPI = config.SWAPI;
const SCHEMAS = config.SCHEMAS;
const util = require('./util');

let personCache = {};

function getFilms() {
  return getFilmsFromSwapi()
    .then(addCrawlLengths)
    .then(films => util.whiteList(films, SCHEMAS.films));
}

function getPerson(id) {
  return getPersonFromSwapi(id)
    .then(person => util.whiteList(person, SCHEMAS.person));
}

function getFilmsFromSwapi() {
  return request({
    url: `${SWAPI.API}${SWAPI.FILMS}`,
    json: true
  });
}

function addCrawlLengths(films) {
  films.results = films.results.map(film => {
    film.crawl_length = film.opening_crawl.replace(/(\r\n|\n\r)/gm, "").length;
    return film;
  });

  return films;
}

function getPersonFromSwapi(id) {
  return request({
    url: `${SWAPI.API}${SWAPI.PEOPLE}${id}`,
    json: true
  })
}

module.exports = { getFilms, getPerson };
