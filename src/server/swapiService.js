const request = require('request-promise');
const SWAPI = require('./config').SWAPI;

function getFilms() {
  return getFilmsFromSwapi()
    .then(formatFilms);
}

function getFilmsFromSwapi() {
  return request({
    url: `${SWAPI.API}${SWAPI.FILMS}`,
    json: true
  })
}

function formatFilms(films) {
  return (({ count, results }) => ({ count, results}))(films);
}

module.exports = { getFilms };
