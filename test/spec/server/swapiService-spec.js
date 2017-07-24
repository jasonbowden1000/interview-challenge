const nock = require('nock');
const chai = require('chai');
const swapiService = require('./../../../src/server/swapiService');
const SWAPI = require('./../../../src/server/config').SWAPI;
const MOCKS = require('./../../mocks/swapi');
const expect = chai.expect;

chai.use(require('chai-things'));

function nockFilms() {
  nock(SWAPI.API)
    .get(SWAPI.FILMS)
    .reply(200, MOCKS.FILMS);
}

describe('swapiService', () => {
  describe('can retrieve all films', () => {
    beforeEach(() => {
      nockFilms();
    });

    xit('with poster image', () => {

    });

    it('with each film having a title', () => {
      return swapiService.getFilms().then(films => {
        expect(films.results).to.all.have.property('title');
      });
    });

    it('with the director', () => {
      return swapiService.getFilms().then(films => {
        expect(films.results).to.all.have.property('director');
      });
    });

    xit('with three main characters', () => {
      /*
      return swapiService.getFilms().then(films => {
        expect(films.results).to.all.have.property('characters');
      });
      */
    });

    xit('with opening crawl lengths', () => {

    });

    it('without omissions', () => {
      return swapiService.getFilms().then(films => {
        expect(films.count).to.equal(MOCKS.FILMS.count);
      });
    });

    it('without unnecessary fields', () => {
      return swapiService.getFilms().then(films => {
        expect(films).not.to.have.property('next');
        expect(films.results).to.all.not.have.property('producer');
      });

    });
  });

  xit('can retrieve a character', () => {

  });
});
