const request = require('request-promise');
const config = require('./config');
const SWAPI = config.SWAPI;
const WHITELISTS = config.WHITELISTS;
const util = require('./util');

let personCache = {};

async function getFilms() {
  let films = await request({ url: `${SWAPI.API}${SWAPI.FILMS}`, json: true });

  for (let film of films.results) {
    film.people = await getCharacters(film);
    film.crawl_length = getCrawlLength(film);
  }

  return util.whiteList(films, WHITELISTS.films);
}

async function getPerson(id) {
  let person;

  if (personCache[id]) {
    person = Promise.resolve(personCache[id]);
  } else {
    person = await request({ url: `${SWAPI.API}${SWAPI.PEOPLE}${id}`, json: true });
    person = util.whiteList(person, WHITELISTS.person);
    personCache[id] = person;
  }

  return person;
}

async function getCharacters(film) {
  let urls = film.characters.slice(0, 3);

  return Promise.all(urls.map(async (character) => {
    let id = getCharacterId(character);
    return getPerson(id);
  }));
}

function getCharacterId(character) {
  return character
    .split("/")
    .filter(el => el !== '')
    .pop();
}

function getCrawlLength(film) {
  return film.opening_crawl.replace(/(\r\n|\n\r)/gm, "").length;
}

module.exports = { getFilms, getPerson };
