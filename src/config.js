'use strict';

const config = {
  PATHS: {
    LAYOUT: "src/client/views",
    CLIENT: "src/client"
  },
  REGEX: {
    LINE_BREAK: /(\r\n|\n\r)/
  },
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