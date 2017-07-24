'use strict';

const config = {
  SWAPI: {
    API: 'http://swapi.co/api',
    FILMS: `/films/`,
    PEOPLE: `/people/`
  },
  WHITELISTS: {
    films: {
      count: '',
      results: [{
        title: "",
        director: "",
        crawl_length: "",
        people: [{
          name: ""
        }]
      }]
    },
    person: {
      name: ""
    }
  }
};

module.exports = config;