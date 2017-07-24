'use strict';

const config = {
  SWAPI: {
    API: 'http://swapi.co/api',
    FILMS: `/films/`,
    PEOPLE: `/people/`
  },
  SCHEMAS: {
    films: {
      count: '',
      results: [{
        title: "",
        director: "",
        crawl_length: "",
        characters: [{
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