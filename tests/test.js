'use strict';

const Mocha = require('mocha');

const apiUnitTests = require('./units/api');
const moduleUnitTests = require('./units/module');

const mocha = new Mocha();
const { Suite } = Mocha;

const fullSuite = Suite.create(mocha.suite, 'openweathermap-api-nodejs full test suite');

Promise.resolve()
  .then(() => { return moduleUnitTests(); })
  .then((suite) => { return fullSuite.addSuite(suite); })
  .then(() => { return apiUnitTests(); })
  .then((suite) => { return fullSuite.addSuite(suite); })
  .then(() => {
    return mocha.run((failures) => {
      process.on('exit', () => {
        process.exit(failures);
      });
    });
  })
  .catch((err) => {
    console.error(err);
  });
