'use strict';
const Mocha = require('mocha');
const Suite = Mocha.Suite;

const mocha = new Mocha();

const fullSuite = Suite.create(mocha.suite, 'openweathermap-api-nodejs full test suite');

Promise.resolve()
  // .then(() => { return moduleUnitTests(); })
  // .then((suite) => { return fullSuite.addSuite(suite); })
  // .then(() => { return apiUnitTests(); })
  // .then((suite) => { return fullSuite.addSuite(suite); })
  .then(() => { return mocha.run(); })
  .catch((err) => {
    console.error(err);
  });
