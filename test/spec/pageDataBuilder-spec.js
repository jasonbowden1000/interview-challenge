const chai = require("chai");
const rewire = require("rewire");
const pageDataBuilder = rewire("./../../src/server/pageDataBuilder");
const MOCKS = require("./../mocks/swapi");
const expect = chai.expect;
chai.use(require("chai-things"));

describe("pageDataBuilder", () => {
  before(() => {
    pageDataBuilder.__set__("swapiService", MOCKS.SERVICE);
  });

  describe("when the definition includes a person\'s valid id", () => {
    it("includes the person\'s data under the correct label", () => {
      const pageDefinition = {
        favChar: {
          type: "person",
          id: 27
        }
      };

      return pageDataBuilder.getData(pageDefinition).then(pageDataObject => {
        expect(pageDataObject).to.have.property("favChar");
        expect(pageDataObject["favChar"].name).to.equal(MOCKS.PEOPLE[pageDefinition["favChar"]["id"]]);
      });
    });
  });

  describe("when the page definition includes cards", () => {
    it("includes them in pairs", () => {
      const pageDefinition = {
        cards: {
          type: "cards"
        }
      };

      return pageDataBuilder.getData(pageDefinition).then(pageDataObject => {
        expect(pageDataObject).to.have.property("cards");
        expect(pageDataObject.cards).to.have.lengthOf(Math.ceil(MOCKS.FORMATTED_FILMS.count / 2));
        expect(pageDataObject.cards).to.be.instanceof(Array);
        expect(pageDataObject.cards[0][0]).to.include.keys('title', 'director', 'people', 'poster');
      });
    });
  });

  describe("when the page definition includes a table", () => {
    it("adds four films", () => {
      const pageDefinition = {
        scrawl: {
          type: "table"
        }
      };

      return pageDataBuilder.getData(pageDefinition).then(pageDataObject => {
        expect(pageDataObject).to.have.property("scrawl");

        let parsedPDO = JSON.parse(pageDataObject["scrawl"]);
        expect(parsedPDO).to.be.lengthOf(4);
        expect(parsedPDO).to.all.have.property("label");
        expect(parsedPDO).to.all.have.property("y");
      });
    });
  });
});
