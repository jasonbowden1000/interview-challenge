const nock = require('nock');
const chai = require('chai');
const rewire = require('rewire');
const swapiService = rewire('./../../../src/server/swapiService');
const SWAPI = require('./../../../src/server/config').SWAPI;
const MOCKS = require('./../../mocks/swapi');
const expect = chai.expect;

chai.use(require('chai-things'));

function nockFilms() {
  nock(SWAPI.API)
    .get(SWAPI.FILMS)
    .reply(200, MOCKS.FILMS);
}

function nockCharacter(id, times) {
  nock(SWAPI.API)
    .get(`${SWAPI.PEOPLE}${id}`)
    .times(times)
    .reply(200, MOCKS.PEOPLE[id]);
}

function nockCharacters(ids) {
  ids.forEach(id => nockCharacter(id, MOCKS.FILMS.count));
}

describe('swapiService', () => {
  describe('can retrieve all films', () => {
    beforeEach(() => {
      nockFilms();
      nockCharacters([1,2,3]);
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
      return swapiService.getFilms().then(films => {
        expect(films.results).to.all.have.property('characters');

        films.results.forEach(film => {
          expect(film.characters).to.have.lengthOf(3);
          expect(film.characters).to.all.have.property('name');
          expect(film.characters).to.all.not.have.property('homeworld');
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

    after(() => nock.cleanAll());
  });

  describe('can retrieve a character', () => {
    it('when given an id', () => {
      let id = 1;
      nockCharacter(id, 1);

      return swapiService.getPerson(id).then(person => {
        expect(person.name).to.equal(MOCKS.PEOPLE[id].name);
        expect(person).not.to.have.property('homeworld');
      });
    });

    // Nock will throw an error if person request is made more than once
    it('when cached', () => {
      let id = 1;
      let times = 1;
      nockCharacter(id, times);

      return Promise.resolve()
        .then(() => swapiService.getPerson(id))
        .then(() => swapiService.getPerson(id))
        .then(() => swapiService.getPerson(id))
        .then(() => {
          expect(swapiService.__get__('personCache')).to.have.property("1");
        });
    });
  });
});
