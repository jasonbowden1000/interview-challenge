const CHARACTERS = [
  "http://swapi.co/api/people/1",
  "http://swapi.co/api/people/2",
  "http://swapi.co/api/people/3",
  "http://swapi.co/api/people/4",
  "http://swapi.co/api/people/5",
  "http://swapi.co/api/people/6",
  "http://swapi.co/api/people/7",
  "http://swapi.co/api/people/8",
  "http://swapi.co/api/people/9",
  "http://swapi.co/api/people/10"
];

const FORMATTED_PEOPLE = [
  { name: "Jean-Luc Picard" },
  { name: "William T. Riker" },
  { name: "Data" }
];

const FILMS = {
  "count": 5,
  "next": null,
  "results": [{
    "title": "Star Trek II: The Wrath of Khan",
    "director": "Nicholas Meyer",
    "producer": "Robert Sallin",
    "characters": CHARACTERS,
    "opening_crawl": "Luke Skywalker has vanished.\r\nIn his absence, the sinister\r\nFIRST ORDER has risen from\r\nthe ashes of the Empire\r\nand will not rest until\r\nSkywalker, the last Jedi,\r\nhas been destroyed.\r\n \r\nWith the support of the\r\nREPUBLIC, General Leia Organa\r\nleads a brave RESISTANCE.\r\nShe is desperate to find her\r\nbrother Luke and gain his\r\nhelp in restoring peace and\r\njustice to the galaxy.\r\n \r\nLeia has sent her most daring\r\npilot on a secret mission\r\nto Jakku, where an old ally\r\nhas discovered a clue to\r\nLuke's whereabouts...."
  },{
    "title": "Star Trek: First Contact",
    "director": "Jonathan Frakes",
    "producer": "Rick Berman",
    "characters": CHARACTERS,
    "opening_crawl": "Luke Skywalker has returned to\r\nhis home planet of Tatooine in\r\nan attempt to rescue his\r\nfriend Han Solo from the\r\nclutches of the vile gangster\r\nJabba the Hutt.\r\n\r\nLittle does Luke know that the\r\nGALACTIC EMPIRE has secretly\r\nbegun construction on a new\r\narmored space station even\r\nmore powerful than the first\r\ndreaded Death Star.\r\n\r\nWhen completed, this ultimate\r\nweapon will spell certain doom\r\nfor the small band of rebels\r\nstruggling to restore freedom\r\nto the galaxy..."
  },{
    "title": "Star Trek Beyond",
    "director": "Justin Lin",
    "producer": "J.J. Abrams, Roberto Orci, Lindsey Weber, Justin Lin",
    "characters": CHARACTERS,
    "opening_crawl": "War! The Republic is crumbling\r\nunder attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor...."
  },{
    "title": "The Search for Spock",
    "director": "Leonard Nimoy",
    "producer": "Harve Bennett",
    "characters": CHARACTERS,
    "opening_crawl": "The Republic is crumbling\r\nunder attacks by the ruthless\r\nSith Lord, Count Dooku.\r\nThere are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor...."
  },{
    "title": "The Final Frontier",
    "director": "William Shatner",
    "producer": "Harve Bennett",
    "characters": CHARACTERS,
    "opening_crawl": "There are heroes on both sides.\r\nEvil is everywhere.\r\n\r\nIn a stunning move, the\r\nfiendish droid leader, General\r\nGrievous, has swept into the\r\nRepublic capital and kidnapped\r\nChancellor Palpatine, leader of\r\nthe Galactic Senate.\r\n\r\nAs the Separatist Droid Army\r\nattempts to flee the besieged\r\ncapital with their valuable\r\nhostage, two Jedi Knights lead a\r\ndesperate mission to rescue the\r\ncaptive Chancellor...."
  }]
};

const PEOPLE = {
  "1": {
    name: "Jean-Luc Picard",
    homeworld: "Terra"
  },
  "2": {
    name: "William T. Riker",
    homeworld: "Terra"
  },
  "3": {
    name: "Data",
    homeworld: "Omicron Theta"
  },
  "27": {
    name: "Khan Noonien Singh",
    homeworld: "Terra"
  }
};

const FORMATTED_FILMS = {
  count: 5,
  results: [{
    title: "Star Trek II: The Wrath of Khan",
    director: "Nicholas Meyer",
    crawl_length: 480,
    people: FORMATTED_PEOPLE
  },{
    title: "Star Trek: First Contact",
    director: "Jonathan Frakes",
    crawl_length: 442,
    people: FORMATTED_PEOPLE
  },{
    title: "Star Trek Beyond",
    director: "Justin Lin",
    crawl_length: 463,
    people: FORMATTED_PEOPLE
  },{
    title: "The Search for Spock",
    director: "Leonard Nimoy",
    crawl_length: 458,
    people: FORMATTED_PEOPLE
  },{
    title: "The Final Frontier",
    director: "William Shatner",
    crawl_length: 381,
    people: FORMATTED_PEOPLE
  }]
};

const SERVICE = {
  getPerson: (id) => {
    return Promise.resolve({
      name: PEOPLE[id]
    });
  },
  getFilms: () => {
    return Promise.resolve(FORMATTED_FILMS);
  }
};

module.exports = { FILMS, PEOPLE, SERVICE, FORMATTED_FILMS };
