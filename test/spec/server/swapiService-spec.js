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

function nockCharacter(id) {
  nock(SWAPI.API)
    .get(`${SWAPI.PEOPLE}${id}`)
    .reply(200, MOCKS.PERSON);
}

function nockCharacters(ids) {
  ids.forEach(id => nockCharacter(id));
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

    it('with three main characters', () => {
      nockCharacters([1,2,3]);

      return swapiService.getFilms().then(films => {
        expect(films.results).to.all.have.property('characters');

        films.results.each(film => {
          expect(film.characters).to.have.lengthOf(3);
          expect(film.characters).to.all.have.property('name');
          // expect them all not to have other shit
        });
      });
    });

    it('with opening crawl lengths', () => {
      return swapiService.getFilms().then(films => {
        expect(films.results).to.all.have.property('crawl_length');
      });
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
        expect(films.results).not.to.have.property('opening_crawl');
      });
    });
  });

  describe('can retrieve a character', () => {
    it('when given an id', () => {
      nockCharacter(MOCKS.PERSON_ID);

      return swapiService.getPerson(MOCKS.PERSON_ID).then(person => {
        expect(person.name).to.equal(MOCKS.PERSON.name);
        expect(person).not.to.have.property('homeworld');
      });
    });

    xit('when cached', () => {

    });
  });
});
